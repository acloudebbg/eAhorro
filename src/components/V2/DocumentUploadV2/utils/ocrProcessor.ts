/**
 * Procesador OCR usando Tesseract.js y pdfjs-dist
 * Extrae texto de imágenes y PDFs para validación
 */

import Tesseract from 'tesseract.js';
import { PDFDocument, rgb } from 'pdf-lib';
import { DocumentType } from '../../types';

// Configurar GlobalWorkerOptions para PDF.js
// Esto es necesario para que pdfjs-dist funcione correctamente
let pdfjsWorkerConfigured = false;
const configurePDFJSWorker = () => {
  if (pdfjsWorkerConfigured) return;
  
  try {
    // @ts-ignore - pdfjs-dist no tiene tipos TypeScript completos
    if (typeof window !== 'undefined') {
      // Usar el worker CDN de PDF.js
      // @ts-ignore
      window.pdfjsGlobalWorkerOptions = {
        workerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js',
      };
    }
    pdfjsWorkerConfigured = true;
    console.log('✅ PDF.js worker configurado');
  } catch (error) {
    console.warn('⚠️  No se pudo configurar PDF.js worker:', error);
  }
};

configurePDFJSWorker();

/**
 * Configuración específica de Tesseract para diferentes tipos de documentos
 */
const getTesseractConfig = (documentType?: DocumentType) => {
  // Para DNI/NIE, usar modo de página única y mejor precisión
  if (documentType === 'dni-nie') {
    return {
      lang: 'spa',
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK, // Mejor para documentos con bloques de texto
      tessedit_ocr_engine_mode: Tesseract.OEM.TESSERACT_LSTM,
      tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÜÑ<>', // Caracteres comunes en DNI
      preserve_interword_spaces: '1',
    };
  }
  
  // Para otros documentos, configuración estándar
  return {
    lang: 'spa',
    tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
    tessedit_ocr_engine_mode: Tesseract.OEM.TESSERACT_LSTM,
  };
};

/**
 * Preprocesamiento de imagen para mejorar el OCR
 * Convierte a escala de grises y mejora el contraste para documentos
 */
const preprocessImage = async (file: File): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      // Crear canvas para preprocesar
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('No se pudo crear contexto de canvas'));
        return;
      }
      
      // Establecer tamaño del canvas
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Dibujar imagen original
      ctx.drawImage(img, 0, 0);
      
      // Obtener datos de imagen
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Procesamiento: escala de grises + umbralización para mejorar contraste
      // Esto ayuda a Tesseract a leer mejor documentos con fondo claro y texto oscuro
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Convertir a escala de grises
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        
        // Aplicar umbral: si el píxel es oscuro (documento), mantenerlo; si es claro (fondo), hacerlo blanco
        const threshold = 180; // Ajustar según necesidad
        const value = gray < threshold ? 0 : 255;
        
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
      }
      
      // Dibujar imagen procesada
      ctx.putImageData(imageData, 0, 0);
      
      // Limpiar
      URL.revokeObjectURL(url);
      
      resolve(canvas);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo cargar la imagen'));
    };
    
    img.src = url;
  });
};

/**
 * Extrae texto de una imagen usando Tesseract.js OCR
 */
