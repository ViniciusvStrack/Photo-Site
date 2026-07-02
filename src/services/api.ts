import type { PhotoItem, ServicePackage, AddonItem, BookingState, Testimonial, TeamMember, ClientPortalSession, BlockedSlot, Reminder, WeatherData } from '../types';
import { MOCK_PHOTOS, SERVICE_PACKAGES, ADDONS_LIST, TESTIMONIALS, TEAM_MEMBERS, MOCK_CLIENT_PORTALS } from '../data/mockData';

// Production-ready environment link: uses cloud backend if configured, defaults to local
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001/api';

// Local offline fallback state for Admin Management
let fallbackPhotos: PhotoItem[] = [...MOCK_PHOTOS];

let fallbackBlockedSlots: BlockedSlot[] = [
  { id: 'blk-1', date: '2026-07-25', timeSlot: '17:00 - Pôr do Sol & Crepúsculo', reason: 'Ensaio Externo Editorial Reservado', createdAt: '2026-07-01' },
  { id: 'blk-2', date: '2026-08-01', timeSlot: '15:30 - Golden Hour (Luz Dourada)', reason: 'Workshop de Direção e Luz Natural', createdAt: '2026-07-01' }
];

let fallbackReminders: Reminder[] = [
  { id: 'rem-1', date: '2026-07-10', time: '14:00', title: 'Reunião de Alinhamento e Contrato com Noiva Ana Clara', tag: 'Reunião', createdAt: '2026-07-01' },
  { id: 'rem-2', date: '2026-07-11', time: '09:00', title: 'Ensaio Retrato Executivo Dr. Marcos (Faria Lima)', tag: 'Ensaio', createdAt: '2026-07-01' },
  { id: 'rem-3', date: '2026-07-15', time: '18:30', title: 'Curadoria de 600 fotos RAW e Envio para Encadernação em Couro', tag: 'Edição', createdAt: '2026-07-01' }
];

let fallbackBookings: any[] = [
  {
    id: 'book-1',
    code: '#LUMEN-94827',
    packageId: 'pkg-wedding',
    date: '2026-07-18',
    timeSlot: '15:30 - Golden Hour (Luz Dourada)',
    location: 'Praia dos Carneiros / Fernando de Noronha - PE',
    clientName: 'Ana Clara & Pedro Henrique',
    clientEmail: 'ana.clara@email.com',
    clientPhone: '(81) 99888-7777',
    notes: 'Casamento ao pôr do sol, cerca de 150 convidados.',
    totalPrice: 9350,
    status: 'confirmed',
    createdAt: '2026-07-01'
  }
];

/**
 * Helper to check if API is available, otherwise falls back to local mock data
 */
async function fetchWithFallback<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2200); // 2.2s timeout for local API

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resJson = await response.json();
    return resJson.data || resJson;
  } catch (err) {
    console.warn(`[API Fallback] Backend offline or unreachable at ${endpoint}. Using local fallback data.`, err);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw err;
  }
}

