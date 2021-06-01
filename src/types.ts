export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
  entries: []
}

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;