import { iteratorResultChecker } from './IteratorSchema';

export function createToBeDone(utils: Chai.ChaiUtils, fnName: string) {
  function getIteratorResultObj(context: object) {
    const obj: unknown = utils.flag(context, 'object');
    if (iteratorResultChecker.Check(obj)) {
      return obj;
    }
  }
  return function (this: Chai.AssertionStatic) {
    const iteratorResult: IteratorResult<unknown> | undefined =
      utils.flag(this, 'iteratorResult') ?? getIteratorResultObj(this);
    if (!iteratorResult) {
      throw new TypeError(
        `You must use .${fnName}() after .next, eg. expect().next.toBeDone()`
      );
    }
    return this.assert(
      iteratorResult.done,
      `expected iterator to be done`,
      `expected iterator to not be done`,
      iteratorResult,
      { ...iteratorResult, done: true }
    );
  };
}
