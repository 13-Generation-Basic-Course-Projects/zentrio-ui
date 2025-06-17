"use server";
import { signIn, signOut } from "@/auth";
import {
  forgotPasswordService,
  loginZentrioCredentailService,
  otpZentrioService,
  registerZentrioService,
  resetPasswordService,
} from "../service/auth.service";

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

// google login
export async function zentrioLoginWithGoogle(idToken, provider) {
  try {
    const token = await loginWithGoogleZentrioService({ idToken, provider });
    // token is the JWT from backend on success
    if (token) {
      // You can save token to localStorage, context, or use it directly
      redirect("/workspace");
    } else {
      console.error("Login failed: No token received");
      return null;
    }
  } catch (error) {
    console.error("Login with Google failed:", error.message);
    return null;
  }
}

/* 
* forgot password
*/

export async function zentrioForgotPasswordAction({ email, password, confirmPassword }) {
  try { 
    const result = await forgotPasswordService({
      email,
      password,
      confirmPassword,
    });
    if (!result.ok) {
      throw new error("failed to reset the new password");
    }
    return { success: true };
  } catch (error) {
    console.error("can't reset the new password ");
    return { success: false };
  }
}