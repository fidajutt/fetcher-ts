# fetcher-ts

fetcher-ts is a TypeScript library for centralized fetch() with error handling, retries, timeouts, and type-safe API calls.

## Features

- Centralized fetch() with built-in error handling.
- Supports retries and configurable timeouts.
- Type-safe API calls for better developer experience.
- Lightweight and easy to integrate into any frontend project.

## Installation

```bash
npm install fetcher-ts
```

## Usage

```typescript
import { apiFetcher } from 'fetcher-ts';

const fetcher = apiFetcher({
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
});

fetcher.get('/endpoint').then(response => console.log(response));
```

## Testing

Run the tests using Jest:

```bash
npm test
```
