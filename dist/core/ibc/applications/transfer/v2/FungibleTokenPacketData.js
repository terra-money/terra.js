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
exports.FungibleTokenPacketData = void 0;
var packet_1 = require("@terra-money/terra.proto/ibc/applications/transfer/v2/packet");
var json_1 = require("../../../../../util/json");
/**
 *  FungibleTokenPacketData defines a struct for the packet payload
 * See FungibleTokenPacketData spec:
 * https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#data-structures
 */
var FungibleTokenPacketData = /** @class */ (function (_super) {
    __extends(FungibleTokenPacketData, _super);
    /**
     * @param denom the token denomination to be transferred
     * @param amount the token amount to be transferred
     * @param sender the sender address
     * @param receiver the recipient address on the destination chain
     */
    function FungibleTokenPacketData(denom, amount, sender, receiver) {
        var _this = _super.call(this) || this;
        _this.denom = denom;
        _this.amount = amount;
        _this.sender = sender;
        _this.receiver = receiver;
        return _this;
    }
    FungibleTokenPacketData.fromAmino = function (data) {
        var denom = data.denom, amount = data.amount, sender = data.sender, receiver = data.receiver;
        return new FungibleTokenPacketData(denom, amount, sender, receiver);
    };
    FungibleTokenPacketData.prototype.toAmino = function () {
        var _a = this, denom = _a.denom, amount = _a.amount, sender = _a.sender, receiver = _a.receiver;
        var res = {
            denom: denom,
            amount: amount,
            sender: sender,
            receiver: receiver,
        };
        return res;
    };
    FungibleTokenPacketData.fromData = function (data) {
        var denom = data.denom, amount = data.amount, sender = data.sender, receiver = data.receiver;
        return new FungibleTokenPacketData(denom, amount, sender, receiver);
    };
    FungibleTokenPacketData.prototype.toData = function () {
        var _a = this, denom = _a.denom, amount = _a.amount, sender = _a.sender, receiver = _a.receiver;
        var res = {
            denom: denom,
            amount: amount,
            sender: sender,
            receiver: receiver
        };
        return res;
    };
    FungibleTokenPacketData.fromProto = function (proto) {
        return new FungibleTokenPacketData(proto.denom, proto.amount, proto.sender, proto.receiver);
    };
    FungibleTokenPacketData.prototype.toProto = function () {
        var _a = this, denom = _a.denom, amount = _a.amount, sender = _a.sender, receiver = _a.receiver;
        return packet_1.FungibleTokenPacketData.fromPartial({
            denom: denom,
            amount: amount,
            sender: sender,
            receiver: receiver
        });
    };
    return FungibleTokenPacketData;
}(json_1.JSONSerializable));
exports.FungibleTokenPacketData = FungibleTokenPacketData;
//# sourceMappingURL=FungibleTokenPacketData.js.map