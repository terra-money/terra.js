import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { RemoveBurnTaxExemptionAddressProposal as RemoveBurnTaxExemptionAddressProposal_pb } from '@classic-terra/terra.proto/terra/treasury/v1beta1/gov';

/**
 * RemoveBurnTaxExemptionAddressProposal gov proposal content type to remove exemption address for burn tax
 */
export class RemoveBurnTaxExemptionAddressProposal extends JSONSerializable<
  RemoveBurnTaxExemptionAddressProposal.Amino,
  RemoveBurnTaxExemptionAddressProposal.Data,
  RemoveBurnTaxExemptionAddressProposal.Proto
> {
  /**
   * @param title a short summary
   * @param description a human readable text
   * @param addresses the address that are exempt
   */
  constructor(
    public title: string,
    public description: string,
    public addresses: string[]
  ) {
    super();
  }

  public static fromAmino(
    data: RemoveBurnTaxExemptionAddressProposal.Amino,
    isClassic?: boolean
  ): RemoveBurnTaxExemptionAddressProposal {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { title, description, addresses },
    } = data;
    return new RemoveBurnTaxExemptionAddressProposal(
      title,
      description,
      addresses
    );
  }

  public toAmino(
    isClassic?: boolean
  ): RemoveBurnTaxExemptionAddressProposal.Amino {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, addresses } = this;
    return {
      type: 'treasury/RemoveBurnTaxExemptionAddressProposal',
      value: {
        title,
        description,
        addresses,
      },
    };
  }

  public static fromData(
    data: RemoveBurnTaxExemptionAddressProposal.Data,
    isClassic?: boolean
  ): RemoveBurnTaxExemptionAddressProposal {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, addresses } = data;
    return new RemoveBurnTaxExemptionAddressProposal(
      title,
      description,
      addresses
    );
  }

  public toData(
    isClassic?: boolean
  ): RemoveBurnTaxExemptionAddressProposal.Data {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, addresses } = this;
    return {
      '@type': '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal',
      title,
      description,
      addresses,
    };
  }

  public static fromProto(
    proto: RemoveBurnTaxExemptionAddressProposal.Proto,
    isClassic?: boolean
  ): RemoveBurnTaxExemptionAddressProposal {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return new RemoveBurnTaxExemptionAddressProposal(
      proto.title,
      proto.description,
      proto.addresses
    );
  }

  public toProto(
    isClassic?: boolean
  ): RemoveBurnTaxExemptionAddressProposal.Proto {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, addresses } = this;
    return RemoveBurnTaxExemptionAddressProposal_pb.fromPartial({
      title,
      description,
      addresses,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal',
      value: RemoveBurnTaxExemptionAddressProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): RemoveBurnTaxExemptionAddressProposal {
    if (!isClassic) {
      throw new Error('Not supported for the network');
    }
    return RemoveBurnTaxExemptionAddressProposal.fromProto(
      RemoveBurnTaxExemptionAddressProposal_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace RemoveBurnTaxExemptionAddressProposal {
  export interface Amino {
    type: 'treasury/RemoveBurnTaxExemptionAddressProposal';
    value: {
      title: string;
      description: string;
      addresses: string[];
    };
  }

  export interface Data {
    '@type': '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal';
    title: string;
    description: string;
    addresses: string[];
  }

  export type Proto = RemoveBurnTaxExemptionAddressProposal_pb;
}
