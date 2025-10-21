"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import ScrollLink from "./scroll-link"

export default function ChatbotDemo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const conversation = [
    {
      user: "Buenas, me interesaría hacer una reserva",
      bot: "¡Bienvenido a Restaurante La Terraza! 😊 ¿Para qué día deseas hacer tu reserva?",
    },
    {
      user: "Para este viernes a las 21:00",
      bot: "Perfecto. ¿Para cuántas personas sería la reserva?",
    },
    {
      user: "Para 4 personas",
      bot: "Excelente. Tenemos disponibilidad para 4 personas este viernes a las 21:00. ¿Me podrías facilitar tu nombre para la reserva?",
    },
    {
      user: "Carlos Rodríguez",
      bot: "Gracias Carlos. ¿Me podrías proporcionar un número de teléfono de contacto?",
    },
    {
      user: "612345678",
      bot: "Perfecto Carlos. He confirmado tu reserva para 4 personas este viernes a las 21:00 en Restaurante La Terraza. Te hemos enviado un SMS de confirmación al 612345678. ¿Necesitas algo más?",
    },
    {
      user: "No, gracias",
      bot: "¡Genial! Te esperamos este viernes. Si necesitas modificar o cancelar tu reserva, puedes hacerlo respondiendo al SMS o contactándonos directamente. ¡Que tengas un buen día! 👋",
    },
  ]

  useEffect(() => {
    if (currentStep < conversation.length) {
      // Mostrar mensaje del usuario
      const userTimeout = setTimeout(() => {
        // Simular escritura del bot
        setIsTyping(true)

        // Mostrar respuesta del bot después de un tiempo
        const botTimeout = setTimeout(() => {
          setIsTyping(false)

          // Pasar al siguiente paso después de mostrar la respuesta del bot
          const nextStepTimeout = setTimeout(() => {
            setCurrentStep((prev) => prev + 1)
          }, 2000)

          return () => clearTimeout(nextStepTimeout)
        }, 1500)

        return () => clearTimeout(botTimeout)
      }, 1000)

      return () => clearTimeout(userTimeout)
    }
  }, [currentStep, conversation.length])

  return (
    <section id="chatbot-demo" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            DEMOSTRACIÓN
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gradient">Así funciona nuestro chatbot</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Mira cómo el chatbot gestiona una reserva en un restaurante de forma natural y eficiente.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="p-4 shadow-xl">
            <div className="bg-primary text-white p-3 rounded-t-lg">
              <h3 className="font-medium">Restaurante La Terraza - Chat</h3>
            </div>

            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {conversation.slice(0, currentStep + 1).map((exchange, index) => (
                <div key={index}>
                  {/* Mensaje del usuario */}
                  <div className="flex justify-end mb-4">
                    <div className="bg-primary text-white p-3 rounded-lg rounded-tr-none max-w-[80%]">
                      {exchange.user}
                    </div>
                  </div>

                  {/* Mensaje del bot (solo si no es el último paso o si estamos escribiendo) */}
                  {(index < currentStep || (index === currentStep && !isTyping)) && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[80%]">
                        {exchange.bot}
                      </div>
                    </div>
                  )}

                  {/* Indicador de escritura */}
                  {index === currentStep && isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Si la conversación ha terminado, mostrar mensaje final */}
              {currentStep >= conversation.length && (
                <div className="text-center mt-8">
                  <p className="text-text-secondary mb-4">
                    Así de fácil es gestionar reservas con nuestro chatbot. Sin intervención humana, 24/7.
                  </p>
                  <ScrollLink
                    href="#schedule"
                    className="inline-flex items-center bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-hover transition-colors shadow-glow"
                  >
                    Quiero esto para mi negocio
                  </ScrollLink>
                </div>
              )}
            </div>

            {/* Input del chat (desactivado, solo visual) */}
            <div className="border-t p-3 flex">
              <input
                type="text"
                className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none bg-gray-50"
                placeholder="Escribe un mensaje..."
                disabled
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <ScrollLink
            href="#schedule"
            className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-hover transition-colors shadow-glow text-lg"
          >
            Agendar Llamada Orientativa
          </ScrollLink>
        </div>
      </div>
    </section>
  )
}
