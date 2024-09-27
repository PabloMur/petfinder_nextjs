"use client";
import { useEffect } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css"; // Importar los estilos de Dropzone

const ImageContainer = () => {
  useEffect(() => {
    // Inicializa Dropzone cuando el componente esté montado
    const myDropzone = new Dropzone("#my-form", {
      url: "/upload", // Cambia esto por la ruta de tu API para manejar las subidas
      autoProcessQueue: false, // Configura si quieres que procese automáticamente los archivos
      maxFiles: 1, // Limitar a un archivo si es necesario
    });

    myDropzone.on("addedfile", (file) => {
      console.log(`File added: ${file.name}`);
    });

    // Limpiar Dropzone al desmontar el componente
    return () => {
      myDropzone.destroy();
    };
  }, []);

  return (
    <div>
      <form id="my-form" className="dropzone">
        <div className="dz-message">Arrastra o selecciona tu archivo aquí</div>
      </form>
    </div>
  );
};

export { ImageContainer };
