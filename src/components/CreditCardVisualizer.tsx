import React from 'react';
import { Lock } from 'lucide-react';

interface CreditCardVisualizerProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  isFlipped?: boolean;
}

export const CreditCardVisualizer: React.FC<CreditCardVisualizerProps> = ({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  isFlipped = false
}) => {
  const formatCardNumber = (num: string) => {
    const cleaned = num.replace(/\D/g, '');
    const padded = cleaned.padEnd(16, '•');
    return `${padded.slice(0, 4)} ${padded.slice(4, 8)} ${padded.slice(8, 12)} ${padded.slice(12, 16)}`;
  };

  return (
    <div className="w-100 max-w-400 mx-auto perspective-1000 mb-4">
      <div 
        className="position-relative w-100 transition-transform duration-700"
        style={{
          height: '210px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #2B2A27 0%, #1C1B18 50%, #3D3A33 100%)',
          boxShadow: '0 20px 45px rgba(28, 27, 24, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
          padding: '24px',
          color: '#FDFCF9',
          overflow: 'hidden',
          border: '1px solid rgba(197, 160, 89, 0.35)'
        }}
      >
        {/* Subtle metallic champagne reflection glow */}
        <div 
          className="position-absolute top-0 end-0 w-50 h-100 pointer-events-none"
          style={{
            background: 'linear-gradient(115deg, transparent 0%, rgba(197, 160, 89, 0.1) 45%, rgba(197, 160, 89, 0.22) 50%, rgba(197, 160, 89, 0.1) 55%, transparent 100%)',
            transform: 'skewX(-20deg)'
          }}
        />

        {!isFlipped ? (
          <div className="h-100 d-flex flex-column justify-content-between position-relative z-1">
            {/* Card Header: Chip and Brand */}
            <div className="d-flex justify-content-between align-items-start">
              <div 
                className="rounded-3 shadow-sm d-flex align-items-center justify-content-center"
                style={{
                  width: '46px',
                  height: '36px',
                  background: 'linear-gradient(135deg, #F3EFE6 0%, #D4AF37 100%)',
                  border: '1px solid rgba(0,0,0,0.15)'
                }}
              >
                <div style={{ width: '30px', height: '1px', background: 'rgba(0,0,0,0.25)' }} />
              </div>

              <div className="text-end">
                <span className="gourmet-title fw-bolder tracking-widest text-gold fs-4" style={{ color: '#D4AF37' }}>LUMEN</span>
                <div style={{ fontSize: '0.62rem', color: '#D1CCC2' }} className="gourmet-mono text-uppercase tracking-wider">Atelier Cognac Infinite</div>
              </div>
            </div>

            {/* Card Number */}
            <div className="my-2 gourmet-mono tracking-widest fs-5 fw-bold text-white text-shadow">
              {formatCardNumber(cardNumber)}
            </div>

            {/* Card Footer: Holder & Expiry */}
            <div className="d-flex justify-content-between align-items-end text-uppercase">
              <div className="text-truncate pe-2" style={{ maxWidth: '70%' }}>
                <div style={{ fontSize: '0.6rem', color: '#B5AFA4' }} className="gourmet-mono">TITULAR DO CARTÃO</div>
                <div className="fw-semibold text-truncate gourmet-mono" style={{ fontSize: '0.85rem', color: '#FDFCF9' }}>
                  {cardHolder || 'NOME DO CLIENTE'}
                </div>
              </div>

              <div className="text-end">
                <div style={{ fontSize: '0.6rem', color: '#B5AFA4' }} className="gourmet-mono">VAL / EXP</div>
                <div className="fw-semibold gourmet-mono" style={{ fontSize: '0.85rem', color: '#D4AF37' }}>
                  {expiryDate || 'MM/AA'}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-100 d-flex flex-column justify-content-between position-relative z-1 pt-2">
            <div className="w-100 bg-black bg-opacity-90 py-3 mx-n4 mt-1" style={{ width: 'calc(100% + 48px)', marginLeft: '-24px' }} />

            <div className="d-flex align-items-center justify-content-end bg-gourmet-alt rounded px-3 py-2 text-dark-espresso gourmet-mono fw-bold">
              <span className="me-3 text-muted fs-7">CVV</span>
              <span>{cvv || '•••'}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '0.68rem', color: '#D1CCC2' }}>
              <div className="d-flex align-items-center gap-1">
                <Lock size={12} className="text-gold" />
                <span>Criptografia SSL 256-Bit</span>
              </div>
              <span className="gourmet-mono text-gold">LUMEN ATELIER PRO</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
