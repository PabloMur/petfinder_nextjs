import pet from "../../public/perro.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-[88vh] bg-purple-100 p-10">
      <div className="h-full w-full rounded-3xl flex overflow-hidden">
        <div className="bg-purple-600 h-full w-1/2 flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold text-white mb-4">
            Bienvenido a Pet Finder
          </h1>
          <p className="text-lg text-white mb-8 text-center">
            Ayúdanos a reunir a las mascotas perdidas con sus dueños. Publica
            mascotas encontradas, reporta mascotas perdidas y comparte
            avistamientos en tu área.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-900 transition">
            ¡Comienza Ahora!
          </button>
        </div>
        <div className="bg-purple-700 h-full w-1/2 flex justify-center items-center relative">
          <Image src={pet} alt="Dog image" layout="fill" objectFit="cover" />
        </div>
      </div>
    </main>
  );
}
