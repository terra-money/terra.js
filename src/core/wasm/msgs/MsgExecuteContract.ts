import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgExecuteContract as MsgExecuteContractProtoV1 } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgExecuteContract as MsgExecuteContractProtoV2 } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';

export class MsgExecuteContract extends JSONSerializable<
  MsgExecuteContract.Amino,
  MsgExecuteContract.Data,
  MsgExecuteContract.Proto
> {
  public funds: Coins;

  /**
   * @param sender the that actor that signed the messages
   * @param contract the address of the smart contract
   * @param msg json encoded message to be passed to the contract
   * @param funds coins that are transferred to the contract on execution
   */
  constructor(
    public sender: AccAddress,
    public contract: AccAddress,
    public msg: object | string,
    funds: Coins.Input = {}
  ) {
    super();
    this.funds = new Coins(funds);
  }

  public static fromAmino(d: MsgExecuteContract.Amino) {
    if ('execute_msg' in d.value) {
      return new MsgExecuteContract(
        d.value.sender,
        d.value.contract,
        d.value.execute_msg,
        Coins.fromAmino(d.value.coins)
      );
    }

    return new MsgExecuteContract(
      d.value.sender,
      d.value.contract,
      d.value.msg,
      Coins.fromAmino(d.value.funds)
    );
  }

  public toAmino(): MsgExecuteContract.AminoV2 {
    const { sender, contract, msg, funds } = this;
    return {
      type: 'wasm/MsgExecuteContract',
      value: {
        sender,
        contract,
        msg: removeNull(msg),
        funds: funds.toAmino(),
      },
    };
  }

  public static fromData(d: MsgExecuteContract.Data) {
    return d['@type'] === '/cosmwasm.wasm.v1.MsgExecuteContract'
      ? new MsgExecuteContract(
          d.sender,
          d.contract,
          d.msg,
          Coins.fromData(d.funds)
        )
      : new MsgExecuteContract(
          d.sender,
          d.contract,
          d.execute_msg,
          Coins.fromData(d.coins)
        );
  }

  public toData(): MsgExecuteContract.DataV2 {
    const { sender, contract, msg, funds } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
      sender,
      contract,
      msg,
      funds: funds.toData(),
    };
  }

  public static fromProtoV1(p: MsgExecuteContractProtoV1) {
    return new MsgExecuteContract(
      p.sender,
      p.contract,
      JSON.parse(Buffer.from(p.executeMsg).toString('utf-8')),
      Coins.fromProto(p.coins)
    );
  }

  public static fromProtoV2(p: MsgExecuteContractProtoV2) {
    return new MsgExecuteContract(
      p.sender,
      p.contract,
      JSON.parse(Buffer.from(p.msg).toString('utf-8')),
      Coins.fromProto(p.funds)
    );
  }

  public toProto() {
    const { sender, contract, msg, funds } = this;
    return MsgExecuteContractProtoV2.fromPartial({
      sender,
      contract,
      msg: Buffer.from(JSON.stringify(removeNull(msg)), 'utf-8'),
      funds: funds.toProto(),
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: MsgExecuteContractProtoV2.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return msgAny.typeUrl === '/cosmwasm.wasm.v1.MsgExecuteContract'
      ? MsgExecuteContract.fromProtoV2(
          MsgExecuteContractProtoV2.decode(msgAny.value)
        )
      : MsgExecuteContract.fromProtoV1(
          MsgExecuteContractProtoV1.decode(msgAny.value)
        );
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
  export type Proto = MsgExecuteContractProtoV1 | MsgExecuteContractProtoV2;
}
