import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-gray-200);
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  height: 80px;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  
  & img {
    height: 50px;
    width: auto;
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
  
  @media (max-width: 992px) {
    display: none;
  }
`

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  list-style: none;
  margin: 0;
  padding: 0;
`

const NavItem = styled.li`
  position: relative;
`

const NavLink = styled(Link)`
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  position: relative;
  transition: color var(--transition-fast);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  border-radius: var(--radius-md);
  
  &:hover {
    color: var(--color-primary);
    background: var(--color-gray-50);
  }
  
  &.active {
    color: var(--color-primary);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 2px;
      background: var(--color-primary);
      border-radius: var(--radius-full);
    }
  }
  
  & .dropdown-arrow {
    font-size: 0.7rem;
    color: var(--color-gray-500);
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 240px;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-sm);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all var(--transition-fast);
  z-index: 100;
  border: 1px solid var(--color-gray-100);
  
  ${NavItem}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`

const DropdownItem = styled(Link)`
  display: block;
  padding: var(--spacing-sm) var(--spacing-lg);
  color: var(--color-gray-700);
  font-size: 0.9rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  text-decoration: none;
  white-space: nowrap;
  
  &:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }
  
  &.active {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`

const LoginButton = styled.a`
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 0.9rem;
  transition: all var(--transition-fast);
  text-decoration: none;
  border: 2px solid var(--color-primary);
  
  &:hover {
    background: var(--color-white);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-secondary);
  cursor: pointer;
  padding: var(--spacing-sm);
  
  @media (max-width: 992px) {
    display: block;
  }
`

const MobileNav = styled(Nav)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-white);
  flex-direction: column;
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  border-top: 1px solid var(--color-gray-200);
  gap: var(--spacing-sm);
  
  @media (min-width: 993px) {
    display: none !important;
  }
