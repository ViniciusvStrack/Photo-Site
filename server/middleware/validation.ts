import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createBookingSchema = z.object({
  packageId: z.string().min(1, 'ID do pacote é obrigatório'),
  date: z.string().min(1, 'Data do agendamento é obrigatória'),
  timeSlot: z.string().min(1, 'Horário solar é obrigatório'),
  location: z.string().min(1, 'Local do ensaio é obrigatório'),
  customLocation: z.string().optional(),
  addons: z.array(z.string()).default([]),
  clientName: z.string().min(2, 'Nome do cliente é obrigatório (mínimo 2 caracteres)'),
  clientEmail: z.string().email('E-mail profissional inválido'),
  clientPhone: z.string().min(8, 'WhatsApp/Telefone é obrigatório'),
  notes: z.string().optional(),
  totalPrice: z.number().positive('Preço total deve ser positivo')
});

export const simulatePaymentSchema = z.object({
  bookingCode: z.string().min(1, 'Código de reserva é obrigatório'),
  amount: z.number().positive('Valor do pagamento é obrigatório'),
  method: z.enum(['pix', 'card', 'apple']),
  cardData: z.object({
    number: z.string().min(15, 'Número do cartão inválido'),
    holder: z.string().min(2, 'Nome do titular do cartão é obrigatório'),
    expiry: z.string().min(4, 'Validade do cartão é obrigatória'),
    cvv: z.string().min(3, 'Código CVV inválido'),
    installments: z.number().min(1).max(12)
  }).optional()
});

export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      if (err instanceof z.ZodError || err.errors || err.issues) {
        const issues = err.errors || err.issues || [];
        return res.status(400).json({
          success: false,
          error: 'Erro de validação nos dados fornecidos',
          details: Array.isArray(issues) 
            ? issues.map((e: any) => ({ field: e.path?.join('.') || 'body', message: e.message || 'Valor inválido' }))
            : [{ field: 'body', message: err.message || 'Valor inválido' }]
        });
      }
      next(err);
    }
  };
};
