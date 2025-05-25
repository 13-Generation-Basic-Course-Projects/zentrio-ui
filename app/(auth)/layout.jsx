import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarTest } from "@/components/sidebar/Sidebar";

import { auth } from "../../auth";
import { UserAvatar } from "@/components/testcomponent/Avatar";
import NavbarAutherized from "@/components/layout/NavbarAutherized";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zentrio | Authentication",
  description: "Please fill up the credentail",
};

//this layout is use for auth

export default async function AuthLayout({ children }) {
  const session = await auth();
  console.log("aaa", session?.user);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-poppin`}
      >
        {children}
      </body>
    </html>
  );
}
