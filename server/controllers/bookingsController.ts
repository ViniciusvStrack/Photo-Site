import { Request, Response, NextFunction } from 'express';
import { dbManager } from '../db/database';
import { BookingRow, CreateBookingDto, ApiResponse, BlockedSlotRow, ReminderRow } from '../types';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto: CreateBookingDto = req.body;

    // Check if slot is already taken on that date (in bookings OR blocked_slots)
    const existingBooking = await dbManager.queryOne<BookingRow>(
      `SELECT * FROM bookings WHERE date = ? AND time_slot = ? AND status != 'cancelled'`,
      [dto.date, dto.timeSlot]
    );

    const existingBlock = await dbManager.queryOne<BlockedSlotRow>(
      `SELECT * FROM blocked_slots WHERE date = ? AND time_slot = ?`,
      [dto.date, dto.timeSlot]
    );

    if (existingBooking || existingBlock) {
      return res.status(409).json({
        success: false,
        error: 'Conflito de Horário',
        message: `O horário ${dto.timeSlot} na data ${dto.date} já está reservado ou bloqueado pelo atelier. Por favor, escolha outra vaga no calendário.`
      });
    }

    const id = `book-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const code = `#LUMEN-${Math.floor(10000 + Math.random() * 90000)}`;

    await dbManager.run(
      `INSERT INTO bookings (id, code, package_id, date, time_slot, location, custom_location, client_name, client_email, client_phone, notes, total_price, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        code,
        dto.packageId,
        dto.date,
        dto.timeSlot,
        dto.location,
        dto.customLocation || null,
        dto.clientName,
        dto.clientEmail,
        dto.clientPhone,
        dto.notes || null,
        dto.totalPrice,
        'pending'
      ]
    );

    // Insert addons
    if (dto.addons && dto.addons.length > 0) {
      for (const addonId of dto.addons) {
        await dbManager.run(`INSERT INTO booking_addons (booking_id, addon_id) VALUES (?, ?)`, [id, addonId]);
      }
    }

    const response: ApiResponse = {
      success: true,
      data: {
        id,
        code,
        status: 'pending',
        date: dto.date,
        timeSlot: dto.timeSlot,
        totalPrice: dto.totalPrice
      },
      message: 'Solicitação criada com sucesso. Redirecionando para o WhatsApp do atelier.'
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export const getBookingByCode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const cleanCode = code.startsWith('#') ? code : `#${code}`;

    const booking = await dbManager.queryOne<BookingRow>(`SELECT * FROM bookings WHERE code = ?`, [cleanCode]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Reserva não encontrada',
        message: `Nenhuma reserva com o código ${cleanCode} foi encontrada em nosso banco de dados.`
      });
    }

    // Get addons
    const addonRows = await dbManager.query<{ addon_id: string }>(
      `SELECT addon_id FROM booking_addons WHERE booking_id = ?`,
      [booking.id]
    );

    res.json({
      success: true,
      data: {
        id: booking.id,
        code: booking.code,
        packageId: booking.package_id,
        date: booking.date,
        timeSlot: booking.time_slot,
        location: booking.location,
        clientName: booking.client_name,
        clientEmail: booking.client_email,
        clientPhone: booking.client_phone,
        notes: booking.notes,
        totalPrice: booking.total_price,
        status: booking.status,
        paymentMethod: booking.payment_method,
        addons: addonRows.map(r => r.addon_id),
        createdAt: booking.created_at
      }
    });
  } catch (err) {
    next(err);
  }
};

export const checkAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
      return res.status(400).json({ success: false, error: 'Parâmetro date é obrigatório.' });
    }

    const takenSlotsBookings = await dbManager.query<{ time_slot: string }>(
      `SELECT time_slot FROM bookings WHERE date = ? AND status != 'cancelled'`,
      [date]
    );

    const takenSlotsBlocked = await dbManager.query<{ time_slot: string }>(
      `SELECT time_slot FROM blocked_slots WHERE date = ?`,
      [date]
    );

    const allSlots = [
      '09:00 - Manhã Suave (Luz Leste)',
      '15:30 - Golden Hour (Luz Dourada)',
      '17:00 - Pôr do Sol & Crepúsculo',
      '19:00 - Atelier Noturno Chiaroscuro'
    ];

    const takenSet = new Set([
      ...takenSlotsBookings.map(r => r.time_slot),
      ...takenSlotsBlocked.map(r => r.time_slot)
    ]);

    const available = allSlots.filter(s => !Array.from(takenSet).some(t => t.startsWith(s.slice(0, 5)) || s.startsWith(t.slice(0, 5))));

    res.json({
      success: true,
      data: {
        date,
        takenSlots: Array.from(takenSet),
        availableSlots: available
      }
    });
  } catch (err) {
    next(err);
  }
};

