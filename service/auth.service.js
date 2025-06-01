import { redirect } from "next/navigation";
import { authRoute } from "../routes/authRoute";
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
        gender: "RATHER_NOT_TO_SAY",
        email,
        password,
        profileImage,
      }),
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);
    if (res?.status === 201 || res?.success) {
      redirect("/verify");
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
  } catch (err) {
    // show error message to user
    console.log(err);
  }
};

/*
 * otp
 */
export const otpZentrioService = async ({ email, otp }) => {
  console.log("email", email);
  const url = authRoute.otpUserRoute();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp: otp,
      }),
    });
    const data = await res.json();
    console.log("📥 Backend responded with:", data);
    if (res?.status === 201 || res?.success) {
      redirect("/workspace");
    }
  } catch (err) {
    // show error message to user
    console.log(err);
  }
};
