import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// ============================================
// ÁREA PERSONAL V3 — prototipo de documentos + chat
// Página autocontenida: no importa nada de V1/V2 para poder evolucionar
// o eliminarse sin afectar a las otras áreas.
// ============================================

// Paleta local (mismos tokens visuales que el resto del sitio, copiados
// aquí para no depender de ../components/V2/constants)
const COLORS = {
  green: 'oklch(52% 0.13 155)',
  greenSoft: 'oklch(92% 0.05 155)',
  greenText: 'oklch(40% 0.13 155)',
  navy: 'oklch(28% 0.06 255)',
  teal: 'oklch(74% 0.14 165)',
  blue: 'oklch(55% 0.16 235)',
  red: 'oklch(55% 0.19 25)',
  redSoft: 'oklch(93% 0.05 25)',
  pageBg: 'oklch(97% 0.006 250)',
  borderGray: 'oklch(92% 0.008 250)',
  pendingSoft: 'oklch(95% 0.006 250)',
  bubbleBot: 'oklch(96% 0.005 250)',
  shadowContainer: '0 8px 30px rgba(0, 0, 0, 0.12)',
  shadowModal: '0 20px 60px rgba(0, 0, 0, 0.3)',
} as const

type DocStatus = 'pendiente' | 'valido' | 'error'

interface DocItem {
  name: string
  hint: string
  status: DocStatus
  error?: string
}

interface QuickReply {
  label: string
  kind: 'attach' | 'pending'
}

interface ChatMessage {
  from: 'bot' | 'user'
  text?: string
  file?: { name: string; label: string; bg: string; fg: string }
  quickReplies?: QuickReply[]
}

const documentsData: DocItem[] = [
  { name: 'Vida laboral', hint: 'PDF', status: 'pendiente' },
  { name: 'Contrato', hint: 'PDF', status: 'pendiente' },
  { name: 'Nóminas (3 últimas)', hint: 'PDF o imagen', status: 'pendiente' },
  { name: 'DNI/NIE', hint: 'Imagen o PDF', status: 'valido' },
  { name: 'Recibos préstamos', hint: 'PDF', status: 'pendiente' },
  { name: 'Movimientos bancarios', hint: 'PDF', status: 'error', error: 'El archivo está borroso, vuelve a intentarlo' },
  { name: 'Declaración de la Renta', hint: 'PDF', status: 'valido' },
  { name: 'Nota simple', hint: 'PDF', status: 'pendiente' },
  { name: 'Tasación', hint: 'PDF', status: 'pendiente' },
  { name: 'Arras', hint: 'PDF', status: 'pendiente' },
  { name: 'Justificante ahorros', hint: 'PDF o imagen', status: 'pendiente' },
  { name: 'Documentación extra', hint: 'Cualquier formato', status: 'pendiente' },
]

const statusMeta = (status: DocStatus) => {
  if (status === 'valido') return { label: 'Válido', bg: COLORS.greenSoft, fg: COLORS.greenText, dot: COLORS.green }
  if (status === 'error') return { label: 'Error', bg: COLORS.redSoft, fg: COLORS.red, dot: COLORS.red }
  return { label: 'Pendiente', bg: COLORS.pendingSoft, fg: 'var(--color-gray-600)', dot: 'var(--color-gray-400)' }
}

// ============================================
// Estilos
// ============================================

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.pageBg};
`

const ClientHeader = styled.header`
  background: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  @media (max-width: 576px) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
`

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  color: ${COLORS.navy};
  letter-spacing: -0.01em;

  & span {
    color: ${COLORS.teal};
  }
`

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${COLORS.blue};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
`

const CloseSessionButton = styled.button`
  border: 1px solid var(--color-gray-300);
  background: var(--color-white);
  color: var(--color-gray-700);
  font-size: 0.8rem;
  font-weight: 600;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast);
  white-space: nowrap;

  &:hover {
    background: var(--color-gray-100);
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: var(--spacing-xs) var(--spacing-sm);
  }
`

const MainArea = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: var(--spacing-xl);
  min-height: 0;

  @media (max-width: 900px) {
    padding: 0;
  }
`

