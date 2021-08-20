import { removeNull } from './json';

describe('removeNull', () => {
  it('remove null ', () => {
    expect(
      removeNull({
        a: 'abc',
        b: {
          a: null,
          b: 123,
        },
        c: null,
        d: [123],
        e: {
          a: {
            a: null,
            b: 'abc',
          },
          b: 123,
        },
      })
    ).toEqual({
      a: 'abc',
      b: {
        b: 123,
      },
      d: [123],
      e: {
        a: {
          b: 'abc',
        },
        b: 123,
      },
    });
  });
});
