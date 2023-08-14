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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayedVestingAccount = void 0;
var json_1 = require("../../util/json");
var BaseVestingAccount_1 = require("./BaseVestingAccount");
var vesting_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
/**
 * DelayedVestingAccount implements the VestingAccount interface. It vests all
 * coins after a specific time, but non prior. In other words, it keeps them
 * locked until a specified time.
 */
var DelayedVestingAccount = /** @class */ (function (_super) {
    __extends(DelayedVestingAccount, _super);
    /**
     *
     * @param base_vesting_account account information
     */
    function DelayedVestingAccount(base_vesting_account) {
        var _this = _super.call(this) || this;
        _this.base_vesting_account = base_vesting_account;
        return _this;
    }
    DelayedVestingAccount.prototype.getAccountNumber = function () {
        return this.base_vesting_account.getAccountNumber();
    };
    DelayedVestingAccount.prototype.getSequenceNumber = function () {
        return this.base_vesting_account.getSequenceNumber();
    };
    DelayedVestingAccount.prototype.getPublicKey = function () {
        return this.base_vesting_account.base_account.public_key;
    };
    DelayedVestingAccount.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var base_vesting_account = this.base_vesting_account;
        return {
            type: 'cosmos-sdk/DelayedVestingAccount',
            value: {
                base_vesting_account: base_vesting_account.toAmino().value,
            },
        };
    };
    DelayedVestingAccount.fromAmino = function (data, isClassic) {
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromAmino({
            type: 'cosmos-sdk/BaseVestingAccount',
            value: data.value.base_vesting_account,
        });
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new DelayedVestingAccount(base_vesting_account);
    };
    DelayedVestingAccount.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var base_vesting_account = this.base_vesting_account;
        return {
            '@type': '/cosmos.vesting.v1beta1.DelayedVestingAccount',
            base_vesting_account: base_vesting_account.toData(),
        };
    };
    DelayedVestingAccount.fromData = function (data, isClassic) {
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromData(__assign({ '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount' }, data.base_vesting_account));
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new DelayedVestingAccount(base_vesting_account);
    };
    DelayedVestingAccount.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var base_vesting_account = this.base_vesting_account;
        return vesting_1.DelayedVestingAccount.fromPartial({
            baseVestingAccount: base_vesting_account.toProto(),
        });
    };
    DelayedVestingAccount.fromProto = function (DelayedVestingAccountProto, isClassic) {
        var baseVestingAccount = BaseVestingAccount_1.BaseVestingAccount.fromProto(DelayedVestingAccountProto.baseVestingAccount);
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new DelayedVestingAccount(baseVestingAccount);
    };
    DelayedVestingAccount.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.DelayedVestingAccount',
            value: vesting_1.DelayedVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    };
    DelayedVestingAccount.unpackAny = function (pubkeyAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return DelayedVestingAccount.fromProto(vesting_1.DelayedVestingAccount.decode(pubkeyAny.value), isClassic);
    };
    return DelayedVestingAccount;
}(json_1.JSONSerializable));
exports.DelayedVestingAccount = DelayedVestingAccount;
//# sourceMappingURL=DelayedVestingAccount.js.map