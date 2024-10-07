"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGetUserData } from "@/hooks"; // Importamos el hook personalizado

const MyDataPage = () => {
  const { data: session, status } = useSession();
  const getUserData = useGetUserData();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    if (session?.user?.email) {
      // Definimos una función asíncrona dentro del useEffect
    }
  }, [session, getUserData]);

  if (status === "loading" || isLoading) {
    // Muestra un loader mientras se carga la sesión o los datos
    return (
      <div className="h-[90vh] bg-purple-100 flex justify-center items-center text-black">
        <div className="text-center">
          <p className="text-lg font-semibold">Cargando...</p>
          <div className="loader border-t-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[90vh] bg-purple-100 flex justify-center items-center text-black">
        <p>Error al cargar los datos del usuario: {error}</p>
      </div>
    );
  }

  if (session && userData) {
    const { user } = session;

    return (
      <div className="min-h-[90vh] bg-gradient-to-br from-purple-200 via-purple-400 to-orange-400 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            ¡Bienvenido, {user?.name}!
          </h2>
          <div className="mb-4">
            <p className="text-gray-600">
              <Image
                src={user?.image as string}
                alt="user image"
                width={50}
                height={50}
                className="rounded-full mb-2"
              ></Image>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] bg-purple-100 flex justify-center items-center text-black">
      <p>Redirigiendo a /login...</p>
    </div>
  );
};

export default MyDataPage;
