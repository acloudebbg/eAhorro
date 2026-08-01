import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  nombre: string
  telefono?: string
  preferencias: {
    tipoHipoteca?: string
    presupuesto?: number
    provincia?: string
  }
}

interface UserContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  saveToFavorites: (productId: string, type: 'hipoteca' | 'seguro') => void
  removeFromFavorites: (productId: string) => void
  favorites: Set<string>
  searchHistory: string[]
  addToSearchHistory: (query: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Cargar datos del localStorage al montar
  useEffect(() => {
    const savedUser = localStorage.getItem('eahorro_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Error loading user from localStorage:', e)
      }
    }

    const savedFavorites = localStorage.getItem('eahorro_favorites')
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)))
      } catch (e) {
        console.error('Error loading favorites from localStorage:', e)
      }
    }

    const savedHistory = localStorage.getItem('eahorro_search_history')
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Error loading search history from localStorage:', e)
      }
    }
  }, [])

  // Guardar cambios en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('eahorro_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('eahorro_user')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('eahorro_favorites', JSON.stringify(Array.from(favorites)))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('eahorro_search_history', JSON.stringify(searchHistory))
  }, [searchHistory])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de login - en producción se conectaría a Supabase
    await new Promise(resolve => setTimeout(resolve, 500)) // Simular delay de API
    
    // Validación simple para demo
    if (email && password) {
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email,
        nombre: email.split('@')[0],
        preferencias: {}
      }
      setUser(mockUser)
      return true
    }
    return false
  }

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    // Simulación de registro
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (userData.email && userData.password) {
      const mockUser: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email: userData.email,
        nombre: userData.nombre || userData.email.split('@')[0],
        telefono: userData.telefono,
        preferencias: userData.preferencias || {}
      }
      setUser(mockUser)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  const saveToFavorites = (productId: string, type: 'hipoteca' | 'seguro') => {
    setFavorites(prev => new Set(prev).add(`${type}-${productId}`))
  }

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev)
      // Eliminar todas las variantes (por si hay tipo)
      for (const item of prev) {
        if (item.includes(productId)) {
          newSet.delete(item)
        }
      }
      return newSet
    })
  }

  const addToSearchHistory = (query: string) => {
    if (!query.trim()) return
    
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(q => q !== query)].slice(0, 10)
      return newHistory
    })
  }

  const value: UserContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    saveToFavorites,
    removeFromFavorites,
    favorites,
    searchHistory,
    addToSearchHistory
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
