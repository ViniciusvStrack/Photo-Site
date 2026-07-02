import React, { useState, useEffect } from 'react';
import type { PageType, UserProfile } from '../types';
import { apiService } from '../services/api';
import { ContractModal } from '../components/ContractModal';
import { Mail, ShieldCheck, Calendar, CheckCircle2, ExternalLink, LogOut, Lock, Award, FileText } from 'lucide-react';

interface AccountPageProps {
  currentUser: UserProfile | null;
  onNavigate: (page: PageType) => void;
  onLogout: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  currentUser,
  onNavigate,
  onLogout
}) => {
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      apiService.getAllBookings().then((all) => {
        // filter bookings matching email or name
        const filtered = (all || []).filter(b => 
          b.clientEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
          b.clientName?.toLowerCase().includes(currentUser.name.split(' ')[0].toLowerCase()) ||
          currentUser.role === 'admin'
        );
        setUserBookings(filtered);
        setIsLoading(false);
      }).catch(() => setIsLoading(false));
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 min-vh-100 d-flex align-items-center justify-content-center bg-gourmet-main">
        <div className="container max-w-600 py-5 text-center">
          <div className="card-gourmet p-5 shadow-lg border border-warm" style={{ borderRadius: '28px', background: '#FFFFFF' }}>
            <div className="bg-gourmet-dark text-white rounded-circle p-4 d-inline-flex mx-auto mb-4 shadow-sm">
              <Lock size={36} className="text-gold" />
            </div>
            <h2 className="gourmet-title fw-bold text-dark-espresso mb-2 fs-3">Acesso Restrito / Conta Não Autenticada</h2>
            <p className="text-warm-gray mb-4 gourmet-sans">
              Por favor, realize o login com sua conta **Google** para visualizar seus agendamentos, galerias privadas e contratos autorais do Lumen Atelier.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="btn-gourmet-primary px-5 py-3 shadow-md"
            >
              <span>Voltar e Fazer Login no Menu</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 bg-gourmet-main min-vh-100">
      <div className="container pt-4">
        
        {/* Profile Header Card */}
        <div className="card-gourmet p-4 p-md-5 mb-5 shadow-lg border border-warm" style={{ borderRadius: '28px', background: '#FFFFFF' }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4">
            <div className="d-flex align-items-center gap-4">
              <div className="position-relative flex-shrink-0">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="rounded-circle border border-warm shadow-sm object-fit-cover"
                  style={{ width: '92px', height: '92px' }}
                />
                <span className="position-absolute bottom-0 end-0 badge rounded-circle bg-success p-2 border border-white">
                  <CheckCircle2 size={16} className="text-white" />
                </span>
              </div>

              <div>
                <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                  <span className={`badge px-3 py-1 ${currentUser.role === 'admin' ? 'bg-gourmet-dark text-gold' : 'badge-gold'}`}>
                    {currentUser.role === 'admin' ? '👑 FOTÓGRAFO ADMINISTRADOR' : '✨ CLIENTE VERIFICADA'}
                  </span>
                  <span className="badge badge-sage px-3 py-1">
                    GOOGLE OAUTH 2.0
                  </span>
                </div>
                <h1 className="display-6 fw-bold text-dark-espresso mb-1 gourmet-title">{currentUser.name}</h1>
                <div className="text-warm-gray fs-6 gourmet-mono d-flex align-items-center gap-2">
                  <Mail size={15} className="text-gold" />
                  <span>{currentUser.email}</span>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 flex-shrink-0 flex-wrap">
              <button
                onClick={() => setIsContractModalOpen(true)}
                className="btn-gourmet-outline px-4 py-2 text-terracotta"
              >
                <FileText size={16} />
                <span>Ler Contrato LGPD 📜</span>
              </button>
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => onNavigate('admin')}
                  className="btn-gourmet-gold px-4 py-2 shadow-sm"
                >
                  <Lock size={16} />
                  <span>Painel Admin Agenda 🔒</span>
                </button>
              )}
              <button
                onClick={() => { onLogout(); onNavigate('home'); }}
                className="btn-gourmet-outline px-4 py-2 text-danger border-danger border-opacity-25"
              >
                <LogOut size={16} />
                <span>Desconectar</span>
              </button>
            </div>
          </div>

          {/* Security & LGPD Banner */}
          <div className="p-4 mt-4 bg-gourmet-alt rounded-4 border border-warm d-flex align-items-center gap-3">
            <ShieldCheck size={26} className="text-success flex-shrink-0" />
            <div>
              <h6 className="fw-bold text-dark-espresso mb-1 fs-7">Criptografia Google Identity & Proteção Integral de Dados</h6>
              <p className="text-warm-gray fs-7 mb-0">
                Seu acesso é verificado diretamente pelo protocolo OAuth 2.0 do Google. Nenhum dado sensível ou senha é compartilhado ou armazenado no Lumen Atelier, cumprindo integralmente as diretrizes da LGPD (Lei Geral de Proteção de Dados).
              </p>
            </div>
          </div>
        </div>

        {/* User Bookings Section */}
        <div className="card-gourmet p-4 p-md-5 mb-5" style={{ borderRadius: '24px', background: '#FFFFFF' }}>
          <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-warm flex-wrap gap-2">
            <h3 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-3 d-flex align-items-center gap-2">
              <Calendar size={22} className="text-gold" />
              <span>Meus Contratos & Solicitações de Reserva ({userBookings.length})</span>
            </h3>
            <button
              onClick={() => onNavigate('booking')}
              className="btn-gourmet-primary btn-sm px-4 py-2"
            >
              <span>Agendar Novo Ensaio</span>
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-gold" role="status" />
              <p className="text-warm-gray mt-2 fs-7">Sincronizando seus contratos seguros...</p>
            </div>
          ) : userBookings.length === 0 ? (
            <div className="text-center py-5 bg-gourmet-alt rounded-4 border border-warm">
              <Award size={40} className="text-gold mb-3 opacity-50" />
              <h5 className="fw-bold text-dark-espresso">Nenhum ensaio agendado ainda</h5>
              <p className="text-warm-gray mb-4">Escolha seu módulo fine art favorito e agende uma data no WhatsApp.</p>
              <button
                onClick={() => onNavigate('booking')}
                className="btn-gourmet-gold px-4 py-2"
              >
                Agendar Minha Primeira Sessão
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {userBookings.map((b) => (
                <div key={b.id} className="col-md-6">
                  <div className="card-gourmet-alt p-4 h-100 d-flex flex-column justify-content-between border border-warm shadow-sm hover-scale" style={{ borderRadius: '20px' }}>
                    <div>
                      <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-1">
                        <span className="badge badge-gold gourmet-mono fs-7">{b.code}</span>
                        {b.status === 'confirmed' && <span className="badge bg-success text-white px-3 py-1">Contrato Confirmado</span>}
                        {b.status === 'pending' && <span className="badge bg-warning text-dark px-3 py-1">Aguardando WhatsApp</span>}
                        {b.status === 'cancelled' && <span className="badge bg-danger text-white px-3 py-1">Cancelado</span>}
                      </div>

                      <h4 className="gourmet-title fw-bold text-dark-espresso mb-2 fs-4">{b.packageId?.replace('pkg-', '').toUpperCase()}</h4>
                      <div className="text-warm-gray fs-7 mb-3">
                        <div>📅 <strong>Data Solar:</strong> {b.date ? b.date.split('-').reverse().join('/') : 'N/A'}</div>
                        <div>☀️ <strong>Condição:</strong> {b.timeSlot}</div>
                        <div>📍 <strong>Locação:</strong> {b.location}</div>
                      </div>
                    </div>

                    <div className="pt-3 border-top border-warm d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <div className="gourmet-mono fw-bolder text-terracotta fs-5">
                        R$ {b.totalPrice?.toLocaleString('pt-BR')}
                      </div>

                      <button
                        onClick={() => onNavigate('portal')}
                        className="btn btn-sm btn-gourmet-outline px-3 py-2 fw-semibold d-flex align-items-center gap-1"
                      >
                        <span>Acessar Galeria em Nuvem</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <ContractModal 
          isOpen={isContractModalOpen}
          onClose={() => setIsContractModalOpen(false)}
          clientName={currentUser.name}
        />

      </div>
    </div>
  );
};
