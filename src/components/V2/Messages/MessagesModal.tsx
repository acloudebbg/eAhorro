import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useMessages } from './MessagesContext';

// Estilos de la ventana flotante (no modal bloqueante)
const FloatWindow = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  width: 380px;
  max-width: 90vw;
  max-height: 600px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--color-gray-200);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 3000;
  animation: floatIn 0.3s ease;
  overflow: hidden;

  /* Posición inicial (puede ser movida por el usuario) */
  bottom: 20px;
  right: 20px;

  /* Para que se pueda arrastrar */
  user-select: none;

  @keyframes floatIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    width: 95vw;
    max-width: none;
    max-height: 70vh;
    bottom: 10px;
    right: 10px;
  }
`;

// Header de la ventana flotante (área arrastrable)
const WindowHeader = styled.div`
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-primary);
  color: white;
  cursor: move;

  .title {
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    cursor: move;
  }

  .controls {
    display: flex;
    gap: var(--spacing-xs);
    cursor: default;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: white;
    padding: var(--spacing-xs);
    line-height: 1;

    &:hover {
      opacity: 0.8;
    }
  }

  .minimize-button {
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: white;
    padding: var(--spacing-xs);

    &:hover {
      opacity: 0.8;
    }
  }
`;

// Contenido de la ventana (no arrastrable)
const WindowContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// Contenedor de mensajes
const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  background: var(--color-gray-50);

  /* Estilos de scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-gray-200);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-gray-400);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-gray-500);
  }
`;

// Mensaje individual (todos proceden del asesor/sistema)
const MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 85%;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  color: var(--color-secondary);
  align-self: flex-start;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  .text {
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

// Fila con la hora y la marca de leído
const MessageMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 2px;
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  opacity: 0.7;
`;

// Marca visual de leído (estilo doble check)
const ReadReceipt = styled.span<{ $read: boolean }>`
  font-size: 0.75rem;
  line-height: 1;
  letter-spacing: -2px;
  color: ${({ $read }) => ($read ? '#4FC3F7' : 'var(--color-gray-400)')};
`;

// Mensaje de bienvenida
const WelcomeMessage = styled.div`
  text-align: center;
  padding: var(--spacing-md);
  color: var(--color-gray-500);

  .icon {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-sm);
  }

  .title {
    font-size: 1rem;
    color: var(--color-secondary);
    margin-bottom: var(--spacing-xs);
    font-weight: 600;
  }

  .subtitle {
    font-size: 0.85rem;
    line-height: 1.5;
  }
`;

// Componente MessagesModal
const MessagesModal: React.FC = () => {
  const {
    messages,
    isMessagesModalOpen,
    closeMessagesModal,
  } = useMessages();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Posición de la ventana (puede ser movida por el usuario)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [windowStartPos, setWindowStartPos] = useState({ x: 0, y: 0 });

  // Auto-scroll al final cuando hay nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Manejar arrastrar la ventana
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget ||
        (e.target as HTMLElement).closest('.draggable-area')) {
      setIsDragging(true);
      setDragStartPos({ x: e.clientX, y: e.clientY });
      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        setWindowStartPos({ x: rect.left, y: rect.top });
      }
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartPos.x;
    const dy = e.clientY - dragStartPos.y;

    setPosition({
      x: windowStartPos.x + dx,
      y: windowStartPos.y + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Añadir event listeners para arrastrar
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartPos, windowStartPos]);

  // Formatear la hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Ordenar mensajes por fecha
  const sortedMessages = [...messages].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  // Mensaje de bienvenida
  const showWelcome = messages.length === 0;

  // No renderizar nada si el modal no está abierto (tras haber llamado a todos los hooks)
  if (!isMessagesModalOpen) {
    return null;
  }

  return (
    <FloatWindow
      ref={windowRef}
      $isOpen={isMessagesModalOpen}
      style={{
        left: position.x !== 0 ? `${position.x}px` : 'auto',
        right: position.x === 0 ? '20px' : 'auto',
        top: position.y !== 0 ? `${position.y}px` : 'auto',
        bottom: position.y === 0 ? '20px' : 'auto',
      }}
      onMouseDown={handleMouseDown}
    >
      <WindowHeader className="draggable-area">
        <span className="title">
          <span>💬</span>
          <span>Mensajes</span>
        </span>
        <div className="controls">
          <button
            className="close-button"
            onClick={closeMessagesModal}
            title="Cerrar"
          >
            ×
          </button>
        </div>
      </WindowHeader>

      <WindowContent>
        <MessagesContainer>
          {showWelcome ? (
            <WelcomeMessage>
              <div className="icon">💬</div>
              <div className="title">Bienvenido a tus mensajes</div>
              <div className="subtitle">
                Aquí recibirás notificaciones de tu asesor hipotecario sobre el estado de tu solicitud.
              </div>
            </WelcomeMessage>
          ) : (
            sortedMessages.map((message) => (
              <MessageBubble key={message.id}>
                <span className="text">{message.text}</span>
                <MessageMeta>
                  <MessageTime>{formatTime(message.timestamp)}</MessageTime>
                  <ReadReceipt
                    $read={message.read}
                    title={message.read ? 'Leído' : 'No leído'}
                  >
                    {message.read ? '✓✓' : '✓'}
                  </ReadReceipt>
                </MessageMeta>
              </MessageBubble>
            ))
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>
      </WindowContent>
    </FloatWindow>
  );
};

export default MessagesModal;
