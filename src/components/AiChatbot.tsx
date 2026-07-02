import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, PageType } from '../types';
import { Sparkles, Send, X, Bot, Phone, Calendar } from 'lucide-react';

interface AiChatbotProps {
  onNavigate: (page: PageType) => void;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Olá! Sou o **Lumen AI**, seu consultor virtual do atelier de Maria Clara & Vinicius Strack. ✨ Você pode me fazer **qualquer pergunta digitando abaixo** ou escolher uma de nossas pílulas rápidas:',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickAction: {
        label: 'Conhecer Módulos de Investimento',
        action: 'packages'
      }
    }
  ]);

  const quickChips = [
    'Como funciona o agendamento no WhatsApp?',
    'Quais são os valores dos módulos?',
    'O que acontece se chover no ensaio?',
    'Qual a diferença de ProRAW e JPEG?',
    'Dicas de figurino e maquiagem 👗',
    'Vocês viajam para Destination Wedding? ✈️',
    'Falar com Atendimento Humano no WhatsApp 💬',
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend !== undefined && typeof textToSend === 'string' ? textToSend : input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (textToSend === undefined || typeof textToSend !== 'string') setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = analyzeQuestion(query);
      setMessages(prev => [...prev, aiReply]);
      setIsTyping(false);
    }, 800);
  };

  const analyzeQuestion = (q: string): ChatMessage => {
    const lower = q.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. WhatsApp / Atendimento Humano
    if (lower.includes('whatsapp') || lower.includes('humano') || lower.includes('falar') || lower.includes('contato') || lower.includes('atendente') || lower.includes('pessoa')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Nossa equipe autoral liderada por Maria Clara está online no WhatsApp para atendimento exclusivo, assinatura de contrato e finalização da sua reserva! Toque no botão verde abaixo para iniciar a conversa agora mesmo:',
        timestamp: time,
        quickAction: {
          label: 'Abrir WhatsApp Oficial 💬',
          action: 'whatsapp'
        }
      };
    }

    // 2. Preços / Pacotes / Investimento / Pagamento / Sinal
    if (lower.includes('pagamento') || lower.includes('sinal') || lower.includes('valor') || lower.includes('preço') || lower.includes('custo') || lower.includes('investimento') || lower.includes('pacote') || lower.includes('módulo') || lower.includes('quanto custa')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Trabalhamos com 4 módulos fine art:\n\n• **Retrato & Branding:** R$ 1.490\n• **Casamento Premium:** R$ 8.900\n• **Publicidade & Editorial:** R$ 5.500/diária\n• **Cinema & Drone 8K:** R$ 3.200\n\nO pagamento do sinal de 30% é realizado via **WhatsApp** (com **5% de abatimento no PIX** à vista ou em até 12x no cartão). Deseja agendar sua data?',
        timestamp: time,
        quickAction: {
          label: 'Agendar Sessão Online',
          action: 'booking'
        }
      };
    }

    // 3. Chuva / Mau Tempo / Clima
    if (lower.includes('chuva') || lower.includes('tempo') || lower.includes('clima') || lower.includes('nublado') || lower.includes('chover')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Nossa política de tranquilidade garante que, para ensaios externos ou pre-wedding, reagendamos imediatamente para a próxima data solar favorável **sem qualquer custo adicional**! Para casamentos, utilizamos iluminação portátil selada sueca Profoto para criar retratos dramáticos e sublimes mesmo sob chuva.',
        timestamp: time
      };
    }

    // 4. ProRAW / Formato / Resolução / Entrega / Prazo
    if (lower.includes('raw') || lower.includes('proraw') || lower.includes('jpeg') || lower.includes('entrega') || lower.includes('prazo') || lower.includes('resolução') || lower.includes('foto') || lower.includes('quando recebo')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'A diferença do nosso fluxo em **ProRAW de 16 bits** é a captura de até 60 Megapixels sem compressão ou filtros genéricos! Tratamos as cores inspirados nas películas clássicas da Kodak e Fujifilm.\n\n⚡ **Prazo Express:** Em apenas **24 a 48 horas** você recebe o link da sua galeria em nuvem com Inteligência Artificial para curar suas fotos favoritas!',
        timestamp: time,
        quickAction: {
          label: 'Conhecer Área do Cliente',
          action: 'portal'
        }
      };
    }

    // 5. Figurino / Roupas / Look / Maquiagem / Make
    if (lower.includes('roupa') || lower.includes('figurino') || lower.includes('look') || lower.includes('vestido') || lower.includes('maquiagem') || lower.includes('make') || lower.includes('cabelo') || lower.includes('vestir')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Para um visual atemporal e europeu, recomendamos tecidos de fibras naturais (linho, algodão, seda, lã) em tons neutros, terrosos ou pastéis, evitando estampas muito vibrantes ou logos grandes.\n\n💄 **Adicional Exclusivo:** Oferecemos o serviço de **Make-up & Hair Artist HD no local (+R$ 450)** para acompanhar todo o ensaio com retoques sob a luz do estúdio!',
        timestamp: time,
        quickAction: {
          label: 'Ver Adicionais no Agendamento',
          action: 'booking'
        }
      };
    }

    // 6. Viagens / Destination Wedding / Outros Estados / Praia
    if (lower.includes('viagem') || lower.includes('viajar') || lower.includes('noronha') || lower.includes('carneiros') || lower.includes('são paulo') || lower.includes('europa') || lower.includes('destination') || lower.includes('fora de recife') || lower.includes('outro estado')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Atendemos casamentos e ensaios editoriais em **todo o Brasil e Europa** (Portugal, Itália, França)! Para Destination Weddings fora da nossa sede em São Lourenço da Mata / Recife, cobramos apenas os custos logísticos diretos sem qualquer taxa ou margem adicional repassada.',
        timestamp: time,
        quickAction: {
          label: 'Falar de Destination no WhatsApp ✈️',
          action: 'whatsapp'
        }
      };
    }

    // 7. Equipamentos / Câmera / Lente / Sony / Leica
    if (lower.includes('câmera') || lower.includes('leica') || lower.includes('sony') || lower.includes('lente') || lower.includes('equipamento') || lower.includes('profoto') || lower.includes('hasselblad')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Nosso atelier investe no ápice da engenharia óptica mundial:\n\n📷 **Câmeras:** Sony Alpha 1 (30fps) e Leica M11 (grão orgânico alemão).\n🔍 **Lentes Prime:** Sony G Master f/1.4 e Leica Noctilux f/0.95 para desfoque (bokeh) cremoso à luz de velas.\n💡 **Luz:** Geradores suecos Profoto Pro-11 e monitores Apple Pro Display XDR 6K.',
        timestamp: time
      };
    }

    // 8. Fotolivro / Álbum / Impressão / Couro / Algodão
    if (lower.includes('álbum') || lower.includes('album') || lower.includes('livro') || lower.includes('fotolivro') || lower.includes('imprimir') || lower.includes('couro') || lower.includes('quadro') || lower.includes('algodão')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Acreditamos na tangibilidade da arte! Nossos fotolivros são encadernados artesanalmente em **couro italiano legítimo** e impressos em papel 100% algodão museu de 310g (durabilidade para mais de 100 anos).\n\nO cliente faz a curadoria diretamente em nossa **Área do Cliente** com um clique!',
        timestamp: time,
        quickAction: {
          label: 'Acessar Portal do Cliente',
          action: 'portal'
        }
      };
    }

    // 9. Drone / Vídeo / Cinematografia / Reel
    if (lower.includes('drone') || lower.includes('aéreo') || lower.includes('aereo') || lower.includes('vídeo') || lower.includes('video') || lower.includes('reel') || lower.includes('tiktok') || lower.includes('instagram')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Oferecemos tomadas aéreas em 4K HDR com drones **DJI Inspire 3 & estabilização gimbal** (ideal para resorts, casamentos e arquitetura).\n\n🎬 **Vídeo Reel de 60s (+R$ 600):** Gravação vertical em câmera lenta (120fps) com edição dinâmica para você viralizar no Instagram!',
        timestamp: time,
        quickAction: {
          label: 'Solicitar Produção com Drone',
          action: 'booking'
        }
      };
    }

    // 10. Duração / Horários / Golden Hour / Agenda Solar
    if (lower.includes('duração') || lower.includes('horas') || lower.includes('horário') || lower.includes('agenda') || lower.includes('golden hour') || lower.includes('pôr do sol') || lower.includes('bloqueio') || lower.includes('ocupado')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Nossa agenda opera em tempo real! Os horários mais disputados são as **15:30 (Golden Hour)** e **17:00 (Pôr do Sol)** por oferecerem uma luz solar rasante dourada incomparável.\n\n🔒 Quando um horário aparece como "Ocupado" no calendário, significa que foi reservado por outro cliente ou bloqueado pelo fotógrafo em nosso painel.',
        timestamp: time,
        quickAction: {
          label: 'Ver Calendário de Disponibilidade',
          action: 'booking'
        }
      };
    }

    // 11. Saudação / Olá / Oi / Bom dia
    if (lower.includes('olá') || lower.includes('oi') || lower.includes('bom dia') || lower.includes('boa tarde') || lower.includes('boa noite') || lower.includes('tudo bem') || lower.includes('hey')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Olá! É uma honra recebê-lo no **Lumen Atelier**. Estou preparado para responder sobre nossos pacotes fine art, equipamentos, clima ou direcioná-lo para um atendimento autoral com a diretora Maria Clara e equipe. O que você gostaria de saber?',
        timestamp: time,
        quickAction: {
          label: 'Ver Módulos de Preços',
          action: 'packages'
        }
      };
    }

    // 12. Smart Fallback for ANY other custom question!
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `Entendi sua pergunta sobre **"${q}"**! Como cada projeto fotográfico no **Lumen Atelier** é concebido como uma obra de arte única sob direção de Maria Clara, nossa equipe artística terá um imenso prazer em explicar todos os detalhes específicos para o seu caso pelo WhatsApp.\n\nPodemos abrir a conversa agora com um clique?`,
      timestamp: time,
      quickAction: {
        label: 'Tirar Dúvida no WhatsApp 💬',
        action: 'whatsapp'
      }
    };
  };

  const executeAction = (action: 'whatsapp' | 'booking' | 'packages' | 'portal') => {
    if (action === 'whatsapp') {
      const msg = encodeURIComponent("Olá, equipe Lumen Atelier (Maria Clara & Vinicius Strack)! Estou navegando no website e gostaria de atendimento autoral e informações sobre agendamento via WhatsApp. ✨");
      window.open(`https://wa.me/5581998422026?text=${msg}`, '_blank');
      return;
    }
    if (action === 'booking') {
      onNavigate('booking');
      setIsOpen(false);
      return;
    }
    if (action === 'packages') {
      onNavigate('services');
      setIsOpen(false);
      return;
    }
    if (action === 'portal') {
      onNavigate('portal');
      setIsOpen(false);
      return;
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="position-fixed bottom-0 end-0 m-4 z-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-gourmet-primary rounded-pill p-3 shadow-lg d-flex align-items-center gap-2 hover-scale border border-warm"
          style={{
            background: 'linear-gradient(135deg, #1C1B18 0%, #3D3A33 100%)',
            color: '#FDFCF9',
            boxShadow: '0 12px 30px rgba(28, 27, 24, 0.28)'
          }}
          aria-label="Abrir Assistente Virtual IA"
        >
          <div className="position-relative d-flex align-items-center justify-content-center">
            <Bot size={22} className="text-gold" style={{ color: '#D4AF37' }} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-success p-1 border border-white">
              <span className="visually-hidden">Online</span>
            </span>
          </div>
          <span className="gourmet-title fw-bold fs-6 pe-1 d-none d-sm-inline mb-0" style={{ color: '#FDFCF9' }}>
            {isOpen ? 'Fechar Consultor' : 'Lumen AI • Consultor Virtual'}
          </span>
          {!isOpen && <Sparkles size={16} className="text-gold animate-pulse" style={{ color: '#D4AF37' }} />}
        </button>
      </div>

      {/* Floating Chat Window */}
      {isOpen && (
        <div 
          className="position-fixed bottom-0 end-0 m-3 m-sm-4 z-5 card bg-white border border-warm shadow-lg overflow-hidden animate-fade-in d-flex flex-column"
          style={{
            width: 'calc(100vw - 32px)',
            maxWidth: '400px',
            height: '560px',
            maxHeight: 'calc(100vh - 100px)',
            borderRadius: '24px',
            marginBottom: '80px'
          }}
        >
          {/* Chat Header */}
          <div className="bg-gourmet-dark p-3 px-4 d-flex justify-content-between align-items-center border-bottom border-warm flex-shrink-0" style={{ background: '#1C1B18', color: '#FDFCF9' }}>
            <div className="d-flex align-items-center gap-2">
              <div className="bg-white bg-opacity-10 p-2 rounded-circle border border-warm d-flex align-items-center justify-content-center">
                <Sparkles size={18} className="text-gold" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <h6 className="gourmet-title fw-bold mb-0 fs-5" style={{ color: '#FDFCF9' }}>Lumen AI • Atelier</h6>
                <div className="d-flex align-items-center gap-1" style={{ fontSize: '0.68rem', color: '#D1CCC2' }}>
                  <span className="badge bg-success rounded-circle p-1"></span>
                  <span className="gourmet-mono">IA Online • Responde Qualquer Dúvida</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-link text-white text-opacity-75 hover-text-white p-1"
              aria-label="Fechar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-3 flex-grow-1 overflow-auto bg-gourmet-alt d-flex flex-column gap-3" style={{ background: '#FAF8F5' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`d-flex flex-column ${msg.sender === 'user' ? 'align-items-end' : 'align-items-start'}`}
              >
                <div 
                  className={`p-3 rounded-4 shadow-sm max-w-85 ${
                    msg.sender === 'user'
                      ? 'bg-dark-espresso text-white rounded-bottom-end-0'
                      : 'bg-white text-dark-espresso border border-warm rounded-bottom-start-0'
                  }`}
                  style={{
                    background: msg.sender === 'user' ? '#1C1B18' : '#FFFFFF',
                    color: msg.sender === 'user' ? '#FDFCF9' : '#1C1B18',
                    fontSize: '0.88rem',
                    lineHeight: '1.5'
                  }}
                >
                  <div className="gourmet-sans" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />

                  {/* Quick Action Button in AI Bubble */}
                  {msg.quickAction && (
                    <div className="mt-3 pt-2 border-top border-warm">
                      <button
                        onClick={() => executeAction(msg.quickAction!.action)}
                        className={`btn btn-sm rounded-pill w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm ${
                          msg.quickAction.action === 'whatsapp'
                            ? 'btn-success text-white'
                            : 'btn-gourmet-gold'
                        }`}
                        style={msg.quickAction.action === 'whatsapp' ? { background: '#25D366', borderColor: '#25D366' } : undefined}
                      >
                        {msg.quickAction.action === 'whatsapp' ? <Phone size={14} /> : <Calendar size={14} />}
                        <span>{msg.quickAction.label}</span>
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-muted-warm gourmet-mono mt-1 px-1" style={{ fontSize: '0.65rem' }}>
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="d-flex align-items-start">
                <div className="bg-white text-warm-gray border border-warm p-3 rounded-4 rounded-bottom-start-0 shadow-sm d-flex align-items-center gap-2 fs-7 gourmet-mono">
                  <div className="spinner-grow spinner-grow-sm text-gold" role="status" style={{ color: '#D4AF37' }} />
                  <span>Lumen AI curando resposta...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-white border-top border-warm d-flex gap-1 overflow-auto flex-nowrap pb-2 scrollbar-none flex-shrink-0">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="btn btn-sm badge-gourmet text-nowrap flex-shrink-0 px-3 py-1 hover-scale border border-warm"
                style={{ fontSize: '0.72rem', background: '#F5F2EB' }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white border-top border-warm d-flex gap-2 align-items-center flex-shrink-0"
          >
            <input
              type="text"
              className="form-control bg-gourmet-alt text-dark-espresso border-warm rounded-pill px-4 py-2 gourmet-sans fs-7 shadow-sm"
              placeholder="Digite qualquer pergunta sobre o atelier..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{ background: '#FAF8F5' }}
            />
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); handleSend(); }}
              disabled={!input.trim() || isTyping}
              className="btn btn-gourmet-primary rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
              style={{ width: '40px', height: '40px', background: '#1C1B18' }}
              aria-label="Enviar mensagem"
            >
              <Send size={16} className="text-gold" style={{ color: '#D4AF37' }} />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
