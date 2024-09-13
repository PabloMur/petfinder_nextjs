// controllers/petController.ts
//ESTE CODIGO DEBE SER AJUSTADO AL PROYECTO FINAL Y REAL
import { db } from "../firebaseAdmin"; // Importa tu instancia de Firebase Admin
import { Pet } from "../models/Pet"; // Importa el modelo de Pet

// Obtener una mascota por su ID
export const getPetById = async (id: string) => {
  try {
    const petDoc = await db.collection("pets").doc(id).get();
    if (!petDoc.exists) {
      throw new Error("No se encontró la mascota con el ID especificado.");
    }
    return petDoc.data();
  } catch (error) {
    throw new Error(`Error al obtener la mascota: ${error.message}`);
  }
};

// Crear una nueva mascota
export const createPet = async (petData: Pet) => {
  try {
    const newPet = await db.collection("pets").add({ ...petData });
    return newPet.id;
  } catch (error) {
    throw new Error(`Error al crear la mascota: ${error.message}`);
  }
};

// Actualizar los datos de una mascota por su ID
export const updatePetById = async (id: string, petData: Partial<Pet>) => {
  try {
    const petRef = db.collection("pets").doc(id);
    const petDoc = await petRef.get();

    if (!petDoc.exists) {
      throw new Error("No se encontró la mascota con el ID especificado.");
    }

    await petRef.update(petData);
    return { message: "Mascota actualizada correctamente" };
  } catch (error) {
    throw new Error(`Error al actualizar la mascota: ${error.message}`);
  }
};

// Eliminar una mascota por su ID
export const deletePetById = async (id: string) => {
  try {
    const petRef = db.collection("pets").doc(id);
    const petDoc = await petRef.get();

    if (!petDoc.exists) {
      throw new Error("No se encontró la mascota con el ID especificado.");
    }

    await petRef.delete();
    return { message: "Mascota eliminada correctamente" };
  } catch (error) {
    throw new Error(`Error al eliminar la mascota: ${error.message}`);
  }
};
