"use client"

import { useEffect, useRef, useState } from "react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MusicPlayer, { type MusicPlayerHandle } from './components/MusicPlayer';
import ConfirmationModal from './components/ConfirmationModal';
import { buscarInvitadoPorCodigo } from './data/invitados.js';
// import { motion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"
// import Navbar from "./components/Navbar"
// import EnvelopeAnimation from "./components/EnvelopeAnimation"
import Section from "./components/Section"
import Footer from "./components/Footer"
import Countdown from "./components/Countdown"

gsap.registerPlugin(ScrollTrigger)

function App() {
  const musicRef = useRef<MusicPlayerHandle>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInvitado, setCurrentInvitado] = useState<any>(null);

  // Obtener código de invitado desde la URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get('c');
    
    if (codigo) {
      const invitado = buscarInvitadoPorCodigo(codigo);
      if (invitado) {
        setCurrentInvitado(invitado);
      }
    }
  }, []);

  const handleConfirmationClick = () => {
    if (currentInvitado) {
      setIsModalOpen(true);
    } else {
      // Si no hay invitado, redirigir directamente a WhatsApp
      const whatsappUrl = `https://wa.me/7714385039`;
      window.open(whatsappUrl, '_blank');
    }
  };

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
        width: "70vw",
        height: "70vh",
        ease: "power2.inOut",
      })
      .to("#card-text-div", {
        duration: 3,
        paddingTop: "10px",
        scale: 1.5,
        ease: "power2.inOut",
      }, "<")
      .to("#card-text", {
        duration: 3,
        padding: "28",
        ease: "power2.inOut",
      })
      .to("#music-player-fixed", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      }, "<") // con "<" se ejecuta al mismo tiempo que el anterior
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
    <main className="main-background min-h-screen text-gray-800 pt-8 sm:pt-12 md:pt-16">
      {/* Music Player - Fixed centrado en la parte superior */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 opacity-0" id="music-player-fixed">
        <MusicPlayer ref={musicRef} />
      </div>
      
      {/* <Navbar /> */}
      {/* Mensaje "Desliza para abrir" - Mobile first */}
      <div
        id="text-desliza"
        title="Inicio"
        className="sticky w-64 sm:w-72 md:w-80 text-center top-1/2 translate-y-20 left-1/2 -translate-x-[25%] md:-translate-x-1/2 text-2xl font-luxurious text-rose-600 bg-white/90 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl z-2 animate-float shadow-rose border border-rose-200"
      >
        ✨ Desliza para abrir ✨
      </div>
      {/* Contenedor centrado y sticky - Responsive */}
      <section
        id="seccion-carta"
        className={`sticky top-1/2 -translate-y-1/2 flex justify-center items-center z-[1] transition-all duration-1000 ease-in-out h-[140vh] sm:h-[150vh] md:h-[160vh]`}
      >
        {/* Fondo del Card con gradiente - Responsive */}
        <div id="card-bg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gradient-purple-rose w-80 h-60 sm:w-96 sm:h-72 md:w-120 md:h-80 rounded-lg shadow-purple">

        </div>
        {/* Solapa del card - Responsive */}
        <div id="card-top" className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-[190px] sm:border-t-[225px] md:border-t-[258px] border-t-rose-400 border-r-[160px] sm:border-r-[192px] md:border-r-[240px] border-r-transparent border-l-[160px] sm:border-l-[192px] md:border-l-[240px] border-l-transparent w-80 h-60 sm:w-96 sm:h-72 md:w-120 md:h-80 origin-top z-2 `}>

        </div>
        {/* Dobles derecho - Responsive */}
        <div id="card-right" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-[240px] sm:border-t-[280px] md:border-t-[320px] border-t-transparent border-r-[200px] sm:border-r-[240px] md:border-r-[300px] border-r-rose-300 w-80 h-60 sm:w-96 sm:h-72 md:w-120 md:h-80 z-2">

        </div>
        {/* Dobles izquierdo - Responsive */}
        <div id="card-left" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-[240px] sm:border-t-[280px] md:border-t-[320px] border-t-transparent border-l-[200px] sm:border-l-[240px] md:border-l-[300px] border-l-rose-200 w-80 h-60 sm:w-96 sm:h-72 md:w-120 md:h-80 z-2">

        </div>
        {/* Card con diseño elegante - Responsive */}
        <div id="card-text" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card-luxurious text-gray-800 w-80 h-60 sm:w-96 sm:h-72 md:w-120 md:h-80 rounded-xl sm:rounded-2xl border border-rose-200 sm:border-2 z-1 p-3 sm:p-4 md:p-5">
          <div id="card-text-div" className="flex flex-col items-center justify-center text-center pt-8 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-white/95 to-rose-50/95 h-full border border-rose-100">
            <h1 className="font-fleur text-3xl sm:text-4xl md:text-5xl gradient-text-rose mb-2 sm:mb-3 md:mb-4 w-full">Mis XV Años</h1>
            <h2 className="font-luxurious text-2xl sm:text-2xl md:text-3xl text-rose-600 w-full mb-1 sm:mb-2">Andy Mendoza</h2>
            <div className="my-2 sm:my-3 md:my-4 border-t border-b sm:border-t-2 sm:border-b-2 border-rose-300 py-2 sm:py-3 bg-rose-50/50 rounded-md sm:rounded-lg px-2 sm:px-3 md:px-4">
              <p className="text-rose-600 w-full font-niconne text-xs sm:text-base md:text-lg">Te invito a celebrar conmigo</p>
              <p className="text-rose-600 w-full font-niconne text-xs sm:text-base md:text-lg">este día tan especial</p>
            </div>
            <p className="text-rose-700 font-luxurious text-xl sm:text-xl md:text-2xl gradient-text-gold">29 · 11 · 2025</p>
            {/* MusicPlayer ahora está fijo en la parte superior */}
          </div>
        </div>
      </section>
      {/* Content Sections - Mobile first responsive */}
      <Section
        id="bienvenida"
        title="Bienvenida"
        content={
          <div className="space-y-4 sm:space-y-6 font-niconne text-xl">
            <p className="text-rose-600 leading-relaxed">
              Hace quince años mis padres daban gracias a Dios por mí. Hoy yo le doy gracias por ellos, por su cuidado,
              paciencia y consejos.
            </p>
            <p className="text-rose-600 leading-relaxed">Doy gracias también a toda mi familia y amigos por hacer más especial este día.</p>
            <p className="text-rose-600 leading-relaxed">
              A todos los seres más queridos que forman parte de mi vida, quiero que celebren conmigo mis 15 años de
              vida.
            </p>
            <div className="text-center mt-4 sm:mt-6">
              <span className="text-3xl sm:text-4xl">🌹✨🌹</span>
            </div>
          </div>
        }
        bgPattern="flowers"
        className="section-content"
      />

      <Section
        id="padres"
        title="Con el amor de mis padres"
        content={
          <div className="space-y-4 sm:space-y-6 text-center">
            <div className="card-elegant p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-rose">
              <p className="text-4xl sm:text-xl md:text-2xl font-luxurious gradient-text-rose mb-2">Isabel Sevilla Rivera</p>
              <span className="text-rose-400 text-3xl sm:text-xl font-luxurious">y</span>
              <p className="text-4xl sm:text-xl md:text-2xl font-luxurious gradient-text-rose mt-2">Andrés Mendoza Rosete</p>
            </div>
            <div className="text-center">
              <span className="text-3xl sm:text-4xl">💕👨‍👩‍👧💕</span>
            </div>
          </div>
        }
        bgPattern="stars"
        className="section-content"
      />
      
      <Section
        id="padrinos"
        title="Y el apoyo de mis padrinos"
        content={
          <div className="space-y-4 sm:space-y-6 text-center">
            <div className="card-elegant p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-purple">
              <p className="text-4xl sm:text-xl md:text-2xl font-luxurious gradient-text-rose mb-2">Araceli Jiménez Martínez</p>
              <span className="text-purple-400 text-3xl sm:text-xl font-luxurious">y</span>
              <p className="text-4xl sm:text-xl md:text-2xl font-luxurious gradient-text-rose mt-2">Jesús Sevilla Rivera</p>
            </div>
            <div className="text-center">
              <span className="text-3xl sm:text-4xl">🙏✨🙏</span>
            </div>
          </div>
        }
        bgPattern="diamonds"
        className="section-content"
      />

      <Section
        id="cuenta-regresiva"
        title="Faltan"
        content={
          <div className="space-y-4 sm:space-y-6">
            <Countdown targetDate="2025-11-29T18:00:00" />
            <div className="text-center">
              <span className="text-3xl sm:text-4xl">⏰💖⏰</span>
            </div>
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  const eventDate = new Date('2025-11-29T18:00:00');
                  const endDate = new Date('2025-11-29T23:00:00');
                  
                  // Detectar si es iOS/Safari para calendario nativo
                  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                  
                  if (isIOS) {
                    // Para iOS - crear archivo .ics
                    const formatDate = (date: Date) => {
                      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                    };
                    
                    const icsContent = [
                      'BEGIN:VCALENDAR',
                      'VERSION:2.0',
                      'PRODID:-//XV Años Andy//ES',
                      'BEGIN:VEVENT',
                      `DTSTART:${formatDate(eventDate)}`,
                      `DTEND:${formatDate(endDate)}`,
                      'SUMMARY:XV Años de Andy Mendoza',
                      'DESCRIPTION:Celebración de los XV años de Andy Mendoza\\n\\nCeremonia: Parroquia La Divina Providencia - 18:00 hrs\\nRecepción: Salón Santa Sofia - 20:00 hrs\\n\\nCódigo de vestimenta: Época Victoriana',
                      'LOCATION:Parroquia La Divina Providencia, Tulancingo',
                      'BEGIN:VALARM',
                      'TRIGGER:-P1M',
                      'ACTION:DISPLAY',
                      'DESCRIPTION:XV Años de Andy - Recordatorio 1 mes antes',
                      'END:VALARM',
                      'BEGIN:VALARM',
                      'TRIGGER:-P1W',
                      'ACTION:DISPLAY',
                      'DESCRIPTION:XV Años de Andy - Recordatorio 1 semana antes',
                      'END:VALARM',
                      'BEGIN:VALARM',
                      'TRIGGER:-P1D',
                      'ACTION:DISPLAY',
                      'DESCRIPTION:XV Años de Andy - Recordatorio 1 día antes',
                      'END:VALARM',
                      'END:VEVENT',
                      'END:VCALENDAR'
                    ].join('\r\n');
                    
                    const blob = new Blob([icsContent], { type: 'text/calendar' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'xv-anios-andy.ics';
                    link.click();
                    URL.revokeObjectURL(url);
                  } else {
                    // Para otros navegadores - Google Calendar
                    const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
                    googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
                    googleCalendarUrl.searchParams.set('text', 'XV Años de Andy Mendoza');
                    googleCalendarUrl.searchParams.set('dates', '20251129T180000Z/20251129T230000Z');
                    googleCalendarUrl.searchParams.set('details', 
                      'Celebración de los XV años de Andy Mendoza\n\n' +
                      'Ceremonia: Parroquia La Divina Providencia - 18:00 hrs\n' +
                      'Recepción: Salón Santa Sofia - 20:00 hrs\n\n' +
                      'Código de vestimenta: Época Victoriana'
                    );
                    googleCalendarUrl.searchParams.set('location', 'Parroquia La Divina Providencia, Tulancingo');
                    
                    window.open(googleCalendarUrl.toString(), '_blank');
                  }
                }}
                className="btn-gold rounded-full transition-all duration-300 shadow-gold font-niconne text-lg px-6 py-3 inline-flex items-center gap-2"
              >
                📅 Agregar al Calendario
              </button>
            </div>
          </div>
        }
        bgPattern="circles"
        className="section-content"
      />

      <Section
        id="ceremonia"
        title="Ceremonia Religiosa"
        content={
          <div className="space-y-4 sm:space-y-6">
            <div className="card-luxurious p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-gold text-center">
              <h2 className="text-5xl sm:text-2xl md:text-3xl font-luxurious gradient-text-metallic mb-3 sm:mb-4">Parroquia La Divina Providencia</h2>
              <div className="flex items-center justify-center gap-2 text-rose-600 mb-3 sm:mb-4">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                <p className="text-xl sm:text-lg md:text-xl font-niconne">29 de Noviembre de 2025 - 18:00 hrs</p>
              </div>
              <div className="text-center mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">⛪🕯️⛪</span>
              </div>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-rose-200 sm:border-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1873.8330606328793!2d-98.71730007483536!3d20.064422901248545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1a6e3014aa33d%3A0xfa894e907b545b34!2sParroquia%20La%20Divina%20Providencia!5e0!3m2!1ses!2smx!4v1752944414769!5m2!1ses!2smx"
                width="100%"
                height="250"
                className="sm:h-[300px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="text-center">
              <a
                href="https://maps.app.goo.gl/NcWaVYLChFRc4oBW6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-elegant inline-flex items-center gap-2 text-white rounded-full transition-all duration-300 shadow-rose font-niconne text-3xl"
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                Ver en Google Maps
              </a>
            </div>
          </div>
        }
        bgPattern="flowers"
        className="section-content"
      />

      <Section
        id="recepcion"
        title="Recepción"
        content={
          <div className="space-y-4 sm:space-y-6">
            <div className="card-luxurious p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-gold text-center">
              <h2 className="text-5xl sm:text-2xl md:text-3xl font-luxurious gradient-text-metallic mb-3 sm:mb-4">Salón Santa Sofia</h2>
              <div className="flex items-center justify-center gap-2 text-rose-600 mb-3 sm:mb-4">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                <p className="text-xl sm:text-lg md:text-xl font-niconne">29 de Noviembre de 2025 - 20:00 hrs</p>
              </div>
              <div className="text-center mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">🎉🥂🎉</span>
              </div>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-rose-200 sm:border-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1621.766207673846!2d-98.71380092819898!3d20.074557284147282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1a7049c4fb601%3A0x6ee662792229e476!2zU2Fsw7NuIFNhbnRhIFNvZsOtYQ!5e0!3m2!1ses!2smx!4v1752944577716!5m2!1ses!2smx"
                width="100%"
                height="250"
                className="sm:h-[300px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="text-center">
              <a
                href="https://maps.app.goo.gl/kE22Qyok8NYdheyKA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-elegant inline-flex items-center gap-2 text-white rounded-full transition-all duration-300 shadow-rose font-niconne text-3xl"
              >
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                Ver en Google Maps
              </a>
            </div>
          </div>
        }
        bgPattern="stars"
        className="section-content"
      />

      <Section
        id="codigo-vestimenta"
        title="Código de Vestimenta"
        content={
          <div className="space-y-4 sm:space-y-6">
            <div className="card-luxurious p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-purple text-center">
              <p className="text-3xl font-luxurious gradient-text-rose mb-3 sm:mb-4">🎭 Tema: Época Victoriana 🎭</p>
              <p className="text-xl font-niconne text-rose-600 mb-4 sm:mb-6">Si gustas puedes participar con el vestuario o solo con:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
              <div className="card-elegant p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-rose text-center">
                <h3 className="text-3xl font-luxurious text-rose-600 mb-3 sm:mb-4">👗 Damas</h3>
                <p className="font-niconne text-xl sm:text-lg text-rose-500">Guantes, abanico y peinado</p>
                <div className="mt-2 sm:mt-3">
                  <span className="text-2xl sm:text-3xl">🧤🪭💄</span>
                </div>
              </div>
              <div className="card-elegant p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-purple text-center">
                <h3 className="text-3xl font-luxurious text-purple-600 mb-3 sm:mb-4">🤵 Caballeros</h3>
                <p className="font-niconne text-xl sm:text-lg text-purple-500">Vestimenta elegante</p>
                <div className="mt-2 sm:mt-3">
                  <span className="text-2xl sm:text-3xl">🎩👔🕴️</span>
                </div>
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
          <div className="space-y-4 sm:space-y-6">
            <div className="card-luxurious p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-gold text-center">
              <div className="text-center mb-3 sm:mb-4">
                <span className="text-3xl sm:text-4xl">💝✨💝</span>
              </div>
              <p className="text-2xl sm:text-base md:text-lg font-niconne text-rose-600 leading-relaxed">
                Este es un día muy especial para mí, y me llena de alegría poder compartirlo con ustedes. En lugar de
                recibir regalos tradicionales, me gustaría pedirles un pequeño favor: si desean darme un presente, les
                agradecería mucho que fuera en efectivo, ya que este gesto me ayudará a cumplir algunos sueños que tengo
                en mente.
              </p>
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-rose-50 rounded-lg border border-rose-200">
                <p className="font-luxurious text-rose-600 text-2xl sm:text-2xl">
                  💌 Habrá una lluvia de sobres en la entrada del evento 💌
                </p>
              </div>
            </div>
          </div>
        }
        bgPattern="circles"
        className="section-content"
      />

      <Section
        id="confirmacion"
        title="Confirmación de Asistencia"
        content={
          <div className="space-y-4 sm:space-y-6">
            <div className="card-luxurious p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-rose text-center">
              <p className="text-3xl font-luxurious text-rose-600 mb-4 sm:mb-6">📅 Favor de confirmar antes del 15 de Octubre 📅</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a
                  href="tel:+7714385039"
                  className="btn-elegant text-white rounded-full transition-all duration-300 shadow-rose font-niconne w-full sm:w-auto text-center"
                >
                  📞 Llamar: (771) 438-5039
                </a>
                <button
                  onClick={handleConfirmationClick}
                  className="btn-gold rounded-full transition-all duration-300 shadow-gold font-niconne w-full sm:w-auto text-center px-6 py-3"
                >
                  ✅ Confirmar Asistencia
                </button>
              </div>
            </div>
          </div>
        }
        bgPattern="flowers"
        className="section-content"
      />

      <Footer />

      {/* Modal de confirmación */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invitado={currentInvitado}
      />
    </main>
  );
}

export default App;