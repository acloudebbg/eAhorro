import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background: var(--color-secondary);
  color: var(--color-white);
  padding: var(--spacing-2xl) 0 var(--spacing-xl);
  margin-top: var(--spacing-2xl);
`

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
`

const FooterSection = styled.div`
  & h4 {
    color: var(--color-white);
    font-size: 1.1rem;
    margin-bottom: var(--spacing-lg);
    position: relative;
    padding-bottom: var(--spacing-sm);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
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
    color: var(--color-gray-300);
    font-size: 0.9rem;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--color-primary);
    }
  }
`

const FooterBrand = styled.div`
  margin-bottom: var(--spacing-lg);
  
  & svg {
    width: 40px;
    height: 40px;
    margin-bottom: var(--spacing-sm);
  }
  
  & p {
    color: var(--color-gray-300);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: var(--spacing-md);
  }
  
  & .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: var(--spacing-sm);
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  
  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: var(--color-white);
    font-size: 1.2rem;
    transition: all var(--transition-fast);
    
    &:hover {
      background: var(--color-primary);
      transform: translateY(-2px);
    }
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const Copyright = styled.p`
  color: var(--color-gray-400);
  font-size: 0.85rem;
`

const Certifications = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  
  & img {
    height: 40px;
    opacity: 0.7;
    transition: opacity var(--transition-fast);
    
    &:hover {
      opacity: 1;
    }
  }
`

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <FooterBrand>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#00a8e8"/>
                <path d="M12 6C8.69 6 6 8.69 6 12H8C8 9.79 9.79 8 12 8V6Z" fill="#00a8e8"/>
              </svg>
              <div className="logo-text">iAhorro</div>
              <p>Conseguimos la hipoteca perfecta para ti, de forma sencilla, rápida y segura.</p>
              <p>Somos líderes en el sector y negociamos con los principales bancos para ofrecerte las mejores ofertas de manera totalmente gratuita y sin compromiso.</p>
              <Certifications>
                <img src="https://sedeelectronica.bde.es/sede/es/menu/tramites/autorizaciones-de-entidades-de-credito-y-otros/registro-intermediarios-credito-inmobiliario-p218.html" alt="Certificada por el Banco de España" />
              </Certifications>
            </FooterBrand>
          </FooterSection>

          <FooterSection>
            <h4>Conócenos</h4>
            <ul>
              <li><Link to="/iahorradores/">iAhorradores</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/quienes-somos">Sobre iAhorro</Link></li>
              <li><Link to="/contacta-con-iahorro">Contacto</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
              <li><a href="https://iahorrotechnologies.com/" target="_blank" rel="noopener noreferrer">iAhorro Technologies</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h4>Herramientas</h4>
            <ul>
              <li><Link to="/calculadoras">Calculadoras</Link></li>
              <li><Link to="/euribor">Euríbor</Link></li>
              <li><Link to="/diccionario">Diccionario</Link></li>
              <li><Link to="/indice-iahorro-hipotecas">Índice iAhorro</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h4>Condiciones de hipoteca</h4>
            <ul>
              <li><Link to="/hipotecas/fijas">Hipotecas fijas</Link></li>
              <li><Link to="/hipotecas/variables">Hipotecas variables</Link></li>
              <li><Link to="/hipotecas/mixtas">Hipotecas mixtas</Link></li>
              <li><Link to="/hipotecas/sin-aval">Hipotecas sin aval</Link></li>
              <li><Link to="/hipotecas/online">Hipotecas online</Link></li>
              <li><Link to="/hipotecas/100">Hipotecas 100%</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h4>Hipotecas por finalidad</h4>
            <ul>
              <li><Link to="/hipotecas/reforma">Para reformar</Link></li>
              <li><Link to="/hipotecas/terreno">Para terreno</Link></li>
              <li><Link to="/hipotecas/vpo">Para VPO</Link></li>
              <li><Link to="/blog/educacion-financiera/subrogar-hipoteca-otra-persona">Para subrogar</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h4>Hipotecas por importe</h4>
            <ul>
              <li><Link to="/hipotecas/500000-euros">500.000 €</Link></li>
              <li><Link to="/hipotecas/300000-euros">300.000 €</Link></li>
              <li><Link to="/hipotecas/200000-euros">200.000 €</Link></li>
              <li><Link to="/hipotecas/180000-euros">180.000 €</Link></li>
              <li><Link to="/hipotecas/150000-euros">150.000 €</Link></li>
            </ul>
          </FooterSection>
        </FooterTop>

        <SocialLinks>
          <a href="https://es.linkedin.com/company/iahorro-com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <span>in</span>
          </a>
          <a href="https://es-la.facebook.com/iahorro/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <span>f</span>
          </a>
          <a href="https://www.youtube.com/user/iAhorro" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <span>yt</span>
          </a>
          <a href="https://x.com/iahorro" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter">
            <span>X</span>
          </a>
          <a href="https://www.instagram.com/iahorro_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <span>ig</span>
          </a>
          <a href="https://www.tiktok.com/@iahorro" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <span>tt</span>
          </a>
        </SocialLinks>

        <FooterBottom>
          <Copyright>
            © iAhorro {currentYear} - Todos los derechos reservados
          </Copyright>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/aviso-legal">Aviso Legal</Link>
            <Link to="/politica-de-privacidad">Política de Privacidad</Link>
            <Link to="/politica-de-cookies">Política de Cookies</Link>
            <Link to="/condiciones-generales">Condiciones generales</Link>
            <a href="https://gbcgs.canaldenuncias.com/gbcgs/iahorro" target="_blank" rel="noopener noreferrer">Canal de denuncias</a>
            <Link to="/hipotecas/reclamaciones">Reclamaciones</Link>
          </div>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
