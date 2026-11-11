/**
 * Phase 3 Automated Verification Test Suite
 * Updated for Direct 1-Click Role Access (No Mock Passwords / No localStorage Credentials)
 */

import assert from "node:assert/strict";

// Mock localStorage and sessionStorage for Node.js test environment
const localStorageStore = new Map();
globalThis.localStorage = {
  getItem: (key) => localStorageStore.get(key) ?? null,
  setItem: (key, val) => localStorageStore.set(key, String(val)),
  removeItem: (key) => localStorageStore.delete(key),
  clear: () => localStorageStore.clear(),
};

const sessionStorageStore = new Map();
globalThis.sessionStorage = {
  getItem: (key) => sessionStorageStore.get(key) ?? null,
  setItem: (key, val) => sessionStorageStore.set(key, String(val)),
  removeItem: (key) => sessionStorageStore.delete(key),
  clear: () => sessionStorageStore.clear(),
};

export async function runTests() {
  console.log("=================================================");
  console.log("  PHASE 3: DIRECT ROLE ACCESS VERIFICATION SUITE");
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
  const { AuthService, DEV_ROLE_SESSION_KEY, LEGACY_STORAGE_KEY } = await import("./src/services/authService.ts");
  const { ROLE_PROFILES, DEMO_ROLES } = await import("./src/services/mockAuthData.ts");
  const {
    ROLE_PERMISSIONS,
    ROLE_DEFAULT_REDIRECTS,
    ROUTE_ROLE_ACCESS,
    hasRolePermission,
    isRouteAuthorizedForRole,
  } = await import("./src/config/permissions.ts");

  // =========================================================================
  // SUITE 1: Predefined Roles & Elimination of Passwords
  // =========================================================================
  test("1.1 Exactly three roles must be defined (ADMIN, TEACHER, STUDENT)", () => {
    const roles = Object.keys(ROLE_PERMISSIONS);
    assert.deepEqual(roles.sort(), ["ADMIN", "STUDENT", "TEACHER"]);
    assert.deepEqual([...DEMO_ROLES].sort(), ["ADMIN", "STUDENT", "TEACHER"]);
  });

  test("1.2 No passwords or credential hashes exist in role profiles", () => {
    for (const role of ["ADMIN", "TEACHER", "STUDENT"]) {
      const profile = ROLE_PROFILES[role];
      assert.notEqual(profile, undefined);
      assert.equal("password" in profile, false);
      assert.equal("passwordHash" in profile, false);
      assert.equal(profile.role, role);
    }
  });

  // =========================================================================
  // SUITE 2: 1-Click Direct Role Login (No Login Credentials Needed)
  // =========================================================================
  test("2.1 Admin 1-click role activation creates session and lands at /dashboard", () => {
    sessionStorage.clear();
    const session = AuthService.loginAsRole("ADMIN");

    assert.equal(session.role, "ADMIN");
    assert.equal(session.email, "admin@madrassa.com");
    assert.equal(ROLE_DEFAULT_REDIRECTS[session.role], "/dashboard");
    assert.equal("password" in session, false);
    assert.equal("passwordHash" in session, false);
  });

  test("2.2 Teacher 1-click role activation creates session and lands at /teacher/dashboard", () => {
    sessionStorage.clear();
    const session = AuthService.loginAsRole("TEACHER");

    assert.equal(session.role, "TEACHER");
    assert.equal(session.email, "teacher@madrassa.com");
    assert.equal(ROLE_DEFAULT_REDIRECTS[session.role], "/teacher/dashboard");
    assert.equal(session.teacherProfile?.teacherId, "TCH-004");
    assert.equal(Array.isArray(session.teacherProfile?.assignedClasses), true);
  });

  test("2.3 Student 1-click role activation creates session and lands at /student/dashboard", () => {
    sessionStorage.clear();
    const session = AuthService.loginAsRole("STUDENT");

    assert.equal(session.role, "STUDENT");
    assert.equal(session.email, "student@madrassa.com");
    assert.equal(ROLE_DEFAULT_REDIRECTS[session.role], "/student/dashboard");
    assert.equal(session.studentProfile?.studentId, "STD-1447-042");
    assert.equal(session.studentProfile?.darja, "Darja Saniya (Year 2)");
  });

  // =========================================================================
  // SUITE 3: Storage Verification — Permanent Removal from localStorage
  // =========================================================================
  test("3.1 localStorage NEVER contains login session, passwords, or signup data", () => {
    // Populate legacy key to simulate old state
    localStorage.setItem(LEGACY_STORAGE_KEY, "old-legacy-data");

    // Any auth action permanently purges legacy storage
    AuthService.loginAsRole("ADMIN");
    assert.equal(localStorage.getItem(LEGACY_STORAGE_KEY), null);
    assert.equal(localStorage.getItem("madrassa_auth_session_v1"), null);
  });

  test("3.2 Active role is retained in sessionStorage for browser refreshes", () => {
    sessionStorage.clear();
    AuthService.loginAsRole("TEACHER");

    // Simulating page refresh by retrieving current session
    const current = AuthService.getCurrentSession();
    assert.notEqual(current, null);
    assert.equal(current?.role, "TEACHER");
    assert.equal(sessionStorage.getItem(DEV_ROLE_SESSION_KEY), "TEACHER");
  });

  await asyncTest("3.3 Logout cleanly purges all session state", async () => {
    await AuthService.logout();
    const current = AuthService.getCurrentSession();
    assert.equal(current, null);
    assert.equal(sessionStorage.getItem(DEV_ROLE_SESSION_KEY), null);
    assert.equal(localStorage.getItem(LEGACY_STORAGE_KEY), null);
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
    assert.equal(hasRolePermission("STUDENT", "view:own_darja"), true);
    assert.equal(hasRolePermission("STUDENT", "view:own_enrolled_courses"), true);
    assert.equal(hasRolePermission("STUDENT", "view:own_examination_results"), true);
    assert.equal(hasRolePermission("STUDENT", "view:own_fee_challans"), true);

    // Explicitly denied permissions
    assert.equal(hasRolePermission("STUDENT", "mark:student_attendance"), false);
    assert.equal(hasRolePermission("STUDENT", "enter:student_marks"), false);
    assert.equal(hasRolePermission("STUDENT", "manage:students"), false);
    assert.equal(hasRolePermission("STUDENT", "manage:admissions"), false);
    assert.equal(hasRolePermission("STUDENT", "manage:payroll"), false);
    assert.equal(hasRolePermission("STUDENT", "manage:fees"), false);
  });

  test("4.4 Unknown permissions are denied by default for all roles", () => {
    const unknownPerm = "delete:entire_database";
    assert.equal(hasRolePermission("ADMIN", unknownPerm), false);
    assert.equal(hasRolePermission("TEACHER", unknownPerm), false);
    assert.equal(hasRolePermission("STUDENT", unknownPerm), false);
  });

  // =========================================================================
  // SUITE 5: Route Authorization & Security
  // =========================================================================
  test("5.1 Unknown / unmapped routes are denied by default for ALL roles (including ADMIN)", () => {
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/unmapped-route"), false);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/api/secret"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/unmapped-route"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/unmapped-route"), false);
  });

  test("5.2 ADMIN is authorized ONLY for explicitly registered application routes", () => {
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/dashboard"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/attendance"), true);
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
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/form-elements"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/basic-tables"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/blank"), false);

    assert.equal(isRouteAuthorizedForRole("STUDENT", "/form-elements"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/basic-tables"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/blank"), false);
  });

  test("5.4 TEACHER direct URL access — Allowed academic & teacher portal routes (/teacher/*, /profile, /calendar)", () => {
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/teacher/dashboard"), true);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/teacher/attendance"), true);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/teacher/results"), true);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/calendar"), true);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/profile"), true);

    // Blocked from admin routes
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/dashboard"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/attendance"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/alerts"), false);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/line-chart"), false);
  });

  test("5.5 STUDENT direct URL access — Allowed only student portal routes (/student/*, /profile, /calendar)", () => {
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/student/dashboard"), true);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/student/results"), true);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/student/fees"), true);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/student/attendance"), true);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/profile"), true);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/calendar"), true);

    // Blocked from admin & teacher management routes
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/dashboard"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/attendance"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/teacher/attendance"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/teacher/results"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/alerts"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/badge"), false);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/form-elements"), false);
  });

  // =========================================================================
  // SUITE 6: Path Normalization
  // =========================================================================
  test("6.1 URL path normalization handles trailing slashes consistently", () => {
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/dashboard/"), true);
    assert.equal(isRouteAuthorizedForRole("ADMIN", "/calendar/"), true);
    assert.equal(isRouteAuthorizedForRole("TEACHER", "/calendar/"), true);
    assert.equal(isRouteAuthorizedForRole("STUDENT", "/dashboard/"), false);
  });

  // =========================================================================
  // SUITE 7: Multi-Tenant Data Isolation
  // =========================================================================
  test("7.1 Student data isolation — Student can NEVER view peer student records", () => {
    const studentSession = AuthService.loginAsRole("STUDENT");
    const records = AuthService.getStudentRecords(studentSession);

    assert.equal(records.length, 1);
    assert.equal(records[0].studentId, "STD-1447-042");
    assert.equal(records.some((r) => r.studentId === "STD-1447-099"), false);
  });

  test("7.2 Teacher data isolation — Teacher can NEVER view unassigned classes", () => {
    const teacherSession = AuthService.loginAsRole("TEACHER");
    const records = AuthService.getClassAttendanceRecords(teacherSession);

    assert.equal(records.length, 1);
    assert.equal(records[0].teacherId, "TCH-004");
    assert.equal(records.some((r) => r.teacherId === "TCH-009"), false);
  });

  test("7.3 Admin data access — Admin has complete visibility across all records", () => {
    const adminSession = AuthService.loginAsRole("ADMIN");
    const studentRecords = AuthService.getStudentRecords(adminSession);
    const attendanceRecords = AuthService.getClassAttendanceRecords(adminSession);

    assert.equal(studentRecords.length, 2);
    assert.equal(attendanceRecords.length, 2);
  });

  console.log("\n=================================================");
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}
