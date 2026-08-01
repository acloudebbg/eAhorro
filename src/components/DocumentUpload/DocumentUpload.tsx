import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'

interface DocumentUploadProps {
  onFileUpload: (file: File) => void
  onFileRemove: () => void
  maxFileSize?: number // en MB
  acceptedFormats?: string[]
}

const UploadContainer = styled.div`
  border: 2px dashed var(--color-gray-300);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--color-white);
  position: relative;
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
  
  @media (max-width: 576px) {
    padding: var(--spacing-sm);
    border-width: 1.5px;
  }
  
  &:hover {
    border-color: var(--color-primary);
    background: var(--color-gray-50);
  }
  
  &.has-file {
    border-style: solid;
    border-color: var(--color-success);
    background: var(--color-gray-50);
  }
  
  &.dragging {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
  }
`

const UploadIcon = styled.div`
  font-size: 2rem;
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-sm);
  
  @media (max-width: 576px) {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-xs);
  }
  
  &.has-file {
    color: var(--color-success);
  }
`

const UploadText = styled.p`
  color: var(--color-gray-600);
  font-size: clamp(0.85rem, 1.5vw, 0.9rem);
  margin-bottom: var(--spacing-sm);
  
  @media (max-width: 576px) {
    margin-bottom: var(--spacing-xs);
  }
  
  &.has-file {
    color: var(--color-success);
  }
`

const UploadSubtext = styled.p`
  color: var(--color-gray-500);
  font-size: clamp(0.75rem, 1.3vw, 0.8rem);
  margin: 0;
  
  @media (max-width: 576px) {
    display: none;
  }
`

const FileInfo = styled.div`
  margin-top: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: rgba(40, 167, 69, 0.1);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: var(--spacing-xs);
    text-align: center;
  }
`

const FileName = styled.span`
  color: var(--color-success);
  font-size: clamp(0.8rem, 1.4vw, 0.85rem);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  
  @media (max-width: 768px) {
    max-width: 180px;
  }
  
  @media (max-width: 576px) {
    max-width: 100%;
    font-size: 0.75rem;
  }
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: var(--color-error);
  cursor: pointer;
  font-size: 1.2rem;
  padding: var(--spacing-xs);
  line-height: 1;
  
  &:hover {
    color: var(--color-error);
    opacity: 0.7;
  }
  
  @media (max-width: 576px) {
    font-size: 1rem;
    padding: var(--spacing-xs) var(--spacing-sm);
  }
`

const UploadButton = styled.button`
  background: var(--color-secondary);
  color: var(--color-white);
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  font-size: clamp(0.85rem, 1.5vw, 0.9rem);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: var(--spacing-sm);
  
  @media (max-width: 768px) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  @media (max-width: 576px) {
    width: 100%;
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.85rem;
  }
  
  &:hover {
    background: var(--color-secondary-dark);
  }
`

const HiddenInput = styled.input`
  display: none;
`

const StatusIcon = styled.div`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  
  @media (max-width: 576px) {
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
    top: var(--spacing-xs);
    right: var(--spacing-xs);
  }
  
  &.uploading {
    background: var(--color-primary-light);
    color: var(--color-primary);
    animation: spin 1s linear infinite;
  }
  
  &.success {
    background: rgba(40, 167, 69, 0.2);
    color: var(--color-success);
  }
  
  &.error {
    background: rgba(231, 76, 60, 0.2);
    color: var(--color-error);
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onFileUpload,
  onFileRemove,
  maxFileSize = 5,
  acceptedFormats = ['.pdf', '.jpg', '.jpeg', '.png']
}) => {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }, [])

  const handleFile = (selectedFile: File) => {
    // Validar tamaño
    if (selectedFile.size > maxFileSize * 1024 * 1024) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    // Validar formato
    const fileName = selectedFile.name.toLowerCase()
    const isValidFormat = acceptedFormats.some(format => 
      fileName.endsWith(format.toLowerCase())
    )
    
    if (!isValidFormat) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    setStatus('uploading')
    setFile(selectedFile)
    
    // Simular subida
    setTimeout(() => {
      setStatus('success')
      onFileUpload(selectedFile)
    }, 1000)
  }

  const handleRemove = () => {
    setFile(null)
    setStatus('idle')
    onFileRemove()
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return '↻'
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      default:
        return null
    }
  }

  return (
    <UploadContainer
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={triggerFileInput}
      className={`${file ? 'has-file' : ''} ${isDragging ? 'dragging' : ''}`}
    >
      {status !== 'idle' && (
        <StatusIcon className={status}>{getStatusIcon()}</StatusIcon>
      )}
      
      <UploadIcon className={file ? 'has-file' : ''}>
        {file ? '📄' : '📁'}
      </UploadIcon>
      
      <UploadText className={file ? 'has-file' : ''}>
        {file ? file.name : 'Arrastra tus archivos aquí'}
      </UploadText>
      
      {!file && (
        <UploadSubtext>
          o
        </UploadSubtext>
      )}
      
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFormats.join(',')}
      />
      
      {!file ? (
        <UploadButton type="button" onClick={(e) => {e.stopPropagation(); triggerFileInput()}}>
          Elige archivo
        </UploadButton>
      ) : (
        <FileInfo>
          <FileName>{file.name}</FileName>
          <RemoveButton onClick={(e) => {e.stopPropagation(); handleRemove()}}>
            ×
          </RemoveButton>
        </FileInfo>
      )}
    </UploadContainer>
  )
}

export default DocumentUpload
