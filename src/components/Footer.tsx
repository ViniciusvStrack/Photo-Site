import React, { useState } from 'react';
import type { PageType, UserProfile } from '../types';
import { Camera, Send, MapPin, Phone, Mail, ShieldCheck, Award, Globe, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenAuthModal: () => void;
  currentUser: UserProfile | null;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAuthModal, currentUser }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleOpenWhatsAppDirect = () => {
    const msg = encodeURIComponent("Olá, Lumen Atelier! Estou navegando pelo website e gostaria de atendimento autoral via WhatsApp com Maria Clara e equipe. ✨");
    window.open(`https://wa.me/5581998422026?text=${msg}`, '_blank');
  };

  return (
    <footer className="bg-gourmet-alt text-dark-espresso pt-5 pb-4 border-top border-warm mt-5" style={{ background: '#FAF8F5' }}>
      <div className="container px-4">
        {/* Top Section: Newsletter & Brand */}
        <div className="row g-4 pb-5 border-bottom border-warm align-items-center">
          <div className="col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-gourmet-dark text-white rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm">
                <Camera size={20} strokeWidth={2.5} className="text-gold" />
              </div>
              <span className="gourmet-title fs-3 fw-bold tracking-tight text-dark-espresso">Lumen • Atelier</span>
            </div>
            <p className="text-warm-gray mb-0 pe-lg-5" style={{ fontSize: '0.98rem', lineHeight: '1.7' }}>
              Atelier de fotografia fine art com precisão cinematográfica, estética editorial europeia e luz natural para casamentos de alto padrão, branding executivo e publicidade sob direção criativa de Maria Clara. Atendimento humanizado no WhatsApp e assistência virtual IA com proteção integral de dados.
            </p>
          </div>

          <div className="col-lg-6">
            <div className="bg-white p-4 rounded-4 border border-warm shadow-sm">
              <div className="d-flex align-items-center gap-2 mb-2">
                <Sparkles size={16} className="text-gold" />
                <h5 className="gourmet-title text-dark-espresso fw-bold mb-0 fs-4">Assine a Curadoria Lumen</h5>
              </div>
              <p className="text-warm-gray fs-7 mb-3">
                Receba ensaios exclusivos, convites para exposições e artigos sobre estética visual para sua marca.
              </p>
              
              {subscribed ? (
                <div className="alert alert-success bg-gourmet-alt border border-warm text-dark-espresso py-2 mb-0 d-flex align-items-center gap-2">
                  <ShieldCheck size={18} className="text-gold" />
                  <span>Obrigado por assinar! Você receberá nossa próxima curadoria em breve.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="d-flex gap-2">
                  <input
                    type="email"
                    className="form-control bg-gourmet-alt text-dark-espresso border-warm rounded-pill px-4 py-2"
                    placeholder="Seu e-mail de preferência..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-gourmet-primary rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-1">
                    <span>Assinar</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation Links & Studio Info */}
        <div className="row g-4 py-5 border-bottom border-warm">
          <div className="col-6 col-md-3">
            <h6 className="text-dark-espresso fw-bold mb-3 gourmet-mono tracking-wider text-uppercase" style={{ fontSize: '0.78rem' }}>
              Navegação
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: '0.92rem' }}>
              <li>
                <a onClick={() => onNavigate('home')} className="text-warm-gray hover-text-dark cursor-pointer text-decoration-none transition-all">
                  Início (Home)
                </a>
              </li>
              <li>
                <a onClick={() => onNavigate('portfolio')} className="text-warm-gray hover-text-dark cursor-pointer text-decoration-none transition-all">
                  Portfólio & Galeria
                </a>
              </li>
              <li>
                <a onClick={() => onNavigate('about')} className="text-warm-gray hover-text-dark cursor-pointer text-decoration-none transition-all">
                  O Atelier & A Teoria da Luz
                </a>
              </li>
              <li>
                <a onClick={() => onNavigate('services')} className="text-warm-gray hover-text-dark cursor-pointer text-decoration-none transition-all">
                  Pacotes & Preços
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-dark-espresso fw-bold mb-3 gourmet-mono tracking-wider text-uppercase" style={{ fontSize: '0.78rem' }}>
              Atendimento & Reserva
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: '0.92rem' }}>
              <li>
                <a onClick={() => onNavigate('booking')} className="text-dark-espresso fw-semibold cursor-pointer text-decoration-none d-flex align-items-center gap-1">
                  <span className="badge badge-gold p-1"></span>
                  Agendar Sessão no WhatsApp
                </a>
              </li>
              <li>
                <a onClick={() => { if(currentUser) onNavigate('account'); else onOpenAuthModal(); }} className="text-warm-gray hover-text-dark cursor-pointer text-decoration-none transition-all">
                  Minha Conta / Google Login 🌐
                </a>
              </li>
              <li>
                <a onClick={() => onNavigate('portal')} className="text-warm-gray hover-text-dark cursor-pointer text-decoration-none transition-all">
                  Área do Cliente (Galeria Privada)
                </a>
              </li>
              <li>
                <a onClick={handleOpenWhatsAppDirect} className="text-success fw-semibold cursor-pointer text-decoration-none transition-all d-flex align-items-center gap-1">
                  <Phone size={14} />
                  <span>Falar com Atendente Humano 💬</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="text-dark-espresso fw-bold mb-3 gourmet-mono tracking-wider text-uppercase" style={{ fontSize: '0.78rem' }}>
              Especialidades
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0 text-warm-gray" style={{ fontSize: '0.92rem' }}>
              <li className="d-flex align-items-center gap-2">
                <Award size={14} className="text-gold" />
                <span>Casamentos & Destination Wedding</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Award size={14} className="text-gold" />
                <span>Retratos Executivos & Branding</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Award size={14} className="text-gold" />
                <span>Campanhas Publicitárias & Moda</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Award size={14} className="text-gold" />
                <span>Cinematografia Aérea Drone 8K</span>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="text-dark-espresso fw-bold mb-3 gourmet-mono tracking-wider text-uppercase" style={{ fontSize: '0.78rem' }}>
              Atelier & Localização
            </h6>
            <div className="d-flex flex-column gap-2 text-warm-gray" style={{ fontSize: '0.88rem' }}>
              <div className="d-flex align-items-start gap-2">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span>Av. da Luz, 1400 - Centro<br />São Lourenço da Mata / Recife - PE<br />Atendimento no WhatsApp em todo o Brasil</span>
              </div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <Phone size={15} className="text-gold flex-shrink-0" />
                <span>+55 (81) 99842-2026 (WhatsApp)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={15} className="text-gold flex-shrink-0" />
                <span>contato@lumenstudio.com.br</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Badges */}
        <div className="pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span className="text-warm-gray" style={{ fontSize: '0.82rem' }}>
              © 2026 LUMEN ATELIER (Dona: Maria Clara • Dev: Vinicius Strack). Todos os direitos reservados.
            </span>
            <span className="badge badge-gourmet px-3 py-1">
              Shot on Sony A1 & Leica M11
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <a onClick={handleOpenWhatsAppDirect} className="btn btn-sm text-white fw-bold rounded-pill px-3 py-1 d-flex align-items-center gap-1 cursor-pointer shadow-sm" style={{ background: '#25D366' }}>
              <Phone size={14} />
              <span>WhatsApp Oficial</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-gourmet-outline rounded-circle p-2 text-dark-espresso" title="Website">
              <Globe size={16} />
            </a>
            <a onClick={() => onNavigate('booking')} className="btn btn-sm btn-gourmet-gold rounded-pill px-3 py-1 text-white fw-medium cursor-pointer" style={{ fontSize: '0.78rem' }}>
              Agendar Ensaio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
