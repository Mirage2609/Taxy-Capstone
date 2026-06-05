import { useState, useEffect } from 'react';
import Navbar from './components/Landing/Navbar';
import Hero from './components/Landing/Hero';
import Calculator from './components/Landing/Calculator';
import LoginCard from './components/Auth/LoginCard';
import RegisterCard from './components/Auth/RegisterCard';
import ProblemSection from './components/Landing/ProblemSection';
import SolutionSection from './components/Landing/SolutionSection';
import Dashboard from './components/Dashboard/Dashboard';
import FeatureSection from './components/Landing/FeatureSection';
import EdukasiSection from './components/Landing/EdukasiSection';
import CaraKerjaSection from './components/Landing/CaraKerjaSection';
import CTASection from './components/Landing/CTASection';
import FAQSection from './components/Landing/FAQSection';
import Footer from './components/Landing/Footer';
import { apiService } from './services/api';

function App() {
  // State ini untuk melacak view aktif: 'calculator', 'login', 'register', atau 'dashboard'
  const [currentView, setCurrentView] = useState('calculator');
  const [user, setUser] = useState(null);

  // Restore session on mount
  useEffect(() => {
    const activeUser = apiService.getActiveUser();
    if (activeUser) {
      setUser(activeUser);
      setCurrentView('dashboard');
    }
  }, []);

  const scrollToCalculator = () => {
    document.getElementById('section-calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex flex-col">
      {currentView !== 'dashboard' && (
        <Navbar 
          currentView={currentView} 
          onNavigate={setCurrentView} 
          user={user}
          onLogout={() => {
            apiService.logoutUser();
            setUser(null);
            setCurrentView('calculator');
          }}
        />
      )}
      <main className="flex-1 w-full flex items-center p-8">
        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(15,23,42,0.28)] border border-slate-200/50 overflow-hidden min-h-[80vh] flex flex-col justify-center">

          {currentView === 'dashboard' ? (
            <Dashboard user={user} onLogout={() => { apiService.logoutUser(); setUser(null); setCurrentView('calculator'); }} />
          ) : (
            <>
              {/* Main Grid for Hero and Interactive Card */}
              <div id="section-calculator" className="px-8 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                  <div id="section-fitur"><FeatureSection /></div>
                  <div id="section-edukasi"><EdukasiSection /></div>
                  <CaraKerjaSection />
                  <CTASection onNavigate={setCurrentView} onScrollToCalculator={scrollToCalculator} />
                  <div id="section-faq"><FAQSection /></div>
                  <Footer onNavigate={setCurrentView} />
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