export const extractTextFromImage = async (
  file: File, 
  onProgress?: (progress: number) => void,
  documentType?: DocumentType,
  skipPreprocessing?: boolean // Para reintentos sin preprocesamiento
): Promise<string> => {
  try {
    // Verificar que el archivo es una imagen
    if (!file.type.startsWith('image/')) {
      throw new Error('El archivo no es una imagen válida');
    }

    console.log('📷 Iniciando OCR en imagen:', file.name, file.size, 'bytes');
    console.log('📄 Tipo de documento:', documentType || 'no especificado');
    
    // Configuración específica según tipo de documento
    const config = getTesseractConfig(documentType);
    
    // Para DNI/NIE y si no saltamos el preprocesamiento, preprocesar la imagen
    if (documentType === 'dni-nie' && !skipPreprocessing) {
      console.log('🎯 Usando configuración especializada para DNI/NIE');
      const processedCanvas = await preprocessImage(file);
      
      const { data: { text } } = await Tesseract.recognize(processedCanvas, config.lang, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            const progress = Math.round(m.progress * 100);
            console.log(`🔍 OCR DNI/NIE: ${progress}% completado`);
            onProgress?.(progress);
          }
        },
        tessedit_pageseg_mode: config.tessedit_pageseg_mode,
        tessedit_ocr_engine_mode: config.tessedit_ocr_engine_mode,
        // Para DNI/NIE, usar whitelist de caracteres
        tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÜÑ<>',
        preserve_interword_spaces: '1',
      });
      
      console.log('✅ OCR completado. Texto extraído:');
      console.log('--- Inicio texto ---');
      console.log(text.trim().substring(0, 500) + '...');
      console.log('--- Fin texto ---');
      
      return text.trim();
    }
    
    // Para otros documentos, usar procesamiento estándar
    const { data: { text } } = await Tesseract.recognize(file, config.lang, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          const progress = Math.round(m.progress * 100);
          console.log(`🔍 OCR: ${progress}% completado`);
          onProgress?.(progress);
        }
      },
      tessedit_pageseg_mode: config.tessedit_pageseg_mode,
      tessedit_ocr_engine_mode: config.tessedit_ocr_engine_mode,
    });

    console.log('✅ OCR completado. Texto extraído:');
    console.log('--- Inicio texto ---');
    console.log(text.trim().substring(0, 500) + '...');
    console.log('--- Fin texto ---');
    
    return text.trim();
  } catch (error) {
    console.error('❌ Error en OCR:', error);
    throw new Error('No se pudo extraer texto de la imagen: ' + (error as Error).message);
  }
};

/**
 * Extrae texto de un PDF usando pdfjs-dist
 * Versión mejorada con manejo de errores robusto
 */
export const extractTextFromPDF = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  try {
    console.log('📄 Iniciando extracción de texto de PDF:', file.name, file.size, 'bytes');
    
    // Asegurar que el worker está configurado
    configurePDFJSWorker();
    
    // @ts-ignore - pdfjs-dist no tiene tipos TypeScript completos
    const pdfjsLib = await import('pdfjs-dist');
    
    // Verificar que el archivo es PDF
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      throw new Error('El archivo no parece ser un PDF válido');
    }
    
    // Cargar el PDF
    const arrayBuffer = await file.arrayBuffer();
    
    // Configurar el worker específicamente para esta tarea
    // @ts-ignore
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      // @ts-ignore
      cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/cmaps/',
      cMapPacked: true,
    });
    
    loadingTask.onProgress = (progressData) => {
      const progress = Math.round((progressData.loaded / progressData.total) * 100);
      console.log(`📖 PDF Loading: ${progress}%`);
      onProgress?.(progress * 0.5); // Primera mitad: carga del PDF
    };
    
    const pdf = await loadingTask.promise;
    
    let extractedText = '';
    const totalPages = pdf.numPages;
    
    console.log(`📄 PDF con ${totalPages} páginas`);
    
    // Extraer texto de cada página
    for (let i = 1; i <= totalPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Concatenar todos los items de texto
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        
        extractedText += pageText + '\n';
        
        // Progreso: 50% (carga) + 50% * (página actual / total)
        const progress = 50 + Math.round((i / totalPages) * 50);
        console.log(`📖 Extrayendo página ${i}/${totalPages}: ${progress}%`);
        onProgress?.(progress);
      } catch (pageError) {
        console.error(`❌ Error al extraer página ${i}:`, pageError);
        // Continuar con las demás páginas
        continue;
      }
    }
    
    if (extractedText.trim().length === 0) {
      console.warn('⚠️  No se extrajo texto del PDF. El PDF podría ser solo imágenes.');
      throw new Error('PDF sin texto extraíble. Podría ser un PDF de imágenes.');
    }
    
    console.log('✅ Extracción de PDF completada. Texto extraído:', extractedText.length, 'caracteres');
    console.log('--- Inicio texto (primeros 500 chars) ---');
    console.log(extractedText.substring(0, 500) + '...');
    console.log('--- Fin texto ---');
    
    return extractedText.trim();
  } catch (error) {
    console.error('❌ Error al extraer texto de PDF:', error);
    throw new Error('No se pudo extraer texto del PDF: ' + (error as Error).message);
  }
};

