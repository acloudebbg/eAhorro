import { DOCUMENT_LABELS, MISTRAL_API_URL, MISTRAL_MODEL } from '../../constants';
import { ValidationResult, DocumentType } from '../../types';
import { processFileForValidation } from './ocrProcessor';

// Obtener la API Key desde variables de entorno
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY || '';

if (!MISTRAL_API_KEY) {
  console.warn('⚠️  No se encontró VITE_MISTRAL_API_KEY en las variables de entorno');
}

interface MistralResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Genera el prompt del sistema para validar un tipo de documento específico
 */
const getSystemPrompt = (documentType: DocumentType): string => {
  const documentDescription = DOCUMENT_LABELS[documentType] ||
    'Documento genérico para trámites hipotecarios en España';

  return `Eres un experto estricto en validación de documentos para hipotecas en España.
Tu UNICA tarea es verificar si el contenido del documento proporcionado corresponde EXACTAMENTE al tipo de documento especificado.

Tipo de documento a validar: ${documentDescription}

REGLAS ABSOLUTAS - CUMPLE ESTRICTAMENTE:
1. NO debes escribir NADA excepto el JSON de respuesta
2. NO uses markdown, NO uses backticks, NO uses código, NO uses explicaciones
3. Tu respuesta DEBE ser SOLO y EXCLUSIVAMENTE un JSON válido
4. El JSON DEBE tener esta estructura EXACTA:
{
  "respuesta": "SI",
  "confianza": 95
}
5. "respuesta" SOLO puede ser "SI" o "NO" (valores literales sin comillas internas)
6. "confianza" DEBE ser un número entero entre 0 y 100
7. Analiza el contenido con máximo detalle
8. Si el contenido corresponde EXACTAMENTE al tipo de documento: respuesta = "SI", confianza = alto (80-100)
9. Si el contenido NO corresponde o hay CUALQUIER duda: respuesta = "NO", confianza = bajo (0-79)
10. Sé ESTRICTO: cualquier diferencia = "NO"

EJEMPLOS DE RESPUESTA CORRECTA:
{"respuesta": "SI", "confianza": 95}
{"respuesta": "NO", "confianza": 20}

EJEMPLOS DE RESPUESTA INCORRECTA (NO HACER):
- Respuesta: SI (no es JSON)
- {"respuesta": "Sí", "confianza": 95} ("Sí" con acento)
- code json {"respuesta": "SI"} code (con markdown)
- Cualquier texto adicional

REPITE: SOLO DEVUELVE EL JSON, NADA MÁS.`;
};

/**
 * Extrae texto de un PDF (simplificado - en producción usar pdf.js o pdf-lib)
 * Para esta versión, asumimos que el texto ya ha sido extraído
 */
export const extractTextFromPDF = async (file: File): Promise<string> => {
  // En una implementación real, usaríamos pdf.js para extraer texto
  // Por ahora, devolvemos un mensaje indicando que es un PDF
  return `[PDF: ${file.name}] - Contenido del PDF a extraer con pdf.js`;
};

/**
 * Valida un documento con Mistral LLM
 */
