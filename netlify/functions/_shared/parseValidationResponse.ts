export interface ParsedValidation {
  respuesta: 'SI' | 'NO';
  confianza: number;
  feedback?: string;
}

/**
 * Interpreta la respuesta de texto del LLM y la convierte en {respuesta, confianza}.
 * Portado literalmente de la antigua validación con Mistral: primero intenta un JSON.parse
 * limpio (quitando backticks/markdown), y si falla recurre a una detección manual de SI/NO
 * y del número de confianza vía regex. El contrato de salida pedido al modelo no cambia
 * al pasar de Mistral a Claude, así que esta lógica es 100% reutilizable.
 */
export const parseValidationResponse = (rawContent: string): ParsedValidation => {
  const content = rawContent || '';

  let cleanContent = content.trim();
  cleanContent = cleanContent.replace(/```json/i, '').replace(/```/g, '');
  cleanContent = cleanContent.replace(/`/g, '');
  cleanContent = cleanContent.trim();

  try {
    const result = JSON.parse(cleanContent);

    if (
      result.respuesta &&
      (result.respuesta === 'SI' || result.respuesta === 'NO') &&
      typeof result.confianza === 'number'
    ) {
      return {
        respuesta: result.respuesta,
        confianza: Math.round(result.confianza),
        feedback: result.feedback,
      };
    }

    return {
      respuesta: 'NO',
      confianza: 0,
      feedback: 'Formato de respuesta no válido: estructura incorrecta',
    };
  } catch {
    const hasSI =
      cleanContent.toUpperCase().includes('"SI"') ||
      cleanContent.toUpperCase().includes('SI:') ||
      cleanContent.includes('SI');
    const hasNO =
      cleanContent.toUpperCase().includes('"NO"') ||
      cleanContent.toUpperCase().includes('NO:') ||
      cleanContent.includes('NO');

    let confidence = 0;
    const confidenceMatch = cleanContent.match(/(?:confianza|confidence)[\s:]*(\d+)/i);
    if (confidenceMatch) {
      confidence = parseInt(confidenceMatch[1], 10);
    }

    if (hasSI && !hasNO) {
      return {
        respuesta: 'SI',
        confianza: Math.max(1, confidence),
        feedback: 'Formato de respuesta no válido, pero detectado como SI',
      };
    }

    if (hasNO) {
      return {
        respuesta: 'NO',
        confianza: Math.max(1, confidence),
        feedback: 'Formato de respuesta no válido, pero detectado como NO',
      };
    }

    return {
      respuesta: 'NO',
      confianza: 0,
      feedback: 'No se pudo parsear la respuesta del modelo',
    };
  }
};
