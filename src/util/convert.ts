import { VotingParams, TallyParams, DepositParams } from '../core/gov/params';
import { Coins } from '../core';
import { TaxRate } from '../core/market/params';
import { PolicyConstraints } from '../core/treasury/PolicyConstraints';
import { JSONSerializable } from './json';
import { Dec, Numeric } from '../core';

export namespace Convert {
  export const id = (c: any): any => c;
  export const toDec = (c: Numeric.Input): Dec => new Dec(c);
  export const toString = (c: any): string => c.toString();
  export const toFixed = (c: number): string => c.toFixed();
  export const toNumber = Number.parseInt;
  export const toTaxRateArray = (c: TaxRate.Data[]): TaxRate[] =>
    c.map(v => ({
      denom: v.denom,
      tax_rate: new Dec(v.tax_rate),
    }));
  export const toVotingParams = (c: VotingParams.Data): VotingParams => ({
    voting_period: Number.parseInt(c.voting_period),
  });
  export const toDepositParams = (c: DepositParams.Data): DepositParams => ({
    min_deposit: Coins.fromData(c.min_deposit),
    max_deposit_period: Number.parseInt(c.max_deposit_period),
  });
  export const toTallyParams = (c: TallyParams.Data): TallyParams => ({
    quorum: new Dec(c.quorum),
    threshold: new Dec(c.threshold),
    veto: new Dec(c.veto),
  });
  export const toPolicyConstraints = PolicyConstraints.fromData;
  export const toData = (c: JSONSerializable<any>): any => c.toData();
  export const serializeDepositParams = (
    c: DepositParams
  ): DepositParams.Data => ({
    min_deposit: c.min_deposit.toData(),
    max_deposit_period: c.max_deposit_period.toFixed(),
  });
  export const serializeVotingParams = (
    c: VotingParams
  ): VotingParams.Data => ({
    voting_period: c.voting_period.toFixed(),
  });
  export const serializeTallyParams = (c: TallyParams): TallyParams.Data => ({
    quorum: c.quorum.toString(),
    threshold: c.threshold.toString(),
    veto: c.veto.toString(),
  });
  export const serializeTaxRateArray = (c: TaxRate[]): TaxRate.Data[] =>
    c.map(v => ({
      denom: v.denom,
      tax_rate: v.tax_rate.toString(),
    }));
}
