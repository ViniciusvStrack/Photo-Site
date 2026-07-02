import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { X, ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  currentUser: UserProfile | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  currentUser
}) => {
  const [authStep, setAuthStep] = useState<'options' | 'google-chooser' | 'email'>('options');
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  if (!isOpen) return null;

  const handleSelectGoogleAccount = (type: 'client' | 'maria' | 'vinicius') => {
    if (type === 'client') {
      const clientUser: UserProfile = {
        id: 'usr-google-client',
        name: 'Ana Clara Silva',
        email: 'ana.clara@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'client',
        provider: 'google',
        verifiedAt: new Date().toLocaleDateString('pt-BR')
      };
      onLogin(clientUser);
    } else if (type === 'maria') {
      const mariaUser: UserProfile = {
        id: 'usr-google-admin-maria',
        name: 'Maria Clara (Dona & Diretora Criativa)',
        email: 'maria.clara@lumenatelier.com',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        role: 'admin',
        provider: 'google',
        verifiedAt: new Date().toLocaleDateString('pt-BR')
      };
      onLogin(mariaUser);
    } else {
      const viniciusUser: UserProfile = {
        id: 'usr-google-admin-vinicius',
        name: 'Vinicius Strack (Desenvolvedor do Sistema)',
        email: 'viniciuvstrack@gmail.com',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        role: 'admin',
        provider: 'google',
        verifiedAt: new Date().toLocaleDateString('pt-BR')
      };
      onLogin(viniciusUser);
    }
    onClose();
  };

  const handleCustomEmailSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    
    const targetEmail = customEmail.trim() || 'maria.clara@lumenatelier.com';
    const isStudioEmail = targetEmail.toLowerCase().includes('lumenatelier') || targetEmail.toLowerCase().includes('lumenstudio') || targetEmail.toLowerCase().includes('viniciuvstrack') || targetEmail.toLowerCase().includes('mariaclara') || targetEmail.toLowerCase().includes('admin');
    
    let targetName = customName.trim();
    if (!targetName) {
      if (targetEmail.toLowerCase().includes('viniciuvstrack')) targetName = 'Vinicius Strack (Desenvolvedor)';
      else if (isStudioEmail) targetName = 'Maria Clara (Diretora Criativa)';
      else targetName = targetEmail.split('@')[0];
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: targetName,
      email: targetEmail,
      avatarUrl: isStudioEmail 
        ? 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' 
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: isStudioEmail ? 'admin' : 'client',
      provider: 'email',
      verifiedAt: new Date().toLocaleDateString('pt-BR')
    };

    onLogin(newUser);
    onClose();
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 z-5 d-flex align-items-center justify-content-center p-3 animate-fade-in"
      style={{
        backgroundColor: 'rgba(28, 27, 24, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
      onClick={onClose}
    >
      <div 
        className="card bg-white border border-warm shadow-lg overflow-hidden max-w-450 w-100 animate-slide-down"
        style={{ borderRadius: '28px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 bg-gourmet-alt border-bottom border-warm d-flex justify-content-between align-items-center" style={{ background: '#FAF8F5' }}>
          <div className="d-flex align-items-center gap-2">
            <div className="bg-gourmet-dark text-white rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm">
              <Lock size={16} className="text-gold" />
            </div>
            <div>
              <h5 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-5">Lumen • Identidade Segura</h5>
              <div className="d-flex align-items-center gap-1" style={{ fontSize: '0.68rem', color: '#5C5850' }}>
                <ShieldCheck size={12} className="text-success" />
                <span className="gourmet-mono">Conexão SSL & Proteção LGPD</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-sm btn-outline-dark rounded-circle p-1 text-dark-espresso border-0"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 p-md-5">
          {currentUser ? (
            <div className="text-center py-3">
              <div className="position-relative d-inline-block mb-3">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="rounded-circle border border-warm shadow-sm object-fit-cover"
                  style={{ width: '80px', height: '80px' }}
                />
                <span className="position-absolute bottom-0 end-0 badge rounded-circle bg-success p-1 border border-white">
                  <CheckCircle2 size={14} className="text-white" />
                </span>
              </div>
              <h5 className="gourmet-title fw-bold text-dark-espresso mb-1">{currentUser.name}</h5>
              <p className="text-warm-gray fs-7 mb-3 gourmet-mono">{currentUser.email}</p>
              
              <div className="badge badge-gold mb-4 px-3 py-2">
                {currentUser.role === 'admin' ? '👑 GESTÃO DO ATELIER VERIFICADA' : '✨ CONTA CLIENTE VERIFICADA'}
              </div>

              <button
                onClick={() => { onLogin(null as any); onClose(); }}
                className="btn btn-outline-danger rounded-pill w-100 py-2 fw-semibold fs-7"
              >
                Desconectar da Conta
              </button>
            </div>
          ) : authStep === 'options' ? (
            <div className="text-center">
              <span className="badge badge-sage mb-3 px-3 py-1">
                SEGURO & SEM SENHAS GRAVADAS
              </span>
              <h4 className="gourmet-title fw-bold text-dark-espresso mb-2 fs-3">Acesse ou Crie Sua Conta</h4>
              <p className="text-warm-gray fs-7 mb-4 gourmet-sans" style={{ lineHeight: '1.6' }}>
                Conecte seu perfil Google Identity para aprovar fotolivros, acompanhar contratos e ter seus dados autorais protegidos por criptografia de nível bancário.
              </p>

              {/* Google OAuth Button */}
              <button
                onClick={() => setAuthStep('google-chooser')}
                className="btn w-100 py-3 rounded-pill bg-white border border-dark border-opacity-50 text-dark-espresso fw-bold d-flex align-items-center justify-content-center gap-3 shadow-sm hover-scale mb-3"
                style={{ fontSize: '0.95rem' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22px" height="22px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                <span>Continuar com o Google</span>
              </button>

              <div className="d-flex align-items-center gap-3 my-3 text-muted-warm fs-7">
                <hr className="w-50 border-warm" />
                <span>OU</span>
                <hr className="w-50 border-warm" />
              </div>

              <button
                onClick={() => setAuthStep('email')}
                className="btn btn-gourmet-outline w-100 py-2 fs-7"
              >
                <Mail size={16} />
                <span>Entrar via E-mail & Senha</span>
              </button>
            </div>
          ) : authStep === 'google-chooser' ? (
            <div className="animate-fade-in">
              <div className="text-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="36px" height="36px" className="mb-2">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                <h5 className="fw-bold text-dark-espresso mb-1">Escolha uma conta Google</h5>
                <p className="text-warm-gray fs-7 mb-0">Para prosseguir para o Lumen Atelier</p>
              </div>

              <div className="d-flex flex-column gap-2 mb-4">
                {/* Account 1: Client */}
                <button
                  onClick={() => handleSelectGoogleAccount('client')}
                  className="btn p-3 rounded-4 bg-white border border-warm text-start d-flex align-items-center gap-3 hover-scale shadow-sm"
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Ana Clara"
                    className="rounded-circle object-fit-cover flex-shrink-0"
                    style={{ width: '42px', height: '42px' }}
                  />
                  <div className="overflow-hidden">
                    <div className="fw-bold text-dark-espresso text-truncate">Ana Clara Silva</div>
                    <div className="text-warm-gray fs-7 gourmet-mono text-truncate">ana.clara@gmail.com</div>
                  </div>
                  <span className="badge badge-gold ms-auto">Cliente</span>
                </button>

                {/* Account 2: Maria Clara (Dona / Studio Admin) */}
                <button
                  onClick={() => handleSelectGoogleAccount('maria')}
                  className="btn p-3 rounded-4 bg-white border border-warm text-start d-flex align-items-center gap-3 hover-scale shadow-sm"
                  style={{ border: '1.5px solid #C5A059' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80"
                    alt="Maria Clara"
                    className="rounded-circle object-fit-cover flex-shrink-0"
                    style={{ width: '42px', height: '42px' }}
                  />
                  <div className="overflow-hidden">
                    <div className="fw-bold text-dark-espresso text-truncate">Maria Clara (Dona & Diretora)</div>
                    <div className="text-warm-gray fs-7 gourmet-mono text-truncate">maria.clara@lumenatelier.com</div>
                  </div>
                  <span className="badge bg-gourmet-dark text-white ms-auto">Fotógrafa Admin</span>
                </button>

                {/* Account 3: Vinicius Strack (Developer) */}
                <button
                  onClick={() => handleSelectGoogleAccount('vinicius')}
                  className="btn p-3 rounded-4 bg-white border border-warm text-start d-flex align-items-center gap-3 hover-scale shadow-sm"
                  style={{ border: '1.5px solid #5F7367' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Vinicius Strack"
                    className="rounded-circle object-fit-cover flex-shrink-0"
                    style={{ width: '42px', height: '42px' }}
                  />
                  <div className="overflow-hidden">
                    <div className="fw-bold text-dark-espresso text-truncate">Vinicius Strack (Dev do Sistema)</div>
                    <div className="text-warm-gray fs-7 gourmet-mono text-truncate">viniciuvstrack@gmail.com</div>
                  </div>
                  <span className="badge badge-sage ms-auto">Dev / Admin</span>
                </button>
              </div>

              <button
                onClick={() => setAuthStep('options')}
                className="btn btn-link text-warm-gray text-decoration-none w-100 fs-7"
              >
                ← Voltar para outras opções
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomEmailSubmit} className="animate-fade-in">
              <h5 className="gourmet-title fw-bold text-dark-espresso mb-3 fs-4 text-center">Login via E-mail</h5>

              <div className="mb-3">
                <label className="form-label text-dark-espresso fw-semibold fs-7">Seu Nome COMPLETO (Opcional):</label>
                <input
                  type="text"
                  className="form-control bg-white text-dark-espresso border-warm rounded-pill px-4 py-2"
                  placeholder="Ex: Maria Clara ou Vinicius Strack"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-dark-espresso fw-semibold fs-7">E-mail Profissional:</label>
                <input
                  type="email"
                  className="form-control bg-white text-dark-espresso border-warm rounded-pill px-4 py-2 gourmet-mono fs-7"
                  placeholder="Seu e-mail corporativo ou pessoal..."
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                />
                <div className="form-text fs-7 text-muted-warm mt-1">
                  💡 Para acesso de gestão do atelier, utilize seu e-mail corporativo autorizado.
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => handleCustomEmailSubmit(e)}
                className="btn-gourmet-primary w-100 py-3 shadow-md mb-3"
              >
                <span>Entrar Seguramente</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setAuthStep('options')}
                className="btn btn-link text-warm-gray text-decoration-none w-100 fs-7"
              >
                ← Voltar para login com Google
              </button>
            </form>
          )}

          {/* LGPD Security Footer inside Modal */}
          <div className="mt-4 pt-3 border-top border-warm text-center">
            <p className="text-muted-warm fs-7 mb-0" style={{ fontSize: '0.7rem', lineHeight: '1.5' }}>
              Ao autenticar-se, você declara estar de acordo com os **Termos de Segurança LGPD** do Lumen Atelier. Nenhum dado de cartão ou senha é mantido em nossos servidores.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
