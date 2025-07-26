"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import {
  Search,
  MapPin,
  Star,
  Calendar,
  Clock,
  User,
  X,
  Filter,
  Map,
  ChevronRight,
  Heart,
  Share2,
  Bell,
  Settings,
  BarChart3,
  CreditCard,
  Wallet,
  Check,
  Shield,
  Coins,
  Stars,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const MapView = dynamic(() => import("./components/MapView"), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Cargando mapa...</div>,
})

// Datos mock de experiencias en Buenos Aires
const experiencias = [
  {
    "id": 1,
    "titulo": "Running Club en Palermo",
    "imagen": "/images/running.jpg",
    "rating": 4.8,
    "reviews": 120,
    "ubicacion": "Palermo",
    "precio": 2500,
    "categoria": "Running",
    "duracion": "1 hora",
    "proveedor": "Club Corré Buenos Aires",
    "descripcion": "Entrenamiento grupal de running en circuito urbano semanal.",
    "coordenadas": [-34.5782, -58.4251] as [number, number]
  },
  {
    "id": 2,
    "titulo": "Calistenia en Recoleta",
    "imagen": "/images/calistenia.jpeg",
    "rating": 4.6,
    "reviews": 85,
    "ubicacion": "Recoleta",
    "precio": 3000,
    "categoria": "Gym",
    "duracion": "50 minutos",
    "proveedor": "UrbanFit Trainer",
    "descripcion": "Clase guiada de calistenia al aire libre para fortalecer todo el cuerpo.",
    "coordenadas": [-34.5895, -58.3974] as [number, number]
  },
  {
    "id": 3,
    "titulo": "Entrenamiento personal en Belgrano",
    "imagen": "/images/personal_trainer.jpg",
    "rating": 4.9,
    "reviews": 200,
    "ubicacion": "Belgrano",
    "precio": 8500,
    "categoria": "Gym",
    "duracion": "1 hora",
    "proveedor": "Coach Strength BA",
    "descripcion": "Sesión personalizada con personal trainer adaptada a tus objetivos.",
    "coordenadas": [-34.5632, -58.4562] as [number, number]
  },
  {
    "id": 4,
    "titulo": "Clase de Hatha Yoga en Almagro",
    "imagen": "/images/yoga.jpg",
    "rating": 5.0,
    "reviews": 174,
    "ubicacion": "Almagro",
    "precio": 4500,
    "categoria": "Yoga",
    "duracion": "1 hora",
    "proveedor": "Yoga Buenos Aires",
    "descripcion": "Clase grupal de Hatha/Vinyasa en estudio céntrico.",
    "coordenadas": [-34.6085, -58.4217] as [number, number]
  },
  {
    "id": 5,
    "titulo": "Sesión de Pilates Reformer",
    "imagen": "/images/pilates.jpg",
    "rating": 4.7,
    "reviews": 95,
    "ubicacion": "Palermo",
    "precio": 6500,
    "categoria": "Pilates",
    "duracion": "50 minutos",
    "proveedor": "Pilates Studio Palermo",
    "descripcion": "Clase de Pilates con equipos Reformer para fortalecer core y flexibilidad.",
    "coordenadas": [-34.5830, -58.4246] as [number, number]
  },
  {
    "id": 6,
    "titulo": "Yoga Restaurativo en San Telmo",
    "imagen": "/images/mindfulness.jpeg",
    "rating": 4.5,
    "reviews": 60,
    "ubicacion": "San Telmo",
    "precio": 3500,
    "categoria": "Yoga",
    "duracion": "1 hora 15 minutos",
    "proveedor": "Mindful Yoga Studio",
    "descripcion": "Sesión de yoga restaurativo con meditación y técnicas de respiración.",
    "coordenadas": [-34.6206, -58.3732] as [number, number]
  },
  {
    "id": 7,
    "titulo": "Mat Pilates Grupal en Colegiales",
    "imagen": "/images/pilates.jpg",
    "rating": 5.0,
    "reviews": 37,
    "ubicacion": "Colegiales",
    "precio": 3800,
    "categoria": "Pilates",
    "duracion": "1 hora",
    "proveedor": "Pilates & Movement",
    "descripcion": "Clase grupal de Pilates en colchoneta enfocada en core y postura.",
    "coordenadas": [-34.5717, -58.4474] as [number, number]
  },
  {
    "id": 8,
    "titulo": "Entrenamientos HIIT en Caballito",
    "imagen": "/images/Hiit.jpeg",
    "rating": 4.8,
    "reviews": 50,
    "ubicacion": "Caballito",
    "precio": 4200,
    "categoria": "Gym",
    "duracion": "45 minutos",
    "proveedor": "HIIT Fitness BA",
    "descripcion": "Entrenamiento de alta intensidad en intervalos para quemar grasa y ganar fuerza.",
    "coordenadas": [-34.6186, -58.4406] as [number, number]
  },
  {
    "id": 9,
    "titulo": "Running Trail en San Nicolás",
    "imagen": "/images/Runnin2.jpeg",
    "rating": 4.6,
    "reviews": 40,
    "ubicacion": "San Nicolás",
    "precio": 3200,
    "categoria": "Running",
    "duracion": "1 hora 30 minutos",
    "proveedor": "Trail Runners BA",
    "descripcion": "Sesión de running urbano con técnicas de trail y exploración de la ciudad.",
    "coordenadas": [-34.6046, -58.3834] as [number, number]
  },
]

// Datos mock de reservas del usuario
const reservasUsuario = [
  {
    id: 1,
    experienciaId: 1,
    titulo: "Clase de Tango en San Telmo",
    fecha: "2024-01-15",
    hora: "18:00",
    estado: "terminada",
    participantes: 2,
    precio: 7000,
  },
  {
    id: 2,
    experienciaId: 3,
    titulo: "Tour Fotográfico por La Boca",
    fecha: "2024-01-20",
    hora: "14:00",
    estado: "terminada",
    participantes: 1,
    precio: 2800,
  },
  {
    id: 3,
    experienciaId: 6,
    titulo: "Cata de Vinos Argentinos",
    fecha: "2024-01-25",
    hora: "20:00",
    estado: "confirmada",
    participantes: 2,
    precio: 11000,
  },
  {
    id: 4,
    experienciaId: 2,
    titulo: "Taller de Cocina Argentina",
    fecha: "2024-01-28",
    hora: "15:00",
    estado: "confirmada",
    participantes: 1,
    precio: 4200,
  },
]

