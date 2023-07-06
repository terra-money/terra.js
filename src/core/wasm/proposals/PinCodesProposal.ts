import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { PinCodesProposal as PinCodesProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import * as Long from 'long';

/**
 * PinCodesProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
export class PinCodesProposal extends JSONSerializable<
  PinCodesProposal.Amino,
  PinCodesProposal.Data,
  PinCodesProposal.Proto
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
    data: PinCodesProposal.Amino,
    _?: boolean
  ): PinCodesProposal {
    const {
      value: { title, description, code_ids },
    } = data as PinCodesProposal.Amino;
    return new PinCodesProposal(
      title,
      description,
      code_ids.map(cid => Number.parseInt(cid))
    );
  }

  public toAmino(_?: boolean): PinCodesProposal.Amino {
    const { title, description, code_ids } = this;
    return {
      type: 'wasm/PinCodesProposal',
      value: {
        title,
        description,
        code_ids: code_ids.map(cid => cid.toFixed()),
      },
    };
  }

  public static fromProto(
    proto: PinCodesProposal.Proto,
    _?: boolean
  ): PinCodesProposal {
    return new PinCodesProposal(
      proto.title,
      proto.description,
      proto.codeIds.map(codeId => codeId.toNumber())
    );
  }

  public toProto(_?: boolean): PinCodesProposal.Proto {
    const { title, description, code_ids } = this;
    return PinCodesProposal_pb.fromPartial({
      title,
      description,
      codeIds: code_ids.map(cid => Long.fromNumber(cid)),
    });
  }
  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.PinCodesProposal',
      value: PinCodesProposal_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): PinCodesProposal {
    return PinCodesProposal.fromProto(
      PinCodesProposal_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: PinCodesProposal.Data,
    _?: boolean
  ): PinCodesProposal {
    const { title, description, code_ids } = data as PinCodesProposal.Data;
    return new PinCodesProposal(
      title,
      description,
      code_ids.map(cid => Number.parseInt(cid))
    );
  }

  public toData(_?: boolean): PinCodesProposal.Data {
    const { title, description, code_ids } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.PinCodesProposal',
      title,
      description,
      code_ids: code_ids.map(cid => cid.toFixed()),
    };
  }
}

export namespace PinCodesProposal {
  export interface Amino {
    type: 'wasm/PinCodesProposal';
    value: {
      title: string;
      description: string;
      code_ids: string[];
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.PinCodesProposal';
    title: string;
    description: string;
    code_ids: string[];
  }

  export type Proto = PinCodesProposal_pb;
}
