import React, { useState } from 'react';
import {
  X,
  Sparkles,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
  Upload,
  ArrowRight
} from 'lucide-react';
import { StudentProfile } from '../types';
import { analyzeCV, CVAnalysisResult } from '../utils/aiService';

interface AICVCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
}

export const AICVCheckerModal: React.FC<AICVCheckerModalProps> = ({
  isOpen,
  onClose,
  profile
}) => {
  const [cvText, setCvText] = useState(
    `Saya adalah siswa ${profile.school} jurusan ${profile.major}. Memiliki keahlian dalam ${profile.skills.join(', ')}. Berpengalaman membuat proyek web dan aktif di organisasi sekolah.`
  );
  const [targetRole, setTargetRole] = useState('Frontend Web Developer Intern');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CVAnalysisResult | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await analyzeCV(profile, cvText, targetRole);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Career & ATS Scanner</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Pengecekan CV & ATS Otomatis
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Uji kelengkapan, keterbacaan ATS, struktur, dan kesesuaian kata kunci CV Anda sebelum melamar ke perusahaan impian.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {!result ? (
            <form onSubmit={handleAnalyze} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Posisi Magang
                </label>
                <input
                  type="text"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Contoh: Frontend Developer / Desain Grafis / Akuntansi"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ringkasan / Teks CV yang Ingin Diuji
                </label>
                <textarea
                  rows={5}
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed"
                  placeholder="Tempelkan ringkasan profil, pengalaman, atau deskripsi proyek CV Anda di sini..."
                />
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
                <span className="font-bold text-emerald-900 block">Profil Terhubung:</span>
                <p className="text-slate-600 text-xs">
                  {profile.name} • {profile.school} ({profile.major}) • {profile.skills.length} Skill Terdaftar • {profile.projects.length} Portofolio
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menganalisis CV dengan AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Mulai Analisis Sekarang</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Score Highlight Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Hasil Penilaian CV
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl sm:text-5xl font-black text-emerald-600">
                      {result.score}
                    </span>
                    <span className="text-sm font-bold text-slate-400">/ 100</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 ml-2">
                      {result.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed max-w-md">
                    {result.summary}
                  </p>
                </div>

                {/* Sub Scores */}
                <div className="grid grid-cols-2 gap-3 w-full sm:w-auto shrink-0 text-center text-xs">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Keterbacaan ATS
                    </span>
                    <span className="text-lg font-black text-slate-800">
                      {result.atsFriendliness}%
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Struktur Format
                    </span>
                    <span className="text-lg font-black text-slate-800">
                      {result.structureScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Kekuatan Utama CV Anda</span>
                </h4>
                <div className="space-y-1.5">
                  {result.strengths.map((str, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950 font-medium"
                    >
                      ✓ {str}
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Saran Perbaikan Rekruter</span>
                </h4>
                <div className="space-y-1.5">
                  {result.improvements.map((imp, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 font-medium"
                    >
                      • {imp}
                    </div>
                  ))}
                </div>
              </div>

              {/* Keyword Matches */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  Kecocokan Kata Kunci (Keywords ATS):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.keywordMatches.map((kw, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                        kw.found
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-400 line-through'
                      }`}
                    >
                      {kw.found ? '✓' : '✕'} {kw.keyword}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setResult(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Uji Kembali dengan Perubahan Lain
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
