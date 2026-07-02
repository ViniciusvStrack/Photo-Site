import React, { useState } from 'react';
import type { ClientPortalSession } from '../types';
import { MOCK_CLIENT_PORTALS } from '../data/mockData';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Lock, Key, Check, Heart, Download, LogOut, Sparkles, CheckCircle2, FileCheck } from 'lucide-react';

interface ClientPortalPageProps {
  onPhotoClick: (photoId: string) => void;
}

export const ClientPortalPage: React.FC<ClientPortalPageProps> = ({ onPhotoClick }) => {
  const [accessCode, setAccessCode] = useState<string>('');
  const [session, setSession] = useState<ClientPortalSession | null>(null);
  const [error, setError] = useState<string>('');
  const [approved, setApproved] = useState<boolean>(false);
  const [downloadingZip, setDownloadingZip] = useState<boolean>(false);
  const [zipDownloaded, setZipDownloaded] = useState<boolean>(false);

  const handleLogin = (e?: React.FormEvent, codeOverride?: string) => {
    if (e) e.preventDefault();
    const codeToSearch = (codeOverride || accessCode).trim().toUpperCase();
    
    const found = MOCK_CLIENT_PORTALS.find(s => s.accessCode === codeToSearch);
    if (found) {
      setSession({ ...found });
      setError('');
      setApproved(false);
    } else {
      setError('Código de acesso não encontrado. Verifique seu e-mail ou utilize o código de contrato autoral.');
    }
  };

  const handleToggleSelect = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) return;

    const updatedPhotos = session.photos.map(p => {
      if (p.id === photoId) {
        // Check selection limit
        if (!p.selected && session.selectedCount >= session.maxSelection) {
          alert(`Você já atingiu o limite de ${session.maxSelection} fotos selecionadas para o seu álbum contratado! Desmarque alguma foto antes de selecionar outra.`);
          return p;
        }
        return { ...p, selected: !p.selected };
      }
      return p;
    });

    const newCount = updatedPhotos.filter(p => p.selected).length;
    setSession({
      ...session,
      photos: updatedPhotos,
      selectedCount: newCount
    });
  };

  const handleToggleFavorite = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session) return;
    setSession({
      ...session,
      photos: session.photos.map(p => p.id === photoId ? { ...p, favorite: !p.favorite } : p)
    });
  };

  const handleApproveAlbum = () => {
    if (!session) return;
    setApproved(true);
    setSession({
      ...session,
      status: 'Aprovado'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadZip = () => {
    setDownloadingZip(true);
    setTimeout(() => {
      setDownloadingZip(false);
      setZipDownloaded(true);
      setTimeout(() => setZipDownloaded(false), 4000);
    }, 2000);
  };

  // 1. LOGIN SCREEN VIEW
  if (!session) {
    return (
      <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 min-vh-100 d-flex align-items-center justify-content-center bg-gourmet-main">
        <div className="container max-w-600 py-5">
          <div className="card-gourmet p-4 p-md-5 text-center shadow-lg" style={{ borderRadius: '28px', background: '#FFFFFF' }}>
            
            <div className="bg-gourmet-dark text-white rounded-circle p-3 d-inline-flex mx-auto mb-4 shadow-sm">
              <Lock size={32} className="text-gold" />
            </div>

            <span className="badge badge-gold mb-3 px-3 py-1">
              GALERIA EM NUVEM PRIVADA • LUMEN CLOUD IA
            </span>

            <h1 className="gourmet-title fw-bold text-dark-espresso mb-2 fs-2">Área Exclusiva do Cliente</h1>
            <p className="text-warm-gray mb-4 gourmet-sans" style={{ fontSize: '0.98rem', lineHeight: '1.6' }}>
              Digite o código alfanumérico autoral enviado para o seu e-mail para acessar suas fotografias em ProRAW, curar suas obras favoritas e aprovar seu fotolivro encadernado em couro.
            </p>

            {error && (
              <div className="alert alert-danger bg-danger bg-opacity-10 border border-danger text-danger py-2 mb-4 fs-7 rounded-3">
                {error}
              </div>
            )}

            <form onSubmit={(e) => handleLogin(e)} className="mb-4">
              <div className="input-group input-group-lg mb-3 shadow-sm rounded-pill overflow-hidden border border-warm">
                <span className="input-group-text bg-gourmet-alt text-warm-gray border-0 ps-4">
                  <Key size={20} className="text-gold" />
                </span>
                <input
                  type="text"
                  className="form-control bg-white text-dark-espresso border-0 gourmet-mono text-uppercase pe-4 py-3"
                  placeholder="EX: LUMEN2026"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn-gourmet-primary fw-bold px-4 rounded-0"
                >
                  Acessar
                </button>
              </div>
            </form>

            <div className="pt-3 border-top border-warm text-center">
              <p className="text-muted-warm fs-7 mb-0 gourmet-mono">
                💡 Sua galeria particular é protegida por criptografia SSL. Digite o código fornecido no contrato autoral ou e-mail de entrega (ex: `LUMEN2026`).
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 2. PRIVATE GALLERY VIEW
  return (
    <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 bg-gourmet-main">
      <div className="container pt-4">
        
        {/* Banner with Cover Image */}
        <div 
          className="card-gourmet p-4 p-md-5 mb-5 position-relative overflow-hidden shadow-lg border border-warm"
          style={{ borderRadius: '28px', background: '#FFFFFF' }}
        >
          {/* Cover background */}
          <div className="position-absolute top-0 end-0 w-100 h-100 opacity-20 z-0 pointer-events-none">
            <ImageWithFallback
              src={session.coverUrl}
              alt="Capa"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(90deg, #FFFFFF 40%, rgba(255,255,255,0.4) 100%)' }} />
          </div>

          <div className="position-relative z-1 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge badge-sage px-3 py-1">
                  STATUS: {session.status.toUpperCase()}
                </span>
                <span className="badge badge-gourmet px-3 py-1">
                  CÓDIGO: #{session.accessCode}
                </span>
              </div>

              <h1 className="display-5 fw-bold text-dark-espresso mb-2 gourmet-title">{session.eventTitle}</h1>
              <p className="text-warm-gray mb-0 fs-5 gourmet-sans">Cliente: <span className="text-dark-espresso fw-bold">{session.clientName}</span> • Data: {session.eventDate}</p>
            </div>

            <div className="d-flex flex-wrap gap-2 flex-shrink-0">
              <button
                onClick={handleDownloadZip}
                disabled={downloadingZip}
                className={`btn rounded-pill px-4 py-3 fw-bold d-flex align-items-center gap-2 shadow-sm ${
                  zipDownloaded ? 'btn-success text-white' : 'btn-gourmet-gold'
                }`}
              >
                {downloadingZip ? (
                  <>
                    <div className="spinner-border spinner-border-sm text-white" role="status" />
                    <span>Gerando ZIP 4K...</span>
                  </>
                ) : zipDownloaded ? (
                  <>
                    <Check size={18} />
                    <span>Download ZIP Iniciado!</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>Baixar Todas em ZIP (ProRAW/4K)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSession(null)}
                className="btn-gourmet-outline px-4 py-3"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selection Progress Bar */}
        <div className="bg-white border border-warm rounded-4 p-4 mb-5 shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-dark-espresso fw-bold gourmet-mono fs-6">
                Progresso de Curadoria para o Fotolivro Museu:
              </span>
              <span className="gourmet-mono fw-bolder fs-5 text-terracotta" style={{ color: '#A86A3D' }}>
                {session.selectedCount} / {session.maxSelection} obras
              </span>
            </div>
            
            <div className="progress bg-gourmet-alt" style={{ height: '10px', borderRadius: '5px' }}>
              <div 
                className="progress-bar transition-all duration-500" 
                role="progressbar" 
                style={{ width: `${(session.selectedCount / session.maxSelection) * 100}%`, background: 'linear-gradient(90deg, #C5A059 0%, #A86A3D 100%)' }} 
              />
            </div>
            <div className="text-warm-gray fs-7 mt-2 gourmet-sans">
              💡 Clique no botão "Selecionar" no canto superior de qualquer obra para incluí-la ou removê-la da sua encadernação em couro.
            </div>
          </div>

          {session.status !== 'Aprovado' ? (
            <button
              onClick={handleApproveAlbum}
              disabled={session.selectedCount === 0}
              className="btn btn-success text-white rounded-pill px-5 py-3 fw-bold flex-shrink-0 d-flex align-items-center gap-2 shadow-sm"
              style={{ background: '#5F7367', borderColor: '#5F7367' }}
            >
              <FileCheck size={20} />
              <span>Aprovar Seleção do Álbum</span>
            </button>
          ) : (
            <div className="badge badge-sage px-4 py-3 fs-6 d-flex align-items-center gap-2 flex-shrink-0">
              <CheckCircle2 size={20} />
              <span>Álbum Aprovado para Encadernação!</span>
            </div>
          )}
        </div>

        {/* Approved Alert Banner */}
        {approved && (
          <div className="alert alert-success bg-gourmet-alt border border-warm text-dark-espresso p-4 rounded-4 mb-5 d-flex align-items-center justify-content-between animate-bounce shadow-sm">
            <div className="d-flex align-items-center gap-3">
              <Sparkles size={28} className="text-gold flex-shrink-0" />
              <div>
                <h5 className="gourmet-title fw-bold mb-1 fs-4 text-dark-espresso">Curadoria Aprovada com Magnificência!</h5>
                <p className="mb-0 fs-7 text-warm-gray gourmet-sans" style={{ lineHeight: '1.6' }}>
                  Enviamos suas {session.selectedCount} obras curadas para nosso laboratório de encadernação artesanal italiana em couro. O prazo de entrega do fotolivro físico fine art é de 15 dias úteis.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Photo Grid */}
        <div className="row g-4">
          {session.photos.map((photo) => (
            <div key={photo.id} className="col-12 col-sm-6 col-md-4 col-xl-3">
              <div 
                onClick={() => onPhotoClick('pho-01')} // opens demo high-res modal
                className={`card-gourmet overflow-hidden h-100 cursor-pointer transition-all group ${
                  photo.selected ? 'border-warm-strong ring-2 ring-gold shadow-md' : 'border-warm'
                }`}
                style={{ borderRadius: '20px', background: '#FFFFFF' }}
              >
                <div className="position-relative overflow-hidden" style={{ height: '260px', background: '#F5F2EB' }}>
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Top Checkbox and Favorite Buttons */}
                  <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center z-2">
                    <button
                      onClick={(e) => handleToggleSelect(photo.id, e)}
                      className={`btn btn-sm rounded-pill px-3 py-1 fw-bold gourmet-mono d-flex align-items-center gap-1 shadow-sm transition-all ${
                        photo.selected ? 'btn-gourmet-gold text-white border-0' : 'bg-white text-dark-espresso border border-warm hover-scale'
                      }`}
                      title="Anexar ao fotolivro"
                      style={{ fontSize: '0.72rem' }}
                    >
                      <Check size={14} className={photo.selected ? 'text-white' : 'text-gold'} />
                      <span>{photo.selected ? 'Selecionada' : 'Selecionar'}</span>
                    </button>

                    <button
                      onClick={(e) => handleToggleFavorite(photo.id, e)}
                      className="btn btn-sm bg-white text-dark-espresso rounded-circle p-2 border border-warm shadow-sm hover-bg-danger transition-all d-flex align-items-center justify-content-center"
                      style={{ width: '34px', height: '34px' }}
                      title="Favoritar obra"
                    >
                      <Heart size={14} fill={photo.favorite ? 'currentColor' : 'none'} className={photo.favorite ? 'text-danger' : 'text-terracotta'} />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-gourmet-alt d-flex justify-content-between align-items-center text-warm-gray gourmet-mono border-top border-warm" style={{ fontSize: '0.75rem' }}>
                  <span className="text-dark-espresso fw-semibold text-truncate pe-2">{photo.title}</span>
                  <span className="badge badge-gold flex-shrink-0">RAW 48MP</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
