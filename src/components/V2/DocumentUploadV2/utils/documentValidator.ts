import { ValidationResult, DocumentType } from '../../types';
import { VALIDATE_DOCUMENT_ENDPOINT } from '../../constants';

/**
 * Convierte un archivo a base64 (sin el prefijo data:...) junto con su media type,
 * normalizando 'image/jpg' -> 'image/jpeg' (el único nombre que acepta la API de Claude).
 */
const fileToBase64 = (file: File): Promise<{ base64Data: string; mediaType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1] || '';
      const mediaType = file.type === 'image/jpg' ? 'image/jpeg' : file.type;
      resolve({ base64Data, mediaType });
    };
    reader.onerror = () => reject(new Error('No se pudo convertir el archivo a base64'));
    reader.readAsDataURL(file);
  });
};

/**
 * Valida un documento enviando el archivo original (imagen o PDF) al proxy de Netlify,
 * que a su vez llama a Claude. Nunca lanza: cualquier fallo se traduce en un
 * ValidationResult con respuesta 'NO' y confianza 0, igual que hacía la integración anterior.
 */
export const validateDocumentWithClaude = async (
  file: File,
  documentType: DocumentType,
  onProgress?: (progress: number) => void
): Promise<ValidationResult> => {
  try {
    console.log('🤖 Iniciando validación con Claude...');
    onProgress?.(10);

    const { base64Data, mediaType } = await fileToBase64(file);
    onProgress?.(40);

    console.log('📡 Enviando documento al servicio de validación...');
    const response = await fetch(VALIDATE_DOCUMENT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentType, mediaType, base64Data }),
    });

    onProgress?.(80);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Error en el servicio de validación:', response.status, errorData);
      onProgress?.(100);
      return {
        respuesta: 'NO',
        confianza: 0,
        documentType,
        feedback: errorData.error || `Error en el servicio de validación (${response.status})`,
      };
    }

    const data = await response.json();
    console.log('✅ Validación completada:', data.respuesta, data.confianza + '%');
    onProgress?.(100);

    return {
      respuesta: data.respuesta === 'SI' ? 'SI' : 'NO',
      confianza: typeof data.confianza === 'number' ? Math.round(data.confianza) : 0,
      documentType,
      feedback: data.feedback,
    };
  } catch (error) {
    console.error('❌ Error al contactar el servicio de validación:', error);
    onProgress?.(100);
    return {
      respuesta: 'NO',
      confianza: 0,
      documentType,
      feedback: 'No se pudo contactar con el servicio de validación',
    };
  }
};

/**
 * Procesa y valida un archivo completo.
 *
 * El pipeline de OCR (EasyOCR/pdf.js, en ocrProcessor.ts) está roto y fuera de
 * alcance por ahora (ver diagnóstico aparte) — mientras no se corrija, NO se usa
 * aquí en absoluto: ni para la validación ni para generar un texto de preview.
 * Claude recibe y juzga siempre el archivo original directamente.
 */
export const processAndValidateFile = async (
  file: File,
  documentType: DocumentType,
  _actualDocumentType?: DocumentType,
  onProgress?: (stage: string, progress: number, info?: string) => void
): Promise<{
  result: ValidationResult;
  text: string;
  pdfFile: File;
  wasConverted: boolean;
  processingTime: number;
  usedSimulation?: boolean;
}> => {
  const startTime = Date.now();
  console.log('🚀 Iniciando procesamiento completo:', file.name);

  onProgress?.('text_extraction', 100, 'Extracción de texto deshabilitada: se valida el documento original');

  const result = await validateDocumentWithClaude(file, documentType, (progress) =>
    onProgress?.('llm_validation', progress, `Validando documento: ${progress}%`)
  );

  const processingTime = Date.now() - startTime;
  console.log('✅ Procesamiento completado en', processingTime, 'ms —', result.respuesta, result.confianza + '%');

  return {
    result,
    text: '',
    pdfFile: file,
    wasConverted: false,
    processingTime,
    usedSimulation: false,
  };
};

/**
 * Validación fallback para DNI/NIE cuando el LLM no está disponible o falla.
 * Usa reglas básicas para validar el formato del DNI/NIE español (lógica pura,
 * agnóstica de proveedor de LLM — sin cambios respecto a la integración anterior).
 */
export const validateDNINIEFallback = (text: string): ValidationResult => {
  console.log('🔧 Usando validación fallback para DNI/NIE');

  const cleanText = text.replace(/[\s\n\r\t]/g, '').toUpperCase();

  const dniPattern = /(\d{8})([A-Z])/g;
  const niePattern = /([A-Z]\d{7})([A-Z])/g;

  const dniMatches = cleanText.match(dniPattern) || [];
  const nieMatches = cleanText.match(niePattern) || [];

  if (dniMatches.length > 0) {
    for (const match of dniMatches) {
      const numbers = match.substring(0, 8);
      const letter = match.substring(8);

      if (validateDNILetter(numbers, letter)) {
        console.log('✅ DNI válido encontrado:', match);
        return {
          respuesta: 'SI',
          confianza: 90,
          documentType: 'dni-nie',
          feedback: 'Validado mediante fallback: DNI con formato correcto',
        };
      }
    }
  }

  if (nieMatches.length > 0) {
    for (const match of nieMatches) {
      const letter = match.substring(0, 1);
      const numbers = match.substring(1, 8);
      const controlLetter = match.substring(8);

      if (['X', 'Y', 'Z'].includes(letter)) {
        const nieNumber = letter + numbers;
        if (validateDNILetter(nieNumber, controlLetter)) {
          console.log('✅ NIE válido encontrado:', match);
          return {
            respuesta: 'SI',
            confianza: 90,
            documentType: 'dni-nie',
            feedback: 'Validado mediante fallback: NIE con formato correcto',
          };
        }
      }
    }
  }

  const identityIndicators = [
    'DOCUMENTO NACIONAL DE IDENTIDAD',
    'DNI',
    'NUMERO DE IDENTIDAD DE EXTRANJERO',
    'NIE',
    'APELLIDOS',
    'NOMBRE',
    'FECHA DE NACIMIENTO',
    'NACIONALIDAD',
    'SEXO',
    'FECHA DE CADUCIDAD',
  ];

  const foundIndicators = identityIndicators.filter((indicator) =>
    cleanText.includes(indicator.replace(/\s+/g, ''))
  );

  if (foundIndicators.length >= 3) {
    console.log('✅ Documento identificado como DNI/NIE mediante indicadores');
    return {
      respuesta: 'SI',
      confianza: 85,
      documentType: 'dni-nie',
      feedback: `Validado mediante fallback: ${foundIndicators.length} indicadores de identidad encontrados`,
    };
  }

  console.log('❌ No se pudo validar como DNI/NIE mediante fallback');
  return {
    respuesta: 'NO',
    confianza: 40,
    documentType: 'dni-nie',
    feedback: 'No se pudo validar automáticamente. Revise la calidad de la imagen.',
  };
};

/**
 * Valida la letra de control del DNI/NIE español.
 */
const validateDNILetter = (numbers: string, letter: string): boolean => {
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const index = parseInt(numbers, 10) % 23;
  const expectedLetter = letters.charAt(index);
  return letter === expectedLetter;
};

export default {
  validateDocumentWithClaude,
  processAndValidateFile,
  validateDNINIEFallback,
};
