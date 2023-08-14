import { Height as Height_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
import { JSONSerializable } from '../../../../util/json';
/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
export declare class Height extends JSONSerializable<Height.Amino, Height.Data, Height.Proto> {
    revision_number: number;
    revision_height: number;
    /**
     * @param revision_number the revision that the client is currently on
     * @param revision_height the height within the given revision
     */
    constructor(revision_number: number, revision_height: number);
    static fromAmino(data: Height.Amino): Height;
    toAmino(): Height.Amino;
    static fromData(data: Height.Data): Height;
    toData(): Height.Data;
    static fromProto(proto: Height.Proto): Height;
    toProto(): Height.Proto;
}
export declare namespace Height {
    interface Amino {
        revision_number?: string;
        revision_height?: string;
    }
    interface Data {
        revision_number: string;
        revision_height: string;
    }
    type Proto = Height_pb;
}
