import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon, DashboardAltIcon, CalendarAltIcon, UserCircleIcon } from "@/icons";
import { MotionFadeIn } from "@/components/public/Motion";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types/auth";

export default function SignInForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated, loginAsRole, login, getRoleDefaultPath } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to authorized landing
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      const destination =
        (location.state as { from?: { pathname?: string } })?.from?.pathname ||
        getRoleDefaultPath(currentUser.role);
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate, location.state, getRoleDefaultPath]);

  // 1-Click Direct Role Login handler
  const handleRoleSelect = (role: Role) => {
    setErrorMessage(null);
    setSuccessMessage(`Entering as ${role}...`);
    const session = loginAsRole(role);

    const requestedPath = (location.state as { from?: { pathname?: string } })?.from?.pathname;
    const destination = requestedPath && requestedPath !== "/signin"
      ? requestedPath
      : getRoleDefaultPath(session.role);

    setTimeout(() => {
      navigate(destination, { replace: true });
    }, 150);
  };

  // Standard form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await login({ email: trimmedEmail, password });
      if (response.success && response.session) {
        setSuccessMessage(`Welcome back! Redirecting...`);
        const requestedPath = (location.state as { from?: { pathname?: string } })?.from?.pathname;
        const destination = requestedPath && requestedPath !== "/signin"
          ? requestedPath
          : getRoleDefaultPath(response.session.role);

        setTimeout(() => {
          navigate(destination, { replace: true });
        }, 150);
      } else {
        setErrorMessage(response.error || "Authentication failed. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-md pt-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5 rtl:rotate-180" />
          Back to website
        </Link>
      </div>

      <MotionFadeIn
        direction="left"
        duration={0.4}
        className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-6"
      >
        <div>
          <div className="mb-5 sm:mb-6">
            <h1 className="mb-1 text-title-sm font-semibold text-gray-800 sm:text-title-md dark:text-white/90">
              Sign In to Madrassa MIS
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select your role directly or sign in with your credentials.
            </p>
          </div>

          {/* 3 Temporary Role Buttons at the Top of Login Form */}
          <div className="mb-6 rounded-xl border border-dashed border-brand-300 bg-brand-50/50 p-3.5 dark:border-brand-500/30 dark:bg-brand-500/10">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-theme-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                1-Click Direct Role Access
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Opens Dashboard
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Admin Button */}
              <button
                type="button"
                onClick={() => handleRoleSelect("ADMIN")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-200 bg-white py-2 px-2.5 text-xs font-semibold text-brand-700 shadow-xs transition-all hover:bg-brand-500 hover:text-white hover:border-brand-500 active:scale-95 dark:border-brand-500/30 dark:bg-gray-800 dark:text-brand-300 dark:hover:bg-brand-500 dark:hover:text-white"
              >
                <DashboardAltIcon className="size-4 shrink-0" />
                <span>Admin</span>
              </button>

              {/* Teacher Button */}
              <button
                type="button"
                onClick={() => handleRoleSelect("TEACHER")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-blue-light-200 bg-white py-2 px-2.5 text-xs font-semibold text-blue-light-700 shadow-xs transition-all hover:bg-blue-light-500 hover:text-white hover:border-blue-light-500 active:scale-95 dark:border-blue-light-500/30 dark:bg-gray-800 dark:text-blue-light-300 dark:hover:bg-blue-light-500 dark:hover:text-white"
              >
                <CalendarAltIcon className="size-4 shrink-0" />
                <span>Teacher</span>
              </button>

              {/* Student Button */}
              <button
                type="button"
                onClick={() => handleRoleSelect("STUDENT")}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-success-200 bg-white py-2 px-2.5 text-xs font-semibold text-success-700 shadow-xs transition-all hover:bg-success-500 hover:text-white hover:border-success-500 active:scale-95 dark:border-success-500/30 dark:bg-gray-800 dark:text-success-300 dark:hover:bg-success-500 dark:hover:text-white"
              >
                <UserCircleIcon className="size-4 shrink-0" />
                <span>Student</span>
              </button>
            </div>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="mb-4">
              <Alert variant="error" title="Sign In Error" message={errorMessage} />
            </div>
          )}

          {successMessage && (
            <div className="mb-4">
              <Alert variant="success" title="Access Granted" message={successMessage} />
            </div>
          )}

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            <span className="absolute bg-white px-3 text-xs text-gray-400 dark:bg-gray-900">
              Or Sign In with Email
            </span>
          </div>

          {/* Template Login Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="e.g. admin@madrassa.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <Label>
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-e-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
                      role="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block text-theme-sm font-normal text-gray-700 dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Authenticating..." : "Sign in"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </MotionFadeIn>
    </div>
  );
}
