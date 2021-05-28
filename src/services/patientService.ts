import patients from '../data/patients.json';
import { Patient } from '../types';
import { v1 as uuid } from 'uuid';
import { parseName, parseDate, parseSsn, parseGender, parseOccupation } from '../utils';

let allPatients = patients as Patient[];

export const getPatients = (): Patient[] => {
  return allPatients;
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

export const addPatient = (parsedEntry: Omit<Patient, 'id'>): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    name: parsedEntry.name,
    dateOfBirth: parsedEntry.dateOfBirth,
    ssn: parsedEntry.ssn,
    gender: parsedEntry.gender,
    occupation: parsedEntry.occupation
  };

  allPatients = [
    ...allPatients,
    newPatient
  ];

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toPatientEntry = (object: any): Omit<Patient, 'id'> => {
  const entry: Omit<Patient, 'id'> = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
  return entry;
};