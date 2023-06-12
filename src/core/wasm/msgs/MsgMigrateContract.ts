import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateContract as MsgMigrateContract_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
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
    _?: boolean
  ): MsgMigrateContract {
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

  public toAmino(_?: boolean): MsgMigrateContract.Amino {
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

  public static fromProto(
    proto: MsgMigrateContract.Proto,
    _?: boolean
  ): MsgMigrateContract {
    const p = proto as MsgMigrateContract_pb;
    return new MsgMigrateContract(
      p.sender,
      p.contract,
      p.codeId.toNumber(),
      JSON.parse(Buffer.from(p.msg).toString('utf-8'))
    );
  }

  public toProto(_?: boolean): MsgMigrateContract.Proto {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return MsgMigrateContract_pb.fromPartial({
      sender: admin,
      contract,
      codeId: Long.fromNumber(new_code_id),
      msg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
    });
  }
  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
      value: MsgMigrateContract_pb.encode(
        this.toProto(isClassic) as MsgMigrateContract_pb
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgMigrateContract {
    return MsgMigrateContract.fromProto(
      MsgMigrateContract_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgMigrateContract.Data,
    _?: boolean
  ): MsgMigrateContract {
    const { sender, contract, code_id, msg } =
      data as MsgMigrateContract.DataV2;
    return new MsgMigrateContract(
      sender,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toData(_?: boolean): MsgMigrateContract.Data {
    const { admin, contract, new_code_id, migrate_msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
      sender: admin,
      contract,
      code_id: new_code_id.toFixed(),
      msg: removeNull(migrate_msg),
    };
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
