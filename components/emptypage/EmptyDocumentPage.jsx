import { Button } from "@heroui/react";
import Image from "next/image";
import HumenAtDocument from "@/assets/emptyDocumentPage/HumenAtDocument.png";
import GoogleSheetsIcon from "@/assets/emptyDocumentPage/GoogleSheetsIcon.png";
import GoogleDocsIcon from "@/assets/emptyDocumentPage/GoogleDocsIcon.png";
import GoogleDriveIcon from "@/assets/emptyDocumentPage/GoogleDriveIcon.png";
import GoogleSlideIcon from "@/assets/emptyDocumentPage/GoogleSlideIcon.png";
import GoogleIcon from "@/assets/emptyDocumentPage/GoogleIcon.png";

export function EmptyDocumentPage() {
  return <>
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-h1 font-semibold">Document</p>
        <Button color="success" className="w-[96px] h-[48px] bg-primary flex gap-[8px] items-center justify-center rounded-[8px]">
            <p className="text-body-sm text-white">
                Sign in
            </p>
        </Button>
      </div>

      {/* Title */}
      <div className="flex justify-center pt-[5%]">
          <p className="text-[32px] font-bold text-title absolute">Take <span className="bg-gradient-to-r from-[#59BAD5] to-[#ABAAFF] bg-clip-text text-transparent">control</span> of your tasks and <span className="bg-gradient-to-r from-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">simplify</span> <br />your day.</p>
      </div>

      {/* Human Stand */}
      <Image 
        src={HumenAtDocument}
        alt="Humen at Document"
        className="w-[236px] h-[752px] absolute top-[15%] left-[42%] right-[58%]"
      />

      {/* Google Sheet */}
      <div className="absolute top-[115%] right-[10%]">
        <div className="relative">
          <div className="h-[40px] w-fit px-[15px] rounded-[10px] bg-slate-blue flex items-center justify-center absolute top-[90%] left-[-45%]">
            <p className="text-[24px] h-[40px] bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text w-fit text-transparent">
              Synchronized
            </p>
          </div>
          <div className="w-[329px] h-[122px] rounded-[20px] bg-transparent shadow-md flex flex-col justify-center">
              <Image
                src={GoogleSheetsIcon}
                alt="docs"
                className="w-[329px] h-[56px]"
              />
              <div className="pl-[18%]">
                <p className="text-body-sm font-normal text-title">Prepare detailed documents and<br /> collaborate in real-time.</p>
              </div>
          </div>
        </div>
      </div>

      {/* Google Docs */}
      <div className="absolute top-[75%] left-[17%]">
        <div className="relative">
          <div className="h-[40px] w-[100px] rounded-[10px] bg-slate-blue flex items-center justify-center absolute top-[-15%] left-[-10%]">
            <p className="text-[24px] h-[40px] bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text w-fit text-transparent">
              Smart
            </p>
          </div>
          <div className="w-[329px] h-[122px] rounded-[20px] bg-transparent shadow-md flex flex-col justify-center">
              <Image
                src={GoogleDocsIcon}
                alt="docs"
                className="w-[329px] h-[56px]"
              />
              <div className="pl-[18%]">
                <p className="text-body-sm font-normal text-title">Prepare detailed documents and<br /> collaborate in real-time.</p>
              </div>
          </div>
        </div>
      </div>

      {/* Google Slide */}
      <div className="absolute top-[55%] right-[10%]">
        <div className="relative">
          <div className="h-[40px] px-[15px] w-fit rounded-[10px] bg-slate-blue flex items-center justify-center absolute top-[-15%] left-[70%]">
            <p className="text-[24px] h-[40px] bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text w-fit text-transparent">
              Seamless
            </p>
          </div>
          <div className="w-[329px] h-[122px] rounded-[20px] bg-transparent shadow-md flex flex-col justify-center">
              <Image
                src={GoogleSlideIcon}
                alt="docs"
                className="w-[329px] h-[56px]"
              />
              <div className="pl-[18%]">
                <p className="text-body-sm font-normal text-title">Prepare detailed documents and<br /> collaborate in real-time.</p>
              </div>
          </div>
        </div>
      </div>

      {/* Google Drive */}
      <div className="absolute top-[103%] left-[32%]">
        <Image
          src={GoogleDriveIcon}
          alt="docs"
          className="w-[64px] h-[57px]"
        />
      </div>

      {/* Google Icon */}
      <div className="absolute right-[12%] top-[80%]">
        <Image
          src={GoogleIcon}
          alt="docs"
          className="size-[65px]"
        />
      </div>
    </div>
  </>
}