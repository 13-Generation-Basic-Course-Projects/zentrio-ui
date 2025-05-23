import React from "react";
import cher from "@/public/image/teacherDara.png";
import "@/styles/box.css";
import Image from "next/image";

//useage : http://localhost:3000/contact
export default function ContactUs() {
  return (
    <div className="h-screen w-full   bg-black flex justify-center">
      <div className="card">
        <div className="box">
          <div className="imgBx">
            <Image src={cher} />
          </div>
        </div>
        <div className="box">
          <div className="imgBx">
            <Image src={cher} />
          </div>
        </div>
        <div className="circle">
          <div className="imgBx">
            <Image src={cher} />
          </div>
        </div>
      </div>
    </div>
  );
}
