import { apiConfig } from "@/constant/baseurl";

export const authRoute = {
  loginUserRoute: () => `${apiConfig.baseUrl}/auths/login`,
  registerUserRoute: () => `${apiConfig.baseUrl}/auths/register`,
  otpUserRoute: () => `${apiConfig.baseUrl}/auths/verify`,
  resendOtpUserRoute: () => `${apiConfig.baseUrl}/auths/resend`,
};
