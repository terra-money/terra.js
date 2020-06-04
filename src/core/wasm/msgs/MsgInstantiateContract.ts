import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Coins } from '../../Coins';

export class MsgInstantiateContract extends JSONSerializable<
  MsgInstantiateContract.Data
> {
  /**
   * @param sender contract creator
   * @param code_id reference to the code on the blockchain
   * @param init_msg message to configure the initial state of the contract
   * @param init_coins initial amount of coins to be sent to the contract's address
   */
  constructor(
    public sender: AccAddress,
    public code_id: number,
    public init_msg: any,
    public init_coins: Coins
  ) {
    super();
  }

  public static fromData(
    data: MsgInstantiateContract.Data
  ): MsgInstantiateContract {
    const {
      value: { sender, code_id, init_msg, init_coins },
    } = data;
    return new MsgInstantiateContract(
      sender,
      Number.parseInt(code_id),
      JSON.parse(new Buffer(init_msg, 'base64').toString()),
      Coins.fromData(init_coins)
    );
  }

  public toData(): MsgInstantiateContract.Data {
    const { sender, code_id, init_msg, init_coins } = this;
    return {
      type: 'wasm/InstantiateContract',
      value: {
        sender,
        code_id: code_id.toFixed(),
        init_msg: new Buffer(JSON.stringify(init_msg)).toString('base64'),
        init_coins: init_coins.toData(),
      },
    };
  }
}

export namespace MsgInstantiateContract {
  export interface Data {
    type: 'wasm/InstantiateContract';
    value: {
      sender: AccAddress;
      code_id: string;
      init_msg: string;
      init_coins: Coins.Data;
    };
  }
}
