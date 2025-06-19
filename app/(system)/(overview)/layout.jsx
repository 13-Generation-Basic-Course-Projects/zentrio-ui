import "../../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { auth } from "@/auth";

import NavbarWrapper from "@/components/layout/NavbarWrapper";

import SidebarRenderer from "@/components/sidebar/SidebarRenderer";
import CardWelcomeComponent from "@/components/card/CardWelcome";
import SmallCalendar from "@/components/testcomponent/SmallCalendar";
import { loginThirdPartyService } from "@/service/auth.service";
export const metadata = {
  title: "Zentrio | Task Mangement",
  description: "Welcome to Zentrio Cambodia",
};

//sss

export default async function OverviewLayout({ children }) {
  // const session = await auth();
  // if (session?.accessToken) {
  //   const res = await loginThirdPartyService({
  //     accessToken: session.accessToken,
  //   });
  //   console.log("Backend response in /test:", res);
  // }

  return (
    <div className="h-screen flex flex-col overflow-y-hidden ">
      <div className="flex-1 pt-0 flex flex-col overflow-hidden  px-2  ">
        {/* Top section - fixed height */}
        <div className="grid grid-cols-12  gap-2   flex-shrink-0 ">
          <div className="col-span-9 flex flex-col pt-4 overflow-hidden ">
            <CardWelcomeComponent />
          </div>
          <div className="col-span-3   mt-10">
            <SmallCalendar />
          </div>
        </div>
        {/* Children section - takes remaining height */}
        <div className=" overflow-hidden flex-1 min-h-0  ">{children}</div>
      </div>
    </div>
  );
}
