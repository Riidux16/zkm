import type React from "react"
import { DollarSign, Clock, TrendingUp, UserCheck } from "lucide-react"

interface BenefitProps {
  icon: React.ReactNode
  title: string
  description: string
}

function Benefit({ icon, title, description }: BenefitProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale">
      <div className="flex items-start">
        <div className="bg-primary-light p-3 rounded-full mr-4 shrink-0">{icon}</div>
        <div>
          <h3 className="text-xl font-bold mb-3 text-primary">{title}</h3>
          <p className="text-text-secondary">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            BENEFICIOS
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gradient">Problemas que resolvemos</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Nuestro chatbot inteligente soluciona los principales desafíos de atención al cliente que enfrentan las
            empresas hoy en día.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Benefit
            icon={<DollarSign className="h-6 w-6 text-primary" />}
            title="Ahorra en costes de personal"
            description="Reduce hasta un 70% los gastos en atención al cliente. Nuestro chatbot nunca se enferma, no toma vacaciones y trabaja 24/7 sin costes adicionales ni fallos humanos."
          />

          <Benefit
            icon={<Clock className="h-6 w-6 text-primary" />}
            title="Recupera tu tiempo"
            description="Delega las tareas repetitivas y libera hasta 30 horas semanales para enfocarte en lo que realmente importa: hacer crecer tu negocio y atender casos que requieren atención personalizada."
          />

          <Benefit
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            title="Aumenta tus ingresos"
            description="Incrementa tus ventas hasta un 35% gracias a la atención inmediata 24/7. El chatbot califica leads, responde dudas al instante y evita que los clientes potenciales abandonen tu web."
          />

          <Benefit
            icon={<UserCheck className="h-6 w-6 text-primary" />}
            title="Mejora la satisfacción del cliente"
            description="Respuestas instantáneas y consistentes que aumentan la satisfacción del cliente en un 40%. Elimina los tiempos de espera y ofrece una experiencia superior a tus usuarios."
          />
        </div>

        <div className="mt-16 bg-primary-light p-8 rounded-xl border-l-4 border-primary">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold mb-2 text-primary">¿Sabías que...?</h3>
              <p className="text-text-secondary">
                El 68% de los clientes abandona una web si no recibe respuesta en menos de 5 minutos. Con nuestro
                chatbot, tus clientes reciben atención instantánea, incluso fuera del horario laboral, aumentando
                drásticamente tus conversiones.
              </p>
            </div>
            <div className="md:w-1/4 mt-6 md:mt-0 md:text-right">
              <span className="text-5xl font-bold text-primary">68%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
