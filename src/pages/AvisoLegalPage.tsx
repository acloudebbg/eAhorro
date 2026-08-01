import React from 'react'
import styled from 'styled-components'

const AvisoLegalPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <h1>Aviso Legal</h1>
        <Content>
          <p>Este es el aviso legal de iAhorro.com. Contiene información legal sobre la empresa y sus servicios.</p>
          
          <Section>
            <h2>1. Información General</h2>
            <p>iAhorro es un Intermediario de Crédito Inmobiliario certificado por el Banco de España con el número D185.</p>
            <p>Pertenecemos al Grupo BC, líder en servicios hipotecarios en España.</p>
          </Section>
          
          <Section>
            <h2>2. Datos de Contacto</h2>
            <p><strong>Dirección:</strong> General Ramírez de Madrid, 8-10, 28020, Madrid</p>
            <p><strong>Teléfono:</strong> (+34) 910 207 110</p>
            <p><strong>Email:</strong> atencion@iahorro.com</p>
          </Section>
          
          <Section>
            <h2>3. Condiciones de Uso</h2>
            <p>El uso de este sitio web está sujeto a las condiciones generales de iAhorro.</p>
            <p>Nuestro servicio es gratuito y sin compromiso para el usuario.</p>
          </Section>
          
          <Section>
            <h2>4. Protección de Datos</h2>
            <p>Todos los datos personales están protegidos según la normativa vigente.</p>
            <p>Para más información, consulte nuestra <a href="/politica-de-privacidad">Política de Privacidad</a>.</p>
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
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-gray-200);
`

export default AvisoLegalPage
