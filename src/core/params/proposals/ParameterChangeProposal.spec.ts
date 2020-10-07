import { ParameterChangeProposal } from './ParameterChangeProposal';
import { Coin } from '../../Coin';
import { PolicyConstraints } from '../../treasury/PolicyConstraints';
import { Coins } from '../../Coins';
import { Dec } from '../../numeric';

const pcpJSON: ParameterChangeProposal.Data = {
  type: 'params/ParameterChangeProposal',
  value: {
    title: 'testing params',
    description: 'yay!',
    changes: [
      {
        subspace: 'distribution',
        key: 'communitytax',
        value: '"123"',
      },
      {
        subspace: 'mint',
        key: 'InflationMax',
        value: '"0.001"',
      },
    ],
  },
};

const jiguJSON = {
  type: 'params/ParameterChangeProposal',
  value: {
    title: 'testing params',
    description: 'yay!',
    changes: [
      {
        subspace: 'distribution',
        key: 'communitytax',
        value: '"0.000000000000000000"',
      },
      {
        subspace: 'distribution',
        key: 'baseproposerreward',
        value: '"32.000000000000000000"',
      },
      {
        subspace: 'distribution',
        key: 'bonusproposerreward',
        value: '"22.000000000000000000"',
      },
      { subspace: 'distribution', key: 'withdrawaddrenabled', value: 'true' },
      { subspace: 'staking', key: 'UnbondingTime', value: '"33"' },
      { subspace: 'staking', key: 'MaxValidators', value: '9999' },
      { subspace: 'staking', key: 'KeyMaxEntries', value: '2323' },
      { subspace: 'staking', key: 'BondDenom', value: '"uluna"' },
      { subspace: 'slashing', key: 'MaxEvidenceAge', value: '"234234"' },
      { subspace: 'slashing', key: 'SignedBlocksWindow', value: '"1"' },
      {
        subspace: 'slashing',
        key: 'MinSignedPerWindow',
        value: '"1.000000000000000000"',
      },
      { subspace: 'slashing', key: 'DowntimeJailDuration', value: '"1"' },
      {
        subspace: 'slashing',
        key: 'SlashFractionDoubleSign',
        value: '"100.000000000000000000"',
      },
      {
        subspace: 'slashing',
        key: 'SlashFractionDowntime',
        value: '"213.123000000000000000"',
      },
      {
        subspace: 'treasury',
        key: 'taxpolicy',
        value:
          '{"rate_min":"0.000000000000000000","rate_max":"100.000000000000000000","cap":{"denom":"unused","amount":"0"},"change_max":"3.000000000000000000"}',
      },
      {
        subspace: 'treasury',
        key: 'rewardpolicy',
        value:
          '{"rate_min":"0.000000000000000000","rate_max":"1023423340.000000000000000000","cap":{"denom":"unused","amount":"0"},"change_max":"3.000000000000000000"}',
      },
      {
        subspace: 'treasury',
        key: 'seigniorageburdentarget',
        value: '"2342.234234000000000000"',
      },
      {
        subspace: 'treasury',
        key: 'miningincrement',
        value: '"23423423423.234234000000000000"',
      },
      { subspace: 'treasury', key: 'windowshort', value: '"50"' },
      { subspace: 'treasury', key: 'windowlong', value: '"2"' },
      { subspace: 'treasury', key: 'windowprobation', value: '"30"' },
      { subspace: 'oracle', key: 'voteperiod', value: '"345345"' },
      {
        subspace: 'oracle',
        key: 'votethreshold',
        value: '"2342.234333000000000000"',
      },
      {
        subspace: 'oracle',
        key: 'rewardband',
        value: '"234343.000000000000000000"',
      },
      {
        subspace: 'oracle',
        key: 'rewarddistributionwindow',
        value: '"345345"',
      },
      {
        subspace: 'oracle',
        key: 'whitelist',
        value: '[{"name":"ukrw","tobin_tax":"0.003500000000000000"}]',
      },
      {
        subspace: 'oracle',
        key: 'slashfraction',
        value: '"23423.232343000000000000"',
      },
      { subspace: 'oracle', key: 'slashwindow', value: '"343311"' },
      {
        subspace: 'oracle',
        key: 'minvalidperwindow',
        value: '"2342.234234000000000000"',
      },
      { subspace: 'market', key: 'poolrecoveryperiod', value: '"234234234"' },
      {
        subspace: 'market',
        key: 'basepool',
        value: '"232323232.000000000000000000"',
      },
      {
        subspace: 'market',
        key: 'minspread',
        value: '"343434.000000000000000000"',
      },
      {
        subspace: 'gov',
        key: 'depositparams',
        value:
          '{"min_deposit":[{"denom":"ukrw","amount":"5"},{"denom":"uluna","amount":"2"}],"max_deposit_period":"30434"}',
      },
      {
        subspace: 'gov',
        key: 'votingparams',
        value: '{"voting_period":"434243234"}',
      },
      {
        subspace: 'gov',
        key: 'tallyparams',
        value:
          '{"quorum":"234234.233400000000000000","threshold":"23423.232300000000000000","veto":"1232.234000000000000000"}',
      },
      {
        subspace: 'mint',
        key: 'InflationRateChange',
        value: '"0.010000000000000000"',
      },
      {
        subspace: 'mint',
        key: 'BlocksPerYear',
        value: '"1000000"',
      },
      {
        subspace: 'mint',
        key: 'MintDenom',
        value: '"uluna"',
      },
      {
        subspace: 'mint',
        key: 'InflationMin',
        value: '"0.010000000000000000"',
      },
      {
        subspace: 'mint',
        key: 'InflationMax',
        value: '"0.010000000000000000"',
      },
      {
        subspace: 'mint',
        key: 'GoalBonded',
        value: '"0.010000000000000000"',
      },
      {
        subspace: 'wasm',
        key: 'maxcontractgas',
        value: '"1000000"',
      },
      {
        subspace: 'wasm',
        key: 'maxcontractmsgsize',
        value: '"1000000"',
      },
      {
        subspace: 'wasm',
        key: 'maxcontractsize',
        value: '"1000000"',
      },
    ],
  },
};

describe('ParamaterChangeProposal', () => {
  it('parses parameter change proposals', () => {
    ParameterChangeProposal.fromData(pcpJSON);
    const p = new ParameterChangeProposal('testing params', 'yay!', {
      distribution: {
        communitytax: new Dec(0),
        baseproposerreward: new Dec(32),
        bonusproposerreward: new Dec(22),
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
        whitelist: [
          { name: 'ukrw', tobin_tax: new Dec('0.003500000000000000') },
        ],
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

    expect(ParameterChangeProposal.fromData(p.toData())).toEqual(p); // check that serialization / deserialization is consistent
    // check that output is consistent with Jigu's
    expect(p.toData()).toMatchObject(jiguJSON);
  });
});
