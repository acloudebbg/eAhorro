import React from 'react'
import styled from 'styled-components'

const CondicionesGeneralesPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <h1>Condiciones Generales</h1>
        <Content>
          <p>Estas son las condiciones generales de uso de los servicios de iAhorro.</p>
          
          <Section>
            <h2>1. Objeto</h2>
            <p>iAhorro ofrece servicios de intermediación hipotecaria de forma gratuita y sin compromiso para el usuario.</p>
          </Section>
          
          <Section>
            <h2>2. Servicios</h2>
            <p>Nuestros servicios incluyen:</p>
            <ul>
              <li>Búsqueda y comparación de hipotecas</li>
              <li>Asesoramiento personalizado</li>
              <li>Negociación con entidades bancarias</li>
              <li>Gestión de trámites hipotecarios</li>
            </ul>
          </Section>
          
          <Section>
            <h2>3. Gratuidad del Servicio</h2>
            <p>Todos nuestros servicios son completamente gratuitos para el usuario. iAhorro obtiene sus ingresos de las entidades bancarias.</p>
          </Section>
          
          <Section>
            <h2>4. Sin Compromiso</h2>
            <p>El usuario no está obligado a contratar ninguna hipoteca. Puede cancelar el proceso en cualquier momento.</p>
          </Section>
          
          <Section>
            <h2>5. Responsabilidades</h2>
            <p>iAhorro actúa como intermediario y no es responsable de las decisiones financieras del usuario.</p>
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
  
  & ul {
    list-style: disc;
    margin-left: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
  }
  
  & li {
    color: var(--color-gray-700);
    line-height: 1.8;
    margin-bottom: var(--spacing-xs);
  }
`

const Section = styled.div`
  margin-bottom: var(--spacing-xl);
`

export default CondicionesGeneralesPage
