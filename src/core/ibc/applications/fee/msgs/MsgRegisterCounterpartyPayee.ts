import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRegisterCounterpartyPayee as MsgRegisterCounterpartyPayee_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/tx';

/**
 * MsgRegisterCounterpartyPayee defines the request type for the RegisterCounterpartyPayee rpc
 */
export class MsgRegisterCounterpartyPayee extends JSONSerializable<
  any,
  MsgRegisterCounterpartyPayee.Data,
  MsgRegisterCounterpartyPayee.Proto
> {
  /**
   * @param port_id unique port identifier
   * @param channel_id unique channel identifier
   * @param relayer the relayer address
   * @param counterparty_payee the counterparty payee address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public relayer: string,
    public counterparty_payee: string
  ) {
    super();
  }

  public static fromAmino() {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgRegisterCounterpartyPayee.Data) {
    const { port_id, channel_id, relayer, counterparty_payee } = data;

    return new MsgRegisterCounterpartyPayee(
      port_id,
      channel_id,
      relayer,
      counterparty_payee
    );
  }

  public toData(): MsgRegisterCounterpartyPayee.Data {
    const { port_id, channel_id, relayer, counterparty_payee } = this;
    return {
      '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee',
      port_id,
      channel_id,
      relayer,
      counterparty_payee,
    };
  }

  public static fromProto(proto: MsgRegisterCounterpartyPayee.Proto) {
    return new MsgRegisterCounterpartyPayee(
      proto.portId,
      proto.channelId,
      proto.relayer,
      proto.counterpartyPayee
    );
  }

  public toProto(): MsgRegisterCounterpartyPayee.Proto {
    const { port_id, channel_id, relayer, counterparty_payee } = this;
    return MsgRegisterCounterpartyPayee_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      relayer,
      counterpartyPayee: counterparty_payee,
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee',
      value: MsgRegisterCounterpartyPayee_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return MsgRegisterCounterpartyPayee.fromProto(
      MsgRegisterCounterpartyPayee_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgRegisterCounterpartyPayee {
  export interface Data {
    '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee';
    port_id: string;
    channel_id: string;
    relayer: string;
    counterparty_payee: string;
  }

  export type Proto = MsgRegisterCounterpartyPayee_pb;
}
