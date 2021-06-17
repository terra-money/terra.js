import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';

export class MsgUpdateContractOwner extends JSONSerializable<MsgUpdateContractOwner.Data> {
  /**
   * @param owner contract owner
   * @param new_owner new owner
   * @param contract contract address
   */
  constructor(
    public owner: AccAddress,
    public new_owner: AccAddress,
    public contract: AccAddress
  ) {
    super();
  }

  public static fromData(
    data: MsgUpdateContractOwner.Data
  ): MsgUpdateContractOwner {
    const {
      value: { owner, new_owner, contract },
    } = data;
    return new MsgUpdateContractOwner(owner, new_owner, contract);
  }

  public toData(): MsgUpdateContractOwner.Data {
    const { owner, new_owner, contract } = this;
    return {
      type: 'wasm/MsgUpdateContractOwner',
      value: {
        owner,
        new_owner,
        contract,
      },
    };
  }
}

export namespace MsgUpdateContractOwner {
  export interface Data {
    type: 'wasm/MsgUpdateContractOwner';
    value: {
      owner: AccAddress;
      new_owner: AccAddress;
      contract: AccAddress;
    };
  }
}
