import { ParameterChangeProposal } from './ParameterChangeProposal';
import { Coin } from '../../Coin';
import { PolicyConstraints } from '../../treasury/PolicyConstraints';
import { Coins } from '../../Coins';
import { Dec } from '../../numeric';
/*
import { StdTx } from '../../StdTx';

const pcpJSON1: StdTx.Data = {
  type: 'core/StdTx',
  value: {
    msg: [
      {
        type: 'gov/MsgSubmitProposal',
        value: {
          content: {
            type: 'params/ParameterChangeProposal',
            value: {
              title: 'Proposal to decrease minspread of Luna to Terra swaps',
              description:
                'As the demand for Terra has recently increased, the amount of swapping Luna and Terra has increased. I think spreads should be reduced to stabilize supply of Terra and incinerate Luna. So, I propose to change minspread value of Luna to Terra swaps from 0.5% to 0.1%.',
              changes: [
                {
                  subspace: 'market',
                  key: 'minstabilityspread',
                  value: '"0.001"',
                },
              ],
            },
          },
          initial_deposit: [],
          proposer: 'terra1e5ncelsh4qhqt3s97vn43hxlhmt7zd43yszdnf',
        },
      },
    ],
    fee: {
      amount: [
        {
          denom: 'umnt',
          amount: '703654',
        },
      ],
      gas: '163024',
    },
    signatures: [
      {
        pub_key: {
          type: 'tendermint/PubKeySecp256k1',
          value: 'A4j7d14sTqP+bnIYUDeOssgXHJcaFSIaDI7yR2j5LGLV',
        },
        signature:
          'X8OuDoWfTcQeF3XNqTGPDAwWj4YggOM3eeD/tGTyA8h850F5XTwCj7SgY2RrYGz6xVop1Z5Q32Ur5I8AmwGPlw==',
      },
    ],
    memo: '',
  },
};
*/
const pcpJSON2: ParameterChangeProposal.Data = {
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
        key: 'TaxPolicy',
        value:
          '{"rate_min":"0.000000000000000000","rate_max":"100.000000000000000000","cap":{"denom":"unused","amount":"0"},"change_rate_max":"3.000000000000000000"}',
      },
      {
        subspace: 'treasury',
        key: 'RewardPolicy',
        value:
          '{"rate_min":"0.000000000000000000","rate_max":"1023423340.000000000000000000","cap":{"denom":"unused","amount":"0"},"change_rate_max":"3.000000000000000000"}',
      },
      {
        subspace: 'treasury',
        key: 'SeigniorageBurdenTarget',
        value: '"2342.234234000000000000"',
      },
      {
        subspace: 'treasury',
        key: 'MiningIncrement',
        value: '"23423423423.234234000000000000"',
      },
      { subspace: 'treasury', key: 'WindowShort', value: '"50"' },
      { subspace: 'treasury', key: 'WindowLong', value: '"2"' },
      { subspace: 'treasury', key: 'WindowProbation', value: '"30"' },
      { subspace: 'oracle', key: 'VotePeriod', value: '"345345"' },
      {
        subspace: 'oracle',
        key: 'VoteThreshold',
        value: '"2342.234333000000000000"',
      },
      {
        subspace: 'oracle',
        key: 'RewardBand',
        value: '"234343.000000000000000000"',
      },
      {
        subspace: 'oracle',
        key: 'RewardDistributionWindow',
        value: '"345345"',
      },
      {
        subspace: 'oracle',
        key: 'Whitelist',
        value: '[{"name":"ukrw","tobin_tax":"0.003500000000000000"}]',
      },
      {
        subspace: 'oracle',
        key: 'SlashFraction',
        value: '"23423.232343000000000000"',
      },
      { subspace: 'oracle', key: 'SlashWindow', value: '"343311"' },
      {
        subspace: 'oracle',
        key: 'MinValidPerWindow',
        value: '"2342.234234000000000000"',
      },
      { subspace: 'market', key: 'PoolRecoveryPeriod', value: '"234234234"' },
      {
        subspace: 'market',
        key: 'BasePool',
        value: '"232323232.000000000000000000"',
      },
      {
        subspace: 'market',
        key: 'MinStabilitySpread',
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
          '{"quorum":"234234.233400000000000000","threshold":"23423.232300000000000000","veto_threshold":"1232.234000000000000000"}',
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
        key: 'MaxContractGas',
        value: '"1000000"',
      },
      {
        subspace: 'wasm',
        key: 'MaxContractMsgSize',
        value: '"1000000"',
      },
      {
        subspace: 'wasm',
        key: 'MaxContractSize',
        value: '"1000000"',
      },
    ],
  },
};

describe('ParameterChangeProposal', () => {
  it('parses StdTx parameter change proposals', () => {
    ParameterChangeProposal.fromData(pcpJSON2);
  });

  it('parses parameter change proposals', () => {
    ParameterChangeProposal.fromData(pcpJSON2);
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
        TaxPolicy: new PolicyConstraints(0, 100, new Coin('unused', 0), 3),
        RewardPolicy: new PolicyConstraints(
          0,
          1023423340,
          new Coin('unused', 0),
          3
        ),
        SeigniorageBurdenTarget: new Dec('2342.234234'),
        MiningIncrement: new Dec(23423423423.234234234234982),
        WindowShort: 50,
        WindowLong: 2,
        WindowProbation: 30,
      },
      oracle: {
        VotePeriod: 345345,
        VoteThreshold: new Dec('2342.234333'),
        RewardBand: new Dec('234343'),
        RewardDistributionWindow: 345345,
        Whitelist: [
          { name: 'ukrw', tobin_tax: new Dec('0.003500000000000000') },
        ],
        SlashFraction: new Dec(23423.232343),
        SlashWindow: 343311,
        MinValidPerWindow: new Dec(2342.234234),
      },
      market: {
        PoolRecoveryPeriod: 234234234,
        BasePool: new Dec(232323232),
        MinStabilitySpread: new Dec(343434),
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
          veto_threshold: new Dec(1232.234),
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
        MaxContractGas: 1000000,
        MaxContractMsgSize: 1000000,
        MaxContractSize: 1000000,
      },
    });

    expect(ParameterChangeProposal.fromData(p.toData())).toEqual(p); // check that serialization / deserialization is consistent
    // check that output is consistent with Jigu's
    expect(p.toData()).toMatchObject(jiguJSON);
  });
});