// Datos mock del usuario
const datosUsuario = {
  nombre: "Juan Pérez",
  email: "juan.perez@email.com",
  totalClases: 12,
  clasesPendientes: 2,
  clasesCompletadas: 10,
}

// Función para generar fechas disponibles
const generarFechasDisponibles = () => {
  const fechas: { [key: number]: { [key: string]: string[] } } = {}
  const hoy = new Date()

  for (let proveedorId = 1; proveedorId <= 6; proveedorId++) {
    fechas[proveedorId] = {}

    // Generar disponibilidad para los próximos 30 días
    for (let i = 1; i < 30; i++) {
      const fecha = new Date(hoy)
      fecha.setDate(hoy.getDate() + i)
      const fechaStr = fecha.toISOString().split("T")[0]

      // Algunos días tienen disponibilidad, otros no (más realista)
      if (i % 3 !== 0) {
        // 2 de cada 3 días tienen disponibilidad
        const horarios = []

        // Horarios según el tipo de actividad
        switch (proveedorId) {
          case 1: // Tango
            horarios.push("14:00", "16:00", "18:00", "20:00")
            break
          case 2: // Cocina
            horarios.push("10:00", "15:00", "19:00")
            break
          case 3: // Fotografía
            horarios.push("09:00", "14:00", "17:00")
            break
          case 4: // Yoga
            horarios.push("07:00", "08:00", "19:00")
            break
          case 5: // Cerámica
            horarios.push("10:00", "15:00", "17:00")
            break
          case 6: // Vinos
            horarios.push("18:00", "20:00", "21:00")
            break
        }

        // Remover algunos horarios aleatoriamente para simular reservas
        const horariosDisponibles = horarios.filter(() => Math.random() > 0.3)
        if (horariosDisponibles.length > 0) {
          fechas[proveedorId][fechaStr] = horariosDisponibles
        }
      }
    }
  }

  return fechas
}

const disponibilidadProveedores = generarFechasDisponibles()

const categorias = ["Todas", "Running", "Gym", "Yoga", "Pilates"]
const barrios = ["Todos", "Palermo", "Recoleta", "Belgrano", "Almagro", "San Telmo", "Colegiales", "Caballito", "San Nicolás"]

// Datos de experiencias para la sección descubrir (versión simplificada)
const experienciasDescubrir = [
  {
    "id": 1,
    "titulo": "Running Club en Palermo",
    "imagen": "/images/running.jpg",
    "categoria": "Running",
    "ubicacion": "Palermo",
    "precio": 2500,
    "icon": "🏃‍♂️"
  },
  {
    "id": 2,
    "titulo": "Clase de Hatha Yoga",
    "imagen": "/images/yoga.jpg",
    "categoria": "Yoga",
    "ubicacion": "Almagro",
    "precio": 4500,
    "icon": "🧘‍♀️"
  },
  {
    "id": 3,
    "titulo": "Mat Pilates Grupal",
    "imagen": "/images/yoga_puerto_madero.jpeg",
    "categoria": "Pilates",
    "ubicacion": "Colegiales",
    "precio": 3800,
    "icon": "🤸‍♀️"
  },
  {
    "id": 4,
    "titulo": "Entrenamiento Personal",
    "imagen": "/images/personal_trainer.jpg",
    "categoria": "Gym",
    "ubicacion": "Belgrano",
    "precio": 8500,
    "icon": "💪"
  },
  {
    "id": 5,
    "titulo": "Pilates Reformer",
    "imagen": "/images/pilates.jpg",
    "categoria": "Pilates",
    "ubicacion": "Palermo",
    "precio": 6500,
    "icon": "🏋️‍♀️"
  },
  {
    "id": 6,
    "titulo": "Entrenamientos HIIT",
    "imagen": "/images/Hiit.jpeg",
    "categoria": "Gym",
    "ubicacion": "Caballito",
    "precio": 4200,
    "icon": "🔥"
  },
  {
    "id": 7,
    "titulo": "Calistenia en Recoleta",
    "imagen": "/images/calistenia.jpeg",
    "categoria": "Gym",
    "ubicacion": "Recoleta",
    "precio": 3000,
    "icon": "🤸‍♂️"
  },
  {
    "id": 8,
    "titulo": "Yoga Restaurativo",
    "imagen": "/images/mindfulness.jpeg",
    "categoria": "Yoga",
    "ubicacion": "San Telmo",
    "precio": 3500,
    "icon": "🧠"
  }
]

// Datos de categorías para la sección descubrir
const categoriasDescubrir = [
  {
    id: "fitness",
    nombre: "Fitness",
    imagen: "/images/fitness_category.jpg",
    descripcion: "Mantente en forma con entrenamientos dinámicos",
    color: "from-red-400 to-pink-500",
    icon: "💪"
  },
  {
    id: "wellness",
    nombre: "Wellness",
    imagen: "/images/wellness_category.jpg",
    descripcion: "Relájate y encuentra tu equilibrio interior",
    color: "from-green-400 to-emerald-500",
    icon: "🧘‍♀️"
  },
  {
    id: "workshops",
    nombre: "Workshops",
    imagen: "/images/workshops_category.jpg",
    descripcion: "Aprende nuevas habilidades y desarrolla tu creatividad",
    color: "from-purple-400 to-indigo-500",
    icon: "🎨"
  },
  {
    id: "gastronomia",
    nombre: "Gastronomía",
    imagen: "/images/gastronomia_category.jpg",
    descripcion: "Descubre sabores únicos y experiencias culinarias",
    color: "from-orange-400 to-red-500",
    icon: "🍽️"
  },
  {
    id: "cultura",
    nombre: "Cultura",
    imagen: "/images/cultura_category.jpg",
    descripcion: "Sumérgete en arte, historia y tradiciones locales",
    color: "from-blue-400 to-cyan-500",
    icon: "🎭"
  }
]