const ChatCard = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 720px;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: ${COLORS.shadowContainer};
  border: 1px solid ${COLORS.borderGray};
  overflow: hidden;
  display: flex;
  min-height: 0;

  @media (max-width: 900px) {
    height: auto;
    flex: 1;
    border-radius: 0;
    border: none;
    box-shadow: none;
  }
`

// --- Sidebar (solo escritorio) ---

const Sidebar = styled.div`
  width: 340px;
  flex-shrink: 0;
  border-right: 1px solid ${COLORS.borderGray};
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: 900px) {
    display: none;
  }
`

const SidebarHeader = styled.div`
  padding: var(--spacing-md) 18px var(--spacing-sm);
  flex-shrink: 0;
`

const SidebarTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-gray-800);
`

const ProgressRow = styled.div`
  margin-top: var(--spacing-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`

const ProgressTrack = styled.div`
  flex: 1;
  height: 6px;
  background: ${COLORS.borderGray};
  border-radius: var(--radius-full);
  overflow: hidden;
`

const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${COLORS.green};
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
`

const ProgressCount = styled.div`
  font-size: 0.72rem;
  color: var(--color-gray-600);
  font-weight: 600;
  white-space: nowrap;
`

const DocList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 var(--spacing-sm) var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const DocRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 9px 10px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: var(--color-gray-50);
  }
`

const DocDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $color }) => $color};
`

const DocInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const DocName = styled.div`
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-gray-800);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DocError = styled.div`
  font-size: 0.66rem;
  color: ${COLORS.red};
  margin-top: 1px;
`

const DocBadge = styled.span<{ $bg: string; $fg: string }>`
  flex-shrink: 0;
  font-size: 0.62rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  white-space: nowrap;
`

const DocDeleteButton = styled.button`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: none;
  background: transparent;
  color: var(--color-gray-400);
  font-size: 0.85rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all var(--transition-fast);

  &:hover {
    background: ${COLORS.redSoft};
    color: ${COLORS.red};
  }
`

// --- Panel de chat ---

const ChatPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`

const ChatHeader = styled.div`
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  border-bottom: 1px solid ${COLORS.borderGray};
  flex-shrink: 0;

  @media (max-width: 900px) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
`

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  min-width: 0;
`

const BotAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${COLORS.green};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  flex-shrink: 0;

  @media (max-width: 900px) {
    width: 30px;
    height: 30px;
    font-size: 13px;
  }
`

const AssistantName = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-gray-800);
`

const AssistantStatus = styled.div`
  font-size: 0.7rem;
  color: ${COLORS.green};
  font-weight: 600;
`

const MobileProgressPill = styled.div`
  display: none;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  padding: 5px 10px 5px 6px;
  flex-shrink: 0;

  @media (max-width: 900px) {
    display: flex;
  }
`

const MobileProgressTrack = styled.div`
  width: 46px;
  height: 6px;
  background: ${COLORS.borderGray};
  border-radius: var(--radius-full);
  overflow: hidden;
`

const MobileProgressLabel = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--color-gray-700);
  white-space: nowrap;
`

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  min-height: 0;

  @media (max-width: 900px) {
    padding: var(--spacing-md);
  }
`

const MessageRow = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  gap: 6px;
`

const Bubble = styled.div<{ $isUser: boolean }>`
  max-width: 78%;
  background: ${({ $isUser }) => ($isUser ? COLORS.green : COLORS.bubbleBot)};
  color: ${({ $isUser }) => ($isUser ? 'white' : 'var(--color-gray-800)')};
  font-size: 0.82rem;
  line-height: 1.5;
  padding: 10px 14px;
  border-radius: 14px;

  @media (max-width: 900px) {
    max-width: 84%;
    font-size: 0.8rem;
  }
`

const AttachedFileCard = styled.div`
  max-width: 78%;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--color-white);
  border: 1px solid ${COLORS.borderGray};
  border-radius: var(--radius-lg);
  padding: 10px 12px;

  @media (max-width: 900px) {
    max-width: 84%;
  }
`

const AttachedFileName = styled.div`
  flex: 1;
  min-width: 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gray-800);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const QuickRepliesRow = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
