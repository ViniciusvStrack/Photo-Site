import type { PhotoItem, ServicePackage, AddonItem, Testimonial, TeamMember, ClientPortalSession } from '../types';

// Helper to generate elegant Gourmet Light European Atelier SVG photography placeholders
export const generateSvgPlaceholder = (title: string, subtitle: string, color1: string, color2: string, motif: 'lens' | 'portrait' | 'landscape' | 'minimal' = 'lens'): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="grad-${title.replace(/\s+/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="50%" stop-color="#2B2A27" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="${color1}" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#1C1B18" stop-opacity="0" />
      </radialGradient>
      <filter id="blur">
        <feGaussianBlur stdDeviation="40" />
      </filter>
    </defs>
    
    <rect width="800" height="600" fill="url(#grad-${title.replace(/\s+/g, '')})" />
    <circle cx="400" cy="300" r="280" fill="url(#glow)" filter="url(#blur)" />
    
    <!-- Geometric Camera/Light Motif -->
    ${motif === 'lens' ? `
      <circle cx="400" cy="270" r="140" fill="none" stroke="rgba(253,252,249,0.15)" stroke-width="2" />
      <circle cx="400" cy="270" r="100" fill="none" stroke="rgba(253,252,249,0.25)" stroke-width="1" stroke-dasharray="4 8" />
      <circle cx="400" cy="270" r="60" fill="none" stroke="rgba(253,252,249,0.35)" stroke-width="1.5" />
      <path d="M400 130 L400 160 M400 380 L400 410 M260 270 L290 270 M510 270 L540 270" stroke="rgba(253,252,249,0.3)" stroke-width="2" />
      <circle cx="440" cy="230" r="8" fill="rgba(253,252,249,0.5)" filter="url(#blur)" />
    ` : motif === 'portrait' ? `
      <circle cx="400" cy="230" r="70" fill="none" stroke="rgba(253,252,249,0.25)" stroke-width="2" />
      <path d="M300 390 C300 330 340 310 400 310 C460 310 500 330 500 390" fill="none" stroke="rgba(253,252,249,0.25)" stroke-width="2" />
      <line x1="250" y1="230" x2="550" y2="230" stroke="rgba(253,252,249,0.1)" stroke-width="1" />
    ` : motif === 'landscape' ? `
      <path d="M150 400 L320 220 L450 350 L580 180 L700 400 Z" fill="none" stroke="rgba(253,252,249,0.2)" stroke-width="2" />
      <circle cx="580" cy="180" r="30" fill="none" stroke="rgba(253,252,249,0.3)" stroke-width="1.5" stroke-dasharray="2 4" />
      <line x1="100" y1="400" x2="700" y2="400" stroke="rgba(253,252,249,0.3)" stroke-width="1" />
    ` : `
      <rect x="250" y="170" width="300" height="200" rx="12" fill="none" stroke="rgba(253,252,249,0.2)" stroke-width="2" />
      <line x1="250" y1="230" x2="550" y2="230" stroke="rgba(253,252,249,0.15)" stroke-width="1" />
      <circle cx="400" cy="270" r="35" fill="none" stroke="rgba(253,252,249,0.3)" stroke-width="2" />
    `}

    <!-- Aesthetic Corner Frame Marks -->
    <path d="M 40 60 L 40 40 L 60 40" fill="none" stroke="rgba(253,252,249,0.4)" stroke-width="2" />
    <path d="M 760 60 L 760 40 L 740 40" fill="none" stroke="rgba(253,252,249,0.4)" stroke-width="2" />
    <path d="M 40 540 L 40 560 L 60 560" fill="none" stroke="rgba(253,252,249,0.4)" stroke-width="2" />
    <path d="M 760 540 L 760 560 L 740 560" fill="none" stroke="rgba(253,252,249,0.4)" stroke-width="2" />

    <!-- Typography -->
    <text x="400" y="480" font-family="'Cormorant Garamond', 'Playfair Display', Didot, serif" font-size="32" font-weight="600" fill="#FDFCF9" text-anchor="middle" letter-spacing="4">${title.toUpperCase()}</text>
    <text x="400" y="515" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500" fill="rgba(253,252,249,0.75)" text-anchor="middle" letter-spacing="6">${subtitle.toUpperCase()}</text>
    <text x="400" y="555" font-family="'Space Mono', monospace" font-size="11" font-weight="400" fill="rgba(253,252,249,0.45)" text-anchor="middle" letter-spacing="2">LUMEN ATELIER • FINE ART PRORAW</text>
  </svg>`;
  
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const MOCK_PHOTOS: PhotoItem[] = [
  {
    id: 'pho-01',
    title: 'O Voto ao Entardecer',
    category: 'casamento',
    categoryLabel: 'Casamentos & Eventos',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    fallbackSvg: generateSvgPlaceholder('O Voto ao Entardecer', 'Casamento em Fernando de Noronha', '#C5A059', '#8B4F58', 'lens'),
    aspectRatio: 'landscape',
    exif: {
      camera: 'Sony Alpha 1',
      lens: 'FE 85mm f/1.4 GM',
      aperture: 'f/1.4',
      shutter: '1/3200s',
      iso: 'ISO 100',
      focalLength: '85mm'
    },
    location: 'Fernando de Noronha, PE',
    date: '14 de Maio de 2026',
    likes: 342,
    description: 'A luz dourada do entardecer capturada com precisão cinematográfica durante a troca de alianças na Capela de São Pedro.',
    featured: true
  },
  {
    id: 'pho-02',
    title: 'Visão Executiva em Alto Contraste',
    category: 'retrato',
    categoryLabel: 'Retratos & Branding',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
    fallbackSvg: generateSvgPlaceholder('Visão Executiva', 'Personal Branding Studio', '#A86A3D', '#2B2A27', 'portrait'),
    aspectRatio: 'portrait',
    exif: {
      camera: 'Leica M11',
      lens: 'Noctilux-M 50mm f/0.95 ASPH',
      aperture: 'f/1.2',
      shutter: '1/250s',
      iso: 'ISO 64',
      focalLength: '50mm'
    },
    location: 'Avenida Faria Lima, SP',
    date: '02 de Junho de 2026',
    likes: 289,
    description: 'Ensaio de branding executivo com iluminação chiaroscuro em estúdio, realçando textura, profundidade e autenticidade profissional.',
    featured: true
  },
  {
    id: 'pho-03',
    title: 'Simetria Arquitetônica & Luz',
    category: 'comercial',
    categoryLabel: 'Comercial & Arquitetura',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    fallbackSvg: generateSvgPlaceholder('Simetria Arquitetônica', 'Residência Minimalista SP', '#5F7367', '#1C1B18', 'landscape'),
    aspectRatio: 'wide',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 21mm f/4',
      aperture: 'f/8.0',
      shutter: '1/15s (Tripé Pro)',
      iso: 'ISO 64',
      focalLength: '21mm'
    },
    location: 'Boa Viagem, Recife - PE',
    date: '20 de Abril de 2026',
    likes: 195,
    description: 'Captura de arquitetura de alto padrão com controle rigoroso de perspectiva e HDR de 16 bits para revista de design interior.',
    featured: true
  },
  {
    id: 'pho-04',
    title: 'Neblina Noturna no Pico',
    category: 'natureza',
    categoryLabel: 'Natureza & Fine Art',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    fallbackSvg: generateSvgPlaceholder('Neblina no Pico', 'Série Fine Art Monocromático', '#8A857B', '#5C5850', 'landscape'),
    aspectRatio: 'landscape',
    exif: {
      camera: 'Sony Alpha 7R V',
      lens: 'FE 24-70mm f/2.8 GM II',
      aperture: 'f/5.6',
      shutter: '15s Long Exposure',
      iso: 'ISO 100',
      focalLength: '35mm'
    },
    location: 'Chapada Diamantina, BA',
    date: '10 de Janeiro de 2026',
    likes: 512,
    description: 'Longa exposição revelando o movimento etéreo das nuvens sob o luar na cordilheira central. Impressão Fine Art disponível em papel algodão.',
    featured: true
  },
  {
    id: 'pho-05',
    title: 'Editorial Haute Couture Outono',
    category: 'editorial',
    categoryLabel: 'Moda & Editorial',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    fallbackSvg: generateSvgPlaceholder('Haute Couture Outono', 'Editorial Vogue Inspired', '#B8860B', '#8B4F58', 'portrait'),
    aspectRatio: 'portrait',
    exif: {
      camera: 'Canon EOS R1',
      lens: 'RF 85mm f/1.2 L USM DS',
      aperture: 'f/1.2',
      shutter: '1/1600s',
      iso: 'ISO 100',
      focalLength: '85mm'
    },
    location: 'Pina, Recife - PE',
    date: '28 de Fevereiro de 2026',
    likes: 423,
    description: 'Ensaio editorial de moda para marca de alta costura, com paleta de tons terrosos e desfoque suave característico da lente Defocus Smoothing.',
    featured: false
  },
  {
    id: 'pho-06',
    title: 'A Dança das Luzes de Estúdio',
    category: 'retrato',
    categoryLabel: 'Retratos & Branding',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
    fallbackSvg: generateSvgPlaceholder('A Dança das Luzes', 'Estúdio Lumen São Lourenço', '#A86A3D', '#5C5850', 'portrait'),
    aspectRatio: 'square',
    exif: {
      camera: 'Sony Alpha 1',
      lens: 'FE 50mm f/1.2 GM',
      aperture: 'f/2.8',
      shutter: '1/200s (Flash Sync)',
      iso: 'ISO 100',
      focalLength: '50mm'
    },
    location: 'São Lourenço da Mata, PE',
    date: '15 de Março de 2026',
    likes: 278,
    description: 'Iluminação técnica com dois softboxes octagonais Profoto e rim-light azulado, criando presença magnética e autoridade visual.',
    featured: false
  },
  {
    id: 'pho-07',
    title: 'O Primeiro Brinde do Casal',
    category: 'casamento',
    categoryLabel: 'Casamentos & Eventos',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    fallbackSvg: generateSvgPlaceholder('O Primeiro Brinde', 'Recepção no Castelo', '#C5A059', '#A86A3D', 'lens'),
    aspectRatio: 'landscape',
    exif: {
      camera: 'Sony Alpha 1',
      lens: 'FE 35mm f/1.4 GM',
      aperture: 'f/1.4',
      shutter: '1/500s',
      iso: 'ISO 800',
      focalLength: '35mm'
    },
    location: 'Olinda, PE',
    date: '22 de Novembro de 2025',
    likes: 389,
    description: 'A alegria espontânea capturada sem interferência em meio à recepção intimista. Edição com grain orgânico estilo Kodak Portra 400.',
    featured: false
  },
  {
    id: 'pho-08',
    title: 'Reflexos de Vidro no Corporate',
    category: 'comercial',
    categoryLabel: 'Comercial & Arquitetura',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    fallbackSvg: generateSvgPlaceholder('Reflexos de Vidro', 'Edifício Comercial Faria Lima', '#5F7367', '#2B2A27', 'landscape'),
    aspectRatio: 'wide',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 38mm f/2.5 V',
      aperture: 'f/11',
      shutter: '1/60s',
      iso: 'ISO 64',
      focalLength: '38mm'
    },
    location: 'Recife Antigo, PE',
    date: '05 de Junho de 2026',
    likes: 164,
    description: 'O contraste da fachada histórica restaurada com o vidro espelhado das novas corporações no polo tecnológico do Porto Digital.',
    featured: false
  },
  {
    id: 'pho-09',
    title: 'Essência da Natureza Morta',
    category: 'natureza',
    categoryLabel: 'Natureza & Fine Art',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85',
    fallbackSvg: generateSvgPlaceholder('Essência da Natureza', 'Parque Nacional Monocromático', '#5F7367', '#8A857B', 'landscape'),
    aspectRatio: 'landscape',
    exif: {
      camera: 'Leica Q3',
      lens: 'Summilux 28mm f/1.7 ASPH',
      aperture: 'f/4.0',
      shutter: '1/1000s',
      iso: 'ISO 100',
      focalLength: '28mm'
    },
    location: 'Aldeia, São Lourenço da Mata - PE',
    date: '18 de Junho de 2026',
    likes: 310,
    description: 'A serenidade da mata atlântica preservada nas primeiras horas da manhã, com raios solares filtrados pela densa copa das árvores.',
    featured: false
  }
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'pkg-portrait',
    title: 'Ensaio Retrato & Personal Branding',
    subtitle: 'Para executivos, médicos, advogados e criadores de conteúdo que buscam autoridade imediata no mercado.',
    price: 1490,
    period: 'por sessão',
    badge: 'Essencial',
    popular: false,
    duration: '2 horas de estúdio ou externa',
    deliverables: '30 fotos retocadas em High-End Skin Retouch',
    recommendedFor: 'Profissionais liberais, LinkedIn, Palestrantes e Redes Sociais',
    features: [
      'Sessão de 2 horas em estúdio próprio ou locação corporativa',
      'Direção de pose e expressão facial assistida por IA visual',
      'Troca para até 3 figurinos diferentes com consultoria de estilo',
      '30 fotos finais com tratamento de pele natural (High-End Retouching)',
      'Entrega digital via galeria em nuvem privada em até 48 horas',
      'Direitos de uso comercial irrestritos para mídia digital'
    ]
  },
  {
    id: 'pkg-wedding',
    title: 'Casamento & Evento Premium',
    subtitle: 'A narrativa documental completa do seu dia mais inesquecível, com estética de cinema europeu e discrição absoluta.',
    price: 8900,
    period: 'cobertura total',
    badge: 'Mais Popular',
    popular: true,
    duration: 'Até 10 horas de cobertura contínua',
    deliverables: 'Todas as fotos em ProRAW + Álbum Couro 30x30cm',
    recommendedFor: 'Casamentos de alto padrão, Destination Weddings e Bodas',
    features: [
      '2 Fotógrafos Seniores + 1 Assistente de iluminação dedicados',
      'Cobertura do Making Of, Cerimônia, Recepção e Festa (até 10h)',
      'Sessão Pre-Wedding inclusa em locação externa de preferência',
      'Entrega de mínimo 600 fotos em alta resolução sem marca d\'água',
      'Álbum encadernado em couro italiano artesanal com 50 páginas',
      'Pendrive de cristal em estojo de madeira gravado a laser',
      'Preview de 30 fotos entregue no dia seguinte para redes sociais'
    ]
  },
  {
    id: 'pkg-commercial',
    title: 'Produção Editorial & Publicidade',
    subtitle: 'Solução visual definitiva para marcas de moda, arquitetura, gastronomia e campanhas publicitárias de alto impacto.',
    price: 5500,
    period: 'por diária (8h)',
    badge: 'Corporativo / Vogue',
    popular: false,
    duration: 'Diária completa de 8 horas',
    deliverables: 'Catálogo completo + Color Grading Customizado',
    recommendedFor: 'Agências de publicidade, Marcas de Moda e Construtoras',
    features: [
      'Estúdio móvel completo com iluminação Profoto e gerador de energia',
      'Acompanhamento em tempo real em monitor 4K Pro Display XDR para cliente/agência',
      'Tratamento color grading avançado em espaço de cor Adobe RGB / DCI-P3',
      'Trabalho integrado com estilistas, maquiadores e produtores de arte',
      'Cessão de direitos autorais para veiculação em outdoor, TV e imprensa impressa',
      'Arquivo de backup garantido em nuvem redundante por 5 anos'
    ]
  },
  {
    id: 'pkg-cinema',
    title: 'Cinematografia & Foto Aérea 8K',
    subtitle: 'Perspectivas deslumbrantes com drones de última geração e câmeras cinematográficas em gimbal stabilizado.',
    price: 3200,
    period: 'por projeto',
    badge: 'Tecnologia Drone',
    popular: false,
    duration: 'Meia diária ou voos programados',
    deliverables: 'Vídeo Reel 4K Dolby Vision + 40 Fotos Aéreas',
    recommendedFor: 'Imóveis de Luxo, Hotéis, Resorts e Videoclipes Artísticos',
    features: [
      'Voo com drone profissional DJI Inspire 3 & Zenmuse X9-8K Air',
      'Piloto licenciado pela ANAC e DECEA com seguro RETA de cobertura',
      'Edição de vídeo com corte dinâmico, sound design imersivo e trilha licenciada',
      '40 fotografias aéreas em formato RAW 48 Megapixels',
      'Entrega formatada para Reels/TikTok (9:16) e Cinema/YouTube (16:9)',
      'Estabilização milimétrica mesmo em condições de vento costeiro'
    ]
  }
];

export const ADDONS_LIST: AddonItem[] = [
  {
    id: 'add-makeup',
    title: 'Make-up & Hair Artist no Local',
    description: 'Profissional de maquiagem HD resistente à luz de estúdio acompanhando toda a sessão com retoques instantâneos.',
    price: 450,
    icon: 'Sparkles'
  },
  {
    id: 'add-reel',
    title: 'Vídeo Reel Cinematográfico de 60s',
    description: 'Gravação em 4K 120fps (câmera lenta vertical) com edição dinâmica para viralizar no Instagram e TikTok.',
    price: 600,
    icon: 'Video'
  },
  {
    id: 'add-express',
    title: 'Entrega Super Expressa (24 Horas)',
    description: 'Prioridade máxima em nosso laboratório de edição digital com galeria final entregue no dia seguinte.',
    price: 350,
    icon: 'Zap'
  },
  {
    id: 'add-album',
    title: 'Fotolivro Extra Fine Art 30x30cm',
    description: 'Álbum adicional com folhas duplas em papel algodão museu 310g, perfeito para presentear pais ou sócios.',
    price: 890,
    icon: 'BookOpen'
  },
  {
    id: 'add-drone',
    title: 'Minienquadramento Aéreo com Drone',
    description: 'Inclusão de tomadas aéreas em 4K e fotos de perspectiva elevada durante ensaios externos ou casamentos.',
    price: 750,
    icon: 'Navigation'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dra. Camila Albuquerque',
    role: 'CEO & Médica Cirurgiã',
    company: 'Clínica Dermatológica Albuquerque',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    fallbackInitials: 'CA',
    text: 'O ensaio de Personal Branding do Lumen Atelier transformou a percepção da minha marca nas redes sociais e LinkedIn. A iluminação é de nível internacional, o atendimento foi impecável e me senti totalmente à vontade.',
    rating: 5,
    serviceUsed: 'Ensaio Retrato & Personal Branding',
    date: 'Junho de 2026'
  },
  {
    id: 'test-2',
    name: 'Rodrigo & Mariana Vasconcelos',
    role: 'Noivos',
    company: 'Casamento na Praia de Carneiros',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    fallbackInitials: 'RM',
    text: 'Contratar o Lumen foi a melhor decisão do nosso casamento. Eles conseguiram capturar as lágrimas do meu avô, a energia da pista de dança e a luz do pôr do sol de uma maneira poética. Choramos sempre que abrimos o álbum encadernado em couro!',
    rating: 5,
    serviceUsed: 'Casamento & Evento Premium',
    date: 'Maio de 2026'
  },
  {
    id: 'test-3',
    name: 'Lucas Fontes',
    role: 'Diretor Criativo',
    company: 'Agência Chroma Design SP',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    fallbackInitials: 'LF',
    text: 'Como diretor criativo sou extremamente exigente com precisão de cor e nitidez de lente. A equipe do Lumen trabalha com equipamentos Sony A1 e monitores calibrados em tempo real na diária. Entregaram a campanha publicitária 4 dias antes do prazo!',
    rating: 5,
    serviceUsed: 'Produção Editorial & Publicidade',
    date: 'Abril de 2026'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Vinicius Track',
    role: 'Fundador & Diretor de Arte / Fotógrafo Admin',
    bio: 'Com mais de uma década de maestria em luz natural, color grading editorial e cinematografia 4K, Vinicius comanda o acervo autoral e a direção de grandes casamentos e branding corporativo no atelier.',
    specialty: 'Direção Geral & Casamentos Fine Art',
    favoriteGear: 'Sony A1 + Leica M11 + FE 85mm f/1.4 GM',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'team-2',
    name: 'Beatriz Lumen',
    role: 'Co-Fundadora & Diretora Criativa',
    bio: 'Formada em Artes Visuais e Design em São Paulo, Beatriz comanda o estúdio de Personal Branding, direção de arte para moda e o rigoroso laboratório de edição.',
    specialty: 'Retratos Executivos & Moda',
    favoriteGear: 'Leica M11 + Noctilux 50mm f/0.95',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'team-3',
    name: 'Henrique Cavalcanti',
    role: 'Especialista em Cinematografia & Drones',
    bio: 'Piloto licenciado de drone e diretor de fotografia audiovisual. Responsável pelos takes cinematográficos 8K em casamentos de luxo e comerciais de arquitetura.',
    specialty: 'Drone 8K & Vídeo Reels',
    favoriteGear: 'DJI Inspire 3 & Sony FX3',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
  }
];

export const MOCK_CLIENT_PORTALS: ClientPortalSession[] = [
  {
    id: 'portal-wed',
    accessCode: 'LUMEN2026',
    clientName: 'Ana Clara & Pedro Henrique',
    eventTitle: 'Casamento Capela dos Milagres',
    eventDate: '14 de Maio de 2026',
    status: 'Aguardando Seleção',
    totalPhotos: 42,
    selectedCount: 12,
    maxSelection: 30,
    coverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    photos: Array.from({ length: 18 }, (_, idx) => {
      const isSelected = idx < 12;
      const titles = [
        'A Prece da Noiva no Altar',
        'O Sorriso do Noivo na Entrada',
        'A Luz Solitária na Janela',
        'As Alianças de Ouro Branco',
        'O Beijo Sob o Véu',
        'O Brinde em Família',
        'A Primeira Dança dos Noivos',
        'O Abraço do Pai',
        'Por do Sol nos Jardins',
        'Detalhes do Vestido de Renda',
        'O Buquê de Orquídeas Brancas',
        'Brinde com Champagne na Pista',
        'Corte do Bolo de 5 Andares',
        'A Energia da Banda ao Vivo',
        'Saída sob Fainhas de Prata',
        'Retrato Clássico P&B do Casal',
        'Sorrisos Espontâneos das Madrinhas',
        'A Serenidade após o Sim'
      ];
      return {
        id: `c-photo-${idx + 1}`,
        title: titles[idx % titles.length],
        url: MOCK_PHOTOS[idx % MOCK_PHOTOS.length].url,
        selected: isSelected,
        favorite: idx % 3 === 0
      };
    })
  },
  {
    id: 'portal-vogue',
    accessCode: 'VOGUE2026',
    clientName: 'Revista Chroma & Moda',
    eventTitle: 'Editorial Outono Inverno - Haute Couture',
    eventDate: '28 de Fevereiro de 2026',
    status: 'Concluído',
    totalPhotos: 12,
    selectedCount: 10,
    maxSelection: 15,
    coverUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
    photos: Array.from({ length: 12 }, (_, idx) => ({
      id: `v-photo-${idx + 1}`,
      title: `Take Editorial Look ${idx + 1}`,
      url: MOCK_PHOTOS[(idx + 2) % MOCK_PHOTOS.length].url,
      selected: idx < 10,
      favorite: idx % 2 === 0
    }))
  }
];
