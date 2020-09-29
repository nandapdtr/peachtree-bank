import { SortByPipe } from './sort-by.pipe';
import testData from '../data/transactions-test-data';

describe('SortByPipe', () => {
  let pipe: SortByPipe;

  beforeEach(() => {
    pipe = new SortByPipe();
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not sort if column data type is not specified', () => {
    const result = pipe.transform(testData, 'asc', 'merchant');

    expect(result).toEqual(testData);
  });

  it('should not sort if column is not specified', () => {
    const result = pipe.transform(testData, 'asc', '', 'string');

    expect(result).toEqual(testData);
  });

  it('should not sort if direction is not specified', () => {
    const result = pipe.transform(testData, '', 'merchant', 'string');

    expect(result).toEqual(testData);
  });

  it('should sort the data in descending order of date', () => {
    const result = pipe.transform(testData, 'desc', 'date', 'date');

    expect(result[0].merchant).toBe('Amazon Online Store');
  });

  it('should sort the data in descending order of merchant', () => {
    const result = pipe.transform(testData, 'desc', 'merchant', 'string');

    expect(result[0].merchant).toBe('Backbase');
  });

  it('should sort the data in ascending order of amount', () => {
    const result = pipe.transform(testData, 'asc', 'amount', 'number');

    expect(result[0].merchant).toBe('Amazon Online Store');
  });
});
