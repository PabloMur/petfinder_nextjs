// controllers/userController.ts

import { firestore } from "@/lib/FirebaseConn"; // Conexión a Firebase
import { User } from "@/models/UserModel"; // Modelo de User

// Funciones de CRUD para el usuario

// Obtener un usuario por su ID
export const getUserByEmail = async (email: string) => {
  try {
    const userQuerySnapshot = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userQuerySnapshot.empty) {
      throw new Error("No se encontró un usuario con el email especificado.");
    }

    const userDoc = userQuerySnapshot.docs[0]; // Tomamos el primer documento encontrado

    return userDoc.data(); // Retorna los datos del usuario
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${error}`);
  }
};

// Verificar si un usuario existe por su ID
export const doesUserExist = async (id: string): Promise<boolean> => {
  try {
    const userDoc = await firestore.collection("users").doc(id).get();
    return userDoc.exists;
  } catch (error) {
    throw new Error(`Error al verificar si el usuario existe: ${error}`);
  }
};

// Crear un nuevo usuario
export const createUser = async (userData: any) => {
  try {
    // Crear una instancia de User con los datos recibidos
    const newUserInstance = new User(
      userData.name,
      userData.email,
      userData.image,
      userData.pets || [],
      userData.phoneNumber,
      userData.address
    );

    // Guardar la instancia en Firebase
    const newUser = await firestore
      .collection("users")
      .add({ ...newUserInstance });
    return newUser.id;
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${error}`);
  }
};

// Actualizar un usuario por su ID
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

// Eliminar un usuario por su email
export const deleteUserByEmail = async (email: string) => {
  try {
    const userRef = firestore.collection("users").doc(email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error("No se encontró el usuario con el email especificado.");
    }

    await userRef.delete();
    return { message: "Usuario eliminado correctamente" };
  } catch (error) {
    throw new Error(`Error al eliminar el usuario: ${error}`);
  }
};
