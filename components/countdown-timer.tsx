"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  endDate: Date
  title: string
  description: string
}

export default function CountdownTimer({ endDate, title, description }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +endDate - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-primary-light">
      <div className="flex items-center mb-4">
        <Clock className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-bold text-primary">{title}</h3>
      </div>

      <p className="text-text-secondary mb-4">{description}</p>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-primary-light p-3 rounded-md">
          <div className="text-2xl font-bold text-primary">{formatNumber(timeLeft.days)}</div>
          <div className="text-xs text-text-secondary">Días</div>
        </div>
        <div className="bg-primary-light p-3 rounded-md">
          <div className="text-2xl font-bold text-primary">{formatNumber(timeLeft.hours)}</div>
          <div className="text-xs text-text-secondary">Horas</div>
        </div>
        <div className="bg-primary-light p-3 rounded-md">
          <div className="text-2xl font-bold text-primary">{formatNumber(timeLeft.minutes)}</div>
          <div className="text-xs text-text-secondary">Min</div>
        </div>
        <div className="bg-primary-light p-3 rounded-md">
          <div className="text-2xl font-bold text-primary">{formatNumber(timeLeft.seconds)}</div>
          <div className="text-xs text-text-secondary">Seg</div>
        </div>
      </div>
    </div>
  )
}
