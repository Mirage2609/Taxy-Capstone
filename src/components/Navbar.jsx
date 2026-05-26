import React from "react";

function Navbar() {
    return (
        <nav className="w-full bg-slate-100 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center px-10 py-5">
                
                <div className="text-3xl font-black text-slate-900 tracking-tighter">Taxy</div>
                
                <ul className="hidden md:flex space-x-10 text-sm font-semibold text-slate-500">
                    <li className="text-slate-900 border-b-2 border-slate-900 pb-1 cursor-pointer">Home</li>
                    <li className="cursor-pointer hover:text-blue-600 transition">Calculator</li>
                    <li className="cursor-pointer hover:text-blue-600 transition">Fitur</li>
                    <li className="cursor-pointer hover:text-blue-600 transition">Edukasi</li>
                    <li className="cursor-pointer hover:text-blue-600 transition">FAQ</li>
                </ul>
                
                <div className="flex space-x-4 text-sm font-medium">
                    <button className="px-6 py-2.5 text-slate-700 font-semibold hover:text-blue-600 transition hover:bg-blue-50 hover:rounded-lg">Masuk</button>
                    <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200">Daftar Gratis</button>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;