"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useGetUserData } from "@/hooks"; // Importamos el hook personalizado

interface UserData {
  address: string;
  email: string;
  image: string;
  joinedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  name: string;
  pets: Array<any>; // Si tienes una estructura definida para las mascotas, puedes especificarla en lugar de 'any'
  phoneNumber: string;
}

const MyDataPage = () => {
  const { data: session, status } = useSession();
  const getUserData = useGetUserData();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const data: UserData = await getUserData(session.user.email); // Esperamos los datos
          setUserData(data); // Actualiza el estado con los datos del usuario
        } catch (err) {
          setError(err as any); // Maneja cualquier error
        } finally {
          setIsLoading(false); // Cambia el estado de carga independientemente del resultado
        }
      } else {
        setIsLoading(false); // Cambia el estado de carga si no hay email
      }
    };

    fetchUserData();
  }, [status]);

  if (status === "loading" || isLoading) {
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

  if (status === "authenticated" && session && userData) {
    return (
      <div className="min-h-[90vh] bg-gradient-to-br from-purple-200 via-purple-400 to-orange-400 flex justify-center items-center text-black">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <div className="flex items-end justify-start gap-5">
            <Image
              src={userData?.image as string}
              alt="user image"
              width={60}
              height={60}
              className="rounded-full mb-2"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {userData.name}
            </h2>
          </div>
          <p>
            <strong>Dirección:</strong> {userData.address}
          </p>
          <p>
            <strong>Teléfono</strong>: {userData.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
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
