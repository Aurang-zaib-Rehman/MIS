/**
 * Teacher Role Academic & Operational Data
 * Madrassa Management Information System (MIS)
 */

export interface TeacherTimetableCell {
  isFree: boolean;
  isBreak?: boolean;
  subject?: string;
  arabicName?: string;
  darja?: string;
  section?: string;
  room?: string;
  time?: string;
  studentCount?: number;
  topic?: string;
  freeTitle?: string;
  notes?: string;
}

export type TeacherDayKey =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export interface TeacherWeeklyMatrixRow {
  periodNumber: number;
  periodLabel: string;
  timeSlot: string;
  isBreak?: boolean;
  days: Record<TeacherDayKey, TeacherTimetableCell>;
}

export interface StudentAttendanceEntry {
  id: string;
  rollNo: string;
  registrationNo: string;
  studentName: string;
  fatherName: string;
  status: "Present" | "Absent" | "Late" | "Leave";
  remarks?: string;
}

export interface StudentMarksEntry {
  id: string;
  rollNo: string;
  registrationNo: string;
  studentName: string;
  fatherName: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: "Mumtaz" | "Jayyid Jiddan" | "Jayyid" | "Maqbool" | "Rasib";
  remarks: string;
}

export interface TeacherDailyAttendanceLog {
  id: string;
  date: string;
  day: string;
  hijriDate: string;
  checkIn: string;
  checkOut: string;
  workingHours: string;
  status: "Present" | "Late" | "Leave" | "On Duty";
  location: string;
}

export interface TeacherSalarySlip {
  slipNo: string;
  month: string;
  academicYear: string;
  basicSalary: number;
  conveyanceAllowance: number;
  hostelSupervisionAllowance: number;
  researchAllowance: number;
  grossSalary: number;
  providentFundDeduction: number;
  taxDeduction: number;
  totalDeductions: number;
  netSalary: number;
  paymentStatus: "Disbursed" | "Processing" | "Pending";
  paymentDate: string;
  paymentMode: string;
  bankAccount: string;
}

// 1. Teacher Profile Information
export const TEACHER_PROFILE_DETAILS = {
  teacherId: "TCH-004",
  name: "Maulana Aurang Zaib Rehman",
  arabicTitle: "الشيخ مولانا أورنك زيب رحمن",
  designation: "Senior Ustadh (Shaykh-ul-Lughah & Fiqh)",
  department: "Department of Dars-e-Nizami",
  qualification: "Al-Alimiyyah (Wifaq-ul-Madaris) & M.A Islamic Studies",
  email: "teacher@madrassa.com",
  phone: "+92 300 9876543",
  joiningDate: "15-Shaban-1440 AH (April 2019)",
  experience: "8+ Years Teaching Islamic Sciences",
  officeLocation: "Asatidha Block A — Room 204",
  assignedClasses: [
    "Darja Saniya (Year 2) - Section A",
    "Darja Saniya (Year 2) - Section B",
    "Darja Oola (Year 1) - Section B",
    "Darja Thalitha (Year 3) - Section A",
  ],
  assignedCourses: [
    { code: "SARF-201", title: "Ilm-us-Sarf", darja: "Darja Saniya", periodsPerWeek: 6 },
    { code: "NAHW-102", title: "Nahw Mir", darja: "Darja Oola", periodsPerWeek: 5 },
    { code: "FIQH-203", title: "Noor-ul-Idhah", darja: "Darja Saniya", periodsPerWeek: 5 },
    { code: "LIT-304", title: "Al-Qiraat-ul-Wadhiha", darja: "Darja Thalitha", periodsPerWeek: 4 },
  ],
};

