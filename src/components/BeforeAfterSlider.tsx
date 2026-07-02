import React, { useState, useRef } from 'react';
import { Sliders, Sparkles } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let pos = (x / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    setSliderPosition(pos);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="card-gourmet p-4 p-md-5 my-5 shadow-lg border border-warm" style={{ borderRadius: '28px', background: '#FFFFFF' }}>
      <div className="text-center mx-auto mb-4" style={{ maxWidth: '750px' }}>
        <div className="d-inline-flex align-items-center gap-2 bg-gourmet-alt border border-warm rounded-pill px-3 py-1 mb-2 shadow-sm">
          <Sparkles size={14} className="text-gold" />
          <span className="text-warm-gray gourmet-mono" style={{ fontSize: '0.72rem' }}>
            A QUÍMICA DA LUZ • LABORATORIO DE COR 16-BIT
          </span>
        </div>
        <h3 className="display-6 fw-bold text-dark-espresso mb-2 gourmet-title">
          O Poder do Color Grading Autoral.
        </h3>
        <p className="text-warm-gray gourmet-sans fs-6 mb-0">
          Arraste o divisor interativo para comparar a imagem bruta da câmera (**Flat RAW**) com o nosso tratamento color grading inspirado em películas **Kodak Portra 400**.
        </p>
      </div>

      {/* Interactive Slider Container */}
      <div 
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="position-relative overflow-hidden shadow-lg border border-warm cursor-pointer select-none mx-auto"
        style={{
          height: '460px',
          maxHeight: '65vh',
          borderRadius: '24px',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        {/* AFTER IMAGE (Edited Kodak Film) - FULL BACKGROUND */}
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85"
            alt="Color Grading Kodak ProRAW"
            className="w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute bottom-0 end-0 m-3 z-1">
            <span className="badge badge-gold bg-white px-3 py-2 shadow-sm">
              ✨ Lumen Atelier • ProRAW 16-Bit Kodak Portra 400
            </span>
          </div>
        </div>

        {/* BEFORE IMAGE (Flat RAW / Desaturated & Cool) - CLIPPED CONTAINER */}
        <div 
          className="position-absolute top-0 start-0 h-100 overflow-hidden"
          style={{
            width: `${sliderPosition}%`,
            borderRight: '3px solid #D4AF37',
            transition: isDragging ? 'none' : 'width 0.1s ease-out'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=40"
            alt="Câmera Flat RAW"
            className="h-100 object-fit-cover"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '1000px',
              maxWidth: 'none',
              filter: 'grayscale(35%) brightness(0.9) contrast(85%) saturate(80%)'
            }}
          />
          <div className="position-absolute bottom-0 start-0 m-3 z-1">
            <span className="badge badge-gourmet bg-dark-espresso text-white px-3 py-2 shadow-sm" style={{ background: '#1C1B18', color: '#FDFCF9' }}>
              📷 Sensor Bruto • Flat Sony RAW (Sem Tratamento)
            </span>
          </div>
        </div>

        {/* DRAG HANDLE BUTTON */}
        <div 
          className="position-absolute top-50 translate-middle-y z-3 d-flex align-items-center justify-content-center"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translate(-50%, -50%)',
            transition: isDragging ? 'none' : 'left 0.1s ease-out'
          }}
        >
          <div 
            className="bg-white text-dark-espresso rounded-circle shadow-lg border border-gold d-flex align-items-center justify-content-center hover-scale"
            style={{ width: '48px', height: '48px', borderColor: '#D4AF37', borderWidth: '3px' }}
          >
            <Sliders size={20} className="text-gold" style={{ color: '#D4AF37' }} />
          </div>
        </div>
      </div>

      <div className="text-center mt-3 text-muted-warm fs-7 gourmet-mono">
        💡 *Arraste ou clique sobre a imagem para comparar em detalhes.*
      </div>
    </div>
  );
};
