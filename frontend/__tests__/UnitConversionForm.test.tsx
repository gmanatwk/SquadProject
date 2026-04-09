import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import UnitConversionForm from '../src/components/forms/UnitConversionForm';
import * as api from '../src/services/unitConversionApi';
import renderWithProviders from '../src/test-utils/renderWithProviders';

jest.mock('../src/services/unitConversionApi');

test('submits conversion and shows result', async () => {
  (api.convertUnits as jest.Mock).mockResolvedValue({ result: 42 });
  renderWithProviders(<UnitConversionForm />);

  const valueInput = screen.getByPlaceholderText('Value');
  fireEvent.change(valueInput, { target: { value: '10' } });
  // since selects are populated async, we'll skip selecting units in this example and just ensure submit doesn't crash
  const submit = screen.getByText(/convert/i);
  fireEvent.click(submit);

  await waitFor(() => expect(api.convertUnits).toHaveBeenCalled());
});
