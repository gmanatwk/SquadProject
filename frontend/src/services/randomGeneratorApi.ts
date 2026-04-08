import { request } from './api';
import { Person, Address } from '../types/api';

export async function generateGuid(signal?: AbortSignal): Promise<string> {
  const res = await request<{ guid: string }>({ url: '/api/generate/guid', method: 'GET', signal });
  return res.guid;
}

export async function generateRandomNumbers(count: number, min: number, max: number, signal?: AbortSignal): Promise<number[]> {
  const res = await request<{ numbers: number[] }>({ url: '/api/generate/numbers', method: 'POST', data: { count, min, max }, signal });
  return res.numbers;
}

export async function generatePerson(signal?: AbortSignal): Promise<Person> {
  const res = await request<Person>({ url: '/api/generate/person', method: 'GET', signal });
  return res;
}

export async function generateAddress(signal?: AbortSignal): Promise<Address> {
  const res = await request<Address>({ url: '/api/generate/address', method: 'GET', signal });
  return res;
}
