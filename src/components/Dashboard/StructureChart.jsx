function StructureChart({ gaji, resPph21, gajiBarHeight, ptkpBarHeight, pkpBarHeight, formatRupiah }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-base font-extrabold text-slate-800 mb-6 text-left">Struktur Hitungan Pajak</h3>
      
      {/* Interactive Bar Chart */}
      <div className="flex items-end justify-around h-44 border-b border-slate-100 pb-2 relative">
        {/* Bar 1: Gaji Tahunan */}
        <div className="flex flex-col items-center w-20 group h-full justify-end">
          <span className="text-[10px] font-bold text-blue-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {formatRupiah(gaji * 12)}
          </span>
          <div className="h-32 w-12 flex items-end justify-center">
            <div 
              style={{ height: `${gajiBarHeight}%` }}
              className="w-full bg-blue-600 rounded-t-xl transition-all duration-700 ease-out shadow-lg shadow-blue-100 group-hover:bg-blue-700"
            ></div>
          </div>
          <span className="text-xs font-bold text-slate-700 mt-2">Gaji Tahunan</span>
        </div>

        {/* Bar 2: PTKP */}
        <div className="flex flex-col items-center w-20 group h-full justify-end">
          <span className="text-[10px] font-bold text-blue-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {formatRupiah(resPph21.ptkp)}
          </span>
          <div className="h-32 w-12 flex items-end justify-center">
            <div 
              style={{ height: `${ptkpBarHeight}%` }}
              className="w-full bg-blue-500 rounded-t-xl transition-all duration-700 ease-out shadow-lg shadow-blue-100 group-hover:bg-blue-600"
            ></div>
          </div>
          <span className="text-xs font-bold text-slate-700 mt-2">PTKP</span>
        </div>

        {/* Bar 3: PKP */}
        <div className="flex flex-col items-center w-20 group h-full justify-end">
          <span className="text-[10px] font-bold text-slate-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {formatRupiah(resPph21.pkp)}
          </span>
          <div className="h-32 w-12 flex items-end justify-center">
            <div 
              style={{ height: `${pkpBarHeight}%` }}
              className="w-full bg-slate-400 rounded-t-xl transition-all duration-700 ease-out shadow-lg shadow-slate-100 group-hover:bg-slate-500"
            ></div>
          </div>
          <span className="text-xs font-bold text-slate-700 mt-2">PKP</span>
        </div>
      </div>
      
      {/* Visual Helpers */}
      <div className="flex justify-between text-[10px] text-slate-400 mt-4 font-semibold px-4">
        <span>* Batasan PKP = Gaji Tahunan - PTKP</span>
        <span>Dihitung Berdasarkan Data Terkini</span>
      </div>
    </div>
  );
}

export default StructureChart;
