"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Card,
  CardBody,
  CardHeader,
  Chip,
} from "@heroui/react";
import {
  Crown,
  ShieldCheck,
  Users,
  Eye,
  LockKeyhole,
  BarChart2,
  KanbanSquare,
  CalendarCheck2,
  FileStack,
  Goal,
  Link2,
  BookOpen,
  ClipboardList,
  Lightbulb,
  Rocket,
  Zap,
  CheckCircle,
} from "lucide-react";
import React, { useState } from "react";
// import zentrio from "..././public/mylogo.svg";
// import zentrio from "../../public/mylogo.svg";

const userRoles = {
  projectManager: {
    title: "Project Manager",
    color: "danger",
    icon: <Crown className="w-7 h-7 text-primary" />,
    description:
      "Leads the entire workspace with full control over boards, roles, timelines, and team structure. Sets direction and ensures smooth project execution.",
    guide: "Full access and project oversight.",
  },
  teamLeader: {
    title: "Team Leader",
    color: "warning",
    icon: <ShieldCheck className="w-7 h-7 text-primary" />,
    description:
      "Manages day-to-day task flow within a project. Assigns tasks, tracks progress, and supports team coordination from planning to delivery.",
    guide: "Mid-level role to coordinate tasks, people, and progress.",
  },
  member: {
    title: "Member",
    color: "primary",
    icon: <Users className="w-7 h-7 text-primary" />,
    description:
      "Focuses on completing assigned tasks and collaborating across the project. Contributes directly to progress and team success.",
    guide: "Focused on task execution and communication.",
  },
  guest: {
    title: "Guest",
    color: "default",
    icon: <Eye className="w-7 h-7 text-primary" />,
    description:
      "View-only access to stay informed on project activity. Ideal for stakeholders who need visibility without editing rights.",
    guide: "Read-only access for external stakeholders.",
  },
};

const guideSteps = {
  projectManager: [
    {
      step: 1,
      title: "Invite Members to Board",
      description:
        "Learn how to add team members to your project board and assign them appropriate roles.",
      actions: [
        "Go to the board page and click (Invite)",
        "Enter email addresses",
        "Choose roles (Team Leader or Member)",
        "Add multiple members to pending list",
        "Click (Send All Invites) to notify team members",
      ],
      tips: " Important: No tasks can move forward until members are invited and roles are assigned.",
    },
    {
      step: 2,
      title: "Create Gantt Chart and Gantt Bars",
      description:
        "A Gantt chart is a visual project management tool that displays tasks, timelines, and dependencies in horizontal bar format, allowing you to see the entire project timeline at a glance and track progress against planned schedules.",
      actions: [
        "Click (Create) on board page > Enter Gantt chart title",
        "Click (Create) again to add Gantt bars (within project phases)",
        "Set durations by dragging timeline or entering dates",
        "Select each phase > Save",
      ],
      tips: "Gantt Chart must be created first before creating or assigning tasks.",
    },
    {
      step: 3,
      title: "Create High-Level Tasks",
      description:
        "Create high-level tasks that can be broken down further by Team Leaders into detailed checklists.",
      actions: [
        "Back  to (Board) page again > Click (Create)",
        "Add title, description, and assign to a Team Leader while creating or manual assign after created",
        "Set deadline, and select a Gantt bar > Save",
      ],
      tips: "The first created task will goes to “TO DO” stage",
    },
    {
      step: 4,
      title: "Review and Approve Completed Tasks",
      description:
        "Review and approve completed tasks while providing constructive feedback to maintain quality standards.",
      actions: [
        "Go to (Completed) tasks in Kanban view",
        "Open task and review checklists and documents",
        "Leave feedback by click on menu button",
      ],
      tips: "",
    },
    {
      step: 5,
      title: "Generate Reports",
      description:
        "Access comprehensive project analytics and generate detailed reports for stakeholders.",
      actions: [
        "Click (Reports) on sidebar from main menu ",
        "Choose to Preview first or Generate",
        "Generate as PDF/Excel/Docs by click on (Save As)",
      ],
      tips: "Set up weekly automated reports to keep stakeholders informed without manual effort",
    },
  ],
  teamLeader: [
    {
      step: 1,
      title: "Create Detailed Tasks",
      description:
        "After accepting assignment from Project Manager, break down project components into manageable tasks for your team members.",
      actions: [
        "Access assigned board > Click (Create)",
        "Enter title, description and set deadlines",
        "Select the existed Gantt bar > Save",
      ],
      tips: "The first created task will goes to “TO DO” stage",
    },
    {
      step: 2,
      title: "Create Checklists Inside Tasks",
      description:
        "Break down tasks into specific, actionable checklist items that can be assigned to individual team members.",
      actions: [
        "Open a task > Click (Add New Checklist)",
        "Enter title, description, set deadline",
        "Save",
      ],
      tips: "",
    },
    {
      step: 3,
      title: " Assign Members to Checklists",
      description:
        "Delegate specific checklist items to appropriate team members based on their skills and availability.",
      actions: [
        "Open checklist > Click (Assign Member) button",
        "Select members in the board > Notify the member",
      ],
      tips: "",
    },
    {
      step: 4,
      title: "Move Tasks Across Four-Stages",
      description:
        "Guide tasks through the workflow stages while ensuring all checklists are properly completed first.",
      actions: [
        "Zentrio uses a clear four-stage workflow: To Do → In Progress → Under Review → Completed.",
        "Tasks begin in the (To Do) stage once created.",
        "After tasks are assigned and accepted, the task will move to (In Progress) automatically.",
        "Once all checklists are marked as (Done), Team Leader can move  to (Under Review).",
        "After Team Leader finish reviewing, they can finalizes the task by moving it to (Completed). ",
      ],
      tips: " Important: Tasks cannot move to 'Under Review' if any checklist is still marked as 'In Progress'. All checklists must be 'Done' first.",
    },
  ],
  member: [
    {
      step: 1,
      title: "Work on Assigned Checklist Items",
      description:
        "After accepting assignment from Team Leader, focus on completing assigned checklist items efficiently and effectively.",
      actions: [
        "Access assigned checklist from dashboard",
        "Accept checklist",
        "Complete task, attach deliverables, upload any files",
        "Notify Team Leader by personal chat or communication ",
      ],
      tips: "Important: Members only interact with checklist items. They must accept it before starting work.",
    },
    {
      step: 2,
      title: "Use Comments to Communicate",
      description:
        "Maintain clear communication with Team Leaders and other members through checklist comments.",
      actions: [
        "Go to checklist > Click (Add Comment)",
        "Share updates, ask questions, or flag issues",
      ],
      tips: "",
    },
  ],
  guest: [
    {
      step: 1,
      title: " View Project Progress and Materials",
      description:
        "Access shared project information as an external stakeholder while maintaining project security through read-only permissions.",
      actions: [
        "Open shared board link",
        "Browse board stages, Gantt charts, and tasks",
        "Monitor timelines and overall progress with read-only access",
      ],
      tips: "Save shared links in your browser bookmarks for quick access to project updates and stay informed about project progress",
    },
  ],
};

