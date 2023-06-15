import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { AddBurnTaxExemptionAddressProposal as AddBurnTaxExemptionAddressProposal_pb } from '@classic-terra/terra.proto/terra/treasury/v1beta1/gov';

/**
 * AddBurnTaxExemptionAddressProposal gov proposal content type to submit exemption address for burn tax
 */
export class AddBurnTaxExemptionAddressProposal extends JSONSerializable<
  AddBurnTaxExemptionAddressProposal.Amino,
  AddBurnTaxExemptionAddressProposal.Data,
  AddBurnTaxExemptionAddressProposal.Proto
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

  public static fromAmino(data: AddBurnTaxExemptionAddressProposal.Amino) {
    const {
      value: { title, description, addresses },
    } = data;
    return new AddBurnTaxExemptionAddressProposal(
      title,
      description,
      addresses
    );
  }

  public toAmino(): AddBurnTaxExemptionAddressProposal.Amino {
    const { title, description, addresses } = this;
    return {
      type: 'treasury/AddBurnTaxExemptionAddressProposal',
      value: {
        title,
        description,
        addresses,
      },
    };
  }

  public static fromData(data: AddBurnTaxExemptionAddressProposal.Data) {
    const { title, description, addresses } = data;
    return new AddBurnTaxExemptionAddressProposal(
      title,
      description,
      addresses
    );
  }

  public toData(): AddBurnTaxExemptionAddressProposal.Data {
    const { title, description, addresses } = this;
    return {
      '@type': '/terra.treasury.v1beta1.AddBurnTaxExemptionAddressProposal',
      title,
      description,
      addresses,
    };
  }

  public static fromProto(proto: AddBurnTaxExemptionAddressProposal.Proto) {
    return new AddBurnTaxExemptionAddressProposal(
      proto.title,
      proto.description,
      proto.addresses
    );
  }

  public toProto() {
    const { title, description, addresses } = this;
    return AddBurnTaxExemptionAddressProposal_pb.fromPartial({
      title,
      description,
      addresses: addresses ? addresses : undefined,
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/terra.treasury.v1beta1.AddBurnTaxExemptionAddressProposal',
      value: AddBurnTaxExemptionAddressProposal_pb.encode(
        this.toProto()
      ).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return AddBurnTaxExemptionAddressProposal.fromProto(
      AddBurnTaxExemptionAddressProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace AddBurnTaxExemptionAddressProposal {
  export interface Amino {
    type: 'treasury/AddBurnTaxExemptionAddressProposal';
    value: {
      title: string;
      description: string;
      addresses: string[];
    };
  }

  export interface Data {
    '@type': '/terra.treasury.v1beta1.AddBurnTaxExemptionAddressProposal';
    title: string;
    description: string;
    addresses: string[];
  }

  export type Proto = AddBurnTaxExemptionAddressProposal_pb;
}
