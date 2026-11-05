import SignUpForm from "@/components/auth/SignUpForm";
import PageMeta from "@/components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Sign Up | Madrasa Uloom-e-Islamia Portal"
        description="Portal Registration for Madrasa Uloom-e-Islamia Management System."
      />
      <AuthLayout image="/images/signup.jpeg">
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
