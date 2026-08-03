import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-gray-50);
`

const LoginHeader = styled.header`
  background: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-gray-200);
`

const LoginHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-md);
  }
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  
  & img {
    height: 40px;
    width: auto;
    
    @media (max-width: 576px) {
      height: 32px;
    }
  }
  
  &:hover {
    opacity: 0.8;
  }
`

const LoginMain = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  
  @media (max-width: 992px) {
    padding: var(--spacing-xl);
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg);
  }
  
  @media (max-width: 576px) {
    padding: var(--spacing-md);
  }
`

const LoginCard = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-2xl);
  max-width: 450px;
  width: 100%;
  text-align: center;
  
  @media (max-width: 576px) {
    padding: var(--spacing-xl);
    margin: 0 var(--spacing-sm);
  }
`

const LoginTitle = styled.h1`
  font-size: clamp(1.5rem, 3.5vw, 1.75rem);
  color: var(--color-secondary);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`

const LoginSubtitle = styled.p`
  color: var(--color-gray-600);
  margin-bottom: var(--spacing-xl);
  font-size: clamp(0.9rem, 1.7vw, 0.95rem);
  line-height: 1.6;
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
    margin-bottom: var(--spacing-lg);
  }
`

const FormGroup = styled.div`
  margin-bottom: var(--spacing-lg);
  text-align: left;
  
  @media (max-width: 576px) {
    margin-bottom: var(--spacing-md);
  }
`

const Label = styled.label`
  display: block;
  font-size: clamp(0.85rem, 1.5vw, 0.9rem);
  font-weight: 500;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-xs);
  
  @media (max-width: 576px) {
    font-size: 0.85rem;
  }
`

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: clamp(0.95rem, 1.6vw, 1rem);
  transition: border-color var(--transition-fast);
  color: var(--color-gray-800);
  
  @media (max-width: 576px) {
    padding: var(--spacing-sm);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 168, 232, 0.1);
  }
  
  &::placeholder {
    color: var(--color-gray-500);
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: clamp(0.95rem, 1.6vw, 1rem);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  @media (max-width: 576px) {
    padding: var(--spacing-md) var(--spacing-lg);
  }
  
  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 168, 232, 0.2);
  }
  
  &:disabled {
    background: var(--color-gray-400);
    cursor: not-allowed;
    transform: none;
  }
`

const ErrorMessage = styled.div`
  color: var(--color-error);
  font-size: clamp(0.8rem, 1.3vw, 0.85rem);
  margin-top: var(--spacing-xs);
  text-align: left;
  min-height: 20px;
  
  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`

const LoginHelp = styled.div`
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-gray-200);
  
  @media (max-width: 576px) {
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
  }
  
  & p {
    font-size: clamp(0.8rem, 1.3vw, 0.85rem);
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-sm);
    
    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }
  
  & a {
    color: var(--color-primary);
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const LanguageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  
  & select {
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    background: var(--color-white);
    cursor: pointer;
    
    @media (max-width: 576px) {
      font-size: 0.8rem;
      padding: var(--spacing-xs);
    }
  }
`

// Footer components
const LoginFooter = styled.footer`
  background: var(--color-secondary);
  color: var(--color-white);
  padding: var(--spacing-xl) 0;
  margin-top: auto;
  
  @media (max-width: 768px) {
    padding: var(--spacing-lg) 0;
  }
`

const FooterContent = styled.div`
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    text-align: center;
  }
  
  @media (max-width: 576px) {
    padding: 0 var(--spacing-md);
    gap: var(--spacing-md);
  }
`

const FooterSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const FooterIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
  
  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`

const FooterText = styled.div`
  & h4 {
    color: var(--color-white);
    font-size: clamp(0.95rem, 1.7vw, 1rem);
    margin-bottom: var(--spacing-xs);
    font-weight: 600;
    
    @media (max-width: 576px) {
      font-size: 0.9rem;
    }
  }
  
  & p {
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(0.85rem, 1.5vw, 0.85rem);
    line-height: 1.5;
    
    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }
`

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Validación básica de formato de correo
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email.trim()) {
      setError('El correo electrónico es obligatorio')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Introduce un correo electrónico válido')
      return
    }
    
    // Simular envío
    setIsLoading(true)
    
    // Redirigir al área de cliente después de 1 segundo (simulación)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/area-cliente')
    }, 1000)
  }

  const handleSecondButtonClick = () => {
    setError('')
    
    if (!email.trim()) {
      setError('El correo electrónico es obligatorio')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Introduce un correo electrónico válido')
      return
    }
    
    navigate('/area-cliente-v2')
  }

  return (
    <LoginContainer>
      <LoginHeader>
        <LoginHeaderContent>
          <Logo to="/">
            <img 
              src="https://iahorro.imgix.net/img/general/logo_ia-w.svg?auto=format%2Ccompress&q=75" 
              alt="iAhorro" 
            />
          </Logo>
          <LanguageSelector>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)' }}>🇪🇸</span>
            <select defaultValue="es">
              <option value="es">Castellano</option>
              <option value="ca">Català</option>
            </select>
          </LanguageSelector>
        </LoginHeaderContent>
      </LoginHeader>
      
      <LoginMain>
        <LoginCard>
          <LoginTitle>Accede a tu área de cliente</LoginTitle>
          <LoginSubtitle>
            Introduce tu correo electrónico y te enviaremos un enlace para acceder de forma rápida y segura.
          </LoginSubtitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                autoComplete="email"
                autoFocus
              />
              <ErrorMessage>{error}</ErrorMessage>
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? 'Enviando...' : 'Enviarme enlace de acceso'}
            </SubmitButton>
            
            <SubmitButton 
              type="button" 
              style={{ background: '#4CAF50', marginTop: 'var(--spacing-sm)' }}
              onClick={handleSecondButtonClick}
              onMouseEnter={(e) => e.currentTarget.style.background = '#45a049'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#4CAF50'}
            >
              Acceso a nueva área
            </SubmitButton>
          </form>
          
          <LoginHelp>
            <p>
              ¿Problemas para acceder? <a href="#">Contacta con nosotros</a>
            </p>
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>
              Al continuar, aceptas nuestra <a href="/politica-de-privacidad">Política de Privacidad</a> y <a href="/aviso-legal">Aviso Legal</a>
            </p>
          </LoginHelp>
        </LoginCard>
      </LoginMain>
      
      {/* Footer */}
      <LoginFooter>
        <FooterContent>
          <FooterSection>
            <FooterIcon>🏦</FooterIcon>
            <FooterText>
              <h4>Certificación de Banco de España</h4>
              <p>Entidad de Crédito Inmobiliario con número de registro D185</p>
            </FooterText>
          </FooterSection>
          <FooterSection>
            <FooterIcon>🔒</FooterIcon>
            <FooterText>
              <h4>Conexión 100% segura</h4>
              <p>Certificados SSL SHA-256 para la máxima seguridad de nuestras comunicaciones digitales.</p>
            </FooterText>
          </FooterSection>
          <FooterSection>
            <FooterIcon>🔑</FooterIcon>
            <FooterText>
              <h4>Confidencialidad</h4>
              <p>Cifrado y almacenamiento seguro de tus datos cumpliendo estrictamente con la RGPD.</p>
            </FooterText>
          </FooterSection>
        </FooterContent>
      </LoginFooter>
    </LoginContainer>
  )
}

export default LoginPage
