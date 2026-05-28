import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import LoginCard from './components/Login/LoginCard';
import RegisterCard from './components/Register/RegisterCard';

function App() {
  // State untuk melacak view aktif: 'calculator', 'login', atau 'register'
  const [currentView, setCurrentView] = useState('calculator');

  return (
    // Background dasar aplikasi yang kini kembali abu-abu kusam (slate-100)
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col">
      
      {/* Navbar berdiri sendiri di paling atas */}
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {/* Area Konten Utama: Memberi jarak (p-8) dari Navbar */}
      <main className="flex-1 w-full flex items-center p-8">
        
        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(15,23,42,0.28)] border border-slate-200/50 overflow-hidden min-h-[80vh] flex flex-col justify-center">
          
          {/* Isi di dalam Container: Padding dinaikkan (px-20) */}
          <div className="px-8 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Hero onNavigate={setCurrentView} />
            {currentView === 'calculator' && <Calculator />}
            {currentView === 'login' && <LoginCard onNavigate={setCurrentView} />}
            {currentView === 'register' && <RegisterCard onNavigate={setCurrentView} />}
          </div>

        </div>
      </main>

    </div>
  );
}

export default App;