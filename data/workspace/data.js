// mockWorkspaces.js
export const mockWorkspaces = {
  payload: [
    {
      id: "ws001",
      name: "Design Squad",
      description:
        "Workspace for UI/UX designers collaborating on product design.",
      createdDate: "2024-09-01T10:00:00Z",
      owner: "alice@example.com",
      members: 8,
      isActive: true,
    },
    {
      id: "ws002",
      name: "Dev Team Alpha",
      description: "Frontend and backend devs working on the new app revamp.",
      createdDate: "2024-08-15T15:30:00Z",
      owner: "bob@example.com",
      members: 12,
      isActive: true,
    },
    {
      id: "ws003",
      name: "Marketing Hub",
      description:
        "Campaign planning, content scheduling, and analytics tracking.",
      createdDate: "2024-07-20T09:45:00Z",
      owner: "carol@example.com",
      members: 5,
      isActive: false,
    },
  ],
};
