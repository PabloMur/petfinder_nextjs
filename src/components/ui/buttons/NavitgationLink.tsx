"use client";
import { useGoto } from "@/hooks";
const NavigationLink = ({ route, text, type }: any) => {
  const goto = useGoto();
  const handleClick = () => {
    goto(route);
  };
  return (
    <button
      className="bg-black p-2 px-4 rounded-full font-bold"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export { NavigationLink };
