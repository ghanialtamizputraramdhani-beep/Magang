import React, { useState } from 'react';
import {
  UserRole,
  StudentProfile,
  Company,
  Internship,
  Application,
  ActiveInternship,
  AppNotification,
  InternshipCategory
} from './types';
import {
  INITIAL_COMPANIES,
  INITIAL_INTERNSHIPS,
  INITIAL_STUDENT_PROFILE,
  INITIAL_COLLEGE_STUDENT_PROFILE,
  INITIAL_APPLICATIONS,
  INITIAL_ACTIVE_INTERNSHIP,
  INITIAL_NOTIFICATIONS
} from './data/mockData';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { StudentDashboard } from './components/StudentDashboard';
import { StudentProfileView } from './components/StudentProfile';
import { InternshipCatalog } from './components/InternshipCatalog';
import { InternshipDetail } from './components/InternshipDetail';
import { ApplicationModal } from './components/ApplicationModal';
import { ApplicationTracking } from './components/ApplicationTracking';
import { CompanyDashboard } from './components/CompanyDashboard';
import { ActiveInternshipView } from './components/ActiveInternshipView';
import { CertificateModal } from './components/CertificateModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AICVCheckerModal } from './components/AICVCheckerModal';
import { AIRecommendationModal } from './components/AIRecommendationModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { BookmarkPage } from './components/BookmarkPage';
import { CompanyDirectory } from './components/CompanyDirectory';
import { GuidePage } from './components/GuidePage';

