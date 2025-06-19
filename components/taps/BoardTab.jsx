"use client";

import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import KanbanBoard from "../kanban/Kanban";
import GanttChart from "../Gantt/GanttChart";
const tabItems = [
  {
    key: "photos",
    title: "Photos",
    content: <KanbanBoard />,
  },
  {
    key: "music",
    title: "Music",
    content: <GanttChart />,
  },
];

export default function Tapp() {
  return (
    <div className="flex w-full flex-col">
      <Tabs items={tabItems} aria-label="Options" variant="underlined">
        {(item) => (
          <Tab key={item.key} title={item.title}>
            {item.content}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
