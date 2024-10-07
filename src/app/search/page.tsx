"use client";
import { useEffect, useState } from "react";
import { useSetUserLocation } from "@/hooks"; // Importa el hook para obtener la ubicación

const SeachPetPage = () => {
  const setUserLocation = useSetUserLocation();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    // Ejecutar el hook para obtener la ubicación del usuario
    const fetchLocation = async () => {
      await setUserLocation();
      // Una vez que la ubicación está guardada, puedes acceder a los valores desde el hook o usar un estado local.
      // Supongamos que has guardado lat/lng en los átomos o los puedes actualizar aquí si los devuelve el hook.
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    };

    fetchLocation();
  }, [setUserLocation]);

  return (
    <div className="min-h-[90vh] text-black flex flex-col justify-start items-center bg-gradient-to-br from-purple-200 via-purple-400 to-orange-400 p-10 gap-10">
      <div className="bg-purple-600 h-[35vh] w-full rounded-lg flex justify-center items-center">
        {latitude && longitude ? (
          <p>
            Tu ubicación: Latitud: {latitude}, Longitud: {longitude}
          </p>
        ) : (
          <p>Obteniendo ubicación...</p>
        )}
      </div>
      <div className="bg-purple-600 p-2 w-full min-h-[350px]">
        <p>Estas son las mascotas que están cerca de tu zona:</p>
        <div>Contenedor de las cards</div>
      </div>
    </div>
  );
};

export default SeachPetPage;
