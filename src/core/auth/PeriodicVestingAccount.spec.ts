import { PeriodicVestingAccount } from './PeriodicVestingAccount';

describe('PeriodicVestingAccount', () => {
  it('deserializes correctly', () => {
    const acct = PeriodicVestingAccount.fromAmino({
      type: 'cosmos-sdk/PeriodicVestingAccount',
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
          end_time: '1654000000',
        },
        start_time: '1653000000',
        vesting_periods: [
          {
            length: '500000',
            amount: [
              {
                denom: 'uluna',
                amount: '5000000000',
              },
            ],
          },
          {
            length: '500000',
            amount: [
              {
                denom: 'uluna',
                amount: '5000000000',
              },
            ],
          },
        ],
      },
    });

    expect(acct.toAmino()).toMatchObject({
      type: 'cosmos-sdk/PeriodicVestingAccount',
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
          end_time: '1654000000',
        },
        start_time: '1653000000',
        vesting_periods: [
          {
            length: '500000',
            amount: [
              {
                denom: 'uluna',
                amount: '5000000000',
              },
            ],
          },
          {
            length: '500000',
            amount: [
              {
                denom: 'uluna',
                amount: '5000000000',
              },
            ],
          },
        ],
      },
    });

    expect(() => acct.toAmino(true)).toThrow(
      Error('Not supported for the network')
    );
  });
});
