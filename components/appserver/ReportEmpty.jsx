import reportE from "/public/image/reportE.svg";
import Image from "next/image";
import { Button } from "@heroui/react";
export default function ReportEmpty() {
  return (
    <div className="p-6 space-y-4">
      <nav className="text-h6 text-[#94A3B8]">
        <ol className="flex space-x-2">
          <li>
            <a href="#" className=" hover:text-blueActive">
              Workspace
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-blueActive">
              Hikoko Design
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className=" hover:text-blueActive">
              Report
            </a>
          </li>
        </ol>
      </nav>
      <header className="text-h1 text-titles font-semibold">
        <p>Reports</p>
      </header>

      {/*please get here : section empty */}
      <section className="flex justify-center items-center ">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col items-center space-y-4 text-center justify-center">
            <p className="text-h3 font-semibold text-title/80">
              No Reports Yet
            </p>
            <p className="text-h6 text-description max-w-md">
              You haven’t created or received any reports. Start by generating
              one or uploading your data.
            </p>
            <div className="w-[300px]">
              <Image
                src={reportE}
                alt="report"
                layout="responsive"
                width={300}
                height={200}
                // objectFit="cover"
              />
            </div>
            <div className="flex flex-row space-x-2 items-center ">
              <img
                src="https://cdn-icons-png.flaticon.com/128/4726/4726010.png"
                alt="pdf"
                className="w-6 h-6"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/2991/2991108.png"
                alt="doc"
                className="w-6 h-6"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/2875/2875416.png"
                alt="slide"
                className="w-6 h-6"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/2504/2504768.png"
                alt="sheet"
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
