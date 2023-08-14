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
exports.MsgExecAuthorized = void 0;
var json_1 = require("../../../util/json");
var Msg_1 = require("../../Msg");
var tx_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/tx");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var MsgExecAuthorized = /** @class */ (function (_super) {
    __extends(MsgExecAuthorized, _super);
    /**
     * @param grantee authorization grantee
     * @param msgs list of messages to execute
     */
    function MsgExecAuthorized(grantee, msgs) {
        var _this = _super.call(this) || this;
        _this.grantee = grantee;
        _this.msgs = msgs;
        return _this;
    }
    MsgExecAuthorized.fromAmino = function (data, isClassic) {
        var _a = data.value, grantee = _a.grantee, msgs = _a.msgs;
        return new MsgExecAuthorized(grantee, msgs.map(function (x) { return Msg_1.Msg.fromAmino(x, isClassic); }));
    };
    MsgExecAuthorized.prototype.toAmino = function (isClassic) {
        var _a = this, grantee = _a.grantee, msgs = _a.msgs;
        return {
            type: isClassic ? 'msgauth/MsgExecAuthorized' : 'cosmos-sdk/MsgExec',
            value: {
                grantee: grantee,
                msgs: msgs.map(function (msg) {
                    return msg.toAmino(isClassic);
                }),
            },
        };
    };
    MsgExecAuthorized.fromData = function (proto, isClassic) {
        var grantee = proto.grantee, msgs = proto.msgs;
        return new MsgExecAuthorized(grantee, msgs.map(function (x) { return Msg_1.Msg.fromData(x, isClassic); }));
    };
    MsgExecAuthorized.prototype.toData = function (isClassic) {
        var _a = this, grantee = _a.grantee, msgs = _a.msgs;
        return {
            '@type': '/cosmos.authz.v1beta1.MsgExec',
            grantee: grantee,
            msgs: msgs.map(function (msg) { return msg.toData(isClassic); }),
        };
    };
    MsgExecAuthorized.fromProto = function (proto, isClassic) {
        return new MsgExecAuthorized(proto.grantee, proto.msgs.map(function (x) { return Msg_1.Msg.fromProto(x, isClassic); }));
    };
    MsgExecAuthorized.prototype.toProto = function (isClassic) {
        var _a = this, grantee = _a.grantee, msgs = _a.msgs;
        return tx_1.MsgExec.fromPartial({
            grantee: grantee,
            msgs: msgs.map(function (m) { return m.packAny(isClassic); }),
        });
    };
    MsgExecAuthorized.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.authz.v1beta1.MsgExec',
            value: tx_1.MsgExec.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgExecAuthorized.unpackAny = function (msgAny, isClassic) {
        return MsgExecAuthorized.fromProto(tx_1.MsgExec.decode(msgAny.value), isClassic);
    };
    return MsgExecAuthorized;
}(json_1.JSONSerializable));
exports.MsgExecAuthorized = MsgExecAuthorized;
//# sourceMappingURL=MsgExecAuthorized.js.map