import { dbManager } from './database';

export const seedDatabase = async (): Promise<void> => {
  // Check if photos already exist
  const existingPhotos = await dbManager.query<{ count: number }>('SELECT count(*) as count FROM photos');
  if (existingPhotos[0] && existingPhotos[0].count > 0) {
    console.log('[Seeder] Database is already seeded. Skipping initial seeding.');
    return;
  }

  console.log('[Seeder] Database is empty. Seeding initial LUMEN ATELIER photography data...');

  // 1. Seed Photos
  const photos = [
    [
      'pho-01', 'O Voto ao Entardecer', 'casamento', 'Casamentos & Eventos',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23F5F2EB"/><circle cx="400" cy="300" r="140" fill="none" stroke="rgba(197,160,89,0.4)" stroke-width="2"/><text x="400" y="480" font-family="serif" font-size="28" fill="%231C1B18" text-anchor="middle">O VOTO AO ENTARDECER</text></svg>',
      'landscape', 'Sony Alpha 1', 'FE 85mm f/1.4 GM', 'f/1.4', '1/3200s', 'ISO 100', '85mm',
      'Fernando de Noronha, PE', '14 de Maio de 2026', 342,
      'A luz dourada do entardecer capturada com precisão cinematográfica durante a troca de alianças na Capela de São Pedro.', 1
    ],
    [
      'pho-02', 'Visão Executiva em Alto Contraste', 'retrato', 'Retratos & Branding',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23EFECE6"/><circle cx="400" cy="230" r="70" fill="none" stroke="rgba(168,106,61,0.4)" stroke-width="2"/><text x="400" y="480" font-family="serif" font-size="28" fill="%231C1B18" text-anchor="middle">VISÃO EXECUTIVA</text></svg>',
      'portrait', 'Leica M11', 'Noctilux-M 50mm f/0.95 ASPH', 'f/1.2', '1/250s', 'ISO 64', '50mm',
      'Avenida Faria Lima, SP', '02 de Junho de 2026', 289,
      'Ensaio de branding executivo com iluminação chiaroscuro em estúdio, realçando textura, profundidade e autenticidade profissional.', 1
    ],
    [
      'pho-03', 'Simetria Arquitetônica & Luz', 'comercial', 'Comercial & Arquitetura',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23FAF8F5"/><path d="M150 400 L320 220 L450 350 L580 180 L700 400 Z" fill="none" stroke="rgba(95,115,103,0.5)" stroke-width="2"/><text x="400" y="480" font-family="serif" font-size="28" fill="%231C1B18" text-anchor="middle">SIMETRIA ARQUITETÔNICA</text></svg>',
      'wide', 'Hasselblad X2D 100C', 'XCD 21mm f/4', 'f/8.0', '1/15s (Tripé Pro)', 'ISO 64', '21mm',
      'Boa Viagem, Recife - PE', '20 de Abril de 2026', 195,
      'Captura de arquitetura de alto padrão com controle rigoroso de perspectiva e HDR de 16 bits para revista de design interior.', 1
    ],
    [
      'pho-04', 'Neblina Noturna no Pico', 'natureza', 'Natureza & Fine Art',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23E8E4DC"/><circle cx="580" cy="180" r="30" fill="none" stroke="rgba(138,133,123,0.5)" stroke-width="2"/><text x="400" y="480" font-family="serif" font-size="28" fill="%231C1B18" text-anchor="middle">NEBLINA NO PICO</text></svg>',
      'landscape', 'Sony Alpha 7R V', 'FE 24-70mm f/2.8 GM II', 'f/5.6', '15s Long Exposure', 'ISO 100', '35mm',
      'Chapada Diamantina, BA', '10 de Janeiro de 2026', 512,
      'Longa exposição revelando o movimento etéreo das nuvens sob o luar na cordilheira central. Impressão Fine Art disponível em papel algodão.', 1
    ],
    [
      'pho-05', 'Editorial Haute Couture Outono', 'editorial', 'Moda & Editorial',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85',
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23F5F2EB"/><circle cx="400" cy="270" r="100" fill="none" stroke="rgba(139,79,88,0.4)" stroke-width="2"/><text x="400" y="480" font-family="serif" font-size="28" fill="%231C1B18" text-anchor="middle">HAUTE COUTURE</text></svg>',
      'portrait', 'Canon EOS R1', 'RF 85mm f/1.2 L USM DS', 'f/1.2', '1/1600s', 'ISO 100', '85mm',
      'Pina, Recife - PE', '28 de Fevereiro de 2026', 423,
      'Ensaio editorial de moda para marca de alta costura, com paleta de tons terrosos e desfoque suave característico da lente Defocus Smoothing.', 0
    ],
    [
      'pho-06', 'A Dança das Luzes de Estúdio', 'retrato', 'Retratos & Branding',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23EFECE6"/><text x="400" y="480" font-family="serif" font-size="28" fill="%231C1B18" text-anchor="middle">A DANÇA DAS LUZES</text></svg>',
      'square', 'Sony Alpha 1', 'FE 50mm f/1.2 GM', 'f/2.8', '1/200s (Flash Sync)', 'ISO 100', '50mm',
      'São Lourenço da Mata, PE', '15 de Março de 2026', 278,
      'Iluminação técnica com dois softboxes octagonais Profoto e rim-light azulado, criando presença magnética e autoridade visual.', 0
    ]
  ];

  for (const p of photos) {
    await dbManager.run(
      `INSERT INTO photos (id, title, category, category_label, url, fallback_svg, aspect_ratio, camera, lens, aperture, shutter, iso, focal_length, location, date, likes, description, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      p
    );
  }

  // 2. Seed Packages
  const packages = [
    [
      'pkg-portrait', 'Ensaio Retrato & Personal Branding',
      'Para executivos, médicos, advogados e criadores de conteúdo que buscam autoridade imediata no mercado.',
      1490, 'por sessão', 'Essencial', 0,
      JSON.stringify([
        'Sessão de 2 horas em estúdio próprio ou locação corporativa',
        'Direção de pose e expressão facial assistida por IA visual',
        'Troca para até 3 figurinos diferentes com consultoria de estilo',
        '30 fotos finais com tratamento de pele natural (High-End Retouching)',
        'Entrega digital via galeria em nuvem privada em até 48 horas',
        'Direitos de uso comercial irrestritos para mídia digital'
      ]),
      'Profissionais liberais, LinkedIn, Palestrantes e Redes Sociais', '2 horas de estúdio ou externa', '30 fotos retocadas em High-End Skin Retouch'
    ],
    [
      'pkg-wedding', 'Casamento & Evento Premium',
      'A narrativa documental completa do seu dia mais inesquecível, com estética de cinema europeu e discrição absoluta.',
      8900, 'cobertura total', 'Mais Popular', 1,
      JSON.stringify([
        '2 Fotógrafos Seniores + 1 Assistente de iluminação dedicados',
        'Cobertura do Making Of, Cerimônia, Recepção e Festa (até 10h)',
        'Sessão Pre-Wedding inclusa em locação externa de preferência',
        'Entrega de mínimo 600 fotos em alta resolução sem marca d\'água',
        'Álbum encadernado em couro italiano artesanal com 50 páginas',
        'Pendrive de cristal em estojo de madeira gravado a laser',
        'Preview de 30 fotos entregue no dia seguinte para redes sociais'
      ]),
      'Casamentos de alto padrão, Destination Weddings e Bodas', 'Até 10 horas de cobertura contínua', 'Todas as fotos em ProRAW + Álbum Couro 30x30cm'
    ],
    [
      'pkg-commercial', 'Produção Editorial & Publicidade',
      'Solução visual definitiva para marcas de moda, arquitetura, gastronomia e campanhas publicitárias de alto impacto.',
      5500, 'por diária (8h)', 'Corporativo / Vogue', 0,
      JSON.stringify([
        'Estúdio móvel completo com iluminação Profoto e gerador de energia',
        'Acompanhamento em tempo real em monitor 4K Pro Display XDR para cliente/agência',
        'Tratamento color grading avançado em espaço de cor Adobe RGB / DCI-P3',
        'Trabalho integrado com estilistas, maquiadores e produtores de arte',
        'Cessão de direitos autorais para veiculação em outdoor, TV e imprensa impressa',
        'Arquivo de backup garantido em nuvem redundante por 5 anos'
      ]),
      'Agências de publicidade, Marcas de Moda e Construtoras', 'Diária completa de 8 horas', 'Catálogo completo + Color Grading Customizado'
    ],
    [
      'pkg-cinema', 'Cinematografia & Foto Aérea 8K',
      'Perspectivas deslumbrantes com drones de última geração e câmeras cinematográficas em gimbal stabilizado.',
      3200, 'por projeto', 'Tecnologia Drone', 0,
      JSON.stringify([
        'Voo com drone profissional DJI Inspire 3 & Zenmuse X9-8K Air',
        'Piloto licenciado pela ANAC e DECEA com seguro RETA de cobertura',
        'Edição de vídeo com corte dinâmico, sound design imersivo e trilha licenciada',
        '40 fotografias aéreas em formato RAW 48 Megapixels',
        'Entrega formatada para Reels/TikTok (9:16) e Cinema/YouTube (16:9)',
        'Estabilização milimétrica mesmo em condições de vento costeiro'
      ]),
      'Imóveis de Luxo, Hotéis, Resorts e Videoclipes Artísticos', 'Meia diária ou voos programados', 'Vídeo Reel 4K Dolby Vision + 40 Fotos Aéreas'
    ]
  ];

  for (const pkg of packages) {
    await dbManager.run(
      `INSERT INTO packages (id, title, subtitle, price, period, badge, popular, features, recommended_for, duration, deliverables)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      pkg
    );
  }

  // 3. Seed Addons
  const addons = [
    ['add-makeup', 'Make-up & Hair Artist no Local', 'Profissional de maquiagem HD resistente à luz de estúdio acompanhando toda a sessão com retoques instantâneos.', 450, 'Sparkles'],
    ['add-reel', 'Vídeo Reel Cinematográfico de 60s', 'Gravação em 4K 120fps (câmera lenta vertical) com edição dinâmica para viralizar no Instagram e TikTok.', 600, 'Video'],
    ['add-express', 'Entrega Super Expressa (24 Horas)', 'Prioridade máxima em nosso laboratório de edição digital com galeria final entregue no dia seguinte.', 350, 'Zap'],
    ['add-album', 'Fotolivro Extra Fine Art 30x30cm', 'Álbum adicional com folhas duplas em papel algodão museu 310g, perfeito para presentear pais ou sócios.', 890, 'BookOpen'],
    ['add-drone', 'Minienquadramento Aéreo com Drone', 'Inclusão de tomadas aéreas em 4K e fotos de perspectiva elevada durante ensaios externos ou casamentos.', 750, 'Navigation']
  ];

  for (const add of addons) {
    await dbManager.run(`INSERT INTO addons (id, title, description, price, icon) VALUES (?, ?, ?, ?, ?)`, add);
  }

  // 4. Seed Testimonials
  const testimonials = [
    [
      'test-1', 'Dra. Camila Albuquerque', 'CEO & Médica Cirurgiã', 'Clínica Dermatológica Albuquerque',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', 'CA',
      'O ensaio de Personal Branding do Lumen Atelier transformou a percepção da minha marca nas redes sociais e LinkedIn. A iluminação é de nível internacional, o atendimento foi impecável e me senti totalmente à vontade.',
      5, 'Ensaio Retrato & Personal Branding', 'Junho de 2026'
    ],
    [
      'test-2', 'Rodrigo & Mariana Vasconcelos', 'Noivos', 'Casamento na Praia de Carneiros',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80', 'RM',
      'Contratar o Lumen foi a melhor decisão do nosso casamento. Eles conseguiram capturar as lágrimas do meu avô, a energia da pista de dança e a luz do pôr do sol de uma maneira poética. Choramos sempre que abrimos o álbum encadernado em couro!',
      5, 'Casamento & Evento Premium', 'Maio de 2026'
    ],
    [
      'test-3', 'Lucas Fontes', 'Diretor Criativo', 'Agência Chroma Design SP',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', 'LF',
      'Como diretor criativo sou extremamente exigente com precisão de cor e nitidez de lente. A equipe do Lumen trabalha com equipamentos Sony A1 e monitores calibrados em tempo real na diária. Entregaram a campanha publicitária 4 dias antes do prazo!',
      5, 'Produção Editorial & Publicidade', 'Abril de 2026'
    ]
  ];

  for (const t of testimonials) {
    await dbManager.run(
      `INSERT INTO testimonials (id, name, role, company, avatar_url, fallback_initials, text, rating, service_used, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      t
    );
  }

  // 5. Seed Team (Maria Clara as Owner & Principal Photographer, Vinicius Strack as Developer/Director)
  const team = [
    [
      'team-1', 'Maria Clara', 'Dona & Fotógrafa Principal / Diretora Criativa',
      'Com o olhar poético e apurado que fundou o Lumen Atelier, Maria Clara lidera as grandes coberturas documentais fine art e os ensaios de casamentos internacionais com sensibilidade única para a luz solar.',
      'Direção Criativa & Casamentos Fine Art', 'Leica M11 + Noctilux 50mm f/0.95',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80'
    ],
    [
      'team-2', 'Vinicius Strack', 'Desenvolvedor do Sistema & Diretor Técnico',
      'Engenheiro de software e fotógrafo de formação, Vinicius é o arquiteto por trás da tecnologia autoral de curadoria expressa em nuvem, fluxos ProRAW de 16-bit e cinematografia 4K do atelier.',
      'Engenharia Visual & Cinematografia', 'Sony A1 + FE 85mm f/1.4 GM',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80'
    ],
    [
      'team-3', 'Henrique Cavalcanti', 'Especialista em Drones 8K & Áudio',
      'Piloto licenciado de drone e diretor de fotografia audiovisual. Responsável pelos takes cinematográficos 8K em casamentos de luxo e comerciais de arquitetura.',
      'Drone 8K & Vídeo Reels', 'DJI Inspire 3 & Sony FX3',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80'
    ]
  ];

  for (const member of team) {
    await dbManager.run(`INSERT INTO team (id, name, role, bio, specialty, favorite_gear, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)`, member);
  }

  // 6. Seed Client Portals & Portal Photos
  await dbManager.run(
    `INSERT INTO client_portals (id, access_code, client_name, event_title, event_date, status, total_photos, selected_count, max_selection, cover_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'portal-wed', 'LUMEN2026', 'Ana Clara & Pedro Henrique', 'Casamento Capela dos Milagres',
      '14 de Maio de 2026', 'Aguardando Seleção', 18, 12, 30,
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85'
    ]
  );

  const portalWedTitles = [
    'A Prece da Noiva no Altar', 'O Sorriso do Noivo na Entrada', 'A Luz Solitária na Janela',
    'As Alianças de Ouro Branco', 'O Beijo Sob o Véu', 'O Brinde em Família',
    'A Primeira Dança dos Noivos', 'O Abraço do Pai', 'Por do Sol nos Jardins',
    'Detalhes do Vestido de Renda', 'O Buquê de Orquídeas Brancas', 'Brinde com Champagne na Pista',
    'Corte do Bolo de 5 Andares', 'A Energia da Banda ao Vivo', 'Saída sob Fainhas de Prata',
    'Retrato Clássico P&B do Casal', 'Sorrisos Espontâneos das Madrinhas', 'A Serenidade após o Sim'
  ];

  for (let i = 0; i < 18; i++) {
    const photoUrl = photos[i % photos.length][4] as string;
    await dbManager.run(
      `INSERT INTO portal_photos (id, portal_id, url, title, selected, favorite)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [`c-photo-${i + 1}`, 'portal-wed', photoUrl, portalWedTitles[i], i < 12 ? 1 : 0, i % 3 === 0 ? 1 : 0]
    );
  }

  await dbManager.run(
    `INSERT INTO client_portals (id, access_code, client_name, event_title, event_date, status, total_photos, selected_count, max_selection, cover_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'portal-vogue', 'VOGUE2026', 'Revista Chroma & Moda', 'Editorial Outono Inverno - Haute Couture',
      '28 de Fevereiro de 2026', 'Concluído', 12, 10, 15,
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85'
    ]
  );

  for (let i = 0; i < 12; i++) {
    const photoUrl = photos[(i + 2) % photos.length][4] as string;
    await dbManager.run(
      `INSERT INTO portal_photos (id, portal_id, url, title, selected, favorite)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [`v-photo-${i + 1}`, 'portal-vogue', photoUrl, `Take Editorial Look ${i + 1}`, i < 10 ? 1 : 0, i % 2 === 0 ? 1 : 0]
    );
  }

  // 7. Seed Sample Bookings
  await dbManager.run(
    `INSERT INTO bookings (id, code, package_id, date, time_slot, location, client_name, client_email, client_phone, notes, total_price, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      'book-1', '#LUMEN-94827', 'pkg-wedding', '2026-07-18', '15:30 Golden Hour',
      'Praia dos Carneiros / Fernando de Noronha - PE', 'Ana Clara & Pedro Henrique',
      'ana.clara@email.com', '(81) 99888-7777', 'Casamento ao pôr do sol, cerca de 150 convidados.',
      9350, 'confirmed'
    ]
  );
  await dbManager.run(`INSERT INTO booking_addons (booking_id, addon_id) VALUES (?, ?)`, ['book-1', 'add-makeup']);
  await dbManager.run(`INSERT INTO booking_addons (booking_id, addon_id) VALUES (?, ?)`, ['book-1', 'add-reel']);

  // 8. Seed Pre-blocked Slots (Admin Schedule Control)
  await dbManager.run(
    `INSERT INTO blocked_slots (id, date, time_slot, reason) VALUES (?, ?, ?, ?)`,
    ['blk-1', '2026-07-25', '17:00 - Pôr do Sol & Crepúsculo', 'Ensaio Externo Editorial Reservado']
  );
  await dbManager.run(
    `INSERT INTO blocked_slots (id, date, time_slot, reason) VALUES (?, ?, ?, ?)`,
    ['blk-2', '2026-08-01', '15:30 - Golden Hour (Luz Dourada)', 'Workshop de Direção e Luz Natural']
  );

  // 9. Seed Personal Reminders for Maria Clara (Real Studio Owner)
  await dbManager.run(
    `INSERT INTO reminders (id, date, time, title, tag) VALUES (?, ?, ?, ?, ?)`,
    ['rem-1', '2026-07-10', '14:00', 'Reunião de Alinhamento e Contrato com Noiva Ana Clara', 'Reunião']
  );
  await dbManager.run(
    `INSERT INTO reminders (id, date, time, title, tag) VALUES (?, ?, ?, ?, ?)`,
    ['rem-2', '2026-07-11', '09:00', 'Ensaio Retrato Executivo Dr. Marcos (Faria Lima)', 'Ensaio']
  );
  await dbManager.run(
    `INSERT INTO reminders (id, date, time, title, tag) VALUES (?, ?, ?, ?, ?)`,
    ['rem-3', '2026-07-15', '18:30', 'Curadoria de 600 fotos RAW e Envio para Encadernação em Couro', 'Edição']
  );

  console.log('[Seeder] Seeding completed successfully!');
};
