import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
// there's no difference between two protos
//import { MsgMultiSend as MsgMultiSend_legacy_pb } from '@terra-money/legacy.proto/cosmos/bank/v1beta1/tx';
import { MsgMultiSend as MsgMultiSend_pb } from '@terra-money/terra.proto/cosmos/bank/v1beta1/tx';
import {
  Input as Input_pb,
  Output as Output_pb,
} from '@terra-money/terra.proto/cosmos/bank/v1beta1/bank';

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
export class MsgMultiSend extends JSONSerializable<
  MsgMultiSend.Amino,
  MsgMultiSend.Data,
  MsgMultiSend.Proto
> {
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

  public static fromAmino(data: MsgMultiSend.Amino, _?: boolean): MsgMultiSend {
    _;
    const {
      value: { inputs, outputs },
    } = data;
    return new MsgMultiSend(
      inputs.map(i => MsgMultiSend.Input.fromAmino(i)),
      outputs.map(o => MsgMultiSend.Output.fromAmino(o))
    );
  }

  public toAmino(isClassic?: boolean): MsgMultiSend.Amino {
    const { inputs, outputs } = this;
    return {
      type: isClassic ? 'bank/MsgMultiSend' : 'cosmos-sdk/MsgMultiSend',
      value: {
        inputs: inputs.map(i => i.toAmino()),
        outputs: outputs.map(o => o.toAmino()),
      },
    };
  }

  public static fromData(data: MsgMultiSend.Data, _?: boolean): MsgMultiSend {
    _;
    const { inputs, outputs } = data;
    return new MsgMultiSend(
      inputs.map(i => MsgMultiSend.Input.fromData(i)),
      outputs.map(o => MsgMultiSend.Output.fromData(o))
    );
  }

  public toData(_?: boolean): MsgMultiSend.Data {
    _;
    const { inputs, outputs } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.MsgMultiSend',
      inputs: inputs.map(i => i.toData()),
      outputs: outputs.map(o => o.toData()),
    };
  }

  public static fromProto(
    proto: MsgMultiSend.Proto,
    _?: boolean
  ): MsgMultiSend {
    _;
    return new MsgMultiSend(
      proto.inputs.map(i => MsgMultiSend.Input.fromProto(i)),
      proto.outputs.map(o => MsgMultiSend.Output.fromProto(o))
    );
  }

  public toProto(_?: boolean): MsgMultiSend.Proto {
    _;
    const { inputs, outputs } = this;
    return MsgMultiSend_pb.fromPartial({
      inputs: inputs.map(i => i.toProto()),
      outputs: outputs.map(i => i.toProto()),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
      value: MsgMultiSend_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgMultiSend {
    return MsgMultiSend.fromProto(
      MsgMultiSend_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgMultiSend {
  export interface Amino {
    readonly type: 'bank/MsgMultiSend' | 'cosmos-sdk/MsgMultiSend';
    value: {
      inputs: Input.Amino[];
      outputs: Output.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.MsgMultiSend';
    inputs: Input.Data[];
    outputs: Output.Data[];
  }

  export type Proto = MsgMultiSend_pb;

  export class Input extends JSONSerializable<
    Input.Amino,
    Input.Data,
    Input.Proto
  > {
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

    public toAmino(_?: boolean): Input.Amino {
      _;
      const { address, coins } = this;
      return {
        address,
        coins: coins.toAmino(),
      };
    }

    public static fromAmino(data: Input.Amino, _?: boolean): Input {
      _;
      const { address, coins } = data;
      return new Input(address, Coins.fromAmino(coins));
    }

    public toData(_?: boolean): Input.Data {
      _;
      const { address, coins } = this;
      return {
        address,
        coins: coins.toData(),
      };
    }

    public static fromData(data: Input.Data, _?: boolean): Input {
      _;
      const { address, coins } = data;
      return new Input(address, Coins.fromData(coins));
    }

    public toProto(_?: boolean): Input.Proto {
      _;
      const { address, coins } = this;
      return Input_pb.fromPartial({
        address,
        coins: coins.toProto(),
      });
    }

    public static fromProto(proto: Input.Proto, _?: boolean): Input {
      _;
      return new Input(proto.address, Coins.fromProto(proto.coins));
    }
  }

  export class Output extends JSONSerializable<
    Output.Amino,
    Output.Data,
    Output.Proto
  > {
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

    public toAmino(_?: boolean): Output.Amino {
      _;
      const { address, coins } = this;
      return {
        address,
        coins: coins.toAmino(),
      };
    }

    public static fromAmino(data: Output.Amino, _?: boolean): Output {
      _;
      const { address, coins } = data;
      return new Output(address, Coins.fromAmino(coins));
    }

    public toData(_?: boolean): Output.Data {
      _;
      const { address, coins } = this;
      return {
        address,
        coins: coins.toData(),
      };
    }

    public static fromData(data: Output.Data, _?: boolean): Output {
      _;
      const { address, coins } = data;
      return new Output(address, Coins.fromData(coins));
    }

    public toProto(_?: boolean): Output.Proto {
      _;
      const { address, coins } = this;
      return Output_pb.fromPartial({
        address,
        coins: coins.toProto(),
      });
    }

    public static fromProto(proto: Output.Proto, _?: boolean): Output {
      _;
      return new Output(proto.address, Coins.fromProto(proto.coins));
    }
  }

  export namespace Input {
    export interface Amino {
      address: AccAddress;
      coins: Coins.Amino;
    }

    export interface Data {
      address: AccAddress;
      coins: Coins.Data;
    }

    export type Proto = Input_pb;
  }

  export namespace Output {
    export interface Amino {
      address: AccAddress;
      coins: Coins.Amino;
    }

    export interface Data {
      address: AccAddress;
      coins: Coins.Data;
    }

    export type Proto = Output_pb;
  }
}