export const validateDocumentWithLLM = async (
  fileContent: string,
  documentType: DocumentType
): Promise<ValidationResult> => {
  try {
    console.log('🤖 Iniciando validación con Mistral LLM...');
    console.log('📄 Tipo de documento:', documentType);
    console.log('📝 Longitud del contenido:', fileContent.length, 'caracteres');
    
    const startTime = Date.now();
    
    if (!MISTRAL_API_KEY) {
      console.warn('⚠️  No se encontró API Key de Mistral');
      return {
        respuesta: 'NO',
        confianza: 0,
        documentType,
        feedback: 'No se pudo validar: falta API Key de Mistral',
      };
    }

    console.log('🔑 API Key encontrada. Preparando request...');
    
    const systemPrompt = getSystemPrompt(documentType);
    console.log('');
    console.log('=== PROMPT DEL SISTEMA ===');
    console.log(systemPrompt);
    console.log('=========================');
    console.log('');

    // Limitar el contenido a los primeros 8000 caracteres (aproximadamente 2000 tokens)
    // Mistral tiene límite de tokens por request
    const truncatedContent = fileContent.substring(0, 8000);
    console.log('📏 Contenido a validar (primeros 500 chars):');
    console.log(truncatedContent.substring(0, 500) + '...');
    console.log('');

    console.log('📡 Enviando request a Mistral API...');
    
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: MISTRAL_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        temperature: 0, // Máxima determinación
        max_tokens: 200,
      }),
    });

    console.log('⏳ Esperando respuesta de Mistral...');
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Error en API de Mistral:', response.status, response.statusText, errorData);
      
      return {
        respuesta: 'NO',
        confianza: 0,
        documentType,
        feedback: `Error en API: ${response.status} - ${response.statusText}`,
      };
    }

    console.log('✅ Respuesta recibida de Mistral. Parseando...');
    const data: MistralResponse = await response.json();
    const content = data.choices[0]?.message?.content || '';
    
    console.log(`⏱️  Tiempo de validación: ${Date.now() - startTime}ms`);

    // Parsear el JSON de la respuesta
    try {
      console.log('');
      console.log('=== RESPUESTA DE MISTRAL ===');
      console.log(content);
      console.log('===========================');
      console.log('');
      
      // Limpiar la respuesta para eliminar posibles caracteres extra
      // Eliminar backticks, markdown, etc.
      let cleanContent = content.trim();
      
      // Eliminar bloques de código markdown ```json ... ```
      cleanContent = cleanContent.replace(/```json/i, '').replace(/```/g, '');
      
      // Eliminar cualquier otro backtick
      cleanContent = cleanContent.replace(/`/g, '');
      
      // Eliminar espacios al inicio y final
      cleanContent = cleanContent.trim();
      
      console.log('🔍 Intentando parsear JSON...');
      const result = JSON.parse(cleanContent);

      // Validar que el resultado tiene el formato correcto
      if (result.respuesta && (result.respuesta === 'SI' || result.respuesta === 'NO') && 
          typeof result.confianza === 'number') {
        console.log('✅ Respuesta válida de Mistral:', result);
        console.log('');
        console.log('=== RESULTADO DE VALIDACIÓN ===');
        console.log('🎯 Respuesta:', result.respuesta);
        console.log('📊 Confianza:', result.confianza + '%');
        console.log('===============================');
        console.log('');
        
        // Fallback para DNI/NIE cuando la confianza del LLM es baja
        if (documentType === 'dni-nie' && result.respuesta === 'NO' && result.confianza < 50 && fileContent.length > 50) {
          console.log('🔧 Usando validación fallback para DNI/NIE debido a baja confianza LLM');
          const fallbackResult = validateDNINIEFallback(fileContent);
          // Si el fallback da SI con alta confianza, usar ese resultado
          if (fallbackResult.respuesta === 'SI' && fallbackResult.confianza >= 80) {
            console.log('✅ Fallback para DNI/NIE exitoso. Usando resultado del fallback.');
            return fallbackResult;
          }
          // Si el fallback también da NO, devolver el resultado original del LLM
          console.log('❌ Fallback para DNI/NIE no concluyente. Usando resultado original del LLM.');
        }
        
        return {
          respuesta: result.respuesta,
          confianza: Math.round(result.confianza),
          documentType,
          feedback: result.feedback,
        };
      } else {
        // Formato incorrecto
        console.warn('⚠️  Respuesta del LLM no tiene formato válido:', result);
        console.log('');
        return {
          respuesta: 'NO',
          confianza: 0,
          documentType,
          feedback: 'Formato de respuesta no válido: estructura incorrecta',
        };
      }
    } catch (e) {
      // Si no es JSON válido, intentar extraer de otro formato
      console.warn('⚠️  Respuesta no es JSON válido. Intentando parsear manualmente...');
      console.log('');
      
      // Limpiar el contenido
      let cleanContent = content.trim();
      cleanContent = cleanContent.replace(/```json/i, '').replace(/```/g, '').replace(/`/g, '').trim();
      
      // Intentar buscar SI/NO en el texto
      const hasSI = cleanContent.toUpperCase().includes('"SI"') || 
                    cleanContent.toUpperCase().includes('SI:') ||
                    cleanContent.includes('SI');
      const hasNO = cleanContent.toUpperCase().includes('"NO"') || 
                    cleanContent.toUpperCase().includes('NO:') ||
                    cleanContent.includes('NO');
      
      // Intentar extraer el valor de confianza
      let confidence = 0;
      const confidenceMatch = cleanContent.match(/(?:confianza|confidence)[\s:]*(\d+)/i);
      if (confidenceMatch) {
        confidence = parseInt(confidenceMatch[1]);
      }
      
      if (hasSI && !hasNO) {
        console.log('🎯 Detectado como SI (parseo manual)');
        console.log('📊 Confianza detectada:', confidence + '%');
        console.log('');
        return {
          respuesta: 'SI',
          confianza: Math.max(1, confidence), // Al menos 1 para evitar 0
          documentType,
          feedback: 'Formato de respuesta no válido, pero detectado como SI',
        };
      } else if (hasNO) {
        console.log('🎯 Detectado como NO (parseo manual)');
        console.log('📊 Confianza detectada:', confidence + '%');
        console.log('');
        return {
          respuesta: 'NO',
          confianza: Math.max(1, confidence),
          documentType,
          feedback: 'Formato de respuesta no válido, pero detectado como NO',
        };
      }
      
      console.error('❌ No se pudo determinar SI/NO en la respuesta');
      console.log('');
      
      // Fallback para DNI/NIE cuando el LLM no da respuesta clara
      if (documentType === 'dni-nie' && fileContent.length > 50) {
        console.log('🔧 Usando validación fallback para DNI/NIE debido a respuesta ambigua');
        return validateDNINIEFallback(fileContent);
      }
      
      return {
        respuesta: 'NO',
        confianza: 0,
        documentType,
        feedback: 'No se pudo parsear la respuesta del LLM',
      };
    }
  } catch (error) {
    console.error('❌ Error en validación LLM:', error);
    
    // Fallback para DNI/NIE
    if (documentType === 'dni-nie' && fileContent.length > 50) {
      console.log('🔧 Usando validación fallback para DNI/NIE debido a error LLM');
      return validateDNINIEFallback(fileContent);
    }
    
    return {
      respuesta: 'NO',
      confianza: 0,
      documentType,
      feedback: 'Error en la validación automatizada',
    };
  }
};

