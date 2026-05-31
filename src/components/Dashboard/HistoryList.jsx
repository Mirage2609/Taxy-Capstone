function HistoryList({ history, setHistory, formatRupiah }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-xl font-extrabold text-slate-800 text-left">Riwayat Simulasi Pajak</h2>
        <button
          onClick={() => {
            if (window.confirm('Apakah Anda yakin ingin menghapus seluruh riwayat simulasi?')) {
              setHistory([]);
            }
          }}
          className="text-xs font-bold text-red-600 hover:underline"
        >
          Bersihkan Riwayat
        </button>
      </div>

      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 font-medium">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-xs font-bold uppercase">
                <th className="pb-3">Waktu</th>
                <th className="pb-3">Jenis</th>
                <th className="pb-3">Pendapatan Kotor</th>
                <th className="pb-3">PTKP / Tarif</th>
                <th className="pb-3 text-red-500">Pajak Bulanan</th>
                <th className="pb-3 text-emerald-600">Take Home Pay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 text-xs font-bold text-slate-400">{item.timestamp}</td>
                  <td className="py-4 font-bold text-slate-800">{item.jenis}</td>
                  <td className="py-4 font-bold text-slate-700">{formatRupiah(item.gaji)}</td>
                  <td className="py-4 text-xs font-bold text-slate-500">{item.status}</td>
                  <td className="py-4 font-extrabold text-red-500">{formatRupiah(item.pajakBulanan)}</td>
                  <td className="py-4 font-extrabold text-emerald-600">{formatRupiah(item.takeHomePay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 text-center text-slate-400">
          <p className="text-sm font-semibold">Belum ada riwayat simulasi tersimpan.</p>
          <p className="text-xs mt-1">Gunakan tombol "+ Simpan ke Riwayat" pada kalkulator cepat untuk menambahkan.</p>
        </div>
      )}
    </div>
  );
}

export default HistoryList;
