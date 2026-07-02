import { dbManager } from './database';

export const createSchema = async (): Promise<void> => {
  console.log('[Schema] Initializing database tables...');
  
  const schemaSql = `
    CREATE TABLE IF NOT EXISTS photos (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      category_label TEXT NOT NULL,
      url TEXT NOT NULL,
      fallback_svg TEXT NOT NULL,
      aspect_ratio TEXT DEFAULT 'auto',
      camera TEXT NOT NULL,
      lens TEXT NOT NULL,
      aperture TEXT NOT NULL,
      shutter TEXT NOT NULL,
      iso TEXT NOT NULL,
      focal_length TEXT NOT NULL,
      location TEXT NOT NULL,
      date TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      description TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS packages (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      price REAL NOT NULL,
      period TEXT NOT NULL,
      badge TEXT,
      popular INTEGER DEFAULT 0,
      features TEXT NOT NULL,
      recommended_for TEXT NOT NULL,
      duration TEXT NOT NULL,
      deliverables TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS addons (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      icon TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      package_id TEXT NOT NULL,
      date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      location TEXT NOT NULL,
      custom_location TEXT,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      client_phone TEXT NOT NULL,
      notes TEXT,
      total_price REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      payment_method TEXT,
      payment_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (package_id) REFERENCES packages(id)
    );

    CREATE TABLE IF NOT EXISTS booking_addons (
      booking_id TEXT NOT NULL,
      addon_id TEXT NOT NULL,
      PRIMARY KEY (booking_id, addon_id),
      FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
      FOREIGN KEY (addon_id) REFERENCES addons(id)
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      avatar_url TEXT NOT NULL,
      fallback_initials TEXT NOT NULL,
      text TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      service_used TEXT NOT NULL,
      date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS team (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT NOT NULL,
      specialty TEXT NOT NULL,
      favorite_gear TEXT NOT NULL,
      image_url TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS client_portals (
      id TEXT PRIMARY KEY,
      access_code TEXT UNIQUE NOT NULL,
      client_name TEXT NOT NULL,
      event_title TEXT NOT NULL,
      event_date TEXT NOT NULL,
      status TEXT DEFAULT 'Aguardando Seleção',
      total_photos INTEGER DEFAULT 0,
      selected_count INTEGER DEFAULT 0,
      max_selection INTEGER DEFAULT 30,
      cover_url TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS portal_photos (
      id TEXT PRIMARY KEY,
      portal_id TEXT NOT NULL,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      selected INTEGER DEFAULT 0,
      favorite INTEGER DEFAULT 0,
      FOREIGN KEY (portal_id) REFERENCES client_portals(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS blocked_slots (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      reason TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(date, time_slot)
    );

    CREATE TABLE IF NOT EXISTS reminders (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      title TEXT NOT NULL,
      tag TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_photos_category ON photos(category);
    CREATE INDEX IF NOT EXISTS idx_bookings_code ON bookings(code);
    CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(client_email);
    CREATE INDEX IF NOT EXISTS idx_portals_code ON client_portals(access_code);
    CREATE INDEX IF NOT EXISTS idx_portal_photos_portal ON portal_photos(portal_id);
    CREATE INDEX IF NOT EXISTS idx_blocked_slots_date ON blocked_slots(date);
    CREATE INDEX IF NOT EXISTS idx_reminders_date ON reminders(date);
  `;

  await dbManager.exec(schemaSql);
  console.log('[Schema] Tables and indexes created successfully.');
};
