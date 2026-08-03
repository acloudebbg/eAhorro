import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants';
import { ValidationResult } from '../../../types';

const Container = styled.div`
  padding: var(--spacing-lg);
  text-align: center;
`;

const SuccessIcon = styled.div<{ $isValid: boolean }>`
  font-size: 2.2rem;
  color: ${({ $isValid }) => ($isValid ? COLORS.success : COLORS.error)};
  margin-bottom: var(--spacing-sm);
`;

const SuccessTitle = styled.h3<{ $isValid: boolean }>`
  font-size: 1.1rem;
  color: ${({ $isValid }) => ($isValid ? COLORS.success : COLORS.error)};
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
`;

const ConfidenceText = styled.p<{ $isValid: boolean }>`
  font-size: 1rem;
  color: ${({ $isValid }) => ($isValid ? COLORS.success : COLORS.error)};
  margin-bottom: var(--spacing-md);
  font-weight: 600;
`;

const InfoBox = styled.div`
  border: 1px solid ${COLORS.pdfPreviewBorder};
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-md);
  background: white;
  text-align: left;
  font-size: 0.85rem;
  color: var(--color-gray-700);
  line-height: 1.5;
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
  font-size: 0.85rem;
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-sm);
  background: rgba(220, 53, 69, 0.1);
  border-radius: var(--radius-sm);
`;

interface Props {
  result: ValidationResult;
  isValid: boolean;
  fileName: string;
  fileSizeKB: number;
  documentTypeLabel: string;
  onRetry: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

export const Step4Success: React.FC<Props> = ({
  result,
  isValid,
  fileName,
  fileSizeKB,
  documentTypeLabel,
  onRetry,
  onDelete,
  onComplete,
}) => {
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

      <InfoBox>
        <div>📄 {documentTypeLabel}</div>
        <div>{fileName}</div>
        <div>{fileSizeKB.toFixed(2)} KB</div>
      </InfoBox>

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
