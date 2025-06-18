"use server";
import { signIn, signOut } from "@/auth";
import {
  forgotPasswordService,
  loginZentrioCredentailService,
  otpZentrioService,
  registerZentrioService,
  resendOtpForgotPasswordService,
  resendOtpZentrioService,
} from "../service/auth.service";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

//google login
export async function doSocialLogin(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/workspace" });
}
//google logout
// export async function doLogout() {
//   await signOut({ redirectTo: "/" });
// }

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

export async function zentrioOtpAction({ email, otp, type }) {
  try {
    const result = await otpZentrioService({ email, otp, type });
    if (!result?.ok) {
      console.error("Failed to verify the otp");
    }
    return result;
  } catch (error) {
    console.error("Failed to verify the otp");
  }
}


/*
* resend otp
*/

export async function zentrioResendOtpAction({ email, type }) {
  console.log("email in the action", email);

  try {
    const result = await resendOtpZentrioService({ email, type });
    if (!result?.success) {
      console.error("Failed to resend otp");
    }
    return result;
  } catch (error) {
    console.error("Failed to resend otp for VERIFY or RESET", error);
    return { success: false, error: "Unexpected error" };
  }
}


/*
* resendotpForgotAction
*/
export async function resendOtpForgotPasswordAction({ email, type }) {
  try {
    const result = await resendOtpForgotPasswordService({ email, type });
    if (!result?.success) {
      console.error("Failed to resend otp");
    }
    return result;
  } catch (error) {
    console.error("Failed to resend otp for VERIFY or RESET", error);
    return { success: false,};
  }
}


// export asy

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

export async function zentrioForgotPasswordAction({
  email,
  password,
  confirmPassword,
}) {
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

export const doLogout = async () => {
  const cookieStore = cookies();

  // Get all cookies and clear them
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  // Perform NextAuth signout
  await signOut({ redirect: false });

  // Redirect to login page
  redirect("/");
};
