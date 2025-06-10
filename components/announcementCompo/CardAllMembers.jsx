import { Card, CardContent } from "../ui/card"
import { UsersRound } from "lucide-react"

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
    {
      id: 7,
      name: "Davit",
      role: "Member",
      avatar: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
      status: "online",
    },
    {
      id: 8,
      name: "Davit",
      role: "Member",
      avatar: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
      status: "online",
    },
    {
      id: 9,
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
              <UsersRound className="w-5 h-5 text-title" />
              <h2 className="text-lg font-semibold text-title">All Members</h2>
              <span className="text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                {members.length}
              </span>
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={member.avatar}
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
                    <h3 className="font-semibold text-title">{member.name}</h3>
                    <p className="text-sm text-description">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      member.status === "online"
                        ? "bg-green-100 text-title"
                        : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
};
