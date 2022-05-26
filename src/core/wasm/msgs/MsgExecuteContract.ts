import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgExecuteContract as MsgExecuteContract_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
import { MsgExecuteContract as MsgExecuteContract_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

export class MsgExecuteContract extends JSONSerializable<
  MsgExecuteContract.Amino,
  MsgExecuteContract.Data,
  MsgExecuteContract.Proto
> {
  public coins: Coins;

  /**
   * @param sender contract user
   * @param contract contract address
   * @param execute_msg HandleMsg to pass as arguments for contract invocation
   * @param coins coins to be sent to contract
   */
  constructor(
    public sender: AccAddress,
    public contract: AccAddress,
    public execute_msg: object | string,
    coins: Coins.Input = {}
  ) {
    super();
    this.coins = new Coins(coins);
  }

  public static fromAmino(
    data: MsgExecuteContract.Amino,
    isClassic?: boolean
  ): MsgExecuteContract {
    if (isClassic) {
      const {
        value: { sender, contract, execute_msg, coins },
      } = data as MsgExecuteContract.AminoV1;
      return new MsgExecuteContract(
        sender,
        contract,
        execute_msg,
        Coins.fromAmino(coins)
      );
    } else {
      const {
        value: { sender, contract, msg, funds },
      } = data as MsgExecuteContract.AminoV2;
      return new MsgExecuteContract(
        sender,
        contract,
        msg,
        Coins.fromAmino(funds)
      );
    }
  }

  public toAmino(isClassic?: boolean): MsgExecuteContract.Amino {
    const { sender, contract, execute_msg, coins } = this;
    if (isClassic) {
      return {
        type: 'wasm/MsgExecuteContract',
        value: {
          sender,
          contract,
          execute_msg: removeNull(execute_msg),
          coins: coins.toAmino(),
        },
      };
    } else {
      return {
        type: 'wasm/MsgExecuteContract',
        value: {
          sender,
          contract,
          msg: removeNull(execute_msg),
          funds: coins.toAmino(),
        },
      };
    }
  }

  public static fromProto(
    proto: MsgExecuteContract.Proto,
    isClassic?: boolean
  ): MsgExecuteContract {
    if (isClassic) {
      const p = proto as MsgExecuteContract_legacy_pb;
      return new MsgExecuteContract(
        p.sender,
        p.contract,
        JSON.parse(Buffer.from(p.executeMsg).toString('utf-8')),
        Coins.fromProto(p.coins)
      );
    } else {
      const p = proto as MsgExecuteContract_pb;
      return new MsgExecuteContract(
        p.sender,
        p.contract,
        JSON.parse(Buffer.from(p.msg).toString('utf-8')),
        Coins.fromProto(p.funds)
      );
    }
  }

  public toProto(isClassic?: boolean): MsgExecuteContract.Proto {
    const { sender, contract, execute_msg, coins } = this;
    if (isClassic) {
      return MsgExecuteContract_legacy_pb.fromPartial({
        coins: coins.toProto(),
        contract,
        sender,
        executeMsg: Buffer.from(
          JSON.stringify(removeNull(execute_msg)),
          'utf-8'
        ),
      });
    } else {
      return MsgExecuteContract_pb.fromPartial({
        funds: coins.toProto(),
        contract,
        sender,
        msg: Buffer.from(JSON.stringify(removeNull(execute_msg)), 'utf-8'),
      });
    }
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      return Any.fromPartial({
        typeUrl: '/terra.wasm.v1beta1.MsgExecuteContract',
        value: MsgExecuteContract_legacy_pb.encode(
          this.toProto(isClassic) as MsgExecuteContract_legacy_pb
        ).finish(),
      });
    } else {
      return Any.fromPartial({
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: MsgExecuteContract_pb.encode(
          this.toProto(isClassic) as MsgExecuteContract_pb
        ).finish(),
      });
    }
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgExecuteContract {
    return MsgExecuteContract.fromProto(
      isClassic
        ? MsgExecuteContract_legacy_pb.decode(msgAny.value)
        : MsgExecuteContract_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgExecuteContract.Data,
    isClassic?: boolean
  ): MsgExecuteContract {
    if (isClassic) {
      const { sender, contract, execute_msg, coins } =
        data as MsgExecuteContract.DataV1;
      return new MsgExecuteContract(
        sender,
        contract,
        execute_msg,
        Coins.fromData(coins)
      );
    } else {
      const { sender, contract, msg, funds } =
        data as MsgExecuteContract.DataV2;
      return new MsgExecuteContract(
        sender,
        contract,
        msg,
        Coins.fromData(funds)
      );
    }
  }

  public toData(isClassic?: boolean): MsgExecuteContract.Data {
    const { sender, contract, execute_msg, coins } = this;
    if (isClassic) {
      return {
        '@type': '/terra.wasm.v1beta1.MsgExecuteContract',
        sender,
        contract,
        execute_msg,
        coins: coins.toData(),
      };
    } else {
      return {
        '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
        sender,
        contract,
        msg: execute_msg,
        funds: coins.toData(),
      };
    }
  }
}

export namespace MsgExecuteContract {
  export interface AminoV1 {
    type: 'wasm/MsgExecuteContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      execute_msg: object | string;
      coins: Coins.Amino;
    };
  }

  export interface AminoV2 {
    type: 'wasm/MsgExecuteContract';
    value: {
      sender: AccAddress;
      contract: AccAddress;
      msg: object | string;
      funds: Coins.Amino;
    };
  }

  export interface DataV1 {
    '@type': '/terra.wasm.v1beta1.MsgExecuteContract';
    sender: AccAddress;
    contract: AccAddress;
    execute_msg: object | string;
    coins: Coins.Data;
  }
  export interface DataV2 {
    '@type': '/cosmwasm.wasm.v1.MsgExecuteContract';
    sender: AccAddress;
    contract: AccAddress;
    msg: object | string;
    funds: Coins.Data;
  }

  export type Amino = AminoV1 | AminoV2;
  export type Data = DataV1 | DataV2;
  export type Proto = MsgExecuteContract_legacy_pb | MsgExecuteContract_pb;
}
