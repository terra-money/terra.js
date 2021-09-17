import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { CancelSoftwareUpgradeProposal as CancelSoftwareUpgradeProposal_pb } from '@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade';

/**
 *  CancelSoftwareUpgradeProposal is a gov Content type for cancelling a software upgrade
 */
export class CancelSoftwareUpgradeProposal extends JSONSerializable<
  CancelSoftwareUpgradeProposal.Amino,
  CancelSoftwareUpgradeProposal.Data,
  CancelSoftwareUpgradeProposal.Proto
> {
  /**
   *
   * @param title
   * @param description
   */
  constructor(public title: string, public description: string) {
    super();
  }

  public static fromAmino(
    data: CancelSoftwareUpgradeProposal.Amino
  ): CancelSoftwareUpgradeProposal {
    const {
      value: { title, description },
    } = data;
    return new CancelSoftwareUpgradeProposal(title, description);
  }

  public toAmino(): CancelSoftwareUpgradeProposal.Amino {
    const { title, description } = this;
    return {
      type: 'upgrade/CancelSoftwareUpgradeProposal',
      value: {
        title,
        description,
      },
    };
  }

  public static fromData(
    data: CancelSoftwareUpgradeProposal.Data
  ): CancelSoftwareUpgradeProposal {
    const { title, description } = data;
    return new CancelSoftwareUpgradeProposal(title, description);
  }

  public toData(): CancelSoftwareUpgradeProposal.Data {
    const { title, description } = this;
    return {
      '@type': '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
      title,
      description,
    };
  }

  public static fromProto(
    proto: CancelSoftwareUpgradeProposal.Proto
  ): CancelSoftwareUpgradeProposal {
    return new CancelSoftwareUpgradeProposal(proto.title, proto.description);
  }

  public toProto(): CancelSoftwareUpgradeProposal.Proto {
    const { title, description } = this;
    return CancelSoftwareUpgradeProposal_pb.fromPartial({
      title,
      description,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
      value: CancelSoftwareUpgradeProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): CancelSoftwareUpgradeProposal {
    return CancelSoftwareUpgradeProposal.fromProto(
      CancelSoftwareUpgradeProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace CancelSoftwareUpgradeProposal {
  export interface Amino {
    type: 'upgrade/CancelSoftwareUpgradeProposal';
    value: {
      title: string;
      description: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal';
    title: string;
    description: string;
  }

  export type Proto = CancelSoftwareUpgradeProposal_pb;
}
