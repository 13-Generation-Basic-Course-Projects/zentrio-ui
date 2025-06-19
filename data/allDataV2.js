export const notifications = [
  {
    content: "Task 'Implement Auth' assigned to you.",
    type: "task_assignment",
    is_read: false,
    created_at: "2025-05-15T08:23:00Z",
    task_assignment: "ta-1",
    user_id: "u-1",
  },
  {
    content: "Deadline for 'Fix bugs in checkout' is tomorrow!",
    type: "reminder",
    is_read: false,
    created_at: "2025-05-14T15:00:00Z",
    task_assignment: "ta-2",
    user_id: "u-2",
  },
  {
    content: "‘Database optimization’ marked complete ✅",
    type: "status_update",
    is_read: true,
    created_at: "2025-05-13T10:12:00Z",
    task_assignment: "ta-3",
    user_id: "u-3",
  },
  {
    content: "New comment on 'Redesign homepage UI'.",
    type: "comment",
    is_read: false,
    created_at: "2025-05-15T11:47:00Z",
    task_assignment: "ta-4",
    user_id: "u-4",
  },
  {
    content: "'Sprint Review' moved to next week 📆",
    type: "notification",
    is_read: true,
    created_at: "2025-05-12T09:00:00Z",
    task_assignment: "ta-5",
    user_id: "u-5",
  },
];

export const documents = [
  {
    document_id: "d-1",
    created_at: "2025-05-14T10:25:00Z",
    is_private: true,
    drive_url: "https://drive.google.com/file/d/1abc123456789xyz/view",
    description: "Project plan for Q2 2025 marketing campaign.",
    doc_type: "plan",
    user_id: "u-1",
    board_id: "b-1",
  },
  {
    document_id: "d-2",
    created_at: "2025-05-13T08:10:00Z",
    is_private: true,
    drive_url: "https://drive.google.com/file/d/2def987654321abc/view",
    description: "Design spec for mobile UI revamp.",
    doc_type: "spec",
    user_id: "u-2",
    board_id: "b-2",
  },
  {
    document_id: "d-3",
    created_at: "2025-05-12T16:45:00Z",
    is_private: true,
    drive_url: "https://drive.google.com/file/d/3ghi456789012def/view",
    description: "Weekly team meeting notes — confidential 🔒",
    doc_type: "meeting_notes",
    user_id: "u-3",
    board_id: "b-3",
  },
];

export const users = [
  {
    user_id: "u-1",
    username: "plantlover88",
    email: "plantlover88@example.com",
    password: "hashed_pw_1",
    profile_image: "https://example.com/images/user1.png",
    created_at: "2025-05-10T09:00:00Z",
    updated_at: "2025-05-12T14:30:00Z",
    is_verified: false,
    is_reset: false,
  },
  {
    user_id: "u-2",
    username: "devqueen22",
    email: "devqueen22@example.com",
    password: "hashed_pw_2",
    profile_image: "https://example.com/images/user2.jpg",
    created_at: "2025-05-09T11:15:00Z",
    updated_at: "2025-05-14T08:45:00Z",
    is_verified: false,
    is_reset: false,
  },
  {
    user_id: "u-3",
    username: "bossman420",
    email: "bossman420@example.com",
    password: "hashed_pw_3",
    profile_image: "https://example.com/images/user3.webp",
    created_at: "2025-05-08T16:20:00Z",
    updated_at: "2025-05-13T12:10:00Z",
    is_verified: false,
    is_reset: false,
  },
  {
    user_id: "u-4",
    username: "designer99",
    email: "designer99@example.com",
    password: "hashed_pw_4",
    profile_image: "https://example.com/images/user4.png",
    created_at: "2025-05-07T10:00:00Z",
    updated_at: "2025-05-15T09:00:00Z",
    is_verified: false,
    is_reset: false,
  },
  {
    user_ICON_id: "u-5",
    username: "manager77",
    email: "manager77@example.com",
    password: "hashed_pw_5",
    profile_image: "https://example.com/images/user5.jpg",
    created_at: "2025-05-06T12:00:00Z",
    updated_at: "2025-05-14T10:00:00Z",
    is_verified: false,
    is_reset: false,
  },
];