/**
 * Función principal para validar un archivo completo
 * Combina OCR/extracción de texto + validación LLM
 */
export const validateFile = async (
  file: File,
  documentType: DocumentType,
  extractedText: string
): Promise<ValidationResult> => {
  // Validar con LLM
  console.log('🔍 Validando archivo con LLM...');
  const result = await validateDocumentWithLLM(extractedText, documentType);
  console.log('🎉 Validación completada. Resultado:', result.respuesta, result.confianza + '%');
  return result;
};

/**
 * Procesa y valida un archivo completo en un solo flujo
 * 1. Extrae texto (OCR para imágenes, texto para PDFs)
 * 2. Convierte a PDF si es imagen
 * 3. Si todo falla, usa simulación
 * 4. Valida con Mistral LLM o con simulación
 * 5. Devuelve resultado completo con progreso
 */
export const processAndValidateFile = async (
  file: File,
  documentType: DocumentType,
  actualDocumentType?: DocumentType,
  onProgress?: (stage: string, progress: number, info?: string) => void
): Promise<{ 
  result: ValidationResult;
  text: string;
  pdfFile: File;
  wasConverted: boolean;
  processingTime: number;
  usedSimulation?: boolean; // Si se usó simulación
}> => {
  const startTime = Date.now();
  console.log('========================================');
  console.log('🚀 INICIANDO PROCESAMIENTO COMPLETO');
  console.log('========================================');
  console.log('📁 Archivo:', file.name);
  console.log('📄 Tipo:', file.type);
  console.log('🏷️  Tipo de documento:', documentType);
  console.log('----------------------------------------');
  
  try {
    // Paso 1: Extraer texto
    onProgress?.('text_extraction', 0, 'Extrayendo texto del documento...');
    const { text, pdfFile, wasConverted, usedSimulation } = await processFileForValidation(file, (progress) => {
      onProgress?.('text_extraction', Math.round(progress * 0.7), `Extrayendo texto: ${progress}%`);
    }, actualDocumentType);
    
    console.log('✅ Texto extraído:', text.length, 'caracteres');
    
    // Paso 2: Validar con LLM o simulación
    onProgress?.('llm_validation', 70, 'Validando con Mistral LLM...');
    
    let result: ValidationResult;
    
    // Si usamos simulación, crear un resultado simulado
    if (usedSimulation) {
      console.log('🎭 Usando simulación para validación...');
      // Extraer información de la simulación
      const lines = text.split('\n');
      const headerLine = lines.find(l => l.startsWith('Archivo:')) || '';
      const typeLine = lines.find(l => l.startsWith('Tipo:')) || '';
      const docType = typeLine.replace('Tipo:', '').trim() as DocumentType;
      
      // Determinar si es válido basado en confianza (coherente con CONFIDENCE_THRESHOLD = 80)
      const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
      const isValid = confidence >= 80; // Siempre true en este rango
      
      result = {
        respuesta: isValid ? 'SI' : 'NO',
        confianza: confidence,
        documentType: docType,
        feedback: isValid 
          ? `Documento simulado validado: ${headerLine.replace('Archivo:', '').trim()}`
          : `Documento simulado: algunos datos no coinciden con el formato esperado`,
      };
      console.log('✅ Validación simulada completada');
    } else {
      result = await validateFile(file, documentType, text);
      console.log('✅ Validación con LLM completada');
    }
    
    console.log('✅ Validación completada');
    
    const processingTime = Date.now() - startTime;
    console.log('========================================');
    console.log('✅ PROCESAMIENTO COMPLETADO');
    console.log('========================================');
    console.log('⏱️  Tiempo total:', processingTime, 'ms');
    console.log('🎯 Resultado:', result.respuesta);
    console.log('📊 Confianza:', result.confianza + '%');
    console.log('📄 PDF generado:', wasConverted ? 'Sí (desde imagen)' : 'No (original)');
    console.log('🎭 Simulación usada:', usedSimulation ? 'Sí' : 'No');
    console.log('========================================');
    
    return {
      result,
      text,
      pdfFile,
      wasConverted,
      processingTime,
      usedSimulation,
    };
  } catch (error) {
    console.error('❌ Error en procesamiento completo:', error);
    console.log('========================================');
    console.log('❌ PROCESAMIENTO FALLIDO');
    console.log('========================================');
    
    throw error;
  }
};

