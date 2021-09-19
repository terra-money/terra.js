import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Counterparty } from './Counterparty';
import { Version } from './Version';
import { MsgConnectionOpenTry as MsgConnectionOpenTry_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
import Long from 'long';
import { Height } from '../client/Height';

/**
 *  MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a connection on Chain B.
 */
export class MsgConnectionOpenTry extends JSONSerializable<
  MsgConnectionOpenTry.Amino,
  MsgConnectionOpenTry.Data,
  MsgConnectionOpenTry.Proto
> {
  /**
   * @param client_id in the case of crossing hello's, when both chains call OpenInit, we need the connection identifier of the previous connection in state INIT
   * @param previous_connection_id
   * @param client_state
   * @param counterparty
   * @param delay_period
   * @param counterpary_versions
   * @param proof_height proof of the initialization the connection on Chain A: `UNITIALIZED -> INIT`
   * @param proof_init proof of client state included in message
   * @param proof_client proof of client consensus state
   * @param proof_consensus
   * @param consensus_height
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public previous_connection_id: string,
    public client_state: any,
    public counterparty: Counterparty,
    public delay_period: number,
    public counterpary_versions: Version[],
    public proof_height: Height,
    public proof_init: string,
    public proof_client: string,
    public proof_consensus: string,
    public consensus_height: Height,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgConnectionOpenTry {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgConnectionOpenTry.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenTry.Data
  ): MsgConnectionOpenTry {
    const {
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterpary_versions,
      proof_height,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
    } = data;
    return new MsgConnectionOpenTry(
      client_id,
      previous_connection_id,
      client_state,
      Counterparty.fromData(counterparty),
      delay_period,
      counterpary_versions.map(cv => Version.fromData(cv)),
      Height.fromData(proof_height),
      Buffer.from(proof_init).toString('base64'),
      Buffer.from(proof_client).toString('base64'),
      Buffer.from(proof_consensus).toString('base64'),
      Height.fromData(consensus_height),
      signer
    );
  }

  public toData(): MsgConnectionOpenTry.Data {
    const {
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterpary_versions,
      proof_height,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenTry',
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterpary_versions,
      proof_height,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenTry.Proto
  ): MsgConnectionOpenTry {
    return new MsgConnectionOpenTry(
      proto.clientId,
      proto.previousConnectionId,
      proto.clientState,
      Counterparty.fromProto(proto.counterparty!),
      proto.delayPeriod.toNumber(),
      proto.counterpartyVersions.map(cv => Version.fromProto(cv)),
      Height.fromProto(proto.proofHeight!),
      Buffer.from(proto.proofInit).toString('base64'),
      Buffer.from(proto.proofClient).toString('base64'),
      Buffer.from(proto.proofConsensus).toString('base64'),
      Height.fromProto(proto.consensusHeight!),
      proto.signer
    );
  }

  public toProto(): MsgConnectionOpenTry.Proto {
    const {
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterpary_versions,
      proof_height,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height,
      signer,
    } = this;
    return MsgConnectionOpenTry_pb.fromPartial({
      clientId: client_id,
      previousConnectionId: previous_connection_id,
      clientState: client_state.toProto(),
      counterparty: counterparty.toProto(),
      delayPeriod: Long.fromNumber(delay_period),
      counterpartyVersions: counterpary_versions.map(cv => cv.toProto()),
      proofHeight: proof_height.toProto(),
      proofInit: Buffer.from(proof_init, 'base64'),
      proofClient: Buffer.from(proof_client, 'base64'),
      proofConsensus: Buffer.from(proof_consensus, 'base64'),
      consensusHeight: consensus_height.toProto(),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenTry',
      value: MsgConnectionOpenTry_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgConnectionOpenTry {
    return MsgConnectionOpenTry.fromProto(
      MsgConnectionOpenTry_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenTry {
  export interface Amino {
    type: 'cosmos-sdk/MsgConnectionOpenTry';
    value: {
      client_id: string;
      previous_connection_id: string;
      client_state: any;
      counterparty: Counterparty;
      delay_period: number;
      counterpary_versions: Version.Amino[];
      proof_height: Height.Amino;
      proof_init: string;
      proof_client: string;
      proof_consensus: string;
      consensus_height: Height.Amino;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenTry';
    client_id: string;
    previous_connection_id: string;
    client_state: Any;
    counterparty: Counterparty;
    delay_period: number;
    counterpary_versions: Version.Data[];
    proof_height: Height.Data;
    proof_init: string;
    proof_client: string;
    proof_consensus: string;
    consensus_height: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenTry_pb;
}
