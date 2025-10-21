"use client"

import type React from "react"

import type { ReactNode } from "react"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

interface ScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function ScrollLink({ href, children, className = "", onClick }: ScrollLinkProps) {
  const { scrollToSection } = useSmoothScroll()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Extraer el ID de la sección del href (eliminar el #)
    const sectionId = href.replace("#", "")
    scrollToSection(sectionId)

    // Ejecutar onClick adicional si existe
    if (onClick) onClick()
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
