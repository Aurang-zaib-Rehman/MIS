/**
 * Admin Dashboard & Student Attendance Mock Data & Types
 * Madrassa Management Information System (MIS)
 */

export interface AdminKpiData {
  totalStudents: {
    count: number;
    formatted: string;
    trend: string;
    isPositive: boolean;
    subtitle: string;
  };
  totalStaff: {
    count: number;
    formatted: string;
    trend: string;
    isPositive: boolean;
    subtitle: string;
  };
  totalDonations: {
    amount: number;
    formatted: string;
    trend: string;
    isPositive: boolean;
    subtitle: string;
  };
  totalExpense: {
    amount: number;
    formatted: string;
    trend: string;
    isPositive: boolean;
    subtitle: string;
  };
}

export interface AcademicDepartmentDistribution {
  labels: string[];
  series: number[];
  totalStudents: number;
  features: {
    title: string;
    value: string;
    description: string;
    badgeText?: string;
  }[];
}

export interface AdmissionApplicationItem {
  id: string;
  applicationNo: string;
  studentName: string;
  fatherName: string;
  appliedDepartment: string;
  appliedDarja: string;
  applyDate: string;
  status:
    | "Approved"
    | "Interview Passed"
    | "Under Review"
    | "Awaiting Test"
    | "Merit Verified";
  contactNumber: string;
  previousMadrassa: string;
}

export interface AttendanceMonthDetail {
  monthKey: string;
  monthLabel: string;
  percentage: number;
  totalEnrolled: number;
  presentCount: number;
  absentCount: number;
  onTimePercentage: number;
  workingDays: number;
}

export interface PresentStudentRecord {
  id: string;
  studentId: string;
  name: string;
  fatherName: string;
  department: string;
  darja: string;
  className: string;
  checkInTime: string;
  status: "Present";
}

export interface AbsentStudentRecord {
  id: string;
  studentId: string;
  name: string;
  fatherName: string;
  department: string;
  darja: string;
  classAbsent: string;
  reason: "Unexcused Absence" | "Medical Leave" | "Family Emergency" | "Hostel Sanctioned";
  fatherContact: string;
}

// 1. Top 4 Admin KPI Metrics
export const ADMIN_KPI_DATA: AdminKpiData = {
  totalStudents: {
    count: 1480,
    formatted: "1,480",
    trend: "+8.2%",
    isPositive: true,
    subtitle: "Active students across all Darjat",
  },
  totalStaff: {
    count: 84,
    formatted: "84",
    trend: "+3.5%",
    isPositive: true,
    subtitle: "Asatidha, Qaris & hostel administration",
  },
  totalDonations: {
    amount: 4850000,
    formatted: "Rs. 4.85M",
    trend: "+14.8%",
    isPositive: true,
    subtitle: "Zakat, Sadaqat & educational patron funds",
  },
  totalExpense: {
    amount: 3210000,
    formatted: "Rs. 3.21M",
    trend: "-4.1%",
    isPositive: true,
    subtitle: "Salaries, kitchen/ration & campus utilities",
  },
};

// 2. Academic Overview: Pie Chart + Features
export const ACADEMIC_OVERVIEW_DATA: AcademicDepartmentDistribution = {
  labels: [
    "Dars-e-Nizami (Alimiyyah)",
    "Hifz-ul-Quran",
    "Tajweed & Qiraat",
    "Primary Maktab & Nazrah",
  ],
  series: [680, 420, 230, 150],
  totalStudents: 1480,
  features: [
    {
      title: "Active Darjat & Sections",
      value: "36 Sections",
      description: "Structured classrooms from Darja Oola to Dawrah-e-Hadith",
      badgeText: "Full Capacity",
    },
    {
      title: "Overall Board Passing Rate",
      value: "94.2%",
      description: "Standard Wifaq-ul-Madaris Al-Arabia annual examinations",
      badgeText: "Mumtaz Tier",
    },
    {
      title: "Faculty-to-Student Ratio",
      value: "1 : 18",
      description: "Optimal teacher-student mentorship across all departments",
      badgeText: "Accredited",
    },
    {
      title: "Congregational Salah Attendance",
      value: "98.6%",
      description: "Monitored 5-daily prayers in Central Jamia Masjid",
      badgeText: "High Discipline",
    },
    {
      title: "Prescribed Syllabus Progression",
      value: "78.5%",
      description: "Academic milestone completion strictly aligned with term calendar",
      badgeText: "On Track",
    },
    {
      title: "Residential Hostel Boarders",
      value: "820 Muqeem",
      description: "55.4% students reside on campus with boarding and lodging",
      badgeText: "Residential",
    },
  ],
};

