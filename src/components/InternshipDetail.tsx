import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  ShieldCheck,
  Bookmark,
  CheckCircle2,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Share2
} from 'lucide-react';
import { Internship } from '../types';

interface InternshipDetailProps {
  internship: Internship;
  onBack: () => void;
  onApply: (internship: Internship) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  alreadyApplied: boolean;
}

export const InternshipDetail: React.FC<InternshipDetailProps> = ({
  internship,
  onBack,
  onApply,
  isBookmarked,
  onToggleBookmark,
  alreadyApplied
}) => {
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert('Tautan lowongan telah disalin ke clipboard!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Pencarian Lowongan</span>
      </button>

      {/* HEADER CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start space-x-5">
            <img
              src={internship.companyLogo}
              alt={internship.companyName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-sm"
            />
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-bold text-slate-700">
                  {internship.companyName}
                </span>
                {internship.companyVerified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Terverifikasi Resmi</span>
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
                {internship.title}
              </h1>

              <div className="flex flex-wrap items-center text-xs sm:text-sm text-slate-500 gap-x-4 gap-y-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{internship.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  <span>{internship.category}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons (Top) */}
          <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onToggleBookmark(internship.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'bg-white text-slate-400 border-slate-200 hover:text-blue-600 hover:bg-slate-50'
              }`}
              title={isBookmarked ? 'Hapus Simpanan' : 'Simpan Lowongan'}
            >
              <Bookmark className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleShare}
              className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Bagikan Lowongan"
            >
              <Share2 className="w-5 h-5" />
            </button>

            {alreadyApplied ? (
              <button
                disabled
                className="flex-1 sm:flex-initial px-6 py-3 bg-emerald-100 text-emerald-800 rounded-2xl font-bold text-sm cursor-not-allowed flex items-center justify-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Lamaran Telah Dikirim</span>
              </button>
            ) : (
              <button
                onClick={() => onApply(internship)}
                className="flex-1 sm:flex-initial px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm transition-all shadow-md shadow-blue-500/25 cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Daftar Sekarang</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* KEY HIGHLIGHT DETAILS BAR */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Sistem Kerja
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 block">
              {internship.workType}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Durasi Magang
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 block">
              {internship.duration}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tanggal Mulai
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 block">
              {internship.startDate}
            </span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Batas Pendaftaran
            </span>
            <span className="text-xs sm:text-sm font-bold text-rose-600 mt-0.5 block">
              {internship.deadline}
            </span>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN DETAILS CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* MAIN BODY (COL 8) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. DESKRIPSI MAGANG */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
            <h2 className="text-lg font-black text-slate-900">Deskripsi Program Magang</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{internship.description}</p>
          </section>

          {/* 2. JOB DESCRIPTION */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900">Job Description (Tanggung Jawab)</h2>
            <ul className="space-y-2.5">
              {internship.jobDescription.map((item, index) => (
                <li key={index} className="flex items-start space-x-3 text-sm text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 3. REQUIREMENTS */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-lg font-black text-slate-900">Persyaratan & Kualifikasi</h2>

            {/* Pendidikan */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Tingkat Pendidikan & Jurusan
              </h3>
              <p className="text-sm font-semibold text-slate-800">
                {internship.requirements.education}
              </p>
            </div>

            {/* Skill yang Dibutuhkan */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Keahlian / Skill Utama
              </h3>
              <div className="flex flex-wrap gap-2">
                {internship.requirements.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Pengalaman */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Pengalaman
              </h3>
              <p className="text-sm text-slate-600">{internship.requirements.experience}</p>
            </div>

            {/* Persyaratan Lainnya */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Persyaratan Tambahan
              </h3>
              <ul className="space-y-1.5">
                {internship.requirements.other.map((req, i) => (
                  <li key={i} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 4. BENEFIT */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900">Benefit & Fasilitas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {internship.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start space-x-2.5"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-emerald-950">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. TIMELINE SELEKSI */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900">Timeline Tahapan Seleksi</h2>
              <p className="text-xs text-slate-500">
                Pahami setiap tanggal penting proses rekrutmen.
              </p>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-blue-200">
              {internship.timeline.map((step) => (
                <div key={step.step} className="relative flex items-start space-x-4 pl-1">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm shrink-0 z-10">
                    {step.step}
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-bold text-sm text-slate-900">{step.name}</h4>
                      <span className="text-xs font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-md self-start sm:self-auto">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR SUMMARY (COL 4) */}
        <aside className="lg:col-span-4 space-y-6 sticky top-24">
          {/* Quick Apply Card */}
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xl space-y-4">
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Ringkasan Pendaftaran
            </span>
            <div className="space-y-2">
              <div className="text-2xl font-extrabold text-white">
                {internship.compensation === 'Paid' ? (
                  <div className="space-y-1">
                    <span className="text-xs text-emerald-400 font-bold block">UANG SAKU BULANAN:</span>
                    <span>{internship.stipendAmount}</span>
                  </div>
                ) : (
                  <span>Unpaid (Sertifikat & Bimbingan)</span>
                )}
              </div>
              <p className="text-xs text-slate-300">
                Pendaftaran ditutup pada <span className="font-bold text-amber-300">{internship.deadline}</span>
              </p>
            </div>

            {alreadyApplied ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-xs font-bold text-emerald-200 text-center">
                ✓ Anda telah mengirimkan lamaran untuk lowongan ini
              </div>
            ) : (
              <button
                onClick={() => onApply(internship)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/40 transition-all cursor-pointer hover:scale-[1.02]"
              >
                Daftar Sekarang
              </button>
            )}

            <button
              onClick={() => onToggleBookmark(internship.id)}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs border border-white/15 transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              <span>{isBookmarked ? 'Tersimpan di Favorit' : 'Simpan Lowongan'}</span>
            </button>
          </div>

          {/* Company Brief Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <img
                src={internship.companyLogo}
                alt={internship.companyName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900">{internship.companyName}</h3>
                <p className="text-xs text-slate-500">{internship.category}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Mitra resmi MAGANGKU yang berkomitmen membina talenta generasi muda melalui bimbingan praktisi ahli dan proyek industri nyata.
            </p>

            <div className="pt-2 text-xs text-slate-500 space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Perusahaan Terverifikasi Resmi</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
