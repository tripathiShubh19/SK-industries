import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoutes from './routes/products.routes.js';
import rfqsRoutes from './routes/rfqs.routes.js';
import contactRoutes from './routes/contact.routes.js';
import statsRoutes from './routes/stats.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
  origin: '*', // Allow frontend dev server
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Root info
app.get('/api', (_req: Request, res: Response) => {
  res.json({
    service: 'SK Polychem Industries — B2B Industrial REST API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      productsSearch: '/api/products/search?q=pu&minPressure=10',
      rfqs: '/api/rfqs',
      rfqTracking: '/api/rfqs/:id',
      contact: '/api/contact',
      stats: '/api/stats'
    }
  });
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount Routes
app.use('/api/products', productsRoutes);
app.use('/api/rfqs', rfqsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found. Check GET /api for available endpoints.`
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred on industrial API server.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 B2B Industrial Backend Server running on port ${PORT}`);
  console.log(`📡 Base API URL: http://localhost:${PORT}/api`);
  console.log(`📋 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});

export default app;
