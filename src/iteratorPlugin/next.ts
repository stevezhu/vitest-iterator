import { iteratorChecker } from './IteratorSchema';

// Reference: https://github.com/vitest-dev/vitest/blob/v0.28.4/packages/expect/src/jest-expect.ts#L633
export function createNext(utils: Chai.ChaiUtils, fnName: string) {
  return function (this: Chai.AssertionStatic) {
    const obj: unknown = utils.flag(this, 'object');

    if (!iteratorChecker.Check(obj)) {
      throw new TypeError(
        `You must provide an Iterator to expect() when using .${fnName}, not '${typeof obj}'.`
      );
    }

    const iterator: Iterator<unknown> = obj;
    const result = iterator.next();
    utils.flag(this, 'object', result.value);
    utils.flag(this, 'iteratorResult', result);
    return this;
  };
}
