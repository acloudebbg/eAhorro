import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { mockHipotecas } from '../utils/supabaseClient'
import styled from 'styled-components'

// Styled Components
const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop') center/cover;
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const FiltersSection = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-xl);
  
  & h2 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
  }
`

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
`

const FilterGroup = styled.div`
  & label {
    display: block;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
    color: var(--color-gray-800);
    font-size: 0.9rem;
  }
  
  & select, & input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-sm);
    font-size: 0.95rem;
    transition: border-color var(--transition-fast);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(0, 168, 232, 0.1);
    }
  }
`

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ResultsCount = styled.p`
  font-size: 1.1rem;
  color: var(--color-gray-700);
  
  & strong {
    color: var(--color-secondary);
  }
`

const SortOptions = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  
  & label {
    font-size: 0.9rem;
    color: var(--color-gray-600);
  }
  
  & select {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-sm);
    font-size: 0.9rem;
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-xl);
`

const ProductCard = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--transition-normal);
  border: 1px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary);
  }
  
  &.featured {
    border-top: 4px solid var(--color-primary);
    
    & .header {
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    }
  }
`

const ProductHeader = styled.div`
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--color-gray-50);
`

const ProductLogo = styled.div`
  width: 60px;
  height: 60px;
  background: var(--color-white);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  
  & img {
    max-width: 80%;
    max-height: 80%;
  }
  
  & svg {
    width: 40px;
    height: 40px;
  }
`

const ProductInfo = styled.div`
  flex: 1;
  
  & .name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-secondary);
    margin-bottom: var(--spacing-xs);
  }
  
  & .bank {
    font-size: 0.9rem;
    color: var(--color-gray-600);
  }
`

const ProductDetails = styled.div`
  padding: var(--spacing-lg);
  
  & .detail-row {
    display: flex;
    justify-content: space-between;
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid var(--color-gray-100);
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  & .label {
    color: var(--color-gray-500);
    font-size: 0.85rem;
  }
  
  & .value {
    font-weight: 600;
    color: var(--color-secondary);
  }
  
  & .interest-rate {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
  }
`

const ProductActions = styled.div`
  padding: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-md);
  background: var(--color-gray-50);
`

const ActionButton = styled(Link)`
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: center;
  border-radius: var(--radius-sm);
  font-weight: 500;
  font-size: 0.9rem;
  transition: all var(--transition-fast);
  
  &.primary {
    background: var(--color-primary);
    color: var(--color-white);
    
    &:hover {
      background: var(--color-primary-dark);
    }
  }
  
  &.secondary {
    background: var(--color-white);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    
    &:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }
  }
`

const FavoriteButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-400);
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: var(--spacing-xs);
  
  &.favorited {
    color: var(--color-primary);
  }
  
  &:hover {
    color: var(--color-primary);
    transform: scale(1.2);
  }
  
  & svg {
    width: 24px;
    height: 24px;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xl);
  
  & button {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-sm);
    background: var(--color-white);
    color: var(--color-gray-700);
    cursor: pointer;
    transition: all var(--transition-fast);
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &:not(:disabled):hover {
      background: var(--color-primary);
      color: var(--color-white);
      border-color: var(--color-primary);
    }
    
    &.active {
      background: var(--color-primary);
      color: var(--color-white);
      border-color: var(--color-primary);
    }
  }
