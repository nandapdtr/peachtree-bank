import { CreditDebitIndicatorPipe } from './credit-debit-indicator.pipe';

describe('CreditDebitIndicatorPipe', () => {
  let pipe: CreditDebitIndicatorPipe;

  beforeEach(() => {
    pipe = new CreditDebitIndicatorPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it(`should return '+'`, () => {
    const creditDebitIndicator = pipe.transform('CRDT');
    expect(creditDebitIndicator).toBe('+');
  });

  it(`should return '-'`, () => {
    const creditDebitIndicator = pipe.transform('DBIT');
    expect(creditDebitIndicator).toBe('-');
  });

  it('should return undefined', () => {
    const creditDebitIndicator = pipe.transform(undefined);
    expect(creditDebitIndicator).toBeUndefined();
  });
});
