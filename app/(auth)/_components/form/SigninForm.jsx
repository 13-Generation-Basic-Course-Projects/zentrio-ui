"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Checkbox, Form } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { AuthInput } from "./input";
import GoogleLogin from "../LoginForm";
import { signIn } from "../../../../auth";
import { loginSchema } from "../../../../lib/schemas/loginSchema";
import { zentrioLoginCredentailAction } from "../../../../action/auth.action";
import { toast, ToastContainer } from "react-toastify";

export const SigninForm = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const mail = searchParam.get('mail')

  // Only need "confirm" for password visibility in this form, right?
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // React Hook Form setup with Zod schema validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });


  const [isLoading, setIsLoading] = useState(false); //leap

  const onSubmit = async (data) => {
    setIsLoading(true);
    setBackendError(""); 

    try {
      const result = await zentrioLoginCredentailAction(data);

      if (result?.success) {
        router.push("/workspace");
        toast.success("You have login successfully");
      } else {
        setBackendError(result?.detail || "Invalid email or password");
        setIsLoading(false);
      }
    } catch (error) {
      setBackendError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };
  const [backendError, setBackendError] = useState("");

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[540px] p-[40px] rounded-[20px] shadow-sm bg-login-gradient flex flex-col gap-[50px]">
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <p className="text-[55px] text-primary font-bold">Login</p>
            <p className="text-body text-[#787486] mb-10">
              Login to access your Zentrio account
            </p>
          </div>

          <div className="flex flex-col gap-[20px] w-full">
            {/* Email input */}
            <div>
              <AuthInput
                type="text"
                label="Email"
                name="email"
                defaultValue={mail ?? ''}
                labelPlacement="outside"
                placeholder="Email"
                className="text-foreground "
                {...register("email")}
                error={errors.email?.message}
              />
              {errors.email && (
                <p className="text-danger text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password input */}
            <div className="relative">
              <AuthInput
                type={isPasswordVisible ? "text" : "password"}
                label="Password"
                name="password"
                labelPlacement="outside"
                placeholder="Password"
                className="text-foreground"
                {...register("password")}
                error={errors.password?.message}
                endContent={
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((v) => !v)}
                    className="focus:outline-none bg-transparent border-none p-0 mr-0 transition-colors"
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="text-2xl text-primary pointer-events-none" />
                    ) : (
                      <Eye className="text-2xl text-primary pointer-events-none" />
                    )}
                  </button>
                }
              />
              {errors.password && (
                <p className="text-danger text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-end -mt-[10px] hidden">
              {/* <div className="flex items-center gap-7 text-description">
                <Checkbox
                  label="Remember Me"
                  {...register("rememberMe")}
                  className="text-[16px] w-[12px] text-description"
                /> Remember Me
              </div> */}
              <Link href="/forgot-password" className="text-[16px] text-danger">
                Forgot Password?
              </Link>
            </div>
            {/* fanau */}
            <div className="flex items-center justify-between -mt-[10px] h-[24px]">
              <div className="text-danger text-sm">
                {backendError ? <p>{backendError}</p> : <span>&nbsp;</span>}
              </div>
              <Link href="/forgot-password" className="text-[16px] text-danger">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Buttons and links */}
          <div className="flex flex-col gap-[10px] w-full mt-9">
            {/* <Button
              type="submit"
              className="w-full h-[48px] max-w-none bg-primary text-white border-none text-[20px] capitalize font-semibold rounded-[10px]"
            >
              Login
            </Button> */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-[48px] max-w-none bg-primary text-white border-none text-[20px] capitalize font-semibold rounded-[10px] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              {isLoading ? "Login" : "Login"}
            </Button>

            <p className="text-center text-body my-1">
              No Account?{" "}
              <Link href="/register" className="text-primary">
                Sign up
              </Link>
            </p>

            <div className="text-center">
              <div className="flex items-center gap-2">
                <hr className="flex-grow border-t border-gray-300" />
                <p className="text-[16px] text-[#787486]">Or Login with</p>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
            </div>
          </div>
        </Form>

        <div className="flex justify-center -mt-10">
          <GoogleLogin />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

//component
export const EyeSlashFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};