// 2. Weekly Timetable Matrix with free periods & continuous teaching
export const TEACHER_WEEKLY_MATRIX: TeacherWeeklyMatrixRow[] = [
  {
    periodNumber: 1,
    periodLabel: "Period 1",
    timeSlot: "07:00 – 07:45",
    isBreak: false,
    days: {
      MONDAY: {
        isFree: false,
        subject: "Ilm-us-Sarf",
        arabicName: "علم الصرف",
        darja: "Darja Saniya (Sec A)",
        room: "Hall Abu Bakr (Room 101)",
        studentCount: 38,
        topic: "Bab-ut-Taf'eel & Abwab-us-Sarf",
      },
      TUESDAY: {
        isFree: false,
        subject: "Ilm-us-Sarf",
        arabicName: "علم الصرف",
        darja: "Darja Saniya (Sec A)",
        room: "Hall Abu Bakr (Room 101)",
        studentCount: 38,
        topic: "Mutallat & Mustaqqat Review",
      },
      WEDNESDAY: {
        isFree: false,
        subject: "Ilm-us-Sarf",
        arabicName: "علم الصرف",
        darja: "Darja Saniya (Sec A)",
        room: "Hall Abu Bakr (Room 101)",
        studentCount: 38,
        topic: "As-Sahih wal-Mu'tall Exercises",
      },
      THURSDAY: {
        isFree: false,
        subject: "Ilm-us-Sarf",
        arabicName: "علم الصرف",
        darja: "Darja Saniya (Sec A)",
        room: "Hall Abu Bakr (Room 101)",
        studentCount: 38,
        topic: "Qawaid-us-Sarf Practice",
      },
      FRIDAY: {
        isFree: false,
        subject: "Ilm-us-Sarf",
        arabicName: "علم الصرف",
        darja: "Darja Saniya (Sec A)",
        room: "Hall Abu Bakr (Room 101)",
        studentCount: 38,
        topic: "Weekly Morphological Assessment",
      },
      SATURDAY: {
        isFree: false,
        subject: "Ilm-us-Sarf",
        arabicName: "علم الصرف",
        darja: "Darja Saniya (Sec A)",
        room: "Hall Abu Bakr (Room 101)",
        studentCount: 38,
        topic: "Gardan & I'rab Drill",
      },
    },
  },
  {
    periodNumber: 2,
    periodLabel: "Period 2",
    timeSlot: "07:45 – 08:30",
    isBreak: false,
    days: {
      MONDAY: {
        isFree: true,
        freeTitle: "Free Period / Lesson Preparation",
        room: "Asatidha Block A",
        notes: "Syllabus review & Tas-heeh of student homework",
      },
      TUESDAY: {
        isFree: true,
        freeTitle: "Free Period / Lesson Preparation",
        room: "Asatidha Block A",
        notes: "Research on Hadith commentary",
      },
      WEDNESDAY: {
        isFree: true,
        freeTitle: "Free Period / Office Hour",
        room: "Asatidha Block A",
        notes: "Student consultation & Darja counseling",
      },
      THURSDAY: {
        isFree: true,
        freeTitle: "Free Period / Lesson Preparation",
        room: "Asatidha Block A",
        notes: "Curriculum progression record keeping",
      },
      FRIDAY: {
        isFree: true,
        freeTitle: "Free Period / Office Hour",
        room: "Asatidha Block A",
        notes: "Weekly exam checking & grading",
      },
      SATURDAY: {
        isFree: true,
        freeTitle: "Free Period / Departmental Coordination",
        room: "Department Office",
        notes: "Meeting with Shoba Dars-e-Nizami faculty",
      },
    },
  },
  {
    periodNumber: 3,
    periodLabel: "Period 3",
    timeSlot: "08:30 – 09:15",
    isBreak: false,
    days: {
      MONDAY: {
        isFree: false,
        subject: "Nahw Mir",
        arabicName: "نحو مير",
        darja: "Darja Oola (Sec B)",
        room: "Room 104",
        studentCount: 42,
        topic: "Huroof-ul-Jarr & I'rab",
      },
      TUESDAY: {
        isFree: false,
        subject: "Nahw Mir",
        arabicName: "نحو مير",
        darja: "Darja Oola (Sec B)",
        room: "Room 104",
        studentCount: 42,
        topic: "Tarkib of Ayaat-e-Quraniyyah",
      },
      WEDNESDAY: {
        isFree: false,
        subject: "Nahw Mir",
        arabicName: "نحو مير",
        darja: "Darja Oola (Sec B)",
        room: "Room 104",
        studentCount: 42,
        topic: "Mabniyyat & Asma-e-Af'al",
      },
      THURSDAY: {
        isFree: false,
        subject: "Nahw Mir",
        arabicName: "نحو مير",
        darja: "Darja Oola (Sec B)",
        room: "Room 104",
        studentCount: 42,
        topic: "Al-Jumlah Al-Ismiyyah Syntax",
      },
      FRIDAY: {
        isFree: false,
        subject: "Nahw Mir",
        arabicName: "نحو مير",
        darja: "Darja Oola (Sec B)",
        room: "Room 104",
        studentCount: 42,
        topic: "Syntax Diagnostic Quiz",
      },
      SATURDAY: {
        isFree: false,
        subject: "Nahw Mir",
        arabicName: "نحو مير",
        darja: "Darja Oola (Sec B)",
        room: "Room 104",
        studentCount: 42,
        topic: "Tarkib Workshop & Student Practice",
      },
    },
  },
  {
    periodNumber: 4,
    periodLabel: "Period 4",
    timeSlot: "09:15 – 10:00",
    isBreak: false,
    days: {
      MONDAY: {
        isFree: false,
        subject: "Noor-ul-Idhah",
        arabicName: "نور الإيضاح",
        darja: "Darja Saniya (Sec B)",
        room: "Hall Uthman (Room 201)",
        studentCount: 36,
        topic: "Kitab-ut-Taharah: Awza-ul-Wudu",
      },
      TUESDAY: {
        isFree: false,
        subject: "Noor-ul-Idhah",
        arabicName: "نور الإيضاح",
        darja: "Darja Saniya (Sec B)",
        room: "Hall Uthman (Room 201)",
        studentCount: 36,
        topic: "Sunan-ul-Ghusl & Farayid",
      },
      WEDNESDAY: {
        isFree: false,
        subject: "Noor-ul-Idhah",
        arabicName: "نور الإيضاح",
        darja: "Darja Saniya (Sec B)",
        room: "Hall Uthman (Room 201)",
        studentCount: 36,
        topic: "Nawaqid-ul-Wudu Masail",
      },
      THURSDAY: {
        isFree: false,
        subject: "Noor-ul-Idhah",
        arabicName: "نور الإيضاح",
        darja: "Darja Saniya (Sec B)",
        room: "Hall Uthman (Room 201)",
        studentCount: 36,
        topic: "Kitab-us-Salah: Shurut-us-Salah",
      },
      FRIDAY: {
        isFree: false,
        subject: "Noor-ul-Idhah",
        arabicName: "نور الإيضاح",
        darja: "Darja Saniya (Sec B)",
        room: "Hall Uthman (Room 201)",
        studentCount: 36,
        topic: "Arkan-us-Salah & Wajibat",
      },
      SATURDAY: {
        isFree: false,
        subject: "Noor-ul-Idhah",
        arabicName: "نور الإيضاح",
        darja: "Darja Saniya (Sec B)",
        room: "Hall Uthman (Room 201)",
        studentCount: 36,
        topic: "Practical Demonstration of Fiqhi Rules",
      },
    },
  },
  {
    periodNumber: 5,
    periodLabel: "Period 5",
    timeSlot: "10:00 – 11:00",
    isBreak: true,
    days: {
      MONDAY: { isFree: true, isBreak: true, freeTitle: "LUNCH & DUHR RECESS" },
      TUESDAY: { isFree: true, isBreak: true, freeTitle: "LUNCH & DUHR RECESS" },
      WEDNESDAY: { isFree: true, isBreak: true, freeTitle: "LUNCH & DUHR RECESS" },
      THURSDAY: { isFree: true, isBreak: true, freeTitle: "LUNCH & DUHR RECESS" },
      FRIDAY: { isFree: true, isBreak: true, freeTitle: "LUNCH & JUMU'AH RECESS" },
      SATURDAY: { isFree: true, isBreak: true, freeTitle: "LUNCH & DUHR RECESS" },
    },
  },
  {
    periodNumber: 6,
    periodLabel: "Period 6",
    timeSlot: "11:00 – 11:45",
    isBreak: false,
    days: {
      MONDAY: {
        isFree: false,
        subject: "Al-Qiraat-ul-Wadhiha",
        arabicName: "القراءة الواضحة",
        darja: "Darja Thalitha (Sec A)",
        room: "Room 202",
        studentCount: 34,
        topic: "Dars 14: Akhlaq-un-Nabi ﷺ",
      },
      TUESDAY: {
        isFree: false,
        subject: "Al-Qiraat-ul-Wadhiha",
        arabicName: "القراءة الواضحة",
        darja: "Darja Thalitha (Sec A)",
        room: "Room 202",
        studentCount: 34,
        topic: "Dars 15: Al-Adab fil-Islam",
      },
      WEDNESDAY: {
        isFree: false,
        subject: "Al-Qiraat-ul-Wadhiha",
        arabicName: "القراءة الواضحة",
        darja: "Darja Thalitha (Sec A)",
        room: "Room 202",
        studentCount: 34,
        topic: "Dars 16: Hikayat-us-Salaf",
      },
      THURSDAY: {
        isFree: false,
        subject: "Al-Qiraat-ul-Wadhiha",
        arabicName: "القراءة الواضحة",
        darja: "Darja Thalitha (Sec A)",
        room: "Room 202",
        studentCount: 34,
        topic: "Arabic Composition & Dictation",
      },
      FRIDAY: {
        isFree: true,
        freeTitle: "Free Period / Jumu'ah Prep",
        room: "Central Masjid",
        notes: "Khutbah preparation & congregational supervision",
      },
      SATURDAY: {
        isFree: false,
        subject: "Al-Qiraat-ul-Wadhiha",
        arabicName: "القراءة الواضحة",
        darja: "Darja Thalitha (Sec A)",
        room: "Room 202",
        studentCount: 34,
        topic: "Reading Fluency & Vocabulary Test",
      },
    },
  },
  {
    periodNumber: 7,
    periodLabel: "Period 7",
    timeSlot: "11:45 – 12:30",
    isBreak: false,
    days: {
      MONDAY: {
        isFree: true,
        freeTitle: "Free Period / Student Consultation",
        room: "Room 204",
        notes: "Individual student guidance & memorization help",
      },
      TUESDAY: {
        isFree: true,
        freeTitle: "Free Period / Office Hour",
        room: "Room 204",
        notes: "Academic administrative logs & records",
      },
      WEDNESDAY: {
        isFree: true,
        freeTitle: "Free Period / Lesson Planning",
        room: "Room 204",
        notes: "Preparing weekly tests & handouts",
      },
      THURSDAY: {
        isFree: true,
        freeTitle: "Free Period / Tas-heeh Hour",
        room: "Room 204",
        notes: "Checking student exercise notebooks",
      },
      FRIDAY: {
        isFree: true,
        freeTitle: "Free Period / Weekly Wrap-up",
        room: "Faculty Room",
        notes: "End-of-week departmental reporting",
      },
      SATURDAY: {
        isFree: true,
        freeTitle: "Free Period / Staff Assembly",
        room: "Main Conference Hall",
        notes: "Faculty meeting & academic review",
      },
    },
  },
];

