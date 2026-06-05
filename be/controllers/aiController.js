// Konfigurasi URL Server Python Model AI
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://127.0.0.1:5001/predict';

/**
 * Mendapatkan Penjelasan Analisis Pajak dari Model AI Python (dengan fallback lokal cerdas)
 * 
 * POST /api/ai/explanation
 */
export const getaiEdxplanation = async (req, res) => {
  try {
    const { taxData, category } = req.body;

    if (!taxData) {
      return res.status(400).json({
        success: false,
        error: "Data Pajak (taxData) diperlukan"
      });
    }

    let aiData = null;
    let isFallback = false;

    // Lakukan pemanggilan ke Python Server jika terkonfigurasi
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000); // Batas waktu 2 detik agar tidak hang jika server mati

      const aiResponse = await fetch(PYTHON_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taxData: taxData,
          category: category || 'Pajak'
        }),
        signal: controller.signal
      });

      clearTimeout(id);

      if (aiResponse.ok) {
        aiData = await aiResponse.json();
      } else {
        isFallback = true;
      }
    } catch (fetchError) {
      // Jika server Python mati/koneksi ditolak, aktifkan mode fallback lokal cerdas (aplikasi bebas crash)
      isFallback = true;
      console.log(`[Notice] Gagal menghubungi Python AI Server di ${PYTHON_API_URL}. Menggunakan Fallback Cerdas Lokal.`);
    }

    // Generator Penjelasan Cerdas Lokal (Fallback) jika server Python belum siap/aktif
    if (isFallback || !aiData) {
      const formatRupiah = (num) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
      };

      if (taxData.jenisPajak === 'PPH21' || taxData.jenis === 'PPH 21') {
        const bulanan = taxData.bulanan || taxData.pajakBulanan || 0;
        const gaji = taxData.gaji || 0;
        const status = taxData.status || 'TK/0';
        const rate = taxData.persentase || '5%';
        const pkp = taxData.pkp || 0;

        aiData = {
          explanation: `Analisis AI menunjukkan beban PPh 21 bulanan Anda adalah ${formatRupiah(bulanan)} berdasarkan pendapatan kotor ${formatRupiah(gaji)}. Dengan status PTKP ${status}, penghasilan kena pajak (PKP) Anda disetahunkan menjadi ${formatRupiah(pkp)} yang masuk ke lapisan tarif progresif ${rate}. Rekomendasi optimasi: Pastikan menyertakan bukti potong resmi dari perusahaan untuk pelaporan SPT Tahunan guna menghindari denda.`
        };
      } else {
        // PPh 23
        const potongan = taxData.potongan || taxData.pajakBulanan || 0;
        const bruto = taxData.bruto || taxData.gaji || 0;
        const rate = taxData.tarifAkhir || '2%';
        const statusNpwp = taxData.adaNpwp || taxData.status?.includes('NPWP') ? 'Memiliki NPWP' : 'Tanpa NPWP';

        aiData = {
          explanation: `Hasil analisis PPh 23 menunjukkan pemotongan jasa bruto sebesar ${formatRupiah(potongan)} dari nilai bruto ${formatRupiah(bruto)} menggunakan tarif aktif ${rate} (${statusNpwp}). Rekomendasi optimasi: ${taxData.adaNpwp ? 'Tarif pemotongan Anda sudah optimal (2% atau 15%).' : 'Tarif Anda dikenakan denda 100% lebih tinggi karena tidak memiliki NPWP. Daftarkan NPWP Anda untuk memangkas tarif potong dari 4% menjadi 2% untuk jasa konsultan/sewa.'}`
        };
      }
    }

    // Meneruskan respon kembali ke client
    return res.status(200).json({
      success: true,
      message: isFallback ? "Penjelasan Cerdas Lokal berhasil didapatkan (AI Offline Fallback)" : "Penjelasan AI berhasil didapatkan dari Python Server",
      data: aiData
    });
  } catch (error) {
    console.error("Error di aiController:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan internal saat menghubungi layanan AI.",
      error: error.message
    });
  }
};