import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import productsRoutes from './routes/products.routes.js';
import rfqsRoutes from './routes/rfqs.routes.js';
import contactRoutes from './routes/contact.routes.js';
import statsRoutes from './routes/stats.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// 1. HTTP Security Headers with Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 2. Strict / Secure CORS Whitelist
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8443',
  'http://localhost:3000',
  'https://sk-industries-sigma.vercel.app',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, server-to-server) or whitelisted origins
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    callback(new Error('Blocked by CORS security policy.'));
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Global Rate Limiter: Max 100 requests per 15 mins per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP. Please try again after 15 minutes.' }
});
app.use('/api', globalLimiter);

// 4. Stricter Anti-Spam Rate Limiter for RFQ and Contact form submissions: Max 10 per 15 mins
const formSubmitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Inquiry limit reached. Please wait 15 minutes before submitting another quote or contact us directly on WhatsApp.' }
});
app.use('/api/rfqs', formSubmitLimiter);
app.use('/api/contact', formSubmitLimiter);

// 5. Body parsing with strict payload limits (Prevents Large Payload DOS)
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString().split('T')[1].slice(0, 8);
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root Welcome Route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    service: 'SK Polychem Industries — B2B Industrial REST API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api',
    health: '/api/health'
  });
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
