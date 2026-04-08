import '@testing-library/jest-dom/extend-expect';
// Global mocks and test utilities go here

// Example: mock window.matchMedia if used by components
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({ matches: false, media: query, onchange: null, addListener: () => {}, removeListener: () => {} })
  });
}
