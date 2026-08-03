import React, { useState } from 'react';
import styled from 'styled-components';
import { StepIndicator } from './StepIndicator';
import { Step1DocumentType } from './Step1DocumentType/Step1DocumentType';
import { Step2CaptureMethod } from './Step2CaptureMethod/Step2CaptureMethod';
import { Step3Processing } from './Step3Processing/Step3Processing';
import { Step4Success } from './Step4Success/Step4Success';
import { DocumentType, ModalStep, ValidationResult, ProcessingState, DocumentOption } from '../../types';
import { COLORS, DOCUMENT_OPTIONS, MAX_FILE_SIZE_MB, CONFIDENCE_THRESHOLD } from '../../constants';
import { validateDocumentWithClaude } from '../utils';

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

// Duración mínima que se mantiene visible el paso de "procesando", para que el
// usuario perciba que el sistema está trabajando aunque Claude responda en <1s.
const MIN_PROCESSING_MS = 2000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    progress: 0,
    status: 'idle',
  });
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  // Obtener opciones de documento según la categoría
  // Por ahora usamos todas las opciones, pero se puede filtrar por sección
  const allOptions: DocumentOption[] = Object.values(DOCUMENT_OPTIONS);

  const isValid = validationResult
    ? validationResult.respuesta === 'SI' && validationResult.confianza >= CONFIDENCE_THRESHOLD
    : undefined;

  // Procesar archivo y validar con Claude
  const processFile = async (file: File) => {
    setProcessingState({ progress: 0, status: 'processing' });
    setCurrentStep(3);

    const startTime = Date.now();

    // Progreso simulado: avanza asintóticamente hacia un techo sin llegar a
    // completarse, dando sensación de trabajo activo mientras se espera a Claude
    // (que suele responder en menos de un segundo).
    let simulatedProgress = 0;
    const progressTicker = setInterval(() => {
      simulatedProgress += (90 - simulatedProgress) * 0.12;
      setProcessingState({ progress: Math.round(simulatedProgress), status: 'processing' });
    }, 120);

    const finishNoEarlierThanMinDuration = async () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_PROCESSING_MS) {
        await wait(MIN_PROCESSING_MS - elapsed);
      }
    };

    try {
      const maxFileSize = MAX_FILE_SIZE_MB * 1024 * 1024;
      if (file.size > maxFileSize) {
        throw new Error(`Archivo demasiado grande. Máximo ${MAX_FILE_SIZE_MB}MB`);
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        throw new Error(`Tipo de archivo no soportado: ${file.type}`);
      }

      const docType = selectedType || documentType;
      const result = await validateDocumentWithClaude(file, docType);

      clearInterval(progressTicker);
      console.log(`🎯 ${file.name}: ${result.respuesta} (${result.confianza}%)`);

      await finishNoEarlierThanMinDuration();

      setValidationResult(result);
      setProcessingState({ progress: 100, status: 'complete' });
      setCurrentStep(4);
    } catch (error) {
      clearInterval(progressTicker);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al procesar el documento';
      console.error(`❌ ${file.name}:`, errorMessage);

      await finishNoEarlierThanMinDuration();

      setProcessingState({ progress: 0, status: 'error', errorMessage });
    }
  };

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    await processFile(file);
  };

  const handleCameraSelect = async () => {
    try {
      // Verificar si el navegador soporta MediaDevices
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Tu navegador no soporta acceso a la cámara. Por favor, usa la opción "Seleccionar archivo" o "Arrastra y suelta".');
        return;
      }
      
      // Solicitar acceso a la cámara
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Cámara trasera
        audio: false
      });
      
      // Crear elemento de video para mostrar el preview
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      // Crear canvas para capturar la foto
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        stream.getTracks().forEach(track => track.stop());
        alert('No se pudo crear el canvas para capturar la imagen.');
        return;
      }
      
      // Crear modal para mostrar la cámara y capturar
      const cameraModal = document.createElement('div');
      cameraModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        padding: 20px;
      `;
      
      const cameraPreview = document.createElement('div');
      cameraPreview.style.cssText = `
        position: relative;
        width: 100%;
        max-width: 400px;
        margin-bottom: 20px;
      `;
      
      const videoContainer = document.createElement('div');
      videoContainer.style.cssText = `
        width: 100%;
        aspect-ratio: 4/3;
        background: #000;
        border-radius: 8px;
        overflow: hidden;
      `;
      video.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
      videoContainer.appendChild(video);
      cameraPreview.appendChild(videoContainer);
      
      const captureButton = document.createElement('button');
      captureButton.textContent = '📸 Capturar Foto';
      captureButton.style.cssText = `
        background: #00a8e8;
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        margin-bottom: 16px;
      `;
      
      const cancelButton = document.createElement('button');
      cancelButton.textContent = '❌ Cancelar';
      cancelButton.style.cssText = `
        background: #dc3545;
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      `;
      
      // Añadir botones al modal
      cameraModal.appendChild(cameraPreview);
      cameraModal.appendChild(captureButton);
      cameraModal.appendChild(cancelButton);
      
      // Añadir modal al body
      document.body.appendChild(cameraModal);
      
      // Esperar a que el video esté listo
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });
      
      // Configurar tamaños
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Capturar foto al hacer clic
      captureButton.onclick = () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convertir canvas a File
        canvas.toBlob(async (blob) => {
          if (!blob) {
            alert('No se pudo capturar la imagen.');
            return;
          }
          
          // Detener el stream
          stream.getTracks().forEach(track => track.stop());
          
          // Remover modal
          document.body.removeChild(cameraModal);
          
          // Crear archivo
          const file = new File([blob], `foto_${Date.now()}.jpg`, { type: 'image/jpeg' });
          
          // Procesar el archivo
          await handleFileSelect(file);
        }, 'image/jpeg', 0.92);
      };
      
      // Cancelar al hacer clic
      cancelButton.onclick = () => {
        stream.getTracks().forEach(track => track.stop());
        document.body.removeChild(cameraModal);
      };
      
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      alert('No se pudo acceder a la cámara. Por favor, usa la opción "Seleccionar archivo" o "Arrastra y suelta".');
    }
  };

  const handleTypeSelect = (type: DocumentType) => {
    setSelectedType(type);
    setCurrentStep(2);
  };

  const handleRetry = () => {
    setCurrentStep(2);
    setSelectedFile(null);
    setProcessingState({ progress: 0, status: 'idle' });
    setValidationResult(null);
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

        <StepIndicator currentStep={currentStep} isValid={isValid} />

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

          {currentStep === 4 && validationResult && isValid !== undefined && (
            <Step4Success
              result={validationResult}
              isValid={isValid}
              fileName={selectedFile?.name || ''}
              fileSizeKB={(selectedFile?.size || 0) / 1024}
              documentTypeLabel={DOCUMENT_OPTIONS[selectedType || documentType]?.label || (selectedType || documentType)}
              onRetry={handleRetry}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default DocumentModal;
