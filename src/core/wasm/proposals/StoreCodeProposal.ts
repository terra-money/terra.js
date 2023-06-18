import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { StoreCodeProposal as StoreCodeProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import { AccessConfig } from '../AccessConfig';

/**
 * StoreCodeProposal gov proposal content type to submit WASM code to the system
 */
export class StoreCodeProposal extends JSONSerializable<
  StoreCodeProposal.Amino,
  StoreCodeProposal.Data,
  StoreCodeProposal.Proto
> {
  /**
   * @param title a short summary
   * @param description a human readable text
   * @param run_as the address that is passed to the contract's environment as sender
   * @param wasm_byte_code can be raw or gzip compressed
   * @param instantiate_permission to apply on contract creation, optional
   * @param unpin_code code on upload, optional
   * @param source the URL where the code is hosted
   * @param builder the docker image used to build the code deterministically, used for smart contract verification
   * @param code_hash the SHA256 sum of the code outputted by builder, used for smart contract verification
   */
  constructor(
    public title: string,
    public description: string,
    public run_as: string,
    public wasm_byte_code: string,
    public instantiate_permission: AccessConfig | undefined,
    public unpin_code: boolean = false,
    public source: string,
    public builder: string,
    public code_hash: string
  ) {
    super();
  }

  public static fromAmino(data: StoreCodeProposal.Amino): StoreCodeProposal {
    const {
      value: {
        title,
        description,
        run_as,
        wasm_byte_code,
        instantiate_permission,
        unpin_code,
        source,
        builder,
        code_hash,
      },
    } = data;
    return new StoreCodeProposal(
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromAmino(instantiate_permission)
        : undefined,
      unpin_code,
      source,
      builder,
      code_hash
    );
  }

  public toAmino(): StoreCodeProposal.Amino {
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      source,
      builder,
      code_hash,
    } = this;
    return {
      type: 'wasm/StoreCodeProposal',
      value: {
        title,
        description,
        run_as,
        wasm_byte_code,
        instantiate_permission: instantiate_permission?.toAmino(),
        unpin_code,
        source,
        builder,
        code_hash,
      },
    };
  }

  public static fromData(data: StoreCodeProposal.Data): StoreCodeProposal {
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      source,
      builder,
      code_hash,
    } = data;
    return new StoreCodeProposal(
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromData(instantiate_permission)
        : undefined,
      unpin_code,
      source,
      builder,
      code_hash
    );
  }

  public toData(): StoreCodeProposal.Data {
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      source,
      builder,
      code_hash,
    } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.StoreCodeProposal',
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission: instantiate_permission?.toData(),
      unpin_code,
      source,
      builder,
      code_hash,
    };
  }

  public static fromProto(proto: StoreCodeProposal.Proto): StoreCodeProposal {
    return new StoreCodeProposal(
      proto.title,
      proto.description,
      proto.runAs,
      Buffer.from(proto.wasmByteCode).toString('base64'),
      proto.instantiatePermission
        ? AccessConfig.fromProto(proto.instantiatePermission)
        : undefined,
      proto.unpinCode,
      proto.source,
      proto.builder,
      Buffer.from(proto.codeHash).toString('base64')
    );
  }

  public toProto(): StoreCodeProposal.Proto {
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
      unpin_code,
      source,
      builder,
      code_hash,
    } = this;
    return StoreCodeProposal_pb.fromPartial({
      title,
      description,
      runAs: run_as,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      instantiatePermission: instantiate_permission?.toProto(),
      unpinCode: unpin_code,
      source,
      builder,
      codeHash: Buffer.from(code_hash, 'base64'),
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.StoreCodeProposal',
      value: StoreCodeProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return StoreCodeProposal.fromProto(
      StoreCodeProposal_pb.decode(msgAny.value)
    );
  }
}

export namespace StoreCodeProposal {
  export interface Amino {
    type: 'wasm/StoreCodeProposal';
    value: {
      title: string;
      description: string;
      run_as: AccAddress;
      wasm_byte_code: string;
      instantiate_permission?: AccessConfig.Amino;
      unpin_code?: boolean;
      source: string;
      builder: string;
      code_hash: string;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.StoreCodeProposal';
    title: string;
    description: string;
    run_as: AccAddress;
    wasm_byte_code: string;
    instantiate_permission?: AccessConfig.Data;
    unpin_code?: boolean;
    source: string;
    builder: string;
    code_hash: string;
  }

  export type Proto = StoreCodeProposal_pb;
}
