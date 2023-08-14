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
exports.CancelSoftwareUpgradeProposal = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var upgrade_1 = require("@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade");
/**
 *  CancelSoftwareUpgradeProposal is a gov Content type for cancelling a software upgrade
 */
var CancelSoftwareUpgradeProposal = /** @class */ (function (_super) {
    __extends(CancelSoftwareUpgradeProposal, _super);
    /**
     *
     * @param title
     * @param description
     */
    function CancelSoftwareUpgradeProposal(title, description) {
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        return _this;
    }
    CancelSoftwareUpgradeProposal.fromAmino = function (data, _) {
        _;
        var _a = data.value, title = _a.title, description = _a.description;
        return new CancelSoftwareUpgradeProposal(title, description);
    };
    CancelSoftwareUpgradeProposal.prototype.toAmino = function (isClassic) {
        var _a = this, title = _a.title, description = _a.description;
        return {
            type: isClassic
                ? 'upgrade/CancelSoftwareUpgradeProposal'
                : 'cosmos-sdk/CancelSoftwareUpgradeProposal',
            value: {
                title: title,
                description: description,
            },
        };
    };
    CancelSoftwareUpgradeProposal.fromData = function (data, _) {
        _;
        var title = data.title, description = data.description;
        return new CancelSoftwareUpgradeProposal(title, description);
    };
    CancelSoftwareUpgradeProposal.prototype.toData = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description;
        return {
            '@type': '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
            title: title,
            description: description,
        };
    };
    CancelSoftwareUpgradeProposal.fromProto = function (proto, _) {
        _;
        return new CancelSoftwareUpgradeProposal(proto.title, proto.description);
    };
    CancelSoftwareUpgradeProposal.prototype.toProto = function (_) {
        _;
        var _a = this, title = _a.title, description = _a.description;
        return upgrade_1.CancelSoftwareUpgradeProposal.fromPartial({
            title: title,
            description: description,
        });
    };
    CancelSoftwareUpgradeProposal.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
            value: upgrade_1.CancelSoftwareUpgradeProposal.encode(this.toProto(isClassic)).finish(),
        });
    };
    CancelSoftwareUpgradeProposal.unpackAny = function (msgAny, isClassic) {
        return CancelSoftwareUpgradeProposal.fromProto(upgrade_1.CancelSoftwareUpgradeProposal.decode(msgAny.value), isClassic);
    };
    return CancelSoftwareUpgradeProposal;
}(json_1.JSONSerializable));
exports.CancelSoftwareUpgradeProposal = CancelSoftwareUpgradeProposal;
//# sourceMappingURL=CancelSoftwareUpgradeProposal.js.map