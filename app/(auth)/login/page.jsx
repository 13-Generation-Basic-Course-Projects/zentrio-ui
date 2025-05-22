import React from "react";
import LoginForm from "../_components/LoginForm";
import LoginCredentail from "../_components/LoginCredentail";
import { BackgroundAuthentication } from "@/components/background/Background";

export default function Login() {
  return (
    <>
      <div className="w-full   ">
        <BackgroundAuthentication actionCard={<LoginCredentail />} />
      </div>
    </>
  );
}
