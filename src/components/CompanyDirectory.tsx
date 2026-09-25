import React from 'react';
import { Building2, ShieldCheck, MapPin, Users, ExternalLink, Briefcase } from 'lucide-react';
import { Company, Internship } from '../types';

interface CompanyDirectoryProps {
  companies: Company[];
  internships: Internship[];
  onSelectCompany: (company: Company) => void;
  onFilterByCompany: (companyName: string) => void;
}

export const CompanyDirectory: React.FC<CompanyDirectoryProps> = ({
  companies,
  internships,
  onSelectCompany,
  onFilterByCompany
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>Ekosistem Industri Mitra</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Perusahaan & Instansi Terpercaya
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Mitra BUMN, multinasional, tech unicorn, dan studio kreatif yang telah terverifikasi resmi untuk program PKL SMK dan magang kampus.
          </p>
        </div>
      </div>

      {/* GRID OF COMPANIES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((comp) => {
          const vacanciesCount = internships.filter((i) => i.companyId === comp.id).length;

          return (
            <div
              key={comp.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
                  />
                  {comp.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Terverifikasi</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                    {comp.name}
                  </h3>
                  <span className="text-xs text-blue-600 font-semibold">{comp.industry}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {comp.about}
                </p>

                <div className="pt-2 text-xs text-slate-500 space-y-1.5 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{comp.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{comp.employeeCount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {vacanciesCount} Lowongan Tersedia
                </span>
                <button
                  onClick={() => onFilterByCompany(comp.name)}
                  className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <span>Lihat Lowongan</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
