import React, { useState } from 'react';
import { MOCK_PHOTOS } from '../data/mockData';
import { Sparkles, Phone } from 'lucide-react';

export const FrameSimulator: React.FC = () => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number>(0);
  const [frameStyle, setFrameStyle] = useState<'carvalho' | 'preto' | 'mogno' | 'canvas'>('mogno');
  const [wallColor, setWallColor] = useState<'marfim' | 'concreto' | 'salvia' | 'terracotta'>('marfim');

  const currentPhoto = MOCK_PHOTOS[selectedPhotoIdx] || MOCK_PHOTOS[0];

  const frames = {
    carvalho: { name: 'Carvalho Claro Nórdico', price: 680, border: '16px solid #D2B48C', boxShadow: '0 20px 40px rgba(0,0,0,0.18)' },
    preto: { name: 'Preto Fosco Minimalista', price: 590, border: '14px solid #1C1B18', boxShadow: '0 20px 40px rgba(0,0,0,0.22)' },
    mogno: { name: 'Mogno Italiano & Ouro Cognac', price: 890, border: '18px solid #5C3A21', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' },
    canvas: { name: 'Canvas Algodão Museu (Sem Moldura)', price: 450, border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.15)' }
  };

  const walls = {
    marfim: { name: 'Branco Marfim', bg: '#FDFCF9', textColor: '#1C1B18' },
    concreto: { name: 'Cinza Concreto Galeria', bg: '#E2E0D8', textColor: '#1C1B18' },
    salvia: { name: 'Verde Sálvia Atelier', bg: '#43584C', textColor: '#FDFCF9' },
    terracotta: { name: 'Terracota Terroso', bg: '#8C4D2E', textColor: '#FDFCF9' }
  };

  const currentFrame = frames[frameStyle];
  const currentWall = walls[wallColor];

  const handleOrderOnWhatsApp = () => {
    const msg = encodeURIComponent(`Olá, Maria Clara & equipe Lumen Atelier! Gostaria de encomendar uma impressão fine art autoral. ✨\n\n🖼️ *Obra Selecionada:* ${currentPhoto.title}\n🪵 *Acabamento:* ${currentFrame.name}\n💰 *Investimento Estimado:* R$ ${currentFrame.price},00\n\nComo procedemos com o pagamento e prazos de encadernação?`);
    window.open(`https://wa.me/5581998422026?text=${msg}`, '_blank');
  };

  return (
    <div className="card-gourmet p-4 p-md-5 my-5 shadow-lg border border-warm" style={{ borderRadius: '28px', background: '#FFFFFF' }}>
      <div className="text-center mx-auto mb-4" style={{ maxWidth: '750px' }}>
        <div className="d-inline-flex align-items-center gap-2 bg-gourmet-alt border border-warm rounded-pill px-3 py-1 mb-2 shadow-sm">
          <Sparkles size={14} className="text-gold" />
          <span className="text-warm-gray gourmet-mono" style={{ fontSize: '0.72rem' }}>
            SIMULADOR 3D DE IMPRESSÃO • PAPEL ALGODÃO MUSEU 310G
          </span>
        </div>
        <h3 className="display-6 fw-bold text-dark-espresso mb-2 gourmet-title">
          Galeria Virtual de Quadros Fine Art.
        </h3>
        <p className="text-warm-gray gourmet-sans fs-6 mb-0">
          Experiência interativa para visualizar como as obras de Maria Clara ficarão na parede do seu escritório ou residência em molduras artesanais de madeira maciça.
        </p>
      </div>

      <div className="row g-4 align-items-center">
        {/* Left/Top: 3D Wall Simulation Box */}
        <div className="col-lg-7">
          <div 
            className="p-4 p-md-5 rounded-4 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden transition-all shadow-inner"
            style={{
              height: '460px',
              backgroundColor: currentWall.bg,
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '24px'
            }}
          >
            {/* Wall texture lighting effect */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.15) 100%)'
              }}
            />

            {/* The Framed Photo */}
            <div 
              className="position-relative transition-all d-flex align-items-center justify-content-center bg-white"
              style={{
                border: currentFrame.border,
                boxShadow: currentFrame.boxShadow,
                padding: frameStyle === 'canvas' ? '0' : '22px', // Passe-partout white border
                maxWidth: '82%',
                maxHeight: '78%'
              }}
            >
              <img
                src={currentPhoto.url}
                alt={currentPhoto.title}
                className="object-fit-cover shadow-sm"
                style={{ maxHeight: '280px', maxWidth: '100%', display: 'block' }}
              />
            </div>

            {/* Wall caption */}
            <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 text-center z-1">
              <span 
                className="badge px-3 py-2 shadow-sm gourmet-mono"
                style={{ 
                  backgroundColor: 'rgba(28, 27, 24, 0.75)', 
                  color: '#FDFCF9',
                  backdropFilter: 'blur(8px)',
                  fontSize: '0.7rem'
                }}
              >
                {currentPhoto.title} • {currentFrame.name}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Customization Controls */}
        <div className="col-lg-5">
          <div className="bg-gourmet-alt p-4 rounded-4 border border-warm">
            <h5 className="gourmet-title fw-bold text-dark-espresso mb-3 fs-5">Personalizar Acabamento</h5>

            {/* Step 1: Choose Photo */}
            <div className="mb-3">
              <label className="form-label text-dark-espresso fw-bold fs-7 mb-2">1. Escolha a Obra Fine Art:</label>
              <select
                className="form-select bg-white text-dark-espresso border-warm rounded-pill px-3 py-2 fs-7"
                value={selectedPhotoIdx}
                onChange={(e) => setSelectedPhotoIdx(Number(e.target.value))}
              >
                {MOCK_PHOTOS.slice(0, 8).map((p, idx) => (
                  <option key={p.id} value={idx}>📷 {p.title} ({p.categoryLabel.split('&')[0]})</option>
                ))}
              </select>
            </div>

            {/* Step 2: Choose Frame */}
            <div className="mb-3">
              <label className="form-label text-dark-espresso fw-bold fs-7 mb-2">2. Estilo de Moldura Artesanal:</label>
              <div className="d-flex flex-column gap-2">
                {Object.entries(frames).map(([key, f]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFrameStyle(key as any)}
                    className={`btn p-2 rounded-3 text-start d-flex justify-content-between align-items-center transition-all fs-7 ${
                      frameStyle === key ? 'bg-gourmet-dark text-white fw-bold shadow-sm' : 'bg-white text-dark-espresso border border-warm'
                    }`}
                  >
                    <span>🖼️ {f.name}</span>
                    <span className="gourmet-mono text-gold">R$ {f.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Wall Color */}
            <div className="mb-4">
              <label className="form-label text-dark-espresso fw-bold fs-7 mb-2">3. Simular Cor da Parede:</label>
              <div className="d-flex gap-2">
                {Object.entries(walls).map(([key, w]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setWallColor(key as any)}
                    className={`btn btn-sm rounded-pill flex-fill py-1 fs-7 ${
                      wallColor === key ? 'border-2 border-dark fw-bold' : 'border border-warm'
                    }`}
                    style={{ backgroundColor: w.bg, color: w.textColor, fontSize: '0.72rem' }}
                  >
                    {w.name.split(' ')[1] || w.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Price & Order Button */}
            <div className="pt-3 border-top border-warm">
              <div className="d-flex justify-content-between align-items-baseline mb-3">
                <span className="text-dark-espresso fw-bold fs-6">Investimento Estimado:</span>
                <span className="gourmet-title fw-bolder text-terracotta fs-3">R$ {currentFrame.price},00</span>
              </div>

              <button
                onClick={handleOrderOnWhatsApp}
                className="btn btn-success text-white rounded-pill w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                style={{ background: '#25D366', borderColor: '#25D366' }}
              >
                <Phone size={16} />
                <span>Encomendar Quadro no WhatsApp 💬</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
