import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DocumentUploadV2 from '../components/V2/DocumentUploadV2/DocumentUploadV2'
import { ValidationResult, DocumentType } from '../components/V2/types'
import { CONFIDENCE_THRESHOLD, COLORS } from '../components/V2/constants'
import { MessagesProvider, MessageIcon, MessagesModal } from '../components/V2/Messages'

// Interfaces para los documentos
interface DocumentItem {
  id: string
  name: string
  section: string
  category: string
  uploadedFile: File | null
  required: boolean
}

interface DocumentSection {
  id: string
  title: string
  icon: string
  documents: DocumentItem[]
}

// Datos de las secciones de documentos
const documentSections: DocumentSection[] = [
  {
    id: 'personal-laboral',
    title: 'Personal y Laboral',
    icon: '👤',
    documents: [
      { id: 'vida-laboral', name: 'Vida laboral', section: 'personal-laboral', category: 'Doc. personal y laboral', uploadedFile: null, required: true },
      { id: 'contrato', name: 'Contrato', section: 'personal-laboral', category: 'Doc. personal y laboral', uploadedFile: null, required: true },
      { id: 'nominas', name: 'Nóminas (3 últimas)', section: 'personal-laboral', category: 'Doc. personal y laboral', uploadedFile: null, required: true },
      { id: 'dni-nie', name: 'DNI/NIE', section: 'personal-laboral', category: 'Doc. personal y laboral', uploadedFile: null, required: true },
    ]
  },
  {
    id: 'economica',
    title: 'Económica',
    icon: '💰',
    documents: [
      { id: 'recibos-prestamos', name: 'Recibos préstamos', section: 'economica', category: 'Doc. económica', uploadedFile: null, required: false },
      { id: 'movimientos-bancarios', name: 'Movimientos bancarios', section: 'economica', category: 'Doc. económica', uploadedFile: null, required: false },
      { id: 'declaracion-renta', name: 'Declaración de la Renta', section: 'economica', category: 'Doc. económica', uploadedFile: null, required: false },
    ]
  },
  {
    id: 'vivienda',
    title: 'Vivienda',
    icon: '🏠',
    documents: [
      { id: 'nota-simple', name: 'Nota simple', section: 'vivienda', category: 'Doc. vivienda', uploadedFile: null, required: false },
    ]
  },
  {
    id: 'otros',
    title: 'Otros documentos',
    icon: '📋',
    documents: [
      { id: 'tasacion', name: 'Tasación', section: 'otros', category: 'Doc. otros', uploadedFile: null, required: false },
      { id: 'arras', name: 'Arras', section: 'otros', category: 'Doc. otros', uploadedFile: null, required: false },
      { id: 'justificante-ahorros', name: 'Justificante ahorros', section: 'otros', category: 'Doc. otros', uploadedFile: null, required: false },
      { id: 'documentacion-extra', name: 'Documentación extra', section: 'otros', category: 'Doc. otros', uploadedFile: null, required: false },
    ]
  }
]

// Componentes estilizados
const ClientAreaContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.pageBg};
`

const ClientHeader = styled.header`
  background: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-gray-200);
  position: sticky;
  top: 0;
  z-index: 1000;
`

const ClientHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  
  @media (max-width: 992px) {
    flex-wrap: wrap;
    gap: var(--spacing-md);
    padding: 0 var(--spacing-md);
  }
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-sm);
  }
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  
  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    justify-content: space-between;
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  
  & img {
    height: 40px;
    width: auto;
    
    @media (max-width: 576px) {
      height: 32px;
    }
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    order: 3;
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--color-gray-50);
  }
  
  & .avatar {
    width: 36px;
    height: 36px;
    background: ${COLORS.blue};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    flex-shrink: 0;
    
    @media (max-width: 576px) {
      width: 32px;
      height: 32px;
      font-size: 0.8rem;
    }
  }
  
  & .name {
    font-size: 0.9rem;
    color: var(--color-gray-700);
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  & .message-icon {
    flex-shrink: 0;
    @media (max-width: 768px) {
      order: -1;
    }
  }
`

const CloseSessionButton = styled.button`
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-gray-100);
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  white-space: nowrap;
  
  &:hover {
    background: var(--color-gray-200);
  }
  
  @media (max-width: 576px) {
    font-size: 0.8rem;
    padding: var(--spacing-xs) var(--spacing-sm);
    
    &::before {
      display: none;
    }
  }
`

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  
  & select {
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    background: var(--color-white);
    cursor: pointer;
    
    @media (max-width: 576px) {
      font-size: 0.8rem;
      padding: var(--spacing-xs);
    }
  }
  
  @media (max-width: 768px) {
    order: 2;
  }
