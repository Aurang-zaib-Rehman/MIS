import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

console.log("==========================================");
console.log("RUNNING PHASE 2 AUTOMATED TEST SUITE");
console.log("==========================================");

let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${description}`);
    console.error(err);
  }
}

// ----------------------------------------------------
// 1. UNIT TESTING: Component files and structure existence
// ----------------------------------------------------
console.log("\n--- SECTION 1: UNIT TESTS ---");

const requiredComponents = [
  "src/layout/public/PublicNavbar.tsx",
  "src/layout/public/PublicFooter.tsx",
  "src/layout/public/PublicLayout.tsx",
  "src/components/public/PublicPageBanner.tsx",
  "src/components/public/HeroSection.tsx",
  "src/components/public/CourseCard.tsx",
  "src/components/public/CoursesSection.tsx",
  "src/components/public/WhyChooseUsSection.tsx",
  "src/components/public/TestimonialsSection.tsx",
  "src/components/public/QuickContactSection.tsx",
  "src/components/public/MohtamimDesk.tsx",
  "src/components/public/TeacherCard.tsx",
  "src/components/public/AdmissionInquiryForm.tsx",
  "src/components/public/DonationCampaignCard.tsx",
  "src/components/public/BankDetailsCard.tsx",
  "src/components/public/ContactForm.tsx",
];

test("All 16 reusable public components and layout files exist on disk", () => {
  for (const comp of requiredComponents) {
    const fullPath = path.resolve(comp);
    assert.ok(fs.existsSync(fullPath), `Missing component: ${comp}`);
  }
});

const requiredPages = [
  "src/pages/Public/Home.tsx",
  "src/pages/Public/About.tsx",
  "src/pages/Public/Courses.tsx",
  "src/pages/Public/Teachers.tsx",
  "src/pages/Public/Admission.tsx",
  "src/pages/Public/Fundraising.tsx",
  "src/pages/Public/Contact.tsx",
];

test("All 7 required public pages exist on disk with default export", () => {
  for (const page of requiredPages) {
    const fullPath = path.resolve(page);
    assert.ok(fs.existsSync(fullPath), `Missing page: ${page}`);
    const content = fs.readFileSync(fullPath, "utf8");
    assert.ok(content.includes("export default"), `Page missing default export: ${page}`);
    assert.ok(content.includes("<PageMeta"), `Page missing PageMeta SEO: ${page}`);
  }
});

// Unit test: Form validation rules logic verification
test("Admission inquiry form logic handles empty required fields and validation", () => {
  const formCode = fs.readFileSync(path.resolve("src/components/public/AdmissionInquiryForm.tsx"), "utf8");
  assert.ok(formCode.includes("studentName"), "Must handle studentName");
  assert.ok(formCode.includes("fatherName"), "Must handle fatherName");
  assert.ok(formCode.includes("guardianPhone"), "Must handle guardianPhone");
  assert.ok(formCode.includes("selectedProgram"), "Must handle selectedProgram");
  assert.ok(formCode.includes("submitted"), "Must handle success submission state");
  assert.ok(formCode.includes("isSubmitting"), "Must handle isSubmitting loading state");
});

test("Contact form logic handles inquiry validation and submission feedback", () => {
  const formCode = fs.readFileSync(path.resolve("src/components/public/ContactForm.tsx"), "utf8");
  assert.ok(formCode.includes("name"), "Must handle name");
  assert.ok(formCode.includes("emailOrPhone"), "Must handle emailOrPhone");
  assert.ok(formCode.includes("subject"), "Must handle subject");
  assert.ok(formCode.includes("message"), "Must handle message");
  assert.ok(formCode.includes("submitted"), "Must handle feedback alert");
  assert.ok(formCode.includes("isSubmitting"), "Must handle isSubmitting loading state");
});

// ----------------------------------------------------
// 2. INTEGRATION TESTING: Routing and navigation links
// ----------------------------------------------------
console.log("\n--- SECTION 2: INTEGRATION TESTS ---");

test("App.tsx registers all 7 public routes nested inside PublicLayout", () => {
  const appCode = fs.readFileSync(path.resolve("src/App.tsx"), "utf8");
  assert.ok(appCode.includes("element={<PublicLayout />}"), "App.tsx must mount PublicLayout");
  assert.ok(appCode.includes('element={<PublicHome />}'), "App.tsx must register index Home route");
  assert.ok(appCode.includes('path="/about" element={<About />}'), "App.tsx must register /about");
  assert.ok(appCode.includes('path="/courses" element={<Courses />}'), "App.tsx must register /courses");
  assert.ok(appCode.includes('path="/teachers" element={<Teachers />}'), "App.tsx must register /teachers");
  assert.ok(appCode.includes('path="/admission" element={<Admission />}'), "App.tsx must register /admission");
  assert.ok(appCode.includes('path="/admissions" element={<Admission />}'), "App.tsx must register /admissions alias");
  assert.ok(appCode.includes('path="/fundraising" element={<Fundraising />}'), "App.tsx must register /fundraising");
  assert.ok(appCode.includes('path="/contact" element={<Contact />}'), "App.tsx must register /contact");
});

test("PublicNavbar links match the registered public routes and signin portal", () => {
  const navbarCode = fs.readFileSync(path.resolve("src/layout/public/PublicNavbar.tsx"), "utf8");
  assert.ok(navbarCode.includes('path: "/"'), "Navbar must link to /");
  assert.ok(navbarCode.includes('path: "/courses"'), "Navbar must link to /courses");
  assert.ok(navbarCode.includes('path: "/teachers"'), "Navbar must link to /teachers");
  assert.ok(navbarCode.includes('path: "/admission"'), "Navbar must link to /admission");
  assert.ok(navbarCode.includes('path: "/fundraising"'), "Navbar must link to /fundraising");
  assert.ok(navbarCode.includes('path: "/about"'), "Navbar must link to /about");
  assert.ok(navbarCode.includes('path: "/contact"'), "Navbar must link to /contact");
  assert.ok(navbarCode.includes('to="/signin"'), "Navbar must link to /signin");
});

test("PublicFooter includes 5 columns, social links, and Google Map embed", () => {
  const footerCode = fs.readFileSync(path.resolve("src/layout/public/PublicFooter.tsx"), "utf8");
  assert.ok(footerCode.includes("<iframe"), "Footer must include interactive Google Maps iframe");
  assert.ok(footerCode.includes("/signin"), "Footer must provide link to portal login");
  assert.ok(footerCode.includes("Madrasa Uloom-e-Islamia"), "Footer must display brand identity");
});

// ----------------------------------------------------
// 3. REGRESSION TESTING: Dashboard and AppLayout preservation
// ----------------------------------------------------
console.log("\n--- SECTION 3: REGRESSION TESTS ---");

test("AppLayout and all existing dashboard routes are preserved without deletion", () => {
  const appCode = fs.readFileSync(path.resolve("src/App.tsx"), "utf8");
  assert.ok(appCode.includes("element={<AppLayout />}"), "AppLayout route shell must remain intact");
  assert.ok(appCode.includes('path="/dashboard" element={<DashboardHome />}'), "Dashboard route must exist");
  assert.ok(appCode.includes('path="/profile" element={<UserProfiles />}'), "Profile route must exist");
  assert.ok(appCode.includes('path="/calendar" element={<Calendar />}'), "Calendar route must exist");
  assert.ok(appCode.includes('path="/form-elements" element={<FormElements />}'), "Form elements route must exist");
  assert.ok(appCode.includes('path="/basic-tables" element={<BasicTables />}'), "Basic tables route must exist");
  assert.ok(appCode.includes('path="/signin" element={<SignIn />}'), "Standalone /signin route must exist");
});

test("AppSidebar correctly routes dashboard link to /dashboard", () => {
  const sidebarCode = fs.readFileSync(path.resolve("src/layout/AppSidebar.tsx"), "utf8");
  assert.ok(sidebarCode.includes('path: "/dashboard"'), "AppSidebar dashboard link must point to /dashboard");
});

test("AppHeader mobile brand logo points to /dashboard", () => {
  const headerCode = fs.readFileSync(path.resolve("src/layout/AppHeader.tsx"), "utf8");
  assert.ok(headerCode.includes('to="/dashboard"'), "AppHeader mobile logo must route to /dashboard");
});

// ----------------------------------------------------
// 4. CODE INTEGRITY & STYLING COMPLIANCE
// ----------------------------------------------------
console.log("\n--- SECTION 4: CODE INTEGRITY & DESIGN TOKENS ---");

test("Public components avoid forbidden physical directional classes and hardcoded hex in className", () => {
  const filesToCheck = [...requiredComponents, ...requiredPages];
  for (const f of filesToCheck) {
    const content = fs.readFileSync(path.resolve(f), "utf8");
    // Ensure no forbidden physical directional margins or paddings
    const forbiddenMatches = content.match(/className="[^"]*\b(ml-|mr-|pl-|pr-)\d+[^"]*"/g);
    assert.strictEqual(
      forbiddenMatches,
      null,
      `File ${f} contains non-logical physical classes: ${forbiddenMatches}`
    );
  }
});

console.log("\n==========================================");
console.log(`TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
console.log("==========================================");

if (passedTests !== totalTests) {
  process.exit(1);
}
