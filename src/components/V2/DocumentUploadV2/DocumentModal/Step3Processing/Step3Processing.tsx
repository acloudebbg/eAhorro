import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../constants';
import { ProcessingState } from '../../../types';

const Container = styled.div`
  padding: var(--spacing-lg);
  text-align: center;
`;

const ProcessingIcon = styled.div`
  font-size: 3rem;
  color: ${COLORS.stepActive};
  margin-bottom: var(--spacing-lg);
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const StatusText = styled.p`
  font-size: 1.1rem;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-xl);
  font-weight: 500;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
`;

const ProgressItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const ProgressLabel = styled.span`
  width: 120px;
  text-align: right;
  font-size: 0.9rem;
  color: var(--color-gray-600);
`;

const ProgressBarContainer = styled.div`
  flex: 1;
  height: 8px;
  background: ${COLORS.progressBg};
  border-radius: var(--radius-full);
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: ${COLORS.progressBar};
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
`;

const ProgressPercentage = styled.span`
  width: 40px;
  text-align: left;
  font-size: 0.9rem;
  color: ${COLORS.progressBar};
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: ${COLORS.error};
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-top: var(--spacing-md);
  font-size: 0.9rem;
`;

interface Props {
  state: ProcessingState;
}

export const Step3Processing: React.FC<Props> = ({ state }) => {
  const progressItems = [
    { label: 'OCR', progress: state.ocrProgress },
    { label: 'PDF', progress: state.pdfProgress },
    { label: 'LLM', progress: state.llmProgress },
  ];

  if (state.status === 'error') {
    return (
      <Container>
        <ProcessingIcon>❌</ProcessingIcon>
        <StatusText>Error al procesar</StatusText>
        {state.errorMessage && <ErrorMessage>{state.errorMessage}</ErrorMessage>}
      </Container>
    );
  }

  return (
    <Container>
      <ProcessingIcon>🔄</ProcessingIcon>
      <StatusText>Procesando documento...</StatusText>

      <ProgressContainer>
        {progressItems.map((item) => (
          <ProgressItem key={item.label}>
            <ProgressLabel>{item.label}:</ProgressLabel>
            <ProgressBarContainer>
              <ProgressBar progress={item.progress} />
            </ProgressBarContainer>
            <ProgressPercentage>{item.progress}%</ProgressPercentage>
          </ProgressItem>
        ))}
      </ProgressContainer>
    </Container>
  );
};

export default Step3Processing;
