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
      "Ultimate project authority with full access to all features including board creation, Gantt chart management, team oversight, and strategic decision-making",
    guide:
      "Ultimate project authority with full access to all features including Kanban view, document collaboration, and personal calendar",
  },
  teamLeader: {
    title: "Team Leader",
    color: "warning",
    icon: <ShieldCheck className="w-7 h-7 text-primary" />,
    description:
      "Operational task coordinator responsible for team guidance, task assignment, progress tracking, and ensuring deliverable quality within assigned project areas",
    guide:
      "Operational task coordinator with access to Kanban view, document collaboration, and personal calendar features",
  },
  member: {
    title: "Member",
    color: "primary",
    icon: <Users className="w-7 h-7 text-primary" />,
    description:
      "Task executor focused on completing assigned work, updating progress status, collaborating with teammates, and contributing to project deliverables",
    guide:
      "Task executor with access to Kanban view, document collaboration, and personal calendar features",
  },
  guest: {
    title: "Guest",
    color: "default",
    icon: <Eye className="w-7 h-7 text-primary" />,
    description:
      "External stakeholder with limited view-only access to specific project information via shared workspace links",
    guide:
      "External stakeholder with view-only access to shared workspace information",
  },
};

const guideSteps = {
  projectManager: [
    {
      step: 1,
      title: "Invite Member to Board",
      description:
        "Learn how to add team members to your project board and assign them appropriate roles.",
      actions: [
        "Click the (Invite) button in the board page",
        "Enter team member email addresses",
        "Choose member roles (Team Leader or Member) from the dropdown menu",
        "Add to pending for multiple invite",
        "Click (Send Invitations) to notify all selected team members",
      ],
      tips: "Assign Team Leader roles to experienced members who can help coordinate specific project areas",
    },
    {
      step: 2,
      title: "Create Gantt Chart and Gantt Bar",
      description:
        "A Gantt chart is a visual project management tool that displays tasks, timelines, and dependencies in horizontal bar format, allowing you to see the entire project timeline at a glance and track progress against planned schedules.",
      actions: [
        "Click the (Create) button in the board page by giving the Gantt Chart title",
        "Add main project phases by clicking (Create) to create Gantt Bars",
        "Set Gantt Bar durations by dragging the timeline bars or entering specific dates",
        "Select the specific phases for a bar",
        "Save",
      ],
      tips: "Use different colors for Gantt bars to distinguish between phases and priority levels",
    },
    {
      step: 3,
      title: "Optional to Create Tasks",
      description:
        "Create high-level tasks that can be broken down further by Team Leaders into detailed checklists.",
      actions: [
        "Navigate to the (Tasks) section in your project board",
        "Click (Create New Task) button",
        "Enter task title and detailed description",
        "Set task priority level (High, Medium, Low)",
        "Assign the task to a specific Team Leader",
        "Set estimated completion date and effort required",
        "Add relevant tags or categories for better organization",
        "Save the task and notify the assigned Team Leader",
      ],
      tips: "Keep tasks at a strategic level - let Team Leaders handle the detailed breakdown",
    },
    {
      step: 4,
      title: "Approve when Task goes to (Completed) Stage and Feedback",
      description:
        "Review and approve completed tasks while providing constructive feedback to maintain quality standards.",
      actions: [
        "Navigate to tasks in (Completed) status on the Kanban board",
        "Click on the completed task to open detailed view",
        "Review all checklist items and deliverables thoroughly",
        "Check attached documents and work outputs",
        "Provide detailed feedback in the comments section",
        "Choose to either (Approve) or (Request Changes)",
        "If approved, move task to (Final Approval) status",
        "If changes needed, move back to (Under Review) with specific feedback",
        "Notify Team Leader and Members about the decision",
      ],
      tips: "Provide specific, actionable feedback to help team members improve their work quality",
    },
    {
      step: 5,
      title: "View and Generate Report",
      description:
        "Access comprehensive project analytics and generate detailed reports for stakeholders.",
      actions: [
        "Click on (Reports) tab in the main navigation menu",
        "Select report type (Progress, Performance, Timeline, Resource Utilization)",
        "Choose date range and specific team members to include",
        "Configure report parameters and filters",
        "Preview the report before generating final version",
        "Click (Generate Report) to create PDF or Excel format",
        "Download or share the report with relevant stakeholders",
        "Schedule automatic report generation for regular updates",
      ],
      tips: "Set up weekly automated reports to keep stakeholders informed without manual effort",
    },
  ],
  teamLeader: [
    {
      step: 1,
      title: "Create Tasks",
      description:
        "After accepting assignment from Project Manager, break down project components into manageable tasks for your team members.",
      actions: [
        "Access your assigned project area from the dashboard",
        "Click (Create New Task) in your designated section",
        "Enter comprehensive task title and detailed description",
        "Set task priority level and estimated effort required",
        "Define task objectives and expected deliverables clearly",
        "Attach relevant reference documents or resources",
        "Set realistic deadline based on project timeline",
        "Save the task in (To Do) status on the Kanban board",
      ],
      tips: "Write clear task descriptions to minimize confusion and back-and-forth communication",
    },
    {
      step: 2,
      title: "Create Checklists (Inside Tasks)",
      description:
        "Break down tasks into specific, actionable checklist items that can be assigned to individual team members.",
      actions: [
        "Open the task you want to add checklists to",
        "Click (Add Checklist) button within the task details",
        "Enter specific checklist item title and description",
        "Set individual checklist priority and estimated time",
        "Add detailed instructions or acceptance criteria",
        "Attach supporting files or reference materials if needed",
        "Set checklist status to (Not Started)",
        "Repeat process to create multiple checklist items within the task",
      ],
      tips: "Keep checklist items small and specific - each should take no more than a few hours to complete",
    },
    {
      step: 3,
      title: "Assign Member to Checklists",
      description:
        "Delegate specific checklist items to appropriate team members based on their skills and availability.",
      actions: [
        "Open the task containing the checklists you want to assign",
        "Click on the specific checklist item you want to assign",
        "Click (Assign Member) dropdown menu",
        "Select the appropriate team member from the available list",
        "Set assignment deadline and priority level",
        "Send notification to the assigned member with context",
        "Monitor assignment status and member acceptance",
        "Follow up if assignment is not accepted within reasonable time",
      ],
      tips: "Match checklist assignments to member expertise to ensure quality and efficiency",
    },
    {
      step: 4,
      title: "Move Tasks Through Four Stages",
      description:
        "Guide tasks through the workflow stages while ensuring all checklists are properly completed first.",
      actions: [
        "Monitor task progress on the Kanban board regularly",
        "Verify all checklists are moved from (IN PROGRESS) to (DONE) status first",
        "Only after all checklists are (DONE), move task from (To Do) to (In Progress)",
        "Track work progress and provide guidance as needed",
        "When work is complete, move task to (Under Review) status",
        "Conduct quality review and gather necessary approvals",
        "Move task to (Completed) status for Project Manager final approval",
        "Important Note: Tasks cannot advance to next stage until ALL checklists within that task are marked as (DONE)",
      ],
      tips: "Use the Kanban board filters to quickly see tasks that are ready to move to the next stage",
    },
  ],
  member: [
    {
      step: 1,
      title: "Work on Checklist",
      description:
        "After accepting assignment from Team Leader, focus on completing assigned checklist items efficiently and effectively.",
      actions: [
        "Access your assigned checklists from the personal dashboard",
        "Open the specific checklist item you want to work on",
        "Change checklist status from (Not Started) to (In Progress)",
        "Review all requirements and acceptance criteria carefully",
        "Gather necessary resources and reference materials",
        "Execute the work according to specifications",
        "Update progress regularly and communicate any blockers",
        "When work is complete, change status from (In Progress) to (Done)",
        "Attach completed deliverables or evidence of completion",
        "Notify Team Leader that checklist item is ready for review",
      ],
      tips: "Update your checklist status frequently to keep Team Leaders informed of your progress",
    },
    {
      step: 2,
      title: "Comment Under Checklist",
      description:
        "Maintain clear communication with Team Leaders and other members through checklist comments.",
      actions: [
        "Open the checklist item you want to comment on",
        "Scroll to the comments section at the bottom",
        "Click (Add Comment) to open the text editor",
        "Write clear, specific comments about progress, questions, or issues",
        "Use @mentions to notify specific team members if needed",
        "Attach relevant files or screenshots to support your comments",
        "Choose comment visibility (Team Leader only or All Members)",
        "Click (Post Comment) to share with the team",
        "Respond to comments from Team Leaders promptly",
        "Use comments to ask questions or report blockers immediately",
      ],
      tips: "Use comments proactively to communicate challenges before they become major blockers",
    },
  ],
  guest: [
    {
      step: 1,
      title: "View the Whole Board but Not Edit",
      description:
        "Access shared project information as an external stakeholder while maintaining project security through read-only permissions.",
      actions: [
        "Click on the shared workspace link provided by the Project Manager",
        "Browse through the complete project board and all visible information",
        "View task progress across all four stages (To Do, In Progress, Under Review, Completed)",
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
  const [selectedRole, setSelectedRole] = useState("member");
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
                        {userRoles[selectedRole].description}
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
                    <div className="absolute left-4 h-full w-0.5 bg-gray-200 top-8"></div>
                    <div className="space-y-8">
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
                                activeStep === index
                                  ? selectedRole === "projectManager"
                                    ? "bg-primary ring-4 ring-blue-100"
                                    : selectedRole === "teamLeader"
                                    ? "bg-primary ring-4 ring-blue-100"
                                    : selectedRole === "member"
                                    ? "bg-primary ring-4 ring-blue-100"
                                    : "bg-primary ring-4 ring-blue-100"
                                  : "bg-gray-200"
                              }
                              `}
                            >
                              <span className="text-white font-bold text-sm">
                                {stepData.step}
                              </span>
                            </div>
                            {index ===
                            guideSteps[selectedRole].length - 1 ? null : (
                              <div
                                className={`h-16 w-0.5 transition-all ${
                                  activeStep >= index
                                    ? selectedRole === "projectManager"
                                      ? "bg-primary"
                                      : selectedRole === "teamLeader"
                                      ? "bg-primary"
                                      : selectedRole === "member"
                                      ? "bg-primary"
                                      : "bg-primary"
                                    : "bg-gray-200"
                                }`}
                              ></div>
                            )}
                          </div>

                          <Card
                            className={`w-full shadow-sm transition-all cursor-pointer
                              ${
                                activeStep === index
                                  ? selectedRole === "projectManager"
                                    ? "border-primary border-2"
                                    : selectedRole === "teamLeader"
                                    ? "border-primary border-2"
                                    : selectedRole === "member"
                                    ? "border-primary border-2"
                                    : "border-primary border-2"
                                  : "hover:shadow-md hover:border-gray-300 border"
                              }
                            `}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-start gap-4 w-full">
                                <div className="flex-1">
                                  <h4
                                    className={`text-xl font-bold transition-all ${
                                      activeStep === index
                                        ? selectedRole === "projectManager"
                                          ? "text-primary"
                                          : selectedRole === "teamLeader"
                                          ? "text-primary"
                                          : selectedRole === "member"
                                          ? "text-primary"
                                          : "text-primary"
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
                                  <h5 className="font-semibold mb-4 text-default-700 text-lg flex  items-center">
                                    <ClipboardList className="w-7 h-7 text-primary " />
                                    <span className="px-3">Action Steps:</span>
                                  </h5>
                                  <div className="space-y-3 mb-6">
                                    {stepData.actions.map(
                                      (action, actionIndex) => (
                                        <div
                                          key={actionIndex}
                                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                                        >
                                          <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                                          ${
                                            selectedRole === "projectManager"
                                              ? "bg-primary text-white"
                                              : selectedRole === "teamLeader"
                                              ? "bg-primary text-white"
                                              : selectedRole === "member"
                                              ? "bg-primary text-white"
                                              : "bg-primary text-white"
                                          }`}
                                          >
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
                                        <span className="font-bold text-amber-800">
                                          <span className="px-3">
                                            {" "}
                                            Pro Tip:{" "}
                                          </span>
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

                      <div className="mt-12 p-8 bg-white/70 rounded-xl border border-white/80 shadow-sm">
                        <div className="text-center mb-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Goal className="w-6 h-6 text-white" />
                          </div>
                          <h5 className="font-bold text-xl text-gray-800 mb-2">
                            Ready to Get Started?
                          </h5>
                          <p className="text-default-500 max-w-lg mx-auto">
                            Jump right in or explore our learning resources
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 text-sm">
                          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-xs">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-blue-600">
                                <Link2 className="w-7 h-7 text-primary" />
                              </div>
                              <h6 className="font-semibold text-gray-800 text-base">
                                Quick Access
                              </h6>
                            </div>
                            <ul className="text-gray-600 space-y-2 pl-2">
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Access your role-specific dashboard</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Set up Google Drive integration</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Configure notification preferences</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Join your team workspace</span>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-xs">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                <BookOpen className="w-7 h-7 text-primary" />
                              </div>
                              <h6 className="font-semibold text-gray-800 text-base">
                                Learning Resources
                              </h6>
                            </div>
                            <ul className="text-gray-600 space-y-2 pl-2">
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Interactive feature tutorials</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Best practices documentation</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Team collaboration guides</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Troubleshooting support</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </DrawerBody>

              <DrawerFooter className="border-t bg-gradient-to-r from-blue-50 to-purple-50">
                <Button
                  color="default"
                  variant="bordered"
                  onPress={onClose}
                  className="font-semibold"
                >
                  Close Guide
                </Button>
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
