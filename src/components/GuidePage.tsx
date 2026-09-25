import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  FileText,
  Clock,
  Award,
  Video,
  ChevronDown,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface GuidePageProps {
  onNavigateToCatalog: () => void;
  onOpenCVChecker: () => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({
  onNavigateToCatalog,
  onOpenCVChecker
}) => {
  const [activeSegment, setActiveSegment] = useState<'smk' | 'mahasiswa'>('smk');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pusat Edukasi & Karir</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Panduan Lengkap Sukses Magang & PKL
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Kumpulan panduan terstruktur mulai dari persiapan berkas, etika wawancara, penulisan logbook, hingga sertifikasi kompetensi.
          </p>
        </div>

        {/* Segment Switcher */}
        <div className="mt-6 flex space-x-2">
          <button
            onClick={() => setActiveSegment('smk')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'smk'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            🎓 Khusus Siswa SMK (Praktik Kerja Lapangan / PKL)
          </button>
          <button
            onClick={() => setActiveSegment('mahasiswa')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSegment === 'mahasiswa'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/10 text-slate-300 hover:text-white'
            }`}
          >
            🎓 Mahasiswa (Kampus Merdeka / Magang Industri)
          </button>
        </div>
      </div>

      {/* CONTENT BASED ON SEGMENT */}
      {activeSegment === 'smk' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-blue-700 font-bold text-base">
              <Award className="w-6 h-6 text-blue-600" />
              <span>Standar Kurikulum Merdeka & Vokasi untuk Siswa SMK</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Praktik Kerja Lapangan (PKL) adalah pembelajaran nyata di Dunia Usaha dan Dunia Industri (DUDI).
              Berikut adalah tahapan kunci yang perlu kamu persiapkan:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-xs text-blue-700 block">1. Surat Pengantar BKK</span>
                <p className="text-xs text-slate-600">
                  Minta surat izin dan pengantar resmi dari Bursa Kerja Khusus (BKK) atau Kepala Program Keahlian sekolahmu.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-xs text-blue-700 block">2. Portofolio Proyek Sekolah</span>
                <p className="text-xs text-slate-600">
                  Kumpulkan tugas produktif (website, desain, wiring listrik, atau pembukuan Excel) ke dalam format PDF/link Drive.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-xs text-blue-700 block">3. Pengisian Logbook Harian</span>
                <p className="text-xs text-slate-600">
                  Gunakan fitur Jurnal Magang di MAGANGKU agar catatan harianmu langsung diverifikasi mentor tanpa perlu buku manual.
                </p>
              </div>
            </div>
          </div>

          {/* Tips Wawancara untuk Siswa SMK */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-black text-slate-900 text-base">
              Tips Wawancara & Etika Kerja Industri untuk Pelajar
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Hadir Tepat Waktu:</strong> Masuk link Google Meet / ruang kantor 10 menit sebelum waktu wawancara dimulai.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Kenakan Seragam Rapi:</strong> Gunakan seragam kejuruan sekolah atau kemeja berkerah rapi dan sopan.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Jelaskan Tugas Sekolah:</strong> Ceritakan peran Anda saat mengerjakan tugas kelompok atau praktikum lab.
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Tunjukkan Antusiasme Belajar:</strong> Perusahaan sangat menyukai siswa yang jujur, santun, dan mau dibimbing.
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-indigo-700 font-bold text-base">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
              <span>Panduan Magang Mandiri & Kampus Merdeka (20 SKS)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Program magang bersertifikat memberikan konversi SKS dan membuka jalur fast-track rekrutmen pasca sarjana:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-xs text-indigo-700 block">1. CV Berstandar ATS</span>
                <p className="text-xs text-slate-600">
                  Pastikan format CV mudah dibaca mesin scanner perusahaan multinasional dengan kata kunci industri relevan.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-xs text-indigo-700 block">2. Case Study & Metrik</span>
                <p className="text-xs text-slate-600">
                  Uraikan dampak nyata dari proyek kuliah atau kepanitiaan Anda dengan metrik persentase terukur.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="font-bold text-xs text-indigo-700 block">3. Konversi SKS Akademik</span>
                <p className="text-xs text-slate-600">
                  Download laporan akhir dan sertifikat kelulusan industri dari MAGANGKU untuk diserahkan ke Dosen Pembimbing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-base text-white">Ingin Menguji Kualitas CV Anda?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Dapatkan skor kelengkapan dan saran perbaikan rekruter dalam hitungan detik.
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={onOpenCVChecker}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Cek CV dengan AI
          </button>
          <button
            onClick={onNavigateToCatalog}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Cari Lowongan
          </button>
        </div>
      </div>
    </div>
  );
};
