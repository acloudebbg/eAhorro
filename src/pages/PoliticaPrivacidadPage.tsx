import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PoliticaPrivacidadPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <h1>Política de Privacidad</h1>
        <Content>
          <p>En iAhorro, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta política describe cómo recopila, usa y protege su información personal.</p>
          
          <Section>
            <h2>1. Información que Recopilamos</h2>
            <p>Recopilamos información que nos proporciona directamente, como su nombre, dirección de correo electrónico, teléfono y datos financieros necesarios para procesar su solicitud de hipoteca.</p>
          </Section>
          
          <Section>
            <h2>2. Uso de la Información</h2>
            <p>Usamos su información para:</p>
            <ul>
              <li>Procesar su solicitud de hipoteca</li>
              <li>Ponerle en contacto con bancos y entidades financieras</li>
              <li>Mejorar nuestros servicios</li>
              <li>Enviarle información relevante sobre hipotecas</li>
            </ul>
          </Section>
          
          <Section>
            <h2>3. Compartir Información</h2>
            <p>Compartimos su información con bancos y entidades financieras para poder ofrecerle las mejores ofertas de hipotecas. Nunca vendemos su información personal.</p>
          </Section>
          
          <Section>
            <h2>4. Cookies</h2>
            <p>Este sitio web utiliza cookies. Para más información, consulte nuestra <Link to="/politica-de-cookies">Política de Cookies</Link>.</p>
          </Section>
          
          <Section>
            <h2>5. Sus Derechos</h2>
            <p>Tiene derecho a acceder, corregir o eliminar sus datos personales. Para ejercer estos derechos, póngase en contacto con nosotros a través de atencion@iahorro.com.</p>
          </Section>
          
          <Section>
            <h2>6. Seguridad</h2>
            <p>Implementamos medidas de seguridad para proteger su información personal contra accesos no autorizados.</p>
          </Section>
          
          <Section>
            <h2>7. Cambios en la Política de Privacidad</h2>
            <p>Podemos actualizar esta política en cualquier momento. Le notificaremos sobre cualquier cambio publicando la nueva política en esta página.</p>
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

export default PoliticaPrivacidadPage
