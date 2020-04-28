import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { AccAddress } from '../../strings';

/**
 * If you have multiple senders and/or multiple recipients, you can use MsgMultiSend,
 * which can batch together the senders and recipients in one message to save on gas
 * fees.
 *
 * Specify the senders and recipients and their corresponding deposit contribution /
 * receiving amounts with [[MsgMultiSend.Input]] or [[MsgMultiSend.Output]].
 *
 * Example:
 *
 * ```ts
 * import { MsgMultiSend } from "@terra-money/terra.js";
 *
 * const inputs: MsgMultiSend.Input[] = [
 *    new MsgMultiSend.Input(
 *      'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
 *      {
 *        ukrw: 123123,
 *      })
 *    ),
 *    new MsgMultiSend.Input('terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad', [
 *      new Coin('uluna', 123123),
 *    ]),
 *  ];
 *   const outputs: MsgMultiSend.Output[] = [
 *    new MsgMultiSend.Output(
 *      'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
 *        {
 *          ukrw: 123123,
 *        }
 *    ),
 *    new MsgMultiSend.Output('terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfga',
 *      {
 *        uluna: 123123,
 *      }
 *    ),
 *  ];
 *  const multisend = new MsgMultiSend(inputs, outputs);
 * ```
 */
export class MsgMultiSend extends JSONSerializable<MsgMultiSend.Data> {
  /**
   * @param inputs inputs
   * @param outputs outputs
   */
  constructor(
    public inputs: MsgMultiSend.Input[],
    public outputs: MsgMultiSend.Output[]
  ) {
    super();
  }

  public static fromData(data: MsgMultiSend.Data): MsgMultiSend {
    const {
      value: { inputs, outputs },
    } = data;
    return new MsgMultiSend(
      inputs.map(i => MsgMultiSend.Input.fromData(i)),
      outputs.map(o => MsgMultiSend.Output.fromData(o))
    );
  }

  public toData(): MsgMultiSend.Data {
    const { inputs, outputs } = this;
    return {
      type: 'bank/MsgMultiSend',
      value: {
        inputs: inputs.map(i => i.toData()),
        outputs: outputs.map(o => o.toData()),
      },
    };
  }
}

export namespace MsgMultiSend {
  export interface Data {
    readonly type: 'bank/MsgMultiSend';
    value: {
      inputs: IO.Data[];
      outputs: IO.Data[];
    };
  }

  export class IO extends JSONSerializable<IO.Data> {
    /**
     * Value of the transaction
     */
    public coins: Coins;

    /**
     * @param address address
     * @param coinsInput coins-compatible input
     */
    constructor(public address: AccAddress, coinsInput: Coins.Input) {
      super();
      this.coins = new Coins(coinsInput);
    }

    public toData(): IO.Data {
      const { address, coins } = this;
      return {
        address,
        coins: coins.toData(),
      };
    }

    public static fromData(data: IO.Data): IO {
      const { address, coins } = data;
      return new IO(address, Coins.fromData(coins));
    }
  }

  export const Input = IO;
  export const Output = IO;
  export type Input = IO;
  export type Output = IO;

  export namespace IO {
    export interface Data {
      address: AccAddress;
      coins: Coins.Data;
    }
  }
}
