import blueGlow from '@/assets/backgroundAuthentication/blue-glow.png'
import blurLineDash from '@/assets/backgroundAuthentication/blur-line-dash.png'
import blurLineWorm from '@/assets/backgroundAuthentication/blur-line-worm.png'
import blurPlusIcon from '@/assets/backgroundAuthentication/blur-plus-icon.png'
import grayBrash from '@/assets/backgroundAuthentication/gray-brash.png'
import greenGlow from '@/assets/backgroundAuthentication/green-glow.png'
import lineDash from '@/assets/backgroundAuthentication/line-dash.png'
import lineWorm from '@/assets/backgroundAuthentication/line-worm.png'
import longGrayBrash from '@/assets/backgroundAuthentication/long-gray-brash.png'
import plusIcon from '@/assets/backgroundAuthentication/plus-icon.png'
import redGlow from '@/assets/backgroundAuthentication/red-glow.png'
import yellowGlow from '@/assets/backgroundAuthentication/yellow-glow.png'
import Image from "next/image";
import { CardTest } from './CardBackground'
export function BackgroundAuthentication(){
    return<>
        <div className="bg-bgColor w-full h-screen relative overflow-hidden">
            <div className="absolute left-[7%] top-[35%] w-[509px] h-[604px] rotate-[5deg] scale-[0.6]">
                <Image src={blueGlow} alt="Blue Glow" />
            </div>
            <div className="absolute left-[70%] top-[5%] w-[509px] h-[604px] rotate-[3deg] scale-[0.5]">
                <Image src={blurLineDash} alt="Blur Line Dash" />
            </div>
            <div className="absolute left-[60%] top-[25%] w-[509px] h-[604px] rotate-[-2deg] scale-[0.4]">
                <Image src={blurLineWorm} alt="Blur Line Worm" />
            </div>
            <div className="absolute left-[50%] top-[35%] w-[509px] h-[604px] rotate-[10deg] scale-[0.5]">
                <Image src={blurPlusIcon} alt="Blur Plus Icon" />
            </div>
            <div className="absolute left-[-10%] top-[30%] w-[509px] h-[604px] rotate-[-3deg] scale-[0.45]">
                <Image src={grayBrash} alt="Gray Brash/" />
            </div>
            <div className="absolute left-[52%] top-[-10%] w-[509px] h-[604px] rotate-[4deg] scale-[0.55]">
                <Image src={greenGlow} alt="Green Glow/" />
            </div>
            <div className="absolute left-[-5%] top-[15%] w-[509px] h-[604px] rotate-[6deg] scale-[0.5]">
                <Image src={lineDash} alt="Line Dash/" />
            </div>
            <div className="absolute left-[68%] top-[55%] w-[509px] h-[604px] rotate-[-5deg] scale-[0.45]">
                <Image src={lineWorm} alt="Line Worm/" />
            </div>
            <div className="absolute left-[5%] top-[30%] w-[509px] h-[604px] rotate-[-5deg] scale-[0.45]">
                <Image src={lineWorm} alt="Line Worm/" />
            </div>
            <div className="absolute left-[72%] top-[-20%] w-[509px] h-[604px] rotate-[7deg] scale-[0.6]">
                <Image src={longGrayBrash} alt="Long Gray Brash/" />
            </div>
            <div className="absolute left-[10%] top-[-15%] w-[509px] h-[604px] rotate-[3deg] scale-[0.4]">
                <Image src={plusIcon} alt="Plus Icon/" />
            </div>
            <div className="absolute left-[7%] top-[-15%] w-[509px] h-[604px] rotate-[5deg] scale-[0.5]">
                <Image src={redGlow} alt="Red Glow/" />
            </div>
            <div className="absolute left-[55%] top-[50%] w-[509px] h-[604px] rotate-[-2deg] scale-[0.45]">
                <Image src={yellowGlow} alt="Yellow Glow/" />
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <CardTest />
</div>

        </div>

    </>
}