/**
 * Validación fallback para DNI/NIE cuando el LLM no está disponible o falla
 * Usa reglas básicas para validar el formato del DNI/NIE español
 */
export const validateDNINIEFallback = (text: string): ValidationResult => {
  console.log('🔧 Usando validación fallback para DNI/NIE');
  
  // Limpiar y normalizar el texto
  const cleanText = text
    .replace(/[\s\n\r\t]/g, '') // Eliminar espacios y saltos de línea
    .toUpperCase();
  
  // Buscar patrones de DNI y NIE
  const dniPattern = /(\d{8})([A-Z])/g; // DNI: 8 dígitos + letra
  const niePattern = /([A-Z]\d{7})([A-Z])/g; // NIE: letra + 7 dígitos + letra
  
  const dniMatches = cleanText.match(dniPattern) || [];
  const nieMatches = cleanText.match(niePattern) || [];
  
  console.log('🔍 Patrones DNI encontrados:', dniMatches);
  console.log('🔍 Patrones NIE encontrados:', nieMatches);
  
  // Validar DNI
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
  
  // Validar NIE
  if (nieMatches.length > 0) {
    for (const match of nieMatches) {
      const letter = match.substring(0, 1);
      const numbers = match.substring(1, 8);
      const controlLetter = match.substring(8);
      
      // NIE válido: primera letra debe ser X, Y o Z
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
  
  // Buscar otros indicadores de documento de identidad
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
    'FECHA DE CADUCIDAD'
  ];
  
  const foundIndicators = identityIndicators.filter(indicator => 
    cleanText.includes(indicator.replace(/\s+/g, ''))
  );
  
  console.log('🔍 Indicadores de identidad encontrados:', foundIndicators);
  
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
 * Valida la letra de control del DNI/NIE español
 */
const validateDNILetter = (numbers: string, letter: string): boolean => {
  const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const index = parseInt(numbers) % 23;
  const expectedLetter = letters.charAt(index);
  return letter === expectedLetter;
};

export default {
  validateDocumentWithLLM,
  extractTextFromPDF,
  validateFile,
  validateDNINIEFallback,
};
