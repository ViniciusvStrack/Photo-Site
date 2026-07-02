import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createSchema } from './db/schema';
import { seedDatabase } from './db/seeder';
import { connectMongoDB } from './db/mongodb';
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
app.use('/api', generalRoutes); // /api/health, /api/testimonials, /api/team, /api/ai/chat

// Default root route
app.get('/', (req, res) => {
  res.json({
    name: 'LUMEN STUDIO API - Fotografia 4K ProRAW',
    status: 'running',
    version: '1.0.0-PRO',
    mode: process.env.MONGODB_URI ? 'Cloud MongoDB Atlas' : 'Local SQLite Native',
    documentation: 'Check /api/health for system status and database metrics.'
  });
});

// Global error handler
app.use(errorHandler);

// Initialize Database & Start Server
const startServer = async () => {
  try {
    console.log('[Server] Starting LUMEN STUDIO API engine...');
    
    // Check if MongoDB cloud connection string is provided in .env
    if (process.env.MONGODB_URI) {
      console.log('☁️ [Cloud Mode] MONGODB_URI detectada! Conectando ao MongoDB Atlas...');
      await connectMongoDB(process.env.MONGODB_URI);
      // Ensure SQLite fallback schema is also ready for hybrid offline use
      await createSchema();
      await seedDatabase();
    } else {
      console.log('💻 [Local Mode] Usando motor de banco de dados SQLite nativo (data/lumen_studio.sqlite)...');
      await createSchema();
      await seedDatabase();
    }

    app.listen(PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🟢 LUMEN STUDIO API rodando com sucesso na porta ${PORT}`);
      console.log(`📡 URL Principal: http://localhost:${PORT}`);
      console.log(`🔍 Health Check:  http://localhost:${PORT}/api/health`);
      console.log(`📸 Fotos API:     http://localhost:${PORT}/api/photos`);
      console.log(`📅 Reservas API:  http://localhost:${PORT}/api/bookings`);
      console.log(`☁️ Modo DB:       ${process.env.MONGODB_URI ? 'MongoDB Atlas Nuvem' : 'SQLite WebAssembly Local'}`);
      console.log(`======================================================\n`);
    });
  } catch (err) {
    console.error('[Server] Failed to initialize backend:', err);
    process.exit(1);
  }
};

startServer();

export default app;
