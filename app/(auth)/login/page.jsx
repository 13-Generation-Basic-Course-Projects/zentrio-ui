
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Button, Checkbox, Form } from "@heroui/react";

import { loginSchema } from "@/lib/schemas/loginSchema";
import { zentrioLoginCredentailAction } from "@/action/auth.action";
import { AuthInput } from "../_components/form/input";
import GoogleLogin from "../_components/LoginForm";

function Login() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setBackendError("");

    try {
      const result = await zentrioLoginCredentailAction(data);

      if (result?.success) {
        toast.success("You have login successfully");
        router.push("/workspace");
      } else {
        setBackendError(result?.detail || "Invalid email or password");
      }
    } catch (error) {
      setBackendError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <main className="w-full min-h-screen flex items-center justify-center bg-bgColor bg-cover bg-center px-4 py-20">
        <div className="w-full max-w-lg bg-login-gradient rounded-2xl shadow-2xl p-8 space-y-6 border-1">
          {/* Logo and Heading */}
          <div className="text-center">
            <Link href="/">
              <img
                src="https://i.imgur.com/bP5QI3y.png"
                alt="Logo"
                className="h-16 mx-auto w-auto max-w-full"
              />
            </Link>
            <h3 className="mt-6 text-xl sm:text-2xl md:text-3xl font-semibold text-[#59BAD5]">
              Login to access your Zentrio account
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <AuthInput
                type="text"
                name="email"
                placeholder="Enter your email"
                {...register("email")}
                error={errors.email?.message}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <AuthInput
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password?.message}
                endContent={
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((v) => !v)}
                    className="focus:outline-none bg-transparent border-none p-0 mr-0 transition-colors"
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="text-xl sm:text-2xl text-primary" />
                    ) : (
                      <Eye className="text-xl sm:text-2xl text-primary" />
                    )}
                  </button>
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot password + error message */}
            <div className="flex justify-between text-sm text-gray-600">
              <span className="text-red-500">
                {backendError ? backendError : "\u00A0"}
              </span>
              <Link
                href="/forgot-password"
                className="text-[#59BAD5] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button - full width */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 xs:h-12 sm:h-[44px] md:h-[48px] max-w-none bg-primary text-white border-none text-base xs:text-lg sm:text-[19px] md:text-[20px] capitalize font-semibold rounded-[10px] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <svg
                  className="animate-spin h-4 w-4 xs:h-5 xs:w-5"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            {/* Signup Text */}
            <p className="text-center text-sm text-gray-700 mt-6">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-[#59BAD5] font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
            <div className="text-center mt-4 sm:mt-5">
              <div className="flex items-center gap-2">
                <hr className="flex-grow border-t border-gray-300" />
                <p className="text-[13px] xs:text-sm sm:text-[15px] md:text-[16px] text-[#787486] whitespace-nowrap max-[425px]:text-[14px] max-[260px]:text-[12px]">
                  Or Login with
                </p>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
            </div>
          </form>

          {/* Google Login Button - full width */}
          <div className="flex justify-center -mt-6 sm:-mt-8 md:-mt-10">
            <GoogleLogin />
          </div>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default Login;
