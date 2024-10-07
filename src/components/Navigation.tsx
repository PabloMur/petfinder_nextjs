import { AuthButton } from "./ui/buttons/CloseSessionBtn";
import { NavigationLink } from "./ui/buttons/NavitgationLink";

const Navigation = () => {
  return (
    <nav className="flex justify-center items-center p-1 gap-2">
      <NavigationLink text={"Buscar"} route={"/search"}></NavigationLink>
      <NavigationLink text={"Mis Datos"} route="/myData"></NavigationLink>
      <NavigationLink text={"Mis Mascotas"} route="/reports"></NavigationLink>
      <AuthButton />
    </nav>
  );
};

export { Navigation };
