import React, { useState } from 'react';
import styled from 'styled-components';
import { StepIndicator } from './StepIndicator';
import { Step1DocumentType } from './Step1DocumentType/Step1DocumentType';
import { Step2CaptureMethod } from './Step2CaptureMethod/Step2CaptureMethod';
import { Step3Processing } from './Step3Processing/Step3Processing';
import { Step4Success } from './Step4Success/Step4Success';
import { DocumentType, ModalStep, ValidationResult, ProcessingState, DocumentOption } from '../../types';
import { COLORS, DOCUMENT_OPTIONS } from '../../constants';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: var(--spacing-md);
`;

const ModalContainer = styled.div`
  background: ${COLORS.modalBackground};
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalFadeIn 0.3s ease;

  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ModalHeader = styled.div`
  padding: var(--spacing-lg);
  border-bottom: 1px solid ${COLORS.stepInactive};
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 1.3rem;
    color: var(--color-secondary);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-gray-500);
    padding: var(--spacing-xs);

    &:hover {
      color: var(--color-gray-700);
    }
  }
`;

const ModalContent = styled.div`
  padding: 0 var(--spacing-lg) var(--spacing-lg);
`;

interface Props {
  documentLabel: string;
  documentType: DocumentType;
  onClose: () => void;
  onComplete: (result: ValidationResult, file: File | null) => void;
  initialStep?: ModalStep;
}

export const DocumentModal: React.FC<Props> = ({
  documentLabel,
  documentType,
  onClose,
  onComplete,
  initialStep = 1,
}) => {
  const [currentStep, setCurrentStep] = useState<ModalStep>(initialStep);
  const [selectedType, setSelectedType] = useState<DocumentType | null>(documentType);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    ocrProgress: 0,
    pdfProgress: 0,
    llmProgress: 0,
    status: 'idle',
  });
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [pdfContent, setPdfContent] = useState<string | null>(null);

  // Obtener opciones de documento según la categoría
  // Por ahora usamos todas las opciones, pero se puede filtrar por sección
  const allOptions: DocumentOption[] = Object.values(DOCUMENT_OPTIONS);

  // Simular procesamiento completo
  const simulateProcessing = async (file: File) => {
    setProcessingState((prev) => ({ ...prev, status: 'processing' }));

    try {
      // Simular OCR
      for (let i = 0; i <= 100; i += Math.floor(Math.random() * 15) + 5) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setProcessingState((prev) => ({ ...prev, ocrProgress: Math.min(i, 100) }));
      }

      // Simular conversión a PDF
      for (let i = 0; i <= 100; i += Math.floor(Math.random() * 20) + 5) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setProcessingState((prev) => ({ ...prev, pdfProgress: Math.min(i, 100) }));
      }

      // Simular validación LLM
      for (let i = 0; i <= 100; i += Math.floor(Math.random() * 10) + 5) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setProcessingState((prev) => ({ ...prev, llmProgress: Math.min(i, 100) }));
      }

      // Generar resultado de validación aleatorio para simulación
      // En producción esto vendrá de la API real
      const randomConfidence = Math.floor(Math.random() * 100);
      const randomResponse: 'SI' | 'NO' = randomConfidence >= 80 ? 'SI' : 'NO';

      const result: ValidationResult = {
        respuesta: randomResponse,
        confianza: randomConfidence,
        documentType: selectedType || documentType,
        feedback: randomConfidence < 60 ? 'El documento no parece corresponder al tipo seleccionado' : undefined,
      };

      setValidationResult(result);
      setPdfContent(`[Preview del contenido del PDF]

Documento: ${selectedType || documentType}
Nombre: ${file.name}
Tamaño: ${(file.size / 1024).toFixed(2)} KB
Tipo: ${file.type}

Contenido simulado extraído mediante OCR...

Este es un documento de prueba generado automáticamente.
La validación ha determinado que ${randomResponse === 'SI' ? 'corresponde' : 'NO corresponde'} al tipo ${selectedType || documentType} con una confianza del ${randomConfidence}%.

--- Fin del preview ---`);

      setProcessingState((prev) => ({ ...prev, status: 'complete' }));
      setCurrentStep(4);
    } catch (error) {
      setProcessingState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: 'Error al procesar el documento',
      }));
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setCurrentStep(3);
    simulateProcessing(file);
  };

  const handleCameraSelect = () => {
    // En móvil, esto abriría la cámara
    // Por ahora, simulamos con un mensaje
    alert('Funcionalidad de cámara: en desarrollo para móvil. Por favor, usa la opción "Seleccionar archivo" o "Arrastra y suelta".');
  };

  const handleTypeSelect = (type: DocumentType) => {
    setSelectedType(type);
    setCurrentStep(2);
  };

  const handleRetry = () => {
    setCurrentStep(2);
    setSelectedFile(null);
    setProcessingState({
      ocrProgress: 0,
      pdfProgress: 0,
      llmProgress: 0,
      status: 'idle',
    });
    setValidationResult(null);
    setPdfContent(null);
  };

  const handleDelete = () => {
    onClose();
  };

  const handleComplete = () => {
    if (validationResult) {
      onComplete(validationResult, selectedFile);
    }
  };

  // Cerrar modal al hacer clic fuera
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <span className="title">📄 {documentLabel}</span>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </ModalHeader>

        <StepIndicator currentStep={currentStep} />

        <ModalContent>
          {currentStep === 1 && (
            <Step1DocumentType
              options={allOptions}
              selected={selectedType}
              onSelect={handleTypeSelect}
            />
          )}

          {currentStep === 2 && (
            <Step2CaptureMethod
              onFileSelect={handleFileSelect}
              onCameraSelect={handleCameraSelect}
            />
          )}

          {currentStep === 3 && (
            <Step3Processing state={processingState} />
          )}

          {currentStep === 4 && validationResult && (
            <Step4Success
              result={validationResult}
              pdfContent={pdfContent}
              onRetry={handleRetry}
              onDelete={handleDelete}
              onClose={onClose}
              onComplete={handleComplete}
            />
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DocumentModal;
