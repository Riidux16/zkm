import ScrollLink from "./scroll-link"
import CountdownTimer from "./countdown-timer"

export default function HeroSection() {
  // Fecha de finalización de la oferta (3 días a partir de ahora)
  const offerEndDate = new Date()
  offerEndDate.setDate(offerEndDate.getDate() + 3)

  return (
    <section className="bg-gradient-primary text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="bg-white/10 inline-block px-3 py-1 rounded-full text-sm font-medium mb-4">
              ¡REVOLUCIONA TU NEGOCIO!
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Automatiza tu atención al cliente y <span className="text-accent-secondary">duplica tus ventas</span>
            </h1>
            <p className="text-xl mb-8">
              Nuestro chatbot inteligente trabaja 24/7, nunca se cansa, nunca falla y convierte visitantes en clientes
              mientras tú te enfocas en lo importante.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <ScrollLink
                href="#schedule"
                className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-background-secondary transition-colors text-center hover-scale shadow-glow"
              >
                Solicitar información
              </ScrollLink>
              <ScrollLink
                href="#chatbot-demo"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors text-center"
              >
                Ver Demostración
              </ScrollLink>
            </div>

            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center mb-2">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-accent-secondary overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=50&width=50&text=U${i}`}
                        alt={`Usuario ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold">+200 empresas</span> ya confían en ZKM Studio
                </div>
              </div>
              <div className="flex items-center text-sm">
                <div className="flex text-accent-secondary mr-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span>4.9/5 basado en +500 valoraciones</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <div className="relative">
              <img
                src="/images/chatbot-support.png"
                alt="Chatbot ZKM Studio - Atención al cliente automatizada"
                className="rounded-lg shadow-2xl"
              />

              <div className="absolute -bottom-6 -right-6 w-64">
                <CountdownTimer
                  endDate={offerEndDate}
                  title="¡PLAZAS LIMITADAS!"
                  description="Solo quedan 5 consultas disponibles"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
