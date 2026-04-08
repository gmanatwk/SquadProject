import { configureStore } from '@reduxjs/toolkit';
import converterReducer from './slices/converterSlice';
import generatorReducer from './slices/generatorSlice';

export const store = configureStore({
  reducer: {
    converter: converterReducer,
    generator: generatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
