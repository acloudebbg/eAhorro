import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop') center/cover;
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
  
  & a, & button {
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

const GastosHipotecaPage: React.FC = () => {
  return (
    <>
      <PageHeader>
        <Container>
          <h1>Calculadora de gastos de hipoteca</h1>
          <p>Calcula todos los gastos asociados a la compra de una vivienda: notaría, registro, impuestos, comisiones, etc.</p>
        </Container>
      </PageHeader>

      <Section>
        <Container>
          <ComingSoon>
            <h2>Próximamente</h2>
            <p>Estamos trabajando en esta calculadora. Mientras tanto, puedes usar nuestra calculadora de cuota de hipoteca o contactar con nosotros para obtener una estimación personalizada.</p>
            <div className="actions">
              <Link to="/calculadoras/cuota-hipoteca" className="primary">Ir a calculadora de cuota</Link>
              <Link to="/contacta-con-iahorro" className="secondary">Solicitar estimación</Link>
            </div>
          </ComingSoon>
        </Container>
      </Section>
    </>
  )
}

export default GastosHipotecaPage
