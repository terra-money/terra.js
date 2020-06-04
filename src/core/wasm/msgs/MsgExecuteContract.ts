import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Coins } from '../../Coins';

export class MsgExecuteContract extends JSONSerializable<
  MsgExecuteContract.Data
> {
  /**
   * @param sender contract user
   * @param contract contract address
   * @param msg HandleMsg to pass as arguments for contract invocation
   * @param coins coins to be sent to contract
   */
  constructor(
    public sender: AccAddress,
    public contract: AccAddress,
    public msg: any,
    public coins: Coins
  ) {
    super();
  }

  public static fromData(data: MsgExecuteContract.Data): MsgExecuteContract {
    const {
      value: { sender, contract, msg, coins },
    } = data;
    return new MsgExecuteContract(
      sender,
      contract,
      JSON.parse(new Buffer(msg, 'base64').toString()),
      Coins.fromData(coins)
    );
  }

  public toData(): MsgExecuteContract.Data {
    const { sender, contract, msg, coins } = this;
    return {
      type: 'wasm/ExecuteContract',
      value: {
        sender,
        contract,
        msg: new Buffer(JSON.stringify(msg)).toString('base64'),
        coins: coins.toData(),
      },
    };
  }
}

export namespace MsgExecuteContract {
  export interface Data {
    type: 'wasm/ExecuteContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      msg: string;
      coins: Coins.Data;
    };
  }
}
