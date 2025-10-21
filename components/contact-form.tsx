"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
      isValid = false
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido"
      isValid = false
    }

    // Validar asunto
    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es obligatorio"
      isValid = false
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulación de envío de datos a un servidor
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mostrar mensaje de éxito
      setIsSubmitted(true)

      // En un caso real, aquí se enviarían los datos al servidor
      console.log("Datos de contacto enviados:", formData)

      // Resetear el formulario después de un tiempo
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="block text-sm font-medium text-text mb-1">
            Nombre
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
            placeholder="Tu nombre"
            disabled={isSubmitting || isSubmitted}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-text mb-1">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
            placeholder="tu@email.com"
            disabled={isSubmitting || isSubmitted}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="subject" className="block text-sm font-medium text-text mb-1">
          Asunto
        </Label>
        <Input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={errors.subject ? "border-red-500" : ""}
          placeholder="Asunto de tu mensaje"
          disabled={isSubmitting || isSubmitted}
        />
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
      </div>
      <div>
        <Label htmlFor="message" className="block text-sm font-medium text-text mb-1">
          Mensaje
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? "border-red-500" : ""}
          placeholder="¿Cómo podemos ayudarte?"
          disabled={isSubmitting || isSubmitted}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>
      <Button
        type="submit"
        className="w-full bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-hover transition-colors"
        disabled={isSubmitting || isSubmitted}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <span className="mr-2">Enviando</span>
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : isSubmitted ? (
          <div className="flex items-center justify-center">
            <CheckCircle className="mr-2 h-5 w-5" />
            <span>Mensaje Enviado</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Send className="mr-2 h-5 w-5" />
            <span>Enviar Mensaje</span>
          </div>
        )}
      </Button>
    </form>
  )
}