`

interface HipotecasPageProps {
  tipo?: string
}

const HipotecasPage: React.FC<HipotecasPageProps> = ({ tipo = '' }) => {
  const { saveToFavorites, favorites, addToSearchHistory } = useUser()
  const [filters, setFilters] = useState({
    tipo: tipo || '',
    banco: '',
    minCuota: '',
    maxCuota: '',
    ordenarPor: 'interes'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Aplicar filtros
  const filteredHipotecas = mockHipotecas.filter(hipoteca => {
    if (filters.tipo && hipoteca.tipo !== filters.tipo) return false
    if (filters.banco && hipoteca.banco !== filters.banco) return false
    if (filters.minCuota && hipoteca.cuota_mensual < Number(filters.minCuota)) return false
    if (filters.maxCuota && hipoteca.cuota_mensual > Number(filters.maxCuota)) return false
    return true
  })

  // Ordenar
  const sortedHipotecas = [...filteredHipotecas].sort((a, b) => {
    switch (filters.ordenarPor) {
      case 'interes':
        return (a.interes || 0) - (b.interes || 0)
      case 'cuota':
        return a.cuota_mensual - b.cuota_mensual
      case 'banco':
        return a.banco.localeCompare(b.banco)
      default:
        return 0
    }
  })

  // Paginación
  const totalPages = Math.ceil(sortedHipotecas.length / itemsPerPage)
  const currentItems = sortedHipotecas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
    setCurrentPage(1)
    addToSearchHistory(`${name}:${value}`)
  }

  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, ordenarPor: value }))
  }

  const toggleFavorite = (id: string) => {
    const key = `hipoteca-${id}`
    if (favorites.has(key)) {
      // Remove logic would go here
    } else {
      saveToFavorites(id, 'hipoteca')
    }
  }

  const getPageTitle = () => {
    switch (tipo) {
      case 'mejorar':
        return 'Mejorar Hipoteca'
      case 'fijas':
        return 'Hipotecas Fijas'
      case 'variables':
        return 'Hipotecas Variables'
      case 'mixtas':
        return 'Hipotecas Mixtas'
      case 'jovenes':
        return 'Hipotecas para Jóvenes'
      case 'autonomos':
        return 'Hipotecas para Autónomos'
      default:
        return 'Hipotecas'
    }
  }

  const getPageDescription = () => {
    switch (tipo) {
      case 'mejorar':
        return 'Mejora las condiciones de tu hipoteca actual con las mejores ofertas del mercado.'
      case 'fijas':
        return 'Encuentra hipotecas con tipo de interés fijo durante toda la vida del préstamo.'
      case 'variables':
        return 'Comparar hipotecas con tipo de interés variable vinculado al euríbor.'
      case 'mixtas':
        return 'Combina un período inicial de interés fijo con un tipo variable posterior.'
      case 'jovenes':
        return 'Hipotecas con condiciones especiales para jóvenes y primerizos.'
      case 'autonomos':
        return 'Hipotecas diseñadas para trabajadores autónomos.'
      default:
        return 'Busca, compara y encuentra la mejor hipoteca para tu situación. Negociamos con los principales bancos para conseguirte las mejores condiciones.'
    }
  }

  const bancos = [...new Set(mockHipotecas.map(h => h.banco))]

  return (
    <>
      <PageHeader>
        <Container>
          <h1>{getPageTitle()}</h1>
          <p>{getPageDescription()}</p>
        </Container>
      </PageHeader>

      <Section>
        <Container>
          <FiltersSection>
            <h2>Filtros</h2>
            <FiltersGrid>
              <FilterGroup>
                <label>Tipo de hipoteca</label>
                <select
                  value={filters.tipo}
                  onChange={(e) => handleFilterChange('tipo', e.target.value)}
                >
                  <option value="">Todos los tipos</option>
                  <option value="fija">Fija</option>
                  <option value="variable">Variable</option>
                  <option value="mixta">Mixta</option>
                </select>
              </FilterGroup>
              
              <FilterGroup>
                <label>Banco</label>
                <select
                  value={filters.banco}
                  onChange={(e) => handleFilterChange('banco', e.target.value)}
                >
                  <option value="">Todos los bancos</option>
                  {bancos.map(banco => (
                    <option key={banco} value={banco}>{banco}</option>
                  ))}
                </select>
              </FilterGroup>
              
              <FilterGroup>
                <label>Cuota mínima (€/mes)</label>
                <input
                  type="number"
                  value={filters.minCuota}
                  onChange={(e) => handleFilterChange('minCuota', e.target.value)}
                  placeholder="Ej: 500"
                />
              </FilterGroup>
              
              <FilterGroup>
                <label>Cuota máxima (€/mes)</label>
                <input
                  type="number"
                  value={filters.maxCuota}
                  onChange={(e) => handleFilterChange('maxCuota', e.target.value)}
                  placeholder="Ej: 1000"
                />
              </FilterGroup>
            </FiltersGrid>
          </FiltersSection>

          <ResultsHeader>
            <ResultsCount>
              <strong>{filteredHipotecas.length}</strong> hipotecas encontradas
            </ResultsCount>
            <SortOptions>
              <label>Ordenar por:</label>
              <select onChange={(e) => handleSortChange(e.target.value)} value={filters.ordenarPor}>
                <option value="interes">Menor tipo de interés</option>
                <option value="cuota">Menor cuota mensual</option>
                <option value="banco">Nombre del banco</option>
              </select>
            </SortOptions>
          </ResultsHeader>

          <ProductsGrid>
            {currentItems.map((hipoteca) => {
              const isFavorite = favorites.has(`hipoteca-${hipoteca.id}`)
              const interest = hipoteca.interes || hipoteca.interes_fijo || 0
              
              return (
                <ProductCard key={hipoteca.id} className={hipoteca.destacada ? 'featured' : ''}>
                  <ProductHeader>
                    <ProductLogo>
                      {/* Placeholder para logo - en producción se usaría el logo real */}
                      <div style={{ color: '#00a8e8', fontWeight: 'bold', fontSize: '0.8rem' }}>
                        {hipoteca.banco.substring(0, 3)}
                      </div>
                    </ProductLogo>
                    <ProductInfo>
                      <div className="name">{hipoteca.nombre}</div>
                      <div className="bank">{hipoteca.banco}</div>
                    </ProductInfo>
                    <FavoriteButton
                      className={isFavorite ? 'favorited' : ''}
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(hipoteca.id)
                      }}
                    >
                      <svg fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </FavoriteButton>
                  </ProductHeader>

                  <ProductDetails>
                    <div className="detail-row">
                      <span className="label">Tipo</span>
                      <span className="value">{hipoteca.tipo}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Tipo de interés</span>
                      <span className="value interest-rate">{interest}%</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Cuota mensual</span>
                      <span className="value">{hipoteca.cuota_mensual} €</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Importe</span>
                      <span className="value">{hipoteca.cantidad?.toLocaleString()} €</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Plazo</span>
                      <span className="value">{hipoteca.plazos?.join(' - ') || 'Flexible'} años</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Comisiones</span>
                      <span className="value">{hipoteca.comisiones}</span>
                    </div>
                    {hipoteca.vinculaciones && (
                      <div className="detail-row">
                        <span className="label">Vinculaciones</span>
                        <span className="value">{hipoteca.vinculaciones}</span>
                      </div>
                    )}
                  </ProductDetails>

                  <ProductActions>
                    <ActionButton to={`/hipotecas/${hipoteca.id}`} className="primary">
                      Ver detalles
                    </ActionButton>
                    <ActionButton to="/contacta-con-iahorro" className="secondary">
                      Solicitar
                    </ActionButton>
                  </ProductActions>
                </ProductCard>
              )
            })}
          </ProductsGrid>

          {totalPages > 1 && (
            <Pagination>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                let pageNum = i + 1
                // Mostrar páginas alrededor de la actual
                if (totalPages > 5) {
                  if (currentPage > 3) {
                    pageNum = currentPage - 2 + i
                    if (pageNum > totalPages - 4) {
                      pageNum = totalPages - 4 + i
                    }
                  }
                }
                
                if (pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? 'active' : ''}
                    >
                      {pageNum}
                    </button>
                  )
                }
                return null
              })}
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </Pagination>
          )}
        </Container>
      </Section>
    </>
  )
}

export default HipotecasPage
