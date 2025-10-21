"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

type Message = {
  id: number
  text: string
  isUser: boolean
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "¡Hola! Soy el asistente virtual de ZKM Studio. ¿En qué puedo ayudarte hoy?",
    isUser: false,
  },
]

const botResponses: Record<string, string> = {
  servicios:
    "En ZKM Studio ofrecemos gestión de redes sociales, publicidad digital, estrategia de contenido y análisis de datos. ¿Sobre cuál te gustaría saber más?",
  precios:
    "Nuestros precios varían según las necesidades específicas de cada cliente. ¿Te gustaría programar una consulta gratuita para discutir un plan personalizado?",
  contacto:
    "Puedes contactarnos por email a info@zkmstudio.com o llamando al +34 123 456 789. También puedes usar el formulario de contacto en nuestra web.",
  hola: "¡Hola! ¿En qué puedo ayudarte hoy?",
  gracias: "¡De nada! Estamos aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?",
  adios: "¡Hasta pronto! No dudes en volver si tienes más preguntas.",
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { scrollToSection } = useSmoothScroll()

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Efecto de escritura para el primer mensaje
  useEffect(() => {
    if (messages.length === 1) {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
      }, 1000)
    }
  }, [])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Generar respuesta del bot
    setTimeout(() => {
      let botResponse = "Lo siento, no tengo información sobre eso. ¿Puedo ayudarte con algo más?"
      let shouldNavigate = false
      let navigationTarget = ""

      // Verificar si el usuario quiere agendar
      const lowercaseInput = input.toLowerCase()
      if (
        lowercaseInput.includes("agendar") ||
        lowercaseInput.includes("llamada") ||
        lowercaseInput.includes("consulta")
      ) {
        shouldNavigate = true
        navigationTarget = "schedule"
      }

      // Verificar si el usuario quiere ver precios
      if (lowercaseInput.includes("precio") || lowercaseInput.includes("costo") || lowercaseInput.includes("plan")) {
        shouldNavigate = true
        navigationTarget = "schedule"
      }

      // Verificar si el usuario quiere ver el video
      if (lowercaseInput.includes("video") || lowercaseInput.includes("demo") || lowercaseInput.includes("ver")) {
        shouldNavigate = true
        navigationTarget = "video"
      }

      // Buscar respuestas predefinidas
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (lowercaseInput.includes(keyword)) {
          botResponse = response
          break
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isUser: false,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      // Si se debe navegar, añadir un mensaje adicional y navegar
      if (shouldNavigate) {
        setTimeout(() => {
          setIsTyping(true)

          setTimeout(() => {
            const navigationMessage: Message = {
              id: messages.length + 3,
              text: "Te llevaré a la sección correspondiente...",
              isUser: false,
            }

            setMessages((prev) => [...prev, navigationMessage])
            setIsTyping(false)

            // Navegar a la sección después de un breve retraso
            setTimeout(() => {
              scrollToSection(navigationTarget)
              setIsOpen(false)
            }, 1000)
          }, 1000)
        }, 1000)
      }
    }, 1500)
  }

  return (
    <>
      {/* Botón del chat */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-primary text-white p-4 rounded-full shadow-glow hover:bg-primary-hover transition-all duration-300 z-50 ${
          isOpen ? "hidden" : "flex"
        } hover:scale-110`}
        aria-label="Abrir chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Widget del chat */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] flex flex-col shadow-xl z-50 overflow-hidden">
          {/* Cabecera del chat */}
          <div className="bg-gradient-primary text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Chat ZKM Studio</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-primary-hover rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mensajes del chat */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 max-w-[80%] ${message.isUser ? "ml-auto" : "mr-auto"} animate-fade-in`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.isUser
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white text-text rounded-bl-none shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {isTyping && (
              <div className="mb-4 max-w-[80%] mr-auto animate-fade-in">
                <div className="p-3 rounded-lg bg-white text-text rounded-bl-none shadow-sm">
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

            {/* Referencia para auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input del chat */}
          <div className="p-4 border-t bg-white">
            <div className="flex">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Escribe un mensaje..."
                className="flex-1 mr-2"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-primary hover:bg-primary-hover"
                disabled={isTyping || !input.trim()}
              >
                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mt-2 text-xs text-text-light text-center">
              Prueba preguntar sobre nuestros servicios, precios o agenda una llamada
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
