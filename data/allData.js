//use filed from the database

//notification
const notifications = [
  {
    content: "Task 'Implement Auth' assigned to you.",
    type: "task_assignment",
    is_read: false,
    created_at: "2025-05-15T08:23:00Z",
    task_assignment: "f4c8a7b2-3a5e-41a0-a88e-bd9c41a44d90",
    user_id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
  },
  {
    content: "Deadline for 'Fix bugs in checkout' is tomorrow!",
    type: "reminder",
    is_read: false,
    created_at: "2025-05-14T15:00:00Z",
    task_assignment: "b3e92f4a-88ef-4b94-8db5-f71841e40f1e",
    user_id: "f6e5d4c3-b2a1-0987-cdef-abcdef123456",
  },
  {
    content: "‘Database optimization’ marked complete ✅",
    type: "status_update",
    is_read: true,
    created_at: "2025-05-13T10:12:30Z",
    task_assignment: "9a8b7c6d-5e4f-3a2b-1c0d-b9e8a7f6d5c4",
    user_id: "12345678-abcd-ef00-1234-56789abcdef0",
  },
  {
    content: "New comment on 'Redesign homepage UI'.",
    type: "comment",
    is_read: false,
    created_at: "2025-05-15T11:47:10Z",
    task_assignment: "ee9f0011-2233-4455-8899-aabbccddeeff",
    user_id: "0f1e2d3c-4b5a-6978-9a0b-cdef1234abcd",
  },
  {
    content: "'Sprint Review' moved to next week 📆",
    type: "notification",
    is_read: true,
    created_at: "2025-05-12T09:00:00Z",
    task_assignment: "5d4c3b2a-1f0e-9d8c-7b6a-5e4f3d2c1b0a",
    user_id: "abcd1234-5678-90ef-abcd-ef1234567890",
  },
];

// document
const documents = [
  {
    document_id: "8e3f9e94-95d7-4a92-b1a9-b6e25e59a19c",
    created_at: "2025-05-14T10:25:00Z",
    is_private: true,
    drive_url: "https://drive.google.com/file/d/1abc123456789xyz/view",
    description: "Project plan for Q2 2025 marketing campaign.",
    doc_type: "plan",
    user_id: "d4b0c9d1-12e3-4c56-9a8e-a1b2c3d4e5f6",
    board_id: "f1e2d3c4-b5a6-7890-9a0b-cdef1234abcd",
  },
  {
    document_id: "3b93e4e0-b214-4c63-9376-9e7bb43b6d4e",
    created_at: "2025-05-13T08:10:30Z",
    is_private: true,
    drive_url: "https://drive.google.com/file/d/2def987654321abc/view",
    description: "Design spec for mobile UI revamp.",
    doc_type: "spec",
    user_id: "aabbccdd-0011-2233-4455-66778899aabb",
    board_id: "11223344-5566-7788-99aa-bbccddeeff00",
  },
  {
    document_id: "7f0123ab-45cd-67ef-8901-23456789abcd",
    created_at: "2025-05-12T16:45:00Z",
    is_private: true,
    drive_url: "https://drive.google.com/file/d/3ghi456789012def/view",
    description: "Weekly team meeting notes — confidential 🔒",
    doc_type: "meeting_notes",
    user_id: "deadbeef-cafe-babe-1234-56789abcdef0",
    board_id: "55667788-99aa-bbcc-ddee-ffaabbccdd00",
  },
];

//user
const users = [
  {
    user_id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab",
    username: "plantlover88",
    email: "plantlover88@example.com",
    password: "hashed_pw_1", // obviously hashed irl
    profile_image: "https://example.com/images/user1.png",
    created_at: "2025-05-10T09:00:00Z",
    updated_at: "2025-05-12T14:30:00Z",
    is_verified: false,
    is_reset: false,
  },
  {
    user_id: "b2a5a1cb-4de2-4b8e-b84e-613e5bd96dbe",
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
    user_id: "c3efbe9d-781b-4c2b-85b0-0f9a1e4b9e03",
    username: "bossman420",
    email: "bossman420@example.com",
    password: "hashed_pw_3",
    profile_image: "https://example.com/images/user3.webp",
    created_at: "2025-05-08T16:20:00Z",
    updated_at: "2025-05-13T12:10:00Z",
    is_verified: false,
    is_reset: false,
  },
];

