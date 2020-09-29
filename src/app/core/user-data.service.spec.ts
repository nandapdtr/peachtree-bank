import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import userAccountDetails from '../shared/data/user-account-details';
import { take } from 'rxjs/operators';
import { Account } from '../shared/model/account';


describe('UserDataService', () => {
  let userDataService: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService]
    });
    userDataService = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(userDataService).toBeTruthy();
  });

  it('#getUserAccountDetails should fetch user account details', (done: DoneFn) => {
    userDataService.getUserAccountDetails().subscribe((accountDetails: Account) => {
      expect(accountDetails).toEqual(userAccountDetails);
      done();
    });
  });

  it('#deductBalance should deduct balance from user account details', (done: DoneFn) => {
    userDataService.getUserAccountDetails()
      .pipe(take(1))
      .subscribe((accountDetails: Account) => {
        expect(accountDetails.balance).toEqual(10000);
      });

    userDataService.deductBalance(100);

    userDataService.getUserAccountDetails().subscribe((accountDetails: Account) => {
      expect(accountDetails.balance).toEqual(9900);
      done();
    });
  });
});
