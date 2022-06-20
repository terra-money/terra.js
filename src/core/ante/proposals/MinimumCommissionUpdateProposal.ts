import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MinimumCommissionUpdateProposal as MinimumCommissionUpdateProposal_pb } from '@terra-money/terra.proto/terra/ante/v2/proposal';
/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export class MinimumCommissionUpdateProposal extends JSONSerializable<
  any,
  MinimumCommissionUpdateProposal.Data,
  MinimumCommissionUpdateProposal.Proto
> {
  /**
   * @param title proposal's title
   * @param description proposal's description
   */
  constructor(
    public title: string,
    public description: string,
    public minimumCommission: string
  ) {
    super();
  }

  public static fromAmino(
    _: any,
    isClassic?: boolean
  ): MinimumCommissionUpdateProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MinimumCommissionUpdateProposal.Data,
    _?: boolean
  ): MinimumCommissionUpdateProposal {
    _;
    const { title, description, minimum_commission } = data;
    return new MinimumCommissionUpdateProposal(
      title,
      description,
      minimum_commission
    );
  }

  public toData(_?: boolean): MinimumCommissionUpdateProposal.Data {
    _;
    const { title, description, minimumCommission } = this;
    return {
      '@type': '/terra.ante.v2.MinimumCommissionUpdateProposal',
      title,
      description,
      minimum_commission: minimumCommission,
    };
  }

  public static fromProto(
    proto: MinimumCommissionUpdateProposal.Proto,
    _?: boolean
  ): MinimumCommissionUpdateProposal {
    _;
    return new MinimumCommissionUpdateProposal(
      proto.title,
      proto.description,
      proto.minimumCommission
    );
  }

  public toProto(_?: boolean): MinimumCommissionUpdateProposal.Proto {
    _;
    const { title, description, minimumCommission } = this;
    return MinimumCommissionUpdateProposal_pb.fromPartial({
      description,
      title,
      minimumCommission,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.gov.v1beta1.MinimumCommissionUpdateProposal',
      value: MinimumCommissionUpdateProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MinimumCommissionUpdateProposal {
    return MinimumCommissionUpdateProposal.fromProto(
      MinimumCommissionUpdateProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MinimumCommissionUpdateProposal {
  export interface Data {
    '@type': '/terra.ante.v2.MinimumCommissionUpdateProposal';
    title: string;
    description: string;
    minimum_commission: string;
  }

  export type Proto = MinimumCommissionUpdateProposal_pb;
}
