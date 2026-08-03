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

const StepItem = styled.div<{ $isActive: boolean; $isCompleted: boolean; $isError: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ $isActive, $isCompleted, $isError }) =>
      $isError ? COLORS.error : $isActive ? COLORS.stepActive : $isCompleted ? COLORS.success : COLORS.stepInactive};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 8px;
    border: 2px solid ${({ $isActive, $isError }) => ($isError ? COLORS.error : $isActive ? COLORS.stepActive : 'transparent')};
    position: relative;
    z-index: 2;
  }

  .step-label {
    font-size: 0.8rem;
    color: ${({ $isActive, $isCompleted, $isError }) =>
      $isError ? COLORS.error : $isActive ? COLORS.stepActive : $isCompleted ? COLORS.success : COLORS.stepInactive};
    font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
  }
`;

const ProgressLine = styled.div<{ $isActive: boolean }>`
  height: 2px;
  width: 80px;
  background: ${({ $isActive }) => ($isActive ? COLORS.stepActive : COLORS.stepInactive)};
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
  // Resultado final de la validación, solo relevante en el último paso
  // (indefinido mientras no haya resultado todavía)
  isValid?: boolean;
}

export const StepIndicator: React.FC<Props> = ({ currentStep, isValid }) => {
  const lastStepId = STEPS[STEPS.length - 1].id;

  return (
    <StepContainer>
      <StepsWrapper>
        {STEPS.map((step, index) => {
          const isFinalStepWithResult = step.id === lastStepId && currentStep === lastStepId && isValid !== undefined;
          const isCompleted = isFinalStepWithResult ? isValid : currentStep > step.id;
          const isError = isFinalStepWithResult && !isValid;
          const isActive = !isFinalStepWithResult && currentStep === step.id;

          return (
            <StepWithLine key={step.id}>
              <StepItem $isActive={isActive} $isCompleted={isCompleted} $isError={isError}>
                <div className="step-number">
                  {isError ? '✗' : isCompleted ? '✓' : step.id}
                </div>
                <span className="step-label">{step.label}</span>
              </StepItem>
              {index < STEPS.length - 1 && (
                <ProgressLine $isActive={currentStep > step.id} />
              )}
            </StepWithLine>
          );
        })}
      </StepsWrapper>
    </StepContainer>
  );
};

export default StepIndicator;
