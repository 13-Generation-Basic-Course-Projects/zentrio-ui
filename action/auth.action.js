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
import { loginGoogleService } from "../service/auth.service";
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

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log("❌ Login failed:", result.error);
      return { ok: false, error: result.error };
    }

    console.log("✅ Login success");
    return { ok: true };
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
