import React from "react";
import LoginForm from "../_components/LoginForm";
import LoginCredentail from "../_components/LoginCredentail";
import { BackgroundAuthentication } from "@/components/background/Background";
import { ForgetPass, SigninForm } from "../_components/form/Form";

export default function ForgotPassword() {
  return (
    <>
      <div className="w-full   ">
        <BackgroundAuthentication actionCard={<ForgetPass />} />
      </div>
    </>
  );
}
