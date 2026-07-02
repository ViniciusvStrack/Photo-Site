import React, { useState } from 'react';
import type { PageType } from '../types';
import { SERVICE_PACKAGES } from '../data/mockData';
import { CustomQuoteBuilder } from '../components/CustomQuoteBuilder';
import { Check, ArrowRight, Sparkles, HelpCircle, Shield, Clock, Award, ChevronDown, ChevronUp, Camera } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageType, packageId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como funciona a reserva de data e o pagamento do contrato?',
      a: 'Para garantir exclusividade na sua data, solicitamos um sinal de 30% via PIX ou Cartão no ato da assinatura do contrato digital. O saldo restante pode ser parcelado em até 12x sem juros no cartão de crédito ou quitado até 7 dias antes do evento.'
    },
    {
      q: 'O que acontece em caso de chuva em ensaios externos ou casamentos ao ar livre?',
      a: 'Para ensaios Pre-Wedding ou Retratos, reagendamos imediatamente para a próxima data disponível de comum acordo, sem qualquer custo adicional. Para casamentos, nossa equipe possui equipamentos selados contra intempéries e iluminação portátil para criar fotos dramáticas e românticas mesmo sob chuva!'
    },
    {
      q: 'Em qual formato e resolução as fotografias são entregues?',
      a: 'Todas as fotos selecionadas são tratadas em alto padrão (color grading editorial europeu e High-End Skin Retouching) e entregues em alta resolução 4K (DPI 300) prontas para impressão em grandes formatos, além de uma versão otimizada para Web sem perda de qualidade.'
    },
    {
      q: 'Vocês viajam para casamentos e ensaios em outros estados ou no exterior?',
      a: 'Sim! Atendemos em todo o território nacional e internacional (Europa, Caribe, EUA). Para Destination Weddings, cobramos apenas os custos logísticos (passagens aéreas, hospedagem e alimentação) repassados sem margem adicional ao cliente.'
    },
    {
      q: 'Como funciona a galeria online em nuvem com Inteligência Artificial?',
      a: 'Após o evento, você receberá um link exclusivo com senha para a Área do Cliente Lumen Atelier. Nossa IA identifica duplicatas, olhos fechados e agrupa as melhores fotos por cena, permitindo que você aprove seu álbum ou favorite fotos no celular em poucos minutos!'
    }
  ];

  return (
    <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 bg-gourmet-main">
      <div className="container pt-4">
        {/* Header Section */}
        <div className="text-center mx-auto mb-5 pb-3" style={{ maxWidth: '850px' }}>
          <div className="d-inline-flex align-items-center gap-2 bg-gourmet-surface border border-warm rounded-pill px-4 py-1 mb-3 shadow-sm">
            <Sparkles size={14} className="text-gold" />
            <span className="text-warm-gray gourmet-mono" style={{ fontSize: '0.75rem' }}>
              INVESTIMENTO & CURADORIA FINE ART 2026 / 2027
            </span>
          </div>
          <h1 className="display-4 fw-bold mb-4 tracking-tight gourmet-title text-dark-espresso">
            Transparência Absoluta. <br />
            <span className="text-terracotta font-italic gourmet-serif">Excelência Sem Concessões.</span>
          </h1>
          <p className="text-warm-gray lead mb-0 gourmet-sans" style={{ fontSize: '1.18rem', lineHeight: '1.7' }}>
            Nossos módulos foram pensados para oferecer tranquilidade e prestígio. Todos incluem tratamento editorial em ProRAW, galeria em nuvem privada e licença de uso autoral irrestrita.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="row g-4 align-items-stretch mb-5 pb-4">
          {SERVICE_PACKAGES.map((pkg) => (
            <div key={pkg.id} className="col-12 col-md-6 col-xl-3 d-flex">
              <div 
                className={`card w-100 rounded-4 p-4 p-lg-4 d-flex flex-column justify-content-between transition-all position-relative overflow-hidden ${
                  pkg.popular
                    ? 'border-warm-strong shadow-lg'
                    : 'bg-white border-warm hover-scale'
                }`}
                style={{
                  borderRadius: '24px',
                  background: pkg.popular ? 'linear-gradient(145deg, #1C1B18 0%, #2B2A27 100%)' : '#FFFFFF',
                  color: pkg.popular ? '#FDFCF9' : '#1C1B18'
                }}
              >
                {/* Popular Ribbon */}
                {pkg.popular && (
                  <div className="position-absolute top-0 end-0 bg-gold text-white font-monospace fw-bold px-3 py-1 rounded-bottom-start shadow-sm" style={{ fontSize: '0.65rem', letterSpacing: '1px', background: '#B8860B' }}>
                    RECOMENDADO
                  </div>
                )}

                <div>
                  {/* Badge */}
                  <span className={`badge rounded-pill mb-3 px-3 py-1 ${
                    pkg.popular ? 'badge-gold bg-white' : 'badge-gourmet'
                  }`} style={{ fontSize: '0.72rem' }}>
                    {pkg.badge}
                  </span>

                  <h3 className={`gourmet-title fw-bold mb-2 fs-4 ${pkg.popular ? 'text-white' : 'text-dark-espresso'}`}>{pkg.title}</h3>
                  <p className={`mb-4 gourmet-sans ${pkg.popular ? 'text-light text-opacity-75' : 'text-warm-gray'}`} style={{ fontSize: '0.88rem', minHeight: '65px', lineHeight: '1.6' }}>
                    {pkg.subtitle}
                  </p>

                  {/* Price Box */}
                  <div className={`py-3 border-top border-bottom mb-4 ${pkg.popular ? 'border-secondary border-opacity-25' : 'border-warm'}`}>
                    <div className="d-flex align-items-baseline gap-1">
                      <span className={`fs-6 ${pkg.popular ? 'text-gold' : 'text-terracotta'}`} style={{ color: pkg.popular ? '#D4AF37' : '#A86A3D' }}>R$</span>
                      <span className={`display-6 fw-bolder gourmet-title ${pkg.popular ? 'text-white' : 'text-dark-espresso'}`}>{pkg.price.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className={`gourmet-mono ${pkg.popular ? 'text-light text-opacity-50' : 'text-muted-warm'}`} style={{ fontSize: '0.72rem' }}>{pkg.period}</div>
                  </div>

                  {/* Features Checklist */}
                  <div className="mb-4">
                    <div className={`fw-bold mb-3 gourmet-mono tracking-wider text-uppercase ${pkg.popular ? 'text-gold' : 'text-dark-espresso'}`} style={{ fontSize: '0.75rem', color: pkg.popular ? '#D4AF37' : undefined }}>
                      INCLUSO NO ATELIER:
                    </div>
                    <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="d-flex align-items-start gap-2" style={{ fontSize: '0.86rem' }}>
                          <Check size={16} className={`flex-shrink-0 mt-1 ${pkg.popular ? 'text-gold' : 'text-terracotta'}`} style={{ color: pkg.popular ? '#D4AF37' : '#A86A3D' }} />
                          <span className={pkg.popular ? 'text-white text-opacity-90' : 'text-warm-gray'}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 mt-auto">
                  <div className={`p-2 rounded-3 mb-3 text-center gourmet-mono ${pkg.popular ? 'bg-black bg-opacity-40 text-light' : 'bg-gourmet-alt text-warm-gray'}`} style={{ fontSize: '0.72rem' }}>
                    ⏱️ Duração: {pkg.duration}
                  </div>

                  <button
                    onClick={() => onNavigate('booking', pkg.id)}
                    className={`btn rounded-pill w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 transition-all shadow-sm ${
                      pkg.popular 
                        ? 'btn-gourmet-gold' 
                        : 'btn-gourmet-primary'
                    }`}
                  >
                    <span>Selecionar & Agendar</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights Banner */}
        <div className="row g-4 py-4 mb-5">
          <div className="col-md-4">
            <div className="card-gourmet-alt p-4 h-100 d-flex align-items-center gap-3">
              <Shield size={32} className="text-gold flex-shrink-0" />
              <div>
                <h6 className="text-dark-espresso gourmet-title fw-bold mb-1 fs-5">Contrato de Prestígio & Sigilo</h6>
                <p className="text-warm-gray fs-7 mb-0">Sinal de 30% e garantia de backup em nuvem dupla.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-gourmet-alt p-4 h-100 d-flex align-items-center gap-3">
              <Award size={32} className="text-terracotta flex-shrink-0" />
              <div>
                <h6 className="text-dark-espresso gourmet-title fw-bold mb-1 fs-5">Parcelamento em até 12x</h6>
                <p className="text-warm-gray fs-7 mb-0">Aceitamos Cartão, PIX com 5% OFF ou Apple Pay.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-gourmet-alt p-4 h-100 d-flex align-items-center gap-3">
              <Clock size={32} className="text-gold flex-shrink-0" style={{ color: '#5F7367' }} />
              <div>
                <h6 className="text-dark-espresso gourmet-title fw-bold mb-1 fs-5">Curadoria Expressa em 48h</h6>
                <p className="text-warm-gray fs-7 mb-0">Receba sua prévia fine art no WhatsApp no dia seguinte.</p>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE CUSTOM QUOTE BUILDER SHOWCASE */}
        <CustomQuoteBuilder />

        {/* FAQ Section */}
        <div className="py-5 mx-auto" style={{ maxWidth: '850px' }}>
          <div className="text-center mb-5">
            <span className="text-gold gourmet-mono fw-bold text-uppercase tracking-wider fs-7">
              TUDO O QUE VOCÊ PRECISA SABER
            </span>
            <h2 className="display-6 fw-bold text-dark-espresso mt-1 mb-2 gourmet-title">Dúvidas Frequentes</h2>
          </div>

          <div className="d-flex flex-column gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`card bg-white border rounded-4 transition-all overflow-hidden ${
                    isOpen ? 'border-warm-strong shadow-md' : 'border-warm'
                  }`}
                  style={{ borderRadius: '20px' }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="btn btn-link text-dark-espresso text-decoration-none p-4 d-flex justify-content-between align-items-center text-start w-100 bg-transparent border-0"
                  >
                    <span className="gourmet-title fw-bold fs-5 pe-3 d-flex align-items-center gap-3">
                      <HelpCircle size={20} className="text-gold flex-shrink-0" />
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={20} className="text-dark-espresso flex-shrink-0" /> : <ChevronDown size={20} className="text-warm-gray flex-shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-warm-gray border-top border-warm mt-1 animate-fade-in gourmet-sans" style={{ fontSize: '0.98rem', lineHeight: '1.7' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Quote CTA */}
        <div className="text-center pt-4 pb-5">
          <div className="p-5 rounded-4 bg-white border border-warm shadow-md d-inline-block mx-auto max-w-750" style={{ borderRadius: '28px' }}>
            <h4 className="gourmet-title fw-bold text-dark-espresso mb-3 fs-3">Precisa de um Projeto Personalizado ou Orçamento Sob Medida?</h4>
            <p className="text-warm-gray mb-4 lead fs-6">
              Atendemos campanhas publicitárias de marcas multinacionais, catálogos de arquitetura e destination weddings com duração acima de 12 horas.
            </p>
            <button
              onClick={() => onNavigate('booking')}
              className="btn-gourmet-primary px-5 py-3"
            >
              <Camera size={18} className="text-gold" />
              <span>Solicitar Orçamento no WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
