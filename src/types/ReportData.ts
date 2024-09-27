export type ReportData = {
  reporterName: string;
  petId: string;
  description: string;
  location: string;
  dateLostOrFound: Date | string; // Puede ser un string o un objeto Date
  reporterPhone: string;
  reporterEmail?: string;
};
