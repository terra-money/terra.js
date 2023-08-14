import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgFundCommunityPool as MsgFundCommunityPool_pb } from '@terra-money/terra.proto/cosmos/distribution/v1beta1/tx';
export declare class MsgFundCommunityPool extends JSONSerializable<MsgFundCommunityPool.Amino, MsgFundCommunityPool.Data, MsgFundCommunityPool.Proto> {
    depositor: AccAddress;
    amount: Coins;
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    constructor(depositor: AccAddress, amount: Coins.Input);
    static fromAmino(data: MsgFundCommunityPool.Amino, _?: boolean): MsgFundCommunityPool;
    toAmino(isClassic?: boolean): MsgFundCommunityPool.Amino;
    static fromData(proto: MsgFundCommunityPool.Data, _?: boolean): MsgFundCommunityPool;
    toData(_?: boolean): MsgFundCommunityPool.Data;
    static fromProto(proto: MsgFundCommunityPool.Proto, _?: Boolean): MsgFundCommunityPool;
    toProto(_?: boolean): MsgFundCommunityPool.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgFundCommunityPool;
}
export declare namespace MsgFundCommunityPool {
    interface Amino {
        type: 'distribution/MsgFundCommunityPool' | 'cosmos-sdk/MsgFundCommunityPool';
        value: {
            depositor: AccAddress;
            amount: Coins.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool';
        depositor: AccAddress;
        amount: Coins.Data;
    }
    type Proto = MsgFundCommunityPool_pb;
}
