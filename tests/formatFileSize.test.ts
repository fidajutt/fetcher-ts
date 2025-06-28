import { describe, it, expect } from '@jest/globals';
import { objectDiff } from '../src';

describe('objectDiff', () => {
  it('returns added, removed, and changed keys', () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { b: 2, c: 4, d: 5 };

    const result = objectDiff(obj1, obj2);

    expect(result).toEqual({
      added: { d: 5 },
      removed: { a: 1 },
      changed: { c: { from: 3, to: 4 } },
    });
  });

  it('handles empty objects', () => {
    const obj1 = {};
    const obj2 = { a: 1 };

    const result = objectDiff(obj1, obj2);

    expect(result).toEqual({
      added: { a: 1 },
      removed: {},
      changed: {},
    });
  });

  it('handles identical objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };

    const result = objectDiff(obj1, obj2);

    expect(result).toEqual({
      added: {},
      removed: {},
      changed: {},
    });
  });
});