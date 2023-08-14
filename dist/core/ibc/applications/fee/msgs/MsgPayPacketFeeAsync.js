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
exports.MsgPayPacketFeeAsync = void 0;
var json_1 = require("../../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/tx");
var PacketId_1 = require("../../../core/channel/PacketId");
var PacketFee_1 = require("../PacketFee");
/**
 * MsgPayPacketFeeAsync defines the request type for the PayPacketFeeAsync rpc
 * This Msg can be used to pay for a packet at a specified sequence (instead of the next sequence send)
 */
var MsgPayPacketFeeAsync = /** @class */ (function (_super) {
    __extends(MsgPayPacketFeeAsync, _super);
    /**
     * @param packet_id packet identifier comprised of the channel ID, port ID and sequence
     * @param packet_fee the packet fee associated with a particular IBC packet
     */
    function MsgPayPacketFeeAsync(packet_id, packet_fee) {
        var _this = _super.call(this) || this;
        _this.packet_id = packet_id;
        _this.packet_fee = packet_fee;
        return _this;
    }
    MsgPayPacketFeeAsync.fromAmino = function (_, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        _;
        throw new Error('Amino not supported');
    };
    MsgPayPacketFeeAsync.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        throw new Error('Amino not supported');
    };
    MsgPayPacketFeeAsync.fromData = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var packet_id = data.packet_id, packet_fee = data.packet_fee;
        return new MsgPayPacketFeeAsync(packet_id ? PacketId_1.PacketId.fromData(packet_id) : undefined, packet_fee ? PacketFee_1.PacketFee.fromData(packet_fee) : undefined);
    };
    MsgPayPacketFeeAsync.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, packet_id = _a.packet_id, packet_fee = _a.packet_fee;
        return {
            '@type': '/ibc.applications.fee.v1.MsgPayPacketFeeAsync',
            packet_id: packet_id === null || packet_id === void 0 ? void 0 : packet_id.toData(),
            packet_fee: packet_fee === null || packet_fee === void 0 ? void 0 : packet_fee.toData(),
        };
    };
    MsgPayPacketFeeAsync.fromProto = function (proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgPayPacketFeeAsync(proto.packetId ? PacketId_1.PacketId.fromProto(proto.packetId) : undefined, proto.packetFee ? PacketFee_1.PacketFee.fromProto(proto.packetFee) : undefined);
    };
    MsgPayPacketFeeAsync.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, packet_id = _a.packet_id, packet_fee = _a.packet_fee;
        return tx_1.MsgPayPacketFeeAsync.fromPartial({
            packetId: packet_id === null || packet_id === void 0 ? void 0 : packet_id.toProto(),
            packetFee: packet_fee === null || packet_fee === void 0 ? void 0 : packet_fee.toProto(),
        });
    };
    MsgPayPacketFeeAsync.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFeeAsync',
            value: tx_1.MsgPayPacketFeeAsync.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgPayPacketFeeAsync.unpackAny = function (msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgPayPacketFeeAsync.fromProto(tx_1.MsgPayPacketFeeAsync.decode(msgAny.value), isClassic);
    };
    return MsgPayPacketFeeAsync;
}(json_1.JSONSerializable));
exports.MsgPayPacketFeeAsync = MsgPayPacketFeeAsync;
//# sourceMappingURL=MsgPayPacketFeeAsync.js.map