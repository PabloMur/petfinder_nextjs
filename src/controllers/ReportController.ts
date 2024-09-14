// controllers/reportController.ts
import { firestore } from "@/lib/FirebaseConn"; // Importa tu instancia de Firebase Admin
import { Report } from "@/models/ReportModel"; // Importa el modelo de Report

// Obtener un reporte por su ID
export const getReportById = async (id: string) => {
  try {
    const reportDoc = await firestore.collection("reports").doc(id).get();
    if (!reportDoc.exists) {
      throw new Error("No se encontró el reporte con el ID especificado.");
    }
    return reportDoc.data();
  } catch (error) {
    throw new Error(`Error al obtener el reporte: ${error}`);
  }
};

// Crear un nuevo reporte
export const createReport = async (reportData: Report) => {
  try {
    const newReport = await firestore
      .collection("reports")
      .add({ ...reportData });
    return newReport.id;
  } catch (error) {
    throw new Error(`Error al crear el reporte: ${error}`);
  }
};

// Actualizar un reporte por su ID
export const updateReportById = async (
  id: string,
  reportData: Partial<Report>
) => {
  try {
    const reportRef = firestore.collection("reports").doc(id);
    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      throw new Error("No se encontró el reporte con el ID especificado.");
    }

    await reportRef.update(reportData);
    return { message: "Reporte actualizado correctamente" };
  } catch (error) {
    throw new Error(`Error al actualizar el reporte: ${error}`);
  }
};

// Eliminar un reporte por su ID
export const deleteReportById = async (id: string) => {
  try {
    const reportRef = firestore.collection("reports").doc(id);
    const reportDoc = await reportRef.get();

    if (!reportDoc.exists) {
      throw new Error("No se encontró el reporte con el ID especificado.");
    }

    await reportRef.delete();
    return { message: "Reporte eliminado correctamente" };
  } catch (error) {
    throw new Error(`Error al eliminar el reporte: ${error}`);
  }
};

// Obtener todos los reportes
export const getAllReports = async () => {
  try {
    const reportsSnapshot = await firestore.collection("reports").get();
    const reports = reportsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reports;
  } catch (error) {
    throw new Error(`Error al obtener los reportes: ${error}`);
  }
};
