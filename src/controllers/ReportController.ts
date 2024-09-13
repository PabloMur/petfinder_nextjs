// controllers/reportController.ts
import { db } from "../firebaseAdmin"; // Importa tu instancia de Firebase Admin
import { Report } from "../models/Report"; // Importa el modelo de Report

// Obtener un reporte por su ID
export const getReportById = async (id: string) => {
  try {
    const reportDoc = await db.collection("reports").doc(id).get();
    if (!reportDoc.exists) {
      throw new Error("No se encontró el reporte con el ID especificado.");
    }
    return reportDoc.data();
  } catch (error) {
    throw new Error(`Error al obtener el reporte: ${error.message}`);
  }
};

// Crear un nuevo reporte
export const createReport = async (reportData: Report) => {
  try {
    const newReport = await db.collection("reports").add({ ...reportData });
    return newReport.id;
  } catch (error) {
    throw new Error(`Error al crear el reporte: ${error.message}`);
  }
};

// Actualizar un reporte por su ID
export const updateReportById = async (
  id: string,
  reportData: Partial<Report>
) => {
  try {
    const reportRef = db.collection("reports").doc(id);
    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      throw new Error("No se encontró el reporte con el ID especificado.");
    }

    await reportRef.update(reportData);
    return { message: "Reporte actualizado correctamente" };
  } catch (error) {
    throw new Error(`Error al actualizar el reporte: ${error.message}`);
  }
};

// Eliminar un reporte por su ID
export const deleteReportById = async (id: string) => {
  try {
    const reportRef = db.collection("reports").doc(id);
    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      throw new Error("No se encontró el reporte con el ID especificado.");
    }

    await reportRef.delete();
    return { message: "Reporte eliminado correctamente" };
  } catch (error) {
    throw new Error(`Error al eliminar el reporte: ${error.message}`);
  }
};

// Obtener todos los reportes de mascotas perdidas o encontradas
export const getAllReports = async () => {
  try {
    const reportsSnapshot = await db.collection("reports").get();
    const reports = reportsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reports;
  } catch (error) {
    throw new Error(`Error al obtener los reportes: ${error.message}`);
  }
};
