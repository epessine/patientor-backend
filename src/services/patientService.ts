import patients from '../data/patients';
import { Patient, PublicPatient, NewPatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';
import {
  parseName,
  parseDate,
  parseSsn,
  parseGender,
  parseOccupation,
  parseDescription,
  parseCodes,
  parseHealthCheckRating,
  parseSickLeaveDuration,
  parseDischargeInfo,
} from '../utils';

let allPatients = patients;

export const getPatientsNoSsn = (): PublicPatient[] => {
  const patientsWithSsn = allPatients;
  return patientsWithSsn.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
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
    entries: parsedEntry.entries,
  };

  allPatients = [...allPatients, newPatient];

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
    entries: [],
  };
  return entry;
};

export const getSinglePatient = (id: string): Patient => {
  const patient = allPatients.find((patient) => patient.id === id);
  if (!patient) throw new Error('patient not found');
  return patient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toEntryEntry = (object: any): Entry => {
  switch (object.type) {
    case 'HealthCheck':
      return {
        id: uuid(),
        type: 'HealthCheck',
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

    case 'OccupationalHealthcare':
      return {
        id: uuid(),
        type: 'OccupationalHealthcare',
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        employerName: parseName(object.employerName),
        sickLeave: object.sickLeave
          ? parseSickLeaveDuration(object.sickLeave)
          : undefined,
      };

    case 'Hospital':
      return {
        id: uuid(),
        type: 'Hospital',
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        discharge: parseDischargeInfo(object.discharge),
      };

    default:
      throw new Error('invalid entry');
  }
};

export const addEntry = (parsedEntry: Entry, id: string): Patient => {
  const patient = allPatients.find(patient => patient.id === id);
  if (!patient) throw new Error('patient not found');
  const updatedPatient: Patient = {
    ...patient,
    entries: [
      ...patient?.entries,
      parsedEntry
    ]
  };

  allPatients = allPatients.map(patient => {
    if (patient.id === id) {
      return updatedPatient;
    }
    return patient;
  });

  return updatedPatient;
};
