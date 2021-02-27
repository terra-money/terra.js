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
export declare class MsgMultiSend extends JSONSerializable<MsgMultiSend.Data> {
    inputs: MsgMultiSend.Input[];
    outputs: MsgMultiSend.Output[];
    /**
     * @param inputs inputs
     * @param outputs outputs
     */
    constructor(inputs: MsgMultiSend.Input[], outputs: MsgMultiSend.Output[]);
    static fromData(data: MsgMultiSend.Data): MsgMultiSend;
    toData(): MsgMultiSend.Data;
}
export declare namespace MsgMultiSend {
    interface Data {
        readonly type: 'bank/MsgMultiSend';
        value: {
            inputs: IO.Data[];
            outputs: IO.Data[];
        };
    }
    class IO extends JSONSerializable<IO.Data> {
        address: AccAddress;
        /**
         * Value of the transaction
         */
        coins: Coins;
        /**
         * @param address address
         * @param coinsInput coins-compatible input
         */
        constructor(address: AccAddress, coinsInput: Coins.Input);
        toData(): IO.Data;
        static fromData(data: IO.Data): IO;
    }
    const Input: typeof IO;
    const Output: typeof IO;
    type Input = IO;
    type Output = IO;
    namespace IO {
        interface Data {
            address: AccAddress;
            coins: Coins.Data;
        }
    }
}
