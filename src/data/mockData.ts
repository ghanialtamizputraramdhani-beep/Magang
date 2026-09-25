import {
  StudentProfile,
  Company,
  Internship,
  Application,
  ActiveInternship,
  AppNotification
} from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'PT Telkom Indonesia (Persero) Tbk',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    verified: true,
    industry: 'Telekomunikasi & Digital Solutions',
    location: 'Jakarta Selatan, DKI Jakarta',
    about: 'BUMN telekomunikasi digital terdepan di Indonesia yang berkomitmen memajukan ekosistem talenta muda melalui program magang terstruktur.',
    website: 'https://www.telkom.co.id',
    picName: 'Bambang Sudarmono, S.Psi',
    picEmail: 'talent.internship@telkom.co.id',
    picPhone: '+62 811-9823-4411',
    employeeCount: '25.000+ Karyawan'
  },
  {
    id: 'comp-2',
    name: 'PT GoTo Gojek Tokopedia',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    verified: true,
    industry: 'Teknologi & E-Commerce',
    location: 'Jakarta Selatan, DKI Jakarta',
    about: 'Ekosistem digital terbesar di Indonesia yang menggabungkan on-demand services, e-commerce, dan financial technology.',
    website: 'https://www.gotocompany.com',
    picName: 'Clarissa Wulandari',
    picEmail: 'internships@gotocompany.com',
    picPhone: '+62 812-4455-8899',
    employeeCount: '10.000+ Karyawan'
  },
  {
    id: 'comp-3',
    name: 'PT Bank Mandiri (Persero) Tbk',
    logo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=150&auto=format&fit=crop&q=80',
    verified: true,
    industry: 'Perbankan & Keuangan',
    location: 'Jakarta Pusat, DKI Jakarta',
    about: 'Bank terbesar di Indonesia yang menyediakan solusi finansial terintegrasi dan kesempatan magang bagi pelajar & mahasiswa berbakat.',
    website: 'https://www.bankmandiri.co.id',
    picName: 'Dimas Wicaksono',
    picEmail: 'human.capital@bankmandiri.co.id',
    picPhone: '+62 813-8899-7711',
    employeeCount: '38.000+ Karyawan'
  },
  {
    id: 'comp-4',
    name: 'PT Paragon Technology and Innovation',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=150&auto=format&fit=crop&q=80',
    verified: true,
    industry: 'Cosmetics & FMCG',
    location: 'Tangerang, Banten',
    about: 'Perusahaan manufaktur kosmetik nasional terbesar yang menaungi merek terkemuka seperti Wardah, Make Over, Emina, dan Kahf.',
    website: 'https://www.paragon-tni.com',
    picName: 'Sarah Amalia',
    picEmail: 'earlycareers@paragon-tni.com',
    picPhone: '+62 819-0123-5566',
    employeeCount: '12.000+ Karyawan'
  },
  {
    id: 'comp-5',
    name: 'PT Ruang Raya Indonesia (Ruangguru)',
    logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150&auto=format&fit=crop&q=80',
    verified: true,
    industry: 'Education Technology',
    location: 'Jakarta Selatan, DKI Jakarta',
    about: 'Perusahaan teknologi pendidikan nomor 1 di Indonesia yang fokus pada layanan pembelajaran daring untuk jutaan pelajar.',
    website: 'https://ruangguru.com',
    picName: 'Nadia Salsabila',
    picEmail: 'internship@ruangguru.com',
    picPhone: '+62 821-3322-1100',
    employeeCount: '4.500+ Karyawan'
  },
  {
    id: 'comp-6',
    name: 'Studio Animasi & Multimedia Kreasi Nusa',
    logo: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80',
    verified: true,
    industry: 'Kreatif, Desain & Media',
    location: 'Bandung, Jawa Barat',
    about: 'Creative studio yang bekerja sama aktif dengan SMK Pusat Keunggulan dalam pengembangan aset 2D/3D, motion graphic, dan video editing.',
    website: 'https://kreasi-nusa.id',
    picName: 'Fajar Nugroho, S.Ds',
    picEmail: 'studio@kreasi-nusa.id',
    picPhone: '+62 857-1122-3344',
    employeeCount: '50-100 Karyawan'
  }
];

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-1',
    companyId: 'comp-1',
    companyName: 'PT Telkom Indonesia (Persero) Tbk',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    companyVerified: true,
    title: 'Frontend Web Developer Intern',
    category: 'IT & Programming',
    location: 'Jakarta Selatan (Telkom Landmark Tower)',
    workType: 'Hybrid',
    duration: '6 Bulan',
    startDate: '10 Oktober 2026',
    deadline: '28 September 2026',
    compensation: 'Paid',
    stipendAmount: 'Rp 3.500.000 / bulan + Laptop & Wi-Fi',
    educationLevelRequired: ['Mahasiswa (D3/D4/S1)', 'SMA/SMK'],
    description: 'Kesempatan emas bagi siswa SMK RPL berprestasi atau mahasiswa IT untuk berkontribusi langsung pada pengembangan platform digital Telkom dengan bimbingan mentor senior berpengalaman.',
    jobDescription: [
      'Mengembangkan antarmuka web modern menggunakan React, TypeScript, dan Tailwind CSS.',
      'Melakukan integrasi API backend RESTful dan pengujian antarmuka.',
      'Bekerjasama dengan UI/UX designer dalam implementasi design system Telkom.',
      'Mengikuti daily standup dan sprint review bersama tim engineering.'
    ],
    requirements: {
      education: 'Siswa SMK Jurusan Rekayasa Perangkat Lunak (Kelas 12) atau Mahasiswa Ilmu Komputer/TI (Min. Semester 5).',
      skills: ['HTML/CSS/JavaScript', 'React.js Dasar', 'Git & GitHub', 'Tailwind CSS'],
      experience: 'Memiliki proyek website portofolio pribadi atau tugas sekolah/kampus.',
      other: [
        'Surat rekomendasi dari pihak sekolah atau kampus.',
        'Mampu berkomunikasi dengan baik dan mau belajar hal baru.',
        'Disiplin mematuhi etika kerja industri.'
      ]
    },
    benefits: [
      'Uang saku bulanan kompetitif (Rp 3.500.000/bln)',
      'Sertifikat Resmi Magang BUMN Telkom Indonesia',
      'Mentorship intensif 1-on-1 bersama Lead Engineer',
      'Akses gratis ke modul pelatihan internal Telkom Digital Academy',
      'Peluang fast-track rekrutmen karyawan setelah lulus'
    ],
    timeline: [
      { step: 1, name: 'Pendaftaran Berkas', date: '10 - 28 Sep 2026', desc: 'Pengumpulan CV, Portofolio, dan Surat Pengantar' },
      { step: 2, name: 'Seleksi Administrasi', date: '29 Sep - 01 Okt 2026', desc: 'Screening profil dan kesesuaian berkas' },
      { step: 3, name: 'Technical & User Interview', date: '02 - 05 Okt 2026', desc: 'Sesi wawancara online via Google Meet' },
      { step: 4, name: 'Pengumuman Kelolosan', date: '07 Okt 2026', desc: 'Pemberitahuan hasil akhir dan offering letter' },
      { step: 5, name: 'Onboarding & Mulai Magang', date: '10 Okt 2026', desc: 'Penyambutan peserta dan pengenalan tim kerja' }
    ],
    status: 'active',
    applicantsCount: 42,
    quota: 5,
    featured: true
  },
  {
    id: 'intern-2',
    companyId: 'comp-6',
    companyName: 'Studio Animasi & Multimedia Kreasi Nusa',
    companyLogo: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80',
    companyVerified: true,
    title: 'Junior Graphic Designer & Illustrator (SMK Friendly)',
    category: 'Desain',
    location: 'Bandung (Dago Creative Hub)',
    workType: 'WFO',
    duration: '3 Bulan',
    startDate: '15 Oktober 2026',
    deadline: '02 Oktober 2026',
    compensation: 'Paid',
    stipendAmount: 'Rp 2.000.000 / bulan + Makan Siang',
    educationLevelRequired: ['SMA/SMK', 'Mahasiswa (D3/D4/S1)'],
    description: 'Program magang khusus untuk siswa SMK Jurusan Multimedia / DKV atau mahasiswa Desain Grafis untuk membuat konten visual media sosial, ilustrasi vektor, dan branding brand lokal.',
    jobDescription: [
      'Membuat aset visual promosi media sosial (Instagram feed, banner carousel, stories).',
      'Membantu senior ilustrator dalam tracing vektor dan pewarnaan karakter.',
      'Mempersiapkan materi presentasi dan portofolio studio.'
    ],
    requirements: {
      education: 'Siswa SMK Jurusan DKV / Multimedia / Animasi atau Mahasiswa Desain.',
      skills: ['Adobe Photoshop / Illustrator / Canva Pro', 'Figma Dasar', 'Sense of Layout & Typography', 'Kreativitas'],
      experience: 'Menyertakan link Google Drive atau Behance portofolio karya desain.',
      other: ['Siap melaksanakan magang tatap muka di studio Bandung.']
    },
    benefits: [
      'Uang saku bulanan dan fasilitas makan siang harian',
      'Sertifikat Praktik Kerja Lapangan (PKL) resmi berstandar industri',
      'Portofolio komersial untuk klien ternama',
      'Dukungan perlengkapan kerja & drawing tablet di kantor'
    ],
    timeline: [
      { step: 1, name: 'Pendaftaran', date: '12 Sep - 02 Okt 2026', desc: 'Submit data diri dan link karya portofolio' },
      { step: 2, name: 'Review Portofolio', date: '03 - 04 Okt 2026', desc: 'Penilaian orisinalitas dan skill visual' },
      { step: 3, name: 'Wawancara Santai', date: '05 - 08 Okt 2026', desc: 'Interview tatap muka atau video call' },
      { step: 4, name: 'Pengumuman', date: '10 Okt 2026', desc: 'Surat penerimaan magang diterbitkan' },
      { step: 5, name: 'Hari Pertama', date: '15 Okt 2026', desc: 'Orientasi studio' }
    ],
    status: 'active',
    applicantsCount: 29,
    quota: 3,
    featured: true
  },
  {
    id: 'intern-3',
    companyId: 'comp-3',
    companyName: 'PT Bank Mandiri (Persero) Tbk',
    companyLogo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=150&auto=format&fit=crop&q=80',
    companyVerified: true,
    title: 'Finance & Administration Intern (Akuntansi & Keuangan)',
    category: 'Keuangan',
    location: 'Jakarta Pusat (Plaza Mandiri)',
    workType: 'WFO',
    duration: '3 Bulan',
    startDate: '20 Oktober 2026',
    deadline: '05 Oktober 2026',
    compensation: 'Paid',
    stipendAmount: 'Rp 2.800.000 / bulan',
    educationLevelRequired: ['SMA/SMK', 'Mahasiswa (D3/D4/S1)'],
    description: 'Kesempatan magang di unit kerja Human Capital & Operasional Keuangan Bank Mandiri untuk memperdalam pembukuan, rekonsiliasi data, dan manajemen dokumen korporat.',
    jobDescription: [
      'Membantu staf keuangan melakukan verifikasi invoice dan kwitansi.',
      'Melakukan input data transaksi operasional ke spreadsheet dan sistem ERP internal.',
      'Mengarsipkan berkas administratif kepatuhan bank secara rapi dan akurat.'
    ],
    requirements: {
      education: 'Siswa SMK Akuntansi / Administrasi Perkantoran atau Mahasiswa Manajemen/Akuntansi.',
      skills: ['Microsoft Excel (VLOOKUP, Pivot, SUMIFS)', 'Ketelitian Tinggi', 'Administrasi Dokumen'],
      experience: 'Terbiasa mengoperasikan komputer dan spreadsheet.',
      other: ['Nilai rapor mata pelajaran produktif minimal 80.']
    },
    benefits: [
      'Uang saku bulanan resmi BUMN',
      'Sertifikat Magang Bank Mandiri dengan verifikasi barcode',
      'Pengalaman kerja nyata di lingkungan perbankan nasional',
      'Bimbingan langsung dari praktisi keuangan perbankan'
    ],
    timeline: [
      { step: 1, name: 'Pendaftaran', date: '15 Sep - 05 Okt 2026', desc: 'Isi form dan upload transkrip/rapor' },
      { step: 2, name: 'Seleksi Berkas', date: '06 - 08 Okt 2026', desc: 'Verifikasi nilai dan data diri' },
      { step: 3, name: 'Interview HR', date: '09 - 13 Okt 2026', desc: 'Wawancara daring via Zoom' },
      { step: 4, name: 'Pengumuman', date: '15 Okt 2026', desc: 'Pengumuman resmi via email & dashboard' },
      { step: 5, name: 'Mulai Bekerja', date: '20 Okt 2026', desc: 'Pemberian ID badge dan serah terima tugas' }
    ],
    status: 'active',
    applicantsCount: 64,
    quota: 4,
    featured: false
  },
  {
    id: 'intern-4',
    companyId: 'comp-2',
    companyName: 'PT GoTo Gojek Tokopedia',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    companyVerified: true,
    title: 'UI/UX Design Intern - Growth Product',
    category: 'Desain',
    location: 'Jakarta Selatan (Pasaraya Blok M)',
    workType: 'Hybrid',
    duration: '6 Bulan',
    startDate: '01 November 2026',
    deadline: '12 Oktober 2026',
    compensation: 'Paid',
    stipendAmount: 'Rp 4.000.000 / bulan',
    educationLevelRequired: ['Mahasiswa (D3/D4/S1)'],
    description: 'Terlibat langsung dalam mendesain alur antarmuka aplikasi Gojek & Tokopedia untuk jutaan pengguna aktif harian, mulai dari wireframing, prototyping hingga user testing.',
    jobDescription: [
      'Membuat wireframe, interactive prototype, dan UI design berkualitas tinggi di Figma.',
      'Melakukan riset pengguna ringan (usability testing) bersama Product Manager.',
      'Memastikan konsistensi komponen antarmuka dengan Asatu Design System GoTo.'
    ],
    requirements: {
      education: 'Mahasiswa aktif Desain Komunikasi Visual, Ilmu Komputer, Sistem Informasi, atau bidang terkait.',
      skills: ['Figma Advanced', 'User Flow', 'Wireframing', 'Prototyping', 'Design System'],
      experience: 'Wajib menyertakan tautan case study portofolio UI/UX yang dapat diakses.',
      other: ['Memiliki empati terhadap masalah pengguna dan pola pikir analitis.']
    },
    benefits: [
      'Uang saku bulanan kompetitif Rp 4.000.000',
      'MacBook disediakan selama masa magang',
      'Mentorship dari Lead Product Designer GoTo',
      'Voucher makan dan Gojek credit mingguan'
    ],
    timeline: [
      { step: 1, name: 'Registrasi', date: '15 Sep - 12 Okt 2026', desc: 'Pengumpulan CV & Case Study Figma' },
      { step: 2, name: 'Design Challenge', date: '13 - 17 Okt 2026', desc: 'Tugas studi kasus sederhana 48 jam' },
      { step: 3, name: 'Portfolio Review & Interview', date: '20 - 24 Okt 2026', desc: 'Presentasi hasil karya kepada tim UX' },
      { step: 4, name: 'Final Decision', date: '27 Okt 2026', desc: 'Pemberitahuan kelolosan' },
      { step: 5, name: 'Welcome GoTroops', date: '01 Nov 2026', desc: 'Onboarding hari pertama' }
    ],
    status: 'active',
    applicantsCount: 78,
    quota: 2,
    featured: true
  },
  {
    id: 'intern-5',
    companyId: 'comp-4',
    companyName: 'PT Paragon Technology and Innovation',
    companyLogo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=150&auto=format&fit=crop&q=80',
    companyVerified: true,
    title: 'Digital Marketing & Social Media Intern',
    category: 'Marketing',
    location: 'Jakarta Barat / WFH Fleksibel',
    workType: 'WFH',
    duration: '3 Bulan',
    startDate: '18 Oktober 2026',
    deadline: '04 Oktober 2026',
    compensation: 'Paid',
    stipendAmount: 'Rp 2.500.000 / bulan + Product Gift Box',
    educationLevelRequired: ['SMA/SMK', 'Mahasiswa (D3/D4/S1)'],
    description: 'Bantu tim brand Paragon (Wardah/Emina/Kahf) dalam memproduksi konten TikTok/Reels edukatif, copywriting menarik, serta riset tren kecantikan dan gaya hidup anak muda.',
    jobDescription: [
      'Menyusun content calendar mingguan untuk TikTok dan Instagram brand.',
      'Melakukan syuting video pendek kreatif dan voice-over produk.',
      'Memantau engagement rate dan insight konten digital.'
    ],
    requirements: {
      education: 'Siswa SMK Pemasaran / Bisnis Daring atau Mahasiswa Ilmu Komunikasi / Manajemen.',
      skills: ['Copywriting', 'CapCut / Video Editing', 'Instagram & TikTok Trend Awareness', 'Komunikasi'],
      experience: 'Aktif di media sosial atau pernah mengelola akun organisasi / bisnis pribadi.',
      other: ['Percaya diri di depan kamera merupakan nilai tambah.']
    },
    benefits: [
      'Uang saku bulanan Rp 2.500.000',
      'Free product hamper kosmetik setiap bulan',
      'Pelatihan Social Media Growth dari Digital Strategist Paragon',
      'Fleksibilitas kerja 100% remote'
    ],
    timeline: [
      { step: 1, name: 'Pengiriman Berkas', date: '10 Sep - 04 Okt 2026', desc: 'CV dan link akun media sosial / video kreatif' },
      { step: 2, name: 'Review Konten', date: '05 - 07 Okt 2026', desc: 'Screening keahlian video & komunikasi' },
      { step: 3, name: 'Interview', date: '08 - 11 Okt 2026', desc: 'Sesi temu online santai' },
      { step: 4, name: 'Offering', date: '13 Okt 2026', desc: 'Konfirmasi ketersediaan magang' },
      { step: 5, name: 'Kickoff', date: '18 Okt 2026', desc: 'Briefing kampanye brand pertama' }
    ],
    status: 'active',
    applicantsCount: 53,
    quota: 4,
    featured: false
  },
  {
    id: 'intern-6',
    companyId: 'comp-5',
    companyName: 'PT Ruang Raya Indonesia (Ruangguru)',
    companyLogo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150&auto=format&fit=crop&q=80',
    companyVerified: true,
    title: 'Educational Content Creator & QA Intern',
    category: 'Pendidikan',
    location: 'Jakarta Selatan',
    workType: 'Hybrid',
    duration: '4 Bulan',
    startDate: '25 Oktober 2026',
    deadline: '10 Oktober 2026',
    compensation: 'Paid',
    stipendAmount: 'Rp 3.000.000 / bulan',
    educationLevelRequired: ['Mahasiswa (D3/D4/S1)', 'SMA/SMK'],
    description: 'Membantu tim kurikulum Ruangguru dalam mereview kualitas materi latihan soal, rangkuman materi pelajaran SMA/SMK, serta menyiapkan bahan ajar interaktif.',
    jobDescription: [
      'Melakukan quality control terhadap kunci jawaban dan pembahasan soal ujian.',
      'Menulis ringkasan rumus dan konsep belajar yang mudah dipahami pelajar.',
      'Bekerjasama dengan Master Teacher dalam penyiapan modul belajar.'
    ],
    requirements: {
      education: 'Siswa SMA/SMK berprestasi akademik tinggi atau Mahasiswa Pendidikan / MIPA / Teknik.',
      skills: ['Pemahaman Konsep Mapel Kuat', 'Ketelitian', 'Microsoft Word / LaTeX', 'Bahasa Indonesia Baku'],
      experience: 'Pernah menjadi tutor sebaya, asisten lab, atau peserta olimpiade sains.',
      other: ['Menyertakan bukti nilai atau sertifikat kejuaraan akademik.']
    },
    benefits: [
      'Uang saku bulanan Rp 3.000.000',
      'Akun Ruangguru VIP gratis selama magang',
      'Sertifikat Magang EdTech Nasional',
      'Jaringan koneksi pengajar dan pendidik terbaik Indonesia'
    ],
    timeline: [
      { step: 1, name: 'Pendaftaran', date: '14 Sep - 10 Okt 2026', desc: 'CV dan nilai rapor / transkrip' },
      { step: 2, name: 'Tes Akademik Singkat', date: '12 - 13 Okt 2026', desc: 'Pengerjaan 15 soal verifikasi pemahaman' },
      { step: 3, name: 'Wawancara Guru', date: '16 - 19 Okt 2026', desc: 'Interview online via Google Meet' },
      { step: 4, name: 'Pengumuman', date: '21 Okt 2026', desc: 'Pengumuman peserta lolos' },
      { step: 5, name: 'Mulai', date: '25 Okt 2026', desc: 'Orientasi konten digital' }
    ],
    status: 'active',
    applicantsCount: 31,
    quota: 3,
    featured: false
  },
  {
    id: 'intern-7',
    companyId: 'comp-1',
    companyName: 'PT Telkom Indonesia (Persero) Tbk',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    companyVerified: true,
    title: 'Teknisi Jaringan & Fiber Optic (Khusus Siswa SMK TKJ)',
    category: 'Teknik',
    location: 'Surabaya, Jawa Timur (Telkom Witel Jatim)',
    workType: 'WFO',
    duration: '3 Bulan',
    startDate: '15 Oktober 2026',
    deadline: '01 Oktober 2026',
    compensation: 'Paid',
    stipendAmount: 'Rp 2.200.000 / bulan + Uang Transport',
    educationLevelRequired: ['SMA/SMK'],
    description: 'Program Praktik Kerja Lapangan (PKL) resmi untuk siswa SMK Teknik Komputer dan Jaringan (TKJ) untuk belajar langsung konfigurasi router, perakitan fiber optic, dan pemeliharaan server.',
    jobDescription: [
      'Mendampingi teknisi senior dalam pemeliharaan Optical Distribution Point (ODP).',
      'Mempelajari teknik splicing kabel fiber optic dengan alat fusion splicer.',
      'Melakukan pengujian throughput jaringan dan konfigurasi IP address perangkat Telkom.'
    ],
    requirements: {
      education: 'Siswa SMK Jurusan Teknik Komputer & Jaringan (TKJ) / Teknik Telekomunikasi (Kelas 11 atau 12).',
      skills: ['Dasar Jaringan Komputer (TCP/IP)', 'Crimping Kabel UTP', 'Routing Mikrotik Dasar', 'Keselamatan Kerja (K3)'],
      experience: 'Pernah praktik perakitan LAN di laboratorium sekolah.',
      other: ['Surat izin orang tua dan surat permohonan PKL resmi dari Kepala Sekolah.']
    },
    benefits: [
      'Uang saku bulanan dan subsidi transportasi lapangan',
      'Sertifikat PKL Resmi Telkom Indonesia untuk kelulusan sekolah',
      'Pelatihan bersertifikat Fiber Optic Certified Technician',
      'APD lengkap (helm kerja, rompi keselamatan, sarung tangan)'
    ],
    timeline: [
      { step: 1, name: 'Pengajuan Berkas', date: '08 Sep - 01 Okt 2026', desc: 'Unggah surat pengantar SMK dan biodata' },
      { step: 2, name: 'Verifikasi Sekolah', date: '02 - 04 Okt 2026', desc: 'Validasi dengan guru pembimbing SMK' },
      { step: 3, name: 'Tes Fisik & Kesiapan', date: '06 - 08 Okt 2026', desc: 'Briefing keselamatan kerja di kantor Witel' },
      { step: 4, name: 'Penerimaan', date: '10 Okt 2026', desc: 'Surat balasan resmi ke sekolah' },
      { step: 5, name: 'Mulai PKL', date: '15 Okt 2026', desc: 'Penerjunan siswa di lapangan' }
    ],
    status: 'active',
    applicantsCount: 38,
    quota: 8,
    featured: true
  },
  {
    id: 'intern-8',
    companyId: 'comp-3',
    companyName: 'PT Bank Mandiri (Persero) Tbk',
    companyLogo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=150&auto=format&fit=crop&q=80',
    companyVerified: true,
    title: 'Customer Experience & Public Relations Intern',
    category: 'Media & Komunikasi',
    location: 'Jakarta Selatan',
    workType: 'WFO',
    duration: '4 Bulan',
    startDate: '01 November 2026',
    deadline: '15 Oktober 2026',
    compensation: 'Paid',
    stipendAmount: 'Rp 3.000.000 / bulan',
    educationLevelRequired: ['Mahasiswa (D3/D4/S1)', 'SMA/SMK'],
    description: 'Terjun dalam pengelolaan komunikasi kepuasan nasabah, menyusun materi rilis informasi layanan digital, dan menganalisis feedback nasabah untuk perbaikan layanan.',
    jobDescription: [
      'Menghimpun dan mengelompokkan suara nasabah dari saluran digital Mandiri.',
      'Membantu penyusunan buletin mingguan komunikasi internal.',
      'Mendukung operasional kegiatan corporate social responsibility (CSR).'
    ],
    requirements: {
      education: 'Siswa SMK Administrasi / Komunikasi atau Mahasiswa Humas / Ilmu Komunikasi / Sastra.',
      skills: ['Public Speaking', 'Bahasa Indonesia Efektif', 'Empati & Problem Solving', 'Ms. Office'],
      experience: 'Aktif dalam organisasi OSIS, BEM, atau kepanitiaan event.',
      other: ['Penampilan rapi, ramah, dan komunikatif.']
    },
    benefits: [
      'Uang saku bulanan Rp 3.000.000',
      'Sertifikat resmi Bank Mandiri',
      'Networking luas dengan pimpinan perbankan nasional',
      'Pelatihan Service Excellence berstandar internasional'
    ],
    timeline: [
      { step: 1, name: 'Pendaftaran', date: '18 Sep - 15 Okt 2026', desc: 'Kirim CV & video perkenalan 1 menit' },
      { step: 2, name: 'Screening', date: '16 - 18 Okt 2026', desc: 'Evaluasi komunikasi dan kelengkapan' },
      { step: 3, name: 'Wawancara Panel', date: '20 - 24 Okt 2026', desc: 'Interview daring dengan user' },
      { step: 4, name: 'Pengumuman', date: '26 Okt 2026', desc: 'Pemberitahuan kelolosan' },
      { step: 5, name: 'Onboarding', date: '01 Nov 2026', desc: 'Mulai orientasi kerja' }
    ],
    status: 'active',
    applicantsCount: 22,
    quota: 2,
    featured: false
  }
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'student-1',
  userId: 'user-student-1',
  name: 'Rizky Pratama',
  email: 'rizky.pratama@student.sch.id',
  phone: '0812-9876-5432',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  educationLevel: 'SMA/SMK',
  school: 'SMK Negeri 1 Jakarta',
  major: 'Rekayasa Perangkat Lunak (RPL)',
  year: 'Kelas 12',
  location: 'Jakarta Pusat, DKI Jakarta',
  bio: 'Siswa SMK tingkat akhir yang antusias dengan pengembangan web modern, pemecahan masalah logika, dan bersemangat mencari pengalaman magang industri nyata.',
  skills: [
    'HTML/CSS',
    'JavaScript',
    'React.js',
    'Tailwind CSS',
    'Git & GitHub',
    'Figma Dasar',
    'Public Speaking',
    'Teamwork'
  ],
  interests: [
    'Frontend Development',
    'UI/UX Design',
    'Teknologi Edukasi',
    'Startups'
  ],
  preferredWorkType: ['Hybrid', 'WFO'],
  cvName: 'CV_Rizky_Pratama_SMK_RPL_2026.pdf',
  cvUrl: '#',
  portfolioUrl: 'https://github.com/rizkypratama-dev',
  certificates: [
    {
      id: 'cert-1',
      title: 'Sertifikasi Kompetensi BNSP Junior Web Developer',
      issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
      year: '2025',
      link: '#'
    },
    {
      id: 'cert-2',
      title: 'Dicoding: Belajar Dasar Pemrograman Web',
      issuer: 'Dicoding Academy',
      year: '2025',
      link: '#'
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Ketua Divisi IT & Publikasi',
      organization: 'OSIS SMKN 1 Jakarta',
      period: '2024 - 2025',
      description: 'Mengelola website sekolah dan konten dokumentasi kegiatan ekstrakurikuler serta kepengurusan OSIS.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Sistem Informasi Perpustakaan Berbasis Web',
      role: 'Lead Frontend Developer',
      link: 'https://github.com/rizkypratama-dev/perpus-web',
      description: 'Membangun aplikasi pencarian dan peminjaman buku perpustakaan sekolah menggunakan React dan Tailwind.'
    },
    {
      id: 'proj-2',
      title: 'Website Profil UMKM Kopi Lokal',
      role: 'Frontend Developer',
      link: 'https://github.com/rizkypratama-dev/kopi-nusantara',
      description: 'Proyek tugas akhir kolaboratif membuat e-catalog untuk kedai kopi sekitar sekolah.'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Juara 2 Lomba Kompetensi Siswa (LKS) Web Technologies',
      year: '2025',
      description: 'Tingkat Wilayah Jakarta Pusat, kategori pembuatan antarmuka web responsif berstandar WorldSkills.'
    }
  ]
};

