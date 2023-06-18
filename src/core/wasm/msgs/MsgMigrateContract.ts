import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMigrateContract as MsgMigrateContractProtoV1 } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgMigrateContract as MsgMigrateContractProtoV2 } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
import * as Long from 'long';

export class MsgMigrateContract extends JSONSerializable<
  MsgMigrateContract.Amino,
  MsgMigrateContract.Data,
  MsgMigrateContract.Proto
> {
  /**
   * @param sender the that actor that signed the messages
   * @param contract the address of the smart contract
   * @param code_id references the new WASM code
   * @param msg json encoded message to be passed to the contract on migration
   */
  constructor(
    public sender: AccAddress,
    public contract: AccAddress,
    public code_id: number,
    public msg: object | string // json object or string
  ) {
    super();
  }

  public static fromAmino(data: MsgMigrateContract.Amino) {
    if ('new_code_id' in data.value) {
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

    const {
      value: { sender, contract, code_id, msg },
    } = data;
    return new MsgMigrateContract(
      sender,
      contract,
      Number.parseInt(code_id),
      msg
    );
  }

  public toAmino(): MsgMigrateContract.AminoV2 {
    const { sender, contract, code_id, msg } = this;
    return {
      type: 'wasm/MsgMigrateContract',
      value: {
        sender,
        contract,
        code_id: code_id.toFixed(),
        msg: removeNull(msg),
      },
    };
  }

  public static fromData(d: MsgMigrateContract.Data) {
    return d['@type'] === '/cosmwasm.wasm.v1.MsgMigrateContract'
      ? new MsgMigrateContract(
          d.sender,
          d.contract,
          Number.parseInt(d.code_id),
          d.msg
        )
      : new MsgMigrateContract(
          d.admin,
          d.contract,
          Number.parseInt(d.new_code_id),
          d.migrate_msg
        );
  }

  public toData(): MsgMigrateContract.DataV2 {
    const { sender, contract, code_id, msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
      sender,
      contract,
      code_id: code_id.toFixed(),
      msg: removeNull(msg),
    };
  }

  public static fromProtoV1(p: MsgMigrateContractProtoV1): MsgMigrateContract {
    return new MsgMigrateContract(
      p.admin,
      p.contract,
      p.newCodeId.toNumber(),
      JSON.parse(Buffer.from(p.migrateMsg).toString('utf-8'))
    );
  }

  public static fromProtoV2(p: MsgMigrateContractProtoV2): MsgMigrateContract {
    return new MsgMigrateContract(
      p.sender,
      p.contract,
      p.codeId.toNumber(),
      JSON.parse(Buffer.from(p.msg).toString('utf-8'))
    );
  }

  public toProto() {
    const { sender, contract, code_id, msg } = this;
    return MsgMigrateContractProtoV2.fromPartial({
      sender,
      contract,
      codeId: Long.fromNumber(code_id),
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
      value: MsgMigrateContractProtoV2.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return msgAny.typeUrl === '/cosmwasm.wasm.v1.MsgMigrateContract'
      ? MsgMigrateContract.fromProtoV2(
          MsgMigrateContractProtoV2.decode(msgAny.value)
        )
      : MsgMigrateContract.fromProtoV1(
          MsgMigrateContractProtoV1.decode(msgAny.value)
        );
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
  export type Proto = MsgMigrateContractProtoV1 | MsgMigrateContractProtoV2;
}
