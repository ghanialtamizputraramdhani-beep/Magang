import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Bell,
  Bookmark,
  User,
  LogOut,
  ChevronDown,
  Building2,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  Menu,
  X,
  Sparkles,
  FileCheck2
} from 'lucide-react';
import { UserRole, StudentProfile, Company, AppNotification } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  studentProfile: StudentProfile;
  companyProfile: Company;
  notifications: AppNotification[];
  bookmarkedIds: string[];
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenNotifications: () => void;
  onOpenCVChecker: () => void;
  onOpenAIRecommendation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  studentProfile,
  companyProfile,
  notifications,
  bookmarkedIds,
  onOpenAuth,
  onOpenNotifications,
  onOpenCVChecker,
  onOpenAIRecommendation
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRoleSwitch = (newRole: UserRole) => {
    setUserRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'student') setCurrentTab('dashboard');
    else if (newRole === 'company') setCurrentTab('company-dashboard');
    else if (newRole === 'admin') setCurrentTab('admin-dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner Notice for Prototype Role Switching */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600/80 text-blue-100 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide">
              PROTOTYPE MODE
            </span>
            <span className="hidden sm:inline text-slate-300">
              Ganti peran akun kapan saja untuk menguji alur Siswa, Perusahaan, & Admin:
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 transition-colors px-2.5 py-1 rounded text-xs font-medium cursor-pointer"
            >
              <span>Peran Saat Ini:</span>
              <span className="font-bold text-amber-300 flex items-center gap-1">
                {userRole === 'student' && <GraduationCap className="w-3.5 h-3.5" />}
                {userRole === 'company' && <Building2 className="w-3.5 h-3.5" />}
                {userRole === 'admin' && <ShieldCheck className="w-3.5 h-3.5" />}
                {userRole === 'student'
                  ? `Peserta (${studentProfile.educationLevel})`
                  : userRole === 'company'
                  ? 'Perusahaan (HR Telkom)'
                  : 'Admin Platform'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-300" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Pilih Akun Demo
                </div>
                <button
                  onClick={() => handleRoleSwitch('student')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                    userRole === 'student' ? 'bg-blue-50/80 font-bold text-blue-700' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      🎓
                    </div>
                    <div>
                      <div className="font-semibold">{studentProfile.name}</div>
                      <div className="text-[11px] text-slate-500">{studentProfile.school}</div>
                    </div>
                  </div>
                  {userRole === 'student' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                </button>

                <button
                  onClick={() => handleRoleSwitch('company')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                    userRole === 'company' ? 'bg-blue-50/80 font-bold text-blue-700' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      🏢
                    </div>
                    <div>
                      <div className="font-semibold">{companyProfile.name}</div>
                      <div className="text-[11px] text-slate-500">Recruiter / HRD Dashboard</div>
                    </div>
                  </div>
                  {userRole === 'company' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                </button>

                <button
                  onClick={() => handleRoleSwitch('admin')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer ${
                    userRole === 'admin' ? 'bg-blue-50/80 font-bold text-blue-700' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                      🛡️
                    </div>
                    <div>
                      <div className="font-semibold">Administrator Platform</div>
                      <div className="text-[11px] text-slate-500">Verifikasi & Moderasi</div>
                    </div>
                  </div>
                  {userRole === 'admin' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentTab('landing')}
              className="flex items-center space-x-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-black text-xl tracking-wider group-hover:scale-105 transition-transform">
                M
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  MAGANG<span className="text-blue-600">KU</span>
                </span>
                <span className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase -mt-1">
                  Portal Magang Pelajar & Kampus
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => setCurrentTab('landing')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  currentTab === 'landing'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => setCurrentTab('catalog')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  currentTab === 'catalog'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Cari Magang
              </button>

              {userRole === 'student' && (
                <>
                  <button
                    onClick={() => setCurrentTab('dashboard')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      currentTab === 'dashboard'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Dashboard Saya
                  </button>
                  <button
                    onClick={() => setCurrentTab('tracking')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      currentTab === 'tracking'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Lamaran Saya
                  </button>
                  <button
                    onClick={() => setCurrentTab('active-internship')}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      currentTab === 'active-internship'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    Magang Berjalan
                  </button>
                </>
              )}

              {userRole === 'company' && (
                <button
                  onClick={() => setCurrentTab('company-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    currentTab === 'company-dashboard'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Portal Perusahaan
                </button>
              )}

              {userRole === 'admin' && (
                <button
                  onClick={() => setCurrentTab('admin-dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    currentTab === 'admin-dashboard'
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Admin Panel
                </button>
              )}

              <button
                onClick={() => setCurrentTab('companies')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  currentTab === 'companies'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Perusahaan Mitra
              </button>

              <button
                onClick={() => setCurrentTab('guide')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  currentTab === 'guide'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Panduan PKL & Magang
              </button>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick AI Tools Button */}
            <div className="hidden md:flex items-center space-x-1.5">
              <button
                onClick={onOpenCVChecker}
                title="Cek Skor ATS & Kualitas CV"
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>CV Checker</span>
              </button>

              <button
                onClick={onOpenAIRecommendation}
                title="Rekomendasi Magang Berbasis Minat & Skill"
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Rekomendasi AI</span>
              </button>
            </div>

            {/* Bookmarks */}
            {userRole === 'student' && (
              <button
                onClick={() => setCurrentTab('bookmarks')}
                title="Lowongan Tersimpan"
                className="relative p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarkedIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {bookmarkedIds.length}
                  </span>
                )}
              </button>
            )}

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              title="Notifikasi"
              className="relative p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth State */}
            <div className="relative">
              {userRole === 'student' ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <img
                    src={studentProfile.avatar}
                    alt={studentProfile.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/20"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      {studentProfile.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {studentProfile.educationLevel}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ) : userRole === 'company' ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <img
                    src={companyProfile.logo}
                    alt={companyProfile.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-blue-500/20"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold text-slate-800 leading-tight">
                      HR Telkom
                    </div>
                    <div className="text-[10px] text-blue-600 font-medium">Recruiter</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ) : (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                    A
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold text-slate-800 leading-tight">Admin</div>
                    <div className="text-[10px] text-amber-600 font-medium">Platform Master</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">
                      {userRole === 'student'
                        ? studentProfile.name
                        : userRole === 'company'
                        ? companyProfile.name
                        : 'Admin Platform'}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {userRole === 'student'
                        ? studentProfile.email
                        : userRole === 'company'
                        ? companyProfile.picEmail
                        : 'admin@magangku.id'}
                    </p>
                  </div>

                  {userRole === 'student' && (
                    <>
                      <button
                        onClick={() => {
                          setCurrentTab('profile');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-2 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>Profil & Portofolio Saya</span>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentTab('tracking');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-2 cursor-pointer"
                      >
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        <span>Status Lamaran Saya</span>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentTab('active-internship');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-2 cursor-pointer"
                      >
                        <GraduationCap className="w-4 h-4 text-slate-400" />
                        <span>Magang Berjalan & Jurnal</span>
                      </button>
                    </>
                  )}

                  {userRole === 'company' && (
                    <button
                      onClick={() => {
                        setCurrentTab('company-dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-2 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>Dashboard Rekruter</span>
                    </button>
                  )}

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={() => {
                      onOpenAuth('login');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Ganti Akun / Masuk Baru</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 animate-in fade-in">
          <button
            onClick={() => {
              setCurrentTab('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50"
          >
            Beranda
          </button>
          <button
            onClick={() => {
              setCurrentTab('catalog');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50"
          >
            Cari Lowongan Magang
          </button>

          {userRole === 'student' && (
            <>
              <button
                onClick={() => {
                  setCurrentTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                Dashboard Peserta
              </button>
              <button
                onClick={() => {
                  setCurrentTab('tracking');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                Lamaran Saya
              </button>
              <button
                onClick={() => {
                  setCurrentTab('active-internship');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                Magang Berjalan & Jurnal
              </button>
              <button
                onClick={() => {
                  setCurrentTab('profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50"
              >
                Profil & CV Saya
              </button>
            </>
          )}

          {userRole === 'company' && (
            <button
              onClick={() => {
                setCurrentTab('company-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50"
            >
              Dashboard Perusahaan
            </button>
          )}

          {userRole === 'admin' && (
            <button
              onClick={() => {
                setCurrentTab('admin-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50"
            >
              Admin Platform
            </button>
          )}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenCVChecker();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 w-full py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Cek Kualitas CV (AI)</span>
            </button>
            <button
              onClick={() => {
                onOpenAIRecommendation();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-2 w-full py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold"
            >
              <Sparkles className="w-4 h-4" />
              <span>Rekomendasi Magang AI</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
