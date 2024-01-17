import Image from "next/image";
import spacex from "@/assets/Spacex.jpg";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Image className=" w-full" src={spacex} alt="abc" priority />
    </div>
  );
}
