import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import taxRoutes from './routes/taxRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Cukup SATU aturan CORS di sini
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174', 
    'http://127.0.0.1:5173',
    'https://taxy-capstone-app-azkakuputra-6634s-projects.vercel.app' // URL Front-End Vercel kamu
  ],
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
  res.json({ status: 'ok', message: 'Taxy API Server is healthy and running.' });
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