export const roles = [
  {
    role_id: "r-1",
    role_name: "PM",
  },
  {
    role_id: "r-2",
    role_name: "TL",
  },
  {
    role_id: "r-3",
    role_name: "M",
  },
];

export const members = [
  {
    member_id: "m-1",
    role_id: "r-1",
    user_id: "u-1",
    board_id: "b-1",
  },
  {
    member_id: "m-2",
    role_id: "r-2",
    user_id: "u-2",
    board_id: "b-2",
  },
  {
    member_id: "m-3",
    role_id: "r-3",
    user_id: "u-3",
    board_id: "b-3",
  },
];

export const task_assignment = [
  {
    task_assign_id: "ta-1",
    assigned_to: "u-1",
    assigned_by: "u-2",
    task_id: "t-1",
  },
  {
    task_assign_id: "ta-2",
    assigned_to: "u-2",
    assigned_by: "u-3",
    task_id: "t-2",
  },
  {
    task_assign_id: "ta-3",
    assigned_to: "u-3",
    assigned_by: "u-1",
    task_id: "t-3",
  },
  {
    task_assign_id: "ta-4",
    assigned_to: "u-4",
    assigned_by: "u-1",
    task_id: "t-1",
  },
  {
    task_assign_id: "ta-5",
    assigned_to: "u-5",
    assigned_by: "u-2",
    task_id: "t-4",
  },
];

export const checklist_assignments = [
  {
    checklist_assign_id: "ca-1",
    member_id: "m-1",
    assigned_by: "u-2",
    checklist_id: "chk-1",
  },
  {
    checklist_assign_id: "ca-2",
    member_id: "m-2",
    assigned_by: "u-3",
    checklist_id: "chk-2",
  },
  {
    checklist_assign_id: "ca-3",
    member_id: "m-3",
    assigned_by: "u-1",
    checklist_id: "chk-3",
  },
];

export const calenders = [
  {
    calender_id: "cal-1",
    noted: "Review frontend layout with team",
    noted_at: "2025-05-01T09:00:00Z",
    till_date: "2025-05-01T11:00:00Z",
    user_id: "u-1",
    task_id: "t-1",
  },
  {
    calender_id: "cal-2",
    noted: "API deadline & deployment",
    noted_at: "2025-05-05T14:00:00Z",
    till_date: "2025-05-05T17:00:00Z",
    user_id: "u-2",
    task_id: "t-2",
  },
  {
    calender_id: "cal-3",
    noted: "Weekly sync meeting",
    noted_at: "2025-05-08T10:30:00Z",
    till_date: "2025-05-08T12:00:00Z",
    user_id: "u-3",
    task_id: "t-3",
  },
];

export const comments = [
  {
    comment_id: "c-1",
    content: "This task needs some updates, please review.",
    comment_date: "2025-05-10T14:23:00Z",
    checklist_id: "chk-1",
    commented_by: "u-1",
  },
  {
    comment_id: "c-2",
    content: "Checked and approved the checklist items.",
    comment_date: "2025-05-11T09:45:00Z",
    checklist_id: "chk-2",
    commented_by: "u-2",
  },
  {
    comment_id: "c-3",
    content: "Let's add a few more checkpoints here.",
    comment_date: "2025-05-12T16:30:00Z",
    checklist_id: "chk-3",
    commented_by: "u-3",
  },
];

