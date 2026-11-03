import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import React, { useState } from "react";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.emailOrPhone.trim() || !formData.message.trim()) {
      setErrorMsg("Please provide your Name, Email/Phone, and your Message.");
      return;
    }

    const contactVal = formData.emailOrPhone.trim();
    if (contactVal.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactVal)) {
        setErrorMsg("Please enter a valid email address format (e.g. name@example.com).");
        return;
      }
    } else {
      const cleanPhone = contactVal.replace(/[\s\-()]/g, "");
      if (cleanPhone.length < 10 || !/^(\+?\d+)$/.test(cleanPhone)) {
        setErrorMsg("Please enter a valid phone number (minimum 10 digits) or a valid email address.");
        return;
      }
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
      <div className="mb-6">
        <h3 className="font-outfit text-2xl font-bold text-gray-900 dark:text-white">
          Send Us an Inquiry
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Have questions about admissions, syllabus, or donations? Leave a message below.
        </p>
      </div>

      {submitted ? (
        <div className="space-y-4">
          <Alert
            variant="success"
            title="Inquiry Logged Successfully!"
            message={`Thank you, ${formData.name}. We have received your query regarding "${formData.subject || 'General Inquiry'}". (Phase 2 Demo: Live database will link in Phase 4. For direct contact, WhatsApp our office at +92 302 9558584).`}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", emailOrPhone: "", subject: "", message: "" });
            }}
          >
            Send Another Query
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMsg && (
            <Alert
              variant="error"
              title="Missing Information"
              message={errorMsg}
            />
          )}

          <div>
            <Label htmlFor="contactName">
              Full Name <span className="text-error-500">*</span>
            </Label>
            <Input
              id="contactName"
              placeholder="e.g. Muhammad Ahmad"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="contactContact">
              Email Address or WhatsApp Number <span className="text-error-500">*</span>
            </Label>
            <Input
              id="contactContact"
              placeholder="e.g. 0300 1234567 or email@domain.com"
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="contactSubject">
              Inquiry Subject
            </Label>
            <Input
              id="contactSubject"
              placeholder="e.g. Admission in Darja Oola / Hifz Shift Timings"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="contactMessage">
              Your Message / Query <span className="text-error-500">*</span>
            </Label>
            <TextArea
              placeholder="Write your detailed questions or remarks here..."
              rows={4}
              value={formData.message}
              onChange={(val) => setFormData({ ...formData, message: val })}
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <Button variant="primary" size="md" disabled={isSubmitting}>
              {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;

