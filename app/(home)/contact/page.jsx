import CardBoard from "@/components/card/CardBoard";
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
export default function ContactUs() {
  const cardData = [
    {
      id: 1,
      title: "UX/UI Design",
      color:
        "https://i.pinimg.com/736x/bc/26/f9/bc26f9611f86e033a6038dc3f447323e.jpg",
    },
    {
      id: 2,
      title: "Web Development",
      color:
        "https://i.pinimg.com/736x/e7/7a/cc/e77acca664428e704871764d9cfa418f.jpg",
    },
    {
      id: 3,
      title: "Marketing",
      color:
        "https://i.pinimg.com/736x/2f/98/1b/2f981b9f8e2223221a5791191bb1ccf5.jpg",
    },
    {
      id: 4,
      title: "Photography",
      color:
        "https://i.pinimg.com/736x/18/69/f9/1869f99d21fe327a575042e8f20be496.jpg",
    },
    {
      id: 5,
      title: "Content Writing",
      color:
        "https://i.pinimg.com/736x/da/44/18/da4418f3dd872927e881116327982b55.jpg",
    },
    {
      id: 6,
      title: "SEO",
      color:
        "https://i.pinimg.com/736x/bc/26/f9/bc26f9611f86e033a6038dc3f447323e.jpg",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* section 1 */}
      <section className="w-full max-w-[1328px] py-8 sm:py-12 lg:py-16 ">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-h3 sm:text-h2 font-bold text-[#0F3D56] mb-2">
            Contact our Friendly Team
          </h1>
          <p className="text-body-lg font-semibold text-gray-600">
            Let us know how can we help.
          </p>
        </div>
        {/* card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-[1328px] mx-auto">
          {/* chat support card */}
          <div className="bg-white flex flex-col items-center p-4 sm:p-6 border rounded-large">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#59BAD5]" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#0F3D56] mb-1">
              Chat to support
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
              We are here to help.
            </p>
            <a
              href="#"
              className="text-[#0F9675] text-xs sm:text-sm font-medium"
            >
              zentriohrd@gmail.com
            </a>
          </div>
          {/* Visit Us */}
          <div className="bg-white flex flex-col items-center p-4 sm:p-6 border rounded-large">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#59BAD5]" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#0F3D56] mb-1">
              Visit Us
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
              Visit our office.
            </p>
            <a
              href="#"
              className="text-[#0F9675] text-xs sm:text-sm font-medium"
            >
              Phnom Penh
            </a>
          </div>
          {/* Contact Us */}
          <div className=" bg-white flex flex-col items-center p-4 sm:p-6 border rounded-large">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#59BAD5]" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-[#0F3D56] mb-1">
              Contact Us
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
              Mon-Fri from 8 AM - 5 PM.
            </p>
            <a
              href="#"
              className="text-[#0F9675] text-xs sm:text-sm font-medium"
            >
              +(855) 12345678
            </a>
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section className="w-full max-w-[1328px] py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-h3 font-bold sm:text-h2 text-[#0F3D56] mb-2">
            Get In Touch with Us
          </p>
          <p className="text-body-lg font-semibold text-gray-600">
            Get in touch to discover how we can help you achieve your goals and
            provide solutions tailored to your needs about our service.
          </p>
        </div>
      </section>
      {/* section 3 */}
      <section className="w-full max-w-[1328px] grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 ">
        {/* form */}
        <div className="bg-bgColor p-4 sm:p-6 lg:p-8 rounded-3xl">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-h4 font-semibold text-[#0F3D56] mb-2">
              Have Question? We're Just a Message Away!
            </h3>
            <p className="text-body-sm sm:text-body-sm text-gray-600">
              Fill out the form below, and one of our team members will get back
              to you shortly.
            </p>
          </div>

          <form className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-label font-medium text-title mb-1"
              >
                User Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                className="w-full border-stroke"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-label font-medium text-title mb-1"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                placeholder="+123 45678 90"
                className="w-full border-stroke"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-label font-medium text-title mb-1"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                className="w-full border-stroke"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-label font-medium text-title mb-1"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Write your message here"
                className="w-full min-h-[120px] border-stroke"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 sm:py-3 px-4 text-sm sm:text-base max-w-none"
              radius="lg"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* feature */}
        <div className="flex  flex-col justify-center  ">
          <div className="space-y-4  bg-bgColor p-3 md:p-5 rounded-xl  relative">
            {/* 1 */}
            <div className="flex items-center  gap-3 bg-white rounded-xl p-3">
              <div className="bg-primary h-7 w-7 md:h-10  md:w-10 rounded-full  flex items-center justify-center">
                <CheckCircle className="md:h-6  md:w-6 text-white flex-shrink-0 " />
              </div>

              <div>
                <h4 className="font-medium text-title">Task Management</h4>
                <p className="text-description text-desc">
                  Create tasks from start to finish with easy-to-use tools.
                </p>
              </div>
            </div>
            {/* 2 */}
            <div className="flex items-center  gap-3 bg-white rounded-xl p-3">
              <div className="bg-primary h-7 w-7 md:h-10  md:w-10 rounded-full  flex items-center justify-center">
                <Calendar className="md:h-6  md:w-6 text-white flex-shrink-0 " />
              </div>

              <div>
                <h4 className="font-medium text-title">
                  {" "}
                  Calendar & Scheduling
                </h4>
                <p className="text-description text-desc">
                  Keep track of your deadlines with organized project timeline.
                </p>
              </div>
            </div>
            {/* 3 */}
            <div className="flex items-center  gap-3 bg-white rounded-xl p-3">
              <div className="bg-primary h-7 w-7 md:h-10  md:w-10 rounded-full  flex items-center justify-center">
                <FileText className="md:h-6  md:w-6 text-white flex-shrink-0 " />
              </div>

              <div>
                <h4 className="font-medium text-title">
                  {" "}
                  Document Collaboration
                </h4>
                <p className="text-description text-desc">
                  Work on files, share, and listen—without leaving the platform.
                </p>
              </div>
            </div>
            {/* 4 */}
            <div className="flex items-center  gap-3 bg-white rounded-xl p-3">
              <div className="bg-primary  h-7 w-7 md:h-10 md:w-10 rounded-full  flex items-center justify-center">
                <Bell className="  md:h-6  md:w-6 text-white flex-shrink-0 " />
              </div>

              <div>
                <h4 className="font-medium text-title">
                  {" "}
                  Notifications & Team Communication
                </h4>
                <p className="text-description text-desc">
                  Keep everyone aligned and in sync.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
