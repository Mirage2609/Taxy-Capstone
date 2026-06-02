import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import taxRoutes from './routes/taxRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow access from local Capstone frontend (Vite)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', '*'],
  credentials: true
}));

app.use(express.json());

// Routes Registration
app.use('/api/auth', authRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/history', historyRoutes);

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
