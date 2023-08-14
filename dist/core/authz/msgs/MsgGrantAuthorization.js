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
exports.MsgGrantAuthorization = void 0;
var json_1 = require("../../../util/json");
var authorizations_1 = require("../authorizations");
var tx_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/tx");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var MsgGrantAuthorization = /** @class */ (function (_super) {
    __extends(MsgGrantAuthorization, _super);
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    function MsgGrantAuthorization(granter, grantee, grant) {
        var _this = _super.call(this) || this;
        _this.granter = granter;
        _this.grantee = grantee;
        _this.grant = grant;
        return _this;
    }
    MsgGrantAuthorization.fromAmino = function (data, isClassic) {
        var _a = data.value, granter = _a.granter, grantee = _a.grantee, grant = _a.grant;
        return new MsgGrantAuthorization(granter, grantee, authorizations_1.AuthorizationGrant.fromAmino(grant, isClassic));
    };
    MsgGrantAuthorization.prototype.toAmino = function (isClassic) {
        var _a = this, granter = _a.granter, grantee = _a.grantee, grant = _a.grant;
        return {
            type: isClassic ? 'msgauth/MsgGrantAuthorization' : 'cosmos-sdk/MsgGrant',
            value: {
                granter: granter,
                grantee: grantee,
                grant: grant.toAmino(isClassic),
            },
        };
    };
    MsgGrantAuthorization.fromData = function (data, isClassic) {
        var granter = data.granter, grantee = data.grantee, grant = data.grant;
        return new MsgGrantAuthorization(granter, grantee, authorizations_1.AuthorizationGrant.fromData(grant, isClassic));
    };
    MsgGrantAuthorization.prototype.toData = function (isClassic) {
        var _a = this, granter = _a.granter, grantee = _a.grantee, grant = _a.grant;
        return {
            '@type': '/cosmos.authz.v1beta1.MsgGrant',
            granter: granter,
            grantee: grantee,
            grant: grant.toData(isClassic),
        };
    };
    MsgGrantAuthorization.fromProto = function (data, isClassic) {
        return new MsgGrantAuthorization(data.granter, data.grantee, authorizations_1.AuthorizationGrant.fromProto(data.grant, isClassic));
    };
    MsgGrantAuthorization.prototype.toProto = function (isClassic) {
        var _a = this, grant = _a.grant, granter = _a.granter, grantee = _a.grantee;
        return tx_1.MsgGrant.fromPartial({
            grant: grant.toProto(isClassic),
            grantee: grantee,
            granter: granter,
        });
    };
    MsgGrantAuthorization.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.authz.v1beta1.MsgGrant',
            value: tx_1.MsgGrant.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgGrantAuthorization.unpackAny = function (msgAny, isClassic) {
        return MsgGrantAuthorization.fromProto(tx_1.MsgGrant.decode(msgAny.value), isClassic);
    };
    return MsgGrantAuthorization;
}(json_1.JSONSerializable));
exports.MsgGrantAuthorization = MsgGrantAuthorization;
//# sourceMappingURL=MsgGrantAuthorization.js.map