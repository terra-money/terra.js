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
exports.UnbondingDelegation = void 0;
var json_1 = require("../../util/json");
var numeric_1 = require("../numeric");
/**
 * When a delegator decides to take out their funds from the staking pool, they must
 * unbond their tokens which takes an amount of time specified by `unbonding_time`
 * parameter in the staking module.
 *
 * An unbonding delegation is implemented through creating [[UnbondingDelegation.Entry]]
 * objects, limited by the max_entry parameter in the staking module params. You cannot
 * initiate unbonds more times than the amount of entries permitted. Entries are cleared
 * when their unbonding periods are completed and the funds are returned to the
 * delegator's account balance to be spent freely.
 */
var UnbondingDelegation = /** @class */ (function (_super) {
    __extends(UnbondingDelegation, _super);
    function UnbondingDelegation(delegator_address, validator_address, entries) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.validator_address = validator_address;
        _this.entries = entries;
        return _this;
    }
    UnbondingDelegation.fromData = function (data) {
        var delegator_address = data.delegator_address, validator_address = data.validator_address, entries = data.entries;
        return new UnbondingDelegation(delegator_address, validator_address, entries.map(function (e) { return UnbondingDelegation.Entry.fromData(e); }));
    };
    UnbondingDelegation.prototype.toData = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address, entries = _a.entries;
        return {
            delegator_address: delegator_address,
            validator_address: validator_address,
            entries: entries.map(function (e) { return e.toData(); }),
        };
    };
    return UnbondingDelegation;
}(json_1.JSONSerializable));
exports.UnbondingDelegation = UnbondingDelegation;
(function (UnbondingDelegation) {
    var Entry = /** @class */ (function (_super) {
        __extends(Entry, _super);
        /**
         * Note that the size of the undelegation is `initial_balance - balance`
         * @param initial_balance balance of delegation prior to initiating unbond
         * @param balance balance of delegation after initiating unbond
         * @param creation_height height of blockchain when entry was created
         * @param completion_time time when unbonding will be completed
         */
        function Entry(initial_balance, balance, creation_height, completion_time) {
            var _this = _super.call(this) || this;
            _this.initial_balance = initial_balance;
            _this.balance = balance;
            _this.creation_height = creation_height;
            _this.completion_time = completion_time;
            return _this;
        }
        Entry.prototype.toData = function () {
            return {
                initial_balance: this.initial_balance.toString(),
                balance: this.balance.toString(),
                creation_height: this.creation_height.toFixed(),
                completion_time: this.completion_time.toISOString(),
            };
        };
        Entry.fromData = function (data) {
            var initial_balance = data.initial_balance, balance = data.balance, creation_height = data.creation_height, completion_time = data.completion_time;
            return new Entry(new numeric_1.Int(initial_balance), new numeric_1.Int(balance), Number.parseInt(creation_height), new Date(completion_time));
        };
        return Entry;
    }(json_1.JSONSerializable));
    UnbondingDelegation.Entry = Entry;
})(UnbondingDelegation = exports.UnbondingDelegation || (exports.UnbondingDelegation = {}));
exports.UnbondingDelegation = UnbondingDelegation;
//# sourceMappingURL=UnbondingDelegation.js.map