# vitest-iterator

Additional vitest matchers for iterators and generators.

[![Depfu](https://badges.depfu.com/badges/39fc9693c70ed3fc91425c14fce1cb64/overview.svg)](https://depfu.com/github/stevezhu/vitest-iterator?project_id=37835)

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

## TypeScript

Add a `.d.ts` file with the following triple-slash directive:

```typescript
/// <reference types="vitest-iterator/assertion" />
```

Alternatively, add a `types` entry in `compilerOptions`:

```json
{
  "compilerOptions": {
    "types": ["vitest-iterator/assertion"]
  }
}
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

## API

#### `.next`

Also under the alias: `.yields`.

Use the `.next` modifier to unwrap the value in the `IteratorResult` so that any other matcher can be chained. This can be called with generators as well since they implement the iterator protocol.

Calling `expect(iterator).next.toBe()` is equivalent to `expect(iterator.next().value).toBe()`.

```typescript
test('count to three', () => {
  const iterator = [0, 1, 2].values();
  expect(iterator).next.toBe(0);
  expect(iterator).next.toBe(1);
  expect(iterator).next.toBe(2);
});
```

Since this modifier calls `.next()` on the iterator, call `.next()` manually instead if you want to use the result for the same iteration in any other matchers.

```typescript
test('count to three', () => {
  const iterator = [0, 1, 2].values();
  const result = iterator.next();
  expect(result).toHaveProperty('value', 0);
  expect(result).not.toBeDone();
});
```

---

#### `.toBeDone()`

Use `.toBeDone()` to check whether an iterator is done.

```typescript
test('count is done', () => {
  const iterator = [0].values();
  expect(iterator).next.not.toBeDone(); // 0 is consumed here
  expect(iterator).next.toBeDone();
});
```

The `IteratorResult` can also be passed directly into the matcher.

```typescript
test('count is not done', () => {
  const iterator = [0].values();
  expect(iterator.next()).not.toBeDone();
});
```
