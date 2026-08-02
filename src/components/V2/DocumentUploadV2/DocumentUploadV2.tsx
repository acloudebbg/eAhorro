import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DocumentModal } from './DocumentModal';
import { ValidationResult, DocumentType, DocumentOption, DocumentUploadV2Props } from '../types';
import { COLORS, DOCUMENT_OPTIONS, CONFIDENCE_THRESHOLD } from '../constants';

// Clave para guardado en localStorage
const STORAGE_KEY = 'clientAreaV2_documents';

interface SavedDocumentState {
  documentId: string;
  fileName: string;
  fileType: string;
  validationResult: ValidationResult;
  fileSize: number;
  timestamp: number;
}

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
`;

const UploadButton = styled.button`
  width: 100%;
  padding: var(--spacing-lg);
  background: ${COLORS.documentButtonBg};
  color: var(--color-secondary);
  border: 2px dashed ${COLORS.documentButtonBorder};
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);

  &:hover {
    background: #e9ecef;
    border-color: ${COLORS.stepActive};
    color: ${COLORS.stepActive};
  }

  .icon {
    font-size: 2rem;
  }
`;

const FileCard = styled.div<{ isValid: boolean; hasError: boolean }>`
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ isValid, hasError }) => 
    isValid ? COLORS.success : 
    hasError ? COLORS.error : 
    COLORS.documentButtonBorder};
  border-radius: var(--radius-md);
  background: white;
  padding: var(--spacing-sm);
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
  background: ${COLORS.documentButtonBg};
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-sm);
  min-height: 80px;

  .thumbnail {
    max-width: 100%;
    max-height: 120px;
    border-radius: var(--radius-sm);
  }

  .file-icon {
    font-size: 2.5rem;
    color: var(--color-gray-500);
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-xs);
  padding-bottom: var(--spacing-xs);
`;

const StatusBadge = styled.div<{ isValid: boolean; hasError: boolean }>`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ isValid, hasError }) => 
    isValid ? COLORS.success : 
    hasError ? COLORS.error : 
    'var(--color-gray-400)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

const FileDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const ConfidenceBadge = styled.span<{ isValid: boolean }>`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background: ${({ isValid }) => (isValid ? COLORS.success : COLORS.error)};
  padding: 2px 8px;
  border-radius: var(--radius-full);
  margin-left: var(--spacing-xs);
`;

const FileMeta = styled.div`
  font-size: 0.75rem;
  color: var(--color-gray-500);
  display: flex;
  gap: var(--spacing-sm);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
  padding-top: var(--spacing-xs);
  border-top: 1px solid var(--color-gray-200);
`;

const ActionButton = styled.button<{ variant: 'view' | 'delete' }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ variant }) => (variant === 'view' ? COLORS.stepActive : COLORS.error)};

  &:hover {
    background: ${({ variant }) => (variant === 'view' ? 'rgba(0, 168, 232, 0.1)' : 'rgba(220, 53, 69, 0.1)')};
  }
`;

// Funciones para persistencia
const getStorageKey = (userId: string = 'default') => `${STORAGE_KEY}_${userId}`;

const saveDocumentState = (documentId: string, state: SavedDocumentState | null) => {
  try {
    const storageKey = getStorageKey();
    const allStates = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    if (state === null) {
      delete allStates[documentId];
    } else {
      allStates[documentId] = state;
    }
    
    localStorage.setItem(storageKey, JSON.stringify(allStates));
  } catch (error) {
    console.error('Error al guardar estado:', error);
  }
};

const loadDocumentState = (documentId: string): SavedDocumentState | null => {
  try {
    const storageKey = getStorageKey();
    const allStates = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return allStates[documentId] || null;
  } catch (error) {
    console.error('Error al cargar estado:', error);
    return null;
  }
};

const DocumentUploadV2: React.FC<DocumentUploadV2Props> = ({
  documentId,
  label,
  documentType,
  options = [],
  onUploadComplete,
  onRemove,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const thumbnailRef = useRef<string | null>(null);

  // Usar opciones específicas si se proporcionan, sino usar todas
  const docOptions: DocumentOption[] = options.length > 0 ? options : Object.values(DOCUMENT_OPTIONS);

  // Cargar estado persistido al montar el componente
  useEffect(() => {
    const savedState = loadDocumentState(documentId);
    if (savedState) {
      // No podemos recrear el objeto File real desde localStorage
      // Mostramos la información pero sin thumbnail
      // El usuario tendrá que volver a subir el archivo para ver el thumbnail
      const mockFile = {
        name: savedState.fileName,
        type: savedState.fileType,
        size: savedState.fileSize,
      } as File;
      
      setValidationResult(savedState.validationResult);
      // No establecemos uploadedFile para evitar problemas con URL.createObjectURL
      // Solo mostramos el estado de validación
    }
  }, [documentId]);

  // Guardar estado al completarse la subida
  useEffect(() => {
    if (validationResult && uploadedFile) {
      const state: SavedDocumentState = {
        documentId,
        fileName: uploadedFile.name,
        fileType: uploadedFile.type,
        validationResult,
        fileSize: uploadedFile.size,
        timestamp: Date.now(),
      };
      saveDocumentState(documentId, state);
    }
  }, [documentId, validationResult, uploadedFile]);

  // Limpiar estado al eliminar
  useEffect(() => {
    if (!uploadedFile && !validationResult) {
      saveDocumentState(documentId, null);
    }
  }, [documentId, uploadedFile, validationResult]);

  // Limpiar blob URLs al desmontar
  useEffect(() => {
    return () => {
      if (thumbnailRef.current) {
        URL.revokeObjectURL(thumbnailRef.current);
        thumbnailRef.current = null;
      }
    };
  }, []);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUploadComplete = (result: ValidationResult, file: File | null) => {
    if (file) {
      setUploadedFile(file);
      setValidationResult(result);
      onUploadComplete(result, file);
    }
    setIsModalOpen(false);
  };

  const handleRemove = () => {
    // Limpiar el blob URL
    if (thumbnailRef.current) {
      URL.revokeObjectURL(thumbnailRef.current);
      thumbnailRef.current = null;
    }
    
    setUploadedFile(null);
    setValidationResult(null);
    onRemove();
    saveDocumentState(documentId, null);
  };

  const handleViewDetails = () => {
    if (validationResult && uploadedFile) {
      const details = `
