import { Card, CardContent } from "../ui/card"
import { EllipsisVertical, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CardAllMembers() {
  const members = [
    {
      id: 1,
      name: "Pu Kdet",
      role: "Project Manager",
      avatar: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
      status: "online",
    },
    {
      id: 2,
      name: "Mony Visa",
      role: "Team Lead",
      avatar: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
      status: "online",
    },
    {
      id: 3,
      name: "Ny Fong",
      role: "Member",
      avatar: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
      status: "offline",
    },
    {
      id: 4,
      name: "Chann Theara",
      role: "Member",
      avatar: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
      status: "online",
    },
    {
      id: 5,
      name: "Chhiminh",
      role: "Member",
      avatar: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
      status: "offline",
    },
    {
      id: 6,
      name: "Davit",
      role: "Member",
      avatar: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
      status: "online",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "offline":
        return "bg-gray-400"
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-3 p-4">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">All Members</h2>
              <span className="bg-blue-100 text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                {members.length}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
              <EllipsisVertical className="w-5 h-5" />
            </Button>
          </div>

          {/* Members List */}
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Status indicator */}
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                    ></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      member.status === "online"
                        ? "bg-green-100 text-green-800"
                        : member.status === "away"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {member.status}
                  </span>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-1">
                    <EllipsisVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{members.filter((m) => m.status === "online").length} members online</span>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                View All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
