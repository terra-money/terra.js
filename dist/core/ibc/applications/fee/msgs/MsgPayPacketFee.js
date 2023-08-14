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
exports.MsgPayPacketFee = void 0;
var json_1 = require("../../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var tx_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/tx");
var Fee_1 = require("../Fee");
/**
 * MsgPayPacketFee defines the request type for the PayPacketFee rpc
 * This Msg can be used to pay for a packet at the next sequence send & should be combined with the Msg that will be paid for
 */
var MsgPayPacketFee = /** @class */ (function (_super) {
    __extends(MsgPayPacketFee, _super);
    /**
     * @param fee encapsulates the recv, ack and timeout fees associated with an IBC packet
     * @param source_port_id the source port unique identifier
     * @param source_channel_id the source channel unique identifer
     * @param signer account address to refund fee if necessary
     * @param relayers optional list of relayers permitted to the receive packet fees
     */
    function MsgPayPacketFee(fee, source_port_id, source_channel_id, signer, relayers) {
        var _this = _super.call(this) || this;
        _this.fee = fee;
        _this.source_port_id = source_port_id;
        _this.source_channel_id = source_channel_id;
        _this.signer = signer;
        _this.relayers = relayers;
        return _this;
    }
    MsgPayPacketFee.fromAmino = function (_, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        _;
        throw new Error('Amino not supported');
    };
    MsgPayPacketFee.prototype.toAmino = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        throw new Error('Amino not supported');
    };
    MsgPayPacketFee.fromData = function (data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var fee = data.fee, source_port_id = data.source_port_id, source_channel_id = data.source_channel_id, signer = data.signer, relayers = data.relayers;
        return new MsgPayPacketFee(fee ? Fee_1.Fee.fromData(fee) : undefined, source_port_id, source_channel_id, signer, relayers);
    };
    MsgPayPacketFee.prototype.toData = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, fee = _a.fee, source_port_id = _a.source_port_id, source_channel_id = _a.source_channel_id, signer = _a.signer, relayers = _a.relayers;
        return {
            '@type': '/ibc.applications.fee.v1.MsgPayPacketFee',
            fee: fee === null || fee === void 0 ? void 0 : fee.toData(),
            source_port_id: source_port_id,
            source_channel_id: source_channel_id,
            signer: signer,
            relayers: relayers,
        };
    };
    MsgPayPacketFee.fromProto = function (proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgPayPacketFee(proto.fee ? Fee_1.Fee.fromProto(proto.fee) : undefined, proto.sourcePortId, proto.sourceChannelId, proto.signer, proto.relayers);
    };
    MsgPayPacketFee.prototype.toProto = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        var _a = this, fee = _a.fee, source_port_id = _a.source_port_id, source_channel_id = _a.source_channel_id, signer = _a.signer, relayers = _a.relayers;
        return tx_1.MsgPayPacketFee.fromPartial({
            fee: fee === null || fee === void 0 ? void 0 : fee.toProto(),
            sourcePortId: source_port_id,
            sourceChannelId: source_channel_id,
            signer: signer,
            relayers: relayers,
        });
    };
    MsgPayPacketFee.prototype.packAny = function (isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFee',
            value: tx_1.MsgPayPacketFee.encode(this.toProto(isClassic)).finish(),
        });
    };
    MsgPayPacketFee.unpackAny = function (msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgPayPacketFee.fromProto(tx_1.MsgPayPacketFee.decode(msgAny.value), isClassic);
    };
    return MsgPayPacketFee;
}(json_1.JSONSerializable));
exports.MsgPayPacketFee = MsgPayPacketFee;
//# sourceMappingURL=MsgPayPacketFee.js.map