/**
 * Formatear texto extraído
 */
export const formatExtractedText = (text: string): string => {
  // Limpiar texto extraído
  return text
    .replace(/\s+/g, ' ')      // Reemplazar múltiples espacios por uno
    .replace(/[\x00-\x1F\x7F]/g, '')  // Eliminar caracteres de control
    .trim();
};

/**
 * Intenta extraer texto de un PDF con múltiples estrategias
 * 1. PDF.js tradicional
 * 2. Si falla, intenta con diferentes configuraciones
 */
export const extractTextFromPDFWithFallback = async (
  file: File, 
  onProgress?: (progress: number) => void
): Promise<{ text: string; method: string }> => {
  const strategies = [
    {
      name: 'pdfjs-standard',
      fn: () => extractTextFromPDF(file, onProgress),
    },
    {
      name: 'pdfjs-legacy',
      fn: async () => {
        // Intentar con configuración legacy
        // @ts-ignore
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
        // @ts-ignore
        window.pdfjsGlobalWorkerOptions = {
          workerSrc: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js',
        };
        
        const arrayBuffer = await file.arrayBuffer();
        // @ts-ignore
        const loadingTask = pdfjsLib.getDocument(arrayBuffer);
        const pdf = await loadingTask.promise;
        
        let extractedText = '';
        const totalPages = pdf.numPages;
        
        for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          extractedText += pageText + '\n';
        }
        
        return extractedText.trim();
      },
    },
  ];
  
  for (const strategy of strategies) {
    try {
      console.log(`🔄 Intentando estrategia ${strategy.name}...`);
      const text = await strategy.fn();
      
      if (text && text.trim().length > 0) {
        console.log(`✅ Estrategia ${strategy.name} exitosa. Texto extraído: ${text.length} caracteres`);
        return { text, method: strategy.name };
      }
    } catch (error) {
      console.error(`❌ Estrategia ${strategy.name} falló:`, error);
    }
  }
  
  throw new Error('Todas las estrategias de extracción de PDF fallaron');
};

/**
 * Procesa un archivo (imagen o PDF) para extraer texto
 * Con manejo de errores mejorado
 */
export const processFileForText = async (
  file: File,
  onProgress?: (progress: number) => void,
  documentType?: DocumentType
): Promise<string> => {
  try {
    // Si es imagen, usar OCR
    if (file.type.startsWith('image/')) {
      console.log('🔍 Procesando imagen con OCR...');
      const text = await extractTextFromImage(file, onProgress, documentType);
      return formatExtractedText(text);
    }
    
    // Si es PDF, extraer texto directamente
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      console.log('📄 Procesando PDF...');
      const { text } = await extractTextFromPDFWithFallback(file, onProgress);
      return formatExtractedText(text);
    }
    
    throw new Error('Tipo de archivo no soportado: ' + file.type);
  } catch (error) {
    console.error('❌ Error en processFileForText:', error);
    throw error;
  }
};

/**
 * Función de simulación robusta para validación de documentos
 * Devuelve resultados realistas basados en el tipo de documento
 * Útil cuando el OCR falla o no hay API Key disponible
 */
