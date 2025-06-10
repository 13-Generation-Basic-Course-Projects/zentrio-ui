import { Heart, Bookmark, Bell, MoreHorizontal, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function StudentPostCard() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="w-full bg-white shadow-sm border border-gray-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Morng Many"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">koko mama</h3>
                <p className="text-sm text-gray-500">10/06/2025 07:59</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* Post Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Heloo Everyone</h2>

          {/* Post Content */}
          <div className="text-gray-700 mb-6 leading-relaxed">
            <p>
              Please Do Homework
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 p-0">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 p-0">
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmark
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 p-0">
                <Bell className="w-4 h-4 mr-2" />
                Reminder
              </Button>
            </div>
            <span className="text-sm text-gray-500">Read 11</span>
          </div>

          {/* Comment Section */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Current user"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative">
                <Input
                  placeholder="Press Shift + Enter to add a new line and Enter to post"
                  className="pr-10 border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