export const INITIAL_COLLEGE_STUDENT_PROFILE: StudentProfile = {
  id: 'student-2',
  userId: 'user-student-2',
  name: 'Anisa Rahmawati',
  email: 'anisa.rahmawati@ui.ac.id',
  phone: '0813-8822-1920',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  educationLevel: 'Mahasiswa (D3/D4/S1)',
  school: 'Universitas Indonesia',
  major: 'Sistem Informasi',
  year: 'Semester 6',
  location: 'Depok, Jawa Barat',
  bio: 'Mahasiswi tingkat akhir dengan minat mendalam pada Product Management, UX Design, dan Data Analytics. Berpengalaman memimpin tim riset dan proyek agile.',
  skills: [
    'Figma',
    'User Research',
    'SQL & Data Analysis',
    'Product Requirement Document (PRD)',
    'Agile / Scrum',
    'Public Speaking'
  ],
  interests: ['Product Design', 'Fintech', 'EdTech', 'Business Analysis'],
  preferredWorkType: ['Hybrid', 'WFH'],
  cvName: 'CV_Anisa_Rahmawati_UI_2026.pdf',
  cvUrl: '#',
  portfolioUrl: 'https://behance.net/anisarahma',
  certificates: [
    {
      id: 'cert-11',
      title: 'Google UX Design Professional Certificate',
      issuer: 'Coursera & Google',
      year: '2025',
      link: '#'
    }
  ],
  experiences: [
    {
      id: 'exp-11',
      role: 'Vice Head of UI/UX Department',
      organization: 'BEM Fasilkom UI',
      period: '2024 - 2025',
      description: 'Memimpin tim desainer dalam pembaruan website kemahasiswaan dan sistem pendaftaran kepanitiaan.'
    }
  ],
  projects: [
    {
      id: 'proj-11',
      title: 'Redesign Aplikasi Donasi PeduliAnak',
      role: 'UI/UX Researcher & Designer',
      link: 'https://behance.net/gallery/pedulianak',
      description: 'Meningkatkan completion rate donasi hingga 34% lewat penyederhanaan alur checkout.'
    }
  ],
  achievements: [
    {
      id: 'ach-11',
      title: 'Top 5 Finalist UX Design Competition Gemastik',
      year: '2025',
      description: 'Kompetisi mahasiswa nasional bidang TIK Kemendikbudristek.'
    }
  ]
};

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    studentId: 'student-1',
    studentName: 'Rizky Pratama',
    studentEmail: 'rizky.pratama@student.sch.id',
    studentSchool: 'SMK Negeri 1 Jakarta',
    studentMajor: 'Rekayasa Perangkat Lunak (RPL)',
    studentEducationLevel: 'SMA/SMK',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    studentPhone: '0812-9876-5432',
    studentSkills: ['HTML/CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Git & GitHub'],
    internshipId: 'intern-1',
    internshipTitle: 'Frontend Web Developer Intern',
    companyId: 'comp-1',
    companyName: 'PT Telkom Indonesia (Persero) Tbk',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    status: 'interview',
    appliedAt: '18 September 2026',
    cvName: 'CV_Rizky_Pratama_SMK_RPL_2026.pdf',
    portfolioUrl: 'https://github.com/rizkypratama-dev',
    motivation: 'Saya ingin mengasah kemampuan React.js dan Tailwind pada skala enterprise serta belajar langsung dari engineer Telkom Indonesia.',
    reason: 'Telkom adalah pelopor transformasi digital bangsa yang memiliki budaya mentoring yang luar biasa untuk generasi muda.',
    relevantExperience: 'Juara 2 LKS Web Technologies Jakarta Pusat dan telah membuat 2 website live dengan React.',
    notesFromCompany: 'Berkas dan portofolio GitHub Anda sangat impresif untuk ukuran siswa SMK. Selamat melanjutkan ke sesi Technical & Culture Interview!',
    interviewSchedule: {
      date: '28 September 2026',
      time: '10:00 - 10:45 WIB',
      platform: 'Google Meet',
      meetingLink: 'https://meet.google.com/mgk-tlkm-2026',
      notes: 'Harap hadir 5 menit sebelum jadwal. Siapkan demo salah satu proyek web terbaik Anda untuk sesi screen sharing.'
    }
  },
  {
    id: 'app-2',
    studentId: 'student-1',
    studentName: 'Rizky Pratama',
    studentEmail: 'rizky.pratama@student.sch.id',
    studentSchool: 'SMK Negeri 1 Jakarta',
    studentMajor: 'Rekayasa Perangkat Lunak (RPL)',
    studentEducationLevel: 'SMA/SMK',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    studentPhone: '0812-9876-5432',
    studentSkills: ['HTML/CSS', 'JavaScript', 'Figma Dasar'],
    internshipId: 'intern-2',
    internshipTitle: 'Junior Graphic Designer & Illustrator (SMK Friendly)',
    companyId: 'comp-6',
    companyName: 'Studio Animasi & Multimedia Kreasi Nusa',
    companyLogo: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80',
    status: 'accepted',
    appliedAt: '14 September 2026',
    cvName: 'CV_Rizky_Pratama_SMK_RPL_2026.pdf',
    portfolioUrl: 'https://behance.net/rizkycreative',
    motivation: 'Mengembangkan sense visual dan estetika digital agar aplikasi yang saya buat memiliki UI yang ramah pengguna.',
    reason: 'Kreasi Nusa memiliki lingkungan kreatif yang suportif untuk siswa SMK.',
    relevantExperience: 'Membuat aset poster dan banner di OSIS SMKN 1 Jakarta.',
    notesFromCompany: 'Selamat! Tim kami menyukai antusiasme dan komitmen belajarmu. Surat penerimaan resmi telah diterbitkan.'
  },
  {
    id: 'app-3',
    studentId: 'student-1',
    studentName: 'Rizky Pratama',
    studentEmail: 'rizky.pratama@student.sch.id',
    studentSchool: 'SMK Negeri 1 Jakarta',
    studentMajor: 'Rekayasa Perangkat Lunak (RPL)',
    studentEducationLevel: 'SMA/SMK',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    studentPhone: '0812-9876-5432',
    studentSkills: ['Microsoft Office', 'Ketelitian'],
    internshipId: 'intern-3',
    internshipTitle: 'Finance & Administration Intern (Akuntansi & Keuangan)',
    companyId: 'comp-3',
    companyName: 'PT Bank Mandiri (Persero) Tbk',
    companyLogo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=150&auto=format&fit=crop&q=80',
    status: 'screening',
    appliedAt: '20 September 2026',
    cvName: 'CV_Rizky_Pratama_SMK_RPL_2026.pdf',
    portfolioUrl: '',
    motivation: 'Mempelajari sistem tata kelola keuangan dan administrasi korporat perbankan.',
    reason: 'Bank Mandiri memiliki standar tata kelola terbaik di Indonesia.',
    relevantExperience: 'Menjadi bendahara ekstrakurikuler IT Club sekolah.',
    notesFromCompany: 'Lamaran Anda sedang dalam tahap verifikasi berkas oleh tim Human Capital.'
  }
];

