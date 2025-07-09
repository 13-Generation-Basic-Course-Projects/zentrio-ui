import React from "react";

import { BackgroundAuthentication } from "@/components/background/Background";
import { SignUpForm } from "../_components/form/SignupForm";
export default function Signup() {
  return (
    <>
      <div className="w-full  h-auto ">
        <BackgroundAuthentication actionCard={<SignUpForm />} />
      </div>
    </>
  );
}
