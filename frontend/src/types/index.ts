// Domain types

export type Unit = {
  id: string;
  name: string;
  abbreviation?: string;
};

export type Conversion = {
  from: Unit;
  to: Unit;
  factor: number; // multiplicative factor
};

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age?: number;
};

export type Address = {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};
