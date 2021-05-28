import patients from '../data/patients.json';

export type Gender = 'male' | 'female';

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export const getPatients = (): Patient[] => {
  return patients as Patient[];
};

export const getPatientsNoSsn = (): Omit<Patient, 'ssn'>[] => {
  const patientsWithSsn = getPatients();
  return patientsWithSsn.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  }));
};