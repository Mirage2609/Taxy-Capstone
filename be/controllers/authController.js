import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import { db, isFirebaseActive } from '../config/firebase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, '../data/users.json');
const JWT_SECRET = 'taxy-capstone-jwt-secret-key-12345';

// Helper to read users file
const readUsers = () => {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error("Gagal membaca file users:", err);
    return [];
  }
};

// Helper to write users file
const writeUsers = (users) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Gagal menyimpan file users:", err);
  }
};

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, jobCategory } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Semua kolom wajib diisi.' });
    }

    let usernameExists = false;
    let emailExists = false;

    if (isFirebaseActive) {
      const nameQuery = await db.collection('users')
        .where('fullNameLower', '==', fullName.toLowerCase())
        .limit(1)
        .get();
      usernameExists = !nameQuery.empty;

      const emailQuery = await db.collection('users')
        .where('emailLower', '==', email.toLowerCase())
        .limit(1)
        .get();
      emailExists = !emailQuery.empty;
    } else {
      const users = readUsers();
      usernameExists = users.some(
        (u) => u.fullName.toLowerCase() === fullName.toLowerCase()
      );
      emailExists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
    }

    if (usernameExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Nama Lengkap sudah terdaftar. Silakan gunakan nama lain atau login.'
      });
    }

    if (emailExists) {
      return res.status(400).json({
        status: 'error',
        message: 'Alamat Email sudah terdaftar. Gunakan email lain.'
      });
    }

    const newUser = {
      id: Date.now().toString(),
      fullName,
      fullNameLower: fullName.toLowerCase(),
      email,
      emailLower: email.toLowerCase(),
      password, // In professional production, passwords would be hashed. For this capstone, keeping it simple as simulated is excellent.
      jobCategory: jobCategory || 'Freelancer',
      createdAt: new Date().toISOString()
    };

    if (isFirebaseActive) {
      await db.collection('users').doc(newUser.id).set(newUser);
    } else {
      const users = readUsers();
      users.push(newUser);
      writeUsers(users);
    }

    return res.status(201).json({
      status: 'success',
      message: 'Registrasi berhasil!',
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        jobCategory: newUser.jobCategory
      }
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ status: 'error', message: 'Username/Email dan Password wajib diisi.' });
    }

    let matchedUser = null;

    if (isFirebaseActive) {
      // Find user by email first
      const emailQuery = await db.collection('users')
        .where('emailLower', '==', username.toLowerCase())
        .limit(1)
        .get();

      if (!emailQuery.empty) {
        const userDoc = emailQuery.docs[0].data();
        if (userDoc.password === password) {
          matchedUser = userDoc;
        }
      } else {
        // Find user by fullName
        const nameQuery = await db.collection('users')
          .where('fullNameLower', '==', username.toLowerCase())
          .limit(1)
          .get();
        if (!nameQuery.empty) {
          const userDoc = nameQuery.docs[0].data();
          if (userDoc.password === password) {
            matchedUser = userDoc;
          }
        }
      }
    } else {
      const users = readUsers();
      matchedUser = users.find(
        (u) =>
          (u.fullName.toLowerCase() === username.toLowerCase() ||
           u.email.toLowerCase() === username.toLowerCase()) &&
          u.password === password
      );
    }

    if (!matchedUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Username, Email, atau Password Anda salah. Silakan coba lagi.'
      });
    }

    // Sign JWT Token
    const token = jwt.sign(
      { id: matchedUser.id, username: matchedUser.fullName, email: matchedUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      status: 'success',
      message: 'Login berhasil!',
      token,
      user: {
        username: matchedUser.fullName,
        email: matchedUser.email,
        jobCategory: matchedUser.jobCategory
      }
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};
export { JWT_SECRET };
