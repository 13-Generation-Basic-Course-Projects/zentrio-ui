"use client";

import BredCrum from "../bredcrum/MyBredcrum";
import HorizontalChart from "../chart/HorizontalChart";

import dynamic from "next/dynamic";

const VerticalChartNoSSR = dynamic(() => import("../chart/VerticalChart"), {
  ssr: false,
});

export default function Reportpage({ modal, report, version }) {
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

  report?.payload?.groupedTasks?.forEach((item) => {
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

  report?.payload?.allMembers?.forEach((item) => {
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

  report?.payload?.groupedTasks?.forEach((item) => {
    item?.tasks?.forEach((value) => {
      if (item.stage == "TO DO") {
        cheklist.inTodo = cheklist.inTodo + value.allChecklists.length;
      } else if (item.stage == "IN_PROGRESS") {
        cheklist.inProgress = cheklist.inProgress + value.allChecklists.length;
      } else if (item.stage == "UNDER_REVIEW") {
        cheklist.inReview = cheklist.inReview + value.allChecklists.length;
      } else {
        cheklist.inDone = cheklist.inDone + value.allChecklists.length;
      }
    });
  });

  const getVersion = version?.payload;

  const groupedTasks = report?.payload?.groupedTasks;
  console.log("apple", groupedTasks);
  if (groupedTasks == null) {
    return <></>;
  }

  const dateForCreate = getVersion?.map((item) => {
    const date = new Date(
      item?.data?.boardData?.createdAt[0],              // year
      item?.data?.boardData?.createdAt[1] - 1,          // month (0-based in JS)
      item?.data?.boardData?.createdAt[2],              // day
      item?.data?.boardData?.createdAt[3],              // hour
      item?.data?.boardData?.createdAt[4],              // minute
      item?.data?.boardData?.createdAt[5],              // second
      item?.data?.boardData?.createdAt[6] // microseconds → milliseconds
    )

    const current = new Date();

    const convert = current - date;

    // return convert > 0 ? convert : 0;
    return String(convert / 86400000).split('.')[0];
  })

  console.log("Seng Ngoun is gay: ", getVersion?.map((item) => item?.data))
  console.log("Username: ", Object.values(report?.payload)?.map((item) => item?.data?.boardData?.createdBy?.username))
  console.log("Be not Gay: ", Object.entries(report?.payload)?.map((item) => item?.data?.version))
  console.log("ah hong tix tix: ", dateForCreate)
  return (
    <>
      <div className="p-5">
        <BredCrum
          board={"Hikoko Design"}
          feature={"Reports"}
          header={"Reports"}
          modal={modal}
        />

        { }
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5 overflow-y-auto h-screen md:h-fit scrollbar-hidden">
          <div className="md:col-span-8 md:h-screen flex flex-col lg:col-span-9">
            <div className=" overflow-y-auto scrollbar-hidden pb-40 p-2">
              { }
              <div className="grid grid-cols-4 gap-2">
                {tasks?.map((item, index) => (
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
              { }
              { }

              <div className="mt-5 border-1 rounded-medium pl-8 pr-16 pb-8">
                <VerticalChartNoSSR report={report} />
              </div>

              { }
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

          { }
          <div className="md:col-span-4 space-y-10 md:h-screen flex flex-col lg:col-span-3">
            <div className=" flex flex-col  gap-2 overflow-y-auto scrollbar-hidden pb-[250px]">
              { }
              <div className="border-1 rounded-medium bg-[#FFFFFF] px-4 pb-4 flex flex-col ">
                <h1 className="text-left pb-5 pt-4 text-h6 text-title/50">
                  Amount of Members
                </h1>
                <p className="border border-title/10 w-full my-2"></p>
                <div className="relative w-[200px] h-[200px] mx-auto">
                  { }
                  <div className="absolute w-[160px] h-[160px] bg-blue-500 rounded-full border-3 border-bgColor flex items-center justify-center">
                    <p className="text-h3 text-white font-semibold">
                      {userRole.m}
                    </p>
                  </div>

                  { }
                  <div
                    className="absolute w-[100px] h-[100px] bg-purple-500 rounded-full border-3 border-bgColor flex items-center justify-center"
                    style={{ top: "20px", left: "120px" }}
                  >
                    <p className="text-h5 text-white font-semibold">
                      {userRole.tl}
                    </p>
                  </div>

                  { }
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

              { }
              <div className="border-1 rounded-medium bg-[#FFFFFF] p-4 flex flex-col h-[300px] mt-3">
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
                  { }


                  { }
                  <div className="flex flex-col space-y-8 relative z-10">
                    { }
                    {/* {allVersion.map((item, index) => (
                      <div className="flex items-start space-x-4" key={index}>
                        <div className="flex-shrink-0 w-[40px] h-[30px] bg-primary text-white rounded-full flex items-center justify-center font-semibold text-caption">
                          {item}
                        </div>
                        <div className="flex flex-col space-y-1">
                          <p className="text-h6">ZenTrio Reporting Document</p>
                          <p className="text-caption-tiny text-title/50">
                            {report?.payload?.boardData?.createdBy?.username}
                          </p>
                        </div>
                        <div className="absolute h-full left-[0.75%] -z-30 top-5 bottom-5 border-l border-gray-300"></div>
                      </div>
                    ))} */}

                    {
                      getVersion?.map((item, index) => (
                        <div className="flex items-start space-x-4" key={index}>
                          <div className="flex-shrink-0 w-[40px] h-[30px] bg-primary text-white rounded-full flex items-center justify-center font-semibold text-caption">
                            {item?.data?.version}
                          </div>
                          <div className="flex flex-col space-y-1">
                            <p className="text-h6">{report?.payload?.boardData?.title}.pdf</p>
                            <p className="text-caption-tiny text-title/50">
                              {item?.data?.boardData?.createdBy?.username}
                              &nbsp;·&nbsp;
                              {(() => {
                                const createdDate = new Date(
                                  item?.data?.boardData?.createdAt[0],
                                  item?.data?.boardData?.createdAt[1] - 1,
                                  item?.data?.boardData?.createdAt[2],
                                  item?.data?.boardData?.createdAt[3],
                                  item?.data?.boardData?.createdAt[4],
                                  item?.data?.boardData?.createdAt[5],
                                  item?.data?.boardData?.createdAt[6] || 0
                                );

                                const timeDiff = new Date() - createdDate;

                                if (timeDiff <= 0) return 'now';

                                const value = timeDiff > 31536000000 ? String(timeDiff / 31536000000).split('.')[0]
                                  : timeDiff > 2592000000 ? String(timeDiff / 2592000000).split('.')[0]
                                    : timeDiff > 86400000 ? String(timeDiff / 86400000).split('.')[0]
                                      : timeDiff > 3600000 ? String(timeDiff / 3600000).split('.')[0]
                                        : timeDiff > 60000 ? String(timeDiff / 60000).split('.')[0]
                                          : timeDiff > 1000 ? String(timeDiff / 1000).split('.')[0]
                                            : 0;

                                const unit = timeDiff > 31536000000 ? 'year'
                                  : timeDiff > 2592000000 ? 'month'
                                    : timeDiff > 86400000 ? 'day'
                                      : timeDiff > 3600000 ? 'hour'
                                        : timeDiff > 60000 ? 'minute'
                                          : timeDiff > 1000 ? 'second'
                                            : '';

                                if (value == 0) return 'now';

                                return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
                              })()}
                            </p>
                          </div>
                          <div className="absolute h-full left-[0.75%] -z-30 top-5 bottom-5 border-l border-gray-300"></div>
                        </div>
                      ))
                    }

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
