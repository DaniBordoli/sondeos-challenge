export interface MrzData {
  documentNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  expirationDate?: string;
  nationality?: string;
  gender?: string;
  documentType?: string;
  issuingCountry?: string;
  rawText?: any
}

export interface Person {
  dni: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isAdult: boolean;
}

export interface AuthorizationResponse {
  dni?: string;
  authorized: boolean;
  message: string;
  eventName?: string;
  personName?: string;
}

export interface Drink {
  id: number;
  name: string;
  description: string;
  price: number;
  alcoholic: boolean;
  image?: string;
  imageUrl?: string;
}
