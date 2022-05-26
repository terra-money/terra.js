import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { TextProposal as TextProposal_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';

/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export class TextProposal extends JSONSerializable<
  TextProposal.Amino,
  TextProposal.Data,
  TextProposal.Proto
> {
  /**
   * @param title proposal's title
   * @param description proposal's description
   */
  constructor(public title: string, public description: string) {
    super();
  }

  public static fromAmino(data: TextProposal.Amino, _?: boolean): TextProposal {
    _;
    const {
      value: { title, description },
    } = data;
    return new TextProposal(title, description);
  }

  public toAmino(isClassic?: boolean): TextProposal.Amino {
    const { title, description } = this;
    return {
      type: isClassic ? 'gov/TextProposal' : 'cosmos-sdk/TextProposal',
      value: {
        title,
        description,
      },
    };
  }

  public static fromData(proto: TextProposal.Data, _?: boolean): TextProposal {
    _;
    const { title, description } = proto;
    return new TextProposal(title, description);
  }

  public toData(_?: boolean): TextProposal.Data {
    _;
    const { title, description } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.TextProposal',
      title,
      description,
    };
  }

  public static fromProto(
    proto: TextProposal.Proto,
    _?: boolean
  ): TextProposal {
    _;
    return new TextProposal(proto.title, proto.description);
  }

  public toProto(_?: boolean): TextProposal.Proto {
    _;
    const { title, description } = this;
    return TextProposal_pb.fromPartial({
      description,
      title,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.TextProposal',
      value: TextProposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): TextProposal {
    return TextProposal.fromProto(
      TextProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace TextProposal {
  export interface Amino {
    type: 'gov/TextProposal' | 'cosmos-sdk/TextProposal';
    value: {
      title: string;
      description: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.gov.v1beta1.TextProposal';
    title: string;
    description: string;
  }

  export type Proto = TextProposal_pb;
}