`

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useUser()
  const location = useLocation()

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  // Menú de Hipotecas
  const hipotecasMenu = [
    { to: '/hipotecas', label: 'Nueva hipoteca' },
    { to: '/hipotecas/mejorar-hipoteca', label: 'Mejorar hipoteca' },
  ]

  // Menú de Calculadoras
  const calculadorasMenu = [
    { to: '/calculadoras/cuota-hipoteca', label: 'Calculadora de cuota' },
    { to: '/calculadoras/gastos-hipoteca', label: 'Calculadora de gastos' },
    { to: '/calculadoras/hipoteca-fija-o-mixta', label: 'Calculadora fija o mixta' },
    { to: '/calculadoras/subrogacion', label: 'Calculadora de subrogación' },
    { to: '/calculadoras/amortizacion', label: 'Calculadora de amortización' },
    { to: '/calculadoras/que-casa-me-puedo-permitir', label: '¿Qué casa me puedo permitir?' },
  ]

  // Menú de Comparadores
  const comparadoresMenu = [
    { to: '/comparador-hipotecas', label: 'Comparador de hipotecas' },
    { to: '/indice-iahorro-hipotecas', label: 'Índice iAhorro' },
  ]

  // Menú de Servicios
  const serviciosMenu = [
    { to: '/hipotecas/tasacion-vivienda', label: 'Tasadoras' },
    { to: '/servicios/cuentas-bancarias', label: 'Cuentas Bancarias' },
  ]

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <img 
            src="https://iahorro.imgix.net/img/general/logo_ia-w.svg?auto=format%2Ccompress&q=75" 
            alt="iAhorro - Conseguimos la mejor hipoteca para ti" 
          />
        </Logo>

        <MobileMenuButton onClick={toggleMobileMenu}>
          ☰
        </MobileMenuButton>

        {/* Navegación de escritorio */}
        <Nav>
          <NavList>
            <NavItem>
              <NavLink to="/hipotecas" className={location.pathname.startsWith('/hipotecas') ? 'active' : ''}>
                Hipotecas <span className="dropdown-arrow">▼</span>
              </NavLink>
              <DropdownMenu>
                {hipotecasMenu.map((item, index) => (
                  <DropdownItem 
                    key={index} 
                    to={item.to}
                    className={location.pathname === item.to ? 'active' : ''}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/calculadoras" className={location.pathname.startsWith('/calculadoras') ? 'active' : ''}>
                Calculadoras <span className="dropdown-arrow">▼</span>
              </NavLink>
              <DropdownMenu>
                {calculadorasMenu.map((item, index) => (
                  <DropdownItem 
                    key={index} 
                    to={item.to}
                    className={location.pathname === item.to ? 'active' : ''}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/comparador-hipotecas" className={location.pathname.startsWith('/comparador') ? 'active' : ''}>
                Comparadores <span className="dropdown-arrow">▼</span>
              </NavLink>
              <DropdownMenu>
                {comparadoresMenu.map((item, index) => (
                  <DropdownItem 
                    key={index} 
                    to={item.to}
                    className={location.pathname === item.to ? 'active' : ''}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/euribor" className={location.pathname === '/euribor' ? 'active' : ''}>
                Euríbor
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/servicios/cuentas-bancarias" className={location.pathname.startsWith('/servicios') ? 'active' : ''}>
                Servicios <span className="dropdown-arrow">▼</span>
              </NavLink>
              <DropdownMenu>
                {serviciosMenu.map((item, index) => (
                  <DropdownItem 
                    key={index} 
                    to={item.to}
                    className={location.pathname === item.to ? 'active' : ''}
                  >
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
          </NavList>
        </Nav>

        {/* Navegación móvil */}
        <MobileNav style={{ display: mobileMenuOpen ? 'flex' : 'none' }}>
          <NavList style={{ flexDirection: 'column', gap: '0' }}>
            <NavItem>
              <NavLink to="/hipotecas" onClick={toggleMobileMenu}>
                Hipotecas
              </NavLink>
              <DropdownMenu style={{ position: 'static', opacity: 1, visibility: 'visible', transform: 'none', boxShadow: 'none', border: 'none', paddingLeft: '20px' }}>
                {hipotecasMenu.map((item, index) => (
                  <DropdownItem key={index} to={item.to} onClick={toggleMobileMenu}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/calculadoras" onClick={toggleMobileMenu}>
                Calculadoras
              </NavLink>
              <DropdownMenu style={{ position: 'static', opacity: 1, visibility: 'visible', transform: 'none', boxShadow: 'none', border: 'none', paddingLeft: '20px' }}>
                {calculadorasMenu.map((item, index) => (
                  <DropdownItem key={index} to={item.to} onClick={toggleMobileMenu}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/comparador-hipotecas" onClick={toggleMobileMenu}>
                Comparadores
              </NavLink>
              <DropdownMenu style={{ position: 'static', opacity: 1, visibility: 'visible', transform: 'none', boxShadow: 'none', border: 'none', paddingLeft: '20px' }}>
                {comparadoresMenu.map((item, index) => (
                  <DropdownItem key={index} to={item.to} onClick={toggleMobileMenu}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/euribor" onClick={toggleMobileMenu}>
                Euríbor
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/servicios/cuentas-bancarias" onClick={toggleMobileMenu}>
                Servicios
              </NavLink>
              <DropdownMenu style={{ position: 'static', opacity: 1, visibility: 'visible', transform: 'none', boxShadow: 'none', border: 'none', paddingLeft: '20px' }}>
                {serviciosMenu.map((item, index) => (
                  <DropdownItem key={index} to={item.to} onClick={toggleMobileMenu}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </NavItem>
          </NavList>
        </MobileNav>

        <UserSection>
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
                <div style={{ width: '36px', height: '36px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' }}>
                  {user.nombre.charAt(0)}
                </div>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-gray-700)' }}>{user.nombre}</span>
              </div>
              <LoginButton href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                Cerrar sesión
              </LoginButton>
            </>
          ) : (
            <LoginButton as={Link} to="/login">
              Área de usuario
            </LoginButton>
          )}
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
