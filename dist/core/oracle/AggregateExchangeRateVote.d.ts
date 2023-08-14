import { JSONSerializable } from '../../util/json';
import { ValAddress } from '../bech32';
import { Denom } from '../Denom';
import { ExchangeRateTuple as ExchangeRateTuple_pb, AggregateExchangeRateVote as AggregateExchangeRateVote_pb } from '@classic-terra/terra.proto/terra/oracle/v1beta1/oracle';
import { Numeric, Dec } from '../numeric';
/**
 * Stores information about data about Oracle aggregate vote fetched from the blockchain.
 */
export declare class AggregateExchangeRateVote extends JSONSerializable<AggregateExchangeRateVote.Amino, AggregateExchangeRateVote.Data, AggregateExchangeRateVote.Proto> {
    exchange_rate_tuples: ExchangeRateTuple[];
    voter: ValAddress;
    /**
     * @param exchange_rate_tuples exchange rates for LUNA
     * @param voter validator
     */
    constructor(exchange_rate_tuples: ExchangeRateTuple[], voter: ValAddress);
    static fromAmino(data: AggregateExchangeRateVote.Amino): AggregateExchangeRateVote;
    toAmino(): AggregateExchangeRateVote.Amino;
    static fromData(data: AggregateExchangeRateVote.Data): AggregateExchangeRateVote;
    toData(): AggregateExchangeRateVote.Data;
    static fromProto(data: AggregateExchangeRateVote.Proto): AggregateExchangeRateVote;
    toProto(): AggregateExchangeRateVote.Proto;
}
export declare namespace AggregateExchangeRateVote {
    interface Amino {
        exchange_rate_tuples: ExchangeRateTuple.Amino[];
        voter: ValAddress;
    }
    interface Data {
        exchange_rate_tuples: ExchangeRateTuple.Data[];
        voter: ValAddress;
    }
    type Proto = AggregateExchangeRateVote_pb;
}
export declare class ExchangeRateTuple extends JSONSerializable<ExchangeRateTuple.Amino, ExchangeRateTuple.Data, ExchangeRateTuple.Proto> {
    denom: Denom;
    exchange_rate: Dec;
    constructor(denom: Denom, exchange_rate: Numeric.Input);
    static fromAmino(data: ExchangeRateTuple.Amino): ExchangeRateTuple;
    toAmino(): ExchangeRateTuple.Amino;
    static fromData(data: ExchangeRateTuple.Data): ExchangeRateTuple;
    toData(): ExchangeRateTuple.Data;
    static fromProto(proto: ExchangeRateTuple.Proto): ExchangeRateTuple;
    toProto(): ExchangeRateTuple.Proto;
}
export declare namespace ExchangeRateTuple {
    interface Amino {
        denom: Denom;
        exchange_rate: string;
    }
    interface Data {
        denom: Denom;
        exchange_rate: string;
    }
    type Proto = ExchangeRateTuple_pb;
}
