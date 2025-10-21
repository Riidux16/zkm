"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  image: string
  rating: number
  text: string
  industry?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María García",
    position: "Directora de Marketing",
    company: "TechSolutions",
    image: "/placeholder.svg?height=100&width=100&text=MG",
    rating: 5,
    text: "El chatbot de ZAKI transformó nuestra atención al cliente. Ahora respondemos consultas 24/7 y hemos aumentado nuestras conversiones en un 35%. La implementación fue rápida y el equipo de soporte es excelente.",
    industry: "Tecnología",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    position: "CEO",
    company: "Moda Express",
    image: "/placeholder.svg?height=100&width=100&text=CR",
    rating: 5,
    text: "Desde que implementamos el chatbot de ZAKI, nuestras ventas online han crecido un 28%. El chatbot no solo responde preguntas, sino que guía a los clientes en el proceso de compra. ¡Totalmente recomendado!",
    industry: "E-commerce",
  },
  {
    id: 3,
    name: "Laura Martínez",
    position: "Gerente de Ventas",
    company: "Inmobiliaria Futuro",
    image: "/placeholder.svg?height=100&width=100&text=LM",
    rating: 4,
    text: "Gracias a ZAKI hemos automatizado la calificación de leads, lo que nos permite enfocarnos solo en clientes realmente interesados. El ROI ha sido impresionante, recuperamos la inversión en menos de 3 meses.",
    industry: "Inmobiliaria",
  },
  {
    id: 4,
    name: "Javier López",
    position: "Director General",
    company: "Restaurantes Premium",
    image: "/placeholder.svg?height=100&width=100&text=JL",
    rating: 5,
    text: "El chatbot de ZAKI ha revolucionado nuestro sistema de reservas. Los clientes pueden reservar mesa a cualquier hora y recibir confirmación instantánea. El servicio de ZAKI es excepcional, siempre atentos a nuestras necesidades.",
    industry: "Hostelería",
  },
  {
    id: 5,
    name: "Ana Sánchez",
    position: "Directora de Operaciones",
    company: "HealthPlus",
    image: "/placeholder.svg?height=100&width=100&text=AS",
    rating: 5,
    text: "Implementamos el chatbot para gestionar citas médicas y ha sido un éxito total. Nuestros pacientes valoran poder programar visitas a cualquier hora del día. El equipo de ZAKI entendió perfectamente nuestras necesidades.",
    industry: "Salud",
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const nextTestimonial = () => {
    if (animating) return
    setAnimating(true)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setAnimating(false), 500)
  }

  const prevTestimonial = () => {
    if (animating) return
    setAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setAnimating(false), 500)
  }

  return (
    <section id="testimonials" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            TESTIMONIOS
          </span>
          <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Empresas de diversos sectores han mejorado su atención al cliente y aumentado sus ventas con nuestras
            soluciones.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Controles de navegación */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-primary-light hover:text-primary"
              onClick={prevTestimonial}
              disabled={animating}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Anterior</span>
            </Button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-primary-light hover:text-primary"
              onClick={nextTestimonial}
              disabled={animating}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>

          {/* Carrusel de testimonios */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3 flex flex-col items-center">
                        <div className="relative mb-4">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-light">
                            <img
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1 rounded-full">
                            <Quote className="h-4 w-4" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-center">{testimonial.name}</h3>
                        <p className="text-text-secondary text-center">{testimonial.position}</p>
                        <p className="text-primary font-medium text-center">{testimonial.company}</p>
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "text-accent fill-accent" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        {testimonial.industry && (
                          <span className="mt-2 text-xs bg-gray-100 text-text-secondary px-2 py-1 rounded-full">
                            {testimonial.industry}
                          </span>
                        )}
                      </div>
                      <div className="md:w-2/3">
                        <div className="relative">
                          <Quote className="h-8 w-8 text-primary-light absolute -top-4 -left-4 opacity-20" />
                          <p className="text-text-secondary italic leading-relaxed">{testimonial.text}</p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="bg-green-100 text-green-600 p-1 rounded">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <span className="ml-2 text-sm font-medium text-green-600">Resultados verificados</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-primary" : "bg-gray-300 hover:bg-primary-light"
                }`}
                onClick={() => {
                  if (!animating) {
                    setAnimating(true)
                    setActiveIndex(index)
                    setTimeout(() => setAnimating(false), 500)
                  }
                }}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Logos de clientes */}
        <div className="mt-20">
          <h3 className="text-center text-lg font-medium text-text-secondary mb-8">Empresas que confían en nosotros</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["TechSolutions", "Moda Express", "Inmobiliaria Futuro", "Restaurantes Premium", "HealthPlus"].map(
              (company, index) => (
                <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img src={`/placeholder.svg?height=40&width=120&text=${company}`} alt={company} className="h-10" />
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
