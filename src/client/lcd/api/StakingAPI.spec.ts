import { APIRequester } from '../APIRequester';
import { StakingAPI } from './StakingAPI';
import { Dec, Int } from '../../../core/numeric';
import { Coin } from '../../../core/Coin';
import {
  ValConsPublicKey,
  Delegation,
  UnbondingDelegation,
} from '../../../core';

const c = new APIRequester('https://bombay-lcd.terra.dev/');
const staking = new StakingAPI(c);

const checkDelegations = (delegations: Delegation[]) => {
  expect(delegations).toContainEqual({
    delegator_address: expect.any(String),
    validator_address: expect.any(String),
    shares: expect.any(Dec),
    balance: expect.any(Coin),
  });
};

const checkUnbondings = (unbondings: UnbondingDelegation[]) => {
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
};

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

  it('delegations (delegator & validator)', async () => {
    const delegations = await staking
      .delegations(
        'terra1rk6tvacasnnyssfnn00zl7wz43pjnpn7vayqv6',
        'terravaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35'
      )
      .then(v => v[0]);

    checkDelegations(delegations);
  });

  it('delegations (delegator)', async () => {
    const delegations = await staking
      .delegations('terra1rk6tvacasnnyssfnn00zl7wz43pjnpn7vayqv6')
      .then(v => v[0]);

    checkDelegations(delegations);
  });

  it('delegations (validator)', async () => {
    const delegations = await staking
      .delegations(
        undefined,
        'terravaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35' // node0
      )
      .then(v => v[0]);

    checkDelegations(delegations);
  });

  it('delegations without parameter should throw an error', async () => {
    await expect(staking.delegations()).rejects.toThrowError();
  });

  it('redelegations', async () => {
    const redelegations = await staking
      .redelegations('terra1rk6tvacasnnyssfnn00zl7wz43pjnpn7vayqv6') // manual faucet
      .then(v => v[0]);

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
  });

  it('unbondingDelegations (delegator & validator)', async () => {
    const unbondings = await staking
      .unbondingDelegations(
        'terra1rk6tvacasnnyssfnn00zl7wz43pjnpn7vayqv6', // manual faucet
        'terravaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35' // node0
      )
      .then(v => v[0]);

    checkUnbondings(unbondings);
  });

  it('unbondingDelegations (delegator)', async () => {
    const unbondings = await staking
      .unbondingDelegations(
        'terra1rk6tvacasnnyssfnn00zl7wz43pjnpn7vayqv6',
        undefined
      )
      .then(v => v[0]);

    checkUnbondings(unbondings);
  });

  it('unbondingDelegations (validator)', async () => {
    const unbondings = await staking
      .unbondingDelegations(
        undefined,
        'terravaloper1vk20anceu6h9s00d27pjlvslz3avetkvnwmr35' // node0
      )
      .then(v => v[0]);

    checkUnbondings(unbondings);
  });

  it('unbondingDelegations without parameter should throw an error', async () => {
    await expect(staking.unbondingDelegations()).rejects.toThrowError();
  });

  it('validators', async () => {
    const validators = await staking.validators().then(v => v[0]);

    expect(validators).toContainEqual({
      operator_address: expect.any(String),
      consensus_pubkey: expect.any(ValConsPublicKey),
      jailed: expect.any(Boolean),
      status: expect.any(String),
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
