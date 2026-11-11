import { Route, BrowserRouter as Router, Routes } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import PublicLayout from "./layout/public/PublicLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Public Pages
import PublicHome from "./pages/Public/Home";
import About from "./pages/Public/About";
import Courses from "./pages/Public/Courses";
import Teachers from "./pages/Public/Teachers";
import Admission from "./pages/Public/Admission";
import Fundraising from "./pages/Public/Fundraising";
import Contact from "./pages/Public/Contact";

// Auth Pages
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Unauthorized from "./pages/OtherPage/Unauthorized";

// Dashboard & Internal Pages
import DashboardHome from "./pages/Dashboard/Ecommerce";
import AdminAttendancePage from "./pages/Admin/AdminAttendancePage";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import Blank from "./pages/OtherPage/Blank";
import NotFound from "./pages/OtherPage/NotFound";

// Charts
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";

// Student Portal Pages
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentResults from "./pages/Student/StudentResults";
import StudentFeeRecord from "./pages/Student/StudentFeeRecord";
import StudentAttendance from "./pages/Student/StudentAttendance";

// Teacher Portal Pages
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import TeacherAttendancePage from "./pages/Teacher/TeacherAttendancePage";
import TeacherResultsPage from "./pages/Teacher/TeacherResultsPage";

// UI Elements
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Website Layout (Accessible without login) */}
          <Route element={<PublicLayout />}>
            <Route index path="/" element={<PublicHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/admissions" element={<Admission />} />
            <Route path="/fundraising" element={<Fundraising />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Authenticated Dashboard Layout (Protected by RBAC Route Guard) */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/attendance" element={<AdminAttendancePage />} />

            {/* Student Portal Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/results" element={<StudentResults />} />
            <Route path="/student/fees" element={<StudentFeeRecord />} />
            <Route path="/student/attendance" element={<StudentAttendance />} />

            {/* Teacher Portal Routes */}
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/attendance" element={<TeacherAttendancePage />} />
            <Route path="/teacher/results" element={<TeacherResultsPage />} />

            {/* Other Pages */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* UI Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout Pages */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Access Control Forbidden Page */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
