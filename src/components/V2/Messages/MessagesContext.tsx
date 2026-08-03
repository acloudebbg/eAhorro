import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';

// Interfaz para un mensaje (todos proceden del asesor/sistema, el usuario no puede escribir)
interface Message {
  id: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

// Interfaz para el contexto
interface MessagesContextType {
  messages: Message[];
  unreadCount: number;
  isMessagesModalOpen: boolean;
  openMessagesModal: () => void;
  closeMessagesModal: () => void;
  markAllAsRead: () => void;
  notifySectionComplete: (sectionId: string, sectionTitle: string) => void;
}

// Tiempos de la simulación
const WELCOME_MESSAGE_DELAY = 10 * 1000; // 10 segundos tras cargar la página
const EXPERT_MESSAGE_DELAY_AFTER_FIRST = 4 * 60 * 1000; // 4 minutos tras el 1er mensaje
const EXPERT_MESSAGE_DELAY_AFTER_SECOND = 2 * 60 * 1000; // 2 minutos tras el 2º mensaje

const WELCOME_MESSAGE_TEXT =
  'Gracias por confiar en iAhorro. Si buscas una hipoteca, estás en el sitio correcto. Comparte con nosotros la documentación necesaria para poder buscarte el préstamo con las mejores condiciones. Te asignaremos un experto para que puedas preguntarle dudas y que te ayude en todo el proceso.';

const EXPERT_MESSAGE_TEXT =
  'Te hemos asignado un experto en hipotecas. Su nombre es José Jiménez y estará en contacto contigo en breve.';

// Contexto por defecto
const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

// Proveedor del contexto
const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);

  // Referencias para evitar duplicados y controlar los temporizadores
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const expertMessageSentRef = useRef(false);
  const secondMessageSentRef = useRef(false);
  const notifiedSectionsRef = useRef<Set<string>>(new Set());

  // Contar mensajes no leídos
  const unreadCount = messages.filter(m => !m.read).length;

  // Marcar todos como leídos
  const markAllAsRead = useCallback(() => {
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
  }, []);

  // Abrir modal de mensajes
  const openMessagesModal = useCallback(() => {
    setIsMessagesModalOpen(true);
    markAllAsRead();
  }, [markAllAsRead]);

  // Cerrar modal de mensajes
  const closeMessagesModal = useCallback(() => {
    setIsMessagesModalOpen(false);
  }, []);

  // Añadir un mensaje del asesor/sistema
  const addMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      text,
      timestamp: new Date(),
      read: false,
    };

    setMessages(prev => [...prev, newMessage]);
  }, []);

  // Enviar el mensaje de experto asignado, una única vez
  const sendExpertMessageIfNeeded = useCallback(() => {
    if (expertMessageSentRef.current) return;
    expertMessageSentRef.current = true;
    addMessage(EXPERT_MESSAGE_TEXT);
  }, [addMessage]);

  // Notificar que un apartado de documentos se ha completado
  const notifySectionComplete = useCallback((sectionId: string, sectionTitle: string) => {
    if (notifiedSectionsRef.current.has(sectionId)) return;
    notifiedSectionsRef.current.add(sectionId);

    addMessage(`Ya tienes todos los documentos del apartado ${sectionTitle}. Continúa si te quedan documentos por subir en otros apartados.`);

    // El mensaje de experto asignado llega 2 minutos después del primer apartado completado
    if (!secondMessageSentRef.current) {
      secondMessageSentRef.current = true;
      const timer = setTimeout(sendExpertMessageIfNeeded, EXPERT_MESSAGE_DELAY_AFTER_SECOND);
      timersRef.current.push(timer);
    }
  }, [addMessage, sendExpertMessageIfNeeded]);

  // Programar el mensaje de bienvenida al cargar la página por primera vez
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      addMessage(WELCOME_MESSAGE_TEXT);

      // El mensaje de experto asignado llega 4 minutos después del mensaje de bienvenida,
      // salvo que ya se haya enviado antes por completar un apartado
      const expertTimer = setTimeout(sendExpertMessageIfNeeded, EXPERT_MESSAGE_DELAY_AFTER_FIRST);
      timersRef.current.push(expertTimer);
    }, WELCOME_MESSAGE_DELAY);

    timersRef.current.push(welcomeTimer);

    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Valor del contexto
  const value: MessagesContextType = {
    messages,
    unreadCount,
    isMessagesModalOpen,
    openMessagesModal,
    closeMessagesModal,
    markAllAsRead,
    notifySectionComplete,
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

// Hook para usar el contexto
const useMessages = (): MessagesContextType => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

export { MessagesProvider, useMessages };
export type { Message, MessagesContextType };
