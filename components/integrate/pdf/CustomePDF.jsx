const CustomePDF = () => {
  return (
    <>
      <PageOne />
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

export const CoverPage = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
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
                  <span className="font-bold">
                    PROJECT REPORT FOR INVESTORES
                  </span>
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

export const PageOne = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-slate-blue">
        {/* Copy from this */}
        <div className="bg-white w-[595px] h-[842px] relative">
          <HeaderPage />
          <div>
            {/* Write code here */}
            
          </div>
          <PageNumber num={1}/>
        </div>
      </div>
    </>
  );
};

export const Table = () => {};