export const tasks = [
  {
    task_id: "t-1",
    title: "Design  UI",
    description: "Create wireframes and prototypes for the homepage.",
    is_done: false,
    created_at: "2025-04-29T10:15:00Z",
    updated_at: "2025-05-10T13:45:00Z",
    finished_at: null,
    task_order: 1,
    stage: "In Progress",
    board_id: "b-1",
    gantt_bar_id: "gb-1",
  },
  {
    task_id: "t-2",
    title: "API developments",
    description: "Develop RESTful APIs for user management.",
    is_done: true,
    created_at: "2025-03-15T09:00:00Z",
    updated_at: "2025-04-01T16:30:00Z",
    finished_at: "2025-04-30T11:00:00Z",
    task_order: 2,
    stage: "Completed",
    board_id: "b-1",
    gantt_bar_id: "gb-2",
  },
  {
    task_id: "t-3",
    title: "Testing & QA",
    description: "Perform testing and quality assurance on all features.",
    is_done: false,
    created_at: "2025-04-22T14:00:00Z",
    updated_at: "2025-05-12T10:00:00Z",
    finished_at: null,
    task_order: 3,
    stage: "To Do",
    board_id: "b-2",
    gantt_bar_id: "gb-3",
  },
  {
    task_id: "t-4",
    title: "Sprint Review",
    description: "Conduct sprint review and planning for next sprint.",
    is_done: false,
    created_at: "2025-05-01T09:00:00Z",
    updated_at: "2025-05-12T09:00:00Z",
    finished_at: null,
    task_order: 4,
    stage: "To Do",
    board_id: "b-3",
    gantt_bar_id: "gb-4",
  },
  {
    task_id: "t-4",
    title: "API deployment",
    description: "Deploy RESTful APIs for user management.",
    is_done: true,
    created_at: "2025-04-01T09:00:00Z",
    updated_at: "2025-04-04T16:30:00Z",
    finished_at: "2025-04-30T11:00:00Z",
    task_order: 2,
    stage: "Completed",
    board_id: "b-1",
    gantt_bar_id: "gb-2",
  },
];

export const checklists = [
  {
    checklist_id: "chk-1",
    title: "Wireframe homepage sections",
    is_done: false,
    created_at: "2025-04-21T08:00:00Z",
    updated_at: "2025-05-10T12:30:00Z",
    checklist_order: 1,
    started_at: "2025-04-21T09:00:00Z",
    finished_at: null,
    task_id: "t-1",
  },
  {
    checklist_id: "chk-2",
    title: "Set up API endpoints",
    is_done: true,
    created_at: "2025-03-16T10:30:00Z",
    updated_at: "2025-04-28T15:20:00Z",
    checklist_order: 1,
    started_at: "2025-03-17T09:00:00Z",
    finished_at: "2025-04-27T16:00:00Z",
    task_id: "t-2",
  },
  {
    checklist_id: "chk-3",
    title: "Create test cases",
    is_done: false,
    created_at: "2025-04-23T11:00:00Z",
    updated_at: "2025-05-12T09:00:00Z",
    checklist_order: 1,
    started_at: "2025-04-24T10:00:00Z",
    finished_at: null,
    task_id: "t-3",
  },
];

export const labels = [
  {
    label_id: "l-1",
    label_title: "Urgent",
    label_color: "#FF0000",
    checklist_id: "chk-1",
  },
  {
    label_id: "l-2",
    label_title: "Review",
    label_color: "#FFA500",
    checklist_id: "chk-2",
  },
  {
    label_id: "l-3",
    label_title: "Optional",
    label_color: "#00FF00",
    checklist_id: "chk-3",
  },
];

export const boards = [
  {
    board_id: "b-1",
    title: "Marketing Campaign",
    description: "Plan and track all marketing activities for Q3.",
    created_at: "2025-01-10T09:00:00Z",
    updated_at: "2025-05-10T11:00:00Z",
    is_favorite: true,
    is_verified: false,
    workspace_id: "w-1",
  },
  {
    board_id: "b-2",
    title: "Product Launch",
    description:
      "Organize tasks and milestones for the upcoming product launch.",
    created_at: "2025-02-15T14:30:00Z",
    updated_at: "2025-05-12T08:45:00Z",
    is_favorite: false,
    is_verified: true,
    workspace_id: "w-2",
  },
  {
    board_id: "b-3",
    title: "Website Redesign",
    description:
      "Coordinate design and development tasks for the new website layout.",
    created_at: "2025-03-20T16:15:00Z",
    updated_at: "2025-05-08T17:00:00Z",
    is_favorite: false,
    is_verified: false,
    workspace_id: "w-1",
  },
];

