import { DenomTrace as DenomTrace_pb } from '@terra-money/terra.proto/ibc/applications/transfer/v1/transfer';
import { JSONSerializable } from '../../../../../util/json';
/**
 * DenomTrace is a monotonically increasing data type
 * that can be compared against another DenomTrace for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionDenomTrace is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionDenomTrace
 * gets reset
 */
export declare class DenomTrace extends JSONSerializable<DenomTrace.Amino, DenomTrace.Data, DenomTrace.Proto> {
    path: string;
    base_denom: string;
    /**
     * @param path the revision that the client is currently on
     * @param base_denom the height within the given revision
     */
    constructor(path: string, base_denom: string);
    static fromAmino(data: DenomTrace.Amino): DenomTrace;
    toAmino(): DenomTrace.Amino;
    static fromData(data: DenomTrace.Data): DenomTrace;
    toData(): DenomTrace.Data;
    static fromProto(proto: DenomTrace.Proto): DenomTrace;
    toProto(): DenomTrace.Proto;
}
export declare namespace DenomTrace {
    interface Amino {
        path: string;
        base_denom: string;
    }
    interface Data {
        path: string;
        base_denom: string;
    }
    type Proto = DenomTrace_pb;
}
