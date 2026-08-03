import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HipotecasPage from './pages/HipotecasPage'
import CalculadorasPage from './pages/CalculadorasPage'
import CuotaHipotecaPage from './pages/CuotaHipotecaPage'
import GastosHipotecaPage from './pages/GastosHipotecaPage'
import ComparadorPage from './pages/ComparadorPage'
import EuriborPage from './pages/EuriborPage'
import ContactoPage from './pages/ContactoPage'
import BlogPage from './pages/BlogPage'
import QuienesSomosPage from './pages/QuienesSomosPage'
import Layout from './components/Layout/Layout'
import LoginPage from './pages/LoginPage'
import ClientAreaPage from './pages/ClientAreaPage'
import ClientAreaPageV2 from './pages/ClientAreaPageV2'
import ClientAreaPageV3 from './pages/ClientAreaPageV3'

// Páginas simples para rutas del sitemap
import AvisoLegalPage from './pages/AvisoLegalPage'
import PoliticaPrivacidadPage from './pages/PoliticaPrivacidadPage'
import PoliticaCookiesPage from './pages/PoliticaCookiesPage'
import CondicionesGeneralesPage from './pages/CondicionesGeneralesPage'
import ReclamacionesPage from './pages/ReclamacionesPage'
import SitemapPage from './pages/SitemapPage'
import DiccionarioPage from './pages/DiccionarioPage'
import IndiceIAhorroPage from './pages/IndiceIAhorroPage'
import FAQsPage from './pages/FAQsPage'
import TasacionViviendaPage from './pages/TasacionViviendaPage'

// Componente wrapper para Layout
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout>{children}</Layout>
)

