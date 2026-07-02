import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * MONGODB CLOUD ADAPTER FOR LUMEN ATELIER
 * -----------------------------------------------------
 * Para hospedar o back-end em nuvem (MongoDB Atlas + Render/Railway/Vercel):
 * 1. Crie uma conta gratuita em mongodb.com (MongoDB Atlas).
 * 2. Crie um cluster gratuito "M0 Free" e pegue sua MONGODB_URI.
 * 3. No servidor na nuvem, defina a variável de ambiente:
 *    MONGODB_URI=mongodb+srv://viniciuvstrack:<senha>@cluster0.mongodb.net/lumen_atelier?retryWrites=true&w=majority
 * 4. Ao iniciar, o servidor conectará aos schemas abaixo!
 */

export async function connectMongoDB(uri: string): Promise<void> {
  try {
    console.log('[MongoDB] Conectando ao cluster nuvem MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('🟢 [MongoDB] Conexão estabelecida com sucesso no MongoDB Atlas!');
  } catch (err) {
    console.error('🔴 [MongoDB] Erro na conexão com o cluster:', err);
    throw err;
  }
}

// --- 1. PHOTO SCHEMA ---
export interface IPhotoDocument extends Document {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  url: string;
  fallbackSvg: string;
  aspectRatio: string;
  exif: { camera: string; lens: string; aperture: string; shutter: string; iso: string; focalLength: string; };
  location: string;
  date: string;
  likes: number;
  description: string;
  featured: boolean;
  createdAt: Date;
}

const PhotoSchema = new Schema<IPhotoDocument>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true, index: true },
  categoryLabel: { type: String, required: true },
  url: { type: String, required: true },
  fallbackSvg: { type: String, required: true },
  aspectRatio: { type: String, default: 'auto' },
  exif: {
    camera: String, lens: String, aperture: String, shutter: String, iso: String, focalLength: String
  },
  location: { type: String, required: true },
  date: { type: String, required: true },
  likes: { type: Number, default: 0 },
  description: { type: String, required: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const PhotoModel: Model<IPhotoDocument> = mongoose.models.Photo || mongoose.model<IPhotoDocument>('Photo', PhotoSchema);

// --- 2. BOOKING SCHEMA ---
export interface IBookingDocument extends Document {
  id: string;
  code: string;
  packageId: string;
  date: string;
  timeSlot: string;
  location: string;
  customLocation?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  addons: string[];
  createdAt: Date;
}

const BookingSchema = new Schema<IBookingDocument>({
  id: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true, index: true },
  packageId: { type: String, required: true },
  date: { type: String, required: true, index: true },
  timeSlot: { type: String, required: true },
  location: { type: String, required: true },
  customLocation: String,
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true, index: true },
  clientPhone: { type: String, required: true },
  notes: String,
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  addons: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export const BookingModel: Model<IBookingDocument> = mongoose.models.Booking || mongoose.model<IBookingDocument>('Booking', BookingSchema);

// --- 3. BLOCKED SLOTS SCHEMA (Admin Schedule Control) ---
export interface IBlockedSlotDocument extends Document {
  id: string;
  date: string;
  timeSlot: string;
  reason?: string;
  createdAt: Date;
}

const BlockedSlotSchema = new Schema<IBlockedSlotDocument>({
  id: { type: String, required: true, unique: true },
  date: { type: String, required: true, index: true },
  timeSlot: { type: String, required: true },
  reason: { type: String, default: 'Bloqueio administrativo do atelier' },
  createdAt: { type: Date, default: Date.now }
});

BlockedSlotSchema.index({ date: 1, timeSlot: 1 }, { unique: true });

export const BlockedSlotModel: Model<IBlockedSlotDocument> = mongoose.models.BlockedSlot || mongoose.model<IBlockedSlotDocument>('BlockedSlot', BlockedSlotSchema);

// --- 4. CLIENT PORTAL SCHEMA ---
export interface IClientPortalDocument extends Document {
  id: string;
  accessCode: string;
  clientName: string;
  eventTitle: string;
  eventDate: string;
  status: string;
  totalPhotos: number;
  selectedCount: number;
  maxSelection: number;
  coverUrl: string;
  photos: Array<{ id: string; url: string; title: string; selected: boolean; favorite: boolean; }>;
}

const ClientPortalSchema = new Schema<IClientPortalDocument>({
  id: { type: String, required: true, unique: true },
  accessCode: { type: String, required: true, unique: true, index: true },
  clientName: { type: String, required: true },
  eventTitle: { type: String, required: true },
  eventDate: { type: String, required: true },
  status: { type: String, default: 'Aguardando Seleção' },
  totalPhotos: { type: Number, default: 0 },
  selectedCount: { type: Number, default: 0 },
  maxSelection: { type: Number, default: 30 },
  coverUrl: { type: String, required: true },
  photos: [{
    id: String, url: String, title: String, selected: Boolean, favorite: Boolean
  }]
});

export const ClientPortalModel: Model<IClientPortalDocument> = mongoose.models.ClientPortal || mongoose.model<IClientPortalDocument>('ClientPortal', ClientPortalSchema);
