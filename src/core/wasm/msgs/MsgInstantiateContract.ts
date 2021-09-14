import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgInstantiateContract as MsgInstantiateContract_pb } from '@terra-money/terra.proto/terra/wasm/v1beta1/tx';
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
   */
  constructor(
    public sender: AccAddress,
    public admin: AccAddress | undefined,
    public code_id: number,
    public init_msg: object,
    init_coins: Coins.Input = {}
  ) {
    super();
    this.init_coins = new Coins(init_coins);
  }

  public static fromAmino(
    data: MsgInstantiateContract.Amino
  ): MsgInstantiateContract {
    const {
      value: { sender, admin, code_id, init_msg, init_coins },
    } = data;
    return new MsgInstantiateContract(
      sender,
      admin,
      Number.parseInt(code_id),
      init_msg,
      Coins.fromAmino(init_coins)
    );
  }

  public toAmino(): MsgInstantiateContract.Amino {
    const { sender, admin, code_id, init_msg, init_coins } = this;
    return {
      type: 'wasm/MsgInstantiateContract',
      value: {
        sender,
        admin: admin || '',
        code_id: code_id.toFixed(),
        init_msg: removeNull(init_msg),
        init_coins: init_coins.toAmino(),
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
      JSON.parse(atob(Buffer.from(proto.initMsg).toString('base64'))),
      Coins.fromProto(proto.initCoins)
    );
  }

  public toProto(): MsgInstantiateContract.Proto {
    const { sender, admin, code_id, init_msg, init_coins } = this;
    return MsgInstantiateContract_pb.fromPartial({
      admin,
      codeId: Long.fromNumber(code_id),
      initCoins: init_coins.toProto(),
      initMsg: Buffer.from(btoa(JSON.stringify(init_msg))),
      sender,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.wasm.v1beta1.MsgInstantiateContract',
      value: MsgInstantiateContract_pb.encode(this.toProto()).finish(),
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
    const { sender, admin, code_id, init_msg, init_coins } = data;
    return new MsgInstantiateContract(
      sender,
      admin !== '' ? admin : undefined,
      Number.parseInt(code_id),
      init_msg,
      Coins.fromData(init_coins)
    );
  }

  public toData(): MsgInstantiateContract.Data {
    const { sender, admin, code_id, init_msg, init_coins } = this;
    return {
      '@type': '/terra.wasm.v1beta1.MsgInstantiateContract',
      sender,
      admin: admin || '',
      code_id: code_id.toFixed(),
      init_msg: removeNull(init_msg),
      init_coins: init_coins.toData(),
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
      init_msg: object;
      init_coins: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/terra.wasm.v1beta1.MsgInstantiateContract';
    sender: AccAddress;
    admin: AccAddress;
    code_id: string;
    init_msg: object;
    init_coins: Coins.Data;
  }

  export type Proto = MsgInstantiateContract_pb;
}
