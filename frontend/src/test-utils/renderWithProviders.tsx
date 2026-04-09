import React from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { store as defaultStore } from '../store';

interface Options extends Omit<RenderOptions, 'queries'> {
  store?: any;
}

export function renderWithProviders(ui: React.ReactElement, options: Options = {}) {
  const { store = defaultStore, ...renderOptions } = options;
  return render(<Provider store={store}>{ui}</Provider>, renderOptions);
}

export * from '@testing-library/react';
export default renderWithProviders;