Detalles del documento:

📄 Nombre: ${uploadedFile.name}
📊 Tipo: ${validationResult.documentType}
🎯 Respuesta: ${validationResult.respuesta}
✅ Confianza: ${validationResult.confianza}%
${validationResult.feedback ? `💬 Feedback: ${validationResult.feedback}` : ''}
📏 Tamaño: ${(uploadedFile.size / 1024).toFixed(2)} KB
📅 Fecha: ${new Date().toLocaleString()}
      `;
      alert(details);
    }
  };

  const isValid = validationResult?.respuesta === 'SI' && validationResult?.confianza >= CONFIDENCE_THRESHOLD;
  const hasError = validationResult && !isValid;
  const confidence = validationResult?.confianza;

  // Función para obtener icono de archivo según tipo
  const getFileIcon = () => {
    if (!uploadedFile) return '📁';
    
    if (uploadedFile.type.startsWith('image/')) return '🖼️';
    if (uploadedFile.type === 'application/pdf') return '📄';
    return '📁';
  };

  // Función para obtener URL de miniatura (para imágenes)
  const getThumbnailUrl = () => {
    if (!uploadedFile || !uploadedFile.type.startsWith('image/')) return null;
    
    // Si ya tenemos una URL, usarla
    if (thumbnailRef.current) {
      return thumbnailRef.current;
    }
    
    // Crear nueva URL y guardarla en el ref
    const url = URL.createObjectURL(uploadedFile);
    thumbnailRef.current = url;
    return url;
  };

  return (
    <UploadContainer>
      {uploadedFile ? (
        <FileCard isValid={isValid} hasError={hasError}>
          {/* Botón X para eliminar rápidamente */}
          <StatusBadge 
            isValid={isValid} 
            hasError={hasError}
            onClick={(e) => { e.stopPropagation(); handleRemove(); }}
            title="Eliminar documento"
          >
            {isValid ? '✓' : hasError ? '✗' : '?'}
          </StatusBadge>

          {/* Preview del archivo */}
          <FilePreview onClick={handleViewDetails}>
            {getThumbnailUrl() ? (
              <img 
                src={getThumbnailUrl()} 
                alt={uploadedFile.name} 
                className="thumbnail"
              />
            ) : (
              <div className="file-icon">{getFileIcon()}</div>
            )}
          </FilePreview>

          {/* Información del archivo */}
          <FileInfo>
            <FileDetails>
              <FileName>{uploadedFile.name}</FileName>
              <FileMeta>
                <span>{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                <span>{uploadedFile.type}</span>
              </FileMeta>
            </FileDetails>
            {confidence !== undefined && (
              <ConfidenceBadge isValid={isValid}>
                {confidence}%
              </ConfidenceBadge>
            )}
          </FileInfo>

          {/* Botones de acción */}
          <ActionButtons>
            <ActionButton variant="view" onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}>
              👁️ Ver detalles
            </ActionButton>
            <ActionButton variant="delete" onClick={(e) => { e.stopPropagation(); handleRemove(); }}>
              🗑️ Eliminar
            </ActionButton>
          </ActionButtons>
        </FileCard>
      ) : (
        <UploadButton onClick={handleUploadClick}>
          <span className="icon">📁</span>
          <span>Subir {label}</span>
        </UploadButton>
      )}

      {isModalOpen && (
        <DocumentModal
          documentLabel={label}
          documentType={documentType}
          initialStep={2}
          onClose={handleModalClose}
          onComplete={handleUploadComplete}
        />
      )}
    </UploadContainer>
  );
};

export default DocumentUploadV2;
