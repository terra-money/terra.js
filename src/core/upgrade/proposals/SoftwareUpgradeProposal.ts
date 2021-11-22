import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { SoftwareUpgradeProposal as SoftwareUpgradeProposal_pb } from '@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade';
import { Plan } from '../Plan';

/**
 * Softwareupgradeproposal is a gov Content type for initiating a software upgrade.
 */
export class SoftwareUpgradeProposal extends JSONSerializable<
  SoftwareUpgradeProposal.Amino,
  SoftwareUpgradeProposal.Data,
  SoftwareUpgradeProposal.Proto
> {
  /**
   *
   * @param title
   * @param description
   * @param plan
   */
  constructor(
    public title: string,
    public description: string,
    public plan?: Plan
  ) {
    super();
  }

  public static fromAmino(
    data: SoftwareUpgradeProposal.Amino
  ): SoftwareUpgradeProposal {
    const {
      value: { title, description, plan },
    } = data;
    return new SoftwareUpgradeProposal(
      title,
      description,
      plan ? Plan.fromAmino(plan) : undefined
    );
  }

  public toAmino(): SoftwareUpgradeProposal.Amino {
    const { title, description, plan } = this;
    return {
      type: 'upgrade/SoftwareUpgradeProposal',
      value: {
        title,
        description,
        plan: plan ? plan.toAmino() : undefined,
      },
    };
  }

  public static fromData(
    data: SoftwareUpgradeProposal.Data
  ): SoftwareUpgradeProposal {
    const { title, description, plan } = data;
    return new SoftwareUpgradeProposal(
      title,
      description,
      plan ? Plan.fromData(plan) : undefined
    );
  }

  public toData(): SoftwareUpgradeProposal.Data {
    const { title, description, plan } = this;
    return {
      '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
      title,
      description,
      plan: plan ? plan.toData() : undefined,
    };
  }

  public static fromProto(
    proto: SoftwareUpgradeProposal.Proto
  ): SoftwareUpgradeProposal {
    return new SoftwareUpgradeProposal(
      proto.title,
      proto.description,
      proto.plan ? Plan.fromProto(proto.plan) : undefined
    );
  }

  public toProto(): SoftwareUpgradeProposal.Proto {
    const { title, description, plan } = this;
    return SoftwareUpgradeProposal_pb.fromPartial({
      title,
      description,
      plan: plan ? plan.toProto() : undefined,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
      value: SoftwareUpgradeProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): SoftwareUpgradeProposal {
    return SoftwareUpgradeProposal.fromProto(
      SoftwareUpgradeProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace SoftwareUpgradeProposal {
  export interface Amino {
    type: 'upgrade/SoftwareUpgradeProposal';
    value: {
      title: string;
      description: string;
      plan?: Plan.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal';
    title: string;
    description: string;
    plan?: Plan.Data;
  }

  export type Proto = SoftwareUpgradeProposal_pb;
}
