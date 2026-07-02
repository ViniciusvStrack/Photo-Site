import React from 'react';
import type { PageType } from '../types';
import { TEAM_MEMBERS } from '../data/mockData';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { SolarCalculator } from '../components/SolarCalculator';
import { Camera, Sparkles, Award, Aperture, Monitor, Zap, ArrowRight, Globe } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const gearItems = [
    {
      title: 'Sony Alpha 1 & Leica M11',
      subtitle: 'Sensores Full-Frame 50MP & 60MP',
      description: 'A união entre a velocidade de 30fps sem blackout da Sony e o grão orgânico inconfundível da engenharia alemã Leica. Nossos arquivos capturam 15 paradas de alcance dinâmico.',
      icon: <Camera size={28} className="text-gold" />,
      tag: 'CÂMERAS PRINCIPAIS'
    },
    {
      title: 'Lentes G Master & Noctilux f/0.95',
      subtitle: 'Vidro Óptico de Abertura Extrema',
      description: 'Nossa coleção de lentes primárias f/1.2 e f/1.4 garante que possamos fotografar à luz de velas em igrejas coloniais ou recepções noturnas sem qualquer perda de nitidez ou ruído artificial.',
      icon: <Aperture size={28} className="text-terracotta" />,
      tag: 'ÓPTICA PRIME'
    },
    {
      title: 'Iluminação Profoto Pro-11',
      subtitle: 'Luz de Estúdio Cinematográfica',
      description: 'Geradores de flash e modificadores de luz suecos utilizados pelas principais revistas editoriais de Paris e Nova York. Moldamos a luz para realçar texturas faciais e tecidos de alta costura.',
      icon: <Zap size={28} className="text-gold" style={{ color: '#8B4F58' }} />,
      tag: 'ILUMINAÇÃO CORPORATIVA'
    },
    {
      title: 'Mac Studio M3 Ultra & Pro Display XDR',
      subtitle: 'Laboratório de Cor Calibrado em DCI-P3',
      description: 'Nosso fluxo de trabalho digital em 16 bits é tratado em monitores Apple Pro Display XDR 6K com calibração espectrométrica contínua, garantindo que o tom de pele e cores sejam 100% fiéis.',
      icon: <Monitor size={28} className="text-gold" style={{ color: '#5F7367' }} />,
      tag: 'PÓS-PRODUÇÃO 16-BIT'
    }
  ];

  const timelineEvents = [
    {
      year: '2018',
      title: 'A Fundação em Recife & São Paulo',
      desc: 'Vinicius Track e Beatriz Lumen abrem o primeiro atelier focado em fotografia fine art e iluminação natural para casamentos de alto padrão.'
    },
    {
      year: '2021',
      title: 'Expansão Destination Weddings',
      desc: 'Início da cobertura de casamentos internacionais em Portugal, Itália, França e no arquipélago de Fernando de Noronha.'
    },
    {
      year: '2024',
      title: 'Transição 100% ProRAW & Nuvem IA',
      desc: 'Adoção pioneira de câmeras Sony Alpha 1 e entrega digital em nuvem com inteligência artificial para curadoria instantânea de fotos.'
    },
    {
      year: '2026',
      title: 'Prêmio Wedding Awards & Novo Acervo',
      desc: 'Conquista do título de "Melhor Atelier de Fotografia Contemporânea" e inauguração da nova sede criativa em São Lourenço da Mata - PE.'
    }
  ];

  return (
    <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 bg-gourmet-main">
      <div className="container pt-4">
        {/* Header Section */}
        <div className="text-center mx-auto mb-5 pb-3" style={{ maxWidth: '820px' }}>
          <div className="d-inline-flex align-items-center gap-2 bg-gourmet-surface border border-warm rounded-pill px-4 py-1 mb-3 shadow-sm">
            <Sparkles size={14} className="text-gold" />
            <span className="text-warm-gray gourmet-mono" style={{ fontSize: '0.75rem' }}>
              A FILOSOFIA DO ATELIER LUMEN
            </span>
          </div>
          <h1 className="display-4 fw-bold mb-4 tracking-tight gourmet-title text-dark-espresso">
            A Luz Natural Como Forma de Poesia.
          </h1>
          <p className="text-warm-gray lead mb-0 gourmet-sans" style={{ fontSize: '1.22rem', lineHeight: '1.7' }}>
            Acreditamos que a fotografia fine art não é um mero registro técnico de um evento, mas a preservação sublime da alma e da atmosfera de um instante que nunca mais se repetirá.
          </p>
        </div>

        {/* Big Story Banner */}
        <div 
          className="card-gourmet p-4 p-lg-5 mb-5 overflow-hidden position-relative"
          style={{ borderRadius: '28px', background: '#FFFFFF' }}
        >
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <span className="badge badge-gold mb-3 px-3 py-1">
                ORIGEM & ESSÊNCIA
              </span>
              <h2 className="display-6 fw-bold text-dark-espresso mb-4 gourmet-title">
                Onde a Tradição Analógica Encontra a Excelência Digital.
              </h2>
              <p className="text-warm-gray mb-3 gourmet-sans" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                O Lumen Atelier nasceu de uma inquietação artística: como capturar casamentos, retratos e editoriais com a dignidade, profundidade e cores dos antigos filmes cinematográficos europeus sem abrir mão da velocidade e precisão das câmeras modernas?
              </p>
              <p className="text-warm-gray mb-4 gourmet-sans" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>
                Hoje, nossa equipe liderada pelos fotógrafos premiados Vinicius Track e Beatriz Lumen opera sob um único mandamento: discrição absoluta durante os momentos espontâneos e precisão cirúrgica na direção de retratos.
              </p>
              
              <div className="d-flex align-items-center gap-4 pt-2">
                <div className="d-flex align-items-center gap-2">
                  <Award size={20} className="text-gold" />
                  <span className="text-dark-espresso fw-bold fs-6 gourmet-serif">Wedding Awards 2025</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Globe size={20} className="text-terracotta" />
                  <span className="text-dark-espresso fw-bold fs-6 gourmet-serif">Padrão Europeu</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                    fallbackSrc="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'><rect width='400' height='500' fill='%23F5F2EB'/><circle cx='200' cy='250' r='100' fill='%23E8E4DC'/><text x='200' y='255' fill='%231C1B18' font-size='16' text-anchor='middle'>ATELIER LUMEN</text></svg>"
                    alt="Atelier Lumen 1"
                    aspectRatio="portrait"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
                <div className="col-6 pt-4">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                    fallbackSrc="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'><rect width='400' height='500' fill='%23FAF8F5'/><circle cx='200' cy='250' r='100' fill='%23EFECE6'/><text x='200' y='255' fill='%231C1B18' font-size='16' text-anchor='middle'>LUZ NATURAL</text></svg>"
                    alt="Atelier Lumen 2"
                    aspectRatio="portrait"
                    style={{ borderRadius: '20px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-5 my-3">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
            <span className="text-terracotta gourmet-mono fw-bold text-uppercase tracking-wider fs-7">
              OS FUNDADORES & ARTISTAS
            </span>
            <h2 className="display-6 fw-bold text-dark-espresso mt-1 mb-2 gourmet-title">
              Quem Assina o Seu Legado Visual.
            </h2>
          </div>

          <div className="row g-4">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="col-lg-4">
                <div 
                  className="card-gourmet p-4 h-100 d-flex flex-column justify-content-between"
                  style={{ borderRadius: '24px', background: '#FFFFFF' }}
                >
                  <div>
                    <div className="mb-4 overflow-hidden rounded-4 position-relative border border-warm" style={{ height: '320px' }}>
                      <ImageWithFallback
                        src={member.imageUrl}
                        alt={member.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(to top, rgba(28,27,24,0.85) 0%, rgba(28,27,24,0) 100%)' }}>
                        <span className="badge badge-gold bg-white px-3 py-1">
                          {member.specialty}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-dark-espresso gourmet-title fw-bold mb-1 fs-3">{member.name}</h4>
                    <div className="text-terracotta fw-semibold mb-3 gourmet-sans" style={{ fontSize: '0.9rem' }}>{member.role}</div>
                    <p className="text-warm-gray mb-4 gourmet-sans" style={{ fontSize: '0.96rem', lineHeight: '1.6' }}>
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-top border-warm d-flex align-items-center justify-content-between text-warm-gray" style={{ fontSize: '0.8rem' }}>
                    <span className="text-dark-espresso fw-semibold gourmet-mono d-flex align-items-center gap-1">
                      <Camera size={14} className="text-gold" />
                      {member.favoriteGear}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Ecosystem Section ("O Ecossistema") */}
        <div className="py-5 my-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '750px' }}>
            <span className="text-gold gourmet-mono fw-bold text-uppercase tracking-wider fs-7">
              TECNOLOGIA DE ALTA DEFINIÇÃO
            </span>
            <h2 className="display-6 fw-bold text-dark-espresso mt-1 mb-3 gourmet-title">
              O Ecossistema ProRAW & 16-Bit.
            </h2>
            <p className="text-warm-gray lead">
              Investimos continuamente nos equipamentos mais sofisticados da fotografia e do cinema para garantir segurança de backup de dados e nitidez inigualável.
            </p>
          </div>

          <div className="row g-4">
            {gearItems.map((gear, idx) => (
              <div key={idx} className="col-md-6">
                <div className="card-gourmet-alt p-4 p-lg-5 h-100 d-flex flex-column justify-content-between hover-scale" style={{ borderRadius: '24px' }}>
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div className="bg-white p-3 rounded-4 border border-warm shadow-sm">
                        {gear.icon}
                      </div>
                      <span className="badge badge-gourmet">
                        {gear.tag}
                      </span>
                    </div>

                    <h3 className="gourmet-title fw-bold text-dark-espresso mb-2 fs-3">{gear.title}</h3>
                    <div className="text-terracotta fw-semibold mb-3 gourmet-mono" style={{ fontSize: '0.82rem' }}>
                      {gear.subtitle}
                    </div>
                    <p className="text-warm-gray mb-0 gourmet-sans" style={{ fontSize: '0.96rem', lineHeight: '1.6' }}>
                      {gear.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SOLAR CALCULATOR FEATURE SHOWCASE */}
        <SolarCalculator onNavigate={onNavigate} />

        {/* Interactive Timeline */}
        <div className="py-5 my-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
            <span className="text-terracotta gourmet-mono fw-bold text-uppercase tracking-wider fs-7">
              TRAJETÓRIA & CONQUISTAS
            </span>
            <h2 className="display-6 fw-bold text-dark-espresso mt-1 mb-4 gourmet-title">
              A Linha do Tempo Lumen.
            </h2>
          </div>

          <div className="row g-4 justify-content-center">
            {timelineEvents.map((ev, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className="card-gourmet p-4 h-100 position-relative" style={{ background: '#FFFFFF' }}>
                  <div className="gourmet-title fw-bold display-6 text-gold mb-2" style={{ color: '#B8860B' }}>{ev.year}</div>
                  <h5 className="text-dark-espresso gourmet-title fw-bold mb-3 fs-5">{ev.title}</h5>
                  <p className="text-warm-gray fs-7 mb-0 gourmet-sans" style={{ lineHeight: '1.6' }}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 pb-5">
          <button
            onClick={() => onNavigate('booking')}
            className="btn-gourmet-gold px-5 py-3 fw-bold fs-6 shadow-lg hover-scale"
          >
            <span>Reservar Ensaio no Atelier</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
