import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = 'https://mcp.supabase.com/mcp'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZXZlbG9wdGlvbnMiLCJpYXQiOjE2MjA2NjYwMDAsImV4cCI6MTkzNjIyMjAwMCwicmV0cmllbl90b2tlbiI6IiIsImF1ZCI6InN1cGFiYXNlLWtl eCIsImF0X2hhc2giOiJrb25nX3VybDEiLCJ0eXBlIjoiYW5vbiJ9._hN3JYOMt4YcY84i7d6XH3J2JLJqx4JQeQJyqJJJJ'

// Note: En producción, usar variables de entorno
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)

// Funciones útiles para interactuar con Supabase
export const getHipotecas = async () => {
  const { data, error } = await supabase
    .from('hipotecas')
    .select('*')
  
  if (error) {
    console.error('Error fetching hipotecas:', error)
    return []
  }
  return data || []
}

export const getSeguros = async () => {
  const { data, error } = await supabase
    .from('seguros')
    .select('*')
  
  if (error) {
    console.error('Error fetching seguros:', error)
    return []
  }
  return data || []
}

export const getBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  return data || []
}

export const insertSolicitud = async (solicitud: any) => {
  const { data, error } = await supabase
    .from('solicitudes')
    .insert([solicitud])
    .select()
  
  if (error) {
    console.error('Error inserting solicitud:', error)
    return null
  }
  return data?.[0] || null
}

// Datos mock para desarrollo (por si Supabase no está disponible)
export const mockHipotecas = [
  {
    id: '1',
    banco: 'BBVA',
    nombre: 'Hipoteca Variable BBVA',
    tipo: 'variable',
    interes: 1.85,
    euribor: '12 meses',
    diferencial: 0.85,
    cuota_mensual: 650,
    cantidad: 150000,
    plazos: [15, 20, 25, 30],
    comisiones: 'Sin comisión de apertura',
    vinculaciones: 'Nómina y seguro de hogar',
    logo: '/bancos/bbva.svg',
    destacada: true
  },
  {
    id: '2',
    banco: 'Santander',
    nombre: 'Hipoteca Fija Santander',
    tipo: 'fija',
    interes: 2.75,
    cuota_mensual: 720,
    cantidad: 150000,
    plazos: [15, 20, 25, 30],
    comisiones: '1% de apertura',
    vinculaciones: 'Nómina',
    logo: '/bancos/santander.svg',
    destacada: true
  },
  {
    id: '3',
    banco: 'CaixaBank',
    nombre: 'Hipoteca Mixta CaixaBank',
    tipo: 'mixta',
    interes_fijo: 2.25,
    interes_variable: 1.50,
    años_fijo: 10,
    cuota_mensual: 680,
    cantidad: 150000,
    plazos: [15, 20, 25, 30],
    comisiones: '0.5% de apertura',
    vinculaciones: 'Nómina y seguro de hogar',
    logo: '/bancos/caixabank.svg',
    destacada: false
  },
  {
    id: '4',
    banco: 'Bankinter',
    nombre: 'Hipoteca Sin Comisiones Bankinter',
    tipo: 'variable',
    interes: 1.70,
    euribor: '12 meses',
    diferencial: 0.70,
    cuota_mensual: 635,
    cantidad: 150000,
    plazos: [15, 20, 25, 30, 35],
    comisiones: 'Sin comisiones',
    vinculaciones: 'Nómina',
    logo: '/bancos/bankinter.svg',
    destacada: true
  },
  {
    id: '5',
    banco: 'Sabadell',
    nombre: 'Hipoteca Joven Sabadell',
    tipo: 'fija',
    interes: 2.50,
    cuota_mensual: 695,
    cantidad: 150000,
    plazos: [20, 25, 30],
    comisiones: '0.75% de apertura',
    vinculaciones: 'Nómina y seguro de hogar',
    logo: '/bancos/sabadell.svg',
    destacada: false,
    especial: 'jovenes'
  },
  {
    id: '6',
    banco: 'Openbank',
    nombre: 'Hipoteca Online Openbank',
    tipo: 'variable',
    interes: 1.90,
    euribor: '12 meses',
    diferencial: 0.90,
    cuota_mensual: 660,
    cantidad: 150000,
    plazos: [15, 20, 25, 30],
    comisiones: 'Sin comisión de apertura',
    vinculaciones: 'Ninguna',
    logo: '/bancos/openbank.svg',
    destacada: true,
    online: true
  }
]

export const mockSeguros = {
  hogar: [
    {
      id: '1',
      compania: 'Mapfre',
      nombre: 'Seguro de Hogar Básico',
      tipo: 'hogar',
      cobertura: 'Incendio, robos y daños por agua',
      precio: 250,
      periodo: 'anual',
      logo: '/companias/mapfre.svg'
    },
    {
      id: '2',
      compania: 'Allianz',
      nombre: 'Seguro de Hogar Completo',
      tipo: 'hogar',
      cobertura: 'Todo riesgo + responsabilidad civil',
      precio: 450,
      periodo: 'anual',
      logo: '/companias/allianz.svg'
    }
  ],
  coche: [
    {
      id: '1',
      compania: 'Generali',
      nombre: 'Seguro de Coche a Todo Riesgo',
      tipo: 'coche',
      cobertura: 'Todo riesgo con franquicia',
      precio: 800,
      periodo: 'anual',
      logo: '/companias/generali.svg'
    }
  ],
  vida: [
    {
      id: '1',
      compania: 'AXA',
      nombre: 'Seguro de Vida Familiar',
      tipo: 'vida',
      cobertura: 'Fallecimiento y accidentes',
      precio: 300,
      periodo: 'anual',
      logo: '/companias/axa.svg'
    }
  ]
}

export const mockBlogPosts = [
  {
    id: '1',
    titulo: '¿Cuál es el perfil ideal para solicitar una hipoteca?',
    slug: 'mejorar-valoracion-solicitar-hipoteca',
    categoria: 'Educación Financiera',
    resumo: 'Te contamos todo lo que deberías saber antes de pedir una hipoteca.',
    contenido: 'Contenido del artículo...',
    fecha: '2024-01-15',
    autor: 'Laura Martínez',
    imagen: '/blog/perfil-hipoteca.jpg'
  },
  {
    id: '2',
    titulo: '¿Alquilar o comprar una casa, qué es mejor?',
    slug: 'alquilar-comprar',
    categoria: 'Noticias',
    resumo: 'Analizamos los pros y contras de alquilar vs comprar una vivienda.',
    contenido: 'Contenido del artículo...',
    fecha: '2024-01-10',
    autor: 'Óscar Bueno',
    imagen: '/blog/alquilar-vs-comprar.jpg'
  },
  {
    id: '3',
    titulo: '¿Cuánto se tarda en pedir una hipoteca?',
    slug: 'tiempo-proceso-solicitud-hipoteca',
    categoria: 'Educación Financiera',
    resumo: 'Tiempos estimados para cada fase del proceso hipotecario.',
    contenido: 'Contenido del artículo...',
    fecha: '2024-01-05',
    autor: 'José Paino',
    imagen: '/blog/tiempo-hipoteca.jpg'
  }
]
