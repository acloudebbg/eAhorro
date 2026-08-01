import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DocumentUpload from '../components/DocumentUpload/DocumentUpload'

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
  background-color: var(--color-gray-50);
`

const ClientHeader = styled.header`
  background: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-gray-200);
`

const ClientHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  
  & img {
    height: 40px;
    width: auto;
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  
  & .avatar {
    width: 36px;
    height: 36px;
    background: var(--color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
  }
  
  & .name {
    font-size: 0.9rem;
    color: var(--color-gray-700);
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
  
  &:hover {
    background: var(--color-gray-200);
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
  }
`

const MyAccountLink = styled.a`
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-accent);
  color: var(--color-white);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  
  &:hover {
    background: var(--color-accent-dark);
  }
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--spacing-xl);
  gap: var(--spacing-xl);
  width: 100%;
`

const LeftColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`

// Sección de bienvenida
const WelcomeSection = styled.section`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
`

const WelcomeTitle = styled.h1`
  font-size: 1.75rem;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  line-height: 1.3;
`

const WelcomeText = styled.p`
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
`

const WelcomeHighlight = styled.p`
  color: var(--color-secondary);
  font-weight: 600;
  margin: var(--spacing-lg) 0 0 0;
`

// Sección de descarga de documentación
const DownloadSection = styled.div`
  background: rgba(173, 216, 230, 0.3);
  border: 2px solid var(--color-primary-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  position: relative;
`

const RecommendedBadge = styled.span`
  position: absolute;
  top: -10px;
  right: var(--spacing-md);
  background: var(--color-warning);
  color: var(--color-white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
`

const DownloadTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
  
  & .highlight {
    color: var(--color-primary);
    text-decoration: underline;
  }
`

const DownloadButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-accent);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin: var(--spacing-md) 0;
  
  &:hover {
    background: var(--color-accent-dark);
  }
`

const DownloadSubtitle = styled.p`
  font-size: 0.85rem;
  color: var(--color-gray-600);
  text-align: center;
  margin: 0;
`

// Sección de progreso
const ProgressSection = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
`

const ProgressTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-md);
  font-weight: 600;
`

const ProgressContainer = styled.div`
  margin-bottom: var(--spacing-md);
`

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
`

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  background: var(--color-success);
  border-radius: var(--radius-full);
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
`

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--color-gray-600);
`

// Secciones de documentos
const DocumentSectionContainer = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  
  & + & {
    margin-top: var(--spacing-md);
  }
`

const DocumentSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-gray-200);
  margin-bottom: var(--spacing-md);
  
  &:hover {
    background: transparent;
  }
`

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 1.1rem;
  color: var(--color-secondary);
  font-weight: 600;
`

const SectionIcon = styled.span`
  font-size: 1.2rem;
`

const ToggleButton = styled.button<{ isOpen: boolean }>`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--color-gray-500);
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  
  &:hover {
    color: var(--color-secondary);
  }
`

const SectionContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`

const DocumentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`

const DocumentTitle = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-secondary);
  text-align: center;
`

// Sección de documentación necesaria (sidebar derecho)
const RequiredDocumentsSection = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
`

const RequiredDocumentsTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-lg);
  font-weight: 600;
`

const DocumentCategory = styled.div`
  margin-bottom: var(--spacing-lg);
  
  &:last-child {
    margin-bottom: 0;
  }
`

const CategoryTitle = styled.h4`
  font-size: 1rem;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-md);
  font-weight: 600;
`

const DocumentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const DocumentListItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) 0;
  font-size: 0.85rem;
  color: var(--color-gray-600);
  position: relative;
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-gray-400);
    flex-shrink: 0;
  }
  
  &.completed::before {
    background: var(--color-success);
  }
  
  &:not(:last-child) {
    &::after {
      content: '';
      position: absolute;
      left: 2px;
      top: 100%;
      width: 2px;
      height: calc(100% + 4px);
      background: var(--color-gray-400);
    }
  }
  
  &.completed:not(:last-child)::after {
    background: var(--color-success);
  }
`

// Footer de la página
const ClientFooter = styled.footer`
  background: var(--color-secondary);
  color: var(--color-white);
  padding: var(--spacing-xl) 0;
  margin-top: auto;
`

const FooterContent = styled.div`
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
`

const FooterSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
`

const FooterIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
`

const FooterText = styled.div`
  & h4 {
    color: var(--color-white);
    font-size: 1rem;
    margin-bottom: var(--spacing-xs);
    font-weight: 600;
  }
  
  & p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85rem;
    line-height: 1.5;
  }
