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
 * Valida un documento enviando el archivo original (imagen o PDF, sin extracción
 * ni conversión previa) al proxy de Netlify, que a su vez llama a Claude.
 * Nunca lanza: cualquier fallo se traduce en un ValidationResult con
 * respuesta 'NO' y confianza 0.
 */
export const validateDocumentWithClaude = async (
  file: File,
  documentType: DocumentType,
  onProgress?: (progress: number) => void
): Promise<ValidationResult> => {
  try {
    onProgress?.(15);
    const { base64Data, mediaType } = await fileToBase64(file);

    onProgress?.(40);
    const response = await fetch(VALIDATE_DOCUMENT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentType, mediaType, base64Data }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      onProgress?.(100);
      console.error('❌ Validación fallida:', response.status, errorData.error);
      return {
        respuesta: 'NO',
        confianza: 0,
        documentType,
        feedback: errorData.error || `Error en el servicio de validación (${response.status})`,
      };
    }

    const data = await response.json();
    onProgress?.(100);
    console.log(`✅ Validación completada: ${data.respuesta} (${data.confianza}%)`);

    return {
      respuesta: data.respuesta === 'SI' ? 'SI' : 'NO',
      confianza: typeof data.confianza === 'number' ? Math.round(data.confianza) : 0,
      documentType,
      feedback: data.feedback,
    };
  } catch (error) {
    onProgress?.(100);
    console.error('❌ No se pudo contactar el servicio de validación:', error);
    return {
      respuesta: 'NO',
      confianza: 0,
      documentType,
      feedback: 'No se pudo contactar con el servicio de validación',
    };
  }
};
