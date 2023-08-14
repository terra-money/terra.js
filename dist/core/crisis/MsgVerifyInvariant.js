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
exports.MsgVerifyInvariant = void 0;
var json_1 = require("../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/crisis/v1beta1/tx");
/**
 * MsgVerifyInvariant represents a message to verify a particular invariance.
 */
var MsgVerifyInvariant = /** @class */ (function (_super) {
    __extends(MsgVerifyInvariant, _super);
    /**
     * @param sender sender's address
     * @param invariantModuleName module name to verify invariant
     * @param invariantRoute route to verify
     */
    function MsgVerifyInvariant(sender, invariantModuleName, invariantRoute) {
        var _this = _super.call(this) || this;
        _this.sender = sender;
        _this.invariantModuleName = invariantModuleName;
        _this.invariantRoute = invariantRoute;
        return _this;
    }
    MsgVerifyInvariant.fromAmino = function (data, _) {
        _;
        var _a = data.value, sender = _a.sender, invariantModuleName = _a.invariantModuleName, invariantRoute = _a.invariantRoute;
        return new MsgVerifyInvariant(sender, invariantModuleName, invariantRoute);
    };
    MsgVerifyInvariant.prototype.toAmino = function (_) {
        _;
        throw new Error('MsgVerifyInvarant is not allowed to send');
    };
    MsgVerifyInvariant.fromData = function (data, _) {
        _;
        var sender = data.sender, invariantModuleName = data.invariantModuleName, invariantRoute = data.invariantRoute;
        return new MsgVerifyInvariant(sender, invariantModuleName, invariantRoute);
    };
    MsgVerifyInvariant.prototype.toData = function (_) {
        _;
        var _a = this, sender = _a.sender, invariantModuleName = _a.invariantModuleName, invariantRoute = _a.invariantRoute;
        return {
            '@type': '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
            sender: sender,
            invariantModuleName: invariantModuleName,
            invariantRoute: invariantRoute,
        };
    };
    MsgVerifyInvariant.fromProto = function (proto, _) {
        _;
        return new MsgVerifyInvariant(proto.sender, proto.invariantModuleName, proto.invariantRoute);
    };
    MsgVerifyInvariant.prototype.toProto = function (_) {
        _;
        throw new Error('MsgVerifyInvarant is not allowed to send');
    };
    MsgVerifyInvariant.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
            value: tx_1.MsgVerifyInvariant.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgVerifyInvariant.unpackAny = function (msgAny, isClassic) {
        return MsgVerifyInvariant.fromProto(tx_1.MsgVerifyInvariant.decode(msgAny.value), isClassic);
    };
    return MsgVerifyInvariant;
}(json_1.JSONSerializable));
exports.MsgVerifyInvariant = MsgVerifyInvariant;
//# sourceMappingURL=MsgVerifyInvariant.js.map