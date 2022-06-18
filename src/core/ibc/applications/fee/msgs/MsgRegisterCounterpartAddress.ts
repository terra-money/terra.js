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

  public static fromAmino(
    _: any,
    isClassic?: boolean
  ): MsgRegisterCounterpartyAddress {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(isClassic?: boolean): any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgRegisterCounterpartyAddress.Data,
    isClassic?: boolean
  ): MsgRegisterCounterpartyAddress {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { address, counterparty_address, channel_id } = data;

    return new MsgRegisterCounterpartyAddress(
      address,
      counterparty_address,
      channel_id
    );
  }

  public toData(isClassic?: boolean): MsgRegisterCounterpartyAddress.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { address, counterparty_address, channel_id } = this;
    return {
      '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress',
      address,
      counterparty_address,
      channel_id,
    };
  }

  public static fromProto(
    proto: MsgRegisterCounterpartyAddress.Proto,
    isClassic?: boolean
  ): MsgRegisterCounterpartyAddress {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgRegisterCounterpartyAddress(
      proto.address,
      proto.counterpartyAddress,
      proto.channelId
    );
  }

  public toProto(isClassic?: boolean): MsgRegisterCounterpartyAddress.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { address, counterparty_address, channel_id } = this;
    return MsgRegisterCounterpartyAddress_pb.fromPartial({
      address,
      counterpartyAddress: counterparty_address,
      channelId: channel_id,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress',
      value: MsgRegisterCounterpartyAddress_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgRegisterCounterpartyAddress {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
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
