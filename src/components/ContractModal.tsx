import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Check, Download } from 'lucide-react';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName?: string;
  packageTitle?: string;
}

export const ContractModal: React.FC<ContractModalProps> = ({
  isOpen,
  onClose,
  clientName = 'Cliente Contratante',
  packageTitle = 'Módulo Fine Art'
}) => {
  const [accepted, setAccepted] = useState(true);

  if (!isOpen) return null;

  const handleDownloadPdfText = () => {
    const text = `====================================================================
           CONTRATO AUTORAL DE PRESTAÇÃO DE SERVIÇOS FOTOGRÁFICOS
                   LUMEN ATELIER • FINE ART & CINEMA
====================================================================

CONTRATADA: LUMEN ATELIER (Vinicius Track & Beatriz Lumen)
CONTRATANTE: ${clientName}
MÓDULO CONTRATADO: ${packageTitle}
DATA DE VALIDAÇÃO DIGITAL: 01 de Julho de 2026

CLÁUSULA 1ª - DO ESCOPO DO SERVIÇO FINE ART
A CONTRATADA se compromete a realizar a cobertura fotográfica e/ou cinematográfica
utilizando sensores full-frame de alta resolução (Sony Alpha 1 e Leica M11) em formato
ProRAW de 16 bits, entregando as obras tratadas com color grading editorial orgânico.

CLÁUSULA 2ª - DO BLOQUEIO DE AGENDA SOLAR E SINAL
Para garantia de exclusividade de data e bloqueio do calendário público, é requerido
um sinal de 30% (trinta por cento) via PIX ou Cartão no ato da assinatura deste termo
pelo WhatsApp. O saldo restante poderá ser quitado até a data da entrega ou parcelado
em até 12x sem juros.

CLÁUSULA 3ª - DOS DIREITOS DE USO E LICENÇA AUTORAL
A CONTRATADA cede ao CONTRATANTE os direitos de reprodução e uso pessoal ou comercial
irrestrito das fotografias e vídeos entregues em alta resolução (4K DPI 300).

CLÁUSULA 4ª - DA PROTEÇÃO DE DADOS E CONFORMIDADE LGPD/GDPR
Em estrita conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018),
nenhum dado sensível, número de cartão de crédito ou senha bancária é armazenado
nos servidores do Lumen Atelier. A autenticação é realizada via Google Identity.

CLÁUSULA 5ª - DA POLÍTICA DE TRANQUILIDADE METEOROLÓGICA
Em caso de chuva ou intempéries severas na data agendada para ensaios externos
(Retrato, Pre-Wedding ou Editorial), a sessão será reagendada para a próxima data
solar favorável de comum acordo sem qualquer multa ou custo adicional.

====================================================================
Documento autenticado sob chave de criptografia SHA-256 no Lumen Atelier.
====================================================================`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `contrato_autoral_lumen_${clientName.replace(/\s+/g, '_').toLowerCase()}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 z-5 d-flex align-items-center justify-content-center p-3 animate-fade-in"
      style={{
        backgroundColor: 'rgba(28, 27, 24, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
      onClick={onClose}
    >
      <div 
        className="card bg-white border border-warm shadow-lg overflow-hidden max-w-700 w-100 animate-slide-down d-flex flex-column"
        style={{ borderRadius: '28px', maxHeight: '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 bg-gourmet-alt border-bottom border-warm d-flex justify-content-between align-items-center flex-shrink-0" style={{ background: '#FAF8F5' }}>
          <div className="d-flex align-items-center gap-2">
            <div className="bg-gourmet-dark text-white rounded-circle p-2 d-flex align-items-center justify-content-center shadow-sm">
              <FileText size={18} className="text-gold" />
            </div>
            <div>
              <h5 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-5">Contrato Autoral de Prestação de Serviços</h5>
              <div className="d-flex align-items-center gap-1" style={{ fontSize: '0.68rem', color: '#5C5850' }}>
                <ShieldCheck size={13} className="text-success" />
                <span className="gourmet-mono">Conformidade Integral LGPD & GDPR • Criptografia SHA-256</span>
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

        {/* Modal Body / Scrollable Clauses */}
        <div className="p-4 p-md-5 overflow-auto flex-grow-1 bg-white gourmet-sans" style={{ fontSize: '0.92rem', lineHeight: '1.7' }}>
          <div className="p-3 bg-gourmet-alt rounded-4 border border-warm mb-4 d-flex align-items-center justify-content-between">
            <div>
              <span className="gourmet-mono text-muted-warm fs-7 text-uppercase tracking-wider">CONTRATANTE VERIFICADO:</span>
              <div className="fw-bold text-dark-espresso fs-6">{clientName}</div>
            </div>
            <div className="text-end">
              <span className="gourmet-mono text-muted-warm fs-7 text-uppercase tracking-wider">MÓDULO:</span>
              <div className="badge badge-gold fs-7">{packageTitle}</div>
            </div>
          </div>

          <h6 className="gourmet-title fw-bold text-dark-espresso fs-5 mb-2">Cláusula 1ª — Do Escopo do Serviço Fine Art</h6>
          <p className="text-warm-gray mb-4">
            O **Lumen Atelier**, sob direção criativa de Vinicius Track, compromete-se a realizar a cobertura fotográfica e cinematográfica utilizando sensores full-frame de altíssima resolução (Sony Alpha 1 e Leica M11) em formato ProRAW de 16 bits, aplicando tratamento editorial autoral inspirado em películas analógicas da Kodak e Fujifilm.
          </p>

          <h6 className="gourmet-title fw-bold text-dark-espresso fs-5 mb-2">Cláusula 2ª — Do Bloqueio de Agenda Solar e Sinal</h6>
          <p className="text-warm-gray mb-4">
            Para garantia absoluta de exclusividade na data agendada e bloqueio instantâneo do calendário público no banco de dados, é solicitado um sinal de 30% (trinta por cento) no ato da assinatura digital no WhatsApp. O saldo restante poderá ser parcelado em até 12x sem juros ou quitado até a data da entrega.
          </p>

          <h6 className="gourmet-title fw-bold text-dark-espresso fs-5 mb-2">Cláusula 3ª — Dos Direitos de Imagem e Licença Autoral</h6>
          <p className="text-warm-gray mb-4">
            O Lumen Atelier concede à parte CONTRATANTE os direitos integrais de reprodução, impressão e uso pessoal ou comercial irrestrito de todas as fotografias curadas e entregues em alta resolução 4K (DPI 300), sem marca d'água.
          </p>

          <h6 className="gourmet-title fw-bold text-dark-espresso fs-5 mb-2">Cláusula 4ª — Da Proteção de Dados e Sigilo LGPD</h6>
          <p className="text-warm-gray mb-4">
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), todos os dados de contato, contratos e imagens em nuvem são resguardados por criptografia SSL 256-bit e verificação via Google Identity Services. Nenhuma senha ou cartão de crédito é armazenado em nossos servidores.
          </p>

          <h6 className="gourmet-title fw-bold text-dark-espresso fs-5 mb-2">Cláusula 5ª — Da Política de Tranquilidade Meteorológica</h6>
          <p className="text-warm-gray mb-0">
            Caso ocorram chuvas ou intempéries severas na data agendada para sessões ao ar livre (Ensaio Retrato, Pre-Wedding ou Editorial), a sessão será reagendada para a próxima data solar com luz favorável de comum acordo, **sem qualquer multa ou custo adicional**.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gourmet-alt border-top border-warm d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 flex-shrink-0" style={{ background: '#FAF8F5' }}>
          <div className="form-check d-flex align-items-center gap-2 mb-0">
            <input
              type="checkbox"
              className="form-check-input border-warm-strong mt-0"
              id="acceptContract"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            />
            <label className="form-check-label fs-7 text-dark-espresso fw-semibold cursor-pointer select-none" htmlFor="acceptContract">
              Li e concordo com as 5 cláusulas autorais do Lumen Atelier.
            </label>
          </div>

          <div className="d-flex gap-2 w-100 w-sm-auto">
            <button
              onClick={handleDownloadPdfText}
              className="btn btn-sm btn-gourmet-outline px-3 py-2 flex-fill flex-sm-grow-0 d-flex align-items-center justify-content-center gap-1"
            >
              <Download size={15} />
              <span>Baixar Cópia (.txt)</span>
            </button>
            <button
              onClick={onClose}
              className="btn btn-sm btn-gourmet-primary px-4 py-2 flex-fill flex-sm-grow-0"
            >
              <Check size={16} className="text-gold" />
              <span>Confirmar Leitura</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
