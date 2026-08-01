import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MediaLogos } from '../components/common'

const IndiceIAhorroPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <h1>Índice iAhorro</h1>
        <Content>
          <p>El Índice iAhorro es un indicador que reflejamos el estado del mercado hipotecario actual, que abarca tipos de interés, tipos de hipotecas y otros datos que pueden resultar de ayuda para que aquellos que buscan una hipoteca puedan contrastar si lo que le ofrecen en su banco es la mejor opción que pueden conseguir.</p>
          
          <Section id="indice-hipotecas-fijas">
            <h2>Índice de Hipotecas Fijas</h2>
            <p>Evolución de los tipos de interés para hipotecas fijas en el mercado español.</p>
            <IndiceTable>
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Tipo de interés medio</th>
                  <th>Variación mensual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Julio 2026</td>
                  <td>1,98%</td>
                  <td>-0,12%</td>
                </tr>
                <tr>
                  <td>Junio 2026</td>
                  <td>2,10%</td>
                  <td>+0,05%</td>
                </tr>
                <tr>
                  <td>Mayo 2026</td>
                  <td>2,05%</td>
                  <td>-0,08%</td>
                </tr>
                <tr>
                  <td>Abril 2026</td>
                  <td>2,13%</td>
                  <td>+0,02%</td>
                </tr>
              </tbody>
            </IndiceTable>
          </Section>
          
          <Section>
            <h2>Índice de Hipotecas Variables</h2>
            <p>Evolución del euríbor y tipos de interés para hipotecas variables.</p>
            <IndiceTable>
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Euríbor a 12 meses</th>
                  <th>Tipo variable medio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Julio 2026</td>
                  <td>2,873%</td>
                  <td>3,873%</td>
                </tr>
                <tr>
                  <td>Junio 2026</td>
                  <td>2,798%</td>
                  <td>3,798%</td>
                </tr>
                <tr>
                  <td>Mayo 2026</td>
                  <td>2,804%</td>
                  <td>3,804%</td>
                </tr>
              </tbody>
            </IndiceTable>
            <p style={{ marginTop: '20px', color: 'var(--color-gray-600)' }}>
              Datos actualizados a 1 de agosto de 2026. <Link to="/euribor">Ver evolución del euríbor</Link>
            </p>
          </Section>
          
          <Section>
            <h2>¿Cómo se calcula el índice?</h2>
            <p>El Índice iAhorro se calcula a partir de una media ponderada de las ofertas de hipotecas de las principales entidades bancarias del mercado español, incluyendo BBVA, Santander, CaixaBank, Bankinter, Sabadell y otras.</p>
            <p>Analizamos más de 100 productos hipotecarios de forma mensual para ofrecerle una visión real del mercado.</p>
          </Section>
          
          <Section>
            <h2>¿Para qué sirve el índice?</h2>
            <ul>
              <li>Comparar ofertas de diferentes bancos</li>
              <li>Saber si su banco le ofrece las mejores condiciones</li>
              <li>Tomar decisiones informadas sobre su hipoteca</li>
              <li>Negociar con su banco utilizando datos de mercado</li>
            </ul>
          </Section>
          
          <CTASection>
            <h3>¿Quieres las mejores condiciones?</h3>
            <p>Nuestros expertos negocian con los bancos para conseguirle las mejores condiciones del mercado.</p>
            <Link to="/contacta-con-iahorro" className="btn-primary">Contactar con un experto</Link>
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
  
  & h2 {
    color: var(--color-secondary);
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-md);
    font-size: 1.5rem;
  }
  
  & h3 {
    color: var(--color-secondary);
    margin-bottom: var(--spacing-md);
    font-size: 1.3rem;
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

const IndiceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--spacing-md);
  
  & th,
  & td {
    padding: var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--color-gray-200);
  }
  
  & th {
    background: var(--color-gray-50);
    font-weight: 600;
    color: var(--color-secondary);
  }
  
  & tr:hover {
    background: var(--color-gray-50);
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

export default IndiceIAhorroPage
