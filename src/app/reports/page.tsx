"use client";
import { ImageContainer } from "@/components/ImageContainer";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ReportsPage = () => {
  const [activeForm, setFormActive] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirige a /login si el usuario no está autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const openReportPetForm = () => {
    setFormActive(true);
  };

  const closeReportPetForm = () => {
    setFormActive(false);
  };

  const handleSendPetData = (e: any) => {
    e.preventDefault();
    console.log("Se ha enviado los datos al back, ponele");
    const target = e.target;
    const petName = target.name.value;
    const species = target.species.value;
    console.log({ petName, species });
  };

  if (status === "loading") {
    return (
      <div className="h-[90vh] bg-purple-100 flex justify-center items-center text-black">
        Cargando...
      </div>
    );
  }

  return (
    <div className="h-[90vh] text-black flex flex-col justify-start items-center bg-purple-100 relative">
      {activeForm && (
        <div className="absolute bg-black/50 top-0 left-0 bottom-0 right-0 z-10 flex justify-center items-center">
          <form
            className="bg-purple-100 p-6 rounded-lg flex flex-col justify-start items-center min-w-[350px]"
            onSubmit={handleSendPetData}
          >
            <div className="w-full flex justify-end">
              <button
                className="bg-black rounded-lg text-white px-4 py-2 text-sm"
                onClick={closeReportPetForm}
              >
                Cerrar
              </button>
            </div>

            <label htmlFor="name" className="w-full mb-4">
              <p className="mb-1 text-sm">¿Cómo se llama?</p>
              <input
                type="text"
                name="name"
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </label>

            <label htmlFor="species" className="w-full mb-4">
              <p className="mb-1 text-sm">Especie (Perro, Gato, etc.)</p>
              <input
                type="text"
                name="species"
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </label>

            <label htmlFor="location" className="w-full mb-4">
              <p className="mb-1 text-sm">¿Dónde fue visto por última vez?</p>
              <input
                type="text"
                name="location"
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </label>

            <label htmlFor="photo" className="w-full mb-4">
              <p className="mb-1 text-sm">Añade una foto</p>
              <ImageContainer></ImageContainer>
            </label>

            <button
              className="bg-black text-white py-2 px-4 rounded-lg mt-4 hover:bg-gray-800 transition-all w-full"
              type="submit"
            >
              Reportar mascota
            </button>
          </form>
        </div>
      )}

      <div className="h-20 flex justify-end items-center w-full px-14">
        <p className="text-sm p-2 text-black/80">¿Se ha perdido tu mascota?</p>
        <button
          className="bg-black text-white p-2 rounded-lg"
          onClick={openReportPetForm}
        >
          Reporta una mascota perdida
        </button>
      </div>
      <div className="h-full flex justify-center items-center">
        <p className="text-lg">Aun no has reportado ninguna mascota</p>
      </div>
    </div>
  );
};

export default ReportsPage;
