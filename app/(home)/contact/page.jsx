import React from "react";

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
    <div className="flex flex-col items-center w-full max-w-[1728px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      {/* section 1 */}
      <section className="w-full max-w-[1328px] py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold text-title mb-2">
            Contact our Friendly Team
          </h1>
          <p className="text-[16px] sm:text-[18px] font-semibold text-description">
            Let us know how can we help.
          </p>
        </div>

        {/* card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-[1328px] mx-auto">
          {/* Chat Support */}
          <div className="bg-white flex flex-col items-start text-left gap-2 p-4 sm:p-6 border rounded-xl">
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <Mail className="w-12 h-12 text-[#59BAD5]" />
            </div>
            <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#0F3D56]">
              Chat to support
            </h3>
            <p className="text-[16px] sm:text-[18px] text-black">
              We are here to help.
            </p>
            <a
              href="#"
              className="text-[16px] sm:text-[18px] text-primary font-medium"
            >
              zentriohrd@gmail.com
            </a>
          </div>

          {/* Visit Us */}
          <div className="bg-white flex flex-col items-start text-left gap-2 p-4 sm:p-6 border rounded-xl">
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <MapPin className="w-12 h-12 text-[#59BAD5]" />
            </div>
            <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#0F3D56]">
              Visit Us
            </h3>
            <p className="text-[16px] sm:text-[18px] text-black">
              Visit our office.
            </p>
            <a
              href="#"
              className="text-[16px] sm:text-[18px] text-primary font-medium"
            >
              Phnom Penh
            </a>
          </div>

          {/* Contact Us */}
          <div className="bg-white flex flex-col items-start text-left gap-2 p-4 sm:p-6 border rounded-xl">
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <Phone className="w-12 h-12 text-[#59BAD5]" />
            </div>
            <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#0F3D56]">
              Contact Us
            </h3>
            <p className="text-[16px] sm:text-[18px] text-black">
              Mon-Fri from 8 AM - 5 PM.
            </p>
            <a
              href="#"
              className="text-[16px] sm:text-[18px] text-primary font-medium"
            >
              +(855) 12345678
            </a>
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="w-full max-w-[1328px] py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold text-[#0F3D56] mb-2">
            Get In Touch with Us
          </p>
          <p className="text-base sm:text-lg font-medium text-gray-600">
            Get in touch to discover how we can help you achieve your goals and
            provide <br /> solutions tailored to your needs about our service.
          </p>
        </div>
      </section>

      {/* section 3 */}
      <section className="w-full max-w-[1328px] grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {/* form */}
        <div className="bg-[#F2F7FA] p-6 sm:p-10 rounded-[24px] w-full">
          <div className="mb-6 sm:mb-8 text-center">
            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#0F3D56] leading-tight mb-2">
              Have Question? We’re Just a Message Away!
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Fill out the form below, and one of our team members will get back
              to you shortly.
            </p>
          </div>

          <form className="space-y-4 text-left">
            <div>
              <label
                htmlFor="name"
                className="block font-semibold text-[#0F3D56] mb-1"
              >
                User Name
              </label>
              <input
                id="name"
                placeholder="User name"
                className="w-full rounded-[16px] px-4 py-3 bg-white border placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59BAD5]"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block font-semibold text-[#0F3D56] mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                placeholder="+885 123456789"
                className="w-full rounded-[16px] px-4 py-3 bg-white border placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59BAD5]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-[#0F3D56] mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className="w-full rounded-[16px] px-4 py-3 bg-white border placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#59BAD5]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-semibold text-[#0F3D56] mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message here"
                rows={5}
                className="w-full rounded-[16px] px-4 py-3 bg-white border placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#59BAD5]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-[999px] bg-[#59BAD5] text-white text-base font-semibold py-3 hover:bg-[#4DAAC4] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* feature */}
        <div className="flex flex-col justify-center">
          <div className="space-y-4 bg-bgColor p-3 md:p-5 rounded-xl relative">
            {/* image */}
            <div className="absolute -z-10 top-[-65%] hidden lg:block">
              <Image
                src={HumanSayHi}
                alt="Contact Us"
                className="w-[471px] h-[643px] rounded-full"
              />
            </div>

            {/* items */}
            {[
              {
                icon: CheckCircle,
                title: "Task Management",
                desc: "Create tasks from start to finish with easy-to-use tools.",
              },
              {
                icon: Calendar,
                title: "Calendar & Scheduling",
                desc: "Keep track of your deadlines with organized project timeline.",
              },
              {
                icon: FileText,
                title: "Document Collaboration",
                desc: "Work on files, share, and listen—without leaving the platform.",
              },
              {
                icon: Bell,
                title: "Notifications & Team Communication",
                desc: "Keep everyone aligned and in sync.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl p-3"
              >
                <div className="bg-primary h-7 w-7 md:h-10 md:w-10 rounded-full flex items-center justify-center">
                  <Icon className="md:h-6 md:w-6 text-white flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-medium text-title">{title}</h4>
                  <p className="text-description text-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
