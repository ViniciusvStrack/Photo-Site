import { Router } from 'express';
import { getPhotos, getPhotoById, likePhoto, createPhoto, updatePhoto, deletePhoto } from '../controllers/photosController';

const router = Router();

// Admin Portfolio Management Endpoints
router.post('/admin', createPhoto);
router.put('/admin/:id', updatePhoto);
router.delete('/admin/:id', deletePhoto);

// Public Portfolio Endpoints
router.get('/', getPhotos);
router.get('/:id', getPhotoById);
router.post('/:id/like', likePhoto);

export default router;
