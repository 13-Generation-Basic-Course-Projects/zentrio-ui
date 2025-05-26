import React from "react";
import BredCrum from "../bredcrum/Bredcrum";
import { BtnPreview, BtnSaveAs } from "../button/ButtonReport";
import HorizontalChart from "../chart/horizontalChart";
import VerticalChart from "../chart/VerticalChart";


export default function Reportpage() {
  return (
    <div className="p-5">
      <BredCrum
        board={"Hikoko Design"}
        feature={"Reports"}
        header={"Reports"}
      />
      {/* Their button */}
      <div className="flex flex-row space-x-2">
        <BtnPreview />
        <BtnSaveAs />
      </div>

      {/* Content in Report */}
      <div className="grid grid-cols-12 gap-2 mt-5">
        {/* layout at left */}
        <div className="col-span-8">
          {/* Show number have in 4 Stage */}
          <div className="grid grid-cols-4 gap-2">
            {/* Todo */}
            <div className="bg-primary/20 rounded-medium p-5 text-primary text-h6 font-semibold">
              <div className="flex flex-col space-y-2">
                <p>Todo</p>
                <div className="flex justify-between items-center">
                  <p>3</p>
                  <p className="flex items-center gap-1 text-h6">
                    Task
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="14 20.18 10.41 16.59 9 18 14 23 23 14 21.59 12.58 14 20.18"></polygon>
                      <path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z"></path>
                    </svg>
                  </p>
                </div>
              </div>
            </div>

            {/* On Progress */}
            <div className="bg-progress-purple/20 rounded-medium p-5 text-progress-purple/90 text-h6 font-semibold">
              <div className="flex flex-col space-y-2">
                <p>On Progress</p>
                <div className="flex justify-between items-center">
                  <p>3</p>
                  <p className="flex items-center gap-1 text-h6">
                    Task
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="14 20.18 10.41 16.59 9 18 14 23 23 14 21.59 12.58 14 20.18"></polygon>
                      <path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z"></path>
                    </svg>
                  </p>
                </div>
              </div>
            </div>

            {/* Under Review */}
            <div className="bg-progress-red/20 rounded-medium p-5 text-progress-red/90 text-h6 font-semibold">
              <div className="flex flex-col space-y-2">
                <p>Under Review</p>
                <div className="flex justify-between items-center">
                  <p>3</p>
                  <p className="flex items-center gap-1 text-h6">
                    Task
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="14 20.18 10.41 16.59 9 18 14 23 23 14 21.59 12.58 14 20.18"></polygon>
                      <path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z"></path>
                    </svg>
                  </p>
                </div>
              </div>
            </div>

            {/* Done */}
            <div className="bg-progress-green/20 rounded-medium p-5 text-progress-green/90 text-h6 font-semibold">
              <div className="flex flex-col space-y-2">
                <p>Done</p>
                <div className="flex justify-between items-center">
                  <p>3</p>
                  <p className="flex items-center gap-1 text-h6">
                    Task
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="14 20.18 10.41 16.59 9 18 14 23 23 14 21.59 12.58 14 20.18"></polygon>
                      <path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z"></path>
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Show chart vertical chart */}
          <div className="mt-10">
            <VerticalChart/>
          </div>

          {/* Show chart horizontal chart */}
          <div className="mt-10">
            <HorizontalChart />
          </div>
        </div>

        {/* layout at right */}
        <div className="col-span-4 space-y-10">
          {/* Chart show amount member */}
          <div className="border-1 rounded-medium bg-[#FFFFFF] shadow-small p-4 flex flex-col ">
            <h1 className="text-left py-5 text-h6 text-title/50">
              Amount of Members
            </h1>
            <p className="border border-title/10 w-full my-2"></p>
            <div className="relative w-[200px] h-[200px] mx-auto">
              {/* Big Blue Circle */}
              <div className="absolute w-[160px] h-[160px] bg-blue-500 rounded-full border-3 border-bgColor flex items-center justify-center">
                <p className="text-h3 text-white font-semibold">15</p>
              </div>

              {/* Medium Purple Circle */}
              <div
                className="absolute w-[100px] h-[100px] bg-purple-500 rounded-full border-3 border-bgColor flex items-center justify-center"
                style={{ top: "20px", left: "120px" }}
              >
                <p className="text-h5 text-white font-semibold">5</p>
              </div>

              {/* Small Black Circle */}
              <div
                className="absolute w-[80px] h-[80px] bg-black rounded-full border-3 border-bgColor flex items-center justify-center"
                style={{ top: "80px", left: "110px" }}
              >
                <p className="text-h6 text-white font-semibold">1</p>
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
          <div className="border-1 rounded-medium bg-[#FFFFFF] shadow-small p-4 flex flex-col ">
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

            <div className="relative max-w-md max-h-auto">
              {/* Vertical connecting line - no z-index, behind content */}
              <div className="absolute left-[20px] top-5 bottom-5 border-l border-gray-300"></div>

              {/* Content with z-index to be on top */}
              <div className="flex flex-col space-y-8 relative z-10">
                {/* Version 1 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-[40px] h-[30px] bg-primary text-white rounded-full flex items-center justify-center font-semibold text-caption">
                    V1
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-h6">ZenTrio Reporting Document</p>
                    <p className="text-caption-tiny text-title/50">
                      Ny Fong · 1 hour ago
                    </p>
                  </div>
                </div>

                {/* Version 2 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-[40px] h-[30px] bg-primary text-white rounded-full flex items-center justify-center font-semibold text-caption">
                    V2
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-h6">ZenTrio Final Report</p>
                    <p className="text-caption-tiny text-title/50">
                      Ny Fong · 10 minutes ago
                    </p>
                  </div>
                </div>

                {/* Version 3 */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-[40px] h-[30px] bg-primary text-white rounded-full flex items-center justify-center font-semibold text-caption">
                    V3
                  </div>
                  <div className="flex flex-col space-y-1">
                    <p className="text-h6">ZenTrio Final Report</p>
                    <p className="text-caption-tiny text-title/50">
                      Ny Fong · 10 minutes ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
