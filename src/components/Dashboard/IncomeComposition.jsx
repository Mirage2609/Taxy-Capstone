function IncomeComposition({
  jenisPajak,
  totalGaji,
  takeHomePay,
  pajakBulanan,
  resPph21,
  resPph23,
  radius,
  circumference,
  taxStrokeDashOffset,
  netPercent,
  taxPercent,
  formatRupiah
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center">
      <h3 className="text-base font-extrabold text-slate-800 mb-6 w-full text-left">Komposisi Penghasilan</h3>
      
      {/* Dynamic SVG Donut Chart */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background slice (Take Home Pay - Emerald Green) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#10b981"
            strokeWidth="12"
          />
          {/* Foreground slice (Tax - Coral Red) */}
          {taxPercent > 0 && (
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="transparent"
              stroke="#ef4444"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={taxStrokeDashOffset}
              className="transition-all duration-500 ease-out"
            />
          )}
        </svg>
        {/* Central dynamic label */}
        <div className="absolute text-center">
          <p className="text-xs font-black text-slate-800 leading-none">
            {netPercent.toFixed(1)}%
          </p>
          <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">THP Bersih</p>
        </div>
      </div>

      {/* Legend list */}
      <div className="w-full mt-6 space-y-2 text-left">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span>Take Home Pay</span>
          </div>
          <span className="text-slate-800 font-extrabold">{formatRupiah(takeHomePay)}</span>
        </div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Pajak Terpotong</span>
          </div>
          <span className="text-slate-800 font-extrabold">{formatRupiah(pajakBulanan)}</span>
        </div>
      </div>

      {/* Detailed explanation */}
      <div className="mt-6 pt-5 border-t border-slate-100 w-full text-left space-y-3">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Penjelasan Komposisi</h4>
        
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-3">
          <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
            Berdasarkan hitungan simulasi pajak teraktif Anda:
          </p>
          
          <ul className="space-y-2 text-[11px] font-semibold text-slate-500">
            <li className="flex items-start space-x-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>
                Sebesar <strong className="text-slate-800">{netPercent.toFixed(2)}% ({formatRupiah(takeHomePay)})</strong> dari total gaji Anda adalah <strong>Penghasilan Bersih (THP)</strong> yang dapat dibelanjakan langsung.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold">✗</span>
              <span>
                Sebesar <strong className="text-slate-800">{taxPercent.toFixed(2)}% ({formatRupiah(pajakBulanan)})</strong> disisihkan secara wajib untuk pemenuhan kewajiban <strong>{jenisPajak === 'PPH21' ? 'PPh Pasal 21' : 'PPh Pasal 23'}</strong> Anda.
              </span>
            </li>
          </ul>

          <div className="border-t border-slate-200/60 pt-2 text-[10px] text-slate-400 font-semibold leading-relaxed">
            {jenisPajak === 'PPH21' ? (
              <span>
                * Mengapa tarif Anda {resPph21.persentase}? Karena gaji tahunan Anda dipotong batas PTKP senilai {formatRupiah(resPph21.ptkp)}, menyisakan pendapatan kena pajak (PKP) {formatRupiah(resPph21.pkp)} yang dikenakan tarif progresif dasar pertama 5% di bawah batas maksimal 60 juta rupiah setahun.
              </span>
            ) : (
              <span>
                * Pemotongan PPh 23 atas bruto senilai {formatRupiah(totalGaji)} dikenakan tarif {resPph23.tarifAkhir / (resPph23.tarifAkhir === 4 || resPph23.tarifAkhir === 30 ? 2 : 1)}% (Objek Pajak). {resPph23.tarifAkhir === 4 || resPph23.tarifAkhir === 30 ? 'Dikenakan sanksi 100% karena tanpa NPWP.' : 'Kewajiban berjalan optimal.'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeComposition;
