import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgInstantiateContract2 as MsgInstantiateContract2_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
import * as Long from 'long';

/**
 * MsgInstantiateContract2 create a new smart contract instance for the given
 * code id with a predicable address.
 */
export class MsgInstantiateContract2 extends JSONSerializable<
  MsgInstantiateContract2.Amino,
  MsgInstantiateContract2.Data,
  MsgInstantiateContract2.Proto
> {
  public funds: Coins;

  /**
   * @param sender the that actor that signed the messages
   * @param admin an optional address that can execute migrations
   * @param code_id the reference to the stored WASM code
   * @param label optional metadata to be stored with a contract instance
   * @param msg json encoded message to be passed to the contract on instantiation
   * @param funds coins that are transferred to the contract on instantiation
   * @param salt an arbitrary value provided by the sender. Size can be 1 to 64.
   * @param fix_msg include the msg value into the hash for the predictable address. default is false
   */
  constructor(
    public sender: AccAddress,
    public admin: AccAddress | undefined,
    public code_id: number,
    public msg: object | string,
    funds: Coins.Input = {},
    public label: string | undefined,
    public salt: string,
    public fix_msg: boolean = false
  ) {
    super();
    this.funds = new Coins(funds);
  }

  public static fromAmino(data: MsgInstantiateContract2.Amino) {
    const {
      value: { sender, admin, code_id, msg, funds, label, salt, fix_msg },
    } = data;
    return new MsgInstantiateContract2(
      sender,
      admin,
      Number.parseInt(code_id),
      msg,
      Coins.fromAmino(funds),
      label,
      salt,
      fix_msg
    );
  }

  public toAmino(): MsgInstantiateContract2.Amino {
    const { sender, admin, code_id, msg, funds, label, salt, fix_msg } = this;
    return {
      type: 'wasm/MsgInstantiateContract2',
      value: {
        sender,
        admin,
        code_id: code_id.toFixed(),
        label,
        msg: removeNull(msg),
        funds: funds.toAmino(),
        salt,
        fix_msg,
      },
    };
  }

  public static fromProto(proto: MsgInstantiateContract2.Proto) {
    return new MsgInstantiateContract2(
      proto.sender,
      proto.admin !== '' ? proto.admin : undefined,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds),
      proto.label !== '' ? proto.label : undefined,
      Buffer.from(proto.salt).toString('base64'),
      proto.fixMsg
    );
  }

  public toProto(): MsgInstantiateContract2.Proto {
    const { sender, admin, code_id, msg, funds, label, salt, fix_msg } = this;
    return MsgInstantiateContract2_pb.fromPartial({
      sender,
      admin,
      codeId: Long.fromNumber(code_id),
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
      funds: funds.toProto(),
      label,
      salt: Buffer.from(salt, 'base64'),
      fixMsg: fix_msg,
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
      value: MsgInstantiateContract2_pb.encode(
        this.toProto() as MsgInstantiateContract2_pb
      ).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return MsgInstantiateContract2.fromProto(
      MsgInstantiateContract2_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: MsgInstantiateContract2.Data) {
    const { sender, admin, code_id, label, msg, funds, salt, fix_msg } = data;
    return new MsgInstantiateContract2(
      sender,
      admin !== '' ? admin : undefined,
      Number.parseInt(code_id),
      msg,
      Coins.fromData(funds),
      label !== '' ? label : undefined,
      salt,
      fix_msg
    );
  }

  public toData(): MsgInstantiateContract2.Data {
    const { sender, admin, code_id, label, msg, funds, salt, fix_msg } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract2',
      sender,
      admin: admin || '',
      code_id: code_id.toFixed(),
      label: label || '',
      msg: removeNull(msg),
      funds: funds.toData(),
      salt,
      fix_msg,
    };
  }
}

export namespace MsgInstantiateContract2 {
  export interface Amino {
    type: 'wasm/MsgInstantiateContract2';
    value: {
      sender: AccAddress;
      admin?: AccAddress;
      code_id: string;
      label?: string;
      msg: object | string;
      funds: Coins.Amino;
      salt: string;
      fix_msg: boolean;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract2';
    sender: AccAddress;
    admin?: AccAddress;
    code_id: string;
    label?: string;
    msg: object | string;
    funds: Coins.Data;
    salt: string;
    fix_msg: boolean;
  }

  export type Proto = MsgInstantiateContract2_pb;
}
