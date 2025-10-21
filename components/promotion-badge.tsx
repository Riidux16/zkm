import { AlertTriangle } from "lucide-react"

interface PromotionBadgeProps {
  text: string
  className?: string
}

export default function PromotionBadge({ text, className = "" }: PromotionBadgeProps) {
  return (
    <div className={`fixed top-0 left-0 w-full bg-gradient-primary text-white py-2 z-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 mr-2 animate-pulse" />
          <p className="text-sm font-medium">{text}</p>
        </div>
      </div>
    </div>
  )
}
