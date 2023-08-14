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
exports.MsgRevokeAllowance = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/tx");
/**
 * MsgRevokeAllowance remove permission any existing Allowance from Granter to Grantee.
 */
var MsgRevokeAllowance = /** @class */ (function (_super) {
    __extends(MsgRevokeAllowance, _super);
    /**
     *
     * @param granter granter's account address
     * @param grantee grantee's account address
     */
    function MsgRevokeAllowance(granter, grantee) {
        var _this = _super.call(this) || this;
        _this.granter = granter;
        _this.grantee = grantee;
        return _this;
    }
    MsgRevokeAllowance.fromAmino = function (data, _) {
        _;
        var _a = data.value, granter = _a.granter, grantee = _a.grantee;
        return new MsgRevokeAllowance(granter, grantee);
    };
    MsgRevokeAllowance.prototype.toAmino = function (isClassic) {
        var _a = this, granter = _a.granter, grantee = _a.grantee;
        return {
            type: isClassic
                ? 'feegrant/MsgRevokeAllowance'
                : 'cosmos-sdk/MsgRevokeAllowance',
            value: {
                granter: granter,
                grantee: grantee,
            },
        };
    };
    MsgRevokeAllowance.fromData = function (proto, _) {
        _;
        var granter = proto.granter, grantee = proto.grantee;
        return new MsgRevokeAllowance(granter, grantee);
    };
    MsgRevokeAllowance.prototype.toData = function (_) {
        _;
        var _a = this, granter = _a.granter, grantee = _a.grantee;
        return {
            '@type': '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
            granter: granter,
            grantee: grantee,
        };
    };
    MsgRevokeAllowance.fromProto = function (proto, _) {
        _;
        return new MsgRevokeAllowance(proto.granter, proto.grantee);
    };
    MsgRevokeAllowance.prototype.toProto = function (_) {
        _;
        var _a = this, granter = _a.granter, grantee = _a.grantee;
        return tx_1.MsgRevokeAllowance.fromPartial({
            grantee: grantee,
            granter: granter,
        });
    };
    MsgRevokeAllowance.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
            value: tx_1.MsgRevokeAllowance.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgRevokeAllowance.unpackAny = function (msgAny, isClassic) {
        return MsgRevokeAllowance.fromProto(tx_1.MsgRevokeAllowance.decode(msgAny.value), isClassic);
    };
    return MsgRevokeAllowance;
}(json_1.JSONSerializable));
exports.MsgRevokeAllowance = MsgRevokeAllowance;
//# sourceMappingURL=MsgRevokeAllowance.js.map