//role
const roles = [
  {
    role_id: "11111111-aaaa-bbbb-cccc-1234567890ab",
    role_name: "PM",
  },
  {
    role_id: "22222222-bbbb-cccc-dddd-2345678901bc",
    role_name: "TL",
  },
  {
    role_id: "33333333-cccc-dddd-eeee-3456789012cd",
    role_name: "M",
  },
];

//member
const members = [
  {
    member_id: "aaa11111-2222-3333-4444-555566667777",
    role_id: "11111111-aaaa-bbbb-cccc-1234567890ab", // PM
    user_id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab", // plantlover88
    board_id: "f1e2d3c4-b5a6-7890-9a0b-cdef1234abcd",
  },
  {
    member_id: "bbb22222-3333-4444-5555-666677778888",
    role_id: "22222222-bbbb-cccc-dddd-2345678901bc", // TL
    user_id: "b2a5a1cb-4de2-4b8e-b84e-613e5bd96dbe", // devqueen22
    board_id: "11223344-5566-7788-99aa-bbccddeeff00",
  },
  {
    member_id: "ccc33333-4444-5555-6666-777788889999",
    role_id: "33333333-cccc-dddd-eeee-3456789012cd", // Member
    user_id: "c3efbe9d-781b-4c2b-85b0-0f9a1e4b9e03", // bossman420
    board_id: "fedcba98-7654-3210-0fed-cba987654321",
  },
];

//task_assign
const task_assignment = [
  {
    task_assign_id: "d1f2c3a4-b5e6-7a89-0abc-1234567890ab",
    assigned_to: "a1b2c3d4-e5f6-7890-abcd-1234567890ab", // plantlover88
    assigned_by: "b2a5a1cb-4de2-4b8e-b84e-613e5bd96dbe", // devqueen22
    task_id: "t0011223-aabb-ccdd-eeff-112233445566",
  },
  {
    task_assign_id: "e2f3d4b5-c6f7-8b90-1bcd-2345678901bc",
    assigned_to: "b2a5a1cb-4de2-4b8e-b84e-613e5bd96dbe", // devqueen22
    assigned_by: "c3efbe9d-781b-4c2b-85b0-0f9a1e4b9e03", // bossman420
    task_id: "t0099887-ffee-ddcc-bbaa-667788990011",
  },
  {
    task_assign_id: "f3g4e5c6-d7g8-9c01-2cde-3456789012cd",
    assigned_to: "c3efbe9d-781b-4c2b-85b0-0f9a1e4b9e03", // bossman420
    assigned_by: "a1b2c3d4-e5f6-7890-abcd-1234567890ab", // plantlover88
    task_id: "t0077665-a1b2-c3d4-e5f6-778899001122",
  },
];

//checklist_assignments for member

const checklist_assignments = [
  {
    checklist_assign_id: "aaa11111-bbbb-cccc-dddd-eeeeffff0001",
    member_id: "aaa11111-2222-3333-4444-555566667777", // member (plantlover88)
    assigned_by: "b2a5a1cb-4de2-4b8e-b84e-613e5bd96dbe", // devqueen22
    checklist_id: "chk001-a1b2-c3d4-e5f6-123456789abc",
  },
  {
    checklist_assign_id: "bbb22222-cccc-dddd-eeee-ffff00001112",
    member_id: "bbb22222-3333-4444-5555-666677778888", // member (devqueen22)
    assigned_by: "c3efbe9d-781b-4c2b-85b0-0f9a1e4b9e03", // bossman420
    checklist_id: "chk002-b2c3-d4e5-f6a7-23456789bcde",
  },
  {
    checklist_assign_id: "ccc33333-dddd-eeee-ffff-000011112223",
    member_id: "ccc33333-4444-5555-6666-777788889999", // member (bossman420)
    assigned_by: "a1b2c3d4-e5f6-7890-abcd-1234567890ab", // plantlover88
    checklist_id: "chk003-c3d4-e5f6-a7b8-3456789cdef0",
  },
];

