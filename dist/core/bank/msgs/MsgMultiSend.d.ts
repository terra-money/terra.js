import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgMultiSend as MsgMultiSend_pb } from '@terra-money/terra.proto/cosmos/bank/v1beta1/tx';
import { Input as Input_pb, Output as Output_pb } from '@terra-money/terra.proto/cosmos/bank/v1beta1/bank';
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
export declare class MsgMultiSend extends JSONSerializable<MsgMultiSend.Amino, MsgMultiSend.Data, MsgMultiSend.Proto> {
    inputs: MsgMultiSend.Input[];
    outputs: MsgMultiSend.Output[];
    /**
     * @param inputs inputs
     * @param outputs outputs
     */
    constructor(inputs: MsgMultiSend.Input[], outputs: MsgMultiSend.Output[]);
    static fromAmino(data: MsgMultiSend.Amino, _?: boolean): MsgMultiSend;
    toAmino(isClassic?: boolean): MsgMultiSend.Amino;
    static fromData(data: MsgMultiSend.Data, _?: boolean): MsgMultiSend;
    toData(_?: boolean): MsgMultiSend.Data;
    static fromProto(proto: MsgMultiSend.Proto, _?: boolean): MsgMultiSend;
    toProto(_?: boolean): MsgMultiSend.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgMultiSend;
}
export declare namespace MsgMultiSend {
    interface Amino {
        readonly type: 'bank/MsgMultiSend' | 'cosmos-sdk/MsgMultiSend';
        value: {
            inputs: Input.Amino[];
            outputs: Output.Amino[];
        };
    }
    interface Data {
        '@type': '/cosmos.bank.v1beta1.MsgMultiSend';
        inputs: Input.Data[];
        outputs: Output.Data[];
    }
    type Proto = MsgMultiSend_pb;
    class Input extends JSONSerializable<Input.Amino, Input.Data, Input.Proto> {
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
        toAmino(_?: boolean): Input.Amino;
        static fromAmino(data: Input.Amino, _?: boolean): Input;
        toData(_?: boolean): Input.Data;
        static fromData(data: Input.Data, _?: boolean): Input;
        toProto(_?: boolean): Input.Proto;
        static fromProto(proto: Input.Proto, _?: boolean): Input;
    }
    class Output extends JSONSerializable<Output.Amino, Output.Data, Output.Proto> {
        address: AccAddress;
        /**
         * Value of the transaction
         */
        coins: Coins;
        /**
         * @param address address
         * @param coinsOutput coins-compatible input
         */
        constructor(address: AccAddress, coinsInput: Coins.Input);
        toAmino(_?: boolean): Output.Amino;
        static fromAmino(data: Output.Amino, _?: boolean): Output;
        toData(_?: boolean): Output.Data;
        static fromData(data: Output.Data, _?: boolean): Output;
        toProto(_?: boolean): Output.Proto;
        static fromProto(proto: Output.Proto, _?: boolean): Output;
    }
    namespace Input {
        interface Amino {
            address: AccAddress;
            coins: Coins.Amino;
        }
        interface Data {
            address: AccAddress;
            coins: Coins.Data;
        }
        type Proto = Input_pb;
    }
    namespace Output {
        interface Amino {
            address: AccAddress;
            coins: Coins.Amino;
        }
        interface Data {
            address: AccAddress;
            coins: Coins.Data;
        }
        type Proto = Output_pb;
    }
}
