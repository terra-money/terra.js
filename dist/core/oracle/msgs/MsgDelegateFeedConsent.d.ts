import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDelegateFeedConsent as MsgDelegateFeedConsent_pb } from '@classic-terra/terra.proto/terra/oracle/v1beta1/tx';
/**
 * A **feeeder** is an account which is responsible for signing transactions with Oracle vote
 * and prevote messages on behalf of the validator. The blockchain will reject
 * [[MsgExchangeRateVote]] and [[MsgExchangeRatePrevote]] messages in transactions
 * signed by an
 * account different than the registered feeder.
 *
 * The following message registers a validator's feeder address.
 */
export declare class MsgDelegateFeedConsent extends JSONSerializable<MsgDelegateFeedConsent.Amino, MsgDelegateFeedConsent.Data, MsgDelegateFeedConsent.Proto> {
    operator: ValAddress;
    delegate: AccAddress;
    /**
     * @param operator validator's operator address
     * @param delegate account address to set to feeder
     */
    constructor(operator: ValAddress, delegate: AccAddress);
    static fromAmino(data: MsgDelegateFeedConsent.Amino, isClassic?: boolean): MsgDelegateFeedConsent;
    toAmino(isClassic?: boolean): MsgDelegateFeedConsent.Amino;
    static fromData(data: MsgDelegateFeedConsent.Data, isClassic?: boolean): MsgDelegateFeedConsent;
    toData(isClassic?: boolean): MsgDelegateFeedConsent.Data;
    static fromProto(proto: MsgDelegateFeedConsent.Proto, isClassic?: boolean): MsgDelegateFeedConsent;
    toProto(isClassic?: boolean): MsgDelegateFeedConsent.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgDelegateFeedConsent;
}
export declare namespace MsgDelegateFeedConsent {
    interface Amino {
        type: 'oracle/MsgDelegateFeedConsent';
        value: {
            operator: ValAddress;
            delegate: AccAddress;
        };
    }
    interface Data {
        '@type': '/terra.oracle.v1beta1.MsgDelegateFeedConsent';
        operator: ValAddress;
        delegate: AccAddress;
    }
    type Proto = MsgDelegateFeedConsent_pb;
}
