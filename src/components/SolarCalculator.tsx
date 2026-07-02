import React, { useState } from 'react';
import { Sun, Clock, Compass, Camera, Sparkles, ArrowRight } from 'lucide-react';
import type { PageType } from '../types';

interface SolarCalculatorProps {
  onNavigate: (page: PageType) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ onNavigate }) => {
  const [selectedLoc, setSelectedLoc] = useState<string>('noronha');

  const locations: Record<string, { name: string; goldenHour: string; blueHour: string; sunset: string; lens: string; desc: string }> = {
    noronha: {
      name: 'Fernando de Noronha - PE',
      goldenHour: '17:15 - 17:45',
      blueHour: '17:45 - 18:10',
      sunset: '17:38',
      lens: 'FE 85mm f/1.4 GM (Desfoque de mar e falésias)',
      desc: 'A luz insular do Atlântico proporciona tons quentes âmbar com refração marítima limpa e ausência de poluição atmosférica.'
    },
    carneiros: {
      name: 'Praia dos Carneiros - PE',
      goldenHour: '17:05 - 17:35',
      blueHour: '17:35 - 18:00',
      sunset: '17:28',
      lens: 'Leica 35mm f/1.4 Summilux (Igrejinha de São Benedito)',
      desc: 'Luz costeira suave reflexiva na maré baixa. Recomendamos iniciar o making of às 15:30 na Capela histórica.'
    },
    recife: {
      name: 'Recife Antigo / Porto Digital - PE',
      goldenHour: '17:08 - 17:38',
      blueHour: '17:38 - 18:05',
      sunset: '17:31',
      lens: 'Hasselblad XCD 21mm f/4 (Arquitetura secular e pontes)',
      desc: 'O contraste entre o arenito dos casarões coloniais do século XIX e os vidros espelhados ganha relevo dramático sob o sol rasante.'
    },
    sp: {
      name: 'São Paulo - Av. Faria Lima / Estúdio',
      goldenHour: '17:35 - 18:05',
      blueHour: '18:05 - 18:30',
      sunset: '17:58',
      lens: 'Noctilux-M 50mm f/0.95 ASPH (Chiaroscuro corporativo)',
      desc: 'Luz urbana filtrada entre arranha-céus. Em nosso atelier fechado, recriamos essa atmosfera dourada com flash sueco Profoto.'
    },
    europa: {
      name: 'Europa / Destination Wedding (Lisboa / Paris)',
      goldenHour: '20:45 - 21:25',
      blueHour: '21:25 - 22:00',
      sunset: '21:10',
      lens: 'Sony FE 50mm f/1.2 GM (Palácios e vinhedos mediterrâneos)',
      desc: 'No verão europeu, o crepúsculo prolongado permite sessões pre-wedding contínuas com uma luz ultra suave e romântica até as 21h30.'
    }
  };

  const current = locations[selectedLoc];

  return (
    <div className="card-gourmet p-4 p-md-5 my-5 shadow-lg border border-warm" style={{ borderRadius: '28px', background: '#FFFFFF' }}>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-3 border-bottom border-warm gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge badge-gold">
              ENGENHARIA SOLAR AO VIVO • EFEMÉRIDE LUMINOSA
            </span>
            <span className="badge badge-sage">
              CALCULADORA DO ATELIER
            </span>
          </div>
          <h3 className="display-6 fw-bold text-dark-espresso mb-1 gourmet-title">
            Simulador de Golden Hour & Luz Solar
          </h3>
          <p className="text-warm-gray fs-6 mb-0 gourmet-sans">
            A luz é o ingrediente primário de cada obra de arte. Consulte o ciclo luminoso exato para a sua locação preferida.
          </p>
        </div>

        <div className="flex-shrink-0 w-100 w-md-auto">
          <select
            className="form-select bg-gourmet-alt text-dark-espresso border-warm rounded-pill px-4 py-3 fw-bold gourmet-mono shadow-sm"
            value={selectedLoc}
            onChange={(e) => setSelectedLoc(e.target.value)}
          >
            <option value="noronha">🏝️ Fernando de Noronha - PE</option>
            <option value="carneiros">🏖️ Praia dos Carneiros - PE</option>
            <option value="recife">🏛️ Recife Antigo / Porto Digital - PE</option>
            <option value="sp">🏢 São Paulo - Av. Faria Lima / SP</option>
            <option value="europa">✈️ Europa / Lisboa / Paris (Destination)</option>
          </select>
        </div>
      </div>

      {/* Solar Cards Grid */}
      <div className="row g-4 mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card-gourmet-alt p-4 h-100 border border-warm shadow-sm hover-scale" style={{ borderRadius: '20px' }}>
            <div className="d-flex align-items-center gap-2 text-gold mb-2" style={{ color: '#D4AF37' }}>
              <Sun size={20} />
              <span className="gourmet-mono fw-bold fs-7 text-uppercase tracking-wider">Golden Hour</span>
            </div>
            <div className="gourmet-title fw-bold text-dark-espresso display-6 mb-1">{current.goldenHour}</div>
            <div className="text-warm-gray fs-7">Tonalidade âmbar & sombras longas perfeitas para casamentos.</div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card-gourmet-alt p-4 h-100 border border-warm shadow-sm hover-scale" style={{ borderRadius: '20px' }}>
            <div className="d-flex align-items-center gap-2 text-terracotta mb-2" style={{ color: '#A86A3D' }}>
              <Clock size={20} />
              <span className="gourmet-mono fw-bold fs-7 text-uppercase tracking-wider">Pôr do Sol</span>
            </div>
            <div className="gourmet-title fw-bold text-dark-espresso display-6 mb-1">{current.sunset}</div>
            <div className="text-warm-gray fs-7">Instante sublime para silhuetas dramáticas e beijo no altar.</div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card-gourmet-alt p-4 h-100 border border-warm shadow-sm hover-scale" style={{ borderRadius: '20px' }}>
            <div className="d-flex align-items-center gap-2 text-success mb-2" style={{ color: '#5F7367' }}>
              <Compass size={20} />
              <span className="gourmet-mono fw-bold fs-7 text-uppercase tracking-wider">Blue Hour</span>
            </div>
            <div className="gourmet-title fw-bold text-dark-espresso display-6 mb-1">{current.blueHour}</div>
            <div className="text-warm-gray fs-7">Atmosfera etérea noturna & iluminação artificial Profoto.</div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card-gourmet-alt p-4 h-100 border border-warm shadow-sm hover-scale" style={{ borderRadius: '20px' }}>
            <div className="d-flex align-items-center gap-2 text-dark-espresso mb-2">
              <Camera size={20} className="text-gold" />
              <span className="gourmet-mono fw-bold fs-7 text-uppercase tracking-wider">Óptica Recomendada</span>
            </div>
            <div className="fw-bold text-dark-espresso fs-6 mb-1 gourmet-mono text-truncate">{current.lens.split('(')[0]}</div>
            <div className="text-warm-gray fs-7 text-truncate">{current.lens.includes('(') ? `(${current.lens.split('(')[1]}` : 'Lente Prime f/1.2'}</div>
          </div>
        </div>
      </div>

      {/* Description & Action Banner */}
      <div className="p-4 bg-gourmet-alt rounded-4 border border-warm d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">
        <div className="pe-md-4">
          <h6 className="fw-bold text-dark-espresso mb-1 d-flex align-items-center gap-2">
            <Sparkles size={18} className="text-gold flex-shrink-0" />
            <span>Curadoria Luminosa para {current.name.split('-')[0]}:</span>
          </h6>
          <p className="text-warm-gray fs-7 mb-0 gourmet-sans" style={{ lineHeight: '1.6' }}>{current.desc}</p>
        </div>
        <button
          onClick={() => onNavigate('booking')}
          className="btn-gourmet-primary px-4 py-3 flex-shrink-0 shadow-sm"
        >
          <span>Agendar Sessão Nesse Horário</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