//calender
const calenders = [
  {
    calender_id: "1111aaaa-bbbb-cccc-dddd-eeeeffff0001",
    noted: "Review frontend layout with team",
    noted_at: "2025-05-01T09:00:00Z",
    till_date: "2025-05-01T11:00:00Z",
    user_id: "a1b2c3d4-e5f6-7890-abcd-1234567890ab", // plantlover88
    task_id: "t0011223-aabb-ccdd-eeff-112233445566",
  },
  {
    calender_id: "2222bbbb-cccc-dddd-eeee-ffff00001112",
    noted: "API deadline & deployment",
    noted_at: "2025-05-05T14:00:00Z",
    till_date: "2025-05-05T17:00:00Z",
    user_id: "b2a5a1cb-4de2-4b8e-b84e-613e5bd96dbe", // devqueen22
    task_id: "t0099887-ffee-ddcc-bbaa-667788990011",
  },
  {
    calender_id: "3333cccc-dddd-eeee-ffff-000011112223",
    noted: "Weekly sync meeting",
    noted_at: "2025-05-08T10:30:00Z",
    till_date: "2025-05-08T12:00:00Z",
    user_id: "c3efbe9d-781b-4c2b-85b0-0f9a1e4b9e03", // bossman420
    task_id: "t0077665-a1b2-c3d4-e5f6-778899001122",
  },
];

// comments

const comments = [
  {
    comment_id: "c1d2e3f4-5678-9abc-def0-1234567890ab",
    content: "This task needs some updates, please review.",
    comment_date: "2025-05-10 14:23",
    checklist_id: "chk001-a1b2-c3d4-e5f6-123456789abc",
    commented_by: "a1b2c3d4-e5f6-7890-abcd-1234567890ab", // plantlover88
  },
  {
    comment_id: "d2e3f4g5-6789-abcd-ef01-2345678901bc",
    content: "Checked and approved the checklist items.",
    comment_date: "2025-05-11 09:45",
    checklist_id: "chk002-b2c3-d4e5-f6a7-23456789bcde",
    commented_by: "b2a5a1cb-4de2-4b8e-b84e-613e5bd96dbe", // devqueen22
  },
  {
    comment_id: "e3f4g5h6-789a-bcde-f012-3456789012cd",
    content: "Let's add a few more checkpoints here.",
    comment_date: "2025-05-12 16:30",
    checklist_id: "chk003-c3d4-e5f6-a7b8-3456789cdef0",
    commented_by: "c3efbe9d-781b-4c2b-85b0-0f9a1e4b9e03", // bossman420
  },
];

//task
const tasks = [
  {
    task_id: "t0011223-aabb-ccdd-eeff-112233445566",
    title: "Design homepage UI",
    description: "Create wireframes and prototypes for the homepage.",
    is_done: false,
    created_at: "2025-04-20T10:15:00Z",
    updated_at: "2025-05-10T13:45:00Z",
    finished_at: null,
    task_order: 1,
    stage: "In Progress",
    board_id: "board1111-aaaa-bbbb-cccc-ddddeeeeffff",
    gantt_bar_id: "gantt1234-aaaa-bbbb-cccc-ddddeeeeffff",
  },
  {
    task_id: "t0099887-ffee-ddcc-bbaa-667788990011",
    title: "API development",
    description: "Develop RESTful APIs for user management.",
    is_done: true,
    created_at: "2025-03-15T09:00:00Z",
    updated_at: "2025-04-25T16:30:00Z",
    finished_at: "2025-04-30T11:00:00Z",
    task_order: 2,
    stage: "Completed",
    board_id: "board1111-aaaa-bbbb-cccc-ddddeeeeffff",
    gantt_bar_id: "gantt5678-aaaa-bbbb-cccc-ddddeeeeffff",
  },
  {
    task_id: "t0077665-a1b2-c3d4-e5f6-778899001122",
    title: "Testing & QA",
    description: "Perform testing and quality assurance on all features.",
    is_done: false,
    created_at: "2025-04-22T14:00:00Z",
    updated_at: "2025-05-12T10:00:00Z",
    finished_at: null,
    task_order: 3,
    stage: "To Do",
    board_id: "board2222-bbbb-cccc-dddd-eeeeffff1111",
    gantt_bar_id: "gantt9012-aaaa-bbbb-cccc-ddddeeeeffff",
  },
];

