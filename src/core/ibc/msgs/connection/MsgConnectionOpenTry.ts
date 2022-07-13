import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Counterparty } from '../../core/connection/Counterparty';
import { Version } from '../../core/connection/Version';
import { MsgConnectionOpenTry as MsgConnectionOpenTry_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/tx';
import Long from 'long';
import { Height } from '../../core/client/Height';

/**
 *  MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a connection on Chain B.
 */
export class MsgConnectionOpenTry extends JSONSerializable<
  any,
  MsgConnectionOpenTry.Data,
  MsgConnectionOpenTry.Proto
> {
  /**
   * @param client_id in the case of crossing hello's, when both chains call OpenInit, we need the connection identifier of the previous connection in state INIT
   * @param previous_connection_id
   * @param client_state
   * @param counterparty
   * @param delay_period
   * @param counterparty_versions
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
    public counterparty: Counterparty | undefined,
    public delay_period: number,
    public counterparty_versions: Version[],
    public proof_height: Height | undefined,
    public proof_init: string,
    public proof_client: string,
    public proof_consensus: string,
    public consensus_height: Height | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): MsgConnectionOpenTry {
    _;
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenTry.Data,
    _?: boolean
  ): MsgConnectionOpenTry {
    _;
    const {
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterparty_versions,
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
      counterparty ? Counterparty.fromData(counterparty) : undefined,
      Number.parseInt(delay_period),
      counterparty_versions.length > 0
        ? counterparty_versions.map(cv => Version.fromData(cv))
        : [],
      proof_height ? Height.fromData(proof_height) : undefined,
      Buffer.from(proof_init).toString('base64'),
      Buffer.from(proof_client).toString('base64'),
      Buffer.from(proof_consensus).toString('base64'),
      consensus_height ? Height.fromData(consensus_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgConnectionOpenTry.Data {
    _;
    const {
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterparty_versions,
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
      counterparty: counterparty ? counterparty.toData() : undefined,
      delay_period: delay_period.toFixed(),
      counterparty_versions:
        counterparty_versions.length > 0
          ? counterparty_versions.map(cv => cv.toData())
          : [],
      proof_height: proof_height ? proof_height.toData() : undefined,
      proof_init,
      proof_client,
      proof_consensus,
      consensus_height: consensus_height
        ? consensus_height.toData()
        : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenTry.Proto,
    _?: boolean
  ): MsgConnectionOpenTry {
    _;
    return new MsgConnectionOpenTry(
      proto.clientId,
      proto.previousConnectionId,
      proto.clientState,
      proto.counterparty
        ? Counterparty.fromProto(proto.counterparty)
        : undefined,
      proto.delayPeriod.toNumber(),
      proto.counterpartyVersions.length > 0
        ? proto.counterpartyVersions.map(cv => Version.fromProto(cv))
        : [],
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      Buffer.from(proto.proofInit).toString('base64'),
      Buffer.from(proto.proofClient).toString('base64'),
      Buffer.from(proto.proofConsensus).toString('base64'),
      proto.consensusHeight
        ? Height.fromProto(proto.consensusHeight)
        : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgConnectionOpenTry.Proto {
    _;
    const {
      client_id,
      previous_connection_id,
      client_state,
      counterparty,
      delay_period,
      counterparty_versions,
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
      counterparty: counterparty ? counterparty.toProto() : undefined,
      delayPeriod: Long.fromNumber(delay_period),
      counterpartyVersions:
        counterparty_versions.length > 0
          ? counterparty_versions.map(cv => cv.toProto())
          : [],
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      proofInit: Buffer.from(proof_init, 'base64'),
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
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenTry',
      value: MsgConnectionOpenTry_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenTry {
    _;
    return MsgConnectionOpenTry.fromProto(
      MsgConnectionOpenTry_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenTry {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenTry';
    client_id: string;
    previous_connection_id: string;
    client_state: Any;
    counterparty?: Counterparty.Data;
    delay_period: string;
    counterparty_versions: Version.Data[];
    proof_height?: Height.Data;
    proof_init: string;
    proof_client: string;
    proof_consensus: string;
    consensus_height?: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenTry_pb;
}
