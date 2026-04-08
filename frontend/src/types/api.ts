// Types for API models

export type Unit = {
  id: string;
  name: string;
  symbol?: string;
};

export type ConversionResult = {
  result: number;
  from?: string;
  to?: string;
  timestamp?: string;
};

export type Person = {
  firstName: string;
  lastName: string;
  email?: string;
  age?: number;
};

export type Address = {
  street: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export enum GeneratorType {
  GUID = 'guid',
  Person = 'person',
  Address = 'address',
  Numbers = 'numbers'
}

export type ApiResponse<T> = { data: T; success: boolean; error?: string };
