"use server";
import { signIn, signOut } from "@/auth";
import {
  loginZentrioService,
  otpZentrioService,
  registerZentrioService,
} from "../service/auth.service";
import { useAuthStore } from "../lib/store";
//google login
export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/test" });
}
//google logout
export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

//creadentain zentrio

/*
 * login
 */
export async function zentrioLoginAction(formData) {
  const { email, password } = formData; // destructure directly

  await loginZentrioService(email, password);
}

/*
 * rgister
 */
export async function zentrioRegisterAction(data) {
  const { username, gender, email, password, profileImage } = data;
  console.log("🧠 Incoming data to action:", data);
  await registerZentrioService({
    username,
    gender,
    email,
    password,
    profileImage,
  });
}

/*
 * otp
 */
export async function zentrioOtpAction(data) {
  const { otp, email } = data;

  console.log("🧠 Incoming data to action:", data, email); // now this will show the actual email
  await otpZentrioService({ email, otp });
}
