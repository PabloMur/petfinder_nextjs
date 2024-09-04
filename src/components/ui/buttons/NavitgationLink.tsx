//hacer un type para que no se use any!
const NavigationLink = ({ route, text, type }: any) => {
  return (
    <button className="bg-black p-2 px-4 rounded-full font-bold">{text}</button>
  );
};

export { NavigationLink };
