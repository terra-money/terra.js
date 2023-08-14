import { Counterparty as Counterparty_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/channel';
import { JSONSerializable } from '../../../../util/json';
/** Counterparty defines a channel end counterparty */
export declare class Counterparty extends JSONSerializable<Counterparty.Amino, Counterparty.Data, Counterparty.Proto> {
    port_id: string;
    channel_id: string;
    /**
     * @param port_id port on the counterparty chain which owns the other end of the channel.
     * @param channel_id channel end on the counterparty chain
     */
    constructor(port_id: string, channel_id: string);
    static fromAmino(data: Counterparty.Amino): Counterparty;
    toAmino(): Counterparty.Amino;
    static fromData(data: Counterparty.Data): Counterparty;
    toData(): Counterparty.Data;
    static fromProto(proto: Counterparty.Proto): Counterparty;
    toProto(): Counterparty.Proto;
}
export declare namespace Counterparty {
    interface Amino {
        port_id: string;
        channel_id: string;
    }
    interface Data {
        port_id: string;
        channel_id: string;
    }
    type Proto = Counterparty_pb;
}
