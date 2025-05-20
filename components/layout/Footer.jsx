import React from "react";
import { Input, Button } from "@heroui/react";

export default function Footer() {
  return (
    <div className="w-full  overflow-hidden mt-8 relative font-poppin " style={{
    backgroundImage: "url('/map.png')",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>
      <div className="inset-0 flex flex-col items-center text-center ">
        {/* Main Heading */}
        <h2 className="text-[50px] max-[600px]:text-[45px] max-[500px]:text-[35px] max-[400px]:text-[25px] max-[300px]:text-[17px] max-[200px]:text-[15px] max-[100px]:text-[13px] sm:text-4xl md:text-[56px] font-semibold text-title">
          Take Your Teamwork
        </h2>

        {/* Subheading with "Next Level" */}
        <div className="flex max-[300px]:flex-col items-center justify-center text-[50px] max-[600px]:text-[45px] max-[500px]:text-[35px] max-[400px]:text-[25px] max-[300px]:text-[17px] max-[200px]:text-[15px] max-[100px]:text-[13px] sm:text-4xl md:text-[56px] font-semibold text-title">
          <h2 className="mb-2 ml-0 mr-0 block px-6">to the</h2>
          <div className="relative">
            <h2 className=" bg-slate-blue px-4 py-1 border-2 border-dashed border-primary rounded-xl text-primary text-[50px] max-[600px]:text-[45px] max-[500px]:text-[35px] max-[400px]:text-[25px] max-[300px]:text-[17px] max-[200px]:text-[15px] max-[100px]:text-[13px] sm:text-4xl md:text-[56px]">
              Next Level
            </h2>
            <div className="hidden sm:block absolute top-1/2 right-0 translate-x-[17px] -translate-y-1/2">
              <svg
                width="23"
                height="19"
                viewBox="0 0 23 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.35124 1.82367C2.24482 1.80814 2.1362 1.82497 2.03947 1.87196C1.94275 1.91896 1.86238 1.99395 1.80882 2.0872C1.75525 2.18045 1.73096 2.28765 1.7391 2.39488C1.74724 2.50211 1.78743 2.60442 1.85445 2.68852L13.1752 17.5838C13.2442 17.6743 13.3399 17.7409 13.4488 17.7739C13.5577 17.807 13.6743 17.8049 13.7819 17.768C13.8896 17.731 13.9828 17.6612 14.0485 17.5682C14.1142 17.4753 14.1489 17.364 14.1478 17.2502L14.0689 10.3991C14.0642 10.0121 14.1631 9.63085 14.3556 9.29504C14.548 8.95923 14.8268 8.68109 15.1632 8.48955L21.1233 5.10646C21.2222 5.0501 21.3008 4.96404 21.348 4.86048C21.3952 4.75692 21.4086 4.64112 21.3863 4.52953C21.3639 4.41794 21.307 4.31622 21.2236 4.23881C21.1402 4.16139 21.0345 4.11222 20.9215 4.09827L2.35124 1.82367Z"
                  fill="#59BAD5"
                  stroke="#59BAD5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Description Text */}
        <p className="text-body-sm mt-8 md:mt-16 max-w-[600px] max-[640px]:text-[13px] max-[640px]:px-10">
          Sign up now and empower your team with tools built for effortless
          <br className="hidden sm:block " />{" "}
          {/* Break only on larger screens */}
          collaboration and productivity.
        </p>

        {/* Email Form */}
        <div className="w-full max-w-[500px] mt-8 px-4 max-[640px]:px-7">
          <form className="relative w-full">
            <input
              placeholder="Enter your email address"
              className="w-full rounded-[8px] py-3 md:py-[15px] max-[400px]:text-[10px] max-[330px]:text-[7px] text-body-sm px-4 md:px-6 outline-none border-none bg-bgColor"
            />
            <Button className="bg-primary text-label-sm max-[400px]:text-[10px] max-[330px]:text-[7px] md:px-6 text-white border-none rounded-full px-4  absolute right-2 top-1/2 -translate-y-1/2 hover:-translate-y-1/2 hover:bg-primary-dark">
              Get Started
            </Button>
          </form>
        </div>

        <div className="grid max-[500px]:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-col-2 gap-6 md:gap-6 mt-8 md:mt-16 w-[75%] px-4">
          
          <div className="grid lg:grid-cols-5 grid-cols-5 md:grid-cols-5 sm:grid-cols-5 max-[500px]:grid-cols-1 gap-2 lg:gap-4 text-caption-tiny text-xs md:text-base">
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">Home</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">Features</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">Integrations</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">Support</a>
          </div>

          <div className="grid lg:grid-cols-5 grid-cols-5 md:grid-cols-5 sm:grid-cols-5 max-[500px]:grid-cols-1 gap-2 lg:gap-4  text-caption-tiny text-xs  md:text-base">
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">Facebook</a>
            <a href="#" className="hover:text-primary transition-colors whitespace-nowrap text-center">Discord</a>
          </div>

        </div>

        <div className="grid mb-14 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-6 pt-7 md:gap-0 mt-8 md:mt-7  px-4 text-caption-tiny tracking-widest text-description border-t-[1.4px] border-title w-[75%]">
          <p>ESTABLISHED IN</p>
          <p>ZENTRIO. ALL RIGHTS RESERVED</p>
          <p>PRIVACY POLICY</p>
        </div>

        <div className="text-[#EFFCFF]  bg-gradient-to-t from-[#2E616F]/20 to-transparent w-full flex justify-center items-end overflow-hidden ">
          <p className="leading-[0.8] tracking-tight lg:text-[300px] md:text-[200px] sm:text-[150px] max-[640px]:text-[130px] max-[570px]:text-[120px] max-[480px]:text-[110px]  max-[400px]:text-[100px] max-[350px]:text-[90px]  max-[320px]:text-[80px] max-[290px]:text-[70px]  max-[250px]:text-[60px] max-[210px]:text-[50px] max-[180px]:text-[40px] max-[150px]:text-[30px]">
            Zentrio
          </p>
        </div>
      </div>
    </div>
  );
}
