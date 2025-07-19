"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, MapPin, Clock } from "lucide-react"
import Navbar from "./components/Navbar"
import EnvelopeAnimation from "./components/EnvelopeAnimation"
import Section from "./components/Section"
import Footer from "./components/Footer"
import Countdown from "./components/Countdown"

function App() {

  const [sectionIndex, setSectionIndex] = useState(0)
  const sectionsRef = useRef<HTMLElement[]>([])

  // Función para hacer scroll a una sección específica
  const scrollToSection = (index: number) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({ behavior: "smooth" })
      setSectionIndex(index)
    }
  }

  useEffect(() => {
    // Recopilar todas las secciones de contenido
    const sections = Array.from(document.querySelectorAll(".section-content")) as HTMLElement[]
    sectionsRef.current = sections

    const handleWheel = (e: WheelEvent) => {
      // Solo activar el scroll automático después de pasar la sección de la carta
      const cartaSection = document.getElementById("seccion-carta")
      if (cartaSection && window.scrollY > cartaSection.offsetHeight) {
        if (e.deltaY > 0) {
          // Scroll hacia abajo
          if (sectionIndex < sections.length - 1) {
            scrollToSection(sectionIndex + 1)
          }
        } else {
          // Scroll hacia arriba
          if (sectionIndex > 0) {
            scrollToSection(sectionIndex - 1)
          }
        }
      }
    }

    // Eventos táctiles para dispositivos móviles
    let touchStart = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const cartaSection = document.getElementById("seccion-carta")
      if (cartaSection && window.scrollY > cartaSection.offsetHeight) {
        const touchEnd = e.changedTouches[0].clientY
        const diff = touchStart - touchEnd

        if (diff > 50) {
          // Umbral para considerar un deslizamiento significativo
          // Deslizar hacia abajo
          if (sectionIndex < sections.length - 1) {
            scrollToSection(sectionIndex + 1)
          }
        } else if (diff < -50) {
          // Deslizar hacia arriba
          if (sectionIndex > 0) {
            scrollToSection(sectionIndex - 1)
          }
        }
      }
    }

    window.addEventListener("wheel", handleWheel)
    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [sectionIndex])

  return (
    <main className="min-h-screen bg-white text-black pt-16">
      <Navbar />

      {/* Intro Section with Envelope Animation */}
      <EnvelopeAnimation />

      {/* Indicador de scroll */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <ChevronDown className="h-8 w-8 text-pink-300" />
        <p className="text-sm text-pink-400 font-light text-center">Sigue deslizando</p>
      </motion.div>

      {/* Content Sections */}
      <Section
        id="bienvenida"
        title="Bienvenida"
        content={
          <div className="space-y-4 italic">
            <p>
              Hace quince años mis padres daban gracias a Dios por mí. Hoy yo le doy gracias por ellos, por su cuidado,
              paciencia y consejos.
            </p>
            <p>Doy gracias también a toda mi familia y amigos por hacer más especial este día.</p>
            <p>
              A todos los seres más queridos que forman parte de mi vida, quiero que celebren conmigo mis 15 años de
              vida.
            </p>
          </div>
        }
        bgPattern="flowers"
        className="section-content"
      />

      <Section
        id="padres"
        title="Con el amor de mis padres"
        content={
          <div className="space-y-4">
            <p className="text-xl">Isabel Sevilla Rivera y Andrés Mendoza Rosete</p>
          </div>
        }
        bgPattern="stars"
        className="section-content"
      />

      <Section
        id="padrinos"
        title="Y el apoyo de mis padrinos"
        content={
          <div className="space-y-4">
            <p className="text-xl">Araceli Jiménez Martínez y Jesús Sevilla Rivera</p>
          </div>
        }
        bgPattern="diamonds"
        className="section-content"
      />

      <Section
        id="cuenta-regresiva"
        title="Faltan"
        content={<Countdown targetDate="2025-11-29T18:00:00" />}
        bgPattern="circles"
        className="section-content"
      />

      <Section
        id="ceremonia"
        title="Ceremonia Religiosa"
        content={
          <div className="space-y-6">
            <h2 className="text-2xl font-serif">Parroquia de San Francisco</h2>
            <div className="flex items-center justify-center gap-2 text-pink-600">
              <Clock className="h-5 w-5" />
              <p className="text-lg">29 de Noviembre de 2025 - 18:00 hrs</p>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-pink-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.661098699895!2d-99.13345492526837!3d19.432608841887484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92d2e0e4dbd%3A0x905574a740c4893d!2sTemplo%20de%20San%20Francisco!5e0!3m2!1ses-419!2smx!4v1710532532636!5m2!1ses-419!2smx"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              href="https://maps.app.goo.gl/8ZGjQZvZX8JQnSZS6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-full transition-colors duration-300 border border-pink-300 mt-4"
            >
              <MapPin className="h-5 w-5" />
              Ver en Google Maps
            </a>
          </div>
        }
        bgPattern="flowers"
        className="section-content"
      />

      <Section
        id="recepcion"
        title="Recepción"
        content={
          <div className="space-y-6">
            <h2 className="text-2xl font-serif">Salón Santa Sofia</h2>
            <div className="flex items-center justify-center gap-2 text-pink-600">
              <Clock className="h-5 w-5" />
              <p className="text-lg">29 de Noviembre de 2025 - 20:00 hrs</p>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-pink-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.8876121555424!2d-99.17255492526866!3d19.41999984216225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3c1f052def%3A0x75e8de7028b9d251!2sSanta%20Sofia!5e0!3m2!1ses-419!2smx!4v1710532608636!5m2!1ses-419!2smx"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              href="https://maps.app.goo.gl/Ld5Ld5Ld5Ld5Ld5L6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-full transition-colors duration-300 border border-pink-300 mt-4"
            >
              <MapPin className="h-5 w-5" />
              Ver en Google Maps
            </a>
          </div>
        }
        bgPattern="stars"
        className="section-content"
      />

      <Section
        id="codigo-vestimenta"
        title="Código de Vestimenta"
        content={
          <div className="space-y-4">
            <p className="text-xl font-semibold">Tema: Época Victoriana</p>
            <p className="text-lg">Si gustas puedes participar con el vestuario o solo con:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-pink-50/50 p-4 rounded-lg border border-pink-200">
                <h3 className="text-lg font-semibold text-pink-700 mb-2">Damas</h3>
                <p>Guantes, abanico y peinado</p>
              </div>
              <div className="bg-pink-50/50 p-4 rounded-lg border border-pink-200">
                <h3 className="text-lg font-semibold text-pink-700 mb-2">Caballeros</h3>
                <p>Vestimenta elegante</p>
              </div>
            </div>
          </div>
        }
        bgPattern="diamonds"
        className="section-content"
      />

      <Section
        id="regalos"
        title="Sobre los regalos"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              Este es un día muy especial para mí, y me llena de alegría poder compartirlo con ustedes. En lugar de
              recibir regalos tradicionales, me gustaría pedirles un pequeño favor: si desean darme un presente, les
              agradecería mucho que fuera en efectivo, ya que este gesto me ayudará a cumplir algunos sueños que tengo
              en mente. Habrá una lluvia de sobres en la entrada del evento, donde podrán dejar su contribución si así
              lo desean.
            </p>
          </div>
        }
        bgPattern="circles"
        className="section-content"
      />

      <Section
        id="confirmacion"
        title="Confirmación de Asistencia"
        content={
          <div className="space-y-6">
            <p className="text-lg">Favor de confirmar antes del 15 de Octubre</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1234567890"
                className="px-6 py-3 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-full transition-colors duration-300 border border-pink-300"
              >
                Llamar: (123) 456-7890
              </a>
              <a
                href="https://wa.me/1234567890"
                className="px-6 py-3 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-full transition-colors duration-300 border border-pink-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        }
        bgPattern="flowers"
        className="section-content"
      />

      <Footer />
    </main>
  );
}

export default App;
