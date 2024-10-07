export const APICheckEmail = async (email: string) => {
  try {
    const response = await fetch(`/api/user/checkEmail?email=${email}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en APICheckEmail:", error);
    return {
      error,
      message: "Error al intentar comprobar el email proporcionado",
    };
  }
};

export const APIGetUserData = async (email: string) => {
  try {
    const response = await fetch(`/api/user/get?email=${email}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en APIGetUserData:", error);
    return {
      error,
      message: "Error al intentar obtener los datos del usuario",
    };
  }
};
