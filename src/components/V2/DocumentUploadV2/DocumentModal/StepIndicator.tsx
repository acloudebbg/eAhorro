import React from 'react';
import styled from 'styled-components';
import { STEPS, COLORS } from '../../constants';
import { ModalStep } from '../../types';

const StepContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-lg) var(--spacing-xl);
  border-bottom: 1px solid ${COLORS.stepInactive};
  
  @media (max-width: 576px) {
    padding: var(--spacing-md) var(--spacing-lg);
    flex-wrap: wrap;
  }
`;

const StepsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;

const StepItem = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ isActive, isCompleted }) =>
      isActive ? COLORS.stepActive : isCompleted ? COLORS.success : COLORS.stepInactive};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 8px;
    border: 2px solid ${({ isActive }) => (isActive ? COLORS.stepActive : 'transparent')};
    position: relative;
    z-index: 2;
  }

  .step-label {
    font-size: 0.8rem;
    color: ${({ isActive, isCompleted }) =>
      isActive ? COLORS.stepActive : isCompleted ? COLORS.success : COLORS.stepInactive};
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  }
`;

const ProgressLine = styled.div<{ isActive: boolean }>`
  height: 2px;
  width: 80px;
  background: ${({ isActive }) => (isActive ? COLORS.stepActive : COLORS.stepInactive)};
  position: relative;
  top: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 576px) {
    width: 40px;
  }
`;

const StepWithLine = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  currentStep: ModalStep;
}

export const StepIndicator: React.FC<Props> = ({ currentStep }) => {
  return (
    <StepContainer>
      <StepsWrapper>
        {STEPS.map((step, index) => (
          <StepWithLine key={step.id}>
            <StepItem isActive={currentStep === step.id} isCompleted={currentStep > step.id}>
              <div className="step-number">
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <span className="step-label">{step.label}</span>
            </StepItem>
            {index < STEPS.length - 1 && (
              <ProgressLine isActive={currentStep > step.id} />
            )}
          </StepWithLine>
        ))}
      </StepsWrapper>
    </StepContainer>
  );
};

export default StepIndicator;
