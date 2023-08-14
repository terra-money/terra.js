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
exports.MsgAcknowledgement = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Height_1 = require("../../core/client/Height");
var Packet_1 = require("../../core/channel/Packet");
var tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgAcknowledgement receives incoming IBC acknowledgement
 */
var MsgAcknowledgement = /** @class */ (function (_super) {
    __extends(MsgAcknowledgement, _super);
    /**
     * @param packet
     * @param acknowledgement
     * @param proof_acked
     * @param proof_height
     * @param signer signer address
     */
    function MsgAcknowledgement(packet, acknowledgement, proof_acked, proof_height, signer) {
        var _this = _super.call(this) || this;
        _this.packet = packet;
        _this.acknowledgement = acknowledgement;
        _this.proof_acked = proof_acked;
        _this.proof_height = proof_height;
        _this.signer = signer;
        return _this;
    }
    MsgAcknowledgement.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgAcknowledgement.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgAcknowledgement.fromData = function (data, _) {
        _;
        var packet = data.packet, acknowledgement = data.acknowledgement, proof_acked = data.proof_acked, proof_height = data.proof_height, signer = data.signer;
        return new MsgAcknowledgement(packet ? Packet_1.Packet.fromData(packet) : undefined, proof_acked, acknowledgement, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    };
    MsgAcknowledgement.prototype.toData = function (_) {
        _;
        var _a = this, packet = _a.packet, acknowledgement = _a.acknowledgement, proof_acked = _a.proof_acked, proof_height = _a.proof_height, signer = _a.signer;
        return {
            '@type': '/ibc.core.channel.v1.MsgAcknowledgement',
            packet: packet ? packet.toData() : undefined,
            acknowledgement: acknowledgement,
            proof_acked: proof_acked,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer: signer,
        };
    };
    MsgAcknowledgement.fromProto = function (proto, _) {
        _;
        return new MsgAcknowledgement(proto.packet ? Packet_1.Packet.fromProto(proto.packet) : undefined, Buffer.from(proto.acknowledgement).toString('base64'), Buffer.from(proto.proofAcked).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    };
    MsgAcknowledgement.prototype.toProto = function (_) {
        _;
        var _a = this, packet = _a.packet, acknowledgement = _a.acknowledgement, proof_acked = _a.proof_acked, proof_height = _a.proof_height, signer = _a.signer;
        return tx_1.MsgAcknowledgement.fromPartial({
            packet: packet ? packet.toProto() : undefined,
            acknowledgement: Buffer.from(acknowledgement, 'base64'),
            proofAcked: Buffer.from(proof_acked, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer: signer,
        });
    };
    MsgAcknowledgement.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgAcknowledgement',
            value: tx_1.MsgAcknowledgement.encode(this.toProto()).finish(),
        });
    };
    MsgAcknowledgement.unpackAny = function (msgAny, _) {
        _;
        return MsgAcknowledgement.fromProto(tx_1.MsgAcknowledgement.decode(msgAny.value));
    };
    return MsgAcknowledgement;
}(json_1.JSONSerializable));
exports.MsgAcknowledgement = MsgAcknowledgement;
//# sourceMappingURL=MsgRecvAcknowledgement.js.map