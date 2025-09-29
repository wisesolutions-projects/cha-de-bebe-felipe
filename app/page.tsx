'use client'

import React, { useState } from 'react'

interface GiftItem {
  nome: string
  apelido: string
  item: string
}

interface SearchResult {
  found: boolean
  name?: string
  item?: string
}

export default function BabyShowerPage() {
  const [searchInput, setSearchInput] = useState('')
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const giftList: GiftItem[] = [
    { nome: "Ana", apelido: "Aninha", item: "Fralda P" },
    { nome: "Bruno", apelido: "Bruninho", item: "Pomada antiassaduras" },
    { nome: "Camila", apelido: "Mila", item: "Fralda M" },
    { nome: "Daniel", apelido: "Dani", item: "Lenços umedecidos" },
    { nome: "Elisa", apelido: "Lili", item: "Fralda G" },
    { nome: "Felipe", apelido: "Lipe", item: "Sabonete líquido infantil" },
    { nome: "Gabriela", apelido: "Gabi", item: "Fralda RN" },
    { nome: "Henrique", apelido: "Kike", item: "Manta de bebê" },
    { nome: "Isabela", apelido: "Isa", item: "Fralda P" },
    { nome: "João", apelido: "Joãozinho", item: "Toalhas de boca" },
    { nome: "Karla", apelido: "Kaká", item: "Fralda PP" },
    { nome: "Leonardo", apelido: "Léo", item: "Pomada de assaduras" },
    { nome: "Mariana", apelido: "Mari", item: "Fralda M" },
    { nome: "Nicolas", apelido: "Nico", item: "Chupetas" },
    { nome: "Olivia", apelido: "Livi", item: "Fralda G" },
    { nome: "Pedro", apelido: "Pedrinho", item: "Paninhos de boca" },
    { nome: "Rafaela", apelido: "Rafa", item: "Fralda RN" },
    { nome: "Samuel", apelido: "Samu", item: "Kit higiene" },
    { nome: "Tatiana", apelido: "Tati", item: "Fralda P" },
    { nome: "Victor", apelido: "Vitinho", item: "Termômetro digital" },
    { nome: "Amanda", apelido: "Mandy", item: "Fralda G" },
    { nome: "Bernardo", apelido: "Bê", item: "Talco hipoalergênico" },
    { nome: "Clara", apelido: "Clarinha", item: "Fralda M" },
    { nome: "Diego", apelido: "Didi", item: "Escova de cabelo macia" },
    { nome: "Fernanda", apelido: "Fê", item: "Fralda RN" },
    { nome: "Gustavo", apelido: "Guga", item: "Toalhinha com capuz" },
    { nome: "Helena", apelido: "Lelê", item: "Fralda G" },
    { nome: "Igor", apelido: "Iggy", item: "Kit de mamadeiras" },
    { nome: "Juliana", apelido: "Juju", item: "Fralda PP" },
    { nome: "Kauã", apelido: "Kau", item: "Babadores" },
    { nome: "Larissa", apelido: "Lari", item: "Fralda P" },
    { nome: "Marcelo", apelido: "Celo", item: "Pratinho e colher de bebê" },
    { nome: "Natália", apelido: "Nati", item: "Fralda M" },
    { nome: "Otávio", apelido: "Tavinho", item: "Porta chupeta" },
    { nome: "Patrícia", apelido: "Paty", item: "Fralda G" },
    { nome: "Rodrigo", apelido: "Digo", item: "Kit de cuidados com unhas" },
    { nome: "Sabrina", apelido: "Sasa", item: "Fralda RN" },
    { nome: "Thiago", apelido: "Thi", item: "Protetores de seio para amamentação" },
    { nome: "Vanessa", apelido: "Vany", item: "Fralda M" },
    { nome: "William", apelido: "Will", item: "Termômetro de banho" },
    { nome: "Bianca", apelido: "Bia", item: "Fralda P" },
    { nome: "Cristiano", apelido: "Cris", item: "Álcool 70% para higiene" },
    { nome: "Daniela", apelido: "Dany", item: "Fralda PP" },
    { nome: "Everton", apelido: "Evinho", item: "Cobertorzinho leve" },
    { nome: "Fabiana", apelido: "Fabi", item: "Fralda G" },
    { nome: "Guilherme", apelido: "Gui", item: "Talas de fraldas descartáveis" },
    { nome: "Heloísa", apelido: "Helô", item: "Fralda RN" },
    { nome: "Jonas", apelido: "Jô", item: "Lençol para berço" },
    { nome: "Lívia", apelido: "Livi", item: "Fralda P" },
    { nome: "Miguel", apelido: "Migs", item: "Sapatinhos de bebê" }
  ]

  const sendWebhook = async (data: { found: boolean; name?: string; item?: string; searchTerm?: string }) => {
    try {
      // Só enviar webhook quando o presente for encontrado
      if (data.found) {
        await fetch('https://n8n-wisesolutions-u37879.vm.elestio.app/webhook/mari-baby-shower', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: data.name,
            produto: data.item,
            horario: new Date().toLocaleString('pt-BR', {
              timeZone: 'America/Sao_Paulo',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })
          })
        })
      }
    } catch (error) {
      console.error('Erro ao enviar webhook:', error)
    }
  }

  const handleSearch = async () => {
    if (!searchInput.trim()) return

    setIsLoading(true)
    setSearchResult(null)
    setShowConfetti(false)

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 300))

    const searchTerm = searchInput.trim().toLowerCase()
    const foundGift = giftList.find(gift =>
      gift.nome.toLowerCase() === searchTerm ||
      gift.apelido.toLowerCase() === searchTerm
    )

    if (foundGift) {
      setSearchResult({
        found: true,
        name: foundGift.nome,
        item: foundGift.item
      })
      setShowConfetti(true)
      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000)

      // Enviar webhook com dados do presente encontrado
      await sendWebhook({
        searchTerm: searchInput.trim(),
        found: true,
        name: foundGift.nome,
        item: foundGift.item
      })
    } else {
      setSearchResult({
        found: false
      })
    }

    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-100 to-blue-200 relative overflow-hidden">
      {/* Advanced Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-300/30 to-sky-400/30 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-sky-300/20 to-blue-500/20 rounded-full blur-2xl animate-float-reverse"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-r from-blue-400/25 to-sky-300/25 rounded-full blur-xl animate-float-diagonal"></div>

        {/* Floating icons with complex animations */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce-3d opacity-70 transform-gpu">☁️</div>
        <div className="absolute top-20 right-16 text-3xl animate-twinkle opacity-60 transform-gpu">⭐</div>
        <div className="absolute top-32 left-1/4 text-2xl animate-float-rotate opacity-50 transform-gpu">🍼</div>
        <div className="absolute top-40 right-1/3 text-3xl animate-bounce-3d opacity-65 transform-gpu">☁️</div>
        <div className="absolute top-60 left-20 text-2xl animate-slide-diagonal opacity-55 transform-gpu">🚗</div>
        <div className="absolute bottom-32 right-20 text-4xl animate-float-wiggle opacity-60 transform-gpu">🧸</div>
        <div className="absolute bottom-40 left-1/3 text-3xl animate-twinkle opacity-50 transform-gpu">⭐</div>
        <div className="absolute bottom-20 right-1/4 text-2xl animate-slide-horizontal opacity-65 transform-gpu">🚂</div>

        {/* Additional decorative elements */}
        <div className="absolute top-1/3 left-1/6 text-xl animate-float-rotate opacity-40 transform-gpu">🎈</div>
        <div className="absolute top-2/3 right-1/6 text-2xl animate-bounce-3d opacity-45 transform-gpu">🎁</div>
        <div className="absolute top-1/2 left-1/12 text-lg animate-twinkle opacity-35 transform-gpu">💫</div>
        <div className="absolute top-1/4 right-1/12 text-xl animate-slide-diagonal opacity-40 transform-gpu">🌟</div>

        {/* Floating particles */}
        <div className="absolute top-0 left-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-particle-1"></div>
        <div className="absolute top-1/4 left-2/3 w-1 h-1 bg-sky-300 rounded-full opacity-50 animate-particle-2"></div>
        <div className="absolute top-1/2 left-1/5 w-3 h-3 bg-blue-300 rounded-full opacity-40 animate-particle-3"></div>
        <div className="absolute top-3/4 left-4/5 w-2 h-2 bg-sky-400 rounded-full opacity-55 animate-particle-4"></div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-1/4 text-2xl animate-ping">🎉</div>
          <div className="absolute top-10 left-1/2 text-xl animate-ping animation-delay-200">🎊</div>
          <div className="absolute top-5 right-1/4 text-2xl animate-ping animation-delay-400">✨</div>
          <div className="absolute top-16 right-1/3 text-xl animate-ping animation-delay-600">🎈</div>
          <div className="absolute top-8 left-1/6 text-xl animate-ping animation-delay-800">💫</div>
          <div className="absolute top-12 right-1/6 text-2xl animate-ping animation-delay-1000">🎉</div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative">
            {/* Animated glow behind title */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-sky-400/30 to-blue-400/20 blur-3xl animate-pulse-glow"></div>
            <h1 className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-clip-text text-transparent mb-6 font-serif animate-gradient-text">
              Chá de Bebê
            </h1>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-4xl animate-bounce-gentle">👶</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 flex items-center gap-2 animate-fade-in-up">
              Baby Monteiro Delboni
              <span className="text-3xl animate-crown-float">👑</span>
            </h2>
            <span className="text-4xl animate-heartbeat">💙</span>
          </div>

          {/* Event Details Card */}
          <div className="max-w-lg mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-blue-200/50 transform hover:scale-105 transition-all duration-500 animate-card-entrance">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">📅</span>
                <span className="text-2xl font-bold text-blue-800">16/11 - 14h</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">📍</span>
                <a
                  href="https://share.google/paFdm3ZPtXyhYeyCw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-blue-700 text-center leading-relaxed hover:text-blue-900 hover:underline transition-all duration-300 cursor-pointer"
                >
                  Salão de festas condomínio<br />San Filippo
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-3xl">
            <span className="animate-bottle-swing transform-gpu">🍼</span>
            <span className="animate-heartbeat transform-gpu">💙</span>
            <span className="animate-baby-bounce transform-gpu">👶</span>
            <span className="animate-star-twinkle transform-gpu">⭐</span>
            <span className="animate-cloud-drift transform-gpu">☁️</span>
          </div>
        </div>

        {/* Gift Finder Section */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Animated border glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-sky-400 to-blue-400 rounded-3xl blur opacity-30 animate-border-glow"></div>
            <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-200/50 animate-section-entrance">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                  🎁 Descubra qual presente você deve trazer!
                </h3>
                <p className="text-lg text-blue-700">
                  Digite seu nome ou apelido abaixo
                </p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite seu nome ou apelido..."
                    className="w-full pl-12 pr-4 py-4 text-lg text-blue-900 placeholder:text-blue-400 border border-blue-300 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all duration-300 bg-blue-50/50"
                    disabled={isLoading}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isLoading || !searchInput.trim()}
                  className="group relative w-full py-4 px-8 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 hover:from-blue-600 hover:via-sky-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 disabled:scale-100 disabled:cursor-not-allowed animate-gradient-x overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Procurando...
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Descobrir meu presente</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                    </>
                  )}
                </button>

                {/* Search Results */}
                {searchResult && (
                  <div className={`mt-6 p-6 rounded-2xl text-center transition-all duration-500 transform ${
                    searchResult.found
                      ? 'bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 scale-105'
                      : 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300'
                  }`}>
                    {searchResult.found ? (
                      <div className="space-y-2">
                        <div className="text-2xl animate-pulse">✨</div>
                        <p className="text-lg font-bold text-green-800">
                          {searchResult.name}, você ficou responsável por trazer:
                        </p>
                        <p className="text-2xl font-bold text-blue-900 bg-white/70 rounded-xl py-2 px-4 inline-block">
                          {searchResult.item}
                        </p>
                        <div className="text-2xl animate-pulse">✨</div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-2xl">😊</div>
                        <p className="text-lg font-semibold text-orange-800">
                          Nome não encontrado. Por favor, tente novamente com outra grafia.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16">
          <div className="relative max-w-3xl mx-auto">
            {/* Animated glow around footer */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/20 via-sky-300/30 to-blue-300/20 rounded-3xl blur-xl animate-pulse-slow"></div>
            <div className="relative bg-white/85 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-blue-200/50 animate-footer-entrance">
              <p className="text-xl md:text-2xl text-blue-900 font-medium leading-relaxed animate-text-glow">
                Contamos com sua presença para celebrar a chegada do nosso príncipe!
                <span className="animate-heartbeat inline-block ml-2">💙</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Advanced Floating Animations */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(2deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes float-diagonal {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-15px, -25px) scale(1.1); }
        }

        /* 3D Bounce Effects */
        @keyframes bounce-3d {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0) rotateX(0deg); }
          40%, 43% { transform: translate3d(0,-30px,0) rotateX(-10deg); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        /* Rotation and Movement */
        @keyframes float-rotate {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
        @keyframes float-wiggle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(-5deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(5deg); }
        }

        /* Sparkle and Twinkle */
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          25% { opacity: 1; transform: scale(1.3); }
          50% { opacity: 0.4; transform: scale(0.8); }
          75% { opacity: 1; transform: scale(1.1); }
        }

        /* Sliding Movements */
        @keyframes slide-diagonal {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(20px, -15px); }
        }
        @keyframes slide-horizontal {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(25px); }
        }
        @keyframes cloud-drift {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(15px); }
        }

        /* Heartbeat and Special Effects */
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }
        @keyframes crown-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(5deg); }
        }
        @keyframes baby-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes bottle-swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }

        /* Particle Animations */
        @keyframes particle-1 {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }
        @keyframes particle-2 {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(-30px); opacity: 0; }
        }
        @keyframes particle-3 {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        @keyframes particle-4 {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(-40px); opacity: 0; }
        }

        /* Gradient and Glow Effects */
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes border-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Entrance Animations */
        @keyframes card-entrance {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        @keyframes section-entrance {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        @keyframes footer-entrance {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
          50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
        }

        /* Animation Classes */
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 3.5s ease-in-out infinite; }
        .animate-float-diagonal { animation: float-diagonal 5s ease-in-out infinite; }
        .animate-bounce-3d { animation: bounce-3d 2s infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-float-rotate { animation: float-rotate 6s linear infinite; }
        .animate-float-wiggle { animation: float-wiggle 3s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-star-twinkle { animation: star-twinkle 3s ease-in-out infinite; }
        .animate-slide-diagonal { animation: slide-diagonal 4s ease-in-out infinite; }
        .animate-slide-horizontal { animation: slide-horizontal 3s ease-in-out infinite; }
        .animate-cloud-drift { animation: cloud-drift 8s ease-in-out infinite; }
        .animate-heartbeat { animation: heartbeat 2s ease-in-out infinite; }
        .animate-crown-float { animation: crown-float 2s ease-in-out infinite; }
        .animate-baby-bounce { animation: baby-bounce 1.5s ease-in-out infinite; }
        .animate-bottle-swing { animation: bottle-swing 3s ease-in-out infinite; }
        .animate-particle-1 { animation: particle-1 8s linear infinite; }
        .animate-particle-2 { animation: particle-2 10s linear infinite; }
        .animate-particle-3 { animation: particle-3 7s linear infinite; }
        .animate-particle-4 { animation: particle-4 9s linear infinite; }
        .animate-gradient-text { animation: gradient-text 3s ease infinite; background-size: 200% 200%; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; background-size: 200% 200%; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-border-glow { animation: border-glow 3s ease-in-out infinite; }
        .animate-card-entrance { animation: card-entrance 0.8s ease-out; }
        .animate-section-entrance { animation: section-entrance 1s ease-out 0.2s both; }
        .animate-footer-entrance { animation: footer-entrance 1s ease-out 0.4s both; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out 0.3s both; }
        .animate-text-glow { animation: text-glow 3s ease-in-out infinite; }

        /* Animation Delays for Confetti */
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}