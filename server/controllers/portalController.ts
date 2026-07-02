import { Request, Response, NextFunction } from 'express';
import { dbManager } from '../db/database';
import { ClientPortalRow, PortalPhotoRow, ApiResponse } from '../types';

export const loginPortal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessCode } = req.body;

    if (!accessCode || typeof accessCode !== 'string') {
      return res.status(400).json({ success: false, error: 'Código de acesso é obrigatório.' });
    }

    const cleanCode = accessCode.trim().toUpperCase();

    const portal = await dbManager.queryOne<ClientPortalRow>(
      `SELECT * FROM client_portals WHERE access_code = ?`,
      [cleanCode]
    );

    if (!portal) {
      return res.status(404).json({
        success: false,
        error: 'Acesso Negado',
        message: 'Código de acesso inválido ou expirado. Verifique com nossa central de atendimento.'
      });
    }

    // Retrieve photos for this portal
    const photoRows = await dbManager.query<PortalPhotoRow>(
      `SELECT * FROM portal_photos WHERE portal_id = ?`,
      [portal.id]
    );

    const sessionData = {
      id: portal.id,
      accessCode: portal.access_code,
      clientName: portal.client_name,
      eventTitle: portal.event_title,
      eventDate: portal.event_date,
      status: portal.status,
      totalPhotos: portal.total_photos,
      selectedCount: portal.selected_count,
      maxSelection: portal.max_selection,
      coverUrl: portal.cover_url,
      photos: photoRows.map(p => ({
        id: p.id,
        url: p.url,
        title: p.title,
        selected: Boolean(p.selected),
        favorite: Boolean(p.favorite)
      }))
    };

    const response: ApiResponse = {
      success: true,
      data: sessionData,
      message: `Bem-vindo à galeria privada, ${portal.client_name}!`
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const toggleSelectPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, photoId } = req.params;
    const cleanCode = code.trim().toUpperCase();

    const portal = await dbManager.queryOne<ClientPortalRow>(
      `SELECT * FROM client_portals WHERE access_code = ?`,
      [cleanCode]
    );

    if (!portal) {
      return res.status(404).json({ success: false, error: 'Galeria não encontrada.' });
    }

    const photo = await dbManager.queryOne<PortalPhotoRow>(
      `SELECT * FROM portal_photos WHERE id = ? AND portal_id = ?`,
      [photoId, portal.id]
    );

    if (!photo) {
      return res.status(404).json({ success: false, error: 'Foto não encontrada nesta galeria.' });
    }

    const newSelected = photo.selected ? 0 : 1;

    // Check limit if selecting
    if (newSelected === 1 && portal.selected_count >= portal.max_selection) {
      return res.status(400).json({
        success: false,
        error: 'Limite de Seleção Atingido',
        message: `Você já atingiu o limite contratado de ${portal.max_selection} fotos selecionadas para o seu álbum!`
      });
    }

    await dbManager.run(`UPDATE portal_photos SET selected = ? WHERE id = ?`, [newSelected, photoId]);
    
    const newCount = portal.selected_count + (newSelected === 1 ? 1 : -1);
    await dbManager.run(`UPDATE client_portals SET selected_count = ? WHERE id = ?`, [newCount, portal.id]);

    res.json({
      success: true,
      data: { photoId, selected: Boolean(newSelected), selectedCount: newCount }
    });
  } catch (err) {
    next(err);
  }
};

export const toggleFavoritePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, photoId } = req.params;
    const cleanCode = code.trim().toUpperCase();

    const portal = await dbManager.queryOne<ClientPortalRow>(
      `SELECT id FROM client_portals WHERE access_code = ?`,
      [cleanCode]
    );

    if (!portal) {
      return res.status(404).json({ success: false, error: 'Galeria não encontrada.' });
    }

    const photo = await dbManager.queryOne<PortalPhotoRow>(
      `SELECT * FROM portal_photos WHERE id = ? AND portal_id = ?`,
      [photoId, portal.id]
    );

    if (!photo) {
      return res.status(404).json({ success: false, error: 'Foto não encontrada nesta galeria.' });
    }

    const newFav = photo.favorite ? 0 : 1;
    await dbManager.run(`UPDATE portal_photos SET favorite = ? WHERE id = ?`, [newFav, photoId]);

    res.json({
      success: true,
      data: { photoId, favorite: Boolean(newFav) }
    });
  } catch (err) {
    next(err);
  }
};

export const approveAlbumSelection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const cleanCode = code.trim().toUpperCase();

    const portal = await dbManager.queryOne<ClientPortalRow>(
      `SELECT * FROM client_portals WHERE access_code = ?`,
      [cleanCode]
    );

    if (!portal) {
      return res.status(404).json({ success: false, error: 'Galeria não encontrada.' });
    }

    if (portal.selected_count === 0) {
      return res.status(400).json({
        success: false,
        error: 'Seleção Vazia',
        message: 'Por favor, selecione pelo menos 1 foto antes de aprovar o álbum físico.'
      });
    }

    await dbManager.run(`UPDATE client_portals SET status = 'Aprovado' WHERE id = ?`, [portal.id]);

    res.json({
      success: true,
      data: { accessCode: cleanCode, status: 'Aprovado', selectedCount: portal.selected_count },
      message: `Seleção de ${portal.selected_count} fotos aprovada para encadernação museu com sucesso!`
    });
  } catch (err) {
    next(err);
  }
};
