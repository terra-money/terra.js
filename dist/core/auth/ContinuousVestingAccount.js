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
exports.ContinuousVestingAccount = void 0;
var json_1 = require("../../util/json");
var BaseVestingAccount_1 = require("./BaseVestingAccount");
var Long = __importStar(require("long"));
var vesting_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
var ContinuousVestingAccount = /** @class */ (function (_super) {
    __extends(ContinuousVestingAccount, _super);
    /**
     *
     * @param base_vesting_account account information
     * @param start_time vesting start time
     */
    function ContinuousVestingAccount(base_vesting_account, start_time) {
        var _this = _super.call(this) || this;
        _this.base_vesting_account = base_vesting_account;
        _this.start_time = start_time;
        return _this;
    }
    ContinuousVestingAccount.prototype.getAccountNumber = function () {
        return this.base_vesting_account.getAccountNumber();
    };
    ContinuousVestingAccount.prototype.getSequenceNumber = function () {
        return this.base_vesting_account.getSequenceNumber();
    };
    ContinuousVestingAccount.prototype.getPublicKey = function () {
        return this.base_vesting_account.base_account.public_key;
    };
    ContinuousVestingAccount.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, base_vesting_account = _a.base_vesting_account, start_time = _a.start_time;
        return {
            type: 'cosmos-sdk/ContinuousVestingAccount',
            value: {
                base_vesting_account: base_vesting_account.toAmino().value,
                start_time: start_time.toFixed(),
            },
        };
    };
    ContinuousVestingAccount.fromAmino = function (data, isClassic) {
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromAmino({
            type: 'cosmos-sdk/BaseVestingAccount',
            value: data.value.base_vesting_account,
        });
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new ContinuousVestingAccount(base_vesting_account, Number.parseInt(data.value.start_time));
    };
    ContinuousVestingAccount.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, base_vesting_account = _a.base_vesting_account, start_time = _a.start_time;
        return {
            '@type': '/cosmos.vesting.v1beta1.ContinuousVestingAccount',
            base_vesting_account: base_vesting_account.toData(),
            start_time: start_time.toFixed(),
        };
    };
    ContinuousVestingAccount.fromData = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromData(__assign({ '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount' }, data.base_vesting_account));
        return new ContinuousVestingAccount(base_vesting_account, Number.parseInt(data.start_time));
    };
    ContinuousVestingAccount.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, base_vesting_account = _a.base_vesting_account, start_time = _a.start_time;
        return vesting_1.ContinuousVestingAccount.fromPartial({
            baseVestingAccount: base_vesting_account.toProto(),
            startTime: Long.fromNumber(start_time),
        });
    };
    ContinuousVestingAccount.fromProto = function (ContinuousVestingAccountProto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var baseVestingAccount = BaseVestingAccount_1.BaseVestingAccount.fromProto(ContinuousVestingAccountProto.baseVestingAccount);
        return new ContinuousVestingAccount(baseVestingAccount, ContinuousVestingAccountProto.startTime.toNumber());
    };
    ContinuousVestingAccount.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.ContinuousVestingAccount',
            value: vesting_1.ContinuousVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    };
    ContinuousVestingAccount.unpackAny = function (pubkeyAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return ContinuousVestingAccount.fromProto(vesting_1.ContinuousVestingAccount.decode(pubkeyAny.value), isClassic);
    };
    return ContinuousVestingAccount;
}(json_1.JSONSerializable));
exports.ContinuousVestingAccount = ContinuousVestingAccount;
//# sourceMappingURL=ContinuousVestingAccount.js.map