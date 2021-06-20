import {
  Gender,
  Diagnose,
  HealthCheckRating,
  SickLeaveDuration,
  DischargeInfo,
} from './types';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (param: unknown): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

export const isHealthCheckRating = (
  param: unknown
): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};

export const isSickLeaveDuration = (
  object: unknown
): object is SickLeaveDuration => {
  if (!object) return false;
  if (
    (object as SickLeaveDuration).startDate !== undefined &&
    (object as SickLeaveDuration).endDate !== undefined
  ) {
    if (
      isDate((object as SickLeaveDuration).startDate) &&
      isDate((object as SickLeaveDuration).endDate)
    ) {
      return true;
    }
  }
  return false;
};

export const isDischargeInfo = (object: unknown): object is DischargeInfo => {
  if (!object) return false;
  if (
    (object as DischargeInfo).criteria !== undefined &&
    (object as DischargeInfo).date !== undefined
  ) {
    if (
      isString((object as DischargeInfo).criteria) &&
      isDate((object as DischargeInfo).date)
    ) {
      return true;
    }
  }
  return false;
};

export const isCodes = (codes: unknown): codes is Array<Diagnose['code']> => {
  if (!Array.isArray(codes)) {
    return false;
  }
  if (codes.some((code) => typeof code !== 'string')) {
    return false;
  }
  return true;
};

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

export const parseDescription = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

export const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

export const parseSickLeaveDuration = (
  duration: unknown
): SickLeaveDuration => {
  if (!duration || !isSickLeaveDuration(duration)) {
    throw new Error('Incorrect or missing sick leave duration: ' + duration);
  }
  return duration;
};

export const parseDischargeInfo = (
  info: unknown
): DischargeInfo => {
  if (!info || !isDischargeInfo(info)) {
    throw new Error('Incorrect or missing discharge info: ' + info);
  }
  return info;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

export const parseCodes = (codes: unknown): Array<Diagnose['code']> => {
  if (!codes || !isCodes(codes)) {
    throw new Error('Incorrect or missing codes: ' + codes);
  }
  return codes;
};
