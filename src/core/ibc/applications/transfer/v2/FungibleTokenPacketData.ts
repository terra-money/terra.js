import { FungibleTokenPacketData as FungibleTokenPacketData_pb } from '@terra-money/terra.proto/ibc/applications/transfer/v2/packet';
import { JSONSerializable } from '../../../../../util/json';

/**
 *  FungibleTokenPacketData defines a struct for the packet payload
 * See FungibleTokenPacketData spec:
 * https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#data-structures
 */
export class FungibleTokenPacketData extends JSONSerializable<
  any,
  FungibleTokenPacketData.Data,
  FungibleTokenPacketData.Proto
> {
  /**
   * @param denom the token denomination to be transferred
   * @param amount the token amount to be transferred
   * @param sender the sender address
   * @param receiver the recipient address on the destination chain
   */
  constructor(
    public denom: string,
    public amount: string,
    public sender: string,
    public receiver: string
  ) {
    super();
  }

  public static fromAmino(): any {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: FungibleTokenPacketData.Data
  ): FungibleTokenPacketData {
    const { denom, amount, sender, receiver } = data;
    return new FungibleTokenPacketData(denom, amount, sender, receiver);
  }

  public toData(): FungibleTokenPacketData.Data {
    const { denom, amount, sender, receiver } = this;
    return {
      '@type': '/ibc.applications.transfer.v2.FungibleTokenPacketData',
      denom,
      amount,
      sender,
      receiver,
    };
  }

  public static fromProto(
    proto: FungibleTokenPacketData.Proto
  ): FungibleTokenPacketData {
    return new FungibleTokenPacketData(
      proto.denom,
      proto.amount,
      proto.sender,
      proto.receiver
    );
  }

  public toProto(): FungibleTokenPacketData.Proto {
    const { denom, amount, sender, receiver } = this;
    return FungibleTokenPacketData_pb.fromPartial({
      denom,
      amount,
      sender,
      receiver,
    });
  }
}

export namespace FungibleTokenPacketData {
  export interface Data {
    '@type': '/ibc.applications.transfer.v2.FungibleTokenPacketData';
    denom: string;
    amount: string;
    sender: string;
    receiver: string;
  }

  export type Proto = FungibleTokenPacketData_pb;
}