const zentRioFeatures = [
  {
    title: "Role-Based Permissions",
    description:
      "Clear collaboration structure with defined user roles for optimal team coordination",
    icon: <LockKeyhole className="w-7 h-7 text-primary" />,
  },
  {
    title: "Gantt Chart",
    description:
      "Visual timeline management for project phases and milestone tracking",
    icon: <BarChart2 className="w-7 h-7 text-primary" />,
  },
  {
    title: "Four-Stage Task Tracking",
    description:
      "Structured workflow: To Do → In Progress → Under Review → Completed",
    icon: <KanbanSquare className="w-7 h-7 text-primary" />,
  },
  {
    title: "Personal Calendar",
    description:
      "Individual schedule management with task deadlines and daily notes",
    icon: <CalendarCheck2 className="w-7 h-7 text-primary" />,
  },
  {
    title: "Documentation Feature",
    description:
      "Seamless Google Drive integration with public and personal document management",
    icon: <FileStack className="w-7 h-7 text-primary" />,
  },
];

export default function ZenTrioGuide() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState("projectManager");
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] text-white shadow-lg hover:shadow-xl transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
        ZenTrio User Guide
      </Button>

      <Drawer
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="border-b bg-gradient-to-br from-[#0a8dbd] via-[#49bbda] to-[#7ed3f8] py-10 px-16 shadow-md">
                <div className=" mx-auto w-full space-y-8">
                  {/* Header Content */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left: Logo + Text */}
                    <div className="block text-center sm:text-left space-y-4">
                      <img
                        src="https://imgur.com/mLKuTUk.png"
                        alt="ZenTrio Logo"
                        className="h-14 sm:h-16 md:h-20 mx-auto sm:mx-0 object-contain rounded-xl shadow-md"
                      />

                      <div>
                        <h2 className="text-white text-3xl font-bold tracking-tight">
                          User Guide
                        </h2>
                        <p className="text-white/90 mt-1 text-base sm:text-lg max-w-md leading-snug">
                          Unlock powerful project management tools with guided,
                          role-specific walkthroughs.
                        </p>
                      </div>
                    </div>

                    {/* Right: Icon */}
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg ring-1 ring-white/30">
                      <Goal className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-white/30 overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-white/90 transition-all duration-500 rounded-full"
                        style={{
                          width: `${
                            ((activeStep + 1) /
                              guideSteps[selectedRole].length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-white/80 font-medium">
                      Step {activeStep + 1} of {guideSteps[selectedRole].length}
                    </span>
                  </div>
                </div>
              </DrawerHeader>

              <DrawerBody className="py-6 px-20">
                {/* Role Selection */}
                <div className="mb-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      Choose Your Role in ZenTrio
                    </h3>
                    <p className="text-default-500 max-w-2xl mx-auto">
                      Select your role to get personalized step-by-step guidance
                      tailored to your responsibilities
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                    {Object.entries(userRoles).map(([roleKey, role]) => (
                      <Card
                        key={roleKey}
                        isPressable
                        className={`cursor-pointer transition-all duration-300 h-full flex flex-col ${
                          selectedRole === roleKey
                            ? "ring-2 ring-primary bg-primary/10 scale-[1.02] shadow-lg"
                            : "hover:bg-default-50 hover:scale-[1.01] hover:shadow-md"
                        }`}
                        onPress={() => {
                          setSelectedRole(roleKey);
                          setActiveStep(0);
                        }}
                      >
                        <CardBody className="flex flex-col items-center p-6 flex-grow">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-4 shadow-inner">
                            <div className="text-3xl flex items-center justify-center text-primary">
                              {React.cloneElement(role.icon, {
                                className: "w-8 h-8",
                              })}
                            </div>
                          </div>
                          <div className="text-center flex-grow">
                            <div className="font-bold text-lg mb-2 text-gray-800">
                              {role.title}
                            </div>
                            <div className="text-sm text-default-500 leading-relaxed">
                              {role.description}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Guide Content */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="text-3xl">
                      {userRoles[selectedRole].icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-default-800">
                        {userRoles[selectedRole].title} Workflow Guide
                      </h3>
                      <p className="text-default-600 mt-1">
                        {userRoles[selectedRole].guide}
                      </p>
                    </div>
                    <Chip
                      color={userRoles[selectedRole].color}
                      variant="solid"
                      className="text-white font-semibold bg-primary"
                    >
                      {guideSteps[selectedRole].length} Steps
                    </Chip>
                  </div>

                  {/* Progress Stepper */}
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-4">
                      {guideSteps[selectedRole].map((stepData, index) => (
                        <div
                          key={index}
                          className="relative flex gap-6 group"
                          onClick={() => setActiveStep(index)}
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 flex-shrink-0 transition-all
              ${
                activeStep >= index
                  ? "bg-primary ring-4 ring-blue-100"
                  : "bg-gray-200"
              }`}
                            >
                              <span
                                className={`font-bold text-sm ${
                                  activeStep >= index
                                    ? "text-white"
                                    : "text-gray-600"
                                }`}
                              >
                                {stepData.step}
                              </span>
                            </div>
                            {index < guideSteps[selectedRole].length - 1 && (
                              <div
                                className={`h-12 w-0.5 transition-all ${
                                  activeStep > index
                                    ? "bg-primary"
                                    : "bg-gray-200"
                                }`}
                              ></div>
                            )}
                          </div>

                          <Card
                            className={`w-full shadow-sm transition-all cursor-pointer
            ${
              activeStep === index
                ? "border-primary border-2"
                : "hover:shadow-md hover:border-gray-300 border"
            }`}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-start gap-4 w-full">
                                <div className="flex-1">
                                  <h4
                                    className={`text-xl font-bold transition-all ${
                                      activeStep === index
                                        ? "text-primary"
                                        : "text-default-800"
                                    }`}
                                  >
                                    {stepData.title}
                                  </h4>
                                  <p className="text-default-600 mt-2 text-base">
                                    {stepData.description}
                                  </p>
                                </div>
                              </div>
                            </CardHeader>
                            {activeStep === index && (
                              <CardBody className="pt-4">
                                <div className="ml-2">
                                  <h5 className="font-semibold mb-4 text-default-700 text-lg flex items-center">
                                    <ClipboardList className="w-7 h-7 text-primary" />
                                    <span className="px-3">Action Steps:</span>
                                  </h5>
                                  <div className="space-y-3 mb-6">
                                    {stepData.actions.map(
                                      (action, actionIndex) => (
                                        <div
                                          key={actionIndex}
                                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                                        >
                                          <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                            {actionIndex + 1}
                                          </div>
                                          <span className="text-default-700 leading-relaxed">
                                            {action}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-5 rounded-r-lg">
                                    <div className="flex items-start gap-3">
                                      <div className="text-2xl">
                                        <Lightbulb className="w-7 h-7 text-amber-500" />
                                      </div>
                                      <div>
                                        <span className="font-bold text-amber-800 px-3">
                                          Pro Tip:
                                        </span>
                                        <span className="text-amber-700 leading-relaxed">
                                          {stepData.tips}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardBody>
                            )}
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ZenTrio Features Detail */}
                  <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-100/50 shadow-lg">
                    <CardBody className="p-8">
                      <div className="text-center mb-10">
                        <h4 className="text-3xl font-bold mb-2  bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] bg-clip-text text-transparent">
                          ZenTrio Features Overview
                        </h4>
                        <div className="w-16 h-1.5  bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] mx-auto rounded-full mb-4"></div>
                        <p className="text-default-500 max-w-2xl mx-auto">
                          Discover powerful tools designed to streamline your
                          project management workflow
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {zentRioFeatures.map((feature, index) => (
                          <div
                            key={index}
                            className="bg-white/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white"
                          >
                            <div className="flex flex-col items-center text-center">
                              <div
                                className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center 
                                ${
                                  index === 0
                                    ? "bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] text-white"
                                    : index === 1
                                    ? "bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] text-white"
                                    : index === 2
                                    ? "bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] text-white"
                                    : index === 3
                                    ? "bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] text-white"
                                    : "bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] text-white"
                                }`}
                              >
                                {React.cloneElement(feature.icon, {
                                  className: "w-6 h-6 stroke-[2.5]",
                                  size: 24,
                                })}
                              </div>
                              <h5 className="font-bold text-lg text-gray-800 mb-2">
                                {feature.title}
                              </h5>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12 p-8 bg-white rounded-2xl border border-gray-100 shadow-2xl">
                        <div className="text-center mb-10">
                          <div className="relative inline-block mb-6">
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] rounded-2xl blur opacity-20"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] rounded-2xl flex items-center justify-center shadow-lg">
                              <Rocket className="w-7 h-7 text-white" />
                            </div>
                          </div>
                          <h5 className="text-3xl font-bold text-gray-900 mb-3">
                            Supercharge Your Workflow
                          </h5>
                          <p className="text-gray-500 text-lg max-w-lg mx-auto">
                            Premium tools to accelerate your productivity
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Quick Access Card */}
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] rounded-xl blur opacity-15 group-hover:opacity-20 transition duration-200"></div>
                            <div className="relative bg-white p-6 rounded-xl border border-gray-100 h-full">
                              <div className="flex items-center gap-4 mb-5">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                  <Zap className="w-6 h-6 text-primary" />
                                </div>
                                <h6 className="font-bold text-gray-900 text-lg">
                                  Express Access
                                </h6>
                              </div>
                              <ul className="space-y-3">
                                {[
                                  "Role-specific dashboard",
                                  "Google Drive integration",
                                  "Notification settings",
                                  "Team workspace",
                                ].map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3"
                                  >
                                    <CheckCircle className="w-5 h-5 text-blue-primary mt-0.5 flex-shrink-0 text-primary" />
                                    <span className="text-gray-700">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Learning Resources Card */}
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] rounded-xl blur opacity-15 group-hover:opacity-20 transition duration-200"></div>
                            <div className="relative bg-white p-6 rounded-xl border border-gray-100 h-full">
                              <div className="flex items-center gap-4 mb-5">
                                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                                  <BookOpen className="w-6 h-6 text-primary" />
                                </div>
                                <h6 className="font-bold text-gray-900 text-lg">
                                  Expert Resources
                                </h6>
                              </div>
                              <ul className="space-y-3">
                                {[
                                  "Interactive tutorials",
                                  "Best practice guides",
                                  "Team collaboration playbooks",
                                  "Priority support",
                                ].map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3"
                                  >
                                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </DrawerBody>

              <DrawerFooter className="border-t bg-gradient-to-r from-blue-50 to-purple-50">
                <Button
                  className="bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] text-white font-semibold shadow-lg"
                  onPress={onClose}
                >
                  Start Using ZenTrio
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}