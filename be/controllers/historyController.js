import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './authController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HISTORY_FILE = path.join(__dirname, '../data/history.json');

// Middleware to authenticate JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Akses ditolak. Token tidak ditemukan.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).json({ status: 'error', message: 'Sesi kedaluwarsa atau token tidak valid.' });
  }
};

// Helper to read history
const readHistory = () => {
  try {
    if (!fs.existsSync(HISTORY_FILE)) {
      fs.writeFileSync(HISTORY_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error("Gagal membaca file history:", err);
    return [];
  }
};

// Helper to write history
const writeHistory = (history) => {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  } catch (err) {
    console.error("Gagal menyimpan file history:", err);
  }
};

export const getHistory = async (req, res) => {
  try {
    const allHistory = readHistory();
    // Filter history belonging to active user
    const userHistory = allHistory.filter(
      (item) => item.username.toLowerCase() === req.user.username.toLowerCase()
    );
    return res.json(userHistory);
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

export const saveHistory = async (req, res) => {
  try {
    const allHistory = readHistory();

    const newItem = {
      id: Date.now(),
      username: req.user.username,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      ...req.body
    };

    allHistory.unshift(newItem); // Insert at top
    writeHistory(allHistory);

    return res.status(201).json({
      status: 'success',
      message: 'Simulasi perhitungan berhasil disimpan!',
      data: newItem
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const allHistory = readHistory();

    // Remove targeted item only if it belongs to this user
    const filteredHistory = allHistory.filter(
      (item) => !(item.id === id && item.username.toLowerCase() === req.user.username.toLowerCase())
    );

    writeHistory(filteredHistory);

    return res.json({
      status: 'success',
      message: 'Riwayat berhasil dihapus!'
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};
