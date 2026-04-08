export interface ConverterState {
  fromUnit: string | null;
  toUnit: string | null;
  value: string;
  result: number | null;
  loading: boolean;
}

export interface GeneratorState {
  items: any[];
  loading: boolean;
}
