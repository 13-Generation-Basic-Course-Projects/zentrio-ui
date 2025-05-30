import React from 'react'
import { Card, CardHeader, CardBody, Button } from "@heroui/react"

export default function CardMember({data}) {
  const members = [
    { name: "Alice Chan", role: "Project Manager" },
    { name: "Bob Sok", role: "Team Leader" },
    { name: "Dara Neang", role: "Frontend Developer" },
    { name: "Lina Chum", role: "Backend Developer" },
    { name: "Sokchea Heng", role: "UI/UX Designer" },
    { name: "Malis Sun", role: "QA Engineer" },
    { name: "Rithy Sim", role: "DevOps Engineer" }
  ];

  return (
    <div>
      <Card className="w-full mx-auto shadow-sm h-[400px]">
        <CardHeader className="flex justify-between items-center px-6 py-4 pb-2">
          <h2 className="text-lg font-semibold text-title">Member</h2>
          <Button variant="light" size="md" className="text-body p-0 h-auto min-w-0">
            see all
          </Button>
        </CardHeader>

        <CardBody className="px-6 py-4 overflow-y-auto max-h-[300px] scrollbar-hidden">
          {members.length === 0  || data == "null" ? (
            <div className="text-center">
              <p className="text-slate-500 text-sm">empty members</p>
            </div>
          ) : (
            <div className="w-full space-y-3">
              {members.map((member, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-large hover:bg-gray-50">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {member.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
