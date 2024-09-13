import { useRouter } from "next/navigation";

export const useGoto = () => {
  const router = useRouter();
  return (route: string) => {
    router.push(route);
  };
};