// 3. Initial Student Attendance Roster for Teacher's Classes
export const INITIAL_STUDENT_ROSTER: StudentAttendanceEntry[] = [
  {
    id: "std-001",
    rollNo: "24-DS-001",
    registrationNo: "REG-1446-0081",
    studentName: "Muhammad Abdullah Khan",
    fatherName: "Hafiz Muhammad Ibrahim",
    status: "Present",
    remarks: "On Time",
  },
  {
    id: "std-002",
    rollNo: "24-DS-002",
    registrationNo: "REG-1446-0082",
    studentName: "Abdul Rahman Siddiqui",
    fatherName: "Maulana Tariq Siddiqui",
    status: "Present",
    remarks: "Active in recitation",
  },
  {
    id: "std-003",
    rollNo: "24-DS-003",
    registrationNo: "REG-1446-0083",
    studentName: "Hamza Bin Tariq",
    fatherName: "Tariq Mehmood",
    status: "Late",
    remarks: "Arrived 10 mins late",
  },
  {
    id: "std-004",
    rollNo: "24-DS-004",
    registrationNo: "REG-1446-0084",
    studentName: "Usman Ali Farooqi",
    fatherName: "Ghulam Murtaza",
    status: "Present",
    remarks: "Completed homework",
  },
  {
    id: "std-005",
    rollNo: "24-DS-005",
    registrationNo: "REG-1446-0085",
    studentName: "Zubair Ahmad Qureshi",
    fatherName: "Noor Ahmad Qureshi",
    status: "Absent",
    remarks: "Unexcused absence",
  },
  {
    id: "std-006",
    rollNo: "24-DS-006",
    registrationNo: "REG-1446-0086",
    studentName: "Bilal Hassan Alvi",
    fatherName: "Muhammad Hassan",
    status: "Present",
    remarks: "On Time",
  },
  {
    id: "std-007",
    rollNo: "24-DS-007",
    registrationNo: "REG-1446-0087",
    studentName: "Saad Bin Ubadah",
    fatherName: "Hafiz Ubadahullah",
    status: "Leave",
    remarks: "Sick leave sanctioned",
  },
  {
    id: "std-008",
    rollNo: "24-DS-008",
    registrationNo: "REG-1446-0088",
    studentName: "Hafiz Talha Noor",
    fatherName: "Noor Muhammad",
    status: "Present",
    remarks: "On Time",
  },
  {
    id: "std-009",
    rollNo: "24-DS-009",
    registrationNo: "REG-1446-0089",
    studentName: "Anas Bin Malik",
    fatherName: "Malik Abdul Rauf",
    status: "Present",
    remarks: "On Time",
  },
  {
    id: "std-010",
    rollNo: "24-DS-010",
    registrationNo: "REG-1446-0090",
    studentName: "Zaid Bin Harithah",
    fatherName: "Harithah Iqbal",
    status: "Present",
    remarks: "Excellent recitation",
  },
];

