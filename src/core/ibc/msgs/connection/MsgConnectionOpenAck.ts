import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Version } from '../../core/connection/Version';
import { MsgConnectionOpenAck as MsgConnectionOpenAck_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
import { Height } from '../../core/client/Height';

/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export class MsgConnectionOpenAck extends JSONSerializable<
  any,
  MsgConnectionOpenAck.Data,
  MsgConnectionOpenAck.Proto
> {
  /**
   * @param connection_id
   * @param counterparty_connection_id
   * @param version
   * @param client_state
   * @param proof_height proof of the initialization the connection on Chain B: `UNITIALIZED -> TRYOPEN`
   * @param proof_try proof of client state included in message
   * @param proof_client proof of client consensus state
   * @param proof_consensus
   * @param consenesus_height
   * @param signer signer address
   */
  constructor(
    public connection_id: string,
    public counterparty_connection_id: string,
    public version: Version | undefined,
    public client_state: any,
    public proof_height: Height | undefined,
    public proof_try: string,
    public proof_client: string,
    public proof_consensus: string,
    public consensus_height: Height | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): MsgConnectionOpenAck {
    _;
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenAck.Data,
    _?: boolean
  ): MsgConnectionOpenAck {
    _;
    const {
      connection_id,
      counterparty_connection_id,
      version,
      client_state,
      proof_height,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
    } = data;
    return new MsgConnectionOpenAck(
      connection_id,
      counterparty_connection_id,
      version ? Version.fromData(version) : undefined,
      client_state,
      proof_height ? Height.fromData(proof_height) : undefined,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height ? Height.fromData(consensus_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgConnectionOpenAck.Data {
    _;
    const {
      connection_id,
      counterparty_connection_id,
      version,
      client_state,
      proof_height,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck',
      connection_id,
      counterparty_connection_id,
      version: version ? version.toData() : undefined,
      client_state,
      proof_height: proof_height ? proof_height.toData() : undefined,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height: consensus_height
        ? consensus_height.toData()
        : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenAck.Proto,
    _?: boolean
  ): MsgConnectionOpenAck {
    _;
    return new MsgConnectionOpenAck(
      proto.connectionId,
      proto.counterpartyConnectionId,
      proto.version ? Version.fromProto(proto.version) : undefined,
      proto.clientState,
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      Buffer.from(proto.proofTry).toString('base64'),
      Buffer.from(proto.proofClient).toString('base64'),
      Buffer.from(proto.proofConsensus).toString('base64'),
      proto.consensusHeight
        ? Height.fromProto(proto.consensusHeight)
        : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgConnectionOpenAck.Proto {
    _;
    const {
      connection_id,
      counterparty_connection_id,
      version,
      client_state,
      proof_height,
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
    } = this;
    return MsgConnectionOpenAck_pb.fromPartial({
      connectionId: connection_id,
      counterpartyConnectionId: counterparty_connection_id,
      version: version ? version.toProto() : undefined,
      clientState: client_state,
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      proofTry: Buffer.from(proof_try, 'base64'),
      proofClient: Buffer.from(proof_client, 'base64'),
      proofConsensus: Buffer.from(proof_consensus, 'base64'),
      consensusHeight: consensus_height
        ? consensus_height.toProto()
        : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenAck',
      value: MsgConnectionOpenAck_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenAck {
    _;
    return MsgConnectionOpenAck.fromProto(
      MsgConnectionOpenAck_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenAck {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck';
    connection_id: string;
    counterparty_connection_id: string;
    version?: Version.Data;
    client_state: Any;
    proof_height?: Height.Data;
    proof_try: string;
    proof_client: string;
    proof_consensus: string;
    consensus_height?: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenAck_pb;
}
