import React from "react";

import { BackgroundAuthentication } from "@/components/background/Background";
import { OtpForm } from "../_components/form/OtpForm";
export default async function VerifyOTP({ searchParams }) {
  const emailProp = (await searchParams).email;
  console.log(`aaaaaaaaaa= ${process.env.NEXT_PUBLIC_API_URL}`);
  return (
    <>
      <div className="w-full   ">
        <BackgroundAuthentication
          actionCard={<OtpForm emailProp={emailProp} />}
        />
      </div>
    </>
  );
}
