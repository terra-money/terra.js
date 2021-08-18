import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { b64ToDict, dictToB64 } from '../../../util/contract';
export class MsgMigrateContract extends JSONSerializable<MsgMigrateContract.Data> {
  /**
   * @param owner contract owner
   * @param contract contract address to be migrated from
   * @param new_code_id reference to the new code on the blockchain
   * @param migrate_msg JSON message to configure the migrate state of the contract
   */
  constructor(
    public owner: AccAddress | undefined,
    public contract: AccAddress,
    public new_code_id: number,
    public migrate_msg: object, // json object
    public admin: AccAddress | undefined
  ) {
    super();
  }

  public static fromData(data: MsgMigrateContract.Data): MsgMigrateContract {
    const {
      value: { owner, contract, new_code_id, migrate_msg, admin },
    } = data;
    return new MsgMigrateContract(
      owner,
      contract,
      Number.parseInt(new_code_id),
      b64ToDict(migrate_msg),
      admin
    );
  }

  public toData(): MsgMigrateContract.Data {
    const { owner, contract, new_code_id, migrate_msg, admin } = this;

    if (typeof admin !== 'undefined') {
      // for bombay
      return {
        type: 'wasm/MsgMigrateContract',
        value: {
          admin,
          contract,
          new_code_id: new_code_id.toFixed(),
          migrate_msg,
        },
      };
    }

    return {
      type: 'wasm/MsgMigrateContract',
      value: {
        owner,
        contract,
        new_code_id: new_code_id.toFixed(),
        migrate_msg: dictToB64(migrate_msg),
      },
    };
  }
}

export namespace MsgMigrateContract {
  export interface Data {
    type: 'wasm/MsgMigrateContract';
    value: {
      // For bombay compatibility owner and admin are optional. migrate msg can be string or object
      owner?: AccAddress;
      contract: AccAddress;
      new_code_id: string;
      migrate_msg: string | object;
      admin?: AccAddress;
    };
  }
}
