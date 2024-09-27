"use client";
import { useGoto } from "@/hooks";
import Image from "next/image";
import paw from "../../../public/paw.svg";
const Logo = () => {
  const goTo = useGoto();
  return (
    <div
      className="flex justify-center items-center gap-2 cursor-pointer p-2 px-3 hover:bg-purple-700 rounded-xl h-fit"
      onClick={() => {
        goTo("/");
      }}
    >
      <Image src={paw} alt="Paw logo icon" width={25} height={25}></Image>
      <h2 className="font-bold text-xl">Pet Finder</h2>
    </div>
  );
};

export { Logo };