export const gantt_charts = [
  {
    gantt_chart_id: "gc-1",
    title: "Q2 Project Timeline",
    created_at: "2025-04-01T08:00:00Z",
    updated_at: "2025-05-10T12:00:00Z",
    board_id: "b-1",
  },
  {
    gantt_chart_id: "gc-2",
    title: "Marketing Campaign Schedule",
    created_at: "2025-03-15T09:30:00Z",
    updated_at: "2025-05-08T10:15:00Z",
    board_id: "b-2",
  },
  {
    gantt_chart_id: "gc-3",
    title: "Website Redesign Plan",
    created_at: "2025-04-20T11:45:00Z",
    updated_at: "2025-05-09T14:30:00Z",
    board_id: "b-3",
  },
];

export const gantt_bars = [
  {
    gantt_bar_id: "gb-1",
    title: "Research Phase",
    started_at: "2025-04-01T09:00:00Z",
    finished_at: "2025-04-10T18:00:00Z",
    gantt_chart_id: "gc-1",
  },
  {
    gantt_bar_id: "gb-2",
    title: "Design Phase",
    started_at: "2025-04-11T09:00:00Z",
    finished_at: "2025-04-20T18:00:00Z",
    gantt_chart_id: "gc-1",
  },
  {
    gantt_bar_id: "gb-3",
    title: "Development Phase",
    started_at: "2025-04-21T09:00:00Z",
    finished_at: "2025-05-05T18:00:00Z",
    gantt_chart_id: "gc-1",
  },
  {
    gantt_bar_id: "gb-4",
    title: "Review Phase",
    started_at: "2025-05-06T09:00:00Z",
    finished_at: "2025-05-12T18:00:00Z",
    gantt_chart_id: "gc-3",
  },
];

export const feedback = [
  {
    feedback_id: "f-1",
    created_at: "2025-05-01T10:30:00Z",
    comment: "Great job on the inittial design. Just tweak the navbar spacing.",
    task_id: "t-1",
    feedback_by: "u-1",
  },
  {
    feedback_id: "f-2",
    created_at: "2025-05-03T15:45:00Z",
    comment: "API response times are fast, but consider better error handling.",
    task_id: "t-2",
    feedback_by: "u-2",
  },
  {
    feedback_id: "f-3",
    created_at: "2025-05-05T12:15:00Z",
    comment: "Testing coverage is solid. Add edge cases for user roles.",
    task_id: "t-3",
    feedback_by: "u-3",
  },
];

export const workspaces = [
  {
    workspace_id: "w-1",
    title: "Marketing Team",
    description: "Workspace for managing all marketing campaigns and content.",
    created_at: "2025-03-10T08:00:00Z",
    updated_at: "2025-05-01T14:30:00Z",
    created_by: "u-1",
  },
  {
    workspace_id: "w-2",
    title: "Product Dev",
    description: "Workspace for product development and task tracking.",
    created_at: "2025-03-15T10:15:00Z",
    updated_at: "2025-05-02T16:45:00Z",
    created_by: "u-2",
  },
  {
    workspace_id: "w-3",
    title: "Client Projects",
    description: "Manages client-based projects and deliverables.",
    created_at: "2025-04-01T09:30:00Z",
    updated_at: "2025-05-05T12:00:00Z",
    created_by: "u-3",
  },
];

/** 
 * 
The JavaScript file contains 17 arrays of objects, each representing a different data table. Here is the list of arrays:
notifications
documents
users
roles
members
task_assignment
checklist_assignments
calenders
comments
tasks
checklists
labels
boards
gantt_charts
gantt_bars
feedback
workspaces

*/
