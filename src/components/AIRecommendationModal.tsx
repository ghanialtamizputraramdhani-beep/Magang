import React from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { StudentProfile, Internship } from '../types';
import { generateSmartRecommendations } from '../utils/aiService';

interface AIRecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  internships: Internship[];
  onSelectInternship: (internship: Internship) => void;
}

export const AIRecommendationModal: React.FC<AIRecommendationModalProps> = ({
  isOpen,
  onClose,
  profile,
  internships,
  onSelectInternship
}) => {
  if (!isOpen) return null;

  const recommendations = generateSmartRecommendations(profile, internships);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-6 sm:p-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Career Matchmaker</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Rekomendasi Magang Berbasis AI
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Sistem kami menganalisis keselarasan jurusan ({profile.major}), {profile.skills.length} keahlian, minat karir, dan preferensi kerja untuk menemukan lowongan yang paling menjamin peluang lolosmu.
          </p>
        </div>

        {/* Body list of matches */}
        <div className="p-6 sm:p-8 space-y-4 max-h-[70vh] overflow-y-auto">
          {recommendations.slice(0, 5).map((rec) => {
            const job = internships.find((i) => i.id === rec.internshipId);
            if (!job) return null;

            return (
              <div
                key={job.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-base text-slate-900">{job.title}</h4>
                      <p className="text-xs text-slate-500">
                        {job.companyName} • {job.category}
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1 self-start sm:self-auto">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{rec.matchScore}% Kecocokan</span>
                  </span>
                </div>

                {/* AI Rationale Box */}
                <div className="p-3 bg-blue-50/80 border border-blue-100 rounded-xl text-xs text-blue-900 space-y-1">
                  <span className="font-bold text-blue-950 block">💡 Analisis AI untuk Profil Anda:</span>
                  <p className="leading-relaxed">
                    Menurut profilmu di <strong className="text-blue-950">{profile.school}</strong>, kamu cocok dengan posisi{' '}
                    <strong className="text-blue-950">{job.title}</strong> karena kamu memiliki keahlian{' '}
                    {rec.keySkillsMatched.length > 0
                      ? rec.keySkillsMatched.join(', ')
                      : profile.skills.slice(0, 3).join(', ')}{' '}
                    serta preferensi kerja {job.workType}.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center text-xs text-slate-500 gap-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location.split('(')[0]}</span>
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">{job.duration}</span>
                    <span>•</span>
                    <span className="font-bold text-emerald-700">
                      {job.compensation === 'Paid' ? 'Paid Magang' : 'Unpaid'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectInternship(job);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer hover:scale-105"
                  >
                    <span>Lihat & Lamar Posisi Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
