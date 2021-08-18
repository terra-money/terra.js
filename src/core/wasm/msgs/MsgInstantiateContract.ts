import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { b64ToDict, dictToB64 } from '../../../util/contract';

export class MsgInstantiateContract extends JSONSerializable<MsgInstantiateContract.Data> {
  public init_coins: Coins;

  /**
   * @param owner contract owner
   * @param code_id reference to the code on the blockchain
   * @param init_msg message to configure the initial state of the contract
   * @param init_coins initial amount of coins to be sent to the contract's address
   * @param migratable defines to be migratable or not
   */
  constructor(
    public owner: AccAddress | undefined,
    public code_id: number,
    public init_msg: object,
    init_coins: Coins.Input = {},
    public migratable: boolean = false,
    public sender: string | undefined,
    public admin: string | undefined
  ) {
    super();
    this.init_coins = new Coins(init_coins);
  }

  public static fromData(
    data: MsgInstantiateContract.Data
  ): MsgInstantiateContract {
    const {
      value: {
        owner,
        code_id,
        init_msg,
        init_coins,
        migratable,
        sender,
        admin,
      },
    } = data;

    return new MsgInstantiateContract(
      owner,
      Number.parseInt(code_id),
      b64ToDict(init_msg),
      Coins.fromData(init_coins),
      migratable,
      sender,
      admin
    );
  }

  public toData(): MsgInstantiateContract.Data {
    const { owner, code_id, init_msg, init_coins, migratable, sender, admin } =
      this;

    if (typeof sender !== 'undefined') {
      // for bombay
      return {
        type: 'wasm/MsgInstantiateContract',
        value: {
          sender,
          admin,
          code_id: code_id.toFixed(),
          init_msg,
          init_coins: init_coins.toData(),
        },
      };
    }

    return {
      type: 'wasm/MsgInstantiateContract',
      value: {
        owner,
        code_id: code_id.toFixed(),
        init_msg: dictToB64(init_msg),
        init_coins: init_coins.toData(),
        migratable,
      },
    };
  }
}

export namespace MsgInstantiateContract {
  export interface Data {
    type: 'wasm/MsgInstantiateContract';
    value: {
      // For bombay compatibility, owner and migratable are optional. sender and admin are for bombay only
      owner?: AccAddress;
      code_id: string;
      init_msg: string | object;
      init_coins: Coins.Data;
      migratable?: boolean;
      sender?: AccAddress;
      admin?: AccAddress;
    };
  }
}
