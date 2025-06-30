import { Button } from "@/components/ui/button";
import { generateReportByBoardIdAction } from "@/action/report.action";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, AlignmentType, WidthType, BorderStyle, HeadingLevel, TabStopType, TabStopPosition } from 'docx';
import * as XLSX from "xlsx";

const files = [
  {
    name: "zentrio.pdf",
    icon: "https://cdn-icons-png.flaticon.com/128/4726/4726010.png",
  },
  {
    name: "project.doc",
    icon: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
  },
  {
    name: "report.xls",
    icon: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
  },
];

export default function CardBoardReport({ boardId, reports }) {
  const handleGenerate = async () => {
    const { blob, fileName } = await generateReportByBoardIdAction({ boardId });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName || "pdf"; // Fallback filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const generateDocx = async () => {

    const doc = new Document({
      sections: [
        {
          children: [

            new Paragraph({
              children: [
                new TextRun({
                  text: "PROJECT REPORT",
                  bold: true,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 600 },
            }),

            new Paragraph({
              children: [
                new TextRun({ text: "Creation Date: ", bold: true }),
                new TextRun({ text: new Date(reports.creationDate).toISOString().split('T')[0] || "N/A" }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Board Name: ", bold: true }),
                new TextRun({ text: reports.boardData?.title || "N/A" }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Version: ", bold: true }),
                new TextRun({ text: reports.version || "1.0" }),
              ],
              spacing: { after: 400 },
            }),

            new Paragraph({
              children: [new TextRun({ text: "BOARD INFORMATION", bold: true, size: 22 })],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 300 },
            }),

            new Paragraph({
              children: [
                new TextRun({ text: "Title: ", bold: true }),
                new TextRun({ text: reports.boardData?.title || "N/A" }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Description: ", bold: true }),
                new TextRun({ text: reports.boardData?.description || "N/A" }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Created By: ", bold: true }),
                new TextRun({ text: reports.boardData?.createdBy?.username || "N/A" }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Created At: ", bold: true }),
                new TextRun({ text: new Date(reports.boardData?.createdAt).toISOString().split('T')[0] || "N/A" }),
              ],
              spacing: { after: 200 },
            }),
            // new Paragraph({
            //   children: [
            //     new TextRun({ text: "Workspace ID: ", bold: true }),
            //     new TextRun({ text: reports.boardData?.workspaceId || "N/A" }),
            //   ],
            //   spacing: { after: 400 },
            // }),

            new Paragraph({
              children: [new TextRun({ text: "TEAM MEMBERS", bold: true, size: 22 })],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 300 },
            }),

            ...(reports.allMembers && reports.allMembers.length > 0
              ? reports.allMembers.map((member, index) =>
                new Paragraph({
                  children: [
                    new TextRun({ text: `${index + 1}. `, bold: true }),
                    new TextRun({ text: `${member?.roleName}: `, bold: true }),
                    new TextRun({ text: `${member?.total} members` }),
                  ],
                  spacing: { after: 150 },
                })
              )
              : [new Paragraph({
                children: [new TextRun({ text: "No team members data available." })],
                spacing: { after: 200 },
              })]
            ),

            new Paragraph({
              children: [new TextRun({ text: "TASKS SUMMARY", bold: true, size: 22 })],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 300 },
            }),

            ...(reports.groupedTasks && reports.groupedTasks.length > 0
              ? reports.groupedTasks.map((group) =>
                new Paragraph({
                  children: [
                    new TextRun({ text: `${group?.stage}: `, bold: true }),
                    new TextRun({ text: `${group?.count} tasks` }),
                  ],
                  spacing: { after: 150 },
                })
              )
              : [new Paragraph({
                children: [new TextRun({ text: "No tasks data available." })],
                spacing: { after: 200 },
              })]
            ),

            new Paragraph({
              children: [new TextRun({ text: "DETAILED TASKS", bold: true, size: 22 })],
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 300 },
            }),

            ...(reports.groupedTasks && reports.groupedTasks.length > 0
              ? reports.groupedTasks.flatMap((group) => [

                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${group?.stage.toUpperCase()} (${group?.count} tasks)`,
                      bold: true,
                      size: 18,
                      underline: {}
                    })
                  ],
                  spacing: { before: 400, after: 200 },
                }),

                ...(group?.tasks && group?.tasks.length > 0
                  ? group?.tasks.flatMap((task, index) => [
                    new Paragraph({
                      children: [
                        new TextRun({ text: `Task ${index + 1}: `, bold: true }),
                        new TextRun({ text: task?.title || "Untitled Task" }),
                      ],
                      spacing: { before: 200, after: 100 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "   Description: " }),
                        new TextRun({ text: task?.description || "No description provided" }),
                      ],
                      spacing: { after: 100 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "   Status: " }),
                        new TextRun({ text: task?.status || "Unknown" }),
                      ],
                      spacing: { after: 100 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "   Created By: " }),
                        new TextRun({ text: task?.creator?.username || "Unknown" }),
                      ],
                      spacing: { after: 100 },
                    }),

                    ...(task?.teamLeader?.username
                      ? [new Paragraph({
                        children: [
                          new TextRun({ text: "   Team Leader: " }),
                          new TextRun({ text: task?.teamLeader?.username }),
                        ],
                        spacing: { after: 100 },
                      })]
                      : []
                    ),

                    ...(task?.startedAt
                      ? [new Paragraph({
                        children: [
                          new TextRun({ text: "   Started At: " }),
                          new TextRun({ text: new Date(task?.startedAt).toLocaleDateString() }),
                        ],
                        spacing: { after: 100 },
                      })]
                      : []
                    ),

                    ...(task?.finishedAt
                      ? [new Paragraph({
                        children: [
                          new TextRun({ text: "   Finished At: " }),
                          new TextRun({ text: new Date(task?.finishedAt).toLocaleDateString() }),
                        ],
                        spacing: { after: 100 },
                      })]
                      : []
                    ),

                    ...(task?.allChecklists && task?.allChecklists.length > 0
                      ? [
                        new Paragraph({
                          children: [new TextRun({ text: "   Checklists:", bold: true })],
                          spacing: { before: 100, after: 100 },
                        }),
                        ...task?.allChecklists.flatMap((checklist, checkIndex) => [
                          new Paragraph({
                            children: [
                              new TextRun({ text: `      ${checkIndex + 1}. ${checklist?.completed ? "✓" : "○"} ` }),
                              new TextRun({ text: checklist?.title || "Untitled Checklist" }),
                            ],
                            spacing: { after: 50 },
                          }),
                          ...(checklist?.description
                            ? [new Paragraph({
                              children: [
                                new TextRun({ text: `         Description: ${checklist?.description}` }),
                              ],
                              spacing: { after: 50 },
                            })]
                            : []
                          ),
                          ...(checklist?.members && checklist?.members.length > 0
                            ? [new Paragraph({
                              children: [
                                new TextRun({ text: `         Assigned to: ${checklist?.members.map(m => m.username).join(", ")}` }),
                              ],
                              spacing: { after: 50 },
                            })]
                            : []
                          ),
                          ...(checklist?.allComments && checklist?.allComments.length > 0
                            ? [new Paragraph({
                              children: [
                                new TextRun({ text: `         Comments: ${checklist?.allComments.length}` }),
                              ],
                              spacing: { after: 50 },
                            })]
                            : []
                          ),
                        ])
                      ]
                      : []
                    ),

                    ...(index < group?.tasks.length - 1
                      ? [new Paragraph({
                        children: [new TextRun({ text: "   " + "─".repeat(50) })],
                        spacing: { before: 100, after: 100 },
                      })]
                      : []
                    ),
                  ])
                  : [new Paragraph({
                    children: [new TextRun({ text: "   No tasks in this stage." })],
                    spacing: { after: 200 },
                  })]
                ),
              ])
              : [new Paragraph({
                children: [new TextRun({ text: "No tasks data available." })],
                spacing: { after: 200 },
              })]
            ),

            new Paragraph({
              children: [new TextRun({ text: "", size: 24 })],
              spacing: { before: 800, after: 200 },
            }),
          ],
          properties: {
            page: {
              margin: {
                top: 720,
                right: 720,
                bottom: 720,
                left: 720,
              },
            },
          },
        },
      ],
    })
    try {
      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `project-report-${new Date().toISOString().split('T')[0]}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("Document generated successfully!");
    } catch (error) {
      console.error("Error generating document:", error);
    }
  };

  const generateXlsx = async () => {
    // Create structured table data with multiple sheets
    const workbook = XLSX.utils.book_new();

    const tasks = {
      todo: reports?.groupedTasks
        .map(item => item?.tasks?.filter(task => task.stage === "TO DO"))
        .flat()
        .length || 0,

      progress: reports?.groupedTasks
        .map(item => item?.tasks?.filter(task => task.stage === "IN_PROGRESS"))
        .flat()
        .length || 0,

      review: reports?.groupedTasks
        .map(item => item?.tasks?.filter(task => task.stage === "UNDER_REVIEW"))
        .flat()
        .length || 0,

      done: reports?.groupedTasks
        .map(item => item?.tasks?.filter(task => task.stage === "COMPLETED"))
        .flat()
        .length || 0,
    }

    // === MAIN REPORT SHEET ===
    const reportData = [
      ["Field", "Value"],
      ["Creation Date", reports?.creationDate || ""],
      ["Owner", reports?.boardData?.createdBy?.username || ""],
      ["Board Name", reports?.boardName || reports?.boardData?.title || ""],
      ["Board Description", reports?.boardData?.description || ""],
      ["Is Favourite", (reports?.boardData?.isFavourite) ? "Yes" : "No"],
      ["Total Stages", "4"],
      ["Total Tasks", Object.values(tasks).reduce((sum, count) => sum + count, 0) || ""],
      ["Completed Tasks", tasks.done || ""],
    ];

    const reportSheet = XLSX.utils.aoa_to_sheet(reportData);

    // Style the report sheet as a table
    reportSheet['!cols'] = [{ width: 25 }, { width: 40 }];
    reportSheet['!ref'] = 'A1:B8';

    // === TASKS TABLE SHEET ===
    const tasksData = [
      ["Stage", "Task Title", "Status", "Description", "Created Date", "Started Date", "Finished Date", "Creator", "Team Leader", "Checklists Completed", "Checklists Total"]
    ];

    // Process grouped tasks
    const groupedTasks = reports?.groupedTasks || JSON.parse(await window.fs.readFile('reports.txt', { encoding: 'utf8' })).groupedTasks;

    let totalTasks = Object.values(tasks).reduce((sum, count) => sum + count, 0);
    let completedTasks = tasks.done;
    let totalStages = 4;

    if (groupedTasks) {
      totalStages = groupedTasks.length;

      groupedTasks.forEach(stageGroup => {
        if (stageGroup.tasks) {
          stageGroup.tasks.forEach(task => {
            totalTasks++;
            if (task.status === 'Completed' || task.finishedAt) {
              completedTasks++;
            }

            const checklistsCompleted = task.allChecklists ? task.allChecklists.filter(cl => cl.completed).length : 0;
            const checklistsTotal = task.allChecklists ? task.allChecklists.length : 0;

            tasksData.push([
              stageGroup.stage,
              task.title || "",
              task.status || "",
              task.description || "No description",
              task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "",
              task.startedAt ? new Date(task.startedAt).toLocaleDateString() : "",
              task.finishedAt ? new Date(task.finishedAt).toLocaleDateString() : "",
              task.creator?.username || "Unknown",
              task.teamLeader?.username || "",
              checklistsCompleted,
              checklistsTotal
            ]);
          });
        }
      });
    }

    // Update report data with calculated values
    reportData[6][1] = totalStages;
    reportData[7][1] = totalTasks;
    reportData[8][1] = completedTasks;

    const tasksSheet = XLSX.utils.aoa_to_sheet(tasksData);

    // Set column widths for tasks table
    tasksSheet['!cols'] = [
      { width: 15 }, // Stage
      { width: 25 }, // Task Title
      { width: 12 }, // Status
      { width: 35 }, // Description
      { width: 12 }, // Created Date
      { width: 12 }, // Started Date
      { width: 12 }, // Finished Date
      { width: 15 }, // Creator
      { width: 15 }, // Team Leader
      { width: 10 }, // Checklists Completed
      { width: 10 }  // Checklists Total
    ];

    // === CHECKLISTS TABLE SHEET ===
    const checklistsData = [
      ["Stage", "Task Title", "Checklist Item", "Status", "Completed"]
    ];

    if (groupedTasks) {
      groupedTasks.forEach(stageGroup => {
        if (stageGroup.tasks) {
          stageGroup.tasks.forEach(task => {
            if (task.allChecklists && task.allChecklists.length > 0) {
              task.allChecklists.forEach(checklist => {
                checklistsData.push([
                  stageGroup.stage,
                  task.title || "",
                  checklist.title || "",
                  checklist.completed ? "Completed" : "Pending",
                  checklist.completed ? "✓" : "○"
                ]);
              });
            }
          });
        }
      });
    }

    const checklistsSheet = XLSX.utils.aoa_to_sheet(checklistsData);
    checklistsSheet['!cols'] = [
      { width: 15 }, // Stage
      { width: 25 }, // Task Title
      { width: 30 }, // Checklist Item
      { width: 12 }, // Status
      { width: 10 }  // Completed
    ];

    // === TEAM MEMBERS TABLE SHEET ===
    const membersData = [
      ["Role", "Member Count", "Percentage"]
    ];

    const allMembers = reports?.allMembers || JSON.parse(await window.fs.readFile('reports.txt', { encoding: 'utf8' })).allMembers;
    const totalMembers = allMembers ? allMembers.reduce((sum, member) => sum + member.total, 0) : 0;

    if (allMembers && allMembers.length > 0) {
      allMembers.forEach(member => {
        const percentage = totalMembers > 0 ? ((member.total / totalMembers) * 100).toFixed(1) + "%" : "0%";
        membersData.push([
          member.roleName || "",
          member.total || 0,
          percentage
        ]);
      });
    }

    const membersSheet = XLSX.utils.aoa_to_sheet(membersData);
    membersSheet['!cols'] = [
      { width: 20 }, // Role
      { width: 15 }, // Member Count
      { width: 12 }  // Percentage
    ];

    // === STAGE SUMMARY TABLE SHEET ===
    const stageSummaryData = [
      ["Stage Name", "Total Tasks", "Completed Tasks", "Pending Tasks", "Completion Rate"]
    ];

    if (groupedTasks) {
      groupedTasks.forEach(stageGroup => {
        const stageTotal = stageGroup.count || 0;
        const stageCompleted = stageGroup.tasks ?
          stageGroup.tasks.filter(task => task.status === 'Completed' || task.finishedAt).length : 0;
        const stagePending = stageTotal - stageCompleted;
        const completionRate = stageTotal > 0 ? ((stageCompleted / stageTotal) * 100).toFixed(1) + "%" : "0%";

        stageSummaryData.push([
          stageGroup.stage || "",
          stageTotal,
          stageCompleted,
          stagePending,
          completionRate
        ]);
      });
    }

    const stageSummarySheet = XLSX.utils.aoa_to_sheet(stageSummaryData);
    stageSummarySheet['!cols'] = [
      { width: 20 }, // Stage Name
      { width: 12 }, // Total Tasks
      { width: 15 }, // Completed Tasks
      { width: 12 }, // Pending Tasks
      { width: 15 }  // Completion Rate
    ];

    // === APPLY TABLE STYLING ===
    const applyTableStyle = (sheet, dataRange, tableName) => {
      // Set table range
      sheet['!ref'] = dataRange;

      // Add table formatting
      if (!sheet['!tables']) sheet['!tables'] = [];

      const range = XLSX.utils.decode_range(dataRange);

      // Apply header styling
      for (let col = range.s.c; col <= range.e.c; col++) {
        const headerCell = XLSX.utils.encode_cell({ r: 0, c: col });
        if (sheet[headerCell]) {
          sheet[headerCell].s = {
            font: {
              bold: true,
              size: 12,
              color: { rgb: "FFFFFF" },
              name: "Calibri"
            },
            fill: {
              fgColor: { rgb: "4472C4" }
            },
            alignment: {
              horizontal: "center",
              vertical: "center"
            },
            border: {
              top: { style: "thin", color: { rgb: "FFFFFF" } },
              bottom: { style: "thin", color: { rgb: "FFFFFF" } },
              left: { style: "thin", color: { rgb: "FFFFFF" } },
              right: { style: "thin", color: { rgb: "FFFFFF" } }
            }
          };
        }
      }

      // Apply alternating row colors and data styling
      for (let row = 1; row <= range.e.r; row++) {
        const isEvenRow = row % 2 === 0;
        const bgColor = isEvenRow ? "F2F2F2" : "FFFFFF";

        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          if (sheet[cellAddress]) {
            const cellValue = sheet[cellAddress].v;

            let cellStyle = {
              font: {
                size: 11,
                color: { rgb: "333333" },
                name: "Calibri"
              },
              fill: {
                fgColor: { rgb: bgColor }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: true
              },
              border: {
                top: { style: "thin", color: { rgb: "D0D0D0" } },
                bottom: { style: "thin", color: { rgb: "D0D0D0" } },
                left: { style: "thin", color: { rgb: "D0D0D0" } },
                right: { style: "thin", color: { rgb: "D0D0D0" } }
              }
            };

            // Special styling for status cells
            if (typeof cellValue === 'string') {
              if (cellValue === 'Completed' || cellValue === '✓') {
                cellStyle.font.color = { rgb: "006400" };
                cellStyle.font.bold = true;
                cellStyle.fill.fgColor = { rgb: "E8F5E8" };
              } else if (cellValue === 'Pending' || cellValue === '○') {
                cellStyle.font.color = { rgb: "FF8C00" };
                cellStyle.fill.fgColor = { rgb: "FFF8DC" };
              } else if (cellValue === 'In Progress') {
                cellStyle.font.color = { rgb: "0066CC" };
                cellStyle.fill.fgColor = { rgb: "E6F3FF" };
              }
            }

            // Center align numeric and percentage columns
            if (typeof cellValue === 'number' || (typeof cellValue === 'string' && cellValue.includes('%'))) {
              cellStyle.alignment.horizontal = "center";
              cellStyle.font.bold = true;
            }

            sheet[cellAddress].s = cellStyle;
          }
        }
      }

      // Add table definition for Excel
      sheet['!tables'] = [{
        name: tableName,
        ref: dataRange,
        headerRowCount: 1,
        totalsRowCount: 0,
        style: {
          theme: "TableStyleMedium2",
          showFirstColumnStripes: false,
          showLastColumnStripes: false,
          showRowStripes: true,
          showColumnStripes: false
        }
      }];

      // Add autofilter
      sheet['!autofilter'] = { ref: dataRange };
    };

    // Apply table styling to all sheets
    applyTableStyle(reportSheet, 'A1:B8', 'ProjectReport');
    applyTableStyle(tasksSheet, `A1:K${tasksData.length}`, 'TasksTable');
    applyTableStyle(checklistsSheet, `A1:E${checklistsData.length}`, 'ChecklistsTable');
    applyTableStyle(membersSheet, `A1:C${membersData.length}`, 'MembersTable');
    applyTableStyle(stageSummarySheet, `A1:E${stageSummaryData.length}`, 'StageSummaryTable');

    // Add all sheets to workbook
    XLSX.utils.book_append_sheet(workbook, reportSheet, "📊 Project Overview");
    XLSX.utils.book_append_sheet(workbook, tasksSheet, "📋 Tasks Details");
    XLSX.utils.book_append_sheet(workbook, stageSummarySheet, "📈 Stage Summary");
    XLSX.utils.book_append_sheet(workbook, checklistsSheet, "✅ Checklists");
    XLSX.utils.book_append_sheet(workbook, membersSheet, "👥 Team Members");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reports?.boardName || reports?.boardData?.title || 'project'}-report-${reports?.creationDate || new Date().toISOString().split('T')[0]}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };


  return (
    <div className="bg-white text-title text-h6 p-5 border border-gray-200  rounded-large w-full max-w-md">
      <header className="mb-4 text-h6 font-semibold">My Report Board</header>

      <div className="space-y-4">
        {/* File 1 - zentrio.pdf */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4726/4726010.png"
              alt="File Icon"
              width={30}
              height={30}
              className="object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-body-sm">zentrio.pdf</p>
              <button className="text-title/50 text-caption-tiny hover:underline text-left">
                Rename
              </button>
            </div>
          </div>
          <Button
            variant="ghost"
            className={`hover:text-blueActive hover:bg-transparent p-0 text-body-sm`}
            onClick={handleGenerate}
          >
            Generate Now
          </Button>
        </div>

        {/* File 2 - project.doc */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2991/2991108.png"
              alt="File Icon"
              width={30}
              height={30}
              className="object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-body-sm">project.doc</p>
              <button className="text-title/50 text-caption-tiny hover:underline text-left">
                Rename
              </button>
            </div>
          </div>
          <Button
            variant="ghost"
            className={`hover:text-blueActive hover:bg-transparent p-0 text-body-sm`}
            onClick={generateDocx}
          >
            Generate Now
          </Button>
        </div>

        {/* File 3 - report.xls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2504/2504768.png"
              alt="File Icon"
              width={30}
              height={30}
              className="object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="font-medium text-body-sm">report.xls</p>
              <button className="text-title/50 text-caption-tiny hover:underline text-left">
                Rename
              </button>
            </div>
          </div>
          <Button
            variant="ghost"
            className={`hover:text-blueActive hover:bg-transparent p-0 text-body-sm`}
            onClick={generateXlsx}
          >
            Generate Now
          </Button>
        </div>
      </div>
    </div>
  );
}