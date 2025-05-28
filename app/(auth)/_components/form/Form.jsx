"use client";

import { Input } from "@heroui/input";
import { Button, Checkbox, Form, InputOtp } from "@heroui/react";
import { useState } from "react";
import Google from "@/assets/googleIcon.png";
import Image from "next/image";
import Link from "next/link";

export const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }

    // Add form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[1728px] h-[917px]  flex items-center justify-center">
        <Form
          onSubmit={handleSubmit}
          className="space-y-4 md:w-[640px] h-fit bg-white px-[45px] py-[40px] rounded-[20px] shadow-lg gap-[50px]"
        >
          <div>
            <p className="text-h1 text-primary">
              <span className="font-bold">Sign up</span>
            </p>
            <p className="text-body text-[#787486]">
              Let’s get you all st up so you can access your personal account
            </p>
          </div>
          <div className="gap-[50px] flex flex-col w-full">
            <div className="gap-[15px] flex flex-col">
              <div className="w-full">
                <label
                  htmlFor="username"
                  className="block font-medium text-gray-700"
                >
                  <span className="text-body">Username</span>
                </label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  variant="bordered"
                  radius="sm"
                  required
                  className="w-full text-body-sm"
                  size="lg"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700"
                >
                  <span className="text-body">Email</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  radius="sm"
                  variant="bordered"
                  className="w-full text-body-sm"
                  size="lg"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block font-medium text-gray-700"
                >
                  <span className="text-body">Password</span>
                </label>
                <Input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  radius="sm"
                  required
                  className="max-w-none text-body-sm"
                  size="lg"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="confirmpassword"
                  className="block font-medium text-gray-700"
                >
                  <span className="text-body">Confirm Password</span>
                </label>
                <Input
                  id="confirmpassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  radius="sm"
                  required
                  className="max-w-none text-body-sm"
                  size="lg"
                />
              </div>
              <div className="flex items-center gap-[25px]">
                <Checkbox
                  label="I agree to all the Terms and Privacy Policies"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="w-[12px]"
                  required
                />
                <span className="text-[#787486] text-body-sm">
                  I agree to all the <span className="text-primary">Terms</span>{" "}
                  and <span className="text-primary">Privacy Policies</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <Button className="w-full bg-primary text-white normal-case min-w-0 max-w-none  border-none">
                <Link href="/verify">Create account</Link>
              </Button>
              <p className="text-center text-body">
                Have an account?{" "}
                <Link href="/login" className="text-primary text-body">
                  Sign in
                </Link>
              </p>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <hr className="flex-grow border-t border-gray-300" />
                  <p className="text-body-sm text-[#787486]">Or sign up with</p>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>

                {/* logo */}
                <div className="flex justify-center mt-2">
                  <Image
                    src={Google}
                    alt="Google Icon"
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const SigninForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Validation logic
  //   if (!formData.email || !formData.password) {
  //     alert("Email and Password are required!");
  //     return;
  //   }

  //   // Add form submission logic here
  //   console.log("Form submitted:", formData);
  // };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[1728px] h-[1117px] flex items-center justify-center">
        <Form
          // onSubmit={handleSubmit}
          className="w-[640px] h-fit bg-white px-[55px] py-[40px] rounded-[20px] shadow-lg gap-[50px]"
        >
          <div>
            <p className="text-h1 text-primary">
              <span className="font-bold">Login</span>
            </p>
            <p className="text-body text-[#787486]">
              Login to access your Zentrio account
            </p>
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                radius="sm"
                variant="bordered"
                className="w-full"
                size="lg"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                radius="sm"
                required
                className="w-full"
                size="lg"
                endContent={
                  <button
                    aria-label="toggle password visibility "
                    className=" border-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none " />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Checkbox
                  label="Remember Me"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="text-sm w-[12px]"
                />
                <p className="text-description">Remember me</p>
              </div>
              <Link href="/forgot-password" className="text-sm text-danger">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="w-full gap-[10px] flex flex-col">
            <Link href="/workspace" className="text-white text-body">
              <Button className="w-full bg-primary text-white normal-case min-w-0 max-w-none  border-none">
                Login
              </Button>
            </Link>
            <p className="text-center text-body">
              No Account ?{" "}
              <Link href="/register" className="text-primary text-body">
                Sign up
              </Link>
            </p>
            <div className="text-center">
              <div className="flex items-center gap-2">
                <hr className="flex-grow border-t border-gray-300" />
                <p className="text-body-sm text-[#787486]">Or sign up with</p>
                <hr className="flex-grow border-t border-gray-300" />
              </div>
              <div className="flex justify-center mt-2">
                <Image
                  src={Google}
                  alt="Google Icon"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const ForgetPass = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.email) {
      alert("Email is required!");
      return;
    }

    // Add form submission logic here
    console.log("Password reset request submitted for:", formData.email);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[1728px] h-[1117px] bg-bgColor flex items-center justify-center">
        <Form
          onSubmit={handleSubmit}
          className="w-[640px] h-fit bg-white px-[55px] py-[40px] rounded-[20px] shadow-lg gap-[50px]"
        >
          <div>
            <Link
              href="#"
              className="flex items-center gap-3 pb-[5%] text-body-sm text-primary"
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
            <div className="flex flex-col gap-4">
              <p className="text-h1 text-primary">
                <span className="font-bold">Forgot Password</span>
              </p>
              <p className="text-body text-[#787486]">
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                radius="sm"
                variant="bordered"
                className="w-full placeholder:text-input-placeholder text-input"
                size="lg"
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary text-white">
            <p className="text-h6">Submit</p>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export const SetNewPass = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.email || !formData.password) {
      alert("Email and Password are required!");
      return;
    }

    // Add form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[1728px] h-[1117px]  flex items-center justify-center">
        <Form
          onSubmit={handleSubmit}
          className="w-[640px] h-fit bg-white px-[55px] py-[40px] rounded-[20px] shadow-lg gap-[50px]"
        >
          <div>
            <Link
              href="#"
              className="flex items-center gap-3 pb-[5%] text-body-sm text-primary"
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
              <p>Back to Email</p>
            </Link>
            <div className="flex flex-col gap-4">
              <p className="text-h1 text-primary">
                <span className="font-bold">Set a password</span>
              </p>
              <p className="text-body text-[#787486]">
                Your previous password has been reseted. Please set a new
                password for your account.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                radius="sm"
                required
                className="w-full"
                size="lg"
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
            </div>
            <div className="relative">
              <label
                htmlFor="re-enter password"
                className="block text-sm font-medium text-gray-700"
              >
                Re-enter Password
              </label>
              <Input
                id="re-enter password"
                name="re-enter password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
                type={isVisible ? "text" : "re-enter password"}
                variant="bordered"
                radius="sm"
                required
                className="w-full"
                size="lg"
                endContent={
                  <button
                    aria-label="toggle re-enter password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
            </div>
          </div>
          <div className="w-full gap-[10px] flex flex-col">
            <Button type="submit" className="w-full bg-primary text-white">
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const OtpForm = () => {
  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize an array with 6 empty strings

  const handleChange = (value, index) => {
    if (value.length > 1) return; // Ensure only one character is entered
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpValue = otp.join(""); // Combine all values into a single string
    if (otpValue.length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }

    // Add form submission logic here
    console.log("OTP submitted:", otpValue);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[1728px] h-[1117px]  flex items-center justify-center">
        <Form
          onSubmit={handleSubmit}
          className="w-[640px] h-fit bg-white px-[55px] py-[40px] rounded-[20px] shadow-lg gap-[50px]"
        >
          <div>
            <Link
              href="#"
              className="flex items-center gap-3 pb-[5%] text-body-sm text-primary"
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
              <p>Back to Sign in</p>
            </Link>
            <div className="flex flex-col gap-4">
              <p className="text-h2 text-primary">
                <span className="font-bold">Please check your email</span>
              </p>
              <p className="text-body text-primary">
                We’ve sent a code to helloworld@gmail.com
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[15px] w-full">
            <div className="flex w-full justify-between">
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength={1}
                  className="rounded-[15px] w-16 h-16 text-center border-[1.5px] border-primary focus:outline-none focus:ring-2 focus:ring-primary text-primary font-semibold text-body"
                />
              ))}
            </div>
          </div>
          <div className="w-full gap-[10px] flex flex-col">
            <Button className="w-full bg-primary text-white max-w-none">
              <Link href="/login" className="text-white text-body">
                Submit
              </Link>
            </Button>
          </div>
          <div className="w-full">
            <p className="font-bold text-description text-center">
              <span className="text-body">Send Code again : 03:12</span>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

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
