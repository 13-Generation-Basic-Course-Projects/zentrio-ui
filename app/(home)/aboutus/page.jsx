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

import Image from "next/image";
import Link from "next/link";
import {
  RoundText1,
  RoundText2,
  RoundText3,
} from "@/components/testcomponent/RoundText";

// export default function AboutUs() {
//   return (
//     <div className=" grid grid-cols-12 gap-4 p-4 min-h-screen ">
//       <div className="col-span-12 space-y-40 ">
//         <section className="relative flex justify-center items-center gap-4 h-[700px]">
//           <div className="grid grid-cols-2">
//             <div className="ml-2 imgBg1 flex items-start text-center p-8">
//               <div className="z-10 text-left w-[90%] p-5 ">
//                 <h1 className="text-[48px] md:text-h2 lg:text-h1 font-bold mb-4 text-title">
//                   <span className="text-[64px]">We are from</span> <br />
//                   Korean Software HRD Center
//                 </h1>
//                 <p className="md:text-h6 lg:text-h4 text-[24px] mb-2 font-bold text-title">
//                   13<sup>th</sup> Generation Student Basic Course.
//                 </p>
//                 <p className="md:text-h5 lg:text-h6 text-description mb-20 text-[16px]">
//                   We’re really confident with this project that can bring the
//                   best tool for software development.
//                 </p>
//                 <Button
//                   className="text-[#FFFFFF] rounded-medium py-5 w-[168.06px] h-[50.06px] scale-[0.9]"
//                   type="button"
//                 >
//                   <span className="text-[16px] font-semibold tracking-[0.5px] pt-[1%]">Get Started</span>
//                   <span className="scale-[0.75] pb-[1%] pl-[1.5%]">
//                     <svg width="5" height="5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M11.3712 10.2385L11.3947 1.90297C11.3918 1.74782 11.3582 1.59495 11.296 1.45313C11.1772 1.16716 10.9502 0.940181 10.6643 0.821423C10.5225 0.759177 10.3696 0.725618 10.2144 0.72267L1.87888 0.746252C1.72344 0.746692 1.56943 0.777743 1.42566 0.837633C1.28188 0.897524 1.15115 0.98508 1.04093 1.0953C0.818322 1.31791 0.692765 1.61933 0.691877 1.93325C0.690988 2.24717 0.814843 2.54789 1.03619 2.76924C1.25754 2.99059 1.55825 3.11444 1.87218 3.11355L7.36534 3.08968L1.02075 9.43427C0.799048 9.65596 0.674002 9.95616 0.673118 10.2688C0.672233 10.5814 0.795583 10.8809 1.01603 11.1014C1.23648 11.3218 1.53596 11.4452 1.84861 11.4443C2.16125 11.4434 2.46144 11.3184 2.68314 11.0967L9.02773 4.75207L9.00386 10.2452C9.00278 10.4009 9.03252 10.555 9.09137 10.6987C9.15022 10.8424 9.23702 10.9729 9.34675 11.0826C9.45647 11.1924 9.58697 11.2792 9.73069 11.338C9.87442 11.3969 10.0285 11.4266 10.1842 11.4255C10.3398 11.4257 10.4941 11.3951 10.6381 11.3354C10.7822 11.2758 10.9132 11.1883 11.0235 11.0779C11.1339 10.9675 11.2214 10.8366 11.2811 10.6925C11.3407 10.5484 11.3714 10.3941 11.3712 10.2385Z" fill="white"/>
//                     </svg>
//                   </span>
//                 </Button>
//               </div>
//             </div>

//             <div className="imgBg2 flex items-start  text-title text-center p-8 ml-10">
//               <div className="px-[30px] z-10 border-2 rounded-large p-2  bg-white/40 bg-blur backdrop-blur-md text-left ml-10 mt-14 ">
//                 <p className="text-body-sm text-blueActive font-semibold">Our school</p>
//                 <p className="text-h4 text-primary pt-[1%]">
//                   <span className="text-[40px] font-semibold">Korea Software</span> <br />
//                   <span className="text-[32px] font-semibold leading-3">HRD Center</span>
//                 </p>
//               </div>
//               <img
//                 src="/image/hrdaboutus.png"
//                 alt="Overlay"
//                 className="overlay"
//               />
//             </div>
//           </div>
//           <div className="absolute bottom-[-3%]">
//             <RoundText1 />
//           </div>
//         </section>

