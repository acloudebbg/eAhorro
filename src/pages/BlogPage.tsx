import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { mockBlogPosts } from '../utils/supabaseClient'
import styled from 'styled-components'

const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop') center/cover;
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-xl);
`

const BlogCard = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all var(--transition-normal);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
  
  & .image {
    height: 200px;
    background: linear-gradient(45deg, var(--color-gray-200), var(--color-gray-300));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-gray-500);
    
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  & .content {
    padding: var(--spacing-lg);
  }
  
  & .category {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-sm);
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: var(--spacing-sm);
  }
  
  & .title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-secondary);
    margin-bottom: var(--spacing-sm);
    line-height: 1.4;
  }
  
  & .excerpt {
    color: var(--color-gray-600);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: var(--spacing-lg);
  }
  
  & .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: var(--color-gray-500);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--color-gray-100);
    
    & .author {
      font-weight: 500;
    }
    
    & .date {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      
      & svg {
        width: 14px;
        height: 14px;
      }
    }
  }
  
  & a {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: var(--radius-sm);
    font-weight: 500;
    font-size: 0.9rem;
    transition: all var(--transition-fast);
    margin-top: var(--spacing-md);
    
    &:hover {
      background: var(--color-primary-dark);
    }
  }
`

const Sidebar = styled.aside`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  
  @media (max-width: 992px) {
    margin-top: var(--spacing-xl);
  }
`

const SidebarSection = styled.div`
  margin-bottom: var(--spacing-xl);
  
  & h3 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    position: relative;
    padding-bottom: var(--spacing-sm);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background: var(--color-primary);
    }
  }
  
  & ul {
    list-style: none;
  }
  
  & li {
    margin-bottom: var(--spacing-sm);
  }
  
  & a {
    display: block;
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--color-gray-700);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
    font-size: 0.9rem;
    
    &:hover {
      background: var(--color-gray-50);
      color: var(--color-primary);
    }
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

const BlogPage: React.FC = () => {
  const { addToSearchHistory } = useUser()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const categories = [...new Set(mockBlogPosts.map(post => post.categoria))]
  const archives = [
    { month: 'Enero 2024', count: 5 },
    { month: 'Febrero 2024', count: 3 },
    { month: 'Marzo 2024', count: 4 }
  ]

  // Paginación
  const totalPages = Math.ceil(mockBlogPosts.length / itemsPerPage)
  const currentItems = mockBlogPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <>
      <PageHeader>
        <Container>
          <h1>Blog iAhorro</h1>
          <p>Artículos y guías sobre hipotecas, finanzas personales y el mercado inmobiliario. Mantente informado con nuestros expertos.</p>
        </Container>
      </PageHeader>

      <Section>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-2xl)' }}>
            <main>
              <BlogGrid>
                {currentItems.map((post, index) => (
                  <BlogCard key={index}>
                    <div className="image">
                      <img src={post.imagen || `https://source.unsplash.com/random/600x400?${post.titulo}`} alt={post.titulo} />
                    </div>
                    <div className="content">
                      <span className="category">{post.categoria}</span>
                      <h2 className="title">{post.titulo}</h2>
                      <p className="excerpt">{post.resumo}</p>
                      <div className="meta">
                        <span className="author">Por {post.autor}</span>
                        <span className="date">
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(post.fecha)}
                        </span>
                      </div>
                      <Link to={`/blog/${post.slug}`} onClick={() => addToSearchHistory(post.titulo)}>
                        Leer más
                      </Link>
                    </div>
                  </BlogCard>
                ))}
              </BlogGrid>

              {totalPages > 1 && (
                <Pagination>
                  <button
                    onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? 'active' : ''}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </button>
                </Pagination>
              )}
            </main>

            <Sidebar>
              <SidebarSection>
                <h3>Categorías</h3>
                <ul>
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link to={`/blog?categoria=${category.toLowerCase().replace(/ /g, '-')}`}>
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              <SidebarSection>
                <h3>Archivo</h3>
                <ul>
                  {archives.map((archive, index) => (
                    <li key={index}>
                      <Link to={`/blog?mes=${archive.month.toLowerCase().replace(/ /g, '-')}`}>
                        {archive.month} ({archive.count})
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              <SidebarSection>
                <h3>Artículos destacados</h3>
                <ul>
                  {mockBlogPosts.slice(0, 5).map((post, index) => (
                    <li key={index}>
                      <Link to={`/blog/${post.slug}`} onClick={() => addToSearchHistory(post.titulo)}>
                        {post.titulo}
                      </Link>
                    </li>
                  ))}
                </ul>
              </SidebarSection>
            </Sidebar>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default BlogPage
