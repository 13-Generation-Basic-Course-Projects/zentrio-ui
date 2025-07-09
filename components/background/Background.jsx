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
import Image from "next/image";

export function BackgroundAuthentication({ actionCard }) {
  return (
    <>
      <div className="bg-bgColor w-full h-screen relative overflow-hidden">
        {/* logo */}
        <div className="absolute top-5 left-10">
            <svg
              width={180}
              height={50}
              viewBox="0 0 180 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect width={180} height={50} fill="url(#pattern0_3611_134720)" />
             
            </svg>

        </div>
        {/* //BlueGlow left buttom */}
        <div className="absolute left-[7%] top-[35%] w-[509px] h-[604px] rotate-[5deg] scale-[0.6]">
          <Image src={BlueGlow} alt="Blue Glow" />
        </div>
        {/*BlurLineDash bottom  */}
        <div className="absolute left-[10%] top-[70%] w-[509px] h-[604px] rotate-[3deg] scale-[0.5]">
          <Image src={BlurLineDash} alt="Blur Line Dash" />
        </div>
        {/* BlurLineWorm top right*/}
        <div className="absolute left-[65%] top-[10%] w-[509px] h-[604px] rotate-[-2deg] scale-[0.4]">
          <Image src={BlurLineWorm} alt="Blur Line Worm" />
        </div>
        {/* BlurPlusIcon right */}
        <div className="absolute left-[58%] top-[50%] w-[509px] h-[604px] rotate-[10deg] scale-[0.5]">
          <Image src={BlurPlusIcon} alt="Blur Plus Icon" />
        </div>
        {/* GrayBrash blur left*/}
        <div className="absolute left-[-10%] top-[54%] w-[509px] h-[604px] rotate-[-3deg] scale-[0.45]">
          <Image src={GrayBrash} alt="Gray Brash" />
        </div>
        {/* GreenGlow top right */}
        <div className="absolute left-[56%] top-[-13%] w-[509px] h-[604px] rotate-[4deg] scale-[0.5]">
          <Image src={GreenGlow} alt="Green Glow" />
        </div>
        {/* LineDash top left */}
        <div className="absolute left-[-5%] top-[15%] w-[509px] h-[604px] rotate-[6deg] scale-[0.5]">
          <Image src={LineDash} alt="Line Dash" />
        </div>
        {/* LineWorm bottom right*/}
        <div className="absolute left-[75%] top-[55%] w-[509px] h-[604px] rotate-[-5deg] scale-[0.45]">
          <Image src={LineWorm} alt="Line Worm" />
        </div>
        {/* LineWorm center left */}
        <div className="absolute left-[5%] top-[30%] w-[509px] h-[604px] rotate-[-5deg] scale-[0.45]">
          <Image src={LineWorm} alt="Line Worm" />
        </div>
        {/* LongGrayBrash top right */}
        <div className="absolute left-[80%] top-[-20%] w-[509px] h-[604px] rotate-[7deg] scale-[0.6]">
          <Image src={LongGrayBrash} alt="Long Gray Brash" />
        </div>
        {/* PlusIcon top left*/}
        <div className="absolute left-[25%] top-[-5%] w-[509px] h-[604px] rotate-[3deg] scale-[0.4]">
          <Image src={PlusIcon} alt="Plus Icon" />
        </div>
        {/* RedGlow */}
        <div className="absolute left-[20%] top-[-5%] w-[509px] h-[604px] rotate-[5deg] scale-[0.5]">
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