This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Testing

This project includes a comprehensive test suite covering unit tests for all major components and logic.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage report
npm test:coverage
```

### Test Coverage

The test suite includes over 220 test cases covering:

- Schema validation (Yup schemas)
- Redux state management (slices and async thunks)
- React components (UI components and pages)
- TypeScript type definitions
- Edge cases and error conditions

For detailed testing documentation, see [TEST_README.md](./TEST_README.md).

### Test Structure

## Testing

This project includes a comprehensive test suite covering unit tests for all major components and logic.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage report
npm test:coverage
```

### Test Coverage

The test suite includes over 220 test cases covering:

- Schema validation (Yup schemas)
- Redux state management (slices and async thunks)
- React components (UI components and pages)
- TypeScript type definitions
- Edge cases and error conditions

For detailed testing documentation, see [TEST_README.md](./TEST_README.md).

### Test Structure

## Testing

This project includes a comprehensive test suite covering unit tests for all major components and logic.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage report
npm test:coverage
```

### Test Coverage

The test suite includes over 220 test cases covering:

- Schema validation (Yup schemas)
- Redux state management (slices and async thunks)
- React components (UI components and pages)
- TypeScript type definitions
- Edge cases and error conditions

For detailed testing documentation, see [TEST_README.md](./TEST_README.md).

### Test Structure

## Testing

This project includes a comprehensive test suite covering unit tests for all major components and logic.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage report
npm test:coverage
```

### Test Coverage

The test suite includes over 220 test cases covering:

- Schema validation (Yup schemas)
- Redux state management (slices and async thunks)
- React components (UI components and pages)
- TypeScript type definitions
- Edge cases and error conditions

For detailed testing documentation, see [TEST_README.md](./TEST_README.md).

### Test Structure

```
src/
├── schemas/__tests__/
├── state/
│   └── filterSlice/__tests__/
├── components/
│   ├── ui/__tests__/
│   └── filtersPage/__tests__/
├── app/
│   └── checkout/__tests__/
└── types/__tests__/
```

Each test file follows Jest and React Testing Library best practices with comprehensive coverage of happy paths, edge cases, and error conditions.
