import SignInForm from "@/components/auth/SignInForm";
import PageMeta from "@/components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Sign In | Madrasa Uloom-e-Islamia Portal"
        description="Portal Sign In for Faculty, Administrators, and Students of Madrasa Uloom-e-Islamia."
      />
      <AuthLayout image="/images/login.jfif">
        <SignInForm />
      </AuthLayout>
    </>
  );
}
