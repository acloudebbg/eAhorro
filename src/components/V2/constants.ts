// ============================================
// CONSTANTES PARA EL SISTEMA DE SUBIDA V2
// ============================================

import { DocumentType, DocumentOption } from './types';

// Colores según especificación de diseño
export const COLORS = {
  modalBackground: '#ffffff',
  stepActive: '#00a8e8',
  stepInactive: '#e9ecef',
  captureButton: '#00a8e8',
  success: '#28a745',
  error: '#dc3545',
  progressBar: '#00a8e8',
  progressBg: '#e9ecef',
  pdfPreviewBorder: '#00a8e8',
  documentButtonBg: '#f8f9fa',
  documentButtonBorder: '#dee2e6',
} as const;

// Pasos del modal de subida
export const STEPS = [
  { id: 1, label: 'Tipo' },
  { id: 2, label: 'Captura' },
  { id: 3, label: 'Procesando' },
  { id: 4, label: 'Validado' },
] as const;

// Descripciones detalladas para cada tipo de documento
// Estas descripciones se usan en el prompt del LLM para validación
export const DOCUMENT_LABELS: Record<string, string> = {
  'vida-laboral': 'Vida laboral oficial de la Seguridad Social de España. Debe contener histórico completo de empleos, nombres de empresas, periodos exactos de cotización, bases de cotización y números de afiliación a la Seguridad Social. Documento emitido por la Tesorería General de la Seguridad Social.',
  
  'contrato': 'Contrato de trabajo válido en España. Debe contener: datos completos del empleador (nombre, CIF, dirección), datos del trabajador (nombre, DNI/NIE), tipo de contrato (indefinido, temporal, obra, etc.), fecha de inicio, duración, salario base, complementos salariales, horario de trabajo, lugar de trabajo y condiciones de rescisión. Firmado por ambas partes.',
  
  'nominas': 'Tres últimas nóminas consecutivas. Cada nómina debe contener: nombre de la empresa, CIF de la empresa, nombre del trabajador, periodo de liquidación (mes y año), salario base, complementos (antigüedad, plus transporte, etc.), deducciones (IRPF, Seguridad Social), salario neto, días trabajados y fecha de pago. Documentos oficiales emitidos por el departamento de nóminas de la empresa.',
  
  'dni-nie': 'Documento Nacional de Identidad (DNI) o Número de Identidad de Extranjero (NIE) español. El DNI debe mostrar: número de documento, nombre completo, apellidos, fecha de nacimiento, lugar de nacimiento, fecha de expedición, fecha de caducidad, foto y firma. El NIE debe mostrar: número de documento (letra + 7 dígitos + letra), nombre completo, apellidos, nacionalidad, fecha de nacimiento y fecha de asignación.',
  
  'recibos-prestamos': 'Recibos de préstamos bancarios. Debe contener: entidad bancaria, número de préstamo, nombre del titular, importe del préstamo, tipo de interés, cuota mensual, fecha de inicio, fecha de finalización, capital pendiente y desglose de la cuota (capital, intereses). Documento oficial emitido por la entidad financiera.',
  
  'movimientos-bancarios': 'Extracto de movimientos bancarios de los últimos 3-6 meses. Debe contener: nombre del titular, número de cuenta (IBAN), entidad bancaria, lista detallada de movimientos (fecha, concepto, importe, saldo resultante), Periodo cubierto por el extracto. Documento oficial emitido por el banco.',
  
  'declaracion-renta': 'Declaración de la Renta (IRPF) del último ejercicio fiscal. Debe contener: ejercicio fiscal, datos del declarante (nombre, DNI/NIE), base imponible, tipo de gravamen, cuota íntegra, deducciones aplicadas, resultado de la liquidación (a pagar o a devolver) y fecha de presentación. Documento oficial de la Agencia Tributaria.',
  
  'nota-simple': 'Nota Simple Informativa de la propiedad. Debe contener: datos del registrador, datos de la finca (número de finca registral, situación, linderos), titulares (nombres, porcentajes de propiedad), cargas (hipotecas, embargos), superficie, uso (vivienda, local, etc.) y fecha de inscripción. Documento emitido por el Registro de la Propiedad.',
  
  'tasacion': 'Informe de tasación de vivienda. Debe contener: datos de la sociedad de tasación, datos de la propiedad (dirección, superficie, distribución, año de construcción), valor de tasación, metodología utilizada, fecha del informe y número de registro. Documento oficial emitido por sociedad de tasación homologada.',
  
  'arras': 'Contrato de arras o señal. Debe contener: partes intervinientes (comprador y vendedor), descripción detallada de la propiedad, precio de venta acordado, cantidad entregada como señal, plazo para la compraventa definitiva, condiciones de devolución de la señal y firma de ambas partes. Documento con validez legal.',
  
  'justificante-ahorros': 'Justificante de ahorros. Debe contener: entidad bancaria, titular de la cuenta, número de cuenta, tipo de producto (cuenta de ahorro, depósito, etc.), saldo actual, historial de movimientos relevantes y fecha del documento. Documento oficial del banco.',
  
  'documentacion-extra': 'Documentación adicional relevante para el proceso hipotecario. Puede incluir cualquier documento que aporte información relevante para la evaluación de la solicitud.',
} as const;

// Opciones de documento para el selector del paso 1
export const DOCUMENT_OPTIONS: Record<DocumentType, DocumentOption> = {
  'vida-laboral': { id: 'vida-laboral', label: 'Vida Laboral', icon: '👤' },
  'contrato': { id: 'contrato', label: 'Contrato', icon: '📄' },
  'nominas': { id: 'nominas', label: 'Nóminas (3 últimas)', icon: '💰' },
  'dni-nie': { id: 'dni-nie', label: 'DNI/NIE', icon: '🆔' },
  'recibos-prestamos': { id: 'recibos-prestamos', label: 'Recibos Préstamos', icon: '🏦' },
  'movimientos-bancarios': { id: 'movimientos-bancarios', label: 'Movimientos Bancarios', icon: '💳' },
  'declaracion-renta': { id: 'declaracion-renta', label: 'Declaración Renta', icon: '📊' },
  'nota-simple': { id: 'nota-simple', label: 'Nota Simple', icon: '🏠' },
  'tasacion': { id: 'tasacion', label: 'Tasación', icon: '📈' },
  'arras': { id: 'arras', label: 'Arras', icon: '🤝' },
  'justificante-ahorros': { id: 'justificante-ahorros', label: 'Justificante Ahorros', icon: '💸' },
  'documentacion-extra': { id: 'documentacion-extra', label: 'Documentación Extra', icon: '📋' },
} as const;

// Umbral de confianza para considerar un documento válido
export const CONFIDENCE_THRESHOLD = 80;

// Tamaño máximo de archivo en MB
// Limitado a 4MB para respetar el límite de payload (~6MB) de las Netlify Functions síncronas,
// que reciben el archivo codificado en base64 (~33% más pesado que el binario original)
export const MAX_FILE_SIZE_MB = 4;

// Formatos de archivo aceptados
export const ACCEPTED_FORMATS = ['.pdf', '.jpg', '.jpeg', '.png'] as const;

// Endpoint del proxy (Netlify Function) que valida el documento con Claude
export const VALIDATE_DOCUMENT_ENDPOINT = '/api/validate-document' as const;