export default function App() {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [userRole, setUserRole] = useState<UserRole>('student');

  // Master Data State
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [internships, setInternships] = useState<Internship[]>(INITIAL_INTERNSHIPS);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [activeInternship, setActiveInternship] = useState<ActiveInternship | null>(INITIAL_ACTIVE_INTERNSHIP);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['intern-1', 'intern-2']);

  // Selected Detail State
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [applyingInternship, setApplyingInternship] = useState<Internship | null>(null);
  const [candidateDetailApp, setCandidateDetailApp] = useState<Application | null>(null);

  // Search Param Handlers
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: '',
    workType: '',
    category: '' as InternshipCategory | ''
  });

  // Modals Open State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [cvCheckerOpen, setCvCheckerOpen] = useState(false);
  const [aiRecOpen, setAiRecOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);

  // Handler: Role Switcher
  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'student') {
      setCurrentTab('dashboard');
    } else if (newRole === 'company') {
      setCurrentTab('company-dashboard');
    } else if (newRole === 'admin') {
      setCurrentTab('admin-dashboard');
    }
  };

  // Handler: Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handler: Hero Search Trigger
  const handleHeroSearch = (params: { keyword: string; location: string; workType: string }) => {
    setSearchParams({
      keyword: params.keyword,
      location: params.location,
      workType: params.workType,
      category: ''
    });
    setCurrentTab('catalog');
  };

  // Handler: Category Click Trigger
  const handleCategorySelect = (category: InternshipCategory) => {
    setSearchParams({
      keyword: '',
      location: '',
      workType: '',
      category
    });
    setCurrentTab('catalog');
  };

  // Handler: Open Lowongan Detail
  const handleSelectInternship = (internship: Internship) => {
    setSelectedInternship(internship);
    setCurrentTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Open Apply Modal
  const handleOpenApply = (internship: Internship) => {
    setApplyingInternship(internship);
  };

  // Handler: Submit New Application
  const handleSubmitApplication = (appData: Partial<Application>) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      studentEmail: studentProfile.email,
      studentPhone: studentProfile.phone,
      studentSchool: studentProfile.school,
      studentMajor: studentProfile.major,
      studentEducationLevel: studentProfile.educationLevel,
      studentAvatar: studentProfile.avatar,
      studentSkills: studentProfile.skills,
      internshipId: appData.internshipId || '',
      internshipTitle: appData.internshipTitle || '',
      companyId: appData.companyId || '',
      companyName: appData.companyName || '',
      companyLogo: appData.companyLogo || '',
      status: 'submitted',
      appliedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      cvName: appData.cvName || 'CV_Lengkap.pdf',
      portfolioUrl: appData.portfolioUrl || '',
      motivation: appData.motivation || '',
      reason: appData.reason || '',
      relevantExperience: appData.relevantExperience || '',
      notesFromCompany: 'Lamaran Anda sedang dalam antrean seleksi berkas tim Human Capital.'
    };

    setApplications((prev) => [newApp, ...prev]);

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: studentProfile.id,
      title: 'Lamaran Berhasil Dikirim',
      message: `Lamaran untuk posisi ${newApp.internshipTitle} di ${newApp.companyName} telah terkirim.`,
      time: 'Baru saja',
      read: false,
      type: 'info',
      actionTab: 'tracking'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Handler: Update Application Status from Company Dashboard
  const handleUpdateApplicationStatus = (
    applicationId: string,
    status: any,
    interviewSchedule?: any,
    notes?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === applicationId) {
          const updated = {
            ...app,
            status,
            ...(interviewSchedule ? { interviewSchedule } : {}),
            notesFromCompany: notes || app.notesFromCompany
          };

          // If accepted, instantiate active internship if none exists
          if (status === 'accepted') {
            const newActive: ActiveInternship = {
              id: `active-${Date.now()}`,
              applicationId: app.id,
              studentId: app.studentId,
              internshipId: app.internshipId,
              companyName: app.companyName,
              companyLogo: app.companyLogo,
              position: app.internshipTitle,
              mentorName: 'Bambang Sudarmono, S.Psi',
              mentorRole: 'Mentor Pembimbing Industri',
              mentorEmail: 'mentor@mitra.co.id',
              startDate: '01 Oktober 2026',
              endDate: '31 Desember 2026',
              currentWeek: 1,
              totalWeeks: 12,
              status: 'ongoing',
              tasks: [
                {
                  id: 'task-new-1',
                  title: 'Orientasi Budaya Perusahaan & Penyiapan Tools Kerja',
                  deadline: '05 Okt 2026',
                  completed: false,
                  week: 1,
                  assignedBy: 'Bambang Sudarmono'
                },
                {
                  id: 'task-new-2',
                  title: 'Membaca Dokumentasi Panduan Project',
                  deadline: '08 Okt 2026',
                  completed: false,
                  week: 1,
                  assignedBy: 'Bambang Sudarmono'
                }
              ],
              attendances: [
                {
                  id: `att-init-${Date.now()}`,
                  date: new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }),
                  type: 'WFO',
                  status: 'Hadir',
                  checkInTime: '08:30 WIB',
                  notes: 'Hari pertama onboarding magang'
                }
              ],
              journals: [],
              certificate: INITIAL_ACTIVE_INTERNSHIP.certificate
            };
            setActiveInternship(newActive);
          }

          return updated;
        }
        return app;
      })
    );

    // Create system notification for student
    const targetApp = applications.find((a) => a.id === applicationId);
    if (targetApp) {
      const notifTitle =
        status === 'interview'
          ? `Jadwal Interview di ${targetApp.companyName}`
          : status === 'accepted'
          ? `Selamat! Lamaran Diterima 🎉`
          : `Pembaruan Status Lamaran`;

      const notifMsg =
        status === 'interview'
          ? `Kamu diundang untuk sesi interview pada posisi ${targetApp.internshipTitle}.`
          : status === 'accepted'
          ? `Selamat! Kamu telah diterima di ${targetApp.companyName}. Silakan buka menu Magang Berjalan.`
          : `Status lamaranmu telah diperbarui.`;

      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          userId: targetApp.studentId,
          title: notifTitle,
          message: notifMsg,
          time: 'Baru saja',
          read: false,
          type: status === 'interview' ? 'interview' : status === 'accepted' ? 'accepted' : 'info',
          actionTab: status === 'accepted' ? 'active-internship' : 'tracking'
        },
        ...prev
      ]);
    }
  };

  // Handler: Notification Read
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Current company profile for company mode
  const currentCompany = companies[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* GLOBAL NAVBAR */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={handleRoleChange}
        studentProfile={studentProfile}
        companyProfile={currentCompany}
        notifications={notifications}
        bookmarkedIds={bookmarkedIds}
        onOpenAuth={(mode) => {
          setAuthInitialMode(mode);
          setAuthModalOpen(true);
        }}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenCVChecker={() => setCvCheckerOpen(true)}
        onOpenAIRecommendation={() => setAiRecOpen(true)}
      />

      {/* MAIN VIEW CONTENT ROUTING */}
      <main className="flex-1">
        {/* 1. LANDING PAGE */}
        {currentTab === 'landing' && (
          <LandingPage
            internships={internships}
            onSelectInternship={handleSelectInternship}
            onSearch={handleHeroSearch}
            onSelectCategory={handleCategorySelect}
            onNavigate={setCurrentTab}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onOpenAuth={(mode) => {
              setAuthInitialMode(mode);
              setAuthModalOpen(true);
            }}
          />
        )}

        {/* 2. PENCARIAN MAGANG (CATALOG BOARD) */}
        {currentTab === 'catalog' && (
          <InternshipCatalog
            internships={internships}
            onSelectInternship={handleSelectInternship}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            initialKeyword={searchParams.keyword}
            initialLocation={searchParams.location}
            initialWorkType={searchParams.workType}
            initialCategory={searchParams.category}
          />
        )}

        {/* 3. DETAIL LOWONGAN */}
        {currentTab === 'detail' && selectedInternship && (
          <InternshipDetail
            internship={selectedInternship}
            onBack={() => setCurrentTab('catalog')}
            onApply={handleOpenApply}
            isBookmarked={bookmarkedIds.includes(selectedInternship.id)}
            onToggleBookmark={handleToggleBookmark}
            alreadyApplied={applications.some(
              (a) => a.internshipId === selectedInternship.id
            )}
          />
        )}

        {/* 4. DASHBOARD PESERTA */}
        {currentTab === 'dashboard' && (
          <StudentDashboard
            profile={studentProfile}
            applications={applications}
            activeInternship={activeInternship}
            internships={internships}
            bookmarkedIds={bookmarkedIds}
            onSelectInternship={handleSelectInternship}
            onNavigate={setCurrentTab}
            onOpenCVChecker={() => setCvCheckerOpen(true)}
            onOpenAIRecommendation={() => setAiRecOpen(true)}
          />
        )}

        {/* 5. PROFIL PESERTA */}
        {currentTab === 'profile' && (
          <StudentProfileView
            profile={studentProfile}
            onUpdateProfile={(updated) => setStudentProfile(updated)}
            onOpenCVChecker={() => setCvCheckerOpen(true)}
          />
        )}

        {/* 6. TRACKING LAMARAN SAYA */}
        {currentTab === 'tracking' && (
          <ApplicationTracking
            applications={applications}
            onNavigateToActiveInternship={() => setCurrentTab('active-internship')}
            onNavigateToCatalog={() => setCurrentTab('catalog')}
          />
        )}

        {/* 7. MAGANG BERJALAN & JURNAL */}
        {currentTab === 'active-internship' && (
          activeInternship ? (
            <ActiveInternshipView
              internship={activeInternship}
              onUpdateInternship={(updated) => setActiveInternship(updated)}
              onOpenCertificate={() => setCertificateOpen(true)}
            />
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
              <h2 className="text-xl font-bold text-slate-800">
                Belum ada program magang yang sedang berjalan
              </h2>
              <p className="text-xs text-slate-500">
                Jika lamaran Anda telah dinyatakan diterima oleh perusahaan, menu ini akan aktif secara otomatis.
              </p>
              <button
                onClick={() => setCurrentTab('tracking')}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Lihat Status Lamaran Saya
              </button>
            </div>
          )
        )}

        {/* 8. DASHBOARD PERUSAHAAN */}
        {currentTab === 'company-dashboard' && (
          <CompanyDashboard
            company={currentCompany}
            internships={internships.filter((i) => i.companyId === currentCompany.id)}
            applications={applications}
            onAddInternship={(newJob) => setInternships((prev) => [newJob, ...prev])}
            onUpdateInternshipStatus={(id, status) =>
              setInternships((prev) =>
                prev.map((i) => (i.id === id ? { ...i, status } : i))
              )
            }
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            onUpdateCompany={(updated) =>
              setCompanies((prev) =>
                prev.map((c) => (c.id === updated.id ? updated : c))
              )
            }
            onViewCandidate={(app) => {
              setCandidateDetailApp(app);
            }}
          />
        )}

        {/* 9. ADMIN DASHBOARD */}
        {currentTab === 'admin-dashboard' && (
          <AdminDashboard
            companies={companies}
            internships={internships}
            onToggleCompanyVerification={(companyId) => {
              setCompanies((prev) =>
                prev.map((c) =>
                  c.id === companyId ? { ...c, verified: !c.verified } : c
                )
              );
            }}
            onDeleteInternship={(jobId) => {
              setInternships((prev) => prev.filter((i) => i.id !== jobId));
            }}
          />
        )}

        {/* 10. BOOKMARKED INTERNSHIPS */}
        {currentTab === 'bookmarks' && (
          <BookmarkPage
            internships={internships}
            bookmarkedIds={bookmarkedIds}
            onSelectInternship={handleSelectInternship}
            onToggleBookmark={handleToggleBookmark}
            onNavigateToCatalog={() => setCurrentTab('catalog')}
          />
        )}

        {/* 11. COMPANY DIRECTORY */}
        {currentTab === 'companies' && (
          <CompanyDirectory
            companies={companies}
            internships={internships}
            onSelectCompany={(comp) => {
              setSearchParams({ keyword: comp.name, location: '', workType: '', category: '' });
              setCurrentTab('catalog');
            }}
            onFilterByCompany={(companyName) => {
              setSearchParams({ keyword: companyName, location: '', workType: '', category: '' });
              setCurrentTab('catalog');
            }}
          />
        )}

        {/* 12. PANDUAN PKL & MAGANG */}
        {currentTab === 'guide' && (
          <GuidePage
            onNavigateToCatalog={() => setCurrentTab('catalog')}
            onOpenCVChecker={() => setCvCheckerOpen(true)}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={setCurrentTab} />

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
        onLoginSuccess={(role) => {
          handleRoleChange(role);
        }}
        onRegisterSuccess={(role, data) => {
          handleRoleChange(role);
          if (role === 'student' && data.name) {
            setStudentProfile((prev) => ({
              ...prev,
              name: data.name,
              email: data.email,
              school: data.school,
              major: data.major,
              educationLevel: data.educationLevel,
              year: data.year
            }));
          }
          alert(`Pendaftaran berhasil! Selamat datang di MAGANGKU, ${data.name}.`);
        }}
      />

      {/* APPLY MODAL */}
      {applyingInternship && (
        <ApplicationModal
          isOpen={Boolean(applyingInternship)}
          onClose={() => setApplyingInternship(null)}
          internship={applyingInternship}
          profile={studentProfile}
          onSubmitApplication={handleSubmitApplication}
          onViewTracking={() => {
            setApplyingInternship(null);
            setCurrentTab('tracking');
          }}
        />
      )}

      {/* AI CV CHECKER MODAL */}
      <AICVCheckerModal
        isOpen={cvCheckerOpen}
        onClose={() => setCvCheckerOpen(false)}
        profile={studentProfile}
      />

      {/* AI RECOMMENDATION MODAL */}
      <AIRecommendationModal
        isOpen={aiRecOpen}
        onClose={() => setAiRecOpen(false)}
        profile={studentProfile}
        internships={internships}
        onSelectInternship={handleSelectInternship}
      />

      {/* NOTIFICATIONS FLYOUT DRAWER */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onNavigateToTab={(tab) => {
          setCurrentTab(tab);
          setNotificationsOpen(false);
        }}
      />

      {/* OFFICIAL DIGITAL CERTIFICATE MODAL */}
      {certificateOpen && activeInternship?.certificate && (
        <CertificateModal
          isOpen={certificateOpen}
          onClose={() => setCertificateOpen(false)}
          certificate={activeInternship.certificate}
        />
      )}

      {/* CANDIDATE DETAIL INSPECT MODAL (FOR HR) */}
      {candidateDetailApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg border border-slate-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">{candidateDetailApp.studentName}</h3>
                <p className="text-xs text-slate-500">
                  {candidateDetailApp.studentSchool} • {candidateDetailApp.studentMajor}
                </p>
              </div>
              <button
                onClick={() => setCandidateDetailApp(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px]">Email & Kontak:</span>
                <p className="text-slate-800 font-semibold">{candidateDetailApp.studentEmail} • {candidateDetailApp.studentPhone}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px]">Dokumen CV:</span>
                <p className="font-semibold text-blue-600">{candidateDetailApp.cvName}</p>
              </div>

              {candidateDetailApp.portfolioUrl && (
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px]">Portofolio:</span>
                  <a
                    href={candidateDetailApp.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-blue-600 underline break-all"
                  >
                    {candidateDetailApp.portfolioUrl}
                  </a>
                </div>
              )}

              <div className="space-y-1">
                <span className="font-bold text-slate-700">Motivasi Magang:</span>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed">
                  {candidateDetailApp.motivation}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700">Alasan Memilih Perusahaan:</span>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed">
                  {candidateDetailApp.reason}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700">Pengalaman Relevan:</span>
                <p className="p-3 bg-slate-50 rounded-xl text-slate-600 leading-relaxed">
                  {candidateDetailApp.relevantExperience}
                </p>
              </div>
            </div>

            <div className="pt-2 flex space-x-2">
              <button
                onClick={() => {
                  handleUpdateApplicationStatus(candidateDetailApp.id, 'accepted');
                  setCandidateDetailApp(null);
                  alert(`${candidateDetailApp.studentName} DITERIMA!`);
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
              >
                Terima Pelamar
              </button>
              <button
                onClick={() => setCandidateDetailApp(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
