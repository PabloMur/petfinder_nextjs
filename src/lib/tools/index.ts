import { PetData } from "@/types/PetData";
import { ReportData } from "@/types/ReportData";

export function validatePetData(petData: PetData) {
  const requiredFields = [
    "name",
    "species",
    "isLost",
    "location",
    "dateLostOrFound",
    "ownerContact", // Añadido como campo requerido
    "ownerEmail", // Añadido como campo requerido
  ];

  // Verificar que todos los campos requeridos están presentes
  for (const field of requiredFields) {
    if (!petData[field as keyof PetData]) {
      throw new Error(`El campo ${field} es obligatorio.`);
    }
  }

  // Validaciones específicas de los tipos de datos

  if (typeof petData.name !== "string") {
    throw new Error("El campo 'name' debe ser una cadena de texto.");
  }

  if (typeof petData.species !== "string") {
    throw new Error("El campo 'species' debe ser una cadena de texto.");
  }

  if (typeof petData.isLost !== "boolean") {
    throw new Error("El campo 'isLost' debe ser un valor booleano.");
  }

  if (typeof petData.location !== "string") {
    throw new Error("El campo 'location' debe ser una cadena de texto.");
  }

  if (isNaN(Date.parse(petData.dateLostOrFound.toString()))) {
    throw new Error("El campo 'dateLostOrFound' debe ser una fecha válida.");
  }

  // Validar el campo 'ownerContact' como requerido y tipo string
  if (typeof petData.ownerContact !== "string") {
    throw new Error("El campo 'ownerContact' debe ser una cadena de texto.");
  }

  if (typeof petData.ownerEmail !== "string") {
    throw new Error("El campo 'ownerEmail' debe ser una cadena de texto.");
  }

  // Validar campos opcionales
  if (petData.breed && typeof petData.breed !== "string") {
    throw new Error(
      "El campo 'breed' debe ser una cadena de texto si se proporciona."
    );
  }

  if (petData.age && typeof petData.age !== "number") {
    throw new Error("El campo 'age' debe ser un número si se proporciona.");
  }

  if (petData.description && typeof petData.description !== "string") {
    throw new Error(
      "El campo 'description' debe ser una cadena de texto si se proporciona."
    );
  }
}

export function validateReportData(reportData: ReportData) {
  const requiredFields = [
    "reporterName",
    "petId",
    "description",
    "location",
    "dateLostOrFound",
    "reporterPhone",
  ];

  // Verificar que todos los campos requeridos están presentes
  for (const field of requiredFields) {
    if (!reportData[field as keyof ReportData]) {
      throw new Error(`El campo ${field} es obligatorio.`);
    }
  }

  // Validaciones específicas de los tipos de datos

  if (typeof reportData.reporterName !== "string") {
    throw new Error("El campo 'reporterName' debe ser una cadena de texto.");
  }

  if (typeof reportData.petId !== "string") {
    throw new Error("El campo 'petId' debe ser una cadena de texto.");
  }

  if (typeof reportData.description !== "string") {
    throw new Error("El campo 'description' debe ser una cadena de texto.");
  }

  if (typeof reportData.location !== "string") {
    throw new Error("El campo 'location' debe ser una cadena de texto.");
  }

  if (isNaN(Date.parse(reportData.dateLostOrFound.toString()))) {
    throw new Error("El campo 'dateLostOrFound' debe ser una fecha válida.");
  }

  if (typeof reportData.reporterPhone !== "string") {
    throw new Error("El campo 'reporterPhone' debe ser una cadena de texto.");
  }

  // Validar el campo 'reporterEmail' como opcional, si se proporciona
  if (
    reportData.reporterEmail &&
    typeof reportData.reporterEmail !== "string"
  ) {
    throw new Error(
      "El campo 'reporterEmail' debe ser una cadena de texto si se proporciona."
    );
  }
}
