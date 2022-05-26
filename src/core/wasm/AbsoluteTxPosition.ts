import { AbsoluteTxPosition as AbsoluteTxPosition_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/types';
import { JSONSerializable } from '../../util/json';
import * as Long from 'long';
/**
 *
 */
export class AbsoluteTxPosition extends JSONSerializable<
  AbsoluteTxPosition.Amino,
  AbsoluteTxPosition.Data,
  AbsoluteTxPosition.Proto
> {
  /**
   * @param block_height
   * @param tx_index
   */
  constructor(public block_height: number, public tx_index: number) {
    super();
  }

  public static fromAmino(data: AbsoluteTxPosition.Amino): AbsoluteTxPosition {
    return new AbsoluteTxPosition(
      Number.parseInt(data.block_height),
      Number.parseInt(data.tx_index)
    );
  }

  public toAmino(): AbsoluteTxPosition.Amino {
    const res: AbsoluteTxPosition.Amino = {
      block_height: this.block_height.toFixed(),
      tx_index: this.tx_index.toFixed(),
    };
    return res;
  }

  public static fromData(data: AbsoluteTxPosition.Data): AbsoluteTxPosition {
    return new AbsoluteTxPosition(
      Number.parseInt(data.block_height),
      Number.parseInt(data.tx_index)
    );
  }

  public toData(): AbsoluteTxPosition.Data {
    const res: AbsoluteTxPosition.Data = {
      block_height: this.block_height.toFixed(),
      tx_index: this.tx_index.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: AbsoluteTxPosition.Proto): AbsoluteTxPosition {
    return new AbsoluteTxPosition(
      proto.blockHeight.toNumber(),
      proto.txIndex.toNumber()
    );
  }

  public toProto(): AbsoluteTxPosition.Proto {
    return AbsoluteTxPosition_pb.fromPartial({
      blockHeight: Long.fromNumber(this.block_height),
      txIndex: Long.fromNumber(this.tx_index),
    });
  }
}

export namespace AbsoluteTxPosition {
  export interface Amino {
    block_height: string;
    tx_index: string;
  }

  export interface Data {
    block_height: string;
    tx_index: string;
  }

  export type Proto = AbsoluteTxPosition_pb;
}
