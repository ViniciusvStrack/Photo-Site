import { Request, Response, NextFunction } from 'express';
import { dbManager } from '../db/database';
import { TestimonialRow, TeamRow, ApiResponse } from '../types';

export const getTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await dbManager.query<TestimonialRow>(`SELECT * FROM testimonials`);

    const testimonials = rows.map(r => ({
      id: r.id,
      name: r.name,
      role: r.role,
      company: r.company,
      avatarUrl: r.avatar_url,
      fallbackInitials: r.fallback_initials,
      text: r.text,
      rating: r.rating,
      serviceUsed: r.service_used,
      date: r.date
    }));

    const response: ApiResponse = {
      success: true,
      data: testimonials
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const getTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await dbManager.query<TeamRow>(`SELECT * FROM team`);

    const team = rows.map(r => ({
      id: r.id,
      name: r.name,
      role: r.role,
      bio: r.bio,
      specialty: r.specialty,
      favoriteGear: r.favorite_gear,
      imageUrl: r.image_url
    }));

    const response: ApiResponse = {
      success: true,
      data: team
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const getHealth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const time = new Date().toISOString();
    const dbTest = await dbManager.queryOne<{ count: number }>(`SELECT count(*) as count FROM photos`);

    res.json({
      success: true,
      status: 'healthy',
      timestamp: time,
      database: 'connected',
      photosCount: dbTest?.count || 0,
      version: '1.0.0-PRO'
    });
  } catch (err: any) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      error: err.message || 'Database connection failed'
    });
  }
};
