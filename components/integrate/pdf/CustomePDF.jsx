import Laptop from "@/assets/intergrating/image/computerImg.png";
import Image from "next/image";
import GanttChart from "@/assets/calendarlanding.svg";
import { getReportAction } from "@/action/report.action";

const CustomePDF = async () => {

  return (
    <>
      <div className="w-full h-full bg-slate-blue">
        <PDFPreviewer report={reportData} />
      </div>
    </>
  );
};

export default CustomePDF;

// This for background image for cover
export const CoverBgImg = () => {
  return (
    <>
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
    </>
  );
};

export const CoverPage = ({ report }) => {
  return (
    <>
      <div className={`w-full h-full flex justify-center items-center`}>
        {/* Copy from this */}
        <div className="bg-[#D6DEE1] w-[595px] h-[842px]">
          <div className="h-full flex items-center justify-center relative">
            <div className="absolute bottom-0">
              <CoverBgImg />
            </div>
            <div className="flex pt-[7.5%] justify-center w-[512px] h-[762px] border-2 border-white absolute">
              <div className="w-[404px] h-[633px] bg-white flex justify-center pt-[15%] relative">
                <div className="w-[263px] h-[465px] bg-gradient-to-bl from-[#9BDBFD]/15 to-[#9BDBFD]/15"></div>
                <p className="absolute top-[20%] text-title text-h5 w-[130px] left-[3%] text-end">
                  <span className="font-bold">Report from zentrio board</span>
                </p>
                <div className="absolute h-[95px] right-0 bottom-[40%] flex flex-col justify-between">
                  <p className="text-[12px] bg-black text-white px-[13px] py-[12px] font-bold">
                    [COMPANY LETTERHEAD WITH LOGO]
                  </p>
                  <div className="w-full h-[42px] pl-[20%] flex justify-between flex-col">
                    <p className="text-[12px]">[Company Name]</p>
                    <p className="text-[12px]">[Insert Contact Detail]</p>
                  </div>
                </div>
                <div className="absolute bg-white w-[285px] bottom-0 right-0 text-title flex flex-col justify-between pt-[2%]">
                  <div className="w-full h-[56px] pl-[3%]">
                    <p className="text-[15px]">
                      <span className="font-bold">Prepared by:</span>
                    </p>
                    <p className="text-[15px]">Mr. Lim Rosskan</p>
                  </div>
                  <div className="pl-[3%]">
                    <p className="text-[12px] h-[48px]">
                      Any inquiries with respect to this report may be directed
                      to:
                    </p>
                    <p className="text-[12px] h-[42px]">[Insert Name]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const HeaderPage = () => {
  return (
    <>
      <div className="absolute top-0 left-0 ">
        <p className="bg-primary w-[199px] h-[40px] rounded-tr-[12px] rounded-bl-[12px] flex justify-center items-center text-h4 text-white">
          <span className="font-bold">Reports</span>
        </p>
      </div>
    </>
  );
};

export const PageNumber = ({ num }) => {
  return (
    <>
      <div className="absolute bottom-[2%] w-full flex justify-center">
        <p className="text-[12px]">
          <span className="font-bold">page {num}</span>
        </p>
      </div>
    </>
  );
};

export const BoardTable = () => {
  return (
    <>
      <div className="w-full h-[70px] bg-slate-green">
        <div className="w-full h-full border-1 border-black rounded-[5px]">
          <table className="w-full text-center text-[12px] bg-primary">
            <thead className="h-7">
              <tr className="h-full font-bold text-white border-b-1 border-black">
                <th className="w-[120px]">Board Name</th>
                <th className="w-[120px] border-x-1 border-black">Task</th>
                <th className="w-[120px] border-r-1 border-black">Version</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="h-[40px]">
              <tr className="h-full bg-white">
                <td>Hikko Design</td>
                <td className="border-x-1 border-black">08</td>
                <td className="border-r-1 border-black">02</td>
                <td>18/05/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export const StageTable = () => {
  return (
    <>
      <div className="border-1 rounded-[5px] border-black">
        <table className="text-[12px] w-full text-left">
          <thead className="h-[26px] bg-primary text-white border-b-1 border-black">
            <tr className="h-full">
              <th className="pl-[27px]">Stage</th>
              <th className="pl-[27px] border-x-1 border-black">Tasks</th>
              <th className="pl-[27px]">Checklists</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="h-[32px] border-b-1 border-black">
              <td className="stage-name pl-[27px]">To Do</td>
              <td className="pl-[27px] border-x-1 border-black">10 tasks</td>
              <td className="pl-[27px]">10 checklists</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="stage-name pl-[27px]">Progress</td>
              <td className="pl-[27px] border-x-1 border-black">8 tasks</td>
              <td className="pl-[27px]">5 checklists</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="stage-name pl-[27px]">Under Review</td>
              <td className="pl-[27px] border-x-1 border-black">5 tasks</td>
              <td className="pl-[27px]">7 checklists</td>
            </tr>
            <tr className="h-[32px]">
              <td className="stage-name pl-[27px]">Completed</td>
              <td className="pl-[27px] border-x-1 border-black">3 tasks</td>
              <td className="pl-[27px]">6 checklists</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const TodoTable = () => {
  return (
    <>
      <div className="w-full h-[70px] bg-slate-green">
        <div className="w-full h-full">
          <table className="w-full text-left text-[12px] bg-primary">
            <thead className="h-7">
              <tr className="h-full font-bold text-white border-b-1 border-black">
                <th className="w-[220px] pl-[27px]">Task Title</th>
                <th className="pl-[27px] border-x-1 border-black">Lead</th>
                <th className=" pl-[27px] border-r-1 border-black">
                  Subtask Count
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-full bg-white border-b-1 border-black">
                <td className="h-[28px] pl-[27px]">Setup project repo</td>
                <td className="h-[28px] pl-[27px] border-x-1 border-black">
                  Alice
                </td>
                <td className="h-[28px] pl-[27px] border-black">1</td>
              </tr>
              <tr className="h-full bg-white border-b-1 border-black">
                <td className="h-[28px] pl-[27px]">Design UI</td>
                <td className="h-[28px] pl-[27px] border-x-1 border-black">
                  Bob
                </td>
                <td className="h-[28px] pl-[27px] border-black">2</td>
              </tr>
              <tr className="h-full bg-white border-b-1 border-black">
                <td className="h-[28px] pl-[27px]">API Development</td>
                <td className="h-[28px] pl-[27px] border-x-1 border-black">
                  Charlie
                </td>
                <td className="h-[28px] pl-[27px] border-black">1</td>
              </tr>
              <tr className="h-full bg-white">
                <td className="h-[28px] pl-[27px]">Requirement gathering</td>
                <td className="h-[28px] pl-[27px] border-x-1 border-black">
                  David
                </td>
                <td className="h-[28px] pl-[27px] border-black">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export const UnderReview = () => {
  return (
    <>
      <div className="w-full max-w-[920px] rounded-[5px] overflow-hidden text-[12px]">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="h-7">
            <tr className="bg-[#54c0d6] text-white font-bold">
              <th className="pl-[27px] w-[33%] border border-black">
                Task Title
              </th>
              <th className="pl-[27px] w-[33%] border border-black">Lead</th>
              <th className="pl-[27px] w-[33%] border border-black">
                Subtask Count
              </th>
            </tr>
          </thead>
          <tbody className="text-[#003b4a]">
            <tr className="bg-white h-[32px]">
              <td className="pl-[27px] border border-black">Setup CI/CD</td>
              <td className="pl-[27px] border border-black">Bob</td>
              <td className="pl-[27px] border border-black">2</td>
            </tr>
            <tr className="bg-white h-[32px]">
              <td className="pl-[27px] border border-black">Frontend Dev</td>
              <td className="pl-[27px] border border-black">Alice</td>
              <td className="pl-[27px] border border-black">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const Progress = () => {
  return (
    <>
      <div className="w-full max-w-[920px] rounded-[5px] overflow-hidden text-[12px]">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="h-7">
            <tr className="bg-[#54c0d6] text-white font-bold">
              <th className="pl-[27px] w-[33%] border border-black">
                Task Title
              </th>
              <th className="pl-[27px] w-[33%] border border-black">Lead</th>
              <th className="pl-[27px] w-[33%] border border-black">
                Subtask Count
              </th>
            </tr>
          </thead>
          <tbody className="text-[#003b4a]">
            <tr className="bg-white h-[32px]">
              <td className="pl-[27px] border border-black">QA Testing</td>
              <td className="pl-[27px] border border-black">Charlie</td>
              <td className="pl-[27px] border border-black">2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const Done = () => {
  return (
    <>
      <div className="w-full max-w-[920px] rounded-[5px] overflow-hidden text-[12px]">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="h-7">
            <tr className="bg-[#54c0d6] text-white font-bold">
              <th className="pl-[27px] w-[33%] border border-black">
                Task Title
              </th>
              <th className="pl-[27px] w-[33%] border border-black">Lead</th>
              <th className="pl-[27px] w-[33%] border border-black">
                Subtask Count
              </th>
            </tr>
          </thead>
          <tbody className="text-[#003b4a]">
            <tr className="bg-white h-[32px]">
              <td className="pl-[27px] border border-black">
                Backend Deployment
              </td>
              <td className="pl-[27px] border border-black">David</td>
              <td className="pl-[27px] border border-black">1</td>
            </tr>
            <tr className="bg-white h-[32px]">
              <td className="pl-[27px] border border-black">Documentation</td>
              <td className="pl-[27px] border border-black">Alice</td>
              <td className="pl-[27px] border border-black">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const Subtasks = () => {
  return (
    <>
      <div className="w-full max-w-[920px] rounded-[5px] overflow-hidden text-[12px] mx-auto">
        <table className="w-full text-center border-collapse">
          <thead className="h-7">
            <tr className="font-normal">
              <th className="w-[105px] border border-black bg-[#54c0d6] text-white">
                Task Title
              </th>
              <th className="border border-black bg-white">
                Backend Deployment
              </th>
              <th className="border border-black bg-white">Documentation</th>
            </tr>
          </thead>
          <tbody className="text-[#003b4a]">
            <tr className="bg-white h-[32px]">
              <td className="w-[105px] border border-black bg-[#54c0d6] text-white font-bold">
                Subtask Title
              </td>
              <td className="border border-black">Deploy to server</td>
              <td className="border border-black">Final review</td>
            </tr>
            <tr className="bg-white h-[32px]">
              <td className="w-[105px] border border-black bg-[#54c0d6] text-white font-bold">
                Members
              </td>
              <td className="border border-black">David</td>
              <td className="border border-black">Alice</td>
            </tr>
            <tr className="bg-white h-[32px]">
              <td className="w-[105px] border border-black bg-[#54c0d6] text-white font-bold">
                Attachments
              </td>
              <td className="border border-black text-blue-600">
                deploy_guide.pdf , env_var.env
              </td>
              <td className="border border-black text-blue-600">
                docs_final.md
              </td>
            </tr>
            <tr className="bg-white h-[32px]">
              <td className="w-[105px] border border-black bg-[#54c0d6] text-white font-bold">
                Comments
              </td>
              <td className="border border-black">1 comment</td>
              <td className="border border-black">0 comment</td>
            </tr>
            <tr className="bg-white h-[32px]">
              <td className="w-[105px] border border-black bg-[#54c0d6] text-white font-bold">
                Start Date
              </td>
              <td className="border border-black">2025-05-03</td>
              <td className="border border-black">2025-05-01</td>
            </tr>
            <tr className="bg-white h-[32px]">
              <td className="w-[105px] border border-black bg-[#54c0d6] text-white font-bold">
                End Date
              </td>
              <td className="border border-black">2025-05-04</td>
              <td className="border border-black">2025-05-02</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const MonthlyTask = () => {
  return (
    <>
      <div className="w-full h-full border-1 border-black rounded-[5px]">
        <table className="w-full">
          <thead className="w-full">
            <tr className="text-[10px] w-full bg-primary text-white font-bold">
              <th className="h-[32px] w-[96px] text-left pl-[5%]">Month</th>
              <th className="border-x-1 border-black text-left pl-[5%] w-[76px]">
                Task
              </th>
              <th className="w-[96px] text-left pl-[5%]">Subtask</th>
              <th className="w-[96px] text-left pl-[5%] border-x-1 border-black">
                Completed
              </th>
              <th className="w-[96px] text-left pl-[5%]">Version</th>
            </tr>
          </thead>
          <tbody className="w-full text-[12px] bg-white">
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">January</td>
              <td className="pl-[5%] border-r-1 border-black">4</td>
              <td className="pl-[5%] border-r-1 border-black">6</td>
              <td className="pl-[5%] border-r-1 border-black">72%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">February</td>
              <td className="pl-[5%] border-r-1 border-black">5</td>
              <td className="pl-[5%] border-r-1 border-black">8</td>
              <td className="pl-[5%] border-r-1 border-black">78%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">March</td>
              <td className="pl-[5%] border-r-1 border-black">6</td>
              <td className="pl-[5%] border-r-1 border-black">9</td>
              <td className="pl-[5%] border-r-1 border-black">80%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">April</td>
              <td className="pl-[5%] border-r-1 border-black">7</td>
              <td className="pl-[5%] border-r-1 border-black">11</td>
              <td className="pl-[5%] border-r-1 border-black">83%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">May</td>
              <td className="pl-[5%] border-r-1 border-black">8</td>
              <td className="pl-[5%] border-r-1 border-black">13</td>
              <td className="pl-[5%] border-r-1 border-black">85%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">June</td>
              <td className="pl-[5%] border-r-1 border-black">9</td>
              <td className="pl-[5%] border-r-1 border-black">14</td>
              <td className="pl-[5%] border-r-1 border-black">88%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">July</td>
              <td className="pl-[5%] border-r-1 border-black">10</td>
              <td className="pl-[5%] border-r-1 border-black">16</td>
              <td className="pl-[5%] border-r-1 border-black">90%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">August</td>
              <td className="pl-[5%] border-r-1 border-black">9</td>
              <td className="pl-[5%] border-r-1 border-black">15</td>
              <td className="pl-[5%] border-r-1 border-black">89%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">September</td>
              <td className="pl-[5%] border-r-1 border-black">8</td>
              <td className="pl-[5%] border-r-1 border-black">13</td>
              <td className="pl-[5%] border-r-1 border-black">87%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">October</td>
              <td className="pl-[5%] border-r-1 border-black">7</td>
              <td className="pl-[5%] border-r-1 border-black">12</td>
              <td className="pl-[5%] border-r-1 border-black">86%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">November</td>
              <td className="pl-[5%] border-r-1 border-black">6</td>
              <td className="pl-[5%] border-r-1 border-black">10</td>
              <td className="pl-[5%] border-r-1 border-black">84%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px] border-b-1 border-black">
              <td className="pl-[5%] border-r-1 border-black">December</td>
              <td className="pl-[5%] border-r-1 border-black">5</td>
              <td className="pl-[5%] border-r-1 border-black">9</td>
              <td className="pl-[5%] border-r-1 border-black">82%</td>
              <td className="pl-[5%]">v1</td>
            </tr>
            <tr className="h-[32px]">
              <td className="pl-[5%] border-r-1 border-black">Total</td>
              <td className="pl-[5%] border-r-1 border-black">84</td>
              <td className="pl-[5%] border-r-1 border-black">136</td>
              <td className="pl-[5%] border-r-1 border-black">84% avg</td>
              <td className="pl-[5%]">v1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export const PageOne = ({ report }) => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        {/* Copy from this */}
        <div className="bg-white w-[595px] h-[842px] relative">
          <HeaderPage />
          <div>
            <div className="w-full flex flex-col justify-between items-center absolute bottom-[7.5%] h-[640px]">
              <div className="w-[485px]">
                {/* Write code here */}
                <div className="h-[30%]">
                  <BoardTable />
                </div>
                <div className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text h-full">
                  <div className="h-[75%]">
                    <div>
                      <p className="text-[16px]">
                        I.&nbsp;&nbsp;Gantt Bar in{" "}
                        <span className="text-transparent">Hikko Design</span>
                      </p>
                      <div className="flex justify-center items-center relative">
                        <div className="absolute w-[255px] h-[168px] mt-[45%]">
                          <Image
                            src={GanttChart}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>
                        <div className="absolute top-[90%]">
                          <Image
                            src={Laptop}
                            alt=""
                            className="w-[335px] h-[228px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[16px] pb-3">
                      II.&nbsp;&nbsp;Stages Information
                    </p>
                    <p className="text-[12px] pl-5">
                      This section provides a structured overview of the
                      project’s workflow distribution across four stages: To Do,
                      Progress, Under Review, and Completed.
                    </p>
                    <div className="w-full h-[174px] flex justify-center items-end">
                      <div className="bg-slate-red w-[403px] h-[85%]">
                        <StageTable />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PageNumber num={1} />
        </div>
      </div>
    </>
  );
};

export const PageTwo = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-slate-blue">
        {/* Copy from this */}
        <div className="bg-white w-[595px] h-[842px] relative">
          <HeaderPage />
          <div>
            <div className="w-full flex flex-col justify-between items-center absolute bottom-[7.5%] h-[680px]">
              <div className="w-[500px]">
                {/* Write code here */}
                <div className="h-[580px] flex flex-col justify-between">
                  <div className="pb-[5%]">
                    <p className="text-body font-medium">
                      III.&nbsp;&nbsp;To Do Information
                    </p>
                    <div className="w-full h-[174px] flex items-end">
                      <div className="w-full h-[85%] border-1 border-black rounded-[5px]">
                        <TodoTable />
                      </div>
                    </div>
                  </div>
                  <div className="pb-[5%]">
                    <p className="text-body font-medium">
                      IV.&nbsp;&nbsp;Under Review information
                    </p>
                    <div className="w-full h-[154px] flex items-end">
                      <div className="w-full h-[85%]">
                        <UnderReview />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-body font-medium">
                      V.&nbsp;&nbsp;Progress information
                    </p>
                    <div className="w-full h-[154px] flex items-end">
                      <div className="w-full h-[85%]">
                        <Progress />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PageNumber num={2} />
        </div>
      </div>
    </>
  );
};

export const PageThree = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-slate-blue">
        {/* Copy from this */}
        <div className="bg-white w-[595px] h-[842px] relative">
          <HeaderPage />
          <div>
            <div className="w-full flex flex-col justify-between items-center absolute bottom-[7.5%] h-[680px]">
              <div className="w-[500px]">
                {/* Write code here */}
                <div className="h-full flex flex-col justify-between">
                  <div className="pb-[5%]">
                    <p className="text-body font-medium">
                      VI.&nbsp;&nbsp;Stage : Done
                    </p>
                    <div className="w-full h-[154px] flex items-end">
                      <div className="w-full h-[85%]">
                        <Done />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-body font-medium">
                      VII.&nbsp;&nbsp;Subtasks
                    </p>
                    <div className="w-full h-[154px] flex items-end">
                      <div className="w-full h-[85%]">
                        <Subtasks />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PageNumber num={3} />
        </div>
      </div>
    </>
  );
};

export const PageFour = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-slate-blue">
        {/* Copy from this */}
        <div className="bg-white w-[595px] h-[842px] relative">
          <HeaderPage />
          <div>
            <div className="w-full flex flex-col justify-between items-center absolute bottom-[7.5%] h-[680px]">
              <div className="w-[500px]">
                {/* Write code here */}
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <p className="text-body font-medium">
                      VIII.&nbsp;&nbsp;Monthly Task information
                    </p>
                    <div className="w-full h-full flex items-end">
                      <div className="w-full h-auto bg-slate-red">
                        <MonthlyTask />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PageNumber num={4} />
        </div>
      </div>
    </>
  );
};

export const PDFPreviewer = ({ report }) => {
  const taskData = [
    { month: "January", tasks: 4, subtasks: 6, completed: "72%" },
    { month: "February", tasks: 5, subtasks: 8, completed: "78%" },
    { month: "March", tasks: 6, subtasks: 9, completed: "80%" },
    { month: "April", tasks: 7, subtasks: 11, completed: "83%" },
    { month: "May", tasks: 8, subtasks: 13, completed: "85%" },
    { month: "June", tasks: 9, subtasks: 14, completed: "88%" },
    { month: "July", tasks: 10, subtasks: 16, completed: "90%" },
    { month: "August", tasks: 9, subtasks: 15, completed: "89%" },
    { month: "September", tasks: 8, subtasks: 13, completed: "87%" },
    { month: "October", tasks: 7, subtasks: 12, completed: "86%" },
    { month: "November", tasks: 6, subtasks: 10, completed: "84%" },
    { month: "December", tasks: 5, subtasks: 9, completed: "82%" },
  ];

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
  }

  report?.payload?.allTasks.forEach((item) => {
    if (item.task == "TO DO") {
      ++task.todo;
      checkList.todo = checkList.todo + item?.checklist.length;
    } else if (item.task == "IN_PROGRESS") {
      ++task.progress;
      checkList.progress = checkList.progress + item?.checklist.length;
    } else if (item.task == "UNDER_REVIEW") {
      ++task.review;
      checkList.review = checkList.review + item?.checklist.length;
    } else {
      ++task.done;
      checkList.done = checkList.done + item?.checklist.length;
    }
  });

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
                1
              </p>
              <p>/</p>
              <p>2</p>
            </div>
            <div className="flex items-center text-white justify-evenly w-40 h-7 pl-3 border-l-1 border-gray-100/50">
              <div className="w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-black">
                <p className="text-h2">-</p>
              </div>
              <p className="text-body-sm h-6 w-14 flex justify-center items-center bg-black">
                100%
              </p>
              <div className="w-8 h-8 hover:bg-black flex items-center cursor-pointer justify-center">
                <p className="text-h2">+</p>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 hover:bg-black flex justify-center items-center cursor-pointer">
            <svg
              width="{24}"
              height="{24}"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.59 9H15V4C15 3.45 14.55 3 14 3H10C9.45 3 9 3.45 9 4V9H7.41C6.52 9 6.07 10.08 6.7 10.71L11.29 15.3C11.68 15.69 12.31 15.69 12.7 15.3L17.29 10.71C17.92 10.08 17.48 9 16.59 9ZM5 19C5 19.55 5.45 20 6 20H18C18.55 20 19 19.55 19 19C19 18.45 18.55 18 18 18H6C5.45 18 5 18.45 5 19Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* this body */}
        <div className="w-full h-[95%] flex relative">
          {/* this pdf sidebar */}
          {/* <div className="absolute top-0 left-0 h-full w-[15%] overflow-y-scroll">
            <div className="bg-title flex justify-center">
              <div className="flex flex-col justify-center py-[10%] gap-[30%]">
                <div className="bg-slate-blue hover:border-2 hover:border-title w-[595px] h-[842px]">
                  1
                </div>
                <div className="bg-slate-green hover:border-2 hover:border-title w-[595px] h-[842px]">
                  2
                </div>
                <div className="bg-slate-orange hover:border-2 hover:border-title w-[595px] h-[842px]">
                  3
                </div>
                <div className="bg-blue-100 hover:border-2 hover:border-title w-[595px] h-[842px]">
                  4
                </div>
                <div className="bg-green-100 hover:border-2 hover:border-title w-[595px] h-[842px]">
                  5
                </div>
              </div>
            </div>
          </div> */}

          {/* this pdf display */}
          <div className="h-auto w-full flex justify-center pt-[2.5%] overflow-y-scroll bg-[#D3D3D3]">
            <div>
              <div className="flex flex-col justiify-center gap-20">
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
                            <p style={{ fontSize: "15px" }}>Mr. {report?.payload?.boardData?.createdBy?.username}</p>
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
                            color: "white",
                          }}
                        >
                          <tr>
                            <td style={{ width: "120px" }}>Board Name</td>
                            <td style={{ width: "120px" }}>Task</td>
                            <td style={{ width: "120px" }}>Version</td>
                            <td style={{ width: "120px" }}>Date</td>
                          </tr>
                        </thead>
                        <tbody style={{ height: "40px" }}>
                          <tr style={{ borderTop: "1px solid black" }}>
                            <td>{report?.payload?.boardData?.title}</td>
                            <td>{task.todo + task.progress + task.review + task.done}</td>
                            <td>{report?.payload?.version}</td>
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
                        <div className="img" style={{ position: "absolute", translate: "10%"}}>
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
                                        Setup project repo
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Alice
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>1</td>
                                    </tr>
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
                                        Design UI
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Bob
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>2</td>
                                    </tr>
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
                                        API Development
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Charlie
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>1</td>
                                    </tr>
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
                                        Requirement gathering
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        David
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>1</td>
                                    </tr>
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
                                      Setup CI/CD
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Bob
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>2</td>
                                  </tr>
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
                                      Frontend Dev
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Alice
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>1</td>
                                  </tr>
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
                                      QA Testing
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Charlie
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>2</td>
                                  </tr>
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
                                        Backend Deployment
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        David
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>1</td>
                                    </tr>
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
                                        Documentation
                                      </td>
                                      <td
                                        style={{
                                          paddingLeft: "27px",
                                          borderRight: "1px solid black",
                                        }}
                                      >
                                        Alice
                                      </td>
                                      <td style={{ paddingLeft: "27px" }}>1</td>
                                    </tr>
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
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Backend Deployment
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      Documentation
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
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      Deploy to server
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      Final review
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
                                      Members
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      David Alice
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      Alice
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
                                      Attachments
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                        color: "#2563eb",
                                      }}
                                    >
                                      deploy_guide.pdf , env_var.env
                                    </td>
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        color: "#2563eb",
                                      }}
                                    >
                                      docs_final.md
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
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      1 comment
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      0 comment
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
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      2025-05-03
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      2025-05-01
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
                                    <td
                                      style={{
                                        paddingLeft: "27px",
                                        borderRight: "1px solid black",
                                      }}
                                    >
                                      2025-05-04
                                    </td>
                                    <td style={{ paddingLeft: "27px" }}>
                                      2025-05-02
                                    </td>
                                  </tr>
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
                                    <td style={{ paddingLeft: "16px" }}>v1</td>
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
                                    84
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    136
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      borderRight: "1px solid black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    84% avg
                                  </td>
                                  <td
                                    style={{
                                      paddingLeft: "16px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    v1
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
