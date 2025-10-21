"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Clock, Check, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Simulación de base de datos de reservas
const bookedSlots = [
  { date: "2025-05-23", time: "10:00" },
  { date: "2025-05-23", time: "15:00" },
  { date: "2025-05-24", time: "11:00" },
  { date: "2025-05-25", time: "14:00" },
  { date: "2025-05-26", time: "16:00" },
  { date: "2025-05-27", time: "09:00" },
]

// Horarios disponibles por defecto
const defaultTimeSlots = ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00"]

// Formato de fecha para mostrar
const formatDisplayDate = (date) => {
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Formato de fecha para comparar con reservas
const formatDateForComparison = (date) => {
  return date.toISOString().split("T")[0]
}

export default function ScheduleCall() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [formStep, setFormStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    needs: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
  })

  // Generar días del calendario para el mes actual
  useEffect(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Primer día del mes
    const firstDay = new Date(year, month, 1)
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0)

    // Día de la semana del primer día (0 = Domingo, 1 = Lunes, etc.)
    const firstDayOfWeek = firstDay.getDay()
    // Ajustar para que la semana comience en lunes (0 = Lunes, 6 = Domingo)
    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

    // Días del mes anterior para completar la primera semana
    const daysFromPrevMonth = []
    if (adjustedFirstDayOfWeek > 0) {
      const prevMonth = new Date(year, month, 0)
      const prevMonthDays = prevMonth.getDate()

      for (let i = prevMonthDays - adjustedFirstDayOfWeek + 1; i <= prevMonthDays; i++) {
        daysFromPrevMonth.push({
          date: new Date(year, month - 1, i),
          isCurrentMonth: false,
          isDisabled: true,
        })
      }
    }

    // Días del mes actual
    const daysInMonth = []
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      const today = new Date()

      // Deshabilitar días pasados y fines de semana
      const isPast = date < new Date(today.setHours(0, 0, 0, 0))
      const isWeekend = date.getDay() === 0 || date.getDay() === 6

      daysInMonth.push({
        date,
        isCurrentMonth: true,
        isDisabled: isPast || isWeekend,
      })
    }

    // Días del mes siguiente para completar la última semana
    const daysFromNextMonth = []
    const totalDaysShown = daysFromPrevMonth.length + daysInMonth.length
    const remainingDays = 42 - totalDaysShown // 6 semanas x 7 días = 42

    for (let i = 1; i <= remainingDays; i++) {
      daysFromNextMonth.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isDisabled: true,
      })
    }

    setCalendarDays([...daysFromPrevMonth, ...daysInMonth, ...daysFromNextMonth])
  }, [currentMonth])

  // Actualizar slots de tiempo disponibles cuando se selecciona una fecha
  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimeSlots([])
      return
    }

    const formattedSelectedDate = formatDateForComparison(selectedDate)

    // Filtrar los horarios ya reservados para la fecha seleccionada
    const bookedTimesForDate = bookedSlots
      .filter((slot) => slot.date === formattedSelectedDate)
      .map((slot) => slot.time)

    // Crear array de slots disponibles con su estado
    const availableSlots = defaultTimeSlots.map((time) => ({
      time,
      isBooked: bookedTimesForDate.includes(time),
    }))

    setAvailableTimeSlots(availableSlots)
    setSelectedTime(null) // Resetear la hora seleccionada
  }, [selectedDate])

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateSelect = (date) => {
    if (date.isDisabled) return
    setSelectedDate(date.date)
  }

  const handleTimeSelect = (time, isBooked) => {
    if (isBooked) return
    setSelectedTime(time)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
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

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio"
      isValid = false
    }

    // Validar empresa
    if (!formData.company.trim()) {
      newErrors.company = "El nombre de la empresa es obligatorio"
      isValid = false
    }

    // Validar sitio web
    if (!formData.website.trim()) {
      newErrors.website = "El sitio web es obligatorio"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm() || !selectedDate || !selectedTime) return

    setIsSubmitting(true)

    try {
      // Simulación de envío de datos a un servidor
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mostrar el paso de confirmación
      setFormStep(1)

      // En un caso real, aquí se enviarían los datos al servidor
      console.log("Datos enviados:", {
        ...formData,
        date: formatDisplayDate(selectedDate),
        time: selectedTime,
      })
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    // Opcional: resetear el formulario después de un tiempo
    setTimeout(() => {
      setFormStep(0)
      setSelectedDate(null)
      setSelectedTime(null)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        needs: "",
      })
    }, 500)
  }

  // Nombres de los días de la semana
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  return (
    <section id="schedule" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-light text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            AGENDA
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gradient">Agenda una Llamada Orientativa</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Reserva una consulta para descubrir cómo podemos ayudar a tu negocio.
            <span className="text-primary font-medium"> ¡Solo quedan </span>
            <span className="text-accent font-bold">5 espacios</span>
            <span className="text-primary font-medium"> disponibles esta semana!</span>
          </p>
        </div>

        {formStep === 0 ? (
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center text-primary">
                      <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                      Selecciona una fecha y hora
                    </h3>

                    {/* Calendario */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">
                          {currentMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
                        </h4>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={handlePrevMonth} className="h-8 w-8">
                            <span className="sr-only">Mes anterior</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </Button>
                          <Button variant="outline" size="icon" onClick={handleNextMonth} className="h-8 w-8">
                            <span className="sr-only">Mes siguiente</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Button>
                        </div>
                      </div>

                      {/* Días de la semana */}
                      <div className="grid grid-cols-7 gap-1 mb-1">
                        {weekDays.map((day) => (
                          <div key={day} className="text-center text-xs font-medium text-text-secondary py-1">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Días del mes */}
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, index) => {
                          // Verificar si hay citas para este día
                          const formattedDate = formatDateForComparison(day.date)
                          const hasBookings = bookedSlots.some((slot) => slot.date === formattedDate)

                          // Verificar si es el día seleccionado
                          const isSelected =
                            selectedDate &&
                            day.date.getDate() === selectedDate.getDate() &&
                            day.date.getMonth() === selectedDate.getMonth() &&
                            day.date.getFullYear() === selectedDate.getFullYear()

                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleDateSelect(day)}
                              disabled={day.isDisabled}
                              className={`
                                h-10 rounded-md flex items-center justify-center text-sm
                                ${day.isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-primary-light cursor-pointer"}
                                ${!day.isCurrentMonth ? "text-gray-400" : ""}
                                ${isSelected ? "bg-primary text-white hover:bg-primary" : ""}
                                ${hasBookings && !isSelected && day.isCurrentMonth && !day.isDisabled ? "border border-amber-400" : ""}
                              `}
                            >
                              <span>{day.date.getDate()}</span>
                              {hasBookings && !day.isDisabled && (
                                <span className="ml-1 h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Leyenda del calendario */}
                    <div className="flex flex-wrap gap-4 mb-6 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
                        <span>Seleccionado</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 border border-amber-400 rounded-full mr-1"></div>
                        <span>Algunas horas reservadas</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-200 rounded-full mr-1"></div>
                        <span>No disponible</span>
                      </div>
                    </div>

                    {/* Horarios disponibles */}
                    {selectedDate && (
                      <div>
                        <h4 className="font-medium mb-3">
                          Horarios disponibles para {formatDisplayDate(selectedDate)}:
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {availableTimeSlots.map((slot, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleTimeSelect(slot.time, slot.isBooked)}
                              disabled={slot.isBooked}
                              className={`
                                border rounded-md p-2 flex justify-center items-center transition-colors
                                ${
                                  slot.isBooked
                                    ? "bg-red-50 border-red-200 text-red-500 cursor-not-allowed"
                                    : selectedTime === slot.time
                                      ? "border-primary bg-primary-light text-primary"
                                      : "border-gray-200 hover:border-primary-light"
                                }
                              `}
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              {slot.time}
                              {slot.isBooked && <X className="h-4 w-4 ml-1 text-red-500" />}
                            </button>
                          ))}
                        </div>
                        {availableTimeSlots.length === 0 && (
                          <p className="text-center text-text-secondary mt-4">
                            No hay horarios disponibles para esta fecha.
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mt-6 bg-accent/10 p-3 rounded-md border-l-2 border-accent flex items-start">
                      <AlertTriangle className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />
                      <p className="text-sm text-text-secondary">
                        <span className="font-medium text-accent">¡Plazas limitadas!</span> Solo realizamos 5 consultas
                        gratuitas a la semana para garantizar la máxima calidad de atención.
                      </p>
                    </div>
                  </Card>
                </div>

                <div>
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-primary">Tus datos</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Tu nombre"
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+34 XXX XXX XXX"
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Nombre de tu empresa"
                          className={errors.company ? "border-red-500" : ""}
                        />
                        {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                      </div>
                      <div>
                        <Label htmlFor="website">Sitio web</Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="www.tuempresa.com"
                          className={errors.website ? "border-red-500" : ""}
                        />
                        {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
                      </div>
                      <div>
                        <Label htmlFor="needs">¿Qué necesitas? (opcional)</Label>
                        <Input
                          id="needs"
                          name="needs"
                          value={formData.needs}
                          onChange={handleInputChange}
                          placeholder="Cuéntanos brevemente qué necesitas"
                        />
                      </div>
                    </div>
                  </Card>

                  <Button
                    type="submit"
                    className="w-full mt-4 py-6 text-lg"
                    disabled={isSubmitting || !selectedDate || !selectedTime}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Procesando</span>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </>
                    ) : (
                      "Reservar Mi Consulta"
                    )}
                  </Button>

                  <p className="text-sm text-text-light mt-2 text-center">
                    Al reservar, aceptas nuestra política de privacidad y términos de servicio.
                  </p>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">¡Reserva Confirmada!</h3>
              <p className="text-text-secondary mb-6">
                Hemos reservado tu consulta para el {selectedDate && formatDisplayDate(selectedDate)} a las{" "}
                {selectedTime}.
              </p>
              <p className="text-text-secondary mb-6">
                Te hemos enviado un email de confirmación a <span className="font-medium">{formData.email}</span> con
                todos los detalles y el enlace para la videollamada.
              </p>
              <Button onClick={handleBackToHome} className="bg-primary hover:bg-primary-hover">
                Volver al Inicio
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
