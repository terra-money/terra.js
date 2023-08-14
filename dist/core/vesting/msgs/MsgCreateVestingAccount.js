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
exports.MsgCreateVestingAccount = void 0;
var Coins_1 = require("../../Coins");
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/tx");
var long_1 = __importDefault(require("long"));
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting account.
 */
var MsgCreateVestingAccount = /** @class */ (function (_super) {
    __extends(MsgCreateVestingAccount, _super);
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     * @param amount value of the transaction
     */
    function MsgCreateVestingAccount(from_address, to_address, amount, end_time, delayed) {
        var _this = _super.call(this) || this;
        _this.from_address = from_address;
        _this.to_address = to_address;
        _this.end_time = end_time;
        _this.delayed = delayed;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    MsgCreateVestingAccount.fromAmino = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = data.value, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount, end_time = _a.end_time, delayed = _a.delayed;
        return new MsgCreateVestingAccount(from_address, to_address, Coins_1.Coins.fromAmino(amount), Number.parseInt(end_time), delayed);
    };
    MsgCreateVestingAccount.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount, end_time = _a.end_time, delayed = _a.delayed;
        return {
            type: 'cosmos-sdk/MsgCreateVestingAccount',
            value: {
                from_address: from_address,
                to_address: to_address,
                amount: amount.toAmino(),
                end_time: end_time.toFixed(),
                delayed: delayed,
            },
        };
    };
    MsgCreateVestingAccount.fromData = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var from_address = data.from_address, to_address = data.to_address, amount = data.amount, end_time = data.end_time, delayed = data.delayed;
        return new MsgCreateVestingAccount(from_address, to_address, Coins_1.Coins.fromData(amount), Number.parseInt(end_time), delayed);
    };
    MsgCreateVestingAccount.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount, end_time = _a.end_time, delayed = _a.delayed;
        return {
            '@type': '/cosmos.vesting.v1beta1.MsgCreateVestingAccount',
            from_address: from_address,
            to_address: to_address,
            amount: amount.toData(),
            end_time: end_time.toFixed(),
            delayed: delayed,
        };
    };
    MsgCreateVestingAccount.fromProto = function (proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgCreateVestingAccount(proto.fromAddress, proto.toAddress, Coins_1.Coins.fromProto(proto.amount), proto.endTime.toNumber(), proto.delayed);
    };
    MsgCreateVestingAccount.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount, end_time = _a.end_time, delayed = _a.delayed;
        return tx_1.MsgCreateVestingAccount.fromPartial({
            fromAddress: from_address,
            toAddress: to_address,
            amount: amount.toProto(),
            endTime: long_1.default.fromNumber(end_time),
            delayed: delayed,
        });
    };
    MsgCreateVestingAccount.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.MsgCreateVestingAccount',
            value: tx_1.MsgCreateVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgCreateVestingAccount.unpackAny = function (msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgCreateVestingAccount.fromProto(tx_1.MsgCreateVestingAccount.decode(msgAny.value), isClassic);
    };
    return MsgCreateVestingAccount;
}(json_1.JSONSerializable));
exports.MsgCreateVestingAccount = MsgCreateVestingAccount;
//# sourceMappingURL=MsgCreateVestingAccount.js.map