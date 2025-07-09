"use server";

import { redirect } from "next/navigation";
import { authRoute } from "../routes/authRoute";
import { apiConfig } from "@/constant/baseurl";
/*
 * register
 */
export const registerZentrioService = async ({
  username,
  gender,
  email,
  password,
  profileImage,
}) => {
  try {
    // Get endpoint URL from your route builder
    const url = authRoute.registerUserRoute();

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        gender: "OTHER",
        email,
        password,
        profileImage,
      }),
    });
    const data = await res.json();
    //  ("📥 Backend responded with:", data);
    if (res?.status === 201 || res?.success) {
      redirect(`/verify?email=${email}`);
    }
    return data;
  } catch (error) {
    //console.error(" Failed to create board:", error.message);
    throw error; // Re-throw if you want to handle it higher up
  }
};

/*
 * login
 */
export const loginZentrioService = async (email, password) => {
  try {
    const userData = await loginZentrioService(email, password);
    // login success: redirect without sensitive info
  } catch (err) {
    // show error message to user
    //  (err);
  }
};
/*
 * login credentails
 */
export const loginZentrioCredentailService = async ({ email, password }) => {
  try {
    const url = authRoute.loginUserRoute();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    //  ("📥 Backend responded with:", data);
    //  ("BBBBB", data?.payload?.token);

    return data; // just return the data, don't redirect here
  } catch (error) {
    //console.error("Login service error:", error.message);
    throw error;
  }
};

/*
 * otp
 */
export const otpZentrioService = async ({ email, otp, type }) => {
  //  ("email:", email, "otp:", otp);
  try {
    // Get endpoint URL from your route builder
    const url = `${authRoute.otpUserRoute()}?email=${email}&otp=${otp}&type=${type}`;

    //  (url);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    //console.error(" Failed to create board:", error.message);
    throw error; // Re-throw if you want to handle it higher up
  }
};
/*
 * resend otp
 */
export const resendOtpZentrioService = async ({ email, type }) => {
  //  ("emaillllllllllllllllllllllll", email);
  //  ("type in service", type);

  const url = authRoute.resendOtpUserRoute();

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, type }),
    });

    const data = await res.json();

    //  ("Backend response status:", res.status, "data:", data);

    if (res.status === 201 || data?.success) {
      return { success: true };
    } else {
      //console.error("OTP resend failed:", data);
      return {
        success: false,
        error: data.detail || data.message || "Failed to resend OTP",
      };
    }
  } catch (err) {
    //console.error("OTP resend request error:", err);
    return {
      success: false,
      error: "Failed to resend OTP. Please try again.",
    };
  }
};

/*
 * login google
 */
/*

export const loginGoogleService = async ({ idToken }) => {
  try {
    const url = `${apiConfig.baseUrl}/auths/login/third-party`;
    //  ("Google ID Token:", idToken); // Debug
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken, provider: "google" }),
    });
    const data = await response.json(); // Fix: Use 'response' instead of 'res'
    //  ("Backend Response:", data); // Debug
    return data;
  } catch (error) {
    //console.error("Login service error:", error.message);
    throw error;
  }
};

*/
/*
 * resend otp forgot
 */

export const resendOtpForgotPasswordService = async ({ email, type }) => {
  try {
    const res = await fetch(
      `${authRoute.resendOtpUserRoute()}?email=${encodeURIComponent(
        email
      )}&type=${type}`,
      {
        method: "POST",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to send OTP");
    }
    const data = await res.json();
    //  ("OTP sent response:", data);
    return data;
  } catch (error) {
    //console.error("Can't reset password", error);
    throw error;
  }
};

/*
 * reset password service
 */
export const forgotPasswordService = async ({
  email,
  password,
  confirmPassword,
}) => {
  try {
    const res = await fetch(authRoute.resetPasswordRoute(email), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to send OTP");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    //console.error("Can't reset password", error);
    throw error;
  }
};

export const loginGoogleService = async ({ idToken }) => {
  try {
    const url = `${apiConfig.baseUrl}/auths/login/third-party`;
    //  ("🔍 Google Login Debug:");
    //  ("URL:", url);
    //  ("Google ID Token:", idToken ? "Present" : "Missing");
    //  ("Backend URL:", apiConfig.baseUrl);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken, provider: "google" }),
    });
    
    //  ("Backend Response Status:", response.status);
    //  ("Backend Response Headers:", Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    //  ("Backend Response Data:", data);
    
    if (!response.ok) {
      //console.error("❌ Backend request failed:", response.status, data);
      return {
        success: false,
        message: data.message || `Backend error: ${response.status}`,
        status: response.status,
        error: data,
      };
    }
    
    if (!data.success) {
      //console.error("❌ Backend authentication failed:", data);
      return {
        success: false,
        message: data.message || "Backend authentication failed",
        error: data,
      };
    }
    
    //  ("✅ Backend authentication successful:", data);
    return {
      success: true,
      payload: {
        token: data.payload.token,
        user: {
          userId: data.payload.user?.userId || data.payload.sub,
          email: data.payload.user?.email,
          username: data.payload.user?.username || data.payload.user?.name,
          role: data.payload.user?.role || "user",
        },
      },
    };
  } catch (error) {
    //console.error("❌ LoginGoogleService error:", error.message);
    //console.error("Error details:", error);
    return {
      success: false,
      message: "Failed to authenticate with backend",
      error: error.message,
    };
  }
};

export const loginCredentialService = async ({ email, password }) => {
  const url = authRoute.loginCredential();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  return data;
};
