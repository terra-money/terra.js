import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUpgradeClient as MsgUpgradeClient_pb } from '@terra-money/terra.proto/ibc/core/client/v1/tx';
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client state
 */
export class MsgUpgradeClient extends JSONSerializable<
  any,
  MsgUpgradeClient.Data,
  MsgUpgradeClient.Proto
> {
  /**
   * @param client_id client unique identifier
   * @param client_state  upgraded client state
   * @param consensus_state upgraded consensus state, only contains enough information to serve as a basis of trust in update logic
   * @param proof_upgrade_client proof that old chain committed to new client
   * @param proof_upgrade_consensus_state  proof that old chain committed to new consensus state
   * @param signer signer address
   */
  constructor(
    public client_id: string,
    public client_state: any,
    public consensus_state: any,
    public proof_upgrade_client: string,
    public proof_upgrade_consensus_state: string,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): MsgUpgradeClient {
    _;
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgUpgradeClient.Data,
    _?: boolean
  ): MsgUpgradeClient {
    _;
    const {
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer,
    } = data;
    return new MsgUpgradeClient(
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer
    );
  }

  public toData(_?: boolean): MsgUpgradeClient.Data {
    _;
    const {
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgUpgradeClient',
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer,
    };
  }

  public static fromProto(
    proto: MsgUpgradeClient.Proto,
    _?: boolean
  ): MsgUpgradeClient {
    _;
    return new MsgUpgradeClient(
      proto.clientId,
      proto.clientState,
      proto.consensusState,
      Buffer.from(proto.proofUpgradeClient).toString('base64'),
      Buffer.from(proto.proofUpgradeConsensusState).toString('base64'),
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgUpgradeClient.Proto {
    _;
    const {
      client_id,
      client_state,
      consensus_state,
      proof_upgrade_client,
      proof_upgrade_consensus_state,
      signer,
    } = this;
    return MsgUpgradeClient_pb.fromPartial({
      clientId: client_id,
      clientState: client_state,
      consensusState: consensus_state,
      proofUpgradeClient: Buffer.from(proof_upgrade_client, 'base64'),
      proofUpgradeConsensusState: Buffer.from(
        proof_upgrade_consensus_state,
        'base64'
      ),
      signer: signer,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.MsgUpgradeClient',
      value: MsgUpgradeClient_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgUpgradeClient {
    _;
    return MsgUpgradeClient.fromProto(MsgUpgradeClient_pb.decode(msgAny.value));
  }
}

export namespace MsgUpgradeClient {
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgUpgradeClient';
    client_id: string;
    client_state: any;
    consensus_state: any;
    proof_upgrade_client: string;
    proof_upgrade_consensus_state: string;
    signer: AccAddress;
  }
  export type Proto = MsgUpgradeClient_pb;
}
