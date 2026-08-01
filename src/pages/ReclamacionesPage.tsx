import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ReclamacionesPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <h1>Reclamaciones</h1>
        <Content>
          <p>Si tiene alguna reclamación sobre nuestros servicios, puede ponerse en contacto con nosotros de las siguientes formas:</p>
          
          <Section>
            <h2>1. Formulario de Contacto</h2>
            <p>Complete nuestro formulario de contacto en línea y un experto se pondrá en contacto con usted.</p>
            <p><Link to="/contacta-con-iahorro">Ir al formulario de contacto</Link></p>
          </Section>
          
          <Section>
            <h2>2. Por Correo Electrónico</h2>
            <p>Envíe su reclamación a: <a href="mailto:reclamaciones@iahorro.com">reclamaciones@iahorro.com</a></p>
          </Section>
          
          <Section>
            <h2>3. Por Teléfono</h2>
            <p>Llame a nuestro servicio de atención al cliente: <a href="tel:+34910207110">(+34) 910 207 110</a></p>
            <p>Horario: De lunes a viernes de 9:00 a 20:00 horas.</p>
          </Section>
          
          <Section>
            <h2>4. Por Correo Postal</h2>
            <p><strong>Dirección:</strong> General Ramírez de Madrid, 8-10, 28020, Madrid</p>
          </Section>
          
          <Section>
            <h2>5. Plazo de Respuesta</h2>
            <p>Nos comprometeremos a responder a su reclamación en un plazo máximo de 15 días hábiles.</p>
          </Section>
          
          <p style={{ marginTop: '40px', color: 'var(--color-gray-600)' }}>
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
  
  & h2 {
    color: var(--color-secondary);
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-md);
    font-size: 1.5rem;
  }
  
  & p {
    color: var(--color-gray-700);
    line-height: 1.8;
    margin-bottom: var(--spacing-md);
  }
  
  & a {
    color: var(--color-primary);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const Section = styled.div`
  margin-bottom: var(--spacing-xl);
`

export default ReclamacionesPage
