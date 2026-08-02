/**
 * Procesador OCR usando Tesseract.js
 * Extrae texto de imágenes para posterior validación
 */

import Tesseract from 'tesseract.js';
import { DocumentType } from '../../types';

/**
 * Extrae texto de una imagen usando Tesseract.js OCR
 */
export const extractTextFromImage = async (file: File): Promise<string> => {
  try {
    // Verificar que el archivo es una imagen
    if (!file.type.startsWith('image/')) {
      throw new Error('El archivo no es una imagen válida');
    }

    // Configurar Tesseract para español
    const { data: { text } } = await Tesseract.recognize(file, 'spa', {
      logger: (m) => {
        // Log de progreso (opcional)
        if (m.status === 'recognizing text') {
          console.log(`OCR: ${Math.round(m.progress * 100)}% completado`);
        }
      },
      // Opciones adicionales para mejorar la precisión
      tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
      tessedit_ocr_engine_mode: Tesseract.OEM.TESSERACT_LSTM,
    });

    return text.trim();
  } catch (error) {
    console.error('Error en OCR:', error);
    throw new Error('No se pudo extraer texto de la imagen: ' + (error as Error).message);
  }
};

/**
 * Convierte texto extraído en un formato legible para validación
 */
export const formatExtractedText = (text: string): string => {
  // Limpiar texto extraído
  return text
    .replace(/\s+/g, ' ')      // Reemplazar múltiples espacios por uno
    .replace(/[\x00-\x1F\x7F]/g, '')  // Eliminar caracteres de control
    .trim();
};

/**
 * Procesa un archivo (imagen o PDF) para extraer texto
 */
export const processFileForText = async (file: File): Promise<string> => {
  // Si es imagen, usar OCR
  if (file.type.startsWith('image/')) {
    const text = await extractTextFromImage(file);
    return formatExtractedText(text);
  }
  
  // Si es PDF, extraer texto directamente
  if (file.type === 'application/pdf') {
    // En implementación real, usar pdf.js
    // Por ahora, devolvemos un mensaje
    return `[PDF: ${file.name}] - Contenido a extraer con pdf.js`;
  }
  
  throw new Error('Tipo de archivo no soportado');
};

/**
 * Convierte texto a PDF (simulación - en producción usar pdf-lib o similar)
 */
export const convertToPDF = async (text: string, originalFile: File): Promise<File> => {
  // En implementación real, crear un PDF con el texto extraído
  // Por ahora, devolvemos el archivo original
  console.log('Texto convertido a PDF (simulación):', text.substring(0, 200) + '...');
  return originalFile;
};

/**
 * Procesa completamente un archivo: extrae texto, convierte a PDF y prepara para validación
 */
export const processFileForValidation = async (file: File): Promise<{ text: string; pdfFile: File }> => {
  // Extraer texto
  const text = await processFileForText(file);
  
  // Convertir a PDF (simulación)
  const pdfFile = await convertToPDF(text, file);
  
  return { text, pdfFile };
};

export default {
  extractTextFromImage,
  formatExtractedText,
  processFileForText,
  convertToPDF,
  processFileForValidation,
};
