import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Video,
  XCircle,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  MapPin,
  Calendar,
  FileText,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Application, ApplicationStatus } from '../types';

interface ApplicationTrackingProps {
  applications: Application[];
  onNavigateToActiveInternship: () => void;
  onNavigateToCatalog: () => void;
}

export const ApplicationTracking: React.FC<ApplicationTrackingProps> = ({
  applications,
  onNavigateToActiveInternship,
  onNavigateToCatalog
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'interview' | 'accepted' | 'rejected'>('all');
  const [selectedAppDetail, setSelectedAppDetail] = useState<Application | null>(null);

  const filteredApps = applications.filter((app) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return app.status === 'submitted' || app.status === 'screening';
    if (selectedFilter === 'interview') return app.status === 'interview';
    if (selectedFilter === 'accepted') return app.status === 'accepted';
    if (selectedFilter === 'rejected') return app.status === 'rejected';
    return true;
  });

  // Calculate timeline step index
  const getStepProgress = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return 1;
      case 'screening':
        return 2;
      case 'interview':
        return 3;
      case 'accepted':
      case 'rejected':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Real-Time Status Tracker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Lamaran Saya</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pantau perjalanan lamaran magangmu mulai dari seleksi berkas hingga pengumuman offering.
            </p>
          </div>

          <button
            onClick={onNavigateToCatalog}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center space-x-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Briefcase className="w-4 h-4" />
            <span>Cari Lowongan Lain</span>
          </button>
        </div>

        {/* STATUS FILTER TABS */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          {[
            { label: `Semua (${applications.length})`, value: 'all' },
            {
              label: `Dalam Proses (${
                applications.filter((a) => a.status === 'submitted' || a.status === 'screening').length
              })`,
              value: 'active'
            },
            {
              label: `Interview (${applications.filter((a) => a.status === 'interview').length})`,
              value: 'interview'
            },
            {
              label: `Diterima (${applications.filter((a) => a.status === 'accepted').length})`,
              value: 'accepted'
            },
            {
              label: `Ditolak (${applications.filter((a) => a.status === 'rejected').length})`,
              value: 'rejected'
            }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedFilter(tab.value as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === tab.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* LIST OF APPLICATION CARDS */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-base">Tidak ada lamaran pada kategori ini</h3>
          <p className="text-xs text-slate-400">
            Jelajahi lowongan magang terbaru dan segera kirim lamaranmu.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApps.map((app) => {
            const stepIndex = getStepProgress(app.status);

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6"
              >
                {/* Top Section: Company & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={app.companyLogo}
                      alt={app.companyName}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-500">{app.companyName}</span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                        {app.internshipTitle}
                      </h2>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Diajukan pada: <span className="font-medium text-slate-600">{app.appliedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold ${
                        app.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'interview'
                          ? 'bg-indigo-100 text-indigo-800 animate-pulse'
                          : app.status === 'screening'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {app.status === 'submitted' && '1. Berkas Terkirim'}
                      {app.status === 'screening' && '2. Seleksi Administrasi'}
                      {app.status === 'interview' && '3. Interview Dijadwalkan'}
                      {app.status === 'accepted' && '4. Selamat! Diterima'}
                      {app.status === 'rejected' && 'Belum Lolos'}
                    </span>

                    <button
                      onClick={() => setSelectedAppDetail(app)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Lihat Berkas
                    </button>
                  </div>
                </div>

                {/* VISUAL TIMELINE PROGRESS */}
                <div className="py-4 border-y border-slate-100">
                  <div className="relative">
                    {/* Background line */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-slate-100 rounded-full" />
                    {/* Active line */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 left-0 h-1 rounded-full transition-all duration-500 ${
                        app.status === 'rejected' ? 'bg-rose-400' : 'bg-blue-600'
                      }`}
                      style={{
                        width:
                          stepIndex === 1
                            ? '15%'
                            : stepIndex === 2
                            ? '48%'
                            : stepIndex === 3
                            ? '80%'
                            : '100%'
                      }}
                    />

                    {/* Timeline 4 Steps */}
                    <div className="relative flex justify-between">
                      {/* Step 1: Dikirim */}
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm ${
                            stepIndex >= 1
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          ✓
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 mt-2">Dikirim</span>
                        <span className="text-[10px] text-slate-400">Berkas Masuk</span>
                      </div>

                      {/* Step 2: Seleksi Administrasi */}
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm ${
                            stepIndex >= 2
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {stepIndex >= 2 ? '✓' : '2'}
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 mt-2">
                          Seleksi Berkas
                        </span>
                        <span className="text-[10px] text-slate-400">Review Profil</span>
                      </div>

                      {/* Step 3: Interview */}
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm ${
                            stepIndex >= 3
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {stepIndex >= 3 ? (app.status === 'interview' ? '🎙️' : '✓') : '3'}
                        </div>
                        <span className="text-[11px] font-bold text-slate-800 mt-2">Interview</span>
                        <span className="text-[10px] text-slate-400">Sesi Wawancara</span>
                      </div>

                      {/* Step 4: Diterima / Ditolak */}
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm ${
                            app.status === 'accepted'
                              ? 'bg-emerald-600 text-white animate-bounce'
                              : app.status === 'rejected'
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {app.status === 'accepted' ? '🎉' : app.status === 'rejected' ? '✕' : '4'}
                        </div>
                        <span
                          className={`text-[11px] font-bold mt-2 ${
                            app.status === 'accepted'
                              ? 'text-emerald-700'
                              : app.status === 'rejected'
                              ? 'text-rose-700'
                              : 'text-slate-800'
                          }`}
                        >
                          {app.status === 'accepted'
                            ? 'Diterima'
                            : app.status === 'rejected'
                            ? 'Ditolak'
                            : 'Hasil Akhir'}
                        </span>
                        <span className="text-[10px] text-slate-400">Offering</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM DETAILS & ACTIONS BASED ON STATUS */}
                {app.status === 'interview' && app.interviewSchedule && (
                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-indigo-700" />
                        <span className="text-xs font-bold text-indigo-900">
                          Jadwal Wawancara: {app.interviewSchedule.date} ({app.interviewSchedule.time})
                        </span>
                      </div>
                      <p className="text-xs text-indigo-800/80">
                        Platform: {app.interviewSchedule.platform} • {app.interviewSchedule.notes}
                      </p>
                    </div>

                    <a
                      href={app.interviewSchedule.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 shrink-0 shadow-md shadow-indigo-600/20"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Masuk Ruang Interview</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {app.status === 'accepted' && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-900">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Selamat! Anda diterima dalam program magang ini.</span>
                      </div>
                      <p className="text-xs text-emerald-800/80">
                        Catatan HR: &quot;{app.notesFromCompany}&quot;
                      </p>
                    </div>

                    <button
                      onClick={onNavigateToActiveInternship}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 shrink-0 cursor-pointer"
                    >
                      <span>Buka Magang Berjalan & Jurnal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {app.status === 'screening' && (
                  <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>
                      Tim HR sedang meninjau kelengkapan portofolio dan kesesuaian rapor/transkrip Anda.
                    </span>
                  </div>
                )}

                {app.status === 'rejected' && (
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
                    Terima kasih atas partisipasi Anda. Jangan berkecil hati! Tingkatkan kembali portofolio
                    menggunakan AI CV Checker dan coba lamar lowongan magang lainnya.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL (SHOW MOTIVATION & APPLICATION ANSWERS) */}
      {selectedAppDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg border border-slate-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">Detail Berkas Lamaran</h3>
                <p className="text-xs text-slate-500">{selectedAppDetail.internshipTitle}</p>
              </div>
              <button
                onClick={() => setSelectedAppDetail(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px]">File CV:</span>
                <p className="font-semibold text-slate-800">{selectedAppDetail.cvName}</p>
              </div>

              {selectedAppDetail.portfolioUrl && (
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Portofolio:</span>
                  <p className="font-semibold text-blue-600 break-all">
                    {selectedAppDetail.portfolioUrl}
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <span className="font-bold text-slate-700">Motivasi Magang:</span>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed">
                  {selectedAppDetail.motivation}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700">Alasan Memilih Perusahaan:</span>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed">
                  {selectedAppDetail.reason}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700">Pengalaman Relevan:</span>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed">
                  {selectedAppDetail.relevantExperience}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedAppDetail(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
