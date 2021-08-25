import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';

export class MsgInstantiateContract extends JSONSerializable<MsgInstantiateContract.Data> {
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

  public static fromData(
    data: MsgInstantiateContract.Data
  ): MsgInstantiateContract {
    const {
      value: { sender, admin, code_id, init_msg, init_coins },
    } = data;
    return new MsgInstantiateContract(
      sender,
      admin,
      Number.parseInt(code_id),
      init_msg,
      Coins.fromData(init_coins)
    );
  }

  public toData(): MsgInstantiateContract.Data {
    const { sender, admin, code_id, init_msg, init_coins } = this;
    return {
      type: 'wasm/MsgInstantiateContract',
      value: {
        sender,
        admin: admin || '',
        code_id: code_id.toFixed(),
        init_msg: removeNull(init_msg),
        init_coins: init_coins.toData(),
      },
    };
  }

  public static fromProto(
    data: MsgInstantiateContract.Proto
  ): MsgInstantiateContract {
    const { sender, admin, code_id, init_msg, init_coins } = data;
    return new MsgInstantiateContract(
      sender,
      admin,
      Number.parseInt(code_id),
      init_msg,
      Coins.fromData(init_coins)
    );
  }

  public toProto(): MsgInstantiateContract.Proto {
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
  export interface Data {
    type: 'wasm/MsgInstantiateContract';
    value: {
      sender: AccAddress;
      admin: AccAddress;
      code_id: string;
      init_msg: object;
      init_coins: Coins.Data;
    };
  }

  export interface Proto {
    '@type': '/terra.wasm.v1beta1.MsgInstantiateContract';
    sender: AccAddress;
    admin: AccAddress;
    code_id: string;
    init_msg: object;
    init_coins: Coins.Data;
  }
}