// 4. Initial Student Marks Roster for Teacher's Classes
export const INITIAL_STUDENT_MARKS: StudentMarksEntry[] = [
  {
    id: "mrk-001",
    rollNo: "24-DS-001",
    registrationNo: "REG-1446-0081",
    studentName: "Muhammad Abdullah Khan",
    fatherName: "Hafiz Muhammad Ibrahim",
    totalMarks: 100,
    obtainedMarks: 94,
    percentage: 94.0,
    grade: "Mumtaz",
    remarks: "Top performer, outstanding morphological analysis",
  },
  {
    id: "mrk-002",
    rollNo: "24-DS-002",
    registrationNo: "REG-1446-0082",
    studentName: "Abdul Rahman Siddiqui",
    fatherName: "Maulana Tariq Siddiqui",
    totalMarks: 100,
    obtainedMarks: 88,
    percentage: 88.0,
    grade: "Mumtaz",
    remarks: "Very thorough understanding of Gardans",
  },
  {
    id: "mrk-003",
    rollNo: "24-DS-003",
    registrationNo: "REG-1446-0083",
    studentName: "Hamza Bin Tariq",
    fatherName: "Tariq Mehmood",
    totalMarks: 100,
    obtainedMarks: 78,
    percentage: 78.0,
    grade: "Jayyid Jiddan",
    remarks: "Good effort, needs minor revision on Mutallat",
  },
  {
    id: "mrk-004",
    rollNo: "24-DS-004",
    registrationNo: "REG-1446-0084",
    studentName: "Usman Ali Farooqi",
    fatherName: "Ghulam Murtaza",
    totalMarks: 100,
    obtainedMarks: 82,
    percentage: 82.0,
    grade: "Jayyid Jiddan",
    remarks: "Consistent academic performance",
  },
  {
    id: "mrk-005",
    rollNo: "24-DS-005",
    registrationNo: "REG-1446-0085",
    studentName: "Zubair Ahmad Qureshi",
    fatherName: "Noor Ahmad Qureshi",
    totalMarks: 100,
    obtainedMarks: 65,
    percentage: 65.0,
    grade: "Jayyid",
    remarks: "Satisfactory, requires additional practice",
  },
  {
    id: "mrk-006",
    rollNo: "24-DS-006",
    registrationNo: "REG-1446-0086",
    studentName: "Bilal Hassan Alvi",
    fatherName: "Muhammad Hassan",
    totalMarks: 100,
    obtainedMarks: 91,
    percentage: 91.0,
    grade: "Mumtaz",
    remarks: "Flawless grammar test execution",
  },
  {
    id: "mrk-007",
    rollNo: "24-DS-007",
    registrationNo: "REG-1446-0087",
    studentName: "Saad Bin Ubadah",
    fatherName: "Hafiz Ubadahullah",
    totalMarks: 100,
    obtainedMarks: 72,
    percentage: 72.0,
    grade: "Jayyid",
    remarks: "Missed two quizzes due to illness, re-examined",
  },
  {
    id: "mrk-008",
    rollNo: "24-DS-008",
    registrationNo: "REG-1446-0088",
    studentName: "Hafiz Talha Noor",
    fatherName: "Noor Muhammad",
    totalMarks: 100,
    obtainedMarks: 85,
    percentage: 85.0,
    grade: "Mumtaz",
    remarks: "Strong conceptual grasp of Sarf rules",
  },
  {
    id: "mrk-009",
    rollNo: "24-DS-009",
    registrationNo: "REG-1446-0089",
    studentName: "Anas Bin Malik",
    fatherName: "Malik Abdul Rauf",
    totalMarks: 100,
    obtainedMarks: 68,
    percentage: 68.0,
    grade: "Jayyid",
    remarks: "Average performance, advised for consultation",
  },
  {
    id: "mrk-010",
    rollNo: "24-DS-010",
    registrationNo: "REG-1446-0090",
    studentName: "Zaid Bin Harithah",
    fatherName: "Harithah Iqbal",
    totalMarks: 100,
    obtainedMarks: 95,
    percentage: 95.0,
    grade: "Mumtaz",
    remarks: "Exceptional grasp of Arabic morphology & syntax",
  },
];

