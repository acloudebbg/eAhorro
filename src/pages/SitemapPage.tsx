import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SitemapPage: React.FC = () => {
  return (
    <PageContainer>
      <Container>
        <h1>Sitemap</h1>
        <Content>
          <p>Mapa del sitio de iAhorro.com con todas las páginas disponibles.</p>
          
          <Section>
            <h2>Páginas Principales</h2>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/hipotecas">Hipotecas</Link></li>
              <li><Link to="/calculadoras">Calculadoras</Link></li>
              <li><Link to="/comparador-hipotecas">Comparador de hipotecas</Link></li>
              <li><Link to="/euribor">Euríbor</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/quienes-somos">Quienes somos</Link></li>
              <li><Link to="/contacta-con-iahorro">Contacto</Link></li>
            </ul>
          </Section>
          
          <Section>
            <h2>Herramientas</h2>
            <ul>
              <li><Link to="/calculadoras/cuota-hipoteca">Calculadora de cuota</Link></li>
              <li><Link to="/calculadoras/gastos-hipoteca">Calculadora de gastos</Link></li>
              <li><Link to="/calculadoras/hipoteca-fija-o-mixta">Calculadora fija o mixta</Link></li>
              <li><Link to="/calculadoras/subrogacion">Calculadora de subrogación</Link></li>
              <li><Link to="/calculadoras/amortizacion">Calculadora de amortización</Link></li>
              <li><Link to="/calculadoras/que-casa-me-puedo-permitir">¿Qué casa me puedo permitir?</Link></li>
              <li><Link to="/indice-iahorro-hipotecas">Índice iAhorro</Link></li>
              <li><Link to="/diccionario">Diccionario</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
            </ul>
          </Section>
          
          <Section>
            <h2>Tipos de Hipotecas</h2>
            <ul>
              <li><Link to="/hipotecas/fijas">Hipotecas fijas</Link></li>
              <li><Link to="/hipotecas/variables">Hipotecas variables</Link></li>
              <li><Link to="/hipotecas/mixtas">Hipotecas mixtas</Link></li>
              <li><Link to="/hipotecas/sin-aval">Hipotecas sin aval</Link></li>
              <li><Link to="/hipotecas/online">Hipotecas online</Link></li>
              <li><Link to="/hipotecas/100">Hipotecas 100%</Link></li>
            </ul>
          </Section>
          
          <Section>
            <h2>Hipotecas por Finalidad</h2>
            <ul>
              <li><Link to="/hipotecas/reforma">Para reformar</Link></li>
              <li><Link to="/hipotecas/terreno">Para terreno</Link></li>
              <li><Link to="/hipotecas/vpo">Para VPO</Link></li>
              <li><Link to="/hipotecas/tasacion-vivienda">Tasación de vivienda</Link></li>
            </ul>
          </Section>
          
          <Section>
            <h2>Hipotecas por Titular</h2>
            <ul>
              <li><Link to="/hipotecas/jovenes">Para jóvenes</Link></li>
              <li><Link to="/hipotecas/funcionarios">Para funcionarios</Link></li>
              <li><Link to="/hipotecas/autonomos">Para autónomos</Link></li>
            </ul>
          </Section>
          
          <Section>
            <h2>Legal</h2>
            <ul>
              <li><Link to="/aviso-legal">Aviso Legal</Link></li>
              <li><Link to="/politica-de-privacidad">Política de Privacidad</Link></li>
              <li><Link to="/politica-de-cookies">Política de Cookies</Link></li>
              <li><Link to="/condiciones-generales">Condiciones Generales</Link></li>
              <li><Link to="/hipotecas/reclamaciones">Reclamaciones</Link></li>
            </ul>
          </Section>
          
          <p style={{ marginTop: '40px', color: 'var(--color-gray-600)' }}>
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
  
  & ul {
    list-style: disc;
    margin-left: var(--spacing-lg);
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

export default SitemapPage
