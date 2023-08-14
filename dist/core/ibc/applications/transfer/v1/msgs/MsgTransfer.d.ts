import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Coin } from '../../../../../Coin';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgTransfer as MsgTransfer_pb } from '@terra-money/terra.proto/ibc/applications/transfer/v1/tx';
import { Height } from '../../../../core/client/Height';
import { Numeric } from '../../../../../numeric';
/**
 * A basic message for transfer [[Coin]] via IBC.
 */
export declare class MsgTransfer extends JSONSerializable<MsgTransfer.Amino, MsgTransfer.Data, MsgTransfer.Proto> {
    source_port: string;
    source_channel: string;
    token?: Coin;
    sender: AccAddress;
    receiver: string;
    timeout_height?: Height;
    timeout_timestamp?: Numeric.Output;
    /**
     * @param source_port the port on which the packet will be sent
     * @param source_channel  the channel by which the packet will be sent
     * @param token the tokens to be transferred
     * @param sender the sender address
     * @param receiver the recipient address on the destination chain
     * @param timeout_height Timeout height relative to the current block height. (0 to disable)
     * @param timeout_timestamp Timeout timestamp (in nanoseconds) relative to the current block timestamp. (0 to disable)
     */
    constructor(source_port: string, source_channel: string, token: Coin | undefined, sender: AccAddress, receiver: string, timeout_height: Height | undefined, timeout_timestamp: Numeric.Input | undefined);
    static fromAmino(data: MsgTransfer.Amino, _?: boolean): MsgTransfer;
    toAmino(_?: boolean): MsgTransfer.Amino;
    static fromData(data: MsgTransfer.Data, _?: boolean): MsgTransfer;
    toData(_?: boolean): MsgTransfer.Data;
    static fromProto(proto: MsgTransfer.Proto, _?: boolean): MsgTransfer;
    toProto(_?: boolean): MsgTransfer.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgTransfer;
}
export declare namespace MsgTransfer {
    interface Amino {
        type: 'cosmos-sdk/MsgTransfer';
        value: {
            source_port: string;
            source_channel: string;
            token?: Coin.Amino;
            sender: AccAddress;
            receiver: string;
            timeout_height: Height.Amino;
            timeout_timestamp?: string;
        };
    }
    interface Data {
        '@type': '/ibc.applications.transfer.v1.MsgTransfer';
        source_port: string;
        source_channel: string;
        token?: Coin.Data;
        sender: AccAddress;
        receiver: string;
        timeout_height: Height.Data;
        timeout_timestamp: string;
    }
    type Proto = MsgTransfer_pb;
}
