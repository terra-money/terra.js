import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgStoreCode as MsgStoreCodeProtoV1 } from '@classic-terra/terra.proto/terra/wasm/v1beta1/tx';
import { MsgStoreCode as MsgStoreCodeProtoV2 } from '@terra-money/terra.proto/cosmwasm/wasm/v1/tx';
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

  public static fromAmino(data: MsgStoreCode.Amino) {
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

  public static fromData(data: MsgStoreCode.Data) {
    if (data['@type'] === '/cosmwasm.wasm.v1.MsgStoreCode') {
      const { sender, wasm_byte_code, instantiate_permission } = data;
      return new MsgStoreCode(
        sender,
        wasm_byte_code,
        instantiate_permission
          ? AccessConfig.fromData(instantiate_permission)
          : undefined
      );
    }
    const { sender, wasm_byte_code } = data;
    return new MsgStoreCode(sender, wasm_byte_code, undefined);
  }

  public toData(): MsgStoreCode.DataV2 {
    const { sender, wasm_byte_code, instantiate_permission } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
      sender,
      wasm_byte_code,
      instantiate_permission: instantiate_permission?.toData(),
    };
  }

  public static fromProtoV1(p: MsgStoreCodeProtoV2) {
    return new MsgStoreCode(
      p.sender,
      Buffer.from(p.wasmByteCode).toString('base64'),
      p.instantiatePermission
        ? AccessConfig.fromProto(p.instantiatePermission)
        : undefined
    );
  }

  public static fromProtoV2(p: MsgStoreCodeProtoV2) {
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
    return MsgStoreCodeProtoV2.fromPartial({
      sender,
      wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
      instantiatePermission: instantiate_permission?.toProto(),
    });
  }

  public packAny(): Any {
    const any = Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.MsgStoreCode',
      value: MsgStoreCodeProtoV2.encode(this.toProto()).finish(),
    });
    return any;
  }

  public static unpackAny(msgAny: Any) {
    return msgAny.typeUrl === '/cosmwasm.wasm.v1.MsgStoreCode'
      ? MsgStoreCode.fromProtoV2(MsgStoreCodeProtoV2.decode(msgAny.value))
      : MsgStoreCode.fromProtoV1(MsgStoreCodeProtoV1.decode(msgAny.value));
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
  export type Proto = MsgStoreCodeProtoV1 | MsgStoreCodeProtoV2;
}
