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
    <>
      {/* Sign up form */}
      <div className="bg-white/80 backdrop-blur-sm  shadow-lg p-8 border border-white  rounded-[20px]">
        <div className=" mb-8">
          <div className="flex flex-col items-start justify-start">
            <p className="text-h1 font-medium text-primary">Sign up</p>
            <p className="text-description">
              Let's get you all set up so you can access your personal account.
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
            <label htmlFor="terms" className="ml-2 block text-sm text-sky-600">
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

        {/* nh test sen button ng */}
        <div className="py-3 flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
