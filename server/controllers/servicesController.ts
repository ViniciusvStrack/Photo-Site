import { Request, Response, NextFunction } from 'express';
import { dbManager } from '../db/database';
import { PackageRow, AddonRow, ApiResponse } from '../types';

export const getPackages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await dbManager.query<PackageRow>(`SELECT * FROM packages`);

    const packages = rows.map(r => ({
      id: r.id,
      title: r.title,
      subtitle: r.subtitle,
      price: r.price,
      period: r.period,
      badge: r.badge,
      popular: Boolean(r.popular),
      features: JSON.parse(r.features || '[]'),
      recommendedFor: r.recommended_for,
      duration: r.duration,
      deliverables: r.deliverables
    }));

    const response: ApiResponse = {
      success: true,
      data: packages,
      message: `${packages.length} pacotes de serviços recuperados com sucesso.`
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const getAddons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await dbManager.query<AddonRow>(`SELECT * FROM addons`);

    const addons = rows.map(r => ({
      id: r.id,
      title: r.title,
      description: r.description,
      price: r.price,
      icon: r.icon
    }));

    const response: ApiResponse = {
      success: true,
      data: addons,
      message: `${addons.length} adicionais recuperados com sucesso.`
    };
    res.json(response);
  } catch (err) {
    next(err);
  }
};
