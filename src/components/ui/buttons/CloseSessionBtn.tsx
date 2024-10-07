"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthButton = () => {
  const { data: session } = useSession();
  const [modalActive, setModalActive] = useState(false); // Modal inactivo al principio
  const router = useRouter();

  const handleButtonClick = () => {
    if (session) {
      setModalActive(true); // Desplegar modal si hay sesión
    } else {
      router.push("/login"); // Redirige al login si no hay sesión
    }
  };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
    }); // Cerrar sesión
  };

  const handleCloseModal = () => {
    setModalActive(false); // Cerrar modal
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

      {modalActive && (
        <div className="absolute top-0 right-0 bottom-0 left-[-30px] flex flex-col justify-center items-center bg-black/60 z-20">
          <div className="w-[400px] flex justify-end items-center">
            <button
              className="hover:bg-black rounded-lg p-1"
              onClick={handleCloseModal}
            >
              cerrar
            </button>
          </div>
          <div className="bg-purple-100 rounded-lg text-black min-w-[300px]">
            <p className="h-20 flex justify-center items-center p-10">
              ¿Quieres cerrar sesión?
            </p>
            <div className="w-full rounded-b-lg p-2 flex justify-end items-center gap-2">
              <button
                className="bg-red-700 p-2 rounded-lg font-bold text-white"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button
                className="bg-green-700 text-white p-2 font-bold rounded-lg px-6"
                onClick={handleSignOut} // Este botón ahora cierra la sesión
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { AuthButton };
