import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('https://images.unsplash.com/photo-1554224154-26032fced8bd?q=80&w=2070&auto=format&fit=crop') center/cover;
  padding: var(--spacing-2xl) 0 var(--spacing-xl);
  color: var(--color-white);
  text-align: center;
`

const Section = styled.section`
  padding: var(--spacing-2xl) 0;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const ComingSoon = styled.div`
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  
  & h2 {
    font-size: 2rem;
    color: var(--color-secondary);
    margin-bottom: var(--spacing-lg);
  }
  
  & p {
    font-size: 1.1rem;
    color: var(--color-gray-600);
    max-width: 600px;
    margin: 0 auto var(--spacing-xl);
  }
  
  & .actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
  }
  
  & a {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-xl);
    border-radius: var(--radius-md);
    font-weight: 600;
    transition: all var(--transition-fast);
    text-decoration: none;
  }
  
  & .primary {
    background: var(--color-primary);
    color: var(--color-white);
    
    &:hover {
      background: var(--color-primary-dark);
    }
  }
  
  & .secondary {
    background: var(--color-gray-100);
    color: var(--color-secondary);
    
    &:hover {
      background: var(--color-gray-200);
    }
  }
`

const ComparadorPage: React.FC = () => {
  return (
    <>
      <PageHeader>
        <Container>
          <h1>Comparador de Hipotecas</h1>
          <p>Comparar hasta 4 hipotecas lado a lado para encontrar la mejor opción según tus necesidades.</p>
        </Container>
      </PageHeader>

      <Section>
        <Container>
          <ComingSoon>
            <h2>Próximamente</h2>
            <p>Estamos trabajando en el comparador de hipotecas. Mientras tanto, puedes ver nuestro catálogo completo de hipotecas y contactar con nosotros para una comparación personalizada.</p>
            <div className="actions">
              <Link to="/hipotecas" className="primary">Ver todas las hipotecas</Link>
              <Link to="/contacta-con-iahorro" className="secondary">Solicitar comparación</Link>
            </div>
          </ComingSoon>
        </Container>
      </Section>
    </>
  )
}

export default ComparadorPage
