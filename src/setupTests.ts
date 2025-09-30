import '@testing-library/jest-dom';

beforeEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});

const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn((...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalError.call(console, ...args);
  });
});

afterAll(() => {
  console.error = originalError;
});
