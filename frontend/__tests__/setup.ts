import '@testing-library/jest-dom';
// Global mocks and test utilities go here

// Example: mock window.matchMedia if used by components
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({ matches: false, media: query, onchange: null, addListener: () => {}, removeListener: () => {} })
  });
}

// Provide default mocks for services that tests may partially mock.
jest.mock('../src/services/unitConversionApi', () => ({
  convertUnits: jest.fn(),
  getSupportedUnits: jest.fn().mockResolvedValue([
    { id: 'm', name: 'Meters' },
    { id: 'km', name: 'Kilometers' },
  ]),
}));
