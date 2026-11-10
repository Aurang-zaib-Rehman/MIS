/**
 * Phase 3 Automated Verification Test Suite
 * Comprehensive Independent Verification for Authentication & RBAC
 */

import assert from "node:assert/strict";

// Mock localStorage environment for Node.js test runner
const localStorageStore = new Map();
globalThis.localStorage = {
  getItem: (key) => localStorageStore.get(key) ?? null,
  setItem: (key, val) => localStorageStore.set(key, String(val)),
  removeItem: (key) => localStorageStore.delete(key),
  clear: () => localStorageStore.clear(),
};

export async function runTests() {
  console.log("=================================================");
  console.log("  PHASE 3: COMPREHENSIVE VERIFICATION SUITE");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function test(description, fn) {
    try {
      fn();
      console.log(`[PASS] ${description}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${description}`);
      console.error(err);
      failed++;
    }
  }

  async function asyncTest(description, fn) {
    try {
      await fn();
      console.log(`[PASS] ${description}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${description}`);
      console.error(err);
      failed++;
    }
  }

  // 1. Module Imports
  const { AuthService, AUTH_STORAGE_KEY } = await import("./src/services/authService.ts");
  const { DEMO_ACCOUNTS, MOCK_USERS } = await import("./src/services/mockAuthData.ts");
  const {
    ROLE_PERMISSIONS,
    ROLE_DEFAULT_REDIRECTS,
    ROUTE_ROLE_ACCESS,
    hasRolePermission,
    isRouteAuthorizedForRole,
  } = await import("./src/config/permissions.ts");

  // =========================================================================
  // SUITE 1: Predefined Demo Accounts & Roles
  // =========================================================================
  test("1.1 Exactly three roles must be defined (ADMIN, TEACHER, STUDENT)", () => {
    const roles = Object.keys(ROLE_PERMISSIONS);
    assert.deepEqual(roles.sort(), ["ADMIN", "STUDENT", "TEACHER"]);
  });

  test("1.2 Demo accounts match required development credentials", () => {
    assert.equal(DEMO_ACCOUNTS.ADMIN.email, "admin@madrassa.com");
    assert.equal(DEMO_ACCOUNTS.ADMIN.password, "Admin@123");
    assert.equal(DEMO_ACCOUNTS.ADMIN.role, "ADMIN");

    assert.equal(DEMO_ACCOUNTS.TEACHER.email, "teacher@madrassa.com");
    assert.equal(DEMO_ACCOUNTS.TEACHER.password, "Teacher@123");
    assert.equal(DEMO_ACCOUNTS.TEACHER.role, "TEACHER");

    assert.equal(DEMO_ACCOUNTS.STUDENT.email, "student@madrassa.com");
    assert.equal(DEMO_ACCOUNTS.STUDENT.password, "Student@123");
    assert.equal(DEMO_ACCOUNTS.STUDENT.role, "STUDENT");
  });

  // =========================================================================
  // SUITE 2: Authentication Flows for All 3 Accounts
  // =========================================================================
  await asyncTest("2.1 Admin login creates session, landing route /dashboard, excludes password", async () => {
    localStorage.clear();
    const session = await AuthService.login({
      email: "admin@madrassa.com",
      password: "Admin@123",
    });

    assert.equal(session.role, "ADMIN");
    assert.equal(session.email, "admin@madrassa.com");
    assert.equal(ROLE_DEFAULT_REDIRECTS[session.role], "/dashboard");
    assert.equal("passwordHash" in session, false);
    assert.equal("password" in session, false);

    // Verify localStorage persistence
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    assert.notEqual(raw, null);
    const stored = JSON.parse(raw);
    assert.equal(stored.role, "ADMIN");
    assert.equal(stored.userId, session.userId);
    assert.equal("password" in stored, false);
    assert.equal("passwordHash" in stored, false);
  });

  await asyncTest("2.2 Teacher login creates session, landing route /calendar, includes teacherProfile", async () => {
    localStorage.clear();
    const session = await AuthService.login({
      email: "teacher@madrassa.com",
      password: "Teacher@123",
    });

    assert.equal(session.role, "TEACHER");
    assert.equal(ROLE_DEFAULT_REDIRECTS[session.role], "/calendar");
    assert.equal(session.teacherProfile?.teacherId, "TCH-004");
    assert.equal(Array.isArray(session.teacherProfile?.assignedClasses), true);
    assert.equal("password" in session, false);
  });

  await asyncTest("2.3 Student login creates session, landing route /profile, includes studentProfile", async () => {
    localStorage.clear();
    const session = await AuthService.login({
      email: "student@madrassa.com",
      password: "Student@123",
    });

    assert.equal(session.role, "STUDENT");
    assert.equal(ROLE_DEFAULT_REDIRECTS[session.role], "/profile");
    assert.equal(session.studentProfile?.studentId, "STD-1447-042");
    assert.equal(session.studentProfile?.darja, "Darja Saniya (Year 2)");
    assert.equal("password" in session, false);
  });

  await asyncTest("2.4 Invalid password is rejected with informative error", async () => {
    await assert.rejects(
      async () => {
        await AuthService.login({
          email: "admin@madrassa.com",
          password: "WrongPassword999",
        });
      },
      {
        message: "Invalid email or password. Please verify your credentials.",
      }
    );
  });

  await asyncTest("2.5 Unregistered email is rejected with informative error", async () => {
    await assert.rejects(
      async () => {
        await AuthService.login({
          email: "unknown@madrassa.com",
          password: "Admin@123",
        });
      },
      {
        message: "Invalid email or password. Please verify your credentials.",
      }
    );
  });

  await asyncTest("2.6 Empty credentials are rejected immediately", async () => {
    await assert.rejects(
      async () => {
        await AuthService.login({ email: "", password: "" });
      },
      {
        message: "Email and password are required.",
      }
    );
  });

  // =========================================================================
  // SUITE 3: Session Lifecycle, Restoration & Corruption Purging
  // =========================================================================
  await asyncTest("3.1 Refresh / reload restores active session accurately", async () => {
    localStorage.clear();
    await AuthService.login({
      email: "teacher@madrassa.com",
      password: "Teacher@123",
    });

    // Simulating browser reload: calling getCurrentSession from storage
    const reloaded = AuthService.getCurrentSession();
    assert.notEqual(reloaded, null);
    assert.equal(reloaded?.role, "TEACHER");
    assert.equal(reloaded?.teacherProfile?.teacherId, "TCH-004");
  });

  await asyncTest("3.2 Logout cleanly clears authentication session from localStorage", async () => {
    await AuthService.logout();
    const reloaded = AuthService.getCurrentSession();
    assert.equal(reloaded, null);
    assert.equal(localStorage.getItem(AUTH_STORAGE_KEY), null);
  });

  test("3.3 Valid session schema validation passes", () => {
    const valid = {
      userId: "usr_001",
      name: "Test User",
      email: "test@madrassa.com",
      role: "ADMIN",
      avatar: "/avatar.png",
      loginTimestamp: Date.now(),
    };
    assert.equal(AuthService.validateSession(valid), true);
  });

  test("3.4 Tampered role string outside valid enum fails validation", () => {
    const tampered = {
      userId: "usr_001",
      name: "Hacker",
      email: "hacker@test.com",
      role: "SUPER_ADMIN_ROOT",
      avatar: "/avatar.png",
      loginTimestamp: Date.now(),
    };
    assert.equal(AuthService.validateSession(tampered), false);
  });

  test("3.5 Incomplete session object fails validation", () => {
    assert.equal(AuthService.validateSession({ userId: "usr_001" }), false);
    assert.equal(AuthService.validateSession(null), false);
    assert.equal(AuthService.validateSession("string-data"), false);
  });

  test("3.6 Corrupted JSON in localStorage is purged safely without application crash", () => {
    localStorage.setItem(AUTH_STORAGE_KEY, "INVALID_NON_JSON_CORRUPTED_STRING{{{");
    const restored = AuthService.getCurrentSession();
    assert.equal(restored, null);
    assert.equal(localStorage.getItem(AUTH_STORAGE_KEY), null);
  });

  // =========================================================================
  // SUITE 4: Role-Based Access Control (RBAC) Permissions
  // =========================================================================
  test("4.1 ADMIN possesses superuser administrative permissions", () => {
    assert.equal(hasRolePermission("ADMIN", "manage:students"), true);
    assert.equal(hasRolePermission("ADMIN", "manage:admissions"), true);
    assert.equal(hasRolePermission("ADMIN", "manage:payroll"), true);
    assert.equal(hasRolePermission("ADMIN", "manage:examinations"), true);
    assert.equal(hasRolePermission("ADMIN", "manage:fees"), true);
    assert.equal(hasRolePermission("ADMIN", "manage:settings"), true);
  });

  test("4.2 TEACHER possesses academic permissions, strictly denied payroll & fees", () => {
    assert.equal(hasRolePermission("TEACHER", "mark:student_attendance"), true);
    assert.equal(hasRolePermission("TEACHER", "enter:student_marks"), true);
    assert.equal(hasRolePermission("TEACHER", "view:assigned_classes"), true);
    assert.equal(hasRolePermission("TEACHER", "view:teacher_timetable"), true);

    // Explicitly denied permissions
    assert.equal(hasRolePermission("TEACHER", "manage:payroll"), false);
    assert.equal(hasRolePermission("TEACHER", "manage:fees"), false);
    assert.equal(hasRolePermission("TEACHER", "manage:expenses"), false);
    assert.equal(hasRolePermission("TEACHER", "manage:settings"), false);
    assert.equal(hasRolePermission("TEACHER", "manage:users"), false);
  });

  test("4.3 STUDENT possesses only self-service permissions, strictly denied staff actions", () => {
    assert.equal(hasRolePermission("STUDENT", "view:own_student_profile"), true);
    assert.equal(hasRolePermission("STUDENT", "view:own_examination_results"), true);
    assert.equal(hasRolePermission("STUDENT", "view:own_fee_challans"), true);
    assert.equal(hasRolePermission("STUDENT", "view:own_outstanding_dues"), true);

    // Explicitly denied permissions
    assert.equal(hasRolePermission("STUDENT", "mark:student_attendance"), false);
    assert.equal(hasRolePermission("STUDENT", "enter:student_marks"), false);
    assert.equal(hasRolePermission("STUDENT", "view:assigned_classes"), false);
    assert.equal(hasRolePermission("STUDENT", "manage:students"), false);
    assert.equal(hasRolePermission("STUDENT", "manage:payroll"), false);
  });

  test("4.4 Unknown permissions are denied by default for all roles", () => {
    assert.equal(hasRolePermission("ADMIN", "manage:non_existent_module"), false);
    assert.equal(hasRolePermission("TEACHER", "manage:non_existent_module"), false);
    assert.equal(hasRolePermission("STUDENT", "manage:non_existent_module"), false);
  });

  // =========================================================================
  // SUITE 5: Direct URL Access Control & Unknown Route Handling
  // =========================================================================
  test("5.1 Unknown / unmapped routes are denied by default for ALL roles (including ADMIN)", () => {
    // Crucial security requirement: unmapped routes are NEVER authorized by default
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/unmapped-route"), false);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/dashboard/unknown-page"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/unmapped-route"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/unmapped-route"), false);
  });

  test("5.2 ADMIN is authorized ONLY for explicitly registered application routes", () => {
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/dashboard"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/line-chart"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/bar-chart"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/alerts"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/avatars"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/badge"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/buttons"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/images"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/calendar"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/profile"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/form-elements"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/basic-tables"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/blank"), true);
  });

  test("5.3 Generic template pages (/form-elements, /basic-tables, /blank) are denied to TEACHER and STUDENT", () => {
    // Template showcases must not expose mock corporate data to teachers or students
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/form-elements"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/basic-tables"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/blank"), false);

    assert.equal(isRouteAuthorizedForRole("STUDENT", "/form-elements"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/basic-tables"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/blank"), false);
  });

  test("5.4 TEACHER direct URL access — Allowed only genuine academic routes (/calendar, /profile)", () => {
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/calendar"), true);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/profile"), true);

    // Blocked from admin and template modules
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/dashboard"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/line-chart"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/bar-chart"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/alerts"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/badge"), false);
  });

  test("5.5 STUDENT direct URL access — Allowed only student portal routes (/profile, /calendar)", () => {
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/profile"), true);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/calendar"), true);

    // Blocked from staff and admin modules
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/dashboard"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/form-elements"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/basic-tables"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/line-chart"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/alerts"), false);
  });

  // =========================================================================
  // SUITE 6: Trailing Slash URL Normalization
  // =========================================================================
  test("6.1 URL path normalization handles trailing slashes consistently", () => {
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/calendar/"), true);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/profile/"), true);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/dashboard/"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/dashboard/"), false);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/unmapped-route/"), false);
  });

  // =========================================================================
  // SUITE 7: Data Isolation Verification
  // =========================================================================
  test("7.1 Student data isolation — Student can NEVER view peer student records", () => {
    const studentSession = {
      userId: "usr_student_001",
      name: "Muhammad Abdullah Khan",
      email: "student@madrassa.com",
      role: "STUDENT",
      avatar: "/avatar.png",
      loginTimestamp: Date.now(),
      studentProfile: {
        studentId: "STD-1447-042",
        rollNo: "1447/042",
        darja: "Darja Saniya (Year 2)",
        department: "Shoba-e-Dars-e-Nizami",
        guardianName: "Hafiz Muhammad Ibrahim",
        admissionYear: 2024,
      },
    };

    const records = AuthService.getStudentRecords(studentSession);
    assert.equal(records.length, 1);
    assert.equal(records[0].studentId, "STD-1447-042");
    assert.equal(records[0].studentName, "Muhammad Abdullah Khan");

    // Confirms peer student record (STD-1447-099) is NOT leaked
    const leakedRecords = records.filter((r) => r.studentId === "STD-1447-099");
    assert.equal(leakedRecords.length, 0);
  });

  test("7.2 Teacher data isolation — Teacher can NEVER view unassigned classes", () => {
    const teacherSession = {
      userId: "usr_teacher_001",
      name: "Maulana Aurang Zaib Rehman",
      email: "teacher@madrassa.com",
      role: "TEACHER",
      avatar: "/avatar.png",
      loginTimestamp: Date.now(),
      teacherProfile: {
        teacherId: "TCH-004",
        designation: "Senior Instructor",
        department: "Dars-e-Nizami",
        assignedClasses: ["Class 1A (Darja Oola)", "Class 2B (Darja Saani)"],
        assignedCourses: ["Ilm-us-Sarf", "Nahw"],
      },
    };

    const attendanceRecords = AuthService.getClassAttendanceRecords(teacherSession);
    assert.equal(attendanceRecords.length, 1);
    assert.equal(attendanceRecords[0].teacherId, "TCH-004");
    assert.equal(attendanceRecords[0].courseName, "Ilm-us-Sarf");

    // Confirms other teacher's class (TCH-009) is NOT leaked
    const leakedAttendance = attendanceRecords.filter((a) => a.teacherId === "TCH-009");
    assert.equal(leakedAttendance.length, 0);
  });

  test("7.3 Admin data access — Admin has complete visibility across all records", () => {
    const adminSession = {
      userId: "usr_admin_001",
      name: "Admin",
      email: "admin@madrassa.com",
      role: "ADMIN",
      avatar: "/avatar.png",
      loginTimestamp: Date.now(),
    };

    const allStudents = AuthService.getStudentRecords(adminSession);
    const allAttendance = AuthService.getClassAttendanceRecords(adminSession);

    assert.equal(allStudents.length, 2);
    assert.equal(allAttendance.length, 2);
  });

  // =========================================================================
  // SUITE 8: localStorage Tampering Simulation (Honest Architectural Reality)
  // =========================================================================
  await asyncTest("8.1 Modifying stored role in localStorage demonstrates client-side limitations", async () => {
    localStorage.clear();
    // 1. Log in as Student
    await AuthService.login({
      email: "student@madrassa.com",
      password: "Student@123",
    });

    // 2. Inspect session
    const original = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
    assert.equal(original.role, "STUDENT");

    // 3. Simulate DevTools tampering: change role to "ADMIN"
    original.role = "ADMIN";
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(original));

    // 4. Simulate page reload
    const reloaded = AuthService.getCurrentSession();

    // 5. Honest observation: In a frontend-only mock implementation without backend JWT/signature,
    // the frontend accepts the client-modified role.
    assert.equal(reloaded?.role, "ADMIN");
    // This confirms real server-side authorization will be mandatory once the backend is developed!
  });

  console.log("\n=================================================");
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    throw new Error(`${failed} tests failed`);
  }
}