`

const QuickReplyButton = styled.button`
  border: 1px solid ${COLORS.green};
  background: var(--color-white);
  color: ${COLORS.greenText};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 7px 12px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: ${COLORS.greenSoft};
  }
`

const InputBar = styled.div`
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid ${COLORS.borderGray};
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;

  @media (max-width: 900px) {
    padding: var(--spacing-sm) var(--spacing-md);
  }
`

const AttachIcon = styled.span`
  cursor: pointer;
  font-size: 1.25rem;
  flex-shrink: 0;
`

const ChatInput = styled.input`
  flex: 1;
  min-width: 0;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  padding: 10px 16px;
  font-size: 0.82rem;
  outline: none;

  &:focus {
    border-color: ${COLORS.blue};
  }
`

const SendButton = styled.span`
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${COLORS.green};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
`

// --- Drawer móvil ---

const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`

const DrawerSheet = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 70vh;
  background: var(--color-white);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.2);
`

const DrawerHeader = styled.div`
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.borderGray};
  flex-shrink: 0;
`

const DrawerTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-gray-800);
`

const DrawerClose = styled.span`
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--color-gray-500);
`

const DrawerList = styled.div`
  overflow-y: auto;
  padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 6px;
`

// --- Modales ---

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: var(--spacing-md);
`

const ModalCard = styled.div`
  width: 340px;
  max-width: 100%;
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  box-shadow: ${COLORS.shadowModal};
`

const ModalHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ModalTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-gray-800);
`

const ModalCloseIcon = styled.span`
  cursor: pointer;
  color: var(--color-gray-500);
  font-size: 1.1rem;
  line-height: 1;
`

const ModalText = styled.div`
  font-size: 0.82rem;
  color: var(--color-gray-600);
  text-align: center;
`

const ModalActionButton = styled.button`
  border: none;
  background: ${COLORS.blue};
  color: white;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 12px;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
`

const DropZone = styled.div`
  border: 1.5px dashed var(--color-gray-300);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  text-align: center;
  color: var(--color-gray-500);
  font-size: 0.75rem;
  line-height: 1.6;
`

const DropZoneHint = styled.span`
  font-size: 0.68rem;
  color: var(--color-gray-400);
`

const ProcessingText = styled.div`
  padding: var(--spacing-lg) 0;
  text-align: center;
  color: var(--color-gray-600);
  font-size: 0.82rem;
  font-weight: 600;
`

const PreviewBox = styled.div`
  width: 100%;
  height: 220px;
  border-radius: var(--radius-md);
  background: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray-500);
  font-size: 0.75rem;
`

// ============================================
// Componente
// ============================================

const initialMessages: ChatMessage[] = [
  {
    from: 'bot',
    text: '¡Hola Enrique! Soy tu asistente de documentación. Puedes escribirme una pregunta o adjuntar cualquier archivo con el clip 📎 y te ayudo a subirlo y validarlo.',
  },
  {
    from: 'bot',
    text: 'Ahora mismo te faltan 9 de 12 documentos. ¿Quieres que te ayude con el siguiente?',
    quickReplies: [
      { label: 'Sí, ayúdame', kind: 'attach' },
      { label: '¿Qué documentos me faltan?', kind: 'pending' },
    ],
  },
]

interface ModalState {
  idx: number
  step: 'captura' | 'procesando'
}

