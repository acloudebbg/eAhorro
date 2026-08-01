import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import styled from 'styled-components'

// Styled Components
const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop') center/cover;
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

const CalculatorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const FormSection = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: var(--spacing-lg);
  color: var(--color-secondary);
`

const FormGroup = styled.div`
  margin-bottom: var(--spacing-lg);
  
  & label {
    display: block;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
    color: var(--color-gray-800);
  }
  
  & .description {
    font-size: 0.85rem;
    color: var(--color-gray-500);
    margin-bottom: var(--spacing-sm);
  }
  
  & input, & select {
    width: 100%;
    padding: var(--spacing-md);
    border: 2px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    font-size: 1rem;
    transition: all var(--transition-fast);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 4px rgba(0, 168, 232, 0.1);
    }
  }
  
  & .input-group {
    display: flex;
    gap: var(--spacing-sm);
    align-items: center;
    
    & span {
      color: var(--color-gray-600);
      font-weight: 500;
    }
  }
`

const RangeSlider = styled.div`
  & .range-value {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-sm);
    font-size: 0.9rem;
    color: var(--color-gray-600);
  }
  
  & input[type="range"] {
    width: 100%;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--color-gray-200);
    border-radius: var(--radius-full);
    outline: none;
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: var(--color-primary);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      
      &:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-md);
      }
    }
    
    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: var(--color-primary);
      border-radius: 50%;
      cursor: pointer;
      border: none;
      box-shadow: var(--shadow-sm);
    }
  }
`

const CalculateButton = styled.button`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
  
  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const ResultsSection = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 20px;
  
  @media (max-width: 992px) {
    position: static;
    margin-top: var(--spacing-xl);
  }
`

const ResultsHeader = styled.div`
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-gray-100);
  
  & h2 {
    font-size: 1.5rem;
    color: var(--color-secondary);
    margin-bottom: var(--spacing-sm);
  }
`

const ResultCard = styled.div`
  background: var(--color-gray-50);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  
  & .result-label {
    font-size: 0.85rem;
    color: var(--color-gray-500);
    margin-bottom: var(--spacing-xs);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  & .result-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-primary);
    
    & sup {
      font-size: 1rem;
      color: var(--color-gray-500);
    }
  }
  
  & .result-description {
    font-size: 0.9rem;
    color: var(--color-gray-600);
    margin-top: var(--spacing-xs);
  }
