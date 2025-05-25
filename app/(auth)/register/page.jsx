import React from "react";

import { BackgroundAuthentication } from "@/components/background/Background";
import { OtpForm, SignUpForm } from "../_components/form/Form";
export default function Signup() {
  return (
    <>
      <div className="w-full   ">
        <BackgroundAuthentication actionCard={<SignUpForm />} />
      </div>
    </>
  );
}
