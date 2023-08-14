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
exports.MsgGrantAllowance = void 0;
var json_1 = require("../../../util/json");
var allowances_1 = require("../allowances");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/tx");
/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
var MsgGrantAllowance = /** @class */ (function (_super) {
    __extends(MsgGrantAllowance, _super);
    /**
     *
     * @param granter granter's account address
     * @param grantee grantee's account address
     * @param allowance allowance willing to grant
     */
    function MsgGrantAllowance(granter, grantee, allowance) {
        var _this = _super.call(this) || this;
        _this.granter = granter;
        _this.grantee = grantee;
        _this.allowance = allowance;
        return _this;
    }
    MsgGrantAllowance.fromAmino = function (data, isClassic) {
        var _a = data.value, granter = _a.granter, grantee = _a.grantee, allowance = _a.allowance;
        return new MsgGrantAllowance(granter, grantee, allowances_1.Allowance.fromAmino(allowance, isClassic));
    };
    MsgGrantAllowance.prototype.toAmino = function (isClassic) {
        var _a = this, granter = _a.granter, grantee = _a.grantee, allowance = _a.allowance;
        return {
            type: isClassic
                ? 'feegrant/MsgGrantAllowance'
                : 'cosmos-sdk/MsgGrantAllowance',
            value: {
                granter: granter,
                grantee: grantee,
                allowance: allowance.toAmino(isClassic),
            },
        };
    };
    MsgGrantAllowance.fromData = function (data, isClassic) {
        var granter = data.granter, grantee = data.grantee, allowance = data.allowance;
        return new MsgGrantAllowance(granter, grantee, allowances_1.Allowance.fromData(allowance, isClassic));
    };
    MsgGrantAllowance.prototype.toData = function (isClassic) {
        var _a = this, granter = _a.granter, grantee = _a.grantee, allowance = _a.allowance;
        return {
            '@type': '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
            granter: granter,
            grantee: grantee,
            allowance: allowance.toData(isClassic),
        };
    };
    MsgGrantAllowance.fromProto = function (proto, isClassic) {
        return new MsgGrantAllowance(proto.granter, proto.grantee, allowances_1.Allowance.fromProto(proto.allowance, isClassic));
    };
    MsgGrantAllowance.prototype.toProto = function (isClassic) {
        var _a = this, granter = _a.granter, grantee = _a.grantee, allowance = _a.allowance;
        return tx_1.MsgGrantAllowance.fromPartial({
            allowance: allowance.packAny(isClassic),
            grantee: grantee,
            granter: granter,
        });
    };
    MsgGrantAllowance.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
            value: tx_1.MsgGrantAllowance.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgGrantAllowance.unpackAny = function (msgAny, isClassic) {
        return MsgGrantAllowance.fromProto(tx_1.MsgGrantAllowance.decode(msgAny.value), isClassic);
    };
    return MsgGrantAllowance;
}(json_1.JSONSerializable));
exports.MsgGrantAllowance = MsgGrantAllowance;
//# sourceMappingURL=MsgGrantAllowance.js.map