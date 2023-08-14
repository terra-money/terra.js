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
exports.UnbondingDelegation = void 0;
var json_1 = require("../../util/json");
var numeric_1 = require("../numeric");
var staking_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/staking");
var Long = __importStar(require("long"));
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
    UnbondingDelegation.fromAmino = function (data) {
        var delegator_address = data.delegator_address, validator_address = data.validator_address, entries = data.entries;
        return new UnbondingDelegation(delegator_address, validator_address, entries.map(function (e) { return UnbondingDelegation.Entry.fromAmino(e); }));
    };
    UnbondingDelegation.prototype.toAmino = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address, entries = _a.entries;
        return {
            delegator_address: delegator_address,
            validator_address: validator_address,
            entries: entries.map(function (e) { return e.toAmino(); }),
        };
    };
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
    UnbondingDelegation.prototype.toProto = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_address = _a.validator_address, entries = _a.entries;
        return staking_1.UnbondingDelegation.fromPartial({
            delegatorAddress: delegator_address,
            entries: entries.map(function (e) { return e.toProto(); }),
            validatorAddress: validator_address,
        });
    };
    UnbondingDelegation.fromProto = function (proto) {
        return new UnbondingDelegation(proto.delegatorAddress, proto.validatorAddress, proto.entries.map(function (e) { return UnbondingDelegation.Entry.fromProto(e); }));
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
        Entry.prototype.toAmino = function () {
            return {
                initial_balance: this.initial_balance.toString(),
                balance: this.balance.toString(),
                creation_height: this.creation_height.toFixed(),
                completion_time: this.completion_time.toISOString(),
            };
        };
        Entry.fromAmino = function (data) {
            var initial_balance = data.initial_balance, balance = data.balance, creation_height = data.creation_height, completion_time = data.completion_time;
            return new Entry(new numeric_1.Int(initial_balance), new numeric_1.Int(balance), Number.parseInt(creation_height), new Date(completion_time));
        };
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
        Entry.prototype.toProto = function () {
            var _a = this, initial_balance = _a.initial_balance, balance = _a.balance, creation_height = _a.creation_height, completion_time = _a.completion_time;
            return staking_1.UnbondingDelegationEntry.fromPartial({
                balance: balance.toString(),
                completionTime: completion_time,
                creationHeight: Long.fromNumber(creation_height),
                initialBalance: initial_balance.toString(),
            });
        };
        Entry.fromProto = function (proto) {
            return new Entry(new numeric_1.Int(proto.initialBalance), new numeric_1.Int(proto.balance), proto.creationHeight.toNumber(), proto.completionTime);
        };
        return Entry;
    }(json_1.JSONSerializable));
    UnbondingDelegation.Entry = Entry;
})(UnbondingDelegation = exports.UnbondingDelegation || (exports.UnbondingDelegation = {}));
exports.UnbondingDelegation = UnbondingDelegation;
//# sourceMappingURL=UnbondingDelegation.js.map