const ClientAreaPageV3: React.FC = () => {
  const navigate = useNavigate()
  const [overrides, setOverrides] = useState<Record<number, { status: DocStatus; error?: string }>>({})
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [modal, setModal] = useState<ModalState | null>(null)
  const [previewIdx, setPreviewIdx] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')

  const docs = useMemo(
    () =>
      documentsData.map((d, idx) => {
        const ov = overrides[idx]
        return { ...d, status: ov ? ov.status : d.status, error: ov ? ov.error : d.error, idx }
      }),
    [overrides]
  )

  const total = docs.length
  const done = docs.filter(d => d.status === 'valido').length
  const pct = Math.round((done / total) * 100)

  const addMessage = (msg: ChatMessage) => setMessages(prev => [...prev, msg])

  const openModal = (idx?: number) => {
    let targetIdx = idx
    if (targetIdx === undefined) {
      const pending = docs.find(d => d.status === 'pendiente')
      if (!pending) {
        addMessage({ from: 'bot', text: '¡Ya tienes todos los documentos subidos! 🎉' })
        return
      }
      targetIdx = pending.idx
    }
    const doc = docs[targetIdx]
    if (doc.status !== 'pendiente') {
      openPreview(targetIdx)
      return
    }
    setModal({ idx: targetIdx, step: 'captura' })
  }

  const closeModal = () => setModal(null)

  const chooseCapture = () => {
    if (!modal) return
    const idx = modal.idx
    setModal(prev => (prev ? { ...prev, step: 'procesando' } : prev))
    setTimeout(() => {
      const doc = documentsData[idx]
      setOverrides(prev => ({ ...prev, [idx]: { status: 'valido' } }))
      setModal(null)
      addMessage({ from: 'user', file: { name: doc.name, label: 'Válido', bg: COLORS.greenSoft, fg: COLORS.greenText } })
      addMessage({ from: 'bot', text: `He recibido tu documento "${doc.name}" y todo está correcto. ✅ Validado.` })
    }, 1200)
  }

  const openPreview = (idx: number) => setPreviewIdx(idx)
  const closePreview = () => setPreviewIdx(null)
  const toggleDrawer = () => setDrawerOpen(prev => !prev)

  const handleDeleteDoc = (idx: number) => (e: React.MouseEvent) => {
    e.stopPropagation()
    const doc = documentsData[idx]
    setOverrides(prev => ({ ...prev, [idx]: { status: 'pendiente', error: undefined } }))
    addMessage({ from: 'bot', text: `He eliminado "${doc.name}". Puedes volver a subirlo cuando quieras.` })
  }

  const replyPending = () => {
    const pending = docs.filter(d => d.status !== 'valido')
    if (!pending.length) {
      addMessage({ from: 'bot', text: '¡Ya tienes todos los documentos subidos! 🎉' })
      return
    }
    const names = pending.map(d => d.name).join(', ')
    addMessage({ from: 'bot', text: `Todavía te faltan: ${names}. Puedes adjuntar cualquiera con el clip 📎 y lo valido al momento.` })
  }

  const sendChat = () => {
    const text = chatInput.trim()
    if (!text) return
    addMessage({ from: 'user', text })
    setChatInput('')
    setTimeout(replyPending, 400)
  }

  const handleLogout = () => navigate('/login')

  const renderDocRow = (doc: (typeof docs)[number]) => {
    const meta = statusMeta(doc.status)
    const isUploaded = doc.status !== 'pendiente'
    return (
      <DocRow key={doc.idx} onClick={() => openModal(doc.idx)}>
        <DocDot $color={meta.dot} />
        <DocInfo>
          <DocName>{doc.name}</DocName>
          {doc.error && <DocError>{doc.error}</DocError>}
        </DocInfo>
        <DocBadge $bg={meta.bg} $fg={meta.fg}>{meta.label}</DocBadge>
        {isUploaded && (
          <DocDeleteButton onClick={handleDeleteDoc(doc.idx)} title="Eliminar documento" aria-label={`Eliminar ${doc.name}`}>
            ×
          </DocDeleteButton>
        )}
      </DocRow>
    )
  }

  return (
    <PageContainer>
      <ClientHeader>
        <Logo>iahorro<span>.</span></Logo>
        <HeaderRight>
          <Avatar>E</Avatar>
          <CloseSessionButton onClick={handleLogout}>→ Cerrar sesión</CloseSessionButton>
        </HeaderRight>
      </ClientHeader>

      <MainArea>
        <ChatCard>
          <Sidebar>
            <SidebarHeader>
              <SidebarTitle>Tus documentos</SidebarTitle>
              <ProgressRow>
                <ProgressTrack><ProgressFill $percent={pct} /></ProgressTrack>
                <ProgressCount>{done}/{total}</ProgressCount>
              </ProgressRow>
            </SidebarHeader>
            <DocList>
              {docs.map(renderDocRow)}
            </DocList>
          </Sidebar>

          <ChatPanel>
            <ChatHeader>
              <ChatHeaderLeft>
                <BotAvatar>🤖</BotAvatar>
                <div>
                  <AssistantName>Asistente de documentación</AssistantName>
                  <AssistantStatus>● Disponible</AssistantStatus>
                </div>
              </ChatHeaderLeft>
              <MobileProgressPill onClick={toggleDrawer}>
                <MobileProgressTrack><ProgressFill $percent={pct} /></MobileProgressTrack>
                <MobileProgressLabel>{done}/{total} 📁</MobileProgressLabel>
              </MobileProgressPill>
            </ChatHeader>

            <MessagesArea>
              {messages.map((msg, i) => (
                <MessageRow key={i} $isUser={msg.from === 'user'}>
                  {msg.text && <Bubble $isUser={msg.from === 'user'}>{msg.text}</Bubble>}
                  {msg.file && (
                    <AttachedFileCard>
                      <span style={{ fontSize: 18 }}>📄</span>
                      <AttachedFileName>{msg.file.name}</AttachedFileName>
                      <DocBadge $bg={msg.file.bg} $fg={msg.file.fg}>{msg.file.label}</DocBadge>
                    </AttachedFileCard>
                  )}
                  {msg.quickReplies && (
                    <QuickRepliesRow>
                      {msg.quickReplies.map((qr, qi) => (
                        <QuickReplyButton key={qi} onClick={() => (qr.kind === 'attach' ? openModal(undefined) : replyPending())}>
                          {qr.label}
                        </QuickReplyButton>
                      ))}
                    </QuickRepliesRow>
                  )}
                </MessageRow>
              ))}
            </MessagesArea>

            <InputBar>
              <AttachIcon onClick={() => openModal(undefined)}>📎</AttachIcon>
              <ChatInput
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') sendChat() }}
                placeholder="Escribe tu pregunta..."
              />
              <SendButton onClick={sendChat}>➤</SendButton>
            </InputBar>
          </ChatPanel>
        </ChatCard>
      </MainArea>

      {drawerOpen && (
        <>
          <DrawerOverlay onClick={toggleDrawer} />
          <DrawerSheet>
            <DrawerHeader>
              <DrawerTitle>Tus documentos ({done}/{total})</DrawerTitle>
              <DrawerClose onClick={toggleDrawer}>×</DrawerClose>
            </DrawerHeader>
            <DrawerList>
              {docs.map(renderDocRow)}
            </DrawerList>
          </DrawerSheet>
        </>
      )}

      {modal && (
        <ModalOverlay>
          <ModalCard>
            <ModalHeaderRow>
              <ModalTitle>Subir documento</ModalTitle>
              <ModalCloseIcon onClick={closeModal}>×</ModalCloseIcon>
            </ModalHeaderRow>
            {modal.step === 'captura' && (
              <>
                <ModalText>Puedes subir cualquier documento, lo identificaremos automáticamente.</ModalText>
                <ModalActionButton onClick={chooseCapture}>📁 Seleccionar archivo</ModalActionButton>
                <ModalActionButton onClick={chooseCapture}>📷 Usar cámara</ModalActionButton>
                <DropZone>
                  Arrastra y suelta el archivo aquí
                  <br />
                  <DropZoneHint>Soporte: PDF, JPG, PNG</DropZoneHint>
                </DropZone>
              </>
            )}
            {modal.step === 'procesando' && <ProcessingText>Procesando documento…</ProcessingText>}
          </ModalCard>
        </ModalOverlay>
      )}

      {previewIdx !== null && (
        <ModalOverlay onClick={closePreview}>
          <ModalCard style={{ width: 300 }} onClick={e => e.stopPropagation()}>
            <ModalHeaderRow>
              <ModalTitle>{documentsData[previewIdx].name}</ModalTitle>
              <ModalCloseIcon onClick={closePreview}>×</ModalCloseIcon>
            </ModalHeaderRow>
            <PreviewBox>Vista previa del documento</PreviewBox>
          </ModalCard>
        </ModalOverlay>
      )}
    </PageContainer>
  )
}

export default ClientAreaPageV3
