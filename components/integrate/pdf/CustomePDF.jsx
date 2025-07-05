"use client";

import Laptop from "@/assets/intergrating/laptop.png";
import Image from "next/image";
import { getReportAction } from "@/action/report.action";
import { useRef, useState, useEffect } from "react";

export const PDFPreviewer = ({ report }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [scale, setScale] = useState(1);
  const zoomRef = useRef(null);
  const scrollRef = useRef(null);
  const pageRefs = useRef([]);

  // Initialize page refs
  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, totalPages);
  }, [totalPages]);

  // Scroll to the specified page
  const scrollToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageRefs.current[pageNumber - 1]) {
      scrollRef.current.scrollTo({
        top: pageRefs.current[pageNumber - 1].offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" && currentPage < totalPages) {
        scrollToPage(currentPage + 1);
      } else if (e.key === "ArrowLeft" && currentPage > 1) {
        scrollToPage(currentPage - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  // Handle scroll events to update current page
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollPosition = scrollRef.current.scrollTop;
    const pageHeights = pageRefs.current.map((ref) => ref?.offsetHeight || 0);
    let accumulatedHeight = 0;

    for (let i = 0; i < pageHeights.length; i++) {
      accumulatedHeight += pageHeights[i];
      if (scrollPosition < accumulatedHeight) {
        setCurrentPage(i + 1);
        break;
      }
    }
  };

  // Zoom functions
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  // ... (keep all the existing data processing logic)

  return (
    <div className="w-full h-screen overflow-y-hidden">
      {/* Header with navigation controls */}
      <div className="h-[5%] bg-[#323639] flex items-center px-[2.5%] justify-between">
        <div className="text-h5 text-white">
          <p className="font-medium">Report v1</p>
        </div>
        <div className="flex w-[437px] justify-center">
          <div className="flex items-center w-28 justify-evenly text-white text-body-sm pr-4">
            <button
              onClick={() => scrollToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              &lt;
            </button>
            <p className="w-6 h-6 bg-black flex justify-center items-center">
              {currentPage}
            </p>
            <p>/</p>
            <p>{totalPages}</p>
            <button
              onClick={() => scrollToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
          <div className="flex items-center text-white justify-evenly w-40 h-7 pl-3 border-l border-gray-100/50">
            <div
              onClick={zoomOut}
              className="w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-black"
            >
              <p className="text-h2 select-none">-</p>
            </div>
            <p className="text-body-sm h-6 w-14 flex justify-center items-center cursor-default bg-black">
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
        <div className="w-8 h-8 flex justify-center items-center"></div>
      </div>

      {/* Main content area */}
      <div className="w-full h-[95%] flex relative">
        {/* Sidebar with page thumbnails */}
        <div className="absolute top-0 left-0 h-full w-[15%] z-10">
          <div className="bg-title h-full overflow-y-scroll overflow-x-hidden scrollbar-hide">
            <div className="py-[10%] pl-10 pr-10 h-full">
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <div
                  key={`thumbnail-${pageNum}`}
                  onClick={() => scrollToPage(pageNum)}
                  className={`h-[257px] w-[188px] flex relative mb-5 cursor-pointer ${
                    currentPage === pageNum ? "border-2 border-blue-500" : ""
                  }`}
                >
                  {pageNum === 1 && (
                    <Cover
                      absolute="absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%]"
                      report={report}
                    />
                  )}
                  {pageNum === 2 && (
                    <FirstPage
                      absolute="absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%]"
                      height="842px"
                      width="595px"
                      report={report}
                      LaptopImage={Laptop}
                    />
                  )}
                  {pageNum === 3 && (
                    <SecondPage
                      absolute="absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%]"
                      report={report}
                    />
                  )}
                  {pageNum === 4 && (
                    <ThirdPage
                      absolute="absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%]"
                      report={report}
                    />
                  )}
                  {pageNum === 5 && (
                    <FourthPage
                      absolute="absolute scale-[0.3] translate-x-[-34.5%] translate-y-[-35%]"
                      report={report}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main PDF display */}
        <div
          ref={scrollRef}
          className="h-auto w-full pl-[15%] pt-[2.5%] overflow-y-scroll scrollbar-hide bg-[#D3D3D3]"
          onScroll={handleScroll}
        >
          <div
            ref={zoomRef}
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease-in-out",
            }}
          >
            <div className="flex flex-col items-center gap-20 pb-20">
              <div ref={(el) => (pageRefs.current[0] = el)}>
                <Cover report={report} />
              </div>
              <div ref={(el) => (pageRefs.current[1] = el)}>
                <FirstPage
                  report={report}
                  height="842px"
                  width="595px"
                  LaptopImage={Laptop}
                />
              </div>
              <div ref={(el) => (pageRefs.current[2] = el)}>
                <SecondPage report={report} />
              </div>
              <div ref={(el) => (pageRefs.current[3] = el)}>
                <ThirdPage report={report} />
              </div>
              <div ref={(el) => (pageRefs.current[4] = el)}>
                <FourthPage report={report} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Cover = ({ report, absolute }) => {
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


  const taskData = [
    {
      month: "January",
      tasks: myMonth.january,
      subtasks: myMonthChecklist.january,
      completed: ((doneTask.january / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "February",
      tasks: myMonth.february,
      subtasks: myMonthChecklist.february,
      completed: ((doneTask.february / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "March",
      tasks: myMonth.march,
      subtasks: myMonthChecklist.march,
      completed: ((doneTask.march / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "April",
      tasks: myMonth.april,
      subtasks: myMonthChecklist.april,
      completed: ((doneTask.april / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "May",
      tasks: myMonth.may,
      subtasks: myMonthChecklist.may,
      completed: ((doneTask.may / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "June",
      tasks: myMonth.june,
      subtasks: myMonthChecklist.june,
      completed: ((doneTask.june / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "July",
      tasks: myMonth.july,
      subtasks: myMonthChecklist.july,
      completed: ((doneTask.july / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "August",
      tasks: myMonth.august,
      subtasks: myMonthChecklist.august,
      completed: ((doneTask.august / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "September",
      tasks: myMonth.september,
      subtasks: myMonthChecklist.september,
      completed: ((doneTask.september / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "October",
      tasks: myMonth.october,
      subtasks: myMonthChecklist.october,
      completed: ((doneTask.october / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "November",
      tasks: myMonth.november,
      subtasks: myMonthChecklist.november,
      completed: ((doneTask.november / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "December",
      tasks: myMonth.december,
      subtasks: myMonthChecklist.december,
      completed: ((doneTask.december / totalTasks) * 100).toFixed(2) + "%",
    },
  ];

  const flattenReportData = (report) => {
    const flattened = [];

    report?.payload?.groupedTasks?.forEach((group) => {
      group?.tasks?.forEach((task) => {
        task?.allChecklists?.forEach((checklist) => {
          checklist?.members?.forEach((member) => {
            flattened.push({
              stage: group?.stage,
              taskId: task?.taskId,
              taskTitle: task?.title,
              taskDescription: task?.description,
              checklistId: checklist?.checklistId,
              checklistTitle: checklist?.title,
              checklistDescription: checklist?.description,
              member: member,
              attachments: checklist?.attachment,
              comments: checklist?.allComments,
              startDate: checklist?.startedAt,
              endDate: checklist?.finishedAt,
              status: checklist?.status,
            });
          });
        });
      });
    });

    return flattened;
  };

  const flatData = flattenReportData(report);


  const [scale, setScale] = useState(1);
  const zoomRef = useRef(null);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  const scrollRef = useRef(null);
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(1);

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
    <div
      className={`${absolute} ${
        isSelected.item2 ? "border-3 border-blue-500" : "border-none"
      }`}
    >
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
                  <stop offset="0.4499" stopColor="#9BDBFD" stopOpacity="0.3" />
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
                  <p style={{ fontSize: "12px" }}>[Insert Contact Detail]</p>
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
                    <span style={{ fontWeight: "bold" }}>Prepared by:</span>
                  </p>
                  <p style={{ fontSize: "15px" }}>
                    {report?.payload?.boardData?.createdBy?.gender === "MALE"
                      ? `Mr. ${report?.payload?.boardData?.createdBy?.username}`
                      : `Ms. ${report?.payload?.boardData?.createdBy?.username}`}
                  </p>
                </div>
                <div style={{ paddingLeft: "3%" }}>
                  <p style={{ fontSize: "12px", height: "48px" }}>
                    Any inquiries with respect to this report may be directed
                    to:
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
  );
};

export const FirstPage = ({
  report,
  LaptopImage,
  width,
  height,
  pageNumber = 1,
  absolute,
}) => {
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


  const taskData = [
    {
      month: "January",
      tasks: myMonth.january,
      subtasks: myMonthChecklist.january,
      completed: ((doneTask.january / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "February",
      tasks: myMonth.february,
      subtasks: myMonthChecklist.february,
      completed: ((doneTask.february / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "March",
      tasks: myMonth.march,
      subtasks: myMonthChecklist.march,
      completed: ((doneTask.march / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "April",
      tasks: myMonth.april,
      subtasks: myMonthChecklist.april,
      completed: ((doneTask.april / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "May",
      tasks: myMonth.may,
      subtasks: myMonthChecklist.may,
      completed: ((doneTask.may / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "June",
      tasks: myMonth.june,
      subtasks: myMonthChecklist.june,
      completed: ((doneTask.june / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "July",
      tasks: myMonth.july,
      subtasks: myMonthChecklist.july,
      completed: ((doneTask.july / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "August",
      tasks: myMonth.august,
      subtasks: myMonthChecklist.august,
      completed: ((doneTask.august / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "September",
      tasks: myMonth.september,
      subtasks: myMonthChecklist.september,
      completed: ((doneTask.september / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "October",
      tasks: myMonth.october,
      subtasks: myMonthChecklist.october,
      completed: ((doneTask.october / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "November",
      tasks: myMonth.november,
      subtasks: myMonthChecklist.november,
      completed: ((doneTask.november / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "December",
      tasks: myMonth.december,
      subtasks: myMonthChecklist.december,
      completed: ((doneTask.december / totalTasks) * 100).toFixed(2) + "%",
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


  const [scale, setScale] = useState(1);
  const zoomRef = useRef(null);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  const scrollRef = useRef(null);
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Update current page on scroll

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
    <div
      className={`${absolute} ${
        isSelected.item2 ? "border-3 border-blue-500" : "border-none"
      }`}
      style={{
        width: width,
        height: height,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
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

      {/* Board Info Table Section */}
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
            {report?.payload?.boardData != null ? (
              <tbody style={{ height: "40px" }}>
                <tr style={{ borderTop: "1px solid black" }}>
                  <td>{report?.payload?.boardData?.title}</td>
                  <td className="border-x-1 border-black">{totalTasks}</td>
                  <td className="border-r border-black">
                    {report?.payload?.version}
                  </td>
                  <td>{report?.payload?.creationDate}</td>
                </tr>
              </tbody>
            ) : (
              <tbody style={{ height: "40px" }}>
                <tr style={{ borderTop: "1px solid black" }}>
                  <td>{`<No data>}`}</td>
                  <td className="border-x-1 border-black">{`<No data>}`}</td>
                  <td className="border-r border-black">{`<No data>}`}</td>
                  <td>{`<No data>}`}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Gantt Bar Section */}
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
            {/* Laptop Image */}
            {LaptopImage && (
              <div
                className="img"
                style={{ position: "absolute", translate: "10%" }}
              >
                <Image
                  src={LaptopImage}
                  alt="Laptop"
                  className="w-[80%] h-[80%]"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stages Information Section */}
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
          <p style={{ fontSize: "16px" }}>II.&nbsp;&nbsp;Stages Information</p>
        </div>
        <p
          style={{
            fontSize: "12px",
            width: "72.5%",
            paddingTop: "2.5%",
          }}
        >
          This section provides a structured overview of the project's workflow
          distribution across four stages: To Do, Progress, Under Review, and
          Completed.
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
                  <td style={{ paddingLeft: "27px" }}>Checklists</td>
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
                    style={{
                      width: "143px",
                      paddingLeft: "27px",
                    }}
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
                    style={{
                      width: "143px",
                      paddingLeft: "27px",
                    }}
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
                    style={{
                      width: "143px",
                      paddingLeft: "27px",
                    }}
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
                    style={{
                      width: "143px",
                      paddingLeft: "27px",
                    }}
                  >
                    {checkList.done} checklists
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Page Number */}
      <p
        style={{
          textAlign: "center",
          height: "4.5%",
          fontSize: "12px",
        }}
      >
        page {pageNumber}
      </p>
    </div>
  );
};

export const SecondPage = ({ report, pageNumber = 2, absolute }) => {
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


  const taskData = [
    {
      month: "January",
      tasks: myMonth.january,
      subtasks: myMonthChecklist.january,
      completed: ((doneTask.january / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "February",
      tasks: myMonth.february,
      subtasks: myMonthChecklist.february,
      completed: ((doneTask.february / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "March",
      tasks: myMonth.march,
      subtasks: myMonthChecklist.march,
      completed: ((doneTask.march / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "April",
      tasks: myMonth.april,
      subtasks: myMonthChecklist.april,
      completed: ((doneTask.april / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "May",
      tasks: myMonth.may,
      subtasks: myMonthChecklist.may,
      completed: ((doneTask.may / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "June",
      tasks: myMonth.june,
      subtasks: myMonthChecklist.june,
      completed: ((doneTask.june / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "July",
      tasks: myMonth.july,
      subtasks: myMonthChecklist.july,
      completed: ((doneTask.july / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "August",
      tasks: myMonth.august,
      subtasks: myMonthChecklist.august,
      completed: ((doneTask.august / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "September",
      tasks: myMonth.september,
      subtasks: myMonthChecklist.september,
      completed: ((doneTask.september / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "October",
      tasks: myMonth.october,
      subtasks: myMonthChecklist.october,
      completed: ((doneTask.october / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "November",
      tasks: myMonth.november,
      subtasks: myMonthChecklist.november,
      completed: ((doneTask.november / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "December",
      tasks: myMonth.december,
      subtasks: myMonthChecklist.december,
      completed: ((doneTask.december / totalTasks) * 100).toFixed(2) + "%",
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


  const [scale, setScale] = useState(1);
  const zoomRef = useRef(null);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  const scrollRef = useRef(null);
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(1);

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
    <div
      className={`${absolute} ${
        isSelected.item3 ? `border-3 border-blue-500` : `border-none`
      }`}
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
                    <table style={{ width: "100%", fontSize: "12px" }}>
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
                          <td style={{ paddingLeft: "27px" }}>Subtask Count</td>
                        </tr>
                      </thead>
                      <tbody style={{ backgroundColor: "white" }}>
                        {report?.payload?.groupedTasks
                          ?.filter((value) => value?.stage === "TO DO")
                          ?.map((item) => item?.tasks.length) != 0 ? (
                          report?.payload?.groupedTasks
                            ?.filter((value) => value?.stage === "TO DO")
                            ?.map((item) =>
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
                                    {value?.title != null
                                      ? value?.title
                                      : `<No data>`}
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "27px",
                                      borderRight: "1px solid black",
                                    }}
                                  >
                                    {value?.teamLeader?.username
                                      ? value?.teamLeader?.username
                                      : `<No data>`}
                                  </td>
                                  <td style={{ paddingLeft: "27px" }}>
                                    {value?.allChecklists?.length
                                      ? value?.allChecklists?.length
                                      : `<No data>`}
                                  </td>
                                </tr>
                              ))
                            )
                        ) : (
                          <tr
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
                              {`<No data>`}
                            </td>
                            <td
                              style={{
                                paddingLeft: "27px",
                                borderRight: "1px solid black",
                              }}
                            >
                              {`<No data>`}
                            </td>
                            <td style={{ paddingLeft: "27px" }}>
                              {`<No data>`}
                            </td>
                          </tr>
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
                  <table style={{ width: "100%", fontSize: "12px" }}>
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
                        <td style={{ paddingLeft: "27px" }}>Subtask Count</td>
                      </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "white" }}>
                      {report?.payload?.groupedTasks
                        ?.filter((value) => value?.stage === "UNDER_REVIEW")
                        ?.map((item) => item?.tasks.length) != 0 ? (
                        report?.payload?.groupedTasks
                          ?.filter((value) => value?.stage === "UNDER_REVIEW")
                          ?.map((item) =>
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
                                  {value?.teamLeader?.username}
                                </td>
                                <td style={{ paddingLeft: "27px" }}>
                                  {value?.allChecklists?.length}
                                </td>
                              </tr>
                            ))
                          )
                      ) : (
                        <tr
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
                            {`<No data>`}
                          </td>
                          <td
                            style={{
                              paddingLeft: "27px",
                              borderRight: "1px solid black",
                            }}
                          >
                            {`<No data>`}
                          </td>
                          <td style={{ paddingLeft: "27px" }}>{`<No data>`}</td>
                        </tr>
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
                  <table style={{ width: "100%", fontSize: "12px" }}>
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
                        <td style={{ paddingLeft: "27px" }}>Subtask Count</td>
                      </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "white" }}>
                      {report?.payload?.groupedTasks
                        ?.filter((value) => value?.stage === "TO DO")
                        ?.map((item) => item?.tasks.length) != 0 ? (
                        report?.payload?.groupedTasks
                          ?.filter((value) => value?.stage === "IN_PROGRESS")
                          ?.map((item) =>
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
                                  {value?.title != null
                                    ? value?.title
                                    : `<No data>`}
                                </td>
                                <td
                                  style={{
                                    paddingLeft: "27px",
                                    borderRight: "1px solid black",
                                  }}
                                >
                                  {value?.teamLeader?.username != null
                                    ? value?.teamLeader?.username
                                    : `<No data>`}
                                </td>
                                <td style={{ paddingLeft: "27px" }}>
                                  {value?.allChecklists?.length != null
                                    ? value?.allChecklists?.length
                                    : `<No data>`}
                                </td>
                              </tr>
                            ))
                          )
                      ) : (
                        <tr
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
                            {`<No data>`}
                          </td>
                          <td
                            style={{
                              paddingLeft: "27px",
                              borderRight: "1px solid black",
                            }}
                          >
                            {`<No data>`}
                          </td>
                          <td style={{ paddingLeft: "27px" }}>{`<No data>`}</td>
                        </tr>
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
        page {pageNumber}
      </p>
    </div>
  );
};

export const ThirdPage = ({ report, pageNumber = 3, absolute }) => {
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


  const taskData = [
    {
      month: "January",
      tasks: myMonth.january,
      subtasks: myMonthChecklist.january,
      completed: ((doneTask.january / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "February",
      tasks: myMonth.february,
      subtasks: myMonthChecklist.february,
      completed: ((doneTask.february / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "March",
      tasks: myMonth.march,
      subtasks: myMonthChecklist.march,
      completed: ((doneTask.march / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "April",
      tasks: myMonth.april,
      subtasks: myMonthChecklist.april,
      completed: ((doneTask.april / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "May",
      tasks: myMonth.may,
      subtasks: myMonthChecklist.may,
      completed: ((doneTask.may / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "June",
      tasks: myMonth.june,
      subtasks: myMonthChecklist.june,
      completed: ((doneTask.june / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "July",
      tasks: myMonth.july,
      subtasks: myMonthChecklist.july,
      completed: ((doneTask.july / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "August",
      tasks: myMonth.august,
      subtasks: myMonthChecklist.august,
      completed: ((doneTask.august / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "September",
      tasks: myMonth.september,
      subtasks: myMonthChecklist.september,
      completed: ((doneTask.september / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "October",
      tasks: myMonth.october,
      subtasks: myMonthChecklist.october,
      completed: ((doneTask.october / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "November",
      tasks: myMonth.november,
      subtasks: myMonthChecklist.november,
      completed: ((doneTask.november / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "December",
      tasks: myMonth.december,
      subtasks: myMonthChecklist.december,
      completed: ((doneTask.december / totalTasks) * 100).toFixed(2) + "%",
    },
  ];

  const [scale, setScale] = useState(1);
  const zoomRef = useRef(null);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  const scrollRef = useRef(null);
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(1);

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
    <div
      className={`${absolute} ${
        isSelected.item4 ? `border-3 border-blue-500` : `border-none`
      }`}
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
                    <table style={{ width: "100%", fontSize: "12px" }}>
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
                          <td style={{ paddingLeft: "27px" }}>Subtask Count</td>
                        </tr>
                      </thead>
                      <tbody style={{ backgroundColor: "white" }}>
                        {report?.payload?.groupedTasks
                          ?.filter((value) => value?.stage === "COMPLETED")
                          ?.map((item) => item?.tasks.length) != 0 ? (
                          report?.payload?.groupedTasks
                            ?.filter((value) => value?.stage === "COMPLETED")
                            ?.map((item) =>
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
                                    {value?.title != null
                                      ? value?.title
                                      : `<No data>`}
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "27px",
                                      borderRight: "1px solid black",
                                    }}
                                  >
                                    {value?.teamLeader?.username != null
                                      ? value?.teamLeader?.username
                                      : `<No data>`}
                                  </td>
                                  <td style={{ paddingLeft: "27px" }}>
                                    {value?.allChecklists?.length != null
                                      ? value?.allChecklists?.length
                                      : `<No data>`}
                                  </td>
                                </tr>
                              ))
                            )
                        ) : (
                          <tr
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
                              {`<No data>`}
                            </td>
                            <td
                              style={{
                                paddingLeft: "27px",
                                borderRight: "1px solid black",
                              }}
                            >
                              {`<No data>`}
                            </td>
                            <td style={{ paddingLeft: "27px" }}>
                              {`<No data>`}
                            </td>
                          </tr>
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
              {report?.payload?.groupedTasks?.flatMap(
                (allTask, taskGroupIndex) =>
                  allTask?.tasks?.flatMap((task, taskIndex) =>
                    task?.allChecklists?.flatMap((checklist, checklistIndex) =>
                      checklist?.members?.flatMap((member, memberIndex) =>
                        member?.allComments?.map((comment, commentIndex) => {
                          // Create a unique composite key
                          const uniqueKey = `comment-${taskGroupIndex}-${taskIndex}-${checklistIndex}-${memberIndex}-${commentIndex}`;

                          // Skip rendering if essential data is missing
                          if (!task || !checklist || !member || !comment)
                            return null;

                          return (
                            <div
                              key={uniqueKey}
                              style={{ paddingTop: "5%", marginBottom: "20px" }}
                            >
                              <div
                                style={{
                                  border: "1px solid black",
                                  borderRadius: "5px",
                                  backgroundColor: "#fff",
                                }}
                              >
                                <table
                                  style={{
                                    width: "100%",
                                    fontSize: "12px",
                                    borderCollapse: "collapse",
                                  }}
                                >
                                  <tbody>
                                    <tr style={{ height: "32px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                          width: "30%",
                                        }}
                                      >
                                        Task Title
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid #ddd",
                                          backgroundColor: "#f9f9f9",
                                        }}
                                      >
                                        {task?.title || (
                                          <span style={{ color: "#999" }}>
                                            No title
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr style={{ height: "32px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Subtask Title
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid #ddd",
                                          backgroundColor: "#f9f9f9",
                                        }}
                                      >
                                        {checklist?.title || (
                                          <span style={{ color: "#999" }}>
                                            No checklist title
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr style={{ height: "32px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Member
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid #ddd",
                                          backgroundColor: "#f9f9f9",
                                        }}
                                      >
                                        {member?.username || (
                                          <span style={{ color: "#999" }}>
                                            No member
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr style={{ height: "32px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Comments
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid #ddd",
                                          backgroundColor: "#f9f9f9",
                                        }}
                                      >
                                        {comment?.length || 0}
                                      </td>
                                    </tr>
                                    <tr style={{ height: "32px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        Start Date
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid #ddd",
                                          backgroundColor: "#f9f9f9",
                                        }}
                                      >
                                        {checklist?.startedAt ? (
                                          new Date(
                                            checklist.startedAt
                                          ).toLocaleDateString()
                                        ) : (
                                          <span style={{ color: "#999" }}>
                                            No start date
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                    <tr style={{ height: "32px" }}>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid black",
                                          color: "white",
                                          backgroundColor: "#59BAD5",
                                        }}
                                      >
                                        End Date
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          border: "1px solid #ddd",
                                          backgroundColor: "#f9f9f9",
                                        }}
                                      >
                                        {checklist?.finishedAt ? (
                                          new Date(
                                            checklist.finishedAt
                                          ).toLocaleDateString()
                                        ) : (
                                          <span style={{ color: "#999" }}>
                                            No end date
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        })
                      )
                    )
                  )
              )}
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
        page {pageNumber}
      </p>
    </div>
  );
};

export const FourthPage = ({ absolute, report }) => {
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


  const taskData = [
    {
      month: "January",
      tasks: myMonth.january,
      subtasks: myMonthChecklist.january,
      completed: ((doneTask.january / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "February",
      tasks: myMonth.february,
      subtasks: myMonthChecklist.february,
      completed: ((doneTask.february / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "March",
      tasks: myMonth.march,
      subtasks: myMonthChecklist.march,
      completed: ((doneTask.march / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "April",
      tasks: myMonth.april,
      subtasks: myMonthChecklist.april,
      completed: ((doneTask.april / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "May",
      tasks: myMonth.may,
      subtasks: myMonthChecklist.may,
      completed: ((doneTask.may / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "June",
      tasks: myMonth.june,
      subtasks: myMonthChecklist.june,
      completed: ((doneTask.june / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "July",
      tasks: myMonth.july,
      subtasks: myMonthChecklist.july,
      completed: ((doneTask.july / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "August",
      tasks: myMonth.august,
      subtasks: myMonthChecklist.august,
      completed: ((doneTask.august / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "September",
      tasks: myMonth.september,
      subtasks: myMonthChecklist.september,
      completed: ((doneTask.september / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "October",
      tasks: myMonth.october,
      subtasks: myMonthChecklist.october,
      completed: ((doneTask.october / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "November",
      tasks: myMonth.november,
      subtasks: myMonthChecklist.november,
      completed: ((doneTask.november / totalTasks) * 100).toFixed(2) + "%",
    },
    {
      month: "December",
      tasks: myMonth.december,
      subtasks: myMonthChecklist.december,
      completed: ((doneTask.december / totalTasks) * 100).toFixed(2) + "%",
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


  const [scale, setScale] = useState(1);
  const zoomRef = useRef(null);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  const scrollRef = useRef(null);
  const totalPages = 5;
  const [currentPage, setCurrentPage] = useState(1);

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
    <div
      className={`${absolute} ${
        isSelected.item5 ? `border-3 border-blue-500` : `border-none`
      }`}
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
  );
};