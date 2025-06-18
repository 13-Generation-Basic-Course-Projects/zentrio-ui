import React from "react";

import { BackgroundAuthentication } from "@/components/background/Background";
import { OtpForm } from "../_components/form/OtpForm";
export default async function VerifyOTP() {
  return (
    <>
      <div className="w-full   ">
        <BackgroundAuthentication
          actionCard={<OtpForm/>}
        />
      </div>
    </>
  );
}
