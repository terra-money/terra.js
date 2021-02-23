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
exports.Redelegation = void 0;
var json_1 = require("../../util/json");
var numeric_1 = require("../numeric");
/**
 * A redelegation is when a delegator decides to stop staking with one validator and
 * transfer their delegation to another validator. Rather than unbonding (which takes
 * some time) and re-staking, the funds can be redelegated immediately if a
 * [[Redelegation.Entry]] can be created.
 *
 * A redelegation, like an unbonding delegation, is implemented through
 * [[Redelegation.Entry]] objects, limited by the `max_entry` parameter in the staking
 * module params. For each pair of source and target validators, you cannot redelegate
 * more times than the amount of entries. Entries are cleared when the redelegation is
 * completed, the same amount of time as unbonding.
 */
var Redelegation = /** @class */ (function (_super) {
    __extends(Redelegation, _super);
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_src_address source validator's operator address (from)
     * @param validator_dst_address target validator's operator address (to)
     * @param entries entries
     */
    function Redelegation(delegator_address, validator_src_address, validator_dst_address, entries) {
        var _this = _super.call(this) || this;
        _this.delegator_address = delegator_address;
        _this.validator_src_address = validator_src_address;
        _this.validator_dst_address = validator_dst_address;
        _this.entries = entries;
        return _this;
    }
    Redelegation.fromData = function (data) {
        var delegator_address = data.delegator_address, validator_src_address = data.validator_src_address, validator_dst_address = data.validator_dst_address, entries = data.entries;
        return new Redelegation(delegator_address, validator_src_address, validator_dst_address, entries.map(function (e) { return Redelegation.Entry.fromData(e); }));
    };
    Redelegation.prototype.toData = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, entries = _a.entries;
        return {
            delegator_address: delegator_address,
            validator_src_address: validator_src_address,
            validator_dst_address: validator_dst_address,
            entries: entries.map(function (e) { return e.toData(); }),
        };
    };
    return Redelegation;
}(json_1.JSONSerializable));
exports.Redelegation = Redelegation;
(function (Redelegation) {
    var Entry = /** @class */ (function (_super) {
        __extends(Entry, _super);
        /**
         *
         * @param initial_balance balance of delegation prior to initiating redelegation
         * @param balance 	balance of delegation after initiating redelegation
         * @param shares_dst
         * @param creation_height 	height of blockchain when entry was created
         * @param completion_time time when redelegation entry will be removed
         */
        function Entry(initial_balance, balance, shares_dst, creation_height, completion_time) {
            var _this = _super.call(this) || this;
            _this.initial_balance = initial_balance;
            _this.balance = balance;
            _this.shares_dst = shares_dst;
            _this.creation_height = creation_height;
            _this.completion_time = completion_time;
            return _this;
        }
        Entry.prototype.toData = function () {
            return {
                initial_balance: this.initial_balance.toString(),
                balance: this.balance.toString(),
                shares_dst: this.shares_dst.toString(),
                creation_height: this.creation_height,
                completion_time: this.completion_time.toISOString(),
            };
        };
        Entry.fromData = function (data) {
            var initial_balance = data.initial_balance, balance = data.balance, shares_dst = data.shares_dst, creation_height = data.creation_height, completion_time = data.completion_time;
            return new Entry(new numeric_1.Int(initial_balance), new numeric_1.Int(balance), new numeric_1.Dec(shares_dst), creation_height, new Date(completion_time));
        };
        return Entry;
    }(json_1.JSONSerializable));
    Redelegation.Entry = Entry;
})(Redelegation = exports.Redelegation || (exports.Redelegation = {}));
exports.Redelegation = Redelegation;
//# sourceMappingURL=Redelegation.js.map