//         <section className="grid grid-row-1 sm:grid-cols-2 gap-4">
//           <div className="relative h-auto  overflow-hidden p-6 sm:p-10 flex  items-center right-0 justify-center ">
//             <div className="flex flex-col justify-center space-y-6 max-w-xl right-1">
//               <p className="text-h3 font-bold text-gradient text-left">
//                 ZenTrio Founder
//               </p>

//               <p className="text-base text-body-lg leading-relaxed text-left w-[429px]">
//                 Jump in and let’s see how ZenTrio can make your workday feel
//                 lighter. Let’s your projects and get stuff done
//                 together.
//               </p>
//             </div>
//           </div>

//           {/* !!!!!! */}
//           <div className="relative flex items-center min-h-screen px-10">
//             {/* RoundText2 Center-Left */}
//             <div className="absolute left-0 top-1/2 -translate-y-1/2 ml-5 z-10">
//               <RoundText3 />
//             </div>

//             {/* Content Row: Black Section + Instructor Cards */}
//             <div className="flex flex-row justify-between w-full">
//               {/* LEFT: Black Card Section */}
//               <div className="flex flex-col justify-center items-center space-y-5 p-5 rounded-lg">
//                 <div className="card w-[300px] md:w-[320px]">
//                   <div className="box">
//                     <div className="imgBx">
//                       <Image
//                         src={ourInstructor}
//                         alt="Our Instructor"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                   <div className="box">
//                     <div className="imgBx">
//                       <Image
//                         src={ksgh}
//                         alt="KSGH"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT: Instructor Cards */}
//               <div className="flex flex-col space-y-5 ml-10">
//                 {/* Card 1 */}
//                 <div className="relative w-full max-w-[300px] rounded-xl overflow-hidden shadow-lg">
//                   <Image
//                     alt="Teacher Nak"
//                     src={cherNak}
//                     className="object-cover w-full h-full"
//                   />
//                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex flex-col items-center px-3 py-2 shadow-md w-[200px]">
//                     <div className="text-sm text-white">Kheng Sovannak</div>
//                     <div className="text-sm text-white">IT Instructor</div>
//                   </div>
//                 </div>

//                 {/* Card 2 */}
//                 <div className="relative w-full max-w-[300px] h-[199px] rounded-xl overflow-hidden shadow-lg">
//                   <Image
//                     alt="Teacher Dara"
//                     src={cherDara}
//                     className="object-cover w-full h-full"
//                   />
//                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex flex-col items-center px-3 py-2 shadow-md w-[200px]">
//                     <div className="text-sm text-white">Tan Dara</div>
//                     <div className="text-sm text-white">IT Instructor</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* !!!!!! */}

//           {/* CardTeacher */}
//           {/* <div className="grid grid-cols-2 grid-rows-4 gap-4">
//               <div className="row-start-1 h-[209.83px] bg-slate-green rounded-b-[-50%]">1</div>
//               <div className="row-span-2 h-[292px] bg-slate-green">2</div>
//               <div className="row-start-3 h-[133.6px] bg-slate-green">3</div>
//               <div className="row-span-2 row-start-3 h-[199px] bg-slate-green">4</div>
//           </div> */}

//         </section>
//         {/* feature */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
//           <div className="grid grid-cols-2 gap-6 relative items-center justify-center ">
//             <div className="imgBgStage p-16">
//               <div className="flex flex-row space-x-2 ">
//                 <Image
//                   src={imgs1}
//                   width={80}
//                   height={80}
//                   className="object-contain"
//                   alt="img"
//                 />
//                 <p className="text-h4 text-primary uppercase font-semibold">
//                   4 Core Stages
//                 </p>
//               </div>
//               <p className="text-h6 text-title/50 text-center mt-10">
//                 Todo, Progress, Review, Completed
//               </p>
//             </div>
//             <div className="imgBgCalendar p-14 ">
//               <div className="flex flex-row space-x-2 ">
//                 {" "}
//                 <Image
//                   src={imgs2}
//                   width={80}
//                   height={80}
//                   className="object-contain"
//                   alt="img"
//                 />
//                 <p className="text-h4 text-primary uppercase font-semibold">
//                   Personal Calendar
//                 </p>
//               </div>
//               <p className="text-h6 text-title/50 text-center mt-10">
//                 manage daily tasks, deadlines, and project plans efficiently.
//               </p>
//             </div>
//             <div className="imgBgBell p-14 ">
//               <div className="flex flex-row space-x-2 ">
//                 <Image
//                   src={bellNotification}
//                   width={80}
//                   height={80}
//                   className="object-contain"
//                   alt="img"
//                 />
//                 <p className="text-h4 text-primary uppercase font-semibold">
//                   Real-Time Alerts
//                 </p>
//               </div>
//               <p className="text-h6 text-title/50 text-center mt-10">
//                 Notifications on task activity
//               </p>
//             </div>
//             <div className="imgBgGoogle p-12">
//               <div className="flex flex-row space-x-2 ">
//                 <Image
//                   src={google}
//                   width={80}
//                   height={80}
//                   className="object-contain"
//                   alt="img"
//                 />
//                 <p className="text-h4 text-primary uppercase font-semibold">
//                   Google Tools Integrated
//                 </p>
//               </div>
//               <p className="text-h6 text-title/50 text-center mt-8">
//                 Using Google Docs, Sheets, and Slides.
//               </p>
//             </div>

