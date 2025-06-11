import { Card, CardContent } from "../ui/card"
import { UsersRound } from "lucide-react"


export default function CardAllMembers({boardMember}) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <UsersRound className="w-5 h-5 text-title" />
              <h2 className="text-lg font-semibold text-title">All Members</h2>
              <span className="text-primary text-xs font-medium px-2.5 py-0.5 rounded-full">
                {boardMember.length}
              </span>
            </div>
          </div>

          {/* Members List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {boardMember.map((member) => (
              <div
                key={member.userId}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={member.profileImage}
                        alt={member.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Status indicator */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-title">{member.username}</h3>
                    <p className="text-sm text-description">{member.roles}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
};
