import { configureStore } from '@reduxjs/toolkit';
import converterReducer from './slices/converterSlice';
import generatorReducer from './slices/generatorSlice';

const reducers = {
  converter: converterReducer,
  generator: generatorReducer,
};

export const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default reducers;