export const simulateDocumentValidation = (
  fileName: string,
  documentType: DocumentType,
  fileSize: number,
  fileType: string
): { text: string; isValid: boolean; confidence: number; feedback: string } => {
  console.log('🎭 Usando simulación robusta para:', documentType);
  
  // Generar contenido simulado realista basado en el tipo de documento
  const simulations: Record<DocumentType, { baseText: string; minConfidence: number; maxConfidence: number }> = {
    'dni-nie': {
      baseText: `DOCUMENTO NACIONAL DE IDENTIDAD
Número: 12345678A
Apellidos: GARCIA LOPEZ
Nombre: JUAN
Fecha de nacimiento: 15/05/1985
Lugar de nacimiento: MADRID
Fecha de expedición: 10/01/2020
Fecha de caducidad: 10/01/2030
Sexo: VARON
Firma: [FIRMA DIGITAL]`,
      minConfidence: 85,
      maxConfidence: 98,
    },
    'vida-laboral': {
      baseText: `VIDA LABORAL - SEGURIDAD SOCIAL
Número de afiliación: 28/12345678/01
Nombre: GARCIA LOPEZ, JUAN
Períodos de cotización:
- Desde 01/01/2015 hasta 31/12/2024
  Empresa: EMPRESA SA (CIF: A12345678)
  Base de cotización: 2000.00 €/mes
  Días cotizados: 2190 días
Situación actual: ALTA`,
      minConfidence: 88,
      maxConfidence: 95,
    },
    'contrato': {
      baseText: `CONTRATO DE TRABAJO
Empleador: EMPRESA SA (CIF: A12345678, Dirección: Calle Mayor 1, Madrid)
Trabajador: JUAN GARCIA LOPEZ (DNI: 12345678A)
Tipo de contrato: INDEFINIDO
Fecha de inicio: 01/01/2020
Salario base: 1800.00 €/mes
Complementos: 200.00 € (antigüedad)
Horario: 40 horas/semana
Lugar de trabajo: Madrid
Firmado por ambas partes: SÍ`,
      minConfidence: 90,
      maxConfidence: 96,
    },
    'nominas': {
      baseText: `NOMINA - EMPRESA SA
Trabajador: JUAN GARCIA LOPEZ
Periodo: 01/2024 - 31/01/2024
Salario base: 1800.00 €
Complementos: 200.00 €
Deducciones IRPF: 150.00 €
Deducciones Seguridad Social: 100.00 €
Salario neto: 1750.00 €
Días trabajados: 31
Fecha de pago: 05/02/2024`,
      minConfidence: 85,
      maxConfidence: 92,
    },
    'declaracion-renta': {
      baseText: `DECLARACIÓN DE LA RENTA - EJERCICIO 2023
Declarante: JUAN GARCIA LOPEZ (DNI: 12345678A)
Base imponible: 30000.00 €
Tipo de gravamen: 24%
Cuota íntegra: 7200.00 €
Deducciones aplicadas: 1500.00 €
Resultado de la liquidación: A DEVOLVER 1200.00 €
Fecha de presentación: 25/06/2024`,
      minConfidence: 87,
      maxConfidence: 94,
    },
    'movimientos-bancarios': {
      baseText: `EXTRACTO DE MOVIMIENTOS BANCARIOS
Titular: JUAN GARCIA LOPEZ
Cuenta: ESXX 1234 5678 9012 3456 7890
Periodo: 01/01/2024 - 31/03/2024
Saldo inicial: 5000.00 €

Movimientos:
05/01/2024 - NOMINA EMPRESA SA - +1750.00 € - Saldo: 6750.00 €
10/01/2024 - ALQUILER - -800.00 € - Saldo: 5950.00 €
15/01/2024 - LUZ - -100.00 € - Saldo: 5850.00 €`,
      minConfidence: 84,
      maxConfidence: 91,
    },
    'recibos-prestamos': {
      baseText: `RECIBO DE PRESTAMO HIPOTECARIO
Entidad: BANCO POPULAR
Número de préstamo: HIP-2024-12345
Titular: JUAN GARCIA LOPEZ
Capital pendiente: 150000.00 €
Cuota mensual: 650.00 €
Tipo de interés: 2.5%
Fecha de pago: 01/04/2024
Desglose: Capital 300.00 € + Intereses 350.00 €`,
      minConfidence: 89,
      maxConfidence: 95,
    },
    'nota-simple': {
      baseText: `NOTA SIMPLE INFORMATIVA
Registro de la Propiedad de Madrid
Finca: URBANA, Nº 12345
Titulares: JUAN GARCIA LOPEZ (100%)
Superficie: 85.00 m²
Uso: VIVIENDA
Cargas: HIPOTECA a favor de BANCO POPULAR por 150000.00 €
Fecha de inscripción: 15/03/2020`,
      minConfidence: 86,
      maxConfidence: 93,
    },
    'tasacion': {
      baseText: `INFORME DE TASACIÓN
Sociedad: TASADORA OFICIAL SA
Dirección: Calle Mayor 100, Madrid
Superficie: 85.00 m²
Distribución: 3 dormitorios, 2 baños, salón, cocina
Año de construcción: 2010
Valor de tasación: 200000.00 €
Metodología: Comparación de mercado
Fecha del informe: 15/03/2024`,
      minConfidence: 88,
      maxConfidence: 94,
    },
    'arras': {
      baseText: `CONTRATO DE ARRAS
Comprador: JUAN GARCIA LOPEZ (DNI: 12345678A)
Vendedor: MARIA MARTINEZ SANCHEZ (DNI: 87654321B)
Propiedad: Piso en Calle Mayor 100, Madrid
Precio de venta: 200000.00 €
Señal entregada: 10000.00 €
Plazo para compraventa: 30 días
Condiciones: La señal es a cuenta del precio`,
      minConfidence: 87,
      maxConfidence: 93,
    },
    'justificante-ahorros': {
      baseText: `JUSTIFICANTE DE AHORROS
Entidad: BANCO POPULAR
Titular: JUAN GARCIA LOPEZ (DNI: 12345678A)
Cuenta: ESXX 1234 5678 9012 3456 7890
Tipo: CUENTA DE AHORRO
Saldo actual: 25000.00 €
Fecha: 01/04/2024`,
      minConfidence: 85,
      maxConfidence: 92,
    },
    'documentacion-extra': {
      baseText: `DOCUMENTACIÓN ADICIONAL
Descripción: Certificado de empadronamiento
Expedido por: Ayuntamiento de Madrid
Fecha: 01/04/2024
Titular: JUAN GARCIA LOPEZ`,
      minConfidence: 75,
      maxConfidence: 85,
    },
  };
  
  const simulation = simulations[documentType] || simulations['documentacion-extra'];
  
  // Añadir información del archivo al texto simulado
  const header = `Archivo: ${fileName}\nTipo: ${fileType}\nTamaño: ${(fileSize / 1024).toFixed(2)} KB\n\n`;
  const fullText = header + simulation.baseText;
  
  // Generar confianza aleatoria realista
  const confidence = Math.floor(Math.random() * (simulation.maxConfidence - simulation.minConfidence + 1)) + simulation.minConfidence;
  
  // Determinar validez basado en la confianza (coherente con CONFIDENCE_THRESHOLD = 80)
  // Para simulación, usamos el mismo umbral: >= 80 es válido
  const isValid = confidence >= 80;
  
  const feedback = isValid 
    ? `Documento simulado validado correctamente para ${documentType}`
    : `Documento simulado: algunos datos no coinciden con el formato esperado para ${documentType}`;
  
  return {
    text: fullText,
    isValid,
    confidence,
    feedback,
  };
};

