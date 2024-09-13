class Report {
  id: string;
  petId: string; // ID de la mascota reportada
  reporterName: string; // Nombre de la persona que hace el reporte
  reporterContact: string; // Información de contacto del reportero
  isLost: boolean; // Indica si el reporte es por mascota perdida (true) o encontrada (false)
  location: string; // Ubicación donde se perdió o encontró la mascota
  reportDate: Date; // Fecha en la que se hizo el reporte
  description?: string; // Descripción adicional del reporte (opcional)

  constructor(
    id: string,
    petId: string,
    reporterName: string,
    reporterContact: string,
    isLost: boolean,
    location: string,
    description?: string
  ) {
    this.id = id;
    this.petId = petId;
    this.reporterName = reporterName;
    this.reporterContact = reporterContact;
    this.isLost = isLost;
    this.location = location;
    this.reportDate = new Date(); // Fecha actual del reporte
    this.description = description;
  }

  // Método para actualizar la ubicación del reporte
  updateLocation(newLocation: string): void {
    this.location = newLocation;
  }

  // Método para actualizar la descripción del reporte
  updateDescription(newDescription: string): void {
    this.description = newDescription;
  }

  // Método para mostrar información básica del reporte
  getReportInfo(): string {
    const reportType = this.isLost ? "Perdida" : "Encontrada";
    return `Mascota ${reportType}: Reportada por ${this.reporterName}, en ${
      this.location
    } el ${this.reportDate.toDateString()}.`;
  }
}

export { Report };
