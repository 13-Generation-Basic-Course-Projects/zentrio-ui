// "use client";
// import React, { useState } from "react";
// import { Button } from "@heroui/react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import logo from "../../public/image/Zentrio-Logo.png";
// import { Chip } from "@heroui/react";


// export const NavbarLanding = ({ tokens }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Helper function to check if route is active
//   const isActiveRoute = (route) => {
//     return pathname === route;
//   };
//   console.log("tokens", tokens);
  
//   return (
//     <div className="w-[] md:w-full h-[70px] bg-white shadow-sm rounded-full mx-auto mt-[30px] px-4 sm:px-6 relative">
//       <div className="flex justify-between items-center h-full">
//         <Link href="/">
//           <Image
//             src={logo}
//             alt="Zentrio Logo"
//             className="w-[50px] sm:w-[60px] md:w-[144px]"
//           />
//         </Link>

//         {/* Desktop Navigation (hidden on mobile) */}
//         <nav className="hidden md:flex justify-between items-center w-[580px] font-medium text-body-lg">
//           <Link
//             href="/"
//             className={`hover:text-primary transition-all ${
//               isActiveRoute("/") ? "text-primary font-semibold" : ""
//             }`}
//           >
//             Home
//           </Link>
//           <Link
//             href="/aboutus"
//             className={`hover:text-primary transition-all ${
//               isActiveRoute("/aboutus") ? "text-primary font-semibold" : ""
//             }`}
//           >
//             About us
//           </Link>
//           <Link
//             href="/contact"
//             className={`hover:text-primary transition-all ${
//               isActiveRoute("/contact") ? "text-primary font-semibold" : ""
//             }`}
//           >
//             Contact
//           </Link>
//           <Link
//             href="/draw"
//             className={`hover:text-primary transition-all relative ${
//               isActiveRoute("/draw") ? "text-primary font-semibold" : ""
//             }`}
//           >
//             Draw
//             <Chip
//               classNames={{
//                 base: "left-[72.5%] top-[40%] bg-gradient-to-br from-primary to-primary/5 border-small border-white/50 shadow-pink-500/30 absolute scale-[0.6]",
//                 content: "drop-shadow shadow-black text-white",
//               }}
//               variant="shadow"
//             >
//               So Fun
//             </Chip>
//           </Link>
//           <Link
//             href="/compiler"
//             className={`relative hover:text-primary transition-all ${isActiveRoute("/compiler") ? "text-primary font-semibold" : ""
//               }`}
//           >
//             Playground
//             <Chip
//               classNames={{
//                 base: "left-[90.0%] top-[40%] bg-gradient-to-br from-primary to-primary/5 border-small border-white/50 shadow-pink-500/30 absolute scale-[0.6]",
//                 content: "drop-shadow shadow-black text-white",
//               }}
//               variant="shadow"
//             >
//               Coding
//             </Chip>
//           </Link>
//         </nav>
//         {tokens ? (
//           ""
//         ) : (
//           <div className="hidden min-[400px]:flex gap-2 sm:gap-[10px] ">
//             <Button className=" bg-transparent text-primary border-none font-semibold rounded-full text-[16px] sm:px-[26px] py-2 px-4">
//               <Link href="/login">Login</Link>
//             </Button>
//             <Button className="bg-primary text-white border-none font-semibold text-[16px] rounded-full sm:px-[26px] py-2 px-4">
//               <Link href="/register">Register</Link>
//             </Button>
//           </div>
//         )}

