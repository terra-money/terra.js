import { ContinuousVestingAccount } from './ContinuousVestingAccount';

describe('ContinuousVestingAccount', () => {
  it('deserializes correctly', () => {
    const acct = ContinuousVestingAccount.fromAmino({
      type: 'cosmos-sdk/ContinuousVestingAccount',
      value: {
        base_vesting_account: {
          base_account: {
            address: 'terra1ucp369yry6n70qq3zaxyt85cnug75r7ln8l6se',
            public_key: null,
            account_number: '0',
            sequence: '0',
          },
          original_vesting: [
            {
              denom: 'uluna',
              amount: '10000000000',
            },
          ],
          delegated_free: [],
          delegated_vesting: [],
          end_time: '1654000000',
        },
        start_time: '1652000000',
      },
    });

    expect(acct.toAmino()).toMatchObject({
      type: 'cosmos-sdk/ContinuousVestingAccount',
      value: {
        base_vesting_account: {
          base_account: {
            address: 'terra1ucp369yry6n70qq3zaxyt85cnug75r7ln8l6se',
            public_key: null,
            account_number: '0',
            sequence: '0',
          },
          original_vesting: [
            {
              denom: 'uluna',
              amount: '10000000000',
            },
          ],
          delegated_free: [],
          delegated_vesting: [],
          end_time: '1654000000',
        },
        start_time: '1652000000',
      },
    });

    expect(() => acct.toAmino(true)).toThrow(
      Error('Not supported for the network')
    );
  });
});
