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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.BaseVestingAccount = void 0;
var json_1 = require("../../util/json");
var Coins_1 = require("../Coins");
var BaseAccount_1 = require("./BaseAccount");
var vesting_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting");
var Long = __importStar(require("long"));
/**
 * Holds information about a Account which has vesting information.
 */
var BaseVestingAccount = /** @class */ (function (_super) {
    __extends(BaseVestingAccount, _super);
    /**
     *
     * @param base_account account information
     * @param original_vesting initial vesting amount
     * @param delegated_free
     * @param delegated_vesting
     * @param end_time
     */
    function BaseVestingAccount(base_account, original_vesting, delegated_free, delegated_vesting, end_time) {
        var _this = _super.call(this) || this;
        _this.base_account = base_account;
        _this.original_vesting = original_vesting;
        _this.delegated_free = delegated_free;
        _this.delegated_vesting = delegated_vesting;
        _this.end_time = end_time;
        return _this;
    }
    BaseVestingAccount.prototype.getAccountNumber = function () {
        return this.base_account.account_number;
    };
    BaseVestingAccount.prototype.getSequenceNumber = function () {
        return this.base_account.sequence;
    };
    BaseVestingAccount.prototype.getPublicKey = function () {
        return this.base_account.public_key;
    };
    BaseVestingAccount.prototype.toAmino = function (isClassic) {
        var _a = this, base_account = _a.base_account, original_vesting = _a.original_vesting, delegated_free = _a.delegated_free, delegated_vesting = _a.delegated_vesting, end_time = _a.end_time;
        return {
            type: isClassic
                ? 'core/BaseVestingAccount'
                : 'cosmos-sdk/BaseVestingAccount',
            value: {
                base_account: base_account.toAmino().value,
                delegated_free: delegated_free.toAmino(),
                delegated_vesting: delegated_vesting.toAmino(),
                end_time: end_time.toFixed(),
                original_vesting: original_vesting.toAmino(),
            },
        };
    };
    BaseVestingAccount.fromAmino = function (amino, isClassic) {
        var base_account = BaseAccount_1.BaseAccount.fromAmino({
            type: isClassic ? 'core/Account' : 'cosmos-sdk/BaseAccount',
            value: amino.value.base_account,
        });
        return new BaseVestingAccount(base_account, Coins_1.Coins.fromAmino(amino.value.original_vesting), Coins_1.Coins.fromAmino(amino.value.delegated_free), Coins_1.Coins.fromAmino(amino.value.delegated_vesting), Number.parseInt(amino.value.end_time));
    };
    BaseVestingAccount.prototype.toData = function (_) {
        _;
        var _a = this, base_account = _a.base_account, original_vesting = _a.original_vesting, delegated_free = _a.delegated_free, delegated_vesting = _a.delegated_vesting, end_time = _a.end_time;
        return {
            '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount',
            base_account: base_account.toData(),
            delegated_free: delegated_free.toData(),
            delegated_vesting: delegated_vesting.toData(),
            end_time: end_time.toFixed(),
            original_vesting: original_vesting.toData(),
        };
    };
    BaseVestingAccount.fromData = function (data, _) {
        _;
        var base_account = BaseAccount_1.BaseAccount.fromData(__assign({ '@type': '/cosmos.auth.v1beta1.BaseAccount' }, data.base_account));
        return new BaseVestingAccount(base_account, Coins_1.Coins.fromData(data.original_vesting), Coins_1.Coins.fromData(data.delegated_free), Coins_1.Coins.fromData(data.delegated_vesting), Number.parseInt(data.end_time));
    };
    BaseVestingAccount.prototype.toProto = function (_) {
        _;
        var _a = this, base_account = _a.base_account, original_vesting = _a.original_vesting, delegated_free = _a.delegated_free, delegated_vesting = _a.delegated_vesting, end_time = _a.end_time;
        return vesting_1.BaseVestingAccount.fromPartial({
            baseAccount: base_account.toProto(),
            delegatedFree: delegated_free.toProto(),
            delegatedVesting: delegated_vesting.toProto(),
            endTime: Long.fromNumber(end_time),
            originalVesting: original_vesting.toProto(),
        });
    };
    BaseVestingAccount.fromProto = function (proto, _) {
        _;
        var baseAccount = BaseAccount_1.BaseAccount.fromProto(proto.baseAccount);
        return new BaseVestingAccount(baseAccount, Coins_1.Coins.fromProto(proto.originalVesting), Coins_1.Coins.fromProto(proto.delegatedFree), Coins_1.Coins.fromProto(proto.delegatedVesting), proto.endTime.toNumber());
    };
    return BaseVestingAccount;
}(json_1.JSONSerializable));
exports.BaseVestingAccount = BaseVestingAccount;
//# sourceMappingURL=BaseVestingAccount.js.map