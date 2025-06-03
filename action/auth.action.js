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
export async function zentrioLoginCredentailAction(data) {
  try {
    const { email, password } = data;
    const res = await loginZentrioCredentailService({ email, password });
    console.log("7777777", res);
    if (res?.success) {
      try {
        const { email, password } = data;
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
      } catch (e) {
        console.log("err at login creadentail", e);
      }
      return res;
    }
  } catch (error) {
    console.log("Login error:", error);
    return { ok: false, error: "Server error" };
  }
}

/*
 * rgister
 */
export async function zentrioRegisterAction(data) {
  const { username, gender, email, password, profileImage } = data;

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
