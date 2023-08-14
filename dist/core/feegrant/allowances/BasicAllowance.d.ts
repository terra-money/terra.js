import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { BasicAllowance as BasicAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant';
/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export declare class BasicAllowance extends JSONSerializable<BasicAllowance.Amino, BasicAllowance.Data, BasicAllowance.Proto> {
    expiration?: Date | undefined;
    spend_limit?: Coins;
    /**
     * @param spend_limit spend_limit allowed to be spent as fee
     * @param expiration allowance's expiration
     */
    constructor(spend_limit?: Coins.Input, expiration?: Date | undefined);
    static fromAmino(data: BasicAllowance.Amino, _?: boolean): BasicAllowance;
    toAmino(isClassic?: boolean): BasicAllowance.Amino;
    static fromData(proto: BasicAllowance.Data, _?: boolean): BasicAllowance;
    toData(_?: boolean): BasicAllowance.Data;
    static fromProto(proto: BasicAllowance.Proto, _?: boolean): BasicAllowance;
    toProto(_?: boolean): BasicAllowance.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): BasicAllowance;
}
export declare namespace BasicAllowance {
    interface Amino {
        type: 'feegrant/BasicAllowance' | 'cosmos-sdk/BasicAllowance';
        value: {
            spend_limit?: Coins.Amino;
            expiration?: string;
        };
    }
    interface Data {
        '@type': '/cosmos.feegrant.v1beta1.BasicAllowance';
        spend_limit?: Coins.Data;
        expiration?: string;
    }
    type Proto = BasicAllowance_pb;
}
