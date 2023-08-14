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
exports.SendAuthorization = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var authz_1 = require("@terra-money/terra.proto/cosmos/bank/v1beta1/authz");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var SendAuthorization = /** @class */ (function (_super) {
    __extends(SendAuthorization, _super);
    function SendAuthorization(spend_limit) {
        var _this = _super.call(this) || this;
        _this.spend_limit = new Coins_1.Coins(spend_limit);
        return _this;
    }
    SendAuthorization.fromAmino = function (data, _) {
        _;
        return new SendAuthorization(Coins_1.Coins.fromAmino(data.value.spend_limit));
    };
    SendAuthorization.prototype.toAmino = function (isClassic) {
        var spend_limit = this.spend_limit;
        return {
            type: isClassic
                ? 'msgauth/SendAuthorization'
                : 'cosmos-sdk/SendAuthorization',
            value: {
                spend_limit: spend_limit.toAmino(),
            },
        };
    };
    SendAuthorization.fromData = function (data, _) {
        _;
        return new SendAuthorization(Coins_1.Coins.fromData(data.spend_limit));
    };
    SendAuthorization.prototype.toData = function (_) {
        _;
        var spend_limit = this.spend_limit;
        return {
            '@type': '/cosmos.bank.v1beta1.SendAuthorization',
            spend_limit: spend_limit.toAmino(),
        };
    };
    SendAuthorization.fromProto = function (proto, _) {
        _;
        return new SendAuthorization(Coins_1.Coins.fromProto(proto.spendLimit));
    };
    SendAuthorization.prototype.toProto = function (_) {
        _;
        return authz_1.SendAuthorization.fromPartial({
            spendLimit: this.spend_limit.toProto(),
        });
    };
    SendAuthorization.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.bank.v1beta1.SendAuthorization',
            value: authz_1.SendAuthorization.encode(this.toProto(isClassic)).finish(),
        });
    };
    SendAuthorization.unpackAny = function (msgAny, isClassic) {
        return SendAuthorization.fromProto(authz_1.SendAuthorization.decode(msgAny.value), isClassic);
    };
    return SendAuthorization;
}(json_1.JSONSerializable));
exports.SendAuthorization = SendAuthorization;
//# sourceMappingURL=SendAuthorization.js.map