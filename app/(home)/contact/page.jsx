import React from "react";
import cher from "@/public/image/teacherDara.png";
import "@/styles/box.css";
import Image from "next/image";

//useage : http://localhost:3000/contact

import {
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  Calendar,
  FileText,
  Bell,
} from "lucide-react";
import { Button, Input, Textarea } from "@heroui/react";
import Image from "next/image";
import contact from "../../../assets/contact.png";
import HumanSayHi from "@/assets/HumanSayHi.png";

export default function ContactUs() {
  return (
    <div className="h-screen w-full   ">
      <div className="h-screen w-full flex justify-center items-center">
        contact
      </div>
      {/* you can design by your own dont use  <main></main> tag */}
    </div>
  );
}