`

const ClientAreaPage: React.FC = () => {
  const navigate = useNavigate()
  const [userName] = useState('Enrique B. B.')
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({})
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'personal-laboral': true,
    'economica': true,
    'vivienda': true,
    'otros': true
  })

  // Calcular progreso
  const totalRequiredDocuments = useMemo(() => {
    return documentSections.reduce((acc, section) => {
      const requiredDocs = section.documents.filter(d => d.required).length
      return acc + requiredDocs
    }, 0)
  }, [])

  const uploadedRequiredDocuments = useMemo(() => {
    let count = 0
    documentSections.forEach(section => {
      section.documents.forEach(doc => {
        if (doc.required && uploadedFiles[doc.id]) {
          count++
        }
      })
    })
    return count
  }, [uploadedFiles])

  const progressPercentage = useMemo(() => {
    if (totalRequiredDocuments === 0) return 0
    return Math.round((uploadedRequiredDocuments / totalRequiredDocuments) * 100)
  }, [uploadedRequiredDocuments, totalRequiredDocuments])

  // Manejar subida de archivos
  const handleFileUpload = (docId: string) => (file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [docId]: file
    }))
  }

  const handleFileRemove = (docId: string) => () => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev }
      delete newFiles[docId]
      return newFiles
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

  // Verificar si un documento está subido
  const isDocumentUploaded = (docId: string) => {
    return !!uploadedFiles[docId]
  }



  return (
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
            </UserInfo>
            <CloseSessionButton onClick={handleLogout}>
              → Cerrar sesión
            </CloseSessionButton>
          </HeaderRight>
        </ClientHeaderContent>
      </ClientHeader>

      {/* Contenido principal */}
      <MainContent>
        <LeftColumn>
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

          {/* Sección de progreso */}
          <ProgressSection>
            <ProgressTitle>Progreso de la documentación</ProgressTitle>
            <ProgressContainer>
              <ProgressBarContainer>
                <ProgressBar progress={progressPercentage} />
              </ProgressBarContainer>
              <ProgressText>
                <span>{uploadedRequiredDocuments} de {totalRequiredDocuments} documentos requeridos</span>
                <span style={{ color: progressPercentage === 100 ? 'var(--color-success)' : 'var(--color-gray-600)' }}>
                  {progressPercentage}%
                </span>
              </ProgressText>
            </ProgressContainer>
          </ProgressSection>

          {/* Secciones de documentos */}
          {documentSections.map(section => (
            <DocumentSectionContainer key={section.id}>
              <DocumentSectionHeader onClick={() => toggleSection(section.id)}>
                <SectionTitle>
                  <SectionIcon>{section.icon}</SectionIcon>
                  {section.title}
                </SectionTitle>
                <ToggleButton 
                  isOpen={openSections[section.id]}
                  onClick={(e) => {e.stopPropagation(); toggleSection(section.id)}}
                >
                  ▼
                </ToggleButton>
              </DocumentSectionHeader>
              
              <SectionContent isOpen={openSections[section.id]}>
                {section.documents.map(doc => (
                  <DocumentCard key={doc.id}>
                    <DocumentTitle htmlFor={doc.id}>{doc.name}</DocumentTitle>
                    <DocumentUpload
                      onFileUpload={handleFileUpload(doc.id)}
                      onFileRemove={handleFileRemove(doc.id)}
                    />
                  </DocumentCard>
                ))}
              </SectionContent>
            </DocumentSectionContainer>
          ))}
        </LeftColumn>

        <RightColumn>
          {/* Sección de documentación necesaria */}
          <RequiredDocumentsSection>
            <RequiredDocumentsTitle>Documentación necesaria</RequiredDocumentsTitle>
            
            {/* Doc. personal y laboral */}
            <DocumentCategory>
              <CategoryTitle>Doc. personal y laboral</CategoryTitle>
              <DocumentList>
                <DocumentListItem className={isDocumentUploaded('vida-laboral') ? 'completed' : ''}>
                  Vida laboral
                </DocumentListItem>
                <DocumentListItem className={isDocumentUploaded('contrato') ? 'completed' : ''}>
                  Contrato
                </DocumentListItem>
                <DocumentListItem className={isDocumentUploaded('nominas') ? 'completed' : ''}>
                  Nóminas (3 últimas)
                </DocumentListItem>
                <DocumentListItem className={isDocumentUploaded('dni-nie') ? 'completed' : ''}>
                  DNI/NIE
                </DocumentListItem>
              </DocumentList>
            </DocumentCategory>

            {/* Doc. económica */}
            <DocumentCategory>
              <CategoryTitle>Doc. económica</CategoryTitle>
              <DocumentList>
                <DocumentListItem className={isDocumentUploaded('recibos-prestamos') ? 'completed' : ''}>
                  Recibos préstamos
                </DocumentListItem>
                <DocumentListItem className={isDocumentUploaded('movimientos-bancarios') ? 'completed' : ''}>
                  Movimientos bancarios
                </DocumentListItem>
                <DocumentListItem className={isDocumentUploaded('declaracion-renta') ? 'completed' : ''}>
                  Declaración de la Renta
                </DocumentListItem>
              </DocumentList>
            </DocumentCategory>
          </RequiredDocumentsSection>
        </RightColumn>
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
  )
}

export default ClientAreaPage
