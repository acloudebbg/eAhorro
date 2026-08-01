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

function App() {
  return (
    <Layout>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />
        
        {/* Hipotecas */}
        <Route path="/hipotecas" element={<HipotecasPage />} />
        <Route path="/hipotecas/mejorar-hipoteca" element={<HipotecasPage tipo="mejorar" />} />
        <Route path="/hipotecas/fijas" element={<HipotecasPage tipo="fijas" />} />
        <Route path="/hipotecas/variables" element={<HipotecasPage tipo="variables" />} />
        <Route path="/hipotecas/mixtas" element={<HipotecasPage tipo="mixtas" />} />
        <Route path="/hipotecas/sin-aval" element={<HipotecasPage tipo="sin-aval" />} />
        <Route path="/hipotecas/online" element={<HipotecasPage tipo="online" />} />
        <Route path="/hipotecas/100" element={<HipotecasPage tipo="100" />} />
        <Route path="/hipotecas/jovenes" element={<HipotecasPage tipo="jovenes" />} />
        <Route path="/hipotecas/funcionarios" element={<HipotecasPage tipo="funcionarios" />} />
        <Route path="/hipotecas/autonomos" element={<HipotecasPage tipo="autonomos" />} />
        <Route path="/hipotecas/reforma" element={<HipotecasPage tipo="reforma" />} />
        <Route path="/hipotecas/terreno" element={<HipotecasPage tipo="terreno" />} />
        <Route path="/hipotecas/vpo" element={<HipotecasPage tipo="vpo" />} />
        <Route path="/hipotecas/tasacion-vivienda" element={<TasacionViviendaPage />} />
        
        {/* Hipotecas por importe */}
        <Route path="/hipotecas/500000-euros" element={<HipotecasPage tipo="500000-euros" />} />
        <Route path="/hipotecas/300000-euros" element={<HipotecasPage tipo="300000-euros" />} />
        <Route path="/hipotecas/200000-euros" element={<HipotecasPage tipo="200000-euros" />} />
        <Route path="/hipotecas/180000-euros" element={<HipotecasPage tipo="180000-euros" />} />
        <Route path="/hipotecas/150000-euros" element={<HipotecasPage tipo="150000-euros" />} />
        
        {/* Hipotecas por provincia */}
        <Route path="/hipotecas/madrid" element={<HipotecasPage tipo="madrid" />} />
        <Route path="/hipotecas/barcelona" element={<HipotecasPage tipo="barcelona" />} />
        <Route path="/hipotecas/valencia" element={<HipotecasPage tipo="valencia" />} />
        <Route path="/hipotecas/malaga" element={<HipotecasPage tipo="malaga" />} />
        
        {/* Calculadoras */}
        <Route path="/calculadoras" element={<CalculadorasPage />} />
        <Route path="/calculadoras/cuota-hipoteca" element={<CuotaHipotecaPage />} />
        <Route path="/calculadoras/gastos-hipoteca" element={<GastosHipotecaPage />} />
        <Route path="/calculadoras/hipoteca-fija-o-mixta" element={<CuotaHipotecaPage />} />
        <Route path="/calculadoras/subrogacion" element={<CuotaHipotecaPage />} />
        <Route path="/calculadoras/amortizacion" element={<CuotaHipotecaPage />} />
        <Route path="/calculadoras/que-casa-me-puedo-permitir" element={<CuotaHipotecaPage />} />
        <Route path="/calculadoras/hipoteca-fija-vs-variable" element={<CuotaHipotecaPage />} />
        
        {/* Comparadores */}
        <Route path="/comparador-hipotecas" element={<ComparadorPage />} />
        <Route path="/indice-iahorro-hipotecas" element={<IndiceIAhorroPage />} />
        
        {/* Euribor */}
        <Route path="/euribor" element={<EuriborPage />} />
        
        {/* Blog */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/*" element={<BlogPage />} />
        
        {/* Pages */}
        <Route path="/quienes-somos" element={<QuienesSomosPage />} />
        <Route path="/contacta-con-iahorro" element={<ContactoPage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        <Route path="/diccionario" element={<DiccionarioPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        
        {/* Legales */}
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/politica-de-privacidad" element={<PoliticaPrivacidadPage />} />
        <Route path="/politica-de-cookies" element={<PoliticaCookiesPage />} />
        <Route path="/condiciones-generales" element={<CondicionesGeneralesPage />} />
        <Route path="/hipotecas/reclamaciones" element={<ReclamacionesPage />} />
        
        {/* 404 - por implementar */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  )
}

export default App
