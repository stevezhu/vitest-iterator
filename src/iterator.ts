import chai from 'chai';

import { IteratorChecker, IteratorResultChecker } from './IteratorChecker';

function createNextLanguageChain(utils: Chai.ChaiUtils, fnName: string) {
  return function (this: Chai.AssertionStatic) {
    const obj: unknown = utils.flag(this, 'object');

    if (!IteratorChecker.Check(obj)) {
      throw new TypeError(
        `You must provide an Iterator to expect() when using .${fnName}, not '${typeof obj}'.`
      );
    }

    const result = obj.next();
    utils.flag(this, 'object', result.value);
    utils.flag(this, 'iteratorResult', result);
    return this;
  };
}

function createToBeDoneMatcher(utils: Chai.ChaiUtils, fnName: string) {
  function getIteratorResultObj(context: object) {
    const obj: unknown = utils.flag(context, 'object');
    if (IteratorResultChecker.Check(obj)) {
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

// Reference: https://github.com/vitest-dev/vitest/blob/v0.28.4/packages/expect/src/jest-expect.ts#L633
chai.use((chai, utils) => {
  utils.addProperty(
    chai.Assertion.prototype,
    'next',
    createNextLanguageChain(utils, 'next')
  );
  utils.addProperty(
    chai.Assertion.prototype,
    'yields',
    createNextLanguageChain(utils, 'yields')
  );

  utils.addMethod(
    chai.Assertion.prototype,
    'toBeDone',
    createToBeDoneMatcher(utils, 'toBeDone')
  );
});
