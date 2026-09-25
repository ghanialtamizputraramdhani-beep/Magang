import React, { useRef } from 'react';
import {
  X,
  Download,
  Share2,
  Printer,
  Award,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CertificateData } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateData;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Mengunduh file resmi: ${certificate.certificateNumber.replace(/\//g, '_')}.pdf`);
  };

  const handleShare = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    const text = `Saya bangga telah menyelesaikan program magang ${certificate.position} di ${certificate.companyName} dengan predikat ${certificate.grade}! Verifikasi sertifikat: ${certificate.verificationCode}`;
    navigator.clipboard?.writeText(text);
    alert('Teks pencapaian dan kode verifikasi telah disalin ke clipboard! Siap dibagikan ke LinkedIn atau status WhatsApp.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Top Action Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-black text-sm">Sertifikat Resmi Magang Industri</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Cetak Sertifikat"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CERTIFICATE DISPLAY CANVAS (AUTHENTIC INDONESIAN INTERNSHIP STYLE) */}
        <div className="p-6 sm:p-10 bg-slate-100/70 overflow-x-auto flex justify-center">
          <div
            ref={certRef}
            className="w-full max-w-3xl bg-amber-50/20 border-8 border-double border-slate-700/80 rounded-2xl p-8 sm:p-12 shadow-xl relative text-center text-slate-800 space-y-6 bg-white"
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600" />

            {/* Certificate Header Logos */}
            <div className="flex items-center justify-between border-b-2 border-slate-300 pb-4">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-xl flex items-center justify-center">
                  M
                </div>
                <div>
                  <span className="font-extrabold text-sm tracking-tight text-slate-900 block">
                    MAGANGKU INDONESIA
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block">
                    Standar Vokasi & Kampus
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-500 block uppercase">
                  Nomor Sertifikat:
                </span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  {certificate.certificateNumber}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1 pt-2">
              <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-wider text-slate-900 uppercase">
                Sertifikat Praktik Kerja
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-600 italic">
                Certificate of Internship Completion
              </p>
            </div>

            {/* Recipient Statement */}
            <div className="space-y-2 max-w-xl mx-auto pt-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Diberikan kepada:
              </p>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-serif border-b border-slate-300 pb-2">
                {certificate.studentName}
              </div>
              <p className="text-xs font-semibold text-slate-700">{certificate.studentSchool}</p>
            </div>

            {/* Body Description */}
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Atas dedikasi, kedisiplinan, dan kelulusan program magang industri sebagai{' '}
              <strong className="text-slate-900 font-bold">{certificate.position}</strong> di{' '}
              <strong className="text-slate-900 font-bold">{certificate.companyName}</strong> pada periode{' '}
              <span className="font-semibold text-slate-800">{certificate.period}</span> dengan predikat nilai:{' '}
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {certificate.grade}
              </span>
              .
            </p>

            {/* Acquired Competencies Badges */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Kompetensi yang Dicapai (Acquired Skills):
              </span>
              <div className="flex flex-wrap justify-center gap-1.5 max-w-xl mx-auto">
                {certificate.skillsAcquired.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px] border border-slate-200"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 grid grid-cols-3 items-end gap-4 border-t border-slate-200">
              {/* Mentor Signature */}
              <div className="text-center space-y-1">
                <div className="h-12 flex items-center justify-center italic text-blue-800 font-serif text-sm">
                  {certificate.mentorName}
                </div>
                <div className="border-t border-slate-400 pt-1">
                  <p className="text-xs font-bold text-slate-900">{certificate.mentorName}</p>
                  <p className="text-[10px] text-slate-500">{certificate.mentorTitle}</p>
                </div>
              </div>

              {/* QR Verification Seal */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-14 h-14 p-1 rounded-lg border border-slate-300 bg-white flex items-center justify-center shadow-inner">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded flex items-center justify-center text-[10px] font-mono font-bold text-center leading-tight">
                    QR
                    <br />
                    VALID
                  </div>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">
                  {certificate.verificationCode}
                </span>
                <span className="text-[9px] font-bold text-emerald-700 flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified Online</span>
                </span>
              </div>

              {/* HR Director Signature */}
              <div className="text-center space-y-1">
                <div className="h-12 flex items-center justify-center italic text-blue-800 font-serif text-sm">
                  {certificate.hrDirectorName}
                </div>
                <div className="border-t border-slate-400 pt-1">
                  <p className="text-xs font-bold text-slate-900">{certificate.hrDirectorName}</p>
                  <p className="text-[10px] text-slate-500">Direktur Human Capital</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
