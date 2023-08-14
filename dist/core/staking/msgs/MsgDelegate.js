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
exports.MsgDelegate = void 0;
var Coin_1 = require("../../Coin");
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/tx");
/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
var MsgDelegate = /** @class */ (function (_super) {
    __extends(MsgDelegate, _super);
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     * @param amount amount of LUNA to be sent for delegation
     */
    function MsgDelegate(delegator_address, validator_address, amount) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.validator_address = validator_address;
        _this.amount = amount;
        return _this;
    }
    MsgDelegate.fromAmino = function (data, _) {
        _;
        var _a = data.value, delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
        return new MsgDelegate(delegator_address, validator_address, Coin_1.Coin.fromAmino(amount));
    };
    MsgDelegate.prototype.toAmino = function (isClassic) {
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
        return {
            type: isClassic ? 'staking/MsgDelegate' : 'cosmos-sdk/MsgDelegate',
            value: {
                delegator_address: delegator_address,
                validator_address: validator_address,
                amount: amount.toAmino(),
            },
        };
    };
    MsgDelegate.fromProto = function (proto, _) {
        _;
        return new MsgDelegate(proto.delegatorAddress, proto.validatorAddress, Coin_1.Coin.fromProto(proto.amount));
    };
    MsgDelegate.prototype.toProto = function (_) {
        _;
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
        return tx_1.MsgDelegate.fromPartial({
            amount: amount.toProto(),
            delegatorAddress: delegator_address,
            validatorAddress: validator_address,
        });
    };
    MsgDelegate.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
            value: tx_1.MsgDelegate.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgDelegate.unpackAny = function (msgAny, isClassic) {
        return MsgDelegate.fromProto(tx_1.MsgDelegate.decode(msgAny.value), isClassic);
    };
    MsgDelegate.fromData = function (data, _) {
        _;
        var delegator_address = data.delegator_address, validator_address = data.validator_address, amount = data.amount;
        return new MsgDelegate(delegator_address, validator_address, Coin_1.Coin.fromData(amount));
    };
    MsgDelegate.prototype.toData = function (_) {
        _;
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address, amount = _a.amount;
        return {
            '@type': '/cosmos.staking.v1beta1.MsgDelegate',
            delegator_address: delegator_address,
            validator_address: validator_address,
            amount: amount.toData(),
        };
    };
    return MsgDelegate;
}(json_1.JSONSerializable));
exports.MsgDelegate = MsgDelegate;
//# sourceMappingURL=MsgDelegate.js.map