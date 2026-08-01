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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hipotecas" element={<HipotecasPage />} />
        <Route path="/calculadoras" element={<CalculadorasPage />} />
        <Route path="/calculadoras/cuota-hipoteca" element={<CuotaHipotecaPage />} />
        <Route path="/calculadoras/gastos-hipoteca" element={<GastosHipotecaPage />} />
        <Route path="/comparador-hipotecas" element={<ComparadorPage />} />
        <Route path="/euribor" element={<EuriborPage />} />
        <Route path="/contacta-con-iahorro" element={<ContactoPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/quienes-somos" element={<QuienesSomosPage />} />
        
        {/* Rutas adicionales */}
        <Route path="/hipotecas/mejorar-hipoteca" element={<HipotecasPage tipo="mejorar" />} />
        <Route path="/hipotecas/fijas" element={<HipotecasPage tipo="fijas" />} />
        <Route path="/hipotecas/variables" element={<HipotecasPage tipo="variables" />} />
        <Route path="/hipotecas/mixtas" element={<HipotecasPage tipo="mixtas" />} />
        <Route path="/hipotecas/jovenes" element={<HipotecasPage tipo="jovenes" />} />
        <Route path="/hipotecas/autonomos" element={<HipotecasPage tipo="autonomos" />} />
        
        {/* 404 - por implementar */}
      </Routes>
    </Layout>
  )
}

export default App
