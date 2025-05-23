import Image from "next/image";
import happyWoman from "@/assets/happywoman.png";
import backgroundImg from "@/assets/background.png";

export default function CardWelcomeComponent() {
  return (
    <div className="relative rounded-2xl mt-[-32px] mb-10">
      <Image
        className="w-full"
        src={backgroundImg}
        alt="background in workspace"
      />
      <div className="absolute bottom-12 left-10">
        <h1 className="text-h4 text-white font-bold mb-1">
          Hello welcome to <br /> Zentrio System
        </h1>
        <p className="text-white text-sm">
          Good morning <strong>9:15 AM</strong>
          <br />
          please enjoy your nice day!
        </p>
      </div>
      <Image className="absolute top-0 right-0 w-[160px]" src={happyWoman} alt="happy woman" />
    </div>
  );
}
