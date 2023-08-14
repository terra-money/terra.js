import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDonateAllVestingTokens as MsgDonateAllVestingTokens_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/tx';
/**
 * DonateAllVestingTokens defines a method that enables donating all vesting
 */
export declare class MsgDonateAllVestingTokens extends JSONSerializable<MsgDonateAllVestingTokens.Amino, MsgDonateAllVestingTokens.Data, MsgDonateAllVestingTokens.Proto> {
    from_address: AccAddress;
    /**
     * @param from_address donor's address
     */
    constructor(from_address: AccAddress);
    static fromAmino(data: MsgDonateAllVestingTokens.Amino, isClassic?: boolean): MsgDonateAllVestingTokens;
    toAmino(isClassic?: boolean): MsgDonateAllVestingTokens.Amino;
    static fromData(data: MsgDonateAllVestingTokens.Data, isClassic?: boolean): MsgDonateAllVestingTokens;
    toData(isClassic?: boolean): MsgDonateAllVestingTokens.Data;
    static fromProto(proto: MsgDonateAllVestingTokens.Proto, isClassic?: boolean): MsgDonateAllVestingTokens;
    toProto(isClassic?: boolean): MsgDonateAllVestingTokens.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgDonateAllVestingTokens;
}
export declare namespace MsgDonateAllVestingTokens {
    interface Amino {
        type: 'cosmos-sdk/MsgDonateAllVestingTokens';
        value: {
            from_address: AccAddress;
        };
    }
    interface Data {
        '@type': '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens';
        from_address: AccAddress;
    }
    type Proto = MsgDonateAllVestingTokens_pb;
}
