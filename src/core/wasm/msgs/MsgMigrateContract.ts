import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateContract as MsgMigrateContract_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
import { MsgMigrateContract as MsgMigrateContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
import * as Long from 'long';

export class MsgMigrateContract extends JSONSerializable<
  MsgMigrateContract.Amino,
  MsgMigrateContract.Data,
  MsgMigrateContract.Proto
> {
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
    public migrate_msg: object | string // json object or string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgMigrateContract.Amino,
    isClassic?: boolean
  ): MsgMigrateContract {
    if (isClassic) {
      const {
        value: { admin, contract, new_code_id, migrate_msg },
      } = data as MsgMigrateContract.AminoV1;
      return new MsgMigrateContract(
        admin,
        contract,
        Number.parseInt(new_code_id),
        migrate_msg
      );
    } else {
      const {
        value: { sender, contract, code_id, msg },
      } = data as MsgMigrateContract.AminoV2;
      return new MsgMigrateContract(
        sender,
        contract,
        Number.parseInt(code_id),
        msg
      );
    }
  }

  public toAmino(isClassic?: boolean): MsgMigrateContract.Amino {
    if (isClassic) {
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
    } else {
      const { admin, contract, new_code_id, migrate_msg } = this;
      return {
        type: 'wasm/MsgMigrateContract',
        value: {
          sender: admin,
          contract,
          code_id: new_code_id.toFixed(),
          msg: removeNull(migrate_msg),
        },
      };
    }
  }

  public static fromProto(
    proto: MsgMigrateContract.Proto,
    isClassic?: boolean
  ): MsgMigrateContract {
    if (isClassic) {
      const p = proto as MsgMigrateContract_legacy_pb;
      return new MsgMigrateContract(
        p.admin,
        p.contract,
        p.newCodeId.toNumber(),
        JSON.parse(Buffer.from(p.migrateMsg).toString('utf-8'))
      );
    } else {
      const p = proto as MsgMigrateContract_pb;
      return new MsgMigrateContract(
        p.sender,
        p.contract,
        p.codeId.toNumber(),
        JSON.parse(Buffer.from(p.msg).toString('utf-8'))
      );
    }
  }

  public toProto(isClassic?: boolean): MsgMigrateContract.Proto {
    const { admin, contract, new_code_id, migrate_msg } = this;
    if (isClassic) {
      return MsgMigrateContract_legacy_pb.fromPartial({
        admin,
        contract,
        newCodeId: Long.fromNumber(new_code_id),
        migrateMsg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
      });
    } else {
      return MsgMigrateContract_pb.fromPartial({
        sender: admin,
        contract,
        codeId: Long.fromNumber(new_code_id),
        msg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
      });
    }
  }
  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      return Any.fromPartial({
        typeUrl: '/terra.wasm.v1beta1.MsgMigrateContract',
        value: MsgMigrateContract_legacy_pb.encode(
          this.toProto(isClassic) as MsgMigrateContract_legacy_pb
        ).finish(),
      });
    } else {
      return Any.fromPartial({
        typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
        value: MsgMigrateContract_pb.encode(
          this.toProto(isClassic) as MsgMigrateContract_pb
        ).finish(),
      });
    }
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgMigrateContract {
    return MsgMigrateContract.fromProto(
      isClassic
        ? MsgMigrateContract_legacy_pb.decode(msgAny.value)
        : MsgMigrateContract_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgMigrateContract.Data,
    isClassic?: boolean
  ): MsgMigrateContract {
    if (isClassic) {
      const { admin, contract, new_code_id, migrate_msg } =
        data as MsgMigrateContract.DataV1;
      return new MsgMigrateContract(
        admin,
        contract,
        Number.parseInt(new_code_id),
        migrate_msg
      );
    } else {
      const { sender, contract, code_id, msg } =
        data as MsgMigrateContract.DataV2;
      return new MsgMigrateContract(
        sender,
        contract,
        Number.parseInt(code_id),
        msg
      );
    }
  }

  public toData(isClassic?: boolean): MsgMigrateContract.Data {
    const { admin, contract, new_code_id, migrate_msg } = this;
    if (isClassic) {
      return {
        '@type': '/terra.wasm.v1beta1.MsgMigrateContract',
        admin,
        contract,
        new_code_id: new_code_id.toFixed(),
        migrate_msg: removeNull(migrate_msg),
      };
    } else {
      return {
        '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
        sender: admin,
        contract,
        code_id: new_code_id.toFixed(),
        msg: removeNull(migrate_msg),
      };
    }
  }
}

export namespace MsgMigrateContract {
  export interface AminoV1 {
    type: 'wasm/MsgMigrateContract';
    value: {
      admin: AccAddress;
      contract: AccAddress;
      new_code_id: string;
      migrate_msg: object | string;
    };
  }
  export interface AminoV2 {
    type: 'wasm/MsgMigrateContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      code_id: string;
      msg: object | string;
    };
  }

  export interface DataV1 {
    '@type': '/terra.wasm.v1beta1.MsgMigrateContract';
    admin: AccAddress;
    contract: AccAddress;
    new_code_id: string;
    migrate_msg: object | string;
  }

  export interface DataV2 {
    '@type': '/cosmwasm.wasm.v1.MsgMigrateContract';
    sender: AccAddress;
    contract: AccAddress;
    code_id: string;
    msg: object | string;
  }

  export type Amino = AminoV1 | AminoV2;
  export type Data = DataV1 | DataV2;
  export type Proto = MsgMigrateContract_legacy_pb | MsgMigrateContract_pb;
}
