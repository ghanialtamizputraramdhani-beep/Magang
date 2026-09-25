import React from 'react';
import { Bookmark, MapPin, Clock, DollarSign, ChevronRight, Briefcase } from 'lucide-react';
import { Internship } from '../types';

interface BookmarkPageProps {
  internships: Internship[];
  bookmarkedIds: string[];
  onSelectInternship: (internship: Internship) => void;
  onToggleBookmark: (id: string) => void;
  onNavigateToCatalog: () => void;
}

export const BookmarkPage: React.FC<BookmarkPageProps> = ({
  internships,
  bookmarkedIds,
  onSelectInternship,
  onToggleBookmark,
  onNavigateToCatalog
}) => {
  const savedJobs = internships.filter((job) => bookmarkedIds.includes(job.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>Lowongan Tersimpan ({savedJobs.length})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Lowongan Favorit Saya</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simpan lowongan menarik untuk ditinjau kembali atau dilamar sebelum batas waktu deadline.
          </p>
        </div>

        <button
          onClick={onNavigateToCatalog}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Cari Lowongan Lain
        </button>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-700 text-base">Belum ada lowongan yang disimpan</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Klik ikon bookmark pada kartu lowongan magang untuk menyimpannya di sini.
          </p>
          <button
            onClick={onNavigateToCatalog}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Buka Katalog Lowongan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <button
                    onClick={() => onToggleBookmark(job.id)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Simpanan"
                  >
                    <Bookmark className="w-5 h-5 fill-current" />
                  </button>
                </div>

                <span className="text-xs text-slate-500 font-semibold">{job.companyName}</span>
                <h3
                  onClick={() => onSelectInternship(job)}
                  className="font-bold text-base text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer mt-0.5"
                >
                  {job.title}
                </h3>

                <div className="flex items-center text-xs text-slate-500 gap-3 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location.split('(')[0]}</span>
                  </span>
                  <span>•</span>
                  <span>{job.duration}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700">
                    {job.workType}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                    {job.compensation === 'Paid' ? 'Paid Magang' : 'Unpaid'}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-rose-600 font-semibold">
                  Deadline: {job.deadline}
                </span>
                <button
                  onClick={() => onSelectInternship(job)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
