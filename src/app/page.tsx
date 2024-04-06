"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Image
        className="[border-radius:100%] [box-shadow:0px_0px_20px_15px_#37243a]"
        src="/images/dungeon-master.jpg"
        alt="A wizard in a dungeon rolling d20 dice"
        width={500}
        height={500}
      ></Image>
    </div>
  );
}
