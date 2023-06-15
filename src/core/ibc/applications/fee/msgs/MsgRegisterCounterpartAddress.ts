import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRegisterCounterpartyAddress as MsgRegisterCounterpartyAddress_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/tx';

/**
 * MsgRegisterCounterpartyAddress defines the request type for the RegisterCounterpartyAddress rpc
 */
export class MsgRegisterCounterpartyAddress extends JSONSerializable<
  any,
  MsgRegisterCounterpartyAddress.Data,
  MsgRegisterCounterpartyAddress.Proto
> {
  /**
   * @param address the relayer address
   * @param counterparty_adress the counterparty relayer address
   * @param channel_id unique channel identifier
   */
  constructor(
    public address: string,
    public counterparty_address: string,
    public channel_id: string
  ) {
    super();
  }

  public static fromAmino(): MsgRegisterCounterpartyAddress {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgRegisterCounterpartyAddress.Data) {
    const { address, counterparty_address, channel_id } = data;

    return new MsgRegisterCounterpartyAddress(
      address,
      counterparty_address,
      channel_id
    );
  }

  public toData(): MsgRegisterCounterpartyAddress.Data {
    const { address, counterparty_address, channel_id } = this;
    return {
      '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress',
      address,
      counterparty_address,
      channel_id,
    };
  }

  public static fromProto(proto: MsgRegisterCounterpartyAddress.Proto) {
    return new MsgRegisterCounterpartyAddress(
      proto.address,
      proto.counterpartyAddress,
      proto.channelId
    );
  }

  public toProto(): MsgRegisterCounterpartyAddress.Proto {
    const { address, counterparty_address, channel_id } = this;
    return MsgRegisterCounterpartyAddress_pb.fromPartial({
      address,
      counterpartyAddress: counterparty_address,
      channelId: channel_id,
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress',
      value: MsgRegisterCounterpartyAddress_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return MsgRegisterCounterpartyAddress.fromProto(
      MsgRegisterCounterpartyAddress_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgRegisterCounterpartyAddress {
  export interface Data {
    '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress';
    address: string;
    counterparty_address: string;
    channel_id: string;
  }

  export type Proto = MsgRegisterCounterpartyAddress_pb;
}
