import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';

export class MsgUpdateContractAdmin extends JSONSerializable<MsgUpdateContractAdmin.Data> {
  /**
   * @param admin contract admin
   * @param new_admin new admin
   * @param contract contract address
   */
  constructor(
    public admin: AccAddress,
    public new_admin: AccAddress,
    public contract: AccAddress
  ) {
    super();
  }

  public static fromData(
    data: MsgUpdateContractAdmin.Data
  ): MsgUpdateContractAdmin {
    const {
      value: { admin, new_admin, contract },
    } = data;
    return new MsgUpdateContractAdmin(admin, new_admin, contract);
  }

  public toData(): MsgUpdateContractAdmin.Data {
    const { admin, new_admin, contract } = this;
    return {
      type: 'wasm/MsgUpdateContractAdmin',
      value: {
        admin,
        new_admin,
        contract,
      },
    };
  }

  public static fromProto(
    data: MsgUpdateContractAdmin.Proto
  ): MsgUpdateContractAdmin {
    const { admin, new_admin, contract } = data;
    return new MsgUpdateContractAdmin(admin, new_admin, contract);
  }

  public toProto(): MsgUpdateContractAdmin.Proto {
    const { admin, new_admin, contract } = this;
    return {
      '@type': '/terra.wasm.v1beta1.MsgUpdateContractAdmin',
      admin,
      new_admin,
      contract,
    };
  }
}

export namespace MsgUpdateContractAdmin {
  export interface Data {
    type: 'wasm/MsgUpdateContractAdmin';
    value: {
      admin: AccAddress;
      new_admin: AccAddress;
      contract: AccAddress;
    };
  }

  export interface Proto {
    '@type': '/terra.wasm.v1beta1.MsgUpdateContractAdmin';
    admin: AccAddress;
    new_admin: AccAddress;
    contract: AccAddress;
  }
}