// 3. Recent Admission Applications (10 items: 5 initial, expands on 'See All')
export const RECENT_ADMISSION_APPLICATIONS: AdmissionApplicationItem[] = [
  {
    id: "app-001",
    applicationNo: "APP-1447-0101",
    studentName: "Muhammad Bilal Farooqi",
    fatherName: "Hafiz Ghulam Murtaza",
    appliedDepartment: "Shoba-e-Dars-e-Nizami",
    appliedDarja: "Darja Oola (Year 1)",
    applyDate: "10-Nov-2026",
    status: "Approved",
    contactNumber: "0301-4458921",
    previousMadrassa: "Jamia Dar-ul-Uloom Faisalabad",
  },
  {
    id: "app-002",
    applicationNo: "APP-1447-0102",
    studentName: "Zaid Bin Haris",
    fatherName: "Haris Mehmood Qadri",
    appliedDepartment: "Shoba-e-Hifz-ul-Quran",
    appliedDarja: "Hifz Class A",
    applyDate: "09-Nov-2026",
    status: "Interview Passed",
    contactNumber: "0322-9812450",
    previousMadrassa: "Madrasah Anwar-ul-Quran",
  },
  {
    id: "app-003",
    applicationNo: "APP-1447-0103",
    studentName: "Abdul Hadi Rizwan",
    fatherName: "Mufti Rizwan Ahmad",
    appliedDepartment: "Shoba-e-Dars-e-Nizami",
    appliedDarja: "Darja Saniya (Year 2)",
    applyDate: "08-Nov-2026",
    status: "Merit Verified",
    contactNumber: "0333-7612349",
    previousMadrassa: "Jamia Ashrafia Lahore",
  },
  {
    id: "app-004",
    applicationNo: "APP-1447-0104",
    studentName: "Saadullah Khan",
    fatherName: "Khan Muhammad",
    appliedDepartment: "Shoba-e-Tajweed & Qiraat",
    appliedDarja: "Qiraat Hafs (Year 1)",
    applyDate: "07-Nov-2026",
    status: "Under Review",
    contactNumber: "0345-8901234",
    previousMadrassa: "Jamia Islamia Rawalpindi",
  },
  {
    id: "app-005",
    applicationNo: "APP-1447-0105",
    studentName: "Hamza Bin Tariq",
    fatherName: "Tariq Jamil",
    appliedDepartment: "Shoba-e-Dars-e-Nizami",
    appliedDarja: "Darja Thalitha (Year 3)",
    applyDate: "06-Nov-2026",
    status: "Awaiting Test",
    contactNumber: "0304-5129871",
    previousMadrassa: "Jamia Binoria Karachi",
  },
  {
    id: "app-006",
    applicationNo: "APP-1447-0106",
    studentName: "Abu Bakr Siddiqui",
    fatherName: "Muhammad Siddique",
    appliedDepartment: "Shoba-e-Hifz-ul-Quran",
    appliedDarja: "Hifz Class B",
    applyDate: "05-Nov-2026",
    status: "Approved",
    contactNumber: "0312-3456789",
    previousMadrassa: "Al-Huda International",
  },
  {
    id: "app-007",
    applicationNo: "APP-1447-0107",
    studentName: "Usman Ghani",
    fatherName: "Abdul Ghaffar",
    appliedDepartment: "Shoba-e-Dars-e-Nizami",
    appliedDarja: "Darja Rabia (Year 4)",
    applyDate: "04-Nov-2026",
    status: "Interview Passed",
    contactNumber: "0300-8765432",
    previousMadrassa: "Jamia Farooqia Karachi",
  },
  {
    id: "app-008",
    applicationNo: "APP-1447-0108",
    studentName: "Talha Zubair",
    fatherName: "Zubair Hashmi",
    appliedDepartment: "Shoba-e-Tajweed & Qiraat",
    appliedDarja: "Qiraat Sab'ah (Year 2)",
    applyDate: "03-Nov-2026",
    status: "Merit Verified",
    contactNumber: "0321-4567890",
    previousMadrassa: "Jamia Madania Lahore",
  },
  {
    id: "app-009",
    applicationNo: "APP-1447-0109",
    studentName: "Anas Bin Nadr",
    fatherName: "Nadr Ali",
    appliedDepartment: "Shoba-e-Dars-e-Nizami",
    appliedDarja: "Darja Oola (Year 1)",
    applyDate: "02-Nov-2026",
    status: "Under Review",
    contactNumber: "0332-6543210",
    previousMadrassa: "Jamia Imdadia Faisalabad",
  },
  {
    id: "app-010",
    applicationNo: "APP-1447-0110",
    studentName: "Huzaifa Tariq",
    fatherName: "Muhammad Tariq",
    appliedDepartment: "Shoba-e-Hifz-ul-Quran",
    appliedDarja: "Hifz Class A",
    applyDate: "01-Nov-2026",
    status: "Approved",
    contactNumber: "0343-7890123",
    previousMadrassa: "Dar-ul-Quran Multan",
  },
];

