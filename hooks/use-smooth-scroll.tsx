"use client"

import { useCallback } from "react"

export function useSmoothScroll() {
  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Ajuste para el header fijo
        behavior: "smooth",
      })
    }
  }, [])

  return { scrollToSection }
}
