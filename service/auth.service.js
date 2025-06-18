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
    console.log("📥 Backend responded with:", data);
    if (res?.status === 201 || res?.success) {
      redirect(`/verify?email=${email}`);
    }
    return data;
  } catch (error) {
    console.error(" Failed to create board:", error.message);
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
    console.log("userdata ", u);
  } catch (err) {
    // show error message to user
    console.log(err);
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
    console.log("datahhh ", data);
    console.log("📥 Backend responded with:", data);
    console.log("BBBBB", data?.payload?.token);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};

/*
 * otp
 */
export const otpZentrioService = async ({ email, otp, type }) => {
  console.log("email:", email, "otp:", otp);
  try {
    // Get endpoint URL from your route builder
    const url = `${authRoute.otpUserRoute()}?email=${email}&otp=${otp}&type=${type}`;

    console.log(url);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);
    // if (res?.status === 200 || res?.success) {
    //   redirect(`/login`);
    // }
    return data;
  } catch (error) {
    console.error(" Failed to create board:", error.message);
    throw error; // Re-throw if you want to handle it higher up
  }
};
/*
 * resend otp
 */
export const resendOtpZentrioService = async ({ email, otp }) => {
  console.log("email:", email, "otp:", otp);
  //const url = authRoute.otpUserRoute();
  const urlResendOTP = authRoute.resendOtpUserRoute();
  console.log("OTP API URL:", url);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, type: "VERIFY" }),
    });
    const data = await res.json();
    console.log("Backend response status:", res.status, "data:", data);
    if (res.status === 201 || data?.success) {
      redirect("/workspace");
      return { success: true };
    } else {
      console.error("OTP verification failed:", data);
      return { success: false, error: data.message || "Invalid OTP" };
    }
  } catch (err) {
    console.error("OTP request error:", err);
    return { success: false, error: "Failed to verify OTP. Please try again." };
  }
};

/*
 * login google
 */
export const loginGoogleService = async ({ accesToken }) => {
  try {
    const url = `${apiConfig.baseUrl}/auths/login/third-party`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken: accesToken }),
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);
    console.log("BBBBB", data?.payload?.token);

    return data; // just return the data, don’t redirect here
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};

/*
 * forgot password
 */

// export const forgotPasswordService = async ({ email }) => {
//   try {
//     await resendOtpZentrioService({ email, type: "RESET" });
//   } catch (error) {
//     console.error("Can't reset password", error);
//     throw error;
//   }
// };

export const resendOtpForgotPasswordService = async (data) => {
  const { email } = data;
  const type = "RESET";

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
    console.log("OTP sent response:", data);
    return data;
  } catch (error) {
    console.error("Can't reset password", error);
    throw error;
  }
};


/*
 * reset password service
 */
export const forgotPasswordService = async ({ email, password, confirmPassword }) => {
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
    console.error("Can't reset password", error);
    throw error;
  }
};
