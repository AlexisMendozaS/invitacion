"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MusicPlayer, { type MusicPlayerHandle } from './components/MusicPlayer';
// import { motion } from "framer-motion"
import { ChevronDown, MapPin, Clock } from "lucide-react"
// import Navbar from "./components/Navbar"
// import EnvelopeAnimation from "./components/EnvelopeAnimation"
import Section from "./components/Section"
import Footer from "./components/Footer"
import Countdown from "./components/Countdown"

gsap.registerPlugin(ScrollTrigger)

function App() {
  const musicRef = useRef<MusicPlayerHandle>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: 1,
        start: "top top",
        end: "+=1200",
        onEnter: () => {
          musicRef.current?.play();
        },
        onLeaveBack: () => {
          musicRef.current?.pause();
          musicRef.current?.reset(); // ← esta función debe reiniciar el audio
        },
      }
    })

    tl
      .to("#text-desliza", {
        duration: 1,
        opacity: 0,
        ease: "power1.inOut",
      })
      .to("#card-top", {
        duration: 2,
        rotateX: 180,
        zIndex: 1,
        ease: "power1.inOut",
      })
      .to("#card-text", {
        duration: 5,
        y: -300,
        zIndex: 1,
        ease: "power1.inOut",
      })
      .to("#card-text", {
        duration: 1,
        zIndex: 4,
        ease: "power1.in",
      }, ">")
      .to("#card-text", {
        duration: 5,
        y: 0,
        ease: "power1.inOut",
      })
      .to("#card-text", {
        duration: 5,
        width: "90vw",
        height: "90vh",
        ease: "power2.inOut",
      })
      .to("#card-text", {
        duration: 3,
        padding: "28",
        ease: "power2.inOut",
      })
      .to("#music-player", {
        opacity: 1,
        duration: 1,
        marginTop: 80,
        ease: "power1.inOut",
      }, "<") // con ">" se ejecuta justo después del anterior
      .to("#card-top", {
        duration: 1,
        opacity: 0,
        ease: "power2.inOut",
      })
      .to("#card-right", {
        duration: 1,
        opacity: 0,
        ease: "power2.inOut",
      })
      .to("#card-left", {
        duration: 1,
        opacity: 0,
        ease: "power2.inOut",
      })
      .to("#card-bg", {
        duration: 1,
        opacity: 0,
        ease: "power2.inOut",
      })
      .to("#card-text", {
        duration: 5,
        opacity: 0,
        ease: "power2.inOut",
      })


  }, [])

  return (
    <main className="min-h-screen bg-white text-black pt-16">
      {/* <Navbar /> */}
      {/* Mensaje "Desliza para abrir" */}
      <div
        id="text-desliza"
        title="Inicio"
        className="sticky w-60 text-center top-1/2 translate-y-20 left-1/2 -translate-x-1/2 text-xl font-bold text-pink-500 bg-white/80 px-5 py-3 rounded-lg z-2 animate-bounce motion-safe:animate-bounce"
      >
        Desliza para abrir
      </div>
      {/* Contenedor centrado y sticky */}
      <section
        id="seccion-carta"
        className={`sticky top-1/2 -translate-y-1/2 flex justify-center items-center z-[1] transition-all duration-1000 ease-in-out h-[160vh]`}
      >
        {/* Fondo del Card */}
        <div id="card-bg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-300 w-120 h-80">

        </div>
        {/* Solapa del card */}
        <div id="card-top" className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-[258px] border-t-pink-600 border-r-[240px] border-r-transparent border-l-[240px] border-l-transparent w-120 h-80 origin-top z-2`}>

        </div>
        {/* Dobles derecho */}
        <div id="card-right" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-[320px] border-t-transparent border-r-[300px] border-r-pink-500 w-120 h-80 z-2">

        </div>
        {/* Dobles izquierdo */}
        <div id="card-left" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-[320px] border-t-transparent border-l-[300px] border-l-pink-400 w-120 h-80 z-2">

        </div>
        {/* Card */}
        <div id="card-text" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-200 text-black w-120 h-80 rounded-2xl border-pink-300 z-1 p-5">
          <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white h-full">
            <h1 className="font-fleur text-4xl text-pink-500 italic mb-4 w-full">Mis XV Años</h1>
            <h2 className="font-serif text-2xl text-pink-800 w-full">Andy Mendoza</h2>
            <div className="my-4 border-t border-b border-pink-200 py-2">
              <p className="text-gray-700 w-full">Te invito a celebrar conmigo</p>
              <p className="text-gray-700 w-full">este día tan especial</p>
            </div>
            <p className="text-pink-600 font-semibold">29 · 11 · 2025</p>
            <div id="music-player" className="opacity-0">
              <MusicPlayer ref={musicRef} />
            </div>
          </div>
        </div>
      </section>
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
            <h2 className="text-2xl font-serif">Parroquia La Divina Providencia</h2>
            <div className="flex items-center justify-center gap-2 text-pink-600">
              <Clock className="h-5 w-5" />
              <p className="text-lg">29 de Noviembre de 2025 - 18:00 hrs</p>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-pink-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1873.8330606328793!2d-98.71730007483536!3d20.064422901248545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1a6e3014aa33d%3A0xfa894e907b545b34!2sParroquia%20La%20Divina%20Providencia!5e0!3m2!1ses!2smx!4v1752944414769!5m2!1ses!2smx"
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
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1621.766207673846!2d-98.71380092819898!3d20.074557284147282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1a7049c4fb601%3A0x6ee662792229e476!2zU2Fsw7NuIFNhbnRhIFNvZsOtYQ!5e0!3m2!1ses!2smx!4v1752944577716!5m2!1ses!2smx"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <a
              href="https://maps.app.goo.gl/kE22Qyok8NYdheyKA"
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