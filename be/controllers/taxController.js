/**
 * Taxy Capstone Tax Controller (Server-Side Calculation)
 * 
 * Memproses logika penghitungan pajak PPh 21 dan PPh 23 terpusat di Backend.
 * Menghindari hardcoding logika bisnis perpajakan di sisi klien (frontend).
 */

export const calculateTax = (req, res) => {
  try {
    const { jenisPajak } = req.body;

    if (!jenisPajak) {
      return res.status(400).json({ status: 'error', message: 'Parameter jenisPajak wajib diisi.' });
    }

    if (jenisPajak === 'PPH21') {
      const gaji = Number(req.body.gaji) || 0;
      const status = req.body.status || 'TK/0';
      const tanggungan = Number(req.body.tanggungan) || 0;

      if (gaji === 0) {
        return res.json({
          status: 'success',
          data: { bulanan: 0, tahunan: 0, thp: 0, ptkp: 54000000, pkp: 0, persentase: '0%', rate: 0 }
        });
      }

      const gajiSetahun = gaji * 12;

      // Hitung PTKP berdasarkan status kawin dan tanggungan
      let basePtkp = 54000000; // Lajang (TK) basis
      if (status.startsWith('K')) {
        basePtkp = 58500000; // Kawin (K) basis
      }
      
      const ptkp = basePtkp + (tanggungan * 4500000);

      // Hitung Penghasilan Kena Pajak (PKP)
      let pkp = gajiSetahun - ptkp;
      if (pkp < 0) pkp = 0;

      // Hitung Pajak Setahun dengan Lapisan Tarif Progresif Pasal 17 UU HPP
      let pajakTahunan = 0;
      let sisaPkp = pkp;
      let rateStr = '0%';
      let maxRate = 0;

      if (sisaPkp > 0) {
        rateStr = '5%';
        maxRate = 5;
        if (sisaPkp <= 60000000) {
          pajakTahunan += sisaPkp * 0.05;
          sisaPkp = 0;
        } else {
          pajakTahunan += 60000000 * 0.05;
          sisaPkp -= 60000000;
          rateStr = '15%';
          maxRate = 15;

          if (sisaPkp <= 190000000) {
            pajakTahunan += sisaPkp * 0.15;
            sisaPkp = 0;
          } else {
            pajakTahunan += 190000000 * 0.15;
            sisaPkp -= 190000000;
            rateStr = '25%';
            maxRate = 25;

            if (sisaPkp <= 250000000) {
              pajakTahunan += sisaPkp * 0.25;
              sisaPkp = 0;
            } else {
              pajakTahunan += 250000000 * 0.25;
              sisaPkp -= 250000000;
              rateStr = '30%';
              maxRate = 30;

              if (sisaPkp <= 4500000000) {
                pajakTahunan += sisaPkp * 0.30;
                sisaPkp = 0;
              } else {
                pajakTahunan += 4500000000 * 0.30;
                sisaPkp -= 4500000000;
                rateStr = '35%';
                maxRate = 35;
                pajakTahunan += sisaPkp * 0.35;
              }
            }
          }
        }
      }

      const pajakBulanan = pajakTahunan / 12;
      const thp = gaji - pajakBulanan;

      return res.json({
        status: 'success',
        data: {
          bulanan: Math.round(pajakBulanan),
          tahunan: Math.round(pajakTahunan),
          thp: Math.round(thp),
          ptkp: ptkp,
          pkp: pkp,
          persentase: rateStr,
          rate: maxRate
        }
      });
    } 
    
    if (jenisPajak === 'PPH23') {
      const bruto = Number(req.body.bruto) || 0;
      const jenisObjek = req.body.jenisObjek || '0.02';
      const adaNpwp = req.body.adaNpwp !== undefined ? req.body.adaNpwp : true;

      if (bruto === 0) {
        return res.json({
          status: 'success',
          data: { potongan: 0, thp: 0, tarifAkhir: 0 }
        });
      }

      const tarifDasar = Number(jenisObjek);
      const tarifAkhir = adaNpwp ? tarifDasar : tarifDasar * 2;

      const potonganPajak = bruto * tarifAkhir;
      const thp = bruto - potonganPajak;

      return res.json({
        status: 'success',
        data: {
          potongan: Math.round(potonganPajak),
          thp: Math.round(thp),
          tarifAkhir: tarifAkhir * 100
        }
      });
    }

    return res.status(400).json({ status: 'error', message: 'jenisPajak tidak didukung (gunakan PPH21 atau PPH23).' });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};
