"use client";
import { getAllGanttBarByGanttChartIDAction } from "@/action/board.action";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useState, useEffect } from "react";

export default function DrawerGanttBarFetch({ ganttChartId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ganttBars, setGanttBars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 console.log("ganttChartId", ganttChartId);
  // Fetch Gantt bars when the drawer is opened
  useEffect(() => {
    if (isOpen) {
      const fetchGanttBars = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await getAllGanttBarByGanttChartIDAction({ganttChartId});
          if (response.success) {
            setGanttBars(response.payload);
          } else {
            setError(response.message || "Failed to fetch Gantt bars");
          }
        } catch (err) {
          setError("An error occurred while fetching Gantt bars");
        } finally {
          setLoading(false);
        }
      };
      fetchGanttBars();
    }
  }, [isOpen, ganttChartId]);



  // delete sepacic ganntbar
  return (
    <>
      <Button
        onPress={onOpen}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[50px]"
      >
        My Gantt Bars
      </Button>
      <Drawer
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Gantt Bars
              </DrawerHeader>
              <DrawerBody>
                {loading && <p>Loading Gantt bars...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && ganttBars.length === 0 && (
                  <p>No Gantt bars found.</p>
                )}
                {!loading && !error && ganttBars.length > 0 && (
                  <ul className="space-y-4">
                    {ganttBars.map((bar) => (
                      <li
                        key={bar.ganttBarId}
                        className="p-4 border rounded-lg shadow-sm"
                      >
                        <h3 className="font-semibold">{bar.title}</h3>
                        <p>
                          <strong>Phase:</strong> {bar.face}
                        </p>
                        <p>
                          <strong>Start:</strong>{" "}
                          {new Date(bar.startedAt).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>End:</strong>{" "}
                          {new Date(bar.finishedAt).toLocaleDateString()}
                        </p>
                        {bar.teamLeader.length > 0 ? (
                          <p>
                            <strong>Team Leaders:</strong>{" "}
                            {bar.teamLeader
                              .map((leader) => leader.username)
                              .join(", ")}
                          </p>
                        ) : (
                          <p>No team leaders assigned.</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}