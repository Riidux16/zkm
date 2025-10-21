import { Zap, ArrowRight } from "lucide-react"
import ScrollLink from "./scroll-link"

export default function HookService() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-6">
              <div className="bg-primary-light p-3 rounded-full mr-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gradient">Chatbot Inteligente Personalizado</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-accent/5 p-4 rounded-lg mb-8 border-l-4 border-accent">
                  <p className="font-medium text-accent">SERVICIO PREMIUM</p>
                  <p className="text-text-secondary mt-1">
                    Implementamos un chatbot personalizado en tu web que se adapta perfectamente a tu marca y
                    necesidades específicas.
                  </p>
                </div>

                <h3 className="text-xl font-bold mb-4 text-primary">¿Qué incluye?</h3>
                <ul className="space-y-3">
                  {[
                    "Chatbot personalizado con tu marca",
                    "Respuestas automáticas a preguntas frecuentes",
                    "Captura de datos de contacto",
                    "Informes de rendimiento mensuales",
                    "Configuración profesional",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-primary mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <img
                    src="/images/chatbot-ia-avanzada.png"
                    alt="Chatbot Inteligente ZKM Studio"
                    className="rounded-lg mb-6 shadow-md"
                  />

                  <h3 className="text-xl font-bold mb-4 text-primary">¿Por qué elegirlo?</h3>
                  <ul className="space-y-3">
                    {[
                      "Atención al cliente 24/7",
                      "Aumento de conversiones",
                      "Resultados inmediatos",
                      "Soporte técnico incluido",
                      "Aumenta ventas mientras duermes",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-primary mr-2 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-text-secondary mb-2">
                <span className="font-bold text-accent">¡PLAZAS LIMITADAS!</span> Solo aceptamos 5 nuevos clientes por
                semana
              </p>
              <ScrollLink
                href="#schedule"
                className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-md font-medium hover:bg-primary-hover transition-colors hover-scale shadow-glow text-lg"
              >
                Solicitar Información
                <ArrowRight className="ml-2 h-5 w-5" />
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
