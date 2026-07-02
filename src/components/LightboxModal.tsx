import React, { useState } from 'react';
import type { PhotoItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Heart, Download, Share2, Camera, MapPin, Calendar, Check, Info } from 'lucide-react';

interface LightboxModalProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onLike?: (id: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ photo, onClose, onLike }) => {
  const [liked, setLiked] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!photo) return null;

  const handleLike = () => {
    setLiked(!liked);
    if (onLike && !liked) {
      onLike(photo.id);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    }, 1500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 z-5 d-flex align-items-center justify-content-center p-2 p-md-4 animate-fade-in"
      style={{
        backgroundColor: 'rgba(28, 27, 24, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
      onClick={onClose}
    >
      {/* Top Floating Control Bar */}
      <div 
        className="position-absolute top-0 start-0 w-100 p-3 p-md-4 d-flex justify-content-between align-items-center z-3 pointer-events-none"
      >
        <div className="d-flex align-items-center gap-2 bg-gourmet-alt px-4 py-2 rounded-pill border border-warm shadow-sm pointer-events-auto">
          <span className="badge badge-gold">
            {photo.categoryLabel.toUpperCase()}
          </span>
          <span className="text-dark-espresso gourmet-title fw-bold fs-5 d-none d-sm-inline mb-0">{photo.title}</span>
        </div>

        <div className="d-flex align-items-center gap-2 pointer-events-auto">
          <button 
            onClick={(e) => { e.stopPropagation(); handleShare(); }}
            className="btn btn-gourmet-outline rounded-circle p-2 text-dark-espresso bg-white"
            title="Compartilhar"
          >
            {copied ? <Check size={18} className="text-success" /> : <Share2 size={18} />}
          </button>
          
          <button 
            onClick={onClose}
            className="btn btn-gourmet-primary rounded-circle p-2 text-white fw-bold shadow-lg hover-scale"
            title="Fechar (Esc)"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Lightbox Content Box */}
      <div 
        className="container-fluid max-w-1200 h-100 d-flex flex-column flex-lg-row align-items-center justify-content-center gap-4 py-5 my-auto overflow-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {/* Left/Center: Photo Display */}
        <div className="col-12 col-lg-8 h-100 d-flex align-items-center justify-content-center">
          <div className="w-100 position-relative shadow-lg rounded-4 overflow-hidden border border-warm bg-white">
            <ImageWithFallback
              src={photo.url}
              fallbackSrc={photo.fallbackSvg}
              alt={photo.title}
              aspectRatio="auto"
              style={{ maxHeight: '75vh', width: '100%', objectFit: 'contain', borderRadius: '16px' }}
            />
          </div>
        </div>

        {/* Right: Technical Atelier EXIF & Action Sidebar */}
        <div className="col-12 col-lg-4 text-dark-espresso d-flex flex-column gap-3 bg-white p-4 rounded-4 border border-warm shadow-lg max-h-100 overflow-auto">
          <div>
            <div className="d-flex justify-content-between align-items-start mb-1">
              <h3 className="gourmet-title fw-bold mb-0 text-dark-espresso fs-3">{photo.title}</h3>
              <button 
                onClick={handleLike}
                className={`btn btn-sm rounded-pill px-3 py-1 d-flex align-items-center gap-1 transition-all ${
                  liked ? 'bg-danger text-white border-0' : 'btn-gourmet-outline'
                }`}
              >
                <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
                <span>{photo.likes + (liked ? 1 : 0)}</span>
              </button>
            </div>
            <p className="text-warm-gray fs-7 mb-0 mt-2" style={{ lineHeight: '1.6' }}>{photo.description}</p>
          </div>

          <hr className="border-warm my-1" />

          {/* Location & Date */}
          <div className="d-flex flex-column gap-2 text-warm-gray fs-7">
            <div className="d-flex align-items-center gap-2">
              <MapPin size={15} className="text-gold" />
              <span className="text-dark-espresso fw-semibold">Locação:</span>
              <span>{photo.location}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Calendar size={15} className="text-gold" />
              <span className="text-dark-espresso fw-semibold">Data:</span>
              <span>{photo.date}</span>
            </div>
          </div>

          {/* Atelier Technical EXIF Data Box */}
          <div className="bg-gourmet-alt p-3 rounded-4 border border-warm mt-1">
            <div className="d-flex align-items-center gap-2 mb-3 text-dark-espresso">
              <Camera size={16} className="text-gold" />
              <span className="gourmet-mono fw-bold fs-7 tracking-wider text-uppercase">Especificações de Captura (EXIF)</span>
            </div>

            <div className="row g-2 text-warm-gray gourmet-mono" style={{ fontSize: '0.75rem' }}>
              <div className="col-6">
                <div className="text-muted-warm" style={{ fontSize: '0.65rem' }}>CÂMERA</div>
                <div className="text-dark-espresso fw-bold">{photo.exif.camera}</div>
              </div>
              <div className="col-6">
                <div className="text-muted-warm" style={{ fontSize: '0.65rem' }}>LENTE</div>
                <div className="text-dark-espresso fw-bold">{photo.exif.lens}</div>
              </div>
              <div className="col-4">
                <div className="text-muted-warm" style={{ fontSize: '0.65rem' }}>ABERTURA</div>
                <div className="text-terracotta fw-bolder">{photo.exif.aperture}</div>
              </div>
              <div className="col-4">
                <div className="text-muted-warm" style={{ fontSize: '0.65rem' }}>OBTURADOR</div>
                <div className="text-dark-espresso fw-bold">{photo.exif.shutter}</div>
              </div>
              <div className="col-4">
                <div className="text-muted-warm" style={{ fontSize: '0.65rem' }}>ISO</div>
                <div className="text-gold fw-bolder">{photo.exif.iso}</div>
              </div>
            </div>
          </div>

          {/* Quality & Download Section */}
          <div className="mt-auto pt-2 d-flex flex-column gap-2">
            <div className="d-flex align-items-center justify-content-between bg-gourmet-alt px-3 py-2 rounded-3 border border-warm fs-7">
              <span className="text-warm-gray d-flex align-items-center gap-1">
                <Info size={14} className="text-gold" />
                Acervo Digital:
              </span>
              <span className="badge badge-gold">ProRAW 48MP • 16-Bit</span>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className={`btn rounded-pill w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm transition-all ${
                downloaded ? 'btn-success text-white' : 'btn-gourmet-gold'
              }`}
            >
              {downloading ? (
                <>
                  <div className="spinner-border spinner-border-sm text-white" role="status" />
                  <span>Preparando Arquivo RAW...</span>
                </>
              ) : downloaded ? (
                <>
                  <Check size={18} />
                  <span>Simulação de Download Concluída!</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Baixar Obra em Alta Resolução (4K)</span>
                </>
              )}
            </button>
            
            <span className="text-center text-muted-warm" style={{ fontSize: '0.72rem' }}>
              Uso licenciado sob termo de exclusividade Lumen Atelier.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
