import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import React, { useState } from "react";

export const AdmissionInquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    cnicOrBform: "",
    guardianPhone: "",
    selectedProgram: "hifz",
    residenceType: "boarder",
    previousEducation: "",
    district: "",
    remarks: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const programOptions = [
    { value: "hifz", label: "Shoba-e-Hifz (Quran Memorization & Tajweed)" },
    { value: "nazra", label: "Nazra Quran & Noorani Qaida" },
    { value: "darja-oola", label: "Dars-e-Nizami: Darja Oola (Year 1 - Grade 8 Pass Required)" },
    { value: "darja-saniya", label: "Dars-e-Nizami: Darja Saniya (Year 2)" },
    { value: "darja-salisa", label: "Dars-e-Nizami: Darja Salisa (Year 3)" },
    { value: "darja-rabia", label: "Dars-e-Nizami: Darja Rabia (Year 4)" },
    { value: "darja-khamisa", label: "Dars-e-Nizami: Darja Khamisa (Year 5)" },
    { value: "darja-sadisa", label: "Dars-e-Nizami: Darja Sadisa (Year 6)" },
    { value: "darja-sabia", label: "Dars-e-Nizami: Darja Sabia (Chota Daura - Year 7)" },
    { value: "daura-hadith", label: "Daura-e-Hadith / Darja Samina (Final Master's Level)" },
    { value: "tarjuma", label: "Tarjuma & Tafseer-e-Quran" },
  ];

  const residenceOptions = [
    { value: "boarder", label: "Residential / Boarder (Hostel + Mess)" },
    { value: "day-scholar", label: "Day Scholar (Local / Daily Attendance)" },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (
      !formData.studentName.trim() ||
      !formData.fatherName.trim() ||
      !formData.guardianPhone.trim()
    ) {
      setErrorMsg("Please fill in all mandatory fields marked with an asterisk (*).");
      return;
    }

    const cleanPhone = formData.guardianPhone.replace(/[\s\-()]/g, "");
    if (cleanPhone.length < 10 || !/^(\+?\d+)$/.test(cleanPhone)) {
      setErrorMsg("Please enter a valid phone or WhatsApp number (minimum 10 digits).");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-theme-md sm:p-10 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-8">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          Session 1447–1448 AH
        </span>
        <h3 className="mt-2 font-outfit text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Online Admission Application
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Submit applicant details for academic verification. Selected candidates will be notified
          for an in-person Tajweed/oral evaluation.
        </p>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <Alert
            variant="success"
            title="Preliminary Application Recorded!"
            message={`JazakAllah Khair. Your preliminary admission inquiry for ${formData.studentName} has been logged. (Phase 2 Demo: Backend database persistence will be established in Phase 4. Our admissions staff can also be reached directly at 0302-9558584).`}
          />
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-300">
            <h4 className="font-semibold text-gray-900 dark:text-white">Next Steps:</h4>
            <ul className="mt-2 list-disc ps-5 space-y-1 text-xs sm:text-sm">
              <li>Keep original Student B-Form and Father CNIC ready.</li>
              <li>For Dars-e-Nizami (Darja Oola), Grade 8 School Leaving Certificate is mandatory.</li>
              <li>For Higher Darjat, previous Wafaq DMC / Sanad must be verified upon physical arrival.</li>
              <li>Formal verification and interview dates commence from <strong>15 Shawwal</strong>.</li>
            </ul>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                studentName: "",
                fatherName: "",
                cnicOrBform: "",
                guardianPhone: "",
                selectedProgram: "hifz",
                residenceType: "boarder",
                previousEducation: "",
                district: "",
                remarks: "",
              });
            }}
          >
            Submit Another Application
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <Alert
              variant="error"
              title="Form Incomplete"
              message={errorMsg}
            />
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Student Full Name */}
            <div>
              <Label htmlFor="studentName">
                Student Full Name <span className="text-error-500">*</span>
              </Label>
              <Input
                id="studentName"
                placeholder="e.g. Muhammad Abdullah"
                value={formData.studentName}
                onChange={(e) => handleChange("studentName", e.target.value)}
              />
            </div>

            {/* Father / Guardian Name */}
            <div>
              <Label htmlFor="fatherName">
                Father / Guardian Name <span className="text-error-500">*</span>
              </Label>
              <Input
                id="fatherName"
                placeholder="e.g. Haji Muhammad Saeed"
                value={formData.fatherName}
                onChange={(e) => handleChange("fatherName", e.target.value)}
              />
            </div>

            {/* CNIC / B-Form Number */}
            <div>
              <Label htmlFor="cnicOrBform">
                Student B-Form / CNIC Number
              </Label>
              <Input
                id="cnicOrBform"
                placeholder="e.g. 17301-XXXXXXX-X"
                value={formData.cnicOrBform}
                onChange={(e) => handleChange("cnicOrBform", e.target.value)}
              />
            </div>

            {/* Guardian WhatsApp / Phone */}
            <div>
              <Label htmlFor="guardianPhone">
                Guardian Mobile / WhatsApp Number <span className="text-error-500">*</span>
              </Label>
              <Input
                id="guardianPhone"
                placeholder="e.g. 0300 1234567"
                value={formData.guardianPhone}
                onChange={(e) => handleChange("guardianPhone", e.target.value)}
              />
            </div>

            {/* Desired Program */}
            <div>
              <Label htmlFor="selectedProgram">
                Desired Course / Darja <span className="text-error-500">*</span>
              </Label>
              <Select
                options={programOptions}
                defaultValue={formData.selectedProgram}
                onChange={(val) => handleChange("selectedProgram", val)}
              />
            </div>

            {/* Residence Type */}
            <div>
              <Label htmlFor="residenceType">
                Residence / Boarding Option <span className="text-error-500">*</span>
              </Label>
              <Select
                options={residenceOptions}
                defaultValue={formData.residenceType}
                onChange={(val) => handleChange("residenceType", val)}
              />
            </div>

            {/* Previous Education */}
            <div>
              <Label htmlFor="previousEducation">
                Previous Education / Last Class Passed
              </Label>
              <Input
                id="previousEducation"
                placeholder="e.g. Grade 8, Matric, Nazra Complete, etc."
                value={formData.previousEducation}
                onChange={(e) => handleChange("previousEducation", e.target.value)}
              />
            </div>

            {/* Native District / City */}
            <div>
              <Label htmlFor="district">
                Native District / Hometown
              </Label>
              <Input
                id="district"
                placeholder="e.g. Mardan, Swat, Peshawar, Dir, etc."
                value={formData.district}
                onChange={(e) => handleChange("district", e.target.value)}
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="remarks">
              Additional Information / Guardian Remarks (Optional)
            </Label>
            <TextArea
              placeholder="Mention if the student is an orphan, requires financial sponsorship, or has medical considerations..."
              rows={3}
              value={formData.remarks}
              onChange={(val) => handleChange("remarks", val)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end pt-2">
            <Button variant="primary" size="md" disabled={isSubmitting}>
              {isSubmitting ? "Submitting Application..." : "Submit Admission Application"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdmissionInquiryForm;

