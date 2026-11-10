import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import PreviousExamResultTable from "@/components/student/PreviousExamResultTable";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { CheckCircleIcon, DocsIcon, DownloadIcon, FileIcon, TaskIcon } from "@/icons";

export default function StudentResults() {
  const [activeTab, setActiveTab] = useState<"gazette" | "sanad" | "rules">("gazette");

  const handlePrintSanad = () => {
    window.print();
  };

  return (
    <>
      <PageMeta
        title="Examination Results, Gazette & Sanad | Madrassa MIS"
        description="Term-wise examination results, marks gazette, official Sanad transcript, and Wifaq-ul-Madaris compliance."
      />
      <PageBreadcrumb pageTitle="Examination Results & Academic Transcripts" />

      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setActiveTab("gazette")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === "gazette"
                ? "bg-brand-500 text-white shadow-xs"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            <TaskIcon className="size-4" />
            <span>Marks Gazette & Term Results</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sanad")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === "sanad"
                ? "bg-brand-500 text-white shadow-xs"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            <DocsIcon className="size-4" />
            <span>Official Sanad / Transcript Certificate</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rules")}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === "rules"
                ? "bg-brand-500 text-white shadow-xs"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            <FileIcon className="size-4" />
            <span>Wifaq Grading Scale & Promotion Policy</span>
          </button>
        </div>

        {/* Tab 1: Marks Gazette */}
        {activeTab === "gazette" && (
          <div className="space-y-6">
            <PreviousExamResultTable />
          </div>
        )}

        {/* Tab 2: Official Sanad / Transcript Certificate Preview */}
        {activeTab === "sanad" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Official Sanad / Academic Transcript Verification
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Digitally verified certificate certified under Wifaq-ul-Madaris Al-Arabia Pakistan criteria.
                </p>
              </div>
              <Button size="sm" onClick={handlePrintSanad}>
                <DownloadIcon className="size-4" />
                Print Official Sanad
              </Button>
            </div>

            {/* Authentic Ornate Islamic Certificate Container */}
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border-4 border-double border-amber-600/40 bg-[#fdfbf7] p-8 text-gray-900 shadow-md dark:border-amber-500/30 dark:bg-stone-900 dark:text-gray-100">
              {/* Inner Decorative Border */}
              <div className="rounded-xl border border-dashed border-amber-600/30 p-6 dark:border-amber-500/20">
                {/* Certificate Header */}
                <div className="text-center">
                  <p className="text-sm font-arabic font-bold text-amber-800 dark:text-amber-400">
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-3">
                    <span className="h-px w-16 bg-amber-600/40" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-800 dark:text-amber-400">
                      Wifaq-ul-Madaris Al-Arabia Pakistan
                    </span>
                    <span className="h-px w-16 bg-amber-600/40" />
                  </div>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                    جامعة دار العلوم و مدرسة علوم الإسلامية
                  </h1>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    Jamia Madrasa Uloom-e-Islamia &bull; Faisalabad, Pakistan
                  </p>
                  <div className="mt-2 inline-block rounded-full border border-amber-600/40 bg-amber-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                    کشف الدرجات العلمية &bull; OFFICIAL ACADEMIC TRANSCRIPT
                  </div>
                </div>

                {/* Serial & Registration Row */}
                <div className="mt-6 flex flex-wrap items-center justify-between border-b border-gray-200 pb-3 text-xs text-gray-600 dark:border-gray-800 dark:text-gray-400">
                  <span>
                    Serial No: <strong className="font-mono text-gray-900 dark:text-white">SANAD-1446-042</strong>
                  </span>
                  <span>
                    Registration No: <strong className="font-mono text-gray-900 dark:text-white">WMA-REG-2024-981</strong>
                  </span>
                  <span>
                    Date of Issue: <strong className="text-gray-900 dark:text-white">20 Rabi-ul-Thani 1447 AH</strong>
                  </span>
                </div>

                {/* Student Particulars */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                  <div className="rounded-lg bg-white/70 p-3 border border-gray-200/60 dark:bg-stone-800/60 dark:border-stone-700">
                    <span className="text-gray-500 dark:text-gray-400">Student Name (اسم الطالب):</span>
                    <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
                      Muhammad Abdullah Khan (محمد عبد الله خان)
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-3 border border-gray-200/60 dark:bg-stone-800/60 dark:border-stone-700">
                    <span className="text-gray-500 dark:text-gray-400">Father's Name (اسم الوالد):</span>
                    <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
                      Hafiz Tariq Mahmood (حافظ طارق محمود)
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-3 border border-gray-200/60 dark:bg-stone-800/60 dark:border-stone-700">
                    <span className="text-gray-500 dark:text-gray-400">Darja / Class (المرحلة الدراسية):</span>
                    <p className="mt-0.5 text-sm font-bold text-brand-600 dark:text-brand-400">
                      Darja Saniya (العام الثاني) — Dars-e-Nizami
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-3 border border-gray-200/60 dark:bg-stone-800/60 dark:border-stone-700">
                    <span className="text-gray-500 dark:text-gray-400">Examination Session (الدورة الامتحانية):</span>
                    <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
                      Seh-Mahi 1446-1447 AH / First Term
                    </p>
                  </div>
                </div>

                {/* Transcript Subjects Table */}
                <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-stone-700 dark:bg-stone-800/90">
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 text-start font-semibold text-gray-700 dark:border-stone-700 dark:bg-stone-800 dark:text-gray-300">
                        <th className="px-3 py-2.5 text-start">Code</th>
                        <th className="px-3 py-2.5 text-start">Course Title</th>
                        <th className="px-3 py-2.5 text-start">Arabic Title</th>
                        <th className="px-3 py-2.5 text-center">Max Marks</th>
                        <th className="px-3 py-2.5 text-center">Obtained</th>
                        <th className="px-3 py-2.5 text-center">Grade</th>
                        <th className="px-3 py-2.5 text-center">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-stone-700">
                      {[
                        { code: "DN-201", title: "Sharh Wiqayah (Fiqh)", arabic: "شرح الوقاية", max: 100, obt: 91, grade: "Mumtaz" },
                        { code: "DN-202", title: "Kafiyah (Nahw Grammar)", arabic: "الكافية في النحو", max: 100, obt: 88, grade: "Mumtaz" },
                        { code: "DN-203", title: "Mukhtasar al-Quduri", arabic: "مختصر القدوري", max: 100, obt: 94, grade: "Mumtaz" },
                        { code: "DN-204", title: "Tafseer Jalalayn (Vol 1)", arabic: "تفسير الجلالين", max: 100, obt: 89, grade: "Mumtaz" },
                        { code: "DN-205", title: "Riyad us-Saliheen", arabic: "رياض الصالحين", max: 100, obt: 86, grade: "Mumtaz" },
                        { code: "DN-206", title: "Al-Mirqat (Mantiq)", arabic: "المرقاة في المنطق", max: 100, obt: 86, grade: "Mumtaz" },
                      ].map((item) => (
                        <tr key={item.code} className="hover:bg-amber-50/20 dark:hover:bg-stone-700/50">
                          <td className="px-3 py-2 font-mono font-medium text-brand-600 dark:text-brand-400">{item.code}</td>
                          <td className="px-3 py-2 font-semibold text-gray-800 dark:text-gray-200">{item.title}</td>
                          <td className="px-3 py-2 font-arabic text-gray-500 dark:text-gray-400">{item.arabic}</td>
                          <td className="px-3 py-2 text-center text-gray-600 dark:text-gray-400">{item.max}</td>
                          <td className="px-3 py-2 text-center font-bold text-gray-900 dark:text-white">{item.obt}</td>
                          <td className="px-3 py-2 text-center font-semibold text-emerald-600 dark:text-emerald-400">{item.grade}</td>
                          <td className="px-3 py-2 text-center font-medium text-emerald-600 dark:text-emerald-400">Pass</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-300 bg-gray-50/90 font-bold text-gray-900 dark:border-stone-600 dark:bg-stone-800 dark:text-white">
                        <td colSpan={3} className="px-3 py-2.5 text-start">
                          TOTAL AGGREGATE (المجموع الكلي)
                        </td>
                        <td className="px-3 py-2.5 text-center">600</td>
                        <td className="px-3 py-2.5 text-center text-brand-600 dark:text-brand-400">534</td>
                        <td colSpan={2} className="px-3 py-2.5 text-center text-emerald-600 dark:text-emerald-400">
                          89.0% &bull; Mumtaz (1st Position)
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Signatures & Seal Section */}
                <div className="mt-8 grid grid-cols-3 items-end gap-4 text-center text-xs">
                  <div>
                    <div className="mx-auto mb-2 h-10 w-24 border-b border-gray-400 dark:border-stone-600" />
                    <p className="font-bold text-gray-800 dark:text-gray-200">Prepared By</p>
                    <p className="text-[11px] text-gray-500">Imtihanat Clerk</p>
                  </div>

                  <div>
                    <div className="mx-auto mb-1 flex size-14 items-center justify-center rounded-full border-2 border-double border-amber-600/50 bg-amber-50/50 text-[10px] font-bold text-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
                      SEAL
                    </div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">Official Stamp</p>
                    <p className="text-[11px] text-gray-500">Madrassa Uloom-e-Islamia</p>
                  </div>

                  <div>
                    <div className="mx-auto mb-2 h-10 w-24 border-b border-gray-400 dark:border-stone-600" />
                    <p className="font-bold text-gray-800 dark:text-gray-200">Nazim-e-Taleemat</p>
                    <p className="text-[11px] text-gray-500">Director of Academic Affairs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Wifaq Rules & Compliance Checklist */}
        {activeTab === "rules" && (
          <div className="space-y-6">
            {/* Grading Scale Legend */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                <div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white">
                    Wifaq-ul-Madaris Al-Arabia Grading Criteria
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Official marks brackets and passing classification
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge color="success" size="sm">Mumtaz (85% - 100%)</Badge>
                  <Badge color="info" size="sm">Jayyid Jiddan (75% - 84%)</Badge>
                  <Badge color="primary" size="sm">Jayyid (60% - 74%)</Badge>
                  <Badge color="warning" size="sm">Maqbool (40% - 59%)</Badge>
                  <Badge color="error" size="sm">Rasib (&lt; 40%)</Badge>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-800/40">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Minimum Passing Benchmark
                  </span>
                  <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                    240 Marks / 600 Marks (40.0%)
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                    Mandatory minimum total aggregate across 6 subjects
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-800/40">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Single Paper Grace Rule
                  </span>
                  <p className="mt-1 text-sm font-bold text-brand-600 dark:text-brand-400">
                    Promoted with Clearance
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                    Allowed if aggregate total &ge; 240 marks
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-800/40">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Board Detention Rule
                  </span>
                  <p className="mt-1 text-sm font-bold text-error-600 dark:text-error-400">
                    2+ Failed Papers = Repeat Darja
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                    Absolute board failure regardless of aggregate
                  </p>
                </div>
              </div>

              {/* Student Eligibility Audit Checklist */}
              <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Student Official Eligibility Checklist: M. Abdullah Khan (24-DS-042)
                </h3>
                <div className="mt-3 space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl bg-emerald-50/60 p-3 text-xs text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
                    <span className="flex items-center gap-2 font-medium">
                      <CheckCircleIcon className="size-4 text-emerald-600" />
                      1. Aggregate passing benchmark &ge; 240 marks
                    </span>
                    <strong className="font-bold">PASSED: 534 Marks (89.0%)</strong>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-emerald-50/60 p-3 text-xs text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
                    <span className="flex items-center gap-2 font-medium">
                      <CheckCircleIcon className="size-4 text-emerald-600" />
                      2. Minimum 75% attendance presence in all subjects
                    </span>
                    <strong className="font-bold">QUALIFIED: 93.3% Presence</strong>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-emerald-50/60 p-3 text-xs text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
                    <span className="flex items-center gap-2 font-medium">
                      <CheckCircleIcon className="size-4 text-emerald-600" />
                      3. Unconditional annual board promotion status
                    </span>
                    <strong className="font-bold">ELIGIBLE: Unconditional Promotion</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