//checklist

const checklists = [
  {
    checklist_id: "chk001-a1b2-c3d4-e5f6-123456789abc",
    title: "Wireframe homepage sections",
    is_done: false,
    created_at: "2025-04-21T08:00:00Z",
    updated_at: "2025-05-10T12:30:00Z",
    checklist_order: 1,
    started_at: "2025-04-21T09:00:00Z",
    finished_at: null,
    task_id: "t0011223-aabb-ccdd-eeff-112233445566",
  },
  {
    checklist_id: "chk002-b2c3-d4e5-f6a7-23456789bcde",
    title: "Set up API endpoints",
    is_done: true,
    created_at: "2025-03-16T10:30:00Z",
    updated_at: "2025-04-28T15:20:00Z",
    checklist_order: 1,
    started_at: "2025-03-17T09:00:00Z",
    finished_at: "2025-04-27T16:00:00Z",
    task_id: "t0099887-ffee-ddcc-bbaa-667788990011",
  },
  {
    checklist_id: "chk003-c3d4-e5f6-a7b8-3456789cdef0",
    title: "Create test cases",
    is_done: false,
    created_at: "2025-04-23T11:00:00Z",
    updated_at: "2025-05-12T09:00:00Z",
    checklist_order: 1,
    started_at: "2025-04-24T10:00:00Z",
    finished_at: null,
    task_id: "t0077665-a1b2-c3d4-e5f6-778899001122",
  },
];

//label
const labels = [
  {
    label_id: "lbl001-aabb-ccdd-eeff-112233445566",
    label_title: "Urgent",
    label_color: "#FF0000",
    checklist_id: "chk001-a1b2-c3d4-e5f6-123456789abc",
  },
  {
    label_id: "lbl002-bbcc-ddee-ffaa-667788990011",
    label_title: "Review",
    label_color: "#FFA500",
    checklist_id: "chk002-b2c3-d4e5-f6a7-23456789bcde",
  },
  {
    label_id: "lbl003-ccdd-eeff-aabb-778899001122",
    label_title: "Optional",
    label_color: "#00FF00",
    checklist_id: "chk003-c3d4-e5f6-a7b8-3456789cdef0",
  },
];

//board
const boards = [
  {
    board_id: "board1111-aaaa-bbbb-cccc-ddddeeeeffff",
    title: "Marketing Campaign",
    description: "Plan and track all marketing activities for Q3.",
    created_at: "2025-01-10T09:00:00Z",
    updated_at: "2025-05-10T11:00:00Z",
    is_favorite: true,
    is_verified: false,
    workspace_id: "workspace1234-abcd-efgh-ijkl-567890mnopqr",
  },
  {
    board_id: "board2222-bbbb-cccc-dddd-eeeeffff1111",
    title: "Product Launch",
    description:
      "Organize tasks and milestones for the upcoming product launch.",
    created_at: "2025-02-15T14:30:00Z",
    updated_at: "2025-05-12T08:45:00Z",
    is_favorite: false,
    is_verified: true,
    workspace_id: "workspace5678-qrst-uvwx-yzab-123456cdefgh",
  },
  {
    board_id: "board3333-cccc-dddd-eeee-ffff00001111",
    title: "Website Redesign",
    description:
      "Coordinate design and development tasks for the new website layout.",
    created_at: "2025-03-20T16:15:00Z",
    updated_at: "2025-05-08T17:00:00Z",
    is_favorite: false,
    is_verified: false,
    workspace_id: "workspace1234-abcd-efgh-ijkl-567890mnopqr",
  },
];
// gantt chart
const gantt_charts = [
  {
    gantt_chart_id: "gantt1111-aaaa-bbbb-cccc-ddddeeeeffff",
    title: "Q2 Project Timeline",
    created_at: "2025-04-01T08:00:00Z",
    updated_at: "2025-05-10T12:00:00Z",
    board_id: "board1111-aaaa-bbbb-cccc-ddddeeeeffff",
  },
  {
    gantt_chart_id: "gantt2222-bbbb-cccc-dddd-eeeeffff1111",
    title: "Marketing Campaign Schedule",
    created_at: "2025-03-15T09:30:00Z",
    updated_at: "2025-05-08T10:15:00Z",
    board_id: "board2222-bbbb-cccc-dddd-eeeeffff1111",
  },
  {
    gantt_chart_id: "gantt3333-cccc-dddd-eeee-ffff00001111",
    title: "Website Redesign Plan",
    created_at: "2025-04-20T11:45:00Z",
    updated_at: "2025-05-09T14:30:00Z",
    board_id: "board3333-cccc-dddd-eeee-ffff00001111",
  },
];

