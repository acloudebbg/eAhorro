// Tipos de documentos para el área de cliente V2
// Estos tipos representan los diferentes documentos que pueden subirse
export type DocumentType =
  | 'vida-laboral'
  | 'contrato'
  | 'nominas'
  | 'dni-nie'
  | 'recibos-prestamos'
  | 'movimientos-bancarios'
  | 'declaracion-renta'
  | 'nota-simple'
  | 'tasacion'
  | 'arras'
  | 'justificante-ahorros'
  | 'documentacion-extra';

// Estados del modal de subida de documentos
export type ModalStep = 1 | 2 | 3 | 4;

// Resultado de validación del LLM
export interface ValidationResult {
  respuesta: 'SI' | 'NO';
  confianza: number; // 0-100
  documentType: DocumentType;
  feedback?: string;
}

// Estado de procesamiento durante la subida
export interface ProcessingState {
  progress: number;      // 0-100
  status: 'idle' | 'processing' | 'error' | 'complete';
  errorMessage?: string;
}

// Props para el modal de documento
export interface DocumentModalProps {
  documentLabel: string;
  documentOptions: DocumentOption[];
  onClose: () => void;
  onComplete: (result: ValidationResult, file: File | null) => void;
}

// Opción de documento para el selector
export interface DocumentOption {
  id: DocumentType;
  label: string;
  icon: string;
}

// Estado agregado de una sección de subida (hasta MAX_FILES_PER_SECTION ficheros),
// reportado al padre para calcular contadores y colores a nivel de apartado
export interface SectionUploadStatus {
  count: number;
  hasInvalid: boolean; // al menos un fichero de la sección no está validado
}

// Props para el componente principal DocumentUploadV2
export interface DocumentUploadV2Props {
  documentId: string;
  label: string;
  documentType: DocumentType;
  options?: DocumentOption[];
  onStatusChange: (status: SectionUploadStatus) => void;
}

// Un fichero subido dentro de una sección (una sección admite hasta MAX_FILES_PER_SECTION)
export interface UploadedFileEntry {
  entryId: string;
  file: File | null; // null cuando se recupera desde localStorage sin el File real
  fileName: string;
  fileType: string;
  fileSize: number;
  validationResult: ValidationResult;
}

// Estado de un documento en el área de cliente
export interface DocumentStatus {
  file: File | null;
  validationResult: ValidationResult | null;
  isValid: boolean; // confianza >= 80
  confidence: number | null;
}
