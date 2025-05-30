"use client";
//useage : http://localhost:3000/aboutus
import { Button } from "@/components/ui/button";
import "../../../styles/roundText.css";

import aboutus1 from "@/public/image/Rectangle_header1.png";
import aboutus2 from "@/public/image/Rectangle_header2.png";
import ourInstructor from "@/public/image/ourInstructor.png";
import ksgh from "@/public/image/ksgh.png";
import cherNak from "@/public/image/teacherNak.png";
import cherDara from "@/public/image/teacherDara.png";
import hrd from "@/public/image/hrdaboutus.png";
import webcash from "@/public/image/webcash.png";
import "@/styles/slideataboutus.css"
import aboutus5 from "@/public/image/aboutus5.png";

import square1 from "@/public/image/square1.png";
import square2 from "@/public/image/square2.png";
import square3 from "@/public/image/square3.png";
import square4 from "@/public/image/square4.png";
import imgs1 from "@/public/image/img-s1.png";
import imgs2 from "@/public/image/img-s2.png";
import bellNotification from "@/public/image/bellNotification.png";
import google from "@/public/image/google.png";
import imgs4 from "@/public/image/img-s4.png";

import fong from "@/public/image/fong.png";
import leap from "@/public/image/leap.png";
import theara from "@/public/image/theara.png";
import vit from "@/public/image/vit.png";
import roskan from "@/public/image/roskan.png";
import fanau from "@/public/image/fanau.png";
import minh from "@/public/image/minh.png";
import senghun from "@/public/image/senghun.png";
import visa from "@/public/image/visa.png";

import arrowdown from "@/public/image/arrow-down.png";
import arrowright from "@/public/image/arrow-right.png";
import "@/styles/box.css";

import LogoHRD from "@/assets/about-us-image/LogoHRD.jpg"
import TeacherAtHRD from '@/assets/about-us-image/TeacherAtHRD.jpg'
import TeacherDara from '@/assets/about-us-image/TeacherDara.jpg'
import TeacherNak from '@/assets/about-us-image/TeacherNak.jpg'

import Image from "next/image";
import Link from "next/link";
import {
  RoundText1,
  RoundText2,
  RoundText3,
} from "@/components/testcomponent/RoundText";

