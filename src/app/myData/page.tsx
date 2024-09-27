"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//NOTA: eliminar el boton de logout y agregar un boton de editar, ver la manera de que se invite al user a añadir su telefono y capaz alguna red social

const MyDataPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirige al usuario a la página de login
    }
  }, [status, router]);

  if (status === "loading") {
    // Muestra un loader o mensaje mientras verifica la sesión
    return (
      <div className="h-[90vh] bg-purple-100 flex justify-center items-center text-black">
        <div className="text-center">
          <p className="text-lg font-semibold">Cargando...</p>
          <div className="loader border-t-purple-600"></div>
        </div>
      </div>
    );
  }

  if (session) {
    const { user } = session;

    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-200 to-purple-400 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            ¡Bienvenido, {user?.name}!
          </h2>
          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Nombre:</strong> {user?.name || "Nombre no disponible"}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {user?.email || "Email no disponible"}
            </p>
          </div>
          <button
            onClick={() => router.push("/logout")}
            className="bg-purple-600 text-white px-4 py-2 rounded-full w-full mt-4 hover:bg-purple-700 transition"
          >
            Cerrar sesión
          </button>
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
