import { iteratorResultChecker } from './IteratorSchema';

export function createToBeDone(utils: Chai.ChaiUtils, fnName: string) {
  const getIteratorResultObj = (
    context: object,
  ): IteratorResult<unknown> | undefined => {
    const iteratorResult: unknown = utils.flag(context, 'iteratorResult');
    if (iteratorResultChecker.Check(iteratorResult)) {
      return iteratorResult;
    }

    const obj: unknown = utils.flag(context, 'object');
    if (iteratorResultChecker.Check(obj)) {
      return obj;
    }
  };
  return function (this: Chai.AssertionStatic) {
    const iteratorResult = getIteratorResultObj(this);
    if (!iteratorResult) {
      throw new TypeError(
        `You must use .${fnName}() after .next, eg. expect().next.toBeDone()`,
      );
    }
    this.assert(
      iteratorResult.done,
      `expected iterator to be done`,
      `expected iterator to not be done`,
      iteratorResult,
      { ...iteratorResult, done: true },
    );
  };
}
