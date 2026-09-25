import React from 'react';
import {
  Briefcase,
  CheckCircle,
  XCircle,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  FileCheck2,
  Bookmark,
  ChevronRight,
  Video,
  Award,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { StudentProfile, Application, ActiveInternship, Internship } from '../types';
import { generateSmartRecommendations } from '../utils/aiService';

interface StudentDashboardProps {
  profile: StudentProfile;
  applications: Application[];
  activeInternship: ActiveInternship | null;
  internships: Internship[];
  bookmarkedIds: string[];
  onSelectInternship: (internship: Internship) => void;
  onNavigate: (tab: string) => void;
  onOpenCVChecker: () => void;
  onOpenAIRecommendation: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  applications,
  activeInternship,
  internships,
  bookmarkedIds,
  onSelectInternship,
  onNavigate,
  onOpenCVChecker,
  onOpenAIRecommendation
}) => {
  // Application counts
  const activeApplications = applications.filter(
    (a) => a.status === 'submitted' || a.status === 'screening' || a.status === 'interview'
  );
  const acceptedApplications = applications.filter((a) => a.status === 'accepted');
  const rejectedApplications = applications.filter((a) => a.status === 'rejected');

  // Check upcoming interview
  const upcomingInterviewApp = applications.find(
    (a) => a.status === 'interview' && a.interviewSchedule
  );

  // Recommendations
  const smartRecs = generateSmartRecommendations(profile, internships).slice(0, 3);

  // Calculate profile completeness
  let completeness = 50;
  if (profile.skills.length >= 4) completeness += 15;
  if (profile.cvName) completeness += 15;
  if (profile.portfolioUrl) completeness += 10;
  if (profile.experiences.length > 0) completeness += 5;
  if (profile.certificates.length > 0) completeness += 5;
  completeness = Math.min(completeness, 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* WELCOME BANNER & PROFILE COMPLETION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold backdrop-blur-md">
              <span>{profile.educationLevel}</span>
              <span>•</span>
              <span>{profile.school}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Selamat datang, {profile.name}! 👋
            </h1>
            <p className="text-sm text-blue-100 max-w-xl">
              Jurusan <span className="font-semibold text-white">{profile.major}</span> ({profile.year}).
              Pantau progres lamaran, jadwal interview, dan rekomendasi posisi magang pilihanmu.
            </p>
          </div>

          {/* Profile Completeness Pill Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 w-full lg:w-80 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-100">Kelengkapan Profilmu</span>
              <span className="text-sm font-extrabold text-amber-300">{completeness}% Lengkap</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <button
              onClick={() => onNavigate('profile')}
              className="w-full py-1.5 bg-white text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Lengkapi Profil & CV</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* UPCOMING INTERVIEW ALERT (IF ANY) */}
      {upcomingInterviewApp && upcomingInterviewApp.interviewSchedule && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-200 text-indigo-900 mb-1">
                  Jadwal Interview Mendatang!
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {upcomingInterviewApp.internshipTitle} - {upcomingInterviewApp.companyName}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 flex flex-wrap items-center gap-3">
                  <span className="font-semibold text-indigo-800">
                    📅 {upcomingInterviewApp.interviewSchedule.date} ({upcomingInterviewApp.interviewSchedule.time})
                  </span>
                  <span>•</span>
                  <span>Platform: {upcomingInterviewApp.interviewSchedule.platform}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <a
                href={upcomingInterviewApp.interviewSchedule.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-600/20"
              >
                <Video className="w-4 h-4" />
                <span>Masuk Ruang Interview</span>
              </a>
              <button
                onClick={() => onNavigate('tracking')}
                className="px-3 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* METRIC CARDS (4 CARDS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* 1. Lamaran Aktif */}
        <div
          onClick={() => onNavigate('tracking')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-blue-400 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Lamaran Aktif
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {activeApplications.length}
            </span>
            <span className="text-xs font-semibold text-blue-600 flex items-center">
              Lihat status <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sedang proses screening & wawancara</p>
        </div>

        {/* 2. Lamaran Diterima */}
        <div
          onClick={() => onNavigate('tracking')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-400 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Lamaran Diterima
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {acceptedApplications.length}
            </span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center">
              Offering <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Selamat atas pencapaianmu!</p>
        </div>

        {/* 3. Lamaran Ditolak */}
        <div
          onClick={() => onNavigate('tracking')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-slate-300 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Lamaran Ditolak
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {rejectedApplications.length}
            </span>
            <span className="text-xs font-semibold text-slate-500 flex items-center">
              Evaluasi <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Tetap semangat, perbaiki CV</p>
        </div>

        {/* 4. Magang Sedang Berjalan */}
        <div
          onClick={() => onNavigate('active-internship')}
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-indigo-400 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Magang Berjalan
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
              {activeInternship ? '1 Aktif' : '0'}
            </span>
            <span className="text-xs font-semibold text-indigo-600 flex items-center">
              Buka Jurnal <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {activeInternship ? `Minggu ke-${activeInternship.currentWeek} dari ${activeInternship.totalWeeks}` : 'Belum ada magang aktif'}
          </p>
        </div>
      </div>

      {/* QUICK SHORTCUT ACTIONS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={onOpenCVChecker}
          className="p-4 bg-white rounded-2xl border border-emerald-200/80 shadow-sm hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
              AI CV Checker
            </div>
            <div className="text-[11px] text-slate-500">Skor & tips kelayakan</div>
          </div>
        </button>

        <button
          onClick={onOpenAIRecommendation}
          className="p-4 bg-white rounded-2xl border border-blue-200/80 shadow-sm hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
              AI Rekomendasi
            </div>
            <div className="text-[11px] text-slate-500">Match jurusan & skill</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('active-internship')}
          className="p-4 bg-white rounded-2xl border border-indigo-200/80 shadow-sm hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
              Jurnal Harian PKL
            </div>
            <div className="text-[11px] text-slate-500">Isi logbook kegiatan</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('catalog')}
          className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
              Cari Lowongan
            </div>
            <div className="text-[11px] text-slate-500">{internships.length} posisi terbuka</div>
          </div>
        </button>
      </div>

      {/* SECTION: REKOMENDASI MAGANG UNTUKMU */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Kecocokan AI Cerdas</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Rekomendasi Magang Untukmu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Dianalisis berdasarkan jurusan <span className="font-semibold">{profile.major}</span>,
              skill ({profile.skills.slice(0, 3).join(', ')}), lokasi, dan preferensi {profile.preferredWorkType.join('/')}.
            </p>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Lihat Semua Rekomendasi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* List of 3 recommended cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {smartRecs.map((rec) => {
            const job = internships.find((i) => i.id === rec.internshipId);
            if (!job) return null;

            return (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200/90 p-5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden bg-slate-50/50"
              >
                {/* Match percentage pill */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    {rec.matchScore}% Cocok
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">{job.duration}</span>
                </div>

                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 line-clamp-1">
                        {job.companyName}
                      </h4>
                      <span className="text-[10px] text-slate-400">{job.category}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => onSelectInternship(job)}
                    className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer"
                  >
                    {job.title}
                  </h3>

                  {/* Match reasoning */}
                  <div className="mt-2.5 p-2 bg-blue-50/80 rounded-xl border border-blue-100 text-[11px] text-blue-900">
                    <span className="font-bold">Kenapa Cocok:</span> {rec.matchReason}
                  </div>

                  <div className="mt-3 flex items-center text-xs text-slate-500 gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{job.location.split('(')[0]}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{job.workType}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">
                    {job.compensation === 'Paid' ? 'Paid Magang' : 'Unpaid'}
                  </span>
                  <button
                    onClick={() => onSelectInternship(job)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Detail Lowongan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RECENT APPLICATIONS TRACKER PREVIEW */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-black text-slate-900">Lamaran Terakhir Diajukan</h3>
            <p className="text-xs text-slate-500">
              Pantau tahapan seleksi berkas hingga pengumuman offering.
            </p>
          </div>
          <button
            onClick={() => onNavigate('tracking')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Semua Lamaran ({applications.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {applications.slice(0, 3).map((app) => (
            <div
              key={app.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={app.companyLogo}
                  alt={app.companyName}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{app.internshipTitle}</h4>
                  <div className="flex items-center text-xs text-slate-500 gap-2 mt-0.5">
                    <span>{app.companyName}</span>
                    <span>•</span>
                    <span>Diajukan {app.appliedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === 'interview'
                      ? 'bg-indigo-100 text-indigo-800'
                      : app.status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-800'
                      : app.status === 'rejected'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {app.status === 'submitted'
                    ? 'Terkirim'
                    : app.status === 'screening'
                    ? 'Seleksi Administrasi'
                    : app.status === 'interview'
                    ? 'Interview'
                    : app.status === 'accepted'
                    ? 'Diterima 🎉'
                    : 'Belum Lolos'}
                </span>

                <button
                  onClick={() => onNavigate('tracking')}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