// 5. Teacher's Personal Daily Attendance Log (For Profile "My Attendance" view)
export const TEACHER_OWN_ATTENDANCE_LOG: TeacherDailyAttendanceLog[] = [
  {
    id: "att-001",
    date: "10-Nov-2026",
    day: "Tuesday",
    hijriDate: "20 Rabi-ul-Thani 1447",
    checkIn: "06:48 AM",
    checkOut: "12:45 PM",
    workingHours: "5h 57m",
    status: "Present",
    location: "Main Gate Biometric Sensor #1",
  },
  {
    id: "att-002",
    date: "09-Nov-2026",
    day: "Monday",
    hijriDate: "19 Rabi-ul-Thani 1447",
    checkIn: "06:51 AM",
    checkOut: "12:40 PM",
    workingHours: "5h 49m",
    status: "Present",
    location: "Main Gate Biometric Sensor #1",
  },
  {
    id: "att-003",
    date: "08-Nov-2026",
    day: "Sunday",
    hijriDate: "18 Rabi-ul-Thani 1447",
    checkIn: "—",
    checkOut: "—",
    workingHours: "Weekly Off",
    status: "On Duty",
    location: "Hostel Supervision Shift",
  },
  {
    id: "att-004",
    date: "07-Nov-2026",
    day: "Saturday",
    hijriDate: "17 Rabi-ul-Thani 1447",
    checkIn: "06:45 AM",
    checkOut: "12:55 PM",
    workingHours: "6h 10m",
    status: "Present",
    location: "Asatidha Block Biometric #2",
  },
  {
    id: "att-005",
    date: "06-Nov-2026",
    day: "Friday",
    hijriDate: "16 Rabi-ul-Thani 1447",
    checkIn: "06:42 AM",
    checkOut: "01:30 PM",
    workingHours: "6h 48m",
    status: "Present",
    location: "Main Gate Biometric Sensor #1",
  },
  {
    id: "att-006",
    date: "05-Nov-2026",
    day: "Thursday",
    hijriDate: "15 Rabi-ul-Thani 1447",
    checkIn: "07:05 AM",
    checkOut: "12:35 PM",
    workingHours: "5h 30m",
    status: "Late",
    location: "Main Gate Biometric Sensor #1",
  },
  {
    id: "att-007",
    date: "04-Nov-2026",
    day: "Wednesday",
    hijriDate: "14 Rabi-ul-Thani 1447",
    checkIn: "06:49 AM",
    checkOut: "12:50 PM",
    workingHours: "6h 01m",
    status: "Present",
    location: "Main Gate Biometric Sensor #1",
  },
  {
    id: "att-008",
    date: "03-Nov-2026",
    day: "Tuesday",
    hijriDate: "13 Rabi-ul-Thani 1447",
    checkIn: "06:47 AM",
    checkOut: "12:45 PM",
    workingHours: "5h 58m",
    status: "Present",
    location: "Main Gate Biometric Sensor #1",
  },
];

