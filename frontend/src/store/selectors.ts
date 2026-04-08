import { RootState } from './index';

export const selectConverter = (state: RootState) => state.converter;
export const selectGenerator = (state: RootState) => state.generator;
