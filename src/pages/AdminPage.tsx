import React, { useState, useEffect } from 'react';
import type { PageType, BlockedSlot, UserProfile, Reminder, PhotoItem } from '../types';
import { apiService } from '../services/api';
import { Calendar, Lock, Unlock, CheckCircle2, XCircle, User, Phone, ShieldCheck, RefreshCw, Sparkles, AlertTriangle, ShieldAlert, Plus, Tag, Clock, Image as ImageIcon, Edit3 } from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageType) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate, currentUser, onOpenAuthModal }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'bookings' | 'reminders' | 'portfolio'>('schedule');
  
  // Schedule state
  const [selectedDate, setSelectedDate] = useState<string>('2026-07-25');
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  
  // New reminder form
  const [remDate, setRemDate] = useState<string>('2026-07-18');
  const [remTime, setRemTime] = useState<string>('14:30');
  const [remTitle, setRemTitle] = useState<string>('');
  const [remTag, setRemTag] = useState<string>('Ensaio');

  // Portfolio Management Form (For Maria Clara)
  const [isEditingPhoto, setIsEditingPhoto] = useState<boolean>(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [phoTitle, setPhoTitle] = useState<string>('');
  const [phoCat, setPhoCat] = useState<'casamento' | 'retrato' | 'comercial' | 'natureza' | 'editorial'>('casamento');
  const [phoUrl, setPhoUrl] = useState<string>('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80');
  const [phoLoc, setPhoLoc] = useState<string>('Fernando de Noronha - PE');
  const [phoDate, setPhoDate] = useState<string>('Julho 2026');
  const [phoCam, setPhoCam] = useState<string>('Sony Alpha 1');
  const [phoLens, setPhoLens] = useState<string>('FE 85mm f/1.4 GM');
  const [phoAperture, setPhoAperture] = useState<string>('f/1.4');
  const [phoIso, setPhoIso] = useState<string>('ISO 100');
  const [phoDesc, setPhoDesc] = useState<string>('Obra fine art curada sob direção de Maria Clara no Lumen Atelier.');
  const [phoFeatured, setPhoFeatured] = useState<boolean>(true);

  const [blockReason, setBlockReason] = useState<string>('Ensaio Externo Editorial / Compromisso do Atelier');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string>('');

  const allTimeSlots = [
    '09:00 - Manhã Suave (Luz Leste)',
    '15:30 - Golden Hour (Luz Dourada)',
    '17:00 - Pôr do Sol & Crepúsculo',
    '19:00 - Atelier Noturno Chiaroscuro'
  ];

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const [blocks, bookings, rems, phos] = await Promise.all([
        apiService.getBlockedSlots(),
        apiService.getAllBookings(),
        apiService.getReminders(),
        apiService.getPhotos()
      ]);
      setBlockedSlots(blocks || []);
      setAllBookings(bookings || []);
      setReminders(rems || []);
      setPhotos(phos || []);
    } catch (err) {
      console.error('Erro ao carregar dados administrativos:', err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      loadAdminData();
    }
  }, [currentUser]);

  // SECURITY GUARD: If not logged in as Admin, block access!
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 min-vh-100 d-flex align-items-center justify-content-center bg-gourmet-main">
        <div className="container max-w-600 py-5 text-center">
          <div className="card-gourmet p-5 shadow-lg border border-warm" style={{ borderRadius: '28px', background: '#FFFFFF' }}>
            <div className="bg-gourmet-dark text-white rounded-circle p-4 d-inline-flex mx-auto mb-4 shadow-sm">
              <ShieldAlert size={40} className="text-gold" />
            </div>
            <span className="badge bg-danger text-white rounded-pill px-3 py-1 mb-3">
              ACESSO RESTRITO • PROTOCOLO DE SEGURANÇA
            </span>
            <h2 className="gourmet-title fw-bold text-dark-espresso mb-2 fs-3">Área Exclusiva para Gestão do Atelier</h2>
            <p className="text-warm-gray mb-4 gourmet-sans" style={{ lineHeight: '1.6' }}>
              O painel de controle da agenda solar, contratos e portfólio é restrito a **Maria Clara** (Dona / Diretora) e **Vinicius Strack** (Desenvolvedor). Clientes não possuem acesso a esta área.
            </p>
            <div className="d-flex flex-column gap-2 max-w-350 mx-auto">
              <button
                onClick={onOpenAuthModal}
                className="btn-gourmet-gold py-3 shadow-md fw-bold d-flex align-items-center justify-content-center gap-2"
              >
                <Lock size={16} />
                <span>Autenticar via Google Identity</span>
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="btn btn-link text-warm-gray text-decoration-none py-2 fs-7"
              >
                ← Voltar para o Início
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleBlockSlot = async (timeSlot: string) => {
    try {
      await apiService.blockSlot(selectedDate, timeSlot, blockReason);
      setActionMessage(`🔒 Horário ${timeSlot.slice(0, 5)} em ${selectedDate} bloqueado com sucesso!`);
      setTimeout(() => setActionMessage(''), 4000);
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Erro ao bloquear horário');
    }
  };

  const handleUnblockSlot = async (blockId: string) => {
    try {
      await apiService.unblockSlot(blockId);
      setActionMessage(`🔓 Horário liberado com sucesso no calendário público!`);
      setTimeout(() => setActionMessage(''), 4000);
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Erro ao liberar horário');
    }
  };

  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await apiService.updateBookingStatus(bookingId, status);
      setActionMessage(`✅ Status da reserva atualizado para "${status.toUpperCase()}"!`);
      setTimeout(() => setActionMessage(''), 4000);
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Erro ao atualizar reserva');
    }
  };

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remTitle.trim()) return;
    try {
      await apiService.createReminder(remDate, remTime, remTitle, remTag);
      setRemTitle('');
      setActionMessage(`📌 Compromisso "${remTitle}" salvo com sucesso na agenda pessoal de Maria Clara!`);
      setTimeout(() => setActionMessage(''), 4000);
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Erro ao salvar lembrete');
    }
  };

  const handleDeleteReminder = async (remId: string) => {
    try {
      await apiService.deleteReminder(remId);
      setActionMessage(`✔️ Lembrete concluído/removido da agenda!`);
      setTimeout(() => setActionMessage(''), 4000);
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Erro ao remover lembrete');
    }
  };

  // --- PORTFOLIO MANAGEMENT ACTIONS (FOR MARIA CLARA) ---
  const handleStartNewPhoto = () => {
    setEditingPhotoId(null);
    setPhoTitle('Casamento ao Entardecer em Noronha');
    setPhoCat('casamento');
    setPhoUrl('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85');
    setPhoLoc('Fernando de Noronha - PE');
    setPhoDate('Julho 2026');
    setPhoCam('Sony Alpha 1');
    setPhoLens('FE 85mm f/1.4 GM');
    setPhoAperture('f/1.4');
    setPhoIso('ISO 100');
    setPhoDesc('Obra fine art capturada sob direção de Maria Clara no Lumen Atelier.');
    setPhoFeatured(true);
    setIsEditingPhoto(true);
  };

  const handleStartEditPhoto = (photo: PhotoItem) => {
    setEditingPhotoId(photo.id);
    setPhoTitle(photo.title);
    setPhoCat(photo.category);
    setPhoUrl(photo.url);
    setPhoLoc(photo.location);
    setPhoDate(photo.date);
    setPhoCam(photo.exif.camera);
    setPhoLens(photo.exif.lens);
    setPhoAperture(photo.exif.aperture);
    setPhoIso(photo.exif.iso);
    setPhoDesc(photo.description);
    setPhoFeatured(Boolean(photo.featured));
    setIsEditingPhoto(true);
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoTitle.trim() || !phoUrl.trim()) {
      alert('Por favor, informe o título e o link (URL) da fotografia.');
      return;
    }

    const catLabels: Record<string, string> = {
      casamento: 'Casamentos & Eventos',
      retrato: 'Retratos & Branding',
      comercial: 'Comercial & Arquitetura',
      natureza: 'Natureza & Fine Art',
      editorial: 'Moda & Editorial'
    };

    const photoData: Partial<PhotoItem> = {
      title: phoTitle,
      category: phoCat,
      categoryLabel: catLabels[phoCat] || 'Fine Art',
      url: phoUrl,
      location: phoLoc,
      date: phoDate,
      description: phoDesc,
      featured: phoFeatured,
      exif: {
        camera: phoCam,
        lens: phoLens,
        aperture: phoAperture,
        shutter: '1/2000s',
        iso: phoIso,
        focalLength: phoLens.includes('85mm') ? '85mm' : '50mm'
      }
    };

    try {
      if (editingPhotoId) {
        await apiService.updatePhoto(editingPhotoId, photoData);
        setActionMessage(`✏️ Obra "${phoTitle}" atualizada no acervo com sucesso!`);
      } else {
        await apiService.createPhoto(photoData);
        setActionMessage(`✨ Nova obra "${phoTitle}" publicada na galeria do atelier!`);
      }
      setIsEditingPhoto(false);
      setTimeout(() => setActionMessage(''), 4000);
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Erro ao salvar fotografia');
    }
  };

  const handleDeletePhoto = async (id: string, title: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir a obra "${title}" da galeria pública?`)) return;
    try {
      await apiService.deletePhoto(id);
      setActionMessage(`🗑️ Obra "${title}" removida do acervo público!`);
      setTimeout(() => setActionMessage(''), 4000);
      loadAdminData();
    } catch (err: any) {
      alert(err.message || 'Erro ao remover fotografia');
    }
  };

  // Helper to check status of a specific slot on selectedDate
  const getSlotStatus = (timeSlot: string) => {
    const booking = allBookings.find(b => b.date === selectedDate && b.timeSlot.startsWith(timeSlot.slice(0, 5)) && b.status !== 'cancelled');
    if (booking) {
      return { type: 'booking', data: booking };
    }
    const block = blockedSlots.find(blk => blk.date === selectedDate && blk.timeSlot.startsWith(timeSlot.slice(0, 5)));
    if (block) {
      return { type: 'blocked', data: block };
    }
    return { type: 'available', data: null };
  };

  return (
    <div className="animate-fade-in text-dark-espresso pt-5 mt-4 px-3 px-md-4 pb-5 bg-gourmet-main min-vh-100">
      <div className="container pt-4">
        
        {/* Admin Header */}
        <div className="card-gourmet p-4 p-md-5 mb-5 shadow-lg border border-warm" style={{ borderRadius: '28px', background: '#FFFFFF' }}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <span className="badge badge-gold px-3 py-1">
                  GESTÃO DO ATELIER • LUMEN CLOUD
                </span>
                <span className="badge badge-sage px-3 py-1">
                  👑 {currentUser.name.toUpperCase()}
                </span>
              </div>
              <h1 className="display-6 fw-bold text-dark-espresso mb-1 gourmet-title">Controle de Horários, Acervo & Clientes</h1>
              <p className="text-warm-gray mb-0 gourmet-sans fs-6">
                Bem-vinda, **Maria Clara** (e Dev **Vinicius Strack**). Gerencie sua agenda solar, adicione novas fotos no portfólio sem código ou inspecione contratos.
              </p>
            </div>

            <div className="d-flex gap-2 flex-shrink-0 flex-wrap">
              <button
                onClick={loadAdminData}
                disabled={isLoading}
                className="btn-gourmet-outline px-4 py-2 d-flex align-items-center gap-2"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin text-gold' : 'text-gold'} />
                <span>Atualizar Banco</span>
              </button>
              <button
                onClick={() => onNavigate('booking')}
                className="btn-gourmet-primary px-4 py-2"
              >
                <span>Ver Calendário Público</span>
              </button>
            </div>
          </div>

          {/* Action Alert Banner */}
          {actionMessage && (
            <div className="alert alert-success bg-gourmet-alt border border-warm text-dark-espresso mt-4 mb-0 py-3 rounded-4 d-flex align-items-center gap-2 animate-bounce shadow-sm">
              <Sparkles size={18} className="text-gold flex-shrink-0" />
              <span className="fw-semibold">{actionMessage}</span>
            </div>
          )}

          {/* Admin Navigation Tabs */}
          <div className="d-flex rounded-pill bg-gourmet-alt p-1 border border-warm mt-4 overflow-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`btn rounded-pill flex-fill py-2 fw-bold transition-all d-flex align-items-center justify-content-center gap-2 text-nowrap px-3 ${
                activeTab === 'schedule' ? 'bg-gourmet-dark text-white shadow-sm' : 'text-warm-gray hover-text-dark bg-transparent border-0'
              }`}
              style={{ fontSize: '0.85rem' }}
            >
              <Calendar size={16} />
              <span>🗓️ Bloqueios Solares ({blockedSlots.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`btn rounded-pill flex-fill py-2 fw-bold transition-all d-flex align-items-center justify-content-center gap-2 text-nowrap px-3 ${
                activeTab === 'portfolio' ? 'bg-gourmet-dark text-white shadow-sm' : 'text-warm-gray hover-text-dark bg-transparent border-0'
              }`}
              style={{ fontSize: '0.85rem' }}
            >
              <ImageIcon size={16} />
              <span>🖼️ Acervo & Portfólio ({photos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('reminders')}
              className={`btn rounded-pill flex-fill py-2 fw-bold transition-all d-flex align-items-center justify-content-center gap-2 text-nowrap px-3 ${
                activeTab === 'reminders' ? 'bg-gourmet-dark text-white shadow-sm' : 'text-warm-gray hover-text-dark bg-transparent border-0'
              }`}
              style={{ fontSize: '0.85rem' }}
            >
              <Clock size={16} />
              <span>📌 Agenda Maria Clara ({reminders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`btn rounded-pill flex-fill py-2 fw-bold transition-all d-flex align-items-center justify-content-center gap-2 text-nowrap px-3 ${
                activeTab === 'bookings' ? 'bg-gourmet-dark text-white shadow-sm' : 'text-warm-gray hover-text-dark bg-transparent border-0'
              }`}
              style={{ fontSize: '0.85rem' }}
            >
              <User size={16} />
              <span>📋 Reservas de Clientes ({allBookings.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CONTROLE DE AGENDA E BLOQUEIOS SOLARES */}
        {activeTab === 'schedule' && (
          <div className="animate-fade-in row g-4">
            <div className="col-lg-5">
              <div className="card-gourmet p-4 p-md-5 h-100" style={{ borderRadius: '24px', background: '#FFFFFF' }}>
                <h4 className="gourmet-title fw-bold text-dark-espresso mb-3 fs-4 d-flex align-items-center gap-2">
                  <Calendar size={20} className="text-gold" />
                  <span>1. Selecione a Data Solar:</span>
                </h4>
                <p className="text-warm-gray fs-7 mb-3">
                  Escolha qualquer dia no calendário para inspecionar ou bloquear horários específicos.
                </p>

                <div className="mb-4">
                  <input
                    type="date"
                    className="form-control bg-gourmet-alt text-dark-espresso border-warm rounded-pill px-4 py-3 fw-bold gourmet-mono shadow-sm"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-dark-espresso fw-semibold fs-7 d-flex align-items-center gap-2">
                    <Lock size={15} className="text-terracotta" />
                    <span>Motivo ou Descrição do Bloqueio (Interno):</span>
                  </label>
                  <input
                    type="text"
                    className="form-control bg-white text-dark-espresso border-warm rounded-pill px-4 py-2 gourmet-sans fs-7 shadow-sm"
                    placeholder="Ex: Ensaio Externo, Workshop, Compromisso Pessoal..."
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                  />
                </div>

                <div className="p-4 bg-gourmet-alt rounded-4 border border-warm">
                  <h6 className="fw-bold text-dark-espresso mb-2 fs-7 d-flex align-items-center gap-2">
                    <ShieldCheck size={16} className="text-gold" />
                    <span>Como funciona a sincronização ao vivo?</span>
                  </h6>
                  <p className="text-warm-gray fs-7 mb-0" style={{ lineHeight: '1.6' }}>
                    Ao clicar em **"🔒 Bloquear"** ao lado de qualquer horário, ele se torna imediatamente indisponível na tela pública de agendamento do website. Os clientes verão a indicação **"Vaga Ocupada"**.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card-gourmet p-4 p-md-5 h-100 d-flex flex-column justify-content-between" style={{ borderRadius: '24px', background: '#FFFFFF' }}>
                <div>
                  <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-warm flex-wrap gap-2">
                    <h4 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-4">
                      2. Horários de {selectedDate.split('-').reverse().join('/')}:
                    </h4>
                    <span className="badge badge-gold">4 VAGAS SOLARES</span>
                  </div>

                  <div className="d-flex flex-column gap-3 mb-4">
                    {allTimeSlots.map((ts) => {
                      const status = getSlotStatus(ts);
                      return (
                        <div
                          key={ts}
                          className={`p-4 rounded-4 border transition-all d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 ${
                            status.type === 'available'
                              ? 'bg-white border-warm shadow-sm'
                              : status.type === 'booking'
                                ? 'bg-gourmet-alt border-warm-strong shadow-sm'
                                : 'bg-gourmet-alt border-danger border-opacity-25 shadow-sm'
                          }`}
                          style={{ borderRadius: '18px' }}
                        >
                          <div>
                            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                              <span className="fw-bold text-dark-espresso fs-6">{ts}</span>
                              {status.type === 'available' && <span className="badge bg-success text-white px-2 py-1 fs-7">Disponível</span>}
                              {status.type === 'booking' && <span className="badge bg-primary text-white px-2 py-1 fs-7">Ocupado por Cliente</span>}
                              {status.type === 'blocked' && <span className="badge bg-danger text-white px-2 py-1 fs-7">Bloqueado pelo Atelier</span>}
                            </div>
                            
                            {status.type === 'booking' && (
                              <div className="text-warm-gray fs-7 gourmet-sans">
                                👤 Cliente: <strong className="text-dark-espresso">{status.data.clientName}</strong> ({status.data.code}) • <span className="gourmet-mono text-terracotta">R$ {status.data.totalPrice}</span>
                              </div>
                            )}

                            {status.type === 'blocked' && (
                              <div className="text-danger fs-7 font-italic gourmet-sans">
                                🔒 Motivo: {status.data.reason}
                              </div>
                            )}
                          </div>

                          <div className="flex-shrink-0 align-self-end align-self-sm-center">
                            {status.type === 'available' && (
                              <button
                                onClick={() => handleBlockSlot(ts)}
                                className="btn btn-sm btn-outline-danger rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-1 hover-scale"
                              >
                                <Lock size={14} />
                                <span>Bloquear Horário</span>
                              </button>
                            )}

                            {status.type === 'blocked' && (
                              <button
                                onClick={() => handleUnblockSlot(status.data.id)}
                                className="btn btn-sm btn-success text-white rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-1 hover-scale"
                                style={{ background: '#5F7367', borderColor: '#5F7367' }}
                              >
                                <Unlock size={14} />
                                <span>Liberar Horário</span>
                              </button>
                            )}

                            {status.type === 'booking' && (
                              <button
                                onClick={() => setActiveTab('bookings')}
                                className="btn btn-sm btn-gourmet-outline px-3 py-2 fw-semibold"
                              >
                                <User size={14} />
                                <span>Gerenciar Reserva</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* All Active Blocks summary box */}
                <div className="pt-3 border-top border-warm">
                  <h6 className="fw-bold text-dark-espresso mb-2 fs-7 gourmet-mono text-uppercase tracking-wider">
                    📌 Todos os Dias Bloqueados no Banco ({blockedSlots.length}):
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {blockedSlots.length === 0 ? (
                      <span className="text-muted-warm fs-7 font-italic">Nenhum bloqueio manual ativo</span>
                    ) : (
                      blockedSlots.map(blk => (
                        <span key={blk.id} className="badge badge-gourmet bg-white p-2 d-flex align-items-center gap-2 border border-warm shadow-sm">
                          <span>📅 {blk.date.split('-').reverse().join('/')} • {blk.timeSlot.slice(0, 5)}</span>
                          <button onClick={() => handleUnblockSlot(blk.id)} className="btn btn-link text-danger p-0 ms-1" title="Liberar vaga">
                            ✕
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PORTFOLIO & GALLERY VISUAL MANAGER (FOR MARIA CLARA) */}
        {activeTab === 'portfolio' && (
          <div className="animate-fade-in">
            {/* Top Bar for Portfolio */}
            <div className="card-gourmet p-4 mb-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3" style={{ background: '#FFFFFF' }}>
              <div>
                <h3 className="gourmet-title fw-bold text-dark-espresso mb-1 fs-4 d-flex align-items-center gap-2">
                  <ImageIcon size={22} className="text-gold" />
                  <span>Gerenciador Visual de Obras Fine Art ({photos.length})</span>
                </h3>
                <p className="text-warm-gray fs-7 mb-0">
                  Adicione, edite ou exclua fotos do portfólio de forma 100% prática e visual. As mudanças aparecem instantaneamente no site!
                </p>
              </div>

              {!isEditingPhoto && (
                <button
                  onClick={handleStartNewPhoto}
                  className="btn-gourmet-gold px-4 py-3 shadow-md d-flex align-items-center gap-2 flex-shrink-0"
                >
                  <Plus size={18} />
                  <span>➕ Publicar Nova Obra</span>
                </button>
              )}
            </div>

            {/* Editing / Creating Photo Form */}
            {isEditingPhoto && (
              <div className="card-gourmet p-4 p-md-5 mb-5 shadow-lg border border-gold animate-slide-down" style={{ borderRadius: '24px', background: '#FFFFFF', borderColor: '#C5A059' }}>
                <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-warm">
                  <h4 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-3 d-flex align-items-center gap-2">
                    <Edit3 size={22} className="text-terracotta" />
                    <span>{editingPhotoId ? `✏️ Editar Obra: "${phoTitle}"` : '➕ Publicar Nova Obra no Acervo'}</span>
                  </h4>
                  <span className="badge badge-gold">MÓDULO SIMPLIFICADO PARA MARIA CLARA</span>
                </div>

                <form onSubmit={handleSavePhoto} className="row g-4">
                  <div className="col-md-7">
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label text-dark-espresso fw-bold fs-7">Título da Obra / Ensaio:</label>
                        <input
                          type="text"
                          className="form-control bg-white text-dark-espresso border-warm rounded-pill px-4 py-2 fw-semibold"
                          placeholder="Ex: O Voto ao Entardecer em Noronha"
                          value={phoTitle}
                          onChange={(e) => setPhoTitle(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-dark-espresso fw-bold fs-7">Categoria Principal:</label>
                        <select
                          className="form-select bg-white text-dark-espresso border-warm rounded-pill px-4 py-2 gourmet-mono fs-7"
                          value={phoCat}
                          onChange={(e) => setPhoCat(e.target.value as any)}
                        >
                          <option value="casamento">💍 Casamento & Bodas</option>
                          <option value="retrato">👔 Retrato & Branding</option>
                          <option value="comercial">🏢 Comercial & Arquitetura</option>
                          <option value="natureza">🌿 Fine Art & Natureza</option>
                          <option value="editorial">👗 Moda & Editorial Vogue</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label text-dark-espresso fw-bold fs-7">Locação:</label>
                        <input
                          type="text"
                          className="form-control bg-white text-dark-espresso border-warm rounded-pill px-4 py-2 fs-7"
                          placeholder="Ex: Fernando de Noronha - PE"
                          value={phoLoc}
                          onChange={(e) => setPhoLoc(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label text-dark-espresso fw-bold fs-7">Link (URL) da Fotografia em Alta Definição:</label>
                        <input
                          type="url"
                          className="form-control bg-gourmet-alt text-dark-espresso border-warm rounded-pill px-4 py-2 gourmet-mono fs-7"
                          placeholder="https://images.unsplash.com/photo-..."
                          value={phoUrl}
                          onChange={(e) => setPhoUrl(e.target.value)}
                          required
                        />
                        <div className="form-text fs-7 text-muted-warm mt-1">
                          💡 *Dica Maria Clara:* Cole o link do Unsplash, Google Drive ou servidor em nuvem. Veja o preview ao lado!
                        </div>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label text-dark-espresso fw-bold fs-7">Câmera:</label>
                        <input
                          type="text"
                          className="form-control bg-white text-dark-espresso border-warm rounded-pill px-3 py-2 gourmet-mono fs-7"
                          value={phoCam}
                          onChange={(e) => setPhoCam(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-dark-espresso fw-bold fs-7">Lente Prime:</label>
                        <input
                          type="text"
                          className="form-control bg-white text-dark-espresso border-warm rounded-pill px-3 py-2 gourmet-mono fs-7"
                          value={phoLens}
                          onChange={(e) => setPhoLens(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label text-dark-espresso fw-bold fs-7">Abertura & ISO:</label>
                        <div className="d-flex gap-1">
                          <input
                            type="text"
                            className="form-control bg-white text-dark-espresso border-warm rounded-pill px-2 py-2 gourmet-mono fs-7"
                            value={phoAperture}
                            onChange={(e) => setPhoAperture(e.target.value)}
                            placeholder="f/1.4"
                          />
                          <input
                            type="text"
                            className="form-control bg-white text-dark-espresso border-warm rounded-pill px-2 py-2 gourmet-mono fs-7"
                            value={phoIso}
                            onChange={(e) => setPhoIso(e.target.value)}
                            placeholder="ISO 100"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label text-dark-espresso fw-bold fs-7">Descrição Artística / Storytelling:</label>
                        <textarea
                          className="form-control bg-white text-dark-espresso border-warm rounded-4 p-3 fs-7"
                          rows={3}
                          value={phoDesc}
                          onChange={(e) => setPhoDesc(e.target.value)}
                        />
                      </div>

                      <div className="col-12">
                        <div className="form-check form-switch d-flex align-items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="featuredSwitch"
                            checked={phoFeatured}
                            onChange={(e) => setPhoFeatured(e.target.checked)}
                            style={{ width: '2.5em', height: '1.25em', cursor: 'pointer' }}
                          />
                          <label className="form-check-label fw-bold text-dark-espresso cursor-pointer select-none" htmlFor="featuredSwitch">
                            ✨ Exibir na Vitrine Principal (Página Início)?
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Photo Preview Box */}
                  <div className="col-md-5 d-flex flex-column justify-content-between">
                    <div>
                      <label className="form-label text-dark-espresso fw-bold fs-7 mb-2">Pré-visualização ao Vivo:</label>
                      <div className="card-gourmet overflow-hidden p-2 bg-gourmet-alt border border-warm shadow-sm text-center" style={{ borderRadius: '20px' }}>
                        <img
                          src={phoUrl}
                          alt="Live Preview"
                          className="w-100 object-fit-cover rounded-4 shadow-sm"
                          style={{ height: '260px' }}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'; }}
                        />
                        <div className="p-3 text-start">
                          <span className="badge badge-gold mb-1">{phoCat.toUpperCase()}</span>
                          <h6 className="gourmet-title fw-bold text-dark-espresso mb-1 text-truncate">{phoTitle || 'Título da Obra'}</h6>
                          <div className="text-warm-gray fs-7 gourmet-mono text-truncate">📍 {phoLoc} • {phoAperture}</div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditingPhoto(false)}
                        className="btn btn-gourmet-outline flex-fill py-3"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="btn-gourmet-gold flex-fill py-3 shadow-lg"
                      >
                        <Sparkles size={16} />
                        <span>{editingPhotoId ? 'Salvar Alterações' : '✨ Publicar Obra'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Grid of Existing Photos in Admin */}
            <div className="row g-4">
              {photos.map((p) => (
                <div key={p.id} className="col-sm-6 col-lg-4 col-xl-3">
                  <div className="card-gourmet h-100 d-flex flex-column justify-content-between p-3 border border-warm shadow-sm hover-scale" style={{ borderRadius: '20px', background: '#FFFFFF' }}>
                    <div>
                      <div className="position-relative overflow-hidden rounded-4 mb-3 border border-warm" style={{ height: '200px', background: '#F5F2EB' }}>
                        <img
                          src={p.url}
                          alt={p.title}
                          className="w-100 h-100 object-fit-cover"
                        />
                        <div className="position-absolute top-2 start-2 z-1 d-flex gap-1 flex-wrap">
                          <span className="badge badge-gourmet bg-white shadow-sm">{p.categoryLabel.split('&')[0]}</span>
                          {p.featured && <span className="badge badge-gold bg-white shadow-sm">✨ Vitrine</span>}
                        </div>
                      </div>

                      <h6 className="gourmet-title fw-bold text-dark-espresso mb-1 fs-5 text-truncate">{p.title}</h6>
                      <div className="text-warm-gray fs-7 gourmet-mono text-truncate mb-3">📍 {p.location}</div>
                    </div>

                    <div className="pt-3 border-top border-warm d-flex justify-content-between align-items-center gap-2">
                      <button
                        onClick={() => handleStartEditPhoto(p)}
                        className="btn btn-sm btn-gourmet-outline flex-fill py-2 d-flex align-items-center justify-content-center gap-1"
                        style={{ fontSize: '0.78rem' }}
                      >
                        <Edit3 size={14} className="text-terracotta" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => handleDeletePhoto(p.id, p.title)}
                        className="btn btn-sm btn-outline-danger rounded-circle p-2 flex-shrink-0"
                        title="Remover fotografia"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AGENDA PESSOAL E LEMBRETES DE MARIA CLARA */}
        {activeTab === 'reminders' && (
          <div className="animate-fade-in row g-4">
            <div className="col-lg-5">
              <form onSubmit={handleAddReminder} className="card-gourmet p-4 p-md-5 h-100" style={{ borderRadius: '24px', background: '#FFFFFF' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="badge badge-sage">AGENDA DA DIRETORA CRIATIVA</span>
                </div>
                <h4 className="gourmet-title fw-bold text-dark-espresso mb-2 fs-3">Adicionar Novo Compromisso</h4>
                <p className="text-warm-gray fs-7 mb-4">
                  Anote reuniões com noivas, prazos de entrega de álbuns em couro, workshops ou lembretes pessoais de Maria Clara.
                </p>

                <div className="row g-2 mb-3">
                  <div className="col-7">
                    <label className="form-label text-dark-espresso fw-semibold fs-7">Data:</label>
                    <input
                      type="date"
                      className="form-control bg-gourmet-alt text-dark-espresso border-warm rounded-pill px-3 py-2 gourmet-mono fs-7"
                      value={remDate}
                      onChange={(e) => setRemDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-5">
                    <label className="form-label text-dark-espresso fw-semibold fs-7">Horário:</label>
                    <input
                      type="time"
                      className="form-control bg-gourmet-alt text-dark-espresso border-warm rounded-pill px-3 py-2 gourmet-mono fs-7"
                      value={remTime}
                      onChange={(e) => setRemTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark-espresso fw-semibold fs-7">Título / Descrição do Lembrete:</label>
                  <input
                    type="text"
                    className="form-control bg-white text-dark-espresso border-warm rounded-pill px-4 py-2"
                    placeholder="Ex: Reunião de contrato com noiva Ana Clara..."
                    value={remTitle}
                    onChange={(e) => setRemTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-dark-espresso fw-semibold fs-7">Categoria (Tag):</label>
                  <select
                    className="form-select bg-white text-dark-espresso border-warm rounded-pill px-4 py-2 gourmet-mono fs-7"
                    value={remTag}
                    onChange={(e) => setRemTag(e.target.value)}
                  >
                    <option value="Ensaio">📸 Ensaio / Produção</option>
                    <option value="Reunião">🤝 Reunião com Cliente</option>
                    <option value="Edição">💻 Laboratório de Cor / Pós-Produção</option>
                    <option value="Pessoal">🌸 Compromisso Pessoal / Atelier</option>
                  </select>
                </div>

                <button type="submit" className="btn-gourmet-primary w-100 py-3 shadow-md">
                  <Plus size={16} className="text-gold" />
                  <span>Salvar na Agenda de Maria Clara</span>
                </button>
              </form>
            </div>

            <div className="col-lg-7">
              <div className="card-gourmet p-4 p-md-5 h-100 d-flex flex-column justify-content-between" style={{ borderRadius: '24px', background: '#FFFFFF' }}>
                <div>
                  <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-warm flex-wrap gap-2">
                    <h3 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-3 d-flex align-items-center gap-2">
                      <Clock size={22} className="text-gold" />
                      <span>Compromissos Agendados ({reminders.length})</span>
                    </h3>
                    <span className="badge badge-gold">MARIA CLARA & VINICIUS STRACK</span>
                  </div>

                  {reminders.length === 0 ? (
                    <div className="text-center py-5">
                      <Sparkles size={40} className="text-gold mb-3 opacity-50" />
                      <h5 className="fw-bold text-dark-espresso">Sua agenda de lembretes está livre!</h5>
                      <p className="text-warm-gray">Use o formulário ao lado para anotar tarefas e reuniões importantes do atelier.</p>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {reminders.map((r) => (
                        <div
                          key={r.id}
                          className="p-4 rounded-4 bg-white border border-warm shadow-sm hover-scale d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3"
                          style={{ borderRadius: '18px' }}
                        >
                          <div className="d-flex align-items-start gap-3">
                            <div className="bg-gourmet-alt p-3 rounded-3 text-center border border-warm flex-shrink-0" style={{ minWidth: '70px' }}>
                              <div className="gourmet-mono fw-bold text-gold fs-7">{r.time}</div>
                              <div className="gourmet-mono text-dark-espresso fs-7 fw-semibold">{r.date.split('-').slice(1).reverse().join('/')}</div>
                            </div>

                            <div>
                              <div className="d-flex align-items-center gap-2 mb-1">
                                <span className={`badge rounded-pill ${
                                  r.tag === 'Ensaio' ? 'badge-gold' :
                                  r.tag === 'Reunião' ? 'badge-sage' :
                                  r.tag === 'Edição' ? 'badge-terracotta' : 'badge-gourmet'
                                }`}>
                                  <Tag size={11} className="me-1" />
                                  {r.tag.toUpperCase()}
                                </span>
                                <span className="text-muted-warm fs-7 gourmet-mono">Salvo em {r.createdAt}</span>
                              </div>
                              <h5 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-5">{r.title}</h5>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteReminder(r.id)}
                            className="btn btn-sm btn-outline-success rounded-pill px-3 py-2 fw-semibold d-flex align-items-center gap-1 flex-shrink-0 align-self-end align-self-sm-center"
                            title="Concluir / Remover da agenda"
                          >
                            <CheckCircle2 size={15} />
                            <span>Concluir</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-top border-warm text-muted-warm fs-7 gourmet-mono text-center">
                  💡 *Dica:* Estes compromissos são exclusivos para organização de Maria Clara e não interferem na agenda pública solar do site.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LISTA DE RESERVAS E CLIENTES */}
        {activeTab === 'bookings' && (
          <div className="animate-fade-in card-gourmet p-4 p-md-5" style={{ borderRadius: '24px', background: '#FFFFFF' }}>
            <div className="d-flex justify-content-between align-items-center pb-3 mb-4 border-bottom border-warm flex-wrap gap-2">
              <h3 className="gourmet-title fw-bold text-dark-espresso mb-0 fs-3">
                Solicitações de Reserva Registradas ({allBookings.length})
              </h3>
              <span className="badge badge-gold">ATENDIMENTO VIA WHATSAPP</span>
            </div>

            {allBookings.length === 0 ? (
              <div className="text-center py-5">
                <AlertTriangle size={48} className="text-gold mb-3 opacity-50" />
                <h5 className="fw-bold text-dark-espresso">Nenhuma reserva encontrada</h5>
                <p className="text-warm-gray">Quando clientes enviarem solicitações pelo site, elas aparecerão aqui em tempo real.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr className="gourmet-mono text-muted-warm fs-7 text-uppercase tracking-wider border-bottom border-warm">
                      <th>Código</th>
                      <th>Cliente & WhatsApp</th>
                      <th>Data & Horário Solar</th>
                      <th>Módulo</th>
                      <th>Investimento</th>
                      <th>Status</th>
                      <th className="text-end">Ações Rápidas</th>
                    </tr>
                  </thead>
                  <tbody className="gourmet-sans fs-7 border-0">
                    {allBookings.map((b) => {
                      const cleanPhone = b.clientPhone.replace(/\D/g, '');
                      const waLink = `https://wa.me/55${cleanPhone.startsWith('55') ? cleanPhone.slice(2) : cleanPhone}?text=${encodeURIComponent(`Olá, *${b.clientName}*! Somos a equipe de Maria Clara no Lumen Atelier. Recebemos sua solicitação de reserva (${b.code}) para o dia ${b.date}. ✨ Como podemos auxiliar?`)}`;

                      return (
                        <tr key={b.id} className="border-bottom border-warm">
                          <td className="gourmet-mono fw-bold text-dark-espresso">{b.code}</td>
                          <td>
                            <div className="fw-bold text-dark-espresso fs-6">{b.clientName}</div>
                            <div className="text-warm-gray fs-7 d-flex align-items-center gap-1">
                              <Phone size={12} className="text-gold" />
                              <span>{b.clientPhone}</span>
                            </div>
                          </td>
                          <td>
                            <div className="fw-bold text-dark-espresso">{b.date ? b.date.split('-').reverse().join('/') : 'N/A'}</div>
                            <div className="text-warm-gray">{b.timeSlot}</div>
                          </td>
                          <td>
                            <span className="badge badge-gourmet">{b.packageId?.replace('pkg-', '').toUpperCase()}</span>
                          </td>
                          <td className="gourmet-mono fw-bold text-terracotta fs-6">
                            R$ {b.totalPrice?.toLocaleString('pt-BR')}
                          </td>
                          <td>
                            {b.status === 'confirmed' && <span className="badge bg-success text-white px-3 py-1">Confirmado</span>}
                            {b.status === 'pending' && <span className="badge bg-warning text-dark px-3 py-1">Aguardando Contrato</span>}
                            {b.status === 'cancelled' && <span className="badge bg-danger text-white px-3 py-1">Cancelado / Liberado</span>}
                            {b.status === 'completed' && <span className="badge badge-sage px-3 py-1">Concluído</span>}
                          </td>
                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm text-white fw-bold px-3 py-1 rounded-pill d-flex align-items-center gap-1 shadow-sm"
                                style={{ background: '#25D366' }}
                                title="Abrir conversa no WhatsApp"
                              >
                                <Phone size={13} />
                                <span>WhatsApp</span>
                              </a>

                              {b.status !== 'confirmed' && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')}
                                  className="btn btn-sm btn-outline-success rounded-circle p-2"
                                  title="Confirmar Reserva"
                                >
                                  <CheckCircle2 size={15} />
                                </button>
                              )}

                              {b.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                                  className="btn btn-sm btn-outline-danger rounded-circle p-2"
                                  title="Cancelar / Liberar vaga no calendário"
                                >
                                  <XCircle size={15} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
