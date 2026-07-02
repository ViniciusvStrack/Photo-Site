import { Request, Response, NextFunction } from 'express';
import { dbManager } from '../db/database';
import { PaymentSimulationDto, BookingRow, ApiResponse } from '../types';

export const simulatePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto: PaymentSimulationDto = req.body;
    const cleanCode = dto.bookingCode.startsWith('#') ? dto.bookingCode : `#${dto.bookingCode}`;

    // Verify booking
    const booking = await dbManager.queryOne<BookingRow>(`SELECT * FROM bookings WHERE code = ?`, [cleanCode]);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Reserva não encontrada',
        message: `Não foi possível processar o pagamento para a reserva ${cleanCode}.`
      });
    }

    const paymentId = `pay-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const isApproved = true; // Simulated instant approval

    // Save payment record
    await dbManager.run(
      `INSERT INTO payments (id, booking_code, amount, method, status, transaction_data)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        paymentId,
        cleanCode,
        dto.amount,
        dto.method,
        isApproved ? 'approved' : 'failed',
        JSON.stringify({
          cardHolder: dto.cardData?.holder || 'N/A',
          installments: dto.cardData?.installments || 1,
          timestamp: new Date().toISOString()
        })
      ]
    );

    // Update booking status to confirmed/paid
    if (isApproved) {
      await dbManager.run(
        `UPDATE bookings SET status = 'confirmed', payment_method = ?, payment_id = ? WHERE code = ?`,
        [dto.method, paymentId, cleanCode]
      );
    }

    const response: ApiResponse = {
      success: true,
      data: {
        paymentId,
        bookingCode: cleanCode,
        amount: dto.amount,
        method: dto.method,
        status: isApproved ? 'approved' : 'failed',
        receiptCode: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
        processedAt: new Date().toISOString()
      },
      message: 'Pagamento processado com sucesso em nosso gateway criptografado!'
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const paymentWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingCode, status, method, transactionId } = req.body;

    if (!bookingCode || !status) {
      return res.status(400).json({ success: false, error: 'Dados incompletos no webhook.' });
    }

    const cleanCode = bookingCode.startsWith('#') ? bookingCode : `#${bookingCode}`;

    await dbManager.run(
      `UPDATE bookings SET status = ?, payment_method = ?, payment_id = ? WHERE code = ?`,
      [status === 'approved' ? 'confirmed' : 'cancelled', method || 'webhook', transactionId || 'webhook-id', cleanCode]
    );

    res.json({ success: true, message: `Status da reserva ${cleanCode} atualizado para ${status}.` });
  } catch (err) {
    next(err);
  }
};
