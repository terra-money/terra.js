import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { InstantiateContractProposal as InstantiateContractProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import * as Long from 'long';

/**
 * InstantiateContractProposal gov proposal content type to instantiate a
 * contract.
 */
export class InstantiateContractProposal extends JSONSerializable<
  InstantiateContractProposal.Amino,
  InstantiateContractProposal.Data,
  InstantiateContractProposal.Proto
> {
  public init_coins: Coins;

  /**
   * @param title a short summary
   * @param description a human readable text
   * @param run_as is a run_as address
   * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
   * @param code_id is the reference to the stored WASM code
   * @param init_msg json encoded message to be passed to the contract on instantiation
   * @param init_coins are transferred to the contract on execution
   * @param label label for the contract. v2 supported only
   */
  constructor(
    public title: string,
    public description: string,
    public run_as: AccAddress,
    public admin: AccAddress | undefined,
    public code_id: number,
    public init_msg: object | string,
    init_coins: Coins.Input = {},
    public label: string
  ) {
    super();
    this.init_coins = new Coins(init_coins);
  }

  public static fromAmino(
    data: InstantiateContractProposal.Amino,
    isClassic?: boolean
  ): InstantiateContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { title, description, run_as, admin, code_id, msg, funds, label },
    } = data as InstantiateContractProposal.Amino;
    return new InstantiateContractProposal(
      title,
      description,
      run_as,
      admin,
      Number.parseInt(code_id),
      msg,
      Coins.fromAmino(funds),
      label
    );
  }

  public toAmino(isClassic?: boolean): InstantiateContractProposal.Amino {
    const {
      title,
      description,
      run_as,
      admin,
      code_id,
      init_msg,
      init_coins,
      label,
    } = this;
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return {
      type: 'wasm/InstantiateContractProposal',
      value: {
        title,
        description,
        run_as,
        admin,
        code_id: code_id.toFixed(),
        label,
        msg: removeNull(init_msg),
        funds: init_coins.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: InstantiateContractProposal.Proto,
    isClassic?: boolean
  ): InstantiateContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new InstantiateContractProposal(
      proto.title,
      proto.description,
      proto.runAs,
      proto.admin !== '' ? proto.admin : undefined,
      proto.codeId.toNumber(),
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds),
      proto.label
    );
  }

  public toProto(isClassic?: boolean): InstantiateContractProposal.Proto {
    const {
      title,
      description,
      run_as,
      admin,
      code_id,
      init_msg,
      init_coins,
      label,
    } = this;
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return InstantiateContractProposal_pb.fromPartial({
      title,
      description,
      runAs: run_as,
      admin,
      codeId: Long.fromNumber(code_id),
      funds: init_coins.toProto(),
      msg: Buffer.from(JSON.stringify(init_msg), 'utf-8'),
      label,
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.InstantiateContractProposal',
      value: InstantiateContractProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): InstantiateContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return InstantiateContractProposal.fromProto(
      InstantiateContractProposal_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: InstantiateContractProposal.Data,
    isClassic?: boolean
  ): InstantiateContractProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, run_as, admin, code_id, label, msg, funds } =
      data as InstantiateContractProposal.Data;
    return new InstantiateContractProposal(
      title,
      description,
      run_as,
      admin !== '' ? admin : undefined,
      Number.parseInt(code_id),
      msg,
      Coins.fromData(funds),
      label
    );
  }

  public toData(isClassic?: boolean): InstantiateContractProposal.Data {
    const {
      title,
      description,
      run_as,
      admin,
      code_id,
      label,
      init_msg,
      init_coins,
    } = this;
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return {
      '@type': '/cosmwasm.wasm.v1.InstantiateContractProposal',
      title,
      description,
      run_as,
      admin: admin || '',
      code_id: code_id.toFixed(),
      label,
      msg: removeNull(init_msg),
      funds: init_coins.toData(),
    };
  }
}

export namespace InstantiateContractProposal {
  export interface Amino {
    type: 'wasm/InstantiateContractProposal';
    value: {
      title: string;
      description: string;
      run_as: AccAddress;
      admin?: AccAddress;
      code_id: string;
      label: string;
      msg: object | string;
      funds: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.InstantiateContractProposal';
    title: string;
    description: string;
    run_as: AccAddress;
    admin: AccAddress;
    code_id: string;
    label: string;
    msg: object | string;
    funds: Coins.Data;
  }

  export type Proto = InstantiateContractProposal_pb;
}
