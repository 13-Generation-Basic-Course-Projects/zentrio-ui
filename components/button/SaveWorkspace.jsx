import React from "react";
import "../../styles/btnsave.css";
import { Button } from "@heroui/react";
import star from "../../assets/sparkles.png";
import Image from "next/image";
import Link from "next/link";
export default function SaveWorkspace() {
  return (
    <div>
      <Link href="/workspace/favoriteboard">
        <Button
          className="w-full text-white font-medium  h-[48px]"
          style={{
            background:
              "linear-gradient(90deg, #59BAD5 0%, #ABAAFF 58%, #59BAD5 95%)",
          }}
        >
          <span className="text-body-sm">My favorite</span>

          <div>
            <Image src={star} alt="star" className="h-5 w-5" />
          </div>
        </Button>
      </Link>
    </div>
  );
}
