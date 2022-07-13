import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { UpdateInstantiateConfigProposal as UpdateInstantiateConfigProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import { AccessConfigUpdate } from '../AccessConfigUpdate';

/**
 * UpdateInstantiateConfigProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
export class UpdateInstantiateConfigProposal extends JSONSerializable<
  UpdateInstantiateConfigProposal.Amino,
  UpdateInstantiateConfigProposal.Data,
  UpdateInstantiateConfigProposal.Proto
> {
  /**
   * @param title a short summary
   * @param description a human readable text
   * @param access_config_updates the address of the smart access_config_updates
   */
  constructor(
    public title: string,
    public description: string,
    public access_config_updates: AccessConfigUpdate[]
  ) {
    super();
  }

  public static fromAmino(
    data: UpdateInstantiateConfigProposal.Amino,
    isClassic?: boolean
  ): UpdateInstantiateConfigProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const {
      value: { title, description, access_config_updates },
    } = data as UpdateInstantiateConfigProposal.Amino;
    return new UpdateInstantiateConfigProposal(
      title,
      description,
      access_config_updates.map(acu => AccessConfigUpdate.fromAmino(acu))
    );
  }

  public toAmino(isClassic?: boolean): UpdateInstantiateConfigProposal.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, access_config_updates } = this;
    return {
      type: 'wasm/UpdateInstantiateConfigProposal',
      value: {
        title,
        description,
        access_config_updates: access_config_updates.map(acu => acu.toAmino()),
      },
    };
  }

  public static fromProto(
    proto: UpdateInstantiateConfigProposal.Proto,
    isClassic?: boolean
  ): UpdateInstantiateConfigProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new UpdateInstantiateConfigProposal(
      proto.title,
      proto.description,
      proto.accessConfigUpdates.map(acu => AccessConfigUpdate.fromProto(acu))
    );
  }

  public toProto(isClassic?: boolean): UpdateInstantiateConfigProposal.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, access_config_updates } = this;
    return UpdateInstantiateConfigProposal_pb.fromPartial({
      title,
      description,
      accessConfigUpdates: access_config_updates.map(acu => acu.toProto()),
    });
  }
  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal',
      value: UpdateInstantiateConfigProposal_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): UpdateInstantiateConfigProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return UpdateInstantiateConfigProposal.fromProto(
      UpdateInstantiateConfigProposal_pb.decode(msgAny.value),
      isClassic
    );
  }

  public static fromData(
    data: UpdateInstantiateConfigProposal.Data,
    isClassic?: boolean
  ): UpdateInstantiateConfigProposal {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, access_config_updates } =
      data as UpdateInstantiateConfigProposal.Data;
    return new UpdateInstantiateConfigProposal(
      title,
      description,
      access_config_updates.map(acu => AccessConfigUpdate.fromData(acu))
    );
  }

  public toData(isClassic?: boolean): UpdateInstantiateConfigProposal.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { title, description, access_config_updates } = this;
    return {
      '@type': '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal',
      title,
      description,
      access_config_updates: access_config_updates.map(acu => acu.toData()),
    };
  }
}

export namespace UpdateInstantiateConfigProposal {
  export interface Amino {
    type: 'wasm/UpdateInstantiateConfigProposal';
    value: {
      title: string;
      description: string;
      access_config_updates: AccessConfigUpdate.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal';
    title: string;
    description: string;
    access_config_updates: AccessConfigUpdate.Data[];
  }

  export type Proto = UpdateInstantiateConfigProposal_pb;
}
