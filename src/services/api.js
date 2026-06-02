/**
 * Taxy Capstone RESTful API Client Service
 * 
 * File ini bertindak sebagai service layer untuk berkomunikasi dengan RESTful API asli di Backend.
 * Terkoneksi langsung dengan Express Server pada http://localhost:5000/api.
 */

const USE_REAL_BACKEND = true;
const BACKEND_URL = 'http://localhost:5000/api';

export const apiService = {
  /**
   * Pendaftaran Akun Baru (POST /api/auth/register)
   * @param {Object} userData - { fullName, email, password, jobCategory }
   * @returns {Promise<Object>} Respon status pendaftaran
   */
  registerUser: async (userData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Pendaftaran gagal');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Autentikasi Masuk Pengguna (POST /api/auth/login)
   * @param {Object} credentials - { username, password }
   * @returns {Promise<Object>} Data user aktif & token
   */
  loginUser: async (credentials) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login gagal');
      
      // Simpan Sesi Pengguna secara aman di Web Storage
      localStorage.setItem('taxy_token', data.token);
      localStorage.setItem('taxy_active_user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Mengambil Sesi Pengguna Aktif (Local Sesi Check)
   * @returns {Object|null} Data user jika sesi ada
   */
  getActiveUser: () => {
    const userStr = localStorage.getItem('taxy_active_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Keluar / Hapus Sesi
   */
  logoutUser: () => {
    localStorage.removeItem('taxy_token');
    localStorage.removeItem('taxy_active_user');
  },

  /**
   * Mengirim Data Perhitungan untuk Dikalkulasi di Backend (POST /api/tax/calculate)
   * @param {Object} taxData - Input kalkulasi pajak
   * @returns {Promise<Object>} Hasil perhitungan detail dari Server
   */
  calculateTax: async (taxData) => {
    try {
      const response = await fetch(`${BACKEND_URL}/tax/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taxData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menghitung pajak di server.');
      return data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Mengambil Daftar Riwayat Pajak (GET /api/history)
   * @param {string} username - Nama user (hanya untuk fallback, aslinya terverifikasi via JWT)
   * @returns {Promise<Array>} Daftar riwayat perpajakan user
   */
  getHistory: async (username) => {
    try {
      const token = localStorage.getItem('taxy_token');
      const response = await fetch(`${BACKEND_URL}/history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengambil riwayat');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Menyimpan Perhitungan Pajak Baru ke Riwayat (POST /api/history)
   * @param {string} username - User pemilik kalkulasi
   * @param {Object} historyData - Rincian kalkulasi pajak
   * @returns {Promise<Object>} Respon keberhasilan penyimpanan
   */
  saveHistory: async (username, historyData) => {
    try {
      const token = localStorage.getItem('taxy_token');
      const response = await fetch(`${BACKEND_URL}/history`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...historyData }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menyimpan kalkulasi');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * Menghapus Item Riwayat Tertentu (DELETE /api/history/:id)
   * @param {string} username - Pemilik data untuk keamanan
   * @param {number|string} id - ID item riwayat yang akan dihapus
   * @returns {Promise<Object>} Respon status penghapusan
   */
  deleteHistory: async (username, id) => {
    try {
      const token = localStorage.getItem('taxy_token');
      const response = await fetch(`${BACKEND_URL}/history/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menghapus riwayat');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
