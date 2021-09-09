import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgMigrateContract as MsgMigrateContract_pb } from '@terra-money/terra.proto/src/terra/wasm/v1beta1/tx_pb';

export class MsgMigrateContract extends JSONSerializable<MsgMigrateContract.Data> {
  /**
   * @param admin contract admin
   * @param contract contract address to be migrated from
   * @param new_code_id reference to the new code on the blockchain
   * @param migrate_msg JSON message to configure the migrate state of the contract
   */
  constructor(
    public admin: AccAddress,
    public contract: AccAddress,
    public new_code_id: number,
    public migrate_msg: object // json object
  ) {
    super();
  }

  public static fromData(data: MsgMigrateContract.Data): MsgMigrateContract {
    const {
      value: { admin, contract, new_code_id, migrate_msg },
    } = data;
    return new MsgMigrateContract(
      admin,
      contract,
      Number.parseInt(new_code_id),
      migrate_msg
    );
  }

  public toData(): MsgMigrateContract.Data {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return {
      type: 'wasm/MsgMigrateContract',
      value: {
        admin,
        contract,
        new_code_id: new_code_id.toFixed(),
        migrate_msg: removeNull(migrate_msg),
      },
    };
  }

  public static fromProto(proto: MsgMigrateContract.Proto): MsgMigrateContract {
    return new MsgMigrateContract(
      proto.getAdmin(),
      proto.getContract(),
      proto.getNewCodeId(),
      JSON.parse(atob(proto.getMigrateMsg_asB64()))
    );
  }

  public toProto(): MsgMigrateContract.Proto {
    const { admin, contract, new_code_id, migrate_msg } = this;
    const msgMigrateContractProto = new MsgMigrateContract_pb();
    msgMigrateContractProto.setAdmin(admin);
    msgMigrateContractProto.setContract(contract);
    msgMigrateContractProto.setNewCodeId(new_code_id);
    msgMigrateContractProto.setMigrateMsg(btoa(JSON.stringify(migrate_msg)));
    return msgMigrateContractProto;
  }
  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.wasm.v1beta1.MsgMigrateContract');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgMigrateContract {
    return MsgMigrateContract.fromProto(
      MsgMigrateContract_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgMigrateContract {
  export interface Data {
    type: 'wasm/MsgMigrateContract';
    value: {
      admin: AccAddress;
      contract: AccAddress;
      new_code_id: string;
      migrate_msg: object;
    };
  }

  export type Proto = MsgMigrateContract_pb;
}
