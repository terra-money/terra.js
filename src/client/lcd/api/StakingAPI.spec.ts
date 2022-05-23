import { StakingAPI } from './StakingAPI';
import { Dec, Int } from '../../../core/numeric';
import { Coin } from '../../../core/Coin';
import {
  ValConsPublicKey,
  Delegation,
  // UnbondingDelegation,
  MsgDelegate,
  MsgUndelegate,
  // MsgBeginRedelegate,
} from '../../../core';
import { LocalTerra } from '../../../../src';

const terra = new LocalTerra();
const staking = new StakingAPI(terra);

const checkDelegations = (delegations: Delegation[]) => {
  expect(delegations).toContainEqual({
    delegator_address: expect.any(String),
    validator_address: expect.any(String),
    shares: expect.any(Dec),
    balance: expect.any(Coin),
  });
};

// const checkUnbondings = (unbondings: UnbondingDelegation[]) => {
//   expect(unbondings).toContainEqual({
//     delegator_address: expect.any(String),
//     validator_address: expect.any(String),
//     entries: expect.arrayContaining([
//       {
//         initial_balance: expect.any(Int),
//         balance: expect.any(Int),
//         creation_height: expect.any(Number),
//         completion_time: expect.any(Date),
//       },
//     ]),
//   });
// };

const delegator = terra.wallets.test1.key.accAddress;
const validator = terra.wallets.validator.key.valAddress;
const delegatorWallet = terra.wallets.test1;

async function stakingForTest() {
  const delegateMsg = new MsgDelegate(
    delegator,
    validator,
    new Coin('uluna', 100)
  );
  const unDelegateMsg = new MsgUndelegate(
    delegator,
    validator,
    new Coin('uluna', 10)
  );
  // ToDo : Add different validators
  //const reDelegateMsg = new MsgBeginRedelegate(delegator,validator1,validator2, new Coin("uluna",10))

  delegatorWallet
    .createAndSignTx({
      msgs: [delegateMsg],
      memo: 'staking',
    })
    .then(tx => {
      return terra.tx.broadcast(tx);
    });

  delegatorWallet
    .createAndSignTx({
      msgs: [unDelegateMsg],
      memo: 'staking',
    })
    .then(tx => {
      return terra.tx.broadcast(tx);
    });

  // delegatorWallet.createAndSignTx({
  //   msgs:[reDelegateMsg],
  //   memo: 'staking'
  // })
  // .then(tx =>{
  //   return terra.tx.broadcast(tx)
  // })
  // .then(result =>{
  //   console.log(`ReDelegate TX hash: ${result.txhash}  ${result.raw_log}`);
  // })
}

describe('StakingAPI', () => {
  // stakingForTest();
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
      .delegations(delegator, validator)
      .then(v => v[0]);

    checkDelegations(delegations);
  });

  it('delegations (delegator)', async () => {
    const delegations = await staking.delegations(delegator).then(v => v[0]);

    checkDelegations(delegations);
  });

  it('delegations (validator)', async () => {
    const delegations = await staking
      .delegations(
        undefined,
        validator // node0
      )
      .then(v => v[0]);

    checkDelegations(delegations);
  });

  it('delegations without parameter should throw an error', async () => {
    await expect(staking.delegations()).rejects.toThrowError();
  });

  // it('redelegations', async () => {
  //   const redelegations = await staking
  //     .redelegations(delegator) // manual faucet
  //     .then(v => v[0]);

  //   expect(redelegations).toContainEqual({
  //     delegator_address: expect.any(String),
  //     validator_src_address: expect.any(String),
  //     validator_dst_address: expect.any(String),
  //     entries: expect.arrayContaining([
  //       {
  //         initial_balance: expect.any(Int),
  //         balance: expect.any(Int),
  //         shares_dst: expect.any(Dec),
  //         creation_height: expect.any(Number),
  //         completion_time: expect.any(Date),
  //       },
  //     ]),
  //   });
  // });

  // it('unbondingDelegations (delegator & validator)', async () => {
  //   const unbondings = await staking
  //     .unbondingDelegations(
  //       delegator, // manual faucet
  //       validator // node0
  //     )
  //     .then(v => v[0]);

  //   checkUnbondings(unbondings);
  // });

  // it('unbondingDelegations (delegator)', async () => {
  //   const unbondings = await staking
  //     .unbondingDelegations(
  //       delegator,
  //       undefined
  //     )
  //     .then(v => v[0]);
  //   checkUnbondings(unbondings);
  // });

  // it('unbondingDelegations (validator)', async () => {
  //   const unbondings = await staking
  //     .unbondingDelegations(
  //       undefined,
  //       validator // node0
  //     )
  //     .then(v => v[0]);

  //   checkUnbondings(unbondings);
  // });

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
