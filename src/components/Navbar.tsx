"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("seccion-carta")

    const sections = [
        { id: "seccion-carta", label: "Inicio" },
        { id: "bienvenida", label: "Bienvenida" },
        { id: "padres", label: "Padres" },
        { id: "padrinos", label: "Padrinos" },
        { id: "cuenta-regresiva", label: "Cuenta Regresiva" },
        { id: "ceremonia", label: "Ceremonia" },
        { id: "recepcion", label: "Recepción" },
        { id: "codigo-vestimenta", label: "Código de Vestimenta" },
        { id: "regalos", label: "Regalos" },
        { id: "confirmacion", label: "Confirmación" },
    ]

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3

            for (const section of sections) {
                const element = document.getElementById(section.id)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [sections])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm overflow-x-auto whitespace-nowrap"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex py-3 px-4">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`mx-2 px-4 py-2 rounded-full text-white text-lg transition-colors duration-300 ${activeSection === section.id ? "bg-pink-500/60" : "bg-pink-300/50 hover:bg-pink-400"
                            }`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
        </motion.nav>
    )
}

