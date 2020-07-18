import {
  DistributionParamChange,
  DistributionParamChanges,
} from '../distribution/params';
import { GovParamChange, GovParamChanges } from '../gov/params';
import { MarketParamChange, MarketParamChanges } from '../market/params';
import { OracleParamChange, OracleParamChanges } from '../oracle/params';
import { SlashingParamChange, SlashingParamChanges } from '../slashing/params';
import { StakingParamChange, StakingParamChanges } from '../staking/params';
import { TreasuryParamChange, TreasuryParamChanges } from '../treasury/params';
import { WasmParamChange, WasmParamChanges } from '../wasm/params';

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
 *  }
 * ```
 */
export type ParamChanges = DistributionParamChanges &
  GovParamChanges &
  MarketParamChanges &
  OracleParamChanges &
  SlashingParamChanges &
  StakingParamChanges &
  TreasuryParamChanges &
  WasmParamChanges;

export namespace ParamChanges {
  export const ConversionTable = {
    ...DistributionParamChanges.ConversionTable,
    ...GovParamChanges.ConversionTable,
    ...MarketParamChanges.ConversionTable,
    ...OracleParamChanges.ConversionTable,
    ...SlashingParamChanges.ConversionTable,
    ...StakingParamChanges.ConversionTable,
    ...TreasuryParamChanges.ConversionTable,
    ...WasmParamChanges.ConversionTable,
  };

  export function fromData(data: ParamChange.Data[]): ParamChanges {
    const result: ParamChanges = {};
    for (const pc of data) {
      if (result[pc.subspace] === undefined) {
        result[pc.subspace] = {};
      }
      // @ts-ignore
      const converter = ParamChanges.ConversionTable[pc.subspace][pc.key][0];
      // @ts-ignore
      result[pc.subspace][pc.key] = converter(JSON.parse(pc.value));
    }
    return result;
  }

  export function toData(pc: ParamChanges): ParamChange.Data[] {
    const result: Array<ParamChange.Data> = [];
    for (const subspace of Object.keys(pc)) {
      // @ts-ignore
      for (const key of Object.keys(pc[subspace])) {
        // @ts-ignore
        const serializer = ParamChanges.ConversionTable[subspace][key][1];
        result.push({
          // @ts-ignore
          subspace,
          // @ts-ignore
          key,
          // @ts-ignore
          value: JSON.stringify(serializer(pc[subspace][key])),
        });
      }
    }
    return result;
  }
}

export type ParamChange =
  | DistributionParamChange
  | GovParamChange
  | MarketParamChange
  | OracleParamChange
  | SlashingParamChange
  | StakingParamChange
  | TreasuryParamChange
  | WasmParamChange;

export namespace ParamChange {
  export type Type<S extends string, K extends string, T> = {
    subspace: S;
    key: K;
    value: T;
  };

  export type Data =
    | DistributionParamChange.Data
    | GovParamChange.Data
    | MarketParamChange.Data
    | OracleParamChange.Data
    | SlashingParamChange.Data
    | StakingParamChange.Data
    | TreasuryParamChange.Data
    | WasmParamChange.Data;

  export namespace Data {
    export type Type<P extends ParamChange.Type<any, any, any>> = Pick<
      P,
      'subspace' | 'key'
    > & { value: string };
  }
}
