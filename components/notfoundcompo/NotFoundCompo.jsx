// NotFound.jsx
import React from "react";
import errorpic from "@/assets/error.png";
import Image from "next/image";
export const NotFoundVOne = () => {
  return <></>;
};

import {
  Home,
  FileText,
  BarChart3,
  Calendar,
  Kanban,
  Bell,
  Users,
  ArrowLeft,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Footer from "../layout/Footer";

export default function NotFoundTwo() {
  const features = [
    {
      icon: <Kanban className="h-7 w-7" />,
      title: "Board",
      description: "Kanban-style task boards for visual project management",
      href: "/board",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: "Reports",
      description: "Comprehensive analytics and progress tracking",
      href: "/reports",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: <Calendar className="h-7 w-7" />,
      title: "Gantt Chart",
      description: "Timeline view for project scheduling and dependencies",
      href: "/gantt",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      icon: <FileText className="h-7 w-7" />,
      title: "Documents",
      description: "Centralized document management and collaboration",
      href: "/documents",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
    },
    {
      icon: <Bell className="h-7 w-7" />,
      title: "Announcements",
      description: "Team communications and important updates",
      href: "/announcements",
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-50 to-purple-50",
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Management",
      description: "Manage team members, roles, and permissions",
      href: "/team",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
    },
  ];

  return (
    <div className="  overflow-y-auto scrollbar-hidden pb-[0px] ">
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl w-full text-center">
          {/* 404 Header with Illustration */}
          <div className="mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200 mb-8">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-purple-700 font-medium">
                Oops! Not found
              </span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-12">
              <Zap className="h-6 w-6 text-amber-500" />
              <h3 className="text-3xl font-bold text-slate-800">
                Thank you for using our features
              </h3>
              <Zap className="h-6 w-6 text-amber-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-white hover:bg-slate-50 transition-all duration-500 hover:scale-105 border-none"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                  ></div>

                  <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={`relative p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                      >
                        <div className="text-white">{feature.icon}</div>
                        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                          {feature.title}
                        </h4>
                        {/* <p className="hidden text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                            {feature.description}
                          </p> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
