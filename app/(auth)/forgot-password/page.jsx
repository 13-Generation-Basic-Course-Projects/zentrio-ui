// import React from "react";
// import LoginForm from "../_components/LoginForm";
// import LoginCredentail from "../_components/LoginCredentail";
// import { BackgroundAuthentication } from "@/components/background/Background";
// import { ForgetPass, SigninForm } from "../_components/form/Form";

// export default function ForgotPassword() {
//   return (
//     <>
//       <div className="w-full   ">
// <BackgroundAuthentication actionCard={<ForgetPass />} />
//       </div>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRouter} from "next/navigation";
import { AuthInput } from "../_components/form/input";
import { ToastContainer } from "react-toastify";
import { resendOtpForgotPasswordAction } from "@/action/auth.action";

function ForgotPassword() {
  const [formData, setFormData] = useState({
      email: "",
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const router = useRouter();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const onSubmit = async (email) => {
      const type = "RESET";
      try {
        const result = await resendOtpForgotPasswordAction({ email, type });
  
        if (result?.success) {
          router.push(`/verify?email=${encodeURIComponent(email)}&type=RESET`);
        }
      } catch (err) {
        console.error("Submit failed", err);
      }
    };
    

  return (
    <div>
      <main className="w-full min-h-screen flex items-center justify-center bg-bgColor bg-cover bg-center px-4  "
      >
        <div className="w-full max-w-xl bg-login-gradient rounded-2xl shadow-2xl p-8 space-y-6 border-1">
          {/* Logo and Heading */}
          <Link
            href="/login"
            className="flex items-center gap-3 pb-[5%] max-[325px]:pb-[0%] text-body-sm text-primary"
          >
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6L17 5.99976"
                stroke="#59BAD5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 1L1.70711 5.29289C1.37377 5.62623 1.20711 5.79289 1.20711 6C1.20711 6.20711 1.37377 6.37377 1.70711 6.70711L6 11"
                stroke="#59BAD5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Back to Login</p>
          </Link>
          <div className="text-center">
            <Link href="/">
              <img
                src="https://i.imgur.com/bP5QI3y.png"
                alt="Logo"
                className="h-16 mx-auto -mt-8"
              />
            </Link>
            <h3 className="mt-6 text-xl sm:text-2xl md:text-3xl font-semibold text-[#59BAD5] mb-5">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </h3>
          </div>

          {/* Form */}
          <form  onSubmit={handleSubmit((data) => onSubmit(data.email))} className="space-y-4">
            <div className="flex flex-col gap-4 w-full">
              <div className="w-full">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <AuthInput
                    key="outside"
                    type="text"
                    labelPlacement="outside"
                    placeholder="Email"
                    className="text-foreground"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-white max-w-none border-none mt-12 max-[500px]:mt-[25px] h-[48px] rounded-[10px] capitalize font-semibold text-[20px] "
                >
                  <p className="text-h6 max-[350px]:text-[13px]">Submit</p>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default ForgotPassword;