import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const DiccionarioPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <h1>Diccionario Hipotecario</h1>
        <Content>
          <p>Glosario de términos comunes relacionados con hipotecas y financiación.</p>
          
          <Section>
            <h2>A</h2>
            <TermList>
              <TermItem>
                <dt>Amortización</dt>
                <dd>Proceso de pagar una hipoteca de forma anticipada para reducir la deuda.</dd>
              </TermItem>
              <TermItem>
                <dt>Amortización anticipada</dt>
                <dd>Pago adicional al importe de la cuota mensual para reducir el capital pendiente.</dd>
              </TermItem>
              <TermItem>
                <dt>Aval</dt>
                <dd>Garantía adicional que respalda el pago de la hipoteca.</dd>
              </TermItem>
            </TermList>
          </Section>
          
          <Section>
            <h2>C</h2>
            <TermList>
              <TermItem>
                <dt>Capital</dt>
                <dd>Cantidad de dinero prestado por el banco.</dd>
              </TermItem>
              <TermItem>
                <dt>Cuota</dt>
                <dd>Pago mensual que incluye capital e intereses.</dd>
              </TermItem>
              <TermItem>
                <dt>Comisión de apertura</dt>
                <dd>Porcentaje cobrado al inicio por abrir la hipoteca.</dd>
              </TermItem>
            </TermList>
          </Section>
          
          <Section>
            <h2>E</h2>
            <TermList>
              <TermItem>
                <dt>Euríbor</dt>
                <dd>Índice de referencia para calcular el interés de las hipotecas variables.</dd>
              </TermItem>
              <TermItem>
                <dt>Escritura pública</dt>
                <dd>Documento notarial que formaliza la hipoteca.</dd>
              </TermItem>
            </TermList>
          </Section>
          
          <Section>
            <h2>F</h2>
            <TermList>
              <TermItem>
                <dt>Fijo</dt>
                <dd>Tipo de interés que no varía durante la vida de la hipoteca.</dd>
              </TermItem>
              <TermItem>
                <dt>Financiación</dt>
                <dd>Porcentaje del valor de la vivienda que financia el banco.</dd>
              </TermItem>
            </TermList>
          </Section>
          
          <Section>
            <h2>H</h2>
            <TermList>
              <TermItem>
                <dt>Hipoteca</dt>
                <dd>Préstamo a largo plazo garantizado por una vivienda.</dd>
              </TermItem>
              <TermItem>
                <dt>Hipoteca mixta</dt>
                <dd>Combinación de tipo fijo y variable en diferentes periodos.</dd>
              </TermItem>
              <TermItem>
                <dt>Hipoteca variable</dt>
                <dd>Hipoteca con tipo de interés que varía según un índice de referencia.</dd>
              </TermItem>
            </TermList>
          </Section>
          
          <Section>
            <h2>I</h2>
            <TermList>
              <TermItem>
                <dt>Interés</dt>
                <dd>Porcentaje que se paga por el dinero prestado.</dd>
              </TermItem>
              <TermItem>
                <dt>IRPH</dt>
                <dd>Índice de Referencia de Préstamos Hipotecarios, otro índice usado para hipotecas variables.</dd>
              </TermItem>
            </TermList>
          </Section>
          
          <p style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link to="/blog">Ver más términos en nuestro blog</Link>
          </p>
          
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

const TermList = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
`

const TermItem = styled.div`
  & dt {
    font-weight: 700;
    color: var(--color-secondary);
    margin-bottom: var(--spacing-xs);
  }
  
  & dd {
    color: var(--color-gray-700);
    line-height: 1.6;
    margin-bottom: var(--spacing-md);
  }
`

export default DiccionarioPage
