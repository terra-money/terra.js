import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreateClient as MsgCreateClient_pb } from '@terra-money/terra.proto/ibc/core/client/v1/tx';
/**
 * MsgCreateClient defines a message to create an IBC client
 */
export class MsgCreateClient extends JSONSerializable<
  MsgCreateClient.Amino,
  MsgCreateClient.Data,
  MsgCreateClient.Proto
> {
  public client_state?: any;
  public consensus_state?: any;
  public signer: AccAddress;
  /**
   * @param client_state light client state
   * @param consensus_state consensus state associated with the client that corresponds to a given
   * @param signer signer address
   */
  constructor(client_state: any, consensus_state: any, signer: any) {
    super();
    this.client_state = client_state;
    this.consensus_state = consensus_state;
    this.signer = signer;
  }

  public static fromAmino(_: any): MsgCreateClient {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgCreateClient.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgCreateClient.Data): MsgCreateClient {
    const {
      value: { client_state, consensus_state, signer },
    } = data;
    return new MsgCreateClient(client_state, consensus_state, signer);
  }

  public toData(): MsgCreateClient.Data {
    const { client_state, consensus_state, signer } = this;
    return {
      '@type': '/ibc.core.client.v1.MsgCreateClient',
      value: {
        client_state,
        consensus_state,
        signer,
      },
    };
  }

  public static fromProto(proto: MsgCreateClient.Proto): MsgCreateClient {
    return new MsgCreateClient(
      proto.clientState,
      proto.consensusState,
      proto.signer
    );
  }

  public toProto(): MsgCreateClient.Proto {
    const { client_state, consensus_state, signer } = this;
    return MsgCreateClient_pb.fromPartial({
      clientState: client_state,
      consensusState: consensus_state,
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos-sdk/MsgCreateClient',
      value: MsgCreateClient_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgCreateClient {
    return MsgCreateClient.fromProto(MsgCreateClient_pb.decode(msgAny.value));
  }
}

export namespace MsgCreateClient {
  export interface Amino {
    type: 'cosmos-sdk/MsgCreateClient';
    value: {
      client_state?: any;
      consensus_state?: any;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.client.v1.MsgCreateClient';
    value: {
      client_state?: any;
      consensus_state?: any;
      signer: AccAddress;
    };
  }
  export type Proto = MsgCreateClient_pb;
}
