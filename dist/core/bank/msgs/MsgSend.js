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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSend = void 0;
var Coins_1 = require("../../Coins");
var json_1 = require("../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/cosmos/bank/v1beta1/tx");
/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
var MsgSend = /** @class */ (function (_super) {
    __extends(MsgSend, _super);
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     * @param amount value of the transaction
     */
    function MsgSend(from_address, to_address, amount) {
        var _this = _super.call(this) || this;
        _this.from_address = from_address;
        _this.to_address = to_address;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    MsgSend.fromAmino = function (data, _) {
        _;
        var _a = data.value, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount;
        return new MsgSend(from_address, to_address, Coins_1.Coins.fromAmino(amount));
    };
    MsgSend.prototype.toAmino = function (isClassic) {
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount;
        return {
            type: isClassic ? 'bank/MsgSend' : 'cosmos-sdk/MsgSend',
            value: {
                from_address: from_address,
                to_address: to_address,
                amount: amount.toAmino(),
            },
        };
    };
    MsgSend.fromData = function (data, isClassic) {
        isClassic;
        var from_address = data.from_address, to_address = data.to_address, amount = data.amount;
        return new MsgSend(from_address, to_address, Coins_1.Coins.fromData(amount));
    };
    MsgSend.prototype.toData = function (_) {
        _;
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount;
        return {
            '@type': '/cosmos.bank.v1beta1.MsgSend',
            from_address: from_address,
            to_address: to_address,
            amount: amount.toData(),
        };
    };
    MsgSend.fromProto = function (proto, _) {
        _;
        return new MsgSend(proto.fromAddress, proto.toAddress, Coins_1.Coins.fromProto(proto.amount));
    };
    MsgSend.prototype.toProto = function (_) {
        _;
        var _a = this, from_address = _a.from_address, to_address = _a.to_address, amount = _a.amount;
        return tx_1.MsgSend.fromPartial({
            fromAddress: from_address,
            toAddress: to_address,
            amount: amount.toProto(),
        });
    };
    MsgSend.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: tx_1.MsgSend.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgSend.unpackAny = function (msgAny, isClassic) {
        return MsgSend.fromProto(tx_1.MsgSend.decode(msgAny.value), isClassic);
    };
    return MsgSend;
}(json_1.JSONSerializable));
exports.MsgSend = MsgSend;
//# sourceMappingURL=MsgSend.js.map