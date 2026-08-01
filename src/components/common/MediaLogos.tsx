import React from 'react'
import styled from 'styled-components'

interface MediaLogo {
  name: string
  url: string
  alt: string
}

interface MediaLogosProps {
  title?: string
  media?: MediaLogo[]
}

const MediaLogosContainer = styled.section`
  padding: var(--spacing-2xl) 0;
  background: var(--color-gray-50);
`

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: var(--spacing-xl);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-secondary);
`

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-xl);
  align-items: center;
  justify-items: center;
`

const MediaLogo = styled.img`
  height: 40px;
  width: auto;
  opacity: 0.7;
  transition: all var(--transition-fast);
  filter: grayscale(1);
  
  &:hover {
    opacity: 1;
    filter: grayscale(0);
    transform: scale(1.1);
  }
`

const defaultMedia = [
  { name: 'Negocios TV', url: 'https://iahorro.imgix.net/_nuxt/logo-negocios-tv.DWyYNgxW.svg', alt: 'Negocios TV' },
  { name: 'RTVE', url: 'https://iahorro.imgix.net/_nuxt/logo-rtve.CdOiVeKR.svg', alt: 'RTVE' },
  { name: 'La Información', url: 'https://iahorro.imgix.net/_nuxt/logo-lainformacion.Dh3XbU4p.svg', alt: 'La Información' },
  { name: 'Antena 3', url: 'https://iahorro.imgix.net/_nuxt/logo-antena-3.D3ri8jzc.svg', alt: 'Antena 3' },
  { name: 'Expansión', url: 'https://iahorro.imgix.net/_nuxt/logo-expansion.DAhKz9b9.svg', alt: 'Expansión' },
  { name: 'CincoDías', url: 'https://iahorro.imgix.net/_nuxt/logo-cinco-dias.CosGJ1Gt.svg', alt: 'Cinco Días' },
  { name: 'La razón', url: 'https://iahorro.imgix.net/_nuxt/logo-la-razon.ZgPP6_De.svg', alt: 'La Razón' },
  { name: 'ABC', url: 'https://iahorro.imgix.net/_nuxt/logo-abc.CJQGJAT2.svg', alt: 'ABC' },
  { name: 'El Mundo', url: 'https://iahorro.imgix.net/_nuxt/logo-el-mundo.C1krNsK-.svg', alt: 'El Mundo' },
  { name: '20 Minutos', url: 'https://iahorro.imgix.net/_nuxt/logo-20minutos.BBBFbElt.svg', alt: '20 Minutos' },
  { name: 'Prensa Iberica', url: 'https://iahorro.imgix.net/_nuxt/logo-iberica.zwmYIGGq.svg', alt: 'Prensa Ibérica' },
  { name: 'La Sexta', url: 'https://iahorro.imgix.net/_nuxt/logo-la-sexta.AN7WKSQr.svg', alt: 'La Sexta' },
  { name: 'Europa Press', url: 'https://iahorro.imgix.net/_nuxt/logo-europa-press.BgaRMfiR.svg', alt: 'Europa Press' },
]

const MediaLogos: React.FC<MediaLogosProps> = ({ title = 'Somos referentes en el sector hipotecario', media = defaultMedia }) => {
  return (
    <MediaLogosContainer>
      <Container>
        {title && <Title>{title}</Title>}
        <p style={{ textAlign: 'center', color: 'var(--color-gray-600)', marginBottom: '40px' }}>
          Los medios de comunicación nos usan como fuente para sus artículos sobre hipotecas y mercado inmobiliario.
        </p>
        <MediaGrid>
          {media.map((item, index) => (
            <MediaLogo key={index} src={item.url} alt={item.alt} title={item.name} />
          ))}
        </MediaGrid>
      </Container>
    </MediaLogosContainer>
  )
}

export default MediaLogos
