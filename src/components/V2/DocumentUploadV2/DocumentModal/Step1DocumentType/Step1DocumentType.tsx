import React from 'react';
import styled from 'styled-components';
import { DocumentType, DocumentOption } from '../../../types';
import { COLORS } from '../../../constants';

const Container = styled.div`
  padding: var(--spacing-lg);
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const DocumentButton = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  background: ${({ $selected }) => ($selected ? COLORS.captureButton : COLORS.documentButtonBg)};
  border: 2px solid ${({ $selected }) => ($selected ? COLORS.captureButton : COLORS.documentButtonBorder)};
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ $selected }) => ($selected ? 'white' : 'var(--color-secondary)')};

  &:hover {
    background: ${({ $selected }) => ($selected ? COLORS.captureButton : COLORS.headerTintBg)};
    border-color: ${COLORS.captureButton};
  }
  
  .icon {
    font-size: 2rem;
    margin-bottom: var(--spacing-sm);
  }
  
  .label {
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
  }
`;

interface Props {
  options: DocumentOption[];
  selected: DocumentType | null;
  onSelect: (type: DocumentType) => void;
}

export const Step1DocumentType: React.FC<Props> = ({ options, selected, onSelect }) => {
  return (
    <Container>
      <Title>Selecciona el tipo de documento</Title>
      <DocumentGrid>
        {options.map((option) => (
          <DocumentButton
            key={option.id}
            $selected={selected === option.id}
            onClick={() => onSelect(option.id)}
          >
            <span className="icon">{option.icon}</span>
            <span className="label">{option.label}</span>
          </DocumentButton>
        ))}
      </DocumentGrid>
    </Container>
  );
};

export default Step1DocumentType;
