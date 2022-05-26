import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
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
   */
  constructor(
    public title: string,
    public description: string,
    public run_as: string,
    public wasm_byte_code: string,
    public instantiate_permission?: AccessConfig
  ) {
    super();
  }

  public static fromAmino(
    data: StoreCodeProposal.Amino,
    isClassic?: boolean
  ): StoreCodeProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: {
        title,
        description,
        run_as,
        wasm_byte_code,
        instantiate_permission,
      },
    } = data;
    return new StoreCodeProposal(
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromAmino(instantiate_permission)
        : undefined
    );
  }

  public toAmino(isClassic?: boolean): StoreCodeProposal.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
    } = this;
    return {
      type: 'wasm/StoreCodeProposal',
      value: {
        title,
        description,
        run_as,
        wasm_byte_code,
        instantiate_permission: instantiate_permission?.toAmino(),
      },
    };
  }

  public static fromData(
    data: StoreCodeProposal.Data,
    isClassic?: boolean
  ): StoreCodeProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
    } = data;
    return new StoreCodeProposal(
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromData(instantiate_permission)
        : undefined
    );
  }

  public toData(isClassic?: boolean): StoreCodeProposal.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
    } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.StoreCodeProposal',
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission: instantiate_permission?.toData(),
    };
  }

  public static fromProto(
    proto: StoreCodeProposal.Proto,
    isClassic?: boolean
  ): StoreCodeProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new StoreCodeProposal(
      proto.title,
      proto.description,
      proto.runAs,
      Buffer.from(proto.wasmByteCode).toString('base64'),
      proto.instantiatePermission
        ? AccessConfig.fromProto(proto.instantiatePermission)
        : undefined
    );
  }

  public toProto(isClassic?: boolean): StoreCodeProposal.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      title,
      description,
      run_as,
      wasm_byte_code,
      instantiate_permission,
    } = this;
    return StoreCodeProposal_pb.fromPartial({
      title,
      description,
      runAs: run_as,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      instantiatePermission: instantiate_permission?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.StoreCodeProposal',
      value: StoreCodeProposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): StoreCodeProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return StoreCodeProposal.fromProto(
      StoreCodeProposal_pb.decode(msgAny.value),
      isClassic
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
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.StoreCodeProposal';
    title: string;
    description: string;
    run_as: AccAddress;
    wasm_byte_code: string;
    instantiate_permission?: AccessConfig.Data;
  }

  export type Proto = StoreCodeProposal_pb;
}
