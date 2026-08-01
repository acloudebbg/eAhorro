import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const TasacionViviendaPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <h1>Tasación de Vivienda</h1>
        <Content>
          <p>El servicio de tasación de vivienda es esencial para obtener una hipoteca, ya que los bancos necesitan conocer el valor real de la propiedad antes de aprobar cualquier préstamo.</p>
          
          <Section>
            <h2>¿Qué es una tasación?</h2>
            <p>La tasación es un proceso mediante el cual un profesional certificado evalúa el valor de mercado de una vivienda. Este valor es determinante para:</p>
            <ul>
              <li>Determinar el importe máximo que el banco puede prestar</li>
              <li>Establecer el valor de garantía de la hipoteca</li>
              <li>Calcular el Loan to Value (LTV) del préstamo</li>
            </ul>
          </Section>
          
          <Section>
            <h2>¿Cuánto cuesta una tasación?</h2>
            <p>El coste de una tasación varía según el valor y tipo de vivienda, pero suele estar entre los 200€ y 500€. Este gasto lo asume normalmente el cliente.</p>
          </Section>
          
          <Section>
            <h2>¿Cómo solicitar una tasación?</h2>
            <p>Puedes solicitar una tasación a través de:</p>
            <ul>
              <li>Tu banco de confianza</li>
              <li>Una sociedad de tasación certificada</li>
              <li>Directamente a través de iAhorro (nosotros nos encargamos)</li>
            </ul>
          </Section>
          
          <Section>
            <h2>Documentación necesaria</h2>
            <p>Para realizar una tasación, normalmente necesitarás:</p>
            <ul>
              <li>Escrituras de la vivienda</li>
              <li>Certificado de eficiencia energética</li>
              <li>IBI al día</li>
              <li>Planos de la vivienda (si están disponibles)</li>
              <li>Certificado de ocupación</li>
            </ul>
          </Section>
          
          <Section>
            <h2>Validez de la tasación</h2>
            <p>La tasación suele tener una validez de 6 meses desde su realización. Si no consigues la hipoteca en este plazo, será necesario realizar una nueva tasación.</p>
          </Section>
          
          <CTASection>
            <h3>¿Necesitas una tasación?</h3>
            <p>Nuestros expertos pueden ayudarte a obtener una tasación para tu vivienda de forma rápida y al mejor precio.</p>
            <Link to="/contacta-con-iahorro" className="btn-primary">Solicitar tasación</Link>
          </CTASection>
          
          <p style={{ marginTop: '40px', color: 'var(--color-gray-600)', textAlign: 'center' }}>
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
  
  & > p {
    color: var(--color-gray-700);
    line-height: 1.8;
    margin-bottom: var(--spacing-xl);
  }
`

const Section = styled.div`
  margin-bottom: var(--spacing-xl);
  
  & h2 {
    color: var(--color-secondary);
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

const CTASection = styled.div`
  background: var(--color-primary-light);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  margin-top: var(--spacing-xl);
  
  & h3 {
    color: var(--color-secondary);
    margin-bottom: var(--spacing-md);
  }
  
  & p {
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-lg);
  }
  
  & .btn-primary {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-xl);
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--radius-md);
    font-weight: 600;
    text-decoration: none;
    transition: background var(--transition-fast);
    
    &:hover {
      background: var(--color-primary-dark);
    }
  }
`

export default TasacionViviendaPage