`

const MyAccountLink = styled.a`
  padding: var(--spacing-xs) var(--spacing-md);
  background: ${COLORS.green};
  color: var(--color-white);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  white-space: nowrap;
  transition: all var(--transition-fast);

  &:hover {
    background: ${COLORS.greenHover};
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--spacing-xl);
  gap: var(--spacing-lg);
  width: 100%;
  
  @media (max-width: 992px) {
    padding: var(--spacing-lg);
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
  
  @media (max-width: 576px) {
    padding: var(--spacing-sm);
  }
`

// Sección de bienvenida
const WelcomeSection = styled.section`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: ${COLORS.shadowContainer};
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }
  
  @media (max-width: 576px) {
    padding: var(--spacing-md);
  }
`

const WelcomeTitle = styled.h1`
  font-size: clamp(1.4rem, 3vw, 1.75rem);
  color: ${COLORS.navy};
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  line-height: 1.3;
  
  @media (max-width: 576px) {
    font-size: 1.3rem;
  }
`

const WelcomeText = styled.p`
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
  font-size: clamp(0.9rem, 1.8vw, 1rem);
`

const WelcomeHighlight = styled.p`
  color: ${COLORS.navy};
  font-weight: 600;
  margin: var(--spacing-lg) 0 0 0;
  font-size: clamp(0.95rem, 1.7vw, 1.05rem);
`

// Sección de descarga de documentación
const DownloadSection = styled.div`
  background: oklch(55% 0.16 235 / 0.08);
  border: 2px solid ${COLORS.blue};
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  position: relative;
  
  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`

const RecommendedBadge = styled.span`
  position: absolute;
  top: -10px;
  right: var(--spacing-md);
  background: ${COLORS.orange};
  color: var(--color-white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  
  @media (max-width: 576px) {
    font-size: 0.65rem;
    padding: var(--spacing-xs);
    right: var(--spacing-sm);
  }
`

const DownloadTitle = styled.h3`
  font-size: clamp(1rem, 2.2vw, 1.1rem);
  color: ${COLORS.navy};
  margin-bottom: var(--spacing-sm);
  font-weight: 600;

  & .highlight {
    color: ${COLORS.blue};
    text-decoration: underline;
  }
  
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`

const DownloadButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background: ${COLORS.green};
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: clamp(0.9rem, 1.7vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin: var(--spacing-md) 0;

  &:hover {
    background: ${COLORS.greenHover};
  }
  
  @media (max-width: 576px) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
`

const DownloadSubtitle = styled.p`
  font-size: 0.85rem;
  color: var(--color-gray-600);
  text-align: center;
  margin: 0;
  
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`

// Barra de progreso global de subida de documentos
const UploadProgressSection = styled.section`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: ${COLORS.shadowContainer};
  padding: var(--spacing-lg);

  @media (max-width: 768px) {
    padding: var(--spacing-md);
  }
`

const UploadProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }
`

const UploadProgressTitle = styled.h3`
  font-size: clamp(1rem, 2.2vw, 1.1rem);
  color: ${COLORS.navy};
  font-weight: 700;
`

const ProgressBarTrack = styled.div`
  width: 160px;
  height: 6px;
  background: ${COLORS.borderGray};
  border-radius: var(--radius-full);
  overflow: hidden;

  @media (max-width: 576px) {
    width: 100%;
  }
`

const ProgressBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${COLORS.green};
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
`

const ProgressLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${COLORS.navy};
  white-space: nowrap;
`

// Secciones de documentos
const DocumentSectionContainer = styled.div`
  background: var(--color-white);
  border-radius: ${COLORS.radiusCategory};
  box-shadow: ${COLORS.shadowContainer};
  overflow: hidden;

  & + & {
    margin-top: var(--spacing-md);
  }
`

const DocumentSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: var(--spacing-md) var(--spacing-lg);
  background: ${COLORS.headerTintBg};

  @media (max-width: 576px) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;
`

const CategoryStatusDot = styled.span<{ $state: 'none' | 'complete' | 'error' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $state }) =>
    $state === 'complete' ? COLORS.green : $state === 'error' ? COLORS.red : 'var(--color-gray-400)'};
`

const CategoryCountPill = styled.span<{ $state: 'none' | 'complete' | 'error' }>`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: var(--radius-full);
  white-space: nowrap;
  color: ${({ $state }) =>
    $state === 'complete' ? COLORS.green : $state === 'error' ? COLORS.red : 'var(--color-gray-600)'};
  background: ${({ $state }) =>
    $state === 'complete' ? 'oklch(52% 0.13 155 / 0.12)' : $state === 'error' ? COLORS.redSoft : 'var(--color-gray-100)'};
`

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: clamp(1rem, 2vw, 1.1rem);
  color: ${COLORS.navy};
  font-weight: 600;

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`

const SectionIcon = styled.span`
  font-size: 1.2rem;
  
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`

