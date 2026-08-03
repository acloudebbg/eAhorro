import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../constants';

const PreviewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2050;
  padding: var(--spacing-md);
`;

const PreviewContainer = styled.div`
  background: ${COLORS.modalBackground};
  border-radius: var(--radius-lg);
  box-shadow: ${COLORS.shadowModal};
  width: 90%;
  max-width: 420px;
  animation: previewFadeIn 0.3s ease;

  @keyframes previewFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid ${COLORS.borderGray};

  .name {
    font-size: 0.9rem;
    font-weight: 700;
    color: ${COLORS.navy};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.3rem;
    line-height: 1;
    cursor: pointer;
    color: var(--color-gray-500);
    flex-shrink: 0;

    &:hover {
      color: ${COLORS.navy};
    }
  }
`;

const PreviewBody = styled.div`
  padding: var(--spacing-lg);
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 320px;
  border-radius: ${COLORS.radiusThumbnail};
  object-fit: contain;
`;

const PreviewPlaceholder = styled.div`
  width: 100%;
  min-height: 200px;
  border-radius: ${COLORS.radiusThumbnail};
  background-color: ${COLORS.documentButtonBg};
  background-image: repeating-linear-gradient(
    45deg,
    ${COLORS.headerTintBg} 0,
    ${COLORS.headerTintBg} 6px,
    ${COLORS.documentButtonBg} 6px,
    ${COLORS.documentButtonBg} 12px
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  color: var(--color-gray-500);
  font-size: 0.85rem;

  .icon {
    font-size: 2.5rem;
  }
`;

export interface DocumentPreviewModalProps {
  fileName: string;
  isImage: boolean;
  previewUrl: string | null;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  fileName,
  isImage,
  previewUrl,
  onClose,
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <PreviewOverlay onClick={handleOverlayClick}>
      <PreviewContainer>
        <PreviewHeader>
          <span className="name" title={fileName}>{fileName}</span>
          <button className="close-button" onClick={onClose}>×</button>
        </PreviewHeader>
        <PreviewBody>
          {isImage && previewUrl ? (
            <PreviewImage src={previewUrl} alt={fileName} />
          ) : (
            <PreviewPlaceholder>
              <span className="icon">📄</span>
              <span>Vista previa del documento</span>
            </PreviewPlaceholder>
          )}
        </PreviewBody>
      </PreviewContainer>
    </PreviewOverlay>
  );
};

export default DocumentPreviewModal;
