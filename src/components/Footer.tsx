import React from 'react';
import { Briefcase, Mail, Phone, MapPin, Heart, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
                M
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                MAGANG<span className="text-blue-400">KU</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform ekosistem terpadu untuk siswa SMA/SMK dan mahasiswa Indonesia menemukan lowongan magang berkualitas, terverifikasi, dan dibimbing oleh mentor industri profesional.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                Mitra Resmi Industri
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Standar Kurikulum Merdeka & PKL
              </span>
            </div>
          </div>

          {/* Quick Links Siswa / Mahasiswa */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Untuk Peserta
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Cari Lowongan Magang
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Magang Khusus SMK (PKL)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Magang Mahasiswa (Kampus Merdeka)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Pembuat Portofolio & CV
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guide')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Panduan Sukses Wawancara
                </button>
              </li>
            </ul>
          </div>

          {/* Untuk Perusahaan / Sekolah */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Untuk Industri & Sekolah
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('company-dashboard')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Pasang Lowongan Magang
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('companies')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Daftar Perusahaan Mitra
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('company-dashboard')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Sistem Manajemen Seleksi (ATS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guide')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Kerjasama BKK Sekolah & Kampus
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('active-internship')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Sertifikasi Magang Digital
                </button>
              </li>
            </ul>
          </div>

          {/* Kontak & Lokasi */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              Hubungi Kami
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Gedung Inovasi Vokasi Lt. 5, Jl. Gatot Subroto Kav. 52, Jakarta Selatan 12950</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>bantuan@magangku.id</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+62 21 5566-7788 (Hari Kerja 08:00 - 17:00)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MAGANGKU Indonesia. Hak Cipta Dilindungi.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Kebijakan Privasi</span>
            <span className="hover:text-slate-400 cursor-pointer">Syarat & Ketentuan</span>
            <span className="hover:text-slate-400 cursor-pointer">Standar Keselamatan Magang</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