const ToggleButton = styled.button<{ $isOpen: boolean }>`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--color-gray-500);
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  padding: var(--spacing-xs);
  
  &:hover {
    color: var(--color-secondary);
  }
  
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`

const SectionContent = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => $isOpen ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  animation: fadeIn 0.3s ease;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
    padding: var(--spacing-md);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const DocumentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  @media (max-width: 576px) {
    gap: var(--spacing-xs);
  }
`

const DocumentTitle = styled.label`
  font-size: clamp(0.85rem, 1.5vw, 0.9rem);
  font-weight: 600;
  color: ${COLORS.navy};
  text-align: center;

  @media (max-width: 576px) {
    font-size: 0.85rem;
  }
`

// Footer de la página
const ClientFooter = styled.footer`
  background: ${COLORS.navy};
  color: var(--color-white);
  padding: var(--spacing-xl) 0;
  margin-top: auto;
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg) 0;
  }
`

const FooterContent = styled.div`
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  @media (max-width: 576px) {
    padding: 0 var(--spacing-md);
    gap: var(--spacing-md);
  }
`

const FooterSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const FooterIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
  
  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`

const FooterText = styled.div`
  & h4 {
    color: var(--color-white);
    font-size: clamp(0.95rem, 1.7vw, 1rem);
    margin-bottom: var(--spacing-xs);
    font-weight: 600;
    
    @media (max-width: 576px) {
      font-size: 0.9rem;
    }
  }
  
  & p {
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(0.85rem, 1.5vw, 0.85rem);
    line-height: 1.5;
    
    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }
`

