"use client";
import { GoogleLoginBtn } from "@/components/ui/buttons/GoogleLoginBtn";
import { useCheckEmail, useProtectedRoute } from "@/hooks";

const LoginPage = () => {
  const checkEmail = useCheckEmail();
  const protectPage = useProtectedRoute("/login", "/search");

  protectPage();

  const checkEmailFunction = async (email: string) => {
    try {
      const userExists = await checkEmail(email);
      return userExists;
    } catch (error) {
      console.error("Error al verificar el email:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
  };

  return (
    <div className="h-[90vh] flex flex-col justify-start items-center bg-gradient-to-br from-purple-200 via-purple-400 to-orange-400 pt-20">
      <h2 className="text-black font-bold text-3xl">
        Te damos la bienvenida a PetFinder!
      </h2>
      <div className="w-full flex flex-col justify-center items-center pt-10">
        <div>
          <form
            className="flex flex-col items-center justify-center p-2 w-fit"
            onSubmit={handleSubmit}
          >
            <label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Dirección de correo electrónico*"
                className="rounded-lg text-black p-2 text-sm min-w-[300px] text-center border border-black h-11"
                required
              />
            </label>
            <button className="bg-purple-900 w-full rounded-lg p-2 h-11 mt-2 hover:bg-purple-700">
              Ingresar
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="w-[90px] bg-black h-[1px]"></div>
          <p className="text-black my-2">O</p>
          <div className="w-[90px] bg-black h-[1px]"></div>
        </div>
        <div>
          <GoogleLoginBtn></GoogleLoginBtn>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
