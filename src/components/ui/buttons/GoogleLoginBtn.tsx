"use client";
import google from "../../../../public/google.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";
const GoogleLoginBtn = () => {
  return (
    <button
      onClick={() => signIn()}
      className="flex items-center justify-center gap-2 bg-white text-black p-2 border border-black rounded-lg min-w-[300px]"
    >
      <Image src={google} alt="google icon" width={25} height={25}></Image>
      Continua con Google
    </button>
  );
};

export { GoogleLoginBtn };
