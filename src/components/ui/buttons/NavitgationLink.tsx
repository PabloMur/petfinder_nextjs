"use client";
import { useGoto } from "@/hooks";
import { useSession } from "next-auth/react"; // Importa el hook de next-auth

const NavigationLink = ({ route, text, type }: any) => {
  const goto = useGoto();
  const { data: session } = useSession(); // Usa useSession para obtener los datos de la sesión
  const handleClick = () => {
    goto(route);
  };

  // Si no hay sesión, no renderiza el botón
  if (!session) {
    return null;
  }

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
