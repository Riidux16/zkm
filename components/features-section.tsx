"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { MessageSquare, BarChart, Users, Zap, Clock, Shield } from "lucide-react"
import ScrollLink from "./scroll-link"

interface FeatureTab {
  id: string
  label: string
  icon: React.ReactNode
  title: string
  description: string
  image: string
  benefits: string[]
}

const featureTabs: FeatureTab[] = [
  {
    id: "chatbot",
    label: "Chatbot IA",
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Chatbot Inteligente con IA Avanzada",
    description:
      "Nuestro chatbot utiliza inteligencia artificial avanzada para mantener conversaciones naturales con tus clientes, responder preguntas, calificar leads y programar demostraciones automáticamente.",
    image: "/images/chatbot-ia-avanzada.png",
    benefits: [
      "Atención al cliente 24/7",
      "Respuestas personalizadas",
      "Calificación automática de leads",
      "Integración con tu CRM",
      "Análisis de conversaciones",
    ],
  },
  {
    id: "analytics",
    label: "Análisis",
    icon: <BarChart className="h-5 w-5" />,
    title: "Análisis Detallado de Conversaciones",
    description:
      "Obtén insights valiosos sobre las interacciones con tus clientes. Nuestro panel de análisis te muestra patrones de comportamiento, preguntas frecuentes y oportunidades de mejora.",
    image: "/placeholder.svg?height=400&width=600&text=Dashboard+Analítico",
    benefits: [
      "Dashboard intuitivo",
      "Reportes personalizados",
      "Métricas de conversión",
      "Análisis de sentimiento",
      "Exportación de datos",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: <Users className="h-5 w-5" />,
    title: "Campañas de Marketing Digital Optimizadas",
    description:
      "Complementa tu chatbot con campañas de publicidad digital diseñadas para atraer tráfico cualificado. Optimizamos continuamente para maximizar tu ROI.",
    image: "/placeholder.svg?height=400&width=600&text=Marketing+Digital",
    benefits: [
      "Campañas en Google Ads",
      "Publicidad en redes sociales",
      "Remarketing inteligente",
      "Optimización continua",
      "Reportes de rendimiento",
    ],
  },
]

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("chatbot")

  return (
    <section id="features" className="py-20 bg-background-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            CARACTERÍSTICAS
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gradient">Soluciones Completas para tu Negocio</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Descubre cómo nuestras soluciones integradas pueden transformar la forma en que interactúas con tus
            clientes.
          </p>
        </div>

        <Tabs defaultValue="chatbot" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-background p-1">
              {featureTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center">
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {featureTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4 text-primary">{tab.title}</h3>
                  <p className="text-text-secondary mb-6">{tab.description}</p>

                  <div className="space-y-4 mb-8">
                    {tab.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-primary-light p-1 rounded-full mr-3 mt-1">
                          <svg
                            className="h-4 w-4 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <ScrollLink
                    href="#schedule"
                    className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover transition-colors hover-scale shadow-glow"
                  >
                    Solicitar Demostración
                  </ScrollLink>
                </div>

                <div className="order-1 md:order-2">
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow hover-scale">
                    <div className="relative">
                      <img
                        src={tab.image || "/placeholder.svg"}
                        alt={tab.title}
                        className="w-full h-auto object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 text-white">
                          <p className="font-medium">{tab.title}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover-scale">
            <div className="bg-primary-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Zap className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Implementación Rápida</h3>
            <p className="text-text-secondary">
              Ponemos tu chatbot en funcionamiento en menos de 7 días, con mínima intervención por tu parte.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover-scale">
            <div className="bg-primary-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Clock className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Soporte Continuo</h3>
            <p className="text-text-secondary">
              Nuestro equipo está disponible para ayudarte y realizar mejoras continuas en tu solución.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center hover-scale">
            <div className="bg-primary-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Shield className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary">Garantía de Resultados</h3>
            <p className="text-text-secondary">
              Si no ves resultados en los primeros 30 días, te devolvemos el 100% de tu inversión.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
