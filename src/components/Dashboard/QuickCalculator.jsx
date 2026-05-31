import { useState, useRef, useEffect } from 'react';
import ChevronIcon from '../../assets/chevron.svg';

function QuickCalculator({
  jenisPajak,
  setJenisPajak,
  gaji,
  setGaji,
  status,
  setStatus,
  tanggungan,
  setTanggungan,
  bruto,
  setBruto,
  jenisObjek,
  setJenisObjek,
  adaNpwp,
  setAdaNpwp,
  pajakBulanan,
  takeHomePay,
  resPph21,
  resPph23,
  handleSaveToHistory,
  formatRupiah,
  handleFormatRupiahInput
}) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTanggunganOpen, setIsTanggunganOpen] = useState(false);
  const [isObjOpen, setIsObjOpen] = useState(false);

  const statusRef = useRef(null);
  const tanggunganRef = useRef(null);
  const objekRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsStatusOpen(false);
      }
      if (tanggunganRef.current && !tanggunganRef.current.contains(event.target)) {
        setIsTanggunganOpen(false);
      }
      if (objekRef.current && !objekRef.current.contains(event.target)) {
        setIsObjOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-base font-extrabold text-slate-800">Quick Calculator</h3>
        
        {/* PPh 21 / PPh 23 Switch Tab */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setJenisPajak('PPH21')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              jenisPajak === 'PPH21' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            PPh 21
          </button>
          <button
            onClick={() => setJenisPajak('PPH23')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              jenisPajak === 'PPH23' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            PPh 23
          </button>
        </div>
      </div>

      {/* Dynamic Form Area */}
      {jenisPajak === 'PPH21' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* Gaji Bulanan Input */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Gaji Bulanan</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 text-sm font-semibold">Rp</span>
              <input
                type="text"
                value={gaji ? new Intl.NumberFormat('id-ID').format(gaji) : ''}
                onChange={(e) => handleFormatRupiahInput(e, setGaji)}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 bg-[#f8fafc] text-sm font-semibold transition"
                placeholder="0"
              />
            </div>
          </div>

          {/* Custom Select Status PTKP */}
          <div className="relative" ref={statusRef}>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Status Pernikahan (PTKP)</label>
            <button
              type="button"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold flex items-center justify-between focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 transition text-left"
            >
              <span>{status === 'TK' || status.startsWith('TK') ? 'Lajang (TK)' : 'Menikah (K)'}</span>
              <img src={ChevronIcon} className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} alt="" />
            </button>
            
            {/* Dropdown Options */}
            {isStatusOpen && (
              <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-scale-up text-left">
                <button
                  type="button"
                  onClick={() => { setStatus('TK/0'); setIsStatusOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-blue-50/60 transition ${status === 'TK/0' ? 'text-blue-600' : 'text-slate-700'}`}
                >
                  Lajang / Tidak Kawin (TK)
                </button>
                <button
                  type="button"
                  onClick={() => { setStatus('K/0'); setIsStatusOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-blue-50/60 transition ${status.startsWith('K') ? 'text-blue-600' : 'text-slate-700'}`}
                >
                  Kawin / Menikah (K)
                </button>
              </div>
            )}
          </div>

          {/* Custom Select Tanggungan */}
          <div className="relative" ref={tanggunganRef}>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Jumlah Tanggungan</label>
            <button
              type="button"
              onClick={() => setIsTanggunganOpen(!isTanggunganOpen)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold flex items-center justify-between focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 transition text-left"
            >
              <span>{tanggungan} Tanggungan</span>
              <img src={ChevronIcon} className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isTanggunganOpen ? 'rotate-180' : ''}`} alt="" />
            </button>

            {/* Dropdown Options */}
            {isTanggunganOpen && (
              <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-scale-up text-left">
                {['0', '1', '2', '3'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => { setTanggungan(item); setIsTanggunganOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-blue-50/60 transition ${tanggungan === item ? 'text-blue-600' : 'text-slate-700'}`}
                  >
                    {item} Tanggungan
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* PPh 23 Form */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {/* Bruto Input */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Nilai Bruto Jasa</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 text-sm font-semibold">Rp</span>
              <input
                type="text"
                value={bruto ? new Intl.NumberFormat('id-ID').format(bruto) : ''}
                onChange={(e) => handleFormatRupiahInput(e, setBruto)}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 bg-[#f8fafc] text-sm font-semibold transition"
                placeholder="0"
              />
            </div>
          </div>

          {/* Custom Select Objek Pajak */}
          <div className="relative" ref={objekRef}>
            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Objek Pajak</label>
            <button
              type="button"
              onClick={() => setIsObjOpen(!isObjOpen)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold flex items-center justify-between focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50 transition text-left"
            >
              <span>{jenisObjek === '0.02' ? 'Penyediaan Jasa / Sewa (2%)' : 'Royalti / Dividen (15%)'}</span>
              <img src={ChevronIcon} className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isObjOpen ? 'rotate-180' : ''}`} alt="" />
            </button>

            {/* Dropdown Options */}
            {isObjOpen && (
              <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-scale-up text-left">
                <button
                  type="button"
                  onClick={() => { setJenisObjek('0.02'); setIsObjOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-blue-50/60 transition ${jenisObjek === '0.02' ? 'text-blue-600' : 'text-slate-700'}`}
                >
                  Penyediaan Jasa / Sewa Peralatan (2%)
                </button>
                <button
                  type="button"
                  onClick={() => { setJenisObjek('0.15'); setIsObjOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-blue-50/60 transition ${jenisObjek === '0.15' ? 'text-blue-600' : 'text-slate-700'}`}
                >
                  Royalti, Dividen, Bunga (15%)
                </button>
              </div>
            )}
          </div>

          {/* NPWP Checkbox */}
          <div className="flex items-center space-x-2 mt-7 ml-2">
            <input
              type="checkbox"
              id="adaNpwp"
              checked={adaNpwp}
              onChange={(e) => setAdaNpwp(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-slate-300 rounded-lg focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="adaNpwp" className="text-xs font-bold text-slate-600 cursor-pointer select-none">
              Wajib Pajak memiliki NPWP
            </label>
          </div>
        </div>
      )}

      {/* Outputs */}
      <div className="border-t border-slate-100 pt-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hasil Perhitungan</span>
          <button 
            onClick={handleSaveToHistory}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-700 active:scale-[0.97] transition"
          >
            + Simpan ke Riwayat
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-left">
            <p className="text-[10px] text-slate-400 font-bold mb-1">Pajak Bulanan</p>
            <p className="text-base font-extrabold text-red-500 tracking-tight transition-all duration-300">
              {formatRupiah(pajakBulanan)}
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-left">
            <p className="text-[10px] text-slate-400 font-bold mb-1">Take Home Pay (THP)</p>
            <p className="text-base font-extrabold text-emerald-600 tracking-tight transition-all duration-300">
              {formatRupiah(takeHomePay)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickCalculator;
