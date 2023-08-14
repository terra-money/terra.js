import { AbsoluteTxPosition as AbsoluteTxPosition_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/types';
import { JSONSerializable } from '../../util/json';
/**
 *
 */
export declare class AbsoluteTxPosition extends JSONSerializable<AbsoluteTxPosition.Amino, AbsoluteTxPosition.Data, AbsoluteTxPosition.Proto> {
    block_height: number;
    tx_index: number;
    /**
     * @param block_height
     * @param tx_index
     */
    constructor(block_height: number, tx_index: number);
    static fromAmino(data: AbsoluteTxPosition.Amino): AbsoluteTxPosition;
    toAmino(): AbsoluteTxPosition.Amino;
    static fromData(data: AbsoluteTxPosition.Data): AbsoluteTxPosition;
    toData(): AbsoluteTxPosition.Data;
    static fromProto(proto: AbsoluteTxPosition.Proto): AbsoluteTxPosition;
    toProto(): AbsoluteTxPosition.Proto;
}
export declare namespace AbsoluteTxPosition {
    interface Amino {
        block_height: string;
        tx_index: string;
    }
    interface Data {
        block_height: string;
        tx_index: string;
    }
    type Proto = AbsoluteTxPosition_pb;
}
