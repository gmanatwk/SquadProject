import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { generateGuid as apiGenerateGuid, generatePerson as apiGeneratePerson, generateAddress as apiGenerateAddress, generateRandomNumbers as apiGenerateNumbers } from '../../services/randomGeneratorApi';
import { RootState } from '../../store';

export type GeneratedType = 'guid' | 'person' | 'address' | 'numbers';

interface GeneratorState<T = unknown> {
  generatedData: T | null;
  loading: boolean;
  error?: string | null;
  type?: GeneratedType | null;
}

const initialState: GeneratorState = {
  generatedData: null,
  loading: false,
  error: null,
  type: null,
};

export const generateGuid = createAsyncThunk('generator/generateGuid', async (_: void, { signal, rejectWithValue }) => {
  try {
    return await apiGenerateGuid(signal);
  } catch (e: any) {
    return rejectWithValue(e.message || 'generateGuid failed');
  }
});

export const generatePerson = createAsyncThunk('generator/generatePerson', async (_: void, { signal, rejectWithValue }) => {
  try {
    return await apiGeneratePerson(signal);
  } catch (e: any) {
    return rejectWithValue(e.message || 'generatePerson failed');
  }
});

export const generateAddress = createAsyncThunk('generator/generateAddress', async (_: void, { signal, rejectWithValue }) => {
  try {
    return await apiGenerateAddress(signal);
  } catch (e: any) {
    return rejectWithValue(e.message || 'generateAddress failed');
  }
});

export const generateNumbers = createAsyncThunk('generator/generateNumbers', async (params: { count: number; min: number; max: number }, { signal, rejectWithValue }) => {
  try {
    return await apiGenerateNumbers(params.count, params.min, params.max, signal);
  } catch (e: any) {
    return rejectWithValue(e.message || 'generateNumbers failed');
  }
});

const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  reducers: {
    clearGenerated(state) {
      state.generatedData = null;
      state.type = null;
      state.error = null;
    },
    setGeneratedType(state, action: PayloadAction<GeneratedType | null>) {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateGuid.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(generateGuid.fulfilled, (state, action: PayloadAction<string>) => { state.loading = false; state.generatedData = action.payload; state.type = 'guid'; })
      .addCase(generateGuid.rejected, (state, action) => { state.loading = false; state.error = String(action.payload || action.error?.message); })

      .addCase(generatePerson.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(generatePerson.fulfilled, (state, action: PayloadAction<any>) => { state.loading = false; state.generatedData = action.payload; state.type = 'person'; })
      .addCase(generatePerson.rejected, (state, action) => { state.loading = false; state.error = String(action.payload || action.error?.message); })

      .addCase(generateAddress.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(generateAddress.fulfilled, (state, action: PayloadAction<any>) => { state.loading = false; state.generatedData = action.payload; state.type = 'address'; })
      .addCase(generateAddress.rejected, (state, action) => { state.loading = false; state.error = String(action.payload || action.error?.message); })

      .addCase(generateNumbers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(generateNumbers.fulfilled, (state, action: PayloadAction<number[]>) => { state.loading = false; state.generatedData = action.payload; state.type = 'numbers'; })
      .addCase(generateNumbers.rejected, (state, action) => { state.loading = false; state.error = String(action.payload || action.error?.message); });
  }
});

export const { clearGenerated, setGeneratedType } = generatorSlice.actions;
export const selectGenerated = (s: RootState) => s.generator.generatedData;
export const selectLoading = (s: RootState) => s.generator.loading;
export const selectError = (s: RootState) => s.generator.error;

export default generatorSlice.reducer;
