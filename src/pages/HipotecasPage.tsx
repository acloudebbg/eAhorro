import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import styled from 'styled-components'
import { BankLogos, Testimonials, ExpertCards } from '../components/common'

interface HipotecasPageProps {
  tipo?: string
}

// Styled Components
const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://iahorro.imgix.net/_nuxt/imgHero_hipoteca_xl.B3L5Pumb.jpg') center/cover;
  color: var(--color-white);
  padding: var(--spacing-3xl) 0;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  & > * {
    position: relative;
    z-index: 2;
  }
  
  & h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: var(--spacing-lg);
    color: var(--color-white);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  & p {
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto var(--spacing-xl);
    color: rgba(255, 255, 255, 0.95);
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`

const HeroButtons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
`

const PrimaryButton = styled(Link)`
  padding: var(--spacing-md) var(--spacing-2xl);
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1.1rem;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
  text-decoration: none;
  
  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`

const SecondaryButton = styled(Link)`
  padding: var(--spacing-md) var(--spacing-2xl);
  background: rgba(255, 255, 255, 0.2);
  color: var(--color-white);
  border: 2px solid var(--color-white);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1.1rem;
  transition: all var(--transition-fast);
  text-decoration: none;
  
  &:hover {
    background: var(--color-white);
    color: var(--color-secondary);
    transform: translateY(-2px);
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

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
`

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  
  & svg {
    width: 40px;
    height: 40px;
    color: var(--color-primary);
    flex-shrink: 0;
  }
  
  & .content {
    text-align: left;
  }
  
  & h4 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-xs);
    color: var(--color-secondary);
  }
  
  & p {
    color: var(--color-gray-600);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`

const InfoSection = styled(Section)`
  background: var(--color-gray-50);
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
`

const InfoCard = styled.div`
  & h3 {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
  }
  
  & p {
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-lg);
    line-height: 1.7;
  }
  
  & ul {
    list-style: none;
  }
  
  & li {
    margin-bottom: var(--spacing-sm);
  }
  
  & a {
    color: var(--color-primary);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    text-decoration: none;
    
    &::before {
      content: '▶';
      font-size: 0.8rem;
      color: var(--color-primary);
    }
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const IndiceSection = styled(Section)`
  background: var(--color-white);
`

const IndiceCard = styled.div`
  background: var(--color-gray-50);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  
  & h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
    color: var(--color-secondary);
  }
  
  & p {
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-lg);
    line-height: 1.7;
  }
  
  & .indice-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  & .indice-item {
    text-align: left;
    padding: var(--spacing-md);
    background: var(--color-white);
    border-radius: var(--radius-md);
  }
  
  & .indice-label {
    font-size: 0.9rem;
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-xs);
  }
  
  & .indice-value {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--color-secondary);
  }
  
  & .indice-change {
    font-size: 0.9rem;
    color: var(--color-accent);
  }
`

const HipotecasPage: React.FC<HipotecasPageProps> = ({ tipo }) => {
  const { addToSearchHistory } = useUser()

  const handleSearch = (query: string) => {
    addToSearchHistory(query)
  }

  // Contenido según el tipo
  const getTitle = () => {
    switch(tipo) {
      case 'mejorar':
        return 'Comparador de hipotecas online julio 2026'
      case 'fijas':
        return 'Hipotecas fijas - Compara las mejores hipotecas'
      case 'variables':
        return 'Hipotecas variables - Compara las mejores hipotecas'
      case 'mixtas':
        return 'Hipotecas mixtas - Compara las mejores hipotecas'
      case 'jovenes':
        return 'Hipotecas para jóvenes - Ofertas especiales'
      case 'autonomos':
        return 'Hipotecas para autónomos - Ofertas adaptadas'
      default:
        return 'Comparador de hipotecas online julio 2026'
    }
  }

  const getDescription = () => {
    switch(tipo) {
      case 'mejorar':
        return 'Encuentra la mejor hipoteca para mejorar tu hipoteca actual'
      case 'fijas':
        return 'Encuentra la mejor hipoteca fija para tu vivienda'
      case 'variables':
        return 'Encuentra la mejor hipoteca variable para tu vivienda'
      case 'mixtas':
        return 'Encuentra la mejor hipoteca mixta para tu vivienda'
      case 'jovenes':
        return 'Encuentra las mejores hipotecas para jóvenes'
      case 'autonomos':
        return 'Encuentra las mejores hipotecas para autónomos'
      default:
        return 'Encuentra la hipoteca que mejor se adapta a tus necesidades con la ayuda de nuestros expertos financieros. Sin coste para ti.'
    }
  }

  const benefits = [
    {
      icon: '📋',
      title: 'Estudiamos tu perfil',
      description: 'Analizamos tu caso para encontrar la hipoteca que mejor se adapte a tus necesidades.'
    },
    {
      icon: '📊',
      title: 'Analizamos las ofertas',
      description: 'Solicitamos tu hipoteca a varias entidades y evaluamos contigo todas las ofertas.'
    },
    {
      icon: '🤝',
      title: 'Negociamos por ti',
      description: 'Tu experto personal te ayuda a seleccionar las condiciones más interesantes y las negocia para ti.'
    }
  ]

  const infoSections = [
    {
      title: 'Estoy valorando la idea de comprarme una casa y quiero informarme',
      links: [
        { to: '/blog/educacion-financiera/ahorros-necesito-pedir-hipoteca', label: '¿Cuántos ahorros tengo que tener para pedir una hipoteca?' },
        { to: '/blog/educacion-financiera/probabilidades-concedan-hipoteca', label: '¿Qué perfil debo tener para que me concedan una hipoteca?' },
        { to: '/blog/educacion-financiera/que-casa-puedo-permitir', label: '¿Qué tipo de casa me puedo permitir?' }
      ]
    },
    {
      title: 'Estoy buscando una hipoteca y necesito resolver algunas dudas',
      links: [
        { to: '/blog/educacion-financiera/buscar-valorar-hipotecas', label: '¿Qué tipos de hipotecas existen y cuál es mejor para mi?' },
        { to: '/blog/educacion-financiera/gastos-comprar-vivienda', label: '¿Qué gastos supone la compra de una vivienda?' },
        { to: '/blog/educacion-financiera/documentacion-pedir-hipoteca', label: '¿Qué documentación necesito para pedir una hipoteca?' }
      ]
    },
    {
      title: 'Ya tengo mi casa elegida y necesito encontrar una hipoteca',
      links: [
        { to: '/calculadoras/cuota-hipoteca', label: 'Calcular la cuota mensual que pagaré en mi hipoteca' },
        { to: '/calculadoras/gastos-hipoteca', label: 'Calcular los gastos que supone pedir una hipoteca' }
      ]
    }
  ]

  const testimonials = [
    {
      text: 'María: "Es un servicio gratuito al que acudir cuando estás buscando hipoteca."',
      author: 'María',
      rating: 5,
      videoThumbnail: 'https://i.ytimg.com/vi_webp/NHgA-ANHnjM/sddefault.webp',
      videoUrl: 'https://www.youtube.com/watch?v=NHgA-ANHnjM'
    },
    {
      text: 'Antonio: "Me han ayudado a conseguir mi casa y el servicio es gratis."',
      author: 'Antonio',
      rating: 5,
      videoThumbnail: 'https://i.ytimg.com/vi_webp/Pjj81xv9Tu4/sddefault.webp',
      videoUrl: 'https://www.youtube.com/watch?v=Pjj81xv9Tu4'
    },
    {
      text: 'Pamela: "Para mi lo definitivo fue la comodidad, yo no tenía tiempo para dedicarle."',
      author: 'Pamela',
      rating: 5,
      videoThumbnail: 'https://i.ytimg.com/vi_webp/6OSm7fgSwWY/sddefault.webp',
      videoUrl: 'https://www.youtube.com/watch?v=6OSm7fgSwWY'
    }
  ]

  const experts = [
    { name: 'Almudena P.', initial: 'A', image: 'https://iahorro.imgix.net/public/user-photos/Lvkb6FDWZba0uI923fLG43hFQakwbFPyG87LU63w.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Joel E.', initial: 'J', image: 'https://iahorro.imgix.net/public/user-photos/home.forhza.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Ruben P.', initial: 'R', image: 'https://iahorro.imgix.net/public/user-photos/home.vkxoxu.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Gaspar S.', initial: 'G', image: 'https://iahorro.imgix.net/public/user-photos/eJyLOZuqb7f8MLBZinjwxMXX00KSsV1jrAjDCBH1.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Angel G.', initial: 'A', image: 'https://iahorro.imgix.net/public/user-photos/AqjdCzVoP41O9oYS89ekpWTcR0pDeQWAYixonhKE.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Victoria V.', initial: 'V', image: 'https://iahorro.imgix.net/public/user-photos/home.4nunpx.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Marina M.', initial: 'M', image: 'https://iahorro.imgix.net/public/user-photos/home.4h4a1t.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Eduardo C.', initial: 'E', image: 'https://iahorro.imgix.net/public/user-photos/qDHeXrFja5GE9JasQTnvcj1M7VUyiezXYJz03OxT.png?w=160&h=160&auto=format%2Ccompress&q=75' },
  ]

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <h1>{getTitle()}</h1>
          <p>{getDescription()}</p>
          <HeroButtons>
            <PrimaryButton to="/hipotecas" onClick={() => handleSearch('nueva hipoteca')}>Buscar una hipoteca</PrimaryButton>
            {tipo !== 'mejorar' && (
              <SecondaryButton to="/hipotecas/mejorar-hipoteca" onClick={() => handleSearch('mejorar hipoteca')}>Mejorar mi Hipoteca</SecondaryButton>
            )}
          </HeroButtons>
        </Container>
      </HeroSection>

      {/* Nos encargamos de todo */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2>Nos encargamos de todo, sin ningún coste para ti</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-600)' }}>
              Te acompañamos de principio a fin, resolviendo tus dudas y haciendo que el proceso sea rápido, sencillo y eficaz.
            </p>
          </div>
          
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <span style={{ fontSize: '2rem' }}>{benefit.icon}</span>
                <div className="content">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              </BenefitItem>
            ))}
          </BenefitsGrid>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 30px', background: 'var(--color-gray-100)', borderRadius: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '30px', height: '30px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong style={{ color: 'var(--color-secondary)' }}>Certificada por el Banco de España</strong>
                <br />
                <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)' }}>como Intermediaria de Crédito Inmobiliario nº D185</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ¿Que ganas buscando tu hipoteca con nosotros? */}
      <InfoSection>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2>¿Qué ganas buscando tu hipoteca con nosotros?</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-600)' }}>
              Queremos ayudarte para que encontrar tu hipoteca no se convierta en un proceso largo, frustrante y agotador. Si tú ganas, nosotros también ganamos.
            </p>
          </div>
          
          <InfoGrid>
            {infoSections.map((section, index) => (
              <InfoCard key={index}>
                <h3>{section.title}</h3>
                <ul>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.to} onClick={() => handleSearch(link.label)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            ))}
          </InfoGrid>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <PrimaryButton to="/hipotecas" onClick={() => handleSearch('nueva hipoteca')}>Quiero que me ayudéis a encontrar mi hipoteca</PrimaryButton>
          </div>
        </Container>
      </InfoSection>

      {/* Personas como tú ya confian en iAhorro */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2>Personas como tú ya confían en iAhorro</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-600)' }}>
              Nuestros clientes nos recomiendan a sus familiares y amigos para que disfruten de las ventajas de encontrar su hipoteca con iAhorro. ¿A qué esperas para hacer como ellos?
            </p>
          </div>
          
          <Testimonials 
            testimonials={testimonials}
            showVideoThumbnails={true}
          />
        </Container>
      </Section>

      {/* Banks Section */}
      <Section>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            Conseguimos la mejor hipoteca para ti
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--color-gray-600)', marginBottom: '40px' }}>
            Negociamos con los principales bancos para poder conseguirte las mejores condiciones del mercado. <strong>Tú quédate en casa y nosotros lo hacemos por ti.</strong>
          </p>
          <BankLogos showAll={true} />
        </Container>
      </Section>

      {/* Experts Section */}
      <ExpertCards experts={experts} />

      {/* Indice iAhorro */}
      <IndiceSection>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2>Indice iAhorro</h2>
            <p style={{ color: 'var(--color-gray-600)' }}>
              Es un <strong>indicador en el que reflejamos el estado del mercado hipotecario actual</strong>, que abarca tipos de interés, tipos de hipotecas y otros datos que pueden resultar de ayuda para que aquellos que buscan una hipoteca puedan contrastar si lo que le ofrecen en su banco es la mejor opción que pueden conseguir.
            </p>
          </div>
          
          <IndiceCard>
            <h3>Índice iAhorro</h3>
            <div className="indice-grid">
              <div className="indice-item">
                <div className="indice-label">Tipo fijo</div>
                <div className="indice-value">1,98%</div>
                <div className="indice-change">-0,12 Variación mes anterior</div>
              </div>
              <div className="indice-item">
                <div className="indice-label">Tipo variable</div>
                <div className="indice-value">0,40%</div>
                <div className="indice-change">0,40 Variación mes anterior</div>
              </div>
            </div>
            <p style={{ marginTop: '20px' }}>
              <Link to="/indice-iahorro-hipotecas#indice-hipotecas-fijas" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '500' }}>
                Ver datos de hipotecas →
              </Link>
            </p>
          </IndiceCard>
        </Container>
      </IndiceSection>

      {/* CTA Section */}
      <Section style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'var(--color-white)', textAlign: 'center' }}>
        <Container>
          <h2>Sin moverte de tu casa, ¿te llamamos?</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px', opacity: 0.95 }}>
            Hablamos contigo, estudiamos tu caso y te ofrecemos la mejor solución posible en mucho menos tiempo del que imaginas.
          </p>
          <PrimaryButton to="/contacta-con-iahorro" style={{ color: 'var(--color-white)' }}>Llamadme</PrimaryButton>
        </Container>
      </Section>
    </>
  )
}

export default HipotecasPage
