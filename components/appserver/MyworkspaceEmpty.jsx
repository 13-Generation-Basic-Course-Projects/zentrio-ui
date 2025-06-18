import {
  Calendar,
  FileText,
  BarChart3,
  Workflow,
  Plus,
  ArrowRight,
} from "lucide-react";

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
        <div className="relative bg-gradient-to-r from-blue-50 via-purple-50 to-emerald-50 rounded-2xl p-6 mb-4 overflow-hidden h-[400px]">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 w-12 h-12 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute top-8 right-12 w-8 h-8 bg-purple-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-6 left-16 w-6 h-6 bg-emerald-400 rounded-full animate-ping delay-500"></div>
            <div className="absolute bottom-4 right-20 w-10 h-10 bg-orange-400 rounded-full animate-bounce delay-700"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Powerful Project Management Tools
              </h3>
              <p className="text-sm text-gray-600">
                Everything you need to manage your projects efficiently
              </p>
            </div>

            {/* Feature Cards - Horizontal Layout */}
            <div className="grid grid-cols-4 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className={`group relative ${feature.bgColor} ${feature.borderColor} border rounded-xl p-4 hover:shadow-lg transition-all duration-500 cursor-pointer hover:scale-110 hover:-translate-y-2`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: `slideInUp 0.6s ease-out forwards ${
                        index * 150
                      }ms`,
                    }}
                  >
                    {/* Hover Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10 text-center">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {feature.description}
                      </p>
                    </div>

                    {/* Sparkle Effect on Hover */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* event - no scroll */}
      <div className="col-span-3 p-2">
        <CardMember data={"null"} />
      </div>
    </div>
  );
}
