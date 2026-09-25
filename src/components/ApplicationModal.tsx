import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  FileText,
  Upload,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Internship, StudentProfile, Application } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  internship: Internship;
  profile: StudentProfile;
  onSubmitApplication: (applicationData: Partial<Application>) => void;
  onViewTracking: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  internship,
  profile,
  onSubmitApplication,
  onViewTracking
}) => {
  const [motivation, setMotivation] = useState('');
  const [reason, setReason] = useState('');
  const [relevantExperience, setRelevantExperience] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState(profile.portfolioUrl || '');
  const [cvName, setCvName] = useState(profile.cvName || 'CV_Lengkap_Pelajar.pdf');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreementChecked) {
      alert('Silakan centang pernyataan kebenaran data.');
      return;
    }

    onSubmitApplication({
      internshipId: internship.id,
      internshipTitle: internship.title,
      companyId: internship.companyId,
      companyName: internship.companyName,
      companyLogo: internship.companyLogo,
      studentId: profile.id,
      studentName: profile.name,
      studentEmail: profile.email,
      studentPhone: profile.phone,
      studentSchool: profile.school,
      studentMajor: profile.major,
      studentEducationLevel: profile.educationLevel,
      studentAvatar: profile.avatar,
      studentSkills: profile.skills,
      cvName,
      portfolioUrl,
      motivation,
      reason,
      relevantExperience,
      appliedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      status: 'submitted',
      notesFromCompany: 'Lamaran Anda telah diterima oleh sistem dan sedang menunggu antrean screening.'
    });

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* ================= SUCCESS CONFIRMATION SCREEN ================= */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                Pendaftaran Berhasil!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Lamaran Berhasil Dikirim!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Lamaranmu untuk posisi <span className="font-bold text-slate-900">{internship.title}</span> di{' '}
                <span className="font-bold text-slate-900">{internship.companyName}</span> telah berhasil masuk ke sistem rekruter.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">ID Lamaran:</span>
                <span className="font-bold text-slate-800">MGK-APP-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status Saat Ini:</span>
                <span className="font-bold text-blue-600">Terkirim (Menunggu Screening)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimasi Seleksi:</span>
                <span className="font-semibold text-slate-700">1 - 3 Hari Kerja</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onViewTracking();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>Pantau di Lamaran Saya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          /* ================= APPLICATION FORM ================= */
          <div>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block mb-1">
                Formulir Pendaftaran Magang
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">{internship.title}</h2>
              <p className="text-xs text-blue-200 mt-1">
                {internship.companyName} • {internship.location.split('(')[0]}
              </p>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* SECTION 1: DATA DIRI (AUTO-FILLED) */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Data Diri Peserta (Otomatis dari Profil)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
                  <div>
                    <span className="text-slate-400 block">Nama Lengkap:</span>
                    <span className="font-bold text-slate-800 text-sm">{profile.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email:</span>
                    <span className="font-semibold text-slate-800">{profile.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Sekolah / Kampus:</span>
                    <span className="font-semibold text-slate-800">{profile.school}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Jurusan & Jenjang:</span>
                    <span className="font-semibold text-slate-800">
                      {profile.major} ({profile.educationLevel})
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: CV & DOKUMEN */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Berkas & Portofolio</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* File CV */}
                  <div className="p-3.5 bg-white border border-slate-200 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">Curriculum Vitae</span>
                    <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-xl">
                      <span className="font-bold text-red-600">PDF</span>
                      <span className="truncate flex-1">{cvName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const name = prompt('Ganti nama file CV:', 'CV_Terbaru_2026.pdf');
                        if (name) setCvName(name);
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Ganti berkas CV
                    </button>
                  </div>

                  {/* Portfolio URL */}
                  <div className="p-3.5 bg-white border border-slate-200 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">
                      Tautan Portofolio / GitHub
                    </span>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    <span className="text-[10px] text-slate-400 block">
                      Tautan untuk meninjau hasil karya
                    </span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: PERTANYAAN PERUSAHAAN */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Pertanyaan Rekruter Perusahaan</span>
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    1. Apa motivasi Anda mengikuti program magang ini? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="Ceritakan tujuan belajar dan apa yang ingin Anda capai selama program..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    2. Mengapa Anda memilih {internship.companyName}? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Apa yang menarik perhatian Anda mengenai perusahaan dan budaya kerjanya..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    3. Ceritakan pengalaman atau proyek relevan yang pernah Anda kerjakan! <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={relevantExperience}
                    onChange={(e) => setRelevantExperience(e.target.value)}
                    placeholder="Contoh: proyek tugas sekolah/kampus, kepanitiaan, atau kompetisi..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* SECTION 4: PERNYATAAN KEBENARAN DATA */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={isAgreementChecked}
                    onChange={(e) => setIsAgreementChecked(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-0.5 cursor-pointer"
                  />
                  <span className="text-xs text-blue-950 font-medium leading-relaxed">
                    Saya menyatakan bahwa data yang saya berikan adalah benar, dan saya bersedia mengikuti
                    seluruh rangkaian tahapan seleksi dan tata tertib magang industri secara bertanggung jawab.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isAgreementChecked}
                className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                  isAgreementChecked
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:scale-[1.01]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Kirim Lamaran Magang</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
