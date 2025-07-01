
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  DateRangePicker,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { deleteGanttBarsByGanttChartIdAction,updateGantBarBytGantChartIdAction} from "@/action/gantt.action";
import {
  Calendar,
  Users,
  Clock,
  Trash2,
  BarChart3,
  Edit,
} from "lucide-react";
import { parseDate, today } from "@internationalized/date";

export default function DrawerGanttBarFetch({ ganttChartId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [ganttBars, setGanttBars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingBar, setEditingBar] = useState(null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: "",
      dateRange: { start: null, end: null },
      face: "",
    },
  });

  // Fetch Gantt bars when the drawer is opened
  useEffect(() => {
    if (isOpen) {
      const fetchGanttBars = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await getAllGanttBarByGanttChartIDAction({
            ganttChartId,
          });
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

  // Delete Gantt bar handler
  const handleDelete = async (ganttBarId) => {
    try {
      setDeletingId(ganttBarId);
      const response = await deleteGanttBarsByGanttChartIdAction({
        ganttChartId,
        ganttBarId,
      });
      if (response.success) {
        setGanttBars(ganttBars.filter((bar) => bar.ganttBarId !== ganttBarId));
      } else {
        setError(response.message || "Failed to delete Gantt bar");
      }
    } catch (err) {
      setError("An error occurred while deleting the Gantt bar");
    } finally {
      setDeletingId(null);
    }
  };

  // Edit Gantt bar handler
  const handleEditOpen = (bar) => {
    setEditingBar(bar);
    reset({
      title: bar.title,
      dateRange: {
        start: parseDate(bar.startedAt.split("T")[0]),
        end: parseDate(bar.finishedAt.split("T")[0]),
      },
      face: bar.face,
    });
    onEditOpen();
  };

  const handleEditSubmit = async (data) => {
    try {
      // Convert dates to ISO 8601 format with time component
      const startedAt = `${data.dateRange.start.toString()}T00:00:00.000Z`;
      const finishedAt = `${data.dateRange.end.toString()}T00:00:00.000Z`;

      const response = await updateGantBarBytGantChartIdAction({
        ganttBarId: editingBar.ganttBarId,
        ganttChartId,
        title: data.title,
        startedAt,
        finishedAt,
        face: data.face,
      });
      if (response.success) {
        setGanttBars(
          ganttBars.map((bar) =>
            bar.ganttBarId === editingBar.ganttBarId
              ? {
                  ...bar,
                  title: data.title,
                  startedAt: new Date(startedAt),
                  finishedAt: new Date(finishedAt),
                  face: data.face,
                }
              : bar
          )
        );
        onEditClose();
      } else {
        setError(response.message || "Failed to update Gantt bar");
      }
    } catch (err) {
      setError("An error occurred while updating the Gantt bar");
    }
  };

  const isGanttBarNotStarted = (bar) => {
    const startDate = new Date(bar.startedAt);
    const currentDate = new Date();
    return startDate > currentDate;
  };

  const getPhaseColor = (phase) => {
    const colors = {
      PLANNING: "from-blue-500 to-purple-600",
      REQUIREMENT_ANALYSIS: "from-pink-500 to-rose-500",
      DESIGN: "from-green-500 to-emerald-600",
      IMPLEMENTATION: "from-orange-500 to-amber-500",
      TESTING_AND_REVIEW: "from-indigo-500 to-blue-600",
      DEPLOYMENT_AND_MAINTENANCE: "from-teal-500 to-cyan-600",
    };
    return colors[phase] || "from-gray-500 to-gray-600";
  };

  const getPhaseIcon = (phase) => {
    const icons = {
      PLANNING: "📋",
      REQUIREMENT_ANALYSIS: "📝",
      DESIGN: "🎨",
      IMPLEMENTATION: "💻",
      TESTING_AND_REVIEW: "🧪",
      DEPLOYMENT_AND_MAINTENANCE: "🚀",
    };
    return icons[phase] || "📊";
  };

  const calculateProgress = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const currentDate = new Date();

    if (currentDate < startDate) return 0;
    if (currentDate > endDate) return 100;

    const total = endDate - startDate;
    const elapsed = currentDate - startDate;
    return Math.round((elapsed / total) * 100);
  };

  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const phaseOptions = [
    "PLANNING",
    "REQUIREMENT_ANALYSIS",
    "DESIGN",
    "IMPLEMENTATION",
    "TESTING_AND_REVIEW",
    "DEPLOYMENT_AND_MAINTENANCE",
  ];

  return (
    <>
      <Button
        onPress={onOpen}
        className="group relative overflow-hidden flex items-center gap-3 px-6 py-3 text-sm font-semibold text-white bg-primary border-0 rounded-xl shadow-lg hover:bg-black h-12"
      >
        <BarChart3 className="w-5 h-5 relative z-10" />
        <span className="relative z-10">My Gantt Bars</span>
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
      </Button>

      <Drawer
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <DrawerContent className="bg-gradient-to-br from-slate-50 to-blue-50">
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-2 pb-6 border-b border-gray-200/50">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Project Gantt Bars
                  </h2>
                  <p className="text-sm text-gray-600">
                    Manage your project timeline and phases
                  </p>
                </div>
              </DrawerHeader>

              <DrawerBody className="p-6">
                {loading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600 font-medium">
                      Loading your Gantt bars...
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-sm">⚠️</span>
                      </div>
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {!loading && !error && ganttBars.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No Gantt Bars Found
                    </h3>
                    <p className="text-gray-500">
                      Create your first Gantt bar to get started with project
                      management.
                    </p>
                  </div>
                )}

                {!loading && !error && ganttBars.length > 0 && (
                  <div className="space-y-4">
                    {ganttBars.map((bar, index) => {
                      const isDeleting = deletingId === bar.ganttBarId;

                      return (
                        <div
                          key={bar.ganttBarId}
                          className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${
                            isDeleting
                              ? "opacity-50 scale-95"
                              : "hover:-translate-y-1"
                          }`}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${getPhaseColor(
                              bar.face
                            )} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                          ></div>

                          <div className="relative p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                      {bar.title}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                      <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-primary ${getPhaseColor(
                                          bar.face
                                        )} text-white shadow-sm`}
                                      >
                                        {bar.face}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                  <div className="bg-gray-50/60 rounded-lg p-4 border border-gray-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                      <Calendar className="w-4 h-4 text-blue-600" />
                                      <span className="font-semibold text-gray-800 text-sm">
                                        Timeline
                                      </span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          Start
                                        </span>
                                        <span className="font-medium text-gray-900">
                                          {new Date(
                                            bar.startedAt
                                          ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          })}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">
                                          End
                                        </span>
                                        <span className="font-medium text-gray-900">
                                          {new Date(
                                            bar.finishedAt
                                          ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                          })}
                                        </span>
                                      </div>
                                      <div className="flex justify-between pt-2 border-t border-gray-200">
                                        <span className="text-gray-600">
                                          Duration
                                        </span>
                                        <span className="font-medium text-blue-600">
                                          {Math.ceil(
                                            (new Date(bar.finishedAt) -
                                              new Date(bar.startedAt)) /
                                              (1000 * 60 * 60 * 24)
                                          )}{" "}
                                          days
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-gray-50/60 rounded-lg p-4 border border-gray-100/50">
                                    <div className="flex items-center gap-2 mb-3">
                                      <Users className="w-4 h-4 text-green-600" />
                                      <span className="font-semibold text-gray-800 text-sm">
                                        Team Leaders
                                      </span>
                                    </div>
                                    {bar.teamLeader.length > 0 ? (
                                      <div className="space-y-2">
                                        {bar.teamLeader.map((leader, idx) => (
                                          <div
                                            key={idx}
                                            className="flex items-center gap-2"
                                          >
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                              {leader.username
                                                .charAt(0)
                                                .toUpperCase()}
                                            </div>
                                            <span className="text-gray-800 text-sm font-medium">
                                              {leader.username}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2 text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-xs">
                                          No leaders assigned
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="ml-4 flex gap-2">
                                <Button
                                  color="primary"
                                  variant="light"
                                  onPress={() => handleEditOpen(bar)}
                                  className="group relative min-w-12 h-12 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all duration-300"
                                >
                                  <Edit className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                </Button>
                                <Button
                                  color="danger"
                                  variant="light"
                                  onPress={() => handleDelete(bar.ganttBarId)}
                                  disabled={isDeleting}
                                  className="group relative min-w-12 h-12 rounded-xl border-2 border-transparent hover:border-red-200 transition-all duration-300"
                                >
                                  {isDeleting ? (
                                    <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                                  ) : (
                                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </DrawerBody>

              <DrawerFooter className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="rounded-xl"
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="bg-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Done
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
        <ModalContent>
          <ModalHeader>Edit Gantt Bar</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(handleEditSubmit)}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <Input
                    // label="Title"
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                    className="mb-4"
                    classNames={{
                      inputWrapper: `
                        bg-white 
                        border
                        border-gray-300
                        shadow-none
                        rounded-small
                        px-3
                        py-6
                        ${errors.title ? "border-red-500" : ""}
                      `,
                      input: "text-black",
                      label: "text-label font-medium",
                    }}
                  />
                )}
              />
              <Controller
                name="dateRange"
                control={control}
                rules={{
                  required: "Deadline is required",
                  validate: {
                    validRange: (value) =>
                      value.start && value.end && value.start <= value.end
                        ? true
                        : "End date must be after or equal to start date",
                  },
                }}
                render={({ field }) => (
                  <DateRangePicker
                    className="max-w-none"
                    minValue={today("Asia/Bangkok")}
                    value={
                      field.value.start && field.value.end
                        ? {
                            start: parseDate(field.value.start.toString()),
                            end: parseDate(field.value.end.toString()),
                          }
                        : null
                    }
                    onChange={(value) =>
                      field.onChange({
                        start: value.start,
                        end: value.end,
                      })
                    }
                    label="Deadline"
                    isInvalid={!!errors.dateRange}
                    errorMessage={
                      errors.dateRange?.start?.message ||
                      errors.dateRange?.end?.message ||
                      errors.dateRange?.message
                    }
                    classNames={{
                      inputWrapper: `
                        bg-white 
                        border
                        border-gray-300
                        shadow-none
                        rounded-small
                        px-3
                        py-6
                        ${errors.dateRange ? "border-red-500" : ""}
                      `,
                      input: "text-black",
                      label: "text-label font-medium",
                    }}
                  />
                )}
              />
              <Controller
                name="face"
                control={control}
                rules={{ required: "Phase is required" }}
                render={({ field }) => (
                  <Select
                    label="Phase"
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!errors.face}
                    errorMessage={errors.face?.message}
                    classNames={{
                      trigger: `
                        bg-white 
                        border
                        border-gray-300
                        shadow-none
                        rounded-small
                        mt-5
                        px-3
                        py-6
                        ${errors.face ? "border-red-500" : ""}
                      `,
                      value: "text-black",
                      label: "text-label font-medium",
                    }}
                  >
                    {phaseOptions.map((phase) => (
                      <SelectItem key={phase} value={phase}>
                        {phase}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onEditClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmit(handleEditSubmit)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
