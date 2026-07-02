import { Router } from 'express';
import { getTestimonials, getTeam, getHealth } from '../controllers/generalController';
import { chatWithAi } from '../controllers/aiController';

const router = Router();

router.get('/health', getHealth);
router.get('/testimonials', getTestimonials);
router.get('/team', getTeam);
router.post('/ai/chat', chatWithAi);

export default router;
