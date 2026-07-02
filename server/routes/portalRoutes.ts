import { Router } from 'express';
import { loginPortal, toggleSelectPhoto, toggleFavoritePhoto, approveAlbumSelection } from '../controllers/portalController';

const router = Router();

router.post('/login', loginPortal);
router.post('/:code/select/:photoId', toggleSelectPhoto);
router.post('/:code/favorite/:photoId', toggleFavoritePhoto);
router.post('/:code/approve', approveAlbumSelection);

export default router;
