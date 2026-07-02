import React, { useState, useEffect } from 'react';
import type { PageType, BookingState, ServicePackage, UserProfile } from '../types';
import { SERVICE_PACKAGES, ADDONS_LIST } from '../data/mockData';
import { apiService } from '../services/api';
import { ContractModal } from '../components/ContractModal';
import { SolarCalculator } from '../components/SolarCalculator';
import { WeatherWidget } from '../components/WeatherWidget';
import { Calendar, Clock, Check, ArrowRight, ArrowLeft, ShieldCheck, User, Mail, Phone, Plus, Award, CheckCircle2, Download, FileText, Sun, CloudSun } from 'lucide-react';

interface BookingPageProps {
  bookingState: BookingState;
  onUpdateBooking: (updated: Partial<BookingState>) => void;
  onNavigate: (page: PageType) => void;
  currentUser: UserProfile | null;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  bookingState,
  onUpdateBooking,
  onNavigate,
  currentUser
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdBookingCode, setCreatedBookingCode] = useState<string>('#LUMEN-94827');
  const [isContractModalOpen, setIsContractModalOpen] = useState<boolean>(false);
  const [showSolarCalc, setShowSolarCalc] = useState<boolean>(false);
  const [showWeather, setShowWeather] = useState<boolean>(true);

  // Auto-fill user data if logged in
  useEffect(() => {
    if (currentUser && !bookingState.clientName) {
      onUpdateBooking({
        clientName: currentUser.name,
        clientEmail: currentUser.email
      });
    }
  }, [currentUser]);

  // Selected package helper
  const selectedPackage = SERVICE_PACKAGES.find(p => p.id === bookingState.packageId) || SERVICE_PACKAGES[1];

  // Calculate total price
  const calculateTotal = (pkgId: string | null, addons: string[]) => {
    const pkg = SERVICE_PACKAGES.find(p => p.id === (pkgId || selectedPackage.id)) || SERVICE_PACKAGES[1];
    let total = pkg.price;
    addons.forEach(addId => {
      const add = ADDONS_LIST.find(a => a.id === addId);
      if (add) total += add.price;
    });
    return total;
  };

  const handleSelectPackage = (pkg: ServicePackage) => {
    const newTotal = calculateTotal(pkg.id, bookingState.addons);
    onUpdateBooking({ packageId: pkg.id, totalPrice: newTotal });
  };

  const handleToggleAddon = (addId: string) => {
    const exists = bookingState.addons.includes(addId);
    const newAddons = exists 
      ? bookingState.addons.filter(id => id !== addId)
      : [...bookingState.addons, addId];
    
    const newTotal = calculateTotal(bookingState.packageId, newAddons);
    onUpdateBooking({ addons: newAddons, totalPrice: newTotal });
  };

  const generateWhatsAppMessage = () => {
    const total = calculateTotal(bookingState.packageId, bookingState.addons);
    const addonsText = bookingState.addons.length > 0
      ? bookingState.addons.map(addId => ADDONS_LIST.find(a => a.id === addId)?.title).filter(Boolean).join(', ')
      : 'Nenhum adicional extra';

    return `*Olá, Lumen Atelier (Maria Clara & Vinicius Strack)!* Gostaria de finalizar minha solicitação de reserva e atendimento autoral. ✨\n\n*📋 RESUMO DO CONTRATO:* \n👤 *Cliente:* ${bookingState.clientName || 'Cliente Pro'}\n📧 *E-mail:* ${bookingState.clientEmail || 'N/A'}\n💎 *Módulo:* ${selectedPackage.title}\n📅 *Data:* ${bookingState.date || '18/07/2026'}\n☀️ *Horário Solar:* ${bookingState.timeSlot || '15:30 Golden Hour'}\n📍 *Locação:* ${bookingState.location || 'Atelier Lumen'}\n✨ *Adicionais:* ${addonsText}\n💵 *Investimento Total:* R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n⚡ *Com 5% OFF no PIX:* R$ ${(total * 0.95).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\nComo procedemos com a assinatura digital do contrato e o pagamento do sinal?`;
  };

  const openWhatsAppChat = () => {
    const msg = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/5581998422026?text=${msg}`, '_blank');
  };

  const handleFinishOnWhatsApp = async () => {
    setValidationError('');
    if (!bookingState.clientName || !bookingState.clientEmail || !bookingState.clientPhone) {
      setValidationError('Preencha seu Nome, E-mail e WhatsApp para que possamos emitir o contrato autoral.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Save to back-end
      const res = await apiService.createBooking(bookingState);
      if (res && res.code) {
        setCreatedBookingCode(res.code);
      }
    } catch (err) {
      console.warn('Backend booking save error, proceeding with WhatsApp redirect', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Open WhatsApp after a short delay so user sees confirmation
    setTimeout(() => {
      openWhatsAppChat();
    }, 600);
  };

  const handleNextStep = () => {
    setValidationError('');
    if (currentStep === 1 && !bookingState.packageId) {
      setValidationError('Por favor, selecione um módulo de serviço para continuar.');
      return;
    }
    if (currentStep === 2 && (!bookingState.date || !bookingState.timeSlot)) {
      setValidationError('Por favor, selecione a data e o horário solar desejado.');
      return;
    }
    if (currentStep === 4) {
      handleFinishOnWhatsApp();
      return;
    }
    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Generate and download sample .ics calendar invite
  const handleDownloadIcs = () => {
    const eventDate = bookingState.date || '2026-07-18';
    const cleanDate = eventDate.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lumen Atelier//Fotografia Fine Art//PT',
      'BEGIN:VEVENT',
      `DTSTART:${cleanDate}T150000Z`,
      `DTEND:${cleanDate}T180000Z`,
      `SUMMARY:Ensaio Fine Art - ${selectedPackage.title}`,
      `DESCRIPTION:Sessão fotográfica ProRAW com o atelier Lumen. Local: ${bookingState.location || 'Atelier Lumen'}`,
      `LOCATION:${bookingState.location || 'Av. da Luz, 1400 - São Lourenço da Mata - PE'}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'agendamento_lumen_atelier.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate textual receipt summary
  const handleDownloadReceipt = () => {
    const total = calculateTotal(bookingState.packageId, bookingState.addons);
    const receiptContent = `=====================================================
            SOLICITAÇÃO DE RESERVA - LUMEN ATELIER
=====================================================
Código de Registro: ${createdBookingCode}
Data de Solicitação: 01 de Julho de 2026

CLIENTE:
Nome: ${bookingState.clientName || 'Cliente Pro'}
E-mail: ${bookingState.clientEmail || 'cliente@email.com'}
WhatsApp: ${bookingState.clientPhone || '(81) 99999-9999'}

DETALHES DO ATELIER:
Pacote: ${selectedPackage.title}
Data: ${bookingState.date || '18/07/2026'}
Horário Solar: ${bookingState.timeSlot || '15:30 Golden Hour'}
Local: ${bookingState.location || 'Atelier Próprio'}

VALORES ESTIMADOS:
Preço do Módulo: R$ ${selectedPackage.price.toFixed(2)}
Adicionais (${bookingState.addons.length}): R$ ${(total - selectedPackage.price).toFixed(2)}
-----------------------------------------------------
TOTAL FINAL DO INVESTIMENTO: R$ ${total.toFixed(2)}
(Pagamento com 5% OFF no PIX ou 12x via WhatsApp)
=====================================================
Atendimento humanizado em andamento via WhatsApp.
=====================================================`;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'resumo_reserva_lumen.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate sample dates for July & August 2026
  const sampleDates = [
    { date: '2026-07-10', label: 'Sex, 10 Julho 2026', status: 'Disponível' },
    { date: '2026-07-11', label: 'Sáb, 11 Julho 2026', status: 'Disponível' },
    { date: '2026-07-15', label: 'Qua, 15 Julho 2026', status: 'Disponível' },
    { date: '2026-07-18', label: 'Sáb, 18 Julho 2026', status: 'Última Vaga' },
    { date: '2026-07-24', label: 'Sex, 24 Julho 2026', status: 'Disponível' },
    { date: '2026-07-25', label: 'Sáb, 25 Julho 2026', status: 'Disponível' },
    { date: '2026-08-01', label: 'Sáb, 01 Agosto 2026', status: 'Disponível' },
    { date: '2026-08-08', label: 'Sáb, 08 Agosto 2026', status: 'Última Vaga' },
    { date: '2026-08-15', label: 'Sáb, 15 Agosto 2026', status: 'Disponível' },
  ];

  const timeSlots = [
    { id: '09:00', label: '09:00 - Manhã Suave (Luz Leste)', desc: 'Ideal para retratos executivos e editorial ao ar livre' },
    { id: '15:30', label: '15:30 - Golden Hour (Luz Dourada)', desc: 'O horário solar mais cobiçado para casamentos e pre-wedding' },
    { id: '17:00', label: '17:00 - Pôr do Sol & Crepúsculo', desc: 'Silhuetas dramáticas e cores intensas no horizonte' },
    { id: '19:00', label: '19:00 - Atelier Noturno Chiaroscuro', desc: 'Sessões exclusivas com iluminação sueca Profoto' },
  ];

  // 1. CONFIRMATION SCREEN AFTER WHATSAPP REDIRECT
  if (isSubmitted) {
    return (
      <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 min-vh-100 d-flex align-items-center justify-content-center bg-gourmet-main">
        <div className="container max-w-700 py-5">
          <div 
            className="card bg-white border border-warm rounded-4 p-5 text-center shadow-lg position-relative overflow-hidden"
            style={{ borderRadius: '32px' }}
          >
            <div className="position-absolute top-0 start-50 translate-middle-x w-100" style={{ height: '4px', background: 'linear-gradient(90deg, #5F7367 0%, #25D366 50%, #5F7367 100%)' }} />

            <div className="bg-success bg-opacity-15 text-success rounded-circle p-4 d-inline-flex mx-auto mb-4 animate-bounce border border-success border-opacity-25" style={{ color: '#25D366' }}>
              <CheckCircle2 size={56} />
            </div>

            <span className="badge badge-gold px-4 py-2 fw-bold mb-3">
              ATENDIMENTO INICIADO • CÓDIGO {createdBookingCode}
            </span>

            <h1 className="display-6 fw-bold text-dark-espresso mb-3 gourmet-title">
              Solicitação Registrada com Sucesso!
            </h1>

            <p className="text-warm-gray lead mb-4 gourmet-sans">
              Parabéns, <span className="text-dark-espresso fw-bold">{bookingState.clientName || 'Cliente'}</span>! Abrimos uma conversa direta com nossa equipe criativa no seu **WhatsApp** para assinarmos o contrato autoral e combinarmos o pagamento com segurança.
            </p>

            {/* Summary Box */}
            <div className="bg-gourmet-alt p-4 rounded-4 border border-warm text-start mb-4">
              <div className="row g-3 fs-7">
                <div className="col-sm-6">
                  <div className="text-muted-warm gourmet-mono">MÓDULO SOLICITADO:</div>
                  <div className="text-dark-espresso fw-bold gourmet-title fs-5">{selectedPackage.title}</div>
                </div>
                <div className="col-sm-6">
                  <div className="text-muted-warm gourmet-mono">INVESTIMENTO PREVISTO:</div>
                  <div className="text-terracotta fw-bolder gourmet-mono fs-5">
                    R$ {calculateTotal(bookingState.packageId, bookingState.addons).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="text-muted-warm gourmet-mono">DATA & HORÁRIO SOLAR:</div>
                  <div className="text-dark-espresso fw-semibold">{bookingState.date || '18/07/2026'} • {bookingState.timeSlot || '15:30'}</div>
                </div>
                <div className="col-sm-6">
                  <div className="text-muted-warm gourmet-mono">CANAL DE ATENDIMENTO:</div>
                  <div className="text-success fw-bold text-truncate d-flex align-items-center gap-1" style={{ color: '#25D366' }}>
                    <Phone size={14} />
                    <span>WhatsApp Oficial Lumen</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Direct Action Banner */}
            <div className="p-4 mb-4 rounded-4 bg-white border border-success border-opacity-50 shadow-sm d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3" style={{ background: '#F2FDF5' }}>
              <div className="text-start pe-sm-2">
                <h6 className="fw-bold mb-1 text-dark-espresso d-flex align-items-center gap-2">
                  <Phone size={18} style={{ color: '#25D366' }} />
                  <span>A janela do WhatsApp não abriu automaticamente?</span>
                </h6>
                <p className="text-warm-gray fs-7 mb-0">Toque ao lado para reabrir a conversa com a mensagem pré-preenchida.</p>
              </div>
              <button
                onClick={openWhatsAppChat}
                className="btn btn-success text-white rounded-pill px-4 py-3 fw-bold flex-shrink-0 shadow-sm d-flex align-items-center gap-2"
                style={{ background: '#25D366', borderColor: '#25D366' }}
              >
                <Phone size={16} />
                <span>Reabrir WhatsApp 💬</span>
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <button
                onClick={handleDownloadReceipt}
                className="btn-gourmet-outline px-4 py-3 fw-semibold"
              >
                <Download size={18} />
                <span>Baixar Resumo (TXT)</span>
              </button>

              <button
                onClick={() => setIsContractModalOpen(true)}
                className="btn-gourmet-outline px-4 py-3 fw-semibold text-terracotta"
              >
                <FileText size={18} />
                <span>Ler Contrato Autoral</span>
              </button>

              <button
                onClick={handleDownloadIcs}
                className="btn-gourmet-outline px-4 py-3 fw-semibold"
              >
                <Calendar size={18} />
                <span>Agenda (.ics)</span>
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="btn-gourmet-primary px-4 py-3 shadow-md"
              >
                <span>Início</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        </div>

        <ContractModal 
          isOpen={isContractModalOpen}
          onClose={() => setIsContractModalOpen(false)}
          clientName={bookingState.clientName}
          packageTitle={selectedPackage.title}
        />
      </div>
    );
  }

  // 2. MAIN BOOKING WIZARD VIEW
  return (
    <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 bg-gourmet-main">
      <div className="container pt-4">
        {/* Header Section */}
        <div className="text-center mx-auto mb-4" style={{ maxWidth: '800px' }}>
          <div className="d-inline-flex align-items-center gap-2 bg-gourmet-surface border border-warm rounded-pill px-4 py-1 mb-3 shadow-sm">
            <Calendar size={14} className="text-gold" />
            <span className="text-warm-gray gourmet-mono" style={{ fontSize: '0.75rem' }}>
              RESERVA DE ATELIER • ATENDIMENTO VIA WHATSAPP
            </span>
          </div>
          <h1 className="display-5 fw-bold mb-3 tracking-tight gourmet-title text-dark-espresso">
            Agende Sua Experiência.
          </h1>
          <p className="text-warm-gray lead gourmet-sans">
            Configure seu módulo de investimento, escolha o melhor horário da luz solar e personalize sua sessão. Ao avançar, abriremos nosso **WhatsApp** com seu resumo pronto para atendimento imediato!
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center position-relative px-2 px-md-4">
              <div className="position-absolute top-50 start-0 w-100 translate-middle-y z-0 px-5" style={{ height: '2px', background: 'rgba(160, 150, 135, 0.25)' }}>
                <div 
                  className="bg-dark-espresso transition-all duration-500" 
                  style={{ height: '100%', width: `${((currentStep - 1) / 3) * 100}%`, background: '#1C1B18' }} 
                />
              </div>

              {[
                { step: 1, label: 'Módulo & Serviço' },
                { step: 2, label: 'Data & Horário Solar' },
                { step: 3, label: 'Adicionais Fine Art' },
                { step: 4, label: 'Dados & WhatsApp' },
              ].map((s) => {
                const isCompleted = currentStep > s.step;
                const isCurrent = currentStep === s.step;
                return (
                  <div key={s.step} className="d-flex flex-column align-items-center position-relative z-1">
                    <div 
                      onClick={() => { if (s.step < currentStep) setCurrentStep(s.step); }}
                      className={`rounded-circle d-flex align-items-center justify-content-center fw-bold gourmet-mono transition-all shadow-sm ${
                        isCompleted 
                          ? 'bg-success text-white cursor-pointer' 
                          : isCurrent 
                            ? 'bg-dark-espresso text-white ring-4 ring-gold' 
                            : 'bg-white text-warm-gray border border-warm'
                      }`}
                      style={{ width: '42px', height: '42px', fontSize: '0.92rem', background: isCurrent ? '#1C1B18' : undefined }}
                    >
                      {isCompleted ? <Check size={18} /> : s.step}
                    </div>
                    <span className={`fs-7 mt-2 fw-semibold text-center ${isCurrent ? 'text-dark-espresso fw-bold' : 'text-warm-gray'}`} style={{ fontSize: '0.78rem', maxWidth: '90px' }}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="alert alert-danger bg-danger bg-opacity-10 border border-danger text-danger max-w-700 mx-auto rounded-pill px-4 py-3 d-flex align-items-center justify-content-between mb-4 animate-shake shadow-sm">
            <span className="fw-semibold">{validationError}</span>
            <button onClick={() => setValidationError('')} className="btn-close" />
          </div>
        )}

        {/* Wizard Main Content Structure */}
        <div className="row g-4 justify-content-center">
          {/* Left/Main Column: Step Content */}
          <div className="col-lg-8">
            <div className="card-gourmet p-4 p-md-5 h-100" style={{ borderRadius: '24px', background: '#FFFFFF' }}>
              
              {/* ETAPA 1: ESCOLHA DO PACOTE */}
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <h3 className="gourmet-title fw-bold text-dark-espresso mb-2 fs-3">1. Escolha o Seu Módulo Principal</h3>
                  <p className="text-warm-gray mb-4">
                    Selecione a modalidade de investimento que melhor atende à sua narrativa visual. Você poderá anexar extras na próxima etapa.
                  </p>

                  <div className="d-flex flex-column gap-3">
                    {SERVICE_PACKAGES.map((pkg) => {
                      const isSelected = (bookingState.packageId || selectedPackage.id) === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => handleSelectPackage(pkg)}
                          className={`p-4 rounded-4 border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-gourmet-alt border-warm-strong shadow-md' 
                              : 'bg-white border-warm hover-scale'
                          }`}
                          style={{ borderRadius: '20px' }}
                        >
                          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                            <div className="pe-md-3">
                              <div className="d-flex align-items-center gap-2 mb-1">
                                <span className={`badge rounded-pill ${pkg.popular ? 'badge-gold' : 'badge-gourmet'}`}>
                                  {pkg.badge}
                                </span>
                                {isSelected && <span className="badge bg-success text-white rounded-pill">Selecionado</span>}
                              </div>
                              <h4 className="gourmet-title fw-bold text-dark-espresso mb-1 fs-4">{pkg.title}</h4>
                              <p className="text-warm-gray fs-7 mb-2">{pkg.subtitle}</p>
                              <div className="text-muted-warm gourmet-mono" style={{ fontSize: '0.72rem' }}>
                                📦 {pkg.deliverables} • ⏱️ {pkg.duration}
                              </div>
                            </div>

                            <div className="text-md-end flex-shrink-0">
                              <div className="gourmet-title fw-bolder fs-3 text-dark-espresso">
                                R$ {pkg.price.toLocaleString('pt-BR')}
                              </div>
                              <div className="text-muted-warm gourmet-mono" style={{ fontSize: '0.72rem' }}>{pkg.period}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ETAPA 2: DATA E HORÁRIO */}
              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                    <h3 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-3">2. Escolha a Data e Horário Solar</h3>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowWeather(!showWeather)}
                        className="btn btn-sm btn-gourmet-outline py-1 px-3 fs-7"
                      >
                        <CloudSun size={14} className="text-gold" />
                        <span>{showWeather ? 'Ocultar Clima' : 'Clima & Luz ⛅'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSolarCalc(!showSolarCalc)}
                        className="btn btn-sm btn-gourmet-outline py-1 px-3 fs-7"
                      >
                        <Sun size={14} className="text-gold" />
                        <span>{showSolarCalc ? 'Ocultar Sol' : 'Simulador Solar ☀️'}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-warm-gray mb-4">
                    Nossa agenda opera com vagas exclusivas para assegurar que cada sessão receba a melhor luz orgânica e dedicação total da equipe.
                  </p>

                  {/* LIVE WEATHER WIDGET FOR SELECTED LOCATION IN STEP 2 */}
                  {showWeather && (
                    <div className="mb-4 animate-slide-down">
                      <WeatherWidget locationName={bookingState.location} />
                    </div>
                  )}

                  {/* Optional collapsible solar calculator in step 2 */}
                  {showSolarCalc && (
                    <div className="mb-4 animate-slide-down">
                      <SolarCalculator onNavigate={() => {}} />
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="form-label text-dark-espresso fw-bold mb-3 d-flex align-items-center gap-2">
                      <Calendar size={18} className="text-gold" />
                      <span>Selecione uma Data Disponível em 2026 / 2027:</span>
                    </label>

                    <div className="row g-2">
                      {sampleDates.map((d) => {
                        const isSelected = bookingState.date === d.date;
                        return (
                          <div key={d.date} className="col-6 col-md-4">
                            <button
                              type="button"
                              onClick={() => onUpdateBooking({ date: d.date })}
                              className={`btn w-100 p-3 rounded-3 text-start transition-all d-flex flex-column justify-content-between h-100 ${
                                isSelected
                                  ? 'bg-gourmet-dark text-white fw-bold shadow-md border-0'
                                  : 'bg-white text-dark-espresso border border-warm hover-scale'
                              }`}
                            >
                              <div className="gourmet-mono fs-7">{d.label}</div>
                              <span className={`badge mt-2 align-self-start ${
                                d.status === 'Última Vaga' ? 'bg-danger text-white' : isSelected ? 'badge-gold bg-white' : 'bg-success bg-opacity-15 text-success border border-success border-opacity-25'
                              }`} style={{ fontSize: '0.65rem' }}>
                                {d.status}
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <hr className="border-warm my-4" />

                  <div>
                    <label className="form-label text-dark-espresso fw-bold mb-3 d-flex align-items-center gap-2">
                      <Clock size={18} className="text-terracotta" />
                      <span>Selecione a Condição e Horário Solar:</span>
                    </label>

                    <div className="d-flex flex-column gap-2">
                      {timeSlots.map((ts) => {
                        const isSelected = bookingState.timeSlot === ts.id;
                        return (
                          <div
                            key={ts.id}
                            onClick={() => onUpdateBooking({ timeSlot: ts.id })}
                            className={`p-3 rounded-3 border cursor-pointer transition-all d-flex justify-content-between align-items-center ${
                              isSelected
                                ? 'bg-gourmet-alt border-warm-strong shadow-sm fw-bold'
                                : 'bg-white text-dark-espresso border-warm hover-scale'
                            }`}
                          >
                            <div>
                              <div className="fs-6 fw-semibold text-dark-espresso">{ts.label}</div>
                              <div className={`fs-7 ${isSelected ? 'text-dark-espresso' : 'text-warm-gray'}`}>{ts.desc}</div>
                            </div>
                            <div className="ms-2">
                              {isSelected ? <Check size={20} className="text-success" /> : <div className="rounded-circle border border-warm" style={{ width: '20px', height: '20px' }} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 3: ADICIONAIS EXCLUSIVOS */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h3 className="gourmet-title fw-bold text-dark-espresso mb-2 fs-3">3. Personalize com Adicionais Fine Art</h3>
                  <p className="text-warm-gray mb-4">
                    Eleve o padrão da sua sessão com nossos serviços de apoio técnico, cinema e impressões em papel algodão museu.
                  </p>

                  <div className="d-flex flex-column gap-3">
                    {ADDONS_LIST.map((add) => {
                      const isChecked = bookingState.addons.includes(add.id);
                      return (
                        <div
                          key={add.id}
                          onClick={() => handleToggleAddon(add.id)}
                          className={`p-4 rounded-4 border cursor-pointer transition-all d-flex justify-content-between align-items-center ${
                            isChecked
                              ? 'bg-gourmet-alt border-warm-strong shadow-sm'
                              : 'bg-white border-warm hover-scale'
                          }`}
                          style={{ borderRadius: '18px' }}
                        >
                          <div className="d-flex align-items-center gap-3 pe-3">
                            <div className={`p-3 rounded-circle d-flex align-items-center justify-content-center ${
                              isChecked ? 'bg-gourmet-dark text-gold' : 'bg-gourmet-alt text-warm-gray border border-warm'
                            }`}>
                              <Plus size={20} />
                            </div>
                            <div>
                              <h6 className="text-dark-espresso gourmet-title fw-bold mb-1 fs-5 d-flex align-items-center gap-2">
                                <span>{add.title}</span>
                                {isChecked && <span className="badge badge-gold fs-7">Incluso</span>}
                              </h6>
                              <p className="text-warm-gray fs-7 mb-0">{add.description}</p>
                            </div>
                          </div>

                          <div className="text-end flex-shrink-0">
                            <div className="gourmet-title fw-bold text-dark-espresso fs-4">
                              + R$ {add.price}
                            </div>
                            <div className="text-muted-warm gourmet-mono" style={{ fontSize: '0.68rem' }}>investimento único</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ETAPA 4: DADOS DO CLIENTE E CONTRATO */}
              {currentStep === 4 && (
                <div className="animate-fade-in">
                  <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                    <h3 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-3">4. Seus Dados para Contrato no WhatsApp</h3>
                    <button
                      type="button"
                      onClick={() => setIsContractModalOpen(true)}
                      className="btn btn-sm btn-gourmet-outline py-1 px-3 fs-7 text-terracotta"
                    >
                      <FileText size={14} />
                      <span>Ler Termos LGPD 📜</span>
                    </button>
                  </div>
                  <p className="text-warm-gray mb-4">
                    Preencha as informações abaixo. Ao clicar no botão verde, você será direcionado ao nosso **WhatsApp** com o resumo completo para atendimento prioritário e pagamento do sinal.
                  </p>

                  <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="row g-3">
                    <div className="col-12">
                      <label className="form-label text-dark-espresso fw-semibold fs-7">Nome Completo (ou Nome do Casal / Empresa):</label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control bg-white text-dark-espresso border-warm rounded-pill ps-5 py-3 shadow-sm"
                          placeholder="Ex: Ana Clara & Pedro Henrique"
                          value={bookingState.clientName}
                          onChange={(e) => onUpdateBooking({ clientName: e.target.value })}
                          required
                        />
                        <User size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-gold" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-dark-espresso fw-semibold fs-7">E-mail Profissional ou Pessoal:</label>
                      <div className="position-relative">
                        <input
                          type="email"
                          className="form-control bg-white text-dark-espresso border-warm rounded-pill ps-5 py-3 shadow-sm"
                          placeholder="Ex: ana.clara@email.com"
                          value={bookingState.clientEmail}
                          onChange={(e) => onUpdateBooking({ clientEmail: e.target.value })}
                          required
                        />
                        <Mail size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-gold" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-dark-espresso fw-semibold fs-7">WhatsApp com DDD:</label>
                      <div className="position-relative">
                        <input
                          type="tel"
                          className="form-control bg-white text-dark-espresso border-warm rounded-pill ps-5 py-3 shadow-sm"
                          placeholder="Ex: (81) 99999-9999"
                          value={bookingState.clientPhone}
                          onChange={(e) => onUpdateBooking({ clientPhone: e.target.value })}
                          required
                        />
                        <Phone size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-gold" />
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label text-dark-espresso fw-semibold fs-7">Local Desejado para a Sessão:</label>
                      <select
                        className="form-select bg-white text-dark-espresso border-warm rounded-pill px-4 py-3 mb-2 shadow-sm"
                        value={bookingState.location}
                        onChange={(e) => onUpdateBooking({ location: e.target.value })}
                      >
                        <option value="Estúdio Lumen (São Lourenço da Mata - PE)">Atelier Próprio Lumen (São Lourenço da Mata / Recife - PE)</option>
                        <option value="Praia dos Carneiros / Fernando de Noronha">Praia dos Carneiros / Fernando de Noronha - PE</option>
                        <option value="Recife Antigo / Porto Digital">Recife Antigo / Polo Histórico do Porto Digital</option>
                        <option value="São Paulo - Av. Faria Lima (Estúdio Parceiro)">São Paulo - Estúdio Parceiro Av. Faria Lima</option>
                        <option value="Outro endereço / Destination Wedding">Outro endereço (Especificar nas observações abaixo)</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label text-dark-espresso fw-semibold fs-7">Observações, Inspirações ou Pedidos Especiais:</label>
                      <textarea
                        className="form-control bg-white text-dark-espresso border-warm rounded-4 p-3 shadow-sm"
                        rows={3}
                        placeholder="Conte-nos um pouco sobre a atmosfera que você busca, se haverá convidados especiais, ou envie referências de pastas do Pinterest..."
                        value={bookingState.notes}
                        onChange={(e) => onUpdateBooking({ notes: e.target.value })}
                      />
                    </div>

                    <div className="col-12 pt-2">
                      <div className="bg-gourmet-alt p-4 rounded-4 border border-warm d-flex align-items-center gap-3 shadow-sm">
                        <ShieldCheck size={24} className="text-gold flex-shrink-0" />
                        <span className="text-warm-gray fs-7">
                          Seus dados estão protegidos pela LGPD. Ao avançar, sua solicitação será registrada e abriremos uma conversa no **WhatsApp** com a equipe de atendimento para combinarmos o pagamento com 5% de desconto no PIX.
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Bottom Wizard Navigation Buttons */}
              <div className="d-flex justify-content-between align-items-center pt-4 mt-5 border-top border-warm">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="btn-gourmet-outline px-4 py-2"
                  >
                    <ArrowLeft size={16} />
                    <span>Voltar Etapa</span>
                  </button>
                ) : <div />}

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className={`btn rounded-pill px-5 py-3 fw-bold d-flex align-items-center gap-2 shadow-lg hover-scale ${
                    currentStep === 4 ? 'btn-success text-white' : 'btn-gourmet-primary'
                  }`}
                  style={currentStep === 4 ? { background: '#25D366', borderColor: '#25D366' } : undefined}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner-border spinner-border-sm text-white" role="status" />
                      <span>Conectando ao WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      {currentStep === 4 ? <Phone size={18} /> : null}
                      <span>{currentStep === 4 ? 'Finalizar Reserva no WhatsApp 💬' : 'Próxima Etapa'}</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Order Summary (Resumo do Pedido em Tempo Real) */}
          <div className="col-lg-4">
            <div className="card-gourmet p-4 position-sticky top-0 mt-2 shadow-lg" style={{ borderRadius: '24px', top: '100px', background: '#FFFFFF' }}>
              <div className="d-flex align-items-center justify-content-between pb-3 border-bottom border-warm">
                <span className="gourmet-mono fw-bold text-uppercase tracking-wider text-dark-espresso fs-7">
                  RESUMO DO ATELIER
                </span>
                <span className="badge badge-gold px-2 py-1 fs-7">AO VIVO</span>
              </div>

              <div className="py-3 border-bottom border-warm">
                <div className="text-warm-gray fs-7 mb-1">Módulo Selecionado:</div>
                <h5 className="gourmet-title text-dark-espresso fw-bold mb-1 fs-4">{selectedPackage.title}</h5>
                <div className="d-flex justify-content-between align-items-center gourmet-mono text-dark-espresso mt-2">
                  <span>Preço Base:</span>
                  <span className="fw-bold">R$ {selectedPackage.price.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              {/* Selected Addons */}
              <div className="py-3 border-bottom border-warm">
                <div className="text-warm-gray fs-7 mb-2">Adicionais Inclusos ({bookingState.addons.length}):</div>
                {bookingState.addons.length === 0 ? (
                  <div className="text-muted-warm fs-7 font-italic">Nenhum adicional selecionado</div>
                ) : (
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                    {bookingState.addons.map(addId => {
                      const add = ADDONS_LIST.find(a => a.id === addId);
                      if (!add) return null;
                      return (
                        <li key={addId} className="d-flex justify-content-between align-items-center fs-7 text-dark-espresso">
                          <span className="text-truncate pe-2">• {add.title}</span>
                          <span className="gourmet-mono text-terracotta fw-semibold">+R$ {add.price}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Date & Time Info */}
              <div className="py-3 border-bottom border-warm text-warm-gray fs-7">
                <div className="d-flex justify-content-between mb-1">
                  <span>Data do Ensaio:</span>
                  <span className="text-dark-espresso fw-semibold">{bookingState.date || 'Não selecionada'}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Horário Solar:</span>
                  <span className="text-dark-espresso fw-semibold">{bookingState.timeSlot || 'Não selecionado'}</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="pt-4">
                <div className="d-flex justify-content-between align-items-baseline mb-3">
                  <span className="gourmet-title text-dark-espresso fw-bold fs-4">Total Geral:</span>
                  <div className="text-end gourmet-title">
                    <span className="text-muted-warm fs-6 me-1">R$</span>
                    <span className="display-6 fw-bolder text-terracotta" style={{ color: '#A86A3D' }}>
                      {calculateTotal(bookingState.packageId, bookingState.addons).toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="bg-gourmet-alt p-3 rounded-3 text-center mb-3 border border-warm">
                  <span className="badge bg-success bg-opacity-15 text-success border border-success border-opacity-25 gourmet-mono fs-7 pe-2 me-1">⚡ 5% OFF NO PIX</span>
                  <span className="text-dark-espresso fs-7 gourmet-mono fw-bold">
                    R$ {(calculateTotal(bookingState.packageId, bookingState.addons) * 0.95).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} à vista
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-2 text-warm-gray fs-7 text-center">
                  <Award size={14} className="text-gold" />
                  <span>Finalização & Contrato via WhatsApp</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <ContractModal 
          isOpen={isContractModalOpen}
          onClose={() => setIsContractModalOpen(false)}
          clientName={bookingState.clientName}
          packageTitle={selectedPackage.title}
        />

      </div>
    </div>
  );
};
