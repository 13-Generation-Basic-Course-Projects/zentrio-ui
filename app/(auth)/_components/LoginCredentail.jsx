"use client";
import React from "react";
import LoginForm from "./LoginForm";
import { Input } from "@heroui/react";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
export default function LoginCredentail() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-sky-50 p-4 relative overflow-hidden">
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

      <div className="relative w-full max-w-md">
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
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-sky-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-medium text-sky-400">Sign up</h1>
            <p className="text-sm text-sky-300 mt-1">
              Let's get you all set up so you can access your personal account.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-sky-600 mb-1"
              >
                Username
              </label>
              <Input
                isRequired
                className="max-w-xs"
                defaultValue="junior@heroui.com"
                label="Email"
                type="email"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-sky-600 mb-1"
              >
                Email
              </label>
              <Input
                isRequired
                className="max-w-xs"
                defaultValue="junior@heroui.com"
                label="Email"
                type="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-sky-600 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  isRequired
                  className="max-w-xs"
                  defaultValue="junior@heroui.com"
                  label="Email"
                  type="email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-sky-600 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  isRequired
                  className="max-w-xs"
                  defaultValue="junior@heroui.com"
                  label="Email"
                  type="email"
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

            <button
              type="submit"
              className="w-full bg-sky-400 hover:bg-sky-500 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Sign Up
            </button>

            <div className="text-center text-sm text-sky-600">
              <p>
                Have Account?{" "}
                <a
                  href="#"
                  className="text-sky-500 font-medium hover:underline"
                >
                  Sign In
                </a>
              </p>
              <p className="text-xs text-sky-300 mt-1">Or Sign up with</p>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path
                    d="M18.1711 8.36788H17.5V8.33333H10V11.6667H14.6898C14.0224 13.6071 12.1568 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C11.2843 5 12.4565 5.48697 13.3204 6.28465L15.8198 3.78532C14.3113 2.41895 12.2692 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 9.44117 18.2746 8.89588 18.1711 8.36788Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M2.62744 6.12116L5.51507 8.23742C6.25294 6.38873 7.98011 5 10 5C11.2843 5 12.4565 5.48697 13.3204 6.28465L15.8198 3.78532C14.3113 2.41895 12.2692 1.66667 10 1.66667C6.83832 1.66667 4.12277 3.48421 2.62744 6.12116Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M10 18.3333C12.2158 18.3333 14.2123 17.6168 15.7215 16.3045L13.0131 13.9826C12.1578 14.6356 11.1054 15 10 15C7.85328 15 6.00229 13.6214 5.32488 11.6969L2.49286 13.9429C3.97086 16.6395 6.71595 18.3333 10 18.3333Z"
                    fill="#34A853"
                  />
                  <path
                    d="M18.1711 8.36788H17.5V8.33333H10V11.6667H14.6898C14.3724 12.5902 13.7917 13.3972 13.0108 13.9832L13.0131 13.9826L15.7215 16.3045C15.5428 16.4661 18.3333 14.1667 18.3333 10C18.3333 9.44117 18.2746 8.89588 18.1711 8.36788Z"
                    fill="#FBBC05"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
