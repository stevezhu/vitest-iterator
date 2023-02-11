import { describe, expect, test } from 'vitest';

declare global {
  namespace Vi {
    interface Assertion<T> {
      /**
       * Used to disambiguate types otherwise two diff assertion types such as
       * `Vi.Assertion<number>` and `Vi.Assertion<string>` will be considered the same for some
       * reason.
       */
      _kind: T;
    }
  }
}

function testType<T>(val: T) {
  return val;
}

describe('Vi.Assertion', () => {
  test('modifier return is typed properly', () => {
    const iterator = [1].values();

    testType<Vi.Assertion<number>>(expect(iterator).next);

    // @ts-expect-error Should be Vi.Assertion<number>
    testType<Vi.Assertion<string>>(expect(iterator).next);
  });
});
