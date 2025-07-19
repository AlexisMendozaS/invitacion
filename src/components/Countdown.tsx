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
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
            <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 text-center flex-wrap justify-center">
                <div className="flex flex-col items-center">
                    <div className="text-6xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-luxurious text-pink-600 card-elegant w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl flex items-center justify-center border border-rose-300 sm:border-2 shadow-rose backdrop-blur-sm">
                        <span className="filter-none">{timeLeft.days}</span>
                    </div>
                    <span className="text-xl sm:text-sm md:text-base mt-2 sm:mt-3 text-rose-600 font-niconne">Días</span>
                </div>
                <div className="flex flex-col items-center" style={{ animationDelay: '0.2s' }}>
                    <div className="text-6xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-luxurious text-pink-600 card-elegant w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl flex items-center justify-center border border-rose-300 sm:border-2 shadow-rose backdrop-blur-sm">
                        <span className="filter-none">{timeLeft.hours}</span>
                    </div>
                    <span className="text-xl sm:text-sm md:text-base mt-2 sm:mt-3 text-rose-600 font-niconne">Horas</span>
                </div>
                <div className="flex flex-col items-center" style={{ animationDelay: '0.4s' }}>
                    <div className="text-6xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-luxurious text-pink-600 card-elegant w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl flex items-center justify-center border border-rose-300 sm:border-2 shadow-rose backdrop-blur-sm">
                        <span className="filter-none">{timeLeft.minutes}</span>
                    </div>
                    <span className="text-xl sm:text-sm md:text-base mt-2 sm:mt-3 text-rose-600 font-niconne">Minutos</span>
                </div>
                <div className="flex flex-col items-center" style={{ animationDelay: '0.6s' }}>
                    <div className="text-6xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-luxurious text-pink-600 card-elegant w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl flex items-center justify-center border border-rose-300 sm:border-2 shadow-rose backdrop-blur-sm">
                        <span className="filter-none">{timeLeft.seconds}</span>
                    </div>
                    <span className="text-xl sm:text-sm md:text-base mt-2 sm:mt-3 text-rose-600 font-niconne">Segundos</span>
                </div>
            </div>
            <div className="card-luxurious p-3 sm:p-4 rounded-lg sm:rounded-xl border border-rose-200 shadow-rose">
                <p className="font-niconne text-sm sm:text-base md:text-lg text-rose-600 animate-sparkle">
                    ⏰ Para el día más especial ⏰
                </p>
            </div>
        </div>
    )
}

