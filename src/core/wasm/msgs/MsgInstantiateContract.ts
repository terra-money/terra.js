import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgInstantiateContract as MsgInstantiateContractProtoV1 } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgInstantiateContract as MsgInstantiateContractProtoV2 } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
import * as Long from 'long';

export class MsgInstantiateContract extends JSONSerializable<
  MsgInstantiateContract.Amino,
  MsgInstantiateContract.Data,
  MsgInstantiateContract.Proto
> {
  public funds: Coins;

  /**
   * @param sender a sender address
   * @param admin an optional contract admin address who can migrate the contract, put empty string to disable migration
   * @param code_id the reference to the stored WASM code
   * @param msg json encoded message to be passed to the contract on instantiation
   * @param funds coins that are transferred to the contract on instantiation
   * @param label optional metadata to be stored with a contract instance
   */
  constructor(
    public sender: AccAddress,
    public admin: AccAddress | undefined,
    public code_id: number,
    public msg: object | string,
    funds: Coins.Input = {},
    public label: string | undefined
  ) {
    super();
    this.funds = new Coins(funds);
  }

  public static fromAmino(d: MsgInstantiateContract.Amino) {
    return 'init_msg' in d.value
      ? new MsgInstantiateContract(
          d.value.sender,
          d.value.admin,
          Number.parseInt(d.value.code_id),
          d.value.init_msg,
          Coins.fromAmino(d.value.init_coins),
          undefined
        )
      : new MsgInstantiateContract(
          d.value.sender,
          d.value.admin,
          Number.parseInt(d.value.code_id),
          d.value.msg,
          Coins.fromAmino(d.value.funds),
          d.value.label
        );
  }

  public toAmino(): MsgInstantiateContract.AminoV2 {
    const { sender, admin, code_id, msg, funds, label } = this;
    return {
      type: 'wasm/MsgInstantiateContract',
      value: {
        sender,
        admin,
        code_id: code_id.toFixed(),
        label,
        msg: removeNull(msg),
        funds: funds.toAmino(),
      },
    };
  }

  public static fromData(data: MsgInstantiateContract.Data) {
    if (data['@type'] === '/cosmwasm.wasm.v1.MsgInstantiateContract') {
      const { sender, admin, code_id, label, msg, funds } = data;
      return new MsgInstantiateContract(
        sender,
        admin !== '' ? admin : undefined,
        Number.parseInt(code_id),
        msg,
        Coins.fromData(funds),
        label !== '' ? label : undefined
      );
    }
    const { sender, admin, code_id, init_msg, init_coins } = data;
    return new MsgInstantiateContract(
      sender,
      admin !== '' ? admin : undefined,
      Number.parseInt(code_id),
      init_msg,
      Coins.fromData(init_coins),
      undefined
    );
  }

  public toData(): MsgInstantiateContract.DataV2 {
    const { sender, admin, code_id, label, msg, funds } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract',
      sender,
      admin: admin || '',
      code_id: code_id.toFixed(),
      label: label || '',
      msg: removeNull(msg),
      funds: funds.toData(),
    };
  }

  public static fromProtoV1(proto: MsgInstantiateContractProtoV1) {
    return new MsgInstantiateContract(
      proto.sender,
      proto.admin !== '' ? proto.admin : undefined,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.initMsg).toString('utf-8')),
      Coins.fromProto(proto.initCoins),
      undefined
    );
  }

  public static fromProtoV2(proto: MsgInstantiateContractProtoV2) {
    return new MsgInstantiateContract(
      proto.sender,
      proto.admin !== '' ? proto.admin : undefined,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds),
      proto.label !== '' ? proto.label : undefined
    );
  }

  public toProto() {
    const { sender, admin, code_id, msg, funds, label } = this;
    return MsgInstantiateContractProtoV2.fromPartial({
      sender,
      admin,
      codeId: Long.fromNumber(code_id),
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
      funds: funds.toProto(),
      label,
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
      value: MsgInstantiateContractProtoV2.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return msgAny.typeUrl === '/cosmwasm.wasm.v1.MsgInstantiateContract'
      ? MsgInstantiateContract.fromProtoV2(
          MsgInstantiateContractProtoV2.decode(msgAny.value)
        )
      : MsgInstantiateContract.fromProtoV1(
          MsgInstantiateContractProtoV1.decode(msgAny.value)
        );
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
    | MsgInstantiateContractProtoV1
    | MsgInstantiateContractProtoV2;
}
