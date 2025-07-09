// import React from "react";

// import { BackgroundAuthentication } from "@/components/background/Background";
// import { SignUpForm } from "../_components/form/SignupForm";
// export default function Signup() {
//   return (
//     <>
//       <div className="w-full   ">
//         <BackgroundAuthentication actionCard={<SignUpForm />} />
//       </div>
//     </>
//   );
// }

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Button, Checkbox, Form } from "@heroui/react";

import { AuthInput } from "../_components/form/input";
import GoogleLogin from "../_components/LoginForm";
import { useAuthStore } from "@/lib/store";
import { registerSchema } from "@/lib/schemas/registerSchema";
import { zentrioRegisterAction } from "@/action/auth.action";

function Signup() {
  const setEmail = useAuthStore((state) => state.setEmail);

  const [isVisible, setIsVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleVisibility = (field) => {
    setIsVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const result = await zentrioRegisterAction(data);
    "Stored email:", result.email;
    if (result?.email) {
      localStorage.setItem("userEmail", result.email);
      // or use Zustand here
      setEmail(result.email);
    }
    setEmail(result.email);

    return { success: true, email: result.email }; // Return to indicate success
  };

  return (
    <div>
      <main className="w-full min-h-screen flex items-center justify-center bg-bgColor bg-cover bg-center py-20 px-4">
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
              Register to access your Zentrio account
            </h3>
          </div>

          {/* Form */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Form Fields */}
            <div className="flex flex-col gap-6 sm:gap-10 w-full">
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Username */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <AuthInput
                    type="text"
                    // label="Username"
                    labelPlacement="outside"
                    placeholder="Username"
                    className="text-foreground"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email */}

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <AuthInput
                    type="text"
                    // label="Email"
                    labelPlacement="outside"
                    placeholder="Email"
                    className="text-foreground"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <AuthInput
                    type={isVisible.password ? "text" : "password"}
                    // label="Password"
                    labelPlacement="outside"
                    placeholder="Password"
                    className="text-foreground"
                    endContent={
                      <button
                        type="button"
                        className="focus:outline-none bg-transparent border-none p-0 mr-0 transition-colors"
                        onClick={() => toggleVisibility("password")}
                      >
                        {isVisible.password ? (
                          <EyeOff className="text-xl sm:text-2xl text-primary" />
                        ) : (
                          <Eye className="text-xl sm:text-2xl text-primary" />
                        )}
                      </button>
                    }
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <AuthInput
                    type={isVisible.confirmPassword ? "text" : "password"}
                    // label="Confirm Password"
                    labelPlacement="outside"
                    placeholder="Confirm Password"
                    className="text-foreground"
                    endContent={
                      <button
                        type="button"
                        className="focus:outline-none bg-transparent border-none p-0 mr-0 transition-colors"
                        onClick={() => toggleVisibility("confirmPassword")}
                      >
                        {isVisible.confirmPassword ? (
                          <EyeOff className="text-xl sm:text-2xl text-primary" />
                        ) : (
                          <Eye className="text-xl sm:text-2xl text-primary" />
                        )}
                      </button>
                    }
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-7 ">
                  <Checkbox
                    type="checkbox"
                    id="terms"
                    className="text-[16px] w-4 h-4 mt-1 text-description cursor-pointer"
                    {...register("termsAccepted")}
                  />
                  <label
                    htmlFor="terms"
                    className="text-[#787486] text-[13px] xs:text-sm max-[425px]:text-[14px] max-[260px]:text-[12px] sm:text-[15px] md:text-[16px] leading-snug"
                  >
                    I agree to all the{" "}
                    <span className="text-primary">Terms</span> and{" "}
                    <span className="text-primary">Privacy Policies</span>
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-red-500 text-sm -mt-3">
                    {errors.termsAccepted.message}
                  </p>
                )}
              </div>

              {/* Submit + Links */}
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full bg-primary text-bgColor text-sm xs:text-base sm:text-[15px] md:text-[16px] max-[425px]:text-[14px] max-[260px]:text-[12px] max-w-none border-none rounded-[10px] h-[46px] sm:h-[48px] capitalize font-semibold"
                >
                  Create account
                </Button>

                <p className="text-center text-[13px] xs:text-sm sm:text-[15px] md:text-[16px] text-[#787486] whitespace-nowrap max-[425px]:text-[14px] max-[260px]:text-[12px] my-1">
                  Have an account?{" "}
                  <Link href="/login" className="text-primary">
                    Sign in
                  </Link>
                </p>

                {/* Divider */}
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <hr className="flex-grow border-t border-gray-300" />
                    <p className="text-[13px] xs:text-sm sm:text-[15px] md:text-[16px] text-[#787486] whitespace-nowrap max-[425px]:text-[14px] max-[260px]:text-[12px]">
                      Or Sign up with
                    </p>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </Form>

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

export default Signup;