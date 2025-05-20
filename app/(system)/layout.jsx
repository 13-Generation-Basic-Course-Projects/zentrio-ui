import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarTest } from "@/components/sidebar/SideBar";

import { auth } from "../../auth";
import { UserAvatar } from "@/components/testcomponent/Avatar";
import NavbarAutherized from "@/components/layout/NavbarAutherized";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zentrio | Welcome",
  description: "Welcome to Zentrio",
};

//this layout is use for dashbaord

export default async function SystemLayout({ children }) {
  const session = await auth();
  console.log("aaa", session?.user);
  return (
    <SidebarProvider>
      <SidebarTest />
      <html lang="en">
        <body className={`font-poppin`}>
          <SidebarTrigger className="sticky top-0" />

          <div className="w-full ">
            <NavbarAutherized />
            {children}
          </div>
        </body>
      </html>
    </SidebarProvider>
  );
}
