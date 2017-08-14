import Helper from './../app/helpers';

describe('Helpers', () => {
  it('.qty', () => {
    expect(Helper.qty(1.00)).toBe('1');
    expect(Helper.qty(2.00)).toBe('2');
    expect(Helper.qty(1)).toBe('1');
    expect(Helper.qty(10)).toBe('10');
    expect(Helper.qty(100)).toBe('100');
    expect(Helper.qty(1000)).toBe('1,000');
    expect(Helper.qty(100000)).toBe('100,000');
    expect(Helper.qty(100000.00)).toBe('100,000');
  });

  it('.shortNum', () => {
    expect(Helper.shortNum(1)).toBe('1');
    expect(Helper.shortNum(10)).toBe('10');
    expect(Helper.shortNum(100)).toBe('100');
    expect(Helper.shortNum(1000)).toBe('1k');
    expect(Helper.shortNum(10000)).toBe('10k');
    expect(Helper.shortNum(100000)).toBe('100k');
    expect(Helper.shortNum(100500)).toBe('100.5k');
    expect(Helper.shortNum(9522045)).toBe('9.52m');
  });
  it('.price', () => {
    expect(Helper.price(1)).toBe('1.00');
    expect(Helper.price(100.56)).toBe('100.56');
    expect(Helper.price(101)).toBe('101.00');
  });

  it('.const', () => {
    expect(Helper.const.debounceScrollTimeout).toBeGreaterThan(100);
    expect(Helper.const.debounceTimeout).toBeGreaterThan(100);
  });
  it('.AutocompleteMinCharacters', () => {
    expect(Helper.AutocompleteMinCharacters('dsds9')).toEqual(true);
  });
  it('.toHHMMSS', () => {
    expect(Helper.toHHMMSS('301')).toBe('00:05:01');
  });

  it('key keys to array', () => {
    let arr = [
      {
        id: 1,
        children: [
          {
            item_id: 36
          },
          {
            item_id: 34
          }
        ]
      },
      {
        id: 2,
        children: [
          {
            item_id: 34
          },
          {
            item_id: 35
          }
        ]
      },
      {
        id: 2,
        children: [
          {
            item_id: 34
          }
        ]
      }
    ];

    expect(Helper.getKeys(arr, 'children', 'item_id')).toEqual([34, 35, 36]);
  });
});
