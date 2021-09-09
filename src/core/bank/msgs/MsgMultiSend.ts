import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgMultiSend as MsgMultiSend_pb } from '@terra-money/terra.proto/src/cosmos/bank/v1beta1/tx_pb';
import {
  Input as Input_pb,
  Output as Output_pb,
} from '@terra-money/terra.proto/src/cosmos/bank/v1beta1/bank_pb';

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

  public static fromProto(proto: MsgMultiSend.Proto): MsgMultiSend {
    return new MsgMultiSend(
      proto.getInputsList().map(i => MsgMultiSend.Input.fromProto(i)),
      proto.getOutputsList().map(o => MsgMultiSend.Output.fromProto(o))
    );
  }

  public toProto(): MsgMultiSend.Proto {
    const { inputs, outputs } = this;
    const msgMultiSendProto = new MsgMultiSend_pb();
    msgMultiSendProto.setInputsList(inputs.map(i => i.toProto()));
    msgMultiSendProto.setOutputsList(outputs.map(i => i.toProto()));
    return msgMultiSendProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.bank.v1beta1.MsgMultiSend');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgMultiSend {
    return MsgMultiSend.fromProto(
      MsgMultiSend_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgMultiSend {
  export interface Data {
    readonly type: 'bank/MsgMultiSend';
    value: {
      inputs: Input.Data[];
      outputs: Output.Data[];
    };
  }

  export type Proto = MsgMultiSend_pb;

  export class Input extends JSONSerializable<Input.Data> {
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

    public toData(): Input.Data {
      const { address, coins } = this;
      return {
        address,
        coins: coins.toData(),
      };
    }

    public static fromData(data: Input.Data): Input {
      const { address, coins } = data;
      return new Input(address, Coins.fromData(coins));
    }

    public toProto(): Input.Proto {
      const { address, coins } = this;
      const inputProto = new Input_pb();
      inputProto.setAddress(address);
      inputProto.setCoinsList(coins.toProto());
      return inputProto;
    }

    public static fromProto(proto: Input.Proto): Input {
      return new Input(
        proto.getAddress(),
        Coins.fromProto(proto.getCoinsList())
      );
    }
  }

  export class Output extends JSONSerializable<Output.Data> {
    /**
     * Value of the transaction
     */
    public coins: Coins;

    /**
     * @param address address
     * @param coinsOutput coins-compatible input
     */
    constructor(public address: AccAddress, coinsInput: Coins.Input) {
      super();
      this.coins = new Coins(coinsInput);
    }

    public toData(): Output.Data {
      const { address, coins } = this;
      return {
        address,
        coins: coins.toData(),
      };
    }

    public static fromData(data: Output.Data): Output {
      const { address, coins } = data;
      return new Output(address, Coins.fromData(coins));
    }

    public toProto(): Output.Proto {
      const { address, coins } = this;
      const inputProto = new Output_pb();
      inputProto.setAddress(address);
      inputProto.setCoinsList(coins.toProto());
      return inputProto;
    }

    public static fromProto(proto: Output.Proto): Output {
      return new Output(
        proto.getAddress(),
        Coins.fromProto(proto.getCoinsList())
      );
    }
  }

  export namespace Input {
    export interface Data {
      address: AccAddress;
      coins: Coins.Data;
    }

    export type Proto = Input_pb;
  }

  export namespace Output {
    export interface Data {
      address: AccAddress;
      coins: Coins.Data;
    }

    export type Proto = Output_pb;
  }
}
