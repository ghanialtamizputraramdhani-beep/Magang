export type UserRole = 'student' | 'company' | 'admin';

export type EducationLevel = 'SMA/SMK' | 'Mahasiswa (D3/D4/S1)';

export type WorkType = 'WFO' | 'WFH' | 'Hybrid';

export type CompensationType = 'Paid' | 'Unpaid';

export type InternshipCategory =
  | 'Teknik'
  | 'Bisnis & Manajemen'
  | 'IT & Programming'
  | 'Desain'
  | 'Marketing'
  | 'Pendidikan'
  | 'Keuangan'
  | 'Media & Komunikasi';

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  educationLevel: EducationLevel;
  school: string;
  major: string;
  year: string;
  location: string;
  bio: string;
  skills: string[];
  interests: string[];
  preferredWorkType: WorkType[];
  cvName?: string;
  cvUrl?: string;
  portfolioUrl?: string;
  certificates: {
    id: string;
    title: string;
    issuer: string;
    year: string;
    link?: string;
  }[];
  experiences: {
    id: string;
    role: string;
    organization: string;
    period: string;
    description: string;
  }[];
  projects: {
    id: string;
    title: string;
    role: string;
    link?: string;
    description: string;
  }[];
  achievements: {
    id: string;
    title: string;
    year: string;
    description: string;
  }[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  verified: boolean;
  industry: string;
  location: string;
  about: string;
  website: string;
  picName: string;
  picEmail: string;
  picPhone: string;
  employeeCount: string;
}

export interface Internship {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  companyVerified: boolean;
  title: string;
  category: InternshipCategory;
  location: string;
  workType: WorkType;
  duration: string;
  startDate: string;
  deadline: string;
  compensation: CompensationType;
  stipendAmount?: string;
  educationLevelRequired: EducationLevel[];
  description: string;
  jobDescription: string[];
  requirements: {
    education: string;
    skills: string[];
    experience: string;
    other: string[];
  };
  benefits: string[];
  timeline: {
    step: number;
    name: string;
    date: string;
    desc: string;
  }[];
  status: 'active' | 'closed';
  applicantsCount: number;
  quota: number;
  featured?: boolean;
}

export type ApplicationStatus =
  | 'submitted'      // Dikirim
  | 'screening'      // Seleksi Administrasi
  | 'interview'      // Interview Dijadwalkan
  | 'accepted'       // Diterima
  | 'rejected';      // Ditolak

export interface InterviewSchedule {
  date: string;
  time: string;
  platform: 'Google Meet' | 'Zoom' | 'Tatap Muka di Kantor';
  meetingLink: string;
  notes: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentSchool: string;
  studentMajor: string;
  studentEducationLevel: EducationLevel;
  studentAvatar: string;
  studentPhone: string;
  studentSkills: string[];
  internshipId: string;
  internshipTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  status: ApplicationStatus;
  appliedAt: string;
  cvName: string;
  portfolioUrl?: string;
  motivation: string;
  reason: string;
  relevantExperience: string;
  notesFromCompany?: string;
  interviewSchedule?: InterviewSchedule;
}

export interface JournalEntry {
  id: string;
  internshipId: string;
  studentId: string;
  date: string;
  week: number;
  activity: string;
  learning: string;
  obstacle: string;
  documentationName?: string;
  verifiedByMentor: boolean;
  mentorFeedback?: string;
  createdAt: string;
}

export interface InternshipTask {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
  week: number;
  assignedBy: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  type: 'WFO' | 'WFH' | 'Izin';
  status: 'Hadir' | 'Menunggu Verifikasi';
  checkInTime: string;
  checkOutTime?: string;
  notes?: string;
}

export interface CertificateData {
  id: string;
  certificateNumber: string;
  issueDate: string;
  studentName: string;
  studentSchool: string;
  companyName: string;
  companyLogo: string;
  position: string;
  period: string;
  grade: 'A (Sangat Memuaskan)' | 'A-' | 'B+';
  skillsAcquired: string[];
  mentorName: string;
  mentorTitle: string;
  hrDirectorName: string;
  verificationCode: string;
}

export interface ActiveInternship {
  id: string;
  applicationId: string;
  studentId: string;
  internshipId: string;
  companyName: string;
  companyLogo: string;
  position: string;
  mentorName: string;
  mentorRole: string;
  mentorEmail: string;
  startDate: string;
  endDate: string;
  currentWeek: number;
  totalWeeks: number;
  status: 'ongoing' | 'completed';
  tasks: InternshipTask[];
  attendances: AttendanceRecord[];
  journals: JournalEntry[];
  certificate?: CertificateData;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'interview' | 'accepted' | 'rejected' | 'reminder' | 'journal' | 'info';
  actionUrl?: string;
  actionTab?: string;
}
