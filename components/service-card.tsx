import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  badge?: string
  isPrimary?: boolean
}

export default function ServiceCard({ icon: Icon, title, description, badge, isPrimary = false }: ServiceCardProps) {
  return (
    <div
      className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
        isPrimary ? "border-t-4 border-primary" : ""
      }`}
    >
      <div className="bg-primary-light p-3 rounded-full w-fit mb-6">
        <Icon className="text-primary h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-text-secondary mb-4">{description}</p>
      {badge && (
        <div className="text-sm font-medium text-primary">
          {badge.includes("DESCUENTO") ? (
            <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs mr-2">{badge}</span>
          ) : (
            badge
          )}
        </div>
      )}
    </div>
  )
}
