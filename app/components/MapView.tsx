"use client"

import { useEffect, useRef } from "react"

interface Experiencia {
  id: number
  titulo: string
  rating: number
  reviews: number
  ubicacion: string
  precio: number
  coordenadas: [number, number]
  categoria: string
  duracion: string
  proveedor: string
  descripcion: string
  imagen: string
}

interface MapViewProps {
  experiencias: Experiencia[]
  onExperienciaSelect: (experiencia: Experiencia) => void
}

export default function MapView({ experiencias, onExperienciaSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const initMap = async () => {
      // Importar Leaflet dinámicamente
      const L = (await import("leaflet")).default

      // Configurar iconos por defecto de Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

      if (mapRef.current && !mapInstanceRef.current) {
        // Crear el mapa centrado en Buenos Aires
        const map = L.map(mapRef.current).setView([-34.6037, -58.3816], 12)

        // Agregar tiles del mapa
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        // Crear iconos personalizados para cada experiencia
        experiencias.forEach((experiencia) => {
          // Crear un div personalizado para el marcador
          const markerDiv = document.createElement("div")
          markerDiv.className = "custom-marker"
          markerDiv.innerHTML = `
            <div style="
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border: 2px solid rgba(59, 130, 246, 0.5);
              border-radius: 20px;
              padding: 8px 12px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              cursor: pointer;
              transition: all 0.2s ease;
              min-width: 80px;
              text-align: center;
            " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 20px rgba(0, 0, 0, 0.2)'" 
               onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(0, 0, 0, 0.15)'">
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                font-size: 12px;
                font-weight: 600;
                color: #1f2937;
              ">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                </svg>
                ${experiencia.rating}
              </div>
              <div style="
                font-size: 10px;
                color: #6b7280;
                margin-top: 2px;
                font-weight: 500;
              ">
                $${experiencia.precio}
              </div>
            </div>
          `

          // Crear icono personalizado
          const customIcon = L.divIcon({
            html: markerDiv.outerHTML,
            className: "custom-div-icon",
            iconSize: [80, 50],
            iconAnchor: [40, 50],
            popupAnchor: [0, -50],
          })

          // Agregar marcador al mapa
          const marker = L.marker(experiencia.coordenadas, { icon: customIcon })
            .addTo(map)
            .on("click", () => {
              onExperienciaSelect(experiencia)
            })

          // Agregar tooltip con información básica
          marker.bindTooltip(
            `
            <div style="text-align: center; font-family: system-ui;">
              <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">
                ${experiencia.titulo}
              </div>
              <div style="font-size: 12px; color: #6b7280;">
                ${experiencia.ubicacion} • ${experiencia.duracion}
              </div>
            </div>
          `,
            {
              direction: "top",
              offset: [0, -10],
              className: "custom-tooltip",
            },
          )
        })

        mapInstanceRef.current = map
      }
    }

    initMap()

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [experiencias, onExperienciaSelect])

  return (
    <>
      <div ref={mapRef} className="w-full h-full rounded-2xl overflow-hidden border border-white/30 shadow-lg" />

      {/* Estilos CSS para el mapa */}
      <style jsx global>{`
        .leaflet-container {
          background: #f8fafc !important;
        }
        
        .custom-div-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .custom-tooltip {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(229, 231, 235, 0.5) !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          color: #1f2937 !important;
        }
        
        .custom-tooltip::before {
          border-top-color: rgba(255, 255, 255, 0.95) !important;
        }
        
        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 16px !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        }
        
        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95) !important;
        }
        
        .leaflet-control-zoom a {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(229, 231, 235, 0.5) !important;
          color: #374151 !important;
        }
        
        .leaflet-control-zoom a:hover {
          background: rgba(255, 255, 255, 1) !important;
        }
      `}</style>
    </>
  )
}
