import { firestore } from "@/lib/FirebaseConn"; // Instancia de Firebase Admin
import { PetData } from "@/types/PetData"; // Importar el tipo PetData

// Crear una nueva mascota
export const createPet = async (petData: PetData): Promise<string> => {
  try {
    const newPet = await firestore.collection("pets").add({ ...petData });
    return newPet.id; // Devolver el ID de la nueva mascota creada
  } catch (error) {
    throw new Error(`Error al crear la mascota`);
  }
};

// Obtener todas las mascotas por el email del propietario
export const getPetsByOwnerEmail = async (
  email: string
): Promise<PetData[]> => {
  try {
    const petsSnapshot = await firestore
      .collection("pets")
      .where("ownerEmail", "==", email)
      .get();

    if (petsSnapshot.empty) {
      throw new Error("No se encontraron mascotas para el email especificado.");
    }

    const pets: PetData[] = [];
    petsSnapshot.forEach((doc) => {
      pets.push(doc.data() as PetData);
    });

    return pets;
  } catch (error) {
    throw new Error(`Error al obtener las mascotas: ${error}`);
  }
};

// Obtener una mascota por su ID
export const getPetById = async (id: string): Promise<PetData | null> => {
  try {
    const petDoc = await firestore.collection("pets").doc(id).get();
    if (!petDoc.exists) {
      throw new Error("No se encontró la mascota con el ID especificado.");
    }
    return petDoc.data() as PetData; // Aseguramos que el resultado tiene el tipo PetData
  } catch (error) {
    throw new Error(`Error al obtener la mascota: ${error}`);
  }
};

// Actualizar los datos de una mascota por su ID
export const updatePetById = async (
  id: string,
  petData: Partial<PetData>
): Promise<string> => {
  try {
    const petRef = firestore.collection("pets").doc(id);
    const petDoc = await petRef.get();

    if (!petDoc.exists) {
      throw new Error("No se encontró la mascota con el ID especificado.");
    }

    await petRef.update(petData);
    return `Mascota con ID ${id} actualizada correctamente.`;
  } catch (error) {
    throw new Error(`Error al actualizar la mascota: ${error}`);
  }
};

// Eliminar una mascota por su ID
export const deletePetById = async (id: string): Promise<string> => {
  try {
    const petRef = firestore.collection("pets").doc(id);
    const petDoc = await petRef.get();

    if (!petDoc.exists) {
      throw new Error("No se encontró la mascota con el ID especificado.");
    }

    await petRef.delete();
    return `Mascota con ID ${id} eliminada correctamente.`;
  } catch (error) {
    throw new Error(`Error al eliminar la mascota: ${error}`);
  }
};
