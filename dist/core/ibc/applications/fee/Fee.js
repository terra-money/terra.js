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
exports.Fee = void 0;
var fee_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/fee");
var Coins_1 = require("../../../Coins");
var json_1 = require("../../../../util/json");
/**
 *  Fee defines the ICS29 receive, acknowledgement and timeout fees
 */
var Fee = /** @class */ (function (_super) {
    __extends(Fee, _super);
    /**
     * @param recv_fee the packet receive fee
     * @param ack_fee the packet acknowledgement fee
     * @param timeout_fee the packet timeout fee
     */
    function Fee(recv_fee, ack_fee, timeout_fee) {
        var _this = _super.call(this) || this;
        _this.recv_fee = new Coins_1.Coins(recv_fee);
        _this.ack_fee = new Coins_1.Coins(ack_fee);
        _this.timeout_fee = new Coins_1.Coins(timeout_fee);
        return _this;
    }
    Fee.fromAmino = function (data) {
        var recv_fee = data.recv_fee, ack_fee = data.ack_fee, timeout_fee = data.timeout_fee;
        return new Fee(Coins_1.Coins.fromAmino(recv_fee), Coins_1.Coins.fromAmino(ack_fee), Coins_1.Coins.fromAmino(timeout_fee));
    };
    Fee.prototype.toAmino = function () {
        var _a = this, recv_fee = _a.recv_fee, ack_fee = _a.ack_fee, timeout_fee = _a.timeout_fee;
        var res = {
            recv_fee: recv_fee.toAmino(),
            ack_fee: ack_fee.toAmino(),
            timeout_fee: timeout_fee.toAmino()
        };
        return res;
    };
    Fee.fromData = function (data) {
        var recv_fee = data.recv_fee, ack_fee = data.ack_fee, timeout_fee = data.timeout_fee;
        return new Fee(Coins_1.Coins.fromData(recv_fee), Coins_1.Coins.fromData(ack_fee), Coins_1.Coins.fromData(timeout_fee));
    };
    Fee.prototype.toData = function () {
        var _a = this, recv_fee = _a.recv_fee, ack_fee = _a.ack_fee, timeout_fee = _a.timeout_fee;
        var res = {
            recv_fee: recv_fee.toData(),
            ack_fee: ack_fee.toData(),
            timeout_fee: timeout_fee.toData()
        };
        return res;
    };
    Fee.fromProto = function (proto) {
        return new Fee(Coins_1.Coins.fromProto(proto.recvFee), Coins_1.Coins.fromProto(proto.ackFee), Coins_1.Coins.fromProto(proto.timeoutFee));
    };
    Fee.prototype.toProto = function () {
        var _a = this, recv_fee = _a.recv_fee, ack_fee = _a.ack_fee, timeout_fee = _a.timeout_fee;
        return fee_1.Fee.fromPartial({
            recvFee: recv_fee.toProto(),
            ackFee: ack_fee.toProto(),
            timeoutFee: timeout_fee.toProto(),
        });
    };
    return Fee;
}(json_1.JSONSerializable));
exports.Fee = Fee;
//# sourceMappingURL=Fee.js.map