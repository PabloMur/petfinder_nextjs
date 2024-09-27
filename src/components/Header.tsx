import { Navigation } from "./Navigation";
import { Logo } from "./ui/Logo";
const Header = () => {
  return (
    <header className="h-[12vh] flex justify-between  items-center px-12 bg-purple-600">
      <Logo></Logo>
      <Navigation></Navigation>
    </header>
  );
};

export { Header };
