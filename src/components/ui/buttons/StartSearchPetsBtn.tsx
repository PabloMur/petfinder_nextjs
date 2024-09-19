"use client";
import { useGoto } from "@/hooks";
const StartSearchPetsBtn = () => {
  const goTo = useGoto();
  const handleClick = () => {
    goTo("/search");
  };
  return (
    <button
      className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-900 transition"
      onClick={handleClick}
    >
      Comienza Ahora!
    </button>
  );
};

export { StartSearchPetsBtn };
