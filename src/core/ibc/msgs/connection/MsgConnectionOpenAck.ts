import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Version } from './Version';
import { MsgConnectionOpenAck as MsgConnectionOpenAck_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
import { Height } from '../client/Height';

/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export class MsgConnectionOpenAck extends JSONSerializable<
  MsgConnectionOpenAck.Amino,
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
    public version: Version,
    public client_state: any,
    public proof_height: Height,
    public proof_try: string,
    public proof_client: string,
    public proof_consensus: string,
    public consensus_height: Height,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgConnectionOpenAck {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgConnectionOpenAck.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenAck.Data
  ): MsgConnectionOpenAck {
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
      Version.fromData(version),
      client_state,
      Height.fromData(proof_height),
      proof_try,
      proof_client,
      proof_consensus,
      Height.fromData(consensus_height),
      signer
    );
  }

  public toData(): MsgConnectionOpenAck.Data {
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
      version: version.toData(),
      client_state,
      proof_height: proof_height.toData(),
      proof_try,
      proof_client,
      proof_consensus,
      consensus_height: consensus_height.toData(),
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenAck.Proto
  ): MsgConnectionOpenAck {
    return new MsgConnectionOpenAck(
      proto.connectionId,
      proto.counterpartyConnectionId,
      Version.fromProto(proto.version!),
      proto.clientState,
      Height.fromProto(proto.proofHeight!),
      Buffer.from(proto.proofTry).toString('base64'),
      Buffer.from(proto.proofClient).toString('base64'),
      Buffer.from(proto.proofConsensus).toString('base64'),
      Height.fromProto(proto.consensusHeight!),
      proto.signer
    );
  }

  public toProto(): MsgConnectionOpenAck.Proto {
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
      version: version.toProto(),
      clientState: client_state,
      proofHeight: proof_height.toProto(),
      proofTry: Buffer.from(proof_try, 'base64'),
      proofClient: Buffer.from(proof_client, 'base64'),
      proofConsensus: Buffer.from(proof_consensus, 'base64'),
      consensusHeight: consensus_height.toProto(),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos-sdk/MsgConnectionOpenAck',
      value: MsgConnectionOpenAck_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgConnectionOpenAck {
    return MsgConnectionOpenAck.fromProto(
      MsgConnectionOpenAck_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenAck {
  export interface Amino {
    type: 'cosmos-sdk/MsgConnectionOpenAck';
    value: {
      connection_id: string;
      counterparty_connection_id: string;
      version: Version.Amino;
      client_state: Any;
      proof_height: Height.Amino;
      proof_try: string;
      proof_client: string;
      proof_consensus: string;
      consensus_height: Height.Amino;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck';
    connection_id: string;
    counterparty_connection_id: string;
    version: Version.Data;
    client_state: Any;
    proof_height: Height.Data;
    proof_try: string;
    proof_client: string;
    proof_consensus: string;
    consensus_height: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenAck_pb;
}
