"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterChangeProposal = void 0;
var json_1 = require("../../../util/json");
var ParamChange_1 = require("../ParamChange");
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
var ParameterChangeProposal = /** @class */ (function (_super) {
    __extends(ParameterChangeProposal, _super);
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param changes an object whose keys are subspace names, and whose values are objects
     * with objects having for keys and values, the desired parameter changes.
     */
    function ParameterChangeProposal(title, description, changes) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        if (changes instanceof Array) {
            _this.changes = ParamChange_1.ParamChanges.fromData(changes);
        }
        else {
            _this.changes = changes;
        }
        return _this;
    }
    ParameterChangeProposal.fromData = function (data) {
        var _a = data.value, title = _a.title, description = _a.description, changes = _a.changes;
        return new ParameterChangeProposal(title, description, ParamChange_1.ParamChanges.fromData(changes));
    };
    ParameterChangeProposal.prototype.toData = function () {
        var _a = this, title = _a.title, description = _a.description, changes = _a.changes;
        return {
            type: 'params/ParameterChangeProposal',
            value: {
                title: title,
                description: description,
                changes: ParamChange_1.ParamChanges.toData(changes),
            },
        };
    };
    return ParameterChangeProposal;
}(json_1.JSONSerializable));
exports.ParameterChangeProposal = ParameterChangeProposal;
//# sourceMappingURL=ParameterChangeProposal.js.map