//         {/* Mobile Menu Button (visible only on mobile) */}
//         <button
//           className="md:hidden text-primary border-none"
//           onClick={toggleMenu}
//         >
//           <svg
//             className="w-7 h-7"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {isMenuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu (shown when toggled) */}
//       {isMenuOpen && (
//         <div className="md:hidden flex flex-col items-center absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 mt-2 z-50 rounded-b-xl">
//           <nav className="flex flex-col items-center space-y-4 w-full">
//             <Link
//               href="/"
//               className={`hover:text-primary transition-all ${
//                 isActiveRoute("/") ? "text-primary font-semibold" : ""
//               }`}
//             >
//               Home
//             </Link>
//             <Link
//               href="/aboutus"
//               className={`hover:text-primary transition-all ${
//                 isActiveRoute("/aboutus") ? "text-primary font-semibold" : ""
//               }`}
//             >
//               About us
//             </Link>
//             <Link
//               href="/contact"
//               className={`hover:text-primary transition-all ${
//                 isActiveRoute("/contact") ? "text-primary font-semibold" : ""
//               }`}
//             >
//               Contact
//             </Link>
//             <Link
//             href="/draw"
//             className={`hover:text-primary transition-all relative ${
//               isActiveRoute("/draw") ? "text-primary font-semibold" : ""
//             }`}
//           >
//             Draw
//             <Chip
//               classNames={{
//                 base: "left-[72.5%] top-[40%] bg-gradient-to-br from-primary to-primary/5 border-small border-white/50 shadow-pink-500/30 absolute scale-[0.6]",
//                 content: "drop-shadow shadow-black text-white",
//               }}
//               variant="shadow"
//             >
//               So Fun
//             </Chip>
//           </Link>
//           <Link
//             href="/compiler"
//             className={`relative hover:text-primary transition-all ${isActiveRoute("/compiler") ? "text-primary font-semibold" : ""
//               }`}
//           >
//             Playground
//             <Chip
//               classNames={{
//                 base: "left-[90.0%] top-[40%] bg-gradient-to-br from-primary to-primary/5 border-small border-white/50 shadow-pink-500/30 absolute scale-[0.6]",
//                 content: "drop-shadow shadow-black text-white",
//               }}
//               variant="shadow"
//             >
//               Coding
//             </Chip>
//           </Link>
//           </nav>
//           {tokens ? (
//             ""
//           ) : (
//             <div className="min-[400px]:hidden flex flex-col items-center space-y-2 mt-4 w-full max-w-[200px]">
//               <Button className="text-primary border-none font-semibold text-[16px] rounded-full sm:px-[26px] py-2 px-4 w-full">
//                 <Link href="/login">Login</Link>
//               </Button>
//               <Button className="bg-primary text-white border-none font-semibold text-[16px] rounded-full sm:px-[26px] py-2 px-4 w-full">
//                 <Link href="/register">Register</Link>
//               </Button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };


"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../public/image/Zentrio-Logo.png";
import { Chip } from "@heroui/react";

