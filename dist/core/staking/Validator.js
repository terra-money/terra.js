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
exports.Validator = void 0;
var json_1 = require("../../util/json");
var numeric_1 = require("../numeric");
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
    Validator.prototype.toData = function () {
        return {
            operator_address: this.operator_address,
            consensus_pubkey: this.consensus_pubkey,
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
        return new Validator(data.operator_address, data.consensus_pubkey, data.jailed, data.status, new numeric_1.Int(data.tokens), new numeric_1.Dec(data.delegator_shares), data.description, Number.parseInt(data.unbonding_height), new Date(data.unbonding_time), Validator.Commission.fromData(data.commission), new numeric_1.Int(data.min_self_delegation));
    };
    return Validator;
}(json_1.JSONSerializable));
exports.Validator = Validator;
(function (Validator) {
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
        Commission.prototype.toData = function () {
            return {
                commission_rates: this.commission_rates.toData(),
                update_time: this.update_time.toISOString(),
            };
        };
        Commission.fromData = function (data) {
            return new Commission(CommissionRates.fromData(data.commission_rates), new Date(data.update_time));
        };
        return Commission;
    }(json_1.JSONSerializable));
    Validator.Commission = Commission;
})(Validator = exports.Validator || (exports.Validator = {}));
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map