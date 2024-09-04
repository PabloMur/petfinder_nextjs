import { NavigationLink } from "./ui/buttons/NavitgationLink";

const Navigation = () => {
  return (
    <nav className="flex justify-center items-center p-1 gap-2">
      <NavigationLink text={"Mis Datos"}></NavigationLink>
      <NavigationLink text={"Mis Reportes"}></NavigationLink>
      <NavigationLink text={"Hacer un Reporte"}></NavigationLink>
    </nav>
  );
};

export { Navigation };