export const NavbarLanding = ({ tokens }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close drawer when clicking outside or on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Helper function to check if route is active
  const isActiveRoute = (route) => {
    return pathname === route;
  };

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  console.log("tokens", tokens);
  
  return (
    <>
      <div className="w-[] md:w-full h-[70px] bg-white shadow-sm rounded-full mx-auto mt-[30px] px-4 sm:px-6 relative">
        <div className="flex justify-between items-center h-full">
          <Link href="/">
            <Image
              src={logo}
              alt="Zentrio Logo"
              className="w-[50px] sm:w-[60px] md:w-[144px]"
            />
          </Link>

          {/* Desktop Navigation (hidden on mobile) */}
          <nav className="hidden md:flex justify-between items-center w-[580px] font-medium text-body-lg">
            <Link
              href="/"
              className={`hover:text-primary transition-all ${
                isActiveRoute("/") ? "text-primary font-semibold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/aboutus"
              className={`hover:text-primary transition-all ${
                isActiveRoute("/aboutus") ? "text-primary font-semibold" : ""
              }`}
            >
              About us
            </Link>
            <Link
              href="/contact"
              className={`hover:text-primary transition-all ${
                isActiveRoute("/contact") ? "text-primary font-semibold" : ""
              }`}
            >
              Contact
            </Link>
            <Link
              href="/draw"
              className={`hover:text-primary transition-all relative ${
                isActiveRoute("/draw") ? "text-primary font-semibold" : ""
              }`}
            >
              Draw
              <Chip
                classNames={{
                  base: "left-[72.5%] top-[40%] bg-gradient-to-br from-primary to-primary/5 border-small border-white/50 shadow-pink-500/30 absolute scale-[0.6]",
                  content: "drop-shadow shadow-black text-white",
                }}
                variant="shadow"
              >
                So Fun
              </Chip>
            </Link>
            <Link
              href="/compiler"
              className={`relative hover:text-primary transition-all ${isActiveRoute("/compiler") ? "text-primary font-semibold" : ""
                }`}
            >
              Playground
              <Chip
                classNames={{
                  base: "left-[90.0%] top-[40%] bg-gradient-to-br from-primary to-primary/5 border-small border-white/50 shadow-pink-500/30 absolute scale-[0.6]",
                  content: "drop-shadow shadow-black text-white",
                }}
                variant="shadow"
              >
                Coding
              </Chip>
            </Link>
          </nav>
          
          {/* Desktop Login/Register Buttons */}
          {tokens ? (
            ""
          ) : (
            <div className="hidden min-[400px]:flex gap-2 sm:gap-[10px] ">
              <Button className="bg-transparent text-primary border-none font-semibold rounded-full text-[16px] sm:px-[26px] py-2 px-4">
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-primary text-white border-none font-semibold text-[16px] rounded-full sm:px-[26px] py-2 px-4">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button (visible only on mobile) */}
          <button
            className="md:hidden text-primary border-none z-50 relative"
            onClick={toggleMenu}
          >
            <svg
              className="w-7 h-7 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Drawer (slides in from right) */}
      <div className={`
        fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl z-50 
        transform transition-transform duration-300 ease-in-out md:hidden
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <Image
            src={logo}
            alt="Zentrio Logo"
            className="w-[120px]"
          />
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex flex-col p-6">
          <nav className="flex flex-col space-y-6 mb-8">
            <Link
              href="/"
              onClick={handleLinkClick}
              className={`text-lg font-medium hover:text-primary transition-all py-2 ${
                isActiveRoute("/") ? "text-primary font-semibold" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/aboutus"
              onClick={handleLinkClick}
              className={`text-lg font-medium hover:text-primary transition-all py-2 ${
                isActiveRoute("/aboutus") ? "text-primary font-semibold" : "text-gray-700"
              }`}
            >
              About us
            </Link>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className={`text-lg font-medium hover:text-primary transition-all py-2 ${
                isActiveRoute("/contact") ? "text-primary font-semibold" : "text-gray-700"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/draw"
              onClick={handleLinkClick}
              className={`text-lg font-medium hover:text-primary transition-all py-2 relative ${
                isActiveRoute("/draw") ? "text-primary font-semibold" : "text-gray-700"
              }`}
            >
              Draw
              <Chip
                classNames={{
                  base: "ml-2 bg-gradient-to-br from-primary to-primary/5 border-small border-white/50 shadow-pink-500/30 scale-[0.7]",
                  content: "drop-shadow shadow-black text-white text-xs",
                }}
                variant="shadow"
              >
                So Fun
              </Chip>
            </Link>
            <Link
              href="/compiler"
              onClick={handleLinkClick}
              className={`text-lg font-medium hover:text-primary transition-all py-2 relative ${
                isActiveRoute("/compiler") ? "text-primary font-semibold" : "text-gray-700"
              }`}
            >
              Playground
              <Chip
                classNames={{
                  base: "ml-2 bg-gradient-to-br from-primary to-primary/5 border-small border-white/50 shadow-pink-500/30 scale-[0.7]",
                  content: "drop-shadow shadow-black text-white text-xs",
                }}
                variant="shadow"
              >
                Coding
              </Chip>
            </Link>
          </nav>

          {/* Mobile Login/Register Buttons */}
          {!tokens && (
            <div className="flex flex-col space-y-3 border-t pt-6">
              <Button 
                className="bg-transparent text-primary border-2 border-primary font-semibold text-[16px] rounded-full py-3 w-full hover:bg-primary/10 transition-colors"
                onClick={handleLinkClick}
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button 
                className="bg-primary text-white border-none font-semibold text-[16px] rounded-full py-3 w-full hover:bg-primary/90 transition-colors"
                onClick={handleLinkClick}
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};