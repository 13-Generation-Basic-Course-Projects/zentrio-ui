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
import Link from "next/link";

export function BackgroundAuthentication({ actionCard }) {
  return (
    <>
      <div className="bg-bgColor w-full h-screen relative overflow-x-hidden">
        {/* logo */}
        <Link href="/" className="absolute top-5 left-10">
          <img src="https://i.imgur.com/bP5QI3y.png" alt="logo" className="w-[180px] h-[50px] object-cover"/>
        </Link>
        {/* //BlueGlow left buttom light*/}
        <div className="absolute left-[7%] top-[35%] w-[509px] h-[604px] rotate-[5deg] scale-[0.6] max-[425px]:hidden ">
          <Image src={BlueGlow} alt="Blue Glow" />
        </div>
        {/*BlurLineDash bottom left*/}
        <div className="absolute left-[10%] top-[70%] w-[509px] h-[604px] rotate-[3deg] scale-[0.5] max-[1500px]:-left-[1%] max-[1190px]:-left-[10%] max-[1030px]:-left-[17%] max-[930px]:-left-[20%] max-[870px]:-left-[30%] max-[880px]:hidden">
          <Image src={BlurLineDash} alt="Blur Line Dash" />
        </div>
        {/* BlurLineWorm top right*/}
        <div className="absolute left-[65%] top-[10%] w-[509px] h-[604px] rotate-[-2deg] scale-[0.4] max-[880px]:hidden ">
          <Image src={BlurLineWorm} alt="Blur Line Worm" />
        </div>
        {/* BlurPlusIcon right */}
        <div className="absolute left-[58%] top-[50%] w-[509px] h-[604px] rotate-[10deg] scale-[0.5] max-[1500px]:hidden">
          <Image src={BlurPlusIcon} alt="Blur Plus Icon" />
        </div>
        {/* GrayBrash blur left*/}
        <div className="absolute left-[-10%] top-[34%] w-[509px] h-[604px] rotate-[-3deg] scale-[0.45] max-[1095px]:-left-[20%] max-[940px]:-left-[30%] max-[820px]:-left-[35%] max-[800px]:top-[70%] max-[1524px]:hidden">
          <Image src={GrayBrash} alt="Gray Brash" />
        </div>
        {/* GreenGlow top right */}
        <div className="absolute left-[56%] top-[-13%] w-[509px] h-[604px] rotate-[4deg] scale-[0.5]  max-[425px]:hidden">
          <Image src={GreenGlow} alt="Green Glow" />
        </div>
        {/* LineDash top left */}
        <div className="absolute left-[-5%] top-[15%] w-[509px] h-[604px] rotate-[6deg] scale-[0.5] max-[1095px]:-left-[15%] max-[940px]:-left-[25%] max-[820px]:-left-[35%] max-[720px]:-left-[50%] max-[570px]:hidden">
          <Image src={LineDash} alt="Line Dash" />
        </div>
        {/* LineWorm bottom right*/}
        <div className="absolute left-[75%] top-[55%] w-[509px] h-[604px] rotate-[-5deg] scale-[0.45]  max-[425px]:hidden">
          <Image src={LineWorm} alt="Line Worm" />
        </div>
        {/* LineWorm center left */}
        <div className="absolute left-[5%] top-[30%] w-[509px] h-[604px] rotate-[-5deg] scale-[0.45] max-[1200px]:-left-[3%] max-[993px]:-left-[10%] max-[865px]:-left-[15%] max-[822px]:-left-[20%]  max-[750px]:hidden">
          <Image src={LineWorm} alt="Line Worm" />
        </div>
        {/* LongGrayBrash top right */}
        <div className="absolute left-[70%] top-[-20%] w-[459px] h-[604px] rotate-[7deg] scale-[0.6] max-[1524px]:hidden">
          <Image src={LongGrayBrash} alt="Long Gray Brash" />
        </div>
        {/* PlusIcon top left*/}
        <div className="absolute left-[25%] top-[-5%] w-[509px] h-[604px] rotate-[3deg] scale-[0.4] max-[1670px]:hidden ">
          <Image src={PlusIcon} alt="Plus Icon" className=""/>
        </div>
        {/* RedGlow */}
        <div className="absolute left-[20%] top-[-5%] w-[509px] h-[604px] rotate-[5deg] scale-[0.5]  max-[425px]:hidden">
          <Image src={RedGlow} alt="Red Glow" />
        </div>
        <div className="absolute left-[55%] top-[50%] w-[509px] h-[604px] rotate-[-2deg] scale-[0.45]  max-[425px]:hidden">
          <Image src={YellowGlow} alt="Yellow Glow" />
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          {actionCard}
        </div>
      </div>
    </>
  );
}
