import { VotingParams, TallyParams, DepositParams } from '../core/gov/params';
import { PolicyConstraints } from '../core/treasury/PolicyConstraints';
import { JSONSerializable } from './json';
import { Dec, Numeric } from '../core';
import { OracleWhitelist } from '../core/oracle/params';
export declare namespace Convert {
    const id: (c: any) => any;
    const toDec: (c: Numeric.Input) => Dec;
    const toString: (c: any) => string;
    const toFixed: (c: number) => string;
    const toNumber: (string: string, radix?: number | undefined) => number;
    const toOracleWhitelist: (c: OracleWhitelist.Data) => OracleWhitelist;
    const toVotingParams: (c: VotingParams.Data) => VotingParams;
    const toDepositParams: (c: DepositParams.Data) => DepositParams;
    const toTallyParams: (c: TallyParams.Data) => TallyParams;
    const toPolicyConstraints: typeof PolicyConstraints.fromData;
    const toData: (c: JSONSerializable<any>) => any;
    const serializeDepositParams: (c: DepositParams) => DepositParams.Data;
    const serializeVotingParams: (c: VotingParams) => VotingParams.Data;
    const serializeTallyParams: (c: TallyParams) => TallyParams.Data;
    const serializeOracleWhitelist: (c: OracleWhitelist) => OracleWhitelist.Data;
}
