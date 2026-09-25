import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  GraduationCap,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Calendar,
  Layers,
  Wrench,
  Code,
  Palette,
  TrendingUp,
  CreditCard,
  Radio,
  BookOpen
} from 'lucide-react';
import { Internship, InternshipCategory } from '../types';
import { CATEGORIES_DATA } from '../data/mockData';

interface LandingPageProps {
  internships: Internship[];
  onSelectInternship: (internship: Internship) => void;
  onSearch: (params: { keyword: string; location: string; workType: string }) => void;
  onSelectCategory: (category: InternshipCategory) => void;
  onNavigate: (tab: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  internships,
  onSelectInternship,
  onSearch,
  onSelectCategory,
  onNavigate,
  bookmarkedIds,
  onToggleBookmark,
  onOpenAuth
}) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [workType, setWorkType] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keyword, location, workType });
    onNavigate('catalog');
  };

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Teknik':
        return <Wrench className="w-6 h-6 text-blue-600" />;
      case 'IT & Programming':
        return <Code className="w-6 h-6 text-indigo-600" />;
      case 'Desain':
        return <Palette className="w-6 h-6 text-pink-600" />;
      case 'Bisnis & Manajemen':
        return <Briefcase className="w-6 h-6 text-amber-600" />;
      case 'Marketing':
        return <TrendingUp className="w-6 h-6 text-emerald-600" />;
      case 'Keuangan':
        return <CreditCard className="w-6 h-6 text-cyan-600" />;
      case 'Media & Komunikasi':
        return <Radio className="w-6 h-6 text-purple-600" />;
      case 'Pendidikan':
      default:
        return <BookOpen className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white pt-16 sm:pt-24 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-indigo-500/15 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
            <span>Platform Magang #1 Siswa SMK & Mahasiswa Indonesia</span>
          </div>

          {/* Big Title & Subtitle */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Temukan Pengalaman Magangmu,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Bangun Masa Depanmu.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg sm:leading-relaxed font-normal">
            Temukan kesempatan magang yang sesuai dengan minat, jurusan, lokasi, dan kemampuanmu.
            Terintegrasi dengan program PKL SMK dan Kampus Merdeka.
          </p>

          {/* Integrated Search Bar */}
          <div className="pt-4 max-w-4xl mx-auto">
            <form
              onSubmit={handleHeroSearch}
              className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-slate-200/80 text-slate-800 grid grid-cols-1 md:grid-cols-12 gap-2 text-left"
            >
              {/* Field 1: Posisi / Bidang */}
              <div className="md:col-span-4 flex items-center px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border md:border-none border-slate-200">
                <Search className="w-5 h-5 text-blue-600 shrink-0 mr-2.5" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Posisi / Bidang
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Contoh: Web Developer, Akuntansi..."
                    className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Field 2: Lokasi */}
              <div className="md:col-span-3 flex items-center px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border md:border-none border-slate-200 md:border-l md:border-slate-200">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mr-2.5" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Kota / Provinsi / Remote"
                    className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Field 3: Tipe Magang */}
              <div className="md:col-span-2.5 flex items-center px-3 py-2 bg-slate-50 md:bg-transparent rounded-xl border md:border-none border-slate-200 md:border-l md:border-slate-200">
                <Briefcase className="w-5 h-5 text-blue-600 shrink-0 mr-2.5" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sistem Kerja
                  </label>
                  <select
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="">Semua Sistem</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="WFO">WFO (Kantor)</option>
                    <option value="WFH">WFH (Remote)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2.5 flex items-center">
                <button
                  type="submit"
                  className="w-full h-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  <span>Cari Magang</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick tags */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Paling Dicari:</span>
            <button
              onClick={() => {
                setKeyword('SMK');
                onSearch({ keyword: 'SMK', location: '', workType: '' });
                onNavigate('catalog');
              }}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-slate-200 cursor-pointer"
            >
              🎓 Khusus SMK / PKL
            </button>
            <button
              onClick={() => {
                setKeyword('React');
                onSearch({ keyword: 'React', location: '', workType: '' });
                onNavigate('catalog');
              }}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-slate-200 cursor-pointer"
            >
              💻 IT & Software
            </button>
            <button
              onClick={() => {
                setKeyword('Paid');
                onSearch({ keyword: 'Paid', location: '', workType: '' });
                onNavigate('catalog');
              }}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-slate-200 cursor-pointer"
            >
              💰 Magang Berbayar (Paid)
            </button>
            <button
              onClick={() => {
                setKeyword('Desain');
                onSearch({ keyword: 'Desain', location: '', workType: '' });
                onNavigate('catalog');
              }}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-slate-200 cursor-pointer"
            >
              🎨 Desain & Kreatif
            </button>
          </div>
        </div>

        {/* STATISTIK RESMI PLATFORM */}
        <div className="relative max-w-5xl mx-auto mt-16 sm:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 shadow-xl text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-blue-300">500+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">Lowongan Magang</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-sky-300">150+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">Perusahaan Mitra</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-indigo-300">2.000+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">Peserta Terdaftar</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-emerald-300">50+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">Bidang Kejuruan</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: MAGANG SESUAI MINATMU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Jelajahi Berdasarkan Kejuruan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Magang Sesuai Minatmu
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Pilih bidang yang selaras dengan jurusan sekolah atau mata kuliahmu.
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group"
          >
            <span>Lihat Semua Kategori</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                onSelectCategory(cat.name as InternshipCategory);
                onNavigate('catalog');
              }}
              className="text-left bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group cursor-pointer hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center mb-4 transition-colors">
                {getCategoryIcon(cat.name)}
              </div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{cat.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>{cat.count}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION: LOWONGAN MAGANG TERBARU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4" />
              <span>Kesempatan Pilihan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Lowongan Magang Terbaru
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Lowongan terverifikasi dengan kuota terbatas dan bimbingan mentor resmi.
            </p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-sm transition-colors cursor-pointer"
          >
            <span>Semua Lowongan ({internships.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.slice(0, 6).map((job) => {
            const isBookmarked = bookmarkedIds.includes(job.id);
            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group hover:border-blue-400"
              >
                <div className="p-6">
                  {/* Top: Company Logo + Badges */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-700 line-clamp-1">
                            {job.companyName}
                          </span>
                          {job.companyVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{job.category}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleBookmark(job.id)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                      title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Lowongan'}
                    >
                      <Bookmark
                        className="w-4 h-4"
                        fill={isBookmarked ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  {/* Title & Location */}
                  <h3
                    onClick={() => onSelectInternship(job)}
                    className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {job.title}
                  </h3>

                  <div className="flex items-center text-xs text-slate-500 mt-2 gap-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[130px]">{job.location.split('(')[0]}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.duration}</span>
                    </span>
                  </div>

                  {/* Chips: WorkType, Paid/Unpaid, Target Education */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700">
                      {job.workType}
                    </span>

                    {job.compensation === 'Paid' ? (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Uang Saku
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                        Unpaid
                      </span>
                    )}

                    {job.educationLevelRequired.map((edu) => (
                      <span
                        key={edu}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                          edu.includes('SMK')
                            ? 'bg-amber-50 text-amber-800 border border-amber-200/50'
                            : 'bg-purple-50 text-purple-700'
                        }`}
                      >
                        {edu.includes('SMK') ? '🎓 Siswa SMK' : '🎓 Mahasiswa'}
                      </span>
                    ))}
                  </div>

                  {/* Description excerpt */}
                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Footer of Card: Deadline & Detail Button */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                      Deadline:
                    </span>
                    <span className="font-semibold text-rose-600">{job.deadline}</span>
                  </div>

                  <button
                    onClick={() => onSelectInternship(job)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer hover:scale-105"
                  >
                    <span>Lihat Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY CHOOSE MAGANGKU FOR SMK & MAHASISWA */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Keunggulan MAGANGKU
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Dirancang Khusus Menjawab Kebutuhan Pelajar & Kampus
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Tidak sekadar mencari lowongan, MAGANGKU mendampingi proses belajar dari pendaftaran,
              bimbingan harian, hingga sertifikasi kelulusan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Perusahaan Terverifikasi Resmi</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Semua instansi dan perusahaan BUMN, multinasional, maupun startup telah divalidasi
                untuk menjamin lingkungan kerja yang aman dan edukatif bagi pelajar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Jurnal PKL & Logbook Digital</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tak perlu repot mencetak buku jurnal manual. Isi laporan harian di aplikasi,
                langsung diverifikasi oleh mentor dan siap diekspor untuk guru sekolah / dosen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Sertifikat Resmi Ber-QR Code</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dapatkan sertifikat kompetensi industri resmi dengan verifikasi barcode online yang
                dapat dilampirkan langsung ke CV dan akun LinkedIn profesionalmu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PANDUAN 4 LANGKAH MUDAH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Langkah Mudah Memulai Magang
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Dari daftar akun hingga diterbitkan sertifikat resmi, semuanya terintegrasi dalam satu sistem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Lengkapi Profil & CV</h3>
            <p className="text-xs text-slate-500">
              Unggah portofolio karya, skill, dan data sekolah. Gunakan AI CV Checker untuk optimasi berkas.
            </p>
          </div>

          <div className="relative bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Pilih & Lamar Lowongan</h3>
            <p className="text-xs text-slate-500">
              Cari lowongan yang sesuai minat dan kirim lamaran langsung dengan 1 kali klik.
            </p>
          </div>

          <div className="relative bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Pantau Seleksi & Wawancara</h3>
            <p className="text-xs text-slate-500">
              Cek status seleksi real-time dan dapatkan notifikasi jadwal interview Google Meet / Zoom.
            </p>
          </div>

          <div className="relative bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
              4
            </div>
            <h3 className="font-bold text-base text-slate-900">Mulai Magang & Jurnal</h3>
            <p className="text-xs text-slate-500">
              Jalankan tugas magang, catat jurnal harian, dan raih sertifikat kompetensi resmi industri.
            </p>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
              Mulai Langkah Nyata
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Siap Menemukan Pengalaman Magang Terbaikmu?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Bergabunglah bersama ribuan siswa SMA/SMK dan mahasiswa yang telah membangun karir masa depan bersama MAGANGKU.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('catalog')}
                className="px-6 py-3 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-lg cursor-pointer"
              >
                Cari Lowongan Sekarang
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-6 py-3 rounded-xl bg-blue-700/80 hover:bg-blue-600 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
              >
                Daftar Akun Baru
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
