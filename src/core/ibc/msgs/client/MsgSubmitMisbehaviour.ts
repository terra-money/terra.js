import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSubmitMisbehaviour as MsgSubmitMisbehaviour_pb } from '@terra-money/terra.proto/ibc/core/client/v1/tx';
/**
 *  MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for light client misbehaviour.
 */
export class MsgSubmitMisbehaviour extends JSONSerializable<
  any,
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

  public static fromAmino(_: any, isClassic?: boolean): MsgSubmitMisbehaviour {
    _;
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgSubmitMisbehaviour.Data,
    _?: boolean
  ): MsgSubmitMisbehaviour {
    _;
    const { client_id, misbehaviour, signer } = data;
    return new MsgSubmitMisbehaviour(client_id, misbehaviour, signer);
  }

  public toData(_?: boolean): MsgSubmitMisbehaviour.Data {
    _;
    const { client_id, misbehaviour, signer } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour',
      client_id,
      misbehaviour,
      signer,
    };
  }

  public static fromProto(
    proto: MsgSubmitMisbehaviour.Proto,
    _?: boolean
  ): MsgSubmitMisbehaviour {
    _;
    return new MsgSubmitMisbehaviour(
      proto.clientId,
      proto.misbehaviour,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgSubmitMisbehaviour.Proto {
    _;
    const { client_id, misbehaviour, signer } = this;
    return MsgSubmitMisbehaviour_pb.fromPartial({
      clientId: client_id,
      misbehaviour,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgSubmitMisbehaviour',
      value: MsgSubmitMisbehaviour_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgSubmitMisbehaviour {
    _;
    return MsgSubmitMisbehaviour.fromProto(
      MsgSubmitMisbehaviour_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgSubmitMisbehaviour {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour';
    client_id: string;
    misbehaviour: any;
    signer: AccAddress;
  }
  export type Proto = MsgSubmitMisbehaviour_pb;
}
