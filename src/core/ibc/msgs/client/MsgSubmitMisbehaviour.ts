import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSubmitMisbehaviour as MsgSubmitMisbehaviour_pb } from '@terra-money/terra.proto/ibc/core/client/v1/tx';
/**
 *  MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for light client misbehaviour.
 */
export class MsgSubmitMisbehaviour extends JSONSerializable<
  MsgSubmitMisbehaviour.Amino,
  MsgSubmitMisbehaviour.Data,
  MsgSubmitMisbehaviour.Proto
> {
  /**
   * @param client_id client unique identifier
   * @param misbehaviour misbehaviour used for freezing the light client
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public misbehaviour: any,
    public signer: string
  ) {
    super();
  }

  public static fromAmino(_: any): MsgSubmitMisbehaviour {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgSubmitMisbehaviour.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgSubmitMisbehaviour.Data
  ): MsgSubmitMisbehaviour {
    const { client_id, misbehaviour, signer } = data;
    return new MsgSubmitMisbehaviour(client_id, misbehaviour, signer);
  }

  public toData(): MsgSubmitMisbehaviour.Data {
    const { client_id, misbehaviour, signer } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour',
      client_id,
      misbehaviour,
      signer,
    };
  }

  public static fromProto(
    proto: MsgSubmitMisbehaviour.Proto
  ): MsgSubmitMisbehaviour {
    return new MsgSubmitMisbehaviour(
      proto.clientId,
      proto.misbehaviour,
      proto.signer
    );
  }

  public toProto(): MsgSubmitMisbehaviour.Proto {
    const { client_id, misbehaviour, signer } = this;
    return MsgSubmitMisbehaviour_pb.fromPartial({
      clientId: client_id,
      misbehaviour,
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgSubmitMisbehaviour',
      value: MsgSubmitMisbehaviour_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgSubmitMisbehaviour {
    return MsgSubmitMisbehaviour.fromProto(
      MsgSubmitMisbehaviour_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgSubmitMisbehaviour {
  export interface Amino {
    type: 'cosmos-sdk/MsgSubmitMisbehaviour';
    value: {
      client_id: string;
      misbehaviour: any;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour';
    client_id: string;
    misbehaviour: any;
    signer: AccAddress;
  }
  export type Proto = MsgSubmitMisbehaviour_pb;
}
