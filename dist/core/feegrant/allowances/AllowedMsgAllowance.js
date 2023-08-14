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
exports.AllowedMsgAllowance = void 0;
var json_1 = require("../../../util/json");
var BasicAllowance_1 = require("./BasicAllowance");
var PeriodicAllowance_1 = require("./PeriodicAllowance");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var feegrant_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant");
/**
 * AllowedMsgAllowance creates allowance only for specified message types.
 */
var AllowedMsgAllowance = /** @class */ (function (_super) {
    __extends(AllowedMsgAllowance, _super);
    /**
     * @param allowance any of basic and periodic fee allowance.
     * @param allowed_messages the messages for which the grantee has the access.
     */
    function AllowedMsgAllowance(allowance, allowed_messages) {
        var _this = _super.call(this) || this;
        _this.allowance = allowance;
        _this.allowed_messages = allowed_messages;
        return _this;
    }
    AllowedMsgAllowance.fromAmino = function (data, isClassic) {
        var _a = data.value, allowance = _a.allowance, allowed_messages = _a.allowed_messages;
        return new AllowedMsgAllowance(allowance.type === 'feegrant/BasicAllowance' ||
            allowance.type === 'cosmos-sdk/BasicAllowance'
            ? BasicAllowance_1.BasicAllowance.fromAmino(allowance, isClassic)
            : PeriodicAllowance_1.PeriodicAllowance.fromAmino(allowance, isClassic), allowed_messages);
    };
    AllowedMsgAllowance.prototype.toAmino = function (isClassic) {
        var _a = this, allowance = _a.allowance, allowed_messages = _a.allowed_messages;
        return {
            type: isClassic
                ? 'feegrant/AllowedMsgAllowance'
                : 'cosmos-sdk/AllowedMsgAllowance',
            value: {
                allowance: allowance.toAmino(isClassic),
                allowed_messages: allowed_messages,
            },
        };
    };
    AllowedMsgAllowance.fromData = function (proto, _) {
        _;
        var allowance = proto.allowance, allowed_messages = proto.allowed_messages;
        return new AllowedMsgAllowance(allowance['@type'] === '/cosmos.feegrant.v1beta1.BasicAllowance'
            ? BasicAllowance_1.BasicAllowance.fromData(allowance)
            : PeriodicAllowance_1.PeriodicAllowance.fromData(allowance), allowed_messages);
    };
    AllowedMsgAllowance.prototype.toData = function (_) {
        _;
        var _a = this, allowance = _a.allowance, allowed_messages = _a.allowed_messages;
        return {
            '@type': '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
            allowance: allowance.toData(),
            allowed_messages: allowed_messages,
        };
    };
    AllowedMsgAllowance.fromProto = function (proto, isClassic) {
        var allowance = proto.allowance;
        return new AllowedMsgAllowance((allowance === null || allowance === void 0 ? void 0 : allowance.typeUrl) === '/cosmos.feegrant.v1beta1.BasicAllowance'
            ? BasicAllowance_1.BasicAllowance.unpackAny(allowance, isClassic)
            : PeriodicAllowance_1.PeriodicAllowance.unpackAny(allowance, isClassic), proto.allowedMessages);
    };
    AllowedMsgAllowance.prototype.toProto = function (isClassic) {
        var _a = this, allowance = _a.allowance, allowed_messages = _a.allowed_messages;
        return feegrant_1.AllowedMsgAllowance.fromPartial({
            allowance: allowance.packAny(isClassic),
            allowedMessages: allowed_messages,
        });
    };
    AllowedMsgAllowance.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
            value: feegrant_1.AllowedMsgAllowance.encode(this.toProto(isClassic)).finish(),
        });
    };
    AllowedMsgAllowance.unpackAny = function (msgAny, isClassic) {
        return AllowedMsgAllowance.fromProto(feegrant_1.AllowedMsgAllowance.decode(msgAny.value), isClassic);
    };
    return AllowedMsgAllowance;
}(json_1.JSONSerializable));
exports.AllowedMsgAllowance = AllowedMsgAllowance;
//# sourceMappingURL=AllowedMsgAllowance.js.map