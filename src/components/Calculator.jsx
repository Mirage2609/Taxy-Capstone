import React from 'react';

function Calculator() {
  return (
    <div className="relative w-full flex justify-center lg:justify-end">
      {/* Lebar dikunci presisi 375px sesuai Figma agar tidak kepotong */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 w-[375px] border border-slate-100 flex-shrink-0">
        
        {/* Toggle PPH */}
        <div className="flex bg-slate-100 p-1 rounded-full mb-6 text-sm">
          <button className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-sm">PPH 21</button>
          <button className="flex-1 py-2 text-slate-500 font-semibold rounded-full hover:text-slate-700 transition">PPH 23</button>
        </div>

        {/* Form Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Gaji Bulanan</label>
            <input type="text" defaultValue="Rp8.000.000" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Status</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 bg-white cursor-pointer text-sm">
                <option>TK/0</option>
                <option>K/0</option>
                <option>K/1</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Tanggungan</label>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-blue-500 bg-white cursor-pointer text-sm">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Kotak Output */}
        <div className="mt-6 space-y-4">
          <p className="text-xs font-medium text-slate-600">Output</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-600 text-white rounded-xl p-3">
              <p className="text-[10px] text-blue-100 font-medium mb-1">Pajak Bulananan</p>
              <p className="text-lg font-bold tracking-tight leading-none">Rp175.000</p>
            </div>
            <div className="bg-green-100 text-green-900 rounded-xl p-3 border border-green-200">
              <p className="text-[10px] text-green-900 font-medium mb-1">Pajak Tahunan</p>
              <p className="text-lg font-bold tracking-tight leading-none">Rp2.100.000</p>
            </div>
          </div>

          {/* Ringkasan Take Home Pay & PKP */}
          <div className="flex justify-between items-end border-t border-slate-100 pt-4">
            <div>
              <p className="text-[10px] text-slate-500 font-medium mb-1 leading-none">Take Home Pay</p>
              <p className="text-xl font-bold text-emerald-600 tracking-tight leading-none">Rp7.825.000</p>
            </div>
            <div className="flex flex-col gap-0.5 text-right">
              <div className="flex justify-between w-28 text-[10px]">
                <span className="text-slate-400 font-medium">PKP</span>
                <span className="text-slate-700 font-bold">Rp42.000.000</span>
              </div>
              <div className="flex justify-between w-28 text-[10px]">
                <span className="text-slate-400 font-medium">PKP</span>
                <span className="text-slate-700 font-bold tracking-tight">5%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Calculator;