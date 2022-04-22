import {
  MsgSubmitProposal,
  LocalTerra,
  ParameterChangeProposal,
} from '../src';

// test1 key from localterra accounts
const terra = new LocalTerra();
const { test1 } = terra.wallets;

const proposal = new ParameterChangeProposal('testing params', 'yay!', [
  {
    subspace: 'distribution',
    key: 'communitytax',
    value: '"0.0"',
  },
  {
    subspace: 'distribution',
    key: 'baseproposerreward',
    value: '"0.01"',
  },
  {
    subspace: 'distribution',
    key: 'bonusproposerreward',
    value: '"0.04"',
  },
  {
    subspace: 'distribution',
    key: 'withdrawaddrenabled',
    value: 'true',
  },
  { subspace: 'staking', key: 'UnbondingTime', value: '"300000000000"' },
  { subspace: 'staking', key: 'MaxValidators', value: '130' },
  { subspace: 'staking', key: 'MaxEntries', value: '7' },
  { subspace: 'staking', key: 'HistoricalEntries', value: '10000' },
  { subspace: 'staking', key: 'BondDenom', value: '"uluna"' },
  { subspace: 'slashing', key: 'SignedBlocksWindow', value: '"10000"' },
  {
    subspace: 'slashing',
    key: 'MinSignedPerWindow',
    value: '"0.05"',
  },
  {
    subspace: 'slashing',
    key: 'DowntimeJailDuration',
    value: '"600000000000"',
  },
  {
    subspace: 'slashing',
    key: 'SlashFractionDoubleSign',
    value: '"0.05"',
  },
  {
    subspace: 'slashing',
    key: 'SlashFractionDowntime',
    value: '"0.0001"',
  },
  {
    subspace: 'treasury',
    key: 'TaxPolicy',
    value:
      '{"rate_min":"0.0","rate_max":"0.0","cap":{"denom":"usdr","amount":"0"},"change_rate_max":"0.0"}',
  },
  {
    subspace: 'treasury',
    key: 'RewardPolicy',
    value:
      '{"rate_min":"0.0","rate_max":"1.0","cap":{"denom":"unused","amount":"0"},"change_rate_max":"0.0"}',
  },
  {
    subspace: 'treasury',
    key: 'SeigniorageBurdenTarget',
    value: '"0.67"',
  },
  {
    subspace: 'treasury',
    key: 'MiningIncrement',
    value: '"1.07"',
  },
  { subspace: 'treasury', key: 'WindowShort', value: '"4"' },
  { subspace: 'treasury', key: 'WindowLong', value: '"52"' },
  { subspace: 'treasury', key: 'WindowProbation', value: '"12"' },
  { subspace: 'oracle', key: 'VotePeriod', value: '"5"' },
  {
    subspace: 'oracle',
    key: 'VoteThreshold',
    value: '"0.5"',
  },
  {
    subspace: 'oracle',
    key: 'RewardBand',
    value: '"0.12"',
  },
  {
    subspace: 'oracle',
    key: 'RewardDistributionWindow',
    value: '"9400000"',
  },
  {
    subspace: 'oracle',
    key: 'Whitelist',
    value:
      '[{"name":"ukrw","tobin_tax":"0.003500000000000000"},{"name":"usdr","tobin_tax":"0.003500000000000000"},{"name":"uusd","tobin_tax":"0.003500000000000000"},{"name":"umnt","tobin_tax":"0.020000000000000000"},{"name":"ueur","tobin_tax":"0.003500000000000000"},{"name":"ucny","tobin_tax":"0.003500000000000000"},{"name":"ujpy","tobin_tax":"0.003500000000000000"},{"name":"ugbp","tobin_tax":"0.003500000000000000"},{"name":"uinr","tobin_tax":"0.003500000000000000"},{"name":"ucad","tobin_tax":"0.003500000000000000"},{"name":"uchf","tobin_tax":"0.003500000000000000"},{"name":"uhkd","tobin_tax":"0.003500000000000000"},{"name":"usgd","tobin_tax":"0.003500000000000000"},{"name":"uaud","tobin_tax":"0.003500000000000000"},{"name":"uthb","tobin_tax":"0.007500000000000000"},{"name":"usek","tobin_tax":"0.003500000000000000"},{"name":"udkk","tobin_tax":"0.003500000000000000"},{"name":"unok","tobin_tax":"0.003500000000000000"},{"name":"uidr","tobin_tax":"0.007500000000000000"},{"name":"uphp","tobin_tax":"0.007500000000000000"},{"name":"umyr","tobin_tax":"0.003500000000000000"},{"name":"utwd","tobin_tax":"0.003500000000000000"}]',
  },
  {
    subspace: 'oracle',
    key: 'SlashFraction',
    value: '"0.0001"',
  },
  { subspace: 'oracle', key: 'SlashWindow', value: '"432000"' },
  {
    subspace: 'oracle',
    key: 'MinValidPerWindow',
    value: '"0.05"',
  },
  { subspace: 'market', key: 'PoolRecoveryPeriod', value: '"36"' },
  {
    subspace: 'market',
    key: 'BasePool',
    value: '"50000000000000.0"',
  },
  {
    subspace: 'market',
    key: 'MinStabilitySpread',
    value: '"0.005"',
  },
  {
    subspace: 'gov',
    key: 'depositparams',
    value:
      '{"min_deposit":[{"denom":"uluna","amount":"10000000"}],"max_deposit_period":"300000000000"}',
  },
  {
    subspace: 'gov',
    key: 'votingparams',
    value: '{"voting_period":"300000000000"}',
  },
  {
    subspace: 'gov',
    key: 'tallyparams',
    value:
      '{"quorum":"0.4","threshold":"0.5","veto_threshold":"0.334"}',
  },
  {
    subspace: 'mint',
    key: 'MintDenom',
    value: '"uluna"',
  },
  {
    subspace: 'mint',
    key: 'InflationRateChange',
    value: '"0.00"',
  },
  {
    subspace: 'mint',
    key: 'InflationMin',
    value: '"0.2"',
  },
  {
    subspace: 'mint',
    key: 'InflationMax',
    value: '"0.07"',
  },
  {
    subspace: 'mint',
    key: 'GoalBonded',
    value: '"0.67"',
  },
  {
    subspace: 'mint',
    key: 'BlocksPerYear',
    value: '"6311520"',
  },
  {
    subspace: 'wasm',
    key: 'MaxContractSize',
    value: '"614400"',
  },
  {
    subspace: 'wasm',
    key: 'MaxContractGas',
    value: '"20000000"',
  },
  {
    subspace: 'wasm',
    key: 'MaxContractMsgSize',
    value: '"4096"',
  },
]);

async function main(): Promise<void> {
  const submitProposal = new MsgSubmitProposal(
    proposal,
    {},
    test1.key.accAddress
  );

  const tx = await test1.createAndSignTx({
    msgs: [submitProposal],
  });

  const result = await terra.tx.broadcast(tx);
  console.log(result);
}

main().then(console.log);
