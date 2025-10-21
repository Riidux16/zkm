import type React from "react"
import { Users, BarChart, Clock, Award } from "lucide-react"

interface StatProps {
  icon: React.ReactNode
  value: string
  label: string
  description: string
}

function Stat({ icon, value, label, description }: StatProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start">
        <div className="bg-primary-light p-3 rounded-full mr-4">{icon}</div>
        <div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-primary">{value}</span>
            <span className="ml-1 text-text-secondary">{label}</span>
          </div>
          <p className="text-text-secondary mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            RESULTADOS
          </span>
          <h2 className="text-3xl font-bold mb-4">Impacto real en tu negocio</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Nuestras soluciones generan resultados medibles y significativos para empresas de todos los tamaños.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stat
            icon={<Users className="h-6 w-6 text-primary" />}
            value="+35%"
            label="en promedio"
            description="Aumento en la tasa de conversión de visitantes a clientes"
          />
          <Stat
            icon={<BarChart className="h-6 w-6 text-primary" />}
            value="24/7"
            label="disponibilidad"
            description="Atención al cliente ininterrumpida todos los días del año"
          />
          <Stat
            icon={<Clock className="h-6 w-6 text-primary" />}
            value="-45%"
            label="de tiempo"
            description="Reducción en el tiempo de respuesta a consultas de clientes"
          />
          <Stat
            icon={<Award className="h-6 w-6 text-primary" />}
            value="+200"
            label="clientes"
            description="Empresas satisfechas con nuestras soluciones"
          />
        </div>
      </div>
    </section>
  )
}
