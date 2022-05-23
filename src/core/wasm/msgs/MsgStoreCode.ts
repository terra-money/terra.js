import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgStoreCode as MsgStoreCode_legacy_pb } from '@terra-money/legacy.proto/terra/wasm/v1beta1/tx';
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
  constructor(public sender: AccAddress, public wasm_byte_code: string, public instantiate_permission?: AccessConfig) {
    super();
  }

  public static fromAmino(data: MsgStoreCode.AminoV2 | MsgStoreCode.AminoV1, legacy?: boolean): MsgStoreCode {
    if (legacy) {
      const {
        value: { sender, wasm_byte_code },
      } = data as MsgStoreCode.AminoV1;
      return new MsgStoreCode(
        sender,
        wasm_byte_code,
      );
    } else {
      const {
        value: { sender, wasm_byte_code, instantiate_permission },
      } = data as MsgStoreCode.AminoV2;
      return new MsgStoreCode(
        sender,
        wasm_byte_code,
        instantiate_permission ? AccessConfig.fromAmino(instantiate_permission) : undefined
      );
    }
  }

  public toAmino(legacy?: boolean): MsgStoreCode.AminoV2 {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    if (legacy) {
      return {
        type: 'wasm/MsgStoreCode',
        value: {
          sender,
          wasm_byte_code,
        }
      };
    } else {
      return {
        type: 'wasm/MsgStoreCode',
        value: {
          sender,
          wasm_byte_code,
          instantiate_permission: instantiate_permission?.toAmino(),
        }
      };
    }
  }

  public static fromProto(proto: MsgStoreCode.Proto, legacy?: boolean): MsgStoreCode {
    if (legacy) {
      return new MsgStoreCode(
        proto.sender,
        Buffer.from(proto.wasmByteCode).toString('base64'),
      );
    } else {
      const p = proto as MsgStoreCode_pb;
      return new MsgStoreCode(
        p.sender,
        Buffer.from(p.wasmByteCode).toString('base64'),
        p.instantiatePermission ? AccessConfig.fromProto(p.instantiatePermission) : undefined
      );
    }
  }

  public toProto(legacy?: boolean): MsgStoreCode.Proto {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    if (legacy) {
      return MsgStoreCode_legacy_pb.fromPartial({
        sender,
        wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      });
    } else {
      return MsgStoreCode_pb.fromPartial({
        sender,
        wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
        instantiatePermission: instantiate_permission?.toProto(),
      })
    }
  }

  public packAny(legacy?: boolean): Any {
    let typeUrl: string;
    if (legacy) {
      typeUrl = '/terra.wasm.v1beta1.MsgStoreCode';
    } else {
      typeUrl = '/cosmwasm.wasm.v1.MsgStoreCode';
    }
    const any = Any.fromPartial({
      typeUrl,
      value: legacy ?
        MsgStoreCode_legacy_pb.encode(this.toProto(legacy)).finish() :
        MsgStoreCode_pb.encode(this.toProto(legacy)).finish(),
    });
    return any;
  }

  public static unpackAny(msgAny: Any, legacy?: boolean): MsgStoreCode {
    if (legacy) {
      return MsgStoreCode.fromProto(MsgStoreCode_legacy_pb.decode(msgAny.value), legacy);
    } else {
      return MsgStoreCode.fromProto(MsgStoreCode_pb.decode(msgAny.value), legacy);
    }
  }

  public static fromData(data: MsgStoreCode.DataV2 | MsgStoreCode.DataV1, legacy?: boolean): MsgStoreCode {
    if (legacy) {
      const { sender, wasm_byte_code } = data as MsgStoreCode.DataV1;
      return new MsgStoreCode(
        sender,
        wasm_byte_code
      );
    } else {
      const { sender, wasm_byte_code, instantiate_permission } = data as MsgStoreCode.DataV2;
      return new MsgStoreCode(
        sender,
        wasm_byte_code,
        instantiate_permission ? AccessConfig.fromData(instantiate_permission) : undefined
      );
    }
  }

  public toData(legacy?: boolean): MsgStoreCode.Data {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    if (legacy) {
      return {
        '@type': '/terra.wasm.v1beta1.MsgStoreCode',
        sender,
        wasm_byte_code,
      };
    } else {
      return {
        '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
        sender,
        wasm_byte_code,
        instantiate_permission: instantiate_permission?.toData(),
      };
    }
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
