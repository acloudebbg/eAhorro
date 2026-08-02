import React, { useState } from 'react';
import styled from 'styled-components';
import { StepIndicator } from './StepIndicator';
import { Step1DocumentType } from './Step1DocumentType/Step1DocumentType';
import { Step2CaptureMethod } from './Step2CaptureMethod/Step2CaptureMethod';
import { Step3Processing } from './Step3Processing/Step3Processing';
import { Step4Success } from './Step4Success/Step4Success';
import { DocumentType, ModalStep, ValidationResult, ProcessingState, DocumentOption } from '../../types';
import { COLORS, DOCUMENT_OPTIONS } from '../../constants';
import { processAndValidateFile } from '../utils';

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

  // Procesar archivo y validar con LLM
  const processFile = async (file: File) => {
    const overallStartTime = Date.now();
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║  🎯 DOCUMENT MODAL - INICIANDO PROCESAMIENTO           ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log('📁 Archivo:', file.name);
    console.log('📄 Tipo MIME:', file.type);
    console.log('📏 Tamaño:', (file.size / 1024).toFixed(2), 'KB');
    console.log('🏷️  Tipo de documento:', selectedType || documentType);
    console.log('⏱️  Hora de inicio:', new Date().toLocaleTimeString());
    console.log('');
    
    setProcessingState((prev) => ({ ...prev, status: 'processing' }));
    setCurrentStep(3); // Asegurar que estamos en el paso 3

    try {
      // Validar tamaño máximo
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(`Archivo demasiado grande. Máximo ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      }

      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        throw new Error(`Tipo de archivo no soportado: ${file.type}`);
      }

      console.log('✅ Validaciones previas pasadas');
      console.log('');
      
      // Usar la función de procesamiento completo con progreso
      const docType = selectedType || documentType;
      const result = await processAndValidateFile(
        file,
        docType,
        docType,
        (stage, progress, info) => {
          const elapsed = ((Date.now() - overallStartTime) / 1000).toFixed(1);
          console.log(`   ⏳ [${elapsed}s] ${stage}: ${progress}% - ${info || ''}`);
          
          // Actualizar el estado de progreso según la etapa
          switch (stage) {
            case 'text_extraction':
              setProcessingState((prev) => ({
                ...prev,
                ocrProgress: progress,
                pdfProgress: progress * 0.5, // PDF progress sigue al OCR
                status: 'processing',
              }));
              break;
            case 'llm_validation':
              setProcessingState((prev) => ({
                ...prev,
                ocrProgress: 100,
                pdfProgress: 100,
                llmProgress: progress,
                status: 'processing',
              }));
              break;
          }
        }
      );

      const totalTime = ((Date.now() - overallStartTime) / 1000).toFixed(2);
      console.log('');
      console.log('╔══════════════════════════════════════════════════════════════╗');
      console.log('║  ✅ PROCESAMIENTO COMPLETADO CON ÉXITO                 ║');
      console.log('╚══════════════════════════════════════════════════════════════╝');
      console.log('⏱️  Tiempo total:', totalTime, 'segundos');
      console.log('📊 Texto extraído:', result.text.length, 'caracteres');
      console.log('📄 PDF generado:', result.wasConverted ? 'Sí (convertido desde imagen)' : 'No (original)');
      if (result.usedSimulation) {
        console.log('🎭 Simulación usada:', result.usedSimulation);
      }
      console.log('🎯 Resultado:', result.result.respuesta, '(' + result.result.confianza + '%)');
      console.log('');

      // Extraer texto para preview (limitar a 1000 caracteres)
      const previewText = result.text.substring(0, 1000);
      const previewContent = `Documento: ${selectedType || documentType}
Nombre: ${file.name}
Tamaño: ${(file.size / 1024).toFixed(2)} KB
Tipo: ${file.type}

--- Contenido extraído ---
${previewText}${result.text.length > 1000 ? '...' : ''}

--- Validación LLM ---
Resultado: ${result.result.respuesta}
Confianza: ${result.result.confianza}%
${result.result.feedback ? `Feedback: ${result.result.feedback}` : ''}

--- Fin del preview ---`;

      // Actualizar estado
      setValidationResult(result.result);
      setPdfContent(previewContent);
      setSelectedFile(result.pdfFile); // Guardar el PDF final (convertido o original)

      setProcessingState((prev) => ({
        ...prev,
        ocrProgress: 100,
        pdfProgress: 100,
        llmProgress: 100,
        status: 'complete',
      }));
      
      setCurrentStep(4);
      
      console.log('🏁 Paso 4 alcanzado. Listo para mostrar resultados al usuario');
    } catch (error) {
      const totalTime = ((Date.now() - overallStartTime) / 1000).toFixed(2);
      console.log('');
      console.log('╔══════════════════════════════════════════════════════════════╗');
      console.log('║  ❌ PROCESAMIENTO FALLIDO                               ║');
      console.log('╚══════════════════════════════════════════════════════════════╝');
      console.log('⏱️  Tiempo transcurrido:', totalTime, 'segundos');
      console.error('❌ Error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al procesar el documento';
      
      setProcessingState((prev) => ({
        ...prev,
        status: 'error',
        errorMessage: errorMessage,
        ocrProgress: 0,
        pdfProgress: 0,
        llmProgress: 0,
      }));
      
      console.log('');
      console.log('El usuario verá un mensaje de error en la interfaz');
    }
  };

  const handleFileSelect = async (file: File) => {
    console.log('📁 Archivo seleccionado:', file.name, file.type, file.size, 'bytes');
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
