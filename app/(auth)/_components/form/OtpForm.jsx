"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/react";
import Link from "next/link";
import { otpSchema } from "../../../../lib/schemas/otpSchema";
import { useAuthStore } from "../../../../lib/store";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { otpZentrioService, resendOtpZentrioService } from "@/service/auth.service";
import { CountdownTimer } from "./CountdownTimer";
import { zentrioOtpAction, zentrioResendOtpAction } from "@/action/auth.action";

// Zod schema for OTP

export const OtpForm = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const type = searchParams.get("type") || "VERIFY"; 


  const [otpValues, setOtpValues] = useState(Array(6).fill(""));

  const registeredEmail = useAuthStore((state) => state.registeredEmail);

  const [resendLoading, setResendLoading] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otpValues];
    updatedOtp[index] = value;
    setOtpValues(updatedOtp);

    const otpString = updatedOtp.join("");
    setValue("otp", otpString);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const onSubmit = async (data) => {

    try {
      const result = await zentrioOtpAction({
        email,
        otp: data.otp,
        type,
      });

        ("result after submit", result);

      if (result?.success) {
        if (type === "RESET") {
          router.push(`/setnewpassword?email=${encodeURIComponent(email)}`);
        } else {
          router.push(`/login`);
        }
      }
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };


  const handleResend = async () => {
      ("Resend button  click !!!");
    try {
      await zentrioResendOtpAction({ email, type });
        ("OTP resent");
    } catch (error) {
      console.error("Resend OTP failed", error);
    }
  };
  


  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[1728px] h-[1117px] flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[640px] h-fit bg-verify-gradient px-[55px] py-[40px] rounded-[20px] shadow-lg flex flex-col gap-[50px] shadow-sm
           max-[700px]:w-[570px] max-[650px]:w-[500px] max-[550px]:w-[400px] max-[450px]:w-[350px] max-[400px]:w-[300px] max-[350px]:w-[270px]
           max-[300px]:w-[230px] max-[250px]:w-[200px] max-[610px]:px-[40px] max-[350px]:px-[25px] max-[325px]:mt-[130px]
          ">
          <div>
            <Link
              href="/login"
              className="flex items-center gap-3 pb-[5%] text-body-sm text-primary">
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
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
              <p>Back to Sign in</p>
            </Link>
            <div className="flex flex-col gap-4 max-[550px]:-mb-[20px] max-[500px]:-mb-[40px] max-[400px]:-mb-[45px] max-[300px]:-mb-[55px]">
              <p className=" text-primary font-bold text-[32px] max-[660px]:text-[30px] max-[550px]:text-[25px]
                max-[450px]:text-[20px] max-[400px]:text-[16px] ">
                Please check your email
              </p>
              <p className="text-body text-primary max-[500px]:mb-[25px] max-[420px]:text-[14px] max-[320px]:text-[13px]">
                We’ve sent a code to <span> </span>
                {email}.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[15px] w-full max-[550px]:-mb-[20px] max-[400px]:-mb-[30px] max-[300px]:-mb-[40px]">
            <div className="flex w-full justify-between">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={value}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className="rounded-[15px] max-[560px]:w-[50px] max-[560px]:h-[50px] max-[500px]:w-[40px] max-[500px]:h-[40px] max-[500px]:rounded-[10px] max-[400px]:w-[30px] max-[400px]:h-[30px] max-[300px]:w-[23px] max-[300px]:h-[23px] max-[300px]:rounded-[5px] w-16 h-16 text-center border-[1.5px] border-primary focus:outline-none focus:ring-2 focus:ring-primary text-primary font-semibold text-body"
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm mt-2">{errors.otp.message}</p>
            )}
          </div>
          {/* <Input id="username" className="col-span-3" /> */}
          <input type="hidden" id="email" name="email" />
          <div className="w-full flex flex-col gap-[10px] max-[550px]:-mb-[20px] max-[400px]:-mb-[35px] max-[300px]:-mb-[45px]">
            <Button
              type="submit"
              className="w-full bg-primary text-white max-w-none rounded-[10px] h-[48px] text-[20px] capitalize font-semibold "
            >
              Submit
            </Button>
          </div>

          <div className="w-full">
            <div className="text-center text-semibold ">
              <CountdownTimer duration={180} onResend={handleResend} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};