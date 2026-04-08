# Frontend (React + TypeScript)

## 1. Project Overview

This is the React 18 + TypeScript frontend for SquadProject. It provides a modern UI for unit conversion and random data generation, integrating with the backend API. The app uses Redux Toolkit for state management, React Hook Form for forms, and is structured for scalability and maintainability.

**Tech Stack:**
- React 18
- TypeScript
- Redux Toolkit
- React Hook Form
- Axios
- Jest & React Testing Library

**Architecture:**
- Modular, feature-based structure
- Redux slices for state
- Service layer for API
- Custom hooks for logic reuse

---

## 2. Directory Structure

- `src/components/` — Reusable UI components (common, features, forms)
- `src/pages/` — Page-level containers (route targets)
- `src/store/` — Redux slices, selectors, and store setup
- `src/hooks/` — Custom React hooks
- `src/types/` — TypeScript type definitions
- `src/services/` — API client and service layer
- `src/__tests__/` — Jest unit tests
- Other key files: `App.tsx`, `main.tsx`

---

## 3. Prerequisites

- **Node.js**: LTS version 18+
- **npm** (or yarn)
- **Git**

---

## 4. Installation

```bash
npm install
```

---

## 5. Environment Setup

- Use `.env.local` for development, `.env.production` for production.
- Example:
  ```env
  API_BASE_URL=http://localhost:5000
  ```
- Override at runtime by setting environment variables before starting.

---

## 6. Development Server

Start the app:
```bash
npm start
```
- Runs on [http://localhost:3000](http://localhost:3000)
- Hot reload enabled

---

## 7. Building for Production

Build the app:
```bash
npm run build
```
- Output: `build/`
- Optimized static files
- Environment variables are baked in at build time

---

## 8. Running Tests

Run unit tests:
```bash
npm test
```
Coverage report:
```bash
npm test -- --coverage
```
- Jest config: `jest.config.js`
- Coverage targets: >80% (branches, functions, lines, statements)

---

## 9. Linting & Formatting

```bash
npm run lint
npm run format
```

---

## 10. Folder Structure

```
src/
├── components/
│   ├── common/
│   ├── features/
│   └── forms/
├── pages/
├── store/
│   └── slices/
├── hooks/
├── types/
├── services/
└── __tests__/
```

---

## 11. Key Dependencies

- **react, react-dom** — Core UI library
- **@reduxjs/toolkit, react-redux** — State management
- **react-hook-form** — Form handling
- **axios** — HTTP client
- **jest, @testing-library/react** — Testing
- **typescript** — Type safety

---

## 12. API Integration

- Base URL from `.env` (`API_BASE_URL`)
- Add new API calls in `src/services/`
- Error handling via Redux async thunks
- Example (unit conversion):
  ```ts
  import { convertUnits } from 'src/services/unitConversionApi';
  await convertUnits(10, 'm', 'ft');
  ```

---

## 13. Troubleshooting

- "Cannot find module" → run `npm install`
- Port 3000 in use → change in `.env.local`
- API errors → check backend/API_BASE_URL
- Tests failing → ensure dependencies are installed

---

## 14. Contributing

- Add UI to `components/common` (reusable) or `components/features` (feature-specific)
- Add Redux slices in `store/slices/`
- Maintain >80% test coverage
- Follow code style and run linter/formatter

---

## 15. Links & Resources

- [Main Project README](../README.md)
- [Backend API Documentation](../backend/API_ENDPOINTS.md)
- [Test Strategy](../tests/TEST_STRATEGY.md)