//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="p-4">
//                 <RoundText2 />
//               </div>
//             </div>
//           </div>
//           <div className="relative p-6  h-auto flex items-center justify-center">
//             <div className="flex flex-col justify-center items-start space-y-6 max-w-xl">
//               <p className="text-h1 font-bold text-gradient text-left">
//                 Effortless project management for teams.
//               </p>
//               <p className="text-base text-h4 leading-relaxed  text-left">
//                 Jump in and see how ZenTrio lightens your workday and gets
//                 things done.
//               </p>
//             </div>
//           </div>
//         </section>
//         {/* team */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
//           <div className="relative flex justify-center">
//             <div className="flex flex-col justify-center items-start space-y-6 max-w-xl">
//               <p className="text-h1 font-bold text-gradient text-left">
//                 “ ZenTrio turns management into progress. “
//               </p>
//               <p className="text-gradient text-h1 text-left">PVH class</p>
//               <p className="text-base text-h4 leading-relaxed uppercase text-left">
//                 ZenTrio Sponsored
//               </p>
//               <div className="slideshow-container">
//                 <img
//                   src="https://i.namu.wiki/i/w66OcGVsvFp18xw7x29LBAp-ftsDHptDxMqj7RAUQEowlntsJbvxM0y7GBlwHI58cVkq-klMnpCuUjfH1Pxm_A.webp"
//                   alt="Image 1"
//                   className="slide"
//                 />
//                 <img
//                   src="https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/3d/32/20/3d322049-015a-0e3b-e512-583ac627d478/source/512x512bb.jpg"
//                   alt="Image 2"
//                   className="slide"
//                 />
//                 <img
//                   src="https://kshrd.com.kh/_next/image?url=%2Fsponsor%2Fkosign.png&w=640&q=75"
//                   alt="Image 3"
//                   className="slide"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center items-center ">
//             <div className="grid grid-cols-4  text-white text-sm text-center font-bold leading-6">
//               <div className="box-content h-[374px] border-4 rounded-full bg-black overflow-hidden group row-span-3 relative">
//                 <Image
//                   src={fong}
//                   alt="Example"
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                 />

