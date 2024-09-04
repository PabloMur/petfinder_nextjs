const Footer = () => {
  return (
    <footer className="bg-purple-950 p-10 flex flex-col justify-center items-center text-white w-full">
      <div className="flex space-x-6 mb-4">
        <a href="#" className="hover:text-purple-300 transition">
          Sobre Nosotros
        </a>
        <a href="#" className="hover:text-purple-300 transition">
          Contacto
        </a>
        <a href="#" className="hover:text-purple-300 transition">
          Términos y Condiciones
        </a>
        <a href="#" className="hover:text-purple-300 transition">
          Política de Privacidad
        </a>
      </div>
      <div className="text-center text-sm">
        &copy; 2024 Pet Finder. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export { Footer };
