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
exports.Redelegation = void 0;
var json_1 = require("../../util/json");
var numeric_1 = require("../numeric");
var staking_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/staking");
var Long = __importStar(require("long"));
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
    Redelegation.fromAmino = function (data) {
        var _a = data.redelegation, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, entries = data.entries;
        return new Redelegation(delegator_address, validator_src_address, validator_dst_address, entries.map(function (e) { return Redelegation.Entry.fromAmino(e); }));
    };
    Redelegation.prototype.toAmino = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, entries = _a.entries;
        return {
            redelegation: {
                delegator_address: delegator_address,
                validator_src_address: validator_src_address,
                validator_dst_address: validator_dst_address,
            },
            entries: entries.map(function (e) { return e.toAmino(); }),
        };
    };
    Redelegation.fromData = function (data) {
        var _a = data.redelegation, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, entries = data.entries;
        return new Redelegation(delegator_address, validator_src_address, validator_dst_address, entries.map(function (e) { return Redelegation.Entry.fromData(e); }));
    };
    Redelegation.prototype.toData = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, entries = _a.entries;
        return {
            redelegation: {
                delegator_address: delegator_address,
                validator_src_address: validator_src_address,
                validator_dst_address: validator_dst_address,
            },
            entries: entries.map(function (e) { return e.toData(); }),
        };
    };
    Redelegation.fromProto = function (data) {
        var redelegationProto = data.redelegation;
        return new Redelegation(redelegationProto.delegatorAddress, redelegationProto.validatorDstAddress, redelegationProto.validatorDstAddress, data.entries.map(function (e) { return Redelegation.Entry.fromProto(e); }));
    };
    Redelegation.prototype.toProto = function () {
        var _a = this, delegator_address = _a.delegator_address, validator_src_address = _a.validator_src_address, validator_dst_address = _a.validator_dst_address, entries = _a.entries;
        return staking_1.RedelegationResponse.fromPartial({
            entries: entries.map(function (e) { return e.toProto(); }),
            redelegation: staking_1.Redelegation.fromPartial({
                delegatorAddress: delegator_address,
                entries: entries.map(function (e) { return e.toProto().redelegationEntry; }),
                validatorDstAddress: validator_dst_address,
                validatorSrcAddress: validator_src_address,
            }),
        });
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
        Entry.prototype.toAmino = function () {
            return {
                redelegation_entry: {
                    initial_balance: this.initial_balance.toString(),
                    shares_dst: this.shares_dst.toString(),
                    creation_height: this.creation_height,
                    completion_time: this.completion_time.toISOString(),
                },
                balance: this.balance.toString(),
            };
        };
        Entry.fromAmino = function (data) {
            var _a = data.redelegation_entry, initial_balance = _a.initial_balance, shares_dst = _a.shares_dst, creation_height = _a.creation_height, completion_time = _a.completion_time, balance = data.balance;
            return new Entry(new numeric_1.Int(initial_balance), new numeric_1.Int(balance), new numeric_1.Dec(shares_dst), creation_height, new Date(completion_time));
        };
        Entry.prototype.toData = function () {
            return {
                redelegation_entry: {
                    initial_balance: this.initial_balance.toString(),
                    shares_dst: this.shares_dst.toString(),
                    creation_height: this.creation_height,
                    completion_time: this.completion_time.toISOString(),
                },
                balance: this.balance.toString(),
            };
        };
        Entry.fromData = function (data) {
            var _a = data.redelegation_entry, initial_balance = _a.initial_balance, shares_dst = _a.shares_dst, creation_height = _a.creation_height, completion_time = _a.completion_time, balance = data.balance;
            return new Entry(new numeric_1.Int(initial_balance), new numeric_1.Int(balance), new numeric_1.Dec(shares_dst), creation_height, new Date(completion_time));
        };
        Entry.prototype.toProto = function () {
            var _a = this, initial_balance = _a.initial_balance, balance = _a.balance, shares_dst = _a.shares_dst, creation_height = _a.creation_height, completion_time = _a.completion_time;
            return staking_1.RedelegationEntryResponse.fromPartial({
                balance: balance.toString(),
                redelegationEntry: staking_1.RedelegationEntry.fromPartial({
                    completionTime: completion_time,
                    creationHeight: Long.fromNumber(creation_height),
                    initialBalance: initial_balance.toString(),
                    sharesDst: shares_dst.toString(),
                }),
            });
        };
        Entry.fromProto = function (proto) {
            var redelegationEntryProto = proto.redelegationEntry;
            return new Entry(new numeric_1.Int(redelegationEntryProto.initialBalance), new numeric_1.Int(proto.balance), new numeric_1.Dec(redelegationEntryProto.sharesDst), redelegationEntryProto.creationHeight.toNumber(), redelegationEntryProto.completionTime);
        };
        return Entry;
    }(json_1.JSONSerializable));
    Redelegation.Entry = Entry;
})(Redelegation = exports.Redelegation || (exports.Redelegation = {}));
exports.Redelegation = Redelegation;
//# sourceMappingURL=Redelegation.js.map