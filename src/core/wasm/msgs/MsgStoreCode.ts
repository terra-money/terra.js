import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgStoreCode as MsgStoreCode_legacy_pb } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgStoreCode as MsgStoreCode_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
import { AccessConfig } from '../AccessConfig';

export class MsgStoreCode extends JSONSerializable<
  MsgStoreCode.Amino,
  MsgStoreCode.Data,
  MsgStoreCode.Proto
> {
  /**
   * @param sender code creator
   * @param wasm_byte_code base64-encoded bytecode contents
   * @param instantiate_permission  InstantiatePermission access control to apply on contract creation, optional. v2 supported only
   */
  constructor(
    public sender: AccAddress,
    public wasm_byte_code: string,
    public instantiate_permission?: AccessConfig
  ) {
    super();
  }

  public static fromAmino(
    data: MsgStoreCode.AminoV2 | MsgStoreCode.AminoV1,
    _?: boolean
  ): MsgStoreCode {
    const {
      value: { sender, wasm_byte_code, instantiate_permission },
    } = data as MsgStoreCode.AminoV2;
    return new MsgStoreCode(
      sender,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromAmino(instantiate_permission)
        : undefined
    );
  }

  public toAmino(_?: boolean): MsgStoreCode.AminoV2 {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return {
      type: 'wasm/MsgStoreCode',
      value: {
        sender,
        wasm_byte_code,
        instantiate_permission: instantiate_permission?.toAmino(),
      },
    };
  }

  public static fromProto(
    proto: MsgStoreCode.Proto,
    _?: boolean
  ): MsgStoreCode {
    const p = proto as MsgStoreCode_pb;
    return new MsgStoreCode(
      p.sender,
      Buffer.from(p.wasmByteCode).toString('base64'),
      p.instantiatePermission
        ? AccessConfig.fromProto(p.instantiatePermission)
        : undefined
    );
  }

  public toProto(_?: boolean): MsgStoreCode.Proto {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return MsgStoreCode_pb.fromPartial({
      sender,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      instantiatePermission: instantiate_permission?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    const any = Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgStoreCode',
      value: MsgStoreCode_pb.encode(this.toProto(isClassic)).finish(),
    });
    return any;
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgStoreCode {
    return MsgStoreCode.fromProto(
      MsgStoreCode_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: MsgStoreCode.DataV2 | MsgStoreCode.DataV1,
    _?: boolean
  ): MsgStoreCode {
    const { sender, wasm_byte_code, instantiate_permission } =
      data as MsgStoreCode.DataV2;
    return new MsgStoreCode(
      sender,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromData(instantiate_permission)
        : undefined
    );
  }

  public toData(_?: boolean): MsgStoreCode.Data {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
      sender,
      wasm_byte_code,
      instantiate_permission: instantiate_permission?.toData(),
    };
  }
}

export namespace MsgStoreCode {
  export interface AminoV1 {
    type: 'wasm/MsgStoreCode';
    value: {
      sender: AccAddress;
      wasm_byte_code: string;
    };
  }

  export interface AminoV2 {
    type: 'wasm/MsgStoreCode';
    value: {
      sender: AccAddress;
      wasm_byte_code: string;
      instantiate_permission?: AccessConfig.Amino;
    };
  }
  export type Amino = AminoV1 | AminoV2;

  export interface DataV1 {
    '@type': '/terra.wasm.v1beta1.MsgStoreCode';
    sender: AccAddress;
    wasm_byte_code: string;
  }

  export interface DataV2 {
    '@type': '/cosmwasm.wasm.v1.MsgStoreCode';
    sender: AccAddress;
    wasm_byte_code: string;
    instantiate_permission?: AccessConfig.Data;
  }
  export type Data = DataV1 | DataV2;

  export type Proto = MsgStoreCode_legacy_pb | MsgStoreCode_pb;
}
