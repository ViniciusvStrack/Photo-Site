import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const chatWithAi = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'A mensagem é obrigatória.' });
    }

    const lower = message.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let text = 'O **Lumen Atelier** une a tradição da película fotográfica à precisão dos sensores full-frame alemães Leica e japoneses Sony. Se preferir um atendimento sob medida para o seu evento, podemos conversar diretamente pelo nosso WhatsApp oficial!';
    let quickAction: any = {
      label: 'Falar no WhatsApp com Atendimento 💬',
      action: 'whatsapp'
    };

    // 1. WhatsApp / Atendimento Humano
    if (lower.includes('whatsapp') || lower.includes('humano') || lower.includes('falar') || lower.includes('contato') || lower.includes('atendente') || lower.includes('pessoa')) {
      text = 'Nossa equipe de curadoria autoral está online no WhatsApp para atendimento exclusivo, esclarecimento de dúvidas e finalização de contratos! Toque no botão verde abaixo para iniciar a conversa agora mesmo:';
      quickAction = { label: 'Abrir WhatsApp do Atelier 💬', action: 'whatsapp' };
    }
    // 2. Preços / Pacotes / Investimento / Pagamento / Sinal
    else if (lower.includes('pagamento') || lower.includes('sinal') || lower.includes('valor') || lower.includes('preço') || lower.includes('custo') || lower.includes('investimento') || lower.includes('pacote') || lower.includes('módulo') || lower.includes('quanto custa')) {
      text = 'Trabalhamos com 4 módulos de investimento fine art:\n\n• **Retrato & Branding:** R$ 1.490\n• **Casamento Premium:** R$ 8.900\n• **Publicidade & Editorial:** R$ 5.500/diária\n• **Cinema & Drone 8K:** R$ 3.200\n\nO pagamento do sinal de 30% e do saldo é realizado com segurança via **WhatsApp** (com **5% de abatimento no PIX** à vista ou em até 12x no cartão de crédito). Gostaria de simular ou agendar?';
      quickAction = { label: 'Agendar Sessão no WhatsApp', action: 'booking' };
    }
    // 3. Chuva / Mau Tempo / Clima
    else if (lower.includes('chuva') || lower.includes('tempo') || lower.includes('clima') || lower.includes('nublado') || lower.includes('chover')) {
      text = 'Nossa política de tranquilidade garante que, para ensaios externos ou pre-wedding, reagendamos imediatamente para a próxima data solar com luz favorável **sem qualquer custo adicional**! Para casamentos e eventos irrevogáveis, utilizamos iluminação portátil selada sueca Profoto para criar retratos dramáticos, românticos e cinematográficos mesmo sob chuva intensa.';
      quickAction = undefined;
    }
    // 4. ProRAW / Formato / Resolução / Entrega / Prazo
    else if (lower.includes('raw') || lower.includes('proraw') || lower.includes('jpeg') || lower.includes('entrega') || lower.includes('prazo') || lower.includes('resolução') || lower.includes('foto') || lower.includes('quando recebo')) {
      text = 'A diferença do nosso fluxo em **ProRAW de 16 bits** é a captura de até 60 Megapixels sem compressão ou filtros digitais genéricos! Tratamos as cores inspirados nas películas clássicas da Kodak e Fujifilm.\n\n⚡ **Prazo Express:** Em apenas **24 a 48 horas** você recebe o link da sua galeria em nuvem com Inteligência Artificial para escolher suas fotos favoritas!';
      quickAction = { label: 'Conhecer Área do Cliente', action: 'portal' };
    }
    // 5. Figurino / Roupas / Look / Maquiagem / Make
    else if (lower.includes('roupa') || lower.includes('figurino') || lower.includes('look') || lower.includes('vestido') || lower.includes('maquiagem') || lower.includes('make') || lower.includes('cabelo') || lower.includes('vestir')) {
      text = 'Para um visual atemporal e europeu, recomendamos tecidos de fibras naturais (linho, algodão, seda, lã) em tons neutros, terrosos, pastéis ou monocromáticos, evitando estampas muito vibrantes ou logos grandes.\n\n💄 **Adicional Exclusivo:** Oferecemos o serviço de **Make-up & Hair Artist HD no local (+R$ 450)** para acompanhar todo o ensaio com retoques instantâneos sob a luz do estúdio!';
      quickAction = { label: 'Ver Adicionais no Agendamento', action: 'booking' };
    }
    // 6. Viagens / Destination Wedding / Outros Estados / Praia
    else if (lower.includes('viagem') || lower.includes('viajar') || lower.includes('noronha') || lower.includes('carneiros') || lower.includes('são paulo') || lower.includes('europa') || lower.includes('destination') || lower.includes('fora de recife') || lower.includes('outro estado')) {
      text = 'Atendemos casamentos de luxo e ensaios editoriais em **todo o Brasil e Europa** (Portugal, Itália, França)! Para Destination Weddings fora da nossa sede em São Lourenço da Mata / Recife, cobramos apenas os custos logísticos diretos (deslocamento e hospedagem) sem qualquer taxa ou margem adicional repassada.';
      quickAction = { label: 'Falar de Destination no WhatsApp ✈️', action: 'whatsapp' };
    }
    // 7. Equipamentos / Câmera / Lente / Sony / Leica
    else if (lower.includes('câmera') || lower.includes('leica') || lower.includes('sony') || lower.includes('lente') || lower.includes('equipamento') || lower.includes('profoto') || lower.includes('hasselblad')) {
      text = 'Nosso atelier investe no ápice da engenharia óptica mundial:\n\n📷 **Câmeras:** Sony Alpha 1 (30fps sem blackout) e Leica M11 (grão orgânico alemão).\n🔍 **Lentes Prime:** Sony G Master f/1.4 e Leica Noctilux f/0.95 para desfoque natural (bokeh) cremoso à luz de velas.\n💡 **Luz:** Geradores suecos Profoto Pro-11 e monitores calibrados Apple Pro Display XDR 6K.';
      quickAction = undefined;
    }
    // 8. Fotolivro / Álbum / Impressão / Couro / Algodão
    else if (lower.includes('álbum') || lower.includes('album') || lower.includes('livro') || lower.includes('fotolivro') || lower.includes('imprimir') || lower.includes('couro') || lower.includes('quadro') || lower.includes('algodão')) {
      text = 'Acreditamos na tangibilidade da arte! Nossos fotolivros são encadernados artesanalmente em **couro italiano legítimo** e impressos em papel 100% algodão museu de 310g (durabilidade garantida para mais de 100 anos).\n\nO cliente faz a curadoria e aprova a seleção de fotos diretamente em nossa **Área do Cliente** com um clique!';
      quickAction = { label: 'Acessar Portal do Cliente', action: 'portal' };
    }
    // 9. Drone / Vídeo / Cinematografia / Reel
    else if (lower.includes('drone') || lower.includes('aéreo') || lower.includes('aereo') || lower.includes('vídeo') || lower.includes('video') || lower.includes('reel') || lower.includes('tiktok') || lower.includes('instagram')) {
      text = 'Oferecemos tomadas cinematográficas aéreas em 4K HDR com drones **DJI Inspire 3 & estabilização gimbal** (ideal para resorts, casamentos em locações abertas e arquitetura).\n\n🎬 **Vídeo Reel de 60s (+R$ 600):** Gravação vertical em câmera lenta (120fps) com edição dinâmica para você viralizar e compartilhar no Instagram!';
      quickAction = { label: 'Solicitar Produção com Drone', action: 'booking' };
    }
    // 10. Duração / Horários / Golden Hour / Agenda Solar
    else if (lower.includes('duração') || lower.includes('horas') || lower.includes('horário') || lower.includes('agenda') || lower.includes('golden hour') || lower.includes('pôr do sol') || lower.includes('bloqueio') || lower.includes('ocupado')) {
      text = 'Nossa agenda opera em tempo real! Os horários mais disputados são as **15:30 (Golden Hour)** e **17:00 (Pôr do Sol)** por oferecerem uma luz solar rasante dourada incomparável.\n\n🔒 Quando um horário aparece como "Ocupado" no calendário, significa que foi reservado por outro cliente ou bloqueado pelo fotógrafo em nosso painel administrativo.';
      quickAction = { label: 'Ver Calendário de Disponibilidade', action: 'booking' };
    }
    // 11. Saudação / Olá / Oi / Bom dia
    else if (lower.includes('olá') || lower.includes('oi') || lower.includes('bom dia') || lower.includes('boa tarde') || lower.includes('boa noite') || lower.includes('tudo bem') || lower.includes('hey')) {
      text = 'Olá! É uma honra recebê-lo no **Lumen Atelier**. Estou preparado para responder sobre nossos pacotes fine art, equipamentos, agenda solar ou direcioná-lo para um atendimento autoral com os fotógrafos Rafael Novaes e Beatriz Lumen. O que você gostaria de saber?';
      quickAction = { label: 'Ver Módulos de Preços', action: 'packages' };
    }
    // 12. Smart Fallback for custom questions
    else {
      text = `Entendi sua consulta sobre **"${message}"**! Como cada projeto no **Lumen Atelier** é concebido como uma obra de arte exclusiva e personalizada, nossa equipe de curadoria artística terá um imenso prazer em explicar todos os pormenores específicos pelo nosso WhatsApp.\n\nPodemos abrir a conversa agora com um clique?`;
    }

    const response: ApiResponse = {
      success: true,
      data: {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text,
        timestamp: time,
        quickAction
      }
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};
