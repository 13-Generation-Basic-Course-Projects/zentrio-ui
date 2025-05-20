"use client";
import React from "react";
import LoginForm from "./LoginForm";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { GoogleIcon } from "@/components/icon/everyicon";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
export default function LoginCredentail() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-sky-50 p-4 relative overflow-hidden font-poppin">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-20">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-sky-100/50 blur-3xl"></div>
        <div className="absolute bottom-[15%] left-[10%] w-72 h-72 rounded-full bg-sky-100/50 blur-3xl"></div>
        <div className="absolute top-[40%] left-[20%] w-40 h-40 rounded-full bg-teal-50/40 blur-2xl"></div>
        <div className="absolute bottom-[30%] right-[15%] w-56 h-56 rounded-full bg-teal-50/40 blur-2xl"></div>
      </div>

      {/* Decorative patterns */}
      <div className="absolute top-[15%] right-[10%] opacity-70">
        <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
          <path
            d="M0 10 S 25 0, 50 10, 75 0, 100 10"
            stroke="#B2EBF2"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="absolute bottom-[20%] left-[15%] opacity-70">
        <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
          <path
            d="M0 10 S 25 20, 50 10, 75 20, 100 10"
            stroke="#B2EBF2"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="absolute top-[30%] left-[5%] opacity-70">
        <svg width="150" height="20" viewBox="0 0 150 20" fill="none">
          <path
            d="M0 10 L150 10"
            stroke="#E0F7FA"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
        </svg>
      </div>
      <div className="absolute bottom-[40%] right-[5%] opacity-70">
        <svg width="150" height="20" viewBox="0 0 150 20" fill="none">
          <path
            d="M0 10 L150 10"
            stroke="#E0F7FA"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
        </svg>
      </div>
      <div className="absolute top-[20%] left-[20%] opacity-70">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0 V20 M0 10 H20" stroke="#80DEEA" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-[25%] right-[25%] opacity-70">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0 V20 M0 10 H20" stroke="#80DEEA" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute top-[60%] right-[10%] opacity-70">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0 V20 M0 10 H20" stroke="#80DEEA" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="absolute top-0 left-0 p-4">
          <div className="flex items-center text-sky-400 font-semibold">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#4DD0E1"
                strokeWidth="2"
              />
              <path
                d="M7 14C9.5 16.5 14.5 16.5 17 14"
                stroke="#4DD0E1"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
                fill="#4DD0E1"
              />
              <path
                d="M15.5 10C16.3284 10 17 9.32843 17 8.5C17 7.67157 16.3284 7 15.5 7C14.6716 7 14 7.67157 14 8.5C14 9.32843 14.6716 10 15.5 10Z"
                fill="#4DD0E1"
              />
            </svg>
            <span className="ml-1">ZenTrio</span>
          </div>
        </div>

        {/* Sign up form */}
        <div className="bg-white/80 backdrop-blur-sm  shadow-lg p-8 border border-white  rounded-[20px]">
          <div className=" mb-8">
            <div className="flex flex-col items-start justify-start">
              <p className="text-h1 font-medium text-primary">Sign up</p>
              <p className="text-description">
                Let's get you all set up so you can access your personal
                account.
              </p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-label  text-title mb-1"
              >
                Username
              </label>
              <Input
                isRequired
                //defaultValue="junior@heroui.com"
                //label="username"
                variant="bordered"
                placeholder="Username"
                type="text"
                color="white"
                classNames={{
                  inputWrapper:
                    "bg-white hover:border-transparent focus:border-transparent border-none",
                  input: "bg-white",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-label  text-title mb-1"
              >
                Email
              </label>
              <Input
                isRequired
                variant="bordered"
                placeholder="Email"
                type="text"
                color="white"
                classNames={{
                  inputWrapper:
                    "bg-white hover:border-transparent focus:border-transparent border-none",
                  input: "bg-white",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-label  text-title mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  isRequired
                  variant="bordered"
                  placeholder="Password"
                  type="password"
                  color="white"
                  classNames={{
                    inputWrapper:
                      "bg-white hover:border-transparent focus:border-transparent border-none",
                    input: "bg-white",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-label  text-title mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  isRequired
                  variant="bordered"
                  placeholder="Confirm Password"
                  type="password"
                  color="white"
                  classNames={{
                    inputWrapper:
                      "bg-white hover:border-transparent focus:border-transparent border-none",
                    input: "bg-white",
                  }}
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-sky-400 border-sky-200 rounded focus:ring-sky-300 mt-1"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-sky-600"
              >
                I agree to all the{" "}
                <a href="#" className="text-sky-500 hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-sky-500 hover:underline">
                  Privacy Policies
                </a>
              </label>
            </div>
            {/* s */}
            <div className="w-full max-w-full ">
              <Button
                type="submit"
                radius="md"
                className="w-full bg-primary text-white normal-case min-w-0 max-w-none "
              >
                Medium
              </Button>
            </div>
          </form>
          <div className=" hidden flex items justify-center mt-4">
            <Button className="bg-white  py-6">
              <GoogleIcon />
            </Button>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
