import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Users,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  AlertTriangle,
  Trash2,
  Eye,
  Check
} from 'lucide-react';
import { Company, Internship } from '../types';

interface AdminDashboardProps {
  companies: Company[];
  internships: Internship[];
  onToggleCompanyVerification: (companyId: string) => void;
  onDeleteInternship: (internshipId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  companies,
  internships,
  onToggleCompanyVerification,
  onDeleteInternship
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'companies' | 'vacancies' | 'users'>('stats');
  const [searchQuery, setSearchQuery] = useState('');

  // Platform statistics requested by user prompt
  const stats = {
    totalUsers: '2.410',
    totalCompanies: '184',
    totalVacancies: '520',
    totalApplicants: '6.890',
    totalAccepted: '1.230',
    totalCompleted: '980'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ADMIN HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Super Administrator Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Pusat Kendali Platform MAGANGKU
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Verifikasi keaslian mitra industri, pantau kepatuhan standar PKL, dan kelola integritas ekosistem.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-mono font-bold text-slate-300 border border-white/10">
            Platform v2.4 • Status: Sehat
          </span>
        </div>

        {/* TABS */}
        <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'stats'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Statistik & Laporan
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'companies'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Verifikasi Perusahaan Mitra ({companies.length})
          </button>
          <button
            onClick={() => setActiveTab('vacancies')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'vacancies'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Moderasi Lowongan ({internships.length})
          </button>
        </div>
      </div>

      {/* TAB 1: STATISTIK RESMI */}
      {activeTab === 'stats' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Pengguna
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalUsers}</div>
              <span className="text-[10px] text-blue-600 font-semibold">+18% bulan ini</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Perusahaan
              </span>
              <div className="text-2xl font-black text-indigo-600 mt-1">{stats.totalCompanies}</div>
              <span className="text-[10px] text-indigo-600 font-semibold">100% Terverifikasi</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Lowongan
              </span>
              <div className="text-2xl font-black text-blue-600 mt-1">{stats.totalVacancies}</div>
              <span className="text-[10px] text-emerald-600 font-semibold">82% Aktif</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Pendaftar
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalApplicants}</div>
              <span className="text-[10px] text-slate-500 font-semibold">Lamaran Masuk</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Peserta Diterima
              </span>
              <div className="text-2xl font-black text-emerald-600 mt-1">{stats.totalAccepted}</div>
              <span className="text-[10px] text-emerald-700 font-semibold">Tersalurkan PKL</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Program Selesai
              </span>
              <div className="text-2xl font-black text-amber-500 mt-1">{stats.totalCompleted}</div>
              <span className="text-[10px] text-amber-700 font-semibold">Sertifikat Terbit</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-900">
              Laporan Aktivitas & Keamanan Ekosistem
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center justify-between">
                <span>✓ Seluruh lowongan magang mematuhi regulasi batas jam kerja pelajar Kemendikbudristek & Kemenaker.</span>
                <span className="font-bold">Status Aman</span>
              </div>
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 flex items-center justify-between">
                <span>✓ Integrasi tanda tangan digital sertifikat dan verifikasi barcode aktif 100%.</span>
                <span className="font-bold">Sistem Normal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VERIFIKASI PERUSAHAAN */}
      {activeTab === 'companies' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-black text-slate-900">Daftar & Status Verifikasi Perusahaan</h3>
            <span className="text-xs text-slate-500">{companies.length} Perusahaan Terdaftar</span>
          </div>

          <div className="divide-y divide-slate-100">
            {companies.map((comp) => (
              <div key={comp.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-900">{comp.name}</span>
                      {comp.verified && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          Terverifikasi
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{comp.industry} • {comp.location}</p>
                    <p className="text-xs text-slate-400">Kontak: {comp.picName} ({comp.picEmail})</p>
                  </div>
                </div>

                <button
                  onClick={() => onToggleCompanyVerification(comp.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    comp.verified
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {comp.verified ? 'Cabut Verifikasi' : 'Verifikasi Resmi'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MODERASI LOWONGAN */}
      {activeTab === 'vacancies' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-black text-slate-900">Moderasi Lowongan Masuk</h3>
            <span className="text-xs text-slate-500">{internships.length} Lowongan Terpublikasi</span>
          </div>

          <div className="divide-y divide-slate-100">
            {internships.map((job) => (
              <div key={job.id} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900">{job.title}</h4>
                  <p className="text-xs text-slate-500">{job.companyName} • {job.category}</p>
                  <p className="text-xs text-blue-600">{job.duration} • {job.workType} • Kuota: {job.quota}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (confirm(`Yakin ingin menghapus lowongan ${job.title}?`)) {
                        onDeleteInternship(job.id);
                      }
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Hapus Lowongan Bermasalah"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
