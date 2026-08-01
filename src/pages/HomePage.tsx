import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import styled from 'styled-components'
import { BankLogos, Testimonials, ExpertCards, MediaLogos } from '../components/common'

// Styled Components
const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://iahorro.imgix.net/_nuxt/image-bg-home_xl.CCYbZhv5.jpg') center/cover;
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
`

const BenefitCard = styled.div`
  text-align: center;
  padding: var(--spacing-xl);
  
  & svg {
    width: 80px;
    height: 80px;
    color: var(--color-primary);
    margin-bottom: var(--spacing-lg);
  }
  
  & h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
    color: var(--color-secondary);
  }
  
  & p {
    color: var(--color-gray-600);
    line-height: 1.7;
  }
`

const BanksSection = styled(Section)`
  background: var(--color-gray-50);
`

const BanksTitle = styled.h2`
  text-align: center;
  margin-bottom: var(--spacing-md);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-secondary);
`

const CertificationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-gray-100);
  border-radius: var(--radius-md);
  margin-top: var(--spacing-xl);
  text-align: center;
  
  & svg {
    width: 40px;
    height: 40px;
    color: var(--color-primary);
  }
  
  & .text {
    & strong {
      color: var(--color-secondary);
      display: block;
    }
    
    & span {
      font-size: 0.85rem;
      color: var(--color-gray-600);
    }
  }
`

const NeedsSection = styled(Section)`
  background: var(--color-gray-50);
`

const NeedsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
`

const NeedCard = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  
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

const CTASection = styled(Section)`
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: var(--color-white);
  text-align: center;
  
  & h2 {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-white);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  & p {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto var(--spacing-xl);
    opacity: 0.95;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`

const HomePage: React.FC = () => {
  const { addToSearchHistory } = useUser()

  const handleSearch = (query: string) => {
    addToSearchHistory(query)
  }

  const testimonials = [
    {
      text: 'Nos ayudó un montón a conseguir la mejor hipoteca y a entender todas las fases del proceso hasta finalizar la compra. Muy recomendable y gratuito.',
      author: 'Victor Arancón',
      rating: 5
    },
    {
      text: 'Asesores muy profesionales que te ayudan en el proceso de buscar la mejor hipoteca. Consiguen ofertas a las que no podrías acceder como particular.',
      author: 'Andrés García',
      rating: 5
    },
    {
      text: 'Renegocié mi hipoteca con ellos, y conseguí unas condiciones mucho mejores en mi hipoteca a tipo fijo, reduciéndola del 3,20% fijo al 1,10% fijo.',
      author: 'Ángel García',
      rating: 5
    },
    {
      text: 'Con un sólo paquete de documentos he tenido acceso a todas las ofertas que me interesaban y también a tipos de interés mejores.',
      author: 'Javier de Cruz',
      rating: 5
    },
    {
      text: 'Comunicación transparente, honesta y muy fluida. Te explica todo con gran detalle y pelea hasta el final por conseguir las mejores condiciones para tu hipoteca.',
      author: 'Oscar Mena',
      rating: 5
    },
    {
      text: 'Información de calidad y te facilitan mucho el trabajo ya que ellos contactan con los bancos y solo te envían las mejores propuestas en función de tus requerimientos.',
      author: 'Pablo Hernández',
      rating: 5
    }
  ]

  const needs = [
    {
      title: 'Solo quiero informarme y resolver dudas',
      description: 'Te contamos todo lo que deberías saber antes de pedir una hipoteca.',
      links: [
        { to: '/blog/educacion-financiera/mejorar-valoracion-solicitar-hipoteca', label: '¿Cuál es el perfil ideal para solicitar una hipoteca?' },
        { to: '/blog/noticias/alquilar-comprar', label: '¿Alquilar o comprar una casa, qué es mejor?' },
        { to: '/blog/educacion-financiera/tiempo-proceso-solicitud-hipoteca', label: '¿Cuánto se tarda en pedir una hipoteca?' },
        { to: '/blog/educacion-financiera/tipos-hipotecas', label: '¿Qué tipos de hipotecas existen y cuál es la mejor opción?' },
        { to: '/hipotecas/jovenes', label: '¿Existen las hipotecas para jóvenes?' }
      ]
    },
    {
      title: 'Estoy buscando una hipoteca por primera vez',
      description: 'Descubre qué documentos necesitas y qué tipo de hipoteca es mejor para ti.',
      links: [
        { to: '/blog/educacion-financiera/como-pedir-hipoteca-paso-paso', label: '¿Qué pasos tengo que seguir para contratar una hipoteca?' },
        { to: '/blog/educacion-financiera/documentacion-pedir-hipoteca', label: '¿Qué requisitos debes cumplir para solicitar una hipoteca?' },
        { to: '/calculadoras/cuota-hipoteca', label: 'Calcula la cuota mensual que pagarás en tu hipoteca.' },
        { to: '/calculadoras/gastos-hipoteca', label: 'Calcula los gastos que suponen la compraventa de una casa.' },
        { to: '/calculadoras/hipoteca-fija-vs-variable', label: 'Calcula si te conviene más una hipoteca de tipo fijo o variable.' }
      ]
    },
    {
      title: 'Ya tengo una hipoteca, ¿puedo mejorarla?',
      description: 'Te explicamos en qué casos te interesaría cambiar tu hipoteca.',
      links: [
        { to: '/blog/educacion-financiera/mejorar-condiciones-hipoteca', label: '¿Cómo puedo mejorar mi hipoteca actual?' },
        { to: '/calculadoras/subrogacion', label: 'Calcula cuánto ahorrarías si cambiaras tu hipoteca.' },
        { to: '/calculadoras/amortizacion', label: 'Calcula el ahorro que supondría amortizar tu hipoteca.' },
        { to: '/blog/educacion-financiera/irph', label: 'Tengo mi hipoteca vinculada al IRPH, ¿puedo cambiarla?' },
        { to: '/blog/educacion-financiera/cancelar-hipoteca', label: '¿Qué debo hacer para cancelar o cambiar mi hipoteca?' }
      ]
    }
  ]

  const experts = [
    { name: 'Noelia C.', initial: 'N', image: 'https://iahorro.imgix.net/public/user-photos/expert-defaults/neutral.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Ivan V.', initial: 'I', image: 'https://iahorro.imgix.net/public/user-photos/P4lDTphWUxqF9sXuVPI7pb8GXkHz6URYQr944ORl.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Andrea A.', initial: 'A', image: 'https://iahorro.imgix.net/public/user-photos/expert-defaults/neutral.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Gaspar S.', initial: 'G', image: 'https://iahorro.imgix.net/public/user-photos/eJyLOZuqb7f8MLBZinjwxMXX00KSsV1jrAjDCBH1.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Carol V.', initial: 'C', image: 'https://iahorro.imgix.net/public/user-photos/home.tyh50z.jpg?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Jose E.', initial: 'J', image: 'https://iahorro.imgix.net/public/user-photos/home.nhaska.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Javier C.', initial: 'J', image: 'https://iahorro.imgix.net/public/user-photos/v2bAsXkoyAFZp4ZumV3pcxMNyRVTk3rJBi3O7jlL.png?w=160&h=160&auto=format%2Ccompress&q=75' },
    { name: 'Alicia P.', initial: 'A', image: 'https://iahorro.imgix.net/public/user-photos/lg3b9TGj8f4mnEMwNbsgmT1Wybpu7ChKiu3kqmd4.png?w=160&h=160&auto=format%2Ccompress&q=75' },
  ]

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Container>
          <h1>Conseguimos la mejor hipoteca para ti</h1>
          <p>Un experto te asesora y te acompaña hasta la firma de tu hipoteca. <strong>Sin coste para ti</strong>. Cuéntanos, ¿qué estás buscando?</p>
          <HeroButtons>
            <PrimaryButton to="/hipotecas" onClick={() => handleSearch('nueva hipoteca')}>Buscar nueva hipoteca</PrimaryButton>
            <SecondaryButton to="/hipotecas/mejorar-hipoteca" onClick={() => handleSearch('mejorar hipoteca')}>Mejorar mi hipoteca</SecondaryButton>
          </HeroButtons>
        </Container>
      </HeroSection>

      {/* ¿Aun piensas en ir a tu banco? */}
      <Section>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2>¿Aún piensas en ir a tu banco a pedir una hipoteca?</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-gray-600)' }}>
              En iAhorro buscamos, comparamos y negociamos las mejores condiciones por ti. <br />
              Todos <strong>tenemos derecho a conseguir la mejor hipoteca</strong> posible.
            </p>
          </div>
          
          <BenefitsGrid>
            <BenefitCard>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3>Un experto siempre contigo</h3>
              <p>Te acompañará de principio a fin, resolviendo tus dudas y ayudándote en lo que necesites.</p>
            </BenefitCard>
            
            <BenefitCard>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3>Ahorra tiempo y dinero</h3>
              <p>Nuestro contacto con los bancos nos permite gestionar y agilizar los trámites para conseguir tu hipoteca.</p>
            </BenefitCard>
            
            <BenefitCard>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
              </svg>
              <h3>Negociamos por ti</h3>
              <p>Hablamos con todos los bancos y conseguimos las mejores condiciones. Tú eliges con cuál te quedas.</p>
            </BenefitCard>
          </BenefitsGrid>
          
          <CertificationBadge>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text">
              <strong>Certificada por el Banco de España</strong>
              <span>como Intermediaria de Crédito Inmobiliario nº D185</span>
            </div>
          </CertificationBadge>
        </Container>
      </Section>

      {/* Banks Section */}
      <BanksSection>
        <Container>
          <BanksTitle>Conseguimos la mejor hipoteca para ti</BanksTitle>
          <p style={{ textAlign: 'center', color: 'var(--color-gray-600)', marginBottom: '40px' }}>
            Negociamos con los principales bancos para poder conseguirte las mejores condiciones del mercado. <strong>Tú quédate en casa y nosotros lo hacemos por ti.</strong>
          </p>
          <BankLogos showAll={true} />
        </Container>
      </BanksSection>

      {/* Testimonials Section */}
      <Testimonials 
        testimonials={testimonials}
        title="Nuestros clientes hablan por nosotros"
        subtitle="Las opiniones de nuestros clientes satisfechos son la mejor recompensa a nuestro trabajo. Trabajamos día a día por seguir mejorando y hacer felices a nuestros usuarios."
      />

      {/* Needs Section */}
      <NeedsSection>
        <Container>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            ¿Qué necesitas en este momento?
          </h2>
          <NeedsGrid>
            {needs.map((need, index) => (
              <NeedCard key={index}>
                <h3>{need.title}</h3>
                <p>{need.description}</p>
                <ul>
                  {need.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.to} onClick={() => handleSearch(link.label)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NeedCard>
            ))}
          </NeedsGrid>
        </Container>
      </NeedsSection>

      {/* Experts Section */}
      <ExpertCards experts={experts} />

      {/* Media Logos Section */}
      <MediaLogos />

      {/* CTA Section */}
      <CTASection>
        <Container>
          <h2>¿Quieres que te llamemos?</h2>
          <p>Si has llegado hasta aquí y quieres que uno de nuestros expertos resuelva tus dudas o te acompañe durante la búsqueda de tu hipoteca, dínoslo y te llamamos.</p>
          <PrimaryButton to="/contacta-con-iahorro" style={{ color: 'var(--color-white)' }}>Llamadme</PrimaryButton>
        </Container>
      </CTASection>
    </>
  )
}

export default HomePage
