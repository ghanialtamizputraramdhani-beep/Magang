import React, { useState } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  Calendar,
  CheckCircle2,
  XCircle,
  Plus,
  Clock,
  Video,
  FileText,
  Search,
  ChevronRight,
  ShieldCheck,
  Edit2,
  Trash2,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Award
} from 'lucide-react';
import { Company, Internship, Application, ApplicationStatus, InterviewSchedule } from '../types';

interface CompanyDashboardProps {
  company: Company;
  internships: Internship[];
  applications: Application[];
  onAddInternship: (newInternship: Internship) => void;
  onUpdateInternshipStatus: (id: string, status: 'active' | 'closed') => void;
  onUpdateApplicationStatus: (
    applicationId: string,
    status: ApplicationStatus,
    interviewSchedule?: InterviewSchedule,
    notes?: string
  ) => void;
  onUpdateCompany: (updated: Company) => void;
  onViewCandidate: (app: Application) => void;
}

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({
  company,
  internships,
  applications,
  onAddInternship,
  onUpdateInternshipStatus,
  onUpdateApplicationStatus,
  onUpdateCompany,
  onViewCandidate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vacancies' | 'candidates' | 'interviews' | 'interns' | 'profile'>('overview');

  // Filter candidate state
  const [candidateFilterStatus, setCandidateFilterStatus] = useState<string>('all');
  const [candidateSearch, setCandidateSearch] = useState<string>('');

  // New Internship modal
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<any>('IT & Programming');
  const [newLocation, setNewLocation] = useState('Jakarta Selatan');
  const [newWorkType, setNewWorkType] = useState<any>('Hybrid');
  const [newDuration, setNewDuration] = useState('3 Bulan');
  const [newStipend, setNewStipend] = useState('Rp 3.000.000 / bulan');
  const [newQuota, setNewQuota] = useState(3);
  const [newDesc, setNewDesc] = useState('');
  const [newSkillsStr, setNewSkillsStr] = useState('React, Tailwind CSS, JavaScript');

  // Schedule Interview modal
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState('29 September 2026');
  const [interviewTime, setInterviewTime] = useState('14:00 - 14:45 WIB');
  const [interviewPlatform, setInterviewPlatform] = useState<'Google Meet' | 'Zoom' | 'Tatap Muka di Kantor'>('Google Meet');
  const [interviewMeetingLink, setInterviewMeetingLink] = useState('https://meet.google.com/tlkm-intern-interview');
  const [interviewNotes, setInterviewNotes] = useState('Harap siapkan portofolio dan berpakaian rapi.');

  // Metric counts
  const totalVacancies = internships.length;
  const totalApplicants = applications.length;
  const inProcessCount = applications.filter(
    (a) => a.status === 'screening' || a.status === 'interview'
  ).length;
  const acceptedCount = applications.filter((a) => a.status === 'accepted').length;

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newJob: Internship = {
      id: `intern-${Date.now()}`,
      companyId: company.id,
      companyName: company.name,
      companyLogo: company.logo,
      companyVerified: true,
      title: newTitle,
      category: newCategory,
      location: newLocation,
      workType: newWorkType,
      duration: newDuration,
      startDate: '15 Oktober 2026',
      deadline: '10 Oktober 2026',
      compensation: 'Paid',
      stipendAmount: newStipend,
      educationLevelRequired: ['SMA/SMK', 'Mahasiswa (D3/D4/S1)'],
      description: newDesc || 'Program magang akselerasi kemampuan praktis bersama tim industri profesional.',
      jobDescription: [
        'Melaksanakan tugas harian sesuai arahan mentor.',
        'Mempelajari workflow kolaboratif dan standar kualitas korporat.',
        'Menyusun laporan mingguan progres kerja.'
      ],
      requirements: {
        education: 'Siswa SMK tingkat akhir atau Mahasiswa aktif.',
        skills: newSkillsStr.split(',').map((s) => s.trim()),
        experience: 'Pernah membuat proyek individu atau kelompok.',
        other: ['Memiliki kedisiplinan dan kemauan belajar tinggi.']
      },
      benefits: [
        `Uang saku bulanan (${newStipend})`,
        'Sertifikat Magang Resmi Berstandar Industri',
        'Bimbingan langsung dari praktisi ahli'
      ],
      timeline: [
        { step: 1, name: 'Pendaftaran', date: 'Buka Sekarang', desc: 'Pengumpulan berkas' },
        { step: 2, name: 'Seleksi Berkas', date: '11 - 12 Okt 2026', desc: 'Screening administrasi' },
        { step: 3, name: 'Interview', date: '13 - 14 Okt 2026', desc: 'Wawancara user' },
        { step: 4, name: 'Pengumuman', date: '15 Okt 2026', desc: 'Pemberitahuan lolos' },
        { step: 5, name: 'Mulai Bekerja', date: '16 Okt 2026', desc: 'Onboarding hari pertama' }
      ],
      status: 'active',
      applicantsCount: 0,
      quota: newQuota,
      featured: true
    };

    onAddInternship(newJob);
    setShowNewJobModal(false);
    setNewTitle('');
    setNewDesc('');
    alert('Lowongan baru berhasil diterbitkan dan langsung tampil di pencarian!');
  };

  const handleConfirmScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppForInterview) return;

    onUpdateApplicationStatus(
      selectedAppForInterview.id,
      'interview',
      {
        date: interviewDate,
        time: interviewTime,
        platform: interviewPlatform,
        meetingLink: interviewMeetingLink,
        notes: interviewNotes
      },
      `Jadwal interview telah ditentukan: ${interviewDate} pukul ${interviewTime}`
    );

    alert(`Jadwal interview telah dikirimkan ke dashboard peserta: ${selectedAppForInterview.studentName}`);
    setSelectedAppForInterview(null);
  };

  const filteredCandidates = applications.filter((cand) => {
    if (candidateFilterStatus !== 'all' && cand.status !== candidateFilterStatus) return false;
    if (candidateSearch.trim()) {
      const q = candidateSearch.toLowerCase();
      const matchName = cand.studentName.toLowerCase().includes(q);
      const matchSchool = cand.studentSchool.toLowerCase().includes(q);
      const matchJob = cand.internshipTitle.toLowerCase().includes(q);
      if (!matchName && !matchSchool && !matchJob) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* COMPANY HERO HEADER */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shrink-0 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black text-white">{company.name}</span>
                {company.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                    <span>Perusahaan Terverifikasi</span>
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {company.industry} • {company.location}
              </p>
              <p className="text-xs text-blue-200">
                PIC: <strong className="text-white">{company.picName}</strong> ({company.picEmail})
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNewJobModal(true)}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center space-x-2 cursor-pointer self-start sm:self-auto hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>+ Buat Lowongan Baru</span>
          </button>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Dashboard Ringkasan
          </button>
          <button
            onClick={() => setActiveTab('vacancies')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'vacancies'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Manajemen Lowongan ({totalVacancies})
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'candidates'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Kandidat & Seleksi Pelamar ({totalApplicants})
          </button>
          <button
            onClick={() => setActiveTab('interviews')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'interviews'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Jadwal Interview
          </button>
          <button
            onClick={() => setActiveTab('interns')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'interns'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Peserta Magang Berjalan ({acceptedCount})
          </button>
        </div>
      </div>

      {/* METRIC CARDS (4 CARDS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Lowongan
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {totalVacancies}
          </div>
          <span className="text-xs text-blue-600 font-semibold mt-1 block">Aktif di publik</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Pelamar
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-2">
            {totalApplicants}
          </div>
          <span className="text-xs text-slate-500 font-semibold mt-1 block">Siswa & Mahasiswa</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Kandidat Diproses
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 mt-2">
            {inProcessCount}
          </div>
          <span className="text-xs text-amber-700 font-semibold mt-1 block">Screening & Interview</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Kandidat Diterima
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-2">
            {acceptedCount}
          </div>
          <span className="text-xs text-emerald-700 font-semibold mt-1 block">Siap Onboarding</span>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & CANDIDATE ACTION */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick candidates list needing review */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Pelamar Terbaru Menunggu Keputusan
                </h2>
                <p className="text-xs text-slate-500">
                  Tinjau berkas CV dan jadwalkan sesi interview atau berikan offering.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('candidates')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Semua ({applications.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={app.studentAvatar}
                      alt={app.studentName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-slate-900">{app.studentName}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                          {app.studentEducationLevel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {app.studentSchool} • Jurusan {app.studentMajor}
                      </p>
                      <p className="text-xs font-semibold text-slate-700">
                        Melamar untuk: <span className="text-blue-600">{app.internshipTitle}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions for this candidate */}
                  <div className="flex items-center space-x-2 self-end lg:self-center">
                    <button
                      onClick={() => onViewCandidate(app)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Lihat Berkas & CV
                    </button>

                    {app.status !== 'interview' && app.status !== 'accepted' && (
                      <button
                        onClick={() => setSelectedAppForInterview(app)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Jadwalkan Interview
                      </button>
                    )}

                    {app.status !== 'accepted' && (
                      <button
                        onClick={() => {
                          onUpdateApplicationStatus(app.id, 'accepted', undefined, 'Selamat! Anda diterima.');
                          alert(`Kandidat ${app.studentName} dinyatakan DITERIMA!`);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Terima
                      </button>
                    )}

                    {app.status !== 'rejected' && app.status !== 'accepted' && (
                      <button
                        onClick={() => {
                          onUpdateApplicationStatus(app.id, 'rejected', undefined, 'Mohon maaf belum lolos.');
                          alert(`Kandidat ${app.studentName} ditolak.`);
                        }}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Tolak
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAJEMEN LOWONGAN */}
      {activeTab === 'vacancies' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Daftar Lowongan Perusahaan</h2>
              <p className="text-xs text-slate-500">
                Kelola status lowongan, kuota peserta, dan tinjau jumlah pelamar masuk.
              </p>
            </div>
            <button
              onClick={() => setShowNewJobModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              + Tambah Lowongan
            </button>
          </div>

          <div className="space-y-4">
            {internships.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-400 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-base text-slate-900">{job.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        job.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {job.status === 'active' ? 'Aktif' : 'Ditutup'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {job.category} • {job.workType} • Durasi: {job.duration} • Kuota: {job.quota} Orang
                  </p>
                  <p className="text-xs font-semibold text-blue-600">
                    {job.applicantsCount} Pelamar Terdaftar • Deadline: {job.deadline}
                  </p>
                </div>

                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <button
                    onClick={() =>
                      onUpdateInternshipStatus(
                        job.id,
                        job.status === 'active' ? 'closed' : 'active'
                      )
                    }
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    {job.status === 'active' ? 'Tutup Lowongan' : 'Aktifkan Kembali'}
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('candidates');
                      setCandidateSearch(job.title);
                    }}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Lihat Pelamar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: KANDIDAT & SELEKSI (ATS SYSTEM) */}
      {activeTab === 'candidates' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Sistem Seleksi Kandidat (ATS Magang)
              </h2>
              <p className="text-xs text-slate-500">
                Alur tahapan: Applied → Screening → Interview → Accepted / Rejected
              </p>
            </div>

            {/* Candidate Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                placeholder="Cari kandidat / sekolah..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Status filter chips */}
          <div className="flex flex-wrap gap-2 text-xs">
            {['all', 'submitted', 'screening', 'interview', 'accepted', 'rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setCandidateFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  candidateFilterStatus === st
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'all'
                  ? 'Semua'
                  : st === 'submitted'
                  ? 'Applied'
                  : st === 'screening'
                  ? 'Screening'
                  : st === 'interview'
                  ? 'Interview'
                  : st === 'accepted'
                  ? 'Accepted'
                  : 'Rejected'}
              </button>
            ))}
          </div>

          {/* Candidates table / list */}
          <div className="space-y-4">
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className="p-5 rounded-2xl border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-slate-50/50"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={cand.studentAvatar}
                    alt={cand.studentName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-900">{cand.studentName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                        {cand.studentEducationLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {cand.studentSchool} • Jurusan {cand.studentMajor}
                    </p>
                    <p className="text-xs text-slate-600">
                      Posisi: <strong className="text-slate-800">{cand.internshipTitle}</strong>
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {cand.studentSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-end lg:self-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      cand.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : cand.status === 'interview'
                        ? 'bg-indigo-100 text-indigo-800'
                        : cand.status === 'screening'
                        ? 'bg-blue-100 text-blue-800'
                        : cand.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {cand.status.toUpperCase()}
                  </span>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => onViewCandidate(cand)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      Buka Profil & CV
                    </button>
                    <button
                      onClick={() => setSelectedAppForInterview(cand)}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200"
                    >
                      Interview
                    </button>
                    <button
                      onClick={() => {
                        onUpdateApplicationStatus(cand.id, 'accepted');
                        alert(`${cand.studentName} Diterima!`);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                    >
                      Terima
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: JADWAL INTERVIEW */}
      {activeTab === 'interviews' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-slate-900">Jadwal Interview yang Ditetapkan</h2>
          <div className="space-y-4">
            {applications
              .filter((a) => a.status === 'interview' && a.interviewSchedule)
              .map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block">
                      {app.interviewSchedule?.platform}
                    </span>
                    <h3 className="font-bold text-base text-slate-900">{app.studentName}</h3>
                    <p className="text-xs text-slate-600">
                      Posisi: {app.internshipTitle} • {app.studentSchool}
                    </p>
                    <p className="text-xs font-semibold text-indigo-900">
                      📅 {app.interviewSchedule?.date} ({app.interviewSchedule?.time})
                    </p>
                    <p className="text-xs text-slate-500">Catatan: {app.interviewSchedule?.notes}</p>
                  </div>

                  <a
                    href={app.interviewSchedule?.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Buka Tautan Rapat</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 5: PESERTA MAGANG BERJALAN */}
      {activeTab === 'interns' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-slate-900">Daftar Peserta Magang yang Berjalan</h2>
          <p className="text-xs text-slate-500">
            Tinjau progres peserta yang telah lolos seleksi dan sedang menjalani program di perusahaan.
          </p>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                RP
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Rizky Pratama</h4>
                <p className="text-xs text-slate-500">SMK Negeri 1 Jakarta • Rekayasa Perangkat Lunak</p>
                <p className="text-xs text-blue-600 font-semibold">Junior Web Developer Intern (Minggu 8 dari 12)</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Aktif Magang
            </span>
          </div>
        </div>
      )}

      {/* MODAL 1: FORM BUAT LOWONGAN BARU */}
      {showNewJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-2xl border border-slate-200 shadow-2xl space-y-4 my-6">
            <h3 className="font-bold text-lg text-slate-900">Publikasikan Lowongan Magang Baru</h3>
            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Posisi Magang</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Frontend Engineer Intern / Akuntansi Staff PKL"
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bidang / Kategori</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="IT & Programming">IT & Programming</option>
                    <option value="Teknik">Teknik</option>
                    <option value="Desain">Desain</option>
                    <option value="Keuangan">Keuangan</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Bisnis & Manajemen">Bisnis & Manajemen</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sistem Kerja</label>
                  <select
                    value={newWorkType}
                    onChange={(e) => setNewWorkType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="WFO">WFO (Tatap Muka)</option>
                    <option value="WFH">WFH (Remote)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi Kerja</label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Durasi</label>
                  <input
                    type="text"
                    required
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kuota Peserta</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newQuota}
                    onChange={(e) => setNewQuota(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Uang Saku / Kompensasi</label>
                <input
                  type="text"
                  required
                  value={newStipend}
                  onChange={(e) => setNewStipend(e.target.value)}
                  placeholder="Rp 2.500.000 / bulan + laptop"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Skill Utama (Pisahkan Koma)</label>
                <input
                  type="text"
                  required
                  value={newSkillsStr}
                  onChange={(e) => setNewSkillsStr(e.target.value)}
                  placeholder="React, CSS, Git, Komunikasi"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Jelaskan gambaran umum kegiatan magang..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewJobModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
                >
                  Terbitkan Lowongan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: JADWALKAN INTERVIEW */}
      {selectedAppForInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">Jadwalkan Sesi Wawancara</h3>
            <p className="text-xs text-slate-500">
              Kandidat: <strong className="text-slate-800">{selectedAppForInterview.studentName}</strong> (
              {selectedAppForInterview.internshipTitle})
            </p>

            <form onSubmit={handleConfirmScheduleInterview} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tanggal</label>
                <input
                  type="text"
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Waktu / Jam (WIB)</label>
                <input
                  type="text"
                  required
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Platform</label>
                <select
                  value={interviewPlatform}
                  onChange={(e) => setInterviewPlatform(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="Zoom">Zoom</option>
                  <option value="Tatap Muka di Kantor">Tatap Muka di Kantor</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tautan Rapat (Meeting Link)</label>
                <input
                  type="url"
                  required
                  value={interviewMeetingLink}
                  onChange={(e) => setInterviewMeetingLink(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan untuk Kandidat</label>
                <textarea
                  rows={2}
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAppForInterview(null)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
                >
                  Kirim Undangan Wawancara
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
