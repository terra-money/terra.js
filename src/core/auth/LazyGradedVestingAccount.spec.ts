import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';
import { Coins } from '../Coins';
import { Dec } from '..';
const data = require('./LazyGradedVestingAccount.data.json');

describe('LazyGradedVestingAccount', () => {
  it('deserializes correctly', () => {
    const acct = LazyGradedVestingAccount.fromData({
      type: 'core/LazyGradedVestingAccount',
      value: {
        BaseVestingAccount: {
          BaseAccount: {
            address: 'terra1upg95nlwkfkrq4hhjrn3k9s6ud0aqx36gwnlsn',
            coins: [
              {
                denom: 'ukrw',
                amount: '21741046537',
              },
              {
                denom: 'uluna',
                amount: '58913630',
              },
              {
                denom: 'umnt',
                amount: '2837600699',
              },
              {
                denom: 'usdr',
                amount: '9532749',
              },
              {
                denom: 'uusd',
                amount: '5762512',
              },
            ],
            public_key: {
              type: 'tendermint/PubKeySecp256k1',
              value: 'A/38tukG3M+uMPIYKHgib8BG8kKnQKe5CISse0f9F75S',
            },
            account_number: '684082',
            sequence: '37',
          },
          original_vesting: [
            {
              denom: 'uluna',
              amount: '5000000000000',
            },
          ],
          delegated_free: [
            {
              denom: 'uluna',
              amount: '648778788070',
            },
          ],
          delegated_vesting: [
            {
              denom: 'uluna',
              amount: '4500000000000',
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
    expect(acct.delegated_free instanceof Coins).toBe(true);
  });

  it('deserializes according to examples', () => {
    data.forEach((ex: LazyGradedVestingAccount.Data) => {
      const acct = LazyGradedVestingAccount.fromData(ex);
      expect(acct.toData()).toMatchObject(ex);
    });
  });
});
