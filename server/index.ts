import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createSchema } from './db/schema';
import { seedDatabase } from './db/seeder';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import photosRoutes from './routes/photosRoutes';
import servicesRoutes from './routes/servicesRoutes';
import bookingsRoutes from './routes/bookingsRoutes';
import paymentsRoutes from './routes/paymentsRoutes';
import portalRoutes from './routes/portalRoutes';
import generalRoutes from './routes/generalRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/photos', photosRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/portal', portalRoutes);
app.use('/api', generalRoutes); // /api/health, /api/testimonials, /api/team

// Default root route
app.get('/', (req, res) => {
  res.json({
    name: 'LUMEN STUDIO API - Fotografia 4K ProRAW',
    status: 'running',
    version: '1.0.0-PRO',
    documentation: 'Check /api/health for system status and database metrics.'
  });
});

// Global error handler
app.use(errorHandler);

// Initialize Database & Start Server
const startServer = async () => {
  try {
    console.log('[Server] Starting LUMEN STUDIO API engine...');
    await createSchema();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🟢 LUMEN STUDIO API rodando com sucesso na porta ${PORT}`);
      console.log(`📡 URL Principal: http://localhost:${PORT}`);
      console.log(`🔍 Health Check:  http://localhost:${PORT}/api/health`);
      console.log(`📸 Fotos API:     http://localhost:${PORT}/api/photos`);
      console.log(`📅 Reservas API:  http://localhost:${PORT}/api/bookings`);
      console.log(`======================================================\n`);
    });
  } catch (err) {
    console.error('[Server] Failed to initialize backend:', err);
    process.exit(1);
  }
};

startServer();

export default app;
