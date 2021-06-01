import patients from '../data/patients.json';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';
import { parseName, parseDate, parseSsn, parseGender, parseOccupation } from '../utils';

let allPatients = patients as Patient[];

export const getPatients = (): Patient[] => {
  return allPatients;
};

export const getPatientsNoSsn = (): PublicPatient[] => {
  const patientsWithSsn = getPatients();
  return patientsWithSsn.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries
  }));
};

export const addPatient = (parsedEntry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    name: parsedEntry.name,
    dateOfBirth: parsedEntry.dateOfBirth,
    ssn: parsedEntry.ssn,
    gender: parsedEntry.gender,
    occupation: parsedEntry.occupation,
    entries: parsedEntry.entries
  };

  allPatients = [
    ...allPatients,
    newPatient
  ];

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toPatientEntry = (object: any): NewPatient => {
  const entry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
  return entry;
};

export const getSinglePatient = (id: string): PublicPatient => {
  const patient = getPatients().find(patient => patient.id === id);
  if (!patient) throw new Error('patient not found');
  const publicPatient = {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: []
  };
  return publicPatient;
};