import Footer from "@/components/layout/Footer";
import { NavbarLanding } from "@/components/layout/Navbar";
import React from "react";
import Image from "next/image";
import notfound from "../assets/error.png";
import { Button } from "@heroui/react";

import { ArrowLeftIcon } from "@/components/icon/everyicon";

export default function NotFound() {
  return (
    <div>
      <div className=" mx-[50px]">
        <NavbarLanding />
        <div className="h-screen mb-10 grid grid-cols-1 md:grid-cols-2 py-5">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="text-center text-h1">
              <p>OOOps!</p>
              <p>Page Not Found</p>
            </div>
            <div className="text-center text-primary">
              <p>This page doesn’t exist or was</p>
              <p>removed!</p>
              <p>We suggest you back to home</p>
            </div>
            <div>
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
      {/* <Footer /> */}
    </div>
  );
}
