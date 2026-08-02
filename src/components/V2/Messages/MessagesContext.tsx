import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Interfaz para un mensaje
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'broker';
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
  sendMessage: (text: string) => void;
  addSimulatedMessage: (text: string) => void;
}

// Contexto por defecto
const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

// Proveedor del contexto
const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);

  // Contar mensajes no leídos
  const unreadCount = messages.filter(m => !m.read && m.sender === 'broker').length;

  // Marcar todos como leídos
  const markAllAsRead = useCallback(() => {
    setMessages(prev => prev.map(m => m.sender === 'broker' ? { ...m, read: true } : m));
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

  // Enviar mensaje (desde usuario)
  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    
    const newMessage: Message = {
      id: `user_${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      read: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // Añadir mensaje simulado (desde broker)
  const addSimulatedMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: `broker_${Date.now()}`,
      text: text,
      sender: 'broker',
      timestamp: new Date(),
      read: false, // Los mensajes del broker empiezan como no leídos
    };
    
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // Efecto para simular mensajes automáticos
  // Solo iniciar una vez cuando el componente se monta
  useEffect(() => {
    // Mensajes predefinidos en orden
    const simulatedMessages = [
      {
        delay: 30000, // 30 segundos
        text: 'Gracias por confiar en iAhorro. Si buscas una hipoteca, estás en el sitio correcto. Comparte con nosotros la documentación necesaria para poder buscarte el préstamo con las mejores condiciones. Te asignaremos un experto para que puedas preguntarle dudas y que te ayude en todo el proceso.'
      },
      {
        delay: 90000, // 90 segundos (1 minuto y medio)
        text: 'Sigue compartiendo documentos con nosotros y recuerda que si tienes alguna duda puedes contactarnos.'
      },
      {
        delay: 180000, // 180 segundos (3 minutos)
        text: 'En una buena, ya tienes agente asignado. David se pondrá en contacto contigo en breve.'
      }
    ];

    // Iniciar temporizadores
    const timers: NodeJS.Timeout[] = [];

    simulatedMessages.forEach((msg) => {
      const timer = setTimeout(() => {
        // Solo añadir el mensaje si no existe ya uno similar
        const messageExists = messages.some(m => m.text === msg.text);
        if (!messageExists) {
          addSimulatedMessage(msg.text);
        }
      }, msg.delay);
      
      timers.push(timer);
    });

    // Limpiar temporizadores al desmontar
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [addSimulatedMessage]); // Solo depende de addSimulatedMessage, no de messages

  // Valor del contexto
  const value: MessagesContextType = {
    messages,
    unreadCount,
    isMessagesModalOpen,
    openMessagesModal,
    closeMessagesModal,
    markAllAsRead,
    sendMessage,
    addSimulatedMessage,
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
