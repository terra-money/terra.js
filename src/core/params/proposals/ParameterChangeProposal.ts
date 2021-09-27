import { JSONSerializable } from '../../../util/json';
import { ParamChange, ParamChanges } from '../ParamChange';

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
    if (Array.isArray(changes)) {
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
}

export namespace ParameterChangeProposal {
  export interface Data {
    type: 'params/ParameterChangeProposal';
    value: {
      title: string;
      description: string;
      changes: ParamChanges.Data;
    };
  }
}
