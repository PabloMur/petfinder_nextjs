// controllers/userController.ts
import { db } from "../firebaseAdmin"; // Importa tu instancia de Firebase Admin
import { User } from "../models/User"; // Importa el modelo de User

// Obtener un usuario por su ID
export const getUserById = async (id: string) => {
  try {
    const userDoc = await db.collection("users").doc(id).get();
    if (!userDoc.exists) {
      throw new Error("No se encontró el usuario con el ID especificado.");
    }
    return userDoc.data();
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${error.message}`);
  }
};

// Crear un nuevo usuario
export const createUser = async (userData: User) => {
  try {
    const newUser = await db.collection("users").add({ ...userData });
    return newUser.id;
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${error.message}`);
  }
};

// Actualizar los datos de un usuario por su ID
export const updateUserById = async (id: string, userData: Partial<User>) => {
  try {
    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error("No se encontró el usuario con el ID especificado.");
    }

    await userRef.update(userData);
    return { message: "Usuario actualizado correctamente" };
  } catch (error) {
    throw new Error(`Error al actualizar el usuario: ${error.message}`);
  }
};

// Eliminar un usuario por su ID
export const deleteUserById = async (id: string) => {
  try {
    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error("No se encontró el usuario con el ID especificado.");
    }

    await userRef.delete();
    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    throw new Error(`Error al eliminar el usuario: ${error.message}`);
  }
};
