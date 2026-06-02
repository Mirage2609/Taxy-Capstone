import { useState, useEffect } from 'react';

function Navbar({ currentView, onNavigate, user, onLogout }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Scroll listener to automatically update active section on scroll
    useEffect(() => {
        if (currentView !== 'calculator') {
            setActiveSection('');
            return;
        }

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200; // Trigger offset

            // If near top, set to Home
            if (window.scrollY < 120) {
                setActiveSection('home');
                return;
            }

            const sections = [
                { id: 'section-calculator', name: 'calculator' },
                { id: 'section-fitur', name: 'fitur' },
                { id: 'section-edukasi', name: 'edukasi' },
                { id: 'section-faq', name: 'faq' }
            ];

            for (const section of sections) {
                const el = document.getElementById(section.id);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section.name);
                        return;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial active check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentView]);

    const scrollToSection = (id, sectionName) => {
        setActiveSection(sectionName);
        if (currentView !== 'calculator') {
            onNavigate('calculator');
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior : 'smooth' });
        }
    };

    const handleHomeClick = () => {
        setActiveSection('home');
        onNavigate('calculator');
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.getElementById('section-calculator')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    const getLinkClass = (sectionName) => {
        const isActive = currentView === 'calculator' && activeSection === sectionName;
        return `cursor-pointer transition pb-1 ${
            isActive 
                ? 'text-slate-900 font-bold border-b-2 border-slate-900' 
                : 'text-slate-500 hover:text-blue-600'
        }`;
    };

    const getMobileLinkClass = (sectionName) => {
        const isActive = currentView === 'calculator' && activeSection === sectionName;
        return `cursor-pointer transition pl-2 ${
            isActive 
                ? 'text-slate-900 border-l-4 border-slate-900 font-bold' 
                : 'text-slate-500 hover:text-blue-600'
        }`;
    };
    
    return (
        <nav className="w-full bg-slate-100 sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center px-6 md:px-10 py-5">
                
                {/* Logo */}
                <div 
                    onClick={handleHomeClick}
                    className="text-3xl font-black text-slate-900 tracking-tighter cursor-pointer select-none"
                >
                    Taxy
                </div>
                
                {/* Desktop Menu Items */}
                <ul className="hidden md:flex space-x-10 text-sm font-semibold">
                    <li 
                        onClick={handleHomeClick}
                        className={getLinkClass('home')}
                    >
                        Home
                    </li>
                    <li 
                        onClick={() => scrollToSection('section-calculator', 'calculator')}
                        className={getLinkClass('calculator')}
                    >
                        Calculator
                    </li>
                    <li 
                        onClick={() => scrollToSection('section-fitur', 'fitur')}
                        className={getLinkClass('fitur')}
                    >
                        Fitur
                    </li>
                    <li 
                        onClick={() => scrollToSection('section-edukasi', 'edukasi')}
                        className={getLinkClass('edukasi')}
                    >
                        Edukasi
                    </li>
                    <li 
                        onClick={() => scrollToSection('section-faq', 'faq')}
                        className={getLinkClass('faq')}
                    >
                        FAQ
                    </li>
                </ul>
                
                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex space-x-4 text-sm font-medium items-center">
                    {user ? (
                        <>
                            <button 
                                onClick={() => onNavigate('dashboard')}
                                className="px-6 py-2.5 font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition rounded-xl cursor-pointer active:scale-[0.98]"
                            >
                                Buka Dashboard
                            </button>
                            <button 
                                onClick={onLogout}
                                className="px-4 py-2.5 font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition rounded-xl cursor-pointer active:scale-[0.98]"
                            >
                                Keluar
                            </button>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex md:hidden p-2 text-slate-600 hover:bg-slate-200 rounded-xl transition cursor-pointer"
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 animate-scale-up">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 animate-scale-up">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

            </div>

            {/* Mobile Dropdown Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-200 py-6 px-6 space-y-5 shadow-2xl animate-scale-up text-left">
                    <ul className="flex flex-col space-y-4 text-sm font-bold text-slate-500">
                        <li 
                            onClick={() => { handleHomeClick(); setIsMobileMenuOpen(false); }}
                            className={getMobileLinkClass('home')}
                        >
                            Home
                        </li>
                        <li 
                            onClick={() => { scrollToSection('section-calculator', 'calculator'); setIsMobileMenuOpen(false); }}
                            className={getMobileLinkClass('calculator')}
                        >
                            Calculator
                        </li>
                        <li 
                            onClick={() => { scrollToSection('section-fitur', 'fitur'); setIsMobileMenuOpen(false); }} 
                            className={getMobileLinkClass('fitur')}
                        >
                            Fitur
                        </li>
                        <li 
                            onClick={() => { scrollToSection('section-edukasi', 'edukasi'); setIsMobileMenuOpen(false); }} 
                            className={getMobileLinkClass('edukasi')}
                        >
                            Edukasi
                        </li>
                        <li 
                            onClick={() => { scrollToSection('section-faq', 'faq'); setIsMobileMenuOpen(false); }} 
                            className={getMobileLinkClass('faq')}
                        >
                            FAQ
                        </li>
                    </ul>
                    
                    {/* Mobile Auth Buttons / Profile Panel */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
                        {user ? (
                            <>
                                <button 
                                    onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }}
                                    className="w-full py-3 font-semibold text-blue-600 bg-blue-50 rounded-xl text-center cursor-pointer active:scale-[0.98] transition"
                                >
                                    Buka Dashboard
                                </button>
                                <button 
                                    onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                                    className="w-full py-3 font-semibold text-red-600 hover:bg-red-50 rounded-xl text-center cursor-pointer active:scale-[0.98] transition"
                                >
                                    Keluar
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }}
                                    className="w-full py-3 font-semibold text-slate-700 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-center transition"
                                >
                                    Masuk
                                </button>
                                <button 
                                    onClick={() => { onNavigate('register'); setIsMobileMenuOpen(false); }}
                                    className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-center font-bold shadow-lg shadow-blue-200 active:scale-[0.98] transition"
                                >
                                    Daftar Gratis
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
