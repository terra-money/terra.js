import {
  MsgSubmitProposal,
  isTxError,
  LocalTerra,
  Dec,
  ParameterChangeProposal,
  Coin,
  Coins,
  PolicyConstraints,
  Msg,
  TxAPI,
  StdFee,
} from '../src';

// test1 key from localterra accounts
const terra = new LocalTerra();
const { test1 } = terra.wallets;

const proposal = new ParameterChangeProposal('testing params', 'yay!', {
  distribution: {
    communitytax: new Dec(0),
    baseproposerreward: new Dec(0.1),
    bonusproposerreward: new Dec(0.1),
    withdrawaddrenabled: true,
  },
  staking: {
    UnbondingTime: 33,
    MaxValidators: 9999,
    KeyMaxEntries: 2323,
    BondDenom: 'uluna',
  },
  slashing: {
    MaxEvidenceAge: 234234,
    SignedBlocksWindow: 1,
    MinSignedPerWindow: new Dec(1),
    DowntimeJailDuration: 1,
    SlashFractionDoubleSign: new Dec(100),
    SlashFractionDowntime: new Dec(213.123),
  },
  treasury: {
    taxpolicy: new PolicyConstraints(0, 100, new Coin('unused', 0), 3),
    rewardpolicy: new PolicyConstraints(
      0,
      1023423340,
      new Coin('unused', 0),
      3
    ),
    seigniorageburdentarget: new Dec('2342.234234'),
    miningincrement: new Dec(23423423423.234234234234982),
    windowshort: 50,
    windowlong: 2,
    windowprobation: 30,
  },
  oracle: {
    voteperiod: 345345,
    votethreshold: new Dec('2342.234333'),
    rewardband: new Dec('234343'),
    rewarddistributionwindow: 345345,
    slashfraction: new Dec(23423.232343),
    slashwindow: 343311,
    minvalidperwindow: new Dec(2342.234234),
  },
  market: {
    poolrecoveryperiod: 234234234,
    basepool: new Dec(232323232),
    minspread: new Dec(343434),
  },
  gov: {
    depositparams: {
      min_deposit: new Coins({ ukrw: 5, uluna: 2 }),
      max_deposit_period: 30434,
    },
    votingparams: {
      voting_period: 434243234,
    },
    tallyparams: {
      quorum: new Dec(234234.2334),
      threshold: new Dec(23423.2323),
      veto: new Dec(1232.234),
    },
  },
  mint: {
    InflationRateChange: new Dec(0.01),
    BlocksPerYear: 1000000,
    MintDenom: 'uluna',
    InflationMin: new Dec(0.01),
    InflationMax: new Dec(0.01),
    GoalBonded: new Dec(0.01),
  },
  wasm: {
    maxcontractgas: 1000000,
    maxcontractmsgsize: 1000000,
    maxcontractsize: 1000000,
  },
});

async function main(): Promise<void> {
  const submitProposal = new MsgSubmitProposal(
    proposal,
    {},
    test1.key.accAddress
  );

  const tx = await test1.createAndSignTx({
    msgs: [submitProposal],
    fee: new StdFee(1000000, { uluna: 1000000000 }),
  });

  const result = await terra.tx.broadcast(tx);
  console.log(result);
}

main().then(console.log);
