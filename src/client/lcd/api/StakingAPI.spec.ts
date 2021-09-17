import { APIRequester } from '../APIRequester';
import { StakingAPI } from './StakingAPI';
import { Dec, Int } from '../../../core/numeric';
import { Coin } from '../../../core/Coin';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const staking = new StakingAPI(c);

describe('StakingAPI', () => {
  it('parameters', async () => {
    await expect(staking.parameters()).resolves.toMatchObject({
      unbonding_time: expect.any(Number),
      max_validators: expect.any(Number),
      max_entries: expect.any(Number),
      historical_entries: expect.any(Number),
      bond_denom: expect.any(String),
    });
  });

  it('delegations (delegator)', async () => {
    await expect(
      staking.delegations('terra1940nsxkz62snd3azk3a9j79m4qd3qvwnrf2xvj')
    ).resolves.toContainEqual({
      delegator_address: expect.any(String),
      validator_address: expect.any(String),
      shares: expect.any(Dec),
      balance: expect.any(Coin),
    });
  });

  it('delegations (validator)', async () => {
    await expect(
      staking.delegations(
        undefined,
        'terravaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35'
      )
    ).resolves.toContainEqual({
      delegator_address: expect.any(String),
      validator_address: expect.any(String),
      shares: expect.any(Dec),
      balance: expect.any(Coin),
    });
  });

  it('redelegations', async () => {
    const redelegations = await staking.redelegations();

    if (redelegations.length > 0) {
      expect(redelegations).toContainEqual({
        delegator_address: expect.any(String),
        validator_src_address: expect.any(String),
        validator_dst_address: expect.any(String),
        entries: expect.arrayContaining([
          {
            initial_balance: expect.any(Int),
            balance: expect.any(Int),
            shares_dst: expect.any(Dec),
            creation_height: expect.any(Number),
            completion_time: expect.any(Date),
          },
        ]),
      });
    }
  });

  it('unbondingDelegations', async () => {
    const unbondings = await staking.unbondingDelegations(
      undefined,
      'terravaloper1krj7amhhagjnyg2tkkuh6l0550y733jnjnnlzy' // Terra.one node
    );

    if (unbondings.length > 0) {
      expect(unbondings).toContainEqual({
        delegator_address: expect.any(String),
        validator_address: expect.any(String),
        entries: expect.arrayContaining([
          {
            initial_balance: expect.any(Int),
            balance: expect.any(Int),
            creation_height: expect.any(Number),
            completion_time: expect.any(Date),
          },
        ]),
      });
    }
  });

  it('validators', async () => {
    await expect(staking.validators()).resolves.toContainEqual({
      operator_address: expect.any(String),
      consensus_pubkey: {
        type: expect.any(String),
        value: expect.any(String),
      },
      jailed: expect.any(Boolean),
      status: expect.any(Number),
      tokens: expect.any(Int),
      delegator_shares: expect.any(Dec),
      description: {
        moniker: expect.any(String),
        identity: expect.any(String),
        website: expect.any(String),
        details: expect.any(String),
        security_contact: expect.any(String),
      },
      unbonding_height: expect.any(Number),
      unbonding_time: expect.any(Date),
      commission: {
        commission_rates: {
          rate: expect.any(Dec),
          max_rate: expect.any(Dec),
          max_change_rate: expect.any(Dec),
        },
        update_time: expect.any(Date),
      },
      min_self_delegation: expect.any(Int),
    });
  });

  it('pool', async () => {
    await expect(staking.pool()).resolves.toMatchObject({
      bonded_tokens: expect.any(Coin),
      not_bonded_tokens: expect.any(Coin),
    });
  });
});
