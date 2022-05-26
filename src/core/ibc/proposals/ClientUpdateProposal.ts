import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { ClientUpdateProposal as ClientUpdateProposal_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';

/**
 * Proposal that allows updating IBC clients. If it passes, the substitute
 * client's latest consensus state is copied over to the subject client.
 */
export class ClientUpdateProposal extends JSONSerializable<
  ClientUpdateProposal.Amino,
  ClientUpdateProposal.Data,
  ClientUpdateProposal.Proto
> {
  public subjectClientId: string;
  public substituteClientId: string;
  /**
   * @param title proposal's title
   * @param description proposal's description
   * @param subjectClientId client to update
   * @param substituteClientId client to copy
   */
  constructor(
    public title: string,
    public description: string,
    subjectClientId: string,
    substituteClientId: string
  ) {
    super();
    this.subjectClientId = subjectClientId;
    this.substituteClientId = substituteClientId;
  }

  public static fromAmino(
    data: ClientUpdateProposal.Amino,
    _?: boolean
  ): ClientUpdateProposal {
    _;
    const {
      value: { title, description, subjectClientId, substituteClientId },
    } = data;
    return new ClientUpdateProposal(
      title,
      description,
      subjectClientId,
      substituteClientId
    );
  }

  public toAmino(_?: boolean): ClientUpdateProposal.Amino {
    _;
    const { title, description, subjectClientId, substituteClientId } = this;
    return {
      type: 'ibc/ClientUpdateProposal',
      value: {
        title,
        description,
        subjectClientId,
        substituteClientId,
      },
    };
  }

  public static fromData(
    data: ClientUpdateProposal.Data,
    _?: boolean
  ): ClientUpdateProposal {
    _;
    const { title, description, subject_client_id, substitute_client_id } =
      data;
    return new ClientUpdateProposal(
      title,
      description,
      subject_client_id,
      substitute_client_id
    );
  }

  public toData(_?: boolean): ClientUpdateProposal.Data {
    _;
    const { title, description, subjectClientId, substituteClientId } = this;
    return {
      '@type': '/ibc.core.client.v1.ClientUpdateProposal',
      title,
      description,
      subject_client_id: subjectClientId,
      substitute_client_id: substituteClientId,
    };
  }

  public static fromProto(
    proto: ClientUpdateProposal.Proto,
    _?: boolean
  ): ClientUpdateProposal {
    _;
    return new ClientUpdateProposal(
      proto.title,
      proto.description,
      proto.subjectClientId,
      proto.substituteClientId
    );
  }

  public toProto(_?: boolean): ClientUpdateProposal.Proto {
    _;
    const { title, description, subjectClientId, substituteClientId } = this;
    return ClientUpdateProposal_pb.fromPartial({
      subjectClientId,
      substituteClientId,
      description,
      title,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/ibc.core.client.v1.ClientUpdateProposal',
      value: ClientUpdateProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): ClientUpdateProposal {
    _;
    return ClientUpdateProposal.fromProto(
      ClientUpdateProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace ClientUpdateProposal {
  export interface Amino {
    type: 'ibc/ClientUpdateProposal';
    value: {
      title: string;
      description: string;
      subjectClientId: string;
      substituteClientId: string;
    };
  }

  export interface Data {
    '@type': '/ibc.core.client.v1.ClientUpdateProposal';
    title: string;
    description: string;
    subject_client_id: string;
    substitute_client_id: string;
  }

  export type Proto = ClientUpdateProposal_pb;
}
