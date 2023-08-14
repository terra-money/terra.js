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
exports.MsgEditValidator = void 0;
var json_1 = require("../../../util/json");
var numeric_1 = require("../../numeric");
var Validator_1 = require("../Validator");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/tx");
/**
 * A validator can edit its delegate information, such as moniker, website, commission
 * rate, etc.
 *
 * You must use special or sentinel values to inform that you want to leave the current
 * field untouched. For `Description`,` you should start with [[MsgEditValidator.DESC_DO_NOT_MODIFY]] and
 * change each field you wish to modify individually.
 */
var MsgEditValidator = /** @class */ (function (_super) {
    __extends(MsgEditValidator, _super);
    /**
     * @param Description new description to apply
     * @param address new address to apply
     * @param commission_rate new commission rates to apply
     * @param min_self_delegation new min self delegation
     */
    function MsgEditValidator(description, validator_address, commission_rate, min_self_delegation) {
        var _this = _super.call(this) || this;
        _this.description = description;
        _this.validator_address = validator_address;
        _this.commission_rate = commission_rate;
        _this.min_self_delegation = min_self_delegation;
        return _this;
    }
    MsgEditValidator.fromAmino = function (data, _) {
        _;
        var _a = data.value, description = _a.description, validator_address = _a.validator_address, commission_rate = _a.commission_rate, min_self_delegation = _a.min_self_delegation;
        return new MsgEditValidator(Validator_1.Validator.Description.fromAmino(description), validator_address, commission_rate ? new numeric_1.Dec(commission_rate) : undefined, min_self_delegation ? new numeric_1.Int(min_self_delegation) : undefined);
    };
    MsgEditValidator.prototype.toAmino = function (isClassic) {
        var _a = this, description = _a.description, validator_address = _a.validator_address, commission_rate = _a.commission_rate, min_self_delegation = _a.min_self_delegation;
        return {
            type: isClassic
                ? 'staking/MsgEditValidator'
                : 'cosmos-sdk/MsgEditValidator',
            value: {
                description: description,
                validator_address: validator_address,
                commission_rate: commission_rate
                    ? commission_rate.toString()
                    : undefined,
                min_self_delegation: min_self_delegation
                    ? min_self_delegation.toString()
                    : undefined,
            },
        };
    };
    MsgEditValidator.fromProto = function (data, _) {
        _;
        return new MsgEditValidator(Validator_1.Validator.Description.fromProto(data.description), data.validatorAddress, data.commissionRate !== '' ? new numeric_1.Dec(data.commissionRate) : undefined, data.minSelfDelegation !== ''
            ? new numeric_1.Int(data.minSelfDelegation)
            : undefined);
    };
    MsgEditValidator.prototype.toProto = function (_) {
        _;
        var _a = this, description = _a.description, validator_address = _a.validator_address, commission_rate = _a.commission_rate, min_self_delegation = _a.min_self_delegation;
        return tx_1.MsgEditValidator.fromPartial({
            description: description.toProto(),
            commissionRate: (commission_rate === null || commission_rate === void 0 ? void 0 : commission_rate.toString()) || '',
            minSelfDelegation: (min_self_delegation === null || min_self_delegation === void 0 ? void 0 : min_self_delegation.toString()) || '',
            validatorAddress: validator_address,
        });
    };
    MsgEditValidator.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.MsgEditValidator',
            value: tx_1.MsgEditValidator.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgEditValidator.unpackAny = function (msgAny, isClassic) {
        return MsgEditValidator.fromProto(tx_1.MsgEditValidator.decode(msgAny.value), isClassic);
    };
    MsgEditValidator.fromData = function (data, _) {
        _;
        var description = data.description, validator_address = data.validator_address, commission_rate = data.commission_rate, min_self_delegation = data.min_self_delegation;
        return new MsgEditValidator(Validator_1.Validator.Description.fromData(description), validator_address, commission_rate ? new numeric_1.Dec(commission_rate) : undefined, min_self_delegation ? new numeric_1.Int(min_self_delegation) : undefined);
    };
    MsgEditValidator.prototype.toData = function (_) {
        _;
        var _a = this, description = _a.description, validator_address = _a.validator_address, commission_rate = _a.commission_rate, min_self_delegation = _a.min_self_delegation;
        return {
            '@type': '/cosmos.staking.v1beta1.MsgEditValidator',
            description: description,
            validator_address: validator_address,
            commission_rate: commission_rate ? commission_rate.toString() : undefined,
            min_self_delegation: min_self_delegation
                ? min_self_delegation.toString()
                : undefined,
        };
    };
    return MsgEditValidator;
}(json_1.JSONSerializable));
exports.MsgEditValidator = MsgEditValidator;
(function (MsgEditValidator) {
    MsgEditValidator.DESC_DO_NOT_MODIFY = {
        moniker: '[do-not-modify]',
        website: '[do-not-modify]',
        identity: '[do-not-modify]',
        details: '[do-not-modify]',
        security_contact: '[do-not-modify]',
    };
})(MsgEditValidator = exports.MsgEditValidator || (exports.MsgEditValidator = {}));
exports.MsgEditValidator = MsgEditValidator;
//# sourceMappingURL=MsgEditValidator.js.map