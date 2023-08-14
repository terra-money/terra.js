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
exports.MsgRecvPacket = void 0;
var json_1 = require("../../../../util/json");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var Height_1 = require("../../core/client/Height");
var Packet_1 = require("../../core/channel/Packet");
var tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgRecvPacket receives incoming IBC packet
 */
var MsgRecvPacket = /** @class */ (function (_super) {
    __extends(MsgRecvPacket, _super);
    /**
     * @param packet
     * @param proof_commitment
     * @param proof_height
     * @param signer signer address
     */
    function MsgRecvPacket(packet, proof_commitment, proof_height, signer) {
        var _this = _super.call(this) || this;
        _this.packet = packet;
        _this.proof_commitment = proof_commitment;
        _this.proof_height = proof_height;
        _this.signer = signer;
        return _this;
    }
    MsgRecvPacket.fromAmino = function (_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    };
    MsgRecvPacket.prototype.toAmino = function (_) {
        _;
        throw new Error('Amino not supported');
    };
    MsgRecvPacket.fromData = function (data, _) {
        _;
        var packet = data.packet, proof_commitment = data.proof_commitment, proof_height = data.proof_height, signer = data.signer;
        return new MsgRecvPacket(packet ? Packet_1.Packet.fromData(packet) : undefined, proof_commitment, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    };
    MsgRecvPacket.prototype.toData = function (_) {
        _;
        var _a = this, packet = _a.packet, proof_commitment = _a.proof_commitment, proof_height = _a.proof_height, signer = _a.signer;
        return {
            '@type': '/ibc.core.channel.v1.MsgRecvPacket',
            packet: packet ? packet.toData() : undefined,
            proof_commitment: proof_commitment,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer: signer,
        };
    };
    MsgRecvPacket.fromProto = function (proto, _) {
        _;
        return new MsgRecvPacket(proto.packet ? Packet_1.Packet.fromProto(proto.packet) : undefined, Buffer.from(proto.proofCommitment).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    };
    MsgRecvPacket.prototype.toProto = function (_) {
        _;
        var _a = this, packet = _a.packet, proof_commitment = _a.proof_commitment, proof_height = _a.proof_height, signer = _a.signer;
        return tx_1.MsgRecvPacket.fromPartial({
            packet: packet ? packet.toProto() : undefined,
            proofCommitment: Buffer.from(proof_commitment, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer: signer,
        });
    };
    MsgRecvPacket.prototype.packAny = function (_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgRecvPacket',
            value: tx_1.MsgRecvPacket.encode(this.toProto()).finish(),
        });
    };
    MsgRecvPacket.unpackAny = function (msgAny, _) {
        _;
        return MsgRecvPacket.fromProto(tx_1.MsgRecvPacket.decode(msgAny.value));
    };
    return MsgRecvPacket;
}(json_1.JSONSerializable));
exports.MsgRecvPacket = MsgRecvPacket;
//# sourceMappingURL=MsgRecvPacket.js.map