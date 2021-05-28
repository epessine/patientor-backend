import diagnoses from '../data/diagnoses.json';

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};