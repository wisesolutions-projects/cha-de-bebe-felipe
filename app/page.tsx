'use client'

import React, { useState } from 'react'

interface GiftItem {
  nome: string
  apelido: string
  telefone: string
  item: string
}

interface SearchResult {
  found: boolean
  name?: string
  item?: string
  multipleMatches?: GiftItem[]
}

export default function BabyShowerPage() {
  const [searchInput, setSearchInput] = useState('')
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [multipleMatches, setMultipleMatches] = useState<GiftItem[]>([])
  const [showSelectionDialog, setShowSelectionDialog] = useState(false)

  const giftList: GiftItem[] = [
  { nome: "Gian Giannotti", apelido: "Gianzinho", telefone: "44 7899630047", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Mariana Monteiro Delboni", apelido: "Mariana", telefone: "21 98316-0272", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Cristina Delboni", apelido: "Cristina", telefone: "21 981828368", item: "FRALDA HUGGIES RN + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Irineu Delboni", apelido: "Irineu", telefone: "21 981354433", item: "FRALDA HUGGIES RN + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Vanessa, Antônio e Benjamin", apelido: "Vanessa", telefone: "21 983650147", item: "FRALDA HUGGIES RN + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Jessica, Ricardo e Daniel", apelido: "Jessica", telefone: "21 981354411", item: "FRALDA HUGGIES RN + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Fernando, Vivi e Fernandinho", apelido: "Fernando", telefone: "21 999124183", item: "FRALDA PAMPERS RN PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Eduardo (Borracha) e Família", apelido: "Borracha", telefone: "21 997519088", item: "FRALDA PAMPERS P PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Gustavo (Cabeça) e Família", apelido: "Cabeça", telefone: "21 979543684", item: "FRALDA PAMPERS P PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Júnior e Família", apelido: "Júnior", telefone: "21 999550033", item: "FRALDA PAMPERS P PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Felipe (Catatau) e Família", apelido: "Catatau", telefone: "21 988812124", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Pedro (Pedrinho Neb)", apelido: "Pedrinho Neb", telefone: "21 992176896", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Rodrigo (Jaguncinho)", apelido: "Jaguncinho", telefone: "21 981710022", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Suelen, Ronaldo e família", apelido: "Suelen", telefone: "21 987221000", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Nicolas, Rafa e Laura", apelido: "Nicolas", telefone: "21 988928372", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Leonardo (Leo)", apelido: "Leo", telefone: "21 980406162", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Rodrigo (Mineiro), Mariana e Bê", apelido: "Mineiro", telefone: "21 993766142", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "João e Mariah", apelido: "João", telefone: "21 968590999", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Rafael (Bubble) e Luísa", apelido: "Bubble", telefone: "21 998092850", item: "FRALDA PAMPERS P PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Caroline (Carol)", apelido: "Carol", telefone: "21 982848989", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Paula, Pedro, Maria e Olívia", apelido: "Paula", telefone: "21 972122023", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Aline e Mariah", apelido: "Aline", telefone: "21 997616159", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Carina, Danilo, Catarina e Caetano", apelido: "Carina", telefone: "21 964884685", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Luiz Eduardo (Billows)", apelido: "Billows", telefone: "21 991181846", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Chenkel, Bel e Sophia", apelido: "Chenkel", telefone: "21 997783027", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Nikolas e Jordana", apelido: "Nikolas", telefone: "21 969285353", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Beatriz", apelido: "Beatriz", telefone: "21 993528551", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Luiz Eduardo Muniz", apelido: "Luiz", telefone: "61 982400068", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Guilherme (Guido) e Gabriel", apelido: "Guido", telefone: "21 996192121", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tassia", apelido: "Tassia", telefone: "21 968134621", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Hanna, Thiago, Cecília e Thomas", apelido: "Hanna", telefone: "21 988382598", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Lívia, Mariah, Malu e Pedrinho", apelido: "Lívia", telefone: "21 991787979", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Keli, Cauã e Gabriel", apelido: "Keli", telefone: "21 976755879", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Jordana e Lívia", apelido: "Jordana", telefone: "21 981863601", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Suellen (Su)", apelido: "Su", telefone: "21 979836420", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Danielle (Magra)", apelido: "Magra", telefone: "21 996099990", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Daniela, Carim, Gabriel e Christian", apelido: "Daniela", telefone: "21 991850748", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Manoela, Chris, Mia e Oliver", apelido: "Manoela", telefone: "21 992928383", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Magda e Francisco", apelido: "Magda", telefone: "21 979164546", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Bruna, Nicolle, Rodolfo e Vincenzo", apelido: "Bruna", telefone: "21 980026434", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Vó Gina", apelido: "Vó", telefone: "21 999871224", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tia Maninha", apelido: "Tia", telefone: "21 965318237", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Fátima", apelido: "Fátima", telefone: "21 983160028", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "João e Stephanie", apelido: "João", telefone: "21 983160259", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Odenir e Solange", apelido: "Odenir", telefone: "21 964264229", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Celso e Heloísa", apelido: "Celso", telefone: "21 999824200", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tia Regina e Francisco", apelido: "Tia", telefone: "21 996221869", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Marceu e Adriana", apelido: "Marceu", telefone: "21 999184295", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Teresa Cristina", apelido: "Teresa", telefone: "21 988887769", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Pedro (Pedrão) e Mariana", apelido: "Pedrão", telefone: "21 999206680", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Vinícius e Cláudia", apelido: "Vinícius", telefone: "21 999520098", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Bel", apelido: "Bel", telefone: "21 995301058", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Lanna e Arthur", apelido: "Lanna", telefone: "21 985762367", item: "FRALDA PAMPERS RN PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Milton, Rose, Aninha e Raissa", apelido: "Milton", telefone: "21 995414941", item: "FRALDA PAMPERS RN PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tio Paulinho e Soraya", apelido: "Tio", telefone: "61 984489899", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Carlos Alexandre (Kaká) e Tia Irone", apelido: "Kaká", telefone: "27 998490101", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tio Beto", apelido: "Tio", telefone: "27 998489357", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tio Lidi e Tia Tânia", apelido: "Tio", telefone: "27 996243913", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Alex e família", apelido: "Alex", telefone: "21 993841891", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Cadu e família", apelido: "Cadu", telefone: "21 984573791", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Georgia e Família", apelido: "Georgia", telefone: "21 999298959", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Priscila e Caio", apelido: "Priscila", telefone: "21 988492964", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Fernanda e Família", apelido: "Fernanda", telefone: "21 994094573", item: "FRALDA PAMPERS P PREMIUM CARE + POMADA P/ ASSADURA" },
  { nome: "Tio Daniel, Tia Carla, Victor e Giullia", apelido: "Tio", telefone: "21 988202953", item: "FRALDA PAMPERS P PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tia Deca e Tio Umberto", apelido: "Tia", telefone: "21 985853580", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tia Katia e Victoria", apelido: "Tia", telefone: "21 976190196", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tio Nico e Família", apelido: "Tio", telefone: "21 991255176", item: "FRALDA PAMPERS M PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Denis, Ciça e Leon", apelido: "Denis", telefone: "21 997695506", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tia Dedé", apelido: "Tia", telefone: "21 971232380", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" },
  { nome: "Tia Cristina", apelido: "Tia", telefone: "24 999150455", item: "FRALDA PAMPERS G PREMIUM CARE + LENÇO UMEDECIDO PAMPERS OU GRANADO" }
  ]


  const sendWebhook = async (data: { found: boolean; name?: string; telefone?: string; item?: string; searchTerm?: string }) => {
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
            telefone: data.telefone,
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

  // Normalize string by removing accents and converting to lowercase
  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
      .trim()
  }

  // Check if search term matches as a complete word in the name
  const matchesName = (name: string, searchTerm: string): boolean => {
    const normalizedName = normalizeString(name)
    const normalizedSearch = normalizeString(searchTerm)

    // Split name into words (by space, comma, "e", etc.)
    const words = normalizedName.split(/[\s,]+/).filter(word => word.length > 0)

    // Check if any word matches the search term exactly
    return words.some(word => word === normalizedSearch)
  }

  const handleSearch = async () => {
    if (!searchInput.trim()) return

    setIsLoading(true)
    setSearchResult(null)
    setShowConfetti(false)
    setShowSelectionDialog(false)

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 300))

    const searchTerm = normalizeString(searchInput)

    // Ignore generic titles ONLY when searched alone (single word)
    // Allow "Tia Katia" but block just "tia"
    const searchWords = searchTerm.split(/[\s,]+/).filter(word => word.length > 0)
    const genericTitles = ['e', 'de', 'da', 'do', 'das', 'dos', 'tio', 'tia']

    if (searchWords.length === 1 && genericTitles.includes(searchWords[0])) {
      setSearchResult({
        found: false
      })
      setIsLoading(false)
      return
    }

    // Find ALL matches - search in both nickname and as word in full name
    // OR search by full name (e.g., "Tia Katia")
    const foundGifts = giftList.filter(gift =>
      normalizeString(gift.apelido) === searchTerm ||
      normalizeString(gift.nome) === searchTerm ||
      matchesName(gift.nome, searchTerm)
    )

    if (foundGifts.length === 1) {
      // Only one match - show the result directly
      const foundGift = foundGifts[0]
      setSearchResult({
        found: true,
        name: foundGift.nome,
        item: foundGift.item
      })
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)

      await sendWebhook({
        searchTerm: searchInput.trim(),
        found: true,
        name: foundGift.nome,
        telefone: foundGift.telefone,
        item: foundGift.item
      })
    } else if (foundGifts.length > 1) {
      // Multiple matches - show selection dialog
      setMultipleMatches(foundGifts)
      setShowSelectionDialog(true)
    } else {
      // No matches
      setSearchResult({
        found: false
      })
    }

    setIsLoading(false)
  }

  const handleSelectMatch = async (selectedGift: GiftItem) => {
    setShowSelectionDialog(false)
    setSearchResult({
      found: true,
      name: selectedGift.nome,
      item: selectedGift.item
    })
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)

    await sendWebhook({
      searchTerm: searchInput.trim(),
      found: true,
      name: selectedGift.nome,
      telefone: selectedGift.telefone,
      item: selectedGift.item
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5F9] via-[#F0F8FF] to-[#E8F5F9] relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#E8F5F9] via-[#F0F8FF] to-[#D4E8F1] animate-gradient-slow opacity-60"></div>

      {/* Sky Elements - Birds and Planes */}
      <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
        {/* Flying Birds (Seagulls) with Wing Flapping */}
        <div className="absolute top-[15%] animate-bird-fly-1">
          <div className="relative w-8 h-4">
            {/* Left wing - animated */}
            <div className="absolute left-0 w-4 h-1 bg-gray-400/60 rounded-full origin-right animate-wing-flap-left"></div>
            {/* Body */}
            <div className="absolute left-1/2 top-1/2 w-1 h-1 bg-gray-500/70 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            {/* Right wing - animated */}
            <div className="absolute right-0 w-4 h-1 bg-gray-400/60 rounded-full origin-left animate-wing-flap-right"></div>
          </div>
        </div>

        <div className="absolute top-[25%] animate-bird-fly-2" style={{animationDelay: '3s'}}>
          <div className="relative w-6 h-3">
            <div className="absolute left-0 w-3 h-0.5 bg-gray-400/50 rounded-full origin-right animate-wing-flap-left"></div>
            <div className="absolute left-1/2 top-1/2 w-0.5 h-0.5 bg-gray-500/60 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute right-0 w-3 h-0.5 bg-gray-400/50 rounded-full origin-left animate-wing-flap-right"></div>
          </div>
        </div>

        <div className="absolute top-[10%] animate-bird-fly-3" style={{animationDelay: '7s'}}>
          <div className="relative w-7 h-3">
            <div className="absolute left-0 w-3.5 h-0.5 bg-gray-400/55 rounded-full origin-right animate-wing-flap-left"></div>
            <div className="absolute left-1/2 top-1/2 w-0.5 h-0.5 bg-gray-500/65 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute right-0 w-3.5 h-0.5 bg-gray-400/55 rounded-full origin-left animate-wing-flap-right"></div>
          </div>
        </div>

        {/* Small clouds drifting */}
        <div className="absolute top-[12%] left-[20%] animate-cloud-drift-1">
          <div className="w-16 h-6 bg-white/40 rounded-full blur-sm"></div>
        </div>
        <div className="absolute top-[20%] right-[30%] animate-cloud-drift-2">
          <div className="w-20 h-7 bg-white/35 rounded-full blur-sm"></div>
        </div>
        <div className="absolute top-[18%] left-[60%] animate-cloud-drift-3">
          <div className="w-14 h-5 bg-white/30 rounded-full blur-sm"></div>
        </div>

        {/* Floating Bubbles/Particles */}
        <div className="absolute top-[10%] left-[15%] w-3 h-3 bg-blue-200/30 rounded-full animate-float-bubble-1"></div>
        <div className="absolute top-[30%] left-[75%] w-2 h-2 bg-blue-300/40 rounded-full animate-float-bubble-2"></div>
        <div className="absolute top-[50%] left-[25%] w-4 h-4 bg-blue-200/25 rounded-full animate-float-bubble-3"></div>
        <div className="absolute top-[70%] right-[20%] w-3 h-3 bg-blue-300/35 rounded-full animate-float-bubble-4"></div>
        <div className="absolute top-[20%] right-[40%] w-2 h-2 bg-blue-200/30 rounded-full animate-float-bubble-1" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-[60%] left-[60%] w-3 h-3 bg-blue-300/30 rounded-full animate-float-bubble-2" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Decorative Elements Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Complete Beach Scene - Full Width at Bottom with Subtle Animation */}
        <div className="absolute bottom-0 left-0 right-0 w-full animate-wave-subtle">
          <img
            src={`${process.env.NODE_ENV === 'production' ? '/cha-de-bebe-felipe' : ''}/beach-with-clouds.png`}
            alt="Beach scene with palm tree, waves and clouds"
            className="w-full h-auto object-cover object-bottom"
          />
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

      <div className="container mx-auto px-4 py-4 relative z-20">
        {/* Baby on Board Title - Floating Animation + Shine Effect */}
        <div className="text-center pt-4 md:pt-6 mb-4">
          <div className="relative inline-block">
            <img
              src={`${process.env.NODE_ENV === 'production' ? '/cha-de-bebe-felipe' : ''}/babyonboard.png`}
              alt="Baby on Board"
              className="w-full max-w-md md:max-w-xl mx-auto animate-float-title drop-shadow-2xl"
            />
            {/* Shine overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine pointer-events-none"></div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-6">
          {/* Baby Name */}
          <div className="mb-4">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#7BA8BC] px-4 py-1 animate-fade-in-up">
              Felipe Monteiro Delboni 👶🏻
            </h2>
          </div>

          {/* Event Details Card - Enhanced Glassmorphism */}
          <div className="max-w-sm mx-auto bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-3 md:p-4 border border-white/40 transition-all duration-500 animate-card-entrance hover:shadow-xl hover:scale-105 hover:bg-white/80 group">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg md:text-xl">📅</span>
                <span className="text-base md:text-xl font-bold text-[#5A8CA3]">16/11 - 14h</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg md:text-xl">📍</span>
                <a
                  href="https://share.google/paFdm3ZPtXyhYeyCw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-base text-[#5A8CA3] text-center leading-tight hover:text-[#4A7A93] hover:underline transition-all duration-300 cursor-pointer font-medium"
                >
                  Salão de festas condomínio<br />San Filippo
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Gift Finder Section - Premium Glassmorphism */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-300/50 to-cyan-300/50 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-3 md:p-4 border border-white/40 animate-section-entrance hover:shadow-xl hover:bg-white/80 transition-all duration-500">
              <div className="text-center mb-3">
                <h3 className="text-lg md:text-xl font-bold text-[#5A8CA3] mb-1">
                  🎁 Você está convidado!
                </h3>
                <p className="text-xs md:text-sm text-[#5A8CA3]/80 font-medium">
                  Digite seu nome ou apelido abaixo
                </p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-[#7BA8BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite seu nome ou apelido..."
                    className="w-full pl-10 pr-3 py-2 md:py-3 text-sm md:text-base text-[#5A8CA3] placeholder:text-[#A8C9D8] border border-[#A8C9D8] rounded-lg focus:ring-2 focus:ring-[#D4E8F1] focus:border-[#5A8CA3] outline-none transition-all duration-300 bg-white/80 font-medium"
                    disabled={isLoading}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isLoading || !searchInput.trim()}
                  className="group relative w-full py-2 md:py-3 px-6 bg-gradient-to-r from-[#7BA8BC] via-[#5A8CA3] to-[#7BA8BC] hover:from-[#5A8CA3] hover:via-[#4A7A93] hover:to-[#5A8CA3] disabled:from-gray-400 disabled:to-gray-500 text-white text-sm md:text-base font-bold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 disabled:scale-100 disabled:cursor-not-allowed animate-gradient-x overflow-hidden"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Procurando...
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Descobrir meu presente 🎁</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                    </>
                  )}
                </button>

                {/* Multiple Matches Selection Dialog */}
                {showSelectionDialog && multipleMatches.length > 0 && (
                  <div className="mt-3 p-3 md:p-4 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300 transition-all duration-500 transform scale-105">
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-lg">🤔</div>
                        <p className="text-xs md:text-sm font-bold text-blue-800">
                          Encontramos {multipleMatches.length} pessoas com esse nome. Qual delas é você?
                        </p>
                      </div>
                      <div className="space-y-2">
                        {multipleMatches.map((gift, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectMatch(gift)}
                            className="w-full p-3 bg-white/80 hover:bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                          >
                            <p className="text-sm md:text-base font-bold text-blue-900">
                              {gift.nome}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Search Results - SMALLER */}
                {searchResult && !showSelectionDialog && (
                  <div className={`mt-3 p-3 md:p-4 rounded-lg text-center transition-all duration-500 transform ${
                    searchResult.found
                      ? 'bg-gradient-to-r from-green-100 to-blue-100 border border-green-300 scale-105'
                      : 'bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300'
                  }`}>
                    {searchResult.found ? (
                      <div className="space-y-2">
                        <div className="text-lg animate-pulse">✨</div>
                        <p className="text-xs md:text-sm font-bold text-green-800">
                          {searchResult.name}, você ficou responsável por trazer:
                        </p>
                        <p className="text-base md:text-lg font-bold text-blue-900 bg-white/70 rounded-lg py-1 px-3 inline-block">
                          {searchResult.item}
                        </p>
                        <div className="mt-2 pt-2 border-t border-green-300">
                          <p className="text-xs md:text-sm text-green-700 font-medium">
                            📱 Cheque seu WhatsApp em alguns minutos para receber a confirmação!
                          </p>
                        </div>
                        <div className="text-lg animate-pulse">✨</div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-lg">🤦🏻‍♀️</div>
                        <p className="text-xs md:text-sm font-semibold text-orange-800">
                          Nome não encontrado. Tente apenas seu primeiro nome ou apelido.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message - Enhanced */}
        <div className="text-center mt-6 mb-24 md:mb-6">
          <div className="relative max-w-md mx-auto group">
            <div className="relative bg-white/70 backdrop-blur-md rounded-xl p-3 md:p-4 shadow-lg border border-white/40 animate-footer-entrance hover:shadow-xl hover:scale-105 hover:bg-white/80 transition-all duration-500">
              <p className="text-sm md:text-base text-[#5A8CA3] font-medium leading-snug">
                Contamos com sua presença para celebrar a chegada do nosso bebê!
                <span className="animate-heartbeat inline-block ml-1 text-xl">💙</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cookie-regular {
          font-family: "Cookie", cursive !important;
          font-weight: 400;
          font-style: normal;
        }

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
        @keyframes wave-gentle {
          0%, 100% { transform: translateX(0px) translateY(0px) scale(1); }
          25% { transform: translateX(-15px) translateY(-8px) scale(1.02); }
          50% { transform: translateX(-25px) translateY(-5px) scale(1.05); }
          75% { transform: translateX(-15px) translateY(-3px) scale(1.02); }
        }

        /* Premium Effects Animations */
        @keyframes gradient-slow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes wave-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-title {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes float-bubble-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(20px, -40px) scale(1.2); opacity: 0.6; }
        }
        @keyframes float-bubble-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(-25px, -50px) scale(1.3); opacity: 0.7; }
        }
        @keyframes float-bubble-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(30px, -45px) scale(1.4); opacity: 0.5; }
        }
        @keyframes float-bubble-4 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          50% { transform: translate(-20px, -55px) scale(1.25); opacity: 0.65; }
        }

        /* Sky Elements Animations */
        @keyframes bird-fly-1 {
          0% {
            left: -10%;
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
          100% {
            left: 110%;
            transform: translateY(10px) scale(1);
          }
        }
        @keyframes bird-fly-2 {
          0% {
            right: -10%;
            transform: translateY(0px) scale(0.8) scaleX(-1);
          }
          50% {
            transform: translateY(-15px) scale(0.9) scaleX(-1);
          }
          100% {
            right: 110%;
            transform: translateY(5px) scale(0.8) scaleX(-1);
          }
        }
        @keyframes bird-fly-3 {
          0% {
            left: -10%;
            transform: translateY(0px) scale(0.9);
          }
          50% {
            transform: translateY(-25px) scale(1);
          }
          100% {
            left: 110%;
            transform: translateY(-5px) scale(0.9);
          }
        }
        @keyframes plane-fly {
          0% {
            right: -10%;
            transform: translateY(0px) rotate(-90deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            right: 120%;
            transform: translateY(-30px) rotate(-90deg);
            opacity: 0;
          }
        }

        /* Wing Flapping Animation */
        @keyframes wing-flap-left {
          0%, 100% {
            transform: rotate(-15deg) scaleY(1);
          }
          50% {
            transform: rotate(-45deg) scaleY(0.7);
          }
        }
        @keyframes wing-flap-right {
          0%, 100% {
            transform: rotate(15deg) scaleY(1);
          }
          50% {
            transform: rotate(45deg) scaleY(0.7);
          }
        }
        @keyframes cloud-drift-1 {
          0% { transform: translateX(0px); }
          100% { transform: translateX(100vw); }
        }
        @keyframes cloud-drift-2 {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-100vw); }
        }
        @keyframes cloud-drift-3 {
          0% { transform: translateX(0px); }
          100% { transform: translateX(80vw); }
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
        .animate-wave-gentle { animation: wave-gentle 6s ease-in-out infinite; }

        /* Premium Effect Classes */
        .animate-gradient-slow { animation: gradient-slow 15s ease infinite; background-size: 400% 400%; }
        .animate-wave-subtle { animation: wave-subtle 8s ease-in-out infinite; }
        .animate-float-title { animation: float-title 6s ease-in-out infinite; }
        .animate-shine { animation: shine 3s ease-in-out infinite; animation-delay: 2s; }
        .animate-float-bubble-1 { animation: float-bubble-1 8s ease-in-out infinite; }
        .animate-float-bubble-2 { animation: float-bubble-2 10s ease-in-out infinite; }
        .animate-float-bubble-3 { animation: float-bubble-3 12s ease-in-out infinite; }
        .animate-float-bubble-4 { animation: float-bubble-4 9s ease-in-out infinite; }

        /* Sky Elements Classes */
        .animate-bird-fly-1 { animation: bird-fly-1 25s linear infinite; }
        .animate-bird-fly-2 { animation: bird-fly-2 30s linear infinite; }
        .animate-bird-fly-3 { animation: bird-fly-3 28s linear infinite; }
        .animate-plane-fly { animation: plane-fly 45s linear infinite; }
        .animate-cloud-drift-1 { animation: cloud-drift-1 120s linear infinite; }
        .animate-cloud-drift-2 { animation: cloud-drift-2 150s linear infinite; }
        .animate-cloud-drift-3 { animation: cloud-drift-3 100s linear infinite; }

        /* Wing Flapping Classes */
        .animate-wing-flap-left { animation: wing-flap-left 0.6s ease-in-out infinite; }
        .animate-wing-flap-right { animation: wing-flap-right 0.6s ease-in-out infinite; }

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