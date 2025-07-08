"use client";
import React, { useState } from "react";
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

  // Helper function to check if route is active
  const isActiveRoute = (route) => {
    return pathname === route;
  };
  console.log("tokens", tokens);
  
  return (
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
        {tokens ? (
          ""
        ) : (
          <div className="hidden min-[400px]:flex gap-2 sm:gap-[10px] ">
            <Button className=" bg-transparent text-primary border-none font-semibold rounded-full text-[16px] sm:px-[26px] py-2 px-4">
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-primary text-white border-none font-semibold text-[16px] rounded-full sm:px-[26px] py-2 px-4">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu Button (visible only on mobile) */}
        <button
          className="md:hidden text-primary border-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-7 h-7"
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

      {/* Mobile Menu (shown when toggled) */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 mt-2 z-50 rounded-b-xl">
          <nav className="flex flex-col items-center space-y-4 w-full">
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
          {tokens ? (
            ""
          ) : (
            <div className="min-[400px]:hidden flex flex-col items-center space-y-2 mt-4 w-full max-w-[200px]">
              <Button className="text-primary border-none font-semibold text-[16px] rounded-full sm:px-[26px] py-2 px-4 w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-primary text-white border-none font-semibold text-[16px] rounded-full sm:px-[26px] py-2 px-4 w-full">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};