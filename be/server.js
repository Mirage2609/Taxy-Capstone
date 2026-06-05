import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import taxRoutes from './routes/taxRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { isFirebaseActive, firebaseInitError } from './config/firebase.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Cukup SATU aturan CORS di sini
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowedPatterns = [
      /^http:\/\/localhost:\d+$/,
      /^http:\/\/127\.0\.0\.1:\d+$/,
      /\.vercel\.app$/
    ];
    const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes Registration
app.use('/api/auth', authRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  const pk = process.env.FIREBASE_PRIVATE_KEY || '';
  res.json({ 
    status: 'ok', 
    message: 'Taxy API Server is healthy and running.',
    firebaseActive: isFirebaseActive,
    firebaseInitError: firebaseInitError,
    envCheck: {
      projectIdExists: !!process.env.FIREBASE_PROJECT_ID,
      clientEmailExists: !!process.env.FIREBASE_CLIENT_EMAIL,
      privateKeyExists: !!pk,
    },
    privateKeyDebug: {
      length: pk.length,
      startsWith: pk.substring(0, 30),
      endsWith: pk.substring(Math.max(0, pk.length - 30)),
      containsLiteralNewlines: pk.includes('\n'),
      containsEscapedNewlines: pk.includes('\\n'),
    }
  });
});

// Global Error Handler to prevent crash
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Terjadi kesalahan internal pada server backend.' });
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` Taxy API Server running on: http://localhost:${PORT}`);
  console.log(`===================================================`);
});

export default app;