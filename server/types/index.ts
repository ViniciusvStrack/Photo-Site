export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PhotoRow {
  id: string;
  title: string;
  category: string;
  category_label: string;
  url: string;
  fallback_svg: string;
  aspect_ratio?: string;
  camera: string;
  lens: string;
  aperture: string;
  shutter: string;
  iso: string;
  focal_length: string;
  location: string;
  date: string;
  likes: number;
  description: string;
  featured: number;
  created_at: string;
}

export interface PackageRow {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  period: string;
  badge?: string;
  popular: number;
  features: string; // JSON string
  recommended_for: string;
  duration: string;
  deliverables: string;
}

export interface AddonRow {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
}

export interface BookingRow {
  id: string;
  code: string;
  package_id: string;
  date: string;
  time_slot: string;
  location: string;
  custom_location?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  notes?: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_method?: string;
  payment_id?: string;
  created_at: string;
}

export interface CreateBookingDto {
  packageId: string;
  date: string;
  timeSlot: string;
  location: string;
  customLocation?: string;
  addons: string[];
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  totalPrice: number;
}

export interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar_url: string;
  fallback_initials: string;
  text: string;
  rating: number;
  service_used: string;
  date: string;
}

export interface TeamRow {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  favorite_gear: string;
  image_url: string;
}

export interface ClientPortalRow {
  id: string;
  access_code: string;
  client_name: string;
  event_title: string;
  event_date: string;
  status: 'Em Edição' | 'Aguardando Seleção' | 'Aprovado' | 'Concluído';
  total_photos: number;
  selected_count: number;
  max_selection: number;
  cover_url: string;
}

export interface PortalPhotoRow {
  id: string;
  portal_id: string;
  url: string;
  title: string;
  selected: number;
  favorite: number;
}

export interface BlockedSlotRow {
  id: string;
  date: string;
  time_slot: string;
  reason?: string;
  created_at: string;
}

export interface ReminderRow {
  id: string;
  date: string;
  time: string;
  title: string;
  tag: string;
  created_at: string;
}