export const INITIAL_ACTIVE_INTERNSHIP: ActiveInternship = {
  id: 'active-1',
  applicationId: 'app-2',
  studentId: 'student-1',
  internshipId: 'intern-2',
  companyName: 'Studio Animasi & Multimedia Kreasi Nusa',
  companyLogo: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80',
  position: 'Junior Graphic Designer & Illustrator (SMK Friendly)',
  mentorName: 'Fajar Nugroho, S.Ds',
  mentorRole: 'Lead Creative Designer & Mentor Industri',
  mentorEmail: 'fajar.nugroho@kreasi-nusa.id',
  startDate: '01 Agustus 2026',
  endDate: '31 Oktober 2026',
  currentWeek: 8,
  totalWeeks: 12,
  status: 'ongoing',
  tasks: [
    {
      id: 'task-1',
      title: 'Eksplorasi Moodboard Visual Kampanye Hari Sumpah Pemuda',
      deadline: '26 Sep 2026',
      completed: true,
      week: 8,
      assignedBy: 'Fajar Nugroho'
    },
    {
      id: 'task-2',
      title: 'Pembuatan 3 Alternatif Ilustrasi Vektor Maskot Studio',
      deadline: '29 Sep 2026',
      completed: false,
      week: 8,
      assignedBy: 'Fajar Nugroho'
    },
    {
      id: 'task-3',
      title: 'Review Aset Carousel Instagram bersama Tim Copywriter',
      deadline: '02 Okt 2026',
      completed: false,
      week: 9,
      assignedBy: 'Fajar Nugroho'
    }
  ],
  attendances: [
    {
      id: 'att-1',
      date: '24 Sep 2026',
      type: 'WFO',
      status: 'Hadir',
      checkInTime: '08:45 WIB',
      checkOutTime: '17:05 WIB',
      notes: 'Bekerja di studio Dago Creative Hub'
    },
    {
      id: 'att-2',
      date: '23 Sep 2026',
      type: 'WFO',
      status: 'Hadir',
      checkInTime: '08:50 WIB',
      checkOutTime: '17:15 WIB',
      notes: 'Bekerja tepat waktu'
    },
    {
      id: 'att-3',
      date: '22 Sep 2026',
      type: 'WFH',
      status: 'Hadir',
      checkInTime: '09:00 WIB',
      checkOutTime: '17:00 WIB',
      notes: 'Pengerjaan revisi aset vektor dari rumah'
    }
  ],
  journals: [
    {
      id: 'jr-1',
      internshipId: 'intern-2',
      studentId: 'student-1',
      date: '24 September 2026',
      week: 8,
      activity: 'Menyusun moodboard color palette dan gaya ilustrasi untuk proyek kampanye pemuda kreasi.',
      learning: 'Memahami prinsip keselarasan warna komplementer dan cara memilih typography hierarki yang enak dibaca di smartphone.',
      obstacle: 'Awalnya sempat bingung menentukan tone warna yang formal tapi tetap kekinian, namun terbantu setelah konsultasi bersama Kak Fajar.',
      documentationName: 'moodboard-sumpah-pemuda-v2.png',
      verifiedByMentor: true,
      mentorFeedback: 'Pilihan palet warnanya sudah sangat menarik dan fresh! Lanjutkan ke tahap sketsa karakter ya.',
      createdAt: '24 Sep 2026, 17:10'
    },
    {
      id: 'jr-2',
      internshipId: 'intern-2',
      studentId: 'student-1',
      date: '23 September 2026',
      week: 8,
      activity: 'Mengikuti sesi sharing mingguan seputar alur produksi animasi komersial dan teknik penataan layer di Adobe Illustrator.',
      learning: 'Belajar best practice penamaan layer agar memudahkan tim animator mengolah aset vector menjadi motion graphic.',
      obstacle: 'Tidak ada kendala berarti, semua materi sharing sangat bermanfaat.',
      documentationName: 'layer-hierarchy-note.pdf',
      verifiedByMentor: true,
      mentorFeedback: 'Bagus sekali catatan pembelajarannya, pertahankan kedisiplinan kerja rapi ini!',
      createdAt: '23 Sep 2026, 17:20'
    }
  ],
  certificate: {
    id: 'cert-sample-01',
    certificateNumber: 'MGK/KREASI-NUSA/PKL/2026/089',
    issueDate: '31 Oktober 2026',
    studentName: 'Rizky Pratama',
    studentSchool: 'SMK Negeri 1 Jakarta',
    companyName: 'Studio Animasi & Multimedia Kreasi Nusa',
    companyLogo: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80',
    position: 'Junior Graphic Designer & Illustrator Intern',
    period: '01 Agustus 2026 s/d 31 Oktober 2026 (3 Bulan)',
    grade: 'A (Sangat Memuaskan)',
    skillsAcquired: [
      'Digital Illustration & Vector Tracing',
      'Design System & Typography Hierarchy',
      'Social Media Visual Campaign Execution',
      'Professional Collaboration & Presentation'
    ],
    mentorName: 'Fajar Nugroho, S.Ds',
    mentorTitle: 'Lead Creative Designer & Mentor',
    hrDirectorName: 'Indra Gunawan, M.M',
    verificationCode: 'VERIFIED-MGK-2026-NUSA-9821'
  }
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'student-1',
    title: 'Jadwal Interview Telkom Indonesia',
    message: 'Lamaranmu di PT Telkom Indonesia telah masuk tahap interview. Jadwal: 28 September 2026, 10:00 WIB via Google Meet.',
    time: '2 jam yang lalu',
    read: false,
    type: 'interview',
    actionTab: 'tracking'
  },
  {
    id: 'notif-2',
    userId: 'student-1',
    title: 'Selamat! Lamaran Diterima 🎉',
    message: 'Selamat! Kamu dinyatakan DITERIMA pada program magang di Studio Animasi & Multimedia Kreasi Nusa.',
    time: '2 hari yang lalu',
    read: false,
    type: 'accepted',
    actionTab: 'active-internship'
  },
  {
    id: 'notif-3',
    userId: 'student-1',
    title: 'Pengingat Deadline Lowongan',
    message: 'Lowongan Frontend Web Developer Intern di PT Telkom Indonesia tinggal 4 hari lagi. Bagikan ke temanmu!',
    time: '3 hari yang lalu',
    read: true,
    type: 'reminder',
    actionTab: 'catalog'
  },
  {
    id: 'notif-4',
    userId: 'student-1',
    title: 'Jurnal Harian Diverifikasi',
    message: 'Mentor Kak Fajar telah memverifikasi dan memberikan catatan pada Jurnal Harian Week 8 kamu.',
    time: '1 hari yang lalu',
    read: true,
    type: 'journal',
    actionTab: 'active-internship'
  }
];

