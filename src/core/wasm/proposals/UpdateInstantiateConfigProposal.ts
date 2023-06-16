import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { UpdateInstantiateConfigProposal as UpdateInstantiateConfigProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import {} from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
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
   * @param access_config_updates the list of code ids and the access config
   */
  constructor(
    public title: string,
    public description: string,
    public access_config_updates: AccessConfigUpdate[]
  ) {
    super();
  }

  public static fromAmino(data: UpdateInstantiateConfigProposal.Amino) {
    const {
      value: { title, description, access_config_updates },
    } = data;
    return new UpdateInstantiateConfigProposal(
      title,
      description,
      access_config_updates.map(acu => AccessConfigUpdate.fromAmino(acu))
    );
  }

  public toAmino(): UpdateInstantiateConfigProposal.Amino {
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

  public static fromProto(proto: UpdateInstantiateConfigProposal.Proto) {
    return new UpdateInstantiateConfigProposal(
      proto.title,
      proto.description,
      proto.accessConfigUpdates.map(acu => AccessConfigUpdate.fromProto(acu))
    );
  }

  public toProto(): UpdateInstantiateConfigProposal.Proto {
    const { title, description, access_config_updates } = this;
    return UpdateInstantiateConfigProposal_pb.fromPartial({
      title,
      description,
      accessConfigUpdates: access_config_updates.map(acu => acu.toProto()),
    });
  }
  public packAny() {
    return Any.fromPartial({
      typeUrl: '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal',
      value: UpdateInstantiateConfigProposal_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return UpdateInstantiateConfigProposal.fromProto(
      UpdateInstantiateConfigProposal_pb.decode(msgAny.value)
    );
  }

  public static fromData(data: UpdateInstantiateConfigProposal.Data) {
    const { title, description, access_config_updates } = data;
    return new UpdateInstantiateConfigProposal(
      title,
      description,
      access_config_updates.map(acu => AccessConfigUpdate.fromData(acu))
    );
  }

  public toData(): UpdateInstantiateConfigProposal.Data {
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