//                 <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
//                   {/* Name and icon stacked with spacing */}
//                   <div className="flex flex-col items-center space-y-2 justify-between">
//                     <p className="text-lg font-semibold">Ny Fong</p>
//                     <div className="flex flex-row space-x-1">
//                       <Link
//                         href="https://www.facebook.com/yourprofile"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Facebook Profile"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#039be5"
//                             d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://t.me/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#29b6f6"
//                             d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
//                           ></path>
//                           <path
//                             fill="#b0bec5"
//                             d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
//                           ></path>
//                           <path
//                             fill="#cfd8dc"
//                             d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://github.com/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <linearGradient
//                             id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
//                             x1="4"
//                             x2="44"
//                             y1="23.508"
//                             y2="23.508"
//                             gradientUnits="userSpaceOnUse"
//                           >
//                             <stop offset="0" stopColor="#4c4c4c"></stop>
//                             <stop offset="1" stopColor="#343434"></stop>
//                           </linearGradient>
//                           <path
//                             fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
//                             d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
//                           ></path>
//                           <path
//                             d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
//                             opacity=".05"
//                           ></path>
//                           <path
//                             d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
//                             opacity=".07"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
//                           ></path>
//                         </svg>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col space-y-8 justify-center items-center col-span-2">
//                 <div className="relative box-content w-[200px] h-[200px]  rounded-full overflow-hidden group mr-8 bg-indigo-300">
//                   <Image
//                     src={minh}
//                     alt="Circular"
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
//                     {/* Name and icon stacked with spacing */}
//                     <div className="flex flex-col items-center space-y-2 justify-between">
//                       <p className="text-lg font-semibold">Seam Chiminh</p>
//                       <div className="flex flex-row space-x-1">
//                         <Link
//                           href="https://www.facebook.com/yourprofile"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Facebook Profile"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <path
//                               fill="#039be5"
//                               d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
//                             ></path>
//                           </svg>
//                         </Link>
//                         <Link
//                           href="https://t.me/yourusername"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Telegram"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <path
//                               fill="#29b6f6"
//                               d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
//                             ></path>
//                             <path
//                               fill="#b0bec5"
//                               d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
//                             ></path>
//                             <path
//                               fill="#cfd8dc"
//                               d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
//                             ></path>
//                           </svg>
//                         </Link>
//                         <Link
//                           href="https://github.com/yourusername"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Telegram"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <linearGradient
//                               id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
//                               x1="4"
//                               x2="44"
//                               y1="23.508"
//                               y2="23.508"
//                               gradientUnits="userSpaceOnUse"
//                             >
//                               <stop offset="0" stopColor="#4c4c4c"></stop>
//                               <stop offset="1" stopColor="#343434"></stop>
//                             </linearGradient>
//                             <path
//                               fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
//                               d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
//                             ></path>
//                             <path
//                               d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
//                               opacity=".05"
//                             ></path>
//                             <path
//                               d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
//                               opacity=".07"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
//                             ></path>
//                           </svg>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="relative box-content w-[251px] h-[120px] rounded-full overflow-hidden group">
//                   <Image
//                     src={senghun}
//                     alt="Circular"
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
//                     {/* Name and icon stacked with spacing */}
//                     <div className="flex flex-col items-center space-y-2 justify-between">
//                       <p className="text-lg font-semibold">Hoeum Senghun</p>
//                       <div className="flex flex-row space-x-1">
//                         <Link
//                           href="https://www.facebook.com/yourprofile"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Facebook Profile"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <path
//                               fill="#039be5"
//                               d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
//                             ></path>
//                           </svg>
//                         </Link>
//                         <Link
//                           href="https://t.me/yourusername"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Telegram"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <path
//                               fill="#29b6f6"
//                               d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
//                             ></path>
//                             <path
//                               fill="#b0bec5"
//                               d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
//                             ></path>
//                             <path
//                               fill="#cfd8dc"
//                               d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
//                             ></path>
//                           </svg>
//                         </Link>
//                         <Link
//                           href="https://github.com/yourusername"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Telegram"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <linearGradient
//                               id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
//                               x1="4"
//                               x2="44"
//                               y1="23.508"
//                               y2="23.508"
//                               gradientUnits="userSpaceOnUse"
//                             >
//                               <stop offset="0" stopColor="#4c4c4c"></stop>
//                               <stop offset="1" stopColor="#343434"></stop>
//                             </linearGradient>
//                             <path
//                               fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
//                               d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
//                             ></path>
//                             <path
//                               d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
//                               opacity=".05"
//                             ></path>
//                             <path
//                               d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
//                               opacity=".07"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
//                             ></path>
//                           </svg>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative box-content w-[180px] h-[220px] rounded-tl-[100px] rounded-bl-[150px] rounded-tr-[50px] rounded-br-[50px] overflow-hidden group ">
//                 <Image
//                   src={fanau}
//                   alt="Example"
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-[100px] rounded-bl-[150px] rounded-tr-[50px] p-6">
//                   {/* Name and icon stacked with spacing */}
//                   <div className="flex flex-col items-center space-y-2 justify-between ml-10">
//                     <p className="text-lg font-semibold">Fanau</p>
//                     <div className="flex flex-row space-x-1">
//                       <Link
//                         href="https://www.facebook.com/yourprofile"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Facebook Profile"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#039be5"
//                             d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://t.me/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#29b6f6"
//                             d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
//                           ></path>
//                           <path
//                             fill="#b0bec5"
//                             d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
//                           ></path>
//                           <path
//                             fill="#cfd8dc"
//                             d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://github.com/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <linearGradient
//                             id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
//                             x1="4"
//                             x2="44"
//                             y1="23.508"
//                             y2="23.508"
//                             gradientUnits="userSpaceOnUse"
//                           >
//                             <stop offset="0" stopColor="#4c4c4c"></stop>
//                             <stop offset="1" stopColor="#343434"></stop>
//                           </linearGradient>
//                           <path
//                             fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
//                             d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
//                           ></path>
//                           <path
//                             d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
//                             opacity=".05"
//                           ></path>
//                           <path
//                             d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
//                             opacity=".07"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
//                           ></path>
//                         </svg>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-row col-span-2 space-x-2 justify-center items-center">
//                 <div className="relative box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
//                   <Image
//                     src={theara}
//                     alt="Example"
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full rounded-br-none p-6">
//                     {/* Name and icon stacked with spacing */}
//                     <div className="flex flex-col items-center space-y-2 justify-between">
//                       <p className="text-lg font-semibold">Chann Theara</p>
//                       <div className="flex flex-row space-x-1">
//                         <Link
//                           href="https://www.facebook.com/yourprofile"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Facebook Profile"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <path
//                               fill="#039be5"
//                               d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
//                             ></path>
//                           </svg>
//                         </Link>
//                         <Link
//                           href="https://t.me/yourusername"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Telegram"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <path
//                               fill="#29b6f6"
//                               d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
//                             ></path>
//                             <path
//                               fill="#b0bec5"
//                               d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
//                             ></path>
//                             <path
//                               fill="#cfd8dc"
//                               d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
//                             ></path>
//                           </svg>
//                         </Link>
//                         <Link
//                           href="https://github.com/yourusername"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Telegram"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <linearGradient
//                               id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
//                               x1="4"
//                               x2="44"
//                               y1="23.508"
//                               y2="23.508"
//                               gradientUnits="userSpaceOnUse"
//                             >
//                               <stop offset="0" stopColor="#4c4c4c"></stop>
//                               <stop offset="1" stopColor="#343434"></stop>
//                             </linearGradient>
//                             <path
//                               fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
//                               d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
//                             ></path>
//                             <path
//                               d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
//                               opacity=".05"
//                             ></path>
//                             <path
//                               d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
//                               opacity=".07"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
//                             ></path>
//                           </svg>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="relative box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group ">
//                   <Image
//                     src={roskan}
//                     alt="Example"
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full rounded-br-none p-6">
//                     {/* Name and icon stacked with spacing */}
//                     <div className="flex flex-col items-center space-y-2 justify-between">
//                       <p className="text-lg font-semibold">Lim Rosskan</p>
//                       <div className="flex flex-row space-x-1">
//                         <Link
//                           href="https://www.facebook.com/yourprofile"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Facebook Profile"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <path
//                               fill="#039be5"
//                               d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
//                             ></path>
//                           </svg>
//                         </Link>
//                         <Link
//                           href="https://t.me/yourusername"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Telegram"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <path
//                               fill="#29b6f6"
//                               d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
//                             ></path>
//                             <path
//                               fill="#b0bec5"
//                               d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
//                             ></path>
//                             <path
//                               fill="#cfd8dc"
//                               d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
//                             ></path>
//                           </svg>
//                         </Link>
//                         <Link
//                           href="https://github.com/yourusername"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                           aria-label="Telegram"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             x="0px"
//                             y="0px"
//                             width="30"
//                             height="30"
//                             viewBox="0 0 48 48"
//                           >
//                             <linearGradient
//                               id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
//                               x1="4"
//                               x2="44"
//                               y1="23.508"
//                               y2="23.508"
//                               gradientUnits="userSpaceOnUse"
//                             >
//                               <stop offset="0" stopColor="#4c4c4c"></stop>
//                               <stop offset="1" stopColor="#343434"></stop>
//                             </linearGradient>
//                             <path
//                               fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
//                               d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
//                             ></path>
//                             <path
//                               d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
//                               opacity=".05"
//                             ></path>
//                             <path
//                               d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
//                               opacity=".07"
//                             ></path>
//                             <path
//                               fill="#fff"
//                               d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
//                             ></path>
//                           </svg>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative box-content w-full h-[374px] rounded-full overflow-hidden group">
//                 <Image
//                   src={visa}
//                   alt="Example"
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
//                   {/* Name and icon stacked with spacing */}
//                   <div className="flex flex-col items-center space-y-2 justify-between">
//                     <p className="text-lg font-semibold">Mony Visa</p>
//                     <div className="flex flex-row space-x-1">
//                       <Link
//                         href="https://www.facebook.com/yourprofile"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Facebook Profile"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#039be5"
//                             d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://t.me/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#29b6f6"
//                             d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
//                           ></path>
//                           <path
//                             fill="#b0bec5"
//                             d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
//                           ></path>
//                           <path
//                             fill="#cfd8dc"
//                             d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://github.com/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <linearGradient
//                             id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
//                             x1="4"
//                             x2="44"
//                             y1="23.508"
//                             y2="23.508"
//                             gradientUnits="userSpaceOnUse"
//                           >
//                             <stop offset="0" stopColor="#4c4c4c"></stop>
//                             <stop offset="1" stopColor="#343434"></stop>
//                           </linearGradient>
//                           <path
//                             fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
//                             d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
//                           ></path>
//                           <path
//                             d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
//                             opacity=".05"
//                           ></path>
//                           <path
//                             d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
//                             opacity=".07"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
//                           ></path>
//                         </svg>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
//                 <Image
//                   src={leap}
//                   alt="Example"
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full rounded-br-none p-6">
//                   {/* Name and icon stacked with spacing */}
//                   <div className="flex flex-col items-center space-y-2 justify-between">
//                     <p className="text-lg font-semibold">Leang Chhengleap</p>
//                     <div className="flex flex-row space-x-1">
//                       <Link
//                         href="https://www.facebook.com/yourprofile"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Facebook Profile"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#039be5"
//                             d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://t.me/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#29b6f6"
//                             d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
//                           ></path>
//                           <path
//                             fill="#b0bec5"
//                             d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
//                           ></path>
//                           <path
//                             fill="#cfd8dc"
//                             d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://github.com/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <linearGradient
//                             id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
//                             x1="4"
//                             x2="44"
//                             y1="23.508"
//                             y2="23.508"
//                             gradientUnits="userSpaceOnUse"
//                           >
//                             <stop offset="0" stopColor="#4c4c4c"></stop>
//                             <stop offset="1" stopColor="#343434"></stop>
//                           </linearGradient>
//                           <path
//                             fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
//                             d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
//                           ></path>
//                           <path
//                             d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
//                             opacity=".05"
//                           ></path>
//                           <path
//                             d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
//                             opacity=".07"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
//                           ></path>
//                         </svg>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative box-content w-[280px] h-[165px] rounded-full overflow-hidden group">
//                 <Image
//                   src={vit}
//                   alt="Example"
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
//                   {/* Name and icon stacked with spacing */}
//                   <div className="flex flex-col items-center space-y-2 justify-between">
//                     <p className="text-lg font-semibold">Davit</p>
//                     <div className="flex flex-row space-x-1">
//                       <Link
//                         href="https://www.facebook.com/yourprofile"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Facebook Profile"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#039be5"
//                             d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://t.me/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <path
//                             fill="#29b6f6"
//                             d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
//                           ></path>
//                           <path
//                             fill="#b0bec5"
//                             d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
//                           ></path>
//                           <path
//                             fill="#cfd8dc"
//                             d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
//                           ></path>
//                         </svg>
//                       </Link>
//                       <Link
//                         href="https://github.com/yourusername"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-600 w-8 h-8"
//                         aria-label="Telegram"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           x="0px"
//                           y="0px"
//                           width="30"
//                           height="30"
//                           viewBox="0 0 48 48"
//                         >
//                           <linearGradient
//                             id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
//                             x1="4"
//                             x2="44"
//                             y1="23.508"
//                             y2="23.508"
//                             gradientUnits="userSpaceOnUse"
//                           >
//                             <stop offset="0" stopColor="#4c4c4c"></stop>
//                             <stop offset="1" stopColor="#343434"></stop>
//                           </linearGradient>
//                           <path
//                             fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
//                             d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
//                           ></path>
//                           <path
//                             d="M30.01,41.996L30,36.198c0-0.939-0.22-1.856-0.642-2.687c5.641-1.133,8.386-4.468,8.386-10.177	c0-2.255-0.665-4.246-1.976-5.92c0.1-0.317,0.174-0.645,0.22-0.981c0.188-1.369-0.023-2.264-0.193-2.984l-0.027-0.116	c-0.186-0.796-0.409-1.364-0.418-1.388l-0.111-0.282l-0.111-0.282l-0.302-0.032l-0.303-0.032c0,0-0.199-0.021-0.501-0.021	c-0.419,0-1.04,0.042-1.627,0.241l-0.196,0.066c-0.74,0.249-1.439,0.485-2.417,1.069c-0.286,0.171-0.599,0.366-0.934,0.584	C27.334,12.881,25.705,12.69,24,12.69c-1.722,0-3.365,0.192-4.889,0.571c-0.339-0.22-0.654-0.417-0.942-0.589	c-0.978-0.584-1.677-0.819-2.417-1.069l-0.196-0.066c-0.585-0.199-1.207-0.241-1.626-0.241c-0.302,0-0.501,0.021-0.501,0.021	l-0.302,0.032l-0.3,0.031l-0.112,0.281l-0.113,0.283c-0.01,0.026-0.233,0.594-0.419,1.391l-0.027,0.115	c-0.17,0.719-0.381,1.615-0.193,2.983c0.048,0.346,0.125,0.685,0.23,1.011c-1.285,1.666-1.936,3.646-1.936,5.89	c0,5.695,2.748,9.028,8.397,10.17c-0.194,0.388-0.345,0.798-0.452,1.224c-0.197,0.067-0.378,0.112-0.538,0.137	c-0.238,0.036-0.487,0.054-0.739,0.054c-0.686,0-1.225-0.134-1.435-0.259c-0.313-0.186-0.872-0.727-1.414-1.518	c-0.463-0.675-1.185-1.558-1.992-1.927c-0.698-0.319-1.437-0.502-2.029-0.502c-0.138,0-0.265,0.01-0.376,0.028	c-0.517,0.082-0.949,0.366-1.184,0.78c-0.203,0.357-0.235,0.773-0.088,1.141c0.219,0.548,0.851,0.985,1.343,1.255	c0.242,0.133,0.765,0.619,1.07,1.109c0.229,0.368,0.335,0.63,0.482,0.992c0.087,0.215,0.183,0.449,0.313,0.732	c0.47,1.022,1.937,1.924,2.103,2.023c0.806,0.483,2.161,0.638,3.157,0.683l0.123,0.003c0,0,0.001,0,0.001,0	c0.24,0,0.57-0.023,1.004-0.071v2.613c0.002,0.529-0.537,0.649-1.25,0.638l0.547,0.184C19.395,43.572,21.645,44,24,44	c2.355,0,4.605-0.428,6.703-1.176l0.703-0.262C30.695,42.538,30.016,42.422,30.01,41.996z"
//                             opacity=".05"
//                           ></path>
//                           <path
//                             d="M30.781,42.797c-0.406,0.047-1.281-0.109-1.281-0.795v-5.804c0-1.094-0.328-2.151-0.936-3.052	c5.915-0.957,8.679-4.093,8.679-9.812c0-2.237-0.686-4.194-2.039-5.822c0.137-0.365,0.233-0.75,0.288-1.147	c0.175-1.276-0.016-2.086-0.184-2.801l-0.027-0.116c-0.178-0.761-0.388-1.297-0.397-1.319l-0.111-0.282l-0.303-0.032	c0,0-0.178-0.019-0.449-0.019c-0.381,0-0.944,0.037-1.466,0.215l-0.196,0.066c-0.714,0.241-1.389,0.468-2.321,1.024	c-0.332,0.198-0.702,0.431-1.101,0.694C27.404,13.394,25.745,13.19,24,13.19c-1.762,0-3.435,0.205-4.979,0.61	c-0.403-0.265-0.775-0.499-1.109-0.699c-0.932-0.556-1.607-0.784-2.321-1.024l-0.196-0.066c-0.521-0.177-1.085-0.215-1.466-0.215	c-0.271,0-0.449,0.019-0.449,0.019l-0.302,0.032l-0.113,0.283c-0.009,0.022-0.219,0.558-0.397,1.319l-0.027,0.116	c-0.169,0.715-0.36,1.524-0.184,2.8c0.056,0.407,0.156,0.801,0.298,1.174c-1.327,1.62-1.999,3.567-1.999,5.795	c0,5.703,2.766,8.838,8.686,9.806c-0.395,0.59-0.671,1.255-0.813,1.964c-0.33,0.13-0.629,0.216-0.891,0.256	c-0.263,0.04-0.537,0.06-0.814,0.06c-0.69,0-1.353-0.129-1.69-0.329c-0.44-0.261-1.057-0.914-1.572-1.665	c-0.35-0.51-1.047-1.417-1.788-1.755c-0.635-0.29-1.298-0.457-1.821-0.457c-0.11,0-0.21,0.008-0.298,0.022	c-0.366,0.058-0.668,0.252-0.828,0.534c-0.128,0.224-0.149,0.483-0.059,0.708c0.179,0.448,0.842,0.85,1.119,1.002	c0.335,0.184,0.919,0.744,1.254,1.284c0.251,0.404,0.37,0.697,0.521,1.067c0.085,0.209,0.178,0.437,0.304,0.712	c0.331,0.719,1.353,1.472,1.905,1.803c0.754,0.452,2.154,0.578,2.922,0.612l0.111,0.002c0.299,0,0.8-0.045,1.495-0.135v3.177	c0,0.779-0.991,0.81-1.234,0.81c-0.031,0,0.503,0.184,0.503,0.184C19.731,43.64,21.822,44,24,44c2.178,0,4.269-0.36,6.231-1.003	C30.231,42.997,30.812,42.793,30.781,42.797z"
//                             opacity=".07"
//                           ></path>
//                           <path
//                             fill="#fff"
//                             d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
//                           ></path>
//                         </svg>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           <div className="text-white p-4 rounded col-span-2">
//             <div
//               className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[515px] bg-center bg-cover rounded-[24px]"
//               style={{ backgroundImage: `url(${aboutus5.src})` }}
//             >
//               <div className="absolute w-full h-full flex items-center p-5">
//                 <div className="p-4 sm:p-6 md:p-10 max-w-xl space-y-6">
//                   <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50.6px] font-bold text-[#F3F7FB]">
//                     Ready to Start Your Next Adventure
//                   </h2>

