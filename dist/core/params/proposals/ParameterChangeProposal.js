"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterChangeProposal = void 0;
var json_1 = require("../../../util/json");
var ParamChange_1 = require("../ParamChange");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var params_1 = require("@terra-money/terra.proto/cosmos/params/v1beta1/params");
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
        if (Array.isArray(changes)) {
            _this.changes = ParamChange_1.ParamChanges.fromData(changes);
        }
        else {
            _this.changes = changes;
        }
        return _this;
    }
    ParameterChangeProposal.fromAmino = function (data, _) {
        _;
        var _a = data.value, title = _a.title, description = _a.description, changes = _a.changes;
        return new ParameterChangeProposal(title, description, ParamChange_1.ParamChanges.fromAmino(changes));
    };
    ParameterChangeProposal.prototype.toAmino = function (isClassic) {
        var _a = this, title = _a.title, description = _a.description, changes = _a.changes;
        return {
            type: isClassic
                ? 'params/ParameterChangeProposal'
                : 'cosmos-sdk/ParameterChangeProposal',
            value: {
                title: title,
                description: description,
                changes: changes.toAmino(),
            },
        };
    };
    ParameterChangeProposal.fromData = function (proto, _) {
        _;
        var title = proto.title, description = proto.description, changes = proto.changes;
        return new ParameterChangeProposal(title, description, ParamChange_1.ParamChanges.fromData(changes));
    };
    ParameterChangeProposal.prototype.toData = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description, changes = _a.changes;
        return {
            '@type': '/cosmos.params.v1beta1.ParameterChangeProposal',
            title: title,
            description: description,
            changes: changes.toData(),
        };
    };
    ParameterChangeProposal.fromProto = function (proto, _) {
        _;
        return new ParameterChangeProposal(proto.title, proto.description, ParamChange_1.ParamChanges.fromProto(proto.changes));
    };
    ParameterChangeProposal.prototype.toProto = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description, changes = _a.changes;
        return params_1.ParameterChangeProposal.fromPartial({
            changes: changes.toProto(),
            description: description,
            title: title,
        });
    };
    ParameterChangeProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal',
            value: params_1.ParameterChangeProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    ParameterChangeProposal.unpackAny = function (msgAny, isClassic) {
        return ParameterChangeProposal.fromProto(params_1.ParameterChangeProposal.decode(msgAny.value), isClassic);
    };
    return ParameterChangeProposal;
}(json_1.JSONSerializable));
exports.ParameterChangeProposal = ParameterChangeProposal;
//# sourceMappingURL=ParameterChangeProposal.js.map