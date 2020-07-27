import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Coins } from '../../Coins';

export class MsgInstantiateContract extends JSONSerializable<
  MsgInstantiateContract.Data
> {
  public init_coins: Coins;

  /**
   * @param owner contract owner
   * @param code_id reference to the code on the blockchain
   * @param init_msg message to configure the initial state of the contract
   * @param init_coins initial amount of coins to be sent to the contract's address
   * @param migratable defines to be migratable or not
   */
  constructor(
    public owner: AccAddress,
    public code_id: number,
    public init_msg: object,
    init_coins: Coins.Input,
    public migratable: boolean
  ) {
    super();
    this.init_coins = new Coins(init_coins);
  }

  public static fromData(
    data: MsgInstantiateContract.Data
  ): MsgInstantiateContract {
    const {
      value: { owner, code_id, init_msg, init_coins, migratable },
    } = data;
    return new MsgInstantiateContract(
      owner,
      Number.parseInt(code_id),
      JSON.parse(Buffer.from(init_msg, 'base64').toString()),
      Coins.fromData(init_coins),
      migratable
    );
  }

  public toData(): MsgInstantiateContract.Data {
    const { owner, code_id, init_msg, init_coins, migratable } = this;
    return {
      type: 'wasm/MsgInstantiateContract',
      value: {
        owner,
        code_id: code_id.toFixed(),
        init_msg: Buffer.from(JSON.stringify(init_msg)).toString('base64'),
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
      owner: AccAddress;
      code_id: string;
      init_msg: string;
      init_coins: Coins.Data;
      migratable: boolean;
    };
  }
}
