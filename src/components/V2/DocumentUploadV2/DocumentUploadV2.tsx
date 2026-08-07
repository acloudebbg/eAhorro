import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { DocumentModal } from './DocumentModal';
import { ValidationResult, DocumentUploadV2Props, UploadedFileEntry } from '../types';
import { COLORS, CONFIDENCE_THRESHOLD, MAX_FILES_PER_SECTION } from '../constants';

// Clave para guardado en localStorage
const STORAGE_KEY = 'clientAreaV2_documents';

// Metadatos persistidos de un fichero (el File real no se puede serializar)
interface SavedFileEntry {
  entryId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  validationResult: ValidationResult;
}

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
`;

// Caja contenedora de la sección: mantiene siempre el borde punteado y el fondo
// gris que delimita visualmente la sección, tanto vacía como con ficheros dentro.
// Crece verticalmente en función de los ficheros subidos (hasta MAX_FILES_PER_SECTION).
const SectionBox = styled.div<{ $isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
  box-sizing: border-box;
  padding: var(--spacing-md);
  background: ${COLORS.documentButtonBg};
  border: 2px dashed ${COLORS.documentButtonBorder};
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;

  ${({ $isEmpty }) =>
    $isEmpty &&
    css`
      cursor: pointer;

      &:hover {
        background: ${COLORS.headerTintBg};
        border-color: ${COLORS.stepActive};
      }
    `}
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) 0;
  color: var(--color-secondary);
  font-size: 1rem;
  font-weight: 500;

  .icon {
    font-size: 2rem;
  }

  ${SectionBox}:hover & {
    color: ${COLORS.stepActive};
  }
`;

const FileRow = styled.div<{ $isValid: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  border: 2px solid ${({ $isValid }) => ($isValid ? COLORS.success : COLORS.error)};
  border-radius: var(--radius-lg);
  background: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const RowThumbnail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  background-color: ${COLORS.documentButtonBg};
  border-radius: ${COLORS.radiusThumbnail};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .file-icon {
    font-size: 1.4rem;
  }
`;

const RowInfo = styled.div`
  flex: 1;
  min-width: 0;
  cursor: pointer;
`;

const RowFileName = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowFileMeta = styled.div`
  font-size: 0.7rem;
  color: var(--color-gray-500);
  display: flex;
  gap: var(--spacing-sm);
`;

const RowStatusIcon = styled.div<{ $isValid: boolean }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $isValid }) => ($isValid ? COLORS.success : COLORS.error)};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
`;

const RemoveLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 0.7rem;
  color: ${COLORS.error};
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    opacity: 0.75;
  }
`;

const AddMoreButton = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: var(--spacing-sm);
  background: var(--color-white);
  color: ${COLORS.stepActive};
  border: 2px dashed ${COLORS.documentButtonBorder};
  border-radius: var(--radius-lg);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${COLORS.headerTintBg};
    border-color: ${COLORS.stepActive};
  }
`;

// Funciones para persistencia (guardamos un array de ficheros por sección)
const getStorageKey = (userId: string = 'default') => `${STORAGE_KEY}_${userId}`;

const saveDocumentState = (documentId: string, entries: SavedFileEntry[]) => {
  try {
    const storageKey = getStorageKey();
    const allStates = JSON.parse(localStorage.getItem(storageKey) || '{}');

    if (entries.length === 0) {
      delete allStates[documentId];
    } else {
      allStates[documentId] = entries;
    }

    localStorage.setItem(storageKey, JSON.stringify(allStates));
  } catch (error) {
    console.error('Error al guardar estado:', error);
  }
};

const loadDocumentState = (documentId: string): SavedFileEntry[] => {
  try {
    const storageKey = getStorageKey();
    const allStates = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return allStates[documentId] || [];
  } catch (error) {
    console.error('Error al cargar estado:', error);
    return [];
  }
};

const createEntryId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const isEntryValid = (entry: UploadedFileEntry) =>
  entry.validationResult.respuesta === 'SI' && entry.validationResult.confianza >= CONFIDENCE_THRESHOLD;

// Función para acortar el nombre del archivo (máx. 25 caracteres para evitar
// problemas de formato con nombres largos, p.ej. "este_es_una_prueba....pdf")
const shortenFileName = (name: string, maxLength: number = 25) => {
  if (name.length <= maxLength) return name;
  const extension = name.substring(name.lastIndexOf('.'));
  const baseName = name.substring(0, name.lastIndexOf('.'));
  const dots = '...';
  const availableLength = maxLength - extension.length - dots.length;
  return baseName.substring(0, availableLength) + dots + extension;
};