`

const AmortizationTable = styled.div`
  overflow-x: auto;
  
  & table {
    width: 100%;
    border-collapse: collapse;
  }
  
  & th, & td {
    padding: var(--spacing-sm) var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--color-gray-200);
  }
  
  & th {
    background: var(--color-gray-100);
    font-weight: 600;
    color: var(--color-gray-700);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  & td {
    font-size: 0.9rem;
    color: var(--color-gray-700);
  }
  
  & tr:last-child td {
    border-bottom: none;
  }
  
  & .total-row {
    font-weight: 600;
    background: var(--color-primary);
    color: var(--color-white);
    
    & td {
      color: var(--color-white);
    }
  }
`

const ChartContainer = styled.div`
  background: var(--color-gray-50);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  
  & h3 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
  }
  
  & .chart-placeholder {
    height: 200px;
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

const SaveButton = styled.button`
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-accent);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-top: var(--spacing-lg);
  
  &:hover {
    background: var(--color-accent-light);
  }
`

const RelatedCalculators = styled.div`
  margin-top: var(--spacing-2xl);
  
  & h3 {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    text-align: center;
  }
  
  & .calculators-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-lg);
  }
  
  & .calculator-card {
    background: var(--color-white);
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    text-align: center;
    transition: all var(--transition-fast);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
    }
    
    & h4 {
      font-size: 1.1rem;
      margin-bottom: var(--spacing-md);
      color: var(--color-secondary);
    }
    
    & p {
      font-size: 0.9rem;
      color: var(--color-gray-600);
      margin-bottom: var(--spacing-lg);
    }
    
    & a {
      display: inline-block;
      padding: var(--spacing-sm) var(--spacing-lg);
      background: var(--color-primary);
      color: var(--color-white);
      border-radius: var(--radius-sm);
      font-weight: 500;
      transition: all var(--transition-fast);
      
      &:hover {
        background: var(--color-primary-dark);
      }
    }
  }
`

interface AmortizationRow {
  mes: number
  cuota: number
  intereses: number
  amortizacion: number
  capitalPendiente: number
}

const CuotaHipotecaPage: React.FC = () => {
  const { addToSearchHistory } = useUser()
  const [formData, setFormData] = useState({
    precioVivienda: 200000,
    ahorros: 40000,
    importePrestamo: 160000,
    tipoInteres: 2.5,
    anos: 30,
    tipoHipoteca: 'fija' as 'fija' | 'variable' | 'mixta'
  })
  const [results, setResults] = useState<{
    cuotaMensual: number
    cuotaMensualString: string
    totalPagado: number
    totalIntereses: number
    amortizacion: AmortizationRow[]
  } | null>(null)

  // Calcular resultados
  useEffect(() => {
    calculateResults()
  }, [formData])

  const calculateResults = () => {
    const { importePrestamo, tipoInteres, anos } = formData
    const interesMensual = tipoInteres / 100 / 12
    const numMeses = anos * 12

    // Fórmula de cuota mensual (método francés)
    const cuotaMensual = importePrestamo * interesMensual * Math.pow(1 + interesMensual, numMeses) /
                       (Math.pow(1 + interesMensual, numMeses) - 1)

    const totalPagado = cuotaMensual * numMeses
    const totalIntereses = totalPagado - importePrestamo

    // Generar tabla de amortización (primeros 12 meses y últimos 12)
    const amortizacion: AmortizationRow[] = []
    let capitalPendiente = importePrestamo

    for (let mes = 1; mes <= numMeses; mes++) {
      const intereses = capitalPendiente * interesMensual
      const amortizacionCapital = cuotaMensual - intereses
      const nuevoCapitalPendiente = capitalPendiente - amortizacionCapital

      amortizacion.push({
        mes,
        cuota: Math.round(cuotaMensual * 100) / 100,
        intereses: Math.round(intereses * 100) / 100,
        amortizacion: Math.round(amortizacionCapital * 100) / 100,
        capitalPendiente: Math.round(nuevoCapitalPendiente * 100) / 100
      })

      capitalPendiente = nuevoCapitalPendiente
    }

    setResults({
      cuotaMensual: Math.round(cuotaMensual * 100) / 100,
      cuotaMensualString: (Math.round(cuotaMensual * 100) / 100).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalPagado: Math.round(totalPagado * 100) / 100,
      totalIntereses: Math.round(totalIntereses * 100) / 100,
      amortizacion
    })

    addToSearchHistory(`cuota: ${formData.precioVivienda}€, ${formData.tipoInteres}%, ${formData.anos}años`)
  }

  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => {
      const newData = { ...prev, [name]: value }
      
      // Calcular importe del préstamo automáticamente
      if (name === 'precioVivienda' || name === 'ahorros') {
        const precio = typeof newData.precioVivienda === 'number' ? newData.precioVivienda : Number(newData.precioVivienda) || 0
        const ahorros = typeof newData.ahorros === 'number' ? newData.ahorros : Number(newData.ahorros) || 0
        const importe = Math.max(0, precio - ahorros)
        newData.importePrestamo = Math.round(importe / 1000) * 1000 // Redondear a miles
      }
      
      return newData
    })
  }

  const handleSliderChange = (name: string, value: number) => {
    handleInputChange(name, value)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const relatedCalculators = [
    {
      title: 'Calculadora de gastos',
      description: 'Calcula todos los gastos asociados a la compra de una vivienda.',
      to: '/calculadoras/gastos-hipoteca'
    },
    {
      title: 'Fija o mixta',
      description: '¿No sabes qué tipo de hipoteca elegir? Te ayudamos a decidir.',
      to: '/calculadoras/hipoteca-fija-o-mixta'
    },
    {
      title: 'Amortización',
      description: 'Calcula cuánto puedes ahorrar amortizando tu hipoteca.',
      to: '/calculadoras/amortizacion'
    },
    {
      title: '¿Qué casa me puedo permitir?',
      description: 'Descubre el precio máximo de vivienda según tu situación.',
      to: '/calculadoras/que-casa-me-puedo-permitir'
    }
  ]

  // Mostrar solo los primeros y últimos meses en la tabla
  const getAmortizationRows = () => {
    if (!results?.amortizacion) return []
    
    const totalRows = results.amortizacion.length
    
    // Primeros 6 meses
    const firstRows = results.amortizacion.slice(0, 6)
    
    // Últimos 6 meses
    const lastRows = results.amortizacion.slice(-6)
    
    // Si hay más de 12 meses, añadir separador
    if (totalRows > 12) {
      return [
        ...firstRows,
        { mes: -1, cuota: 0, intereses: 0, amortizacion: 0, capitalPendiente: 0 },
        ...lastRows
      ]
    }
    
    return results.amortizacion
  }

  return (
    <>
      <PageHeader>
        <Container>
          <h1>Calculadora de cuota de hipoteca</h1>
          <p>Calcula cuánto pagarías cada mes con tu hipoteca según el precio de la vivienda, el tipo de interés y el plazo.</p>
        </Container>
      </PageHeader>

      <Section>
        <Container>
          <CalculatorContainer>
            {/* Formulario */}
            <FormSection>
              <FormTitle>Datos de la hipoteca</FormTitle>
              
              <FormGroup>
                <label>Precio de la vivienda</label>
                <RangeSlider>
                  <div className="range-value">
                    <span>{formatCurrency(formData.precioVivienda)}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1000000"
                    step="1000"
                    value={formData.precioVivienda}
                    onChange={(e) => handleSliderChange('precioVivienda', Number(e.target.value))}
                  />
                </RangeSlider>
              </FormGroup>

              <FormGroup>
                <label>Ahorros disponibles</label>
                <RangeSlider>
                  <div className="range-value">
                    <span>{formatCurrency(formData.ahorros)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={formData.precioVivienda}
                    step="1000"
                    value={formData.ahorros}
                    onChange={(e) => handleSliderChange('ahorros', Number(e.target.value))}
                  />
                </RangeSlider>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)', marginTop: '5px' }}>
                  Importe a financiar: <strong>{formatCurrency(formData.importePrestamo)}</strong>
                </p>
              </FormGroup>

              <FormGroup>
                <label>Tipo de interés (%)</label>
                <RangeSlider>
                  <div className="range-value">
                    <span>{formData.tipoInteres}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="6"
                    step="0.1"
                    value={formData.tipoInteres}
                    onChange={(e) => handleSliderChange('tipoInteres', Number(e.target.value))}
                  />
                </RangeSlider>
              </FormGroup>

              <FormGroup>
                <label>Plazo (años)</label>
                <RangeSlider>
                  <div className="range-value">
                    <span>{formData.anos} años</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={formData.anos}
                    onChange={(e) => handleSliderChange('anos', Number(e.target.value))}
                  />
                </RangeSlider>
              </FormGroup>

              <FormGroup>
                <label>Tipo de hipoteca</label>
                <select
                  value={formData.tipoHipoteca}
                  onChange={(e) => setFormData(prev => ({ ...prev, tipoHipoteca: e.target.value as 'fija' | 'variable' | 'mixta' }))}
                >
                  <option value="fija">Fija</option>
                  <option value="variable">Variable</option>
                  <option value="mixta">Mixta</option>
                </select>
              </FormGroup>

              <CalculateButton onClick={calculateResults}>
                Calcular cuota
              </CalculateButton>
            </FormSection>

            {/* Resultados */}
            <ResultsSection>
              {results ? (
                <>
                  <ResultsHeader>
                    <h2>Resultado del cálculo</h2>
                    <p>Basado en un préstamo de {formatCurrency(formData.importePrestamo)} a {formData.tipoInteres}% durante {formData.anos} años</p>
                  </ResultsHeader>

                  <ResultCard>
                    <div className="result-label">Cuota mensual</div>
                    <div className="result-value">{results.cuotaMensualString}<sup>€</sup></div>
                    <div className="result-description">Importe a pagar cada mes</div>
                  </ResultCard>

                  <ResultCard>
                    <div className="result-label">Total pagado</div>
                    <div className="result-value">{formatCurrency(results.totalPagado)}<sup>€</sup></div>
                    <div className="result-description">Incluyendo intereses durante toda la vida del préstamo</div>
                  </ResultCard>

                  <ResultCard>
                    <div className="result-label">Total intereses</div>
                    <div className="result-value">{formatCurrency(results.totalIntereses)}<sup>€</sup></div>
                    <div className="result-description">Coste total de los intereses</div>
                  </ResultCard>

                  <ChartContainer>
                    <h3>Gráfico de amortización</h3>
                    <div className="chart-placeholder">
                      Gráfico de evolución de la deuda (simulado)
                    </div>
                  </ChartContainer>

                  <div style={{ overflow: 'hidden' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--color-secondary)' }}>
                      Tabla de amortización
                    </h3>
                    <AmortizationTable>
                      <table>
                        <thead>
                          <tr>
                            <th>Mes</th>
                            <th>Cuota</th>
                            <th>Intereses</th>
                            <th>Amortización</th>
                            <th>Capital pendiente</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getAmortizationRows().map((row, index) => {
                            if (row.mes === -1) {
                              return (
                                <tr key={index} style={{ background: 'var(--color-gray-100)' }}>
                                  <td colSpan={5} style={{ textAlign: 'center', padding: '10px' }}>
                                    ...
                                  </td>
                                </tr>
                              )
                            }
                            return (
                              <tr key={index} className={index === getAmortizationRows().length - 1 ? 'total-row' : ''}>
                                <td>{row.mes}</td>
                                <td>{new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.cuota)} €</td>
                                <td>{new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.intereses)} €</td>
                                <td>{new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.amortizacion)} €</td>
                                <td>{new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.capitalPendiente)} €</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </AmortizationTable>
                  </div>

                  <SaveButton onClick={() => alert('Simulación guardada en tu historial')}>
                    Guardar esta simulación
                  </SaveButton>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-gray-500)' }}>
                  <p>Ajusta los parámetros y haz clic en "Calcular cuota" para ver los resultados.</p>
                </div>
              )}
            </ResultsSection>
          </CalculatorContainer>

          <RelatedCalculators>
            <h3>Otras calculadoras que pueden interesarte</h3>
            <div className="calculators-grid">
              {relatedCalculators.map((calc, index) => (
                <div key={index} className="calculator-card">
                  <h4>{calc.title}</h4>
                  <p>{calc.description}</p>
                  <Link to={calc.to}>Calcular</Link>
                </div>
              ))}
            </div>
          </RelatedCalculators>
        </Container>
      </Section>
    </>
  )
}

export default CuotaHipotecaPage
