declare global {
  namespace Chai {
    interface Assertion {
      next: Assertion;
      yields: Assertion;

      toBeDone: (this: Assertion) => void;
    }
  }
}

export {};
