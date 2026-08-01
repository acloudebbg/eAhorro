import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PoliticaCookiesPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <h1>Política de Cookies</h1>
        <Content>
          <p>Esta Política de Cookies explica qué cookies utiliza este sitio web y para qué fines.</p>
          
          <Section>
            <h2>1. ¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que los sitios web pueden utilizar para hacer más eficiente la experiencia del usuario.</p>
          </Section>
          
          <Section>
            <h2>2. Tipos de Cookies que Utilizamos</h2>
            <ul>
              <li><strong>Cookies necesarias:</strong> Essenciales para el funcionamiento del sitio web.</li>
              <li><strong>Cookies analíticas:</strong> Nos ayudan a entender cómo utiliza los usuarios nuestro sitio.</li>
              <li><strong>Cookies de marketing:</strong> Utilizadas para mostrar anuncios relevantes.</li>
            </ul>
          </Section>
          
          <Section>
            <h2>3. ¿Cómo Controlar las Cookies?</h2>
            <p>Puede controlar y/o eliminar las cookies según desee. Para más información, visite <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">aboutcookies.org</a>.</p>
          </Section>
          
          <Section>
            <h2>4. Cambios en la Política de Cookies</h2>
            <p>Podemos actualizar esta política periódicamente. Cualquier cambio se publicará en esta página.</p>
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

export default PoliticaCookiesPage
