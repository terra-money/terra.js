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
exports.PacketFee = void 0;
var fee_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/fee");
var json_1 = require("../../../../util/json");
var Fee_1 = require("./Fee");
/**
 *  PacketFee contains ICS29 relayer fees, refund address and optional list of permitted relayers
 */
var PacketFee = /** @class */ (function (_super) {
    __extends(PacketFee, _super);
    /**
     * @param fee fee encapsulates the recv, ack and timeout fees associated with an IBC packet
     * @param refund_address the refund address for unspent fees
     * @param relayers  optional list of relayers permitted to receive fees
     */
    function PacketFee(fee, refund_address, relayers) {
        if (relayers === void 0) { relayers = []; }
        var _this = _super.call(this) || this;
        _this.fee = fee;
        _this.refund_address = refund_address;
        _this.relayers = relayers;
        return _this;
    }
    PacketFee.fromAmino = function (data) {
        var fee = data.fee, refund_address = data.refund_address, relayers = data.relayers;
        return new PacketFee(fee ? Fee_1.Fee.fromAmino(fee) : undefined, refund_address, relayers);
    };
    PacketFee.prototype.toAmino = function () {
        var _a = this, fee = _a.fee, refund_address = _a.refund_address, relayers = _a.relayers;
        var res = {
            fee: fee === null || fee === void 0 ? void 0 : fee.toAmino(),
            refund_address: refund_address,
            relayers: relayers
        };
        return res;
    };
    PacketFee.fromData = function (data) {
        var fee = data.fee, refund_address = data.refund_address, relayers = data.relayers;
        return new PacketFee(fee ? Fee_1.Fee.fromData(fee) : undefined, refund_address, relayers);
    };
    PacketFee.prototype.toData = function () {
        var _a = this, fee = _a.fee, refund_address = _a.refund_address, relayers = _a.relayers;
        var res = {
            fee: fee === null || fee === void 0 ? void 0 : fee.toData(),
            refund_address: refund_address,
            relayers: relayers
        };
        return res;
    };
    PacketFee.fromProto = function (proto) {
        return new PacketFee(proto.fee ? Fee_1.Fee.fromProto(proto.fee) : undefined, proto.refundAddress, proto.relayers);
    };
    PacketFee.prototype.toProto = function () {
        var _a = this, fee = _a.fee, refund_address = _a.refund_address, relayers = _a.relayers;
        return fee_1.PacketFee.fromPartial({
            fee: fee === null || fee === void 0 ? void 0 : fee.toProto(),
            refundAddress: refund_address,
            relayers: relayers
        });
    };
    return PacketFee;
}(json_1.JSONSerializable));
exports.PacketFee = PacketFee;
//# sourceMappingURL=PacketFee.js.map