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
exports.BasicAllowance = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var feegrant_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant");
/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
var BasicAllowance = /** @class */ (function (_super) {
    __extends(BasicAllowance, _super);
    /**
     * @param spend_limit spend_limit allowed to be spent as fee
     * @param expiration allowance's expiration
     */
    function BasicAllowance(spend_limit, expiration) {
        var _this = _super.call(this) || this;
        _this.expiration = expiration;
        var hasNotPositive = false;
        if (spend_limit) {
            _this.spend_limit = new Coins_1.Coins(spend_limit);
            _this.spend_limit.map(function (c) {
                // isPositive() from decimal.js returns true when the amount is 0.
                // but Coins.IsAllPositive() from cosmos-sdk will return false in same case.
                // so we use lessThanorEquenTo(0) instead of isPositive() == false
                if (c.amount.lessThanOrEqualTo(0)) {
                    hasNotPositive = true;
                }
            });
        }
        if (spend_limit && hasNotPositive) {
            throw Error('spend_limit must be positive');
        }
        return _this;
    }
    BasicAllowance.fromAmino = function (data, _) {
        _;
        var _a = data.value, spend_limit = _a.spend_limit, expiration = _a.expiration;
        return new BasicAllowance(spend_limit ? Coins_1.Coins.fromAmino(spend_limit) : undefined, expiration ? new Date(expiration) : undefined);
        new BasicAllowance('');
    };
    BasicAllowance.prototype.toAmino = function (isClassic) {
        var _a = this, spend_limit = _a.spend_limit, expiration = _a.expiration;
        return {
            type: isClassic ? 'feegrant/BasicAllowance' : 'cosmos-sdk/BasicAllowance',
            value: {
                spend_limit: (spend_limit === null || spend_limit === void 0 ? void 0 : spend_limit.toAmino()) || undefined,
                expiration: (expiration === null || expiration === void 0 ? void 0 : expiration.toISOString().replace(/\.000Z$/, 'Z')) || undefined,
            },
        };
    };
    BasicAllowance.fromData = function (proto, _) {
        _;
        var spend_limit = proto.spend_limit, expiration = proto.expiration;
        return new BasicAllowance(spend_limit ? Coins_1.Coins.fromData(spend_limit) : undefined, expiration ? new Date(expiration) : undefined);
    };
    BasicAllowance.prototype.toData = function (_) {
        _;
        var _a = this, spend_limit = _a.spend_limit, expiration = _a.expiration;
        return {
            '@type': '/cosmos.feegrant.v1beta1.BasicAllowance',
            spend_limit: (spend_limit === null || spend_limit === void 0 ? void 0 : spend_limit.toData()) || undefined,
            expiration: (expiration === null || expiration === void 0 ? void 0 : expiration.toISOString().replace(/\.000Z$/, 'Z')) || undefined,
        };
    };
    BasicAllowance.fromProto = function (proto, _) {
        _;
        return new BasicAllowance(Coins_1.Coins.fromProto(proto.spendLimit), proto.expiration ? proto.expiration : undefined);
    };
    BasicAllowance.prototype.toProto = function (_) {
        _;
        var _a = this, spend_limit = _a.spend_limit, expiration = _a.expiration;
        return feegrant_1.BasicAllowance.fromPartial({
            expiration: expiration,
            spendLimit: (spend_limit === null || spend_limit === void 0 ? void 0 : spend_limit.toProto()) || undefined,
        });
    };
    BasicAllowance.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.BasicAllowance',
            value: feegrant_1.BasicAllowance.encode(this.toProto(isClassic)).finish(),
        });
    };
    BasicAllowance.unpackAny = function (msgAny, isClassic) {
        return BasicAllowance.fromProto(feegrant_1.BasicAllowance.decode(msgAny.value), isClassic);
    };
    return BasicAllowance;
}(json_1.JSONSerializable));
exports.BasicAllowance = BasicAllowance;
//# sourceMappingURL=BasicAllowance.js.map