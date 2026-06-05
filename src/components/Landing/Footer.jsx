import React from 'react';

function Footer({ onNavigate }) {
  return (
    <footer className="w-full border-t border-slate-100 pt-14 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

        {/* Brand */}
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            {/* Mini logo box */}
            <div className="w-9 h-9 bg-slate-200 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-600">
                <rect x="4" y="4" width="24" height="24" rx="4" />
                <path d="M10 10h12M16 10v12M10 22h12" />
              </svg>
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter select-none">Taxy</span>
          </div>
          <p className="text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
            Kalkulator pajak sederhana untuk generasi muda Indonesia. Hitung PPH 21 & PPH 23 dengan mudah, cepat, dan akurat.
          </p>
        </div>

        {/* Tentang Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-800 mb-4 select-none">Tentang</h4>
          <ul className="space-y-2.5 text-[13px] text-slate-500">
            <li className="hover:text-blue-600 cursor-pointer transition">Tentang Kami</li>
            <li className="hover:text-blue-600 cursor-pointer transition">Fitur</li>
            <li className="hover:text-blue-600 cursor-pointer transition">Blog</li>
            <li className="hover:text-blue-600 cursor-pointer transition">Kontak</li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-800 mb-4 select-none">Legal</h4>
          <ul className="space-y-2.5 text-[13px] text-slate-500">
            <li className="hover:text-blue-600 cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-blue-600 cursor-pointer transition">Terms of Service</li>
            <li className="hover:text-blue-600 cursor-pointer transition">Cookie Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-100 pt-6">
        <p className="text-[12px] text-slate-400 select-none">
          © 2026 Taxy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
