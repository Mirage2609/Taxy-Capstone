function Hero({ onNavigate }) {
  return (
    <div className="pr-10">
      {/* Warna teks dipertegas menjadi dark navy (slate-900) agar terlihat di atas container putih */}
      <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 select-none">
        Hitung Pajak Kamu dalam 30 DETIK
      </h1>
      
      <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-md">
        Estimasi PPH 21 & PPH 23 dengan mudah, cepat, dan tanpa ribet
      </p>
      
      <div className="flex space-x-4 font-semibold">
        <button 
          onClick={() => onNavigate && onNavigate('calculator')}
          className="px-8 py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 cursor-pointer active:scale-[0.98]"
        >
          Coba Kalkulator
        </button>
        <button 
          onClick={() => onNavigate && onNavigate('register')}
          className="px-8 py-3.5 bg-transparent text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition hover:border-blue-300 cursor-pointer active:scale-[0.98]"
        >
          Mulai Gratis
        </button>
      </div>
    </div>
  );
}

export default Hero;