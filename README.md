

http://localhost:8080/swagger-ui/index.html#/

the .env
```
NEXT_PUBLIC_ONESIGNAL_APP_ID=eb585bc8-4e85-4114-8bbd-43d138858043
NEXTAUTH_SECRET=FVPr6Q/fVlHGZkElZubC0Zaxv657dPUfDQ4o9DADjSin7+uST1d2A5klMWrMK8fmSl3doyf2wn5zj56VC+qqCg==
GOOGLE_CLIENT_ID=512720315813-t8pf1ac1rcrsgqamcr1eagmjjaf5ak09.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

```


# Frontend - ReadMe

---

# Zentrio UI

Welcome to the frontend repository of Zentrio!

---

## Table of Contents

- [Overview](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
- [About the Project](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
- [Core Features](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
- [Getting Started](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
- [Project Structure](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
- [Routes and Implementations](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Workspace](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Board](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Gantt Chart and Gantt bar](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Gantt Chart (V2)](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Task](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Checklist](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Report](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Calendar](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Member](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Announcement](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Document](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
    - [Notification](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
- [Contributing](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)
- [License](https://www.notion.so/Frontend-ReadMe-2164c727d12b800ab466f53e702b16d8?pvs=21)

---

## Overview

Zentrio UI is a modular, scalable frontend for project management. It centralizes all routes, service logic, and UI integrations for features such as workspaces, boards, Gantt charts, calendar, reporting, announcements, and document management.

---

## About the Project

![Zentrio-Logo 3.png](Zentrio-Logo_3.png)

/*directory of our logo in public/images*/

**ZenTrio** is an all-in-one teamwork management platform designed to solve common challenges in team collaboration, project tracking, and productivity. Born from real-world frustrations with messy workflows, unclear task ownership, and time wasted with switching between multiple platforms, ZenTrio brings everything your team needs into a single, streamlined environment.

---

## Core Features

- Role-based permissions with Project Manager, Team Leader, Member, and Guest roles
- Gantt Charts for project timeline visualization
- Four-stage task tracking system (To Do → In Progress → Under Review → Completed)
- Personal calendar and documentation features with Google Drive integration

---

## Getting Started

1. **Clone the repository:**
    
    ```bash
    git clone <https://github.com/13-Generation-Basic-Course-Projects/zentrio-ui.git>
    cd zentrio-ui
    
    ```
    
2. **Install dependencies:**
    
    ```bash
    npm install
    # or yarn / pnpm / bun
    yarn install
    
    ```
    
3. **Set up environment variables:**
Create a `.env` file in the project root:
    
    ```bash
    NEXTAUTH_SECRET=your-secret-key
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    # Or
    # GOOGLE_CLIENT_ID=740314412364-6pd3o8tgb0071s7tofra70bvhiqpb1kb.apps.googleusercontent.com
    # GOOGLE_CLIENT_SECRET=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
    NEXT_PUBLIC_API_URL=http://localhost:8080
    NEXTAUTH_URL=http://localhost:3000
    NEXT_PUBLIC_ONESIGNAL_APP_ID=your-onesignal-app-id
    # Or
    # NEXT_PUBLIC_ONESIGNAL_APP_ID=eb585bc8-4e85-4114-8bbd-43d138858043
    
    ```
    
4. **Run the development server:**
    
    ```bash
    npm run dev
    # or yarn dev / pnpm dev / bun dev
    yarn run dev
    
    ```
    
5. **Visit:**
Open [http://localhost:3000](http://localhost:3000/) in your browser.

---

## Project Structure

```lisp
zentrio-ui/
├── app/                         # Next.js app directory (routing, layouts, pages, API routes)
│   ├── (system)/                # Main application routes (dashboard, workspace, board, calendar, etc.)
│   ├── api/                     # API route handlers (for uploads, proxy, etc.)
│   └── ...                      # Other Next.js route groups and pages
├── components/                  # Shared and feature-specific UI components
│   ├── appserver/               # Server components (fetch, render, logic)
│   ├── card/                    # Card UI elements (board, announcement, etc.)
│   ├── chart/                   # Chart visualizations
│   ├── button/                  # Button and action elements
│   ├── modal/                   # Modal dialogs
│   ├── announcementCompo/       # Announcement feature components
│   ├── sidebar/                 # Sidebar and navigation
│   └── ...                      # Other component groups
├── service/                     # API service functions (backend communication)
├── action/                      # Async action handlers (call services, business logic)
├── data/                        # Static and mock data (for development/testing)
├── public/                      # Static assets (images, icons, etc.)
├── styles/                      # Global and modular styles (Tailwind, CSS/SCSS)
├── .env                         # Environment variable definitions (not committed)
├── README.md                    # Project documentation
├── package.json                 # Project dependencies and scripts
└── ...

```

**Key Structure Notes:**

- **app/(system)/dashboard/[workspaceId]/[boardId]/**: Board-specific pages (tasks, docs, calendar, etc.)
- **components/modal/**: All modal dialogs, grouped by feature or entity
- **service/**: API interaction layer, one file per feature/entity
- **action/**: Async logic/handlers, one file per feature/entity
- **data/**: Seed/mock data for dev/testing
- **public/**: Images, icons, and static files accessible by URL
- **styles/**: Tailwind config, custom CSS modules, and global styles

---

## Routes and Implementations

### Workspace

- **Routes:**
    
    ```jsx
    export const workspaceRouteGroup = {
      createWorkspace: (),
      getAllWorkspaces: (),
      getWorkspaceById: (id),
      deleteWorkspaceById: (id),
      updateWorkspaceById: (id),
      getWorkspacesByUser: (),
      getWorkspacesByUserId: (id),
      getWorkspacesByTitle: (title),
      getOtherWorkSpaceJoined: (),
    };
    
    ```
    
- **Implementations:**
    - **Service:** `service/workspace.service.js`
    - **Action:** `action/workspace.action.js`
        - Components:
            - `appserver/Myworkspace.jsx`
            - `card/CardBoardAdd.jsx`
            - `modal/ModalCreateBoard.jsx`
            - `card/CardBoard.jsx`
            - `modal/ModalDelete.jsx`
            - `modal/workspace/ModalOptionWorkspace.jsx`
            - `modal/workspace/ModalRenameWorkspace.jsx`
            - `modal/ModalCreateWorkspace.jsx`
            - `sidebar/SidebarRenderer.jsx`
            - `sidebar/WorkSpaceSidebar.jsx`

---

### Board

- **Routes:**
    
    ```
    export const boardRouteGroup = {
      getBoardById: (boardId),
      updateBoardById: (boardId),
      updateFavBoardById: (boardId),
      getAllBoards: (),
      createBoard: (),
      inviteUserToBoard: (id),
      uploadBoardCover: (id),
      getBoardsByUserId: (userId),
      getBoardCover: (id, filename),
      getBoardsByWorkspaceId: (workspaceId),
      getBoardByTitle: (title),
      deleteBoard: (id, workspaceId),
      getFavoriteBoard: (userId),
    };
    
    ```
    
- **Implementations:**
    - **Service:** `service/workspace.service.js`
    - **Action:** `action/workspace.action.js`
        - Components:
            - `appserver/Myworkspace.jsx`
            - `appserver/FavoriteBoard.jsx`
            - `card/CardBoardFavorite.jsx`
            - `card/CardBoard.jsx`
            - `modal/ModalDelete.jsx`

---

### Gantt Chart and Gantt bar

- **Routes:**

```jsx
export const ganttRouteGroup = {
  getGanttChartForCurrentUser: (ganttChartId, boardId),
  getGanttChartByBoardId: (boardId),
  updateGanttChart: (ganttChartId),
  createGanttChart: (),
  deleteGanttChart: (ganttChartId, boardId),
  getAllGanttBar: (),
  getAllGanttBarByGanttChartID: (ganttChartId),
  createGanttBar: (),
  deleteGanttBar: (ganttbarId, ganttChartId),
};

```

- **Implementations:**
    - **Service:** `service/gantt.service.js`
    - **Action:** `action/gantt.action.js`
        - **Components:**
            - `appserver/Ganttpage.jsx`
            - `gantt/GanttChartComponent.jsx`
            - `gantt/GanttBarList.jsx`

### Gantt Chart (V2)

- **Routes:**
    
    ```
      export const calendarV2RouteGroup = {
      getTaskByBoardAndGanttBarId: (boardId, ganttbarId),
      getAllGanttBarByGanttChartID: (ganttChartId),
      getGanttChartByBoardId: (boardId),
      createNoteInCalendar: (),
      getAllNoteInCalendar: (taskId),
      deleteNoteInCalendar: (calendarId, taskId),
      updateNoteInCalendar: (calendarId),
      getChecklistByTaskId: (taskId),
    };
    
    ```
    
- **Implementations:**
    - **Service:** `service/calendarV2.service.js`
    - **Action:** `action/calendarV2.action.js`
        - Components:
            - `appserver/Calenderpage.jsx`
            - `card/CardCommentCalender.jsx`
            - `app/(system)/dashboard/[workspaceId]/[boardId]/calendar/page.jsx`

---

### Task

```jsx
export const taskRouteGroup = {
  getTaskAllUser: (),
  getAllTaskForAllUser: (),
  getTaskByBoardAndGanttBarId: (boardId, ganttbarId),
  moveTaskStags: (taskId),
  updateTaskById: (taskId),
  deleteTaskByTaskId: (taskId, boardId, ganttBarId),
};

```

- **Implementation:**
    - **Service:** `service/task.service.js`
    - **Action:** `action/task.action.js`
        - **Components:**
            - `appserver/Taskpage.jsx`
            - `task/TaskList.jsx`
            - `task/TaskItem.jsx`

---

### Checklist

- **Routes:**
    
    ```
    export const checklistRouteGroup = {
      getCheckListByTaskId: (checklistId),
      getCoverOfCheckList: (checklistId, fileName),
      getCheckListByCurrentUser: (id),
      updateCheckListByIdAndTaskId: (checklistId),
      updateStatusById: (id),
      createCheckListByTaskId: (),
      uploadCoverOfChecklistByCheckListId: (id),
      assignMemberToCheckList: (checklistId, taskId, assignedBy, assignTo),
      deleteCheckListByTaskId: (checkListId, taskId),
    };
    
    ```
    
- **Implementations:**
    - **Service:** `service/checklist.service.js`
    - **Action:** `action/checklist.action.js`
        - **Components:**
            - `appserver/Checklistpage.jsx`
            - `checklist/ChecklistComponent.jsx`
            - `checklist/ChecklistItem.jsx`

---

### Report

- **Routes:**
    
    ```
    export const reportRouteGroup = {
      getReportByBoardId: (id),
      generateReportInPDFByBoardId: (id),
    };
    
    ```
    
- **Implementations:**
    - **Service:** `service/report.service.js`
    - **Action:** `action/report.action.js`
        - `getReportByBoardId: (id)`
            - `getReportService = async ({ boardId, zentrioToken })`
            - `getReportAction = async ({ boardId })`
            - Components:
                - `appserver/Reportpage.jsx`
                - `chart/VerticalChart.jsx`
                - `chart/HorizontalChart.jsx`
                - `button/ButtonReport.jsx`
        - `generateReportInPDFByBoardId: (id)`
            - `generateReportByBoardIdService = async ({ boardId, zentrioToken })`
            - `generateReportByBoardIdAction = async ({ boardId })`
            - Components:
                - `card/CardBoardReport.jsx`
                - `modal/rep/ModalSaveAs.jsx`

---

### Calendar

- **Routes:**
    
    ```jsx
    export const calendarRouteGroup = {
      getCalendarByBoardIdAndUserId: (boardId),
      getAllNotesFromCalendarByCurrentUser: (taskId),
      createNoteInCalendar: (),
      updateNoteByIdFromCalendar: (calendarId),
      deleteNoteByIdFromCalendar: (calendarId, taskId),
    };
    
    ```
    
- **Implementations:**
    - **Service:** `service/calendar.service.js`
    - **Action:** `action/calendar.action.js`
        - Components:
            - `appserver/Calendarpage.jsx`
            - `card/CardTaskCalendar.jsx`
            - `card/CardCommentCalendar.jsx`

---

### Member

- **Routes:**

```jsx
export const memberRouteGroup = {
  acceptBoardInvite: (id),
  getBoardMembers: (boardId),
  getUserByUserId: (id),
};

```

- **Implementations:**
    - **Service:** `service/member.service.js`
    - **Action:** `action/member.action.js`
        - **Components:**
            - `appserver/Memberpage.jsx`
            - `member/MemberList.jsx`
            - `member/MemberProfile.jsx`

---

### Announcement

- **Routes:**
    
    ```jsx
    export const announcementRouteGroup = {
      createAnnouncementByBoardId: (boardId),
      uploadMultiImgByBoardId: (boardId),
      getAllAnnouncementByBoardId: (boardId),
      deleteAnnouncementById: (announId),
      pinedAnnouncementById: (announId),
      updateAnnouncementById: (announId),
    };
    
    ```
    
- **Implementations:**
    - **Service:** `service/announcement.service.js`
    - **Action:** `action/announcement.action.js`
        - Components:
            - `announcementCompo/CardCreateModel.jsx`
            - `announcementCompo/CardPostAnnouncement.jsx`
            - `announcementCompo/ModelDeleteAnnoun.jsx`
            - `announcementCompo/ModelPinedAnnoun.jsx`
            - `announcementCompo/ModelEditAnnoun.jsx`

---

### Document

- **Routes:**
    
    ```jsx
    export const documentRouteGroup = {
      getDocumentById: (id),
      updateDocumentById: (id, accessToken, newName),
      deleteDocumentById: (documentId, accessToken),
      makeDocumentPrivate: (id),
      makeDocumentPublic: (documentId, accessToken),
      createDocument: (),
      uploadDocumentToBoard: (boardId, accessToken),
      createDriveFile: (name, folderId, fileType, accessToken),
      uploadDocumentToFolder: (folderId, accessToken),
      getPublicDocumentsByBoard: (boardId),
      downloadDocumentByDocumentId: (documentId, accessToken),
      downloadAllFilesAsZip: (documentId, accessToken),
      getAllDocumentsByBoard: (boardId),
      getDocumentsByType: (boardId, mineType),
      getDocumentByName: (boardId, name),
      getFileByFolderId: (folderId, accessToken),
    };
    
    ```
    
- **Implementations:**
    - **Service:** `service/document.service.js`
    - **Action:** `action/document.action.js`
        - Components:
            - `modal/docu/ModalFolderList.jsx`
            - `modal/docu/ModalOptionDocument.jsx`
            - `modal/docu/ModalCreateDocu.jsx`
            - `modal/docu/ModalUploadfile.jsx`
            - `modal/docu/ModalCreateDocuInFolder.jsx`
            - `modal/ModalRenameDocu.jsx`
            - `popup/PopupAction.jsx`
            - `app/(system)/dashboard/[workspaceId]/[boardId]/docu/layout.jsx`

---

### Notification

- **Routes:**

```jsx
export const notificationRouteGroup = {
  sendNotificationToAllUser: (),
  sendNotificationToUserId: (receiverId, taskId),
  getNotificationForUserId: (userId),
  deleteNotificationById: (notificationId),
  deleteAllNotification: (),
};

```

- **Implementations:**
    - **Service:** `service/notification.service.js`
    - **Action:** `action/notification.action.js`
        - **Components:**
            - `appserver/Notificationpage.jsx`
            - `notification/NotificationList.jsx`
            - `notification/NotificationItem.jsx`

---

## Contributing

1. Fork the repository.
2. Create a feature branch:`git checkout -b feature/your-feature`
3. Commit your changes:`git commit -am 'Add feature ...'`
4. Push to your branch:`git push origin feature/your-feature`
5. Open a pull request.

**Contributor Guidelines:**

- Use clear, descriptive commit messages.
- Keep PRs focused and small.
- Write tests for new features where possible.
- Ensure code passes lint and type checks.

---

## License

This project is licensed under the MIT License.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# zentrio-ui
