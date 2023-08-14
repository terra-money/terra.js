import { State, Order, Channel as Channel_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/channel';
import { JSONSerializable } from '../../../../util/json';
import { Counterparty } from './Counterparty';
/**
 * Channel is a monotonically increasing data type
 * that can be compared against another Channel for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionChannel is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionChannel
 * gets reset
 */
export declare class Channel extends JSONSerializable<Channel.Amino, Channel.Data, Channel.Proto> {
    state: State;
    ordering: Order;
    counterparty: Counterparty | undefined;
    connection_hops: string[];
    version: string;
    /**
     * @param state current state of the channel end
     * @param ordering  whether the channel is ordered or unordered
     * @param counterparty counterparty channel end
     * @param connection_hops list of connection identifiers, in order, along which packets sent on this channel will travel
     * @param version opaque channel version, which is agreed upon during the handshake
     */
    constructor(state: State, ordering: Order, counterparty: Counterparty | undefined, connection_hops: string[], version: string);
    static fromAmino(data: Channel.Amino): Channel;
    toAmino(): Channel.Amino;
    static fromData(data: Channel.Data): Channel;
    toData(): Channel.Data;
    static fromProto(proto: Channel.Proto): Channel;
    toProto(): Channel.Proto;
}
export declare namespace Channel {
    interface Amino {
        state: State;
        ordering: Order;
        counterparty?: Counterparty.Amino;
        connection_hops: string[];
        version: string;
    }
    interface Data {
        state: State;
        ordering: Order;
        counterparty?: Counterparty.Data;
        connection_hops: string[];
        version: string;
    }
    type Proto = Channel_pb;
}
