import { apiService } from '../../services/api';

function HistoryList({ history, setHistory, formatRupiah, user }) {
  const handleDeleteItem = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus item riwayat ini?')) {
      return;
    }
    
    try {
      await apiService.deleteHistory(user.username, id);
      setHistory(prev => prev.filter(item => item.id !== id));
      alert('Riwayat berhasil dihapus!');
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus riwayat: ' + err.message);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus seluruh riwayat simulasi?')) {
      return;
    }

    try {
      // Loop through all history items of this user and delete them
      for (const item of history) {
        await apiService.deleteHistory(user.username, item.id);
      }
      setHistory([]);
      alert('Seluruh riwayat berhasil dibersihkan!');
    } catch (err) {
      console.error(err);
      alert('Gagal membersihkan riwayat: ' + err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 animate-scale-up">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-xl font-extrabold text-slate-800 text-left">Riwayat Simulasi Pajak</h2>
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs font-bold text-red-600 hover:text-red-700 transition"
          >
            Bersihkan Riwayat
          </button>
        )}
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
                <th className="pb-3 text-center">Aksi</th>
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
                  <td className="py-4 text-center">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition duration-200 active:scale-[0.95]"
                      title="Hapus"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </td>
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
