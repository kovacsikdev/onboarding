# Testing Setup Guide

This document provides instructions for setting up and running tests for the onboarding application.

## Test Files Created

We've created the following test files:

1. `__tests__/WelcomePage.test.tsx` - Tests for the welcome page component
2. `__tests__/PersonalInfoPage.test.tsx` - Tests for the personal information page component
3. `__tests__/ContactInfoPage.test.tsx` - Tests for the contact information page component
4. `__tests__/SummaryPage.test.tsx` - Tests for the summary page component
5. `__tests__/App.test.tsx` - Tests for the main App component

## Dependencies Required

Add the following dependencies to your package.json:

```json
"devDependencies": {
  "@testing-library/jest-dom": "^6.4.2",
  "@testing-library/react": "^14.2.1",
  "@testing-library/user-event": "^14.5.2", 
  "@types/jest": "^29.5.12",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "ts-jest": "^29.1.2"
}
```

## Configuration Files

1. `jest.config.js`:

```js
/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
};

module.exports = config;
```

2. `tsconfig.jest.json`:

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "esModuleInterop": true,
    "allowJs": true,
    "jsx": "react-jsx"
  },
  "include": ["src", "__tests__", "jest.setup.js"]
}
```

3. `jest.setup.js`:

```js
import '@testing-library/jest-dom';
```

4. Mock files in `src/__mocks__/`:
   - `styleMock.js`: `module.exports = {};`
   - `fileMock.js`: `module.exports = 'test-file-stub';`

## Scripts for package.json

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}
```

## Troubleshooting

If you encounter issues with Jest and ESM modules:

1. Make sure you are using compatible versions of Jest and React
2. Set the `esModuleInterop` flag to true in your tsconfig
3. Consider using a CommonJS configuration for Jest

## Test Examples

Each test file contains examples of:

1. Rendering components with props
2. Testing for the presence of expected elements
3. Testing user interactions (clicking buttons, typing in forms)
4. Testing keyboard navigation
5. Testing CSS transitions between pages

## Next Steps

1. Install the dependencies using `npm install`
2. Run the tests using `npm test`
3. If you encounter issues, you may need to adjust the configuration to match your specific environment
