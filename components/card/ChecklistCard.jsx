import React from 'react'
import { Card, CardHeader, CardBody } from "@heroui/react"

export default function ChecklistCard({checklists = []}) {

    const defaultChecklists = [
    { title: "design bank system", category: "Ux/Ui task" },
    { title: "Auth with html", category: "Backend Impl task" },
    { title: "normalize erd 2vers", category: "ERD task" },
    { title: "define 10 frames", category: "Framee task" },
    { title: "design landing", category: "Landing task" },
    ]

    const items = checklists.length > 0 ? checklists : defaultChecklists

  return (
    <Card className="w-full max-w-md mx-auto h-[400px]">
      <CardHeader className="flex justify-between items-center px-6 py-4 pb-2">
    <h2 className="text-lg font-semibold text-title">My Checklists</h2>
      </CardHeader>
      <CardBody className="px-6 py-4 overflow-y-auto flex-1">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm">empty checklists</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((checklist, index) => (
              <div key={index} className="flex items-center gap-4 py-2">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-title">{checklist.title}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{checklist.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  )
}
