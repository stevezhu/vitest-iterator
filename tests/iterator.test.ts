import { describe, expect, test } from 'vitest';

describe.each(['next', 'yields'] as const)('.%s', (name) => {
  test('returns .next().value in chain', () => {
    const iter = [0, 1, 2].values();
    expect(iter)[name].toBe(0);
    expect(iter)[name].toBe(1);
    expect(iter)[name].toBe(2);
    expect(iter)[name].toBeUndefined();
  });

  test('returns values for generator', () => {
    function* testGenerator() {
      for (let i = 0; i < 3; i++) {
        yield i;
      }
    }

    const iter = testGenerator();
    expect(iter)[name].toBe(0);
    expect(iter)[name].toBe(1);
    expect(iter)[name].toBe(2);
    expect(iter)[name].toBeUndefined();
  });

  test('throws error if input is not Iterator', () => {
    expect(() => {
      expect(1).next;
    }).toThrowError();
  });
});

describe('.toBeDone()', () => {
  test('asserts done', () => {
    const iter = [0, 1, 2].values();
    expect(iter).next.toBe(0);
    expect(iter).next.toBe(1);
    expect(iter).next.toBe(2);

    expect(iter).next.toBeDone();
  });

  test('asserts done for generator', () => {
    function* testGenerator() {
      yield 0;
    }

    const iter = testGenerator();
    expect(iter).next.not.toBeDone();
    expect(iter).next.toBeDone();
  });

  test('asserts not done', () => {
    const iter = [0, 1, 2].values();
    expect(iter).next.toBe(0);
    expect(iter).next.toBe(1);

    expect(iter).next.not.toBeDone();
    expect(iter).next.toBeUndefined(); // the previous next call consumes the iteration value
  });

  test('allows IteratorResult in expect()', () => {
    const iter = [0, 1, 2].values();
    const result = iter.next();
    expect(result).toHaveProperty('value', 0);
    expect(result).not.toBeDone();

    expect(iter).next.toBe(1);
    expect(iter).next.toBe(2);
    expect(iter.next()).toBeDone();
  });

  test('throws error if input is not IteratorResult', () => {
    expect(() => {
      expect(1).toBeDone();
    }).toThrowError();
  });
});
