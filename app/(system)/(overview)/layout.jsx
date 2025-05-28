import "../../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { auth } from "@/auth";

import NavbarWrapper from "@/components/layout/NavbarWrapper";

import SidebarRenderer from "@/components/sidebar/SidebarRenderer";
import CardWelcomeComponent from "@/components/card/CardWelcome";
import SmallCalendar from "@/components/testcomponent/SmallCalendar";
export const metadata = {
  title: "Zentrio | Task Mangement",
  description: "Welcome to Zentrio Cambodia",
};

//this layout is use for everything of workspace, and dashbaord .......

export default async function OverviewLayout({ children }) {
  const session = await auth();
  console.log("aaa", session?.user);
  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      <div className="flex-1 pt-0 flex flex-col overflow-hidden h-[100%] ">
        {/* Top section - fixed height */}
        <div className="grid grid-cols-12    flex-shrink-0 ">
          <div className="col-span-9 flex flex-col p-2 pt-5">
            <CardWelcomeComponent />
          </div>
          <div className="col-span-3  h-[250px] pt-5 ">
            <SmallCalendar />
          </div>
        </div>

        {/* Children section - takes remaining height */}
        <div className="overflow-hidden flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );
}
