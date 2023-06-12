import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgInstantiateContract as MsgInstantiateContract_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
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
    data: MsgInstantiateContract.Amino,
    _?: boolean
  ): MsgInstantiateContract {
    const {
      value: { sender, admin, code_id, msg, funds, label },
    } = data as MsgInstantiateContract.AminoV2;
    return new MsgInstantiateContract(
      sender,
      admin,
      Number.parseInt(code_id),
      msg,
      Coins.fromAmino(funds),
      label
    );
  }

  public toAmino(_?: boolean): MsgInstantiateContract.Amino {
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
    proto: MsgInstantiateContract.Proto,
    _?: boolean
  ): MsgInstantiateContract {
    const p = proto as MsgInstantiateContract_pb;
    return new MsgInstantiateContract(
      p.sender,
      p.admin !== '' ? p.admin : undefined,
      p.codeId.toNumber(),
      JSON.parse(Buffer.from(p.msg).toString('utf-8')),
      Coins.fromProto(p.funds),
      p.label !== '' ? p.label : undefined
    );
  }

  public toProto(_?: boolean): MsgInstantiateContract.Proto {
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

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
      value: MsgInstantiateContract_pb.encode(
        this.toProto(isClassic) as MsgInstantiateContract_pb
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgInstantiateContract {
    return MsgInstantiateContract.fromProto(
      MsgInstantiateContract_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgInstantiateContract.Data,
    _?: boolean
  ): MsgInstantiateContract {
    const { sender, admin, code_id, label, msg, funds } =
      data as MsgInstantiateContract.DataV2;
    return new MsgInstantiateContract(
      sender,
      admin !== '' ? admin : undefined,
      Number.parseInt(code_id),
      msg,
      Coins.fromData(funds),
      label
    );
  }

  public toData(_?: boolean): MsgInstantiateContract.Data {
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
  export interface AminoV1 {
    type: 'wasm/MsgInstantiateContract';
    value: {
      sender: AccAddress;
      admin?: AccAddress;
      code_id: string;
      init_msg: object | string;
      init_coins: Coins.Amino;
    };
  }

  export interface AminoV2 {
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

  export interface DataV1 {
    '@type': '/terra.wasm.v1beta1.MsgInstantiateContract';
    sender: AccAddress;
    admin: AccAddress;
    code_id: string;
    init_msg: object | string;
    init_coins: Coins.Data;
  }

  export interface DataV2 {
    '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract';
    sender: AccAddress;
    admin: AccAddress;
    code_id: string;
    label?: string;
    msg: object | string;
    funds: Coins.Data;
  }

  export type Amino = AminoV1 | AminoV2;
  export type Data = DataV1 | DataV2;

  export type Proto =
    | MsgInstantiateContract_legacy_pb
    | MsgInstantiateContract_pb;
}
