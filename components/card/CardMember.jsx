import React from 'react'
import { Card, CardHeader, CardBody, Button } from "@heroui/react"

export default function CardMember({members = []}) {
  return (
    <div>
      <Card className="w-full max-w-md mx-auto h-80">
      <CardHeader className="flex justify-between items-center px-6 py-4 pb-2">
        <h2 className="text-lg font-semibold text-title">Member</h2>
        <Button variant="light" size="md" className="text-body p-0 h-auto min-w-0">
          see all
        </Button>
      </CardHeader>

      <CardBody className="px-6 py-8 flex items-center justify-center min-h-[200px]">
        {members.length === 0 ? (
          <div className="text-center">
            <p className="text-slate-500 text-sm">empty members</p>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {members.map((member, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{member.name?.charAt(0).toUpperCase()}</span>
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
