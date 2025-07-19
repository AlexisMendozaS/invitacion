"use client"

import { useState, useEffect } from "react"

type CountdownProps = {
    targetDate: string
}

export default function Countdown({ targetDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const target = new Date(targetDate).getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const difference = target - now

            if (difference <= 0) {
                clearInterval(interval)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                return
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((difference % (1000 * 60)) / 1000)

            setTimeLeft({ days, hours, minutes, seconds })
        }, 1000)

        return () => clearInterval(interval)
    }, [targetDate])

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-4 md:gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-6xl font-bold text-pink-500 bg-pink-50 w-20 h-20 md:w-28 md:h-28 rounded-lg flex items-center justify-center border-2 border-pink-200">
                        {timeLeft.days}
                    </div>
                    <span className="text-sm md:text-base mt-2 text-gray-600">Días</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-6xl font-bold text-pink-500 bg-pink-50 w-20 h-20 md:w-28 md:h-28 rounded-lg flex items-center justify-center border-2 border-pink-200">
                        {timeLeft.hours}
                    </div>
                    <span className="text-sm md:text-base mt-2 text-gray-600">Horas</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-6xl font-bold text-pink-500 bg-pink-50 w-20 h-20 md:w-28 md:h-28 rounded-lg flex items-center justify-center border-2 border-pink-200">
                        {timeLeft.minutes}
                    </div>
                    <span className="text-sm md:text-base mt-2 text-gray-600">Minutos</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-6xl font-bold text-pink-500 bg-pink-50 w-20 h-20 md:w-28 md:h-28 rounded-lg flex items-center justify-center border-2 border-pink-200">
                        {timeLeft.seconds}
                    </div>
                    <span className="text-sm md:text-base mt-2 text-gray-600">Segundos</span>
                </div>
            </div>
        </div>
    )
}

