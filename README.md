# vitest-iterator

Additional vitest matchers for iterators and generators.

## Installation

Pnpm:
`pnpm i -D vitest-iterator`

Yarn:
`yarn add -D vitest-iterator`

Npm:
`npm i -D vitest-iterator`

## Setup

Add to `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // ...
  test: {
    setupFiles: ['vitest-iterator'],
  },
});
```

## Usage

```typescript
function* exampleGenerator() {
  for (let i = 0; i < 3; i++) {
    yield i;
  }
}

test('name', () => {
  const iterator = exampleGenerator();
  expect(iterator).next.toBe(0);
  expect(iterator).next.toBe(1);
  expect(iterator).next.toBe(2);
  expect(iterator).next.toBeDone();
});
```

`.toBeDone()` can also be used on `IteratorResult` directly.

```typescript
function* exampleGenerator() {
  for (let i = 0; i < 3; i++) {
    yield i;
  }
}

test('name', () => {
  const iterator = exampleGenerator();
  const result = iterator.next();
  expect(result).toHaveProperty('value', 0);
  expect(result).not.toBeDone();
});
```
