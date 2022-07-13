import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgConnectionOpenConfirm as MsgConnectionOpenConfirm_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
import { Height } from '../../core/client/Height';

/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export class MsgConnectionOpenConfirm extends JSONSerializable<
  any,
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
    public proof_height: Height | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(
    _: any,
    isClassic?: boolean
  ): MsgConnectionOpenConfirm {
    _;
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenConfirm.Data,
    _?: boolean
  ): MsgConnectionOpenConfirm {
    _;
    const { connection_id, proof_ack, proof_height, signer } = data;
    return new MsgConnectionOpenConfirm(
      connection_id,
      proof_ack,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgConnectionOpenConfirm.Data {
    _;
    const { connection_id, proof_ack, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
      connection_id,
      proof_ack,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenConfirm.Proto,
    _?: boolean
  ): MsgConnectionOpenConfirm {
    _;
    return new MsgConnectionOpenConfirm(
      proto.connectionId,
      Buffer.from(proto.proofAck).toString('base64'),
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgConnectionOpenConfirm.Proto {
    _;
    const { connection_id, proof_ack, proof_height, signer } = this;
    return MsgConnectionOpenConfirm_pb.fromPartial({
      connectionId: connection_id,
      proofAck: Buffer.from(proof_ack, 'base64'),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
      value: MsgConnectionOpenConfirm_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenConfirm {
    _;
    return MsgConnectionOpenConfirm.fromProto(
      MsgConnectionOpenConfirm_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenConfirm {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm';
    connection_id: string;
    proof_ack: string;
    proof_height?: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenConfirm_pb;
}
