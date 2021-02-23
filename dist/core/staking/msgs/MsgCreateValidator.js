"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
    MsgCreateValidator.fromData = function (data) {
        var _a = data.value, description = _a.description, commission = _a.commission, min_self_delegation = _a.min_self_delegation, delegator_address = _a.delegator_address, validator_address = _a.validator_address, pubkey = _a.pubkey, value = _a.value;
        return new MsgCreateValidator(description, Validator_1.Validator.CommissionRates.fromData(commission), new numeric_1.Int(min_self_delegation), delegator_address, validator_address, pubkey, Coin_1.Coin.fromData(value));
    };
    MsgCreateValidator.prototype.toData = function () {
        var _a = this, description = _a.description, commission = _a.commission, min_self_delegation = _a.min_self_delegation, delegator_address = _a.delegator_address, validator_address = _a.validator_address, pubkey = _a.pubkey, value = _a.value;
        return {
            type: 'staking/MsgCreateValidator',
            value: {
                description: description,
                commission: commission.toData(),
                min_self_delegation: min_self_delegation.toString(),
                delegator_address: delegator_address,
                validator_address: validator_address,
                pubkey: pubkey,
                value: value.toData(),
            },
        };
    };
    return MsgCreateValidator;
}(json_1.JSONSerializable));
exports.MsgCreateValidator = MsgCreateValidator;
//# sourceMappingURL=MsgCreateValidator.js.map