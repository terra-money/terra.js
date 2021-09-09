import { JSONSerializable } from '../../../util/json';
import { ParamChange, ParamChanges } from '../ParamChange';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { ParameterChangeProposal as ParameterChangeProposal_pb } from '@terra-money/terra.proto/src/cosmos/params/v1beta1/params_pb';

/**
 * Describes a proposal for directly altering the value of the module parameters.
 * If you want to select a couple parameters to change for your proposal, you'll first
 * include the subspace (module it belongs to, such as "oracle" or "distribution"), and
 * then just the specific keys that you want to include in your changes as items in a
 * JavaScript object.
 *
 * ```ts
 * import {
 *    Dec,
 *    MsgSubmitProposal,
 *    ParameterChangeProposal
 * } from "@terra-money/terra.js";
 *
 * const proposal = new ParameterChangeProposal("title", "description", {
 *    market: {
 *      minspread: new Dec(0.25),
 *      basepool: new Dec(10000000)
 *    },
 *    staking: {
 *      UnbondingTime: 15000000
 *    }
 * });
 *
 * const msg = new MsgSubmitProposal();
 * ```
 */
export class ParameterChangeProposal extends JSONSerializable<ParameterChangeProposal.Data> {
  changes: ParamChanges;

  /**
   * @param title proposal's title
   * @param description proposal's description
   * @param changes an object whose keys are subspace names, and whose values are objects
   * with objects having for keys and values, the desired parameter changes.
   */
  constructor(
    public title: string,
    public description: string,
    changes: ParamChange.Data[] | ParamChanges
  ) {
    super();
    if (changes instanceof Array) {
      this.changes = ParamChanges.fromData(changes);
    } else {
      this.changes = changes;
    }
  }

  public static fromData(
    data: ParameterChangeProposal.Data
  ): ParameterChangeProposal {
    const {
      value: { title, description, changes },
    } = data;
    return new ParameterChangeProposal(
      title,
      description,
      ParamChanges.fromData(changes)
    );
  }

  public toData(): ParameterChangeProposal.Data {
    const { title, description, changes } = this;
    return {
      type: 'params/ParameterChangeProposal',
      value: {
        title,
        description,
        changes: changes.toData(),
      },
    };
  }

  public static fromProto(
    proto: ParameterChangeProposal.Proto
  ): ParameterChangeProposal {
    return new ParameterChangeProposal(
      proto.getTitle(),
      proto.getDescription(),
      ParamChanges.fromProto(proto.getChangesList())
    );
  }

  public toProto(): ParameterChangeProposal.Proto {
    const { title, description, changes } = this;
    const paramChangeProposalProto = new ParameterChangeProposal_pb();
    paramChangeProposalProto.setTitle(title);
    paramChangeProposalProto.setDescription(description);
    paramChangeProposalProto.setChangesList(changes.toProto());

    return paramChangeProposalProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.params.v1beta1.ParameterChangeProposal');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): ParameterChangeProposal {
    return ParameterChangeProposal.fromProto(
      ParameterChangeProposal_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace ParameterChangeProposal {
  export interface Data {
    type: 'params/ParameterChangeProposal';
    value: {
      title: string;
      description: string;
      changes: ParamChange.Data[];
    };
  }

  export type Proto = ParameterChangeProposal_pb;
}
