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
exports.SoftwareUpgradeProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var upgrade_1 = require("@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade");
var Plan_1 = require("../Plan");
/**
 * Softwareupgradeproposal is a gov Content type for initiating a software upgrade.
 */
var SoftwareUpgradeProposal = /** @class */ (function (_super) {
    __extends(SoftwareUpgradeProposal, _super);
    /**
     *
     * @param title
     * @param description
     * @param plan
     */
    function SoftwareUpgradeProposal(title, description, plan) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        _this.plan = plan;
        return _this;
    }
    SoftwareUpgradeProposal.fromAmino = function (data, _) {
        _;
        var _a = data.value, title = _a.title, description = _a.description, plan = _a.plan;
        return new SoftwareUpgradeProposal(title, description, plan ? Plan_1.Plan.fromAmino(plan) : undefined);
    };
    SoftwareUpgradeProposal.prototype.toAmino = function (isClassic) {
        var _a = this, title = _a.title, description = _a.description, plan = _a.plan;
        return {
            type: isClassic
                ? 'upgrade/SoftwareUpgradeProposal'
                : 'cosmos-sdk/SoftwareUpgradeProposal',
            value: {
                title: title,
                description: description,
                plan: plan ? plan.toAmino() : undefined,
            },
        };
    };
    SoftwareUpgradeProposal.fromData = function (data, _) {
        _;
        var title = data.title, description = data.description, plan = data.plan;
        return new SoftwareUpgradeProposal(title, description, plan ? Plan_1.Plan.fromData(plan) : undefined);
    };
    SoftwareUpgradeProposal.prototype.toData = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description, plan = _a.plan;
        return {
            '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
            title: title,
            description: description,
            plan: plan ? plan.toData() : undefined,
        };
    };
    SoftwareUpgradeProposal.fromProto = function (proto, _) {
        _;
        return new SoftwareUpgradeProposal(proto.title, proto.description, proto.plan ? Plan_1.Plan.fromProto(proto.plan) : undefined);
    };
    SoftwareUpgradeProposal.prototype.toProto = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description, plan = _a.plan;
        return upgrade_1.SoftwareUpgradeProposal.fromPartial({
            title: title,
            description: description,
            plan: plan ? plan.toProto() : undefined,
        });
    };
    SoftwareUpgradeProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
            value: upgrade_1.SoftwareUpgradeProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    SoftwareUpgradeProposal.unpackAny = function (msgAny, isClassic) {
        return SoftwareUpgradeProposal.fromProto(upgrade_1.SoftwareUpgradeProposal.decode(msgAny.value), isClassic);
    };
    return SoftwareUpgradeProposal;
}(json_1.JSONSerializable));
exports.SoftwareUpgradeProposal = SoftwareUpgradeProposal;
//# sourceMappingURL=SoftwareUpgradeProposal.js.map