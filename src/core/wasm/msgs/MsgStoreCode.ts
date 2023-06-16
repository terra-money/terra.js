import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
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
   * @param instantiate_permission access control to apply on contract creation, optional
   */
  constructor(
    public sender: AccAddress,
    public wasm_byte_code: string,
    public instantiate_permission?: AccessConfig
  ) {
    super();
  }

  public static fromAmino(data: MsgStoreCode.Amino): MsgStoreCode {
    const {
      value: { sender, wasm_byte_code, instantiate_permission },
    } = data;
    return new MsgStoreCode(
      sender,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromAmino(instantiate_permission)
        : undefined
    );
  }

  public toAmino(): MsgStoreCode.Amino {
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

  public static fromProto(proto: MsgStoreCode.Proto): MsgStoreCode {
    const p = proto as MsgStoreCode_pb;
    return new MsgStoreCode(
      p.sender,
      Buffer.from(p.wasmByteCode).toString('base64'),
      p.instantiatePermission
        ? AccessConfig.fromProto(p.instantiatePermission)
        : undefined
    );
  }

  public toProto(): MsgStoreCode.Proto {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return MsgStoreCode_pb.fromPartial({
      sender,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      instantiatePermission: instantiate_permission?.toProto(),
    });
  }

  public packAny(): Any {
    const any = Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgStoreCode',
      value: MsgStoreCode_pb.encode(this.toProto()).finish(),
    });
    return any;
  }

  public static unpackAny(msgAny: Any): MsgStoreCode {
    return MsgStoreCode.fromProto(MsgStoreCode_pb.decode(msgAny.value));
  }

  public static fromData(data: MsgStoreCode.Data): MsgStoreCode {
    const { sender, wasm_byte_code, instantiate_permission } = data;
    return new MsgStoreCode(
      sender,
      wasm_byte_code,
      instantiate_permission
        ? AccessConfig.fromData(instantiate_permission)
        : undefined
    );
  }

  public toData(): MsgStoreCode.Data {
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
  export interface Amino {
    type: 'wasm/MsgStoreCode';
    value: {
      sender: AccAddress;
      wasm_byte_code: string;
      instantiate_permission?: AccessConfig.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.MsgStoreCode';
    sender: AccAddress;
    wasm_byte_code: string;
    instantiate_permission?: AccessConfig.Data;
  }
  export type Proto = MsgStoreCode_pb;
}
