import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { CancelSoftwareUpgradeProposal as CancelSoftwareUpgradeProposal_pb } from '@terra-money/legacy.proto/cosmos/upgrade/v1beta1/upgrade';

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
    data: CancelSoftwareUpgradeProposal.Amino,
    _?: boolean
  ): CancelSoftwareUpgradeProposal {
    _;
    const {
      value: { title, description },
    } = data;
    return new CancelSoftwareUpgradeProposal(title, description);
  }

  public toAmino(isClassic?: boolean): CancelSoftwareUpgradeProposal.Amino {
    const { title, description } = this;
    return {
      type: isClassic
        ? 'upgrade/CancelSoftwareUpgradeProposal'
        : 'cosmos-sdk/CancelSoftwareUpgradeProposal',
      value: {
        title,
        description,
      },
    };
  }

  public static fromData(
    data: CancelSoftwareUpgradeProposal.Data,
    _?: boolean
  ): CancelSoftwareUpgradeProposal {
    _;
    const { title, description } = data;
    return new CancelSoftwareUpgradeProposal(title, description);
  }

  public toData(_?: boolean): CancelSoftwareUpgradeProposal.Data {
    _;
    const { title, description } = this;
    return {
      '@type': '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
      title,
      description,
    };
  }

  public static fromProto(
    proto: CancelSoftwareUpgradeProposal.Proto,
    _?: boolean
  ): CancelSoftwareUpgradeProposal {
    _;
    return new CancelSoftwareUpgradeProposal(proto.title, proto.description);
  }

  public toProto(_?: boolean): CancelSoftwareUpgradeProposal.Proto {
    _;
    const { title, description } = this;
    return CancelSoftwareUpgradeProposal_pb.fromPartial({
      title,
      description,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
      value: CancelSoftwareUpgradeProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): CancelSoftwareUpgradeProposal {
    return CancelSoftwareUpgradeProposal.fromProto(
      CancelSoftwareUpgradeProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace CancelSoftwareUpgradeProposal {
  export interface Amino {
    type:
      | 'upgrade/CancelSoftwareUpgradeProposal'
      | 'cosmos-sdk/CancelSoftwareUpgradeProposal';
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