function App() {
  return (
    <Routes>
      {/* Login y Área de Cliente (fuera del Layout principal) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/area-cliente" element={<ClientAreaPage />} />
      <Route path="/area-cliente-v2" element={<ClientAreaPageV2 />} />
      <Route path="/area-cliente-v3" element={<ClientAreaPageV3 />} />
      
      {/* Home */}
      <Route path="/" element={<LayoutWrapper><HomePage /></LayoutWrapper>} />
      
      {/* Hipotecas */}
      <Route path="/hipotecas" element={<LayoutWrapper><HipotecasPage /></LayoutWrapper>} />
      <Route path="/hipotecas/mejorar-hipoteca" element={<LayoutWrapper><HipotecasPage tipo="mejorar" /></LayoutWrapper>} />
      <Route path="/hipotecas/fijas" element={<LayoutWrapper><HipotecasPage tipo="fijas" /></LayoutWrapper>} />
      <Route path="/hipotecas/variables" element={<LayoutWrapper><HipotecasPage tipo="variables" /></LayoutWrapper>} />
      <Route path="/hipotecas/mixtas" element={<LayoutWrapper><HipotecasPage tipo="mixtas" /></LayoutWrapper>} />
      <Route path="/hipotecas/sin-aval" element={<LayoutWrapper><HipotecasPage tipo="sin-aval" /></LayoutWrapper>} />
      <Route path="/hipotecas/online" element={<LayoutWrapper><HipotecasPage tipo="online" /></LayoutWrapper>} />
      <Route path="/hipotecas/100" element={<LayoutWrapper><HipotecasPage tipo="100" /></LayoutWrapper>} />
      <Route path="/hipotecas/jovenes" element={<LayoutWrapper><HipotecasPage tipo="jovenes" /></LayoutWrapper>} />
      <Route path="/hipotecas/funcionarios" element={<LayoutWrapper><HipotecasPage tipo="funcionarios" /></LayoutWrapper>} />
      <Route path="/hipotecas/autonomos" element={<LayoutWrapper><HipotecasPage tipo="autonomos" /></LayoutWrapper>} />
      <Route path="/hipotecas/reforma" element={<LayoutWrapper><HipotecasPage tipo="reforma" /></LayoutWrapper>} />
      <Route path="/hipotecas/terreno" element={<LayoutWrapper><HipotecasPage tipo="terreno" /></LayoutWrapper>} />
      <Route path="/hipotecas/vpo" element={<LayoutWrapper><HipotecasPage tipo="vpo" /></LayoutWrapper>} />
      <Route path="/hipotecas/tasacion-vivienda" element={<LayoutWrapper><TasacionViviendaPage /></LayoutWrapper>} />
      
      {/* Hipotecas por importe */}
      <Route path="/hipotecas/500000-euros" element={<LayoutWrapper><HipotecasPage tipo="500000-euros" /></LayoutWrapper>} />
      <Route path="/hipotecas/300000-euros" element={<LayoutWrapper><HipotecasPage tipo="300000-euros" /></LayoutWrapper>} />
      <Route path="/hipotecas/200000-euros" element={<LayoutWrapper><HipotecasPage tipo="200000-euros" /></LayoutWrapper>} />
      <Route path="/hipotecas/180000-euros" element={<LayoutWrapper><HipotecasPage tipo="180000-euros" /></LayoutWrapper>} />
      <Route path="/hipotecas/150000-euros" element={<LayoutWrapper><HipotecasPage tipo="150000-euros" /></LayoutWrapper>} />
      
      {/* Hipotecas por provincia */}
      <Route path="/hipotecas/madrid" element={<LayoutWrapper><HipotecasPage tipo="madrid" /></LayoutWrapper>} />
      <Route path="/hipotecas/barcelona" element={<LayoutWrapper><HipotecasPage tipo="barcelona" /></LayoutWrapper>} />
      <Route path="/hipotecas/valencia" element={<LayoutWrapper><HipotecasPage tipo="valencia" /></LayoutWrapper>} />
      <Route path="/hipotecas/malaga" element={<LayoutWrapper><HipotecasPage tipo="malaga" /></LayoutWrapper>} />
      
      {/* Calculadoras */}
      <Route path="/calculadoras" element={<LayoutWrapper><CalculadorasPage /></LayoutWrapper>} />
      <Route path="/calculadoras/cuota-hipoteca" element={<LayoutWrapper><CuotaHipotecaPage /></LayoutWrapper>} />
      <Route path="/calculadoras/gastos-hipoteca" element={<LayoutWrapper><GastosHipotecaPage /></LayoutWrapper>} />
      <Route path="/calculadoras/hipoteca-fija-o-mixta" element={<LayoutWrapper><CuotaHipotecaPage /></LayoutWrapper>} />
      <Route path="/calculadoras/subrogacion" element={<LayoutWrapper><CuotaHipotecaPage /></LayoutWrapper>} />
      <Route path="/calculadoras/amortizacion" element={<LayoutWrapper><CuotaHipotecaPage /></LayoutWrapper>} />
      <Route path="/calculadoras/que-casa-me-puedo-permitir" element={<LayoutWrapper><CuotaHipotecaPage /></LayoutWrapper>} />
      <Route path="/calculadoras/hipoteca-fija-vs-variable" element={<LayoutWrapper><CuotaHipotecaPage /></LayoutWrapper>} />
      
      {/* Comparadores */}
      <Route path="/comparador-hipotecas" element={<LayoutWrapper><ComparadorPage /></LayoutWrapper>} />
      <Route path="/indice-iahorro-hipotecas" element={<LayoutWrapper><IndiceIAhorroPage /></LayoutWrapper>} />
      
      {/* Euribor */}
      <Route path="/euribor" element={<LayoutWrapper><EuriborPage /></LayoutWrapper>} />
      
      {/* Blog */}
      <Route path="/blog" element={<LayoutWrapper><BlogPage /></LayoutWrapper>} />
      <Route path="/blog/*" element={<LayoutWrapper><BlogPage /></LayoutWrapper>} />
      
      {/* Pages */}
      <Route path="/quienes-somos" element={<LayoutWrapper><QuienesSomosPage /></LayoutWrapper>} />
      <Route path="/contacta-con-iahorro" element={<LayoutWrapper><ContactoPage /></LayoutWrapper>} />
      <Route path="/sitemap" element={<LayoutWrapper><SitemapPage /></LayoutWrapper>} />
      <Route path="/diccionario" element={<LayoutWrapper><DiccionarioPage /></LayoutWrapper>} />
      <Route path="/faqs" element={<LayoutWrapper><FAQsPage /></LayoutWrapper>} />
      
      {/* Legales */}
      <Route path="/aviso-legal" element={<LayoutWrapper><AvisoLegalPage /></LayoutWrapper>} />
      <Route path="/politica-de-privacidad" element={<LayoutWrapper><PoliticaPrivacidadPage /></LayoutWrapper>} />
      <Route path="/politica-de-cookies" element={<LayoutWrapper><PoliticaCookiesPage /></LayoutWrapper>} />
      <Route path="/condiciones-generales" element={<LayoutWrapper><CondicionesGeneralesPage /></LayoutWrapper>} />
      <Route path="/hipotecas/reclamaciones" element={<LayoutWrapper><ReclamacionesPage /></LayoutWrapper>} />
      
      {/* 404 - por implementar */}
      <Route path="*" element={<LayoutWrapper><HomePage /></LayoutWrapper>} />
    </Routes>
  )
}

export default App
