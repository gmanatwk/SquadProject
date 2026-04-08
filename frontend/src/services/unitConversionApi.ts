import { request } from './api';
import { ConversionResult, Unit } from '../types/api';

export async function convertUnits(fromValue: number, fromUnit: string, toUnit: string, signal?: AbortSignal): Promise<ConversionResult> {
  const payload = { fromUnitId: fromUnit, toUnitId: toUnit, value: fromValue };
  const res = await request<{ result: number; from?: string; to?: string }>({ url: '/api/convert', method: 'POST', data: payload, signal });
  return { result: res.result } as ConversionResult;
}

export async function getSupportedUnits(signal?: AbortSignal): Promise<Unit[]> {
  const res = await request<Unit[]>({ url: '/api/units', method: 'GET', signal });
  return res;
}
