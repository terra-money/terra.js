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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
var json_1 = require("../../util/json");
var numeric_1 = require("../numeric");
var PublicKey_1 = require("../PublicKey");
var staking_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/staking");
var Long = __importStar(require("long"));
/**
 * Stores information fetched from the blockchain about the current status of a validator.
 * As an end user, you will not have to create an instance of this class, one will be
 * generated for you to store information about a validator polled from the API functions
 * in [[StakingAPI]].
 */
var Validator = /** @class */ (function (_super) {
    __extends(Validator, _super);
    /**
     *
     * @param operator_address validator's operator address
     * @param consensus_pubkey validator's consensus public key
     * @param jailed whether the current validator is jailed
     * @param status unbonded `0`, unbonding `1`, bonded `2`
     * @param tokens total Luna from all delegations (including self)
     * @param delegator_shares total shares of all delegators
     * @param description validator's delegate description
     * @param unbonding_height if unbonding, height at which this validator began unbonding
     * @param unbonding_time if unbonding, min time for the validator to complete unbonding
     * @param commission validator commission
     * @param min_self_delegation minimum self delegation
     */
    function Validator(operator_address, consensus_pubkey, jailed, status, tokens, delegator_shares, description, unbonding_height, unbonding_time, commission, min_self_delegation) {
        var _this = _super.call(this) || this;
        _this.operator_address = operator_address;
        _this.consensus_pubkey = consensus_pubkey;
        _this.jailed = jailed;
        _this.status = status;
        _this.tokens = tokens;
        _this.delegator_shares = delegator_shares;
        _this.description = description;
        _this.unbonding_height = unbonding_height;
        _this.unbonding_time = unbonding_time;
        _this.commission = commission;
        _this.min_self_delegation = min_self_delegation;
        return _this;
    }
    Validator.prototype.toAmino = function () {
        return {
            operator_address: this.operator_address,
            consensus_pubkey: this.consensus_pubkey.toAmino(),
            jailed: this.jailed,
            status: this.status,
            tokens: this.tokens.toString(),
            delegator_shares: this.delegator_shares.toString(),
            description: this.description,
            unbonding_height: this.unbonding_height.toFixed(),
            unbonding_time: this.unbonding_time.toISOString(),
            commission: this.commission.toAmino(),
            min_self_delegation: this.min_self_delegation.toString(),
        };
    };
    Validator.fromAmino = function (data) {
        return new Validator(data.operator_address, PublicKey_1.ValConsPublicKey.fromAmino(data.consensus_pubkey), data.jailed || false, data.status || 0, new numeric_1.Int(data.tokens), new numeric_1.Dec(data.delegator_shares), Validator.Description.fromAmino(data.description), Number.parseInt(data.unbonding_height), new Date(data.unbonding_time), Validator.Commission.fromAmino(data.commission), new numeric_1.Int(data.min_self_delegation));
    };
    Validator.prototype.toData = function () {
        return {
            operator_address: this.operator_address,
            consensus_pubkey: this.consensus_pubkey.toData(),
            jailed: this.jailed,
            status: this.status,
            tokens: this.tokens.toString(),
            delegator_shares: this.delegator_shares.toString(),
            description: this.description,
            unbonding_height: this.unbonding_height.toFixed(),
            unbonding_time: this.unbonding_time.toISOString(),
            commission: this.commission.toData(),
            min_self_delegation: this.min_self_delegation.toString(),
        };
    };
    Validator.fromData = function (data) {
        return new Validator(data.operator_address, PublicKey_1.ValConsPublicKey.fromData(data.consensus_pubkey), data.jailed || false, data.status || 0, new numeric_1.Int(data.tokens), new numeric_1.Dec(data.delegator_shares), Validator.Description.fromData(data.description), Number.parseInt(data.unbonding_height), new Date(data.unbonding_time), Validator.Commission.fromData(data.commission), new numeric_1.Int(data.min_self_delegation));
    };
    Validator.prototype.toProto = function () {
        var _a = this, operator_address = _a.operator_address, consensus_pubkey = _a.consensus_pubkey, jailed = _a.jailed, status = _a.status, tokens = _a.tokens, delegator_shares = _a.delegator_shares, description = _a.description, unbonding_height = _a.unbonding_height, unbonding_time = _a.unbonding_time, commission = _a.commission, min_self_delegation = _a.min_self_delegation;
        return staking_1.Validator.fromPartial({
            commission: commission.toProto(),
            consensusPubkey: consensus_pubkey.packAny(),
            delegatorShares: delegator_shares.toString(),
            description: description.toProto(),
            jailed: jailed,
            minSelfDelegation: min_self_delegation.toString(),
            operatorAddress: operator_address,
            status: status,
            tokens: tokens.toString(),
            unbondingHeight: Long.fromNumber(unbonding_height),
            unbondingTime: unbonding_time,
        });
    };
    Validator.fromProto = function (data) {
        return new Validator(data.operatorAddress, PublicKey_1.ValConsPublicKey.unpackAny(data.consensusPubkey), data.jailed, data.status, new numeric_1.Int(data.tokens), new numeric_1.Dec(data.delegatorShares), Validator.Description.fromProto(data.description), data.unbondingHeight.toNumber(), data.unbondingTime, Validator.Commission.fromProto(data.commission), new numeric_1.Int(data.minSelfDelegation));
    };
    return Validator;
}(json_1.JSONSerializable));
exports.Validator = Validator;
(function (Validator) {
    Validator.Status = staking_1.BondStatus;
    var Description = /** @class */ (function (_super) {
        __extends(Description, _super);
        /**
         * @param moniker Identifying name, e.g. "Hashed"
         * @param identity time at which commission was last updated
         * @param website validator's website
         * @param details long description
         * @param security_contact validator's contact
         */
        function Description(moniker, identity, website, details, security_contact) {
            var _this = _super.call(this) || this;
            _this.moniker = moniker;
            _this.identity = identity;
            _this.website = website;
            _this.details = details;
            _this.security_contact = security_contact;
            return _this;
        }
        Description.prototype.toAmino = function () {
            return {
                moniker: this.moniker,
                identity: this.identity,
                website: this.website,
                details: this.details,
                security_contact: this.security_contact,
            };
        };
        Description.fromAmino = function (data) {
            return new Description(data.moniker, data.identity || '', data.website || '', data.details || '', data.security_contact || '');
        };
        Description.prototype.toData = function () {
            return {
                moniker: this.moniker,
                identity: this.identity,
                website: this.website,
                details: this.details,
                security_contact: this.security_contact,
            };
        };
        Description.fromData = function (data) {
            return new Description(data.moniker, data.identity || '', data.website || '', data.details || '', data.security_contact || '');
        };
        Description.prototype.toProto = function () {
            var _a = this, moniker = _a.moniker, identity = _a.identity, website = _a.website, details = _a.details, security_contact = _a.security_contact;
            return staking_1.Description.fromPartial({
                details: details,
                identity: identity,
                moniker: moniker,
                securityContact: security_contact,
                website: website,
            });
        };
        Description.fromProto = function (proto) {
            return new Description(proto.moniker, proto.identity, proto.website, proto.details, proto.securityContact);
        };
        return Description;
    }(json_1.JSONSerializable));
    Validator.Description = Description;
    var CommissionRates = /** @class */ (function (_super) {
        __extends(CommissionRates, _super);
        /**
         * @param rate current commission rate
         * @param max_rate max commission rate
         * @param max_change_rate max percentage commission can change in 24hrs
         */
        function CommissionRates(rate, max_rate, max_change_rate) {
            var _this = _super.call(this) || this;
            _this.rate = rate;
            _this.max_rate = max_rate;
            _this.max_change_rate = max_change_rate;
            return _this;
        }
        CommissionRates.fromAmino = function (data) {
            var rate = data.rate, max_rate = data.max_rate, max_change_rate = data.max_change_rate;
            return new CommissionRates(new numeric_1.Dec(rate), new numeric_1.Dec(max_rate), new numeric_1.Dec(max_change_rate));
        };
        CommissionRates.prototype.toAmino = function () {
            var _a = this, rate = _a.rate, max_rate = _a.max_rate, max_change_rate = _a.max_change_rate;
            return {
                rate: rate.toString(),
                max_rate: max_rate.toString(),
                max_change_rate: max_change_rate.toString(),
            };
        };
        CommissionRates.fromData = function (data) {
            var rate = data.rate, max_rate = data.max_rate, max_change_rate = data.max_change_rate;
            return new CommissionRates(new numeric_1.Dec(rate), new numeric_1.Dec(max_rate), new numeric_1.Dec(max_change_rate));
        };
        CommissionRates.prototype.toData = function () {
            var _a = this, rate = _a.rate, max_rate = _a.max_rate, max_change_rate = _a.max_change_rate;
            return {
                rate: rate.toString(),
                max_rate: max_rate.toString(),
                max_change_rate: max_change_rate.toString(),
            };
        };
        CommissionRates.fromProto = function (proto) {
            return new CommissionRates(new numeric_1.Dec(proto.rate), new numeric_1.Dec(proto.maxRate), new numeric_1.Dec(proto.maxChangeRate));
        };
        CommissionRates.prototype.toProto = function () {
            var _a = this, rate = _a.rate, max_rate = _a.max_rate, max_change_rate = _a.max_change_rate;
            return staking_1.CommissionRates.fromPartial({
                maxChangeRate: max_change_rate.toString(),
                maxRate: max_rate.toString(),
                rate: rate.toString(),
            });
        };
        return CommissionRates;
    }(json_1.JSONSerializable));
    Validator.CommissionRates = CommissionRates;
    var Commission = /** @class */ (function (_super) {
        __extends(Commission, _super);
        /**
         * @param commission_rates commission rates
         * @param update_time time at which commission was last updated
         */
        function Commission(commission_rates, update_time) {
            var _this = _super.call(this) || this;
            _this.commission_rates = commission_rates;
            _this.update_time = update_time;
            return _this;
        }
        Commission.prototype.toAmino = function () {
            return {
                commission_rates: this.commission_rates.toAmino(),
                update_time: this.update_time.toISOString(),
            };
        };
        Commission.fromAmino = function (data) {
            return new Commission(CommissionRates.fromAmino(data.commission_rates), new Date(data.update_time));
        };
        Commission.prototype.toData = function () {
            return {
                commission_rates: this.commission_rates.toData(),
                update_time: this.update_time.toISOString(),
            };
        };
        Commission.fromData = function (data) {
            return new Commission(CommissionRates.fromData(data.commission_rates), new Date(data.update_time));
        };
        Commission.prototype.toProto = function () {
            var _a = this, commission_rates = _a.commission_rates, update_time = _a.update_time;
            return staking_1.Commission.fromPartial({
                commissionRates: commission_rates.toProto(),
                updateTime: update_time,
            });
        };
        Commission.fromProto = function (proto) {
            return new Commission(CommissionRates.fromProto(proto.commissionRates), proto.updateTime);
        };
        return Commission;
    }(json_1.JSONSerializable));
    Validator.Commission = Commission;
})(Validator = exports.Validator || (exports.Validator = {}));
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map