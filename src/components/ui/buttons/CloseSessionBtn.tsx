"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleButtonClick = () => {
    if (session) {
      signOut(); // Cierra sesión si hay una sesión activa
    } else {
      router.push("/login"); // Redirige al login si no hay sesión
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {!session && (
        <p className="text-white font-bold text-md">
          ¿Necesitas ayuda para encontrar a tu mascota?
        </p>
      )}
      <button
        className="bg-black p-2 px-4 rounded-full font-bold text-white"
        onClick={handleButtonClick}
      >
        {session ? "Cerrar sesión" : "Ingresar"}
      </button>
    </div>
  );
};

export { AuthButton };
