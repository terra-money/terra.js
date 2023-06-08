import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgExecuteContract as MsgExecuteContract_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
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
    _?: boolean
  ): MsgExecuteContract {
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

  public toAmino(_?: boolean): MsgExecuteContract.Amino {
    const { sender, contract, execute_msg, coins } = this;
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

  public static fromProto(
    proto: MsgExecuteContract.Proto,
    _?: boolean
  ): MsgExecuteContract {
    const p = proto as MsgExecuteContract_pb;
    return new MsgExecuteContract(
      p.sender,
      p.contract,
      JSON.parse(Buffer.from(p.msg).toString('utf-8')),
      Coins.fromProto(p.funds)
    );
  }

  public toProto(_?: boolean): MsgExecuteContract.Proto {
    const { sender, contract, execute_msg, coins } = this;
    return MsgExecuteContract_pb.fromPartial({
      funds: coins.toProto(),
      contract,
      sender,
      msg: Buffer.from(JSON.stringify(removeNull(execute_msg)), 'utf-8'),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: MsgExecuteContract_pb.encode(
        this.toProto(isClassic) as MsgExecuteContract_pb
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgExecuteContract {
    return MsgExecuteContract.fromProto(
      MsgExecuteContract_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgExecuteContract.Data,
    _?: boolean
  ): MsgExecuteContract {
    const { sender, contract, msg, funds } = data as MsgExecuteContract.DataV2;
    return new MsgExecuteContract(sender, contract, msg, Coins.fromData(funds));
  }

  public toData(_?: boolean): MsgExecuteContract.Data {
    const { sender, contract, execute_msg, coins } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
      sender,
      contract,
      msg: execute_msg,
      funds: coins.toData(),
    };
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
