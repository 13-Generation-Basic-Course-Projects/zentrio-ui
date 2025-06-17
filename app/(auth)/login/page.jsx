import React from "react";
import LoginForm from "../_components/LoginForm";
import LoginCredentail from "../_components/LoginCredentail";
import { BackgroundAuthentication } from "@/components/background/Background";
import { SigninForm } from "../_components/form/SigninForm";

export default function Login() {
  return (
    <>
      <div className="w-full   ">
        <BackgroundAuthentication actionCard={<SigninForm />} />
      </div>
    </>
  );
}
