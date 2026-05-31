import React from 'react';

function CTASection({ onNavigate, onScrollToCalculator }) {
  return (
    <section className="w-full bg-blue-600 rounded-3xl px-10 lg:px-20 py-16 lg:py-20 text-center shadow-[0_20px_60px_rgba(37,99,235,0.25)]">
      <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 select-none leading-tight tracking-tight">
        Mulai Kelola Pajak Kamu Sekarang
      </h2>
      <p className="text-blue-200 text-[15px] mb-10 max-w-md mx-auto leading-relaxed">
        Gratis untuk semua fitur dasar. Upgrade kapan saja untuk fitur premium.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => onNavigate && onNavigate('register')}
          className="px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition shadow-lg cursor-pointer active:scale-[0.98]"
        >
          Daftar Gratis
        </button>
        <button
          onClick={onScrollToCalculator}
          className="px-10 py-4 bg-transparent text-white font-semibold border-2 border-white/40 rounded-xl hover:bg-white/10 hover:border-white/60 transition cursor-pointer active:scale-[0.98]"
        >
          Coba Tanpa Login
        </button>
      </div>
    </section>
  );
}

export default CTASection;