const ClientAreaPageV2: React.FC = () => {
  const navigate = useNavigate()
  const [userName] = useState('Enrique B. B.')
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({})
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({})
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'personal-laboral': true,
    'economica': true,
    'vivienda': true,
    'otros': true
  })

  // Verificar si un documento está subido Y validado
  const isDocumentUploaded = (docId: string) => {
    const result = validationResults[docId]
    return !!result && result.respuesta === 'SI' && result.confianza >= CONFIDENCE_THRESHOLD
  }

  // Progreso global: se cuenta sobre TODOS los documentos (no solo los obligatorios)
  const allDocuments = useMemo(() => documentSections.flatMap(s => s.documents), [])

  const completedAllDocuments = useMemo(
    () => allDocuments.filter(d => isDocumentUploaded(d.id)).length,
    [allDocuments, uploadedFiles, validationResults]
  )

  // Contador + estado por categoría (para el punto y el pill del acordeón)
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; done: number; state: 'none' | 'complete' | 'error' }> = {}
    documentSections.forEach(section => {
      const total = section.documents.length
      const done = section.documents.filter(d => isDocumentUploaded(d.id)).length
      const hasError = section.documents.some(d => validationResults[d.id]?.respuesta === 'NO')
      stats[section.id] = { total, done, state: hasError ? 'error' : done === total ? 'complete' : 'none' }
    })
    return stats
  }, [uploadedFiles, validationResults])

  // Manejar subida de archivos con validación
  const handleFileUpload = (docId: string) => (result: ValidationResult, file: File) => {
    // Guardar el resultado de validación
    setValidationResults(prev => ({
      ...prev,
      [docId]: result
    }))
    
    // Solo guardar el archivo si la confianza es >= 80%
    if (result.confianza >= CONFIDENCE_THRESHOLD && result.respuesta === 'SI') {
      setUploadedFiles(prev => ({
        ...prev,
        [docId]: file
      }))
    } else {
      // Si no es válido, eliminar el archivo si existía
      setUploadedFiles(prev => {
        const newFiles = { ...prev }
        delete newFiles[docId]
        return newFiles
      })
    }
  }

  const handleFileRemove = (docId: string) => () => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev }
      delete newFiles[docId]
      return newFiles
    })
    setValidationResults(prev => {
      const newResults = { ...prev }
      delete newResults[docId]
      return newResults
    })
  }

  // Toggle de secciones
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Cerrar sesión
  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <MessagesProvider>
      <ClientAreaContainer>
      {/* Header */}
      <ClientHeader>
        <ClientHeaderContent>
          <HeaderLeft>
            <Logo>
              <img 
                src="https://iahorro.imgix.net/img/general/logo_ia-w.svg?auto=format%2Ccompress&q=75" 
                alt="iAhorro" 
              />
            </Logo>
            <LanguageSelector>
              <span style={{ fontSize: '0.85rem' }}>🇪🇸</span>
              <select defaultValue="es">
                <option value="es">Castellano</option>
                <option value="ca">Català</option>
              </select>
            </LanguageSelector>
          </HeaderLeft>
          
          <HeaderRight>
            <MyAccountLink href="#">
              👤 Mi cuenta
            </MyAccountLink>
            <UserInfo>
              <div className="avatar">{userName.charAt(0)}</div>
              <span className="name">{userName}</span>
              <MessageIcon />
            </UserInfo>
            <CloseSessionButton onClick={handleLogout}>
              → Cerrar sesión
            </CloseSessionButton>
          </HeaderRight>
        </ClientHeaderContent>
      </ClientHeader>

      {/* Contenido principal */}
      <MainContent>
        {/* Sección de bienvenida */}
        <WelcomeSection>
          <WelcomeTitle>
            {userName}, sube ahora tus documentos y acelera la solicitud de tu hipoteca
          </WelcomeTitle>
          <WelcomeText>
            La documentación que pedimos a continuación es <strong>indispensable</strong> para solicitar cualquiera de nuestras hipotecas. 
            Te recomendamos que la subas cuanto antes ya que sin ella no podremos empezar con los trámites.
          </WelcomeText>
          <WelcomeHighlight>
            ¡Date prisa! tu hipoteca está cada vez más cerca.
          </WelcomeHighlight>
        </WelcomeSection>

        {/* Sección de descarga de documentación */}
        <DownloadSection>
          <RecommendedBadge>RECOMENDADO</RecommendedBadge>
          <DownloadTitle>
            Descarga la documentación que necesitas de la Seg. Social y la Agencia Tributaria de forma <span className="highlight">fácil y segura</span>
          </DownloadTitle>
          <DownloadButton onClick={() => window.open('https://areacliente.iahorro.com', '_blank')}>
            Descargar documentación
          </DownloadButton>
          <DownloadSubtitle>Menos de 5 minutos</DownloadSubtitle>
        </DownloadSection>

        {/* Barra de progreso global */}
        <UploadProgressSection>
          <UploadProgressHeader>
            <UploadProgressTitle>Sube tus documentos</UploadProgressTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <ProgressBarTrack>
                <ProgressBarFill $percent={(completedAllDocuments / allDocuments.length) * 100} />
              </ProgressBarTrack>
              <ProgressLabel>{completedAllDocuments}/{allDocuments.length} completos</ProgressLabel>
            </div>
          </UploadProgressHeader>
        </UploadProgressSection>

        {/* Secciones de documentos */}
        {documentSections.map(section => (
          <DocumentSectionContainer key={section.id}>
            <DocumentSectionHeader onClick={() => toggleSection(section.id)}>
              <SectionTitle>
                <CategoryStatusDot $state={categoryStats[section.id].state} />
                <SectionIcon>{section.icon}</SectionIcon>
                {section.title}
              </SectionTitle>
              <HeaderActions>
                <CategoryCountPill $state={categoryStats[section.id].state}>
                  {categoryStats[section.id].done}/{categoryStats[section.id].total}
                </CategoryCountPill>
                <ToggleButton
                  $isOpen={openSections[section.id]}
                  onClick={(e) => {e.stopPropagation(); toggleSection(section.id)}}
                >
                  ▼
                </ToggleButton>
              </HeaderActions>
            </DocumentSectionHeader>

            <SectionContent $isOpen={openSections[section.id]}>
              {section.documents.map(doc => (
                <DocumentCard key={doc.id}>
                  <DocumentTitle htmlFor={doc.id}>{doc.name}</DocumentTitle>
                  <DocumentUploadV2
                    documentId={doc.id}
                    label={doc.name}
                    documentType={doc.id as DocumentType}
                    onUploadComplete={handleFileUpload(doc.id)}
                    onRemove={handleFileRemove(doc.id)}
                  />
                </DocumentCard>
              ))}
            </SectionContent>
          </DocumentSectionContainer>
        ))}
      </MainContent>

      {/* Footer */}
      <ClientFooter>
        <FooterContent>
          <FooterSection>
            <FooterIcon>🏦</FooterIcon>
            <FooterText>
              <h4>Certificación de Banco de España</h4>
              <p>Entidad de Crédito Inmobiliario con número de registro D185</p>
            </FooterText>
          </FooterSection>
          <FooterSection>
            <FooterIcon>🔒</FooterIcon>
            <FooterText>
              <h4>Conexión 100% segura</h4>
              <p>Certificados SSL SHA-256 para la máxima seguridad de nuestras comunicaciones digitales.</p>
            </FooterText>
          </FooterSection>
          <FooterSection>
            <FooterIcon>🔑</FooterIcon>
            <FooterText>
              <h4>Confidencialidad</h4>
              <p>Cifrado y almacenamiento seguro de tus datos cumpliendo estrictamente con la RGPD.</p>
            </FooterText>
          </FooterSection>
        </FooterContent>
      </ClientFooter>
      </ClientAreaContainer>
      
      {/* Modal de mensajes */}
      <MessagesModal />
    </MessagesProvider>
  )
}

export default ClientAreaPageV2