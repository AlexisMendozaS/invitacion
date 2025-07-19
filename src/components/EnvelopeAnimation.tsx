"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function EnvelopeAnimation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current) return

      const section = sectionRef.current
      // const container = containerRef.current
      const rect = section.getBoundingClientRect()

      // Si la carta está en el centro de la pantalla, se abre
      if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
        setIsOpen(true)
      }

      // Si el usuario baja más, la carta se expande y llena la pantalla
      if (rect.top < -100) {
        setIsExpanded(true)
      }

      // Si el usuario vuelve hacia arriba, la carta se contrae
      if (rect.top > -100 && isExpanded) {
        setIsExpanded(false)
      }

      // Si el usuario vuelve al inicio, la carta se cierra y vuelve a su forma original
      if (window.scrollY === 0) {
        setIsOpen(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isExpanded])

  return (
    <div
      ref={sectionRef}
      className="h-[150vh] relative flex justify-center items-center overflow-hidden"
      id="seccion-carta"
    >
      {/* Contenedor centrado y sticky */}
      <div
        ref={containerRef}
        className={`sticky top-1/2 -translate-y-1/2 flex justify-center items-center z-[1] transition-all duration-1000 ease-in-out ${
          isExpanded ? "w-screen h-screen absolute top-0 left-0 translate-y-0" : ""
        }`}
      >
        {/* Triángulo rosa (solapa del sobre) */}
        <div
          className={`absolute top-0 left-0 w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-t-[100px] border-t-pink-500 origin-top transition-all duration-1000 ease-in-out ${
            isOpen ? "rotate-x-180 top-[1px]" : ""
          }`}
          style={{
            transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
            transformOrigin: "top center",
            opacity: isExpanded ? 0 : 1,
            scale: isExpanded ? 0 : 1,
            transition: "transform 1s ease, opacity 0.5s ease, scale 0.5s ease",
          }}
        />

        {/* Rectángulo rosa (sobre) */}
        <div
          className={`w-[300px] h-[200px] bg-pink-200 border-2 border-pink-500 transition-all duration-1000 ease-in-out ${
            isExpanded ? "w-screen h-screen border-0" : ""
          }`}
        >
          {/* Contenido de la invitación (aparece cuando el sobre está expandido) */}
          {isExpanded && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/90 m-8 rounded-lg shadow-inner"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="text-center">
                <h1 className="font-serif text-4xl text-pink-500 italic mb-4">Mis XV Años</h1>
                <h2 className="font-serif text-2xl text-pink-800">Andy Mendoza</h2>
                <div className="my-4 border-t border-b border-pink-200 py-2">
                  <p className="text-gray-700">Te invito a celebrar conmigo</p>
                  <p className="text-gray-700">este día tan especial</p>
                </div>
                <p className="text-pink-600 font-semibold">29 · 11 · 2025</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mensaje "Desliza para abrir" */}
      <div
        className={`absolute top-[30%] text-xl font-bold text-pink-500 bg-white/80 px-5 py-3 rounded-lg transition-opacity duration-500 z-10 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        Desliza para abrir
      </div>
    </div>
  )
}

