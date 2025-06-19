"use client";

import BredCrum from "../bredcrum/MyBredcrum";
import HorizontalChart from "../chart/HorizontalChart";
// import VerticalChart from "../chart/VerticalChart";
import dynamic from "next/dynamic";

const VerticalChartNoSSR = dynamic(() => import("../chart/VerticalChart"), {
  ssr: false,
});

export default function Reportpage({
  modal,
  report,
  roleNeverJoined,
  roleJoined,
}) {
  if (roleJoined != "ROLE_MANAGER") {
    return <></>;
  }

  const task = {
    todo: 0,
    progress: 0,
    review: 0,
    done: 0,
  };

  const userRole = {
    pm: 0,
    tl: 0,
    m: 0,
  };

  report?.payload?.groupedTasks.forEach((item) => {
    if (item.stage == "TO DO") {
      task.todo = task.todo + item.count;
    } else if (item.stage == "IN_PROGRESS") {
      task.progress = task.progress + item.count;
    } else if (item.stage == "UNDER_REVIEW") {
      task.review = task.review + item.count;
    } else {
      task.done = task.done + item.count;
    }
  });

  console.log(report?.payload);

  const tasks = [
    {
      task: "TO DO",
      label: "To Do",
      total: task.todo,
      textColor: "text-primary",
      bgColor: "bg-primary/20",
      iconColor: "#59BAD5",
    },
    {
      task: "IN_PROGRESS",
      label: "In Progress",
      total: task.progress,
      textColor: "text-progress-purple/90",
      bgColor: "bg-progress-purple/20",
      iconColor: "#A855F7",
    },
    {
      task: "UNDER_REVIEW",
      label: "Under Review",
      total: task.review,
      textColor: "text-progress-red/90",
      bgColor: "bg-progress-red/20",
      iconColor: "#F87171",
    },
    {
      task: "COMPLETED",
      label: "Done",
      total: task.done,
      textColor: "text-progress-green/90",
      bgColor: "bg-progress-green/20",
      iconColor: "#4ADE80",
    },
  ];

  const totalTask = task.todo + task.progress + task.review + task.done;

  // this use to count amount of project manager, team leader, member
  report?.payload?.allMembers.forEach((item) => {
    if (item.roleName === "ROLE_MANAGER") {
      userRole.pm = item.total;
    } else if (item.roleName === "ROLE_LEADER") {
      userRole.tl = item.total;
    } else if (item.roleName === "ROLE_MEMBER") {
      userRole.m = item.total;
    }
  });

  const maximum = report?.payload?.version;
  const allVersion = Array.from({ length: maximum }, (_, i) => i + 1);

  const cheklist = {
    inTodo: 0,
    inProgress: 0,
    inReview: 0,
    inDone: 0,
  };

  report?.payload?.groupedTasks.forEach((item) => {
    if (item.task == "TO DO") {
      cheklist.inTodo =
        cheklist.inTodo + item?.tasks?.allChecklists?.length || 0;
    } else if (item.task == "IN_PROGRESS") {
      cheklist.inProgress =
        cheklist.inProgress + item?.tasks?.allChecklists?.length || 0;
    } else if (item.task == "UNDER_REVIEW") {
      cheklist.inReview =
        cheklist.inReview + item?.tasks?.allChecklists?.length || 0;
    } else {
      cheklist.inDone =
        cheklist.inDone + item?.tasks?.allChecklists?.length || 0;
    }
  });

  // all version of report
  const getVersion = report?.payload;
  console.log("Version: ", getVersion);

  // this for vertical chart
  const groupedTasks = report?.payload?.groupedTasks;

  return (
    <>
      <div className="p-5">
        <BredCrum
          board={"Hikoko Design"}
          feature={"Reports"}
          header={"Reports"}
          modal={modal}
        />

        {/* Content in Report */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5 overflow-y-auto h-screen md:h-fit scrollbar-hidden ">
          <div className="md:col-span-8 md:h-screen flex flex-col  ">
            <div className=" overflow-y-auto scrollbar-hidden pb-40 p-2">
              {/* Show number have in 4 Stage */}
              <div className="grid grid-cols-4 gap-2">
                {tasks.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-medium p-5 text-h6 font-semibold ${item.textColor} ${item.bgColor}`}
                  >
                    <div className="flex flex-col space-y-2">
                      <p>{item.label}</p>
                      <div className="flex justify-between items-center">
                        <p>{item.total}</p>
                        <p className="flex items-center gap-1 text-h6">
                          Task
                          <svg
                            width="12"
                            height="14"
                            viewBox="0 0 12 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.03508 10.7313L8.79491 6.97146L7.83 6.00655L5.01844 8.8181L3.62098 7.42064L2.67271 8.36892L5.03508 10.7313ZM1.74107 13.3931C1.37507 13.3931 1.06186 13.2629 0.801445 13.0025C0.541029 12.7421 0.4106 12.4286 0.410156 12.0622V1.4149C0.410156 1.0489 0.540586 0.735688 0.801445 0.475273C1.0623 0.214858 1.37551 0.084428 1.74107 0.0839844H7.06472L11.0575 4.07672V12.0622C11.0575 12.4282 10.9273 12.7416 10.6668 13.0025C10.4064 13.2634 10.093 13.3936 9.72655 13.3931H1.74107ZM6.39927 4.74218H9.72655L6.39927 1.4149V4.74218Z"
                              fill={item.iconColor}
                            />
                          </svg>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Show chart vertical chart */}
              {/* <div className="mt-10">
                <VerticalChartNoSSR
                  totalTask={totalTask}
                  chartData={weekly(groupedTasks)}
                />
              </div> */}

              <div className="mt-10">
                <VerticalChartNoSSR report={report} />
              </div>

              {/* Show chart horizontal chart */}
              <div className="mt-5">
                <HorizontalChart
                  amtChklistTodo={cheklist.inTodo}
                  amtChklistProgress={cheklist.inProgress}
                  amtChklistUnderReview={cheklist.inReview}
                  amtChklistDone={cheklist.inDone}
                />
              </div>
            </div>
          </div>

          {/* layout at right */}
          <div className="md:col-span-4 space-y-10 md:h-screen flex flex-col ">
            <div className=" flex flex-col  gap-2 overflow-y-auto scrollbar-hidden pb-[250px]">
              {/* Chart show amount member */}
              <div className="border-1 rounded-medium bg-[#FFFFFF] shadow-small p-4 flex flex-col ">
                <h1 className="text-left py-5 text-h6 text-title/50">
                  Amount of Members
                </h1>
                <p className="border border-title/10 w-full my-2"></p>
                <div className="relative w-[200px] h-[200px] mx-auto">
                  {/* Big Blue Circle */}
                  <div className="absolute w-[160px] h-[160px] bg-blue-500 rounded-full border-3 border-bgColor flex items-center justify-center">
                    <p className="text-h3 text-white font-semibold">
                      {userRole.m}
                    </p>
                  </div>

                  {/* Medium Purple Circle */}
                  <div
                    className="absolute w-[100px] h-[100px] bg-purple-500 rounded-full border-3 border-bgColor flex items-center justify-center"
                    style={{ top: "20px", left: "120px" }}
                  >
                    <p className="text-h5 text-white font-semibold">
                      {userRole.tl}
                    </p>
                  </div>

                  {/* Small Black Circle */}
                  <div
                    className="absolute w-[80px] h-[80px] bg-black rounded-full border-3 border-bgColor flex items-center justify-center"
                    style={{ top: "80px", left: "110px" }}
                  >
                    <p className="text-h6 text-white font-semibold">
                      {userRole.pm}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-title/50 text-caption items-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-blueActive w-[10px] h-[10px] rounded-full"></span>
                    <p>Member</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-progress-purple w-[10px] h-[10px] rounded-full"></span>
                    <p>Team Leader</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-black w-[10px] h-[10px] rounded-full"></span>
                    <p>Project Manager</p>
                  </div>
                </div>
              </div>

              {/*For show version history */}
              <div className="border-1 rounded-medium bg-[#FFFFFF] shadow-small p-4 flex flex-col h-[300px] ">
                <h1 className="flex items-center gap-2 text-h6 text-title font-semibold py-5">
                  <span className="inline-block w-5 h-5">
                    <svg
                      fill="currentColor"
                      viewBox="-1 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-20.446,10h-.036a.5.5,0,0,1-.5-.464C-20.993,9.359-21,9.18-21,9a.5.5,0,0,1,.5-.5A.5.5,0,0,1-20,9c0,.156.007.311.018.464A.5.5,0,0,1-20.446,10Zm.994,1.509a.5.5,0,0,0-.663-.245.5.5,0,0,0-.245.663A7.014,7.014,0,0,0-19.745,13a.5.5,0,0,0,.41.213.494.494,0,0,0,.286-.09.5.5,0,0,0,.124-.7A5.927,5.927,0,0,1-19.452,11.508Zm2.936,2.94a5.94,5.94,0,0,1-.918-.527.5.5,0,0,0-.7.123.5.5,0,0,0,.122.7,6.869,6.869,0,0,0,1.074.616.488.488,0,0,0,.209.046.5.5,0,0,0,.454-.291A.5.5,0,0,0-16.516,14.448ZM-14,2h-.293L-13.146.854a.5.5,0,0,0,0-.708.5.5,0,0,0-.708,0l-2,2a.518.518,0,0,0-.109.163.505.505,0,0,0,0,.382.518.518,0,0,0,.109.163l2,2A.5.5,0,0,0-13.5,5a.5.5,0,0,0,.354-.146.5.5,0,0,0,0-.708L-14.293,3H-14A6.006,6.006,0,0,1-8,9a6.006,6.006,0,0,1-6,6c-.155,0-.31-.006-.462-.018a.516.516,0,0,0-.536.46.5.5,0,0,0,.46.537c.178.014.357.021.538.021A7.008,7.008,0,0,0-7,9,7.008,7.008,0,0,0-14,2Zm-.854,9.854A.5.5,0,0,0-14.5,12a.5.5,0,0,0,.354-.146l4-4a.5.5,0,0,0,0-.708.5.5,0,0,0-.708,0L-14.5,10.793l-1.646-1.647a.5.5,0,0,0-.708,0,.5.5,0,0,0,0,.708Z"
                        transform="translate(21 0)"
                      ></path>
                    </svg>
                  </span>
                  Version History
                </h1>
                <div className="relative  max-h-auto  overflow-y-auto scrollbar-hidden">
                  {/* Vertical connecting line - no z-index, behind content */}
                  <div className="absolute h-full left-[20px] top-5 bottom-5 border-l border-gray-300"></div>

                  {/* Content with z-index to be on top */}
                  <div className="flex flex-col space-y-8 relative z-10">
                    {/* All Version */}
                    {allVersion.map((item, index) => (
                      <div className="flex items-start space-x-4" key={index}>
                        <div className="flex-shrink-0 w-[40px] h-[30px] bg-primary text-white rounded-full flex items-center justify-center font-semibold text-caption">
                          {item}
                        </div>
                        <div className="flex flex-col space-y-1">
                          <p className="text-h6">ZenTrio Reporting Document</p>
                          <p className="text-caption-tiny text-title/50">
                            {report?.payload?.boardData?.createdBy?.username} ·
                            1 hour ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
