import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop') center/cover;
  padding: var(--spacing-2xl) 0 var(--spacing-xl);
  color: var(--color-white);
  text-align: center;
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

const AboutContent = styled.div`
  background: var(--color-white);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  
  & h2 {
    font-size: 2rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    text-align: center;
  }
  
  & p {
    font-size: 1.1rem;
    color: var(--color-gray-700);
    line-height: 1.8;
    margin-bottom: var(--spacing-lg);
    text-align: center;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  margin: var(--spacing-2xl) 0;
`

const StatCard = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
  
  & .number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: var(--spacing-sm);
  }
  
  & .label {
    font-size: 1rem;
    color: var(--color-gray-600);
    font-weight: 500;
  }
`

const ValuesSection = styled.div`
  background: var(--color-gray-50);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  
  & h2 {
    font-size: 2rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    text-align: center;
  }
  
  & .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }
  
  & .value-card {
    background: var(--color-white);
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    text-align: center;
    
    & svg {
      width: 60px;
      height: 60px;
      color: var(--color-primary);
      margin-bottom: var(--spacing-md);
    }
    
    & h3 {
      font-size: 1.2rem;
      margin-bottom: var(--spacing-md);
      color: var(--color-secondary);
    }
    
    & p {
      font-size: 0.95rem;
      color: var(--color-gray-600);
      line-height: 1.6;
    }
  }
`

const CTASection = styled.div`
  text-align: center;
  margin-top: var(--spacing-2xl);
  
  & h2 {
    font-size: 2rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
  }
  
  & p {
    font-size: 1.1rem;
    color: var(--color-gray-600);
    max-width: 600px;
    margin: 0 auto var(--spacing-xl);
    line-height: 1.7;
  }
  
  & a {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-2xl);
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 1.1rem;
    transition: all var(--transition-fast);
    text-decoration: none;
    
    &:hover {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }
`

const QuienesSomosPage: React.FC = () => {
  const stats = [
    { number: '10+', label: 'Años de experiencia' },
    { number: '50K+', label: 'Clientes satisfechos' },
    { number: '20+', label: 'Bancos colaboradores' },
    { number: '100M+', label: 'Euros financiados' }
  ]

  const values = [
    {
      icon: 'user-shield',
      title: 'Transparencia',
      description: 'Trabajamos con máxima transparencia en todas nuestras gestiones. Te explicamos todo con detalle, sin letra pequeña.'
    },
    {
      icon: 'handshake',
      title: 'Confianza',
      description: 'Nuestra relación con los bancos nos permite negociar las mejores condiciones para nuestros clientes.'
    },
    {
      icon: 'award',
      title: 'Excelencia',
      description: 'Somos líderes en el sector hipotecario. Certificados por el Banco de España como Intermediaria de Crédito Inmobiliario.'
    },
    {
      icon: 'heart',
      title: 'Compromiso',
      description: 'Te acompañamos en todo el proceso, desde la búsqueda hasta la firma, sin coste para ti.'
    }
  ]

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user-shield':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
      case 'handshake':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.273-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.273.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
      case 'award':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
      case 'heart':
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      default:
        return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    }
  }

  return (
    <>
      <PageHeader>
        <Container>
          <h1>Quiénes somos</h1>
          <p>Llevamos más de 10 años ayudando a muchas personas a cumplir sus sueños. Somos iAhorro, la asesoría hipotecaria líder en España.</p>
        </Container>
      </PageHeader>

      <Section>
        <Container>
          <AboutContent>
            <h2>Sobre iAhorro</h2>
            <p>
              En iAhorro somos expertos en hipotecas. Nuestro objetivo es ayudarte a conseguir la mejor hipoteca del mercado 
              o a mejorar la que ya tienes, de forma sencilla, rápida y segura.
            </p>
            <p>
              Trabajamos con los principales bancos de España para ofrecerte las mejores condiciones. 
              Negociamos por ti, comparamos las ofertas y te asesoramos en todo el proceso sin coste alguno.
            </p>
            <p>
              <strong>Nuestra misión es clara:</strong> que consigas la hipoteca perfecta para ti, con las mejores condiciones posibles.
            </p>
          </AboutContent>

          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <div className="number">{stat.number}</div>
                <div className="label">{stat.label}</div>
              </StatCard>
            ))}
          </StatsGrid>

          <ValuesSection>
            <h2>Nuestros valores</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  {getIcon(value.icon)}
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </ValuesSection>

          <CTASection>
            <h2>¿Listo para empezar?</h2>
            <p>Si estás buscando una hipoteca o quieres mejorar la que ya tienes, no esperes más. Nuestros expertos están listos para ayudarte.</p>
            <Link to="/contacta-con-iahorro">Contacta con nosotros</Link>
          </CTASection>
        </Container>
      </Section>
    </>
  )
}

export default QuienesSomosPage
