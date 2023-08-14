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
exports.MsgWithdrawDelegatorReward = void 0;
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/distribution/v1beta1/tx");
/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
var MsgWithdrawDelegatorReward = /** @class */ (function (_super) {
    __extends(MsgWithdrawDelegatorReward, _super);
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     */
    function MsgWithdrawDelegatorReward(delegator_address, validator_address) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.validator_address = validator_address;
        return _this;
    }
    MsgWithdrawDelegatorReward.fromAmino = function (data, _) {
        _;
        var _a = data.value, delegator_address = _a.delegator_address, validator_address = _a.validator_address;
        return new MsgWithdrawDelegatorReward(delegator_address, validator_address);
    };
    MsgWithdrawDelegatorReward.prototype.toAmino = function (isClassic) {
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address;
        return {
            type: isClassic
                ? 'distribution/MsgWithdrawDelegationReward'
                : 'cosmos-sdk/MsgWithdrawDelegationReward',
            value: {
                delegator_address: delegator_address,
                validator_address: validator_address,
            },
        };
    };
    MsgWithdrawDelegatorReward.fromData = function (proto, _) {
        _;
        var delegator_address = proto.delegator_address, validator_address = proto.validator_address;
        return new MsgWithdrawDelegatorReward(delegator_address, validator_address);
    };
    MsgWithdrawDelegatorReward.prototype.toData = function (_) {
        _;
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address;
        return {
            '@type': '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
            delegator_address: delegator_address,
            validator_address: validator_address,
        };
    };
    MsgWithdrawDelegatorReward.fromProto = function (proto, _) {
        _;
        return new MsgWithdrawDelegatorReward(proto.delegatorAddress, proto.validatorAddress);
    };
    MsgWithdrawDelegatorReward.prototype.toProto = function (_) {
        _;
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address;
        return tx_1.MsgWithdrawDelegatorReward.fromPartial({
            delegatorAddress: delegator_address,
            validatorAddress: validator_address,
        });
    };
    MsgWithdrawDelegatorReward.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
            value: tx_1.MsgWithdrawDelegatorReward.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgWithdrawDelegatorReward.unpackAny = function (msgAny, isClassic) {
        return MsgWithdrawDelegatorReward.fromProto(tx_1.MsgWithdrawDelegatorReward.decode(msgAny.value), isClassic);
    };
    return MsgWithdrawDelegatorReward;
}(json_1.JSONSerializable));
exports.MsgWithdrawDelegatorReward = MsgWithdrawDelegatorReward;
//# sourceMappingURL=MsgWithdrawDelegatorReward.js.map