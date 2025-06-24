"use client";

import Laptop from "@/assets/intergrating/laptop.png";
import Image from "next/image";
import { getReportAction } from "@/action/report.action";
import { useEffect, useRef, useState } from "react";

export const PDFPreviewer = ({ report }) => {
  const myMonth = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  };

  const myMonthChecklist = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  };

  const task = {
    todo: 0,
    progress: 0,
    review: 0,
    done: 0,
  };

  const checkList = {
    todo: 0,
    progress: 0,
    review: 0,
    done: 0,
  };

  const doneTask = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  };

  report?.payload?.groupedTasks.map((group) => {
    const stage = group?.stage.toUpperCase();
    const count = group?.count || 0;

    const checklistCount = group?.tasks.reduce((acc, task) => {
      return acc + (task.allChecklists.length || 0);
    }, 0);

    switch (stage) {
      case "TO DO":
        task.todo = count;
        checkList.todo = checklistCount;
        break;
      case "IN_PROGRESS":
        task.progress = count;
        checkList.progress = checklistCount;
        break;
      case "UNDER_REVIEW":
        task.review = count;
        checkList.review = checklistCount;
        break;
      case "COMPLETED":
        task.done = count;
        checkList.done = checklistCount;
        break;
      default:
        console.log("Unknown stage:", stage);
        break;
    }
  });

  const reportVersion = report?.payload?.version;

  report?.payload?.groupedTasks.map((allTasks) => {
    const filterMonth = allTasks?.tasks.map((item) =>
      new Date(item.finishedAt).getMonth()
    );
    const stage = allTasks?.stage;

    if (filterMonth.includes(0)) {
      if (stage === "COMPLETED") {
        doneTask.january = doneTask.january + allTasks?.count;
      }
      myMonth.january = myMonth.january + allTasks?.count;
      myMonthChecklist.january += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(1)) {
      if (stage === "COMPLETED") {
        doneTask.february = doneTask.february + allTasks?.count;
      }
      myMonth.february = myMonth.february + allTasks?.count;
      myMonthChecklist.february += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(2)) {
      if (stage === "COMPLETED") {
        doneTask.march = doneTask.march + allTasks?.count;
      }
      myMonth.march = myMonth.march + allTasks?.count;
      myMonthChecklist.march += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(3)) {
      if (stage === "COMPLETED") {
        doneTask.april = doneTask.april + allTasks?.count;
      }
      myMonth.april = myMonth.april + allTasks?.count;
      myMonthChecklist.april += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(4)) {
      if (stage === "COMPLETED") {
        doneTask.may = doneTask.may + allTasks?.count;
      }
      myMonth.may = myMonth.may + allTasks?.count;
      myMonthChecklist.may += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(5)) {
      if (stage === "COMPLETED") {
        doneTask.june = doneTask.june + allTasks?.count;
      }
      myMonth.june = myMonth.june + allTasks?.count;
      myMonthChecklist.june += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(6)) {
      if (stage === "COMPLETED") {
        doneTask.july = doneTask.july + allTasks?.count;
      }
      myMonth.july = myMonth.july + allTasks?.count;
      myMonthChecklist.july += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(7)) {
      if (stage === "COMPLETED") {
        doneTask.august = doneTask.august + allTasks?.count;
      }
      myMonth.august = myMonth.august + allTasks?.count;
      myMonthChecklist.august += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(8)) {
      if (stage === "COMPLETED") {
        doneTask.september = doneTask.september + allTasks?.count;
      }
      myMonth.september = myMonth.september + allTasks?.count;
      myMonthChecklist.september += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(9)) {
      if (stage === "COMPLETED") {
        doneTask.october = doneTask.october + allTasks?.count;
      }
      myMonth.october = myMonth.october + allTasks?.count;
      myMonthChecklist.october += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(10)) {
      if (stage === "COMPLETED") {
        doneTask.november = doneTask.november + allTasks?.count;
      }
      myMonth.november = myMonth.november + allTasks?.count;
      myMonthChecklist.november += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    } else if (filterMonth.includes(11)) {
      if (stage === "COMPLETED") {
        doneTask.december = doneTask.december + allTasks?.count;
      }
      myMonth.december = myMonth.december + allTasks?.count;
      myMonthChecklist.december += allTasks?.tasks.reduce(
        (sum, value) => sum + (value?.allChecklists?.length || 0),
        0
      );
    }
  });

  const totalChecklists = Object.values(myMonthChecklist).reduce(
    (sum, value) => sum + value,
    0
  );

  const totalTasks = Object.values(myMonth).reduce(
    (sum, value) => sum + value,
    0
  );

  console.log("Task: ", totalTasks);

  const taskData = [
    {
      month: "January",
      tasks: myMonth.january,
      subtasks: myMonthChecklist.january,
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
      completed: (doneTask.january / totalTasks) * 100 + "%",
    },
    {
      month: "February",
      tasks: myMonth.february,
      subtasks: myMonthChecklist.february,
      completed: (doneTask.february / totalTasks) * 100 + "%",
    },
    {
      month: "March",
      tasks: myMonth.march,
      subtasks: myMonthChecklist.march,
      completed: (doneTask.march / totalTasks) * 100 + "%",
    },
    {
      month: "April",
      tasks: myMonth.april,
      subtasks: myMonthChecklist.april,
      completed: (doneTask.april / totalTasks) * 100 + "%",
    },
    {
      month: "May",
      tasks: myMonth.may,
      subtasks: myMonthChecklist.may,
      completed: (doneTask.may / totalTasks) * 100 + "%",
    },
    {
      month: "June",
      tasks: myMonth.june,
      subtasks: myMonthChecklist.june,
      completed: (doneTask.june / totalTasks) * 100 + "%",
    },
    {
      month: "July",
      tasks: myMonth.july,
      subtasks: myMonthChecklist.july,
      completed: (doneTask.july / totalTasks) * 100 + "%",
    },
    {
      month: "August",
      tasks: myMonth.august,
      subtasks: myMonthChecklist.august,
      completed: (doneTask.august / totalTasks) * 100 + "%",
    },
    {
      month: "September",
      tasks: myMonth.september,
      subtasks: myMonthChecklist.september,
      completed: (doneTask.september / totalTasks) * 100 + "%",
    },
    {
      month: "October",
      tasks: myMonth.october,
      subtasks: myMonthChecklist.october,
      completed: (doneTask.october / totalTasks) * 100 + "%",
    },
    {
      month: "November",
      tasks: myMonth.november,
      subtasks: myMonthChecklist.november,
      completed: (doneTask.november / totalTasks) * 100 + "%",
    },
    {
      month: "December",
      tasks: myMonth.december,
      subtasks: myMonthChecklist.december,
      completed: (doneTask.december / totalTasks) * 100 + "%",
    },
  ];

  const flattenReportData = (report) => {
    const flattened = [];

    report?.payload?.groupedTasks?.forEach((group) => {
      group?.tasks?.forEach((task) => {
        task?.allChecklists?.forEach((checklist) => {
          checklist?.members?.forEach((member) => {
            flattened.push({
              stage: group.stage,
              taskId: task.taskId,
              taskTitle: task.title,
              taskDescription: task.description,
              checklistId: checklist.checklistId,
              checklistTitle: checklist.title,
              checklistDescription: checklist.description,
              member: member,
              attachments: checklist.attachment,
              comments: checklist.allComments,
              startDate: checklist.startedAt,
              endDate: checklist.finishedAt,
              status: checklist.status,
            });
          });
        });
      });
    });

    return flattened;
  };

  const flatData = flattenReportData(report);

  console.log("Report: ", flattenReportData(report));

  const [scale, setScale] = useState(1);
  const zoomRef = useRef(null);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  const scrollRef = useRef(null);
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Update current page on scroll
  useEffect(() => {
    const container = scrollRef.current;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const pageWidth = container.clientWidth;
      const page = Math.round(scrollLeft / pageWidth) + 1;
      setCurrentPage(page);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to next/previous page
  const scrollToPage = (pageNumber) => {
    const container = scrollRef.current;
    const pageWidth = container.clientWidth;
    container.scrollTo({
      left: pageWidth * (pageNumber - 1),
      behavior: "smooth",
    });
  };

  const [isSelected, setIsSelected] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
  });

  const selectOnly = (itemKey) => {
    setIsSelected({
      item1: false,
      item2: false,
      item3: false,
      item4: false,
      item5: false,
      [itemKey]: true,
    });
  };

  return (
    <>
      <div className="w-full h-screen overflow-y-hidden">
        {/* this header */}
        <div className="h-[5%] bg-[#323639] flex items-center px-[2.5%] justify-between">
          <div className="text-h5 text-white">
            <p className="font-medium">Report v1</p>
          </div>
          <div className="flex w-[437px] justify-center">
            <div className="flex items-center w-28 justify-evenly text-white text-body-sm pr-4">
              <p className="w-6 h-6 bg-black flex justify-center items-center">
                {currentPage}
              </p>
              <p>/</p>
              <p>{totalPages}</p>
            </div>
            <div className="flex items-center text-white justify-evenly w-40 h-7 pl-3 border-l border-gray-100/50">
              <div
                onClick={zoomOut}
                className="w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-black"
              >
                <p className="text-h2 select-none">-</p>
              </div>
              <p className="text-body-sm h-6 w-14 flex justify-center items-center bg-black">
                {(scale * 100).toFixed(0)}%
              </p>
              <div
                onClick={zoomIn}
                className="w-8 h-8 hover:bg-black flex items-center cursor-pointer justify-center"
              >
                <p className="text-h2 select-none">+</p>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 hover:bg-black flex justify-center items-center cursor-pointer">
            
          </div>
        </div>

        {/* this body */}
        <div className="w-full h-[95%] flex relative">
          {/* this pdf sidebar */}
          <div className="absolute top-0 left-0 h-full w-[15%] overflow-y-scroll scrollbar-hide overflow-x-hidden z-10">
            <div className="bg-title">
              <div className="py-[10%]">
                <div onClick={() => selectOnly("item1")} className={`h-[250px] relative`}>
                  {/* <!-- Cover --> */}
                <div
                  className={`absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%] ${isSelected.item1 ? "border-3 border-blue-500" : "border-none"}`}
                  style={{
                    backgroundColor: "#D6DEE1",
                    width: "595px",
                    height: "842px",
                  }}
                >
                  {/* <!-- Inner Container --> */}
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {/* <!-- SVG Background --> */}
                    <div style={{ position: "absolute", bottom: 0 }}>
                      <svg
                        width={595}
                        height={768}
                        viewBox="0 0 595 768"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M704.998 727.386L-24.5553 1092.03L-113.858 1.22405L704.998 727.386Z"
                          fill="url(#paint0_linear_3611_140066)"
                          fillOpacity="0.5"
                          stroke="#787486"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3611_140066"
                            x1="-728.031"
                            y1="200.198"
                            x2="1405.8"
                            y2="486.145"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop
                              offset="0.4499"
                              stopColor="#9BDBFD"
                              stopOpacity="0.3"
                            />
                            <stop offset="0.925752" stopColor="white" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* <!-- Report Frame --> */}
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "7.5%",
                        justifyContent: "center",
                        width: "512px",
                        height: "762px",
                        border: "2px solid white",
                        position: "absolute",
                      }}
                    >
                      {/* <!-- Report Content --> */}
                      <div
                        style={{
                          width: "404px",
                          height: "633px",
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                          paddingTop: "15%",
                          position: "relative",
                        }}
                      >
                        {/* <!-- Gradient Background --> */}
                        <div
                          style={{
                            width: "263px",
                            height: "465px",
                            background:
                              "linear-gradient(to bottom left, rgba(186, 230, 253, 0.15), rgba(186, 230, 253, 0.15))",
                          }}
                        ></div>

                        {/* <!-- Report Title --> */}
                        <p
                          style={{
                            position: "absolute",
                            top: "20%",
                            fontSize: "24px",
                            lineHeight: "32px",
                            width: "150px",
                            left: "3%",
                            textAlign: "right",
                            color: "#143a47",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            Report from zentrio board
                          </span>
                        </p>

                        {/* <!-- Company Section --> */}
                        <div
                          style={{
                            position: "absolute",
                            height: "95px",
                            right: 0,
                            bottom: "40%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              backgroundColor: "black",
                              color: "white",
                              padding: "12px 13px",
                              fontWeight: "bold",
                            }}
                          >
                            [COMPANY LETTERHEAD WITH LOGO]
                          </p>
                          <div
                            style={{
                              width: "100%",
                              height: "42px",
                              paddingLeft: "20%",
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "column",
                            }}
                          >
                            <p style={{ fontSize: "12px" }}>[Company Name]</p>
                            <p style={{ fontSize: "12px" }}>
                              [Insert Contact Detail]
                            </p>
                          </div>
                        </div>

                        {/* <!-- Bottom Section --> */}
                        <div
                          style={{
                            position: "absolute",
                            backgroundColor: "white",
                            width: "285px",
                            bottom: 0,
                            right: 0,
                            color: "#143a47",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            paddingTop: "2%",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "56px",
                              paddingLeft: "3%",
                            }}
                          >
                            <p style={{ fontSize: "15px" }}>
                              <span style={{ fontWeight: "bold" }}>
                                Prepared by:
                              </span>
                            </p>
                            <p style={{ fontSize: "15px" }}>
                              {report?.payload?.boardData?.createdBy?.gender ===
                              "MALE"
                                ? `Mr. ${report?.payload?.boardData?.createdBy?.username}`
                                : `Ms. ${report?.payload?.boardData?.createdBy?.username}`}
                            </p>
                          </div>
                          <div style={{ paddingLeft: "3%" }}>
                            <p style={{ fontSize: "12px", height: "48px" }}>
                              Any inquiries with respect to this report may be
                              directed to:
                            </p>
                            <p style={{ fontSize: "12px", height: "42px" }}>
                              [Insert Name]
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div onClick={() => selectOnly("item2")} className={`h-[250px] my-5 relative`}>
                  {/* <!-- Page 1 --> */}
                <div
                  className={`absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%] ${isSelected.item2 ? `border-3 border-blue-500` : `border-none`}`}
                  style={{
                    width: "595px",
                    height: "842px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      backgroundColor: "#59BAD5",
                      width: "199px",
                      height: "40px",
                      borderTopRightRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      color: "white",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Reports</span>
                  </p>

                  <div
                    style={{
                      width: "100%",
                      height: "20%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        height: "auto",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                    >
                      <table
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontSize: "12px",
                        }}
                      >
                        <thead
                          style={{
                            height: "28px",
                            backgroundColor: "#59BAD5",
                          }}
                        >
                          <tr>
                            <td style={{ width: "120px" }}>
                              <span className="text-white">Board Name</span>
                            </td>
                            <td
                              style={{ width: "120px" }}
                              className="border-x-1 border-black"
                            >
                              <span className="text-white">Task</span>
                            </td>
                            <td
                              style={{ width: "120px" }}
                              className="border-r border-black"
                            >
                              <span className="text-white">Version</span>
                            </td>
                            <td style={{ width: "120px" }}>
                              <span className="text-white">Date</span>
                            </td>
                          </tr>
                        </thead>
                        <tbody style={{ height: "40px" }}>
                          <tr style={{ borderTop: "1px solid black" }}>
                            <td>{report?.payload?.boardData?.title}</td>
                            <td className="border-x-1 border-black">
                              {totalTasks}
                            </td>
                            <td className="border-r border-black">
                              {report?.payload?.version}
                            </td>
                            <td>{report?.payload?.creationDate}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        width: "80%",
                        height: "25%",
                        display: "flex",
                        alignItems: "flex-end",
                        fontSize: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "16px",
                          background:
                            "linear-gradient(to right, #59BAD5, #ABAAFF, #59BAD5)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                        }}
                      >
                        I.&nbsp;&nbsp;Gantt Bar in
                        <span style={{ color: "transparent" }}>
                          &nbsp;{report?.payload?.boardData?.title}
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "75%",
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          height: "80%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            height: "100%",
                            paddingBottom: "5%",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "purple",
                              width: "180px",
                              height: "115px",
                            }}
                          ></div>
                        </div>
                        {/* <!-- image --> */}
                        <div
                          className="img"
                          style={{ position: "absolute", translate: "10%" }}
                        >
                          <Image
                            src={Laptop}
                            alt=""
                            className="w-[80%] h-[80%]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "40%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        height: "10%",
                        display: "flex",
                        alignItems: "flex-end",
                        fontSize: "16px",
                      }}
                    >
                      <p style={{ fontSize: "16px" }}>
                        II.&nbsp;&nbsp;Stages Information
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        width: "72.5%",
                        paddingTop: "2.5%",
                      }}
                    >
                      This section provides a structured overview of the
                      project's workflow distribution across four stages: To Do,
                      Progress, Under Review, and Completed.
                    </p>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "white",
                        paddingTop: "5%",
                      }}
                    >
                      <div
                        style={{
                          border: "1px solid black",
                          borderRadius: "5px",
                          width: "65%",
                        }}
                      >
                        <table
                          style={{
                            fontSize: "12px",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <thead
                            style={{
                              color: "white",
                              backgroundColor: "#59BAD5",
                              height: "26px",
                            }}
                          >
                            <tr style={{ borderBottom: "1px solid black" }}>
                              <td
                                style={{
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Stage
                              </td>
                              <td
                                style={{
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Tasks
                              </td>
                              <td style={{ paddingLeft: "27px" }}>
                                Checklists
                              </td>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: "white" }}>
                            <tr
                              style={{
                                borderBottom: "1px solid black",
                                height: "32px",
                              }}
                            >
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                To Do
                              </td>
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                {task.todo} tasks
                              </td>
                              <td
                                style={{ width: "143px", paddingLeft: "27px" }}
                              >
                                {checkList.todo} checklists
                              </td>
                            </tr>
                            <tr
                              style={{
                                borderBottom: "1px solid black",
                                height: "32px",
                              }}
                            >
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Progress
                              </td>
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                {task.progress} tasks
                              </td>
                              <td
                                style={{ width: "143px", paddingLeft: "27px" }}
                              >
                                {checkList.progress} checklists
                              </td>
                            </tr>
                            <tr
                              style={{
                                borderBottom: "1px solid black",
                                height: "32px",
                              }}
                            >
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Under Review
                              </td>
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                {task.review} tasks
                              </td>
                              <td
                                style={{ width: "143px", paddingLeft: "27px" }}
                              >
                                {checkList.review} checklists
                              </td>
                            </tr>
                            <tr
                              style={{
                                borderBottom: "1px solid black",
                                height: "32px",
                              }}
                            >
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Completed
                              </td>
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                {task.done} tasks
                              </td>
                              <td
                                style={{ width: "143px", paddingLeft: "27px" }}
                              >
                                {checkList.done} checklists
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      height: "4.5%",
                      fontSize: "12px",
                    }}
                  >
                    page 1
                  </p>
                </div>
                </div>
                <div onClick={() => selectOnly("item3")} className={`h-[250px] relative`}>
                  {/* <!-- Page 2 --> */}
                <div
                  className={`absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%] ${isSelected.item3 ? `border-3 border-blue-500` : `border-none`}`}
                  style={{
                    width: "595px",
                    height: "842px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      width: "199px",
                      backgroundColor: "#59BAD5",
                      height: "40px",
                      borderTopRightRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      color: "white",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Reports</span>
                  </p>

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "10%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>III.&nbsp;&nbsp;To Do Information</p>
                        <div>
                          <div>
                            <div style={{ paddingTop: "5%" }}>
                              <div
                                style={{
                                  border: "1px solid black",
                                  borderRadius: "5px",
                                }}
                              >
                                <table
                                  style={{ width: "100%", fontSize: "12px" }}
                                >
                                  <thead
                                    style={{
                                      color: "white",
                                      backgroundColor: "#59BAD5",
                                    }}
                                  >
                                    <tr style={{ height: "26px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Task Title
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Lead
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        Subtask Count
                                      </td>
                                    </tr>
                                  </thead>
                                  <tbody style={{ backgroundColor: "white" }}>
                                    {report?.payload?.groupedTasks
                                      .filter(
                                        (value) => value?.stage == "TO DO"
                                      )
                                      .map((item) =>
                                        item?.tasks?.map((value, index) => (
                                          <tr
                                            key={index}
                                            style={{
                                              height: "32px",
                                              borderTop: "1px solid black",
                                            }}
                                          >
                                            <td
                                              style={{
                                                paddingLeft: "27px",
                                                borderRight: "1px solid black",
                                              }}
                                            >
                                              {value?.title}
                                            </td>
                                            <td
                                              style={{
                                                paddingLeft: "27px",
                                                borderRight: "1px solid black",
                                              }}
                                            >
                                              {value?.teamLeader}
                                            </td>
                                            <td style={{ paddingLeft: "27px" }}>
                                              {value?.allChecklists.length}
                                            </td>
                                          </tr>
                                        ))
                                      )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        padding: "5% 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>IV.&nbsp;&nbsp;Under Review information</p>
                        <div>
                          <div style={{ paddingTop: "5%" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRadius: "5px",
                              }}
                            >
                              <table
                                style={{ width: "100%", fontSize: "12px" }}
                              >
                                <thead
                                  style={{
                                    color: "white",
                                    backgroundColor: "#59BAD5",
                                  }}
                                >
                                  <tr style={{ height: "26px" }}>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Task Title
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Lead
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      Subtask Count
                                    </td>
                                  </tr>
                                </thead>
                                <tbody style={{ backgroundColor: "white" }}>
                                  {report?.payload?.groupedTasks
                                    .filter(
                                      (value) => value?.stage == "UNDER_REVIEW"
                                    )
                                    .map((item) =>
                                      item?.tasks?.map((value, index) => (
                                        <tr
                                          key={index}
                                          style={{
                                            height: "32px",
                                            borderTop: "1px solid black",
                                          }}
                                        >
                                          <td
                                            style={{
                                              paddingLeft: "27px",
                                              borderRight: "1px solid black",
                                            }}
                                          >
                                            {value?.title}
                                          </td>
                                          <td
                                            style={{
                                              paddingLeft: "27px",
                                              borderRight: "1px solid black",
                                            }}
                                          >
                                            {value?.teamLeader}
                                          </td>
                                          <td style={{ paddingLeft: "27px" }}>
                                            {value?.allChecklists.length}
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>V.&nbsp;&nbsp;Progress information</p>
                        <div>
                          <div style={{ paddingTop: "5%" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRadius: "5px",
                              }}
                            >
                              <table
                                style={{ width: "100%", fontSize: "12px" }}
                              >
                                <thead
                                  style={{
                                    color: "white",
                                    backgroundColor: "#59BAD5",
                                  }}
                                >
                                  <tr style={{ height: "26px" }}>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Task Title
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Lead
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      Subtask Count
                                    </td>
                                  </tr>
                                </thead>
                                <tbody style={{ backgroundColor: "white" }}>
                                  {report?.payload?.groupedTasks
                                    .filter(
                                      (value) => value?.stage == "IN_PROGRESS"
                                    )
                                    .map((item) =>
                                      item?.tasks?.map((value, index) => (
                                        <tr
                                          key={index}
                                          style={{
                                            height: "32px",
                                            borderTop: "1px solid black",
                                          }}
                                        >
                                          <td
                                            style={{
                                              paddingLeft: "27px",
                                              borderRight: "1px solid black",
                                            }}
                                          >
                                            {value?.title}
                                          </td>
                                          <td
                                            style={{
                                              paddingLeft: "27px",
                                              borderRight: "1px solid black",
                                            }}
                                          >
                                            {value?.teamLeader}
                                          </td>
                                          <td style={{ paddingLeft: "27px" }}>
                                            {value?.allChecklists.length}
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      height: "4.5%",
                      fontSize: "12px",
                    }}
                  >
                    page 2
                  </p>
                </div>
                </div>
                <div onClick={() => selectOnly("item4")} className={`h-[250px] my-5 relative`}>
                  {/* <!-- Page 3 --> */}
                <div
                  className={`absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%] ${isSelected.item4 ? `border-3 border-blue-500` : `border-none`}`}
                  style={{
                    width: "595px",
                    height: "842px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      backgroundColor: "#59BAD5",
                      width: "199px",
                      height: "40px",
                      borderTopRightRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      color: "white",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Reports</span>
                  </p>

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "10%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>VI.&nbsp;&nbsp;Stage : Done</p>
                        <div>
                          <div>
                            <div style={{ paddingTop: "5%" }}>
                              <div
                                style={{
                                  border: "1px solid black",
                                  borderRadius: "5px",
                                }}
                              >
                                <table
                                  style={{ width: "100%", fontSize: "12px" }}
                                >
                                  <thead
                                    style={{
                                      color: "white",
                                      backgroundColor: "#59BAD5",
                                    }}
                                  >
                                    <tr style={{ height: "26px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Task Title
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Lead
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        Subtask Count
                                      </td>
                                    </tr>
                                  </thead>
                                  <tbody style={{ backgroundColor: "white" }}>
                                    {report?.payload?.groupedTasks
                                      .filter(
                                        (value) => value?.stage == "COMPLETED"
                                      )
                                      .map((item) =>
                                        item?.tasks?.map((value, index) => (
                                          <tr
                                            key={index}
                                            style={{
                                              height: "32px",
                                              borderTop: "1px solid black",
                                            }}
                                          >
                                            <td
                                              style={{
                                                paddingLeft: "27px",
                                                borderRight: "1px solid black",
                                              }}
                                            >
                                              {value?.title}
                                            </td>
                                            <td
                                              style={{
                                                paddingLeft: "27px",
                                                borderRight: "1px solid black",
                                              }}
                                            >
                                              {value?.teamLeader}
                                            </td>
                                            <td style={{ paddingLeft: "27px" }}>
                                              {value?.allChecklists.length}
                                            </td>
                                          </tr>
                                        ))
                                      )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        padding: "5% 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>VII.&nbsp;&nbsp;Subtasks</p>
                        <div>
                          {flatData.map((item, index) => (
                            <div key={index} style={{ paddingTop: "5%" }}>
                              <div
                                style={{
                                  border: "1px solid black",
                                  borderRadius: "5px",
                                }}
                              >
                                <table
                                  style={{ width: "100%", fontSize: "12px" }}
                                >
                                  <tbody style={{ backgroundColor: "white" }}>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Task Title
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.taskTitle}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Subtask Title
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.checklistTitle}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Member
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.member?.username}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Comments
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.comments?.length || 0} comment
                                        {item.comments?.length !== 1 ? "s" : ""}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Start Date
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.startDate
                                          ? new Date(
                                              item.startDate
                                            ).toLocaleDateString()
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr style={{ height: "32px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        End Date
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.endDate
                                          ? new Date(
                                              item.endDate
                                            ).toLocaleDateString()
                                          : "N/A"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      height: "4.5%",
                      fontSize: "12px",
                    }}
                  >
                    page 3
                  </p>
                </div>
                </div>
                <div onClick={() => selectOnly("item5")} className={`h-[250px] relative`}>
                  {/* <!-- Page 4 --> */}
                <div
                  className={`absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%] ${isSelected.item5 ? `border-3 border-blue-500` : `border-none`}`}
                  style={{
                    width: "595px",
                    height: "842px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#59BAD5",
                      width: "199px",
                      height: "40px",
                      borderTopRightRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      color: "white",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Reports</span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "10%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>VIII.&nbsp;&nbsp;Monthly Task Information</p>

                        <div style={{ paddingTop: "5%" }}>
                          <div
                            style={{
                              border: "1px solid black",
                              borderRadius: "5px",
                            }}
                          >
                            <table
                              style={{
                                width: "100%",
                                fontSize: "12px",
                                borderCollapse: "collapse",
                              }}
                            >
                              <thead
                                style={{
                                  color: "white",
                                  backgroundColor: "#59BAD5",
                                  fontSize: "11px",
                                }}
                              >
                                <tr style={{ height: "32px" }}>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Month
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Task
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Subtask
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Completed
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Version
                                  </td>
                                </tr>
                              </thead>
                              <tbody style={{ backgroundColor: "white" }}>
                                {taskData.map((row, index) => (
                                  <tr
                                    key={index}
                                    style={{
                                      height: "32px",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    <td
                                      style={{
                                        paddingLeft: "16px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      {row.month}
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "16px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      {row.tasks}
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "16px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      {row.subtasks}
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "16px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      {row.completed}
                                    </td>
                                    <td style={{ paddingLeft: "16px" }}>
                                      v{reportVersion}
                                    </td>
                                  </tr>
                                ))}
                                <tr style={{ height: "32px" }}>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Total
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {totalTasks}
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {totalChecklists}
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {Object.values(doneTask).reduce(
                                      (sum, value) => sum + value,
                                      0
                                    )}
                                    % avg
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    v{reportVersion}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      height: "4.5%",
                      fontSize: "12px",
                    }}
                  >
                    page 4
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* this pdf display */}
          <div className="h-auto w-full flex justify-center pt-[2.5%] overflow-y-scroll scrollbar-hide bg-[#D3D3D3]">
            <div
              ref={zoomRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <div
                className="flex flex-col justiify-center gap-20"
                ref={scrollRef}
              >
                {/* <!-- Cover --> */}
                <div
                  style={{
                    backgroundColor: "#D6DEE1",
                    width: "595px",
                    height: "842px",
                  }}
                >
                  {/* <!-- Inner Container --> */}
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {/* <!-- SVG Background --> */}
                    <div style={{ position: "absolute", bottom: 0 }}>
                      <svg
                        width={595}
                        height={768}
                        viewBox="0 0 595 768"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M704.998 727.386L-24.5553 1092.03L-113.858 1.22405L704.998 727.386Z"
                          fill="url(#paint0_linear_3611_140066)"
                          fillOpacity="0.5"
                          stroke="#787486"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_3611_140066"
                            x1="-728.031"
                            y1="200.198"
                            x2="1405.8"
                            y2="486.145"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop
                              offset="0.4499"
                              stopColor="#9BDBFD"
                              stopOpacity="0.3"
                            />
                            <stop offset="0.925752" stopColor="white" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* <!-- Report Frame --> */}
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "7.5%",
                        justifyContent: "center",
                        width: "512px",
                        height: "762px",
                        border: "2px solid white",
                        position: "absolute",
                      }}
                    >
                      {/* <!-- Report Content --> */}
                      <div
                        style={{
                          width: "404px",
                          height: "633px",
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                          paddingTop: "15%",
                          position: "relative",
                        }}
                      >
                        {/* <!-- Gradient Background --> */}
                        <div
                          style={{
                            width: "263px",
                            height: "465px",
                            background:
                              "linear-gradient(to bottom left, rgba(186, 230, 253, 0.15), rgba(186, 230, 253, 0.15))",
                          }}
                        ></div>

                        {/* <!-- Report Title --> */}
                        <p
                          style={{
                            position: "absolute",
                            top: "20%",
                            fontSize: "24px",
                            lineHeight: "32px",
                            width: "150px",
                            left: "3%",
                            textAlign: "right",
                            color: "#143a47",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            Report from zentrio board
                          </span>
                        </p>

                        {/* <!-- Company Section --> */}
                        <div
                          style={{
                            position: "absolute",
                            height: "95px",
                            right: 0,
                            bottom: "40%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              backgroundColor: "black",
                              color: "white",
                              padding: "12px 13px",
                              fontWeight: "bold",
                            }}
                          >
                            [COMPANY LETTERHEAD WITH LOGO]
                          </p>
                          <div
                            style={{
                              width: "100%",
                              height: "42px",
                              paddingLeft: "20%",
                              display: "flex",
                              justifyContent: "space-between",
                              flexDirection: "column",
                            }}
                          >
                            <p style={{ fontSize: "12px" }}>[Company Name]</p>
                            <p style={{ fontSize: "12px" }}>
                              [Insert Contact Detail]
                            </p>
                          </div>
                        </div>

                        {/* <!-- Bottom Section --> */}
                        <div
                          style={{
                            position: "absolute",
                            backgroundColor: "white",
                            width: "285px",
                            bottom: 0,
                            right: 0,
                            color: "#143a47",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            paddingTop: "2%",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "56px",
                              paddingLeft: "3%",
                            }}
                          >
                            <p style={{ fontSize: "15px" }}>
                              <span style={{ fontWeight: "bold" }}>
                                Prepared by:
                              </span>
                            </p>
                            <p style={{ fontSize: "15px" }}>
                              {report?.payload?.boardData?.createdBy?.gender ===
                              "MALE"
                                ? `Mr. ${report?.payload?.boardData?.createdBy?.username}`
                                : `Ms. ${report?.payload?.boardData?.createdBy?.username}`}
                            </p>
                          </div>
                          <div style={{ paddingLeft: "3%" }}>
                            <p style={{ fontSize: "12px", height: "48px" }}>
                              Any inquiries with respect to this report may be
                              directed to:
                            </p>
                            <p style={{ fontSize: "12px", height: "42px" }}>
                              [Insert Name]
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Page 1 --> */}
                <div
                  style={{
                    width: "595px",
                    height: "842px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      backgroundColor: "#59BAD5",
                      width: "199px",
                      height: "40px",
                      borderTopRightRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      color: "white",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Reports</span>
                  </p>

                  <div
                    style={{
                      width: "100%",
                      height: "20%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        height: "auto",
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                    >
                      <table
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontSize: "12px",
                        }}
                      >
                        <thead
                          style={{
                            height: "28px",
                            backgroundColor: "#59BAD5",
                          }}
                        >
                          <tr>
                            <td style={{ width: "120px" }}>
                              <span className="text-white">Board Name</span>
                            </td>
                            <td
                              style={{ width: "120px" }}
                              className="border-x-1 border-black"
                            >
                              <span className="text-white">Task</span>
                            </td>
                            <td
                              style={{ width: "120px" }}
                              className="border-r border-black"
                            >
                              <span className="text-white">Version</span>
                            </td>
                            <td style={{ width: "120px" }}>
                              <span className="text-white">Date</span>
                            </td>
                          </tr>
                        </thead>
                        <tbody style={{ height: "40px" }}>
                          <tr style={{ borderTop: "1px solid black" }}>
                            <td>{report?.payload?.boardData?.title}</td>
                            <td className="border-x-1 border-black">
                              {totalTasks}
                            </td>
                            <td className="border-r border-black">
                              {report?.payload?.version}
                            </td>
                            <td>{report?.payload?.creationDate}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "30%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        width: "80%",
                        height: "25%",
                        display: "flex",
                        alignItems: "flex-end",
                        fontSize: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "16px",
                          background:
                            "linear-gradient(to right, #59BAD5, #ABAAFF, #59BAD5)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                        }}
                      >
                        I.&nbsp;&nbsp;Gantt Bar in
                        <span style={{ color: "transparent" }}>
                          &nbsp;{report?.payload?.boardData?.title}
                        </span>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "75%",
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          height: "80%",
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            height: "100%",
                            paddingBottom: "5%",
                          }}
                        >
                          <div
                            className="relative overflow-clip"
                            style={{
                              backgroundColor: "purple",
                              width: "180px",
                              height: "115px",
                            }}
                          >
                            
                          </div>
                        </div>
                        {/* <!-- image --> */}
                        <div
                          className="img"
                          style={{ position: "absolute", translate: "10%" }}
                        >
                          <Image
                            src={Laptop}
                            alt=""
                            className="w-[80%] h-[80%]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "40%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        height: "10%",
                        display: "flex",
                        alignItems: "flex-end",
                        fontSize: "16px",
                      }}
                    >
                      <p style={{ fontSize: "16px" }}>
                        II.&nbsp;&nbsp;Stages Information
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        width: "72.5%",
                        paddingTop: "2.5%",
                      }}
                    >
                      This section provides a structured overview of the
                      project's workflow distribution across four stages: To Do,
                      Progress, Under Review, and Completed.
                    </p>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "white",
                        paddingTop: "5%",
                      }}
                    >
                      <div
                        style={{
                          border: "1px solid black",
                          borderRadius: "5px",
                          width: "65%",
                        }}
                      >
                        <table
                          style={{
                            fontSize: "12px",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <thead
                            style={{
                              color: "white",
                              backgroundColor: "#59BAD5",
                              height: "26px",
                            }}
                          >
                            <tr style={{ borderBottom: "1px solid black" }}>
                              <td
                                style={{
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Stage
                              </td>
                              <td
                                style={{
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Tasks
                              </td>
                              <td style={{ paddingLeft: "27px" }}>
                                Checklists
                              </td>
                            </tr>
                          </thead>
                          <tbody style={{ backgroundColor: "white" }}>
                            <tr
                              style={{
                                borderBottom: "1px solid black",
                                height: "32px",
                              }}
                            >
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                To Do
                              </td>
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                {task.todo} tasks
                              </td>
                              <td
                                style={{ width: "143px", paddingLeft: "27px" }}
                              >
                                {checkList.todo} checklists
                              </td>
                            </tr>
                            <tr
                              style={{
                                borderBottom: "1px solid black",
                                height: "32px",
                              }}
                            >
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Progress
                              </td>
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                {task.progress} tasks
                              </td>
                              <td
                                style={{ width: "143px", paddingLeft: "27px" }}
                              >
                                {checkList.progress} checklists
                              </td>
                            </tr>
                            <tr
                              style={{
                                borderBottom: "1px solid black",
                                height: "32px",
                              }}
                            >
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Under Review
                              </td>
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                {task.review} tasks
                              </td>
                              <td
                                style={{ width: "143px", paddingLeft: "27px" }}
                              >
                                {checkList.review} checklists
                              </td>
                            </tr>
                            <tr
                              style={{
                                borderBottom: "1px solid black",
                                height: "32px",
                              }}
                            >
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                Completed
                              </td>
                              <td
                                style={{
                                  width: "143px",
                                  borderRight: "1px solid black",
                                  paddingLeft: "27px",
                                }}
                              >
                                {task.done} tasks
                              </td>
                              <td
                                style={{ width: "143px", paddingLeft: "27px" }}
                              >
                                {checkList.done} checklists
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      height: "4.5%",
                      fontSize: "12px",
                    }}
                  >
                    page 1
                  </p>
                </div>

                {/* <!-- Page 2 --> */}
                <div
                  style={{
                    width: "595px",
                    height: "842px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      width: "199px",
                      backgroundColor: "#59BAD5",
                      height: "40px",
                      borderTopRightRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      color: "white",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Reports</span>
                  </p>

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "10%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>III.&nbsp;&nbsp;To Do Information</p>
                        <div>
                          <div>
                            <div style={{ paddingTop: "5%" }}>
                              <div
                                style={{
                                  border: "1px solid black",
                                  borderRadius: "5px",
                                }}
                              >
                                <table
                                  style={{ width: "100%", fontSize: "12px" }}
                                >
                                  <thead
                                    style={{
                                      color: "white",
                                      backgroundColor: "#59BAD5",
                                    }}
                                  >
                                    <tr style={{ height: "26px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Task Title
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Lead
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        Subtask Count
                                      </td>
                                    </tr>
                                  </thead>
                                  <tbody style={{ backgroundColor: "white" }}>
                                    {report?.payload?.groupedTasks
                                      .filter(
                                        (value) => value?.stage == "TO DO"
                                      )
                                      .map((item) =>
                                        item?.tasks?.map((value, index) => (
                                          <tr
                                            key={index}
                                            style={{
                                              height: "32px",
                                              borderTop: "1px solid black",
                                            }}
                                          >
                                            <td
                                              style={{
                                                paddingLeft: "27px",
                                                borderRight: "1px solid black",
                                              }}
                                            >
                                              {value?.title}
                                            </td>
                                            <td
                                              style={{
                                                paddingLeft: "27px",
                                                borderRight: "1px solid black",
                                              }}
                                            >
                                              {value?.teamLeader}
                                            </td>
                                            <td style={{ paddingLeft: "27px" }}>
                                              {value?.allChecklists.length}
                                            </td>
                                          </tr>
                                        ))
                                      )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        padding: "5% 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>IV.&nbsp;&nbsp;Under Review information</p>
                        <div>
                          <div style={{ paddingTop: "5%" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRadius: "5px",
                              }}
                            >
                              <table
                                style={{ width: "100%", fontSize: "12px" }}
                              >
                                <thead
                                  style={{
                                    color: "white",
                                    backgroundColor: "#59BAD5",
                                  }}
                                >
                                  <tr style={{ height: "26px" }}>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Task Title
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Lead
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      Subtask Count
                                    </td>
                                  </tr>
                                </thead>
                                <tbody style={{ backgroundColor: "white" }}>
                                  {report?.payload?.groupedTasks
                                    .filter(
                                      (value) => value?.stage == "UNDER_REVIEW"
                                    )
                                    .map((item) =>
                                      item?.tasks?.map((value, index) => (
                                        <tr
                                          key={index}
                                          style={{
                                            height: "32px",
                                            borderTop: "1px solid black",
                                          }}
                                        >
                                          <td
                                            style={{
                                              paddingLeft: "27px",
                                              borderRight: "1px solid black",
                                            }}
                                          >
                                            {value?.title}
                                          </td>
                                          <td
                                            style={{
                                              paddingLeft: "27px",
                                              borderRight: "1px solid black",
                                            }}
                                          >
                                            {value?.teamLeader}
                                          </td>
                                          <td style={{ paddingLeft: "27px" }}>
                                            {value?.allChecklists.length}
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>V.&nbsp;&nbsp;Progress information</p>
                        <div>
                          <div style={{ paddingTop: "5%" }}>
                            <div
                              style={{
                                border: "1px solid black",
                                borderRadius: "5px",
                              }}
                            >
                              <table
                                style={{ width: "100%", fontSize: "12px" }}
                              >
                                <thead
                                  style={{
                                    color: "white",
                                    backgroundColor: "#59BAD5",
                                  }}
                                >
                                  <tr style={{ height: "26px" }}>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Task Title
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Lead
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      Subtask Count
                                    </td>
                                  </tr>
                                </thead>
                                <tbody style={{ backgroundColor: "white" }}>
                                  {report?.payload?.groupedTasks
                                    .filter(
                                      (value) => value?.stage == "IN_PROGRESS"
                                    )
                                    .map((item) =>
                                      item?.tasks?.map((value, index) => (
                                        <tr
                                          key={index}
                                          style={{
                                            height: "32px",
                                            borderTop: "1px solid black",
                                          }}
                                        >
                                          <td
                                            style={{
                                              paddingLeft: "27px",
                                              borderRight: "1px solid black",
                                            }}
                                          >
                                            {value?.title}
                                          </td>
                                          <td
                                            style={{
                                              paddingLeft: "27px",
                                              borderRight: "1px solid black",
                                            }}
                                          >
                                            {value?.teamLeader}
                                          </td>
                                          <td style={{ paddingLeft: "27px" }}>
                                            {value?.allChecklists.length}
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      height: "4.5%",
                      fontSize: "12px",
                    }}
                  >
                    page 2
                  </p>
                </div>

                {/* <!-- Page 3 --> */}
                <div
                  style={{
                    width: "595px",
                    height: "842px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      backgroundColor: "#59BAD5",
                      width: "199px",
                      height: "40px",
                      borderTopRightRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      color: "white",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Reports</span>
                  </p>

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "10%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>VI.&nbsp;&nbsp;Stage : Done</p>
                        <div>
                          <div>
                            <div style={{ paddingTop: "5%" }}>
                              <div
                                style={{
                                  border: "1px solid black",
                                  borderRadius: "5px",
                                }}
                              >
                                <table
                                  style={{ width: "100%", fontSize: "12px" }}
                                >
                                  <thead
                                    style={{
                                      color: "white",
                                      backgroundColor: "#59BAD5",
                                    }}
                                  >
                                    <tr style={{ height: "26px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Task Title
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Lead
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        Subtask Count
                                      </td>
                                    </tr>
                                  </thead>
                                  <tbody style={{ backgroundColor: "white" }}>
                                    {report?.payload?.groupedTasks
                                      .filter(
                                        (value) => value?.stage == "COMPLETED"
                                      )
                                      .map((item) =>
                                        item?.tasks?.map((value, index) => (
                                          <tr
                                            key={index}
                                            style={{
                                              height: "32px",
                                              borderTop: "1px solid black",
                                            }}
                                          >
                                            <td
                                              style={{
                                                paddingLeft: "27px",
                                                borderRight: "1px solid black",
                                              }}
                                            >
                                              {value?.title}
                                            </td>
                                            <td
                                              style={{
                                                paddingLeft: "27px",
                                                borderRight: "1px solid black",
                                              }}
                                            >
                                              {value?.teamLeader}
                                            </td>
                                            <td style={{ paddingLeft: "27px" }}>
                                              {value?.allChecklists.length}
                                            </td>
                                          </tr>
                                        ))
                                      )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        padding: "5% 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>VII.&nbsp;&nbsp;Subtasks</p>
                        <div>
                          {flatData.map((item, index) => (
                            <div key={index} style={{ paddingTop: "5%" }}>
                              <div
                                style={{
                                  border: "1px solid black",
                                  borderRadius: "5px",
                                }}
                              >
                                <table
                                  style={{ width: "100%", fontSize: "12px" }}
                                >
                                  <tbody style={{ backgroundColor: "white" }}>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Task Title
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.taskTitle}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Subtask Title
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.checklistTitle}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Member
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.member?.username}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Comments
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.comments?.length || 0} comment
                                        {item.comments?.length !== 1 ? "s" : ""}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "32px",
                                        borderBottom: "1px solid black",
                                      }}
                                    >
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Start Date
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.startDate
                                          ? new Date(
                                              item.startDate
                                            ).toLocaleDateString()
                                          : "N/A"}
                                      </td>
                                    </tr>
                                    <tr style={{ height: "32px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        End Date
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>
                                        {item.endDate
                                          ? new Date(
                                              item.endDate
                                            ).toLocaleDateString()
                                          : "N/A"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      height: "4.5%",
                      fontSize: "12px",
                    }}
                  >
                    page 3
                  </p>
                </div>

                {/* <!-- Page 4 --> */}
                <div
                  style={{
                    width: "595px",
                    height: "842px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#59BAD5",
                      width: "199px",
                      height: "40px",
                      borderTopRightRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "24px",
                      color: "white",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Reports</span>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "10%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          width: "85%",
                        }}
                      >
                        <p>VIII.&nbsp;&nbsp;Monthly Task Information</p>

                        <div style={{ paddingTop: "5%" }}>
                          <div
                            style={{
                              border: "1px solid black",
                              borderRadius: "5px",
                            }}
                          >
                            <table
                              style={{
                                width: "100%",
                                fontSize: "12px",
                                borderCollapse: "collapse",
                              }}
                            >
                              <thead
                                style={{
                                  color: "white",
                                  backgroundColor: "#59BAD5",
                                  fontSize: "11px",
                                }}
                              >
                                <tr style={{ height: "32px" }}>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Month
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Task
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Subtask
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Completed
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    Version
                                  </td>
                                </tr>
                              </thead>
                              <tbody style={{ backgroundColor: "white" }}>
                                {taskData.map((row, index) => (
                                  <tr
                                    key={index}
                                    style={{
                                      height: "32px",
                                      borderBottom: "1px solid black",
                                    }}
                                  >
                                    <td
                                      style={{
                                        paddingLeft: "16px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      {row.month}
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "16px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      {row.tasks}
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "16px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      {row.subtasks}
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "16px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      {row.completed}
                                    </td>
                                    <td style={{ paddingLeft: "16px" }}>
                                      v{reportVersion}
                                    </td>
                                  </tr>
                                ))}
                                <tr style={{ height: "32px" }}>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Total
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {totalTasks}
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {totalChecklists}
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {Object.values(doneTask).reduce(
                                      (sum, value) => sum + value,
                                      0
                                    )}
                                    % avg
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    v{reportVersion}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      height: "4.5%",
                      fontSize: "12px",
                    }}
                  >
                    page 4
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
