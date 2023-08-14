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
exports.MsgRevokeAuthorization = void 0;
var json_1 = require("../../../util/json");
var tx_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/tx");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var MsgRevokeAuthorization = /** @class */ (function (_super) {
    __extends(MsgRevokeAuthorization, _super);
    /**
     * @param granter authorization granter
     * @param grantee authorization grantee
     * @param authorization_msg_type type of message to revoke
     */
    function MsgRevokeAuthorization(granter, grantee, msg_type_url) {
        var _this = _super.call(this) || this;
        _this.granter = granter;
        _this.grantee = grantee;
        _this.msg_type_url = msg_type_url;
        return _this;
    }
    MsgRevokeAuthorization.fromAmino = function (data, _) {
        _;
        var _a = data.value, granter = _a.granter, grantee = _a.grantee, msg_type_url = _a.msg_type_url;
        return new MsgRevokeAuthorization(granter, grantee, msg_type_url);
    };
    MsgRevokeAuthorization.prototype.toAmino = function (isClassic) {
        var _a = this, granter = _a.granter, grantee = _a.grantee, msg_type_url = _a.msg_type_url;
        return {
            type: isClassic
                ? 'msgauth/MsgRevokeAuthorization'
                : 'cosmos-sdk/MsgRevoke',
            value: {
                granter: granter,
                grantee: grantee,
                msg_type_url: msg_type_url,
            },
        };
    };
    MsgRevokeAuthorization.fromData = function (data, _) {
        _;
        var granter = data.granter, grantee = data.grantee, msg_type_url = data.msg_type_url;
        return new MsgRevokeAuthorization(granter, grantee, msg_type_url);
    };
    MsgRevokeAuthorization.prototype.toData = function (_) {
        _;
        var _a = this, granter = _a.granter, grantee = _a.grantee, msg_type_url = _a.msg_type_url;
        return {
            '@type': '/cosmos.authz.v1beta1.MsgRevoke',
            granter: granter,
            grantee: grantee,
            msg_type_url: msg_type_url,
        };
    };
    MsgRevokeAuthorization.fromProto = function (proto, _) {
        _;
        return new MsgRevokeAuthorization(proto.granter, proto.grantee, proto.msgTypeUrl);
    };
    MsgRevokeAuthorization.prototype.toProto = function (_) {
        _;
        var _a = this, granter = _a.granter, grantee = _a.grantee, msg_type_url = _a.msg_type_url;
        return tx_1.MsgRevoke.fromPartial({
            grantee: grantee,
            granter: granter,
            msgTypeUrl: msg_type_url,
        });
    };
    MsgRevokeAuthorization.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.authz.v1beta1.MsgRevoke',
            value: tx_1.MsgRevoke.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgRevokeAuthorization.unpackAny = function (msgAny, isClassic) {
        return MsgRevokeAuthorization.fromProto(tx_1.MsgRevoke.decode(msgAny.value), isClassic);
    };
    return MsgRevokeAuthorization;
}(json_1.JSONSerializable));
exports.MsgRevokeAuthorization = MsgRevokeAuthorization;
//# sourceMappingURL=MsgRevokeAuthorization.js.map