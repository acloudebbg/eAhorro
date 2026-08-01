import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FAQsPage: React.FC = () => {
  const faqs = [
    {
      question: '¿Qué es iAhorro?',
      answer: 'iAhorro es un intermediario de crédito inmobiliario certificado por el Banco de España que te ayuda a encontrar la mejor hipoteca sin coste para ti.'
    },
    {
      question: '¿Cuánto cuesta el servicio de iAhorro?',
      answer: 'El servicio es 100% gratuito para el usuario. iAhorro obtiene sus ingresos de las entidades bancarias con las que trabaja.'
    },
    {
      question: '¿Puedo confiar en iAhorro?',
      answer: 'Sí, iAhorro está certificado por el Banco de España como Intermediaria de Crédito Inmobiliario nº D185. Somos parte del Grupo BC, líder en el sector.'
    },
    {
      question: '¿Cómo funciona el proceso?',
      answer: 'Un experto estudia tu perfil, negocia con los bancos y te presenta las mejores ofertas. Tú decides cuál aceptar.'
    },
    {
      question: '¿Puedo mejorar mi hipoteca actual?',
      answer: 'Sí, podemos ayudarte a encontrar mejores condiciones para tu hipoteca actual a través de una subrogación o novación.'
    },
    {
      question: '¿Qué tipos de hipotecas existen?',
      answer: 'Existen hipotecas fijas (tipo de interés constante), variables (tipo de interés variable) y mixtas (combinación de fijo y variable).'
    },
    {
      question: '¿Cuánto tiempo tarda el proceso?',
      answer: 'El proceso puede variar, pero normalmente en 2-4 semanas puedes tener tu hipoteca aprobada.'
    },
    {
      question: '¿Qué documentos necesito?',
      answer: 'Normalmente necesitarás DNI, últimas nóminas, declaración de la renta, contratos de trabajo y escritura de la vivienda.'
    }
  ]

  return (
    <PageContainer>
      <Container>
        <h1>Preguntas Frecuentes</h1>
        <Content>
          <p>Encuentra respuestas a las preguntas más comunes sobre hipotecas y nuestro servicio.</p>
          
          <FAQList>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion onClick={() => {
                  const content = document.getElementById(`faq-content-${index}`)
                  if (content) {
                    content.style.display = content.style.display === 'block' ? 'none' : 'block'
                  }
                }}>
                  {faq.question}
                  <span className="toggle-icon">+</span>
                </FAQQuestion>
                <FAQContent id={`faq-content-${index}`}>
                  <p>{faq.answer}</p>
                </FAQContent>
              </FAQItem>
            ))}
          </FAQList>
          
          <CTASection>
            <h3>¿No encuentras la respuesta a tu pregunta?</h3>
            <p>Contacta con uno de nuestros expertos y te ayudaremos personalmente.</p>
            <Link to="/contacta-con-iahorro" className="btn-primary">Contactar con un experto</Link>
          </CTASection>
          
          <p style={{ marginTop: '40px', color: 'var(--color-gray-600)', textAlign: 'center' }}>
            © iAhorro 2026 - Todos los derechos reservados
          </p>
        </Content>
      </Container>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  padding: var(--spacing-2xl) 0;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const Content = styled.div`
  background: var(--color-white);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  
  & h1 {
    color: var(--color-secondary);
    margin-bottom: var(--spacing-xl);
    text-align: center;
  }
  
  & > p {
    color: var(--color-gray-700);
    line-height: 1.8;
    margin-bottom: var(--spacing-xl);
    text-align: center;
  }
`

const FAQList = styled.div`
  margin-bottom: var(--spacing-xl);
`

const FAQItem = styled.div`
  margin-bottom: var(--spacing-md);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
`

const FAQQuestion = styled.div`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-gray-50);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: var(--color-secondary);
  transition: background var(--transition-fast);
  
  &:hover {
    background: var(--color-gray-100);
  }
  
  & .toggle-icon {
    font-size: 1.5rem;
    color: var(--color-primary);
    font-weight: bold;
  }
`

const FAQContent = styled.div`
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-white);
  display: none;
  
  & p {
    color: var(--color-gray-700);
    line-height: 1.8;
    margin: 0;
  }
`

const CTASection = styled.div`
  background: var(--color-primary-light);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  
  & h3 {
    color: var(--color-secondary);
    margin-bottom: var(--spacing-md);
  }
  
  & p {
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-lg);
  }
  
  & .btn-primary {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-xl);
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--radius-md);
    font-weight: 600;
    text-decoration: none;
    transition: background var(--transition-fast);
    
    &:hover {
      background: var(--color-primary-dark);
    }
  }
`

export default FAQsPage