export const CATEGORIES_DATA = [
  {
    name: 'Teknik',
    count: '64 Lowongan',
    iconName: 'Wrench',
    description: 'Mesin, Otomotif, Listrik, Jaringan TKJ & Sipil'
  },
  {
    name: 'IT & Programming',
    count: '128 Lowongan',
    iconName: 'Code',
    description: 'Frontend, Backend, Mobile, QA & Cyber Security'
  },
  {
    name: 'Desain',
    count: '95 Lowongan',
    iconName: 'Palette',
    description: 'UI/UX, Desain Grafis, DKV, 3D & Animasi'
  },
  {
    name: 'Bisnis & Manajemen',
    count: '82 Lowongan',
    iconName: 'Briefcase',
    description: 'Operasional, HRD, Supply Chain & Project Mgmt'
  },
  {
    name: 'Marketing',
    count: '76 Lowongan',
    iconName: 'TrendingUp',
    description: 'Digital Marketing, Content Creator, SEO & Ads'
  },
  {
    name: 'Keuangan',
    count: '54 Lowongan',
    iconName: 'CreditCard',
    description: 'Akuntansi, Perbankan, Pajak & Financial Analyst'
  },
  {
    name: 'Media & Komunikasi',
    count: '43 Lowongan',
    iconName: 'Radio',
    description: 'Humas, Jurnalistik, Broadcaster & Video Editor'
  },
  {
    name: 'Pendidikan',
    count: '38 Lowongan',
    iconName: 'GraduationCap',
    description: 'EdTech, Pengembang Kurikulum, Tutor & Riset'
  }
];