export default function ExperienciasApp() {
  const [vistaActual, setVistaActual] = useState<"cliente" | "proveedor">("cliente")
  const [seccionActiva, setSeccionActiva] = useState<"inicio" | "mapa" | "perfil" | "descubrir">("inicio")

  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)
  const [experienciaSeleccionada, setExperienciaSeleccionada] = useState<any>(null)
  const [modalReserva, setModalReserva] = useState(false)
  const [reservaConfirmada, setReservaConfirmada] = useState(false)
  const [cargandoReserva, setCargandoReserva] = useState(false)
  const [experienciaMapaSeleccionada, setExperienciaMapaSeleccionada] = useState<any>(null)

  // Estados para el flujo de pago
  const [modalPago, setModalPago] = useState(false)
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState("")
  const [procesandoPago, setProcesandoPago] = useState(false)
  const [participantes, setParticipantes] = useState(1)

  // Filtros
  const [busqueda, setBusqueda] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas")
  const [barrioSeleccionado, setBarrioSeleccionado] = useState("Todos")
  const [favoritos, setFavoritos] = useState<number[]>([])

  const [fechaSeleccionada, setFechaSeleccionada] = useState("")
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("")

  // Estados para la sección descubrir (experiencias)
  const [experienciaDescubrirIndex, setExperienciaDescubrirIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([])
  const [experienciasLikeadas, setExperienciasLikeadas] = useState<number[]>([])
  const [descubrimientoCompletado, setDescubrimientoCompletado] = useState(false)
  const [filtrosPersonalizados, setFiltrosPersonalizados] = useState(false)
  const [experienciasPersonalizadas, setExperienciasPersonalizadas] = useState<any[]>([])

  // Estados para navbar scroll
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Controlar scroll del body cuando hay modales abiertos
  useEffect(() => {
    const hayModalAbierto = experienciaSeleccionada || modalReserva || modalPago

    if (hayModalAbierto) {
      // Deshabilitar scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Habilitar scroll
      document.body.style.overflow = 'unset'
    }

    // Cleanup: restaurar scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [experienciaSeleccionada, modalReserva, modalPago])

  // Controlar visibilidad de navbar en base al scroll
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      // Solo ocultar si hay scroll significativo (más de 10px)
      if (currentScrollY < 10) {
        setNavbarVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll hacia abajo - ocultar navbar
        setNavbarVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba - mostrar navbar
        setNavbarVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    // Agregar listener solo si no hay modales abiertos
    const hayModalAbierto = experienciaSeleccionada || modalReserva || modalPago
    if (!hayModalAbierto) {
      window.addEventListener('scroll', controlNavbar)
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY, experienciaSeleccionada, modalReserva, modalPago])

  // Filtrar experiencias
  const experienciasFiltradas = (() => {
    // Si hay filtros personalizados y experiencias likeadas específicas, mostrar esas primero
    if (filtrosPersonalizados && experienciasPersonalizadas.length > 0) {
      const experienciasLikeadasFiltradas = experienciasPersonalizadas.filter((exp) => {
        const coincideBusqueda =
          exp.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          exp.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
        const coincideBarrio = barrioSeleccionado === "Todos" || exp.ubicacion === barrioSeleccionado
        return coincideBusqueda && coincideBarrio
      })

      // Si hay búsqueda o filtro de barrio y no coinciden con las likeadas,
      // agregar también otras experiencias que coincidan
      if (busqueda || barrioSeleccionado !== "Todos") {
        const otrasExperiencias = experiencias.filter((exp) => {
          // Excluir las que ya están en experienciasPersonalizadas
          if (experienciasPersonalizadas.some(expPersonal => expPersonal.id === exp.id)) {
            return false
          }

          const coincideBusqueda =
            exp.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
            exp.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
          const coincideCategoria = categoriaSeleccionada === "Todas" || exp.categoria === categoriaSeleccionada
          const coincideBarrio = barrioSeleccionado === "Todos" || exp.ubicacion === barrioSeleccionado

          return coincideBusqueda && coincideCategoria && coincideBarrio
        })

        return [...experienciasLikeadasFiltradas, ...otrasExperiencias]
      }

      return experienciasLikeadasFiltradas
    }

    // Filtrado normal cuando no hay personalización
    return experiencias.filter((exp) => {
      const coincideBusqueda =
        exp.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        exp.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
      const coincideCategoria = categoriaSeleccionada === "Todas" || exp.categoria === categoriaSeleccionada
      const coincideBarrio = barrioSeleccionado === "Todos" || exp.ubicacion === barrioSeleccionado

      return coincideBusqueda && coincideCategoria && coincideBarrio
    })
  })()

  const obtenerDisponibilidad = (experienciaId: number, fecha: string) => {
    return disponibilidadProveedores[experienciaId]?.[fecha] || []
  }

  const obtenerProximasSemanas = () => {
    const fechas = []
    const hoy = new Date()
    for (let i = 1; i < 30; i++) {
      const fecha = new Date(hoy)
      fecha.setDate(hoy.getDate() + i)
      fechas.push(fecha.toISOString().split("T")[0])
    }
    return fechas
  }

  const calcularTotal = () => {
    return experienciaSeleccionada ? experienciaSeleccionada.precio * participantes : 0
  }

  const toggleFavorito = (experienciaId: number, e: React.MouseEvent) => {
    e.stopPropagation() // Evitar que se abra el modal de la experiencia
    setFavoritos(prev =>
      prev.includes(experienciaId)
        ? prev.filter(id => id !== experienciaId)
        : [...prev, experienciaId]
    )
  }

  const handleReservar = async () => {
    setCargandoReserva(true)
    // Simular validación
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCargandoReserva(false)
    setModalReserva(false)
    setModalPago(true)
  }

  const handleConfirmarPago = async () => {
    setProcesandoPago(true)
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setProcesandoPago(false)
    setModalPago(false)
    setReservaConfirmada(true)

    // Limpiar estados
    setFechaSeleccionada("")
    setHorarioSeleccionado("")
    setMetodoPagoSeleccionado("")
    setParticipantes(1)
    setExperienciaSeleccionada(null)

    // Redirigir a la página principal después de mostrar el toast
    setTimeout(() => {
      setReservaConfirmada(false)
      setSeccionActiva("inicio")
    }, 3000)
  }

  const handleSwipeExperiencia = (direction: "left" | "right") => {
    const experienciaActual = experienciasDescubrir[experienciaDescubrirIndex]
    setSwipeDirection(direction)

    // Agregar a las listas correspondientes
    if (direction === "right") {
      setExperienciasLikeadas(prev => [...prev, experienciaActual.id])
      // Agregar categoría si no está ya incluida
      if (!categoriasSeleccionadas.includes(experienciaActual.categoria)) {
        setCategoriasSeleccionadas(prev => [...prev, experienciaActual.categoria])
      }
    }

    setTimeout(() => {
      if (experienciaDescubrirIndex < experienciasDescubrir.length - 1) {
        setExperienciaDescubrirIndex(prev => prev + 1)
      } else {
        // Completar descubrimiento y aplicar filtros
        setDescubrimientoCompletado(true)
        setTimeout(() => {
          aplicarFiltrosPersonalizados()
        }, 2000)
      }
      setSwipeDirection(null)
    }, 300)
  }

  const aplicarFiltrosPersonalizados = () => {
    // Obtener las experiencias específicas que fueron likeadas
    const experienciasLikeadasEspecificas = experienciasDescubrir.filter(exp =>
      experienciasLikeadas.includes(exp.id)
    )

    // Encontrar las experiencias completas correspondientes
    const experienciasCompletasLikeadas = experiencias.filter(exp =>
      experienciasLikeadas.includes(exp.id)
    )

    // Guardar las experiencias personalizadas
    setExperienciasPersonalizadas(experienciasCompletasLikeadas)

    // Aplicar filtros basados en las categorías de las experiencias seleccionadas
    if (categoriasSeleccionadas.length > 0 || experienciasLikeadas.length > 0) {
      setFiltrosPersonalizados(true)
    }

    // Resetear estado de descubrimiento
    setExperienciaDescubrirIndex(0)
    setDescubrimientoCompletado(false)

    // Volver al inicio
    setSeccionActiva("inicio")
  }

  const resetearFiltros = () => {
    setCategoriaSeleccionada("Todas")
    setBarrioSeleccionado("Todos")
    setBusqueda("")
    setCategoriasSeleccionadas([])
    setExperienciasLikeadas([])
    setFiltrosPersonalizados(false)
    setExperienciasPersonalizadas([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Fondo con efectos */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-pink-100/20" />
      <div className="fixed inset-0 backdrop-blur-3xl" />

      {/* Navbar Superior */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: navbarVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/20"
      >
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/images/salidita.png" alt="Logo" className="w-[120px] h-auto md:w-[135px]" />
          </motion.div>
        </div>
      </motion.nav>

      {/* Contenido Principal */}
      <div className={`pt-16 relative z-10 ${experienciaSeleccionada ? "pb-4" : "pb-20"}`}>
        <AnimatePresence mode="wait">
          {vistaActual === "cliente" && seccionActiva === "inicio" && (
            <motion.div
              key="cliente-inicio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Banner Personalizado */}
              {filtrosPersonalizados && (
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="px-4 mb-4"
                >
                  <div className="relative overflow-hidden rounded-2xl p-4">
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Stars className="text-purple-600" size={24} />
                          <div>
                            <h3 className="font-bold text-gray-800">
                              {experienciasPersonalizadas.length > 0
                                ? "Actividades que te gustaron"
                                : "Personalizado para vos"
                              }
                            </h3>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={resetearFiltros}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                        >
                          Resetear
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Buscador y Filtros */}
              <div className="px-4 mb-6 mt-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-lg"
                >
                  <div className="relative mb-4">
                    <Search color="black" className="absolute left-4 top-1/2 transform -translate-y-1/2" size={20} />
                    <Input
                      placeholder="Encuentra tu próxima experiencia..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
                      className="bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40"
                    >
                      <Filter size={16} className="mr-2" />
                      Filtros
                    </Button>
                    {filtrosPersonalizados && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetearFiltros}
                        className="bg-red-100/50 backdrop-blur-sm border-red-200 hover:bg-red-100 text-red-700"
                      >
                        <X size={16} className="mr-2" />
                        Limpiar Filtros
                      </Button>
                    )}
                  </div>

                  <AnimatePresence>
                    {filtrosAbiertos && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div>
                          <label className="text-sm font-medium mb-2 block">Categoría</label>
                          <div className="flex flex-wrap gap-2">
                            {categorias.map((cat) => (
                              <Badge
                                key={cat}
                                variant={categoriaSeleccionada === cat ? "default" : "outline"}
                                className={`cursor-pointer ${categoriaSeleccionada === cat
                                  ? "bg-blue-500 text-white"
                                  : "bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40"
                                  }`}
                                onClick={() => setCategoriaSeleccionada(cat)}
                              >
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Barrio</label>
                          <div className="flex flex-wrap gap-2">
                            {barrios.map((barrio) => (
                              <Badge
                                key={barrio}
                                variant={barrioSeleccionado === barrio ? "default" : "outline"}
                                className={`cursor-pointer ${barrioSeleccionado === barrio
                                  ? "bg-blue-500 text-white"
                                  : "bg-white/30 backdrop-blur-sm border-white/40 hover:bg-white/40"
                                  }`}
                                onClick={() => setBarrioSeleccionado(barrio)}
                              >
                                {barrio}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Grid de Experiencias */}
              <div className="px-4">
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" layout>
                  {experienciasFiltradas.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/30 shadow-lg cursor-pointer"
                      onClick={() => setExperienciaSeleccionada(exp)}
                    >
                      <div className="relative">
                        <img
                          src={exp.imagen || "/placeholder.svg"}
                          alt={exp.titulo}
                          className="w-full h-48 object-cover"
                        />
                        {/* Indicador de actividad likeada */}
                        {experienciasPersonalizadas.some(expPersonal => expPersonal.id === exp.id) && (
                          <div className="absolute top-3 left-3">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                            >
                              <Stars size={12} />
                              Para vos
                            </motion.div>
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => toggleFavorito(exp.id, e)}
                            className="p-2 bg-white/20 backdrop-blur-md rounded-full border border-black/30"
                          >
                            <Heart
                              size={16}
                              className={favoritos.includes(exp.id)
                                ? "text-red-500 fill-red-500"
                                : "text-black hover:text-red-300"
                              }
                            />
                          </motion.button>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-white/90 text-gray-800">{exp.categoria}</Badge>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2">{exp.titulo}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="fill-yellow-400 text-yellow-400" size={16} />
                            <span className="text-sm font-medium">{exp.rating}</span>
                            <span className="text-sm text-gray-600">({exp.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-600">{exp.ubicacion}</span>
                          <Clock size={16} className="text-gray-500 ml-2" />
                          <span className="text-sm text-gray-600">{exp.duracion}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-blue-600">${exp.precio.toLocaleString()}</span>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}

          {seccionActiva === "mapa" && (
            <motion.div
              key="cliente-mapa"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 space-y-4 mt-4"
            >
              {/* Mapa más pequeño */}
              <div className="h-[400px] relative z-0">
                <MapView experiencias={experiencias} onExperienciaSelect={setExperienciaMapaSeleccionada} />
              </div>

              {/* Información de experiencia seleccionada debajo del mapa */}
              <AnimatePresence>
                {experienciaMapaSeleccionada && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{experienciaMapaSeleccionada.titulo}</h3>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="fill-yellow-400 text-yellow-400" size={16} />
                            <span className="font-semibold text-sm">{experienciaMapaSeleccionada.rating}</span>
                            <span className="text-gray-600 text-sm">
                              ({experienciaMapaSeleccionada.reviews} reseñas)
                            </span>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">{experienciaMapaSeleccionada.categoria}</Badge>
                        </div>
                      </div>
                      <button
                        onClick={() => setExperienciaMapaSeleccionada(null)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <X size={18} className="text-gray-600" />
                      </button>
                    </div>

                    <div className="flex gap-4 mb-4">
                      <img
                        src={experienciaMapaSeleccionada.imagen || "/placeholder.svg"}
                        alt={experienciaMapaSeleccionada.titulo}
                        className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                          {experienciaMapaSeleccionada.descripcion}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-600">{experienciaMapaSeleccionada.ubicacion}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-600">{experienciaMapaSeleccionada.duracion}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-600">{experienciaMapaSeleccionada.proveedor}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-2xl font-bold text-blue-600">
                        ${experienciaMapaSeleccionada.precio.toLocaleString()}
                      </span>
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => toggleFavorito(experienciaMapaSeleccionada.id, e)}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Heart
                            size={18}
                            className={favoritos.includes(experienciaMapaSeleccionada.id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-600 hover:text-red-400"
                            }
                          />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Share2 size={18} className="text-gray-600" />
                        </motion.button>
                        <Button
                          onClick={() => {
                            setExperienciaSeleccionada(experienciaMapaSeleccionada)
                            setExperienciaMapaSeleccionada(null)
                          }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg"
                        >
                          Reservar
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mensaje cuando no hay experiencia seleccionada */}
              {!experienciaMapaSeleccionada && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-8 text-center"
                >
                  <MapPin className="mx-auto mb-3 text-gray-400" size={48} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Explora el Mapa</h3>
                  <p className="text-gray-600">
                    Haz click en cualquier pin del mapa para ver los detalles de la experiencia
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {seccionActiva === "descubrir" && (
            <motion.div
              key="descubrir"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 mt-4 h-[calc(100vh-140px)] flex flex-col"
            >
              {!descubrimientoCompletado ? (
                <>
                  {/* Header */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center mb-6"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="relative">
                        <Stars className="text-purple-600" size={32} />
                      </div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Descubrir
                      </h2>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Matcheá con las actividades que te gustan para conocerte mejor
                    </p>
                  </motion.div>

                  {/* Cards Container */}
                  <div className="flex-1 relative flex items-center justify-center">
                    <div className="relative w-full max-w-sm h-[500px]">
                      {/* Stack de cartas de experiencias */}
                      {experienciasDescubrir
                        .slice(experienciaDescubrirIndex, experienciaDescubrirIndex + 3)
                        .map((experiencia, index) => {
                          const isTop = index === 0
                          const zIndex = 3 - index
                          const scale = 1 - index * 0.05
                          const yOffset = index * 10

                          return (
                            <motion.div
                              key={`${experiencia.id}-${experienciaDescubrirIndex}`}
                              className="absolute inset-0"
                              style={{ zIndex }}
                              initial={{ scale, y: yOffset }}
                              animate={{
                                scale,
                                y: yOffset,
                                x: isTop && swipeDirection ? (swipeDirection === "right" ? 300 : -300) : 0,
                                rotate: isTop && swipeDirection ? (swipeDirection === "right" ? 15 : -15) : 0,
                                opacity: isTop && swipeDirection ? 0 : 1
                              }}
                              transition={{ duration: 0.3 }}
                              drag={isTop ? "x" : false}
                              dragConstraints={{ left: -100, right: 100 }}
                              onDragEnd={(event, info: PanInfo) => {
                                if (Math.abs(info.offset.x) > 100) {
                                  handleSwipeExperiencia(info.offset.x > 0 ? "right" : "left")
                                }
                              }}
                              whileDrag={{ scale: 1.05 }}
                            >
                              <div className="w-full h-full bg-white/95 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
                                {/* Imagen de la experiencia */}
                                <div className="relative h-60">
                                  <img
                                    src={experiencia.imagen || "/placeholder.svg"}
                                    alt={experiencia.titulo}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                  {/* Precio y categoría */}
                                  <div className="absolute top-4 left-4">
                                    <Badge className="bg-white/90 text-gray-800 font-medium">
                                      {experiencia.categoria}
                                    </Badge>
                                  </div>

                                  {/* Indicadores de swipe */}
                                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                                    <div className="bg-red-500/20 backdrop-blur-md rounded-full p-3 border border-red-400/30">
                                      <ThumbsDown className="text-red-200" size={20} />
                                    </div>
                                    <div className="bg-green-500/20 backdrop-blur-md rounded-full p-3 border border-green-400/30">
                                      <ThumbsUp className="text-green-200" size={20} />
                                    </div>
                                  </div>
                                </div>

                                {/* Contenido simplificado */}
                                <div className="p-6 text-center">
                                  <div className="text-4xl mb-3">{experiencia.icon}</div>
                                  <h3 className="text-xl font-bold text-gray-900 mb-2">{experiencia.titulo}</h3>
                                  <div className="flex items-center justify-center gap-2 text-gray-600">
                                    <MapPin size={16} />
                                    <span className="text-sm">{experiencia.ubicacion}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex justify-center gap-8 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipeExperiencia("left")}
                      className="w-16 h-16 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center border-2 border-red-200 transition-colors"
                    >
                      <ThumbsDown className="text-red-500" size={24} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipeExperiencia("right")}
                      className="w-16 h-16 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center border-2 border-green-200 transition-colors"
                    >
                      <ThumbsUp className="text-green-500" size={24} />
                    </motion.button>
                  </div>

                  {/* Indicador de progreso */}
                  <div className="mt-4 flex justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                      <span className="text-sm text-gray-600">
                        {experienciaDescubrirIndex + 1} de {experienciasDescubrir.length}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* Pantalla de finalización */
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="text-6xl mb-6"
                  >
                    ✨
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    ¡Perfecto!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Hemos personalizado las experiencias según tus gustos
                  </p>
                  {categoriasSeleccionadas.length > 0 && (
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40 mb-6">
                      <p className="text-sm text-gray-700 mb-2">Te gustaron actividades de:</p>
                      <div className="flex gap-2 flex-wrap justify-center">
                        {categoriasSeleccionadas.map((categoria, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800">
                            {categoria}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-sm text-gray-500"
                  >
                    Aplicando personalización...
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

          {vistaActual === "proveedor" && (
            <motion.div
              key="proveedor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 mt-4"
            >
              {/* Dashboard Proveedor */}
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard de Proveedor</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="text-blue-500" size={20} />
                        <span className="text-sm font-medium">Reservas Hoy</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">12</p>
                    </div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="text-green-500" size={20} />
                        <span className="text-sm font-medium">Ingresos</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">$45.2K</p>
                    </div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="text-yellow-500" size={20} />
                        <span className="text-sm font-medium">Rating</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">4.8</p>
                    </div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="text-purple-500" size={20} />
                        <span className="text-sm font-medium">Notificaciones</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">3</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Próximas Reservas</h3>
                  <div className="space-y-3">
                    {[
                      { nombre: "María González", experiencia: "Clase de Tango", hora: "14:00", fecha: "Hoy" },
                      { nombre: "Carlos Ruiz", experiencia: "Taller de Cocina", hora: "16:30", fecha: "Hoy" },
                      { nombre: "Ana López", experiencia: "Tour Fotográfico", hora: "10:00", fecha: "Mañana" },
                    ].map((reserva, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-800">{reserva.nombre}</p>
                            <p className="text-sm text-gray-600">{reserva.experiencia}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-800">{reserva.fecha}</p>
                            <p className="text-sm text-gray-600">{reserva.hora}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {seccionActiva === "perfil" && (
            <motion.div
              key="cliente-perfil"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="px-4 space-y-6 mt-4"
            >
              {/* Información del Usuario */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16 border-3 border-white/40">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="text-xl font-bold">JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{datosUsuario.nombre}</h2>
                    <p className="text-gray-600">{datosUsuario.email}</p>
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-2 py-4 border border-white/40 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{datosUsuario.totalClases}</div>
                    <div className="text-sm text-gray-600">Total Experiencias</div>
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-2 pt-4 border border-white/40 text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">{datosUsuario.clasesPendientes}</div>
                    <div className="text-sm text-gray-600">Pendientes</div>
                  </div>
                  <div className="bg-white/30 backdrop-blur-sm rounded-xl p-2 pt-4 border border-white/40 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{datosUsuario.clasesCompletadas}</div>
                    <div className="text-sm text-gray-600">Completadas</div>
                  </div>
                </div>
              </motion.div>

              {/* Calendario de Reservas */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Mis Reservas</h3>

                {/* Mini Calendario */}
                <div className="bg-white/50 rounded-xl p-4 border border-gray-200 mb-4">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-gray-800">Agosto 2025</h4>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia) => (
                      <div key={dia} className="text-center text-xs font-medium text-gray-500 py-2">
                        {dia}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => {
                      const dia = i + 1
                      const fechaStr = `2024-01-${dia.toString().padStart(2, '0')}`
                      const tieneReserva = reservasUsuario.some(r => r.fecha === fechaStr)
                      const reserva = reservasUsuario.find(r => r.fecha === fechaStr)

                      return (
                        <div
                          key={dia}
                          className={`aspect-square p-1 rounded-lg text-sm font-medium transition-all relative flex items-center justify-center ${tieneReserva
                            ? reserva?.estado === 'confirmada'
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : "bg-orange-100 text-orange-800 border border-orange-300"
                            : "hover:bg-gray-100 text-gray-600"
                            }`}
                        >
                          {dia}
                          {tieneReserva && (
                            <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${reserva?.estado === 'confirmada' ? 'bg-green-500' : 'bg-orange-500'
                              }`}></div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Confirmada</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Terminadas</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Modal de Experiencia */}
        <AnimatePresence>
          {experienciaSeleccionada && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[30] flex items-end md:items-center justify-center p-4"
              onClick={() => setExperienciaSeleccionada(null)}
            >
              <motion.div
                initial={{ y: "100%", scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: "100%", scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/40 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={experienciaSeleccionada.imagen || "/placeholder.svg"}
                    alt={experienciaSeleccionada.titulo}
                    className="w-full h-64 object-cover rounded-t-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-3xl" />
                  <button
                    onClick={() => setExperienciaSeleccionada(null)}
                    className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full border border-white/30 text-white hover:bg-black/30 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-gray-800 font-medium">{experienciaSeleccionada.categoria}</Badge>
                  </div>
                </div>

                <div className="p-6 bg-white/90 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{experienciaSeleccionada.titulo}</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">{experienciaSeleccionada.descripcion}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="fill-yellow-400 text-yellow-400" size={18} />
                      <span className="font-semibold text-gray-900">{experienciaSeleccionada.rating}</span>
                      <span className="text-gray-600">({experienciaSeleccionada.reviews} reseñas)</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPin className="text-blue-600" size={18} />
                      </div>
                      <span className="text-gray-800 font-medium">{experienciaSeleccionada.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Clock className="text-green-600" size={18} />
                      </div>
                      <span className="text-gray-800 font-medium">{experienciaSeleccionada.duracion}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <User className="text-purple-600" size={18} />
                      </div>
                      <span className="text-gray-800 font-medium">{experienciaSeleccionada.proveedor}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-blue-600">
                      ${experienciaSeleccionada.precio.toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition-colors"
                      >
                        <Share2 size={18} className="text-gray-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => toggleFavorito(experienciaSeleccionada.id, e)}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-200 transition-colors"
                      >
                        <Heart
                          size={18}
                          className={favoritos.includes(experienciaSeleccionada.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-600 hover:text-red-400"
                          }
                        />
                      </motion.button>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setModalReserva(true)
                      setFechaSeleccionada("")
                      setHorarioSeleccionado("")
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl text-lg shadow-lg"
                  >
                    Ver Disponibilidad y Reservar
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de Reserva con Calendario */}
        <AnimatePresence>
          {modalReserva && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/40 shadow-2xl"
              >
                {cargandoReserva ? (
                  <div className="text-center py-12 px-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-lg font-semibold text-gray-800">Validando disponibilidad...</p>
                    <p className="text-sm text-gray-600 mt-2">Preparando tu reserva</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Seleccionar Fecha y Hora</h3>
                      <button
                        onClick={() => setModalReserva(false)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <X size={18} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Calendario mejorado */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Seleccionar Fecha</h4>
                      <div className="bg-white/50 rounded-xl p-4 border border-gray-200">
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia) => (
                            <div key={dia} className="text-center text-xs font-medium text-gray-500 py-2">
                              {dia}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 max-h-64 overflow-y-auto">
                          {obtenerProximasSemanas()
                            .slice(0, 28)
                            .map((fecha) => {
                              const disponibilidad = obtenerDisponibilidad(experienciaSeleccionada?.id, fecha)
                              const fechaObj = new Date(fecha)
                              const esDisponible = disponibilidad.length > 0
                              const esHoy = fecha === new Date().toISOString().split("T")[0]

                              return (
                                <motion.button
                                  key={fecha}
                                  whileHover={esDisponible ? { scale: 1.05 } : {}}
                                  whileTap={esDisponible ? { scale: 0.95 } : {}}
                                  onClick={() => esDisponible && setFechaSeleccionada(fecha)}
                                  disabled={!esDisponible}
                                  className={`aspect-square p-1 rounded-lg text-sm font-medium transition-all relative ${fechaSeleccionada === fecha
                                    ? "bg-blue-500 text-white shadow-lg"
                                    : esDisponible
                                      ? "bg-white hover:bg-blue-50 text-gray-800 border border-gray-200 hover:border-blue-300"
                                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    } ${esHoy ? "ring-2 ring-orange-400" : ""}`}
                                >
                                  <div className="text-center">{fechaObj.getDate()}</div>
                                  {esDisponible && (
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full"></div>
                                  )}
                                </motion.button>
                              )
                            })}
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span>Disponible</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <span>No disponible</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 border-2 border-orange-400 rounded-full"></div>
                            <span>Hoy</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Horarios */}
                    {fechaSeleccionada && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mb-6"
                      >
                        <h4 className="font-semibold text-gray-800 mb-3">Horarios Disponibles</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {obtenerDisponibilidad(experienciaSeleccionada?.id, fechaSeleccionada).map((horario) => (
                            <motion.button
                              key={horario}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setHorarioSeleccionado(horario)}
                              className={`p-3 rounded-xl border text-sm font-medium transition-all ${horarioSeleccionado === horario
                                ? "bg-green-500 text-white shadow-lg"
                                : "bg-white/80 text-gray-800 border-gray-200 hover:bg-green-50 hover:border-green-300"
                                }`}
                            >
                              {horario}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Participantes - Nuevo diseño */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <User className="text-gray-700" size={20} />
                        <label className="text-lg font-semibold text-gray-800">Número de Personas</label>
                      </div>
                      <div className="flex items-center justify-center gap-6">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setParticipantes(Math.max(1, participantes - 1))}
                          disabled={participantes <= 1}
                          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-xl transition-all ${participantes <= 1
                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                            : "border-blue-500 text-blue-500 hover:bg-blue-50"
                            }`}
                        >
                          −
                        </motion.button>
                        <div className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">{participantes}</div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setParticipantes(Math.min(10, participantes + 1))}
                          disabled={participantes >= 10}
                          className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-bold text-xl transition-all ${participantes >= 10
                            ? "border-gray-200 text-gray-400 cursor-not-allowed"
                            : "border-blue-500 text-blue-500 hover:bg-blue-50"
                            }`}
                        >
                          +
                        </motion.button>
                      </div>
                    </div>

                    {/* Resumen */}
                    {fechaSeleccionada && horarioSeleccionado && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200"
                      >
                        <h5 className="font-semibold text-gray-800 mb-2">Resumen de Reserva</h5>
                        <div className="space-y-1 text-sm text-gray-700">
                          <p>
                            <span className="font-medium">Experiencia:</span> {experienciaSeleccionada?.titulo}
                          </p>
                          <p>
                            <span className="font-medium">Fecha:</span>{" "}
                            {new Date(fechaSeleccionada).toLocaleDateString("es-AR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p>
                            <span className="font-medium">Horario:</span> {horarioSeleccionado}
                          </p>
                          <p>
                            <span className="font-medium">Participantes:</span> {participantes}
                          </p>
                          <p>
                            <span className="font-medium">Duración:</span> {experienciaSeleccionada?.duracion}
                          </p>
                          <p>
                            <span className="font-medium">Ubicación:</span> {experienciaSeleccionada?.ubicacion}
                          </p>
                          <div className="border-t border-blue-300 pt-2 mt-2">
                            <p className="font-bold text-blue-800">
                              <span className="font-medium">Total:</span> ${calcularTotal().toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Botones */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setModalReserva(false)}
                        className="flex-1 bg-white/80 border-gray-200 hover:bg-gray-50 text-gray-700"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleReservar}
                        disabled={!fechaSeleccionada || !horarioSeleccionado}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuar al Pago
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de Pago */}
        <AnimatePresence>
          {modalPago && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/40 shadow-2xl"
              >
                {procesandoPago ? (
                  <div className="text-center py-16 px-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Procesando Pago</h3>
                    <p className="text-gray-600 mb-4">Conectando con MercadoPago...</p>
                    <div className="bg-gray-100 rounded-xl p-4 mx-4">
                      <img src="/images/mp.png" alt="MercadoPago" className="w-full h-32" />
                    </div>
                    <p className="text-sm text-gray-500 mt-4">Pago seguro procesado por MercadoPago</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-gray-700" size={24} />
                        <h3 className="text-xl font-bold text-gray-900">Método de Pago</h3>
                      </div>
                      <button
                        onClick={() => setModalPago(false)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <X size={18} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Opciones de Pago */}
                    <div className="space-y-3 mb-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMetodoPagoSeleccionado("tarjeta")}
                        className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${metodoPagoSeleccionado === "tarjeta"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                      >
                        <CreditCard className="text-gray-600" size={20} />
                        <span className="font-medium text-gray-800">Tarjeta de Crédito/Débito</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMetodoPagoSeleccionado("mercadopago")}
                        className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${metodoPagoSeleccionado === "mercadopago"
                          ? "border-blue-500 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                      >
                        <Wallet
                          className={metodoPagoSeleccionado === "mercadopago" ? "text-white" : "text-gray-600"}
                          size={20}
                        />
                        <span
                          className={`font-medium ${metodoPagoSeleccionado === "mercadopago" ? "text-white" : "text-gray-800"}`}
                        >
                          Cuenta MercadoPago
                        </span>
                      </motion.button>
                    </div>

                    {/* Información de Seguridad */}
                    <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
                      <p className="text-gray-700 text-sm mb-3">
                        Serás redirigido a MercadoPago para completar el pago de forma segura.
                      </p>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-600" size={16} />
                        <span className="text-green-700 text-sm font-medium">Pago 100% seguro y protegido</span>
                      </div>
                    </div>

                    {/* Resumen del Pago */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <h5 className="font-semibold text-gray-800 mb-3">Resumen del Pago</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Experiencia:</span>
                          <span className="font-medium text-gray-800">{experienciaSeleccionada?.titulo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Participantes:</span>
                          <span className="font-medium text-gray-800">{participantes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Precio por persona:</span>
                          <span className="font-medium text-gray-800">
                            ${experienciaSeleccionada?.precio.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold text-gray-800">Total:</span>
                            <span className="font-bold text-blue-600 text-lg">${calcularTotal().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botón de Confirmar Pago */}
                    <Button
                      onClick={handleConfirmarPago}
                      disabled={!metodoPagoSeleccionado}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Shield size={20} />
                        <span>Confirmar Pago - ${calcularTotal().toLocaleString()}</span>
                      </div>
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      Al confirmar, aceptas nuestros términos y condiciones
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notificación de Reserva Confirmada */}
        <AnimatePresence>
          {reservaConfirmada && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="fixed top-24 left-4 right-4 z-50"
            >
              <div className="bg-green-500/90 backdrop-blur-xl text-white p-4 rounded-2xl border border-green-400/30 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</div>
                  <div>
                    <p className="font-semibold">¡Reserva Confirmada!</p>
                    <p className="text-sm opacity-90">Te enviaremos los detalles por email</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navegación Inferior */}
        <AnimatePresence>
          {!experienciaSeleccionada && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 bg-transparent p-4 z-50"
            >
              <div className="flex justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSeccionActiva("inicio")}
                  className={`p-3 rounded-full ${seccionActiva === "inicio"
                    ? "bg-blue-500 text-white"
                    : "bg-white/20 backdrop-blur-sm border border-white/30"
                    }`}
                >
                  <Search size={32} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSeccionActiva("mapa")}
                  className={`p-3 rounded-full ${seccionActiva === "mapa"
                    ? "bg-blue-500 text-white"
                    : "bg-white/20 backdrop-blur-sm border border-white/30"
                    }`}
                >
                  <Map size={32} />
                </motion.button>

                {/* Botón Descubrir con estilo Apple Intelligence */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSeccionActiva("descubrir")}
                  className={`relative p-3 rounded-full overflow-hidden ${seccionActiva === "descubrir"
                    ? "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white"
                    : "bg-white/20 backdrop-blur-sm"
                    }`}
                >
                  {seccionActiva !== "descubrir" && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(from 0deg, #ff0080, #7928ca, #0099ff, #00ff88, #ffcc00, #ff0080)",
                        padding: "2px",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "exclude",
                        maskComposite: "exclude"
                      }}
                    />
                  )}
                  <div className={`relative z-10 ${seccionActiva === "descubrir" ? "text-white" : ""}`}>
                    <Stars
                      size={32}
                      className={seccionActiva === "descubrir" ? "text-white" : "text-purple-600"}
                    />
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSeccionActiva("perfil")}
                  className={`p-3 rounded-full ${seccionActiva === "perfil"
                    ? "bg-blue-500 text-white"
                    : "bg-white/20 backdrop-blur-sm border border-white/30"
                    }`}
                >
                  <User size={32} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
