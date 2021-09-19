import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgConnectionOpenConfirm as MsgConnectionOpenConfirm_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
import { Height } from '../client/Height';

/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export class MsgConnectionOpenConfirm extends JSONSerializable<
  MsgConnectionOpenConfirm.Amino,
  MsgConnectionOpenConfirm.Data,
  MsgConnectionOpenConfirm.Proto
> {
  /**
   * @param connection_id
   * @param proof_ack proof for the change of the connection state on Chain A: `INIT -> OPEN`
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public connection_id: string,
    public proof_ack: string,
    public proof_height: Height,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgConnectionOpenConfirm {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgConnectionOpenConfirm.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenConfirm.Data
  ): MsgConnectionOpenConfirm {
    const { connection_id, proof_ack, proof_height, signer } = data;
    return new MsgConnectionOpenConfirm(
      connection_id,
      proof_ack,
      Height.fromData(proof_height),
      signer
    );
  }

  public toData(): MsgConnectionOpenConfirm.Data {
    const { connection_id, proof_ack, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
      connection_id,
      proof_ack,
      proof_height: proof_height.toData(),
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenConfirm.Proto
  ): MsgConnectionOpenConfirm {
    return new MsgConnectionOpenConfirm(
      proto.connectionId,
      Buffer.from(proto.proofAck).toString('base64'),
      Height.fromProto(proto.proofHeight!),
      proto.signer
    );
  }

  public toProto(): MsgConnectionOpenConfirm.Proto {
    const { connection_id, proof_ack, proof_height, signer } = this;
    return MsgConnectionOpenConfirm_pb.fromPartial({
      connectionId: connection_id,
      proofAck: Buffer.from(proof_ack, 'base64'),
      proofHeight: proof_height.toProto(),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos-sdk/MsgConnectionOpenConfirm',
      value: MsgConnectionOpenConfirm_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgConnectionOpenConfirm {
    return MsgConnectionOpenConfirm.fromProto(
      MsgConnectionOpenConfirm_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenConfirm {
  export interface Amino {
    type: 'cosmos-sdk/MsgConnectionOpenConfirm';
    value: {
      connection_id: string;
      proof_ack: string;
      proof_height: Height.Amino;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm';
    connection_id: string;
    proof_ack: string;
    proof_height: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenConfirm_pb;
}
