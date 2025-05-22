import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarTest } from "@/components/sidebar/SideBar";
import Logout from "../(auth)/_components/Logout";
import { auth } from "@/auth";
import { UserAvatar } from "@/components/testcomponent/Avatar";
import NavbarAutherized from "@/components/layout/NavbarAutherized";
import { NavbarLanding } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Zentrio | Landing",
  description: "Landing Page",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  console.log("aaa", session?.user);
  return (
    <body className={" font-poppin "}>
      <div className="mx-[20px] md:mx-[50px]">
        <NavbarLanding />
        <div className="hidden fixed top-[50px] right-0 z-50 p-4">
          {session?.user ? (
            <div className="flex gap-2 ">
              <Logout />
              <UserAvatar data={session?.user} />
            </div>
          ) : (
            ""
          )}
        </div>
        {children}
      </div>
      <Footer />
    </body>
  );
}
