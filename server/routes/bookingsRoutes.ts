import { Router } from 'express';
import { createBooking, getBookingByCode, checkAvailability, getBlockedSlots, blockSlot, unblockSlot, getAllBookings, updateBookingStatus, getReminders, createReminder, deleteReminder } from '../controllers/bookingsController';
import { validateBody, createBookingSchema } from '../middleware/validation';

const router = Router();

// Admin Schedule & Reminder Management Endpoints
router.get('/admin/blocked', getBlockedSlots);
router.post('/admin/block', blockSlot);
router.delete('/admin/block/:id', unblockSlot);
router.get('/admin/all', getAllBookings);
router.patch('/admin/status/:id', updateBookingStatus);
router.get('/admin/reminders', getReminders);
router.post('/admin/reminders', createReminder);
router.delete('/admin/reminders/:id', deleteReminder);

// Public Booking Endpoints
router.get('/availability', checkAvailability);
router.get('/:code', getBookingByCode);
router.post('/', validateBody(createBookingSchema), createBooking);

export default router;
