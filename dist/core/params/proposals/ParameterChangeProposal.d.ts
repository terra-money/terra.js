import { JSONSerializable } from '../../../util/json';
import { ParamChange, ParamChanges } from '../ParamChange';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { ParameterChangeProposal as ParameterChangeProposal_pb } from '@terra-money/terra.proto/cosmos/params/v1beta1/params';
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
export declare class ParameterChangeProposal extends JSONSerializable<ParameterChangeProposal.Amino, ParameterChangeProposal.Data, ParameterChangeProposal.Proto> {
    title: string;
    description: string;
    changes: ParamChanges;
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param changes an object whose keys are subspace names, and whose values are objects
     * with objects having for keys and values, the desired parameter changes.
     */
    constructor(title: string, description: string, changes: ParamChange.Data[] | ParamChanges);
    static fromAmino(data: ParameterChangeProposal.Amino, _?: boolean): ParameterChangeProposal;
    toAmino(isClassic?: boolean): ParameterChangeProposal.Amino;
    static fromData(proto: ParameterChangeProposal.Data, _?: boolean): ParameterChangeProposal;
    toData(_?: boolean): ParameterChangeProposal.Data;
    static fromProto(proto: ParameterChangeProposal.Proto, _?: boolean): ParameterChangeProposal;
    toProto(_?: boolean): ParameterChangeProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): ParameterChangeProposal;
}
export declare namespace ParameterChangeProposal {
    interface Amino {
        type: 'params/ParameterChangeProposal' | 'cosmos-sdk/ParameterChangeProposal';
        value: {
            title: string;
            description: string;
            changes: ParamChange.Amino[];
        };
    }
    interface Data {
        '@type': '/cosmos.params.v1beta1.ParameterChangeProposal';
        title: string;
        description: string;
        changes: ParamChange.Data[];
    }
    type Proto = ParameterChangeProposal_pb;
}
