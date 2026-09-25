import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  Building2,
  GraduationCap,
  Phone,
  BookOpen,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { UserRole, EducationLevel, StudentProfile, Company } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess: (role: UserRole, userDetails?: any) => void;
  onRegisterSuccess: (role: UserRole, data: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
  onRegisterSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [registerRole, setRegisterRole] = useState<'student' | 'company'>('student');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Student register state
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [studentMajor, setStudentMajor] = useState('');
  const [studentEducationLevel, setStudentEducationLevel] = useState<EducationLevel>('SMA/SMK');
  const [studentYear, setStudentYear] = useState('Kelas 12');

  // Company register state
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPicName, setCompanyPicName] = useState('');
  const [companyPicPhone, setCompanyPicPhone] = useState('');
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to student if no specific domain
    if (loginEmail.includes('company') || loginEmail.includes('telkom')) {
      onLoginSuccess('company');
    } else if (loginEmail.includes('admin')) {
      onLoginSuccess('admin');
    } else {
      onLoginSuccess('student');
    }
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerRole === 'student') {
      onRegisterSuccess('student', {
        name: studentName || 'Peserta Magang Baru',
        email: studentEmail || 'peserta@magangku.id',
        school: studentSchool || 'SMK Negeri 1 Jakarta',
        major: studentMajor || 'Teknik Komputer & Jaringan',
        educationLevel: studentEducationLevel,
        year: studentYear
      });
    } else {
      onRegisterSuccess('company', {
        name: companyName || 'PT Industri Mitra Baru',
        picEmail: companyEmail || 'hr@mitrabaru.co.id',
        picName: companyPicName || 'Bapak Wahyu HRD',
        picPhone: companyPicPhone || '0812-3456-7890',
        industry: companyIndustry || 'Teknologi & Digital'
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-white text-blue-900 flex items-center justify-center font-black text-sm">
              M
            </div>
            <span className="text-xl font-black tracking-tight">
              MAGANG<span className="text-blue-300">KU</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {mode === 'login' ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            {mode === 'login'
              ? 'Kelola lamaran magang, portofolio, dan jurnal harian Anda.'
              : 'Daftar sebagai peserta atau perusahaan penyedia program magang.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-5 grid grid-cols-2 p-1 bg-blue-950/50 rounded-xl border border-blue-400/20 text-xs font-bold">
            <button
              onClick={() => setMode('login')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => setMode('register')}
              className={`py-2 rounded-lg transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Daftar
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {mode === 'login' ? (
            /* ================= LOGIN FORM ================= */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Fitur reset password telah dikirim ke email Anda.')}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Lupa Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 text-xs text-slate-600 cursor-pointer">
                  Ingat saya di perangkat ini
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer hover:scale-[1.01]"
              >
                Masuk
              </button>

              {/* Login with Google */}
              <button
                type="button"
                onClick={() => {
                  onLoginSuccess('student');
                  onClose();
                }}
                className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.67v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.16z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.28v3.15C3.3 21.36 7.36 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.28C.46 8.2.01 10.05.01 12s.45 3.8 1.27 5.42l4-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.3 2.64 1.28 6.58l4 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Masuk dengan Google</span>
              </button>

              {/* DEMO FAST LOGIN BUTTONS */}
              <div className="pt-3 border-t border-slate-100">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Atau Masuk Cepat Akun Demo (1-Klik):
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      onLoginSuccess('student');
                      onClose();
                    }}
                    className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-left font-semibold border border-blue-200 transition-colors cursor-pointer"
                  >
                    🎓 Siswa SMK (Rizky)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onLoginSuccess('company');
                      onClose();
                    }}
                    className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-left font-semibold border border-indigo-200 transition-colors cursor-pointer"
                  >
                    🏢 HR Perusahaan (Telkom)
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* ================= REGISTER FORM ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Role selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Daftar Sebagai:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRegisterRole('student')}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all cursor-pointer ${
                      registerRole === 'student'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Peserta Magang</div>
                      <div className="text-[10px] text-slate-500">Siswa SMA/SMK & Mahasiswa</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegisterRole('company')}
                    className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all cursor-pointer ${
                      registerRole === 'company'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Perusahaan / Mitra</div>
                      <div className="text-[10px] text-slate-500">Penyedia Program Magang</div>
                    </div>
                  </button>
                </div>
              </div>

              {registerRole === 'student' ? (
                /* Peserta Register Fields */
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        placeholder="email@sekolah.sch.id"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Tingkat Pendidikan
                      </label>
                      <select
                        value={studentEducationLevel}
                        onChange={(e) =>
                          setStudentEducationLevel(e.target.value as EducationLevel)
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white cursor-pointer"
                      >
                        <option value="SMA/SMK">Siswa SMA/SMK</option>
                        <option value="Mahasiswa (D3/D4/S1)">Mahasiswa (D3/D4/S1)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Tahun / Kelas
                      </label>
                      <input
                        type="text"
                        required
                        value={studentYear}
                        onChange={(e) => setStudentYear(e.target.value)}
                        placeholder="Kelas 12 / Semester 6"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Sekolah / Universitas
                      </label>
                      <input
                        type="text"
                        required
                        value={studentSchool}
                        onChange={(e) => setStudentSchool(e.target.value)}
                        placeholder="SMK Negeri 1 Jakarta / UI"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Jurusan
                      </label>
                      <input
                        type="text"
                        required
                        value={studentMajor}
                        onChange={(e) => setStudentMajor(e.target.value)}
                        placeholder="RPL / Akuntansi / TI"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* Perusahaan Register Fields */
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nama Perusahaan / Instansi
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="PT Telkom Indonesia / Studio Kreasi"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Resmi Perusahaan
                      </label>
                      <input
                        type="email"
                        required
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        placeholder="hr@perusahaan.co.id"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        value={companyPassword}
                        onChange={(e) => setCompanyPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nama PIC / HRD
                      </label>
                      <input
                        type="text"
                        required
                        value={companyPicName}
                        onChange={(e) => setCompanyPicName(e.target.value)}
                        placeholder="Nama Kontak Penanggungjawab"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Nomor Telepon / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={companyPicPhone}
                        onChange={(e) => setCompanyPicPhone(e.target.value)}
                        placeholder="0812-xxxx-xxxx"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Industri / Bidang Perusahaan
                    </label>
                    <input
                      type="text"
                      required
                      value={companyIndustry}
                      onChange={(e) => setCompanyIndustry(e.target.value)}
                      placeholder="Teknologi Informasi, Keuangan, Manufaktur, Desain..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer hover:scale-[1.01]"
              >
                Daftar Sekarang
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
