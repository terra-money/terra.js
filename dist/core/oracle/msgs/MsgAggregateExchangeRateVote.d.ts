import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { MsgAggregateExchangeRatePrevote } from './MsgAggregateExchangeRatePrevote';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgAggregateExchangeRateVote as MsgAggregateExchangeRateVote_pb } from '@classic-terra/terra.proto/terra/oracle/v1beta1/tx';
/**
 * Calculates the aggregate vote hash
 * @param exchangeRates exchange rates
 * @param salt salt
 * @param validator validator operator address
 */
export declare function aggregateVoteHash(exchangeRates: Coins, salt: string, validator: ValAddress): string;
/**
 * Aggregate analog of MsgExchangeRateVote: submits an oracle vote for multiple denominations
 * through a single message rather than multiple messages.
 */
export declare class MsgAggregateExchangeRateVote extends JSONSerializable<MsgAggregateExchangeRateVote.Amino, MsgAggregateExchangeRateVote.Data, MsgAggregateExchangeRateVote.Proto> {
    salt: string;
    feeder: AccAddress;
    validator: ValAddress;
    exchange_rates: Coins;
    /**
     * @param exchange_rate exchange rates
     * @param salt salt
     * @param feeder feeder address
     * @param validator validator operator address
     */
    constructor(exchange_rates: Coins.Input, salt: string, feeder: AccAddress, validator: ValAddress);
    static fromAmino(data: MsgAggregateExchangeRateVote.Amino, isClassic?: boolean): MsgAggregateExchangeRateVote;
    toAmino(isClassic?: boolean): MsgAggregateExchangeRateVote.Amino;
    static fromData(proto: MsgAggregateExchangeRateVote.Data, isClassic?: boolean): MsgAggregateExchangeRateVote;
    toData(isClassic?: boolean): MsgAggregateExchangeRateVote.Data;
    static fromProto(proto: MsgAggregateExchangeRateVote.Proto, isClassic?: boolean): MsgAggregateExchangeRateVote;
    toProto(isClassic?: boolean): MsgAggregateExchangeRateVote.Proto;
    /**
     * Gets the aggregate vote hash for the MsgAggregateExchangeRateVote, for the creation of
     *  the corresponding prevote message.
     */
    getAggregateVoteHash(): string;
    /**
     * You can generate the corresponding aggregate prevote message.
     * This will return a [[MsgAggregateExchangeRatePrevote]] with the proper vote hash and values,
     * determined by the current attributes of the object.
     *
     * @returns the corresponding prevote message to send
     */
    getPrevote(): MsgAggregateExchangeRatePrevote;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgAggregateExchangeRateVote;
}
export declare namespace MsgAggregateExchangeRateVote {
    interface Amino {
        type: 'oracle/MsgAggregateExchangeRateVote';
        value: {
            exchange_rates: string;
            salt: string;
            feeder: AccAddress;
            validator: ValAddress;
        };
    }
    interface Data {
        '@type': '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote';
        exchange_rates: string;
        salt: string;
        feeder: AccAddress;
        validator: ValAddress;
    }
    type Proto = MsgAggregateExchangeRateVote_pb;
}
