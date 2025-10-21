import { Check } from "lucide-react"
import ScrollLink from "./scroll-link"

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            PRECIOS
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gradient">Planes y Precios</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Soluciones flexibles para empresas de todos los tamaños. Todos nuestros planes incluyen soporte técnico y
            actualizaciones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Plan Básico */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-105 hover-scale">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold mb-1 text-primary">Básico</h3>
              <p className="text-text-light mb-4">Para pequeñas empresas</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-primary">€299</span>
                <span className="text-text-light ml-1">/mes</span>
              </div>
              <p className="text-sm text-text-light mt-2">+ €999 configuración inicial</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Chatbot personalizado</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Respuestas automáticas a preguntas frecuentes</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Captura de leads básica</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Mantenimiento mensual</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Soporte por email</span>
                </li>
              </ul>
              <div className="mt-6">
                <ScrollLink
                  href="#schedule"
                  className="block w-full py-3 px-4 bg-white border border-primary text-primary rounded-md text-center font-medium hover:bg-primary-light transition-colors"
                >
                  Solicitar Información
                </ScrollLink>
              </div>
            </div>
          </div>

          {/* Plan Profesional */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-primary transform scale-105 z-10 shadow-glow">
            <div className="bg-accent text-white text-center py-2 text-sm font-medium">RECOMENDADO</div>
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold mb-1 text-primary">Profesional</h3>
              <p className="text-text-light mb-4">Para empresas en crecimiento</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-primary">€499</span>
                <span className="text-text-light ml-1">/mes</span>
              </div>
              <p className="text-sm text-text-light mt-2">+ €1499 configuración inicial</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Todo lo del plan Básico</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Integración con CRM</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Calificación avanzada de leads</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Publicidad digital básica</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-accent">20% de descuento</strong> en publicidad los primeros 3 meses
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Soporte prioritario</span>
                </li>
              </ul>
              <div className="mt-6">
                <ScrollLink
                  href="#schedule"
                  className="block w-full py-3 px-4 bg-primary text-white rounded-md text-center font-medium hover:bg-primary-hover transition-colors hover-scale"
                >
                  Agendar Consulta
                </ScrollLink>
              </div>
            </div>
          </div>

          {/* Plan Empresarial */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-105 hover-scale">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold mb-1 text-primary">Empresarial</h3>
              <p className="text-text-light mb-4">Para grandes empresas</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-primary">€999</span>
                <span className="text-text-light ml-1">/mes</span>
              </div>
              <p className="text-sm text-text-light mt-2">+ €2499 configuración inicial</p>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Todo lo del plan Profesional</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Chatbot con IA avanzada</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Integración con múltiples plataformas</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Estrategia de publicidad completa</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-accent">20% de descuento</strong> en publicidad los primeros 3 meses
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>Soporte 24/7 y gestor de cuenta dedicado</span>
                </li>
              </ul>
              <div className="mt-6">
                <ScrollLink
                  href="#schedule"
                  className="block w-full py-3 px-4 bg-white border border-primary text-primary rounded-md text-center font-medium hover:bg-primary-light transition-colors"
                >
                  Solicitar Información
                </ScrollLink>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-text-secondary mb-4">
            ¿Necesitas una solución personalizada para tu empresa? Contáctanos para un plan a medida.
          </p>
          <ScrollLink
            href="#contact"
            className="inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors"
          >
            Contactar para plan personalizado
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </ScrollLink>
        </div>
      </div>
    </section>
  )
}
