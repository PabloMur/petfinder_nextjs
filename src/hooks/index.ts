import { useRouter } from "next/navigation";
import { APICheckEmail, APIGetUserData } from "@/lib/APICalls";
import { userLocationLat, userLocationLng } from "@/lib/atoms";
import { useRecoilState } from "recoil";

//Mar del Patas
export const useGoto = () => {
  const router = useRouter();

  return (route: string) => {
    router.push(route);
  };
};

export const useCheckEmail = () => {
  return async function (email: string) {
    const user = await APICheckEmail(email);
    return user.exists;
  };
};

export const useGetUserData = () => {
  return async function (email: string) {
    const user = await APIGetUserData(email);
    return user.userData;
  };
};

export const useSetUserLocation = () => {
  const [lat, setLat] = useRecoilState(userLocationLat); // Estado para la latitud
  const [lng, setLng] = useRecoilState(userLocationLng); // Estado para la longitud

  return async () => {
    if (!navigator.geolocation) {
      console.error("La geolocalización no está soportada por este navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Establecer las coordenadas del usuario en los átomos
        setLat(JSON.stringify(position.coords.latitude));
        setLng(JSON.stringify(position.coords.longitude));
        console.log(
          "Ubicación del usuario guardada:",
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        console.error("Error al obtener la ubicación:", error);
      }
    );
  };
};
