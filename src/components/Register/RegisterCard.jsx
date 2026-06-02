import { useState } from 'react';
import RegisterHeader from './RegisterHeader';
import InputField from '../Login/InputField';
import LoginButton from '../Login/LoginButton';
import { apiService } from '../../services/api';

function RegisterCard({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobCategory: 'Freelancer'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

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
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama Lengkap wajib diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Kata sandi wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi kata sandi wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi kata sandi tidak cocok';
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
      await apiService.registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        jobCategory: formData.jobCategory,
      });
      setIsLoading(false);
      setRegisterSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setErrors({ general: err.message });
    }
  };

  // Dapetin rekomendasi yang disesuaikan berdasarkan kategori pekerjaan
  const getRecommendation = () => {
    switch (formData.jobCategory) {
      case 'Freelancer':
        return {
          title: 'Rekomendasi PPh 23',
          desc: 'Sebagai seorang Freelancer, Anda sering berurusan dengan pemotongan pajak jasa. Kami merekomendasikan kalkulator PPh 23 kami untuk mengestimasi potongan bersih jasa Anda dengan cepat.',
          actionLabel: 'Hitung PPh 23 Sekarang'
        };
      case 'Karyawan':
        return {
          title: 'Rekomendasi PPh 21',
          desc: 'Sebagai seorang Karyawan, Anda memiliki penghasilan teratur dari pemberi kerja. Kami merekomendasikan kalkulator PPh 21 bulanan kami untuk melacak besaran pajak berkala Anda.',
          actionLabel: 'Hitung PPh 21 Sekarang'
        };
      case 'Pengusaha':
        return {
          title: 'Layanan Bisnis / PPh Final',
          desc: 'Sebagai seorang Pengusaha, Anda memiliki omzet usaha berkala. Kami merekomendasikan kalkulator komprehensif kami untuk pembukuan wajib pajak badan atau perorangan.',
          actionLabel: 'Mulai Simulasi Usaha'
        };
      default:
        return {
          title: 'Kalkulator Pajak',
          desc: 'Mari temukan kalkulator pajak yang tepat berdasarkan profil keuangan terpersonalisasi Anda.',
          actionLabel: 'Buka Kalkulator'
        };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="relative w-full flex justify-center lg:justify-end animate-fade-in-up">
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(15,23,42,0.12)] p-8 w-full max-w-[480px] border border-slate-100 flex-shrink-0 transition-all duration-300">
        
        {registerSuccess ? (
          // Success State (Personalized Assistant Onboarding Screen)
          <div className="py-6 text-center animate-scale-up">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-100 relative">
              {/* Bot Avatar */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.765 5.99 5.99 0 011.524-2.238C4.034 16 3 13.107 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
              {/* Green active dot */}
              <div className="absolute right-0 bottom-0 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white"></div>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
              Halo, {formData.fullName}! 👋
            </h3>
            
            <p className="text-sm text-slate-500 font-semibold mb-6">
              Pendaftaran berhasil! Akun Anda terverifikasi dengan email <span className="text-slate-800 font-bold">{formData.email}</span>.
            </p>

            {/* Personalized UX recommendation Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 text-left">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full mb-3 uppercase tracking-wider">
                {recommendation.title}
              </span>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                {recommendation.desc}
              </p>
            </div>

            <button
              onClick={() => onNavigate('calculator')}
              className="w-full py-4 text-white text-base font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-200 cursor-pointer active:scale-[0.98]"
            >
              {recommendation.actionLabel}
            </button>

            <button
              onClick={() => {
                setRegisterSuccess(false);
                setFormData({
                  fullName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  jobCategory: 'Freelancer'
                });
              }}
              className="mt-4 text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors"
            >
              Daftar Ulang Akun Baru (Demo)
            </button>
          </div>
        ) : (
          // Form State
          <form onSubmit={handleSubmit} className="flex flex-col">
            <RegisterHeader />

            {errors.general && (
              <div className="bg-red-50 text-red-600 border border-red-100 rounded-2xl p-4 text-xs font-bold text-left mb-4 animate-scale-up">
                ⚠️ {errors.general}
              </div>
            )}

            {/* Inputs Container */}
            <div className="space-y-1">
              <InputField
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Nama Lengkap"
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
              />

              <InputField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />

              <InputField
                id="password"
                name="password"
                type="password"
                placeholder="Kata Sandi"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
              />

              <InputField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Konfirmasi Kata Sandi"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
              />

              {/* Status Pekerjaan / Kategori Selector (UX Strategy) */}
              <div className="w-full mb-6">
                <label htmlFor="jobCategory" className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide ml-4">
                  Status Pekerjaan / Kategori
                </label>
                <div className="relative">
                  <select
                    id="jobCategory"
                    name="jobCategory"
                    value={formData.jobCategory}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-[#f8fafc] text-slate-800 text-base font-semibold rounded-2xl border-2 border-blue-100 hover:border-blue-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none appearance-none cursor-pointer"
                  >
                    <option value="Karyawan">Karyawan (Pekerja Kantoran)</option>
                    <option value="Freelancer">Freelancer (Pekerja Lepas / Jasa)</option>
                    <option value="Pengusaha">Pengusaha (Pemilik Bisnis)</option>
                  </select>
                  {/* Custom Arrow Icon */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Register Action Button */}
            <LoginButton isLoading={isLoading}>
              Daftar Gratis
            </LoginButton>

            {/* Redirection Link to Login */}
            <div className="text-center mt-6">
              <p className="text-sm font-semibold text-slate-400">
                Sudah punya akun?{' '}
                <span
                  onClick={() => onNavigate('login')}
                  className="text-blue-600 hover:underline cursor-pointer transition"
                >
                  Masuk
                </span>
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

export default RegisterCard;
