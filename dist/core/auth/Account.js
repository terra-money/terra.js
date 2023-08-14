"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
var BaseAccount_1 = require("./BaseAccount");
var LazyGradedVestingAccount_1 = require("./LazyGradedVestingAccount");
var ContinuousVestingAccount_1 = require("./ContinuousVestingAccount");
var DelayedVestingAccount_1 = require("./DelayedVestingAccount");
var PeriodicVestingAccount_1 = require("./PeriodicVestingAccount");
var BaseVestingAccount_1 = require("./BaseVestingAccount");
/**
 * Stores information about an account fetched from the blockchain.
 */
var Account;
(function (Account) {
    function fromAmino(amino, isClassic) {
        switch (amino.type) {
            case 'core/Account':
            case 'cosmos-sdk/BaseAccount':
                return BaseAccount_1.BaseAccount.fromAmino(amino, isClassic);
            case 'core/BaseVestingAccount':
            case 'cosmos-sdk/BaseVestingAccount':
                return BaseVestingAccount_1.BaseVestingAccount.fromAmino(amino, isClassic);
            case 'core/LazyGradedVestingAccount':
                return LazyGradedVestingAccount_1.LazyGradedVestingAccount.fromAmino(amino, isClassic);
            case 'cosmos-sdk/ContinuousVestingAccount':
                return ContinuousVestingAccount_1.ContinuousVestingAccount.fromAmino(amino, isClassic);
            case 'cosmos-sdk/DelayedVestingAccount':
                return DelayedVestingAccount_1.DelayedVestingAccount.fromAmino(amino, isClassic);
            case 'cosmos-sdk/PeriodicVestingAccount':
                return PeriodicVestingAccount_1.PeriodicVestingAccount.fromAmino(amino, isClassic);
        }
    }
    Account.fromAmino = fromAmino;
    function fromData(data, isClassic) {
        switch (data['@type']) {
            case '/cosmos.auth.v1beta1.BaseAccount':
                return BaseAccount_1.BaseAccount.fromData(data, isClassic);
            case '/cosmos.vesting.v1beta1.BaseVestingAccount':
                return BaseVestingAccount_1.BaseVestingAccount.fromData(data, isClassic);
            case '/terra.vesting.v1beta1.LazyGradedVestingAccount':
                return LazyGradedVestingAccount_1.LazyGradedVestingAccount.fromData(data, isClassic);
            case '/cosmos.vesting.v1beta1.ContinuousVestingAccount':
                return ContinuousVestingAccount_1.ContinuousVestingAccount.fromData(data, isClassic);
            case '/cosmos.vesting.v1beta1.DelayedVestingAccount':
                return DelayedVestingAccount_1.DelayedVestingAccount.fromData(data, isClassic);
            case '/cosmos.vesting.v1beta1.PeriodicVestingAccount':
                return PeriodicVestingAccount_1.PeriodicVestingAccount.fromData(data, isClassic);
        }
    }
    Account.fromData = fromData;
    function fromProto(accountAny, isClassic) {
        var typeUrl = accountAny.typeUrl;
        if (typeUrl === '/cosmos.auth.v1beta1.BaseAccount') {
            return BaseAccount_1.BaseAccount.unpackAny(accountAny, isClassic);
        }
        else if (typeUrl === '/terra.vesting.v1beta1.LazyGradedVestingAccount') {
            return LazyGradedVestingAccount_1.LazyGradedVestingAccount.unpackAny(accountAny, isClassic);
        }
        else if (typeUrl === '/cosmos.vesting.v1beta1.ContinuousVestingAccount') {
            return ContinuousVestingAccount_1.ContinuousVestingAccount.unpackAny(accountAny, isClassic);
        }
        else if (typeUrl === '/cosmos.vesting.v1beta1.DelayedVestingAccount') {
            return DelayedVestingAccount_1.DelayedVestingAccount.unpackAny(accountAny, isClassic);
        }
        else if (typeUrl === '/cosmos.vesting.v1beta1.PeriodicVestingAccount') {
            return PeriodicVestingAccount_1.PeriodicVestingAccount.unpackAny(accountAny, isClassic);
        }
        throw new Error("Account type ".concat(typeUrl, " not recognized"));
    }
    Account.fromProto = fromProto;
})(Account = exports.Account || (exports.Account = {}));
//# sourceMappingURL=Account.js.map