// 4. Monthly Attendance Stats for Speedometer & Month Selector
export const MONTHLY_ATTENDANCE_STATS: Record<string, AttendanceMonthDetail> = {
  "rabi-thani": {
    monthKey: "rabi-thani",
    monthLabel: "Rabi-ul-Thani 1447 (Nov 2026)",
    percentage: 93.4,
    totalEnrolled: 1480,
    presentCount: 1382,
    absentCount: 98,
    onTimePercentage: 96.2,
    workingDays: 24,
  },
  "rabi-awwal": {
    monthKey: "rabi-awwal",
    monthLabel: "Rabi-ul-Awwal 1447 (Oct 2026)",
    percentage: 94.8,
    totalEnrolled: 1480,
    presentCount: 1403,
    absentCount: 77,
    onTimePercentage: 97.5,
    workingDays: 26,
  },
  safar: {
    monthKey: "safar",
    monthLabel: "Safar 1447 (Sep 2026)",
    percentage: 91.5,
    totalEnrolled: 1480,
    presentCount: 1354,
    absentCount: 126,
    onTimePercentage: 94.1,
    workingDays: 25,
  },
  muharram: {
    monthKey: "muharram",
    monthLabel: "Muharram 1447 (Aug 2026)",
    percentage: 95.2,
    totalEnrolled: 1480,
    presentCount: 1409,
    absentCount: 71,
    onTimePercentage: 98.0,
    workingDays: 26,
  },
};

