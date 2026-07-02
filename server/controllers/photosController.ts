import { Request, Response, NextFunction } from 'express';
import { dbManager } from '../db/database';
import { PhotoRow, ApiResponse } from '../types';

export const getPhotos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, featured, limit } = req.query;

    let sql = `SELECT * FROM photos WHERE 1=1`;
    const params: any[] = [];

    if (category && category !== 'todos' && typeof category === 'string') {
      sql += ` AND category = ?`;
      params.push(category);
    }

    if (featured === 'true' || featured === '1') {
      sql += ` AND featured = 1`;
    }

    if (search && typeof search === 'string') {
      sql += ` AND (title LIKE ? OR description LIKE ? OR location LIKE ? OR camera LIKE ? OR lens LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }

    sql += ` ORDER BY created_at DESC`;

    if (limit && !isNaN(Number(limit))) {
      sql += ` LIMIT ?`;
      params.push(Number(limit));
    }

    const rows = await dbManager.query<PhotoRow>(sql, params);

    // Map rows to frontend-friendly camelCase structure
    const photos = rows.map(r => ({
      id: r.id,
      title: r.title,
      category: r.category,
      categoryLabel: r.category_label,
      url: r.url,
      fallbackSvg: r.fallback_svg,
      aspectRatio: r.aspect_ratio || 'auto',
      exif: {
        camera: r.camera,
        lens: r.lens,
        aperture: r.aperture,
        shutter: r.shutter,
        iso: r.iso,
        focalLength: r.focal_length
      },
      location: r.location,
      date: r.date,
      likes: r.likes,
      description: r.description,
      featured: Boolean(r.featured)
    }));

    const response: ApiResponse = {
      success: true,
      data: photos,
      message: `${photos.length} fotografias recuperadas com sucesso.`
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const getPhotoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const r = await dbManager.queryOne<PhotoRow>(`SELECT * FROM photos WHERE id = ?`, [id]);

    if (!r) {
      return res.status(404).json({ success: false, error: 'Fotografia não encontrada.' });
    }

    const photo = {
      id: r.id,
      title: r.title,
      category: r.category,
      categoryLabel: r.category_label,
      url: r.url,
      fallbackSvg: r.fallback_svg,
      aspectRatio: r.aspect_ratio || 'auto',
      exif: {
        camera: r.camera,
        lens: r.lens,
        aperture: r.aperture,
        shutter: r.shutter,
        iso: r.iso,
        focalLength: r.focal_length
      },
      location: r.location,
      date: r.date,
      likes: r.likes,
      description: r.description,
      featured: Boolean(r.featured)
    };

    res.json({ success: true, data: photo });
  } catch (err) {
    next(err);
  }
};

export const likePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const r = await dbManager.queryOne<PhotoRow>(`SELECT likes FROM photos WHERE id = ?`, [id]);

    if (!r) {
      return res.status(404).json({ success: false, error: 'Fotografia não encontrada.' });
    }

    const newLikes = r.likes + 1;
    await dbManager.run(`UPDATE photos SET likes = ? WHERE id = ?`, [newLikes, id]);

    res.json({
      success: true,
      data: { id, likes: newLikes },
      message: 'Fotografia curtida com sucesso!'
    });
  } catch (err) {
    next(err);
  }
};

// --- ADMIN PORTFOLIO & GALLERY MANAGEMENT ENDPOINTS (FOR MARIA CLARA & VINICIUS) ---

export const createPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title, category, categoryLabel, url, fallbackSvg, aspectRatio,
      exif, location, date, description, featured
    } = req.body;

    if (!title || !url || !category) {
      return res.status(400).json({ success: false, error: 'Título, categoria e URL da foto são obrigatórios.' });
    }

    const id = `pho-${Date.now()}`;
    const defaultSvg = fallbackSvg || `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="%23F5F2EB"/><circle cx="400" cy="300" r="140" fill="none" stroke="rgba(197,160,89,0.4)" stroke-width="2"/><text x="400" y="480" font-family="serif" font-size="28" fill="%231C1B18" text-anchor="middle">${title.toUpperCase()}</text></svg>`;

    await dbManager.run(
      `INSERT INTO photos (id, title, category, category_label, url, fallback_svg, aspect_ratio, camera, lens, aperture, shutter, iso, focal_length, location, date, likes, description, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        category,
        categoryLabel || 'Fine Art & Acervo',
        url,
        defaultSvg,
        aspectRatio || 'auto',
        exif?.camera || 'Sony Alpha 1',
        exif?.lens || 'FE 85mm f/1.4 GM',
        exif?.aperture || 'f/1.4',
        exif?.shutter || '1/2000s',
        exif?.iso || 'ISO 100',
        exif?.focalLength || '85mm',
        location || 'Recife / PE',
        date || new Date().toLocaleDateString('pt-BR'),
        0,
        description || 'Obra fine art capturada sob direção de Maria Clara no Lumen Atelier.',
        featured ? 1 : 0
      ]
    );

    res.status(201).json({
      success: true,
      data: { id, title, category, url, featured: Boolean(featured) },
      message: `Obra "${title}" publicada com sucesso no acervo do atelier por Maria Clara!`
    });
  } catch (err) {
    next(err);
  }
};

export const updatePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const {
      title, category, categoryLabel, url, aspectRatio,
      exif, location, date, description, featured
    } = req.body;

    const r = await dbManager.queryOne<PhotoRow>(`SELECT * FROM photos WHERE id = ?`, [id]);
    if (!r) {
      return res.status(404).json({ success: false, error: 'Obra não encontrada para edição.' });
    }

    await dbManager.run(
      `UPDATE photos SET
        title = ?, category = ?, category_label = ?, url = ?, aspect_ratio = ?,
        camera = ?, lens = ?, aperture = ?, shutter = ?, iso = ?, focal_length = ?,
        location = ?, date = ?, description = ?, featured = ?
       WHERE id = ?`,
      [
        title !== undefined ? title : r.title,
        category !== undefined ? category : r.category,
        categoryLabel !== undefined ? categoryLabel : r.category_label,
        url !== undefined ? url : r.url,
        aspectRatio !== undefined ? aspectRatio : r.aspect_ratio,
        exif?.camera !== undefined ? exif.camera : r.camera,
        exif?.lens !== undefined ? exif.lens : r.lens,
        exif?.aperture !== undefined ? exif.aperture : r.aperture,
        exif?.shutter !== undefined ? exif.shutter : r.shutter,
        exif?.iso !== undefined ? exif.iso : r.iso,
        exif?.focalLength !== undefined ? exif.focalLength : r.focal_length,
        location !== undefined ? location : r.location,
        date !== undefined ? date : r.date,
        description !== undefined ? description : r.description,
        featured !== undefined ? (featured ? 1 : 0) : r.featured,
        id
      ]
    );

    res.json({
      success: true,
      message: `Obra "${title || r.title}" atualizada no acervo com sucesso!`
    });
  } catch (err) {
    next(err);
  }
};

export const deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await dbManager.run(`DELETE FROM photos WHERE id = ?`, [id]);
    res.json({ success: true, message: 'Obra removida do acervo público com sucesso!' });
  } catch (err) {
    next(err);
  }
};
