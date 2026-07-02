import React, { useState, useEffect } from 'react';
import type { PageType, UserProfile } from '../types';
import { Camera, Calendar, User, Menu, X, Sparkles, Phone, Lock } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  bookingCount?: number;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onOpenAuthModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Notice: 'admin' is NEVER in the public navigation list!
  const navItems: { id: PageType; label: string; badge?: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'portfolio', label: 'Portfólio & Galeria' },
    { id: 'about', label: 'O Atelier' },
    { id: 'services', label: 'Pacotes & Preços' },
    { id: 'booking', label: 'Agendar no WhatsApp', badge: 'Online' },
  ];

  const handleOpenWhatsAppDirect = () => {
    const msg = encodeURIComponent("Olá, Lumen Atelier! Estou navegando pelo website e gostaria de falar com a equipe de atendimento via WhatsApp. ✨");
    window.open(`https://wa.me/5581998422026?text=${msg}`, '_blank');
  };

  return (
    <header className="fixed-top z-3 w-100 px-3 px-md-4 py-3 pointer-events-none">
      <nav 
        className={`navbar navbar-expand-lg rounded-pill px-3 px-md-4 py-2 mx-auto transition-all duration-500 pointer-events-auto ${
          isScrolled 
            ? 'bg-white bg-opacity-90 shadow border border-warm backdrop-blur-md' 
            : 'bg-gourmet-alt bg-opacity-80 border border-warm backdrop-blur-sm shadow-sm'
        }`}
        style={{
          maxWidth: '1280px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
          {/* Logo */}
          <a 
            className="navbar-brand text-dark-espresso fw-bold d-flex align-items-center gap-2 m-0 cursor-pointer" 
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            style={{ fontSize: '1.35rem', letterSpacing: '-0.5px' }}
          >
            <div className="d-flex align-items-center justify-content-center bg-gourmet-dark text-white rounded-circle p-2 shadow-sm">
              <Camera size={16} strokeWidth={2.5} className="text-gold" />
            </div>
            <span className="gourmet-title tracking-tight fw-bolder fs-4 mb-0">Lumen</span>
            <span className="text-warm-gray fw-normal fs-6 d-none d-sm-inline gourmet-sans">• Atelier</span>
            <span className="badge badge-gold py-1 px-2 ms-1 d-none d-md-inline" style={{ fontSize: '0.65rem' }}>
              FINE ART
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="d-none d-lg-flex align-items-center gap-1 bg-gourmet-surface p-1 rounded-pill border border-warm shadow-sm">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`btn btn-sm rounded-pill px-3 py-1 fw-medium transition-all position-relative d-flex align-items-center gap-1 ${
                    isActive
                      ? 'bg-gourmet-dark text-white shadow-sm fw-semibold'
                      : 'text-warm-gray hover-text-dark bg-transparent border-0'
                  }`}
                  style={{ fontSize: '0.85rem' }}
                >
                  {item.label}
                  {item.badge && (
                    <span className={`badge rounded-pill ms-1 ${isActive ? 'bg-white text-dark-espresso' : 'badge-gold'}`} style={{ fontSize: '0.6rem', padding: '0.2rem 0.4rem' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="d-flex align-items-center gap-2">
            {/* Direct WhatsApp Contact Button */}
            <button
              onClick={handleOpenWhatsAppDirect}
              className="btn btn-sm rounded-pill px-3 py-2 d-none d-xl-flex align-items-center gap-2 transition-all text-white fw-semibold shadow-sm"
              style={{ fontSize: '0.82rem', background: '#25D366', border: '1px solid #25D366' }}
              title="Falar no WhatsApp"
            >
              <Phone size={14} />
              <span>WhatsApp</span>
            </button>

            {/* ONLY STUDIO ADMIN SEES THIS SPECIAL GOLD BUTTON */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                className={`btn btn-sm rounded-pill px-3 py-2 d-flex align-items-center gap-1 transition-all shadow-sm ${
                  currentPage === 'admin' ? 'bg-gourmet-dark text-gold border border-gold' : 'btn-gourmet-gold text-white'
                }`}
                style={{ fontSize: '0.82rem', background: currentPage === 'admin' ? '#1C1B18' : undefined }}
                title="Acessar painel exclusivo de gestão do fotógrafo admin"
              >
                <Lock size={13} className="text-white" />
                <span className="fw-bold">Painel Fotógrafo 🔒</span>
              </button>
            )}

            {/* Account / Google OAuth Button */}
            {currentUser ? (
              <button
                onClick={() => { onNavigate('account'); setMobileMenuOpen(false); }}
                className={`btn btn-sm rounded-pill ps-2 pe-3 py-1 d-flex align-items-center gap-2 transition-all border border-warm shadow-sm ${
                  currentPage === 'account' ? 'bg-gourmet-dark text-white' : 'bg-white text-dark-espresso hover-scale'
                }`}
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="rounded-circle object-fit-cover"
                  style={{ width: '26px', height: '26px' }}
                />
                <span className="fw-semibold text-truncate max-w-100" style={{ fontSize: '0.82rem' }}>
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false); }}
                className="btn btn-sm btn-gourmet-outline rounded-pill px-3 py-2 d-flex align-items-center gap-2 shadow-sm"
                style={{ fontSize: '0.82rem' }}
                title="Login seguro com Google"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16px" height="16px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                <span>Entrar / Minha Conta</span>
              </button>
            )}

            {/* Quick Agendar CTA */}
            <button
              onClick={() => { onNavigate('booking'); setMobileMenuOpen(false); }}
              className="btn-gourmet-primary btn-sm py-2 px-3 d-flex align-items-center gap-2 shadow-sm"
              style={{ fontSize: '0.82rem' }}
            >
              <Calendar size={14} className="text-gold" />
              <span>Agendar</span>
              <Sparkles size={13} className="text-gold d-none d-xl-inline" />
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              className="btn btn-sm btn-outline-dark border-0 d-lg-none p-1 ms-1 text-dark-espresso"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            className="w-100 d-lg-none mt-3 pt-3 border-top border-warm d-flex flex-column gap-2 pb-2 animate-fade-in"
          >
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                  className={`btn rounded-pill px-3 py-2 text-start d-flex justify-content-between align-items-center ${
                    isActive ? 'bg-gourmet-dark text-white fw-bold' : 'text-warm-gray bg-transparent border-0'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && <span className="badge badge-gold rounded-pill">{item.badge}</span>}
                </button>
              );
            })}

            <div className="border-top border-warm my-1 pt-2 d-flex flex-column gap-2">
              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                  className="btn-gourmet-gold w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                >
                  <Lock size={16} />
                  <span>Painel Fotógrafo Admin 🔒</span>
                </button>
              )}

              <button
                onClick={() => { 
                  if (currentUser) {
                    onNavigate('account');
                  } else {
                    onOpenAuthModal();
                  }
                  setMobileMenuOpen(false);
                }}
                className="btn-gourmet-outline w-100 py-2 d-flex align-items-center justify-content-center gap-2"
              >
                <User size={16} />
                <span>{currentUser ? `Minha Conta (${currentUser.name})` : 'Entrar com Google 🌐'}</span>
              </button>

              <button
                onClick={() => { handleOpenWhatsAppDirect(); setMobileMenuOpen(false); }}
                className="btn rounded-pill w-100 py-2 d-flex align-items-center justify-content-center gap-2 text-white fw-bold"
                style={{ background: '#25D366' }}
              >
                <Phone size={16} />
                <span>Falar no WhatsApp com Equipe</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
