import BlueGlow from "@/assets/backgroundAuthentication/blue-glow.png";
import BlurLineDash from "@/assets/backgroundAuthentication/blur-line-dash.png";
import BlurLineWorm from "@/assets/backgroundAuthentication/blur-line-worm.png";
import BlurPlusIcon from "@/assets/backgroundAuthentication/blur-plus-icon.png";
import GrayBrash from "@/assets/backgroundAuthentication/gray-brash.png";
import GreenGlow from "@/assets/backgroundAuthentication/green-glow.png";
import LineDash from "@/assets/backgroundAuthentication/line-dash.png";
import LineWorm from "@/assets/backgroundAuthentication/line-worm.png";
import LongGrayBrash from "@/assets/backgroundAuthentication/long-gray-brash.png";
import PlusIcon from "@/assets/backgroundAuthentication/plus-icon.png";
import RedGlow from "@/assets/backgroundAuthentication/red-glow.png";
import YellowGlow from "@/assets/backgroundAuthentication/yellow-glow.png";
import GrayBrashKanban from "@/assets/backgroundAuthentication/gray-brash-from-kanban.png";
import Image from "next/image";

export function BackgroundAuthentication({ actionCard }) {
  return (
    <>
      <div className="bg-bgColor w-full h-screen relative overflow-hidden">
        <div className="absolute left-[7%] top-[35%] w-[509px] h-[604px] rotate-[5deg] scale-[0.6]">
          <Image src={BlueGlow} alt="Blue Glow" />
        </div>
        <div className="absolute left-[70%] top-[5%] w-[509px] h-[604px] rotate-[3deg] scale-[0.5]">
          <Image src={BlurLineDash} alt="Blur Line Dash" />
        </div>
        <div className="absolute left-[60%] top-[25%] w-[509px] h-[604px] rotate-[-2deg] scale-[0.4]">
          <Image src={BlurLineWorm} alt="Blur Line Worm" />
        </div>
        <div className="absolute left-[50%] top-[35%] w-[509px] h-[604px] rotate-[10deg] scale-[0.5]">
          <Image src={BlurPlusIcon} alt="Blur Plus Icon" />
        </div>
        <div className="absolute left-[-10%] top-[30%] w-[509px] h-[604px] rotate-[-3deg] scale-[0.45]">
          <Image src={GrayBrash} alt="Gray Brash" />
        </div>
        <div className="absolute left-[52%] top-[-10%] w-[509px] h-[604px] rotate-[4deg] scale-[0.55]">
          <Image src={GreenGlow} alt="Green Glow" />
        </div>
        <div className="absolute left-[-5%] top-[15%] w-[509px] h-[604px] rotate-[6deg] scale-[0.5]">
          <Image src={LineDash} alt="Line Dash" />
        </div>
        <div className="absolute left-[68%] top-[55%] w-[509px] h-[604px] rotate-[-5deg] scale-[0.45]">
          <Image src={LineWorm} alt="Line Worm" />
        </div>
        <div className="absolute left-[5%] top-[30%] w-[509px] h-[604px] rotate-[-5deg] scale-[0.45]">
          <Image src={LineWorm} alt="Line Worm" />
        </div>
        <div className="absolute left-[72%] top-[-20%] w-[509px] h-[604px] rotate-[7deg] scale-[0.6]">
          <Image src={LongGrayBrash} alt="Long Gray Brash" />
        </div>
        <div className="absolute left-[10%] top-[-15%] w-[509px] h-[604px] rotate-[3deg] scale-[0.4]">
          <Image src={PlusIcon} alt="Plus Icon" />
        </div>
        <div className="absolute left-[7%] top-[-15%] w-[509px] h-[604px] rotate-[5deg] scale-[0.5]">
          <Image src={RedGlow} alt="Red Glow" />
        </div>
        <div className="absolute left-[55%] top-[50%] w-[509px] h-[604px] rotate-[-2deg] scale-[0.45]">
          <Image src={YellowGlow} alt="Yellow Glow" />
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {actionCard}
        </div>
      </div>
    </>
  );
}

export function BackgroundKanbanPage(){
  return(
    <>
      <div className="bg-bgColor w-full h-screen relative overflow-hidden">
        <div className="absolute left-[-14%] top-[5%]">
          <Image 
            src={GrayBrashKanban}
            alt=""
            className="w-[400.56px] h-[468.58px]"
          />
        </div>
        <div className="absolute right-[1%] top-[50%] bottom-[50%] rotate-[-45deg]">
          <Image 
            src={LineWorm}
            alt=""
            className="w-[119.94px] h-[23.98px]"
          />
        </div>
        <div className="absolute right-[50%] left top-[50%] bottom-[50%] rotate-[-10deg]">
          <Image 
            src={LineWorm}
            alt=""
            className="w-[119.94px] h-[23.98px]"
          />
        </div>
        <div className="absolute right-[-10%] top-auto bottom-[-30%] rotate-[45deg]">
          <Image 
            src={GrayBrashKanban}
            alt=""
            className="w-[400.56px] h-[468.58px]"
          />
        </div>
      </div>
    </>
  )
}

export function BackgroundGanChartPage(){
  return<>
    <div className="bg-bgColor w-full h-screen relative overflow-hidden">
      <div className="absolute left-[-5%] top-[5%]">
        <Image 
          src={GrayBrashKanban}
          alt=""
          className="w-[400.56px] h-[468.58px]"
        />
      </div>
      <div className="absolute right-[60%] left-auto top-[25%] rotate-[-45deg]">
        <Image 
          src={LineWorm}
          alt=""
          className="w-[119.94px] h-[23.98px]"
        />
      </div>
      <div className="absolute right-[25%] top-auto bottom-[45%] rotate-[-45deg]">
        <Image 
          src={LineWorm}
          alt=""
          className="w-[119.94px] h-[23.98px]"
        />
      </div>
      <div className="absolute right-[-12%] bottom-[-30%] top-auto rotate-[45deg]">
        <Image 
          src={GrayBrashKanban}
          alt=""
          className="w-[400.56px] h-[468.58px]"
        />
      </div>
      <div className="absolute right-[40%] top-auto bottom-[50%]">
        <Image 
          src={BlurLineDash}
          alt=""
          className="w-[174.94px] h-[22px]"
        />
      </div>
      <div className="absolute right-[15%] top-auto bottom-[30%]">
        <Image 
          src={BlurPlusIcon}
          alt=""
          className="w-[24px] h-[24px]"
        />
      </div>
    </div>
  </>
}

export function BackgroundDocumentPage(){
  return<>
    <div className="bg-bgColor w-full h-screen relative overflow-hidden">
        <div className="absolute left-[5%] top-auto bottom-[15%]">
          <Image 
            src={GrayBrashKanban}
            className="w-[404px] h-[479px] rotate-[-140deg]"
            alt=""
          />
        </div>
        <div className="absolute right-[5%] top-auto bottom-[-20%]">
          <Image 
            src={GrayBrashKanban}
            className="w-[404px] h-[479px] rotate-[12deg]"
            alt=""
          />
        </div>
    </div>
  </>
}