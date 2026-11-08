import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { MotionFadeIn } from "@/components/public/Motion";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { DEMO_ACCOUNTS } from "@/services/mockAuthData";

export default function SignInForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated, login, getRoleDefaultPath } = useAuth();

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

  // Quick fill helper for Phase 3 testing
  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Please enter your registered email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await login({ email: trimmedEmail, password });
      if (response.success && response.session) {
        setSuccessMessage(`Welcome back, ${response.session.name}! Redirecting...`);
        
        // Prioritize requested URL from state, otherwise use role default landing
        const destination =
          (location.state as { from?: { pathname?: string } })?.from?.pathname ||
          getRoleDefaultPath(response.session.role);

        setTimeout(() => {
          navigate(destination, { replace: true });
        }, 350);
      } else {
        setErrorMessage(response.error || "Authentication failed. Please verify your credentials.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred during sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-md pt-10">
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
        className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center"
      >
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 text-title-sm font-semibold text-gray-800 sm:text-title-md dark:text-white/90">
              Sign In to Madrassa MIS
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your credentials to access your academic dashboard.
            </p>
          </div>

          {/* Demo Account Selector Pills (Phase 3 Testing) */}
          <div className="mb-6 rounded-xl border border-dashed border-brand-300 bg-brand-50/50 p-3.5 dark:border-brand-500/30 dark:bg-brand-500/10">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-theme-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                Phase 3 Demo Accounts
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                Click to Auto-Fill
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  handleQuickFill(DEMO_ACCOUNTS.ADMIN.email, DEMO_ACCOUNTS.ADMIN.password)
                }
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-center transition-all hover:border-brand-500 hover:bg-brand-50 hover:shadow-xs active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-brand-500/20"
              >
                <span className="text-theme-xs font-bold text-gray-800 dark:text-gray-200">
                  Admin
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  Full Control
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickFill(DEMO_ACCOUNTS.TEACHER.email, DEMO_ACCOUNTS.TEACHER.password)
                }
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-center transition-all hover:border-brand-500 hover:bg-brand-50 hover:shadow-xs active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-brand-500/20"
              >
                <span className="text-theme-xs font-bold text-gray-800 dark:text-gray-200">
                  Teacher
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  Academic
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickFill(DEMO_ACCOUNTS.STUDENT.email, DEMO_ACCOUNTS.STUDENT.password)
                }
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-1.5 px-2 text-center transition-all hover:border-brand-500 hover:bg-brand-50 hover:shadow-xs active:scale-95 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-brand-500/20"
              >
                <span className="text-theme-xs font-bold text-gray-800 dark:text-gray-200">
                  Student
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  Portal
                </span>
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
              <Alert variant="success" title="Authenticated" message={successMessage} />
            </div>
          )}

          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
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
                    Password <span className="text-error-500">*</span>{" "}
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
                Don&apos;t have an account? {""}
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
