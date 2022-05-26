import { DistributionAPI, Rewards } from './DistributionAPI';

import {
  Dec,
  MsgFundCommunityPool,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  Coin,
  Coins,
} from '../../../core';
import { LocalTerra } from '../../LocalTerra';

const terra = new LocalTerra();
const distribution = new DistributionAPI(terra);

const delegatorWallet = terra.wallets.test1;
const depositorWallet = terra.wallets.test2;
const withdrawerWallet = terra.wallets.test1;
const validatorWallet = terra.wallets.validator;

async function FundCommunityPool() {
  const msgFundCommunityPool = new MsgFundCommunityPool(
    depositorWallet.key.accAddress,
    new Coins([new Coin('uluna', 100)])
  );
  depositorWallet
    .createAndSignTx({
      msgs: [msgFundCommunityPool],
      memo: 'msgFundCommunityPool',
    })
    .then(tx => {
      return terra.tx.broadcast(tx);
    });
}

async function SetWithdrawAddress() {
  const msgSetWithdrawAddress = new MsgSetWithdrawAddress(
    delegatorWallet.key.accAddress,
    withdrawerWallet.key.accAddress
  );
  delegatorWallet
    .createAndSignTx({
      msgs: [msgSetWithdrawAddress],
      memo: 'msgSetWithdrawAddress',
    })
    .then(tx => {
      return terra.tx.broadcast(tx);
    });
}

async function WithdrawDelegatorReward() {
  const msgWithdrawDelegatorReward = new MsgWithdrawDelegatorReward(
    delegatorWallet.key.accAddress,
    validatorWallet.key.valAddress
  );

  delegatorWallet
    .createAndSignTx({
      msgs: [msgWithdrawDelegatorReward],
      memo: 'msgWithdrawDelegatorReward',
    })
    .then(tx => {
      return terra.tx.broadcast(tx);
    });
}

async function WithdrawValidatorCommission() {
  const msgWithdrawValidatorCommission = new MsgWithdrawValidatorCommission(
    validatorWallet.key.valAddress
  );
  validatorWallet
    .createAndSignTx({
      msgs: [msgWithdrawValidatorCommission],
      memo: 'msgWithdrawValidatorCommission',
    })
    .then(tx => {
      return terra.tx.broadcast(tx);
    });
}
function distributionForTest() {
  FundCommunityPool();
  SetWithdrawAddress();
  WithdrawDelegatorReward();
  WithdrawValidatorCommission();
}
// distributionForTest()
describe('DistributionAPI', () => {
  it('parameters', async () => {
    await expect(distribution.parameters()).resolves.toMatchObject({
      community_tax: expect.any(Dec),
      base_proposer_reward: expect.any(Dec),
      bonus_proposer_reward: expect.any(Dec),
      withdraw_addr_enabled: expect.any(Boolean),
    });
  });

  it('rewards', async () => {
    await expect(
      distribution.rewards(delegatorWallet.key.accAddress)
    ).resolves.toMatchObject({
      rewards: expect.anything(),
      total: expect.any(Coins),
    });
  });

  // it('validatorCommission', async ()=>{
  //   await expect(distribution.validatorCommission(validatorWallet.key.valAddress)).resolves.toEqual(expect.any(Coins))
  // })

  it('withdrawAddress', async () => {
    await expect(
      distribution.withdrawAddress(delegatorWallet.key.accAddress)
    ).resolves.toEqual(withdrawerWallet.key.accAddress);
  });

  it('communityPool', async () => {
    await expect(distribution.communityPool()).resolves.toEqual(
      expect.any(Coins)
    );
  });
});
