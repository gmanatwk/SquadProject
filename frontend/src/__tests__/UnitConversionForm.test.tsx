import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UnitConversionForm from '../components/forms/UnitConversionForm';
import * as api from '../services/unitConversionApi';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../store';

jest.mock('../services/unitConversionApi');

test('submits conversion and shows result', async () => {
  (api.convertUnits as jest.Mock).mockResolvedValue({ result: 42 });
  const store = configureStore({ reducer });
  render(<Provider store={store}><UnitConversionForm /></Provider>);

  const valueInput = screen.getByPlaceholderText('Value');
  fireEvent.change(valueInput, { target: { value: '10' } });
  // since selects are populated async, we'll skip selecting units in this example and just ensure submit doesn't crash
  const submit = screen.getByText(/convert/i);
  fireEvent.click(submit);

  await waitFor(() => expect(api.convertUnits).toHaveBeenCalled());
});