//                   <p className="text-base sm:text-lg md:text-xl lg:text-[22.77px] text-[#EFFCFF] leading-relaxed">
//                     Join the Thrill today Unlocked and Discover the Thrill of
//                     Adventure with Thrillz
//                   </p>

//                   <Button className="bg-white text-[#59BAD5] hover:text-white text-sm sm:text-base md:text-[15.18px] font-normal rounded-[30px] px-6 py-2 ml-20">
//                     Get Start Now
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

export default function AboutUs(){
  return(<>
    <div className=" grid grid-cols-12 gap-4 p-4 min-h-screen">
      <div className="col-span-12 space-y-40 ">
        {/* Two card and learn more arrow */}
        <section className="w-[1328px] h-[681.82px] flex gap-[20px]">
          <div className="w-[654px] h-[581px] bg-slate-blue px-[30px] py-[40px]">
            <p className="text-[64px] font-semibold text-title">
              We are from
            </p>
            <p className="font-semibold text-title text-[48px]">
              Korean Software HRD Center
            </p>
            <p className="font-medium text-title text-h4">
              13th  Generation Student Basic Course.
            </p>
            <p className="text-body text-description font-medium">
              We’re really confident with this project that can 
              bring the best tool for software development 
            </p>
            <Button className="h-[50.06px] w-[168.06px] rounded-[10px] py-[8px] pl-[26px] pr-[15px]">
              <p className="text-body font-semibold tracking-wide">
                Get Started
              </p>
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.3712 21.1838L22.3947 12.8483C22.3918 12.6931 22.3582 12.5403 22.296 12.3984C22.1772 12.1125 21.9502 11.8855 21.6643 11.7667C21.5225 11.7045 21.3696 11.6709 21.2144 11.668L12.8789 11.6916C12.7234 11.692 12.5694 11.7231 12.4257 11.7829C12.2819 11.8428 12.1512 11.9304 12.0409 12.0406C11.8183 12.2632 11.6928 12.5646 11.6919 12.8786C11.691 13.1925 11.8148 13.4932 12.0362 13.7145C12.2575 13.9359 12.5583 14.0598 12.8722 14.0589L18.3653 14.035L12.0207 20.3796C11.799 20.6013 11.674 20.9015 11.6731 21.2141C11.6722 21.5268 11.7956 21.8262 12.016 22.0467C12.2365 22.2671 12.536 22.3905 12.8486 22.3896C13.1613 22.3887 13.4614 22.2637 13.6831 22.042L20.0277 15.6974L20.0039 21.1905C20.0028 21.3462 20.0325 21.5003 20.0914 21.644C20.1502 21.7877 20.237 21.9182 20.3467 22.028C20.4565 22.1377 20.587 22.2245 20.7307 22.2833C20.8744 22.3422 21.0285 22.3719 21.1842 22.3708C21.3398 22.371 21.4941 22.3404 21.6381 22.2808C21.7822 22.2211 21.9132 22.1336 22.0235 22.0232C22.1339 21.9129 22.2214 21.7819 22.2811 21.6378C22.3407 21.4938 22.3714 21.3395 22.3712 21.1838Z" fill="white"/>
              </svg>
            </Button>
          </div>
          <div className="w-[654px] h-[581px] bg-slate-blue">
            
          </div>
        </section>
      </div>
    </div>
  </>)
}