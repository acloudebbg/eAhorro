import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: var(--spacing-md) 0;
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  
  & svg {
    width: 40px;
    height: 40px;
  }
  
  & span {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-secondary);
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
`

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  list-style: none;
`

const NavItem = styled.li`
  position: relative;
`

const NavLink = styled(Link)`
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-gray-700);
  padding: var(--spacing-sm) 0;
  position: relative;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--color-primary);
  }
  
  &.active {
    color: var(--color-primary);
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--color-primary);
    }
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-sm);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all var(--transition-fast);
  z-index: 100;
  
  ${NavItem}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`

const DropdownItem = styled(Link)`
  display: block;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-gray-700);
  font-size: 0.9rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  
  &:hover {
    background: var(--color-gray-50);
    color: var(--color-primary);
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`

const LoginButton = styled(Link)`
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 0.9rem;
  transition: background var(--transition-fast);
  
  &:hover {
    background: var(--color-primary-dark);
  }
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  
  &:hover {
    background: var(--color-gray-50);
  }
  
  & .avatar {
    width: 36px;
    height: 36px;
    background: var(--color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  & .name {
    font-size: 0.9rem;
    color: var(--color-gray-700);
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-secondary);
  cursor: pointer;
  
  @media (max-width: 992px) {
    display: block;
  }
`

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useUser()

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#00a8e8"/>
            <path d="M12 6C8.69 6 6 8.69 6 12H8C8 9.79 9.79 8 12 8V6Z" fill="#00a8e8"/>
          </svg>
          <span>iAhorro</span>
        </Logo>

        <MobileMenuButton onClick={toggleMobileMenu}>
          ☰
        </MobileMenuButton>

        <Nav style={{ display: mobileMenuOpen ? 'flex' : 'none' }}>
          <NavList>
            <NavItem>
              <NavLink to="/hipotecas">Hipotecas</NavLink>
              <DropdownMenu>
                <DropdownItem to="/hipotecas">Nueva hipoteca</DropdownItem>
                <DropdownItem to="/hipotecas/mejorar-hipoteca">Mejorar hipoteca</DropdownItem>
                <DropdownItem to="/hipotecas/fijas">Hipotecas fijas</DropdownItem>
                <DropdownItem to="/hipotecas/variables">Hipotecas variables</DropdownItem>
                <DropdownItem to="/hipotecas/mixtas">Hipotecas mixtas</DropdownItem>
                <DropdownItem to="/hipotecas/jovenes">Para jóvenes</DropdownItem>
                <DropdownItem to="/hipotecas/autonomos">Para autónomos</DropdownItem>
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/calculadoras">Calculadoras</NavLink>
              <DropdownMenu>
                <DropdownItem to="/calculadoras/cuota-hipoteca">Cuota de hipoteca</DropdownItem>
                <DropdownItem to="/calculadoras/gastos-hipoteca">Gastos de hipoteca</DropdownItem>
                <DropdownItem to="/calculadoras/hipoteca-fija-o-mixta">Fija o mixta</DropdownItem>
                <DropdownItem to="/calculadoras/subrogacion">Subrogación</DropdownItem>
                <DropdownItem to="/calculadoras/amortizacion">Amortización</DropdownItem>
                <DropdownItem to="/calculadoras/que-casa-me-puedo-permitir">¿Qué casa me puedo permitir?</DropdownItem>
              </DropdownMenu>
            </NavItem>
            
            <NavItem>
              <NavLink to="/comparador-hipotecas">Comparador</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/euribor">Euríbor</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/blog">Blog</NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink to="/contacta-con-iahorro">Contacto</NavLink>
            </NavItem>
          </NavList>
        </Nav>

        <UserSection>
          {user ? (
            <>
              <UserProfile onClick={() => {}}>
                <div className="avatar">{user.nombre.charAt(0)}</div>
                <span className="name">{user.nombre}</span>
              </UserProfile>
              <LoginButton to="/" onClick={(e) => { e.preventDefault(); logout(); }}>
                Cerrar sesión
              </LoginButton>
            </>
          ) : (
            <>
              <LoginButton to="/login">Área de usuario</LoginButton>
            </>
          )}
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