// Función para formatear el tipo de archivo
const formatFileType = (type: string) => {
  if (type.startsWith('image/')) return 'Imagen';
  if (type === 'application/pdf') return 'PDF';
  if (type.includes('/')) {
    return type.substring(type.lastIndexOf('/') + 1).toUpperCase();
  }
  return type.toUpperCase();
};

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType === 'application/pdf') return '📄';
  return '📁';
};

const DocumentUploadV2: React.FC<DocumentUploadV2Props> = ({
  documentId,
  label,
  documentType,
  onStatusChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState<UploadedFileEntry[]>([]);
  const thumbnailUrlsRef = useRef<Record<string, string>>({});

  // Cargar estado persistido al montar el componente
  // No podemos recrear el objeto File real desde localStorage, así que los
  // ficheros recuperados no tienen thumbnail de imagen hasta que se vuelvan a subir
  useEffect(() => {
    const saved = loadDocumentState(documentId);
    if (saved.length > 0) {
      setEntries(
        saved.map((s) => ({
          entryId: s.entryId,
          file: null,
          fileName: s.fileName,
          fileType: s.fileType,
          fileSize: s.fileSize,
          validationResult: s.validationResult,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  // Guardar estado y notificar al padre cada vez que cambian los ficheros de la sección
  useEffect(() => {
    saveDocumentState(
      documentId,
      entries.map((e) => ({
        entryId: e.entryId,
        fileName: e.fileName,
        fileType: e.fileType,
        fileSize: e.fileSize,
        validationResult: e.validationResult,
      }))
    );

    onStatusChange({
      count: entries.length,
      hasInvalid: entries.some((e) => !isEntryValid(e)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId, entries]);

  // Limpiar blob URLs al desmontar
  useEffect(() => {
    return () => {
      Object.values(thumbnailUrlsRef.current).forEach((url) => URL.revokeObjectURL(url));
      thumbnailUrlsRef.current = {};
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
      const entryId = createEntryId();
      setEntries((prev) => [
        ...prev,
        {
          entryId,
          file,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          validationResult: result,
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleRemove = (entryId: string) => {
    const url = thumbnailUrlsRef.current[entryId];
    if (url) {
      URL.revokeObjectURL(url);
      delete thumbnailUrlsRef.current[entryId];
    }
    setEntries((prev) => prev.filter((e) => e.entryId !== entryId));
  };

  const getEntryUrl = (entry: UploadedFileEntry) => {
    if (!entry.file) return null;

    const cached = thumbnailUrlsRef.current[entry.entryId];
    if (cached) return cached;

    const url = URL.createObjectURL(entry.file);
    thumbnailUrlsRef.current[entry.entryId] = url;
    return url;
  };

  const handleOpenInNewTab = (entry: UploadedFileEntry) => {
    const url = getEntryUrl(entry);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const canAddMore = entries.length < MAX_FILES_PER_SECTION;

  const isEmpty = entries.length === 0;

  return (
    <UploadContainer>
      <SectionBox $isEmpty={isEmpty} onClick={isEmpty ? handleUploadClick : undefined}>
        {isEmpty ? (
          <EmptyState>
            <span className="icon">📁</span>
            <span>Subir {label}</span>
          </EmptyState>
        ) : (
          <>
            {entries.map((entry) => {
              const isValid = isEntryValid(entry);
              const entryUrl = getEntryUrl(entry);
              return (
                <FileRow key={entry.entryId} $isValid={isValid}>
                  <RowThumbnail>
                    {entry.fileType.startsWith('image/') && entryUrl ? (
                      <img src={entryUrl} alt={entry.fileName} />
                    ) : (
                      <span className="file-icon">{getFileIcon(entry.fileType)}</span>
                    )}
                  </RowThumbnail>

                  <RowInfo
                    onClick={() => handleOpenInNewTab(entry)}
                    title={entry.file ? 'Abrir en una pestaña nueva' : entry.fileName}
                  >
                    <RowFileName title={entry.fileName}>{shortenFileName(entry.fileName)}</RowFileName>
                    <RowFileMeta>
                      <span>{(entry.fileSize / 1024).toFixed(1)} KB</span>
                      <span>{formatFileType(entry.fileType)}</span>
                    </RowFileMeta>
                  </RowInfo>

                  <RemoveLink onClick={() => handleRemove(entry.entryId)}>Eliminar</RemoveLink>

                  <RowStatusIcon $isValid={isValid} title={isValid ? 'Validado' : 'No validado'}>
                    {isValid ? '✓' : '✗'}
                  </RowStatusIcon>
                </FileRow>
              );
            })}

            {canAddMore && (
              <AddMoreButton onClick={handleUploadClick}>+ Añadir archivo</AddMoreButton>
            )}
          </>
        )}
      </SectionBox>

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