export default function AboutUs() {
  return (
    <div className="  gap-4 p-4 min-h-screen ">
      <div className=" ">
        <section className="relative flex justify-center items-center gap-4 h-[740px]  ">
          <div className="grid grid-cols-2">
            <div className="imgBg1 flex items-start text-title text-center">
              <div className="z-10 text-left w-[90%] p-5 flex flex-col gap-[95px] scale-[0.9] pl-8 pt-8">
                <div className="flex flex-col gap-[30px]">
                  <h1 className="text-h3 md:text-h2 lg:text-h1 font-bold mb-4">
                    <span className="text-[64px]">We are from</span> <br />
                    Korean Software HRD Center
                  </h1>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-[24px] font-medium">
                      13<sup>th</sup> Generation Student Basic Course.
                    </p>
                    <p className="text-[16px] text-description text-medium">
                      We’re really confident with this project that can bring the
                      best tool for software development.
                    </p>
                  </div>
                </div>
                <Button
                  className="w-[168.06px] h-[50.06px] text-btn-sm text-[#FFFFFF] rounded-small"
                  type="button"
                >
                  <span className="font-semibold text-body tracking-wide">Get Started</span>
                  <span>
                    <svg
                      className="w-3 h-3 scale-[0.79]"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3712 10.1838L11.3947 1.84828C11.3918 1.69313 11.3582 1.54026 11.296 1.39845C11.1772 1.11248 10.9502 0.885494 10.6643 0.766736C10.5225 0.70449 10.3696 0.67093 10.2144 0.667983L1.87888 0.691565C1.72344 0.692004 1.56943 0.723056 1.42566 0.782946C1.28188 0.842836 1.15115 0.930392 1.04093 1.04062C0.818322 1.26322 0.692765 1.56464 0.691877 1.87856C0.690988 2.19249 0.814843 2.4932 1.03619 2.71455C1.25754 2.9359 1.55825 3.05975 1.87218 3.05886L7.36534 3.03499L1.02075 9.37958C0.799048 9.60128 0.674002 9.90147 0.673118 10.2141C0.672233 10.5268 0.795583 10.8262 1.01603 11.0467C1.23648 11.2671 1.53596 11.3905 1.84861 11.3896C2.16125 11.3887 2.46144 11.2637 2.68314 11.042L9.02773 4.69738L9.00386 10.1905C9.00278 10.3462 9.03252 10.5003 9.09137 10.644C9.15022 10.7877 9.23702 10.9182 9.34675 11.028C9.45647 11.1377 9.58697 11.2245 9.73069 11.2833C9.87442 11.3422 10.0285 11.3719 10.1842 11.3708C10.3398 11.371 10.4941 11.3404 10.6381 11.2808C10.7822 11.2211 10.9132 11.1336 11.0235 11.0232C11.1339 10.9129 11.2214 10.7819 11.2811 10.6378C11.3407 10.4938 11.3714 10.3395 11.3712 10.1838Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </Button>
              </div>
            </div>

            <div className="imgBg2 flex items-start text-title text-center p-8">
              <div className="z-10 border-2 rounded-large p-2  bg-bgColor/40 bg-blur backdrop-blur-md text-left ml-10 mt-14 pl-8 pr-14 flex flex-col gap-3">
                <p className="text-body text-blueActive font-semibold tracking-wide">Our school</p>
                <p className="text-primary flex flex-col">
                  <span className="font-semibold text-h1">Korean Software</span>
                  <span className="font-semibold text-h2">HRD Center</span>
                </p>
              </div>
              <img
                src="/image/hrdaboutus.png"
                alt="Overlay"
                className="overlay"
              />
            </div>
          </div>
          <div className="absolute bottom-0 ">
            <RoundText1 />
          </div>
        </section>

        <section className="grid grid-row-1 sm:grid-cols-2 gap-4">
          <div className="relative h-auto  overflow-hidden p-6 sm:p-10 flex  items-center right-0 justify-center ">
            <div className="flex flex-col justify-center space-y-6 max-w-xl right-1">
              <p className="text-h1 font-bold text-gradient text-left">
                ZenTrio Founder
              </p>

              <p className="text-base text-h4 leading-relaxed text-left w-[524px]">
                Jump in and let’s see how ZenTrio can make your workday feel
                lighter. Let’s simplify your projects and get stuff done
                together.
              </p>
            </div>
          </div>

          {/* Instructor */}
          <div className="w-[583.8px] h-full scale-[1.2] rounded-xl p-10">
            <div className="grid grid-cols-2 grid-rows-4 gap-4 h-full w-full relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 ml-0 z-10 scale-[0.8]">
                <RoundText3 />
              </div>
              <div className="col-start-1 row-start-2 self-end place-self-end">
                <Image src={TeacherAtHRD} alt="" className="w-44 h-fit object-cover rounded-2xl" />
              </div>
              <div className="row-span-2 col-start-2 row-start-1 self-end relative">
                <Image src={TeacherNak} alt="" className="rounded-2xl h-[217px] w-fit mb-[12%]" />
                <div className="absolute left-[-5%] bottom-[-5%] w-[242px] h-[83px] scale-[0.8] bg-bgColor/40 bg-blur backdrop-blur-sm rounded-[20px] flex flex-col justify-center items-center">
                  <p className="text-center text-[24px] font-semibold text-bgColor">Kheng Sovannak</p>
                  <p className="text-center text-[18px] text-primary">IT Instructor</p>
                </div>
              </div>
              <div className="row-span-2 col-start-2 row-start-3 relative">
                <Image src={TeacherDara} alt="" className="rounded-3xl w-[218px] h-fit" />
                <div className="absolute left-[13%] top-[30%] w-[152px] h-[83px] scale-[0.9] bg-bgColor/40 bg-blur backdrop-blur-sm rounded-[20px] flex flex-col justify-center items-center">
                  <p className="text-center text-[24px] font-semibold text-bgColor">Tan Dara</p>
                  <p className="text-center text-[18px] text-primary">IT Instructor</p>
                </div>
              </div>
              <div className="col-start-1 row-start-3 place-items-end">
                <Image src={LogoHRD} alt="" className="rounded-2xl w-44 h-fit object-cover shadow-md" />
              </div>
            </div>
          </div>
        </section>
        {/* feature */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-10 relative z-10">
          {/* Grid of Feature Cards */}
          <div className="grid grid-cols-2 gap-6 relative">
            {[
              {
                title: "4 Core Stages",
                desc: "Todo, Progress, Review, Completed",
                img: imgs1,
                circles: ["top-right", "bottom-right"],
                bgClass: "imgBgStage",
              },
              {
                title: "Personal Calendar",
                desc: "Manage daily tasks, deadlines, and plans efficiently.",
                img: imgs2,
                circles: ["top-left", "bottom-left"],
                bgClass: "imgBgCalendar",
              },
              {
                title: "Real-Time Alerts",
                desc: "Instant notifications on task activity.",
                img: bellNotification,
                circles: ["top-left", "bottom-left"],
                bgClass: "imgBgBell",
              },
              {
                title: "Google Tools Integrated",
                desc: "Work with Docs, Sheets, and Slides directly.",
                img: google,
                circles: ["top-right", "bottom-right"],
                bgClass: "imgBgGoogle",
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl ${card.bgClass} overflow-hidden`}
              >
                {/* Decorative Circles (Transparent Only) */}
                {card.circles.includes("top-right") && (
                  <div className="absolute top-0 right-0 w-16 h-16 rounded-full translate-x-1/2 -translate-y-1/2 border border-white/10" />
                )}
                {card.circles.includes("bottom-right") && (
                  <div className="absolute bottom-0 right-0 w-20 h-20 rounded-full translate-x-1/2 translate-y-1/2 border border-white/10" />
                )}
                {card.circles.includes("top-left") && (
                  <div className="absolute top-0 left-0 w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2 border border-white/10" />
                )}
                {card.circles.includes("bottom-left") && (
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full -translate-x-1/2 translate-y-1/2 border border-white/10" />
                )}

                {/* Content */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={card.img}
                    width={60}
                    height={60}
                    alt="icon"
                    className="object-contain"
                  />
                  <h3 className="text-xl font-semibold uppercase text-gradient">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-6 text-sm text-gradient">{card.desc}</p>
              </div>
            ))}

            {/* Center Circle Animation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[0.8]">
              <RoundText2 />
            </div>
          </div>

          {/* Right Side Text Content */}
          <div className="flex items-center justify-center px-4">
            <div className="flex flex-col justify-center items-start space-y-6 max-w-xl">
              <p className="text-h1 font-bold text-gradient text-left">
                Effortless project management for teams.
              </p>
              <p className="text-base text-h4 leading-relaxed  text-left">
                Jump in and see how ZenTrio lightens your workday and gets
                things done.
              </p>
            </div>
          </div>
        </section>

        {/* team */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div className="relative flex justify-center">
            <div className="flex flex-col justify-center items-start space-y-6 max-w-xl relative">
              {/* bg all logo */}
              <div className="w-[1308px] h-[809px] absolute -z-50">
                <svg width="1064" height="544" viewBox="0 0 1064 544" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.5" filter="url(#filter0_d_3611_126093)">
                    <path d="M557 522.958C557 519.473 557 517.73 557.678 516.399C558.275 515.229 559.227 514.277 560.397 513.68C561.728 513.002 563.471 513.002 566.956 513.002H575.044C578.529 513.002 580.272 513.002 581.603 513.68C582.773 514.277 583.725 515.229 584.322 516.399C585 517.73 585 519.473 585 522.958V531.046C585 534.531 585 536.274 584.322 537.605C583.725 538.775 582.773 539.727 581.603 540.324C580.272 541.002 578.529 541.002 575.044 541.002H566.956C563.471 541.002 561.728 541.002 560.397 540.324C559.227 539.727 558.275 538.775 557.678 537.605C557 536.274 557 534.531 557 531.046V522.958Z" fill="white" />
                    <path d="M577.051 519.525L571.064 524.198L564.94 519.525V519.527L564.948 519.533V526.076L570.995 530.849L577.051 526.26V519.525Z" fill="#EA4335" />
                    <path d="M578.624 518.388L577.051 519.525V526.259L581.999 522.461V520.173C581.999 520.173 581.398 516.905 578.624 518.388Z" fill="#FBBC05" />
                    <path d="M577.051 526.259V534.994H580.843C580.843 534.994 581.922 534.883 582 533.653V522.461L577.051 526.259Z" fill="#34A853" />
                    <path d="M564.948 535.002V526.075L564.94 526.068L564.948 535.002Z" fill="#C5221F" />
                    <path d="M564.94 519.526L563.376 518.396C560.602 516.912 560 520.179 560 520.179V522.468L564.94 526.069V519.526Z" fill="#C5221F" />
                    <path d="M564.94 519.525V526.068L564.948 526.074V519.532L564.94 519.525Z" fill="#C5221F" />
                    <path d="M560 522.469V533.661C560.076 534.892 561.157 535.002 561.157 535.002H564.949L564.94 526.069L560 522.469Z" fill="#4285F4" />
                  </g>
                  <g clip-path="url(#clip0_3611_126093)">
                    <circle cx="763.264" cy="21.5055" r="14" transform="rotate(25.018 763.264 21.5055)" fill="#1794D4" />
                    <path d="M768.882 14.1959L767.07 13.3501L766.224 15.1625L768.036 16.0083L768.882 14.1959Z" fill="white" />
                    <path d="M760.364 13.5312L762.176 14.377L761.331 16.1894L759.518 15.3436L760.364 13.5312Z" fill="white" />
                    <path d="M753.805 18.1304C752.733 20.8318 752.541 25.3297 758.068 27.9093C764.23 30.785 769.093 27.537 770.755 25.5535C771.51 25.9059 773.413 26.2422 774.984 24.7682C774.742 24.1036 772.93 23.2578 771.812 23.288C772.15 22.5631 772.416 20.8111 771.721 19.9351C770.835 20.2573 769.166 21.391 769.577 23.3484C768.701 24.0431 767.493 23.4793 766.888 23.1973L755.056 17.6754C754.577 17.4515 754.001 17.6383 753.805 18.1304Z" fill="white" />
                    <path d="M758.189 15.8269L756.377 14.981L755.531 16.7934L757.343 17.6392L758.189 15.8269Z" fill="white" />
                    <path d="M759.095 16.2498L760.908 17.0956L760.062 18.9079L758.25 18.0621L759.095 16.2498Z" fill="white" />
                    <path d="M763.626 18.3643L761.814 17.5185L760.968 19.3308L762.78 20.1766L763.626 18.3643Z" fill="white" />
                    <path d="M764.532 18.7872L766.345 19.633L765.499 21.4453L763.687 20.5995L764.532 18.7872Z" fill="white" />
                    <path d="M769.063 20.9017L767.251 20.0559L766.405 21.8682L768.217 22.714L769.063 20.9017Z" fill="white" />
                    <path d="M764.895 15.6457L763.083 14.7999L762.237 16.6123L764.049 17.4581L764.895 15.6457Z" fill="white" />
                    <path d="M765.801 16.0686L767.613 16.9145L766.768 18.7268L764.955 17.881L765.801 16.0686Z" fill="white" />
                  </g>
                  <g opacity="0.5">
                    <rect x="535.025" y="12.0293" width="28" height="28" rx="14" transform="rotate(35.4348 535.025 12.0293)" fill="#1275B1" />
                    <path d="M539.217 24.4532C538.675 25.2147 537.576 25.3623 536.762 24.783C535.947 24.2036 535.727 23.1167 536.268 22.3553C536.81 21.5938 537.91 21.4462 538.724 22.0255C539.538 22.6049 539.759 23.6918 539.217 24.4532Z" fill="white" />
                    <path d="M534.768 24.8909L537.288 26.684L531.854 34.32L529.334 32.5269L534.768 24.8909Z" fill="white" />
                    <path d="M541.345 29.5709L538.825 27.7778L533.391 35.4138L535.911 37.2069C535.911 37.2069 537.622 34.803 538.691 33.3C539.333 32.3978 540.286 31.7109 541.515 32.5855C542.904 33.5739 542.056 34.7486 541.399 35.6586C540.539 36.8481 539.691 38.0826 538.834 39.2869L541.354 41.0801L544.222 37.05C546.032 34.4614 546.205 32.7985 543.999 31.2288C542.689 30.2966 541.454 30.3135 540.648 30.5506L541.345 29.5709Z" fill="white" />
                  </g>
                  <g opacity="0.5" filter="url(#filter1_d_3611_126093)">
                    <path d="M712 138.196C712 134.711 712 132.969 712.678 131.638C713.275 130.467 714.227 129.515 715.397 128.918C716.728 128.24 718.471 128.24 721.956 128.24H730.044C733.529 128.24 735.272 128.24 736.603 128.918C737.773 129.515 738.725 130.467 739.322 131.638C740 132.969 740 134.711 740 138.196V146.285C740 149.769 740 151.512 739.322 152.843C738.725 154.014 737.773 154.966 736.603 155.562C735.272 156.24 733.529 156.24 730.044 156.24H721.956C718.471 156.24 716.728 156.24 715.397 155.562C714.227 154.966 713.275 154.014 712.678 152.843C712 151.512 712 149.769 712 146.285V138.196Z" fill="white" />
                    <path d="M726.002 138.691L722.541 132.583C722.656 132.466 722.788 132.389 722.921 132.338C721.9 132.674 721.432 133.82 721.432 133.82L715.109 144.975C715.02 145.324 714.996 145.64 715.007 145.918H721.907L726.002 138.691Z" fill="#34A853" />
                    <path d="M726.002 138.691L730.097 145.918H736.997C737.009 145.64 736.984 145.324 736.895 144.975L730.572 133.82C730.572 133.82 730.103 132.674 729.084 132.338C729.214 132.389 729.348 132.466 729.463 132.583L726.002 138.691Z" fill="#FBBC05" />
                    <path d="M726.002 138.692L729.463 132.584C729.348 132.467 729.214 132.39 729.083 132.339C728.933 132.29 728.771 132.257 728.595 132.248H728.413H723.591H723.408C723.234 132.256 723.071 132.288 722.92 132.339C722.789 132.39 722.656 132.467 722.541 132.584L726.002 138.692Z" fill="#188038" />
                    <path d="M721.908 145.918L718.487 151.956C718.487 151.956 718.373 151.901 718.219 151.787C718.705 152.16 719.177 152.24 719.177 152.24H732.614C733.355 152.24 733.509 151.956 733.509 151.956C733.512 151.955 733.513 151.954 733.516 151.953L730.097 145.918H721.908Z" fill="#4285F4" />
                    <path d="M721.909 145.918H715.008C715.042 146.738 715.398 147.218 715.398 147.218L715.658 147.668C715.676 147.694 715.687 147.709 715.687 147.709L716.252 148.701L717.52 150.907C717.557 150.997 717.6 151.078 717.646 151.156C717.663 151.183 717.679 151.212 717.698 151.237C717.703 151.244 717.708 151.252 717.713 151.26C717.869 151.481 718.045 151.652 718.22 151.787C718.375 151.902 718.488 151.956 718.488 151.956L721.909 145.918Z" fill="#1967D2" />
                    <path d="M730.097 145.918H736.997C736.963 146.738 736.607 147.218 736.607 147.218L736.348 147.668C736.329 147.694 736.318 147.709 736.318 147.709L735.753 148.701L734.485 150.907C734.448 150.997 734.405 151.078 734.359 151.156C734.342 151.183 734.326 151.212 734.308 151.237C734.303 151.244 734.298 151.252 734.293 151.26C734.136 151.481 733.96 151.652 733.785 151.787C733.63 151.902 733.517 151.956 733.517 151.956L730.097 145.918Z" fill="#EA4335" />
                  </g>
                  <g opacity="0.5">
                    <path d="M878.471 124.121C877.802 123.243 877.971 121.989 878.849 121.32L892.345 111.028C893.223 110.359 894.477 110.528 895.146 111.406L905.438 124.903C906.107 125.78 905.938 127.034 905.06 127.704L891.564 137.995C890.686 138.664 889.432 138.495 888.763 137.617L878.471 124.121Z" fill="#EE513B" />
                    <path d="M889.599 113.156L888.232 114.199L890.924 117.729C890.762 117.982 890.651 118.273 890.608 118.591C890.487 119.492 890.949 120.338 891.705 120.745L890.68 128.355C889.843 128.548 889.173 129.241 889.052 130.143C888.895 131.306 889.711 132.376 890.874 132.532C892.037 132.689 893.107 131.873 893.263 130.71C893.374 129.893 893.004 129.122 892.37 128.681L893.407 120.985L895.98 124.36C895.825 124.608 895.719 124.893 895.677 125.202C895.52 126.365 896.336 127.435 897.499 127.592C898.662 127.748 899.732 126.932 899.889 125.769C900.046 124.606 899.23 123.536 898.067 123.38C897.841 123.349 897.618 123.355 897.405 123.394L894.642 119.77C894.73 119.581 894.791 119.376 894.82 119.158C894.977 117.995 894.161 116.925 892.998 116.769C892.78 116.739 892.566 116.744 892.361 116.778L889.599 113.156Z" fill="white" />
                  </g>
                  <g opacity="0.5" clip-path="url(#clip1_3611_126093)">
                    <path d="M318.271 436.849L308.726 413.656L331.577 406.321L337.314 430.736L328.709 436.648L318.271 436.849Z" fill="#1172B8" />
                    <path d="M330.284 408.836L320.762 411.893L328.251 435.22L335.104 430.395L330.284 408.836Z" fill="#33AADD" />
                    <path d="M327.916 422.725L318.394 425.781L316.848 422.602L323.701 417.776L316.084 420.221L314.691 417.518L329.449 412.78L330.043 416.265L324.618 420.632L330.331 418.799L332.283 428.15L327.181 431.888L320.857 431.817L318.853 427.209L321.709 426.292L322.949 428.52L326.111 428.555L328.662 426.686L327.916 422.725Z" fill="white" />
                  </g>
                  <g opacity="0.5">
                    <path d="M107.5 60.0566L105.5 35.0566H129.5L127.5 60.0566L117.5 63.0566L107.5 60.0566Z" fill="#E44D26" />
                    <path d="M127.5 37.0566H117.5V61.5566L125.5 59.0566L127.5 37.0566Z" fill="#F16529" />
                    <path d="M111 49.5566L110 40.0566H125.5L125 43.0566H113L113.5 46.5566H124.5L123.5 56.0566L117.5 58.0566L111.5 56.0566L111 51.0566H114L114.5 53.5566L117.5 54.5566L120.5 53.5566L121 49.5566H111Z" fill="white" />
                  </g>
                  <g opacity="0.5" clip-path="url(#clip2_3611_126093)">
                    <path d="M18.8678 120.506L9.16998 118.727L9.21004 110.628L20.9546 109.246L18.8678 120.506Z" fill="url(#paint0_linear_3611_126093)" />
                    <path d="M32.2654 94.7872L40.4377 111.411L31.9009 121.546L23.1298 120.827L27.4118 105.81L18.3401 98.8827L19.6883 92.3657L32.2654 94.7872Z" fill="url(#paint1_linear_3611_126093)" />
                    <path d="M32.2654 94.7858L29.0808 109.53L18.3401 98.8813L19.6882 92.3643L32.2654 94.7858Z" fill="url(#paint2_linear_3611_126093)" />
                    <path d="M26.0765 118.482L16.9266 128.633L15.3498 121.29L13.5649 112.194L5.94824 113.45L4.07604 100.103L13.5343 96.468L27.5554 101.798L26.0765 118.482Z" fill="url(#paint3_linear_3611_126093)" />
                    <path d="M8.42773 104.777L25.8619 95.5007L35.1386 112.935L17.7044 122.211L8.42773 104.777Z" fill="black" />
                    <path d="M17.5793 118.084L24.1171 114.605L24.6969 115.695L18.1591 119.174L17.5793 118.084Z" fill="white" />
                    <path d="M16.675 104.997L15.9663 103.665L12.3342 105.598L13.0429 106.929L14.0921 106.371L16.5187 110.931L15.4694 111.49L16.178 112.822L19.8102 110.889L19.1015 109.557L18.0926 110.094L15.6661 105.534L16.675 104.997Z" fill="white" />
                    <path d="M23.3451 109.164C22.7801 109.465 22.2314 109.601 21.7608 109.593C21.2903 109.584 20.8171 109.473 20.4246 109.32L20.8323 107.653C21.1629 107.788 21.4506 107.842 21.7168 107.855C21.983 107.869 22.2681 107.821 22.5102 107.692C22.7927 107.542 22.9919 107.332 23.0863 107.023C23.1404 106.735 23.0708 106.41 22.8346 105.966L20.3651 101.325L21.9794 100.466L24.4918 105.188C24.728 105.632 24.8809 106.016 24.9316 106.404C24.9824 106.791 24.9498 107.119 24.8365 107.49C24.7421 107.799 24.5669 108.151 24.287 108.404C24.0286 108.697 23.7487 108.949 23.3451 109.164Z" fill="white" />
                  </g>
                  <g opacity="0.5" clip-path="url(#clip3_3611_126093)">
                    <path d="M296.054 74.102C295.646 73.3232 294.774 73.7794 294.438 74.0796C294.756 73.3673 295.447 73.1383 295.741 73.1498L302.324 72.9775C302.952 72.9611 303.535 73.3047 303.827 73.8629L312.67 90.7638C312.966 91.3295 312.91 92.0144 312.527 92.5217L308.816 97.4326C308.553 97.756 308.005 98.5015 307.12 98.3197C307.972 98.0602 308.103 97.2889 307.973 96.8819L296.054 74.102Z" fill="url(#paint4_linear_3611_126093)" />
                    <path d="M294.493 74.0312C294.862 73.7347 295.667 73.3615 296.054 74.1006L299.097 79.9181L289.5 100.247C289.332 100.602 288.923 100.772 288.553 100.64L285.989 99.7246C285.587 99.5813 285.378 99.1375 285.523 98.7366L294.438 74.0782L294.493 74.0312Z" fill="url(#paint5_linear_3611_126093)" />
                    <path d="M304.98 91.1621L282.807 87.4563C282.419 87.3915 282.047 87.6308 281.944 88.0105L281.234 90.6387C281.123 91.0504 281.368 91.4754 281.78 91.5849L307.12 98.32C307.972 98.0605 308.103 97.2892 307.973 96.8822L304.98 91.1621Z" fill="url(#paint6_linear_3611_126093)" />
                  </g>
                  <g opacity="0.5">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M564.013 262.24H546.002C544.344 262.24 543 263.583 543 265.24V283.24C543 284.897 544.344 286.24 546.002 286.24H564.013C565.665 286.232 567 284.891 567 283.24V265.24C567 263.589 565.665 262.249 564.013 262.24ZM548 265.24H552C553.105 265.24 554 266.136 554 267.24V281.24C554 282.345 553.105 283.24 552 283.24H548C546.895 283.24 546 282.345 546 281.24V267.24C546 266.136 546.895 265.24 548 265.24ZM562 265.24H558C556.895 265.24 556 266.136 556 267.24V274.24C556 275.345 556.895 276.24 558 276.24H562C563.105 276.24 564 275.345 564 274.24V267.24C564 266.136 563.105 265.24 562 265.24Z" fill="url(#paint7_linear_3611_126093)" />
                  </g>
                  <g opacity="0.5">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M470.716 403.458L467.277 399.173C466.449 398.142 466 396.875 466 395.57V380.055C466 378.101 467.564 376.479 469.581 376.341L485.532 375.252C486.691 375.173 487.843 375.481 488.795 376.125L494.399 379.914C495.402 380.592 496 381.701 496 382.884V400.523C496 402.436 494.463 404.02 492.488 404.141L474.783 405.231C473.207 405.328 471.684 404.664 470.716 403.458Z" fill="white" />
                    <path d="M476.248 387.818V387.615C476.248 387.1 476.66 386.673 477.192 386.638L481.063 386.379L486.417 394.263V387.344L485.039 387.16V387.064C485.039 386.543 485.461 386.113 485.999 386.085L489.522 385.905V386.412C489.522 386.65 489.345 386.853 489.102 386.894L488.254 387.038V398.243L487.191 398.609C486.302 398.915 485.312 398.588 484.804 397.82L479.606 389.977V397.463L481.206 397.769L481.184 397.917C481.114 398.382 480.712 398.734 480.227 398.755L476.248 398.932C476.195 398.432 476.57 397.985 477.087 397.931L477.61 397.876V387.895L476.248 387.818Z" fill="black" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M485.675 377.207L469.723 378.296C468.768 378.361 468.027 379.129 468.027 380.055V395.57C468.027 396.439 468.327 397.285 468.878 397.972L472.318 402.256C472.874 402.949 473.749 403.331 474.654 403.275L492.359 402.185C493.266 402.129 493.972 401.402 493.972 400.523V382.884C493.972 382.34 493.698 381.831 493.237 381.519L487.632 377.73C487.061 377.344 486.37 377.159 485.675 377.207ZM470.514 380.297C470.293 380.132 470.398 379.79 470.677 379.77L485.782 378.687C486.263 378.652 486.742 378.785 487.131 379.061L490.162 381.208C490.277 381.289 490.223 381.465 490.08 381.473L474.084 382.343C473.6 382.369 473.122 382.227 472.737 381.942L470.514 380.297ZM473.334 385.07C473.334 384.551 473.753 384.122 474.29 384.092L491.203 383.171C491.726 383.143 492.167 383.545 492.167 384.052V399.325C492.167 399.844 491.748 400.273 491.213 400.303L474.407 401.259C473.825 401.292 473.334 400.845 473.334 400.281V385.07Z" fill="black" />
                  </g>
                  <g opacity="0.5" clip-path="url(#clip4_3611_126093)">
                    <path d="M426.103 210.189L424.594 205.617L413.44 203.24L408 209.412L425.006 218.097L426.103 210.189Z" fill="url(#paint8_linear_3611_126093)" />
                    <path d="M420.8 222.166L420.48 212.658L408 209.412L411.063 227.744L420.8 227.652V222.166Z" fill="url(#paint9_linear_3611_126093)" />
                    <path d="M418.103 221.983L418.697 214.44L427.748 205.16L435.84 206.623L440 217L435.657 221.297L428.571 220.154L424.183 224.772L418.103 221.983Z" fill="url(#paint10_linear_3611_126093)" />
                    <path d="M427.748 205.16L414.766 216.68L417.28 231.492L428.068 235.24L440 228.109L427.748 205.16Z" fill="url(#paint11_linear_3611_126093)" />
                    <path d="M414.126 209.365H433.874V229.114H414.126V209.365Z" fill="black" />
                    <path d="M416 225.41H423.406V226.644H416V225.41Z" fill="white" />
                    <path d="M415.909 211.926H419.246C421.212 211.926 422.4 213.069 422.4 214.76V214.806C422.4 216.726 420.937 217.686 419.063 217.686H417.692V220.154H415.909V211.926ZM419.154 216.04C420.069 216.04 420.572 215.491 420.572 214.806V214.76C420.572 213.937 420.023 213.526 419.109 213.526H417.737V216.04H419.154Z" fill="white" />
                    <path d="M422.857 218.964L423.909 217.684C424.64 218.279 425.417 218.69 426.377 218.69C427.109 218.69 427.566 218.416 427.566 217.913V217.867C427.566 217.41 427.291 217.181 425.92 216.816C424.274 216.404 423.177 215.947 423.177 214.301V214.256C423.177 212.747 424.366 211.787 426.057 211.787C427.246 211.787 428.297 212.153 429.12 212.839L428.16 214.21C427.429 213.707 426.697 213.387 426.011 213.387C425.326 213.387 424.96 213.707 424.96 214.119V214.164C424.96 214.713 425.326 214.896 426.743 215.261C428.389 215.719 429.349 216.313 429.349 217.73V217.776C429.349 219.421 428.114 220.336 426.331 220.336C425.097 220.29 423.863 219.833 422.857 218.964Z" fill="white" />
                  </g>
                  <g opacity="0.5">
                    <path d="M1039.95 348.85C1040.11 347.556 1040.64 346.831 1041.64 346.089C1043.07 345.083 1044.86 345.652 1044.86 345.652V342.277C1045.29 342.266 1045.73 342.291 1046.16 342.354V346.697C1046.16 346.697 1044.37 346.128 1042.94 347.135C1041.94 347.877 1041.41 348.602 1041.25 349.896C1041.25 350.598 1041.38 351.517 1041.98 352.311C1041.83 352.234 1041.68 352.146 1041.53 352.048C1040.19 351.149 1039.94 349.802 1039.95 348.85ZM1053.54 336.036C1052.55 334.958 1052.18 333.869 1052.04 333.104H1053.28C1053.28 333.104 1053.04 335.109 1054.83 337.082L1054.86 337.108C1054.37 336.803 1053.93 336.443 1053.54 336.036ZM1059.5 339.094V343.35C1059.5 343.35 1057.92 343.288 1056.75 342.991C1055.12 342.575 1054.07 341.937 1054.07 341.937C1054.07 341.937 1053.34 341.482 1053.29 341.45V350.239C1053.29 350.728 1053.15 351.95 1052.74 352.97C1052.21 354.303 1051.39 355.178 1051.23 355.357C1051.23 355.357 1050.23 356.54 1048.47 357.337C1046.88 358.056 1045.48 358.038 1045.06 358.056C1045.06 358.056 1042.64 358.151 1040.47 356.739C1040 356.427 1039.56 356.074 1039.16 355.685L1039.17 355.693C1041.34 357.106 1043.76 357.01 1043.76 357.01C1044.18 356.992 1045.58 357.01 1047.17 356.291C1048.93 355.495 1049.93 354.311 1049.93 354.311C1050.08 354.132 1050.91 353.257 1051.44 351.923C1051.85 350.905 1051.98 349.682 1051.98 349.192V340.405C1052.04 340.437 1052.77 340.892 1052.77 340.892C1052.77 340.892 1053.82 341.531 1055.45 341.946C1056.62 342.244 1058.2 342.305 1058.2 342.305V338.97C1058.74 339.091 1059.2 339.124 1059.5 339.094Z" fill="#EE1D52" />
                    <path d="M1058.2 338.97V342.304C1058.2 342.304 1056.62 342.242 1055.45 341.945C1053.82 341.529 1052.77 340.891 1052.77 340.891C1052.77 340.891 1052.04 340.436 1051.99 340.404V349.194C1051.99 349.683 1051.85 350.906 1051.44 351.924C1050.91 353.258 1050.09 354.134 1049.93 354.312C1049.93 354.312 1048.93 355.496 1047.17 356.292C1045.58 357.011 1044.18 356.993 1043.76 357.011C1043.76 357.011 1041.34 357.107 1039.17 355.694L1039.16 355.686C1038.93 355.464 1038.71 355.229 1038.51 354.983C1037.82 354.137 1037.39 353.136 1037.28 352.851C1037.28 352.849 1037.28 352.848 1037.28 352.847C1037.11 352.351 1036.75 351.159 1036.8 350.005C1036.89 347.969 1037.6 346.72 1037.79 346.407C1038.3 345.553 1038.95 344.789 1039.72 344.149C1040.4 343.597 1041.18 343.157 1042.01 342.849C1042.91 342.487 1043.88 342.292 1044.86 342.277V345.652C1044.86 345.652 1043.07 345.085 1041.64 346.089C1040.64 346.831 1040.11 347.556 1039.95 348.85C1039.94 349.802 1040.19 351.149 1041.52 352.048C1041.68 352.147 1041.83 352.235 1041.98 352.311C1042.22 352.615 1042.5 352.879 1042.83 353.094C1044.13 353.92 1045.22 353.978 1046.62 353.441C1047.56 353.083 1048.26 352.274 1048.58 351.378C1048.79 350.818 1048.79 350.255 1048.79 349.672V333.104H1052.04C1052.18 333.869 1052.55 334.958 1053.53 336.036C1053.93 336.443 1054.37 336.803 1054.86 337.108C1055 337.257 1055.73 337.989 1056.67 338.439C1057.16 338.672 1057.67 338.85 1058.2 338.97Z" fill="black" />
                    <path d="M1035.99 351.814V351.817L1036.07 352.036C1036.06 352.011 1036.03 351.933 1035.99 351.814Z" fill="#69C9D0" />
                    <path d="M1042.01 342.849C1041.18 343.158 1040.4 343.597 1039.72 344.149C1038.95 344.791 1038.3 345.556 1037.79 346.412C1037.61 346.724 1036.89 347.974 1036.8 350.01C1036.75 351.164 1037.11 352.356 1037.29 352.852C1037.29 352.853 1037.29 352.854 1037.29 352.856C1037.39 353.139 1037.82 354.139 1038.51 354.988C1038.71 355.234 1038.93 355.469 1039.16 355.691C1038.42 355.203 1037.77 354.614 1037.21 353.942C1036.52 353.103 1036.1 352.112 1035.99 351.82C1035.99 351.818 1035.99 351.816 1035.99 351.814V351.81C1035.82 351.315 1035.45 350.123 1035.5 348.967C1035.59 346.931 1036.31 345.681 1036.5 345.368C1037 344.513 1037.65 343.747 1038.43 343.106C1039.11 342.554 1039.88 342.114 1040.72 341.806C1041.24 341.599 1041.78 341.447 1042.33 341.351C1043.17 341.211 1044.02 341.199 1044.86 341.315V342.277C1043.88 342.293 1042.91 342.487 1042.01 342.849Z" fill="#69C9D0" />
                    <path d="M1052.04 333.103H1048.79V349.672C1048.79 350.255 1048.79 350.817 1048.59 351.378C1048.26 352.273 1047.56 353.082 1046.63 353.441C1045.23 353.98 1044.13 353.92 1042.83 353.093C1042.5 352.88 1042.22 352.616 1041.98 352.313C1043.1 352.882 1044.09 352.872 1045.32 352.398C1046.26 352.039 1046.96 351.23 1047.28 350.334C1047.49 349.774 1047.49 349.211 1047.49 348.629V332.057H1051.98C1051.98 332.057 1051.93 332.469 1052.04 333.103ZM1058.2 338.048V338.97C1057.67 338.849 1057.16 338.671 1056.68 338.439C1055.74 337.989 1055 337.256 1054.86 337.108C1055.03 337.213 1055.2 337.308 1055.38 337.393C1056.52 337.94 1057.65 338.103 1058.2 338.048Z" fill="#69C9D0" />
                  </g>
                  <defs>
                    <filter id="filter0_d_3611_126093" x="553" y="510.002" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="1" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3611_126093" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3611_126093" result="shape" />
                    </filter>
                    <filter id="filter1_d_3611_126093" x="708" y="125.24" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="1" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.0392157 0 0 0 0 0.0496732 0 0 0 0 0.0705882 0 0 0 0.05 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3611_126093" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3611_126093" result="shape" />
                    </filter>
                    <linearGradient id="paint0_linear_3611_126093" x1="8.92737" y1="118.281" x2="22.0542" y2="111.296" gradientUnits="userSpaceOnUse">
                      <stop offset="0.258" stop-color="#F97A12" />
                      <stop offset="0.459" stop-color="#B07B58" />
                      <stop offset="0.724" stop-color="#577BAE" />
                      <stop offset="0.91" stop-color="#1E7CE5" />
                      <stop offset="1" stop-color="#087CFA" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_3611_126093" x1="15.7415" y1="106.78" x2="43.7713" y2="107.239" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#F97A12" />
                      <stop offset="0.072" stop-color="#CB7A3E" />
                      <stop offset="0.154" stop-color="#9E7B6A" />
                      <stop offset="0.242" stop-color="#757B91" />
                      <stop offset="0.334" stop-color="#537BB1" />
                      <stop offset="0.432" stop-color="#387CCC" />
                      <stop offset="0.538" stop-color="#237CE0" />
                      <stop offset="0.655" stop-color="#147CEF" />
                      <stop offset="0.792" stop-color="#0B7CF7" />
                      <stop offset="1" stop-color="#087CFA" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_3611_126093" x1="34.7323" y1="106.012" x2="19.1192" y2="91.2073" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FE315D" />
                      <stop offset="0.078" stop-color="#CB417E" />
                      <stop offset="0.16" stop-color="#9E4E9B" />
                      <stop offset="0.247" stop-color="#755BB4" />
                      <stop offset="0.339" stop-color="#5365CA" />
                      <stop offset="0.436" stop-color="#386DDB" />
                      <stop offset="0.541" stop-color="#2374E9" />
                      <stop offset="0.658" stop-color="#1478F3" />
                      <stop offset="0.794" stop-color="#0B7BF8" />
                      <stop offset="1" stop-color="#087CFA" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_3611_126093" x1="7.86363" y1="106.617" x2="41.8587" y2="126.904" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#FE315D" />
                      <stop offset="0.04" stop-color="#F63462" />
                      <stop offset="0.104" stop-color="#DF3A71" />
                      <stop offset="0.167" stop-color="#C24383" />
                      <stop offset="0.291" stop-color="#AD4A91" />
                      <stop offset="0.55" stop-color="#755BB4" />
                      <stop offset="0.917" stop-color="#1D76ED" />
                      <stop offset="1" stop-color="#087CFA" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_3611_126093" x1="298.007" y1="71.8198" x2="310.987" y2="96.6291" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#32B5F1" />
                      <stop offset="1" stop-color="#2B9FED" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_3611_126093" x1="297.174" y1="76.2423" x2="287.246" y2="100.365" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#0F6FB3" />
                      <stop offset="0.270551" stop-color="#1279B7" />
                      <stop offset="0.421376" stop-color="#1176B5" />
                      <stop offset="0.618197" stop-color="#0E69AC" />
                      <stop offset="0.855344" stop-color="#0F70AF" />
                      <stop offset="1" stop-color="#0F6DAD" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_3611_126093" x1="281.652" y1="89.3875" x2="306.954" y2="94.7679" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#1791D2" />
                      <stop offset="1" stop-color="#1173C5" />
                    </linearGradient>
                    <linearGradient id="paint7_linear_3611_126093" x1="555.008" y1="286.24" x2="555.008" y2="262.24" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#0052CC" />
                      <stop offset="0.51698" stop-color="#217EF8" />
                      <stop offset="1" stop-color="#2684FF" />
                    </linearGradient>
                    <linearGradient id="paint8_linear_3611_126093" x1="408.255" y1="224.656" x2="421.69" y2="206.909" gradientUnits="userSpaceOnUse">
                      <stop offset="0.016" stop-color="#765AF8" />
                      <stop offset="0.382" stop-color="#B345F1" />
                      <stop offset="0.758" stop-color="#FA3293" />
                      <stop offset="0.941" stop-color="#FF318C" />
                    </linearGradient>
                    <linearGradient id="paint9_linear_3611_126093" x1="409.248" y1="225.357" x2="422.661" y2="207.639" gradientUnits="userSpaceOnUse">
                      <stop offset="0.016" stop-color="#765AF8" />
                      <stop offset="0.382" stop-color="#B345F1" />
                      <stop offset="0.758" stop-color="#FA3293" />
                      <stop offset="0.941" stop-color="#FF318C" />
                    </linearGradient>
                    <linearGradient id="paint10_linear_3611_126093" x1="431.249" y1="224.454" x2="423.668" y2="206.462" gradientUnits="userSpaceOnUse">
                      <stop offset="0.183" stop-color="#765AF8" />
                      <stop offset="0.238" stop-color="#8655F6" />
                      <stop offset="0.345" stop-color="#9F4CF3" />
                      <stop offset="0.443" stop-color="#AE47F2" />
                      <stop offset="0.522" stop-color="#B345F1" />
                    </linearGradient>
                    <linearGradient id="paint11_linear_3611_126093" x1="436.922" y1="229.452" x2="419.29" y2="215.819" gradientUnits="userSpaceOnUse">
                      <stop offset="0.016" stop-color="#765AF8" />
                      <stop offset="0.382" stop-color="#B345F1" />
                    </linearGradient>
                    <clipPath id="clip0_3611_126093">
                      <rect width="32" height="32" fill="white" transform="translate(755.531 0.240234) rotate(25.018)" />
                    </clipPath>
                    <clipPath id="clip1_3611_126093">
                      <rect width="32" height="32" fill="white" transform="translate(304 412.021) rotate(-17.7972)" />
                    </clipPath>
                    <clipPath id="clip2_3611_126093">
                      <rect width="32" height="32" fill="white" transform="translate(0 102.271) rotate(-28.0174)" />
                    </clipPath>
                    <clipPath id="clip3_3611_126093">
                      <rect width="32" height="32" fill="white" transform="translate(276 81.0762) rotate(-27.6195)" />
                    </clipPath>
                    <clipPath id="clip4_3611_126093">
                      <rect width="32" height="32" fill="white" transform="translate(408 203.24)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="text-h1 font-bold text-gradient text-left">
                “ ZenTrio turns management into progress. “
              </p>
              <p className="text-gradient text-h1 text-left">PVH class</p>
              <p className="text-base text-h4 leading-relaxed uppercase text-left">
                ZenTrio Sponsored
              </p>
              <div className="slideshow-container">
                <div className="slideshow">
                  <div className="image-slide">
                    <img src="https://i.namu.wiki/i/w66OcGVsvFp18xw7x29LBAp-ftsDHptDxMqj7RAUQEowlntsJbvxM0y7GBlwHI58cVkq-klMnpCuUjfH1Pxm_A.webp" alt="Image 1" />
                  </div>
                  <div className="image-slide">
                    <img src="https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/3d/32/20/3d322049-015a-0e3b-e512-583ac627d478/source/512x512bb.jpg" alt="Image 2" />
                  </div>
                  <div className="image-slide">
                    <img src="https://kshrd.com.kh/_next/image?url=%2Fsponsor%2Fkosign.png&w=640&q=75.jpg" alt="Image 3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center ">
            <div className="grid grid-cols-4  text-white text-sm text-center font-bold leading-6">
              <div className="box-content h-[374px] border-4 rounded-full bg-black overflow-hidden group row-span-3 relative">
                <Image
                  src={fong}
                  alt="Example"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
                  {/* Name and icon stacked with spacing */}
                  <div className="flex flex-col items-center space-y-2 justify-between">
                    <p className="text-lg font-semibold">Ny Fong</p>
                    <div className="flex flex-row space-x-1">
                      <Link
                        href="https://www.facebook.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Facebook Profile"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#039be5"
                            d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://t.me/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#29b6f6"
                            d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
                          ></path>
                          <path
                            fill="#b0bec5"
                            d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
                          ></path>
                          <path
                            fill="#cfd8dc"
                            d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <linearGradient
                            id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                            x1="4"
                            x2="44"
                            y1="23.508"
                            y2="23.508"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#4c4c4c"></stop>
                            <stop offset="1" stopColor="#343434"></stop>
                          </linearGradient>
                          <path
                            fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                            d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                          ></path>
                          <path
                            d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                            opacity=".05"
                          ></path>
                          <path
                            d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                            opacity=".07"
                          ></path>
                          <path
                            fill="#fff"
                            d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-8 justify-center items-center col-span-2">
                <div className="relative box-content w-[200px] h-[200px]  rounded-full overflow-hidden group mr-8 bg-indigo-300">
                  <Image
                    src={minh}
                    alt="Circular"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
                    {/* Name and icon stacked with spacing */}
                    <div className="flex flex-col items-center space-y-2 justify-between">
                      <p className="text-lg font-semibold">Seam Chiminh</p>
                      <div className="flex flex-row space-x-1">
                        <Link
                          href="https://www.facebook.com/yourprofile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Facebook Profile"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#039be5"
                              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                            ></path>
                          </svg>
                        </Link>
                        <Link
                          href="https://t.me/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Telegram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#29b6f6"
                              d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
                            ></path>
                            <path
                              fill="#b0bec5"
                              d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
                            ></path>
                            <path
                              fill="#cfd8dc"
                              d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
                            ></path>
                          </svg>
                        </Link>
                        <Link
                          href="https://github.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Telegram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <linearGradient
                              id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                              x1="4"
                              x2="44"
                              y1="23.508"
                              y2="23.508"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stopColor="#4c4c4c"></stop>
                              <stop offset="1" stopColor="#343434"></stop>
                            </linearGradient>
                            <path
                              fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                              d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                            ></path>
                            <path
                              d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                              opacity=".05"
                            ></path>
                            <path
                              d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                              opacity=".07"
                            ></path>
                            <path
                              fill="#fff"
                              d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative box-content w-[251px] h-[120px] rounded-full overflow-hidden group">
                  <Image
                    src={senghun}
                    alt="Circular"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
                    {/* Name and icon stacked with spacing */}
                    <div className="flex flex-col items-center space-y-2 justify-between">
                      <p className="text-lg font-semibold">Hoeum Senghun</p>
                      <div className="flex flex-row space-x-1">
                        <Link
                          href="https://www.facebook.com/yourprofile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Facebook Profile"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#039be5"
                              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                            ></path>
                          </svg>
                        </Link>
                        <Link
                          href="https://t.me/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Telegram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#29b6f6"
                              d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
                            ></path>
                            <path
                              fill="#b0bec5"
                              d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
                            ></path>
                            <path
                              fill="#cfd8dc"
                              d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
                            ></path>
                          </svg>
                        </Link>
                        <Link
                          href="https://github.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Telegram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <linearGradient
                              id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                              x1="4"
                              x2="44"
                              y1="23.508"
                              y2="23.508"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stopColor="#4c4c4c"></stop>
                              <stop offset="1" stopColor="#343434"></stop>
                            </linearGradient>
                            <path
                              fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                              d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                            ></path>
                            <path
                              d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                              opacity=".05"
                            ></path>
                            <path
                              d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                              opacity=".07"
                            ></path>
                            <path
                              fill="#fff"
                              d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative box-content w-[180px] h-[220px] rounded-tl-[100px] rounded-bl-[150px] rounded-tr-[50px] rounded-br-[50px] overflow-hidden group ">
                <Image
                  src={fanau}
                  alt="Example"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-[100px] rounded-bl-[150px] rounded-tr-[50px] p-6">
                  {/* Name and icon stacked with spacing */}
                  <div className="flex flex-col items-center space-y-2 justify-between ml-10">
                    <p className="text-lg font-semibold">Fanau</p>
                    <div className="flex flex-row space-x-1">
                      <Link
                        href="https://www.facebook.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Facebook Profile"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#039be5"
                            d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://t.me/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#29b6f6"
                            d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
                          ></path>
                          <path
                            fill="#b0bec5"
                            d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
                          ></path>
                          <path
                            fill="#cfd8dc"
                            d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <linearGradient
                            id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                            x1="4"
                            x2="44"
                            y1="23.508"
                            y2="23.508"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#4c4c4c"></stop>
                            <stop offset="1" stopColor="#343434"></stop>
                          </linearGradient>
                          <path
                            fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                            d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                          ></path>
                          <path
                            d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                            opacity=".05"
                          ></path>
                          <path
                            d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                            opacity=".07"
                          ></path>
                          <path
                            fill="#fff"
                            d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row col-span-2 space-x-2 justify-center items-center">
                <div className="relative box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
                  <Image
                    src={theara}
                    alt="Example"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full rounded-br-none p-6">
                    {/* Name and icon stacked with spacing */}
                    <div className="flex flex-col items-center space-y-2 justify-between">
                      <p className="text-lg font-semibold">Chann Theara</p>
                      <div className="flex flex-row space-x-1">
                        <Link
                          href="https://www.facebook.com/yourprofile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Facebook Profile"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#039be5"
                              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                            ></path>
                          </svg>
                        </Link>
                        <Link
                          href="https://t.me/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Telegram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#29b6f6"
                              d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
                            ></path>
                            <path
                              fill="#b0bec5"
                              d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
                            ></path>
                            <path
                              fill="#cfd8dc"
                              d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
                            ></path>
                          </svg>
                        </Link>
                        <Link
                          href="https://github.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Telegram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <linearGradient
                              id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                              x1="4"
                              x2="44"
                              y1="23.508"
                              y2="23.508"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stopColor="#4c4c4c"></stop>
                              <stop offset="1" stopColor="#343434"></stop>
                            </linearGradient>
                            <path
                              fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                              d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                            ></path>
                            <path
                              d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                              opacity=".05"
                            ></path>
                            <path
                              d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                              opacity=".07"
                            ></path>
                            <path
                              fill="#fff"
                              d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group ">
                  <Image
                    src={roskan}
                    alt="Example"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full rounded-br-none p-6">
                    {/* Name and icon stacked with spacing */}
                    <div className="flex flex-col items-center space-y-2 justify-between">
                      <p className="text-lg font-semibold">Lim Rosskan</p>
                      <div className="flex flex-row space-x-1">
                        <Link
                          href="https://www.facebook.com/yourprofile"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Facebook Profile"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#039be5"
                              d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                            ></path>
                          </svg>
                        </Link>
                        <Link
                          href="https://t.me/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Telegram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <path
                              fill="#29b6f6"
                              d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                            ></path>
                            <path
                              fill="#fff"
                              d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
                            ></path>
                            <path
                              fill="#b0bec5"
                              d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
                            ></path>
                            <path
                              fill="#cfd8dc"
                              d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
                            ></path>
                          </svg>
                        </Link>
                        <Link
                          href="https://github.com/yourusername"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-600 w-8 h-8"
                          aria-label="Telegram"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                          >
                            <linearGradient
                              id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                              x1="4"
                              x2="44"
                              y1="23.508"
                              y2="23.508"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stopColor="#4c4c4c"></stop>
                              <stop offset="1" stopColor="#343434"></stop>
                            </linearGradient>
                            <path
                              fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                              d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                            ></path>
                            <path
                              d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                              opacity=".05"
                            ></path>
                            <path
                              d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                              opacity=".07"
                            ></path>
                            <path
                              fill="#fff"
                              d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative box-content w-full h-[374px] rounded-full overflow-hidden group">
                <Image
                  src={visa}
                  alt="Example"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
                  {/* Name and icon stacked with spacing */}
                  <div className="flex flex-col items-center space-y-2 justify-between">
                    <p className="text-lg font-semibold">Mony Visa</p>
                    <div className="flex flex-row space-x-1">
                      <Link
                        href="https://www.facebook.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Facebook Profile"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#039be5"
                            d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://t.me/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#29b6f6"
                            d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
                          ></path>
                          <path
                            fill="#b0bec5"
                            d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
                          ></path>
                          <path
                            fill="#cfd8dc"
                            d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <linearGradient
                            id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                            x1="4"
                            x2="44"
                            y1="23.508"
                            y2="23.508"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#4c4c4c"></stop>
                            <stop offset="1" stopColor="#343434"></stop>
                          </linearGradient>
                          <path
                            fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                            d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                          ></path>
                          <path
                            d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                            opacity=".05"
                          ></path>
                          <path
                            d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                            opacity=".07"
                          ></path>
                          <path
                            fill="#fff"
                            d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
                <Image
                  src={leap}
                  alt="Example"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full rounded-br-none p-6">
                  {/* Name and icon stacked with spacing */}
                  <div className="flex flex-col items-center space-y-2 justify-between">
                    <p className="text-lg font-semibold">Leang Chhengleap</p>
                    <div className="flex flex-row space-x-1">
                      <Link
                        href="https://www.facebook.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Facebook Profile"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#039be5"
                            d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://t.me/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#29b6f6"
                            d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
                          ></path>
                          <path
                            fill="#b0bec5"
                            d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
                          ></path>
                          <path
                            fill="#cfd8dc"
                            d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <linearGradient
                            id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                            x1="4"
                            x2="44"
                            y1="23.508"
                            y2="23.508"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#4c4c4c"></stop>
                            <stop offset="1" stopColor="#343434"></stop>
                          </linearGradient>
                          <path
                            fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                            d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                          ></path>
                          <path
                            d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                            opacity=".05"
                          ></path>
                          <path
                            d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                            opacity=".07"
                          ></path>
                          <path
                            fill="#fff"
                            d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative box-content w-[280px] h-[165px] rounded-full overflow-hidden group">
                <Image
                  src={vit}
                  alt="Example"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
                  {/* Name and icon stacked with spacing */}
                  <div className="flex flex-col items-center space-y-2 justify-between">
                    <p className="text-lg font-semibold">Davit</p>
                    <div className="flex flex-row space-x-1">
                      <Link
                        href="https://www.facebook.com/yourprofile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Facebook Profile"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#039be5"
                            d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://t.me/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#29b6f6"
                            d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
                          ></path>
                          <path
                            fill="#b0bec5"
                            d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
                          ></path>
                          <path
                            fill="#cfd8dc"
                            d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
                          ></path>
                        </svg>
                      </Link>
                      <Link
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 w-8 h-8"
                        aria-label="Telegram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <linearGradient
                            id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
                            x1="4"
                            x2="44"
                            y1="23.508"
                            y2="23.508"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0" stopColor="#4c4c4c"></stop>
                            <stop offset="1" stopColor="#343434"></stop>
                          </linearGradient>
                          <path
                            fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
                            d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
                          ></path>
                          <path
                            d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
                            opacity=".05"
                          ></path>
                          <path
                            d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
                            opacity=".07"
                          ></path>
                          <path
                            fill="#fff"
                            d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="text-white p-4 rounded col-span-2">
            <div
              className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[515px] bg-center bg-cover rounded-[24px]"
              style={{ backgroundImage: `url(${aboutus5.src})` }}
            >
              <div className="absolute w-full h-full flex items-center p-5">
                <div className="p-4 sm:p-6 md:p-10 max-w-xl space-y-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50.6px] font-bold text-[#F3F7FB]">
                    Ready to Start Your Next Adventure
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl lg:text-[22.77px] text-[#EFFCFF] leading-relaxed">
                    Join the Thrill today Unlocked and Discover the Thrill of
                    Adventure with Thrillz
                  </p>

                  <Button className="bg-white text-[#59BAD5] hover:text-white text-sm sm:text-base md:text-[15.18px] font-normal rounded-[30px] px-6 py-2 ml-20">
                    Get Start Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