//gantt bar

const gantt_bars = [
  {
    gantt_bar_id: "ganttbar1111-aaaa-bbbb-cccc-ddddeeeeffff",
    title: "Research Phase",
    started_at: "2025-04-01T09:00:00Z",
    finished_at: "2025-04-10T18:00:00Z",
    gantt_chart_id: "gantt1111-aaaa-bbbb-cccc-ddddeeeeffff",
  },
  {
    gantt_bar_id: "ganttbar2222-bbbb-cccc-dddd-eeeeffff1111",
    title: "Design Phase",
    started_at: "2025-04-11T09:00:00Z",
    finished_at: "2025-04-20T18:00:00Z",
    gantt_chart_id: "gantt1111-aaaa-bbbb-cccc-ddddeeeeffff",
  },
  {
    gantt_bar_id: "ganttbar3333-cccc-dddd-eeee-ffff00001111",
    title: "Development Phase",
    started_at: "2025-04-21T09:00:00Z",
    finished_at: "2025-05-05T18:00:00Z",
    gantt_chart_id: "gantt1111-aaaa-bbbb-cccc-ddddeeeeffff",
  },
];

//feedback
const feedback = [
  {
    feedback_id: "feed1111-aaaa-bbbb-cccc-ddddeeeeffff",
    created_at: "2025-05-01T10:30:00Z",
    comment: "Great job on the initial design. Just tweak the navbar spacing.",
    task_id: "t0011223-aabb-ccdd-eeff-112233445566",
    feedback_by: "user1234-aaaa-bbbb-cccc-ddddeeeeffff",
  },
  {
    feedback_id: "feed2222-bbbb-cccc-dddd-eeeeffff1111",
    created_at: "2025-05-03T15:45:00Z",
    comment: "API response times are fast, but consider better error handling.",
    task_id: "t0099887-ffee-ddcc-bbaa-667788990011",
    feedback_by: "user5678-bbbb-cccc-dddd-eeeeffff1111",
  },
  {
    feedback_id: "feed3333-cccc-dddd-eeee-ffff00001111",
    created_at: "2025-05-05T12:15:00Z",
    comment: "Testing coverage is solid. Add edge cases for user roles.",
    task_id: "t0077665-a1b2-c3d4-e5f6-778899001122",
    feedback_by: "user9012-cccc-dddd-eeee-ffff00001111",
  },
];

//workspace
const workspaces = [
  {
    workspace_id: "ws001-aaaa-bbbb-cccc-ddddeeeeffff",
    title: "Marketing Team",
    description: "Workspace for managing all marketing campaigns and content.",
    created_at: "2025-03-10T08:00:00Z",
    updated_at: "2025-05-01T14:30:00Z",
    created_by: "user1234-aaaa-bbbb-cccc-ddddeeeeffff",
  },
  {
    workspace_id: "ws002-bbbb-cccc-dddd-eeeeffff1111",
    title: "Product Dev",
    description: "Workspace for product development and task tracking.",
    created_at: "2025-03-15T10:15:00Z",
    updated_at: "2025-05-02T16:45:00Z",
    created_by: "user5678-bbbb-cccc-dddd-eeeeffff1111",
  },
  {
    workspace_id: "ws003-cccc-dddd-eeee-ffff00001111",
    title: "Client Projects",
    description: "Manages client-based projects and deliverables.",
    created_at: "2025-04-01T09:30:00Z",
    updated_at: "2025-05-05T12:00:00Z",
    created_by: "user9012-cccc-dddd-eeee-ffff00001111",
  },
];
