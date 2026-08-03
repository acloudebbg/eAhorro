import React, { useRef, useState } from 'react';
import styled from 'styled-components';
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

const MethodGrid = styled.div`
  display: grid;
  gap: var(--spacing-md);
`;

const MethodButton = styled.button`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: ${COLORS.captureButton};
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: #0086c5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 168, 232, 0.2);
  }
  
  .icon {
    font-size: 1.5rem;
  }
`;

const DragDropArea = styled.div<{ $isDragging: boolean }>`
  border: 2px dashed ${({ $isDragging }) => ($isDragging ? COLORS.captureButton : COLORS.documentButtonBorder)};
  border-radius: var(--radius-md);
  padding: var(--spacing-2xl);
  text-align: center;
  background: ${({ $isDragging }) => ($isDragging ? 'rgba(0, 168, 232, 0.1)' : COLORS.documentButtonBg)};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: var(--spacing-md);
  
  .icon {
    font-size: 3rem;
    color: ${COLORS.stepActive};
    margin-bottom: var(--spacing-md);
  }
  
  .text {
    color: var(--color-gray-600);
    font-size: 0.95rem;
  }
  
  .subtext {
    color: var(--color-gray-500);
    font-size: 0.85rem;
    margin-top: var(--spacing-xs);
  }
`;

const FileInput = styled.input`
  display: none;
`;

interface Props {
  onFileSelect: (file: File) => void;
  onCameraSelect: () => void;
}

export const Step2CaptureMethod: React.FC<Props> = ({ onFileSelect, onCameraSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <Container>
      <Title>¿Cómo quieres capturar el documento?</Title>

      <MethodGrid>
        <MethodButton onClick={() => fileInputRef.current?.click()}>
          <span className="icon">📁</span>
          <span>Seleccionar archivo</span>
        </MethodButton>

        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,image/*"
          capture="environment"
        />

        <MethodButton onClick={onCameraSelect}>
          <span className="icon">📷</span>
          <span>Usar cámara</span>
        </MethodButton>
      </MethodGrid>

      <DragDropArea
        $isDragging={isDragging}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="icon">📄</div>
        <div className="text">Arrastra y suelta el archivo aquí</div>
        <div className="subtext">Soporte: PDF, JPG, PNG</div>
      </DragDropArea>
    </Container>
  );
};

export default Step2CaptureMethod;