export const apiService = {
  // 1. Photos
  getPhotos: async (category?: string, search?: string): Promise<PhotoItem[]> => {
    const params = new URLSearchParams();
    if (category && category !== 'todos') params.append('category', category);
    if (search) params.append('search', search);
    const queryString = params.toString() ? `?${params.toString()}` : '';

    let filtered = [...fallbackPhotos];
    if (category && category !== 'todos') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s) || p.location.toLowerCase().includes(s));
    }

    return fetchWithFallback<PhotoItem[]>(`/photos${queryString}`, undefined, filtered);
  },

  likePhoto: async (id: string): Promise<{ id: string; likes: number }> => {
    fallbackPhotos = fallbackPhotos.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
    const found = fallbackPhotos.find(p => p.id === id);
    return fetchWithFallback<{ id: string; likes: number }>(
      `/photos/${id}/like`, 
      { method: 'POST' }, 
      { id, likes: found?.likes || 100 }
    );
  },

  createPhoto: async (photoData: Partial<PhotoItem>): Promise<any> => {
    const newPho: PhotoItem = {
      id: `pho-${Date.now()}`,
      title: photoData.title || 'Nova Obra Fine Art',
      category: photoData.category || 'casamento',
      categoryLabel: photoData.categoryLabel || 'Casamentos & Eventos',
      url: photoData.url || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      fallbackSvg: photoData.fallbackSvg || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23F5F2EB"/><circle cx="400" cy="300" r="140" fill="none" stroke="rgba(197,160,89,0.4)" stroke-width="2"/><text x="400" y="480" font-family="serif" font-size="28" fill="%231C1B18" text-anchor="middle">${(photoData.title || 'NOVA OBRA').toUpperCase()}</text></svg>`,
      aspectRatio: photoData.aspectRatio || 'landscape',
      exif: photoData.exif || {
        camera: 'Sony Alpha 1',
        lens: 'FE 85mm f/1.4 GM',
        aperture: 'f/1.4',
        shutter: '1/2000s',
        iso: 'ISO 100',
        focalLength: '85mm'
      },
      location: photoData.location || 'Recife / PE',
      date: photoData.date || new Date().toLocaleDateString('pt-BR'),
      likes: 0,
      description: photoData.description || 'Obra fine art curada sob direção de Maria Clara no Lumen Atelier.',
      featured: Boolean(photoData.featured)
    };
    fallbackPhotos.unshift(newPho);

    return fetchWithFallback<any>(
      '/photos/admin',
      {
        method: 'POST',
        body: JSON.stringify(photoData)
      },
      newPho
    );
  },

  updatePhoto: async (id: string, photoData: Partial<PhotoItem>): Promise<any> => {
    fallbackPhotos = fallbackPhotos.map(p => p.id === id ? { ...p, ...photoData } : p);
    return fetchWithFallback<any>(
      `/photos/admin/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(photoData)
      },
      { success: true }
    );
  },

  deletePhoto: async (id: string): Promise<any> => {
    fallbackPhotos = fallbackPhotos.filter(p => p.id !== id);
    return fetchWithFallback<any>(`/photos/admin/${id}`, { method: 'DELETE' }, { success: true });
  },

  // 2. Services & Packages
  getPackages: async (): Promise<ServicePackage[]> => {
    return fetchWithFallback<ServicePackage[]>('/services/packages', undefined, SERVICE_PACKAGES);
  },

  getAddons: async (): Promise<AddonItem[]> => {
    return fetchWithFallback<AddonItem[]>('/services/addons', undefined, ADDONS_LIST);
  },

  // 3. Bookings & Availability
  checkAvailability: async (date: string): Promise<{ date: string; takenSlots: string[]; availableSlots: string[] }> => {
    const allSlots = [
      '09:00 - Manhã Suave (Luz Leste)',
      '15:30 - Golden Hour (Luz Dourada)',
      '17:00 - Pôr do Sol & Crepúsculo',
      '19:00 - Atelier Noturno Chiaroscuro'
    ];

    const takenFromBookings = fallbackBookings
      .filter(b => b.date === date && b.status !== 'cancelled')
      .map(b => b.timeSlot);
      
    const takenFromBlocked = fallbackBlockedSlots
      .filter(blk => blk.date === date)
      .map(blk => blk.timeSlot);

    const takenSet = Array.from(new Set([...takenFromBookings, ...takenFromBlocked]));
    const available = allSlots.filter(s => !takenSet.some(t => t.startsWith(s.slice(0, 5)) || s.startsWith(t.slice(0, 5))));

    return fetchWithFallback<{ date: string; takenSlots: string[]; availableSlots: string[] }>(
      `/bookings/availability?date=${date}`,
      undefined,
      { date, takenSlots: takenSet, availableSlots: available }
    );
  },

  createBooking: async (bookingData: Partial<BookingState>): Promise<{ id: string; code: string; status: string }> => {
    const newBooking = {
      id: `book-${Date.now()}`,
      code: `#LUMEN-${Math.floor(10000 + Math.random() * 90000)}`,
      packageId: bookingData.packageId,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      location: bookingData.location,
      clientName: bookingData.clientName,
      clientEmail: bookingData.clientEmail,
      clientPhone: bookingData.clientPhone,
      notes: bookingData.notes,
      totalPrice: bookingData.totalPrice,
      status: 'pending',
      createdAt: new Date().toLocaleDateString('pt-BR')
    };
    fallbackBookings.unshift(newBooking);

    return fetchWithFallback<{ id: string; code: string; status: string }>(
      '/bookings',
      {
        method: 'POST',
        body: JSON.stringify(bookingData)
      },
      { id: newBooking.id, code: newBooking.code, status: 'pending' }
    );
  },

  getBookingByCode: async (code: string): Promise<any> => {
    const cleanCode = code.replace('#', '');
    const found = fallbackBookings.find(b => b.code.replace('#', '') === cleanCode);
    return fetchWithFallback<any>(`/bookings/${cleanCode}`, undefined, found || null);
  },

  // 4. Admin Schedule Control, Reminders & Bookings Management
  getBlockedSlots: async (): Promise<BlockedSlot[]> => {
    return fetchWithFallback<BlockedSlot[]>('/bookings/admin/blocked', undefined, fallbackBlockedSlots);
  },

  blockSlot: async (date: string, timeSlot: string, reason?: string): Promise<BlockedSlot> => {
    const newBlock: BlockedSlot = {
      id: `blk-${Date.now()}`,
      date,
      timeSlot,
      reason: reason || 'Bloqueio administrativo do atelier',
      createdAt: new Date().toLocaleDateString('pt-BR')
    };
    fallbackBlockedSlots.push(newBlock);

    return fetchWithFallback<BlockedSlot>(
      '/bookings/admin/block',
      {
        method: 'POST',
        body: JSON.stringify({ date, timeSlot, reason })
      },
      newBlock
    );
  },

  unblockSlot: async (id: string): Promise<any> => {
    fallbackBlockedSlots = fallbackBlockedSlots.filter(b => b.id !== id);
    return fetchWithFallback<any>(`/bookings/admin/block/${id}`, { method: 'DELETE' }, { success: true });
  },

  getReminders: async (): Promise<Reminder[]> => {
    return fetchWithFallback<Reminder[]>('/bookings/admin/reminders', undefined, fallbackReminders);
  },

  createReminder: async (date: string, time: string, title: string, tag: string): Promise<Reminder> => {
    const newRem: Reminder = {
      id: `rem-${Date.now()}`,
      date,
      time,
      title,
      tag: (tag as any) || 'Pessoal',
      createdAt: new Date().toLocaleDateString('pt-BR')
    };
    fallbackReminders.push(newRem);

    return fetchWithFallback<Reminder>(
      '/bookings/admin/reminders',
      {
        method: 'POST',
        body: JSON.stringify({ date, time, title, tag })
      },
      newRem
    );
  },

  deleteReminder: async (id: string): Promise<any> => {
    fallbackReminders = fallbackReminders.filter(r => r.id !== id);
    return fetchWithFallback<any>(`/bookings/admin/reminders/${id}`, { method: 'DELETE' }, { success: true });
  },

  getAllBookings: async (): Promise<any[]> => {
    return fetchWithFallback<any[]>('/bookings/admin/all', undefined, fallbackBookings);
  },

  updateBookingStatus: async (id: string, status: string): Promise<any> => {
    fallbackBookings = fallbackBookings.map(b => b.id === id ? { ...b, status } : b);
    return fetchWithFallback<any>(
      `/bookings/admin/status/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status })
      },
      { success: true }
    );
  },

  // 5. Client Portal
  loginPortal: async (accessCode: string): Promise<ClientPortalSession> => {
    return fetchWithFallback<ClientPortalSession>(
      '/portal/login',
      {
        method: 'POST',
        body: JSON.stringify({ accessCode })
      },
      MOCK_CLIENT_PORTALS.find(p => p.accessCode === accessCode.trim().toUpperCase()) || MOCK_CLIENT_PORTALS[0]
    );
  },

  toggleSelectPhoto: async (accessCode: string, photoId: string): Promise<any> => {
    return fetchWithFallback<any>(`/portal/${accessCode}/select/${photoId}`, { method: 'POST' }, { success: true });
  },

  toggleFavoritePhoto: async (accessCode: string, photoId: string): Promise<any> => {
    return fetchWithFallback<any>(`/portal/${accessCode}/favorite/${photoId}`, { method: 'POST' }, { success: true });
  },

  approveAlbumSelection: async (accessCode: string): Promise<any> => {
    return fetchWithFallback<any>(`/portal/${accessCode}/approve`, { method: 'POST' }, { success: true, status: 'Aprovado' });
  },

  // 6. General
  getTestimonials: async (): Promise<Testimonial[]> => {
    return fetchWithFallback<Testimonial[]>('/testimonials', undefined, TESTIMONIALS);
  },

  getTeam: async (): Promise<TeamMember[]> => {
    return fetchWithFallback<TeamMember[]>('/team', undefined, TEAM_MEMBERS);
  },

  // 7. AI Chatbot
  chatWithAi: async (message: string): Promise<any> => {
    return fetchWithFallback<any>(
      '/ai/chat',
      {
        method: 'POST',
        body: JSON.stringify({ message })
      },
      undefined
    );
  },

  // 8. Live Weather / Climate Data API (Open-Meteo)
  getLiveWeather: async (locationKey: string): Promise<WeatherData> => {
    const coords: Record<string, { lat: number; lng: number; name: string }> = {
      noronha: { lat: -3.8573, lng: -32.4297, name: 'Fernando de Noronha - PE' },
      carneiros: { lat: -8.7061, lng: -35.0805, name: 'Praia dos Carneiros - PE' },
      recife: { lat: -8.0632, lng: -34.8711, name: 'Recife Antigo / Porto Digital' },
      sp: { lat: -23.5874, lng: -46.6811, name: 'São Paulo - Av. Faria Lima' },
      europa: { lat: 38.7223, lng: -9.1393, name: 'Europa / Lisboa (Destination)' }
    };

    const target = coords[locationKey] || coords.recife;

    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 3000);
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${target.lat}&longitude=${target.lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,cloud_cover,wind_speed_10m&timezone=America%2FNew_York`;
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(id);

      if (!res.ok) throw new Error('Open-Meteo API unreachable');
      const data = await res.json();
      const c = data.current;

      let condition = 'Céu Limpo & Brisa Litorânea';
      let lightingAdvice = '✨ Luz direta límpida de alta nitidez. Ideal para retratos em f/1.2 com grande profundidade e cores saturadas.';

      if (c.cloud_cover > 70) {
        condition = 'Nublado Difuso (Softbox Natural)';
        lightingAdvice = '☁️ As nuvens espessas funcionam como um gigantesco difusor natural sueco! Perfeito para retratos executivos e noivas sem sombras duras no rosto.';
      } else if (c.cloud_cover > 30) {
        condition = 'Parcialmente Nublado / Luz Dourada';
        lightingAdvice = '☀️ Luz filtrada espetacular para Golden Hour! Nuvens esparsas refletem os raios laranjas do crepúsculo no mar e casarões.';
      }

      if (c.precipitation > 0) {
        condition = 'Chuva Costeira / Intempérie';
        lightingAdvice = '🌧️ Probabilidade de chuva costal — nossa equipe estará preparada com iluminação portátil selada Profoto ou efetuaremos o reagendamento sem custo!';
      }

      return {
        temp: Math.round(c.temperature_2m),
        feelsLike: Math.round(c.apparent_temperature),
        humidity: Math.round(c.relative_humidity_2m),
        windSpeed: Math.round(c.wind_speed_10m),
        cloudCover: Math.round(c.cloud_cover),
        rain: c.precipitation,
        condition,
        lightingAdvice
      };
    } catch (err) {
      return {
        temp: locationKey === 'sp' ? 22 : 28,
        feelsLike: locationKey === 'sp' ? 23 : 30,
        humidity: 68,
        windSpeed: 18,
        cloudCover: 25,
        rain: 0,
        condition: 'Luz Atlântica & Céu Azul Límpido',
        lightingAdvice: '✨ Luz solar rasante direta excelente para Golden Hour! Nuvens esparsas refletem os raios laranjas do crepúsculo no mar e casarões coloniais.'
      };
    }
  }
};
