import {
  Calendar,
  FileText,
  BarChart3,
  Workflow,
  Plus,
  ArrowRight,
} from "lucide-react";

import Image from "next/image";
import image from "@/assets/C19_3.png";
import icon from "@/assets/image1010.png";

import CardMember from "../card/CardMember";
import Bar from "../bredcrum/Bar";

export default function MyworkspaceEmpty() {
  const features = [
    {
      icon: BarChart3,
      title: "Gantt Chart",
      description: "Timeline view",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: Calendar,
      title: "Calendar",
      description: "Schedule view",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      icon: FileText,
      title: "Documents",
      description: "File management",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: Workflow,
      title: "4 Stages",
      description: "Workflow process",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <div className="w-full grid grid-cols-12 h-full">
      {/* board - this one scrolls */}
      <div className="col-span-9 flex flex-col overflow-hidden p-3 min-h-0">
        {/* Feature Showcase Section - Right under Bar */}
        <div className="relative z-10 h-full flex items-center">
          <div className="grid grid-cols-2 gap-2 w-full items-center">
            {/* Left Side - Woman Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={image}
                  alt="Professional woman in blue outfit"
                  className="w-50 h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-h5 font-bold text-gray-900 leading-tight">
                  Getting <span className="text-purple-500">start</span> of your
                  tasks
                  <br />
                  with <span className="text-blue-500">Zentrio</span>.
                </h1>
              </div>

              <div>
                <p className="text-gray-600 leading-relaxed text-h6 max-w-md">
                  Zentrio is your all-in-one task management platform designed
                  to streamline your workflow, boost productivity, and help you
                  stay focused on what matters most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* event - no scroll */}
      <div className="col-span-3 p-2">
        <CardMember data={"null"} />
        <Image src={icon} alt="image icon" className="w-25" />
      </div>
    </div>
  );
}
