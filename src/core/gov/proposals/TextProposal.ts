import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { TextProposal as TextProposal_pb } from '@terra-money/terra.proto/src/cosmos/gov/v1beta1/gov_pb';

/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export class TextProposal extends JSONSerializable<TextProposal.Data> {
  /**
   * @param title proposal's title
   * @param description proposal's description
   */
  constructor(public title: string, public description: string) {
    super();
  }

  public static fromData(data: TextProposal.Data): TextProposal {
    const {
      value: { title, description },
    } = data;
    return new TextProposal(title, description);
  }

  public toData(): TextProposal.Data {
    const { title, description } = this;
    return {
      type: 'gov/TextProposal',
      value: {
        title,
        description,
      },
    };
  }

  public static fromProto(proto: TextProposal.Proto): TextProposal {
    return new TextProposal(proto.getTitle(), proto.getDescription());
  }

  public toProto(): TextProposal.Proto {
    const { title, description } = this;
    const textProposalProto = new TextProposal_pb();
    textProposalProto.setTitle(title);
    textProposalProto.setDescription(description);
    return textProposalProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.gov.v1beta1.TextProposal');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): TextProposal {
    return TextProposal.fromProto(
      TextProposal_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace TextProposal {
  export interface Data {
    type: 'gov/TextProposal';
    value: {
      title: string;
      description: string;
    };
  }

  export type Proto = TextProposal_pb;
}
