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
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4F8] via-[#F0F8FF] to-[#E8F4F8] relative overflow-hidden">
      {/* Decorative Banner at Top */}
      <div className="absolute top-0 left-0 right-0 h-16 flex justify-center items-start pointer-events-none z-10">
        <div className="flex gap-3 md:gap-4">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-14 md:w-12 md:h-16 bg-gradient-to-b from-[#A8D8EA] to-transparent rounded-b-full opacity-80 animate-banner-wave"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Sticker Elements with Advanced Animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* GIANT Blue Balloons - CSS Created - Right Side */}
        <div className="absolute top-12 right-4 md:top-16 md:right-12 sticker-element z-20">
          <div className="relative animate-balloon-float-1">
            <div className="absolute inset-0 bg-[#A8D8EA]/60 blur-2xl rounded-full"></div>
            {/* Balão Azul 1 */}
            <div className="relative w-[100px] h-[120px] md:w-[140px] md:h-[170px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7CC8E8] via-[#5AA9C4] to-[#4A90A4] rounded-full"></div>
              <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/40 rounded-full blur-sm"></div>
              {/* String do balão */}
              <div className="absolute bottom-0 left-1/2 w-[2px] h-[40px] md:h-[60px] bg-[#4A90A4] transform -translate-x-1/2"></div>
              <div className="absolute -bottom-[10px] left-1/2 w-[8px] h-[8px] bg-[#4A90A4] rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-32 right-20 md:top-48 md:right-32 sticker-element z-20">
          <div className="relative animate-balloon-float-2" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-[#5AA9C4]/60 blur-2xl rounded-full"></div>
            {/* Balão Azul 2 */}
            <div className="relative w-[90px] h-[110px] md:w-[120px] md:h-[145px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#A8D8EA] via-[#7CC8E8] to-[#5AA9C4] rounded-full"></div>
              <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/40 rounded-full blur-sm"></div>
              <div className="absolute bottom-0 left-1/2 w-[2px] h-[35px] md:h-[50px] bg-[#5AA9C4] transform -translate-x-1/2"></div>
              <div className="absolute -bottom-[10px] left-1/2 w-[8px] h-[8px] bg-[#5AA9C4] rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-0 md:top-28 md:right-4 sticker-element z-20">
          <div className="relative animate-balloon-float-3" style={{ animationDelay: '1s' }}>
            <div className="absolute inset-0 bg-[#D4E6F1]/60 blur-2xl rounded-full"></div>
            {/* Balão Azul 3 */}
            <div className="relative w-[80px] h-[100px] md:w-[110px] md:h-[135px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8E2F2] via-[#A8D8EA] to-[#7CC8E8] rounded-full"></div>
              <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/40 rounded-full blur-sm"></div>
              <div className="absolute bottom-0 left-1/2 w-[2px] h-[30px] md:h-[45px] bg-[#7CC8E8] transform -translate-x-1/2"></div>
              <div className="absolute -bottom-[10px] left-1/2 w-[8px] h-[8px] bg-[#7CC8E8] rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        {/* CSS Clouds - HUGE */}

        {/* HUGE Cloud - Top Left */}
        <div className="absolute -top-4 -left-8 md:left-4 sticker-element animate-cloud-drift-slow z-10">
          <div className="relative w-[300px] h-[180px] md:w-[450px] md:h-[270px]">
            <div className="absolute bottom-0 left-[25%] w-[50%] h-[75%] bg-white/95 rounded-full blur-[4px] shadow-2xl"></div>
            <div className="absolute bottom-0 left-[5%] w-[45%] h-[60%] bg-white/90 rounded-full blur-[4px] shadow-2xl"></div>
            <div className="absolute bottom-0 right-[8%] w-[48%] h-[68%] bg-white/93 rounded-full blur-[4px] shadow-2xl"></div>
            <div className="absolute top-[10%] left-[30%] w-[40%] h-[55%] bg-white/88 rounded-full blur-[4px] shadow-lg"></div>
            <div className="absolute top-[5%] left-[45%] w-[35%] h-[50%] bg-white/85 rounded-full blur-[4px] shadow-lg"></div>
            <div className="absolute bottom-[10%] left-[15%] w-[42%] h-[58%] bg-white/92 rounded-full blur-[4px] shadow-xl"></div>
          </div>
        </div>

        {/* HUGE Cloud - Below Balloons Right Side */}
        <div className="absolute top-48 -right-8 md:right-4 sticker-element animate-cloud-drift-reverse z-10">
          <div className="relative w-[320px] h-[190px] md:w-[480px] md:h-[280px]">
            <div className="absolute bottom-0 left-[25%] w-[50%] h-[75%] bg-white/95 rounded-full blur-[4px] shadow-2xl"></div>
            <div className="absolute bottom-0 left-[5%] w-[45%] h-[60%] bg-white/90 rounded-full blur-[4px] shadow-2xl"></div>
            <div className="absolute bottom-0 right-[8%] w-[48%] h-[68%] bg-white/93 rounded-full blur-[4px] shadow-2xl"></div>
            <div className="absolute top-[10%] left-[30%] w-[40%] h-[55%] bg-white/88 rounded-full blur-[4px] shadow-lg"></div>
            <div className="absolute top-[5%] left-[45%] w-[35%] h-[50%] bg-white/87 rounded-full blur-[4px] shadow-lg"></div>
            <div className="absolute bottom-[10%] left-[15%] w-[42%] h-[58%] bg-white/92 rounded-full blur-[4px] shadow-xl"></div>
            <div className="absolute top-[15%] right-[10%] w-[38%] h-[52%] bg-white/89 rounded-full blur-[4px] shadow-lg"></div>
          </div>
        </div>

        {/* Large Cloud - Center for depth */}
        <div className="absolute top-32 left-1/4 sticker-element animate-cloud-drift-slow z-10" style={{ animationDelay: '1.5s' }}>
          <div className="relative w-[200px] h-[120px] md:w-[280px] md:h-[168px]">
            <div className="absolute bottom-0 left-[20%] w-[50%] h-[70%] bg-white/90 rounded-full blur-[4px] shadow-xl"></div>
            <div className="absolute bottom-0 left-[5%] w-[40%] h-[55%] bg-white/85 rounded-full blur-[4px] shadow-xl"></div>
            <div className="absolute bottom-0 right-[10%] w-[45%] h-[65%] bg-white/88 rounded-full blur-[4px] shadow-xl"></div>
            <div className="absolute top-[10%] left-[30%] w-[38%] h-[52%] bg-white/83 rounded-full blur-[4px] shadow-lg"></div>
          </div>
        </div>

        {/* More LARGE Blue Balloons - Bottom Left */}
        <div className="absolute bottom-24 left-2 md:bottom-32 md:left-8 sticker-element z-20">
          <div className="relative animate-balloon-float-1" style={{ animationDelay: '1.5s' }}>
            <div className="absolute inset-0 bg-[#5AA9C4]/60 blur-2xl rounded-full"></div>
            {/* Balão Azul 4 */}
            <div className="relative w-[85px] h-[105px] md:w-[110px] md:h-[135px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7CC8E8] via-[#5AA9C4] to-[#4A90A4] rounded-full"></div>
              <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/40 rounded-full blur-sm"></div>
              <div className="absolute bottom-0 left-1/2 w-[2px] h-[35px] md:h-[50px] bg-[#4A90A4] transform -translate-x-1/2"></div>
              <div className="absolute -bottom-[10px] left-1/2 w-[8px] h-[8px] bg-[#4A90A4] rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-48 left-16 md:bottom-56 md:left-28 sticker-element z-20">
          <div className="relative animate-balloon-float-2" style={{ animationDelay: '2s' }}>
            <div className="absolute inset-0 bg-[#A8D8EA]/60 blur-2xl rounded-full"></div>
            {/* Balão Azul 5 */}
            <div className="relative w-[75px] h-[95px] md:w-[100px] md:h-[125px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8E2F2] via-[#A8D8EA] to-[#7CC8E8] rounded-full"></div>
              <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white/40 rounded-full blur-sm"></div>
              <div className="absolute bottom-0 left-1/2 w-[2px] h-[30px] md:h-[45px] bg-[#7CC8E8] transform -translate-x-1/2"></div>
              <div className="absolute -bottom-[10px] left-1/2 w-[8px] h-[8px] bg-[#7CC8E8] rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        {/* CSS Stars - Elegant and Soft */}
        <div className="absolute top-1/3 left-1/3 sticker-element animate-twinkle-soft z-15">
          <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFE66D] to-[#FFC93C] opacity-70 blur-sm" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          </div>
        </div>
        <div className="absolute top-2/3 right-1/3 sticker-element animate-twinkle-soft z-15" style={{ animationDelay: '1s' }}>
          <div className="relative w-[35px] h-[35px] md:w-[45px] md:h-[45px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFE66D] to-[#FFC93C] opacity-70 blur-sm" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          </div>
        </div>
        <div className="absolute top-1/2 right-1/6 sticker-element animate-twinkle-soft z-15" style={{ animationDelay: '2s' }}>
          <div className="relative w-[38px] h-[38px] md:w-[48px] md:h-[48px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFE66D] to-[#FFC93C] opacity-70 blur-sm" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 sticker-element animate-twinkle-soft z-15" style={{ animationDelay: '2.5s' }}>
          <div className="relative w-[36px] h-[36px] md:w-[46px] md:h-[46px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFE66D] to-[#FFC93C] opacity-70 blur-sm" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          </div>
        </div>
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
        {/* Baby Carriage - Pure CSS/SVG */}
        <div className="absolute top-32 -left-20 md:left-4 w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-0 opacity-60 animate-float-gentle transform rotate-[-8deg]">
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
            {/* Heart Background */}
            <defs>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>

            <path
              d="M 200 350 C 200 350 80 260 80 180 C 80 130 110 100 145 100 C 170 100 200 120 200 120 C 200 120 230 100 255 100 C 290 100 320 130 320 180 C 320 260 200 350 200 350 Z"
              fill="#B8E2F2"
              opacity="0.7"
            />

            {/* Carriage Base - Lower part */}
            <ellipse cx="200" cy="220" rx="85" ry="45" fill="#A8D8EA" stroke="#2A5A6A" strokeWidth="3"/>

            {/* Carriage Body - Main blue part with curve */}
            <path
              d="M 115 220 Q 115 175 145 155 L 255 155 Q 285 175 285 220 Z"
              fill="#1E7C9A"
              stroke="#2A5A6A"
              strokeWidth="3"
            />

            {/* White polka dots on body */}
            <circle cx="135" cy="180" r="6" fill="white" opacity="0.95"/>
            <circle cx="160" cy="180" r="6" fill="white" opacity="0.95"/>
            <circle cx="185" cy="180" r="6" fill="white" opacity="0.95"/>
            <circle cx="210" cy="180" r="6" fill="white" opacity="0.95"/>
            <circle cx="235" cy="180" r="6" fill="white" opacity="0.95"/>
            <circle cx="260" cy="180" r="6" fill="white" opacity="0.95"/>

            <circle cx="125" cy="200" r="6" fill="white" opacity="0.95"/>
            <circle cx="150" cy="200" r="6" fill="white" opacity="0.95"/>
            <circle cx="175" cy="200" r="6" fill="white" opacity="0.95"/>
            <circle cx="200" cy="200" r="6" fill="white" opacity="0.95"/>
            <circle cx="225" cy="200" r="6" fill="white" opacity="0.95"/>
            <circle cx="250" cy="200" r="6" fill="white" opacity="0.95"/>
            <circle cx="275" cy="200" r="6" fill="white" opacity="0.95"/>

            {/* White horizontal stripe */}
            <rect x="115" y="195" width="170" height="10" fill="white" opacity="0.95" rx="3"/>

            {/* Hood/Canopy - White triangular part */}
            <path
              d="M 145 155 L 200 110 L 255 155 Z"
              fill="white"
              stroke="#2A5A6A"
              strokeWidth="3"
            />

            {/* Inner hood detail */}
            <path
              d="M 165 145 L 200 120 L 235 145 Z"
              fill="#E8F4F8"
            />

            {/* Blue side of hood with dots */}
            <path
              d="M 200 110 L 255 155 L 270 148 L 215 103 Z"
              fill="#1E7C9A"
              stroke="#2A5A6A"
              strokeWidth="2.5"
            />
            <circle cx="225" cy="125" r="5" fill="white" opacity="0.9"/>
            <circle cx="240" cy="138" r="5" fill="white" opacity="0.9"/>
            <circle cx="220" cy="138" r="5" fill="white" opacity="0.9"/>

            {/* Handle - Curved */}
            <path
              d="M 285 195 Q 320 188 340 162 Q 348 148 345 135"
              stroke="#2A5A6A"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="345" cy="135" r="6" fill="#2A5A6A"/>

            {/* Suspension base */}
            <ellipse cx="150" cy="230" rx="45" ry="15" fill="#A8D8EA" stroke="#2A5A6A" strokeWidth="3"/>
            <ellipse cx="250" cy="230" rx="45" ry="15" fill="#A8D8EA" stroke="#2A5A6A" strokeWidth="3"/>

            {/* Left Wheel */}
            <circle cx="150" cy="280" r="45" fill="#1A3A4A" stroke="#000000" strokeWidth="5"/>
            <circle cx="150" cy="280" r="38" fill="#A8D8EA" stroke="#1A3A4A" strokeWidth="3"/>
            <circle cx="150" cy="280" r="6" fill="#1A3A4A"/>

            {/* Left Wheel Spokes */}
            <line x1="150" y1="238" x2="150" y2="322" stroke="#1A3A4A" strokeWidth="2"/>
            <line x1="108" y1="280" x2="192" y2="280" stroke="#1A3A4A" strokeWidth="2"/>
            <line x1="120" y1="250" x2="180" y2="310" stroke="#1A3A4A" strokeWidth="2"/>
            <line x1="180" y1="250" x2="120" y2="310" stroke="#1A3A4A" strokeWidth="2"/>
            <line x1="130" y1="258" x2="170" y2="302" stroke="#1A3A4A" strokeWidth="1.5"/>
            <line x1="170" y1="258" x2="130" y2="302" stroke="#1A3A4A" strokeWidth="1.5"/>

            {/* Right Wheel */}
            <circle cx="250" cy="280" r="45" fill="#1A3A4A" stroke="#000000" strokeWidth="5"/>
            <circle cx="250" cy="280" r="38" fill="#A8D8EA" stroke="#1A3A4A" strokeWidth="3"/>
            <circle cx="250" cy="280" r="6" fill="#1A3A4A"/>

            {/* Right Wheel Spokes */}
            <line x1="250" y1="238" x2="250" y2="322" stroke="#1A3A4A" strokeWidth="2"/>
            <line x1="208" y1="280" x2="292" y2="280" stroke="#1A3A4A" strokeWidth="2"/>
            <line x1="220" y1="250" x2="280" y2="310" stroke="#1A3A4A" strokeWidth="2"/>
            <line x1="280" y1="250" x2="220" y2="310" stroke="#1A3A4A" strokeWidth="2"/>
            <line x1="230" y1="258" x2="270" y2="302" stroke="#1A3A4A" strokeWidth="1.5"/>
            <line x1="270" y1="258" x2="230" y2="302" stroke="#1A3A4A" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 pt-8 relative z-20">
          <div className="relative">
            {/* Soft watercolor glow behind title */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#A8D8EA]/30 via-[#D4E6F1]/40 to-[#A8D8EA]/30 blur-3xl animate-pulse-soft"></div>

            {/* Main Title */}
            <div className="relative mb-4">
              <h1 className="text-6xl md:text-8xl font-normal text-[#4A90A4] mb-2 animate-fade-in-down" style={{ fontFamily: 'Cookie, cursive' }}>
                Chá de Bebê
              </h1>
            </div>
          </div>

          {/* Baby Name with Cloud Background */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4E6F1]/40 blur-2xl rounded-full"></div>
              <h2 className="relative text-3xl md:text-5xl font-bold text-[#4A90A4] px-6 py-2 animate-fade-in-up">
                Baby Monteiro Delboni 💙
              </h2>
            </div>
          </div>

          {/* Event Details Card with Soft Style */}
          <div className="max-w-lg mx-auto bg-white/40 backdrop-blur-md rounded-3xl shadow-xl p-8 border-2 border-[#A8D8EA]/50 transform hover:scale-105 transition-all duration-500 animate-card-entrance">
            <div className="space-y-5">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">📅</span>
                <span className="text-2xl md:text-3xl font-bold text-[#4A90A4]">16/11 - 14h</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">📍</span>
                <a
                  href="https://share.google/paFdm3ZPtXyhYeyCw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg md:text-xl text-[#4A90A4] text-center leading-relaxed hover:text-[#3A7A94] hover:underline transition-all duration-300 cursor-pointer font-medium"
                >
                  Salão de festas condomínio<br />San Filippo
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Gift Finder Section */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Soft border glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#A8D8EA] via-[#D4E6F1] to-[#A8D8EA] rounded-3xl blur opacity-40 animate-border-glow-soft"></div>
            <div className="relative bg-white/45 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 border-2 border-[#A8D8EA]/60 animate-section-entrance">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-[#4A90A4] mb-4">
                  🎁 Você está convidado!
                </h3>
                <p className="text-lg md:text-xl text-[#4A90A4]/80 font-medium">
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
                    className="w-full pl-12 pr-4 py-4 text-lg text-[#4A90A4] placeholder:text-[#A8D8EA] border-2 border-[#A8D8EA] rounded-2xl focus:ring-4 focus:ring-[#D4E6F1] focus:border-[#4A90A4] outline-none transition-all duration-300 bg-[#F0F8FF]/80 font-medium"
                    disabled={isLoading}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isLoading || !searchInput.trim()}
                  className="group relative w-full py-4 px-8 bg-gradient-to-r from-[#5AA9C4] via-[#4A90A4] to-[#5AA9C4] hover:from-[#4A90A4] hover:via-[#3A7A94] hover:to-[#4A90A4] disabled:from-gray-400 disabled:to-gray-500 text-white text-lg md:text-xl font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 disabled:scale-100 disabled:cursor-not-allowed animate-gradient-x overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Procurando...
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Descobrir meu presente 🎁</span>
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
        <div className="text-center mt-16 mb-8">
          <div className="relative max-w-3xl mx-auto">
            {/* Soft glow around footer */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#A8D8EA]/20 via-[#D4E6F1]/30 to-[#A8D8EA]/20 rounded-3xl blur-xl animate-pulse-soft"></div>
            <div className="relative bg-white/45 backdrop-blur-lg rounded-3xl p-8 md:p-10 shadow-xl border-2 border-[#A8D8EA]/50 animate-footer-entrance">
              <p className="text-xl md:text-2xl text-[#4A90A4] font-medium leading-relaxed">
                Contamos com sua presença para celebrar a chegada do nosso príncipe!
                <span className="animate-heartbeat inline-block ml-2 text-3xl">💙</span>
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

        /* New Sticker-Style Animations - MUITO MAIS PERCEPTÍVEIS */
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-25px) translateX(15px) rotate(5deg); }
          50% { transform: translateY(-35px) translateX(-10px) rotate(-3deg); }
          75% { transform: translateY(-20px) translateX(10px) rotate(4deg); }
        }
        @keyframes balloon-float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-40px) rotate(8deg) scale(1.05); }
          50% { transform: translateY(-60px) rotate(-5deg) scale(1.08); }
          75% { transform: translateY(-35px) rotate(6deg) scale(1.03); }
        }
        @keyframes balloon-float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          30% { transform: translateY(-35px) rotate(-8deg) scale(1.06); }
          60% { transform: translateY(-55px) rotate(7deg) scale(1.09); }
          90% { transform: translateY(-30px) rotate(-5deg) scale(1.04); }
        }
        @keyframes balloon-float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          35% { transform: translateY(-45px) rotate(6deg) scale(1.07); }
          65% { transform: translateY(-70px) rotate(-7deg) scale(1.1); }
          85% { transform: translateY(-38px) rotate(4deg) scale(1.05); }
        }
        @keyframes cloud-drift-slow {
          0%, 100% { transform: translateX(0px) translateY(0px) scale(1); }
          50% { transform: translateX(50px) translateY(-15px) scale(1.05); }
        }
        @keyframes cloud-drift-reverse {
          0%, 100% { transform: translateX(0px) translateY(0px) scale(1); }
          50% { transform: translateX(-45px) translateY(20px) scale(1.05); }
        }
        @keyframes rotate-gentle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(12deg) scale(1.05); }
          50% { transform: rotate(0deg) scale(1.08); }
          75% { transform: rotate(-12deg) scale(1.05); }
        }
        @keyframes swing-gentle {
          0%, 100% { transform: rotate(0deg) translateY(0px) scale(1); }
          25% { transform: rotate(15deg) translateY(-15px) scale(1.05); }
          50% { transform: rotate(0deg) translateY(-25px) scale(1.08); }
          75% { transform: rotate(-15deg) translateY(-15px) scale(1.05); }
        }
        @keyframes twinkle-soft {
          0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.3) rotate(180deg); }
        }
        @keyframes banner-wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.1); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes border-glow-soft {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
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

        /* New Sticker Animation Classes - MAIS RÁPIDAS E VISÍVEIS */
        .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
        .animate-balloon-float-1 { animation: balloon-float-1 3s ease-in-out infinite; }
        .animate-balloon-float-2 { animation: balloon-float-2 3.5s ease-in-out infinite; }
        .animate-balloon-float-3 { animation: balloon-float-3 4s ease-in-out infinite; }
        .animate-cloud-drift-slow { animation: cloud-drift-slow 6s ease-in-out infinite; }
        .animate-cloud-drift-reverse { animation: cloud-drift-reverse 7s ease-in-out infinite; }
        .animate-rotate-gentle { animation: rotate-gentle 3s ease-in-out infinite; }
        .animate-swing-gentle { animation: swing-gentle 2.5s ease-in-out infinite; }
        .animate-twinkle-soft { animation: twinkle-soft 2s ease-in-out infinite; }
        .animate-banner-wave { animation: banner-wave 1.5s ease-in-out infinite; }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
        .animate-border-glow-soft { animation: border-glow-soft 3s ease-in-out infinite; }
        .animate-fade-in-down { animation: fade-in-down 1s ease-out 0.2s both; }

        /* Sticker Effect Styles */
        .sticker-element {
          filter: drop-shadow(0 4px 8px rgba(74, 144, 164, 0.15))
                  drop-shadow(0 2px 4px rgba(168, 216, 234, 0.2));
          transition: all 0.3s ease;
        }
        .sticker-element:hover {
          filter: drop-shadow(0 6px 12px rgba(74, 144, 164, 0.25))
                  drop-shadow(0 3px 6px rgba(168, 216, 234, 0.3));
        }
        .drop-shadow-sticker {
          filter: drop-shadow(0 3px 6px rgba(74, 144, 164, 0.2))
                  drop-shadow(0 1px 3px rgba(255, 255, 255, 0.8));
        }

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