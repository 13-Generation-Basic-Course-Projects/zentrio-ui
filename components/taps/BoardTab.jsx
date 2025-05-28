"use client";

import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import KanbanBoard from "../testcomponent/Kanban";
import GanttChart from "../testcomponent/Calender";
const tabItems = [
  {
    key: "music",
    title: "Music",
    content: <GanttChart />,
  },
  // {
  //   key: "photos",
  //   title: "Photos",
  //   content: <KanbanBoard />,
  // },
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
