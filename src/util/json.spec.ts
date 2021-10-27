import { removeNull } from './json';

describe('removeNull', () => {
  const object = {
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
  };

  it('removes null values from object', () => {
    const newObject = removeNull(object);
    expect(newObject).toEqual({
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

  it('does not mutate object', () => {
    removeNull(object);
    expect(object).toEqual(object);
  });

  it('returns object or primative if not Object', () => {
    const string = 'string';
    const number = 1;
    const boolean = false;

    expect(removeNull(string)).toEqual(string);
    expect(removeNull(number)).toEqual(number);
    expect(removeNull(boolean)).toEqual(boolean);
  });
});
