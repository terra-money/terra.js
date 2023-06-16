import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { UnpinCodesProposal as UnpinCodesProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import * as Long from 'long';

/**
 * UnpinCodesProposal gov proposal content type to unpin a set of code ids in
 * the wasmvm cache.
 */
export class UnpinCodesProposal extends JSONSerializable<
  UnpinCodesProposal.Amino,
  UnpinCodesProposal.Data,
  UnpinCodesProposal.Proto
> {
  /**
   * @param title a short summary
   * @param description a human readable text
   * @param code_ids references the WASM codes
   */
  constructor(
    public title: string,
    public description: string,
    public code_ids: number[]
  ) {
    super();
  }

  public static fromAmino(data: UnpinCodesProposal.Amino) {
    const {
      value: { title, description, code_ids },
    } = data;
    return new UnpinCodesProposal(
      title,
      description,
      code_ids.map(cid => Number.parseInt(cid))
    );
  }

  public toAmino(): UnpinCodesProposal.Amino {
    const { title, description, code_ids } = this;
    return {
      type: 'wasm/UnpinCodesProposal',
      value: {
        title,
        description,
        code_ids: code_ids.map(cid => cid.toFixed()),
      },
    };
  }

  public static fromProto(proto: UnpinCodesProposal.Proto) {
    return new UnpinCodesProposal(
      proto.title,
      proto.description,
      proto.codeIds.map(codeId => codeId.toNumber())
    );
  }

  public toProto(): UnpinCodesProposal.Proto {
    const { title, description, code_ids } = this;
    return UnpinCodesProposal_pb.fromPartial({
      title,
      description,
      codeIds: code_ids.map(cid => Long.fromNumber(cid)),
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.UnpinCodesProposal',
      value: UnpinCodesProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return UnpinCodesProposal.fromProto(
      UnpinCodesProposal_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: UnpinCodesProposal.Data) {
    const { title, description, code_ids } = data;
    return new UnpinCodesProposal(
      title,
      description,
      code_ids.map(cid => Number.parseInt(cid))
    );
  }

  public toData(): UnpinCodesProposal.Data {
    const { title, description, code_ids } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.UnpinCodesProposal',
      title,
      description,
      code_ids: code_ids.map(cid => cid.toFixed()),
    };
  }
}

export namespace UnpinCodesProposal {
  export interface Amino {
    type: 'wasm/UnpinCodesProposal';
    value: {
      title: string;
      description: string;
      code_ids: string[];
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.UnpinCodesProposal';
    title: string;
    description: string;
    code_ids: string[];
  }

  export type Proto = UnpinCodesProposal_pb;
}
