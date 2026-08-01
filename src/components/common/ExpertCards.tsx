import React from 'react'
import styled from 'styled-components'

interface Expert {
  name: string
  initial: string
  image?: string
  description?: string
  title?: string
}

interface ExpertCardsProps {
  experts: Expert[]
  title?: string
  subtitle?: string
}

const ExpertCardsContainer = styled.section`
  padding: var(--spacing-2xl) 0;
  background: var(--color-white);
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: var(--spacing-md);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-secondary);
`

const Subtitle = styled.p`
  text-align: center;
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-2xl);
  font-size: 1.1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

const ExpertsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  justify-items: center;
`

const ExpertCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform var(--transition-fast);
  
  &:hover {
    transform: translateY(-5px);
  }
  
  & .expert-image {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: var(--spacing-md);
    box-shadow: var(--shadow-md);
  }
  
  & .expert-avatar {
    width: 160px;
    height: 160px;
    background: var(--color-gray-200);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-md);
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-secondary);
    box-shadow: var(--shadow-md);
  }
  
  & .expert-name {
    font-weight: 600;
    color: var(--color-secondary);
    font-size: 1rem;
    margin-bottom: var(--spacing-xs);
  }
  
  & .expert-title {
    color: var(--color-gray-600);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

const ExpertCards: React.FC<ExpertCardsProps> = ({
  experts,
  title = 'Nuestros expertos saben lo que hacen',
  subtitle = 'Su experiencia en el sector les permite negociar con los bancos y tener acceso a las mejores ofertas del mercado. Conocen todos los trámites y saben dónde acudir en función de cada caso y perfil para conseguir la mejor hipoteca.'
}) => {
  return (
    <ExpertCardsContainer>
      <Container>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
          <li style={{ marginBottom: '10px', color: 'var(--color-gray-700)' }}>Te acompañan durante todo el proceso</li>
          <li style={{ marginBottom: '10px', color: 'var(--color-gray-700)' }}>Te explican la letra pequeña</li>
          <li style={{ marginBottom: '10px', color: 'var(--color-gray-700)' }}>Hablan tu idioma, sin tecnicismos</li>
          <li style={{ color: 'var(--color-gray-700)' }}>Evitan que caigas en cláusulas abusivas</li>
        </ul>
        
        <ExpertsGrid>
          {experts.map((expert, index) => (
            <ExpertCard key={index}>
              {expert.image ? (
                <img src={expert.image} alt={expert.name} className="expert-image" />
              ) : (
                <div className="expert-avatar">{expert.initial}</div>
              )}
              <span className="expert-name">{expert.name}</span>
              {expert.title && <span className="expert-title">{expert.title}</span>}
            </ExpertCard>
          ))}
        </ExpertsGrid>
      </Container>
    </ExpertCardsContainer>
  )
}

export default ExpertCards
