"use server";
import { signIn, signOut } from "@/auth";
import {
  loginZentrioCredentailService,
  loginZentrioService,
  otpZentrioService,
  registerZentrioService,
} from "../service/auth.service";
import { useAuthStore } from "../lib/store";
import { redirect } from "next/navigation";
import clsx from "clsx";

//google login
export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/test" });
}
//google logout
export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

//creadentail zentrio

/*
 * login
 */

export async function zentrioLoginCredentailAction(email, password) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (e) {
    redirect("/login");
  }

  redirect("/workspace");
}

/*
 * rgister
 */
export async function zentrioRegisterAction(data) {
  const { username, gender, email, password, profileImage } = data;

  // getEmail = email; //defalut
  console.log("email", email);
  await registerZentrioService({
    username,
    gender,
    email,
    password,
    profileImage,
  });
  return { email };
}

/*
 * otp
 */

export async function zentrioOtpAction(data) {
  const { email, otp } = data; // Destructure both email and otp from data
  await otpZentrioService({ email, otp }); // Pass email and otp to the service
}
