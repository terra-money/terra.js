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
exports.PeriodicVestingAccount = void 0;
var json_1 = require("../../util/json");
var BaseVestingAccount_1 = require("./BaseVestingAccount");
var Coins_1 = require("../Coins");
var vesting_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Long = __importStar(require("long"));
/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
var PeriodicVestingAccount = /** @class */ (function (_super) {
    __extends(PeriodicVestingAccount, _super);
    /**
     *
     * @param base_vesting_account account information
     * @param start_time vesting start time
     * @param vesting_periods vesting period entries
     */
    function PeriodicVestingAccount(base_vesting_account, start_time, vesting_periods) {
        var _this = _super.call(this) || this;
        _this.base_vesting_account = base_vesting_account;
        _this.start_time = start_time;
        _this.vesting_periods = vesting_periods;
        return _this;
    }
    PeriodicVestingAccount.prototype.getAccountNumber = function () {
        return this.base_vesting_account.getAccountNumber();
    };
    PeriodicVestingAccount.prototype.getSequenceNumber = function () {
        return this.base_vesting_account.getSequenceNumber();
    };
    PeriodicVestingAccount.prototype.getPublicKey = function () {
        return this.base_vesting_account.base_account.public_key;
    };
    PeriodicVestingAccount.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, base_vesting_account = _a.base_vesting_account, start_time = _a.start_time, vesting_periods = _a.vesting_periods;
        return {
            type: 'cosmos-sdk/PeriodicVestingAccount',
            value: {
                base_vesting_account: base_vesting_account.toAmino().value,
                start_time: start_time.toFixed(),
                vesting_periods: vesting_periods.map(function (vs) { return vs.toAmino(); }),
            },
        };
    };
    PeriodicVestingAccount.fromAmino = function (data, isClassic) {
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromAmino({
            type: 'cosmos-sdk/BaseVestingAccount',
            value: data.value.base_vesting_account,
        });
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new PeriodicVestingAccount(base_vesting_account, Number.parseInt(data.value.start_time), data.value.vesting_periods.map(function (vs) {
            return PeriodicVestingAccount.Period.fromAmino(vs);
        }));
    };
    PeriodicVestingAccount.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, base_vesting_account = _a.base_vesting_account, start_time = _a.start_time, vesting_periods = _a.vesting_periods;
        return {
            '@type': '/cosmos.vesting.v1beta1.PeriodicVestingAccount',
            base_vesting_account: base_vesting_account.toData(),
            start_time: start_time.toFixed(),
            vesting_periods: vesting_periods.map(function (vs) { return vs.toData(); }),
        };
    };
    PeriodicVestingAccount.fromData = function (data, isClassic) {
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromData(__assign({ '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount' }, data.base_vesting_account));
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new PeriodicVestingAccount(base_vesting_account, Number.parseInt(data.start_time), data.vesting_periods.map(function (vs) { return PeriodicVestingAccount.Period.fromData(vs); }));
    };
    PeriodicVestingAccount.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, base_vesting_account = _a.base_vesting_account, vesting_periods = _a.vesting_periods;
        return vesting_1.PeriodicVestingAccount.fromPartial({
            baseVestingAccount: base_vesting_account.toProto(),
            vestingPeriods: vesting_periods.map(function (s) { return s.toProto(); }),
        });
    };
    PeriodicVestingAccount.fromProto = function (proto, isClassic) {
        var _this = this;
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var baseVestingAccount = BaseVestingAccount_1.BaseVestingAccount.fromProto(proto.baseVestingAccount);
        return new PeriodicVestingAccount(baseVestingAccount, proto.startTime.toNumber(), proto.vestingPeriods.map(function (s) { return _this.Period.fromProto(s); }));
    };
    PeriodicVestingAccount.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.PeriodicVestingAccount',
            value: vesting_1.PeriodicVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    };
    PeriodicVestingAccount.unpackAny = function (pubkeyAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return PeriodicVestingAccount.fromProto(vesting_1.PeriodicVestingAccount.decode(pubkeyAny.value), isClassic);
    };
    return PeriodicVestingAccount;
}(json_1.JSONSerializable));
exports.PeriodicVestingAccount = PeriodicVestingAccount;
(function (PeriodicVestingAccount) {
    var Period = /** @class */ (function (_super) {
        __extends(Period, _super);
        function Period(length, amount) {
            var _this = _super.call(this) || this;
            _this.length = length;
            _this.amount = amount;
            return _this;
        }
        Period.prototype.toAmino = function () {
            var _a = this, length = _a.length, amount = _a.amount;
            return {
                length: length.toFixed(),
                amount: amount.toAmino(),
            };
        };
        Period.fromAmino = function (data) {
            var length = data.length, amount = data.amount;
            return new Period(Number.parseInt(length), Coins_1.Coins.fromAmino(amount));
        };
        Period.prototype.toData = function () {
            var _a = this, length = _a.length, amount = _a.amount;
            return {
                length: length.toFixed(),
                amount: amount.toData(),
            };
        };
        Period.fromData = function (data) {
            var length = data.length, amount = data.amount;
            return new Period(Number.parseInt(length), Coins_1.Coins.fromData(amount));
        };
        Period.prototype.toProto = function () {
            var _a = this, length = _a.length, amount = _a.amount;
            return vesting_1.Period.fromPartial({
                length: Long.fromNumber(length),
                amount: amount.toProto(),
            });
        };
        Period.fromProto = function (proto) {
            return new Period(proto.length.toNumber(), Coins_1.Coins.fromProto(proto.amount));
        };
        return Period;
    }(json_1.JSONSerializable));
    PeriodicVestingAccount.Period = Period;
})(PeriodicVestingAccount = exports.PeriodicVestingAccount || (exports.PeriodicVestingAccount = {}));
exports.PeriodicVestingAccount = PeriodicVestingAccount;
//# sourceMappingURL=PeriodicVestingAccount.js.map