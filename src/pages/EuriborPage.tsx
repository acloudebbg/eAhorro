import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1974&auto=format&fit=crop') center/cover;
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

const EuriborInfo = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-xl);
  
  & h2 {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    text-align: center;
  }
  
  & p {
    color: var(--color-gray-600);
    line-height: 1.7;
    margin-bottom: var(--spacing-lg);
  }
`

const EuriborRates = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  
  & h2 {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    text-align: center;
  }
  
  & .last-update {
    text-align: center;
    color: var(--color-gray-500);
    margin-bottom: var(--spacing-xl);
    font-style: italic;
  }
`

const RatesTable = styled.div`
  overflow-x: auto;
  
  & table {
    width: 100%;
    border-collapse: collapse;
  }
  
  & th, & td {
    padding: var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--color-gray-200);
  }
  
  & th {
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
  }
  
  & td {
    color: var(--color-gray-700);
    font-size: 0.95rem;
  }
  
  & tr:last-child td {
    border-bottom: none;
  }
  
  & .positive {
    color: var(--color-success);
    
    &::before {
      content: '▲ ';
    }
  }
  
  & .negative {
    color: var(--color-error);
    
    &::before {
      content: '▼ ';
    }
  }
`

const ChartContainer = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-top: var(--spacing-xl);
  
  & h2 {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    text-align: center;
  }
  
  & .chart-placeholder {
    height: 300px;
    background: linear-gradient(45deg, var(--color-gray-200) 25%, transparent 25%),
                linear-gradient(-45deg, var(--color-gray-200) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, var(--color-gray-200) 75%),
                linear-gradient(-45deg, transparent 75%, var(--color-gray-200) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-500);
    font-size: 0.9rem;
  }
`

const InfoCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
`

const InfoCard = styled.div`
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary));
  color: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  
  & h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
  }
  
  & p {
    font-size: 0.95rem;
    opacity: 0.95;
    line-height: 1.6;
  }
`

const EuriborPage: React.FC = () => {
  // Datos simulados de Euríbor
  const euriborRates = [
    { term: '1 semana', rate: 3.850, previous: 3.845, change: +0.005 },
    { term: '1 mes', rate: 3.875, previous: 3.860, change: +0.015 },
    { term: '3 meses', rate: 3.890, previous: 3.880, change: +0.010 },
    { term: '6 meses', rate: 3.905, previous: 3.895, change: +0.010 },
    { term: '12 meses', rate: 3.920, previous: 3.910, change: +0.010 }
  ]

  const lastUpdate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <>
      <PageHeader>
        <Container>
          <h1>Euríbor</h1>
          <p>Consulta el valor actual del Euríbor y su evolución histórica. El índice de referencia para las hipotecas variables.</p>
        </Container>
      </PageHeader>

      <Section>
        <Container>
          <EuriborInfo>
            <h2>¿Qué es el Euríbor?</h2>
            <p>
              El Euríbor (Euro Interbank Offered Rate) es el tipo de interés al que los bancos de la zona euro se prestan dinero entre sí.
              Es el índice de referencia más utilizado en España para las hipotecas a tipo de interés variable.
            </p>
            <p>
              Cuando el Euríbor sube, las cuotas de las hipotecas variables aumentan, y cuando baja, las cuotas disminuyen.
              El valor del Euríbor se calcula diariamente y se publica mensualmente como media de los valores diarios.
            </p>
          </EuriborInfo>

          <EuriborRates>
            <h2>Valores actuales del Euríbor</h2>
            <p className="last-update">Última actualización: {lastUpdate}</p>
            <RatesTable>
              <table>
                <thead>
                  <tr>
                    <th>Plazo</th>
                    <th>Valor actual</th>
                    <th>Valor anterior</th>
                    <th>Cambio</th>
                  </tr>
                </thead>
                <tbody>
                  {euriborRates.map((rate, index) => (
                    <tr key={index}>
                      <td>{rate.term}</td>
                      <td>{rate.rate.toFixed(3)}%</td>
                      <td>{rate.previous.toFixed(3)}%</td>
                      <td className={rate.change >= 0 ? 'positive' : 'negative'}>
                        {Math.abs(rate.change).toFixed(3)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </RatesTable>
            <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
              * Datos simulados para demostración
            </p>
          </EuriborRates>

          <ChartContainer>
            <h2>Evolución del Euríbor a 12 meses (Últimos 12 meses)</h2>
            <div className="chart-placeholder">
              Gráfico de evolución del Euríbor (simulado)
            </div>
          </ChartContainer>

          <InfoCards>
            <InfoCard>
              <h3>3.920%</h3>
              <p>Euríbor a 12 meses actual</p>
            </InfoCard>
            <InfoCard>
              <h3>+0.010%</h3>
              <p>Variación respecto al mes anterior</p>
            </InfoCard>
            <InfoCard>
              <h3>4.100%</h3>
              <p>Máximo del último año</p>
            </InfoCard>
            <InfoCard>
              <h3>3.600%</h3>
              <p>Mínimo del último año</p>
            </InfoCard>
          </InfoCards>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/hipotecas/variables" style={{
              display: 'inline-block',
              padding: '15px 30px',
              background: 'var(--color-primary)',
              color: 'var(--color-white)',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.25s ease',
              textDecoration: 'none'
            }}>
              Ver hipotecas variables
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default EuriborPage
