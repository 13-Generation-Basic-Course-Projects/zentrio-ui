import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Provider } from "@radix-ui/react-tooltip";
import OneSignalInitializer from "@/components/onesignal/OneSignalInitializer";
import ToastWrapper from "@/components/toast/ToastWrapper";
export const metadata = {
  title: "Zentrio | All-in-One Project Management for Teams & Developers",
  description:
    "Zentrio is a powerful project management platform designed for Project Managers, Team Leaders, and Developers. Manage tasks, visualize workflows, create documents, and collaborate smarter — all in one place.",
    keywords: [
      "Project Management",
      "Task Management",
      "Kanban Board",
      "Dev Tools",
      "Team Collaboration",
      "Project Tracker",
      "Zentrio Platform",
      "Developer Tools",
      "Team Workflow",
      "Productivity App",
      "Task Organizer",
      "Work Management",
      "Agile Project Management",
      "Sprint Planning",
      "Task Prioritization",
      "Task Scheduling",
      "Collaboration Software",
      "Project Dashboard",
      "Zentrio Task Manager",
      "Task Tracking Software",
      "PC Compatible Project App",
      "Desktop Project Management",
      "Zentrio Productivity Tool",
      "Best Project App for PC",
      "Task Automation",
      "Remote Team Management",
      "Project Progress Tracker",
      "Zentrio Collaboration Platform",
      "Zentrio",
      "zentrio",
      "Hrd 13 gen",
    ],
    
  icons: {
    icon: "/mylogo.svg",
  },
  openGraph: {
    title: "Zentrio | All-in-One Project Management Tool",
    description:
      "Streamline your workflow with Kanban boards, calendars, team drive, reports, and real-time notifications — all in one platform built for modern teams.",
    url: "https://kshrd.zentrio.pro",
    siteName: "Zentrio",
    images: [
      {
        url: "https://team.zentrio.pro/api/v1/files/preview-file/5ca2a29b-e2e2-4cdc-89ac-37632919ad41.png", // create this preview image for sharing on social
        width: 1200,
        height: 630,
        alt: "Zentrio Project Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentrio | Dev Team’s Favorite Project Manager",
    description:
      "From task assignments to documentation — Zentrio keeps your entire dev lifecycle clean, simple, and efficient.",
    images: ["https://team.zentrio.pro/api/v1/files/preview-file/5ca2a29b-e2e2-4cdc-89ac-37632919ad41.png"],
  },
};


export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`font-poppin `}>
        <NextTopLoader color="#59BAD5" showSpinner={false} />
        {/* <NextUIProvider> */}
        <Provider>{children}</Provider>
        {/* </NextUIProvider> */}
        {/* Onesignal */}
        <OneSignalInitializer />
        <ToastWrapper />

      </body>
    </html>
  );
}
