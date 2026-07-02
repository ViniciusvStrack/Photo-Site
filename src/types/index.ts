export type PageType = 
  | 'home' 
  | 'portfolio' 
  | 'about' 
  | 'services' 
  | 'booking' 
  | 'portal'
  | 'account'
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'admin' | 'client';
  provider: 'google' | 'email' | 'system';
  verifiedAt: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'casamento' | 'retrato' | 'comercial' | 'natureza' | 'editorial';
  categoryLabel: string;
  url: string;
  fallbackSvg: string; // SVG data URI or custom canvas code for offline
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
  exif: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
    focalLength: string;
  };
  location: string;
  date: string;
  likes: number;
  description: string;
  featured?: boolean;
}

export interface ServicePackage {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  period: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  recommendedFor: string;
  duration: string;
  deliverables: string;
}

export interface AddonItem {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
}

export interface BookingState {
  packageId: string | null;
  date: string;
  timeSlot: string;
  location: string;
  customLocation: string;
  addons: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
  totalPrice: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  fallbackInitials: string;
  text: string;
  rating: number;
  serviceUsed: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  favoriteGear: string;
  imageUrl: string;
}

export interface ClientPortalSession {
  id: string;
  accessCode: string;
  clientName: string;
  eventTitle: string;
  eventDate: string;
  status: 'Em Edição' | 'Aguardando Seleção' | 'Aprovado' | 'Concluído';
  totalPhotos: number;
  selectedCount: number;
  maxSelection: number;
  coverUrl: string;
  photos: {
    id: string;
    url: string;
    title: string;
    selected: boolean;
    favorite: boolean;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickAction?: {
    label: string;
    action: 'whatsapp' | 'booking' | 'packages' | 'portal';
  };
}

export interface BlockedSlot {
  id: string;
  date: string;
  timeSlot: string;
  reason?: string;
  createdAt: string;
}

export interface Reminder {
  id: string;
  date: string;
  time: string;
  title: string;
  tag: 'Ensaio' | 'Reunião' | 'Edição' | 'Pessoal';
  createdAt: string;
}

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  rain: number;
  condition: string;
  lightingAdvice: string;
}
