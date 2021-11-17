import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';
import { Coins } from '../Coins';
import { Dec } from '../numeric';
const data = require('./LazyGradedVestingAccount.data.json');

describe('LazyGradedVestingAccount', () => {
  it('deserializes correctly', () => {
    const acct = LazyGradedVestingAccount.fromAmino({
      type: 'core/LazyGradedVestingAccount',
      value: {
        base_vesting_account: {
          base_account: {
            address: 'terra1upg95nlwkfkrq4hhjrn3k9s6ud0aqx36gwnlsn',
            public_key: null,
            account_number: '684082',
            sequence: '0',
          },
          original_vesting: [
            {
              denom: 'uluna',
              amount: '5000000000000',
            },
          ],
          delegated_free: [],
          delegated_vesting: [
            {
              denom: 'uluna',
              amount: '1338029091449',
            },
          ],
          end_time: '0',
        },
        vesting_schedules: [
          {
            denom: 'uluna',
            schedules: [
              {
                start_time: '1558677600',
                end_time: '1561356000',
                ratio: '0.100000000000000000',
              },
              {
                start_time: '1561356000',
                end_time: '1587708000',
                ratio: '0.270000000000000000',
              },
              {
                start_time: '1587708000',
                end_time: '1600927200',
                ratio: '0.480000000000000000',
              },
              {
                start_time: '1600927200',
                end_time: '1603519200',
                ratio: '0.150000000000000000',
              },
            ],
          },
        ],
      },
    });

    expect(acct.vesting_schedules[0].schedules[0]).toMatchObject({
      start_time: 1558677600,
      end_time: 1561356000,
      ratio: new Dec(0.1),
    });
    expect(acct.base_vesting_account.delegated_free instanceof Coins).toBe(
      true
    );
  });

  it('deserializes according to examples', () => {
    data.forEach((ex: LazyGradedVestingAccount.Amino) => {
      const acct = LazyGradedVestingAccount.fromAmino(ex);
      expect(acct.toAmino()).toMatchObject(ex);
    });
  });
});
