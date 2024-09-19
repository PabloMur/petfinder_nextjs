import { GoogleLoginBtn } from "@/components/ui/buttons/GoogleLoginBtn";

const LoginPage = () => {
  return (
    <div className="h-[90vh] flex flex-col justify-start items-center bg-purple-100 pt-20">
      <h2 className="text-black font-bold text-3xl">
        Te damos la bienvenida a PetFinder
      </h2>
      <div className="w-full flex flex-col justify-center items-center pt-10">
        <div>
          <form className="flex flex-col items-center justify-center p-2 w-fit">
            <label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Dirección de correo electrónico*"
                className="rounded-lg text-black p-2 text-sm min-w-[300px] text-center border border-black h-11"
              />
            </label>
            <button className="bg-purple-900 w-full rounded-lg p-2 h-11 mt-2">
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
