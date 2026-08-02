import React from 'react';
import styled from 'styled-components';
import { useMessages } from './MessagesContext';

// Contenedor del icono de mensajes
const MessageIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: var(--spacing-xs);
`;

// Icono de mensaje
const MessageIconStyled = styled.div`
  font-size: 1.3rem;
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Contador de mensajes no leídos
const UnreadBadge = styled.span<{ hasUnread: boolean }>`
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-error);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  ${({ hasUnread }) => hasUnread ? 'opacity: 1;' : 'opacity: 0; pointer-events: none;'}
  transition: opacity 0.2s ease;
  
  /* Para números de 2 dígitos */
  ${({ children }) => 
    typeof children === 'number' && children >= 10 ? `
      width: 22px;
      font-size: 0.6rem;
    ` : ''}
  
  @media (max-width: 576px) {
    width: 16px;
    height: 16px;
    font-size: 0.6rem;
    
    ${({ children }) => 
      typeof children === 'number' && children >= 10 ? `
        width: 20px;
        font-size: 0.55rem;
      ` : ''}
  }
`;

// Componente MessageIcon
const MessageIcon: React.FC = () => {
  const { unreadCount, openMessagesModal } = useMessages();
  
  const hasUnread = unreadCount > 0;
  
  return (
    <MessageIconContainer 
      onClick={openMessagesModal} 
      title="Mensajes"
      className="message-icon"
    >
      <MessageIconStyled>💬</MessageIconStyled>
      {hasUnread && (
        <UnreadBadge hasUnread={hasUnread}>
          {unreadCount > 99 ? '99+' : unreadCount}
        </UnreadBadge>
      )}
    </MessageIconContainer>
  );
};

export default MessageIcon;
