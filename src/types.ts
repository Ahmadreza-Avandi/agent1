export interface PatientData {
  age: number;
  ageUnit: 'year' | 'month';
  gender: 'male' | 'female';
  weight: number;
  weightUnit: 'kilogram' | 'gram';
  symptoms: string;
  medicalHistory: string;
}

export interface DiagnosisResponse {
  result: string;
  message: string;
}