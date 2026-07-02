import React, { useState } from 'react';
import { Calculator, Download, Phone, Check } from 'lucide-react';

export const CustomQuoteBuilder: React.FC = () => {
  const [duration, setDuration] = useState<number>(8); // 4, 8, 12, 16 hours
  const [photographers, setPhotographers] = useState<number>(2); // 1, 2, 3
  const [drone, setDrone] = useState<boolean>(true);
  const [sameDayEdit, setSameDayEdit] = useState<boolean>(false);
  const [albums, setAlbums] = useState<number>(1); // 0, 1, 2
  const [destination, setDestination] = useState<boolean>(false);

  // Calculate base + custom prices
  let total = 0;
  if (duration === 4) total += 3800;
  else if (duration === 8) total += 6500;
  else if (duration === 12) total += 8900;
  else total += 11500;

  if (photographers === 2) total += 1800;
  else if (photographers === 3) total += 3400;

  if (drone) total += 1500;
  if (sameDayEdit) total += 900;
  if (albums === 1) total += 1200;
  else if (albums === 2) total += 2100;
  if (destination) total += 2500;

  const pixTotal = total * 0.95;

  const handleDownloadQuote = () => {
    const text = `====================================================================
            PROPOSTA DE ORÇAMENTO SOB MEDIDA • LUMEN ATELIER
====================================================================

DATA DE EMISSÃO: 01 de Julho de 2026
DIREÇÃO CRIATIVA: Maria Clara & Vinicius Strack
VALIDADE DA PROPOSTA: 15 dias úteis

ESCOPO PERSONALIZADO SELECIONADO:
• Duração da Cobertura: ${duration} horas contínuas
• Equipe de Fotografia: ${photographers} Fotógrafo(s) Sênior(es) + Assistente
• Cinematografia Aérea Drone 8K: ${drone ? 'Incluso (+R$ 1.500)' : 'Não selecionado'}
• Edição Same-Day Edit Reels (Instagram): ${sameDayEdit ? 'Incluso (+R$ 900)' : 'Não selecionado'}
• Fotolivro Couro Italiano 30x30cm: ${albums === 0 ? 'Nenhum' : albums === 1 ? '1 Álbum (+R$ 1.200)' : '2 Álbuns (+R$ 2.100)'}
• Logística Destination Wedding: ${destination ? 'Inclusa estimativa (+R$ 2.500)' : 'Atendimento local na sede / PE'}

====================================================================
INVESTIMENTO TOTAL DO PROJETO: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
⚡ VALOR COM 5% DE ABATIMENTO NO PIX À VISTA: R$ ${pixTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
====================================================================
Esta proposta é uma estimativa autoral gerada pelo simulador do site.
Para validar a disponibilidade solar e fechar contrato, chame no WhatsApp.
====================================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `orcamento_lumen_atelier_${duration}h.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendOnWhatsApp = () => {
    const msg = encodeURIComponent(`Olá, Maria Clara & Vinicius! Gerei um orçamento sob medida no site do Lumen Atelier e gostaria de verificar a agenda. ✨\n\n*📋 ESCOPO DO PROJETO:*\n⏱️ *Cobertura:* ${duration} horas contínuas\n📸 *Fotógrafos:* ${photographers} Fotógrafo(s)\n🚁 *Drone 8K:* ${drone ? 'Sim' : 'Não'}\n🎬 *Same-Day Edit:* ${sameDayEdit ? 'Sim' : 'Não'}\n📚 *Álbuns em Couro:* ${albums} álbum(ns)\n✈️ *Destination Wedding:* ${destination ? 'Sim (Fora de PE)' : 'Não (PE)'}\n\n💰 *Investimento Simulado:* R$ ${total.toLocaleString('pt-BR')} (PIX: R$ ${pixTotal.toLocaleString('pt-BR')})\n\nPodemos agendar uma reunião de alinhamento?`);
    window.open(`https://wa.me/5581998422026?text=${msg}`, '_blank');
  };

  return (
    <div className="card-gourmet p-4 p-md-5 my-5 shadow-lg border border-warm" style={{ borderRadius: '28px', background: '#FFFFFF' }}>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center pb-3 mb-4 border-bottom border-warm gap-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge badge-gold">FERRAMENTA EXCLUSIVA</span>
            <span className="badge badge-sage">ORÇAMENTO SOB MEDIDA</span>
          </div>
          <h3 className="display-6 fw-bold text-dark-espresso mb-1 gourmet-title">
            Calculadora de Orçamento Personalizado
          </h3>
          <p className="text-warm-gray fs-6 mb-0 gourmet-sans">
            Configure exatamente as horas, profissionais e entregáveis que seu casamento ou campanha corporativa necessita e receba a proposta na hora.
          </p>
        </div>

        <div className="bg-gourmet-dark text-gold p-3 rounded-circle shadow-sm flex-shrink-0 d-none d-md-flex">
          <Calculator size={26} />
        </div>
      </div>

      <div className="row g-4">
        {/* Left: Toggles & Options */}
        <div className="col-lg-7">
          <div className="d-flex flex-column gap-4">
            {/* 1. Duration */}
            <div>
              <label className="form-label text-dark-espresso fw-bold fs-7 mb-2">1. Duração da Cobertura Contínua:</label>
              <div className="row g-2">
                {[4, 8, 12, 16].map((h) => (
                  <div key={h} className="col-6 col-sm-3">
                    <button
                      type="button"
                      onClick={() => setDuration(h)}
                      className={`btn w-100 py-2 rounded-3 fs-7 transition-all ${
                        duration === h ? 'bg-gourmet-dark text-white fw-bold shadow-sm' : 'bg-gourmet-alt text-dark-espresso border border-warm'
                      }`}
                    >
                      {h} Horas
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Photographers */}
            <div>
              <label className="form-label text-dark-espresso fw-bold fs-7 mb-2">2. Número de Fotógrafos Seniores:</label>
              <div className="row g-2">
                {[
                  { count: 1, label: '1 Fotógrafo (Padrão)', extra: 'R$ 0' },
                  { count: 2, label: '2 Fotógrafos Seniores', extra: '+R$ 1.800' },
                  { count: 3, label: '3 Fotógrafos (Grandes Eventos)', extra: '+R$ 3.400' }
                ].map((p) => (
                  <div key={p.count} className="col-sm-4">
                    <button
                      type="button"
                      onClick={() => setPhotographers(p.count)}
                      className={`btn w-100 p-2 rounded-3 text-start transition-all fs-7 h-100 d-flex flex-column justify-content-between ${
                        photographers === p.count ? 'bg-gourmet-dark text-white fw-bold shadow-sm' : 'bg-gourmet-alt text-dark-espresso border border-warm'
                      }`}
                    >
                      <div>{p.label}</div>
                      <span className={`gourmet-mono mt-1 ${photographers === p.count ? 'text-gold' : 'text-terracotta'}`} style={{ fontSize: '0.68rem' }}>{p.extra}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Checkbox Add-ons */}
            <div>
              <label className="form-label text-dark-espresso fw-bold fs-7 mb-2">3. Entregáveis & Tecnologia de Ponta:</label>
              <div className="row g-2">
                <div className="col-sm-6">
                  <div
                    onClick={() => setDrone(!drone)}
                    className={`p-3 rounded-3 border cursor-pointer transition-all d-flex justify-content-between align-items-center h-100 ${
                      drone ? 'bg-gourmet-alt border-warm-strong shadow-sm fw-bold' : 'bg-white text-dark-espresso border-warm'
                    }`}
                  >
                    <div>
                      <div className="fs-7 text-dark-espresso">🚁 Cinematografia Drone 8K</div>
                      <div className="gourmet-mono text-terracotta fs-7">+R$ 1.500</div>
                    </div>
                    <input type="checkbox" checked={drone} readOnly className="form-check-input mt-0" style={{ width: '1.1rem', height: '1.1rem' }} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    onClick={() => setSameDayEdit(!sameDayEdit)}
                    className={`p-3 rounded-3 border cursor-pointer transition-all d-flex justify-content-between align-items-center h-100 ${
                      sameDayEdit ? 'bg-gourmet-alt border-warm-strong shadow-sm fw-bold' : 'bg-white text-dark-espresso border-warm'
                    }`}
                  >
                    <div>
                      <div className="fs-7 text-dark-espresso">🎬 Same-Day Edit Reels (Insta)</div>
                      <div className="gourmet-mono text-terracotta fs-7">+R$ 900</div>
                    </div>
                    <input type="checkbox" checked={sameDayEdit} readOnly className="form-check-input mt-0" style={{ width: '1.1rem', height: '1.1rem' }} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    onClick={() => setAlbums(albums === 1 ? 0 : 1)}
                    className={`p-3 rounded-3 border cursor-pointer transition-all d-flex justify-content-between align-items-center h-100 ${
                      albums > 0 ? 'bg-gourmet-alt border-warm-strong shadow-sm fw-bold' : 'bg-white text-dark-espresso border-warm'
                    }`}
                  >
                    <div>
                      <div className="fs-7 text-dark-espresso">📚 Fotolivro Couro 30x30cm</div>
                      <div className="gourmet-mono text-terracotta fs-7">{albums === 0 ? 'Não incluso' : '+R$ 1.200 (1 álbum)'}</div>
                    </div>
                    <input type="checkbox" checked={albums > 0} readOnly className="form-check-input mt-0" style={{ width: '1.1rem', height: '1.1rem' }} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div
                    onClick={() => setDestination(!destination)}
                    className={`p-3 rounded-3 border cursor-pointer transition-all d-flex justify-content-between align-items-center h-100 ${
                      destination ? 'bg-gourmet-alt border-warm-strong shadow-sm fw-bold' : 'bg-white text-dark-espresso border-warm'
                    }`}
                  >
                    <div>
                      <div className="fs-7 text-dark-espresso">✈️ Destination (Fora de PE)</div>
                      <div className="gourmet-mono text-terracotta fs-7">+R$ 2.500 (Estimativa)</div>
                    </div>
                    <input type="checkbox" checked={destination} readOnly className="form-check-input mt-0" style={{ width: '1.1rem', height: '1.1rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Calculation & Actions */}
        <div className="col-lg-5">
          <div className="bg-gourmet-alt p-4 p-md-5 rounded-4 border border-warm h-100 d-flex flex-column justify-content-between shadow-sm">
            <div>
              <span className="gourmet-mono text-muted-warm fs-7 text-uppercase tracking-wider">ESTIMATIVA AUTORAL DO ATELIER</span>
              <div className="d-flex align-items-baseline gap-1 my-3">
                <span className="text-terracotta fs-4 fw-bold">R$</span>
                <span className="display-5 fw-bolder text-dark-espresso gourmet-title">{total.toLocaleString('pt-BR')}</span>
              </div>

              <div className="bg-white p-3 rounded-3 border border-warm mb-4 text-center">
                <span className="badge badge-gold mb-1">⚡ 5% OFF NO PIX À VISTA</span>
                <div className="gourmet-mono fw-bold text-dark-espresso fs-5">
                  R$ {pixTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="text-warm-gray fs-7 mb-4">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Check size={15} className="text-success" />
                  <span>Curadoria por Maria Clara & Vinicius Strack</span>
                </div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Check size={15} className="text-success" />
                  <span>Arquivos ProRAW 48MP sem marca d'água</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Check size={15} className="text-success" />
                  <span>Galeria em nuvem privada com IA inclusa</span>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 pt-3 border-top border-warm">
              <button
                onClick={handleSendOnWhatsApp}
                className="btn btn-success text-white rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm hover-scale"
                style={{ background: '#25D366', borderColor: '#25D366' }}
              >
                <Phone size={16} />
                <span>Enviar Orçamento no WhatsApp 💬</span>
              </button>

              <button
                onClick={handleDownloadQuote}
                className="btn btn-gourmet-outline w-100 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
              >
                <Download size={16} />
                <span>Baixar Proposta em PDF/TXT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