/**
 * Convierte texto a PDF usando pdf-lib
 */
export const convertTextToPDF = async (
  text: string,
  originalFileName: string,
  onProgress?: (progress: number) => void
): Promise<File> => {
  try {
    console.log('📝 Convirtendo texto a PDF...');
    
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // Tamaño A4
    
    // Añadir texto al PDF
    page.drawText(text, {
      x: 50,
      y: 800,
      size: 12,
      color: rgb(0, 0, 0),
      lineHeight: 16,
    });
    
    // Serializar el PDF
    const pdfBytes = await pdfDoc.save();
    
    console.log('✅ PDF generado. Tamaño:', pdfBytes.length, 'bytes');
    
    // Crear un objeto File
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const pdfFile = new File([blob], `converted_${originalFileName}.pdf`, {
      type: 'application/pdf',
    });
    
    onProgress?.(100);
    return pdfFile;
  } catch (error) {
    console.error('❌ Error al convertir a PDF:', error);
    throw new Error('No se pudo convertir a PDF: ' + (error as Error).message);
  }
};

/**
 * Procesa completamente un archivo: extrae texto, convierte a PDF y prepara para validación
 * Para imágenes: OCR + convertir a PDF
 * Para PDFs: extraer texto + mantener el PDF original
 * Si todo falla, usa simulación robusta
 */
