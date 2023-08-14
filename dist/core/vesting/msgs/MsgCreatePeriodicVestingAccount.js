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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgCreatePeriodicVestingAccount = void 0;
var Period_1 = require("../Period");
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/tx");
var long_1 = __importDefault(require("long"));
/**
 * CreatePeriodicVestingAccount defines a method that enables creating a periodic vesting account.
 */
var MsgCreatePeriodicVestingAccount = /** @class */ (function (_super) {
    __extends(MsgCreatePeriodicVestingAccount, _super);
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     */
    function MsgCreatePeriodicVestingAccount(from_address, to_address, start_time, vesting_periods) {
        var _this = _super.call(this) || this;
        _this.from_address = from_address;
        _this.to_address = to_address;
        _this.start_time = start_time;
        _this.vesting_periods = vesting_periods;
        return _this;
    }
    MsgCreatePeriodicVestingAccount.fromAmino = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = data.value, from_address = _a.from_address, to_address = _a.to_address, start_time = _a.start_time, vesting_periods = _a.vesting_periods;
        return new MsgCreatePeriodicVestingAccount(from_address, to_address, Number.parseInt(start_time), vesting_periods.map(function (p) { return Period_1.Period.fromAmino(p, isClassic); }));
    };
    MsgCreatePeriodicVestingAccount.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, start_time = _a.start_time, vesting_periods = _a.vesting_periods;
        return {
            type: 'cosmos-sdk/MsgCreatePeriodicVestingAccount',
            value: {
                from_address: from_address,
                to_address: to_address,
                start_time: start_time.toFixed(),
                vesting_periods: vesting_periods.map(function (p) { return p.toAmino(isClassic); }),
            },
        };
    };
    MsgCreatePeriodicVestingAccount.fromData = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var from_address = data.from_address, to_address = data.to_address, start_time = data.start_time, vesting_periods = data.vesting_periods;
        return new MsgCreatePeriodicVestingAccount(from_address, to_address, Number.parseInt(start_time), vesting_periods.map(function (p) { return Period_1.Period.fromData(p, isClassic); }));
    };
    MsgCreatePeriodicVestingAccount.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, start_time = _a.start_time, vesting_periods = _a.vesting_periods;
        return {
            '@type': '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount',
            from_address: from_address,
            to_address: to_address,
            start_time: start_time.toFixed(),
            vesting_periods: vesting_periods.map(function (p) { return p.toData(isClassic); }),
        };
    };
    MsgCreatePeriodicVestingAccount.fromProto = function (proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgCreatePeriodicVestingAccount(proto.fromAddress, proto.toAddress, proto.startTime.toNumber(), proto.vestingPeriods.map(function (p) { return Period_1.Period.fromProto(p, isClassic); }));
    };
    MsgCreatePeriodicVestingAccount.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, start_time = _a.start_time, vesting_periods = _a.vesting_periods;
        return tx_1.MsgCreatePeriodicVestingAccount.fromPartial({
            fromAddress: from_address,
            toAddress: to_address,
            startTime: long_1.default.fromNumber(start_time),
            vestingPeriods: vesting_periods.map(function (p) { return p.toProto(isClassic); }),
        });
    };
    MsgCreatePeriodicVestingAccount.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount',
            value: tx_1.MsgCreatePeriodicVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgCreatePeriodicVestingAccount.unpackAny = function (msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgCreatePeriodicVestingAccount.fromProto(tx_1.MsgCreatePeriodicVestingAccount.decode(msgAny.value), isClassic);
    };
    return MsgCreatePeriodicVestingAccount;
}(json_1.JSONSerializable));
exports.MsgCreatePeriodicVestingAccount = MsgCreatePeriodicVestingAccount;
//# sourceMappingURL=MsgCreatePeriodicVestingAccount.js.map