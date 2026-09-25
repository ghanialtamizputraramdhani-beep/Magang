import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Plus,
  FileText,
  User,
  Building2,
  Upload,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Camera,
  MapPin
} from 'lucide-react';
import { ActiveInternship, JournalEntry, InternshipTask, AttendanceRecord } from '../types';

interface ActiveInternshipViewProps {
  internship: ActiveInternship;
  onUpdateInternship: (updated: ActiveInternship) => void;
  onOpenCertificate: () => void;
}

export const ActiveInternshipView: React.FC<ActiveInternshipViewProps> = ({
  internship,
  onUpdateInternship,
  onOpenCertificate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'journal' | 'attendance' | 'report'>('overview');

  // New Journal form state
  const [journalDate, setJournalDate] = useState(
    new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  );
  const [journalWeek, setJournalWeek] = useState(internship.currentWeek);
  const [journalActivity, setJournalActivity] = useState('');
  const [journalLearning, setJournalLearning] = useState('');
  const [journalObstacle, setJournalObstacle] = useState('');
  const [journalDocName, setJournalDocName] = useState('');
  const [journalSavedAlert, setJournalSavedAlert] = useState(false);

  // Attendance check-in state
  const [attType, setAttType] = useState<'WFO' | 'WFH'>('WFO');
  const [attNotes, setAttNotes] = useState('');
  const [attCheckedIn, setAttCheckedIn] = useState(false);

  // Final report submission state
  const [reportFile, setReportFile] = useState('Laporan_Akhir_Magang_Draft.pdf');

  // Toggle task completed
  const handleToggleTask = (taskId: string) => {
    const updatedTasks = internship.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onUpdateInternship({ ...internship, tasks: updatedTasks });
  };

  // Submit new journal entry
  const handleSubmitJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalActivity || !journalLearning) return;

    const newEntry: JournalEntry = {
      id: `jr-${Date.now()}`,
      internshipId: internship.internshipId,
      studentId: internship.studentId,
      date: journalDate,
      week: journalWeek,
      activity: journalActivity,
      learning: journalLearning,
      obstacle: journalObstacle || 'Tidak ada kendala yang menghambat.',
      documentationName: journalDocName || 'dokumentasi_kerja.jpg',
      verifiedByMentor: false,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    onUpdateInternship({
      ...internship,
      journals: [newEntry, ...internship.journals]
    });

    setJournalActivity('');
    setJournalLearning('');
    setJournalObstacle('');
    setJournalDocName('');
    setJournalSavedAlert(true);
    setTimeout(() => setJournalSavedAlert(false), 3000);
  };

  // Submit Daily Attendance
  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      type: attType,
      status: 'Hadir',
      checkInTime: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      notes: attNotes || (attType === 'WFO' ? 'Hadir di lokasi magang' : 'Remote dari rumah')
    };

    onUpdateInternship({
      ...internship,
      attendances: [newRecord, ...internship.attendances]
    });
    setAttCheckedIn(true);
    setAttNotes('');
  };

  const progressPercentage = Math.round((internship.currentWeek / internship.totalWeeks) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* MAGANG BERJALAN HEADER CARD */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start space-x-5">
            <img
              src={internship.companyLogo}
              alt={internship.companyName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/20 shrink-0 shadow-md"
            />
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Status: Magang Sedang Berjalan</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">{internship.position}</h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {internship.companyName}
              </p>

              <div className="flex flex-wrap items-center text-xs text-slate-400 gap-x-4 gap-y-1 pt-1">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>Mentor: <strong className="text-white">{internship.mentorName}</strong> ({internship.mentorRole})</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{internship.startDate} s/d {internship.endDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Progress Week Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 w-full lg:w-72 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-300">Progres Masa Magang</span>
              <span className="text-xs font-extrabold text-blue-300">
                Minggu {internship.currentWeek} dari {internship.totalWeeks}
              </span>
            </div>
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{progressPercentage}% Terlewati</span>
              <button
                onClick={onOpenCertificate}
                className="text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer"
              >
                Lihat Sertifikat
              </button>
            </div>
          </div>
        </div>

        {/* SUB-TABS */}
        <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Dashboard & Tugas Mingguan
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'journal'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Jurnal Harian ({internship.journals.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'attendance'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Absensi / Presensi ({internship.attendances.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'report'
                ? 'bg-white text-slate-900 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Sertifikat & Evaluasi</span>
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & TASKS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tasks Column (Col 8) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Daftar Tugas & Target Minggu ke-{internship.currentWeek}
                </h2>
                <p className="text-xs text-slate-500">
                  Tugas yang didelegasikan oleh mentor industri Anda ({internship.mentorName}).
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
                {internship.tasks.filter((t) => t.completed).length} / {internship.tasks.length} Selesai
              </span>
            </div>

            <div className="space-y-3">
              {internship.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                    task.completed
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-500'
                      : 'bg-white border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                    className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-bold ${
                        task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center text-xs text-slate-400 gap-3 mt-1">
                      <span>Tenggat: <strong className="text-slate-600">{task.deadline}</strong></span>
                      <span>•</span>
                      <span>Diberikan oleh: {task.assignedBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mentor Info & Quick Attendance (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mentor Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Mentor Pendamping Lapangan
              </span>
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                  {internship.mentorName[0]}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{internship.mentorName}</h3>
                  <p className="text-xs text-slate-500">{internship.mentorRole}</p>
                  <p className="text-[11px] text-blue-600 mt-0.5">{internship.mentorEmail}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                &quot;Tetap disiplin mengisi jurnal harian dan jangan ragu berkonsultasi jika mengalami kendala teknis.&quot;
              </p>
            </div>

            {/* Quick Journal CTA */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-3xl p-6 space-y-3">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block">
                Catatan Harian
              </span>
              <h4 className="font-bold text-sm text-slate-900">
                Sudahkah kamu mengisi Jurnal Magang hari ini?
              </h4>
              <p className="text-xs text-slate-600">
                Dokumentasikan aktivitas dan pembelajaran untuk penilaian akhir PKL.
              </p>
              <button
                onClick={() => setActiveTab('journal')}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                + Tulis Jurnal Hari Ini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: JURNAL MAGANG HARIAN */}
      {activeTab === 'journal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FORM ISI JURNAL (COL 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5 sticky top-24">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Logbook Digital
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-1">Form Jurnal Harian PKL</h2>
              <p className="text-xs text-slate-500">
                Wajib diisi setiap hari kerja untuk verifikasi kehadiran dan kompetensi.
              </p>
            </div>

            {journalSavedAlert && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Jurnal harian berhasil disimpan dan dikirim ke mentor!</span>
              </div>
            )}

            <form onSubmit={handleSubmitJournal} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="text"
                    required
                    value={journalDate}
                    onChange={(e) => setJournalDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Minggu Ke-</label>
                  <select
                    value={journalWeek}
                    onChange={(e) => setJournalWeek(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    {Array.from({ length: internship.totalWeeks }, (_, i) => i + 1).map((w) => (
                      <option key={w} value={w}>
                        Minggu ke-{w}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Aktivitas yang Dikerjakan <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={journalActivity}
                  onChange={(e) => setJournalActivity(e.target.value)}
                  placeholder="Contoh: Merancang wireframe landing page, slicing UI di Figma..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Apa yang Dipelajari? (Kompetensi Baru) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={journalLearning}
                  onChange={(e) => setJournalLearning(e.target.value)}
                  placeholder="Contoh: Memahami auto-layout Figma dan prinsip desain responsif..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kendala & Solusi yang Diambil
                </label>
                <textarea
                  rows={2}
                  value={journalObstacle}
                  onChange={(e) => setJournalObstacle(e.target.value)}
                  placeholder="Jika ada kesulitan dan bagaimana Anda mengatasinya..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lampiran Foto / Dokumentasi (Opsional)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={journalDocName}
                    onChange={(e) => setJournalDocName(e.target.value)}
                    placeholder="screenshot_project.png"
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setJournalDocName(`dokumentasi_${Date.now()}.png`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Simulasi Foto
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Simpan Jurnal Harian
              </button>
            </form>
          </div>

          {/* TIMELINE JURNAL TERDAFTAR (COL 7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900">
                  Riwayat Jurnal Terverifikasi ({internship.journals.length})
                </h3>
                <span className="text-xs text-slate-500">Urut dari terbaru</span>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                {internship.journals.map((journal) => (
                  <div key={journal.id} className="relative flex items-start space-x-4 pl-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ring-4 ring-white shadow-sm shrink-0 z-10 ${
                        journal.verifiedByMentor
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {journal.verifiedByMentor ? '✓' : '•'}
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <span className="text-xs font-bold text-slate-900">
                            {journal.date}
                          </span>
                          <span className="text-[11px] font-semibold text-blue-600 ml-2">
                            (Minggu ke-{journal.week})
                          </span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold self-start sm:self-auto ${
                            journal.verifiedByMentor
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {journal.verifiedByMentor ? 'Terverifikasi Mentor' : 'Menunggu Review'}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-700">
                        <p>
                          <strong className="text-slate-900">Aktivitas:</strong> {journal.activity}
                        </p>
                        <p>
                          <strong className="text-slate-900">Pembelajaran:</strong>{' '}
                          {journal.learning}
                        </p>
                        {journal.obstacle && (
                          <p className="text-slate-500">
                            <strong>Kendala:</strong> {journal.obstacle}
                          </p>
                        )}
                        {journal.documentationName && (
                          <div className="flex items-center space-x-1.5 text-blue-600 font-semibold pt-1">
                            <Camera className="w-3.5 h-3.5" />
                            <span>{journal.documentationName}</span>
                          </div>
                        )}
                      </div>

                      {/* Mentor Feedback Box */}
                      {journal.mentorFeedback && (
                        <div className="p-3 bg-blue-50/80 border border-blue-100 rounded-xl text-xs text-blue-900 space-y-1">
                          <span className="font-bold flex items-center gap-1">
                            <span>💬 Catatan Mentor ({internship.mentorName}):</span>
                          </span>
                          <p className="italic">&quot;{journal.mentorFeedback}&quot;</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ABSENSI / PRESENSI */}
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Check-In Card (Col 4) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-black text-slate-900">Presensi Kehadiran Harian</h2>
            <p className="text-xs text-slate-500">
              Lakukan presensi kehadiran sebelum memulai aktivitas magang harian.
            </p>

            <form onSubmit={handleCheckIn} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipe Bekerja</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttType('WFO')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      attType === 'WFO'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    WFO (Kantor)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttType('WFH')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      attType === 'WFH'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    WFH (Remote)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Lokasi / Tugas</label>
                <input
                  type="text"
                  value={attNotes}
                  onChange={(e) => setAttNotes(e.target.value)}
                  placeholder="Misal: Studio Dago / Rumah..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                Presensi Hadir Sekarang
              </button>
            </form>
          </div>

          {/* Attendance History (Col 8) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Rekap Kehadiran Magang ({internship.attendances.length} Hari Hadir)
              </h3>
              <span className="text-xs font-bold text-emerald-600">Kehadiran 100% (Tepat Waktu)</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {internship.attendances.map((rec) => (
                <div key={rec.id} className="py-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-800">{rec.date}</span>
                    <p className="text-slate-500">{rec.notes}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                      {rec.type}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {rec.checkInTime} - {rec.checkOutTime || '17:00 WIB'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      Hadir
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LAPORAN AKHIR & SERTIFIKAT */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-center max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              Evaluasi & Kelulusan Magang
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Sertifikat Kompetensi & Laporan Akhir PKL
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Setelah menyelesaikan masa magang dan diverifikasi oleh mentor, sertifikat digital resmi ber-QR Code dapat diunduh dan dibagikan.
            </p>
          </div>

          {/* Certificate Preview Card */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl text-left space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                  Sertifikat Kelulusan Industri
                </span>
                <h4 className="font-black text-slate-900 text-base sm:text-lg">
                  {internship.position}
                </h4>
                <p className="text-xs text-slate-600">{internship.companyName}</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                Predikat: A (Sangat Memuaskan)
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-blue-200/60">
              <span className="text-xs text-slate-500">
                Nomor: <strong className="text-slate-800">MGK/KREASI-NUSA/PKL/2026/089</strong>
              </span>

              <button
                onClick={onOpenCertificate}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center space-x-1.5 cursor-pointer hover:scale-105"
              >
                <Award className="w-4 h-4" />
                <span>Lihat & Unduh Sertifikat Resmi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
