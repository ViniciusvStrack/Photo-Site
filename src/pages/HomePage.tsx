import React from 'react';
import type { PageType } from '../types';
import { MOCK_PHOTOS, TESTIMONIALS } from '../data/mockData';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { Camera, ArrowRight, Clock, Star, ChevronRight, Sliders, Heart } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType, packageId?: string) => void;
  onPhotoClick: (photoId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onPhotoClick }) => {
  const featuredPhotos = MOCK_PHOTOS.slice(0, 4);

  return (
    <div className="animate-fade-in text-dark-espresso overflow-hidden bg-gourmet-main">
      {/* 1. HERO SECTION (Luminous European Atelier Aesthetic) */}
      <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center pt-5 pb-5 px-3 px-md-4">
        {/* Subtle Ambient Warm Glow */}
        <div 
          className="position-absolute top-50 start-50 translate-middle w-100 h-100 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 35%, rgba(197, 160, 89, 0.1) 0%, rgba(245, 242, 235, 0.3) 50%, rgba(253, 252, 249, 0) 80%)',
            zIndex: 0
          }}
        />

        <div className="container position-relative z-1 text-center mt-5 pt-4">
          <div className="d-inline-flex align-items-center gap-2 bg-gourmet-surface border border-warm rounded-pill px-4 py-1 mb-4 animate-slide-down shadow-sm">
            <span className="badge badge-gold py-1 px-3 fw-bold">
              ATELIER 2026 / 2027
            </span>
            <span className="text-warm-gray gourmet-mono" style={{ fontSize: '0.78rem' }}>
              ProRAW 48MP • Luz Natural • Óptica Leica f/0.95
            </span>
          </div>

          <h1 
            className="display-2 fw-bold mb-4 tracking-tight gourmet-title text-dark-espresso"
            style={{ 
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              maxWidth: '980px',
              margin: '0 auto'
            }}
          >
            A Poesia do Olhar. <br />
            <span className="text-gold fw-normal gourmet-serif font-italic" style={{ color: '#A86A3D' }}>Eternize a Alma do Instante.</span>
          </h1>

          <p 
            className="lead text-warm-gray mx-auto mb-5 fw-normal gourmet-sans" 
            style={{ maxWidth: '700px', fontSize: '1.22rem', lineHeight: '1.7' }}
          >
            Atelier de fotografia fine art e cinematografia com estética editorial europeia, luz orgânica e direção precisa para casamentos de alto padrão, branding executivo e publicidade.
          </p>

          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 align-items-center mb-5 pb-3">
            <button
              onClick={() => onNavigate('booking')}
              className="btn-gourmet-primary px-5 py-3 fw-bold fs-6 shadow-md hover-scale"
            >
              <span>Agendar Experiência</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onNavigate('portfolio')}
              className="btn-gourmet-outline px-5 py-3 fw-semibold fs-6"
            >
              <Camera size={18} className="text-gold" />
              <span>Explorar Acervo Fine Art</span>
            </button>
          </div>

          {/* Mini Statistics Ticker */}
          <div className="row g-3 justify-content-center pt-4 border-top border-warm mx-auto" style={{ maxWidth: '900px' }}>
            <div className="col-6 col-md-3">
              <div className="gourmet-title fw-bold fs-2 text-dark-espresso">+450</div>
              <div className="text-muted-warm fs-7 text-uppercase tracking-wider gourmet-mono">Casamentos & Bodas</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="gourmet-title fw-bold fs-2 text-dark-espresso">+12.000</div>
              <div className="text-muted-warm fs-7 text-uppercase tracking-wider gourmet-mono">Obras ProRAW Entregues</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="gourmet-title fw-bold fs-2 text-gold" style={{ color: '#B8860B' }}>100%</div>
              <div className="text-muted-warm fs-7 text-uppercase tracking-wider gourmet-mono">Exclusividade & Sigilo</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="gourmet-title fw-bold fs-2 text-terracotta" style={{ color: '#A86A3D' }}>48h</div>
              <div className="text-muted-warm fs-7 text-uppercase tracking-wider gourmet-mono">Curadoria Expressa IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID DESTAQUES (Gourmet Atelier Grid) */}
      <section className="py-5 px-3 px-md-4 bg-gourmet-alt">
        <div className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
            <div>
              <span className="text-gold gourmet-mono fw-bold text-uppercase tracking-wider fs-7">
                ESPECIALIDADES DO ATELIER
              </span>
              <h2 className="display-6 fw-bold text-dark-espresso mb-0 mt-1 tracking-tight gourmet-title">
                Engenharia Visual para Mementos Sublimes.
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="btn btn-link text-terracotta hover-text-dark text-decoration-none p-0 d-flex align-items-center gap-1 mt-3 mt-md-0 fw-bold gourmet-sans"
            >
              <span>Conhecer todos os pacotes e investimentos</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Bento Grid */}
          <div className="row g-4">
            {/* Big Left Card: Casamentos */}
            <div className="col-lg-7">
              <div 
                className="card-gourmet overflow-hidden h-100 p-0 d-flex flex-column position-relative"
                style={{ borderRadius: '24px', minHeight: '440px', background: '#FFFFFF' }}
              >
                <div className="p-4 p-md-5 z-1 position-relative d-flex flex-column h-100 justify-content-between">
                  <div>
                    <span className="badge badge-gold mb-3 px-3 py-1">
                      CASAMENTOS & DESTINATION WEDDING
                    </span>
                    <h3 className="display-6 fw-bold text-dark-espresso mb-3 gourmet-title">
                      Narrativa Documental e Emoção Autêntica.
                    </h3>
                    <p className="text-warm-gray mb-4" style={{ maxWidth: '460px', fontSize: '1.05rem', lineHeight: '1.7' }}>
                      Capturamos a poesia espontânea do seu grande dia sem interferências encenadas. Iluminação orgânica com lentes prime f/1.2 para registrar cada olhar e lágrima com dignidade e atemporalidade.
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => onNavigate('booking', 'pkg-wedding')}
                      className="btn-gourmet-gold px-4 py-2 shadow-sm"
                    >
                      <span>Reservar Data de Casamento</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Background Image preview */}
                <div className="position-absolute top-0 end-0 w-100 h-100 opacity-25 z-0 pointer-events-none">
                  <ImageWithFallback
                    src={MOCK_PHOTOS[0].url}
                    fallbackSrc={MOCK_PHOTOS[0].fallbackSvg}
                    alt="Casamento Premium"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(90deg, #FFFFFF 40%, rgba(255,255,255,0.4) 100%)' }} />
                </div>
              </div>
            </div>

            {/* Right Top Card: Retratos Executivos */}
            <div className="col-lg-5">
              <div 
                className="card-gourmet overflow-hidden h-100 p-4 p-md-5 d-flex flex-column justify-content-between position-relative"
                style={{ borderRadius: '24px', minHeight: '440px', background: '#FDFCF9' }}
              >
                <div className="position-absolute top-0 end-0 w-100 h-100 opacity-20 z-0 pointer-events-none">
                  <ImageWithFallback
                    src={MOCK_PHOTOS[1].url}
                    fallbackSrc={MOCK_PHOTOS[1].fallbackSvg}
                    alt="Retrato Executivo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(0deg, #FDFCF9 40%, rgba(253,252,249,0.3) 100%)' }} />
                </div>

                <div className="position-relative z-1">
                  <span className="badge badge-terracotta mb-3 px-3 py-1">
                    PERSONAL BRANDING
                  </span>
                  <h3 className="h2 fw-bold text-dark-espresso mb-3 gourmet-title">
                    Retratos que Geram Autoridade & Magnificência.
                  </h3>
                  <p className="text-warm-gray" style={{ fontSize: '0.98rem', lineHeight: '1.6' }}>
                    Iluminação editorial moldada para valorizar sua expressão facial e posicionar sua imagem profissional com prestígio no LinkedIn e imprensa executiva.
                  </p>
                </div>

                <div className="position-relative z-1 pt-4">
                  <button
                    onClick={() => onNavigate('booking', 'pkg-portrait')}
                    className="btn-gourmet-outline w-100 py-2 d-flex justify-content-between align-items-center"
                  >
                    <span>Agendar Sessão de Branding</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Left Card: Editorial & Moda */}
            <div className="col-lg-6">
              <div 
                className="card-gourmet overflow-hidden h-100 p-4 p-md-5 d-flex flex-column justify-content-between position-relative"
                style={{ borderRadius: '24px', minHeight: '350px', background: '#FFFFFF' }}
              >
                <div className="position-absolute top-0 end-0 w-100 h-100 opacity-15 z-0 pointer-events-none">
                  <ImageWithFallback
                    src={MOCK_PHOTOS[4].url}
                    fallbackSrc={MOCK_PHOTOS[4].fallbackSvg}
                    alt="Editorial Moda"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(90deg, #FFFFFF 50%, rgba(255,255,255,0.2) 100%)' }} />
                </div>

                <div className="position-relative z-1">
                  <span className="badge badge-gourmet mb-3 px-3 py-1">
                    MODA & PUBLICIDADE
                  </span>
                  <h3 className="h2 fw-bold text-dark-espresso mb-2 gourmet-title">
                    Cores Orgânicas Estilo Vogue.
                  </h3>
                  <p className="text-warm-gray mb-0" style={{ fontSize: '0.96rem', lineHeight: '1.6' }}>
                    Tratamento color grading em espaço de cor DCI-P3 com monitores calibrados em tempo real. Ideal para lookbooks, catálogos de alta costura e campanhas.
                  </p>
                </div>

                <div className="position-relative z-1 pt-4">
                  <button
                    onClick={() => onNavigate('services')}
                    className="btn btn-link text-terracotta text-decoration-none p-0 d-inline-flex align-items-center gap-1 fw-bold gourmet-sans"
                  >
                    <span>Consultar Diária de Publicidade</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Right Card: Drone 8K Cinematografia */}
            <div className="col-lg-6">
              <div 
                className="card-gourmet overflow-hidden h-100 p-4 p-md-5 d-flex flex-column justify-content-between position-relative"
                style={{ borderRadius: '24px', minHeight: '350px', background: '#F5F2EB' }}
              >
                <div className="position-absolute top-0 end-0 w-100 h-100 opacity-20 z-0 pointer-events-none">
                  <ImageWithFallback
                    src={MOCK_PHOTOS[2].url}
                    fallbackSrc={MOCK_PHOTOS[2].fallbackSvg}
                    alt="Drone Aéreo"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(0deg, #F5F2EB 50%, rgba(245,242,235,0.2) 100%)' }} />
                </div>

                <div className="position-relative z-1">
                  <span className="badge badge-sage mb-3 px-3 py-1">
                    CINEMATOGRAFIA & DRONE 8K
                  </span>
                  <h3 className="h2 fw-bold text-dark-espresso mb-2 gourmet-title">
                    Perspectivas Sublimes e Arquitetura.
                  </h3>
                  <p className="text-warm-gray mb-0" style={{ fontSize: '0.96rem', lineHeight: '1.6' }}>
                    Tomadas aéreas em 4K HDR com estabilização milimétrica DJI Inspire 3 para resorts de luxo, arquitetura e videoclipes com color grading cinematográfico.
                  </p>
                </div>

                <div className="position-relative z-1 pt-4">
                  <button
                    onClick={() => onNavigate('booking', 'pkg-cinema')}
                    className="btn btn-link text-dark-espresso text-decoration-none p-0 d-inline-flex align-items-center gap-1 fw-bold gourmet-sans"
                  >
                    <span>Solicitar Produção Aérea 8K</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. A TEORIA DA LUZ (Why Lumen Atelier) */}
      <section className="py-5 px-3 px-md-4 my-4">
        <div className="container py-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '750px' }}>
            <span className="text-terracotta gourmet-mono fw-bold text-uppercase tracking-wider fs-7">
              POR QUE LUMEN ATELIER
            </span>
            <h2 className="display-6 fw-bold text-dark-espresso mt-1 mb-3 tracking-tight gourmet-title">
              A Perfeição Reside no Rigor dos Detalhes.
            </h2>
            <p className="text-warm-gray fs-6">
              Rejeitamos filtros digitais artificiais. Nosso fluxo de trabalho combina a tradição artística da película fotográfica analógica com a precisão espectral dos sensores full-frame alemães e japoneses.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card-gourmet-alt p-4 p-lg-5 h-100 hover-scale">
                <div className="bg-white text-gold rounded-4 p-3 d-inline-flex mb-4 shadow-sm border border-warm">
                  <Sliders size={26} />
                </div>
                <h4 className="gourmet-title fw-bold text-dark-espresso mb-3 fs-4">Óptica Prime de Abertura f/1.2</h4>
                <p className="text-warm-gray mb-0" style={{ fontSize: '0.96rem', lineHeight: '1.7' }}>
                  Trabalhamos exclusivamente com lentes primárias Sony G Master e Leica Noctilux. O resultado é um desfoque (bokeh) aveludado e nitidez cristalina nos olhos, sem distorções computacionais.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-gourmet-alt p-4 p-lg-5 h-100 hover-scale">
                <div className="bg-white text-terracotta rounded-4 p-3 d-inline-flex mb-4 shadow-sm border border-warm">
                  <Clock size={26} />
                </div>
                <h4 className="gourmet-title fw-bold text-dark-espresso mb-3 fs-4">Curadoria Expressa & Nuvem IA</h4>
                <p className="text-warm-gray mb-0" style={{ fontSize: '0.96rem', lineHeight: '1.7' }}>
                  Você recebe uma prévia de 30 fotos curadas em apenas 24 horas. A galeria em nuvem privada permite que convidados baixem retratos em alta resolução e você aprove seu álbum encadernado online.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-gourmet-alt p-4 p-lg-5 h-100 hover-scale">
                <div className="bg-white text-gold rounded-4 p-3 d-inline-flex mb-4 shadow-sm border border-warm" style={{ color: '#5F7367' }}>
                  <Camera size={26} />
                </div>
                <h4 className="gourmet-title fw-bold text-dark-espresso mb-3 fs-4">Color Grading Orgânico</h4>
                <p className="text-warm-gray mb-0" style={{ fontSize: '0.96rem', lineHeight: '1.7' }}>
                  Nosso laboratório de pós-produção desenvolve perfis de cor customizados baseados nas tonalidades quentes e grão natural dos filmes Kodak Portra 400 e Fujifilm X-Trans.
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE BEFORE VS AFTER COLOR GRADING SLIDER SHOWCASE */}
          <BeforeAfterSlider />

        </div>
      </section>

      {/* 4. GALERIA DE DESTAQUES (Quick Portfolio Showcase) */}
      <section className="py-5 px-3 px-md-4 bg-gourmet-alt border-top border-bottom border-warm">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="text-gold gourmet-mono fw-bold text-uppercase tracking-wider fs-7">
                CURADORIA FINE ART 2026
              </span>
              <h2 className="display-6 fw-bold text-dark-espresso mb-0 mt-1 gourmet-title">Obras em Destaque</h2>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="btn-gourmet-outline px-4 py-2 fw-semibold d-none d-sm-flex align-items-center gap-2"
            >
              <span>Ver Acervo Completo</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="row g-4">
            {featuredPhotos.map((photo) => (
              <div key={photo.id} className="col-md-6 col-lg-3">
                <div 
                  onClick={() => onPhotoClick(photo.id)}
                  className="card bg-transparent border-0 cursor-pointer group"
                >
                  <div className="overflow-hidden rounded-4 mb-3 position-relative shadow-sm border border-warm" style={{ height: '320px', background: '#FFFFFF' }}>
                    <ImageWithFallback
                      src={photo.url}
                      fallbackSrc={photo.fallbackSvg}
                      alt={photo.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-3 end-3 z-2">
                      <span className="badge bg-white text-dark-espresso border border-warm rounded-pill px-3 py-1 gourmet-mono shadow-sm" style={{ fontSize: '0.68rem' }}>
                        {photo.exif.aperture} • {photo.exif.iso}
                      </span>
                    </div>
                  </div>
                  <h6 className="text-dark-espresso gourmet-title fw-bold mb-1 fs-5 text-truncate">{photo.title}</h6>
                  <div className="d-flex justify-content-between align-items-center text-warm-gray fs-7">
                    <span className="gourmet-mono">{photo.categoryLabel}</span>
                    <span className="d-flex align-items-center gap-1 text-terracotta fw-semibold">
                      <Heart size={13} fill="currentColor" />
                      <span>{photo.likes}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5 d-sm-none">
            <button
              onClick={() => onNavigate('portfolio')}
              className="btn-gourmet-outline px-4 py-2 fw-semibold w-100"
            >
              Ver Acervo Completo
            </button>
          </div>
        </div>
      </section>

      {/* 5. DEPOIMENTOS (Gourmet Atelier Quotes) */}
      <section className="py-5 px-3 px-md-4 my-3">
        <div className="container py-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '700px' }}>
            <span className="text-terracotta gourmet-mono fw-bold text-uppercase tracking-wider fs-7">
              PRESTÍGIO & RECONHECIMENTO
            </span>
            <h2 className="display-6 fw-bold text-dark-espresso mt-1 mb-2 gourmet-title">
              A Palavra de Quem Vivenciou o Atelier.
            </h2>
          </div>

          <div className="row g-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="col-lg-4">
                <div 
                  className="card-gourmet p-4 p-lg-5 h-100 d-flex flex-column justify-content-between"
                  style={{ borderRadius: '24px' }}
                >
                  <div>
                    <div className="d-flex gap-1 text-gold mb-3" style={{ color: '#D4AF37' }}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-dark-espresso mb-4 font-italic gourmet-serif fs-6" style={{ lineHeight: '1.7', color: '#3D3A33' }}>
                      "{t.text}"
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-3 pt-3 border-top border-warm">
                    <div 
                      className="rounded-circle overflow-hidden bg-gourmet-alt d-flex align-items-center justify-content-center text-dark-espresso fw-bold flex-shrink-0 border border-warm"
                      style={{ width: '48px', height: '48px' }}
                    >
                      {t.fallbackInitials}
                    </div>
                    <div className="overflow-hidden">
                      <h6 className="text-dark-espresso gourmet-title fw-bold mb-0 fs-6 text-truncate">{t.name}</h6>
                      <div className="text-warm-gray text-truncate fs-7">{t.role}</div>
                      <span className="badge badge-gold mt-1" style={{ fontSize: '0.62rem' }}>
                        {t.serviceUsed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="py-5 px-3 px-md-4 mb-4">
        <div className="container">
          <div 
            className="p-5 rounded-4 text-center position-relative overflow-hidden shadow-lg border border-warm"
            style={{
              background: 'linear-gradient(135deg, #2B2A27 0%, #1C1B18 50%, #3D3A33 100%)',
              borderRadius: '32px',
              color: '#FDFCF9'
            }}
          >
            <div className="position-relative z-1 py-4 mx-auto" style={{ maxWidth: '750px' }}>
              <span className="badge badge-gold mb-3 px-3 py-1">
                AGENDA EXCLUSIVA 2026 / 2027
              </span>
              <h2 className="display-5 fw-bold text-white mb-3 tracking-tight gourmet-title">
                Pronto para Eternizar sua Emoção em Obra de Arte?
              </h2>
              <p className="text-light text-opacity-75 lead mb-4 gourmet-sans" style={{ fontSize: '1.15rem' }}>
                Reserve sua data online ou agende uma visita presencial à nossa galeria física com degustação de cafés especiais e vinhos curados em nosso atelier.
              </p>
              
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <button
                  onClick={() => onNavigate('booking')}
                  className="btn-gourmet-gold px-5 py-3 fw-bold fs-6 shadow-lg hover-scale"
                >
                  <span>Reservar Data Agora</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => onNavigate('portal')}
                  className="btn btn-outline-light rounded-pill px-5 py-3 fw-semibold fs-6"
                >
                  <span>Já é Cliente? Acessar Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
