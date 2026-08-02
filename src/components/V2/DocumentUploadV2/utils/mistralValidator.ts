import { DOCUMENT_LABELS, MISTRAL_API_URL, MISTRAL_MODEL } from '../../constants';
import { ValidationResult, DocumentType } from '../../types';

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
Tu tarea es verificar si el contenido del documento proporcionado corresponde EXACTAMENTE al tipo de documento especificado.

Tipo de documento a validar: ${documentDescription}

INSTRUCCIONES OBLIGATORIAS:
1. Analiza el contenido del documento con máximo detalle
2. Determina si el contenido corresponde EXACTAMENTE al tipo de documento especificado
3. Responde SOLO y EXCLUSIVAMENTE en formato JSON con esta estructura:
   {
     "respuesta": "SI",
     "confianza": 95
   }
   O
   {
     "respuesta": "NO",
     "confianza": 45
   }
4. NO escribas NADA más fuera del JSON
5. "respuesta" DEBE ser solo "SI" o "NO" (sin comillas en el valor)
6. "confianza" DEBE ser un número entero entre 0 y 100
7. Si el documento NO corresponde exactamente, respuesta DEBE ser "NO"
8. Si hay cualquier duda, respuesta DEBE ser "NO"
9. Sé ESTRICTO: cualquier discrepancia = "NO"

Recuerda: eres un validador ESTRICTO. Si el documento no cumple EXACTAMENTE con todos los requisitos del tipo especificado, respuesta es "NO".`;
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
    if (!MISTRAL_API_KEY) {
      // Si no hay API key, devolvemos un error
      return {
        respuesta: 'NO',
        confianza: 0,
        documentType,
        feedback: 'No se pudo validar: falta API Key de Mistral',
      };
    }

    const systemPrompt = getSystemPrompt(documentType);

    // Limitar el contenido a los primeros 8000 caracteres (aproximadamente 2000 tokens)
    // Mistral tiene límite de tokens por request
    const truncatedContent = fileContent.substring(0, 8000);

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
          { role: 'user', content: `Contenido del documento:\n\n${truncatedContent}` },
        ],
        temperature: 0, // Máxima determinación
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error en API de Mistral:', response.status, errorData);
      
      return {
        respuesta: 'NO',
        confianza: 0,
        documentType,
        feedback: `Error en API: ${response.statusText}`,
      };
    }

    const data: MistralResponse = await response.json();
    const content = data.choices[0]?.message?.content || '';

    // Parsear el JSON de la respuesta
    try {
      // Limpiar la respuesta para eliminar posibles caracteres extra
      const cleanContent = content.trim();
      const result = JSON.parse(cleanContent);

      // Validar que el resultado tiene el formato correcto
      if (result.respuesta && (result.respuesta === 'SI' || result.respuesta === 'NO') && 
          typeof result.confianza === 'number') {
        return {
          respuesta: result.respuesta,
          confianza: Math.round(result.confianza),
          documentType,
          feedback: result.feedback,
        };
      } else {
        // Formato incorrecto
        console.warn('Respuesta del LLM no tiene formato válido:', result);
        return {
          respuesta: 'NO',
          confianza: 0,
          documentType,
          feedback: 'Formato de respuesta no válido',
        };
      }
    } catch (e) {
      // Si no es JSON válido, intentar extraer de otro formato
      console.warn('Respuesta no es JSON válido:', content);
      
      // Intentar buscar SI/NO en el texto
      const hasSI = content.toUpperCase().includes('"SI"') || content.toUpperCase().includes('SI');
      const hasNO = content.toUpperCase().includes('"NO"') || content.toUpperCase().includes('NO');
      
      if (hasSI) {
        return {
          respuesta: 'SI',
          confianza: 50, // Confianza baja por formato no válido
          documentType,
          feedback: 'Formato de respuesta no válido, pero detectado como SI',
        };
      } else if (hasNO) {
        return {
          respuesta: 'NO',
          confianza: 50, // Confianza baja por formato no válido
          documentType,
          feedback: 'Formato de respuesta no válido, pero detectado como NO',
        };
      }
      
      return {
        respuesta: 'NO',
        confianza: 0,
        documentType,
        feedback: 'No se pudo parsear la respuesta del LLM',
      };
    }
  } catch (error) {
    console.error('Error en validación LLM:', error);
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
 */
export const validateFile = async (
  file: File,
  documentType: DocumentType,
  extractedText: string
): Promise<ValidationResult> => {
  // Validar con LLM
  return await validateDocumentWithLLM(extractedText, documentType);
};

export default {
  validateDocumentWithLLM,
  extractTextFromPDF,
  validateFile,
};
