"use client";
import { useGoto } from "@/hooks";
const StartSearchPetsBtn = () => {
  const goTo = useGoto();
  const handleClick = () => {
    goTo("/search");
  };
  return <button onClick={handleClick}>Test</button>;
};

export { StartSearchPetsBtn };
