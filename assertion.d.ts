type IteratorValue<I> = I extends Iterator<infer T> ? T : never;

declare namespace Vi {
  interface Assertion<T> {
    next: Assertion<IteratorValue<T>>;
    yields: Assertion<IteratorValue<T>>;

    toBeDone: (this: Assertion<T>) => void;
  }
}
