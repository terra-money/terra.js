import { DistributionParamChange, DistributionParamChanges } from '../distribution/params';
import { GovParamChange, GovParamChanges } from '../gov/params';
import { MarketParamChange, MarketParamChanges } from '../market/params';
import { OracleParamChange, OracleParamChanges } from '../oracle/params';
import { SlashingParamChange, SlashingParamChanges } from '../slashing/params';
import { StakingParamChange, StakingParamChanges } from '../staking/params';
import { TreasuryParamChange, TreasuryParamChanges } from '../treasury/params';
import { WasmParamChange, WasmParamChanges } from '../wasm/params';
import { MintParamChange, MintParamChanges } from '../mint/params';
/**
 * Example object:
 * ```ts
 * const changes: ParamChanges = {
 *    distribution: {
 *       communitytax: new Dec(0),
 *       baseproposerreward: new Dec(32),
 *       bonusproposerreward: new Dec(22),
 *       withdrawaddrenabled: true,
 *    },
 *    staking: {
 *      UnbondingTime: 33,
 *      MaxValidators: 9999,
 *      KeyMaxEntries: 2323,
 *      BondDenom: 'uluna',
 *    },
 *   slashing: {
 *      MaxEvidenceAge: 234234,
 *      SignedBlocksWindow: 1,
 *      MinSignedPerWindow: new Dec(1),
 *      DowntimeJailDuration: 1,
 *      SlashFractionDoubleSign: new Dec(100),
 *      SlashFractionDowntime: new Dec(213.123),
 *    },
 *    treasury: {
 *      taxpolicy: new PolicyConstraints(0, 100, new Coin('unused', 0), 3),
 *      rewardpolicy: new PolicyConstraints(
 *        0,
 *        1023423340,
 *        new Coin('unused', 0),
 *        3
 *      ),
 *      seigniorageburdentarget: new Dec('2342.234234'),
 *      miningincrement: new Dec(23423423423.234234234234982),
 *      windowshort: 50,
 *      windowlong: 2,
 *      windowprobation: 30,
 *    },
 *    oracle: {
 *      voteperiod: 345345,
 *      votethreshold: new Dec('2342.234333'),
 *      rewardband: new Dec('234343'),
 *      rewarddistributionwindow: 345345,
 *      whitelist: ['abc', 'bdc', 'ttt'],
 *      slashfraction: new Dec(23423.232343),
 *      slashwindow: 343311,
 *      minvalidperwindow: new Dec(2342.234234),
 *    },
 *    market: {
 *      poolrecoveryperiod: 234234234,
 *      basepool: new Dec(232323232),
 *      minspread: new Dec(343434),
 *      illiquidtobintaxlist: [{ denom: 'item', tax_rate: new Dec('12301') }],
 *    },
 *    gov: {
 *      depositparams: {
 *        min_deposit: new Coins({ ukrw: 5, uluna: 2 }),
 *        max_deposit_period: 30434,
 *      },
 *      votingparams: {
 *        voting_period: 434243234,
 *      },
 *      tallyparams: {
 *        quorum: new Dec(234234.2334),
 *        threshold: new Dec(23423.2323),
 *        veto: new Dec(1232.234),
 *      },
 *    },
 *    mint: {
 *      MintDenom: 'uluna',
 *      InflationRateChange: "0.000000000000000000",
 *      InflationMax: "0.200000000000000000",
 *      InflationMin: "0.070000000000000000",
 *      GoalBonded: "0.670000000000000000",
 *      BlocksPerYear: 6311520
 *    }
 *  }
 * ```
 */
export declare type ParamChanges = DistributionParamChanges & GovParamChanges & MarketParamChanges & OracleParamChanges & SlashingParamChanges & StakingParamChanges & TreasuryParamChanges & WasmParamChanges & MintParamChanges;
export declare namespace ParamChanges {
    const ConversionTable: {
        mint: {
            MintDenom: ((c: any) => any)[];
            InflationRateChange: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            InflationMax: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            InflationMin: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            GoalBonded: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            BlocksPerYear: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
        };
        wasm: {
            maxcontractsize: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            maxcontractgas: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            maxcontractmsgsize: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
        };
        treasury: {
            taxpolicy: (typeof import("..").PolicyConstraints.fromData | ((c: import("../../util/json").JSONSerializable<any>) => any))[];
            rewardpolicy: (typeof import("..").PolicyConstraints.fromData | ((c: import("../../util/json").JSONSerializable<any>) => any))[];
            seigniorageburdentarget: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            miningincrement: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            windowshort: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            windowlong: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            windowprobation: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
        };
        staking: {
            UnbondingTime: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            MaxValidators: ((string: string, radix?: number | undefined) => number)[];
            KeyMaxEntries: ((string: string, radix?: number | undefined) => number)[];
            BondDenom: ((c: any) => any)[];
        };
        slashing: {
            MaxEvidenceAge: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            SignedBlocksWindow: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            MinSignedPerWindow: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            DowntimeJailDuration: (((string: string, radix?: number | undefined) => number) | ((c: any) => string))[];
            SlashFractionDoubleSign: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            SlashFractionDowntime: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
        };
        oracle: {
            voteperiod: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            votethreshold: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            rewardband: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            rewarddistributionwindow: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            whitelist: (((c: import("../oracle/params").OracleWhitelist.Data) => import("../oracle/params").OracleWhitelist) | ((c: import("../oracle/params").OracleWhitelist) => import("../oracle/params").OracleWhitelist.Data))[];
            slashfraction: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            slashwindow: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            minvalidperwindow: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
        };
        market: {
            poolrecoveryperiod: (((string: string, radix?: number | undefined) => number) | ((c: number) => string))[];
            basepool: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            minstabilityspread: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
        };
        gov: {
            depositparams: (((c: import("../gov/params").DepositParams.Data) => import("../gov/params").DepositParams) | ((c: import("../gov/params").DepositParams) => import("../gov/params").DepositParams.Data))[];
            votingparams: (((c: import("../gov/params").VotingParams.Data) => import("../gov/params").VotingParams) | ((c: import("../gov/params").VotingParams) => import("../gov/params").VotingParams.Data))[];
            tallyparams: (((c: import("../gov/params").TallyParams.Data) => import("../gov/params").TallyParams) | ((c: import("../gov/params").TallyParams) => import("../gov/params").TallyParams.Data))[];
        };
        distribution: {
            communitytax: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            baseproposerreward: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            bonusproposerreward: (((c: import("decimal.js").default.Value) => import("..").Dec) | ((c: any) => string))[];
            withdrawaddrenabled: ((c: any) => any)[];
        };
    };
    function fromData(data: ParamChange.Data[]): ParamChanges;
    function toData(pc: ParamChanges): ParamChange.Data[];
}
export declare type ParamChange = DistributionParamChange | GovParamChange | MarketParamChange | OracleParamChange | SlashingParamChange | StakingParamChange | TreasuryParamChange | WasmParamChange | MintParamChange;
export declare namespace ParamChange {
    type Type<S extends string, K extends string, T> = {
        subspace: S;
        key: K;
        value: T;
    };
    type Data = DistributionParamChange.Data | GovParamChange.Data | MarketParamChange.Data | OracleParamChange.Data | SlashingParamChange.Data | StakingParamChange.Data | TreasuryParamChange.Data | WasmParamChange.Data | MintParamChange.Data;
    namespace Data {
        type Type<P extends ParamChange.Type<any, any, any>> = Pick<P, 'subspace' | 'key'> & {
            value: string;
        };
    }
}
