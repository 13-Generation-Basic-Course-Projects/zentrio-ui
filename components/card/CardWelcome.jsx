import Image from "next/image";
import happyWoman from "@/assets/happywoman.png";
import backgroundImg from "@/assets/background.png";

export default function CardWelcomeComponent() {
  return (
    <div className="relative rounded-2xl mt-[-32px] mb-10 overflow-hidden">
      {/* Background Image */}
      <Image
        className="w-full"
        src={backgroundImg}
        alt="background in workspace"
      />

      {/* Overlay Content: Text Left, Image Right */}
      <div className="absolute inset-0 flex items-center justify-between px-10">
        {/* Left Side Text */}
        <div>
          <h1 className="text-h4 text-white font-bold mb-2">
            Hello welcome to <br /> Zentrio System
          </h1>
          <p className="text-white text-sm">
            Good morning <strong>9:15 AM</strong>
            <br />
            please enjoy your nice day!
          </p>
        </div>

        {/* Right Side Image */}
        <Image className="w-[150px]" src={happyWoman} alt="happy woman" />
      </div>
    </div>
  );
}
