require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const memberRoutes = require('./routes/memberRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Create logs directory if not exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create write stream for logging
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

// 1. SECURITY: Helmet - Set security headers
app.use(helmet());

// 2. SECURITY: CORS - Configure allowed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// 3. SECURITY: Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', limiter);

// 4. LOGGING: Morgan - Log all requests
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

// 5. Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 6. MONITORING: Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Service is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 7. MONITORING: Metrics Endpoint
let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  next();
});

app.get('/api/metrics', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      totalRequests: requestCount,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      timestamp: new Date().toISOString()
    }
  });
});

// 8. API Info Endpoint
app.get('/api/info', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'RESTful API Members - Hardened Version',
    version: process.env.API_VERSION || '1.0.0',
    student: {
      name: 'Helma Afifah',
      nim: '230104040215',
      class: 'TI23A'
    },
    endpoints: {
      health: 'GET /api/health',
      metrics: 'GET /api/metrics',
      getAllMembers: 'GET /api/members',
      getMemberById: 'GET /api/members/:id',
      createMember: 'POST /api/members',
      updateMember: 'PUT /api/members/:id',
      deleteMember: 'DELETE /api/members/:id'
    },
    security: {
      helmet: 'enabled',
      cors: 'enabled',
      rateLimit: `${process.env.RATE_LIMIT_MAX_REQUESTS || 100} requests per ${(parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000) / 60000} minutes`
    }
  });
});

// 9. Routes
app.use('/api/members', memberRoutes);

// 10. 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found'
  });
});

// 11. Global Error Handler (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🛡️  Security: Helmet, CORS, Rate Limit enabled`);
  console.log(`📝 Logging: Morgan enabled (access.log)`);
  console.log(`================================================`);
  console.log(`📌 API Info: http://localhost:${PORT}/api/info`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📈 Metrics: http://localhost:${PORT}/api/metrics`);
  console.log(`================================================`);
});