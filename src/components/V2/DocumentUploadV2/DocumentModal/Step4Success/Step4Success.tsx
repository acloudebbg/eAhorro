import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants';
import { ValidationResult } from '../../../types';
import { CONFIDENCE_THRESHOLD } from '../../../constants';

const Container = styled.div`
  padding: var(--spacing-lg);
  text-align: center;
`;

const SuccessIcon = styled.div<{ $isValid: boolean }>`
  font-size: 3rem;
  color: ${({ $isValid }) => ($isValid ? COLORS.success : COLORS.error)};
  margin-bottom: var(--spacing-lg);
`;

const SuccessTitle = styled.h3<{ $isValid: boolean }>`
  font-size: 1.2rem;
  color: ${({ $isValid }) => ($isValid ? COLORS.success : COLORS.error)};
  margin-bottom: var(--spacing-md);
  font-weight: 600;
`;

const ConfidenceText = styled.p<{ $isValid: boolean }>`
  font-size: 1.1rem;
  color: ${({ $isValid }) => ($isValid ? COLORS.success : COLORS.error)};
  margin-bottom: var(--spacing-xl);
  font-weight: 600;
`;

const PreviewContainer = styled.div`
  border: 1px dashed ${COLORS.pdfPreviewBorder};
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  background: white;

  .preview-content {
    max-height: 300px;
    overflow: auto;
    text-align: left;
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--color-gray-700);
    white-space: pre-wrap;
    font-family: monospace;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'danger' | 'success' }>`
  padding: var(--spacing-md) var(--spacing-xl);
  background: ${({ $variant }) => 
    $variant === 'primary' ? COLORS.captureButton :
    $variant === 'danger' ? COLORS.error :
    COLORS.success};
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  @media (max-width: 576px) {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.85rem;
  }
`;

const FeedbackText = styled.p`
  color: ${COLORS.error};
  font-size: 0.9rem;
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-sm);
  background: rgba(220, 53, 69, 0.1);
  border-radius: var(--radius-sm);
`;

interface Props {
  result: ValidationResult;
  pdfContent: string | null;
  onRetry: () => void;
  onDelete: () => void;
  onClose: () => void;
  onComplete: () => void;
}

export const Step4Success: React.FC<Props> = ({ result, pdfContent, onRetry, onDelete, onClose, onComplete }) => {
  const isValid = result.confianza >= CONFIDENCE_THRESHOLD;

  return (
    <Container>
      <SuccessIcon $isValid={isValid}>
        {isValid ? '✓' : '✗'}
      </SuccessIcon>

      <SuccessTitle $isValid={isValid}>
        {isValid ? 'Documento validado correctamente' : 'Documento NO válido'}
      </SuccessTitle>

      <ConfidenceText $isValid={isValid}>
        Confianza: {result.confianza}%
      </ConfidenceText>

      {pdfContent && (
        <PreviewContainer>
          <div className="preview-content">{pdfContent.substring(0, 1000)}...</div>
        </PreviewContainer>
      )}

      {result.feedback && (
        <FeedbackText>{result.feedback}</FeedbackText>
      )}

      <ActionButtons>
        {!isValid && (
          <ActionButton $variant="danger" onClick={onRetry}>
            🔄 Reintentar
          </ActionButton>
        )}
        <ActionButton $variant="danger" onClick={onDelete}>
          🗑️ Eliminar y volver a subir
        </ActionButton>
        <ActionButton $variant="success" onClick={onComplete}>
          ✅ Continuar
        </ActionButton>
      </ActionButtons>
    </Container>
  );
};

export default Step4Success;
