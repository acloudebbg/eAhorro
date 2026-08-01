import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Testimonial {
  text: string
  author: string
  rating: number
  date?: string
  image?: string
  videoUrl?: string
  videoThumbnail?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  showVideoThumbnails?: boolean
  showNavigation?: boolean
}

const TestimonialsContainer = styled.section`
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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
`

const TestimonialCard = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border-left: 4px solid var(--color-primary);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  & .quote {
    font-size: 2rem;
    color: var(--color-primary);
    line-height: 1;
    margin-bottom: var(--spacing-md);
  }
  
  & .text {
    font-style: italic;
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-lg);
    line-height: 1.7;
  }
  
  & .author {
    font-weight: 600;
    color: var(--color-secondary);
    margin-bottom: var(--spacing-sm);
    font-size: 1rem;
  }
  
  & .rating {
    color: var(--color-warning);
    font-size: 1.2rem;
  }
  
  & .video-container {
    margin-top: var(--spacing-md);
    border-radius: var(--radius-md);
    overflow: hidden;
    cursor: pointer;
    transition: transform var(--transition-fast);
    
    &:hover {
      transform: scale(1.02);
    }
    
    & img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
  
  & .author-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: var(--spacing-sm);
    object-fit: cover;
  }
`

const GoogleReviewsLink = styled.div`
  text-align: center;
  margin-top: var(--spacing-xl);
  
  & a {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--color-primary-dark);
    }
    
    & img {
      height: 30px;
    }
    
    & span {
      font-size: 0.9rem;
    }
  }
`

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
  
  & button {
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--color-primary);
    color: var(--color-white);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-weight: 500;
    transition: background var(--transition-fast);
    
    &:hover {
      background: var(--color-primary-dark);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  title = 'Nuestros clientes hablan por nosotros',
  subtitle = 'Las opiniones de nuestros clientes satisfechos son la mejor recompensa a nuestro trabajo. Trabajamos día a día por seguir mejorando y hacer felices a nuestros usuarios.',
  showVideoThumbnails = false,
  showNavigation = false
}) => {
  return (
    <TestimonialsContainer>
      <Container>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <span className="quote">"</span>
              {testimonial.videoThumbnail && showVideoThumbnails ? (
                <a href={testimonial.videoUrl} target="_blank" rel="noopener noreferrer" className="video-container">
                  <img src={testimonial.videoThumbnail} alt={`Video testimonial de ${testimonial.author}`} />
                </a>
              ) : (
                <p className="text">{testimonial.text}</p>
              )}
              {testimonial.image && (
                <img src={testimonial.image} alt={testimonial.author} className="author-image" />
              )}
              <div className="author">{testimonial.author}</div>
              <div className="rating">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
        
        <GoogleReviewsLink>
          <a href="https://g.page/iAhorro-com/" target="_blank" rel="noopener noreferrer">
            <img src="https://iahorro.imgix.net/_nuxt/google_valoracion_logo_color-dark.eNgR6H05.svg" alt="Google" />
            <span>Ver todas las reseñas</span>
          </a>
        </GoogleReviewsLink>
        
        {showNavigation && (
          <Navigation>
            <button>Anterior</button>
            <button>Siguiente</button>
          </Navigation>
        )}
      </Container>
    </TestimonialsContainer>
  )
}

export default Testimonials
