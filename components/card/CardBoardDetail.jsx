import React from "react";
import { Users, Star } from "lucide-react";
import { StackedProfiles } from "../icon/everyicon";

export default function CardBoardDetail({title, description, image, images, memberData}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>

      <div className="relative flex flex-row h-64">
        <div className="relative overflow-hidden w-80 flex-shrink-0">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Board preview"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Floating badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  Creative Project Board
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">Board description</p>
            </div>

            {/* Members section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold">Team Members</h3>
              </div>

              <div className="flex items-center gap-3">
                <StackedProfiles />
              </div>
              <div className="text-sm text-gray-500 font-medium">
                9 active members
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
