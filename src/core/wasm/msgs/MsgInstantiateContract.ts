import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgInstantiateContract as MsgInstantiateContract_pb } from '@terra-money/terra.proto/src/terra/wasm/v1beta1/tx_pb';

export class MsgInstantiateContract extends JSONSerializable<MsgInstantiateContract.Data> {
  public init_coins: Coins;

  /**
   * @param sender is a sender address
   * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
   * @param code_id is the reference to the stored WASM code
   * @param init_msg json encoded message to be passed to the contract on instantiation
   * @param init_coins are transferred to the contract on execution
   */
  constructor(
    public sender: AccAddress,
    public admin: AccAddress | undefined,
    public code_id: number,
    public init_msg: object,
    init_coins: Coins.Input = {}
  ) {
    super();
    this.init_coins = new Coins(init_coins);
  }

  public static fromData(
    data: MsgInstantiateContract.Data
  ): MsgInstantiateContract {
    const {
      value: { sender, admin, code_id, init_msg, init_coins },
    } = data;
    return new MsgInstantiateContract(
      sender,
      admin,
      Number.parseInt(code_id),
      init_msg,
      Coins.fromData(init_coins)
    );
  }

  public toData(): MsgInstantiateContract.Data {
    const { sender, admin, code_id, init_msg, init_coins } = this;
    return {
      type: 'wasm/MsgInstantiateContract',
      value: {
        sender,
        admin: admin || '',
        code_id: code_id.toFixed(),
        init_msg: removeNull(init_msg),
        init_coins: init_coins.toData(),
      },
    };
  }

  public static fromProto(
    proto: MsgInstantiateContract.Proto
  ): MsgInstantiateContract {
    return new MsgInstantiateContract(
      proto.getSender(),
      proto.getAdmin() !== '' ? proto.getAdmin() : undefined,
      proto.getCodeId(),
      JSON.parse(atob(proto.getInitMsg_asB64())),
      Coins.fromProto(proto.getInitCoinsList())
    );
  }

  public toProto(): MsgInstantiateContract.Proto {
    const { sender, admin, code_id, init_msg, init_coins } = this;
    const msgInstantiateContractProto = new MsgInstantiateContract_pb();
    msgInstantiateContractProto.setSender(sender);
    msgInstantiateContractProto.setAdmin(admin || '');
    msgInstantiateContractProto.setCodeId(code_id);
    msgInstantiateContractProto.setInitMsg(btoa(JSON.stringify(init_msg)));
    msgInstantiateContractProto.setInitCoinsList(init_coins.toProto());
    return msgInstantiateContractProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.wasm.v1beta1.MsgInstantiateContract');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgInstantiateContract {
    return MsgInstantiateContract.fromProto(
      MsgInstantiateContract_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgInstantiateContract {
  export interface Data {
    type: 'wasm/MsgInstantiateContract';
    value: {
      sender: AccAddress;
      admin: AccAddress;
      code_id: string;
      init_msg: object;
      init_coins: Coins.Data;
    };
  }

  export type Proto = MsgInstantiateContract_pb;
}
