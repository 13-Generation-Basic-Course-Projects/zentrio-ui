import React from "react";

import { BackgroundAuthentication } from "@/components/background/Background";
import { SetNewPass } from "../_components/form/Form";
export default function Login() {
  return (
    <>
      <div className="w-full   ">
        <BackgroundAuthentication actionCard={<SetNewPass />} />
      </div>
    </>
  );
}
