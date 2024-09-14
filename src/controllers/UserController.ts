// controllers/userController.ts
import { firestore } from "@/lib/FirebaseConn"; // Importa tu instancia de Firebase Admin
import { User } from "@/models/UserModel"; // Importa el modelo de User

// Obtener un usuario por su ID
export const getUserById = async (id: string) => {
  try {
    const userDoc = await firestore.collection("users").doc(id).get();
    if (!userDoc.exists) {
      throw new Error("No se encontró el usuario con el ID especificado.");
    }
    return userDoc.data();
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${error}`);
  }
};

// Crear un nuevo usuario
export const createUser = async (userData: User) => {
  try {
    const newUser = await firestore.collection("users").add({ ...userData });
    return newUser.id;
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${error}`);
  }
};

// Actualizar los datos de un usuario por su ID
export const updateUserById = async (id: string, userData: Partial<User>) => {
  try {
    const userRef = firestore.collection("users").doc(id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error("No se encontró el usuario con el ID especificado.");
    }

    await userRef.update(userData);
    return { message: "Usuario actualizado correctamente" };
  } catch (error) {
    throw new Error(`Error al actualizar el usuario: ${error}`);
  }
};

// Eliminar un usuario por su ID
export const deleteUserById = async (id: string) => {
  try {
    const userRef = firestore.collection("users").doc(id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error("No se encontró el usuario con el ID especificado.");
    }

    await userRef.delete();
    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    throw new Error(`Error al eliminar el usuario: ${error}`);
  }
};
