import { CurrencyCodePipe } from './currency-code.pipe';

describe('CurrencyCodePipe', () => {
  let pipe: CurrencyCodePipe;

  beforeEach(() => {
    pipe = new CurrencyCodePipe();
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`should return '€'`, () => {
    const currencyCode = pipe.transform('EUR');
    expect(currencyCode).toBe('€');
  });
});
