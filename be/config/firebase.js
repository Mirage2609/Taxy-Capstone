import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'serviceAccountKey.json');

let db = null;
let isFirebaseActive = false;
let firebaseInitError = null;

try {
  let serviceAccount = null;

  if (fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf-8'));
  } else if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PROJECT_ID) {
    serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    };
  }

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    
    db = admin.firestore();
    isFirebaseActive = true;
    console.log(`===================================================`);
    console.log(` [Firebase] Berhasil terhubung ke Cloud Firestore!`);
    console.log(`===================================================`);
  } else {
    console.log(`===================================================`);
    console.log(` [Firebase] Peringatan: Kredensial Firebase tidak ditemukan.`);
    console.log(` [Firebase] Sistem otomatis beralih ke basis data JSON lokal.`);
    console.log(`===================================================`);
  }
} catch (error) {
  firebaseInitError = error.message || String(error);
  console.error(` [Firebase] Gagal melakukan inisialisasi:`, error);
  console.log(` [Firebase] Sistem otomatis beralih ke basis data JSON lokal.`);
}

export { db, isFirebaseActive, firebaseInitError };
