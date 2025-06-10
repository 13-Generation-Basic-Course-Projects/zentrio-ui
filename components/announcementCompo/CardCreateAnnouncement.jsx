"use client"

import { useState } from 'react'
import { Card } from "@heroui/card"
import { CardContent } from "../ui/card"
import { LetterText, Images, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import CardCreateModal from "./CardCreateModal"

export default function CardCreateAnnouncement() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="w-full bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          {/* Profile and Input Section */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
              <img src="https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div 
                    className="bg-gray-100 rounded-full px-4 py-3 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={toggleModal}
              >
                <span className="text-gray-600">{"Create your Announcement"}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-around pt-3 border-t border-gray-200">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg flex-1 justify-center"
              onClick={toggleModal}
            >
              <LetterText className="w-5 h-5 text-primary" />
              <span className="text-gray-700 font-medium">Article</span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg flex-1 justify-center"
              onClick={toggleModal}
            >
              <Images className="w-5 h-5 text-primary" />
              <span className="text-gray-700 font-medium">Photo</span>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg flex-1 justify-center"
              onClick={toggleModal}
            >
              <Paperclip className="w-5 h-5 text-primary" />
              <span className="text-gray-700 font-medium">Attachments</span>
            </Button>
          </div>
          {isModalOpen && <CardCreateModal onClose={toggleModal} />}
        </CardContent>
      </Card>
    </div>
  )
};
