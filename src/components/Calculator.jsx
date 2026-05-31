import { useState } from 'react';

function Calculator() {
  // === STATE UNTUK TOGGLE PPH ===
  const [jenisPajak, setJenisPajak] = useState('PPH21');

  // === STATE PPH 21 ===
  const [gaji, setGaji] = useState('');
  const [status, setStatus] = useState('TK/0');
  const [tanggungan, setTanggungan] = useState('0');

  // === STATE PPH 23 ===
  const [bruto, setBruto] = useState('');
  const [jenisObjek, setJenisObjek] = useState('0.02');
  const [adaNpwp, setAdaNpwp] = useState(true);

  // === HANDLER INPUT ANGKA ===
  // Menyimpan string angka mentah tanpa huruf/simbol ke dalam state
  const handleFormatRupiah = (e, setter) => {
    const value = e.target.value.replace(/\D/g, ''); // Hanya untuk mengambil digit angkanya saja
    setter(value);
  };

  // === FUNGSI KALKULASI PPH 21 (PERBAIKAN) ===
  const hitungPph21 = () => {
    // Karena state pada 'gaji' hanya berisi angka mentah berupa tipe (string), langsung diubah ke Number
    const numGaji = Number(gaji) || 0;
    if (numGaji === 0) return { bulanan: 0, tahunan: 0, thp: 0, pkp: 0, persentase: '0%' };

    const gajiSetahun = numGaji * 12;

    // Tentukan PTKP berdasarkan standard dasar (TK/0 = 54 Juta)
    // Harusnya berubah sesuai dropdown Status + Tanggungan
    let ptkp = 54000000;
    if (status === 'K/0') ptkp = 58500000;
    if (status === 'K/1') ptkp = 63000000;

    // Hitung PKP (Penghasilan Kena Pajak)
    let pkp = gajiSetahun - ptkp;
    if (pkp < 0) pkp = 0;

    // Hitung Pajak Setahun dengan Tarif Progresif Pasal 17 UU HPP
    let pajakTahunan = 0;
    let sisaPkp = pkp;
    let tarifAktif = '0%';

    if (sisaPkp > 0) {
      tarifAktif = '5%';
      if (sisaPkp <= 60000000) {
        pajakTahunan += sisaPkp * 0.05;
      } else {
        pajakTahunan += 60000000 * 0.05;
        sisaPkp -= 60000000;
        tarifAktif = '15%';

        if (sisaPkp <= 190000000) {
          pajakTahunan += sisaPkp * 0.15;
        } else {
          pajakTahunan += 190000000 * 0.15;
          sisaPkp -= 190000000;
          tarifAktif = '25%';
          pajakTahunan += sisaPkp * 0.25;
        }
      }
    }

    const pajakBulanan = pajakTahunan / 12;
    const thp = numGaji - pajakBulanan;

    return {
      bulanan: Math.round(pajakBulanan),
      tahunan: Math.round(pajakTahunan),
      thp: Math.round(thp),
      pkp: pkp,
      persentase: tarifAktif
    };
  };

  // === FUNGSI KALKULASI PPH 23 ===
  const hitungPph23 = () => {
    const numBruto = Number(bruto) || 0;
    if (numBruto === 0) return { potongan: 0, thp: 0, tarifAkhir: 0 };

    let tarifDasar = Number(jenisObjek);
    let tarifAkhir = adaNpwp ? tarifDasar : tarifDasar * 2;

    const potonganPajak = numBruto * tarifAkhir;
    const thp = numBruto - potonganPajak;

    return {
      potongan: Math.round(potonganPajak),
      thp: Math.round(thp),
      tarifAkhir: tarifAkhir * 100
    };
  };

  const hasilPph21 = hitungPph21();
  const hasilPph23 = hitungPph23();

  return (
    <div className="relative w-full flex justify-center lg:justify-end">
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 w-[375px] border border-slate-100 flex-shrink-0 transition-all duration-300">

        {/* Toggle PPH */}
        <div className="flex bg-slate-100 p-1 rounded-full mb-6 text-sm">
          <button
            onClick={() => setJenisPajak('PPH21')}
            className={`flex-1 py-2 font-semibold rounded-full transition ${jenisPajak === 'PPH21' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            PPH 21
          </button>
          <button
            onClick={() => setJenisPajak('PPH23')}
            className={`flex-1 py-2 font-semibold rounded-full transition ${jenisPajak === 'PPH23' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            PPH 23
          </button>
        </div>

        {/* --- FORM PPH 21 --- */}
        {jenisPajak === 'PPH21' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Gaji Bulanan</label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-slate-400 text-sm">Rp</span>
                <input
                  type="text"
                  placeholder="0"
                  value={gaji ? new Intl.NumberFormat('id-ID').format(gaji) : ''}
                  onChange={(e) => handleFormatRupiah(e, setGaji)}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 bg-white cursor-pointer text-sm"
                >
                  <option value="TK/0">TK/0</option>
                  <option value="K/0">K/0</option>
                  <option value="K/1">K/1</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Tanggungan</label>
                <select
                  value={tanggungan}
                  onChange={(e) => setTanggungan(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 bg-white cursor-pointer text-sm"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* --- FORM PPH 23 --- */}
        {jenisPajak === 'PPH23' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Nilai Penghasilan Bruto</label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-slate-400 text-sm">Rp</span>
                <input
                  type="text"
                  placeholder="0"
                  value={bruto ? new Intl.NumberFormat('id-ID').format(bruto) : ''}
                  onChange={(e) => handleFormatRupiah(e, setBruto)}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Objek Pajak</label>
              <select
                value={jenisObjek}
                onChange={(e) => setJenisObjek(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 bg-white cursor-pointer text-sm"
              >
                <option value="0.02">Jasa / Sewa (2%)</option>
                <option value="0.15">Royalti / Dividen (15%)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="npwp"
                checked={adaNpwp}
                onChange={(e) => setAdaNpwp(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="npwp" className="text-xs text-slate-600 cursor-pointer">Memiliki NPWP</label>
            </div>
          </div>
        )}

        {/* === OUTPUT KONDISIONAL === */}
        <div className="mt-6 space-y-4">
          <p className="text-xs font-medium text-slate-600">Output {jenisPajak}</p>

          {jenisPajak === 'PPH21' ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-600 text-white rounded-xl p-3">
                  <p className="text-[10px] text-blue-100 font-medium mb-1">Pajak Bulanan</p>
                  <p className="text-lg font-bold tracking-tight leading-none">
                    Rp{new Intl.NumberFormat('id-ID').format(hasilPph21.bulanan)}
                  </p>
                </div>
                <div className="bg-green-100 text-green-900 rounded-xl p-3 border border-green-200">
                  <p className="text-[10px] text-green-900 font-medium mb-1">Pajak Tahunan</p>
                  <p className="text-lg font-bold tracking-tight leading-none">
                    Rp{new Intl.NumberFormat('id-ID').format(hasilPph21.tahunan)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-slate-100 pt-4">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium mb-1 leading-none">Take Home Pay</p>
                  <p className="text-xl font-bold text-emerald-600 tracking-tight leading-none">
                    Rp{new Intl.NumberFormat('id-ID').format(hasilPph21.thp)}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 text-right">
                  <div className="flex justify-between w-28 text-[10px]">
                    <span className="text-slate-400 font-medium">PKP</span>
                    <span className="text-slate-700 font-bold">Rp{new Intl.NumberFormat('id-ID').format(hasilPph21.pkp)}</span>
                  </div>
                  <div className="flex justify-between w-28 text-[10px]">
                    <span className="text-slate-400 font-medium">Tarif</span>
                    <span className="text-slate-700 font-bold tracking-tight">{hasilPph21.persentase}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-600 text-white rounded-xl p-4">
                <p className="text-[10px] text-blue-100 font-medium mb-1">Potongan PPH 23</p>
                <p className="text-2xl font-bold tracking-tight leading-none">
                  Rp{new Intl.NumberFormat('id-ID').format(hasilPph23.potongan)}
                </p>
              </div>

              <div className="flex justify-between items-end border-t border-slate-100 pt-4">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium mb-1 leading-none">Uang Diterima Bersih</p>
                  <p className="text-xl font-bold text-emerald-600 tracking-tight leading-none">
                    Rp{new Intl.NumberFormat('id-ID').format(hasilPph23.thp)}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 text-right">
                  <div className="flex justify-between w-28 text-[10px]">
                    <span className="text-slate-400 font-medium">Tarif Aktif</span>
                    <span className="text-slate-700 font-bold">{hasilPph23.tarifAkhir}%</span>
                  </div>
                  {!adaNpwp && (
                    <span className="text-[9px] text-red-500 font-medium block mt-1">
                      (Tarif 100% lebih tinggi karena tanpa NPWP)
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Calculator;