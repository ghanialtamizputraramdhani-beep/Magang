import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  X,
  ShieldCheck,
  Bookmark,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Sparkles,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { Internship, InternshipCategory, WorkType, CompensationType, EducationLevel } from '../types';

interface InternshipCatalogProps {
  internships: Internship[];
  onSelectInternship: (internship: Internship) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  initialKeyword?: string;
  initialLocation?: string;
  initialWorkType?: string;
  initialCategory?: InternshipCategory | '';
}

export const InternshipCatalog: React.FC<InternshipCatalogProps> = ({
  internships,
  onSelectInternship,
  bookmarkedIds,
  onToggleBookmark,
  initialKeyword = '',
  initialLocation = '',
  initialWorkType = '',
  initialCategory = ''
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedWorkType, setSelectedWorkType] = useState<string>(initialWorkType);
  const [selectedCompensation, setSelectedCompensation] = useState<string>('');
  const [selectedEducation, setSelectedEducation] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'deadline' | 'applicants'>('newest');

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: InternshipCategory[] = [
    'Teknik',
    'Bisnis & Manajemen',
    'IT & Programming',
    'Desain',
    'Marketing',
    'Pendidikan',
    'Keuangan',
    'Media & Komunikasi'
  ];

  // Filtering Logic
  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      // Keyword filter (title, company, skills, description)
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchCompany = item.companyName.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchSkill = item.requirements.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchCompany && !matchDesc && !matchSkill) return false;
      }

      // Location filter
      if (location.trim()) {
        const loc = location.toLowerCase();
        if (!item.location.toLowerCase().includes(loc)) return false;
      }

      // Category
      if (selectedCategory && item.category !== selectedCategory) return false;

      // WorkType
      if (selectedWorkType && item.workType !== selectedWorkType) return false;

      // Compensation
      if (selectedCompensation && item.compensation !== selectedCompensation) return false;

      // Education
      if (selectedEducation) {
        if (!item.educationLevelRequired.includes(selectedEducation as EducationLevel)) return false;
      }

      // Duration
      if (selectedDuration && !item.duration.includes(selectedDuration)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline') {
        return a.deadline.localeCompare(b.deadline);
      }
      if (sortBy === 'applicants') {
        return b.applicantsCount - a.applicantsCount;
      }
      return 0;
    });
  }, [
    internships,
    keyword,
    location,
    selectedCategory,
    selectedWorkType,
    selectedCompensation,
    selectedEducation,
    selectedDuration,
    sortBy
  ]);

  const handleResetFilters = () => {
    setKeyword('');
    setLocation('');
    setSelectedCategory('');
    setSelectedWorkType('');
    setSelectedCompensation('');
    setSelectedEducation('');
    setSelectedDuration('');
  };

  const activeFiltersCount = [
    keyword,
    location,
    selectedCategory,
    selectedWorkType,
    selectedCompensation,
    selectedEducation,
    selectedDuration
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl text-white p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Pencarian Terpadu Lowongan Magang</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Temukan Lowongan Magang Impianmu
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Jelajahi ratusan program magang dan PKL industri terverifikasi di seluruh Indonesia.
          </p>
        </div>
      </div>

      {/* TOP SEARCH & SORT BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari berdasarkan posisi, keahlian, atau nama perusahaan..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
          />
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-2">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter ({activeFiltersCount})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="newest">Lowongan Terbaru</option>
              <option value="deadline">Deadline Terdekat</option>
              <option value="applicants">Paling Populer</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: SIDEBAR FILTER + JOB CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2 font-black text-slate-900 text-sm">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filter Lowongan</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Lokasi Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Lokasi / Kota
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Jakarta, Bandung, Remote..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Tingkat Pendidikan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Jenjang Pendidikan
            </label>
            <div className="space-y-1.5">
              {[
                { label: 'Semua Jenjang', value: '' },
                { label: 'Siswa SMA/SMK (PKL)', value: 'SMA/SMK' },
                { label: 'Mahasiswa (D3/D4/S1)', value: 'Mahasiswa (D3/D4/S1)' }
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50"
                >
                  <input
                    type="radio"
                    name="education"
                    checked={selectedEducation === item.value}
                    onChange={() => setSelectedEducation(item.value)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className={selectedEducation === item.value ? 'font-bold text-blue-700' : ''}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sistem Kerja */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Sistem Kerja
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['', 'Hybrid', 'WFO', 'WFH'].map((wt) => (
                <button
                  key={wt}
                  onClick={() => setSelectedWorkType(wt)}
                  className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedWorkType === wt
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {wt === '' ? 'Semua' : wt}
                </button>
              ))}
            </div>
          </div>

          {/* Kompensasi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Tipe Kompensasi
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['', 'Paid', 'Unpaid'].map((cp) => (
                <button
                  key={cp}
                  onClick={() => setSelectedCompensation(cp)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedCompensation === cp
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cp === '' ? 'Semua' : cp === 'Paid' ? 'Paid (Uang Saku)' : 'Unpaid'}
                </button>
              ))}
            </div>
          </div>

          {/* Bidang / Kategori */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Bidang Kejuruan
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  selectedCategory === ''
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Semua Bidang
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Durasi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Durasi Magang
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
            >
              <option value="">Semua Durasi</option>
              <option value="3 Bulan">3 Bulan (Standar PKL SMK)</option>
              <option value="4 Bulan">4 Bulan</option>
              <option value="6 Bulan">6 Bulan (Kampus Merdeka)</option>
            </select>
          </div>
        </aside>

        {/* LIST OF JOB CARDS (COL-9) */}
        <main className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Menampilkan <span className="font-bold text-slate-900">{filteredInternships.length}</span> lowongan magang
            </span>
          </div>

          {filteredInternships.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Tidak ada lowongan yang sesuai kriteria
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau bersihkan filter untuk melihat semua lowongan magang yang tersedia.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInternships.map((job) => {
                const isBookmarked = bookmarkedIds.includes(job.id);

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
                  >
                    <div className="flex items-start space-x-4 min-w-0">
                      <img
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-700 truncate">
                            {job.companyName}
                          </span>
                          {job.companyVerified && (
                            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                          <span className="text-[11px] text-slate-400 hidden sm:inline">•</span>
                          <span className="text-[11px] text-slate-500 hidden sm:inline">
                            {job.category}
                          </span>
                        </div>

                        <h3
                          onClick={() => onSelectInternship(job)}
                          className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          {job.title}
                        </h3>

                        {/* Location, Duration, Quota */}
                        <div className="flex flex-wrap items-center text-xs text-slate-500 gap-x-3 gap-y-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{job.location.split('(')[0]}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{job.duration}</span>
                          </span>
                          <span>•</span>
                          <span className="text-slate-500">
                            Kuota: <span className="font-semibold text-slate-800">{job.quota} Posisi</span>
                          </span>
                        </div>

                        {/* Badges: WorkType, Paid, Education, Skills */}
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700">
                            {job.workType}
                          </span>

                          {job.compensation === 'Paid' ? (
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {job.stipendAmount?.split('+')[0] || 'Uang Saku'}
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                              Unpaid
                            </span>
                          )}

                          {job.educationLevelRequired.map((edu) => (
                            <span
                              key={edu}
                              className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                                edu.includes('SMK')
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200/50'
                                  : 'bg-purple-50 text-purple-700'
                              }`}
                            >
                              {edu.includes('SMK') ? '🎓 Siswa SMK' : '🎓 Mahasiswa'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right column: Deadline & Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                      <div className="text-left sm:text-right">
                        <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                          Batas Pendaftaran:
                        </span>
                        <span className="text-xs font-bold text-rose-600">{job.deadline}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onToggleBookmark(job.id)}
                          className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                            isBookmarked
                              ? 'bg-blue-50 text-blue-600 border-blue-200'
                              : 'bg-white text-slate-400 border-slate-200 hover:text-blue-600 hover:bg-slate-50'
                          }`}
                          title={isBookmarked ? 'Hapus Simpanan' : 'Simpan'}
                        >
                          <Bookmark
                            className="w-4 h-4"
                            fill={isBookmarked ? 'currentColor' : 'none'}
                          />
                        </button>

                        <button
                          onClick={() => onSelectInternship(job)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1 cursor-pointer hover:scale-105"
                        >
                          <span>Lihat Detail</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Filter Lowongan</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile filters inside */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lokasi</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Kota / Provinsi..."
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sistem Kerja</label>
              <div className="grid grid-cols-4 gap-1">
                {['', 'Hybrid', 'WFO', 'WFH'].map((wt) => (
                  <button
                    key={wt}
                    onClick={() => setSelectedWorkType(wt)}
                    className={`py-2 rounded-lg text-xs font-bold ${
                      selectedWorkType === wt ? 'bg-blue-600 text-white' : 'bg-slate-100'
                    }`}
                  >
                    {wt === '' ? 'Semua' : wt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Terapkan ({filteredInternships.length} Lowongan)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
