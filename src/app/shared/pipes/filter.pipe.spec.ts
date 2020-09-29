import { FilterPipe } from './filter.pipe';
import testData from '../data/transactions-test-data';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the data that contains the given search text', () => {
    const result = pipe.transform(testData, 'b');

    expect(result).toEqual([jasmine.objectContaining({
      merchant: 'Backbase',
      type: 'Salaries'
    })]);
  });

  it('should return entire data if the given search text is empty', () => {
    const result = pipe.transform(testData);

    expect(result).toEqual(testData);
  });

  it('should not filter on the properties those are being skipped', () => {
    const result = pipe.transform(testData, 'o', ['type']);

    expect(result.length).toBe(2);
  });

  it('should return an empty array if the search filed doesn\'t match with any data', () => {
    const result = pipe.transform(testData, 'Q');

    expect(result).toEqual([]);
  });
});
