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
   * @param code_ids the address of the smart code_ids
   */
  constructor(
    public title: string,
    public description: string,
    public code_ids: number[]
  ) {
    super();
  }

  public static fromAmino(
    data: UnpinCodesProposal.Amino,
    isClassic?: boolean
  ): UnpinCodesProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { title, description, code_ids },
    } = data as UnpinCodesProposal.Amino;
    return new UnpinCodesProposal(
      title,
      description,
      code_ids.map(cid => Number.parseInt(cid))
    );
  }

  public toAmino(isClassic?: boolean): UnpinCodesProposal.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
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

  public static fromProto(
    proto: UnpinCodesProposal.Proto,
    isClassic?: boolean
  ): UnpinCodesProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new UnpinCodesProposal(
      proto.title,
      proto.description,
      proto.codeIds.map(codeId => codeId.toNumber())
    );
  }

  public toProto(isClassic?: boolean): UnpinCodesProposal.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, code_ids } = this;
    return UnpinCodesProposal_pb.fromPartial({
      title,
      description,
      codeIds: code_ids.map(cid => Long.fromNumber(cid)),
    });
  }
  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.UnpinCodesProposal',
      value: UnpinCodesProposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): UnpinCodesProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return UnpinCodesProposal.fromProto(
      UnpinCodesProposal_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: UnpinCodesProposal.Data,
    isClassic?: boolean
  ): UnpinCodesProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, code_ids } = data as UnpinCodesProposal.Data;
    return new UnpinCodesProposal(
      title,
      description,
      code_ids.map(cid => Number.parseInt(cid))
    );
  }

  public toData(isClassic?: boolean): UnpinCodesProposal.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
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
