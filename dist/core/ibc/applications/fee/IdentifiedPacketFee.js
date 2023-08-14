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
exports.IdentifiedPacketFees = void 0;
var json_1 = require("../../../../util/json");
var PacketFee_1 = require("./PacketFee");
var PacketId_1 = require("../../core/channel/PacketId");
/**
 *  IdentifiedPacketFees contains a list of type PacketFee and associated PacketId
 */
var IdentifiedPacketFees = /** @class */ (function (_super) {
    __extends(IdentifiedPacketFees, _super);
    /**
     * @param packet_id unique packet identifier comprised of the channel ID, port ID and sequence
     * @param packet_fees list of packet fees
     */
    function IdentifiedPacketFees(packet_id, packet_fees) {
        if (packet_fees === void 0) { packet_fees = []; }
        var _this = _super.call(this) || this;
        _this.packet_id = packet_id;
        _this.packet_fees = packet_fees;
        return _this;
    }
    IdentifiedPacketFees.fromAmino = function (data) {
        var packet_id = data.packet_id, packet_fees = data.packet_fees;
        return new IdentifiedPacketFees(packet_id ? PacketId_1.PacketId.fromAmino(packet_id) : undefined, packet_fees.map(function (fee) { return PacketFee_1.PacketFee.fromAmino(fee); }));
    };
    IdentifiedPacketFees.prototype.toAmino = function () {
        var _a = this, packet_id = _a.packet_id, packet_fees = _a.packet_fees;
        var res = {
            packet_id: packet_id === null || packet_id === void 0 ? void 0 : packet_id.toAmino(),
            packet_fees: packet_fees.map(function (fee) { return fee.toAmino(); }),
        };
        return res;
    };
    IdentifiedPacketFees.fromData = function (data) {
        var packet_id = data.packet_id, packet_fees = data.packet_fees;
        return new IdentifiedPacketFees(packet_id ? PacketId_1.PacketId.fromData(packet_id) : undefined, packet_fees.map(function (fee) { return PacketFee_1.PacketFee.fromData(fee); }));
    };
    IdentifiedPacketFees.prototype.toData = function () {
        var _a = this, packet_id = _a.packet_id, packet_fees = _a.packet_fees;
        var res = {
            packet_id: packet_id === null || packet_id === void 0 ? void 0 : packet_id.toData(),
            packet_fees: packet_fees.map(function (fee) { return fee.toData(); }),
        };
        return res;
    };
    IdentifiedPacketFees.fromProto = function (proto) {
        return new IdentifiedPacketFees(proto.packetId ? PacketId_1.PacketId.fromProto(proto.packetId) : undefined, proto.packetFees.map(function (fee) { return PacketFee_1.PacketFee.fromProto(fee); }));
    };
    IdentifiedPacketFees.prototype.toProto = function () {
        var _a = this, packet_id = _a.packet_id, packet_fees = _a.packet_fees;
        var res = {
            packetId: packet_id === null || packet_id === void 0 ? void 0 : packet_id.toProto(),
            packetFees: packet_fees.map(function (fee) { return fee.toProto(); }),
        };
        return res;
    };
    return IdentifiedPacketFees;
}(json_1.JSONSerializable));
exports.IdentifiedPacketFees = IdentifiedPacketFees;
//# sourceMappingURL=IdentifiedPacketFee.js.map