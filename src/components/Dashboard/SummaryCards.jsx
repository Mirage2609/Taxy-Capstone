import TaxesIcon from '../../assets/taxes.svg';

function SummaryCards({ pajakBulanan, paymentStatus, handlePayment, formatRupiah }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1: Total Pajak Bulanan */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center space-x-4 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
          <img src={TaxesIcon} className="w-7 h-7" alt="" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-slate-400 mb-1">Total Pajak Bulanan</p>
          <p className="text-xl font-extrabold text-slate-900 tracking-tight transition-all duration-300">
            {formatRupiah(pajakBulanan)}
          </p>
        </div>
      </div>

      {/* Card 2: Estimasi Terakhir */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center space-x-4 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-slate-400 mb-1">Estimasi Terakhir</p>
          <p className="text-xl font-extrabold text-blue-600 tracking-tight">
            Mei 2026
          </p>
        </div>
      </div>

      {/* Card 3: Status Pembayaran */}
      <div 
        onClick={handlePayment}
        className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between shadow-sm hover:shadow-md cursor-pointer group transition"
      >
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            paymentStatus === 'Belum Dibayar' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-400 mb-1">Status Pembayaran</p>
            <p className={`text-xl font-extrabold tracking-tight transition-all duration-300 ${
              paymentStatus === 'Belum Dibayar' ? 'text-red-500 group-hover:text-red-600' : 'text-emerald-500 group-hover:text-emerald-600'
            }`}>
              {paymentStatus}
            </p>
          </div>
        </div>
        <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
          Simulasi Bayar
        </span>
      </div>
    </div>
  );
}

export default SummaryCards;
