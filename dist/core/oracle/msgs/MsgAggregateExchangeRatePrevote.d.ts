import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgAggregateExchangeRatePrevote as MsgAggregateExchangeRatePrevote_pb } from '@classic-terra/terra.proto/terra/oracle/v1beta1/tx';
/**
 * Aggregate analog of MsgExchangeRatePrevote
 */
export declare class MsgAggregateExchangeRatePrevote extends JSONSerializable<MsgAggregateExchangeRatePrevote.Amino, MsgAggregateExchangeRatePrevote.Data, MsgAggregateExchangeRatePrevote.Proto> {
    hash: string;
    feeder: AccAddress;
    validator: ValAddress;
    /**
     * @param hash vote hash
     * @param feeder validator's feeder account address
     * @param validator validator's operator address
     */
    constructor(hash: string, feeder: AccAddress, validator: ValAddress);
    static fromAmino(data: MsgAggregateExchangeRatePrevote.Amino, isClassic?: boolean): MsgAggregateExchangeRatePrevote;
    toAmino(isClassic?: boolean): MsgAggregateExchangeRatePrevote.Amino;
    static fromData(data: MsgAggregateExchangeRatePrevote.Data, isClassic?: boolean): MsgAggregateExchangeRatePrevote;
    toData(isClassic?: boolean): MsgAggregateExchangeRatePrevote.Data;
    static fromProto(proto: MsgAggregateExchangeRatePrevote.Proto, isClassic?: boolean): MsgAggregateExchangeRatePrevote;
    toProto(isClassic?: boolean): MsgAggregateExchangeRatePrevote.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgAggregateExchangeRatePrevote;
}
export declare namespace MsgAggregateExchangeRatePrevote {
    interface Amino {
        type: 'oracle/MsgAggregateExchangeRatePrevote';
        value: {
            hash: string;
            feeder: AccAddress;
            validator: ValAddress;
        };
    }
    interface Data {
        '@type': '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote';
        hash: string;
        feeder: AccAddress;
        validator: ValAddress;
    }
    type Proto = MsgAggregateExchangeRatePrevote_pb;
}
