import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop') center/cover;
  padding: var(--spacing-2xl) 0 var(--spacing-xl);
  color: var(--color-white);
  text-align: center;
  
  & h1 {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-md);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  & p {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.95;
  }
`

const Section = styled.section`
  padding: var(--spacing-2xl) 0;
  
  @media (max-width: 768px) {
    padding: var(--spacing-xl) 0;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const CalculatorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
`

const CalculatorCard = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  & .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--spacing-lg);
    
    & svg {
      width: 40px;
      height: 40px;
      color: var(--color-white);
    }
  }
  
  & h3 {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-md);
    color: var(--color-secondary);
  }
  
  & p {
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-lg);
    line-height: 1.6;
  }
  
  & a {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-xl);
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.95rem;
    transition: all var(--transition-fast);
    
    &:hover {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }
`

const CategorySection = styled.div`
  margin-bottom: var(--spacing-2xl);
  
  & h2 {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    position: relative;
    padding-bottom: var(--spacing-sm);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: var(--color-primary);
    }
  }
  
  & p {
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-xl);
  }
`

const CalculadorasPage: React.FC = () => {
  const hipotecasCalculators = [
    {
      title: 'Calculadora de cuota de hipoteca',
      description: 'Calcula cuánto pagarías cada mes con tu hipoteca según el precio de la vivienda, el tipo de interés y el plazo.',
      to: '/calculadoras/cuota-hipoteca',
      icon: 'calculator'
    },
    {
      title: 'Calculadora de gastos de hipoteca',
      description: 'Calcula todos los gastos asociados a la compra de una vivienda (notaría, registro, impuestos, etc.).',
      to: '/calculadoras/gastos-hipoteca',
      icon: 'receipt'
    },
    {
      title: 'Fija o mixta',
      description: '¿No sabes qué tipo de hipoteca elegir? Compara y descubre cuál se adapta mejor a tu situación.',
      to: '/calculadoras/hipoteca-fija-o-mixta',
      icon: 'balance'
    },
    {
      title: 'Calculadora de subrogación',
      description: 'Calcula cuánto podrías ahorrar cambiando tu hipoteca actual a otro banco.',
      to: '/calculadoras/subrogacion',
      icon: 'swap'
    },
    {
      title: 'Calculadora de amortización',
      description: 'Simula cuánto puedes ahorrar amortizando total o parcialmente tu hipoteca.',
      to: '/calculadoras/amortizacion',
      icon: 'trend-up'
    },
    {
      title: '¿Qué casa me puedo permitir?',
      description: 'Descubre el precio máximo de vivienda que puedes comprar según tus ingresos y ahorros.',
      to: '/calculadoras/que-casa-me-puedo-permitir',
      icon: 'home'
    }
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'calculator':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M18 7h.01" /></svg>
      case 'receipt':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
      case 'balance':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" /></svg>
      case 'swap':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
      case 'trend-up':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
      case 'home':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
      default:
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    }
  }

  return (
    <>
      <PageHeader>
        <Container>
          <h1>Calculadoras Hipotecarias</h1>
          <p>Herramientas para ayudarte a tomar la mejor decisión. Calcula cuotas, gastos, ahorros y mucho más.</p>
        </Container>
      </PageHeader>

      <Section>
        <Container>
          <CategorySection>
            <h2>Calculadoras de Hipotecas</h2>
            <p>Simula todos los aspectos de tu hipoteca antes de comprometerte.</p>
            <CalculatorsGrid>
              {hipotecasCalculators.map((calculator, index) => (
                <CalculatorCard key={index}>
                  <div className="icon">
                    {getIcon(calculator.icon)}
                  </div>
                  <h3>{calculator.title}</h3>
                  <p>{calculator.description}</p>
                  <Link to={calculator.to}>Calcular ahora</Link>
                </CalculatorCard>
              ))}
            </CalculatorsGrid>
          </CategorySection>

          <CategorySection>
            <h2>Información útil</h2>
            <p>Si tienes dudas sobre cómo usar nuestras calculadoras o qué significan los resultados, visita nuestra sección de ayuda.</p>
            <div style={{ textAlign: 'center' }}>
              <Link to="/faqs" style={{
                display: 'inline-block',
                padding: '15px 30px',
                background: 'var(--color-gray-100)',
                color: 'var(--color-secondary)',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.25s ease'
              }}>
                Ver FAQs sobre calculadoras
              </Link>
            </div>
          </CategorySection>
        </Container>
      </Section>
    </>
  )
}

export default CalculadorasPage
