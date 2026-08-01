import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import styled from 'styled-components'

const PageHeader = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
              url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop') center/cover;
  padding: var(--spacing-2xl) 0 var(--spacing-xl);
  color: var(--color-white);
  text-align: center;
  
  & h1 {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-md);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  & p {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.95;
  }
`

const Section = styled.section`
  padding: var(--spacing-2xl) 0;
  
  @media (max-width: 768px) {
    padding: var(--spacing-xl) 0;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

const ContactInfo = styled.div`
  & h2 {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    position: relative;
    padding-bottom: var(--spacing-sm);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: var(--color-primary);
    }
  }
  
  & .info-section {
    margin-bottom: var(--spacing-xl);
  }
  
  & .info-section h3 {
    font-size: 1.2rem;
    margin-bottom: var(--spacing-md);
    color: var(--color-secondary);
  }
  
  & .info-item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    
    & svg {
      width: 24px;
      height: 24px;
      color: var(--color-primary);
      flex-shrink: 0;
      margin-top: 3px;
    }
    
    & .content h4 {
      font-size: 1rem;
      margin-bottom: var(--spacing-xs);
      color: var(--color-gray-800);
    }
    
    & .content p {
      font-size: 0.95rem;
      color: var(--color-gray-600);
      line-height: 1.6;
    }
  }
  
  & .offices {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
    
    & .office {
      padding: var(--spacing-lg);
      background: var(--color-gray-50);
      border-radius: var(--radius-md);
      
      & h4 {
        font-size: 1rem;
        margin-bottom: var(--spacing-sm);
        color: var(--color-secondary);
      }
      
      & p {
        font-size: 0.9rem;
        color: var(--color-gray-600);
        margin-bottom: var(--spacing-xs);
      }
    }
  }
`

const ContactForm = styled.div`
  background: var(--color-white);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  
  & h2 {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-lg);
    color: var(--color-secondary);
    text-align: center;
  }
  
  & p {
    text-align: center;
    color: var(--color-gray-600);
    margin-bottom: var(--spacing-xl);
  }
`

const Form = styled.form`
  & .form-group {
    margin-bottom: var(--spacing-lg);
    
    & label {
      display: block;
      font-weight: 600;
      margin-bottom: var(--spacing-sm);
      color: var(--color-gray-800);
    }
    
    & input, & select, & textarea {
      width: 100%;
      padding: var(--spacing-md);
      border: 2px solid var(--color-gray-300);
      border-radius: var(--radius-md);
      font-size: 1rem;
      transition: all var(--transition-fast);
      font-family: inherit;
      
      &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 4px rgba(0, 168, 232, 0.1);
      }
    }
    
    & textarea {
      min-height: 150px;
      resize: vertical;
    }
    
    & .hint {
      font-size: 0.85rem;
      color: var(--color-gray-500);
      margin-top: var(--spacing-xs);
    }
  }
  
  & .checkbox-group {
    margin-bottom: var(--spacing-lg);
    
    & label {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm);
      font-weight: normal;
      cursor: pointer;
      
      & input {
        width: auto;
        margin-top: 3px;
      }
    }
  }
`

const SubmitButton = styled.button`
  width: 100%;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
  
  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  justify-content: center;
  
  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--color-primary);
    color: var(--color-white);
    border-radius: 50%;
    font-size: 1.3rem;
    transition: all var(--transition-fast);
    
    &:hover {
      background: var(--color-primary-dark);
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
    }
  }
`

const SuccessMessage = styled.div`
  background: var(--color-accent);
  color: var(--color-white);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  
  & h3 {
    margin-bottom: var(--spacing-sm);
  }
  
  & p {
    margin: 0;
    opacity: 0.95;
  }
`

const ContactoPage: React.FC = () => {
  const { user } = useUser()
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    tipo: 'hipoteca',
    mensaje: '',
    acepto: false,
    informacion: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.acepto) {
      setIsSubmitting(false)
      return
    }
    
    setIsSuccess(true)
    setIsSubmitting(false)
    
    // Resetear formulario (opcional)
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        mensaje: '',
        acepto: false
      }))
      setIsSuccess(false)
    }, 5000)
  }

  const handleCallRequest = () => {
    alert('Un experto se pondrá en contacto contigo en las próximas 24-48 horas.')
  }

  return (
    <>
      <PageHeader>
        <Container>
          <h1>Contacta con iAhorro</h1>
          <p>¿Tienes dudas sobre hipotecas? Nuestros expertos están aquí para ayudarte. Rellena el formulario o llámanos directamente.</p>
        </Container>
      </PageHeader>

      <Section>
        <Container>
          <ContactGrid>
            {/* Información de contacto */}
            <ContactInfo>
              <h2>Nuestros datos</h2>
              
              <div className="info-section">
                <h3>Teléfono</h3>
                <div className="info-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="content">
                    <h4>Atención al cliente</h4>
                    <p><a href="tel:+34910207110" style={{ color: 'var(--color-primary)' }}>910 207 110</a></p>
                    <p>De lunes a viernes de 9h a 20h</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Email</h3>
                <div className="info-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="content">
                    <h4>Email</h4>
                    <p><a href="mailto:info@iahorro.com" style={{ color: 'var(--color-primary)' }}>info@iahorro.com</a></p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Oficinas</h3>
                <div className="offices">
                  <div className="office">
                    <h4>Madrid</h4>
                    <p>General Ramírez de Madrid, 8-10</p>
                    <p>28020, Madrid</p>
                    <p>(Oficinas centrales)</p>
                  </div>
                  <div className="office">
                    <h4>Barcelona</h4>
                    <p>Travessera de Gràcia 58</p>
                    <p>08006, Barcelona</p>
                    <p>(Oficinas grupo BC)</p>
                  </div>
                  <div className="office">
                    <h4>Valencia</h4>
                    <p>C/ Universidad, 4, 2º planta</p>
                    <p>46003, Valencia</p>
                    <p>(Oficinas grupo BC)</p>
                  </div>
                  <div className="office">
                    <h4>Málaga</h4>
                    <p>C/ Maestranza, 25, 1º planta</p>
                    <p>29016, Málaga</p>
                    <p>(Coworking La Aduana)</p>
                  </div>
                </div>
              </div>

              <SocialLinks>
                <a href="https://es.linkedin.com/company/iahorro-com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <span>in</span>
                </a>
                <a href="https://es-la.facebook.com/iahorro/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <span>f</span>
                </a>
                <a href="https://x.com/iahorro" target="_blank" rel="noopener noreferrer" aria-label="X/Twitter">
                  <span>X</span>
                </a>
                <a href="https://www.instagram.com/iahorro_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <span>ig</span>
                </a>
                <a href="https://www.youtube.com/user/iAhorro" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <span>yt</span>
                </a>
              </SocialLinks>
            </ContactInfo>

            {/* Formulario de contacto */}
            <ContactForm>
              <h2>Contacta con nosotros</h2>
              <p>Rellena el formulario y uno de nuestros expertos se pondrá en contacto contigo en menos de 24 horas.</p>
              
              {isSuccess && (
                <SuccessMessage>
                  <h3>¡Mensaje enviado!</h3>
                  <p>Gracias por contactar con nosotros. Te responderemos en breve.</p>
                </SuccessMessage>
              )}

              <Form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Juan Pérez"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Ej: juan@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 600 123 456"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tipo">¿Qué necesitas? *</label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  >
                    <option value="hipoteca">Información sobre hipotecas</option>
                    <option value="mejorar">Mejorar mi hipoteca actual</option>
                    <option value="subrogacion">Subrogación de hipoteca</option>
                    <option value="seguros">Información sobre seguros</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    placeholder="Cuéntanos qué necesitas..."
                  />
                </div>

                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="acepto"
                      checked={formData.acepto}
                      onChange={handleChange}
                      required
                    />
                    <span>Acepto la <Link to="/politica-de-privacidad" style={{ color: 'var(--color-primary)' }}>política de privacidad</Link> *</span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="informacion"
                      checked={formData.informacion}
                      onChange={handleChange}
                    />
                    <span>Quiero recibir información comercial sobre productos y servicios</span>
                  </label>
                </div>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </SubmitButton>
              </Form>

              <div style={{ textAlign: 'center', marginTop: '20px', color: 'var(--color-gray-500)' }}>
                <p>¿Prefieres que te llamemos? <button onClick={handleCallRequest} style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}>Solicitar llamada</button></p>
              </div>
            </ContactForm>
          </ContactGrid>
        </Container>
      </Section>
    </>
  )
}

export default ContactoPage
