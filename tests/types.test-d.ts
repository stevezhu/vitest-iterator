import { Assertion, describe, expect, expectTypeOf, test } from 'vitest';

declare module 'vitest' {
  interface Assertion<T> {
    /**
     * Used to disambiguate types otherwise two diff assertion types such as `Assertion<number>`
     * and `Assertion<string>` will be considered the same for some reason.
     */
    _kind: T;
  }
}

describe('Vi.Assertion', () => {
  test('modifier return is typed properly', () => {
    const iterator = [1].values();

    expectTypeOf(expect(iterator).next).toEqualTypeOf<Assertion<number>>();
    expectTypeOf(expect(iterator).next).not.toEqualTypeOf<Assertion<string>>();
  });
});
