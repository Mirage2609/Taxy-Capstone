import { useState } from 'react';
import LoginHeader from './LoginHeader';
import InputField from './InputField';
import LoginButton from './LoginButton';
import { apiService } from '../../services/api';

function LoginCard({ onNavigate, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when typing
    if (errors[name] || errors.general) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username wajib diisi';
    }
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password minimal 4 karakter';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await apiService.loginUser({
        username: formData.username,
        password: formData.password
      });
      setIsLoading(false);
      setLoginSuccess(true);
      
      // Automatically redirect after 1.2 seconds of animation
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(response.user.username);
        }
      }, 1200);
    } catch (err) {
      setIsLoading(false);
      setErrors({ general: err.message });
    }
  };

  return (
    <div className="relative w-full flex justify-center lg:justify-end animate-fade-in-up">
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(15,23,42,0.12)] p-10 w-full max-w-[480px] border border-slate-100 flex-shrink-0 transition-all duration-300">
        
        {loginSuccess ? (
          // Success State
          <div className="text-center py-10 px-4 animate-scale-up">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 border border-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-2">Login Berhasil!</h3>
            <p className="text-slate-500 font-medium mb-8">
              Selamat datang kembali, <span className="text-blue-600 font-bold">{formData.username}</span>. Anda akan diarahkan ke Dashboard.
            </p>
            
            <button
              onClick={() => {
                setLoginSuccess(false);
                setFormData({ username: '', password: '' });
              }}
              className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition font-semibold text-sm"
            >
              Keluar / Ulangi Demo
            </button>
          </div>
        ) : (
          // Login Form Form State
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Header Component */}
            <LoginHeader />
            
            {errors.general && (
              <div className="bg-red-50 text-red-600 border border-red-100 rounded-2xl p-4 text-xs font-bold text-left mb-4 animate-scale-up">
                ⚠️ {errors.general}
              </div>
            )}
            
            {/* Inputs Container */}
            <div className="space-y-1">
              <InputField
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                error={errors.username}
              />
              
              <InputField
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
              />
            </div>
            
            {/* Forgot Password Link */}
            <div className="flex justify-end mb-8 mt-1">
              <span 
                className="text-slate-400 font-semibold hover:text-blue-600 text-sm transition-colors duration-200 cursor-pointer"
                onClick={() => alert('Fitur Lupa Password akan segera hadir!')}
              >
                Forgot Password?
              </span>
            </div>
            
            {/* Login Action Button */}
            <LoginButton isLoading={isLoading}>
              Login
            </LoginButton>
            
            {/* Redirect to Register */}
            <div className="text-center mt-6">
              <p className="text-sm font-semibold text-slate-400">
                Belum punya akun?{' '}
                <span 
                  onClick={() => onNavigate && onNavigate('register')}
                  className="text-blue-600 hover:underline cursor-pointer transition"
                >
                  Daftar gratis
                </span>
              </p>
            </div>

            {/* Demo Hint */}
            <p className="text-center text-xs text-slate-400 mt-4 font-medium">
              Demo login: ketik username apa saja untuk masuk
            </p>
          </form>
        )}
        
      </div>
    </div>
  );
}

export default LoginCard;