// 5. Today's Present Students Data (14 entries: 7 initially, expands on 'See More')
export const TODAYS_PRESENT_STUDENTS: PresentStudentRecord[] = [
  {
    id: "prs-001",
    studentId: "STD-1447-042",
    name: "Muhammad Abdullah Khan",
    fatherName: "Hafiz Muhammad Ibrahim",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Saniya (Year 2)",
    className: "Period 1: Ilm-us-Sarf",
    checkInTime: "06:48 AM",
    status: "Present",
  },
  {
    id: "prs-002",
    studentId: "STD-1447-018",
    name: "Abdul Rahman Siddiqui",
    fatherName: "Maulana Tariq Siddiqui",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Saniya (Year 2)",
    className: "Period 1: Ilm-us-Sarf",
    checkInTime: "06:50 AM",
    status: "Present",
  },
  {
    id: "prs-003",
    studentId: "STD-1447-009",
    name: "Hafiz Muhammad Talha",
    fatherName: "Noor Muhammad",
    department: "Shoba-e-Hifz-ul-Quran",
    darja: "Hifz Class A",
    className: "Period 1: Sabaq Dawr",
    checkInTime: "06:42 AM",
    status: "Present",
  },
  {
    id: "prs-004",
    studentId: "STD-1447-055",
    name: "Usman Ali Farooqi",
    fatherName: "Ghulam Murtaza",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Oola (Year 1)",
    className: "Period 2: Nahw Mir",
    checkInTime: "06:55 AM",
    status: "Present",
  },
  {
    id: "prs-005",
    studentId: "STD-1447-081",
    name: "Bilal Hassan Alvi",
    fatherName: "Muhammad Hassan",
    department: "Shoba-e-Tajweed & Qiraat",
    darja: "Qiraat Hafs (Year 1)",
    className: "Period 1: Ahkam-ut-Tajweed",
    checkInTime: "06:45 AM",
    status: "Present",
  },
  {
    id: "prs-006",
    studentId: "STD-1447-023",
    name: "Anas Bin Malik",
    fatherName: "Malik Abdul Rauf",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Thalitha (Year 3)",
    className: "Period 1: Al-Qiraat",
    checkInTime: "06:52 AM",
    status: "Present",
  },
  {
    id: "prs-007",
    studentId: "STD-1447-067",
    name: "Zaid Bin Harithah",
    fatherName: "Harithah Iqbal",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Saniya (Year 2)",
    className: "Period 1: Ilm-us-Sarf",
    checkInTime: "06:49 AM",
    status: "Present",
  },
  {
    id: "prs-008",
    studentId: "STD-1447-092",
    name: "Hamza Bin Tariq",
    fatherName: "Tariq Mehmood",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Saniya (Year 2)",
    className: "Period 1: Ilm-us-Sarf",
    checkInTime: "06:58 AM",
    status: "Present",
  },
  {
    id: "prs-009",
    studentId: "STD-1447-104",
    name: "Abu Ubaidah Al-Jarrah",
    fatherName: "Ubaidah Qureshi",
    department: "Shoba-e-Hifz-ul-Quran",
    darja: "Hifz Class B",
    className: "Period 1: Sabaq Para 15",
    checkInTime: "06:44 AM",
    status: "Present",
  },
  {
    id: "prs-010",
    studentId: "STD-1447-115",
    name: "Saad Bin Abi Waqas",
    fatherName: "Waqas Ahmad",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Rabia (Year 4)",
    className: "Period 2: Sharh-ul-Wiqayah",
    checkInTime: "06:51 AM",
    status: "Present",
  },
  {
    id: "prs-011",
    studentId: "STD-1447-128",
    name: "Ammar Bin Yasir",
    fatherName: "Yasir Mehmood",
    department: "Shoba-e-Tajweed & Qiraat",
    darja: "Qiraat Sab'ah (Year 2)",
    className: "Period 2: Jazariyyah Dars",
    checkInTime: "06:47 AM",
    status: "Present",
  },
  {
    id: "prs-012",
    studentId: "STD-1447-133",
    name: "Salman Al-Farsi",
    fatherName: "Faris Muhammad",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Khamisa (Year 5)",
    className: "Period 1: Mukhtasar-ul-Ma'ani",
    checkInTime: "06:53 AM",
    status: "Present",
  },
  {
    id: "prs-013",
    studentId: "STD-1447-149",
    name: "Muaz Bin Jabal",
    fatherName: "Jabal Khan",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Sadisa (Year 6)",
    className: "Period 2: Al-Hidayah",
    checkInTime: "06:46 AM",
    status: "Present",
  },
  {
    id: "prs-014",
    studentId: "STD-1447-156",
    name: "Umar Farooq Qasmi",
    fatherName: "Farooq Ahmad",
    department: "Shoba-e-Hifz-ul-Quran",
    darja: "Hifz Class A",
    className: "Period 2: Manzil Dars",
    checkInTime: "06:50 AM",
    status: "Present",
  },
];

