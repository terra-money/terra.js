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
exports.LazyGradedVestingAccount = void 0;
var Coins_1 = require("../Coins");
var json_1 = require("../../util/json");
var numeric_1 = require("../numeric");
var PublicKey_1 = require("../PublicKey");
/**
 * Holds information about a Account which has vesting information.
 */
var LazyGradedVestingAccount = /** @class */ (function (_super) {
    __extends(LazyGradedVestingAccount, _super);
    /**
     *
     * @param BaseAccount account information
     * @param original_vesting initial vesting amount
     * @param delegated_free
     * @param delegated_vesting
     * @param end_time  -not used-
     * @param vesting_schedules Entries that make up vesting
     */
    function LazyGradedVestingAccount(address, coins, public_key, account_number, sequence, original_vesting, delegated_free, delegated_vesting, end_time, vesting_schedules) {
        var _this = _super.call(this) || this;
        _this.address = address;
        _this.coins = coins;
        _this.public_key = public_key;
        _this.account_number = account_number;
        _this.sequence = sequence;
        _this.original_vesting = original_vesting;
        _this.delegated_free = delegated_free;
        _this.delegated_vesting = delegated_vesting;
        _this.end_time = end_time;
        _this.vesting_schedules = vesting_schedules;
        return _this;
    }
    LazyGradedVestingAccount.prototype.toData = function () {
        var _a = this, address = _a.address, coins = _a.coins, public_key = _a.public_key, account_number = _a.account_number, sequence = _a.sequence, original_vesting = _a.original_vesting, delegated_free = _a.delegated_free, delegated_vesting = _a.delegated_vesting, end_time = _a.end_time, vesting_schedules = _a.vesting_schedules;
        return {
            type: 'core/LazyGradedVestingAccount',
            value: {
                address: address,
                coins: coins.toData(),
                public_key: public_key && public_key.toData(),
                account_number: account_number.toFixed(),
                sequence: sequence.toFixed(),
                original_vesting: original_vesting.toData(),
                delegated_free: delegated_free.toData(),
                delegated_vesting: delegated_vesting.toData(),
                end_time: end_time.toFixed(),
                vesting_schedules: vesting_schedules.map(function (vs) { return vs.toData(); }),
            },
        };
    };
    LazyGradedVestingAccount.fromData = function (data) {
        var _a = data.value, address = _a.address, coins = _a.coins, public_key = _a.public_key, account_number = _a.account_number, sequence = _a.sequence, original_vesting = _a.original_vesting, delegated_free = _a.delegated_free, delegated_vesting = _a.delegated_vesting, end_time = _a.end_time, vesting_schedules = _a.vesting_schedules;
        return new LazyGradedVestingAccount(address, Coins_1.Coins.fromData(coins), public_key && PublicKey_1.PublicKey.fromData(public_key), Number.parseInt(account_number), Number.parseInt(sequence), Coins_1.Coins.fromData(original_vesting), Coins_1.Coins.fromData(delegated_free), Coins_1.Coins.fromData(delegated_vesting), Number.parseInt(end_time), vesting_schedules.map(function (vs) {
            return LazyGradedVestingAccount.VestingSchedule.fromData(vs);
        }));
    };
    return LazyGradedVestingAccount;
}(json_1.JSONSerializable));
exports.LazyGradedVestingAccount = LazyGradedVestingAccount;
(function (LazyGradedVestingAccount) {
    var VestingSchedule = /** @class */ (function (_super) {
        __extends(VestingSchedule, _super);
        function VestingSchedule(denom, schedules) {
            var _this = _super.call(this) || this;
            _this.denom = denom;
            _this.schedules = schedules;
            return _this;
        }
        VestingSchedule.prototype.toData = function () {
            var _a = this, denom = _a.denom, schedules = _a.schedules;
            return {
                denom: denom,
                schedules: schedules.map(function (s) { return s.toData(); }),
            };
        };
        VestingSchedule.fromData = function (data) {
            var denom = data.denom, schedules = data.schedules;
            return new VestingSchedule(denom, schedules.map(function (s) { return VestingSchedule.Entry.fromData(s); }));
        };
        return VestingSchedule;
    }(json_1.JSONSerializable));
    LazyGradedVestingAccount.VestingSchedule = VestingSchedule;
    (function (VestingSchedule) {
        var Entry = /** @class */ (function (_super) {
            __extends(Entry, _super);
            /**
             *
             * @param start_time Starting time (block height)
             * @param end_time Ending time (block height)
             * @param ratio Ratio (percentage of vested funds that should be released)
             */
            function Entry(start_time, end_time, ratio) {
                var _this = _super.call(this) || this;
                _this.start_time = start_time;
                _this.end_time = end_time;
                _this.ratio = ratio;
                return _this;
            }
            Entry.fromData = function (data) {
                var start_time = data.start_time, end_time = data.end_time, ratio = data.ratio;
                return new Entry(Number.parseInt(start_time), Number.parseInt(end_time), new numeric_1.Dec(ratio));
            };
            Entry.prototype.toData = function () {
                return {
                    start_time: this.start_time.toFixed(),
                    end_time: this.end_time.toFixed(),
                    ratio: this.ratio.toString(),
                };
            };
            return Entry;
        }(json_1.JSONSerializable));
        VestingSchedule.Entry = Entry;
    })(VestingSchedule = LazyGradedVestingAccount.VestingSchedule || (LazyGradedVestingAccount.VestingSchedule = {}));
})(LazyGradedVestingAccount = exports.LazyGradedVestingAccount || (exports.LazyGradedVestingAccount = {}));
exports.LazyGradedVestingAccount = LazyGradedVestingAccount;
//# sourceMappingURL=LazyGradedVestingAccount.js.map