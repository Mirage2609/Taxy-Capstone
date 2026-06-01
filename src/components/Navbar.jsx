function Navbar({ currentView, onNavigate }) {
    const scrollToSection = (id) => {
        if (currentView !== 'calculator') {
            onNavigate('calculator');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior : 'smooth' });
        }
    };
    
    return (
        <nav className="w-full bg-slate-100 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center px-10 py-5">
                
                {/* Logo */}
                <div 
                    onClick={() => onNavigate('calculator')}
                    className="text-3xl font-black text-slate-900 tracking-tighter cursor-pointer select-none"
                >
                    Taxy
                </div>
                
                {/* Menu Items */}
                <ul className="hidden md:flex space-x-10 text-sm font-semibold text-slate-500">
                    <li 
                        onClick={() => onNavigate('calculator')}
                        className={`cursor-pointer transition pb-1 ${
                            currentView === 'calculator' 
                                ? 'text-slate-900 border-b-2 border-slate-900' 
                                : 'hover:text-blue-600'
                        }`}
                    >
                        Home
                    </li>
                    <li 
                        onClick={() => scrollToSection('section-calculator')}
                        className={`cursor-pointer transition pb-1 ${
                            currentView === 'calculator' 
                                ? 'text-blue-600 font-bold' 
                                : 'hover:text-blue-600'
                        }`}
                    >
                        Calculator
                    </li>
                    <li onClick={() => scrollToSection('section-fitur')} className="cursor-pointer hover:text-blue-600 transition pb-1">Fitur</li>
                    <li onClick={() => scrollToSection('section-edukasi')} className="cursor-pointer hover:text-blue-600 transition pb-1">Edukasi</li>
                    <li onClick={() => scrollToSection('section-faq')} className="cursor-pointer hover:text-blue-600 transition pb-1">FAQ</li>
                </ul>
                
                {/* Auth Buttons */}
                <div className="flex space-x-4 text-sm font-medium">
                    <button 
                        onClick={() => onNavigate('login')}
                        className={`px-6 py-2.5 font-semibold transition rounded-xl ${
                            currentView === 'login'
                                ? 'text-blue-600 bg-blue-50'
                                : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                    >
                        Masuk
                    </button>
                    <button 
                        onClick={() => onNavigate('register')}
                        className={`px-6 py-2.5 text-white rounded-xl transition shadow-lg cursor-pointer ${
                            currentView === 'register'
                                ? 'bg-blue-800 shadow-blue-300 scale-[1.02] font-semibold'
                                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                        }`}
                    >
                        Daftar Gratis
                    </button>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
