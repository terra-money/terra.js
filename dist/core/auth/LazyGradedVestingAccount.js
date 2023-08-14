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
exports.LazyGradedVestingAccount = void 0;
var json_1 = require("../../util/json");
var BaseVestingAccount_1 = require("./BaseVestingAccount");
var numeric_1 = require("../numeric");
var vesting_1 = require("@classic-terra/terra.proto/terra/vesting/v1beta1/vesting");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Long = __importStar(require("long"));
/**
 * Holds information about a Account which has vesting information.
 */
var LazyGradedVestingAccount = /** @class */ (function (_super) {
    __extends(LazyGradedVestingAccount, _super);
    /**
     *
     * @param base_vesting_account account information
     * @param vesting_schedules Entries that make up vesting
     */
    function LazyGradedVestingAccount(base_vesting_account, vesting_schedules) {
        var _this = _super.call(this) || this;
        _this.base_vesting_account = base_vesting_account;
        _this.vesting_schedules = vesting_schedules;
        return _this;
    }
    LazyGradedVestingAccount.prototype.getAccountNumber = function () {
        return this.base_vesting_account.getAccountNumber();
    };
    LazyGradedVestingAccount.prototype.getSequenceNumber = function () {
        return this.base_vesting_account.getSequenceNumber();
    };
    LazyGradedVestingAccount.prototype.getPublicKey = function () {
        return this.base_vesting_account.base_account.public_key;
    };
    LazyGradedVestingAccount.prototype.toAmino = function (_) {
        _;
        var _a = this, base_vesting_account = _a.base_vesting_account, vesting_schedules = _a.vesting_schedules;
        return {
            type: 'core/LazyGradedVestingAccount',
            value: {
                base_vesting_account: base_vesting_account.toAmino().value,
                vesting_schedules: vesting_schedules.map(function (vs) { return vs.toAmino(); }),
            },
        };
    };
    LazyGradedVestingAccount.fromAmino = function (data, _) {
        _;
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromAmino({
            type: 'core/BaseVestingAccount',
            value: data.value.base_vesting_account,
        });
        return new LazyGradedVestingAccount(base_vesting_account, data.value.vesting_schedules.map(function (vs) {
            return LazyGradedVestingAccount.VestingSchedule.fromAmino(vs);
        }));
    };
    LazyGradedVestingAccount.prototype.toData = function (_) {
        _;
        var _a = this, base_vesting_account = _a.base_vesting_account, vesting_schedules = _a.vesting_schedules;
        return {
            '@type': '/terra.vesting.v1beta1.LazyGradedVestingAccount',
            base_vesting_account: base_vesting_account.toData(),
            vesting_schedules: vesting_schedules.map(function (vs) { return vs.toData(); }),
        };
    };
    LazyGradedVestingAccount.fromData = function (data, _) {
        _;
        var base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromData(__assign({ '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount' }, data.base_vesting_account));
        return new LazyGradedVestingAccount(base_vesting_account, data.vesting_schedules.map(function (vs) {
            return LazyGradedVestingAccount.VestingSchedule.fromData(vs);
        }));
    };
    LazyGradedVestingAccount.prototype.toProto = function (_) {
        _;
        var _a = this, base_vesting_account = _a.base_vesting_account, vesting_schedules = _a.vesting_schedules;
        return vesting_1.LazyGradedVestingAccount.fromPartial({
            baseVestingAccount: base_vesting_account.toProto(),
            vestingSchedules: vesting_schedules.map(function (s) { return s.toProto(); }),
        });
    };
    LazyGradedVestingAccount.fromProto = function (lazyGradedVestingAccountProto, _) {
        var _this = this;
        _;
        var baseVestingAccount = BaseVestingAccount_1.BaseVestingAccount.fromProto(lazyGradedVestingAccountProto.baseVestingAccount);
        return new LazyGradedVestingAccount(baseVestingAccount, lazyGradedVestingAccountProto.vestingSchedules.map(function (s) {
            return _this.VestingSchedule.fromProto(s);
        }));
    };
    LazyGradedVestingAccount.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/terra.vesting.v1beta1.LazyGradedVestingAccount',
            value: vesting_1.LazyGradedVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    };
    LazyGradedVestingAccount.unpackAny = function (pubkeyAny, isClassic) {
        return LazyGradedVestingAccount.fromProto(vesting_1.LazyGradedVestingAccount.decode(pubkeyAny.value), isClassic);
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
        VestingSchedule.prototype.toAmino = function () {
            var _a = this, denom = _a.denom, schedules = _a.schedules;
            return {
                denom: denom,
                schedules: schedules.map(function (s) { return s.toAmino(); }),
            };
        };
        VestingSchedule.fromAmino = function (data) {
            var denom = data.denom, schedules = data.schedules;
            return new VestingSchedule(denom, schedules.map(function (s) { return VestingSchedule.Entry.fromAmino(s); }));
        };
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
        VestingSchedule.prototype.toProto = function () {
            var _a = this, denom = _a.denom, schedules = _a.schedules;
            return vesting_1.VestingSchedule.fromPartial({
                denom: denom,
                schedules: schedules.map(function (s) { return s.toProto(); }),
            });
        };
        VestingSchedule.fromProto = function (vestingScheduleProto) {
            return new VestingSchedule(vestingScheduleProto.denom, vestingScheduleProto.schedules.map(function (s) {
                return VestingSchedule.Entry.fromProto(s);
            }));
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
            Entry.fromAmino = function (data) {
                var start_time = data.start_time, end_time = data.end_time, ratio = data.ratio;
                return new Entry(Number.parseInt(start_time), Number.parseInt(end_time), new numeric_1.Dec(ratio));
            };
            Entry.prototype.toAmino = function () {
                return {
                    start_time: this.start_time.toFixed(),
                    end_time: this.end_time.toFixed(),
                    ratio: this.ratio.toString(),
                };
            };
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
            Entry.fromProto = function (entryProto) {
                return new Entry(entryProto.endTime.toNumber(), entryProto.startTime.toNumber(), new numeric_1.Dec(entryProto.ratio));
            };
            Entry.prototype.toProto = function () {
                return vesting_1.Schedule.fromPartial({
                    endTime: Long.fromNumber(this.end_time),
                    ratio: this.ratio.toString(),
                    startTime: Long.fromNumber(this.start_time),
                });
            };
            return Entry;
        }(json_1.JSONSerializable));
        VestingSchedule.Entry = Entry;
    })(VestingSchedule = LazyGradedVestingAccount.VestingSchedule || (LazyGradedVestingAccount.VestingSchedule = {}));
})(LazyGradedVestingAccount = exports.LazyGradedVestingAccount || (exports.LazyGradedVestingAccount = {}));
exports.LazyGradedVestingAccount = LazyGradedVestingAccount;
//# sourceMappingURL=LazyGradedVestingAccount.js.map