export type { Assertion } from 'vitest';

type IteratorValue<I> = I extends Iterator<infer T> ? T : never;

declare module 'vitest' {
  interface Assertion<T> {
    next: Assertion<IteratorValue<T>>;
    yields: Assertion<IteratorValue<T>>;

    toBeDone: (this: Assertion<T>) => void;
  }
}
