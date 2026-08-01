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
    text-decoration: none;
    
    &:hover {
      color: var(--color-primary);
    }
  }
`

const FooterBrand = styled.div`
  margin-bottom: var(--spacing-lg);
  
  & img {
    height: 60px;
    width: auto;
    margin-bottom: var(--spacing-md);
  }
  
  & p {
    color: var(--color-gray-300);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: var(--spacing-md);
  }
  
  & strong {
    color: var(--color-white);
  }
`

const Certifications = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  margin-top: var(--spacing-md);
  flex-wrap: wrap;
  
  & a {
    text-decoration: none;
  }
  
  & img {
    height: 40px;
    opacity: 0.7;
    transition: opacity var(--transition-fast);
    
    &:hover {
      opacity: 1;
    }
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
    text-decoration: none;
    
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

const LegalLinks = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  
  & a {
    color: var(--color-gray-400);
    font-size: 0.85rem;
    transition: color var(--transition-fast);
    text-decoration: none;
    
    &:hover {
      color: var(--color-primary);
    }
  }
`

const ContactInfo = styled.div`
  margin-bottom: var(--spacing-lg);
  
  & h4 {
    color: var(--color-white);
    font-size: 1rem;
    margin-bottom: var(--spacing-sm);
  }
  
  & p {
    color: var(--color-gray-300);
    font-size: 0.9rem;
    margin-bottom: var(--spacing-xs);
  }
  
  & a {
    color: var(--color-gray-300);
    text-decoration: none;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--color-primary);
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
              <img 
                src="https://iahorro.imgix.net/_nuxt/whith-tagline.C9PXLlRD.svg" 
                alt="iAhorro - Conseguimos la hipoteca perfecta para ti" 
              />
              <p>Conseguimos la hipoteca perfecta para ti, de forma sencilla, rápida y segura. Somos líderes en el sector y negociamos con los principales bancos para <strong>ofrecerte las mejores ofertas de manera totalmente gratuita y sin compromiso.</strong></p>
              <Certifications>
                <a href="https://sedeelectronica.bde.es/sede/es/menu/tramites/autorizaciones-de-entidades-de-credito-y-otros/registro-intermediarios-credito-inmobiliario-p218.html" target="_blank" rel="noopener noreferrer">
                  <img src="https://iahorro.imgix.net/_nuxt/LogoFooter_BancoEspana.ByeH3aE1.svg" alt="Certificada por el Banco de España como intermediaria de Crédito Inmobiliario nºD185" />
                </a>
                <a href="https://www.aesan.gob.es/AECOSAN/web/para_el_consumidor/ampliacion/Informacion_Practica_BS/vivienda.htm" target="_blank" rel="noopener noreferrer">
                  <img src="https://iahorro.imgix.net/_nuxt/LogoFooter_MinisterioConsumo.JkAwwArF.png" alt="Ministerio de Consumo" />
                </a>
                <a href="https://g.page/iAhorro-com/" target="_blank" rel="noopener noreferrer">
                  <img src="https://iahorro.imgix.net/_nuxt/google_reviews_short.CeNn3spq.svg" alt="Reseñas de Google" />
                  <img src="https://iahorro.imgix.net/_nuxt/google_reviews_long.BEyippYo.svg" alt="Reseñas de Google" />
                </a>
              </Certifications>
            </FooterBrand>
          </FooterSection>

          <FooterSection>
            <h4>Contacta con nosotros</h4>
            <ContactInfo>
              <h4>Atención Hipotecas</h4>
              <p><a href="tel:+34910207110">(+34) 910 207 110</a></p>
              <p>De lunes a viernes de 9h. a 20h.</p>
              <p><a href="mailto:atencion@iahorro.com">atencion@iahorro.com</a></p>
              
              <h4 style={{ marginTop: '15px' }}>Atención Empresas y Medios</h4>
              <p><a href="tel:+34605334857">(+34) 605 334 857</a></p>
              <p><a href="mailto:comunicacion@iahorro.com">comunicacion@iahorro.com</a></p>
            </ContactInfo>
            
            <h4 style={{ marginTop: '20px' }}>Síguenos en:</h4>
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
          </FooterSection>

          <FooterSection>
            <h4>Conócenos</h4>
            <ul>
              <li><a href="https://www.iahorro.com/iahorradores/">iAhorradores</a></li>
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

          <FooterSection>
            <h4>Hipotecas por titular</h4>
            <ul>
              <li><Link to="/hipotecas/jovenes">Para jóvenes</Link></li>
              <li><Link to="/hipotecas/funcionarios">Para funcionarios</Link></li>
              <li><Link to="/hipotecas/autonomos">Para autónomos</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h4>Hipotecas por provincia</h4>
            <ul>
              <li><Link to="/hipotecas/madrid">Madrid</Link></li>
              <li><Link to="/hipotecas/barcelona">Barcelona</Link></li>
              <li><Link to="/hipotecas/valencia">Valencia</Link></li>
              <li><Link to="/hipotecas/malaga">Málaga</Link></li>
            </ul>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © iAhorro {currentYear}
          </Copyright>
          <LegalLinks>
            <Link to="/aviso-legal">Aviso Legal</Link>
            <Link to="/politica-de-privacidad">Política de Privacidad</Link>
            <Link to="/politica-de-cookies">Política de Cookies</Link>
            <Link to="/condiciones-generales">Condiciones generales</Link>
            <a href="https://gbcgs.canaldenuncias.com/gbcgs/iahorro" target="_blank" rel="noopener noreferrer">Canal de denuncias</a>
            <Link to="/hipotecas/reclamaciones">Reclamaciones</Link>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
