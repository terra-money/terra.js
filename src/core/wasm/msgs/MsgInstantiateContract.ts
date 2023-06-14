import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgInstantiateContract as MsgInstantiateContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
import * as Long from 'long';

export class MsgInstantiateContract extends JSONSerializable<
  MsgInstantiateContract.Amino,
  MsgInstantiateContract.Data,
  MsgInstantiateContract.Proto
> {
  public init_coins: Coins;

  /**
   * @param sender is a sender address
   * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
   * @param code_id is the reference to the stored WASM code
   * @param init_msg json encoded message to be passed to the contract on instantiation
   * @param init_coins are transferred to the contract on execution
   * @param label label for the contract. v2 supported only
   */
  constructor(
    public sender: AccAddress,
    public admin: AccAddress | undefined,
    public code_id: number,
    public init_msg: object | string,
    init_coins: Coins.Input = {},
    public label?: string
  ) {
    super();
    this.init_coins = new Coins(init_coins);
  }

  public static fromAmino(
    data: MsgInstantiateContract.Amino
  ): MsgInstantiateContract {
    const {
      value: { sender, admin, code_id, msg, funds, label },
    } = data;
    return new MsgInstantiateContract(
      sender,
      admin,
      Number.parseInt(code_id),
      msg,
      Coins.fromAmino(funds),
      label
    );
  }

  public toAmino(): MsgInstantiateContract.Amino {
    const { sender, admin, code_id, init_msg, init_coins, label } = this;
    return {
      type: 'wasm/MsgInstantiateContract',
      value: {
        sender,
        admin,
        code_id: code_id.toFixed(),
        label,
        msg: removeNull(init_msg),
        funds: init_coins.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgInstantiateContract.Proto
  ): MsgInstantiateContract {
    return new MsgInstantiateContract(
      proto.sender,
      proto.admin !== '' ? proto.admin : undefined,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds),
      proto.label !== '' ? proto.label : undefined
    );
  }

  public toProto(): MsgInstantiateContract.Proto {
    const { sender, admin, code_id, init_msg, init_coins, label } = this;
    return MsgInstantiateContract_pb.fromPartial({
      admin,
      codeId: Long.fromNumber(code_id),
      funds: init_coins.toProto(),
      msg: Buffer.from(JSON.stringify(init_msg), 'utf-8'),
      sender,
      label,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
      value: MsgInstantiateContract_pb.encode(
        this.toProto() as MsgInstantiateContract_pb
      ).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgInstantiateContract {
    return MsgInstantiateContract.fromProto(
      MsgInstantiateContract_pb.decode(msgAny.value)
    );
  }

  public static fromData(
    data: MsgInstantiateContract.Data
  ): MsgInstantiateContract {
    const { sender, admin, code_id, label, msg, funds } = data;
    return new MsgInstantiateContract(
      sender,
      admin !== '' ? admin : undefined,
      Number.parseInt(code_id),
      msg,
      Coins.fromData(funds),
      label
    );
  }

  public toData(): MsgInstantiateContract.Data {
    const { sender, admin, code_id, label, init_msg, init_coins } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract',
      sender,
      admin: admin || '',
      code_id: code_id.toFixed(),
      label,
      msg: removeNull(init_msg),
      funds: init_coins.toData(),
    };
  }
}

export namespace MsgInstantiateContract {
  export interface Amino {
    type: 'wasm/MsgInstantiateContract';
    value: {
      sender: AccAddress;
      admin?: AccAddress;
      code_id: string;
      label?: string;
      msg: object | string;
      funds: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract';
    sender: AccAddress;
    admin: AccAddress;
    code_id: string;
    label?: string;
    msg: object | string;
    funds: Coins.Data;
  }

  export type Proto = MsgInstantiateContract_pb;
}
