import Label from "@/components/form/Label";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { MotionFadeIn } from "@/components/public/Motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";

export default function SignUpForm() {
  const navigate = useNavigate();
  const { loginAsRole } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary development handling: enters as student by default
    loginAsRole("STUDENT");
    navigate("/profile", { replace: true });
  };

  return (
    <div className="no-scrollbar flex w-full flex-1 flex-col overflow-y-auto px-4 pb-12 sm:px-6 sm:pb-16 lg:w-1/2 lg:px-8">
      <div className="mx-auto mb-5 w-full max-w-md sm:pt-10">
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
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details to create an account for Madrassa MIS.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* First Name */}
                  <div className="sm:col-span-1">
                    <Label>
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-e-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="size-5 fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="h-5 w-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5 pb-6 sm:pb-8">
              <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </MotionFadeIn>
    </div>
  );
}
