import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { convertUnits as apiConvertUnits } from '../../services/unitConversionApi';
import { RootState } from '../../store';
import { ConversionResult } from '../../types/api';

interface ConverterState {
  result: ConversionResult | null;
  loading: boolean;
  error?: string | null;
  history: ConversionResult[];
}

const initialState: ConverterState = { result: null, loading: false, error: null, history: [] };

export const convertUnits = createAsyncThunk('converter/convertUnits', async (params: { fromValue: number; fromUnit: string; toUnit: string }, { signal, rejectWithValue }) => {
  try {
    const res = await apiConvertUnits(params.fromValue, params.fromUnit, params.toUnit, signal);
    return res;
  } catch (e: any) {
    return rejectWithValue(e.message || 'Conversion failed');
  }
});

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    clearResult(state) { state.result = null; state.error = null; },
    clearHistory(state) { state.history = []; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(convertUnits.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(convertUnits.fulfilled, (state, action: PayloadAction<ConversionResult>) => { state.loading = false; state.result = action.payload; state.history.unshift(action.payload); })
      .addCase(convertUnits.rejected, (state, action) => { state.loading = false; state.error = String(action.payload || action.error?.message); });
  }
});

export const { clearResult, clearHistory } = converterSlice.actions;
export const selectResult = (s: RootState) => s.converter.result;
export const selectLoading = (s: RootState) => s.converter.loading;
export const selectError = (s: RootState) => s.converter.error;
export const selectHistory = (s: RootState) => s.converter.history;
export default converterSlice.reducer;
