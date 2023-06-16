import { JSONSerializable, removeNull } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { StoreAndInstantiateContractProposal as StoreAndInstantiateContractProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import { AccessConfig } from '../AccessConfig';

/**
 * StoreAndInstantiateContractProposal gov proposal content type to store
 * and instantiate the contract.
 */
export class StoreAndInstantiateContractProposal extends JSONSerializable<
  StoreAndInstantiateContractProposal.Amino,
  StoreAndInstantiateContractProposal.Data,
  StoreAndInstantiateContractProposal.Proto
> {
  public funds: Coins;

  /**
   * @param title a short summary
   * @param description a human readable text
   * @param run_as is a run_as address
   * @param wasm_byte_code can be raw or gzip compressed
   * @param instantiate_permission to apply on contract creation, optional
   * @param unpin_code code on upload, optional
   * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
   * @param label label is optional metadata to be stored with a constract instance.
   * @param msg json encoded message to be passed to the contract on instantiation
   * @param funds are transferred to the contract on execution
   * @param source the URL where the code is hosted
   * @param builder the docker image used to build the code deterministically, used for smart contract verification
   * @param code_hash the SHA256 sum of the code outputted by builder, used for smart contract verification
   */
  constructor(
    public title: string,
    public description: string,
    public run_as: AccAddress,
    public wasm_byte_code: string,
    public instantiate_permission: AccessConfig | undefined,
    public unpin_code: boolean = false,
    public admin: AccAddress | undefined,
    public label: string | undefined,
    public msg: object | string,
    funds: Coins.Input = {},
    public source: string,
    public builder: string,
    public code_hash: string
  ) {
    super();
    this.funds = new Coins(funds);
  }

  public static fromAmino(data: StoreAndInstantiateContractProposal.Amino) {
    const {
      value: {
        title,
        description,
        run_as,
        wasm_byte_code,
        instantiate_permission,
        unpin_code,
        admin,
        label,
        msg,
        funds,
        source,
        builder,
        code_hash,
      },
    } = data;
    return new StoreAndInstantiateContractProposal(
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromAmino(instantiate_permission)
        : undefined,
      unpin_code,
      admin,
      label,
      msg,
      Coins.fromAmino(funds),
      source,
      builder,
      code_hash
    );
  }

  public toAmino(): StoreAndInstantiateContractProposal.Amino {
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      admin,
      label,
      msg,
      funds,
      source,
      builder,
      code_hash,
    } = this;
    return {
      type: 'wasm/StoreAndInstantiateContractProposal',
      value: {
        title,
        description,
        run_as,
        wasm_byte_code,
        instantiate_permission: instantiate_permission?.toAmino(),
        unpin_code,
        admin,
        label,
        msg: removeNull(msg),
        funds: funds.toAmino(),
        source,
        builder,
        code_hash,
      },
    };
  }

  public static fromData(data: StoreAndInstantiateContractProposal.Data) {
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      admin,
      label,
      msg,
      funds,
      source,
      builder,
      code_hash,
    } = data;
    return new StoreAndInstantiateContractProposal(
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromData(instantiate_permission)
        : undefined,
      unpin_code,
      admin,
      label,
      msg,
      Coins.fromData(funds),
      source,
      builder,
      code_hash
    );
  }

  public toData(): StoreAndInstantiateContractProposal.Data {
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      admin,
      label,
      msg,
      funds,
      source,
      builder,
      code_hash,
    } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.StoreAndInstantiateContractProposal',
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission: instantiate_permission?.toData(),
      unpin_code,
      admin,
      label,
      msg: removeNull(msg),
      funds: funds.toData(),
      source,
      builder,
      code_hash,
    };
  }

  public static fromProto(proto: StoreAndInstantiateContractProposal.Proto) {
    return new StoreAndInstantiateContractProposal(
      proto.title,
      proto.description,
      proto.runAs,
      Buffer.from(proto.wasmByteCode).toString('base64'),
      proto.instantiatePermission
        ? AccessConfig.fromProto(proto.instantiatePermission)
        : undefined,
      proto.unpinCode,
      proto.admin,
      proto.label,
      JSON.parse(Buffer.from(proto.msg).toString('utf-8')),
      Coins.fromProto(proto.funds),
      proto.source,
      proto.builder,
      Buffer.from(proto.codeHash).toString('base64')
    );
  }

  public toProto(): StoreAndInstantiateContractProposal.Proto {
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      admin,
      label,
      msg,
      funds,
      source,
      builder,
      code_hash,
    } = this;
    return StoreAndInstantiateContractProposal_pb.fromPartial({
      title,
      description,
      runAs: run_as,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      instantiatePermission: instantiate_permission?.toProto(),
      unpinCode: unpin_code,
      admin,
      label,
      msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
      funds: funds.toProto(),
      source,
      builder,
      codeHash: Buffer.from(code_hash, 'base64'),
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.StoreAndInstantiateContractProposal',
      value: StoreAndInstantiateContractProposal_pb.encode(
        this.toProto()
      ).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return StoreAndInstantiateContractProposal.fromProto(
      StoreAndInstantiateContractProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace StoreAndInstantiateContractProposal {
  export interface Amino {
    type: 'wasm/StoreAndInstantiateContractProposal';
    value: {
      title: string;
      description: string;
      run_as: AccAddress;
      wasm_byte_code: string;
      instantiate_permission?: AccessConfig.Amino;
      unpin_code?: boolean;
      admin?: AccAddress;
      label?: string;
      msg: object | string;
      funds: Coins.Amino;
      source: string;
      builder: string;
      code_hash: string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.StoreAndInstantiateContractProposal';
    title: string;
    description: string;
    run_as: AccAddress;
    wasm_byte_code: string;
    instantiate_permission?: AccessConfig.Data;
    unpin_code?: boolean;
    admin?: AccAddress;
    label?: string;
    msg: object | string;
    funds: Coins.Data;
    source: string;
    builder: string;
    code_hash: string;
  }

  export type Proto = StoreAndInstantiateContractProposal_pb;
}