// 6. Teacher's Salary & Payroll Slips (For Profile "My Salary" view)
export const TEACHER_SALARY_SLIPS: TeacherSalarySlip[] = [
  {
    slipNo: "SLP-1447-0404",
    month: "Rabi-ul-Thani 1447 AH (Nov 2026)",
    academicYear: "1446 - 1447 AH",
    basicSalary: 65000,
    conveyanceAllowance: 8000,
    hostelSupervisionAllowance: 7000,
    researchAllowance: 5000,
    grossSalary: 85000,
    providentFundDeduction: 4000,
    taxDeduction: 2500,
    totalDeductions: 6500,
    netSalary: 78500,
    paymentStatus: "Disbursed",
    paymentDate: "03-Nov-2026 (03 Rabi-ul-Thani)",
    paymentMode: "Direct Bank Transfer",
    bankAccount: "Meezan Islamic Bank — A/C 0204-01049281-01",
  },
  {
    slipNo: "SLP-1447-0304",
    month: "Rabi-ul-Awwal 1447 AH (Oct 2026)",
    academicYear: "1446 - 1447 AH",
    basicSalary: 65000,
    conveyanceAllowance: 8000,
    hostelSupervisionAllowance: 7000,
    researchAllowance: 5000,
    grossSalary: 85000,
    providentFundDeduction: 4000,
    taxDeduction: 2500,
    totalDeductions: 6500,
    netSalary: 78500,
    paymentStatus: "Disbursed",
    paymentDate: "02-Oct-2026 (02 Rabi-ul-Awwal)",
    paymentMode: "Direct Bank Transfer",
    bankAccount: "Meezan Islamic Bank — A/C 0204-01049281-01",
  },
  {
    slipNo: "SLP-1447-0204",
    month: "Safar 1447 AH (Sep 2026)",
    academicYear: "1446 - 1447 AH",
    basicSalary: 65000,
    conveyanceAllowance: 8000,
    hostelSupervisionAllowance: 7000,
    researchAllowance: 5000,
    grossSalary: 85000,
    providentFundDeduction: 4000,
    taxDeduction: 2500,
    totalDeductions: 6500,
    netSalary: 78500,
    paymentStatus: "Disbursed",
    paymentDate: "02-Sep-2026 (02 Safar)",
    paymentMode: "Direct Bank Transfer",
    bankAccount: "Meezan Islamic Bank — A/C 0204-01049281-01",
  },
  {
    slipNo: "SLP-1447-0104",
    month: "Muharram 1447 AH (Aug 2026)",
    academicYear: "1446 - 1447 AH",
    basicSalary: 65000,
    conveyanceAllowance: 8000,
    hostelSupervisionAllowance: 7000,
    researchAllowance: 5000,
    grossSalary: 85000,
    providentFundDeduction: 4000,
    taxDeduction: 2500,
    totalDeductions: 6500,
    netSalary: 78500,
    paymentStatus: "Disbursed",
    paymentDate: "03-Aug-2026 (03 Muharram)",
    paymentMode: "Direct Bank Transfer",
    bankAccount: "Meezan Islamic Bank — A/C 0204-01049281-01",
  },
];

