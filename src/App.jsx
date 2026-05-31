import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import LoginCard from './components/Login/LoginCard';
import RegisterCard from './components/Register/RegisterCard';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import Dashboard from './components/Dashboard';

function App() {
  // State ini untuk melacak view aktif: 'calculator', 'login', 'register', atau 'dashboard'
  const [currentView, setCurrentView] = useState('calculator');
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col">
      {currentView !== 'dashboard' && <Navbar currentView={currentView} onNavigate={setCurrentView} />}
      <main className="flex-1 w-full flex items-center p-8">
        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(15,23,42,0.28)] border border-slate-200/50 overflow-hidden min-h-[80vh] flex flex-col justify-center">
          
          {currentView === 'dashboard' ? (
            <Dashboard user={user} onLogout={() => { setUser(null); setCurrentView('calculator'); }} />
          ) : (
            <>
              {/* Main Grid for Hero and Interactive Card */}
              <div className="px-8 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <Hero onNavigate={setCurrentView} />
                {currentView === 'calculator' && <Calculator />}
                {currentView === 'login' && (
                  <LoginCard 
                    onNavigate={setCurrentView} 
                    onLoginSuccess={(username) => {
                      setUser({ username });
                      setCurrentView('dashboard');
                    }} 
                  />
                )}
                {currentView === 'register' && <RegisterCard onNavigate={setCurrentView} />}
              </div>

              {/* Problem and Solution Sections on Home View (Scroll down) */}
              {currentView === 'calculator' && (
                <div className="bg-slate-50/60 border-t border-slate-100/80 px-8 lg:px-20 py-20 space-y-20">
                  <ProblemSection />
                  <SolutionSection />
                </div>
              )}
            </>
          )}

        </div>
      </main>

    </div>
  );
}

export default App;