// 6. Today's Absent Students Data (14 entries: 7 initially, expands on 'See More')
export const TODAYS_ABSENT_STUDENTS: AbsentStudentRecord[] = [
  {
    id: "abs-001",
    studentId: "STD-1447-005",
    name: "Zubair Ahmad Qureshi",
    fatherName: "Noor Ahmad Qureshi",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Saniya (Year 2)",
    classAbsent: "Period 1: Ilm-us-Sarf",
    reason: "Unexcused Absence",
    fatherContact: "0300-1122334",
  },
  {
    id: "abs-002",
    studentId: "STD-1447-007",
    name: "Saad Bin Ubadah",
    fatherName: "Hafiz Ubadahullah",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Saniya (Year 2)",
    classAbsent: "Period 1: Ilm-us-Sarf",
    reason: "Medical Leave",
    fatherContact: "0321-9988776",
  },
  {
    id: "abs-003",
    studentId: "STD-1447-034",
    name: "Ibrahim Khalilullah",
    fatherName: "Khalil Ahmad",
    department: "Shoba-e-Hifz-ul-Quran",
    darja: "Hifz Class B",
    classAbsent: "Period 1: Sabaq Dawr",
    reason: "Hostel Sanctioned",
    fatherContact: "0333-5566778",
  },
  {
    id: "abs-004",
    studentId: "STD-1447-078",
    name: "Abdullah Bin Masood",
    fatherName: "Masood Akhtar",
    department: "Shoba-e-Tajweed & Qiraat",
    darja: "Qiraat Hafs (Year 1)",
    classAbsent: "Period 2: Ahkam-ut-Tajweed",
    reason: "Family Emergency",
    fatherContact: "0345-1234567",
  },
  {
    id: "abs-005",
    studentId: "STD-1447-089",
    name: "Hassan Bin Ali",
    fatherName: "Ali Raza",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Oola (Year 1)",
    classAbsent: "Period 3: Nahw Mir",
    reason: "Unexcused Absence",
    fatherContact: "0311-2233445",
  },
  {
    id: "abs-006",
    studentId: "STD-1447-112",
    name: "Hussein Bin Ali",
    fatherName: "Ali Raza",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Oola (Year 1)",
    classAbsent: "Period 3: Nahw Mir",
    reason: "Medical Leave",
    fatherContact: "0311-2233445",
  },
  {
    id: "abs-007",
    studentId: "STD-1447-124",
    name: "Usamah Bin Zaid",
    fatherName: "Zaid Iqbal",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Thalitha (Year 3)",
    classAbsent: "Period 4: Noor-ul-Idhah",
    reason: "Unexcused Absence",
    fatherContact: "0305-6677889",
  },
  {
    id: "abs-008",
    studentId: "STD-1447-137",
    name: "Khalid Bin Waleed",
    fatherName: "Waleed Khan",
    department: "Shoba-e-Hifz-ul-Quran",
    darja: "Hifz Class A",
    classAbsent: "Period 2: Sabaq Para 20",
    reason: "Family Emergency",
    fatherContact: "0314-7788990",
  },
  {
    id: "abs-009",
    studentId: "STD-1447-142",
    name: "Ja'far Bin Abi Talib",
    fatherName: "Talib Hussain",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Rabia (Year 4)",
    classAbsent: "Period 1: Sharh-ul-Wiqayah",
    reason: "Hostel Sanctioned",
    fatherContact: "0323-8899001",
  },
  {
    id: "abs-010",
    studentId: "STD-1447-151",
    name: "Miqdad Bin Amr",
    fatherName: "Amrullah Khan",
    department: "Shoba-e-Tajweed & Qiraat",
    darja: "Qiraat Sab'ah (Year 2)",
    classAbsent: "Period 2: Jazariyyah Dars",
    reason: "Medical Leave",
    fatherContact: "0334-9900112",
  },
  {
    id: "abs-011",
    studentId: "STD-1447-163",
    name: "Suhayb Ar-Rumi",
    fatherName: "Rumi Bakhsh",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Khamisa (Year 5)",
    classAbsent: "Period 3: Mukhtasar-ul-Ma'ani",
    reason: "Unexcused Absence",
    fatherContact: "0346-0011223",
  },
  {
    id: "abs-012",
    studentId: "STD-1447-170",
    name: "Bilal Bin Rabah",
    fatherName: "Rabah Din",
    department: "Shoba-e-Hifz-ul-Quran",
    darja: "Hifz Class B",
    classAbsent: "Period 1: Sabaq Dawr",
    reason: "Medical Leave",
    fatherContact: "0302-1133557",
  },
  {
    id: "abs-013",
    studentId: "STD-1447-182",
    name: "Khabbaab Bin Al-Aratt",
    fatherName: "Aratt Mehmood",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Sadisa (Year 6)",
    classAbsent: "Period 2: Al-Hidayah",
    reason: "Hostel Sanctioned",
    fatherContact: "0315-2244668",
  },
  {
    id: "abs-014",
    studentId: "STD-1447-195",
    name: "Abu Hurairah",
    fatherName: "Shamsuddin",
    department: "Shoba-e-Dars-e-Nizami",
    darja: "Darja Sabia (Year 7)",
    classAbsent: "Period 1: Mishkat-ul-Masabih",
    reason: "Family Emergency",
    fatherContact: "0324-3355779",
  },
];

