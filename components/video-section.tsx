"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"
import ScrollLink from "./scroll-link"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Simular carga de video
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error al reproducir el video:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section id="video" className="py-20 bg-background-secondary" ref={containerRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            DEMOSTRACIÓN
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gradient">Mira cómo funciona en acción</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Observa cómo nuestro chatbot gestiona reservas, responde preguntas y convierte visitantes en clientes de
            forma automática.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative rounded-xl overflow-hidden shadow-2xl">
          {/* Video container con ratio de aspecto 16:9 */}
          <div className="relative" style={{ paddingBottom: "56.25%" }}>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              {/* Thumbnail del video */}
              <img
                src="/placeholder.svg?height=720&width=1280&text=Demo+Chatbot+Reservas"
                alt="Video thumbnail"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Video element */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                poster="/placeholder.svg?height=720&width=1280&text=Demo+Chatbot+Reservas"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                playsInline
              >
                {/* En un entorno real, aquí iría la URL del video */}
                <source src="https://example.com/video.mp4" type="video/mp4" />
                Tu navegador no soporta videos HTML5.
              </video>

              {/* Overlay con gradiente para mejorar legibilidad del botón */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
              ></div>

              {/* Botón de reproducción */}
              <button
                onClick={togglePlay}
                className={`absolute z-10 flex items-center justify-center transition-all duration-300 ${
                  isPlaying ? "opacity-0 scale-90 hover:opacity-100" : "opacity-100 scale-100 hover:scale-105"
                }`}
                aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
              >
                <div className="bg-primary text-white rounded-full p-5 shadow-lg hover:bg-primary-hover transition-colors">
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </div>
              </button>

              {/* Indicador de carga */}
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6">
            <h3 className="text-xl font-bold mb-2 text-primary">Ejemplo de reserva en restaurante</h3>
            <p className="text-text-secondary">
              En este video puedes ver cómo el chatbot atiende a un cliente que quiere hacer una reserva, le guía
              durante todo el proceso y confirma automáticamente su reserva sin intervención humana.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <ScrollLink
            href="#schedule"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover transition-colors shadow-glow hover-scale"
          >
            Agendar Llamada Orientativa
          </ScrollLink>
          <p className="text-sm text-text-secondary mt-3">
            <span className="font-bold">¡PLAZAS LIMITADAS!</span> Solo aceptamos 5 nuevos clientes esta semana
          </p>
        </div>
      </div>
    </section>
  )
}
