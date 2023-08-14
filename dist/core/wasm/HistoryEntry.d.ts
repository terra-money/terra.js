import { ContractCodeHistoryEntry as HistoryEntry_pb, ContractCodeHistoryOperationType } from '@terra-money/terra.proto/cosmwasm/wasm/v1/types';
import { JSONSerializable } from '../../util/json';
import { AbsoluteTxPosition } from './AbsoluteTxPosition';
/**
 *
 */
export declare class HistoryEntry extends JSONSerializable<HistoryEntry.Amino, HistoryEntry.Data, HistoryEntry.Proto> {
    operation: ContractCodeHistoryOperationType;
    code_id: number;
    updated: AbsoluteTxPosition | undefined;
    msg: object | string;
    /**
     * @param operation access type
     * @param code_id
     */
    constructor(operation: ContractCodeHistoryOperationType, code_id: number, updated: AbsoluteTxPosition | undefined, msg: object | string);
    static fromAmino(data: HistoryEntry.Amino): HistoryEntry;
    toAmino(): HistoryEntry.Amino;
    static fromData(data: HistoryEntry.Data): HistoryEntry;
    toData(): HistoryEntry.Data;
    static fromProto(proto: HistoryEntry.Proto): HistoryEntry;
    toProto(): HistoryEntry.Proto;
}
export declare namespace HistoryEntry {
    interface Amino {
        operation: string;
        code_id: string;
        updated?: AbsoluteTxPosition.Amino;
        msg: object | string;
    }
    interface Data {
        operation: string;
        code_id: string;
        updated?: AbsoluteTxPosition.Data;
        msg: object | string;
    }
    type Proto = HistoryEntry_pb;
}
