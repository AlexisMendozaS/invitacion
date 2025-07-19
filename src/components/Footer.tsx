export default function Footer() {
  return (
    <footer className="py-8 sm:py-10 md:py-12 px-3 sm:px-4 text-center gradient-purple-rose border-t-2 sm:border-t-4 border-rose-300 relative overflow-hidden">
      <div className="absolute inset-0 pattern-stars opacity-20 sm:opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-rose-100/40 sm:from-rose-100/50 to-transparent"></div>
      
      <div className="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto relative z-10">
        <div className="card-luxurious p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-gold border border-rose-200 sm:border-2 mb-4 sm:mb-6 md:mb-8">
          <h2 className="font-fleur text-4xl gradient-text-rose mb-4 sm:mb-6 animate-glow leading-tight">
            ¡Gracias por ser parte de este día tan especial!
          </h2>
          <p className="text-4xl font-luxurious gradient-text-metallic mb-3 sm:mb-4">Con mucho amor, Andy</p>
          
          <div className="flex justify-center items-center space-x-2 sm:space-x-3 md:space-x-4 my-4 sm:my-6">
            <span className="text-2xl sm:text-3xl animate-float">🌹</span>
            <span className="text-2xl sm:text-3xl animate-float" style={{ animationDelay: '0.3s' }}>✨</span>
            <span className="text-2xl sm:text-3xl animate-float" style={{ animationDelay: '0.6s' }}>💖</span>
            <span className="text-2xl sm:text-3xl animate-float" style={{ animationDelay: '0.9s' }}>✨</span>
            <span className="text-2xl sm:text-3xl animate-float" style={{ animationDelay: '1.2s' }}>🌹</span>
          </div>
          
          <div className="bg-rose-50/70 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-rose-200">
            <p className="font-niconne text-sm sm:text-base md:text-lg text-rose-600">
              📞 Para más información, contactar al: (771) 438-5039
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="font-niconne text-sm sm:text-base text-rose-500 opacity-75">
            Creado con amor para celebrar los XV años de Andy 💕
          </p>
        </div>
      </div>
    </footer>
  )
}
