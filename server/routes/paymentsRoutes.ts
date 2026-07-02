import { Router } from 'express';
import { simulatePayment, paymentWebhook } from '../controllers/paymentsController';
import { validateBody, simulatePaymentSchema } from '../middleware/validation';

const router = Router();

router.post('/simulate', validateBody(simulatePaymentSchema), simulatePayment);
router.post('/webhook', paymentWebhook);

export default router;
