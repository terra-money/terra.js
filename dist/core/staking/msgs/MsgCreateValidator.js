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
exports.MsgCreateValidator = void 0;
var json_1 = require("../../../util/json");
var Coin_1 = require("../../Coin");
var numeric_1 = require("../../numeric");
var Validator_1 = require("../Validator");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/tx");
var PublicKey_1 = require("../../PublicKey");
/**
 * For new validators, this message registers a validator address to be a delegate on
 * the blockchain.
 */
var MsgCreateValidator = /** @class */ (function (_super) {
    __extends(MsgCreateValidator, _super);
    /**
     *
     * @param description validator's delegate information
     * @param commission validator's commission policy
     * @param min_self_delegation minimum self delegation
     * @param delegator_address validator's account address
     * @param validator_address validator's operator address
     * @param pubkey validator's consensus public key
     * @param value amount to use for self-delegation
     */
    function MsgCreateValidator(description, commission, min_self_delegation, delegator_address, validator_address, pubkey, value) {
        var _this = _super.call(this) || this;
        _this.description = description;
        _this.commission = commission;
        _this.min_self_delegation = min_self_delegation;
        _this.delegator_address = delegator_address;
        _this.validator_address = validator_address;
        _this.pubkey = pubkey;
        _this.value = value;
        return _this;
    }
    MsgCreateValidator.fromAmino = function (data, _) {
        _;
        var _a = data.value, description = _a.description, commission = _a.commission, min_self_delegation = _a.min_self_delegation, delegator_address = _a.delegator_address, validator_address = _a.validator_address, pubkey = _a.pubkey, value = _a.value;
        return new MsgCreateValidator(description, Validator_1.Validator.CommissionRates.fromAmino(commission), new numeric_1.Int(min_self_delegation), delegator_address, validator_address, PublicKey_1.ValConsPublicKey.fromAmino(pubkey), Coin_1.Coin.fromAmino(value));
    };
    MsgCreateValidator.prototype.toAmino = function (isClassic) {
        var _a = this, description = _a.description, commission = _a.commission, min_self_delegation = _a.min_self_delegation, delegator_address = _a.delegator_address, validator_address = _a.validator_address, pubkey = _a.pubkey, value = _a.value;
        return {
            type: isClassic
                ? 'staking/MsgCreateValidator'
                : 'cosmos-sdk/MsgCreateValidator',
            value: {
                description: description,
                commission: commission.toAmino(),
                min_self_delegation: min_self_delegation.toString(),
                delegator_address: delegator_address,
                validator_address: validator_address,
                pubkey: pubkey.toAmino(),
                value: value.toAmino(),
            },
        };
    };
    MsgCreateValidator.fromData = function (data, _) {
        _;
        var description = data.description, commission = data.commission, min_self_delegation = data.min_self_delegation, delegator_address = data.delegator_address, validator_address = data.validator_address, pubkey = data.pubkey, value = data.value;
        return new MsgCreateValidator(description, Validator_1.Validator.CommissionRates.fromData(commission), new numeric_1.Int(min_self_delegation), delegator_address, validator_address, PublicKey_1.ValConsPublicKey.fromData(pubkey), Coin_1.Coin.fromData(value));
    };
    MsgCreateValidator.prototype.toData = function (_) {
        _;
        var _a = this, description = _a.description, commission = _a.commission, min_self_delegation = _a.min_self_delegation, delegator_address = _a.delegator_address, validator_address = _a.validator_address, pubkey = _a.pubkey, value = _a.value;
        return {
            '@type': '/cosmos.staking.v1beta1.MsgCreateValidator',
            description: description,
            commission: commission.toData(),
            min_self_delegation: min_self_delegation.toString(),
            delegator_address: delegator_address,
            validator_address: validator_address,
            pubkey: pubkey.toData(),
            value: value.toData(),
        };
    };
    MsgCreateValidator.fromProto = function (proto, _) {
        _;
        return new MsgCreateValidator(Validator_1.Validator.Description.fromProto(proto.description), Validator_1.Validator.CommissionRates.fromProto(proto.commission), new numeric_1.Int(proto.minSelfDelegation), proto.delegatorAddress, proto.validatorAddress, PublicKey_1.PublicKey.fromProto(proto.pubkey), Coin_1.Coin.fromProto(proto.value));
    };
    MsgCreateValidator.prototype.toProto = function (_) {
        _;
        var _a = this, description = _a.description, commission = _a.commission, min_self_delegation = _a.min_self_delegation, delegator_address = _a.delegator_address, validator_address = _a.validator_address, pubkey = _a.pubkey, value = _a.value;
        return tx_1.MsgCreateValidator.fromPartial({
            commission: commission.toProto(),
            delegatorAddress: delegator_address,
            description: description.toProto(),
            minSelfDelegation: min_self_delegation.toString(),
            pubkey: pubkey.packAny(),
            validatorAddress: validator_address,
            value: value.toProto(),
        });
    };
    MsgCreateValidator.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.MsgCreateValidator',
            value: tx_1.MsgCreateValidator.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgCreateValidator.unpackAny = function (msgAny, isClassic) {
        return MsgCreateValidator.fromProto(tx_1.MsgCreateValidator.decode(msgAny.value), isClassic);
    };
    return MsgCreateValidator;
}(json_1.JSONSerializable));
exports.MsgCreateValidator = MsgCreateValidator;
//# sourceMappingURL=MsgCreateValidator.js.map