export const processFileForValidation = async (
  file: File,
  onProgress?: (progress: number) => void,
  documentType?: DocumentType
): Promise<{ 
  text: string; 
  pdfFile: File; 
  wasConverted: boolean;
  usedSimulation: boolean; // Si se usó simulación
}> => {
  try {
    console.log('🚀 Iniciando procesamiento completo del archivo:', file.name);
    console.log('📄 Tipo de documento:', documentType || 'no especificado');
    const startTime = Date.now();
    
    let text = '';
    let usedSimulation = false;
    
    // Intentar extraer texto
    try {
      text = await processFileForText(file, (progress) => {
        onProgress?.(Math.round(progress * 0.7)); // 70% del progreso para extracción
      }, documentType);
      
      console.log(`✅ Texto extraído correctamente: ${text.length} caracteres`);
      
      // Validar que el texto extraído tiene contenido mínimo
      if (text.trim().length < 50) {
        console.warn('⚠️  Texto extraído demasiado corto (${text.length} caracteres). Usando simulación...');
        const simulation = simulateDocumentValidation(file.name, documentType || 'documentacion-extra', file.size, file.type);
        text = simulation.text;
        usedSimulation = true;
      }
    } catch (extractionError) {
      console.error('❌ Falló la extracción de texto:', extractionError);
      console.log('🎭 Usando simulación robusta como fallback...');
      
      // Usar simulación como fallback
      const simulation = simulateDocumentValidation(file.name, documentType || 'documentacion-extra', file.size, file.type);
      text = simulation.text;
      usedSimulation = true;
    }
    
    console.log(`⏱️  Extracción completada en ${Date.now() - startTime}ms`);
    
    let pdfFile = file;
    let wasConverted = false;
    
    // Si es imagen, convertir a PDF
    if (file.type.startsWith('image/') && !usedSimulation) {
      console.log('🖼️  Archivo es imagen, convirtiendo a PDF...');
      pdfFile = await convertTextToPDF(text, file.name, (progress) => {
        onProgress?.(70 + Math.round(progress * 0.3)); // 30% del progreso para conversión
      });
      wasConverted = true;
      console.log('✅ Imagen convertida a PDF');
    }
    
    console.log(`⏱️  Procesamiento completo en ${Date.now() - startTime}ms`);
    console.log('--- Resumen ---');
    console.log('📄 Tipo:', file.type);
    console.log('📝 Texto extraído:', text.length, 'caracteres');
    console.log('📁 Archivo de salida:', pdfFile.name, pdfFile.size, 'bytes');
    console.log('🔄 Convertido:', wasConverted ? 'Sí' : 'No');
    console.log('🎭 Simulación usada:', usedSimulation ? 'Sí' : 'No');
    console.log('-----------------');
    
    return { text, pdfFile, wasConverted, usedSimulation };
  } catch (error) {
    console.error('❌ Error en procesamiento completo:', error);
    throw error;
  }
};

export default {
  extractTextFromImage,
  extractTextFromPDF,
  extractTextFromPDFWithFallback,
  formatExtractedText,
  processFileForText,
  convertTextToPDF,
  processFileForValidation,
  simulateDocumentValidation,
};
