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
exports.MsgBeginRedelegate = void 0;
var json_1 = require("../../../util/json");
var Coin_1 = require("../../Coin");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/tx");
/**
 * A delegator can choose to redelegate their bonded Luna and transfer a delegation
 * amount from one validator to another. Unlike undelegating, redelegations do not incur
 * a 21-day unbonding period and happen immediately.
 */
var MsgBeginRedelegate = /** @class */ (function (_super) {
    __extends(MsgBeginRedelegate, _super);
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_src_address validator to undelegate from
     * @param validator_dst_address validator to delegate to
     * @param amount LUNA to be redelegated
     */
    function MsgBeginRedelegate(delegator_address, validator_src_address, validator_dst_address, amount) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.validator_src_address = validator_src_address;
        _this.validator_dst_address = validator_dst_address;
        _this.amount = amount;
        return _this;
    }
    MsgBeginRedelegate.fromAmino = function (data, _) {
        _;
        var _a = data.value, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, amount = _a.amount;
        return new MsgBeginRedelegate(delegator_address, validator_src_address, validator_dst_address, Coin_1.Coin.fromAmino(amount));
    };
    MsgBeginRedelegate.prototype.toAmino = function (isClassic) {
        var _a = this, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, amount = _a.amount;
        return {
            type: isClassic
                ? 'staking/MsgBeginRedelegate'
                : 'cosmos-sdk/MsgBeginRedelegate',
            value: {
                delegator_address: delegator_address,
                validator_src_address: validator_src_address,
                validator_dst_address: validator_dst_address,
                amount: amount.toAmino(),
            },
        };
    };
    MsgBeginRedelegate.fromData = function (data, _) {
        _;
        var delegator_address = data.delegator_address, validator_src_address = data.validator_src_address, validator_dst_address = data.validator_dst_address, amount = data.amount;
        return new MsgBeginRedelegate(delegator_address, validator_src_address, validator_dst_address, Coin_1.Coin.fromData(amount));
    };
    MsgBeginRedelegate.prototype.toData = function (_) {
        _;
        var _a = this, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, amount = _a.amount;
        return {
            '@type': '/cosmos.staking.v1beta1.MsgBeginRedelegate',
            delegator_address: delegator_address,
            validator_src_address: validator_src_address,
            validator_dst_address: validator_dst_address,
            amount: amount.toData(),
        };
    };
    MsgBeginRedelegate.fromProto = function (proto, _) {
        _;
        return new MsgBeginRedelegate(proto.delegatorAddress, proto.validatorSrcAddress, proto.validatorDstAddress, Coin_1.Coin.fromProto(proto.amount));
    };
    MsgBeginRedelegate.prototype.toProto = function (_) {
        _;
        var _a = this, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, amount = _a.amount;
        return tx_1.MsgBeginRedelegate.fromPartial({
            amount: amount.toProto(),
            delegatorAddress: delegator_address,
            validatorDstAddress: validator_dst_address,
            validatorSrcAddress: validator_src_address,
        });
    };
    MsgBeginRedelegate.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
            value: tx_1.MsgBeginRedelegate.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgBeginRedelegate.unpackAny = function (msgAny, isClassic) {
        return MsgBeginRedelegate.fromProto(tx_1.MsgBeginRedelegate.decode(msgAny.value), isClassic);
    };
    return MsgBeginRedelegate;
}(json_1.JSONSerializable));
exports.MsgBeginRedelegate = MsgBeginRedelegate;
//# sourceMappingURL=MsgBeginRedelegate.js.map