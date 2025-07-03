"use client";
import Footer from "@/components/layout/Footer";
import { NavbarLanding } from "@/components/layout/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import notfound from "../assets/error.png";
import { Button } from "@heroui/react";
import { ArrowLeftIcon } from "@/components/icon/everyicon";
import { Token } from "@/constant/token";
import NotFoundTwo, {
  NotFoundVOne,
} from "@/components/notfoundcompo/NotFoundCompo";
export default function NotFound() {
  const [tokens, setToken] = useState(null);

  useEffect(() => {
    // Client-side token retrieval (replace with your logic)
    const getToken = async () => {
      try {
        // Example: Fetch token from cookies
        const userToken = await Token();
        const token = userToken.Credential;
        setToken(token || null);
      } catch (error) {
        console.error("Failed to fetch token:", error);
        setToken(null);
      }
    };
    getToken();
  }, []);
  return (
    <div>
      {/* max-h-[calc(100vh-1rem)]  overflow-y-auto scrollbar-hidden pb-[0px] */}
      <div className={`${tokens ? `mx-[0px]` : `mx-[80px]`} `}>
        {/* Hide NavbarLanding if token exists */}
        {!tokens && <NavbarLanding  tokens={tokens}/>}
        <div
          className={` h-screen mb-10 grid grid-cols-1 md:grid-cols-2 py-5 `}
        >
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className={` text-center text-h1 ${tokens ? `hidden` : ``}`}>
              <p>OOOps!</p>
              <p>Page Not Found</p>
            </div>
            <div
              className={`text-center text-primary ${tokens ? `hidden` : ``}`}
            >
              <p>This page doesn’t exist or was</p>
              <p>removed!</p>
              <p>We suggest you back to home</p>
            </div>

            <div className={`${!tokens ? `hidden` : ``}`}>
              <NotFoundTwo />
            </div>
            <div className={`${tokens ? `hidden` : ``}`}>
              <Button radius="md" className="bg-primary text-white">
                Go back Work
                <span>
                  {" "}
                  <ArrowLeftIcon strokeWidth={3} color={"pink"} size={5} />{" "}
                </span>
              </Button>
            </div>
          </div>
          <div className="">
            <Image
              src={notfound}
              className="w-full h-full object-contain"
              alt="notfound"
            />
          </div>
        </div>
      </div>
      {!tokens && <Footer />}
    </div>
  );
}
