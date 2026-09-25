import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  FolderGit2,
  FileText,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Upload,
  ExternalLink,
  Sparkles,
  Save,
  Check
} from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentProfileProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onOpenCVChecker: () => void;
}

export const StudentProfileView: React.FC<StudentProfileProps> = ({
  profile,
  onUpdateProfile,
  onOpenCVChecker
}) => {
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [newSkill, setNewSkill] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Modals for adding items
  const [showCertModal, setShowCertModal] = useState(false);
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certYear, setCertYear] = useState('2026');

  const [showExpModal, setShowExpModal] = useState(false);
  const [expRole, setExpRole] = useState('');
  const [expOrg, setExpOrg] = useState('');
  const [expPeriod, setExpPeriod] = useState('2025 - 2026');
  const [expDesc, setExpDesc] = useState('');

  const [showProjModal, setShowProjModal] = useState(false);
  const [projTitle, setProjTitle] = useState('');
  const [projRole, setProjRole] = useState('Developer');
  const [projLink, setProjLink] = useState('');
  const [projDesc, setProjDesc] = useState('');

  // Calculate completeness
  let completeness = 50;
  if (formData.skills.length >= 4) completeness += 15;
  if (formData.cvName) completeness += 15;
  if (formData.portfolioUrl) completeness += 10;
  if (formData.experiences.length > 0) completeness += 5;
  if (formData.certificates.length > 0) completeness += 5;
  completeness = Math.min(completeness, 100);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      const updated = { ...formData, skills: [...formData.skills, newSkill.trim()] };
      setFormData(updated);
      onUpdateProfile(updated);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = {
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove)
    };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle || !certIssuer) return;
    const newCert = {
      id: `cert-${Date.now()}`,
      title: certTitle,
      issuer: certIssuer,
      year: certYear,
      link: '#'
    };
    const updated = { ...formData, certificates: [...formData.certificates, newCert] };
    setFormData(updated);
    onUpdateProfile(updated);
    setShowCertModal(false);
    setCertTitle('');
    setCertIssuer('');
  };

  const handleRemoveCertificate = (id: string) => {
    const updated = {
      ...formData,
      certificates: formData.certificates.filter((c) => c.id !== id)
    };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole || !expOrg) return;
    const newExp = {
      id: `exp-${Date.now()}`,
      role: expRole,
      organization: expOrg,
      period: expPeriod,
      description: expDesc
    };
    const updated = { ...formData, experiences: [...formData.experiences, newExp] };
    setFormData(updated);
    onUpdateProfile(updated);
    setShowExpModal(false);
    setExpRole('');
    setExpOrg('');
    setExpDesc('');
  };

  const handleRemoveExperience = (id: string) => {
    const updated = {
      ...formData,
      experiences: formData.experiences.filter((e) => e.id !== id)
    };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle) return;
    const newProj = {
      id: `proj-${Date.now()}`,
      title: projTitle,
      role: projRole,
      link: projLink,
      description: projDesc
    };
    const updated = { ...formData, projects: [...formData.projects, newProj] };
    setFormData(updated);
    onUpdateProfile(updated);
    setShowProjModal(false);
    setProjTitle('');
    setProjDesc('');
    setProjLink('');
  };

  const handleRemoveProject = (id: string) => {
    const updated = {
      ...formData,
      projects: formData.projects.filter((p) => p.id !== id)
    };
    setFormData(updated);
    onUpdateProfile(updated);
  };

  const handleSimulateCVUpload = () => {
    const newCvName = `CV_${formData.name.replace(/\s+/g, '_')}_Updated_2026.pdf`;
    const updated = { ...formData, cvName: newCvName };
    setFormData(updated);
    onUpdateProfile(updated);
    alert(`File CV berhasil diunggah: ${newCvName}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* HEADER & PROFILE STATUS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-md"
              />
              <button
                onClick={() => {
                  const url = prompt(
                    'Masukkan URL foto profil baru:',
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
                  );
                  if (url) {
                    const updated = { ...formData, avatar: url };
                    setFormData(updated);
                    onUpdateProfile(updated);
                  }
                }}
                className="absolute -bottom-2 -right-2 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
                title="Ganti Foto Profil"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{formData.educationLevel}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{formData.name}</h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {formData.school} • Jurusan {formData.major}
              </p>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{formData.location}</span>
              </p>
            </div>
          </div>

          {/* Completeness Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full md:w-72 shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-700">Status Kelengkapan</span>
              <span className="text-sm font-extrabold text-blue-600">
                Profilmu {completeness}% lengkap
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
            <button
              onClick={onOpenCVChecker}
              className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analisis CV dengan AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* FORM BIODATA UTAMA */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            <span>Informasi Pribadi & Kontak</span>
          </h2>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center space-x-1.5 cursor-pointer"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nomor WhatsApp / HP
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Lokasi Domisili
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Sekolah / Universitas
            </label>
            <input
              type="text"
              required
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Jurusan
            </label>
            <input
              type="text"
              required
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tahun / Kelas / Semester
            </label>
            <input
              type="text"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Tingkat Pendidikan
            </label>
            <select
              value={formData.educationLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  educationLevel: e.target.value as any
                })
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            >
              <option value="SMA/SMK">SMA/SMK (Vokasi)</option>
              <option value="Mahasiswa (D3/D4/S1)">Mahasiswa (D3/D4/S1)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Tentang Saya / Bio Singkat
          </label>
          <textarea
            rows={3}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            placeholder="Tuliskan motivasi, ketertarikan karir, dan kelebihan Anda..."
          />
        </div>
      </form>

      {/* SKILLS SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Keahlian & Skill ({formData.skills.length})</span>
          </div>
        </h2>
        <p className="text-xs text-slate-500">
          Tambahkan keahlian teknis (programming, design, office) dan soft-skill (leadership, komunikasi).
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-red-500 cursor-pointer"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Add skill input */}
        <div className="flex items-center space-x-2 pt-2 max-w-md">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill(e))}
            placeholder="Ketik skill (cth: Microsoft Excel, Figma...)"
            className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            + Tambah
          </button>
        </div>
      </div>

      {/* CV & PORTOFOLIO SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span>Curriculum Vitae (CV) & Tautan Portofolio</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CV File Box */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              File CV Terunggah
            </span>
            <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                PDF
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {formData.cvName || 'Belum mengunggah CV'}
                </p>
                <p className="text-[11px] text-slate-400">PDF • Siap dikirim ke perusahaan</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleSimulateCVUpload}
                className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Ganti File CV</span>
              </button>
              <button
                type="button"
                onClick={onOpenCVChecker}
                className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cek Skor CV</span>
              </button>
            </div>
          </div>

          {/* Portfolio & Social Link */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Tautan Portofolio / GitHub / Behance
            </span>
            <input
              type="url"
              value={formData.portfolioUrl || ''}
              onChange={(e) => {
                const updated = { ...formData, portfolioUrl: e.target.value };
                setFormData(updated);
                onUpdateProfile(updated);
              }}
              placeholder="https://github.com/username atau https://behance.net/..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {formData.portfolioUrl && (
              <a
                href={formData.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:underline"
              >
                <span>Buka Portofolio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* SERTIFIKAT */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Sertifikasi & Pelatihan ({formData.certificates.length})</span>
          </h2>
          <button
            type="button"
            onClick={() => setShowCertModal(true)}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Sertifikat</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900">{cert.title}</h4>
                <p className="text-xs text-slate-500">
                  {cert.issuer} • Diterbitkan {cert.year}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCertificate(cert.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PENGALAMAN ORGANISASI */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <span>Pengalaman Organisasi & Kepanitiaan ({formData.experiences.length})</span>
          </h2>
          <button
            type="button"
            onClick={() => setShowExpModal(true)}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Pengalaman</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-slate-200 flex items-start justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">{exp.role}</h4>
                <p className="text-xs font-semibold text-blue-700">
                  {exp.organization} • ({exp.period})
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">{exp.description}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveExperience(exp.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PENGALAMAN PROYEK */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-purple-600" />
            <span>Portofolio Proyek ({formData.projects.length})</span>
          </h2>
          <button
            type="button"
            onClick={() => setShowProjModal(true)}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Proyek</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-slate-200 flex items-start justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-sm text-slate-900">{proj.title}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700">
                    {proj.role}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    <span>Tautan Proyek</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveProject(proj.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL TAMBAH SERTIFIKAT */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">Tambah Sertifikasi Baru</h3>
            <form onSubmit={handleAddCertificate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Sertifikat / Pelatihan
                </label>
                <input
                  type="text"
                  required
                  value={certTitle}
                  onChange={(e) => setCertTitle(e.target.value)}
                  placeholder="Contoh: Sertifikasi BNSP Junior Web Developer"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Penyelenggara / Lembaga
                </label>
                <input
                  type="text"
                  required
                  value={certIssuer}
                  onChange={(e) => setCertIssuer(e.target.value)}
                  placeholder="Contoh: BNSP / Dicoding / Kemendikbud"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Perolehan</label>
                <input
                  type="text"
                  required
                  value={certYear}
                  onChange={(e) => setCertYear(e.target.value)}
                  placeholder="2025 / 2026"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCertModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Simpan Sertifikat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH PENGALAMAN */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">Tambah Pengalaman Organisasi</h3>
            <form onSubmit={handleAddExperience} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jabatan / Posisi
                </label>
                <input
                  type="text"
                  required
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  placeholder="Contoh: Ketua Divisi IT / Bendahara"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Organisasi / Event
                </label>
                <input
                  type="text"
                  required
                  value={expOrg}
                  onChange={(e) => setExpOrg(e.target.value)}
                  placeholder="Contoh: OSIS SMKN 1 Jakarta / BEM"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Periode</label>
                <input
                  type="text"
                  required
                  value={expPeriod}
                  onChange={(e) => setExpPeriod(e.target.value)}
                  placeholder="2024 - 2025"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Tugas</label>
                <textarea
                  rows={2}
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  placeholder="Ceritakan kontribusi Anda..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH PROYEK */}
      {showProjModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">Tambah Portofolio Proyek</h3>
            <form onSubmit={handleAddProject} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Proyek / Aplikasi
                </label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="Contoh: Aplikasi Absensi QR Code Sekolah"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Peran Anda</label>
                <input
                  type="text"
                  required
                  value={projRole}
                  onChange={(e) => setProjRole(e.target.value)}
                  placeholder="Frontend Developer / Desainer UI"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tautan Proyek (Opsional)</label>
                <input
                  type="url"
                  value={projLink}
                  onChange={(e) => setProjLink(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="Dibuat menggunakan teknologi apa dan apa fungsinya..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProjModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