// --- ADMIN SCHEDULE & BOOKING MANAGEMENT ENDPOINTS ---

export const getBlockedSlots = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await dbManager.query<BlockedSlotRow>(`SELECT * FROM blocked_slots ORDER BY date ASC`);
    const data = rows.map(r => ({
      id: r.id,
      date: r.date,
      timeSlot: r.time_slot,
      reason: r.reason,
      createdAt: r.created_at
    }));
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const blockSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, timeSlot, reason } = req.body;
    if (!date || !timeSlot) {
      return res.status(400).json({ success: false, error: 'Data e horário são obrigatórios para bloquear vaga.' });
    }

    const existing = await dbManager.queryOne<BlockedSlotRow>(
      `SELECT * FROM blocked_slots WHERE date = ? AND time_slot = ?`,
      [date, timeSlot]
    );
    if (existing) {
      return res.status(409).json({ success: false, error: 'Este horário já está bloqueado no banco de dados.' });
    }

    const id = `blk-${Date.now()}`;
    await dbManager.run(
      `INSERT INTO blocked_slots (id, date, time_slot, reason) VALUES (?, ?, ?, ?)`,
      [id, date, timeSlot, reason || 'Bloqueio administrativo do atelier']
    );

    res.status(201).json({
      success: true,
      data: { id, date, timeSlot, reason },
      message: `Vaga ${timeSlot} em ${date} bloqueada com sucesso no calendário!`
    });
  } catch (err) {
    next(err);
  }
};

export const unblockSlot = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await dbManager.run(`DELETE FROM blocked_slots WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Horário liberado no calendário com sucesso!' });
  } catch (err) {
    next(err);
  }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await dbManager.query<BookingRow>(`SELECT * FROM bookings ORDER BY created_at DESC`);
    const data = rows.map(r => ({
      id: r.id,
      code: r.code,
      packageId: r.package_id,
      date: r.date,
      timeSlot: r.time_slot,
      location: r.location,
      clientName: r.client_name,
      clientEmail: r.client_email,
      clientPhone: r.client_phone,
      notes: r.notes,
      totalPrice: r.total_price,
      status: r.status,
      createdAt: r.created_at
    }));
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Status inválido.' });
    }

    await dbManager.run(`UPDATE bookings SET status = ? WHERE id = ?`, [status, id]);
    res.json({ success: true, message: `Status da reserva atualizado para ${status}!` });
  } catch (err) {
    next(err);
  }
};

// --- PERSONAL REMINDER AGENDA (FOR MARIA CLARA / VINICIUS) ---

export const getReminders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await dbManager.query<ReminderRow>(`SELECT * FROM reminders ORDER BY date ASC, time ASC`);
    const data = rows.map(r => ({
      id: r.id,
      date: r.date,
      time: r.time,
      title: r.title,
      tag: r.tag,
      createdAt: r.created_at
    }));
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const createReminder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, time, title, tag } = req.body;
    if (!date || !time || !title) {
      return res.status(400).json({ success: false, error: 'Data, horário e título são obrigatórios para lembrete.' });
    }

    const id = `rem-${Date.now()}`;
    await dbManager.run(
      `INSERT INTO reminders (id, date, time, title, tag) VALUES (?, ?, ?, ?, ?)`,
      [id, date, time, title, tag || 'Pessoal']
    );

    res.status(201).json({
      success: true,
      data: { id, date, time, title, tag: tag || 'Pessoal' },
      message: 'Lembrete salvo com sucesso na agenda de Maria Clara!'
    });
  } catch (err) {
    next(err);
  }
};

export const deleteReminder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await dbManager.run(`DELETE FROM reminders WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Lembrete concluído / removido com sucesso!' });
  } catch (err) {
    next(err);
  }
};
