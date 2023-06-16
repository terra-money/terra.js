import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { ClearAdminProposal as ClearAdminProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';

/**
 * ClearAdminProposal gov proposal content type to clear the admin of a
 * contract.
 */
export class ClearAdminProposal extends JSONSerializable<
  ClearAdminProposal.Amino,
  ClearAdminProposal.Data,
  ClearAdminProposal.Proto
> {
  /**
   * @param title a short summary
   * @param description a human readable text
   * @param contract the address of the smart contract
   */
  constructor(
    public title: string,
    public description: string,
    public contract: AccAddress
  ) {
    super();
  }

  public static fromAmino(data: ClearAdminProposal.Amino) {
    const {
      value: { title, description, contract },
    } = data;
    return new ClearAdminProposal(title, description, contract);
  }

  public toAmino(): ClearAdminProposal.Amino {
    const { title, description, contract } = this;
    return {
      type: 'wasm/ClearAdminProposal',
      value: {
        title,
        description,
        contract,
      },
    };
  }

  public static fromProto(proto: ClearAdminProposal.Proto) {
    return new ClearAdminProposal(
      proto.title,
      proto.description,
      proto.contract
    );
  }

  public toProto(): ClearAdminProposal.Proto {
    const { title, description, contract } = this;
    return ClearAdminProposal_pb.fromPartial({
      title,
      description,
      contract,
    });
  }
  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.ClearAdminProposal',
      value: ClearAdminProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return ClearAdminProposal.fromProto(
      ClearAdminProposal_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: ClearAdminProposal.Data) {
    const { title, description, contract } = data;
    return new ClearAdminProposal(title, description, contract);
  }

  public toData(): ClearAdminProposal.Data {
    const { title, description, contract } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.ClearAdminProposal',
      title,
      description,
      contract,
    };
  }
}

export namespace ClearAdminProposal {
  export interface Amino {
    type: 'wasm/ClearAdminProposal';
    value: {
      title: string;
      description: string;
      contract: AccAddress;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.ClearAdminProposal';
    title: string;
    description: string;
    contract: AccAddress;
  }

  export type Proto = ClearAdminProposal_pb;
}
