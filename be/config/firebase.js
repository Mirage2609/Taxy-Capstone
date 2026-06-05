import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'serviceAccountKey.json');

let db = null;
let isFirebaseActive = false;

try {
  if (fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf-8'));
    
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
    console.log(` [Firebase] Peringatan: serviceAccountKey.json tidak ditemukan.`);
    console.log(` [Firebase] Sistem otomatis beralih ke basis data JSON lokal.`);
    console.log(`===================================================`);
  }
} catch (error) {
  console.error(` [Firebase] Gagal melakukan inisialisasi:`, error);
  console.log(` [Firebase] Sistem otomatis beralih ke basis data JSON lokal.`);
}

export { db, isFirebaseActive };
